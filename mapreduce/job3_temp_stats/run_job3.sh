#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
HADOOP_JAR="$(find /usr/local/hadoop/share/hadoop -name 'hadoop-streaming-*.jar' -print -quit)"
INPUT="${HADOOP_INPUT:-/user/${USER}/input/weather.csv}"
OUTPUT="${HADOOP_OUTPUT:-/user/${USER}/output/job3_temp_stats}"

hadoop fs -rm -r -f "$OUTPUT"
hadoop jar "$HADOOP_JAR" \
  -D mapred.output.dir="$OUTPUT" \
  -input "$INPUT" \
  -output "$OUTPUT" \
  -mapper "$ROOT_DIR/mapreduce/job3_temp_stats/mapper.py" \
  -reducer "$ROOT_DIR/mapreduce/job3_temp_stats/reducer.py" \
  -file "$ROOT_DIR/mapreduce/job3_temp_stats/mapper.py" \
  -file "$ROOT_DIR/mapreduce/job3_temp_stats/reducer.py"

hadoop fs -cat "$OUTPUT/part-*"
