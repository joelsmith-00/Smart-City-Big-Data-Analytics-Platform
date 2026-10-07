import { Zap } from 'lucide-react'
import { PageCard } from '../components/PageCard'

export function EnergyPage() {
  return <PageCard eyebrow="Infrastructure" title="Energy consumption" description="Mock energy demand and district distribution telemetry." icon={<Zap className="h-4 w-4" />} accent="bg-amber-400" />
}
