import { useMemo, useState } from 'react'
import { BellRing, Filter, Radio, Search } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartCard } from '../components/ChartCard'
import { PageCard } from '../components/PageCard'

const alerts = [
  { id: 'A-1001', title: 'Traffic delay detected', severity: 'warning' as const, zone: 'North', type: 'Traffic', timestamp: '2026-10-07 16:42', value: 18 },
  { id: 'A-1002', title: 'Air quality threshold exceeded', severity: 'critical' as const, zone: 'Industrial', type: 'Air Quality', timestamp: '2026-10-07 16:31', value: 31 },
  { id: 'A-1003', title: 'Energy demand spike', severity: 'warning' as const, zone: 'West', type: 'Energy', timestamp: '2026-10-07 15:58', value: 25 },
  { id: 'A-1004', title: 'System health recovered', severity: 'info' as const, zone: 'Central', type: 'System', timestamp: '2026-10-07 15:20', value: 8 },
]
const anomalyTimeline = [
  { time: '08:00', value: 8 }, { time: '09:00', value: 12 }, { time: '10:00', value: 10 },
  { time: '11:00', value: 18 }, { time: '12:00', value: 24 }, { time: '13:00', value: 20 },
]
const severityStyles = { critical: 'border-coral/30 bg-coral/10 text-coral', warning: 'border-amber-400/30 bg-amber-400/10 text-amber-300', info: 'border-sky/30 bg-sky/10 text-sky' }

export function AlertsPage() {
  const [severity, setSeverity] = useState('All')
  const [zone, setZone] = useState('All')
  const [type, setType] = useState('All')
  const filteredAlerts = useMemo(() => alerts.filter((alert) => (severity === 'All' || alert.severity === severity) && (zone === 'All' || alert.zone === zone) && (type === 'All' || alert.type === type)), [severity, zone, type])

  return (
    <div className="space-y-6">
      <PageCard eyebrow="Notification center" title="City alerts" description="Mock operational alerts, incident status, and system events." icon={<Radio className="h-4 w-4" />} accent="bg-coral" />
      <section className="rounded-3xl border border-white/10 bg-white/[.035] p-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 font-medium"><Filter className="h-4 w-4 text-coral" /> Filter alerts</div>
          <label className="min-w-40 flex-1 text-xs text-slate-500">Severity<select value={severity} onChange={(event) => setSeverity(event.target.value)} className="mt-1 h-10 w-full rounded-xl border border-white/10 bg-ink px-3 text-slate-200 outline-none"><option>All</option><option value="critical">Critical</option><option value="warning">Warning</option><option value="info">Info</option></select></label>
          <label className="min-w-40 flex-1 text-xs text-slate-500">Zone<select value={zone} onChange={(event) => setZone(event.target.value)} className="mt-1 h-10 w-full rounded-xl border border-white/10 bg-ink px-3 text-slate-200 outline-none"><option>All</option><option>North</option><option>Central</option><option>West</option><option>Industrial</option></select></label>
          <label className="min-w-40 flex-1 text-xs text-slate-500">Type<select value={type} onChange={(event) => setType(event.target.value)} className="mt-1 h-10 w-full rounded-xl border border-white/10 bg-ink px-3 text-slate-200 outline-none"><option>All</option><option>Traffic</option><option>Air Quality</option><option>Energy</option><option>System</option></select></label>
        </div>
      </section>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <section className="rounded-3xl border border-white/10 bg-white/[.035] p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Event stream</p><h3 className="mt-1 text-lg font-semibold">Filtered alerts</h3></div><span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">{filteredAlerts.length} shown</span></div>
          <div className="space-y-3">
            {filteredAlerts.map((alert) => <article key={alert.id} className="rounded-2xl border border-white/10 bg-ink/30 p-4 transition hover:border-white/20"><div className="flex flex-wrap items-start justify-between gap-3"><div className="flex gap-3"><span className={`mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-xl border ${severityStyles[alert.severity]}`}><BellRing className="h-4 w-4" /></span><div><h4 className="font-medium text-slate-100">{alert.title}</h4><p className="mt-1 text-xs text-slate-500">{alert.id} · {alert.zone} · {alert.type}</p></div></div><time className="text-xs text-slate-500">{alert.timestamp}</time></div></article>)}
            {filteredAlerts.length === 0 && <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-slate-500">No alerts match the selected filters.</div>}
          </div>
        </section>
        <ChartCard title="Anomaly timeline" subtitle="Synthetic incident signal" icon={<Search className="h-4 w-4" />} color="#f87171">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={anomalyTimeline} margin={{ top: 8, right: 8, left: -30, bottom: 0 }}>
              <defs><linearGradient id="alertGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f87171" stopOpacity={0.45} /><stop offset="100%" stopColor="#f87171" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid stroke="#243247" vertical={false} />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#0e1724', border: '1px solid #243247', borderRadius: 12 }} />
              <Area type="monotone" dataKey="value" stroke="#f87171" fill="url(#alertGradient)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
