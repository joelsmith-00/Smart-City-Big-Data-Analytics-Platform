import { motion } from 'framer-motion'

export function PageLoader() {
  return (
    <div className="space-y-6" role="status" aria-live="polite" aria-label="Loading page">
      <div className="h-24 animate-pulse rounded-3xl border border-white/10 bg-white/[.035]" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-32 animate-pulse rounded-2xl border border-white/10 bg-white/[.035]" />)}
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="h-80 animate-pulse rounded-3xl border border-white/10 bg-white/[.035]" />
        <div className="h-80 animate-pulse rounded-3xl border border-white/10 bg-white/[.035]" />
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-12 w-full animate-pulse rounded-2xl border border-white/10 bg-white/[.025]" />
    </div>
  )
}
