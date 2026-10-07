export type DataSource = 'mock' | 'api'

export interface CityMetric {
  id: string
  label: string
  value: string
  change: string
  direction: 'up' | 'down' | 'neutral'
}

export interface TrafficSnapshot {
  congestion: number
  averageSpeed: number
  activeVehicles: number
  delayMinutes: number
}

export interface WeatherSnapshot {
  temperature: number
  humidity: number
  windSpeed: number
  condition: string
}

export interface AirQualitySnapshot {
  pm25: number
  pm10: number
  no2: number
  quality: string
}

export interface EnergySnapshot {
  demand: number
  renewableShare: number
  gridLoad: number
}

export interface DashboardSnapshot {
  traffic: TrafficSnapshot
  weather: WeatherSnapshot
  airQuality: AirQualitySnapshot
  energy: EnergySnapshot
}
