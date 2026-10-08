# SmartCity BigData: Large-Scale Urban Data Analytics

![Python](https://img.shields.io/badge/Python-3.11-3776AB?logo=python&logoColor=white)
![Pytest](https://img.shields.io/badge/Tests-pytest-9C27B0)
![Hadoop](https://img.shields.io/badge/Hadoop-ecosystem-66BB6A)
![Spark](https://img.shields.io/badge/Spark-analytics-FF6B3D)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## Overview

SmartCity BigData is a staged platform for discovering, processing, and visualizing large-scale urban data. Stage 1 provides a deterministic synthetic-data generator for traffic, weather, air quality, energy, and emergency events. Later stages add Hadoop, MapReduce, Pig, Hive, Spark, APIs, and dashboards.

## Technology Stack

| Area | Technology |
|---|---|
| Data generation | Python, NumPy, pandas, Faker, PyYAML |
| Testing | pytest |
| Distributed storage | Apache Hadoop HDFS |
| Batch processing | Apache Hadoop MapReduce |
| Querying | Apache Pig, Apache Hive |
| Analytics | Apache Spark |
| Operational data | MongoDB |
| API | Python FastAPI |
| Dashboard | React or Dash, depending on stage |

## Architecture

```text
Data -> Ingestion -> HDFS -> MapReduce/Spark -> Hive/Pig -> MongoDB -> Dashboard
```

See [docs/architecture.md](docs/architecture.md) for the detailed architecture diagram and [docs/data-dictionary.md](docs/data-dictionary.md) for field definitions.

## Folder Structure

```text
.
├── data_generator/       # Synthetic data generation and tests
├── hdfs/                 # Hadoop storage integration
├── mapreduce/            # MapReduce jobs
├── pig/                  # Pig transformations
├── hive/                 # Hive schemas and queries
├── spark/                # Spark analytics
├── api/                  # API service
├── dashboard/            # Dashboard application
├── docs/                 # Architecture and data documentation
└── data/                 # Generated CSV output
```

## Quick Start

Install the Python dependencies:

```bash
python -m pip install -r requirements.txt
```

Generate a small local dataset:

```bash
python data_generator/generate.py --rows-scale 0.01 --out data --seed 42
```

The command writes these files to the data directory:

- traffic.csv
- weather.csv
- air_quality.csv
- energy.csv
- emergency.csv

Run the tests:

```bash
python -m pytest data_generator/tests/test_generate.py -q
```

## Roadmap

- [x] Stage 1 — Synthetic Data Generation and Project Foundation
- [x] Stage 2 — Interactive Mock Dashboard, Data Views, Predictions, Alerts, Pipeline, and Performance Polish
- [ ] Stage 3 — Apache Hadoop HDFS Storage and MapReduce Processing
- [ ] Stage 4 — Apache Pig and Apache Hive Analytics
- [ ] Stage 5 — Apache Spark and MongoDB Integration
- [ ] Stage 6 — API and Dashboard Delivery
- [ ] Stage 7 — Operational Validation and Final Delivery

See [docs/stage3-hadoop.md](docs/stage3-hadoop.md) for the Hadoop ingestion, MapReduce, and verification workflow.


## Screenshots

Dashboard screenshots are maintained under [docs/screenshots/](docs/screenshots/). Add the generated images there when validating the application at desktop and mobile breakpoints.

## License

MIT License
