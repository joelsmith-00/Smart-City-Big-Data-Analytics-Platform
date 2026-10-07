import { motion } from 'framer-motion'
import { Activity, CloudSun, Database, Gauge, Map, Radio, ShieldAlert, Sparkles, ThermometerSun, Zap } from 'lucide-react'
import type { ReactNode } from 'react'
import { ChartCard } from '../components/ChartCard'
import { MetricCard } from '../components/MetricCard'
import { StatusPill } from '../components/StatusPill'
import { mockDashboardSnapshot } from '../data/mockData'

interface PageProps {
  eyebrow: string
  title: string
  description: string
  icon: ReactNode
  accent: string
}

function PageCard({ eyebrow, title, description, icon, accent }: PageProps) {
  return (
    <motion.section
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[.035] p-6 shadow-glow sm:p-8"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className={`absolute -right-16 -top-20 h-56 w-56 rounded-full opacity-20 blur-3xl ${accent}`} />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
            <span className="text-sky">{icon}</span>
            {eyebrow}
          </div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Mock connected
        </div>
      </div>
      <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
        <Metric label="Current value" value="—" />
        <Metric label="Change" value="—" />
        <Metric label="Dataset" value="Synthetic" />
      </div>
    </motion.section>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-semibold text-slate-100">{value}</p>
    </div>
  )
}

export function OverviewPage() {
  const { traffic, weather, airQuality, energy } = mockDashboardSnapshot
  const trafficData = [
    { label: '06:00', value: 42 },
    { label: '08:00', value: 68 },
    { label: '12:00', value: 55 },
    { label: '16:00', value: 77 },
    { label: '20:00', value: 48 },
  ]

  return (
    <div className="space-y-6">
      <PageCard eyebrow="City intelligence" title="Urban operations at a glance" description="A live, mock-only view of the city’s critical signals and system health." icon={<Gauge className="h-4 w-4" />} accent="bg-sky" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Traffic speed" value={`${traffic.averageSpeed} km/h`} change="4.6%" icon={Activity} tone="sky" />
        <MetricCard label="Weather" value={`${weather.temperature}°C`} change="Stable" icon={CloudSun} tone="violet" />
        <MetricCard label="Air quality" value={airQuality.quality} change={`${airQuality.pm25} PM2.5`} icon={ThermometerSun} tone="emerald" />
        <MetricCard label="Grid load" value={`${energy.gridLoad}%`} change="Normal" icon={Zap} tone="amber" />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Traffic congestion" subtitle="Hourly network pressure" data={trafficData} icon={<Activity className="h-4 w-4" />} />
        <ChartCard title="Energy demand" subtitle="Synthetic district load" data={[{ label: 'A', value: 55 }, { label: 'B', value: 69 }, { label: 'C', value: 62 }, { label: 'D', value: 78 }, { label: 'E', value: 73 }]} icon={<Zap className="h-4 w-4" />} color="#a78bfa" />
      </div>
      <div className="flex flex-wrap gap-3">
        <StatusPill status="healthy" label="System healthy" />
        <StatusPill status="warning" label="North district delay" />
      </div>
    </div>
  )
}
export function TrafficPage() {
  const { traffic } = mockDashboardSnapshot
  const trafficSeries = [
    { label: 'North', value: 43 },
    { label: 'Central', value: 62 },
    { label: 'South', value: 51 },
    { label: 'East', value: 78 },
    { label: 'West', value: 68 },
  ]

  return (
    <div className="space-y-6">
      <PageCard eyebrow="Mobility" title="Traffic flow" description="Synthetic movement and congestion signals across the city network." icon={<Activity className="h-4 w-4" />} accent="bg-violet" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Congestion" value={`${traffic.congestion}%`} change="Moderate" icon={Activity} tone="sky" />
        <MetricCard label="Average speed" value={`${traffic.averageSpeed} km/h`} change="4.6%" icon={Gauge} tone="violet" />
        <MetricCard label="Active vehicles" value={traffic.activeVehicles.toLocaleString()} change="Stable" icon={Map} tone="emerald" />
        <MetricCard label="Delay" value={`${traffic.delayMinutes} min`} change="Low" icon={Radio} tone="amber" />
      </div>
      <ChartCard title="District congestion" subtitle="Synthetic network pressure" data={trafficSeries} icon={<Activity className="h-4 w-4" />} />
    </div>
  )
}

