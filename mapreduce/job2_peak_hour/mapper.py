#!/usr/bin/env python3
import csv
import math
import sys

for row in csv.DictReader(sys.stdin):
    try:
        zone = (row.get("zone") or "").strip()
        timestamp = (row.get("timestamp") or "").strip()
        vehicle_count = float((row.get("vehicle_count") or "").strip())
        hour = int(timestamp[11:13])
        if not zone or hour not in range(24) or not math.isfinite(vehicle_count) or vehicle_count < 0:
            continue
    except (csv.Error, IndexError, KeyError, TypeError, ValueError):
        continue
    print(f"{zone}\t{hour}\t{vehicle_count:.6f}")
