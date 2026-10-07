import { AlertTriangle, Clock3, MapPin, ShieldAlert, Siren } from 'lucide-react'
import { ChartCard } from '../components/ChartCard'
import { MetricCard } from '../components/MetricCard'
import { PageCard } from '../components/PageCard'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const incidentTypes = [
  { type: 'Traffic', count: 12, severity: 'warning' },
  { type: 'Medical', count: 7, severity: 'info' },
  { type: 'Utilities', count: 5, severity: 'warning' },
  { type: 'Environment', count: 3, severity: 'critical' },
]
const responseByZone = [
  { zone: 'North', minutes: 8 }, { zone: 'Central', minutes: 6 }, { zone: 'South', minutes: 11 },
  { zone: 'East', minutes: 14 }, { zone: 'West', minutes: 7 }, { zone: 'Industrial', minutes: 9 },
]

export function EmergencyPage() {
  return (
    <div className="space-y-6">
      <PageCard eyebrow="Safety" title="Emergency readiness" description="Mock incident readiness and response system indicators." icon={<ShieldAlert className="h-4 w-4" />} accent="bg-coral" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Active incidents" value="27" change="Monitor" icon={Siren} tone="coral" />
        <MetricCard label="Response time" value="8.6 min" change="Target" icon={Clock3} tone="amber" />
        <MetricCard label="Ready units" value="94%" change="Stable" icon={ShieldAlert} tone="emerald" />
        <MetricCard label="Critical zones" value="2" change="Review" icon={MapPin} tone="violet" />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Incident mix" subtitle="Synthetic event distribution" icon={<AlertTriangle className="h-4 w-4" />} color="#f87171">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={incidentTypes} margin={{ top: 8, right: 4, left: -30, bottom: 0 }}>
              <CartesianGrid stroke="#243247" vertical={false} />
              <XAxis dataKey="type" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#0e1724', border: '1px solid #243247', borderRadius: 12 }} />
              <Bar dataKey="count" fill="#f87171" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Response time" subtitle="Synthetic district response profile" icon={<Clock3 className="h-4 w-4" />} color="#fbbf24">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={responseByZone} margin={{ top: 8, right: 4, left: -30, bottom: 0 }}>
              <CartesianGrid stroke="#243247" vertical={false} />
              <XAxis dataKey="zone" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#0e1724', border: '1px solid #243247', borderRadius: 12 }} />
              <Bar dataKey="minutes" fill="#fbbf24" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <section className="rounded-3xl border border-white/10 bg-white/[.035] p-5 sm:p-6">
        <div className="mb-4"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Readiness queue</p><h3 className="mt-1 text-lg font-semibold">Mock readiness events</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead><tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500"><th className="pb-3">Incident</th><th className="pb-3">Zone</th><th className="pb-3">Severity</th><th className="pb-3">Response</th></tr></thead>
            <tbody>{incidentTypes.map((incident) => <tr key={incident.type} className="border-b border-white/[.06] last:border-0"><td className="py-3 font-medium text-slate-200">{incident.type}</td><td>Central</td><td><span className="rounded-full bg-amber-400/10 px-2 py-1 text-amber-300">{incident.severity}</span></td><td>{incident.count} events</td></tr>)}</tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
