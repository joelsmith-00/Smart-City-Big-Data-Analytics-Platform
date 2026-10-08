#!/usr/bin/env bash
set -euo pipefail

hdfs dfs -mkdir -p /smartcity/raw/traffic /smartcity/raw/weather /smartcity/raw/air /smartcity/raw/energy /smartcity/raw/emergency /smartcity/processed
hdfs dfs -ls /smartcity /smartcity/raw /smartcity/processed
