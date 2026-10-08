#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

hdfs dfs -put -f "$ROOT_DIR/data/traffic.csv" /smartcity/raw/traffic/
hdfs dfs -put -f "$ROOT_DIR/data/weather.csv" /smartcity/raw/weather/
hdfs dfs -put -f "$ROOT_DIR/data/air_quality.csv" /smartcity/raw/air/
hdfs dfs -put -f "$ROOT_DIR/data/energy.csv" /smartcity/raw/energy/
hdfs dfs -put -f "$ROOT_DIR/data/emergency.csv" /smartcity/raw/emergency/

hdfs dfs -ls -R /smartcity/raw
