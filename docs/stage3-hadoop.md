# Stage 3: Hadoop HDFS and MapReduce

## Purpose

Stage 3 stores the generated synthetic datasets in Apache Hadoop HDFS and processes them with Python streaming MapReduce jobs.

## Components

- `docker/hadoop/` — pseudo-distributed Hadoop Docker Compose cluster.
- `hdfs/` — directory creation, ingestion, inspection, and cleanup scripts.
- `mapreduce/job1_avg_traffic/` — zone-level average traffic volume.
- `mapreduce/job2_peak_hour/` — highest average traffic hour per zone.
- `mapreduce/job3_temp_stats/` — monthly min/max/average temperature per zone.
- `mapreduce/verify.py` — Pandas comparison using a 0.01 absolute tolerance.

## Commands

```bash
./scripts/start-hadoop.ps1 -Action up
./hdfs/01_create_dirs.sh
./hdfs/02_ingest.sh
./hdfs/03_inspect.sh
./scripts/run_stage3.sh
```

The job runners use the Hadoop streaming JAR and write results to HDFS. The local CSV files remain the reference inputs for validation.

## Validation

The verifier compares local data with HDFS results at an absolute tolerance of 0.01. The Docker daemon must be running before the scripts can execute against the cluster.

## Current Environment Constraint

Docker Desktop is unavailable in the current agent environment. Runtime HDFS and MapReduce execution must be performed from a machine with an active Docker daemon before the final pipeline status can be claimed.
