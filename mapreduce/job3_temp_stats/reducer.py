#!/usr/bin/env python3
import sys

current_zone = None
current_month = None
minimum = None
maximum = None
total = 0.0
count = 0

for raw_line in sys.stdin:
    line = raw_line.rstrip("\n")
    if "\t" not in line:
        continue
    zone, month, temperature_text = line.split("\t", 2)
    try:
        temperature = float(temperature_text)
    except ValueError:
        continue
    if not zone or not month or not -50 <= temperature <= 100:
        continue

    key = (zone, month)
    if current_zone is None:
        current_zone, current_month = key
        minimum = maximum = temperature
        total = temperature
        count = 1
    elif key == (current_zone, current_month):
        minimum = min(minimum, temperature)
        maximum = max(maximum, temperature)
        total += temperature
        count += 1
    else:
        print(f"{current_zone}\t{current_month}\t{minimum:.6f}\t{maximum:.6f}\t{total / count:.6f}")
        current_zone, current_month = key
        minimum = maximum = temperature
        total = temperature
        count = 1

if current_zone is not None:
    print(f"{current_zone}\t{current_month}\t{minimum:.6f}\t{maximum:.6f}\t{total / count:.6f}")
