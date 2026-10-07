import { BatteryCharging, Bolt, Leaf, Zap } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartCard } from '../components/ChartCard'
import { MetricCard } from '../components/MetricCard'
import { PageCard } from '../components/PageCard'
import { mockDashboardSnapshot } from '../data/mockData'

const energyByDistrict = [
  { district: 'North', load: 67 }, { district: 'Central', load: 82 }, { district: 'South', load: 58 },
  { district: 'East', load: 73 }, { district: 'West', load: 88 }, { district: 'Industrial', load: 94 },
]
const energyHourly = [
  { hour: '00:00', demand: 522 }, { hour: '04:00', demand: 490 }, { hour: '08:00', demand: 684 },
  { hour: '12:00', demand: 786 }, { hour: '16:00', demand: 902 }, { hour: '20:00', demand: 813 },
]

export function EnergyPage() {
  const { energy } = mockDashboardSnapshot

  return (
    <div className="space-y-6">
      <PageCard eyebrow="Infrastructure" title="Energy consumption" description="Mock energy demand and district distribution telemetry." icon={<Zap className="h-4 w-4" />} accent="bg-amber-400" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Demand" value={`${energy.demand} MW`} change="Stable" icon={Bolt} tone="amber" />
        <MetricCard label="Renewable share" value={`${energy.renewableShare}%`} change="Rising" icon={Leaf} tone="emerald" />
        <MetricCard label="Grid load" value={`${energy.gridLoad}%`} change="Normal" icon={BatteryCharging} tone="violet" />
        <MetricCard label="Peak window" value="16:00" change="Observed" icon={Zap} tone="sky" />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Hourly demand" subtitle="Synthetic megawatt profile" icon={<Bolt className="h-4 w-4" />} color="#fbbf24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={energyHourly} margin={{ top: 8, right: 8, left: -30, bottom: 0 }}>
              <CartesianGrid stroke="#243247" vertical={false} />
              <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#0e1724', border: '1px solid #243247', borderRadius: 12 }} />
              <Line type="monotone" dataKey="demand" stroke="#fbbf24" strokeWidth={2.5} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="District load" subtitle="Synthetic distribution by zone" icon={<BatteryCharging className="h-4 w-4" />} color="#34d399">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={energyByDistrict} margin={{ top: 8, right: 4, left: -30, bottom: 0 }}>
              <CartesianGrid stroke="#243247" vertical={false} />
              <XAxis dataKey="district" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#0e1724', border: '1px solid #243247', borderRadius: 12 }} />
              <Bar dataKey="load" fill="#34d399" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
