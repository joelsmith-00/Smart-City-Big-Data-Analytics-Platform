#!/usr/bin/env python3
import csv
import math
import sys

for row in csv.DictReader(sys.stdin):
    try:
        zone = (row.get("zone") or "").strip()
        value = (row.get("vehicle_count") or "").strip()
        number = float(value)
        if not zone or not math.isfinite(number) or number < 0:
            continue
    except (csv.Error, KeyError, TypeError, ValueError):
        continue
    print(f"{zone}\t{number:.6f}")
