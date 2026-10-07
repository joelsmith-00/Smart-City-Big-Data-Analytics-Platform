import { Activity, Gauge, Map, Radio } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartCard } from '../components/ChartCard'
import { MetricCard } from '../components/MetricCard'
import { PageCard } from '../components/PageCard'
import { mockDashboardSnapshot } from '../data/mockData'
import { trafficByZone, trafficHourly, trafficWeekdayWeekend } from '../data/dashboardSeries'

export function TrafficPage() {
  const { traffic } = mockDashboardSnapshot

  return (
    <div className="space-y-6">
      <PageCard eyebrow="Mobility" title="Traffic flow" description="Synthetic movement and congestion signals across the city network." icon={<Activity className="h-4 w-4" />} accent="bg-violet" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Congestion" value={`${traffic.congestion}%`} change="Moderate" icon={Activity} tone="sky" />
        <MetricCard label="Average speed" value={`${traffic.averageSpeed} km/h`} change="4.6%" icon={Gauge} tone="violet" />
        <MetricCard label="Active vehicles" value={traffic.activeVehicles.toLocaleString()} change="Stable" icon={Map} tone="emerald" />
        <MetricCard label="Delay" value={`${traffic.delayMinutes} min`} change="Low" icon={Radio} tone="amber" />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Hourly traffic pressure" subtitle="Synthetic network index" icon={<Activity className="h-4 w-4" />}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trafficHourly} margin={{ top: 8, right: 8, left: -30, bottom: 0 }}>
              <CartesianGrid stroke="#243247" vertical={false} />
              <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#0e1724', border: '1px solid #243247', borderRadius: 12 }} />
              <Line type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="District congestion" subtitle="Synthetic network pressure" icon={<Gauge className="h-4 w-4" />} color="#a78bfa">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trafficByZone} margin={{ top: 8, right: 4, left: -30, bottom: 0 }}>
              <CartesianGrid stroke="#243247" vertical={false} />
              <XAxis dataKey="zone" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#0e1724', border: '1px solid #243247', borderRadius: 12 }} />
              <Bar dataKey="congestion" fill="#a78bfa" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <section className="rounded-3xl border border-white/10 bg-white/[.035] p-5 sm:p-6">
        <div className="mb-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Weekday comparison</p>
          <h3 className="mt-1 text-lg font-semibold">Traffic by day type</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] text-left text-sm">
            <thead><tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500"><th className="pb-3">Day</th><th className="pb-3">Weekday</th><th className="pb-3">Weekend</th></tr></thead>
            <tbody>{trafficWeekdayWeekend.map((item) => <tr key={item.label} className="border-b border-white/[.06] last:border-0"><td className="py-3 font-medium text-slate-200">{item.label}</td><td>{item.weekday}</td><td>{item.weekend}</td></tr>)}</tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
