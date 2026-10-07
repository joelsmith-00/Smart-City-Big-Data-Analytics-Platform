# SmartCity Big Data Dictionary

## Traffic

| Column | Type | Description | Example |
|---|---|---|---|
| timestamp | datetime | UTC timestamp of the traffic observation | 2023-01-01 08:00:00 |
| zone | string | Urban zone name | Central |
| vehicle_count | integer | Number of vehicles observed | 180 |
| avg_speed | float | Average vehicle speed in km/h | 40.75 |
| congestion_index | float | Normalized traffic congestion score | 0.638 |

## Weather

| Column | Type | Description | Example |
|---|---|---|---|
| timestamp | datetime | UTC timestamp of the weather observation | 2023-01-01 08:00:00 |
| zone | string | Urban zone name | North |
| temperature | float | Air temperature in degrees Celsius | 16.42 |
| humidity | float | Relative humidity percentage | 54.70 |
| rainfall_mm | float | Rainfall measured in millimetres | 2.30 |

## Air Quality

| Column | Type | Description | Example |
|---|---|---|---|
| timestamp | datetime | UTC timestamp of the air-quality observation | 2023-01-01 08:00:00 |
| zone | string | Urban zone name | Industrial |
| pm25 | float | Fine particulate matter concentration in µg/m³ | 23.10 |
| pm10 | float | Coarse particulate matter concentration in µg/m³ | 41.80 |
| no2 | float | Nitrogen dioxide concentration in ppb | 31.50 |
| so2 | float | Sulfur dioxide concentration in ppb | 6.40 |
| co | float | Carbon monoxide concentration in ppm | 0.80 |
| o3 | float | Ozone concentration in ppb | 52.20 |
| aqi | integer | Air Quality Index | 118 |

## Energy

| Column | Type | Description | Example |
|---|---|---|---|
| timestamp | datetime | UTC timestamp of the energy observation | 2023-01-01 08:00:00 |
| zone | string | Urban zone name | Industrial |
| consumption_kwh | float | Energy consumed during the interval in kWh | 142.60 |
| peak_load_mw | float | Peak electrical load in MW | 11.30 |

## Emergency

| Column | Type | Description | Example |
|---|---|---|---|
| incident_id | integer | Unique identifier assigned to the incident | 1 |
| timestamp | datetime | UTC timestamp of the incident | 2023-01-01 08:00:00 |
| zone | string | Urban zone affected by the incident | Central |
| type | string | Incident category | medical |
| severity | string | Incident severity | high |
| response_time_min | integer | Time taken to respond in minutes | 12 |
