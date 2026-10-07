import { Map } from 'lucide-react'
import { PageCard } from '../components/PageCard'

export function CityMapPage() {
  return <PageCard eyebrow="Geospatial layer" title="Interactive city map" description="A mock map surface for district, sensor, and infrastructure visibility." icon={<Map className="h-4 w-4" />} accent="bg-sky" />
}
