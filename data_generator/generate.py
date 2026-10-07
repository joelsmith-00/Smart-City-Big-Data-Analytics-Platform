#!/usr/bin/env python3
"""Generate deterministic synthetic smart-city datasets for Hadoop and Spark."""

from __future__ import annotations

import argparse
from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd
import yaml
from tqdm import tqdm

CONFIG_PATH = Path(__file__).with_name("config.yaml")
ZONES = ("Central", "North", "South", "East", "West", "Industrial")
ZONE_COORDINATES = {
    "Central": (40.7128, -74.0060),
    "North": (40.7306, -73.9352),
    "South": (40.6772, -73.9442),
    "East": (40.7411, -73.9897),
    "West": (40.8831, -73.9951),
    "Industrial": (40.6562, -73.9321),
}


def load_config(config_path: Path = CONFIG_PATH) -> dict[str, Any]:
    with config_path.open(encoding="utf-8") as stream:
        config = yaml.safe_load(stream)
    if not isinstance(config, dict):
        raise ValueError("Configuration must be a YAML mapping")
    return config


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate synthetic traffic, weather, air quality, energy, and emergency data."
    )
    parser.add_argument(
        "--rows-scale",
        type=float,
        default=1.0,
        help="Multiplicative row scale; 0.01 creates a small dataset (default: 1.0).",
    )
    parser.add_argument(
        "--out",
        type=Path,
        default=Path("data"),
        help="Output directory for generated CSV files (default: data).",
    )
    parser.add_argument(
        "--seed",
        type=int,
        default=None,
        help="Random seed; defaults to the configuration seed.",
    )
    return parser.parse_args()


def _validate_config(config: dict[str, Any], rows_scale: float) -> None:
    if rows_scale <= 0:
        raise ValueError("--rows-scale must be greater than zero")
    if not config.get("zones"):
        raise ValueError("Configuration must define at least one zone")
    if config.get("start_date") is None or config.get("end_date") is None:
        raise ValueError("Configuration must define start_date and end_date")


def _build_timestamps(config: dict[str, Any], rows_per_zone_per_day: int) -> tuple[np.ndarray, np.ndarray]:
    start = pd.Timestamp(config["start_date"])
    end = pd.Timestamp(config["end_date"])
    date_range = pd.date_range(start, end, freq="D")
    day_count = len(date_range)
    hours = np.arange(rows_per_zone_per_day, dtype=np.int64)
    timestamps = pd.date_range(start, end, freq="D").repeat(rows_per_zone_per_day)
    timestamps = timestamps.to_numpy()
    timestamps += np.timedelta64(1, "h") * (hours % 24)
    timestamps = pd.to_datetime(timestamps)
    return timestamps, np.repeat(np.arange(day_count), rows_per_zone_per_day)


