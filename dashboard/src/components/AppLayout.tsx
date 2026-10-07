import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity,
  Bell,
  ChevronLeft,
  CircleGauge,
  CloudSun,
  Database,
  Gauge,
  LayoutDashboard,
  Map,
  Menu,
  Radio,
  ShieldAlert,
  Sparkles,
  ThermometerSun,
  X,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

const navigation = [
  { label: 'Overview', to: '/', icon: LayoutDashboard },
  { label: 'Traffic', to: '/traffic', icon: Activity },
  { label: 'Weather', to: '/weather', icon: CloudSun },
  { label: 'Air Quality', to: '/air-quality', icon: WindIcon },
  { label: 'Energy', to: '/energy', icon: Zap },
  { label: 'Emergency', to: '/emergency', icon: ShieldAlert },
  { label: 'City Map', to: '/city-map', icon: Map },
  { label: 'Predictions', to: '/predictions', icon: Sparkles },
  { label: 'Alerts', to: '/alerts', icon: Bell },
  { label: 'Data Pipeline', to: '/pipeline', icon: Database },
]

function WindIcon({ className }: { className?: string }) {
  return <ThermometerSun className={className} />
}

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink text-slate-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-sky/10 blur-[110px]" />
        <div className="absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-violet/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.018)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.button
            type="button"
            aria-label="Close navigation"
            className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/10 bg-[#080d1b]/90 px-3 py-4 shadow-2xl backdrop-blur-2xl transition-[width,transform] duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${collapsed ? 'lg:w-20' : 'lg:w-72'}`}
      >
        <div className={`mb-8 flex items-center gap-3 px-2 ${collapsed ? 'justify-center' : ''}`}>
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-sky to-violet shadow-glow">
            <CircleGauge className="h-5 w-5 text-ink" />
          </div>
          {!collapsed && (
            <div>
              <p className="font-semibold tracking-tight">SmartCity</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-sky">BigData OS</p>
            </div>
          )}
        </div>

        <nav className="space-y-1" aria-label="Dashboard navigation">
          {navigation.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  collapsed ? 'justify-center' : ''
                } ${
                  isActive
                    ? 'bg-sky/15 text-sky shadow-[inset_0_0_0_1px_rgba(56,189,248,.15)]'
                    : 'text-slate-400 hover:bg-white/[.04] hover:text-white'
                }`
              }
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl border border-white/10 bg-white/[.03] p-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Radio className="h-4 w-4 text-emerald-400" />
            {!collapsed && <span>Mock data stream</span>}
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-sky to-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: collapsed ? '40%' : '92%' }}
              transition={{ duration: 1, delay: 0.25 }}
            />
          </div>
        </div>
      </aside>

      <div className={`relative min-h-screen transition-[margin] duration-300 ${collapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-ink/70 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-slate-300 lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Live workspace</p>
              <h1 className="text-lg font-semibold">{navigation.find((item) => item.to === location.pathname)?.label ?? 'SmartCity'}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCollapsed((value) => !value)}
              className="hidden h-10 w-10 place-items-center rounded-xl border border-white/10 text-slate-400 transition hover:border-sky/30 hover:text-sky lg:grid"
              aria-label="Toggle sidebar"
            >
              <ChevronLeft className={`h-4 w-4 transition ${collapsed ? 'rotate-180' : ''}`} />
            </button>
            <button type="button" className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-slate-400 transition hover:text-white" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-coral" />
            </button>
            <button type="button" className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.03] p-1.5 pr-3 text-xs transition hover:border-white/20">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-sky to-violet text-ink"><Gauge className="h-4 w-4" /></span>
              <span className="hidden sm:inline">Urban Analyst</span>
            </button>
          </div>
        </header>

        <main className="relative mx-auto max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      <button
        type="button"
        onClick={() => setSidebarOpen(false)}
        className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 shadow-xl lg:hidden"
        aria-label="Close navigation"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
