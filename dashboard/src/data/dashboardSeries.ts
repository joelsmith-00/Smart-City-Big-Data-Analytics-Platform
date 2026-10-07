import type { DateFilter, ZoneFilter } from '../components/DashboardFiltersContext'

export const zones = ['North', 'Central', 'South', 'East', 'West', 'Industrial'] as const

export const trafficHourly = [
  { hour: '00:00', value: 22 }, { hour: '04:00', value: 18 }, { hour: '08:00', value: 46 },
  { hour: '12:00', value: 58 }, { hour: '16:00', value: 82 }, { hour: '20:00', value: 72 },
]

export const trafficByZone = [
  { zone: 'North', congestion: 42, delay: 4.2 },
  { zone: 'Central', congestion: 68, delay: 7.4 },
  { zone: 'South', congestion: 51, delay: 5.6 },
  { zone: 'East', congestion: 78, delay: 10.3 },
  { zone: 'West', congestion: 59, delay: 6.1 },
  { zone: 'Industrial', congestion: 72, delay: 8.8 },
]

export const trafficWeekdayWeekend = [
  { label: 'Mon', weekday: 62, weekend: 48 }, { label: 'Tue', weekday: 68, weekend: 54 },
  { label: 'Wed', weekday: 64, weekend: 49 }, { label: 'Thu', weekday: 74, weekend: 57 },
  { label: 'Fri', weekday: 80, weekend: 61 }, { label: 'Sat', weekday: 58, weekend: 44 },
  { label: 'Sun', weekday: 52, weekend: 39 },
]

export const weatherMonthly = [
  { month: 'Jan', average: 16, minimum: 8, maximum: 24, rainfall: 72 },
  { month: 'Feb', average: 18, minimum: 9, maximum: 27, rainfall: 58 },
  { month: 'Mar', average: 21, minimum: 12, maximum: 30, rainfall: 43 },
  { month: 'Apr', average: 24, minimum: 15, maximum: 34, rainfall: 35 },
  { month: 'May', average: 27, minimum: 18, maximum: 38, rainfall: 28 },
  { month: 'Jun', average: 30, minimum: 21, maximum: 41, rainfall: 22 },
  { month: 'Jul', average: 33, minimum: 24, maximum: 45, rainfall: 18 },
  { month: 'Aug', average: 32, minimum: 23, maximum: 43, rainfall: 24 },
  { month: 'Sep', average: 29, minimum: 20, maximum: 39, rainfall: 31 },
  { month: 'Oct', average: 25, minimum: 16, maximum: 34, rainfall: 48 },
  { month: 'Nov', average: 20, minimum: 11, maximum: 28, rainfall: 62 },
  { month: 'Dec', average: 17, minimum: 8, maximum: 24, rainfall: 77 },
]

export const weatherHeatmap = zones.map((zone, zoneIndex) =>
  weatherMonthly.map((month, monthIndex) => ({
    zone,
    month: month.month,
    temperature: Math.round((month.average + (zoneIndex - 2.5) * 1.8 + (monthIndex % 3) * 0.4) * 10) / 10,
  })),
)

export const airQualityByZone = [
  { zone: 'North', aqi: 42, category: 'Good' },
  { zone: 'Central', aqi: 74, category: 'Moderate' },
  { zone: 'South', aqi: 96, category: 'Moderate' },
  { zone: 'East', aqi: 138, category: 'Unhealthy for sensitive groups' },
  { zone: 'West', aqi: 112, category: 'Unhealthy for sensitive groups' },
  { zone: 'Industrial', aqi: 216, category: 'Unhealthy' },
]

export const airQualityHourly = [
  { hour: '00:00', aqi: 38 }, { hour: '04:00', aqi: 44 }, { hour: '08:00', aqi: 64 },
  { hour: '12:00', aqi: 82 }, { hour: '16:00', aqi: 118 }, { hour: '20:00', aqi: 71 },
]

export const pollutants = [
  { pollutant: 'PM2.5', value: 18, full: 18 },
  { pollutant: 'PM10', value: 31, full: 31 },
  { pollutant: 'NO₂', value: 26, full: 26 },
  { pollutant: 'SO₂', value: 8, full: 8 },
  { pollutant: 'CO', value: 14, full: 14 },
  { pollutant: 'O₃', value: 42, full: 42 },
]

export const dateRangeFactor = (range: DateFilter) => ({ 'Last 7 days': 0.72, 'Last 30 days': 1, 'Last 90 days': 1.3 }[range])

export const filterSeries = (zone: ZoneFilter, dateRange: DateFilter) => {
  const factor = dateRangeFactor(dateRange)
  const selectedZone = zone === 'All zones' ? null : zone
  return {
    trafficByZone: trafficByZone.map((item) => ({ ...item, congestion: Math.round(item.congestion * factor) })),
    trafficHourly: trafficHourly.map((item) => ({ ...item, value: Math.round(item.value * factor) })),
    weatherMonthly: weatherMonthly.map((item) => ({ ...item, average: Math.round(item.average * factor * 10) / 10 })),
    airQualityByZone: airQualityByZone.map((item) => ({ ...item, aqi: Math.round(item.aqi * factor) })),
    selectedZone,
  }
}
