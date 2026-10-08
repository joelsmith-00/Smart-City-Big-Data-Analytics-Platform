#!/usr/bin/env python3
from pathlib import Path

for path in sorted(Path("data").glob("*.csv")):
    with path.open(encoding="utf-8") as stream:
        rows = sum(1 for _ in stream) - 1
    print(f"{path.name}: {rows}")
