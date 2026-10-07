import { Database } from 'lucide-react'
import { PageCard } from '../components/PageCard'

export function PipelinePage() {
  return <PageCard eyebrow="Data engineering" title="Data pipeline" description="Mock ingestion, transformation, and orchestration health signals." icon={<Database className="h-4 w-4" />} accent="bg-sky" />
}
