#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HADOOP_INPUT="${HADOOP_INPUT:-/user/${USER}/input}"
HADOOP_OUTPUT="${HADOOP_OUTPUT:-/user/${USER}/output}"

hadoop fs -mkdir -p "$HADOOP_INPUT"
hadoop fs -put -f "$ROOT_DIR/data/traffic.csv" "$HADOOP_INPUT/traffic.csv"
hadoop fs -put -f "$ROOT_DIR/data/weather.csv" "$HADOOP_INPUT/weather.csv"

"$ROOT_DIR/mapreduce/job1_avg_traffic/run_job1.sh"
"$ROOT_DIR/mapreduce/job2_peak_hour/run_job2.sh"
"$ROOT_DIR/mapreduce/job3_temp_stats/run_job3.sh"

python "$ROOT_DIR/mapreduce/verify.py" \
  --job1-output "$HADOOP_OUTPUT/job1_avg_traffic" \
  --job3-output "$HADOOP_OUTPUT/job3_temp_stats"
