#!/usr/bin/env python3
import sys
from collections import defaultdict

hour_totals = defaultdict(float)
hour_counts = defaultdict(int)
current_zone = None

for raw_line in sys.stdin:
    line = raw_line.rstrip("\n")
    if "\t" not in line:
        continue
    zone, hour_text, vehicle_text = line.split("\t", 2)
    try:
        hour = int(hour_text)
        vehicle_count = float(vehicle_text)
    except ValueError:
        continue
    if not zone or hour not in range(24) or vehicle_count < 0:
        continue

    if current_zone is not None and zone != current_zone:
        peak_hour = max(hour_totals, key=lambda value: (hour_totals[value] / hour_counts[value], -value))
        print(f"{current_zone}\t{peak_hour}\t{hour_totals[peak_hour] / hour_counts[peak_hour]:.6f}")
        hour_totals.clear()
        hour_counts.clear()
    current_zone = zone
    hour_totals[hour] += vehicle_count
    hour_counts[hour] += 1

if current_zone is not None:
    peak_hour = max(hour_totals, key=lambda value: (hour_totals[value] / hour_counts[value], -value))
    print(f"{current_zone}\t{peak_hour}\t{hour_totals[peak_hour] / hour_counts[peak_hour]:.6f}")
