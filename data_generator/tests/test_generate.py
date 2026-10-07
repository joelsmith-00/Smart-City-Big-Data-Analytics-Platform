from pathlib import Path

import numpy as np
import pandas as pd
import pytest

from data_generator.generate import (
    _inject_anomalies,
    _inject_missing,
    _make_base_frame,
    generate_air_quality,
    generate_energy,
    generate_emergency,
    generate_traffic,
    generate_weather,
    load_config,
)

CONFIG_PATH = Path(__file__).resolve().parents[1] / "config.yaml"
EXPECTED_ZONES = {"Central", "North", "South", "East", "West", "Industrial"}


def test_generator_schemas_and_zones() -> None:
    config = load_config(CONFIG_PATH)
    frame, _ = _make_base_frame(config, 0.01, seed=42)
    datasets = {
        "traffic": generate_traffic(frame, np.random.default_rng(42)),
        "weather": generate_weather(frame, np.random.default_rng(42)),
        "air_quality": generate_air_quality(frame, np.random.default_rng(42)),
        "energy": generate_energy(frame, np.random.default_rng(42)),
        "emergency": generate_emergency(frame, np.random.default_rng(42)),
    }
    expected_columns = {
        "traffic": {"timestamp", "zone", "vehicle_count", "avg_speed", "congestion_index"},
        "weather": {"timestamp", "zone", "temperature", "humidity", "rainfall_mm"},
        "air_quality": {"timestamp", "zone", "pm25", "pm10", "no2", "so2", "co", "o3", "aqi"},
        "energy": {"timestamp", "zone", "consumption_kwh", "peak_load_mw"},
        "emergency": {"incident_id", "timestamp", "zone", "type", "severity", "response_time_min"},
    }
    for name, dataset in datasets.items():
        assert set(dataset.columns) == expected_columns[name]
    assert set(frame["zone"].unique()) == EXPECTED_ZONES


def test_anomaly_rate_near_target() -> None:
    frame = pd.DataFrame({"value": np.arange(10, dtype=float)})
    rng = np.random.default_rng(7)
    _inject_anomalies(frame, ["value"], 0.2, rng)
    assert frame["value"].isna().sum() == 0
    assert 1 <= (frame["value"].abs() > 10).sum() <= 3


def test_value_ranges_and_aqi() -> None:
    config = load_config(CONFIG_PATH)
    frame, _ = _make_base_frame(config, 0.01, seed=42)
    air = generate_air_quality(frame, np.random.default_rng(42))
    weather = generate_weather(frame, np.random.default_rng(42))
    assert air["aqi"].ge(0).all()
    assert weather["humidity"].between(0, 100).all()
    assert air["pm25"].ge(0).all()


def test_missing_values_and_seed_reproducibility() -> None:
    config = load_config(CONFIG_PATH)
    first, _ = _make_base_frame(config, 0.01, seed=42)
    second, _ = _make_base_frame(config, 0.01, seed=42)
    pd.testing.assert_frame_equal(first, second)
    frame = generate_traffic(first, np.random.default_rng(42))
    _inject_missing(frame, ["vehicle_count"], 0.1, np.random.default_rng(42))
    missing_count = frame["vehicle_count"].isna().sum()
    assert 90 <= missing_count <= 120


@pytest.mark.parametrize("dataset_name", ["traffic", "weather", "air_quality", "energy"])
def test_generated_datasets_are_nonempty(dataset_name: str) -> None:
    config = load_config(CONFIG_PATH)
    frame, _ = _make_base_frame(config, 0.01, seed=42)
    rng = np.random.default_rng(42)
    datasets = {
        "traffic": generate_traffic(frame, rng),
        "weather": generate_weather(frame, rng),
        "air_quality": generate_air_quality(frame, rng),
        "energy": generate_energy(frame, rng),
    }
    assert len(datasets[dataset_name]) > 0
