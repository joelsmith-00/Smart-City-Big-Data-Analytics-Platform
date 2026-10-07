import { mockAlerts, mockDashboardSnapshot } from '../data/mockData'
import type { DashboardSnapshot } from '../types/dashboard'

const useMock = import.meta.env.VITE_USE_MOCK !== 'false'

export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  if (useMock) {
    await new Promise((resolve) => window.setTimeout(resolve, 180))
    return mockDashboardSnapshot
  }

  const response = await fetch('/api/dashboard', {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Dashboard API request failed: ${response.status}`)
  }

  return response.json() as Promise<DashboardSnapshot>
}

export async function getAlerts() {
  if (useMock) {
    await new Promise((resolve) => window.setTimeout(resolve, 120))
    return mockAlerts
  }

  const response = await fetch('/api/alerts', {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Alerts API request failed: ${response.status}`)
  }

  return response.json()
}
