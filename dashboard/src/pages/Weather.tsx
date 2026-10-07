import { Activity, CloudSun, ThermometerSun, Zap } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartCard } from '../components/ChartCard'
import { MetricCard } from '../components/MetricCard'
import { PageCard } from '../components/PageCard'
import { mockDashboardSnapshot } from '../data/mockData'
import { weatherMonthly, zones } from '../data/dashboardSeries'

export function WeatherPage() {
  const { weather } = mockDashboardSnapshot

  return (
    <div className="space-y-6">
      <PageCard eyebrow="Atmosphere" title="Weather conditions" description="Mock temperature, visibility, and precipitation trends." icon={<CloudSun className="h-4 w-4" />} accent="bg-sky" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Temperature" value={`${weather.temperature}°C`} change="Stable" icon={CloudSun} tone="violet" />
        <MetricCard label="Humidity" value={`${weather.humidity}%`} change="Normal" icon={Activity} tone="sky" />
        <MetricCard label="Wind speed" value={`${weather.windSpeed} km/h`} change="Light" icon={Zap} tone="emerald" />
        <MetricCard label="Condition" value={weather.condition} change="Observed" icon={ThermometerSun} tone="amber" />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Temperature trend" subtitle="Synthetic monthly averages" icon={<ThermometerSun className="h-4 w-4" />} color="#a78bfa">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weatherMonthly} margin={{ top: 8, right: 8, left: -30, bottom: 0 }}>
              <CartesianGrid stroke="#243247" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#0e1724', border: '1px solid #243247', borderRadius: 12 }} />
              <Line type="monotone" dataKey="average" stroke="#a78bfa" strokeWidth={2.5} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Monthly rainfall" subtitle="Synthetic precipitation index" icon={<CloudSun className="h-4 w-4" />} color="#38bdf8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weatherMonthly} margin={{ top: 8, right: 4, left: -30, bottom: 0 }}>
              <CartesianGrid stroke="#243247" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#0e1724', border: '1px solid #243247', borderRadius: 12 }} />
              <Bar dataKey="rainfall" fill="#38bdf8" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <section className="rounded-3xl border border-white/10 bg-white/[.035] p-5 sm:p-6">
        <div className="mb-4"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Zone temperature</p><h3 className="mt-1 text-lg font-semibold">Mock heatmap values</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead><tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500"><th className="pb-3">Zone</th>{weatherMonthly.map((item) => <th key={item.month} className="pb-3">{item.month}</th>)}</tr></thead>
            <tbody>{zones.map((zone) => <tr key={zone} className="border-b border-white/[.06] last:border-0"><td className="py-3 font-medium text-slate-200">{zone}</td>{weatherMonthly.map((month) => <td key={month.month}>{Math.round((month.average + (zones.indexOf(zone) - 2.5) * 1.8 + (weatherMonthly.indexOf(month) % 3) * 0.4) * 10) / 10}°</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
