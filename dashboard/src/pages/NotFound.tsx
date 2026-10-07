import { Compass } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="grid min-h-[60vh] place-items-center rounded-3xl border border-white/10 bg-white/[.025] p-8 text-center">
      <div>
        <Compass className="mx-auto h-12 w-12 text-violet" aria-hidden="true" />
        <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-violet">404 · Route not found</p>
        <h1 className="mt-3 text-3xl font-semibold">This district is outside the dashboard</h1>
        <p className="mt-3 text-sm text-slate-400">The requested page does not exist. Return to the main operations overview.</p>
        <Link to="/" className="mt-6 inline-flex rounded-xl bg-sky px-4 py-2 text-sm font-semibold text-ink transition hover:bg-sky/90">Return home</Link>
      </div>
    </section>
  )
}
