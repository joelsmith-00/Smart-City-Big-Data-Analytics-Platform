import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string
  change: string
  icon: LucideIcon
  trend?: 'up' | 'down' | 'neutral'
  tone?: 'sky' | 'violet' | 'emerald' | 'amber' | 'coral'
}

const tones = {
  sky: 'bg-sky/10 text-sky border-sky/15',
  violet: 'bg-violet/10 text-violet border-violet/15',
  emerald: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/15',
  amber: 'bg-amber-400/10 text-amber-300 border-amber-400/15',
  coral: 'bg-coral/10 text-coral border-coral/15',
}

export function MetricCard({ label, value, change, icon: Icon, trend = 'neutral', tone = 'sky' }: MetricCardProps) {
  return (
    <motion.article
      className="rounded-2xl border border-white/10 bg-white/[.035] p-5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <span className={`grid h-9 w-9 place-items-center rounded-xl border ${tones[tone]}`}>
          <Icon className="h-4 w-4" />
        </span>
        <span className={`font-mono text-[10px] uppercase tracking-wider ${trend === 'up' ? 'text-emerald-300' : trend === 'down' ? 'text-coral' : 'text-slate-500'}`}>
          {change}
        </span>
      </div>
      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-white">{value}</p>
    </motion.article>
  )
}