def _repeat_zone_values(config: dict[str, Any], rows: int, rng: np.random.Generator) -> np.ndarray:
    zones = np.asarray([zone["name"] for zone in config["zones"]], dtype=object)
    zone_counts = np.full(len(zones), rows // len(zones), dtype=np.int64)
    remainder = rows % len(zones)
    zone_counts[:remainder] += 1
    return np.repeat(zones, zone_counts)


def _make_base_frame(
    config: dict[str, Any], rows_scale: float, seed: int
) -> tuple[pd.DataFrame, np.random.Generator]:
    rows_per_zone_per_day = int(config["rows_per_zone_per_day"])
    start = pd.Timestamp(config["start_date"])
    end = pd.Timestamp(config["end_date"])
    dates = pd.date_range(start, end, freq="D")
    zone_names = np.asarray([zone["name"] for zone in config["zones"]], dtype=object)
    zone_rows = np.repeat(zone_names, rows_per_zone_per_day)
    zones = np.tile(zone_rows, len(dates))
    zone_dates = np.repeat(dates.to_numpy(), rows_per_zone_per_day * len(zone_names))
    hours = np.tile(np.arange(rows_per_zone_per_day), len(dates) * len(zone_names))
    timestamps = pd.to_datetime(zone_dates) + pd.to_timedelta(hours, unit="h")
    full_frame = pd.DataFrame(
        {
            "timestamp": timestamps,
            "zone": zones,
            "hour": timestamps.hour.to_numpy(),
            "day_of_week": timestamps.dayofweek.to_numpy(),
            "month": timestamps.month.to_numpy(),
        }
    )
    row_count = max(1, int(len(full_frame) * rows_scale))
    return full_frame.head(row_count), np.random.default_rng(seed)


def _inject_missing(frame: pd.DataFrame, columns: list[str], rate: float, rng: np.random.Generator) -> None:
    for column in columns:
        mask = rng.random(len(frame)) < rate
        frame.loc[mask, column] = np.nan


def _inject_anomalies(frame: pd.DataFrame, columns: list[str], rate: float, rng: np.random.Generator) -> None:
    for column in columns:
        mask = rng.random(len(frame)) < rate
        frame.loc[mask, column] = frame.loc[mask, column].clip(lower=0) * rng.uniform(1.8, 3.0, mask.sum())


def _write_csv(frame: pd.DataFrame, output_path: Path) -> None:
    chunk_size = 100_000
    total_chunks = (len(frame) + chunk_size - 1) // chunk_size
    with tqdm(total=total_chunks, desc=output_path.name, unit="chunk") as progress:
        for chunk_number, start in enumerate(range(0, len(frame), chunk_size), start=1):
            chunk = frame.iloc[start : start + chunk_size]
            chunk.to_csv(
                output_path,
                index=False,
                header=chunk_number == 1,
                mode="w" if chunk_number == 1 else "a",
            )
            progress.update(1)


def generate_traffic(frame: pd.DataFrame, rng: np.random.Generator) -> pd.DataFrame:
    hour = frame["hour"].to_numpy()
    weekend = frame["day_of_week"].to_numpy() >= 5
    month = frame["month"].to_numpy()
    summer = (month >= 6) & (month <= 8)
    peak = ((hour >= 8) & (hour <= 9)) | ((hour >= 17) & (hour <= 19))
    base = np.where(weekend, 28.0, 42.0)
    base = np.where(peak, base * 1.32, base)
    base = np.where(summer, base * 1.05, base)
    vehicle_count = np.rint(base * rng.normal(1.0, 0.12, len(frame)) + 18).astype(int)
    speed = 55.0 - 7.0 * np.clip((vehicle_count - 35) / 45.0, 0, 1)
    speed *= np.where(weekend, 0.98, 1.0)
    speed = np.clip(speed + rng.normal(0, 2.5, len(frame)), 10, 70)
    congestion = np.clip(
        0.18 + (vehicle_count / 95.0) * 0.45 + rng.normal(0, 0.08, len(frame)),
        0,
        1,
    )
    return pd.DataFrame({
        "timestamp": frame["timestamp"],
        "zone": frame["zone"],
        "vehicle_count": vehicle_count,
        "avg_speed": np.round(speed, 2),
        "congestion_index": np.round(congestion, 3),
    })


def generate_weather(frame: pd.DataFrame, rng: np.random.Generator) -> pd.DataFrame:
    month = frame["month"].to_numpy()
    temperature = 18 + 16 * np.sin((month - 4) * np.pi / 6) + rng.normal(0, 3.5, len(frame))
    rain = np.where(
        (month >= 6) & (month <= 9),
        14 + 8 * np.sin((month - 6) * np.pi / 3) + rng.gamma(2, 4, len(frame)),
        0.5 * rng.gamma(2, 2, len(frame)),
    )
    humidity = np.clip(52 + 20 * np.sin((month - 4) * np.pi / 6) + rain * 0.18 + rng.normal(0, 6), 20, 95)
    return pd.DataFrame({
        "timestamp": frame["timestamp"],
        "zone": frame["zone"],
        "temperature": np.round(temperature, 2),
        "humidity": np.round(humidity, 2),
        "rainfall_mm": np.round(np.maximum(rain, 0), 2),
    })


def generate_air_quality(frame: pd.DataFrame, rng: np.random.Generator) -> pd.DataFrame:
    industrial = frame["zone"].to_numpy() == "Industrial"
    base_pm25 = np.where(industrial, 28.0, 15.0) + rng.gamma(2.0, 9.0, len(frame))
    base_pm25 = np.clip(base_pm25 + rng.normal(0, 4.0, len(frame)), 0, 180)
    pm10 = base_pm25 * 1.55 + rng.normal(0, 5.0, len(frame))
    no2 = np.clip(22 + 2.5 * np.sin(frame["hour"].to_numpy() * np.pi / 12) + rng.normal(0, 5), 1, 80)
    so2 = np.clip(4 + 1.5 * industrial + rng.normal(0, 2), 1, 80)
    co = np.clip(0.3 + 0.1 * industrial + rng.normal(0, 0.2, len(frame)), 0, 10)
    o3 = np.clip(33 + 7 * np.sin((frame["month"].to_numpy() - 4) * np.pi / 6) + rng.normal(0, 5), 1, 100)
    pm25 = np.clip(base_pm25, 0, 180)
    aqi = np.rint(np.clip(25 + pm25 * 2.4 + no2 * 0.8 + so2 * 0.5, 0, 1500)).astype(int)
    return pd.DataFrame({
        "timestamp": frame["timestamp"],
        "zone": frame["zone"],
        "pm25": np.round(pm25, 2),
        "pm10": np.round(np.clip(pm10, 0, 300), 2),
        "no2": np.round(no2, 2),
        "so2": np.round(so2, 2),
        "co": np.round(co, 2),
        "o3": np.round(o3, 2),
        "aqi": aqi,
    })


def generate_energy(frame: pd.DataFrame, rng: np.random.Generator) -> pd.DataFrame:
    industrial = frame["zone"].to_numpy() == "Industrial"
    hour = frame["hour"].to_numpy()
    peak = (hour >= 7) & (hour <= 20)
    season = 1 + 0.22 * np.sin((frame["month"].to_numpy() - 4) * np.pi / 6)
    base = np.where(industrial, 135.0, 72.0) * season
    consumption = base * np.where(peak, 1.35, 0.78) * rng.lognormal(0, 0.12, len(frame))
    peak_load = np.clip(8.5 + consumption / 28.0 + rng.normal(0, 1.0, len(frame)), 3, 60)
    return pd.DataFrame({
        "timestamp": frame["timestamp"],
        "zone": frame["zone"],
        "consumption_kwh": np.round(consumption, 2),
        "peak_load_mw": np.round(peak_load, 2),
    })


def generate_emergency(frame: pd.DataFrame, rng: np.random.Generator) -> pd.DataFrame:
    count = max(1, int(len(frame) * 0.02))
    indices = rng.choice(len(frame), size=count, replace=False)
    incident_types = np.asarray(["accident", "medical", "environmental", "utilities", "security"])
    severity = np.asarray(["low", "moderate", "high", "critical"])
    incident = pd.DataFrame({
        "incident_id": np.arange(1, count + 1),
        "timestamp": frame.iloc[indices]["timestamp"].to_numpy(),
        "zone": frame.iloc[indices]["zone"].to_numpy(),
        "type": rng.choice(incident_types, size=count),
        "severity": rng.choice(severity, size=count, p=[0.45, 0.35, 0.15, 0.05]),
        "response_time_min": np.rint(rng.gamma(3.0, 5.0, size=count) + 2).astype(int),
    })
    return incident


def main() -> None:
    args = parse_args()
    config = load_config()
    _validate_config(config, args.rows_scale)
    seed = args.seed if args.seed is not None else int(config.get("seed", 42))
    out_dir = args.out.resolve()
    out_dir.mkdir(parents=True, exist_ok=True)
    frame, rng = _make_base_frame(config, args.rows_scale, seed)

    datasets = {
        "traffic": generate_traffic(frame, rng),
        "weather": generate_weather(frame, rng),
        "air_quality": generate_air_quality(frame, rng),
        "energy": generate_energy(frame, rng),
    }
    datasets["emergency"] = generate_emergency(frame, rng)

    for name in ("traffic", "weather", "air_quality", "energy"):
        missing_rate = float(config.get("missing_rate", 0.01))
        _inject_missing(datasets[name], list(datasets[name].columns[2:]), missing_rate, rng)
    anomaly_rate = float(config.get("anomaly_rate", 0.005))
    _inject_anomalies(datasets["traffic"], ["vehicle_count", "avg_speed", "congestion_index"], anomaly_rate, rng)
    _inject_anomalies(datasets["weather"], ["temperature", "humidity", "rainfall_mm"], anomaly_rate, rng)
    _inject_anomalies(datasets["air_quality"], ["pm25", "pm10", "no2", "so2", "co", "o3", "aqi"], anomaly_rate, rng)
    _inject_anomalies(datasets["energy"], ["consumption_kwh", "peak_load_mw"], anomaly_rate, rng)

    for name, dataset in datasets.items():
        output_path = out_dir / f"{name}.csv"
        _write_csv(dataset, output_path)
        print(f"Generated {output_path} ({len(dataset)} rows)")


if __name__ == "__main__":
    main()
