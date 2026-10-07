import { ShieldAlert } from 'lucide-react'
import { PageCard } from '../components/PageCard'

export function EmergencyPage() {
  return <PageCard eyebrow="Safety" title="Emergency readiness" description="Mock incident readiness and response system indicators." icon={<ShieldAlert className="h-4 w-4" />} accent="bg-coral" />
}
