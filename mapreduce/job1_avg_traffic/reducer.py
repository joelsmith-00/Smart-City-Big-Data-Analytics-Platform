#!/usr/bin/env python3
import sys

current_zone = None
total = 0.0
count = 0

for raw_line in sys.stdin:
    line = raw_line.rstrip("\n")
    if "\t" not in line:
        continue
    zone, value_text = line.split("\t", 1)
    try:
        value = float(value_text)
        if not zone or value < 0:
            continue
    except ValueError:
        continue

    if current_zone is None:
        current_zone = zone
        total = value
        count = 1
    elif zone == current_zone:
        total += value
        count += 1
    else:
        print(f"{current_zone}\t{total / count:.6f}")
        current_zone = zone
        total = value
        count = 1

if current_zone is not None:
    print(f"{current_zone}\t{total / count:.6f}")
