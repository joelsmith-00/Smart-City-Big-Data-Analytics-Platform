import { Activity, BrainCircuit, Gauge, Sparkles, Target } from 'lucide-react'
import { CartesianGrid, Line, LineChart, Scatter, ScatterChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartCard } from '../components/ChartCard'
import { MetricCard } from '../components/MetricCard'
import { PageCard } from '../components/PageCard'

const actualVsPredicted = [
  { time: '06:00', actual: 42, predicted: 40 }, { time: '08:00', actual: 68, predicted: 65 },
  { time: '10:00', actual: 55, predicted: 58 }, { time: '12:00', actual: 77, predicted: 74 },
  { time: '14:00', actual: 83, predicted: 81 }, { time: '16:00', actual: 91, predicted: 88 },
]
const hotspotClusters = [
  { cluster: 'A', x: 18, y: 24 }, { cluster: 'A', x: 22, y: 26 }, { cluster: 'A', x: 20, y: 30 },
  { cluster: 'B', x: 52, y: 38 }, { cluster: 'B', x: 58, y: 42 }, { cluster: 'B', x: 54, y: 45 },
  { cluster: 'C', x: 86, y: 68 }, { cluster: 'C', x: 91, y: 72 }, { cluster: 'C', x: 88, y: 76 },
]

export function PredictionsPage() {
  return (
    <div className="space-y-6">
      <PageCard eyebrow="Forecasting" title="Predictive intelligence" description="Synthetic forecasts for demand, congestion, and environmental risk." icon={<Sparkles className="h-4 w-4" />} accent="bg-violet" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="RMSE" value="5.8" change="Improved" icon={Gauge} tone="sky" />
        <MetricCard label="R²" value="0.94" change="High confidence" icon={Target} tone="emerald" />
        <MetricCard label="MAE" value="4.2" change="Low error" icon={Activity} tone="violet" />
        <MetricCard label="Model" value="XGBoost" change="Mock" icon={BrainCircuit} tone="amber" />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Actual vs predicted traffic" subtitle="Hourly prediction comparison" icon={<Activity className="h-4 w-4" />}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={actualVsPredicted} margin={{ top: 8, right: 8, left: -30, bottom: 0 }}>
              <CartesianGrid stroke="#243247" vertical={false} />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#0e1724', border: '1px solid #243247', borderRadius: 12 }} />
              <Line dataKey="actual" stroke="#38bdf8" strokeWidth={2.5} name="Actual" />
              <Line dataKey="predicted" stroke="#a78bfa" strokeWidth={2.5} name="Predicted" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="KMeans pollution hotspots" subtitle="Synthetic cluster scatter" icon={<BrainCircuit className="h-4 w-4" />} color="#34d399">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 8, right: 8, left: -30, bottom: 0 }}>
              <CartesianGrid stroke="#243247" vertical={false} />
              <XAxis type="number" dataKey="x" name="AQI" unit="" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis type="number" dataKey="y" name="PM2.5" unit="" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#0e1724', border: '1px solid #243247', borderRadius: 12 }} />
              <Scatter data={hotspotClusters} fill="#34d399" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
