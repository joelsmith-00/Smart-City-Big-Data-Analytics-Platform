type Status = 'healthy' | 'warning' | 'critical' | 'info'

const styles: Record<Status, string> = {
  healthy: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
  warning: 'border-amber-400/20 bg-amber-400/10 text-amber-300',
  critical: 'border-coral/20 bg-coral/10 text-coral',
  info: 'border-sky/20 bg-sky/10 text-sky',
}

export function StatusPill({ status, label }: { status: Status; label: string }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] ${styles[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  )
}
