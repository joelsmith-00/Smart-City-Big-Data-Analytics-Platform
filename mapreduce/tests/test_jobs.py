import csv
import pathlib
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]


def run_job(job_dir: str, input_text: str) -> str:
    mapper = ROOT / "mapreduce" / job_dir / "mapper.py"
    reducer = ROOT / "mapreduce" / job_dir / "reducer.py"
    mapped = subprocess.run(
        [sys.executable, str(mapper)],
        input=input_text,
        text=True,
        capture_output=True,
        check=True,
    ).stdout
    reduced = subprocess.run(
        [sys.executable, str(reducer)],
        input=mapped,
        text=True,
        capture_output=True,
        check=True,
    ).stdout
    return reduced


def test_job1_averages_valid_traffic_records():
    input_text = (
        "timestamp,zone,vehicle_count\n"
        "2023-01-01 00:00:00,Central,10\n"
        "2023-01-01 01:00:00,Central,20\n"
        "2023-01-01 00:00:00,Urban,30\n"
        "bad-row\n"
    )
    assert run_job("job1_avg_traffic", input_text).splitlines() == [
        "Central\t15.000000",
        "Urban\t30.000000",
    ]


def test_job2_selects_peak_hour_by_average():
    input_text = (
        "timestamp,zone,vehicle_count\n"
        "2023-01-01 00:00:00,Central,10\n"
        "2023-01-01 01:00:00,Central,20\n"
        "2023-01-01 00:00:00,Central,30\n"
        "2023-01-01 01:00:00,Central,40\n"
        "2023-01-01 00:00:00,Urban,5\n"
    )
    assert run_job("job2_peak_hour", input_text).splitlines() == [
        "Central\t1\t30.000000",
        "Urban\t0\t5.000000",
    ]


def test_job3_computes_monthly_temperature_statistics():
    input_text = (
        "timestamp,zone,temperature\n"
        "2023-01-01 00:00:00,Central,10\n"
        "2023-01-02 00:00:00,Central,20\n"
        "2023-01-01 00:00:00,Urban,5\n"
        "2023-02-01 00:00:00,Urban,not-a-number\n"
    )
    assert run_job("job3_temp_stats", input_text).splitlines() == [
        "Central\t2023-01\t10.000000\t20.000000\t15.000000",
        "Urban\t2023-01\t5.000000\t5.000000\t5.000000",
    ]
