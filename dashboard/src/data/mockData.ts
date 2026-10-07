import type { DashboardSnapshot } from '../types/dashboard'

export const mockDashboardSnapshot: DashboardSnapshot = {
  traffic: {
    congestion: 68,
    averageSpeed: 31,
    activeVehicles: 18420,
    delayMinutes: 7.4,
  },
  weather: {
    temperature: 24.8,
    humidity: 58,
    windSpeed: 11.2,
    condition: 'Partly cloudy',
  },
  airQuality: {
    pm25: 18,
    pm10: 31,
    no2: 26,
    quality: 'Good',
  },
  energy: {
    demand: 812,
    renewableShare: 64,
    gridLoad: 71,
  },
}

export const mockAlerts = [
  { id: 'A-1001', title: 'Traffic delay detected', severity: 'warning' as const, location: 'North District' },
  { id: 'A-1002', title: 'Air quality within target', severity: 'info' as const, location: 'Central District' },
]
