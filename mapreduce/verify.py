#!/usr/bin/env python3
"""Compare local CSV results with Hadoop streaming job output."""

import argparse
import pathlib
import sys

import pandas as pd


def load_output(path: pathlib.Path) -> pd.DataFrame:
    return pd.read_csv(path, sep="\t", header=None, names=[
        "zone", "result_1", "result_2", "result_3"
    ])


def compare_traffic(path: pathlib.Path, hdfs_path: pathlib.Path) -> None:
    local = pd.read_csv(path)
    local_result = local.groupby("zone")["vehicle_count"].mean().rename("average")
    hadoop_result = load_output(hdfs_path).set_index("zone")["result_1"]
    actual = pd.Series(hadoop_result.to_numpy(), index=hadoop_result.index, name="average")
    pd.testing.assert_frame_equal(
        local_result.to_frame().sort_index(),
        actual.to_frame().sort_index(),
        check_exact=False,
        atol=0.01,
        rtol=0,
    )


def compare_weather(path: pathlib.Path, hdfs_path: pathlib.Path) -> None:
    local = pd.read_csv(path)
    local_result = local.assign(month=local["timestamp"].str[:7]).groupby(
        ["zone", "month"], as_index=False
    )["temperature"].agg(["min", "max", "mean"])
    local_result.columns = ["zone", "month", "min", "max", "avg"]
    hadoop_result = pd.read_csv(hdfs_path, sep="\t", header=None, names=[
        "zone", "month", "min", "max", "avg"
    ])
    pd.testing.assert_frame_equal(
        local_result.sort_values(["zone", "month"]).reset_index(drop=True),
        hadoop_result.sort_values(["zone", "month"]).reset_index(drop=True),
        check_exact=False,
        atol=0.01,
        rtol=0,
    )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--traffic", type=pathlib.Path, default=pathlib.Path("data/traffic.csv"))
    parser.add_argument("--weather", type=pathlib.Path, default=pathlib.Path("data/weather.csv"))
    parser.add_argument("--job1-output", type=pathlib.Path, required=True)
    parser.add_argument("--job3-output", type=pathlib.Path, required=True)
    args = parser.parse_args()

    compare_traffic(args.traffic, args.job1_output)
    compare_weather(args.weather, args.job3_output)
    print("MapReduce verification passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
