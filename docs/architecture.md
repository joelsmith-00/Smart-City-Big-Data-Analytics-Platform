# SmartCity Big Data Architecture

```text
+--------------------------+       +--------------------------+       +--------------------------+
| Data Sources            |       | Ingestion                 |       | HDFS                     |
| - IoT sensors            | ----> | - Stream validation      | ----> | - Distributed storage     |
| - Traffic records        |       | - Schema enforcement     |       | - Data replication       |
| - Weather APIs           |       | - Raw event persistence  |       | - Hadoop filesystem      |
| - Air quality stations  |       |                           |       |                          |
| - Energy meters          |       +--------------------------+       |                          |
+--------------------------+                                     |                          |
                                                                 |                          |
                                                                 v                          v
                                                         +--------------------------+       +--------------------------+
                                                         | MapReduce / Spark       | ----> | Hive / Pig              |
                                                         | - Batch processing      |       | - SQL and query layer   |
                                                         | - Streaming transforms  |       | - Data discovery         |
                                                         +--------------------------+       +--------------------------+
                                                                                  |
                                                                                  v
                                                         +--------------------------+
                                                         | MongoDB                   |
                                                         | - Operational reporting  |
                                                         | - API-ready documents    |
                                                         +--------------------------+
                                                                                  |
                                                                                  v
                                                         +--------------------------+
                                                         | Dashboard                 |
                                                         | - Maps and charts       |
                                                         | - KPI and alerts         |
                                                         +--------------------------+
```

The current Stage 1 implementation provides the synthetic data generator and project scaffolding. The remaining stages will add Hadoop, MapReduce, Pig, Hive, Spark, API, and dashboard integrations.
