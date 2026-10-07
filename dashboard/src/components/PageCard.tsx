import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface PageCardProps {
  eyebrow: string
  title: string
  description: string
  icon: ReactNode
  accent: string
  children?: ReactNode
}

export function PageCard({ eyebrow, title, description, icon, accent, children }: PageCardProps) {
  return (
    <motion.section
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[.035] p-6 shadow-glow sm:p-8"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className={`absolute -right-16 -top-20 h-56 w-56 rounded-full opacity-20 blur-3xl ${accent}`} />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
            <span className="text-sky">{icon}</span>
            {eyebrow}
          </div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Mock connected
        </div>
      </div>
      {children && <div className="relative mt-8">{children}</div>}
    </motion.section>
  )
}