export function WeatherPage() {
  const { weather } = mockDashboardSnapshot
  const weatherSeries = [
    { label: '06:00', value: 20 },
    { label: '09:00', value: 22 },
    { label: '12:00', value: 25 },
    { label: '15:00', value: 27 },
    { label: '18:00', value: 24 },
  ]

  return (
    <div className="space-y-6">
      <PageCard eyebrow="Atmosphere" title="Weather conditions" description="Mock temperature, visibility, and precipitation trends." icon={<CloudSun className="h-4 w-4" />} accent="bg-sky" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Temperature" value={`${weather.temperature}°C`} change="Stable" icon={CloudSun} tone="violet" />
        <MetricCard label="Humidity" value={`${weather.humidity}%`} change="Normal" icon={Activity} tone="sky" />
        <MetricCard label="Wind speed" value={`${weather.windSpeed} km/h`} change="Light" icon={Zap} tone="emerald" />
        <MetricCard label="Condition" value={weather.condition} change="Observed" icon={ThermometerSun} tone="amber" />
      </div>
      <ChartCard title="Temperature trend" subtitle="Synthetic hourly conditions" data={weatherSeries} icon={<CloudSun className="h-4 w-4" />} color="#a78bfa" />
    </div>
  )
}

export function AirQualityPage() {
  const { airQuality } = mockDashboardSnapshot
  const airQualitySeries = [
    { label: 'PM2.5', value: airQuality.pm25 },
    { label: 'PM10', value: airQuality.pm10 },
    { label: 'NO₂', value: airQuality.no2 },
  ]

  return (
    <div className="space-y-6">
      <PageCard eyebrow="Environment" title="Air quality" description="Synthetic pollutant readings and urban exposure indicators." icon={<ThermometerSun className="h-4 w-4" />} accent="bg-emerald-400" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="PM2.5" value={`${airQuality.pm25} µg/m³`} change="Good" icon={ThermometerSun} tone="emerald" />
        <MetricCard label="PM10" value={`${airQuality.pm10} µg/m³`} change="Within target" icon={Activity} tone="sky" />
        <MetricCard label="NO₂" value={`${airQuality.no2} ppb`} change="Moderate" icon={Gauge} tone="violet" />
        <MetricCard label="Quality" value={airQuality.quality} change="Healthy" icon={ShieldAlert} tone="amber" />
      </div>
      <ChartCard title="Pollutant readings" subtitle="Synthetic urban concentration" data={airQualitySeries} icon={<ThermometerSun className="h-4 w-4" />} color="#34d399" />
    </div>
  )
}
export function EnergyPage() {
  return <PageCard eyebrow="Infrastructure" title="Energy consumption" description="Mock energy demand and district distribution telemetry." icon={<Zap className="h-4 w-4" />} accent="bg-amber-400" />
}
export function EmergencyPage() {
  return <PageCard eyebrow="Safety" title="Emergency readiness" description="Mock incident readiness and response system indicators." icon={<ShieldAlert className="h-4 w-4" />} accent="bg-coral" />
}
export function CityMapPage() {
  return <PageCard eyebrow="Geospatial layer" title="Interactive city map" description="A mock map surface for district, sensor, and infrastructure visibility." icon={<Map className="h-4 w-4" />} accent="bg-sky" />
}
export function PredictionsPage() {
  return <PageCard eyebrow="Forecasting" title="Predictive intelligence" description="Synthetic forecasts for demand, congestion, and environmental risk." icon={<Sparkles className="h-4 w-4" />} accent="bg-violet" />
}
export function AlertsPage() {
  return <PageCard eyebrow="Notification center" title="City alerts" description="Mock operational alerts, incident status, and system events." icon={<Radio className="h-4 w-4" />} accent="bg-coral" />
}
export function PipelinePage() {
  return <PageCard eyebrow="Data engineering" title="Data pipeline" description="Mock ingestion, transformation, and orchestration health signals." icon={<Database className="h-4 w-4" />} accent="bg-sky" />
}
