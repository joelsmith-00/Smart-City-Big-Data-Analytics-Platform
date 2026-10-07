import { createContext } from 'react'

export type ZoneFilter = 'All zones' | 'North' | 'Central' | 'South' | 'East' | 'West' | 'Industrial'
export type DateFilter = 'Last 7 days' | 'Last 30 days' | 'Last 90 days'

export interface FilterContextValue {
  zone: ZoneFilter
  dateRange: DateFilter
  setZone: (zone: ZoneFilter) => void
  setDateRange: (dateRange: DateFilter) => void
}

export const FilterContext = createContext<FilterContextValue | undefined>(undefined)
