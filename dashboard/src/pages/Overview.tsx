import { Activity, CloudSun, Gauge, ThermometerSun, Zap } from 'lucide-react'
import { ChartCard } from '../components/ChartCard'
import { MetricCard } from '../components/MetricCard'
import { StatusPill } from '../components/StatusPill'
import { mockDashboardSnapshot } from '../data/mockData'
import { PageCard } from '../components/PageCard'

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
