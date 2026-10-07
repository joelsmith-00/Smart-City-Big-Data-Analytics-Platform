import { useContext } from 'react'
import { FilterContext } from './DashboardFiltersContext'

export function useDashboardFilters() {
  const value = useContext(FilterContext)
  if (!value) {
    throw new Error('useDashboardFilters must be used inside FilterProvider')
  }
  return value
}
