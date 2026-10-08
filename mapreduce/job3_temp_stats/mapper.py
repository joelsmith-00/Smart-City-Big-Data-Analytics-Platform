#!/usr/bin/env python3
import csv
import math
import sys

for row in csv.DictReader(sys.stdin):
    try:
        zone = (row.get("zone") or "").strip()
        timestamp = (row.get("timestamp") or "").strip()
        temperature = float((row.get("temperature") or "").strip())
        if not zone or not timestamp or not math.isfinite(temperature) or not -50 <= temperature <= 100:
            continue
        month = timestamp[:7]
        if len(month) != 7 or month[4] != "-":
            continue
    except (csv.Error, KeyError, TypeError, ValueError):
        continue
    print(f"{zone}\t{month}\t{temperature:.6f}")
