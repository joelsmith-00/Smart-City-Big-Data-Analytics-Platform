#!/usr/bin/env bash
set -euo pipefail

printf '%s\n' '=== HDFS listings ==='
hdfs dfs -ls -R /smartcity/raw
printf '%s\n' '=== HDFS disk usage ==='
hdfs dfs -du -h /smartcity/raw
printf '%s\n' '=== Traffic sample ==='
hdfs dfs -cat /smartcity/raw/traffic/traffic.csv | head -n 6
printf '%s\n' '=== Weather sample ==='
hdfs dfs -cat /smartcity/raw/weather/weather.csv | head -n 6
printf '%s\n' '=== Air quality sample ==='
hdfs dfs -cat /smartcity/raw/air/air_quality.csv | head -n 6
printf '%s\n' '=== Energy sample ==='
hdfs dfs -cat /smartcity/raw/energy/energy.csv | head -n 6
printf '%s\n' '=== Emergency sample ==='
hdfs dfs -cat /smartcity/raw/emergency/emergency.csv | head -n 6
