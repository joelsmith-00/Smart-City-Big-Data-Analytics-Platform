import { Component, type ErrorInfo, type ReactNode, useState } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorBoundaryProps { children: ReactNode }
interface ErrorBoundaryState { hasError: boolean }

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Dashboard route failed to render', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="grid min-h-[60vh] place-items-center rounded-3xl border border-coral/20 bg-coral/5 p-8 text-center" role="alert">
          <div>
            <AlertTriangle className="mx-auto h-10 w-10 text-coral" aria-hidden="true" />
            <h1 className="mt-4 text-xl font-semibold">This view could not be loaded</h1>
            <p className="mt-2 max-w-md text-sm text-slate-400">The page encountered an unexpected error. Refresh to retry or return to the dashboard overview.</p>
            <button type="button" onClick={() => this.setState({ hasError: false })} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-sky px-4 py-2 text-sm font-semibold text-ink transition hover:bg-sky/90"><RefreshCw className="h-4 w-4" /> Retry</button>
          </div>
        </section>
      )
    }

    return this.props.children
  }
}

export function useErrorBoundaryRecovery() {
  const [resetKey, setResetKey] = useState(0)
  return { resetKey, handleReset: () => setResetKey((value) => value + 1) }
}
