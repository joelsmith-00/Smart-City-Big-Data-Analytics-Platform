import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { ReactNode } from 'react'

interface ChartCardProps {
  title: string
  subtitle: string
  data: Array<{ label: string; value: number }>
  color?: string
  icon: ReactNode
}

export function ChartCard({ title, subtitle, data, color = '#38bdf8', icon }: ChartCardProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[.035] p-5 sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{subtitle}</p>
          <h3 className="mt-1 text-lg font-semibold">{title}</h3>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[.03] text-sky">{icon}</span>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 4, left: -30, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${title.replaceAll(' ', '-')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.45} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(148,163,184,.08)" vertical={false} />
            <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
            <Tooltip
              cursor={{ stroke: color, strokeDasharray: '4 4', strokeOpacity: 0.3 }}
              contentStyle={{ background: '#0b1222', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12 }}
            />
            <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2.5} fill={`url(#gradient-${title.replaceAll(' ', '-')})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
