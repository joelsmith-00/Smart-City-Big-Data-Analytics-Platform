#!/usr/bin/env python3
"""Compare local CSV results with Hadoop streaming job output."""

import argparse
import pathlib
import sys

import pandas as pd


def load_output(path: pathlib.Path, columns: list[str]) -> pd.DataFrame:
    return pd.read_csv(path, sep="\t", header=None, names=columns)


def compare_traffic(path: pathlib.Path, hdfs_path: pathlib.Path) -> int:
    local = pd.read_csv(path)
    local["vehicle_count"] = pd.to_numeric(local["vehicle_count"], errors="coerce")
    local = local[local["vehicle_count"].ge(0)]
    expected = local.groupby("zone", as_index=False)["vehicle_count"].mean()
    expected = expected.rename(columns={"vehicle_count": "average"})
    actual = load_output(hdfs_path, ["zone", "average"])
    pd.testing.assert_frame_equal(
        expected.sort_values("zone").reset_index(drop=True),
        actual.sort_values("zone").reset_index(drop=True),
        check_exact=False,
        atol=0.01,
        rtol=0,
    )
    return len(actual)


def compare_peak_hour(path: pathlib.Path, hdfs_path: pathlib.Path) -> int:
    local = pd.read_csv(path)
    local["vehicle_count"] = pd.to_numeric(local["vehicle_count"], errors="coerce")
    local["hour"] = pd.to_datetime(local["timestamp"], errors="coerce").dt.hour
    local = local[local["vehicle_count"].ge(0) & local["hour"].notna()]
    hourly = local.groupby(["zone", "hour"], as_index=False)["vehicle_count"].mean()
    expected = hourly.sort_values(
        ["zone", "vehicle_count", "hour"], ascending=[True, False, True]
    ).drop_duplicates("zone")
    expected = expected.rename(columns={"vehicle_count": "average"})
    expected["hour"] = expected["hour"].astype(int)
    actual = load_output(hdfs_path, ["zone", "hour", "average"])
    actual["hour"] = actual["hour"].astype(int)
    pd.testing.assert_frame_equal(
        expected[["zone", "hour", "average"]].sort_values("zone").reset_index(drop=True),
        actual.sort_values("zone").reset_index(drop=True),
        check_exact=False,
        atol=0.01,
        rtol=0,
    )
    return len(actual)


def compare_weather(path: pathlib.Path, hdfs_path: pathlib.Path) -> int:
    local = pd.read_csv(path)
    local["temperature"] = pd.to_numeric(local["temperature"], errors="coerce")
    local = local[local["temperature"].between(-50, 100)]
    local["month"] = local["timestamp"].astype(str).str[:7]
    expected = local.groupby(["zone", "month"], as_index=False)["temperature"].agg(
        minimum="min", maximum="max", average="mean"
    )
    expected = expected.rename(columns={
        "minimum": "min", "maximum": "max", "average": "avg"
    })
    actual = load_output(hdfs_path, ["zone", "month", "min", "max", "avg"])
    pd.testing.assert_frame_equal(
        expected.sort_values(["zone", "month"]).reset_index(drop=True),
        actual.sort_values(["zone", "month"]).reset_index(drop=True),
        check_exact=False,
        atol=0.01,
        rtol=0,
    )
    return len(actual)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--traffic", type=pathlib.Path, default=pathlib.Path("data/traffic.csv"))
    parser.add_argument("--weather", type=pathlib.Path, default=pathlib.Path("data/weather.csv"))
    parser.add_argument("--job1-output", type=pathlib.Path, required=True)
    parser.add_argument("--job2-output", type=pathlib.Path, required=True)
    parser.add_argument("--job3-output", type=pathlib.Path, required=True)
    args = parser.parse_args()

    checks = [
        ("Job 1 average traffic", lambda: compare_traffic(args.traffic, args.job1_output)),
        ("Job 2 peak hour", lambda: compare_peak_hour(args.traffic, args.job2_output)),
        ("Job 3 temperature stats", lambda: compare_weather(args.weather, args.job3_output)),
    ]
    results = []
    for name, check in checks:
        try:
            rows = check()
            results.append((name, rows, "PASS", ""))
        except Exception as error:
            results.append((name, "-", "FAIL", str(error).replace("\n", " ")))

    print("Job | Output rows | Verify | Details")
    print("--- | ---: | --- | ---")
    for name, rows, status, details in results:
        print(f"{name} | {rows} | {status} | {details}")
    return 0 if all(result[2] == "PASS" for result in results) else 1


if __name__ == "__main__":
    sys.exit(main())
