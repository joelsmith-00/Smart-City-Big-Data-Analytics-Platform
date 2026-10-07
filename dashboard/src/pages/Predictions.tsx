import { Sparkles } from 'lucide-react'
import { PageCard } from '../components/PageCard'

export function PredictionsPage() {
  return <PageCard eyebrow="Forecasting" title="Predictive intelligence" description="Synthetic forecasts for demand, congestion, and environmental risk." icon={<Sparkles className="h-4 w-4" />} accent="bg-violet" />
}
