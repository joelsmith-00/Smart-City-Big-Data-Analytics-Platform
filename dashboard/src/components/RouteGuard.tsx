import type { ReactNode } from 'react'

interface RouteGuardProps {
  children: ReactNode
  routeName: string
}

export function RouteGuard({ children, routeName }: RouteGuardProps) {
  const mockMode = import.meta.env.VITE_USE_MOCK !== 'false'

  if (!mockMode) {
    return <div role="alert">{routeName} requires mock data mode.</div>
  }

  return <>{children}</>
}
