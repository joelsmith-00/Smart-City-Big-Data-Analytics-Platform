import { motion } from 'framer-motion'
import { Activity, Boxes, ChevronRight, CloudCog, Database, Gauge, Network, Server, Sparkles } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartCard } from '../components/ChartCard'
import { MetricCard } from '../components/MetricCard'
import { PageCard } from '../components/PageCard'

const stages = ['Data', 'Ingestion', 'HDFS', 'MapReduce / Spark', 'Hive / Pig', 'MongoDB', 'Dashboard']
const benchmark = [
  { engine: 'MapReduce', value: 46 }, { engine: 'Hive', value: 68 }, { engine: 'Spark', value: 82 },
]
const statuses = [
  { name: 'HDFS', value: 'Healthy', detail: '3 NameNodes · 8 DataNodes', icon: Server },
  { name: 'YARN', value: 'Running', detail: '2 NodeManagers · 76% capacity', icon: Network },
]

export function PipelinePage() {
  return (
    <div className="space-y-6">
      <PageCard eyebrow="Data engineering" title="Data pipeline" description="Mock ingestion, transformation, and orchestration health signals." icon={<Database className="h-4 w-4" />} accent="bg-sky" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Processed" value="2.4 TB" change="Today" icon={Boxes} tone="sky" />
        <MetricCard label="Jobs completed" value="1,284" change="Success" icon={Activity} tone="emerald" />
        <MetricCard label="Latency" value="14 ms" change="Optimal" icon={Gauge} tone="violet" />
        <MetricCard label="Events" value="8.2M" change="Mock" icon={Sparkles} tone="amber" />
      </div>
      <section className="rounded-3xl border border-white/10 bg-white/[.035] p-5 sm:p-6">
        <div className="mb-6"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Architecture flow</p><h3 className="mt-1 text-lg font-semibold">Animated data journey</h3></div>
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2">
          {stages.map((stage, index) => <div key={stage} className="flex min-w-max items-center gap-2"><motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="rounded-2xl border border-sky/20 bg-sky/10 px-4 py-3 text-sm font-medium text-sky">{stage}</motion.div>{index < stages.length - 1 && <ChevronRight className="h-4 w-4 text-slate-600" />}</div>)}
        </div>
      </section>
      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-white/[.035] p-5 sm:p-6">
          <h3 className="text-lg font-semibold">Cluster status</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">{statuses.map(({ name, value, detail, icon: Icon }) => <div key={name} className="rounded-2xl border border-white/10 bg-ink/30 p-4"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300"><Icon className="h-4 w-4" /></span><div><p className="font-medium">{name}</p><p className="text-xs text-slate-500">{detail}</p></div></div><span className="mt-4 inline-flex rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-emerald-300">{value}</span></div>)}</div>
        </section>
        <ChartCard title="Benchmark comparison" subtitle="Mock performance index" icon={<Gauge className="h-4 w-4" />} color="#a78bfa">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={benchmark} margin={{ top: 8, right: 4, left: -30, bottom: 0 }}>
              <CartesianGrid stroke="#243247" vertical={false} />
              <XAxis dataKey="engine" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#0e1724', border: '1px solid #243247', borderRadius: 12 }} />
              <Bar dataKey="value" fill="#a78bfa" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <section className="rounded-3xl border border-white/10 bg-[#080d18] p-5 sm:p-6">
        <div className="flex items-center gap-2"><CloudCog className="h-4 w-4 text-sky" /><h3 className="font-semibold">Sample Hive query</h3></div>
        <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black/20 p-5 font-mono text-xs leading-6 text-slate-300"><code>{`SELECT zone, AVG(air_quality) AS avg_aqi
FROM sensor_data
WHERE timestamp >= CURRENT_DATE - INTERVAL 7 DAY
GROUP BY zone
ORDER BY avg_aqi DESC;`}</code></pre>
      </section>
    </div>
  )
}
