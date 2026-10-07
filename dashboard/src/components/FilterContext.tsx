import { useMemo, useState, type ReactNode } from 'react'
import { FilterContext, type DateFilter, type ZoneFilter } from './DashboardFiltersContext'

export function FilterProvider({ children }: { children: ReactNode }) {
  const [zone, setZone] = useState<ZoneFilter>('All zones')
  const [dateRange, setDateRange] = useState<DateFilter>('Last 30 days')

  const value = useMemo(
    () => ({ zone, dateRange, setZone, setDateRange }),
    [zone, dateRange],
  )

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}
