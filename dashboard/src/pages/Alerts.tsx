import { Radio } from 'lucide-react'
import { PageCard } from '../components/PageCard'

export function AlertsPage() {
  return <PageCard eyebrow="Notification center" title="City alerts" description="Mock operational alerts, incident status, and system events." icon={<Radio className="h-4 w-4" />} accent="bg-coral" />
}
