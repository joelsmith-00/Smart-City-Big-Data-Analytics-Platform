import { CalendarDays, MapPin } from 'lucide-react'
import type { DateFilter, ZoneFilter } from './DashboardFiltersContext'
import { useDashboardFilters } from './useDashboardFilters'

const zones: ZoneFilter[] = ['All zones', 'North', 'Central', 'South', 'East', 'West', 'Industrial']
const dateRanges: DateFilter[] = ['Last 7 days', 'Last 30 days', 'Last 90 days']

export function GlobalFilters() {
  const { zone, dateRange, setZone, setDateRange } = useDashboardFilters()

  return (
    <section className="mb-6 grid gap-3 rounded-2xl border border-white/10 bg-white/[.035] p-4 sm:grid-cols-2 xl:max-w-3xl" aria-label="Global dashboard filters">
      <label className="flex min-w-0 flex-col gap-2 text-xs text-slate-400">
        <span className="flex items-center gap-2 font-mono uppercase tracking-[0.18em]"><MapPin className="h-3.5 w-3.5 text-sky" /> Zone</span>
        <select
          value={zone}
          onChange={(event) => setZone(event.target.value as ZoneFilter)}
          className="h-10 rounded-xl border border-white/10 bg-ink/80 px-3 text-sm text-slate-100 outline-none transition focus:border-sky/40"
        >
          {zones.map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <label className="flex min-w-0 flex-col gap-2 text-xs text-slate-400">
        <span className="flex items-center gap-2 font-mono uppercase tracking-[0.18em]"><CalendarDays className="h-3.5 w-3.5 text-violet" /> Date range</span>
        <select
          value={dateRange}
          onChange={(event) => setDateRange(event.target.value as DateFilter)}
          className="h-10 rounded-xl border border-white/10 bg-ink/80 px-3 text-sm text-slate-100 outline-none transition focus:border-violet/40"
        >
          {dateRanges.map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
    </section>
  )
}
