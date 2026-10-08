#!/usr/bin/env bash
set -euo pipefail

hdfs dfs -rm -r -f /smartcity/raw
hdfs dfs -rm -r -f /smartcity/processed
hdfs dfs -mkdir -p /smartcity/raw /smartcity/processed
hdfs dfs -ls -R /smartcity
