import { Activity, Gauge, ShieldAlert, ThermometerSun } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartCard } from '../components/ChartCard'
import { MetricCard } from '../components/MetricCard'
import { PageCard } from '../components/PageCard'
import { mockDashboardSnapshot } from '../data/mockData'
import { airQualityByZone, airQualityHourly, pollutants } from '../data/dashboardSeries'

export function AirQualityPage() {
  const { airQuality } = mockDashboardSnapshot

  return (
    <div className="space-y-6">
      <PageCard eyebrow="Environment" title="Air quality" description="Synthetic pollutant readings and urban exposure indicators." icon={<ThermometerSun className="h-4 w-4" />} accent="bg-emerald-400" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="PM2.5" value={`${airQuality.pm25} µg/m³`} change="Good" icon={ThermometerSun} tone="emerald" />
        <MetricCard label="PM10" value={`${airQuality.pm10} µg/m³`} change="Within target" icon={Activity} tone="sky" />
        <MetricCard label="NO₂" value={`${airQuality.no2} ppb`} change="Moderate" icon={Gauge} tone="violet" />
        <MetricCard label="Quality" value={airQuality.quality} change="Healthy" icon={ShieldAlert} tone="amber" />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Hourly AQI" subtitle="Synthetic urban exposure" icon={<Activity className="h-4 w-4" />} color="#34d399">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={airQualityHourly} margin={{ top: 8, right: 8, left: -30, bottom: 0 }}>
              <CartesianGrid stroke="#243247" vertical={false} />
              <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#0e1724', border: '1px solid #243247', borderRadius: 12 }} />
              <Line type="monotone" dataKey="aqi" stroke="#34d399" strokeWidth={2.5} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="AQI by district" subtitle="Synthetic zone comparison" icon={<Gauge className="h-4 w-4" />} color="#f59e0b">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={airQualityByZone} margin={{ top: 8, right: 4, left: -30, bottom: 0 }}>
              <CartesianGrid stroke="#243247" vertical={false} />
              <XAxis dataKey="zone" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#0e1724', border: '1px solid #243247', borderRadius: 12 }} />
              <Bar dataKey="aqi" fill="#f59e0b" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <section className="rounded-3xl border border-white/10 bg-white/[.035] p-5 sm:p-6">
        <div className="mb-4"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Pollutant details</p><h3 className="mt-1 text-lg font-semibold">Synthetic composition</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead><tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500"><th className="pb-3">Pollutant</th><th className="pb-3">Current value</th><th className="pb-3">Full-scale value</th></tr></thead>
            <tbody>{pollutants.map((item) => <tr key={item.pollutant} className="border-b border-white/[.06] last:border-0"><td className="py-3 font-medium text-slate-200">{item.pollutant}</td><td>{item.value}</td><td>{item.full}</td></tr>)}</tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
