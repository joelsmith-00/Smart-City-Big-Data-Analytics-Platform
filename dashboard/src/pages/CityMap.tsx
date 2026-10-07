import { useMemo, useState } from 'react'
import { Map as MapIcon, Layers3, MapPin, Navigation, Radio, ShieldAlert, Wind } from 'lucide-react'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet'
import { PageCard } from '../components/PageCard'
import { useDashboardFilters } from '../components/useDashboardFilters'

const zoneData = [
  { name: 'North', position: [40.04, -83.02] as [number, number], traffic: 43, aqi: 42, energy: 67, incidents: 2 },
  { name: 'Central', position: [40.02, -83.02] as [number, number], traffic: 62, aqi: 74, energy: 82, incidents: 4 },
  { name: 'South', position: [40.00, -83.02] as [number, number], traffic: 51, aqi: 96, energy: 58, incidents: 3 },
  { name: 'East', position: [40.02, -83.00] as [number, number], traffic: 78, aqi: 138, energy: 73, incidents: 6 },
  { name: 'West', position: [40.04, -83.04] as [number, number], traffic: 68, aqi: 112, energy: 88, incidents: 5 },
  { name: 'Industrial', position: [40.00, -83.04] as [number, number], traffic: 72, aqi: 216, energy: 94, incidents: 8 },
]

type LayerKey = 'Traffic' | 'AQI' | 'Energy' | 'Incidents'

const layerConfig: Record<LayerKey, { color: string; radius: number; icon: typeof Radio }> = {
  Traffic: { color: '#38bdf8', radius: 12, icon: Navigation },
  AQI: { color: '#34d399', radius: 14, icon: Wind },
  Energy: { color: '#fbbf24', radius: 13, icon: MapIcon },
  Incidents: { color: '#f87171', radius: 16, icon: ShieldAlert },
}

function MarkerIcon({ size, color, label }: { size: number; color: string; label: string }) {
  return L.divIcon({
    className: 'city-map-marker',
    html: `<span style="display:grid;place-items:center;width:${size}px;height:${size}px;border:3px solid #070b16;border-radius:50%;background:${color};color:#070b16;font-size:9px;font-weight:800;box-shadow:0 0 0 5px ${color}33">${label}</span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

export function CityMapPage() {
  const { zone } = useDashboardFilters()
  const [layer, setLayer] = useState<LayerKey>('Traffic')
  const visibleZones = useMemo(
    () => zone === 'All zones' ? zoneData : zoneData.filter((item) => item.name === zone),
    [zone],
  )
  const selectedLayer = layerConfig[layer]

  return (
    <div className="space-y-6">
      <PageCard eyebrow="Geospatial layer" title="Interactive city map" description="A mock map surface for district, sensor, and infrastructure visibility." icon={<MapIcon className="h-4 w-4" />} accent="bg-sky" />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <section className="relative min-h-[520px] overflow-hidden rounded-3xl border border-white/10 bg-[#09111f]">
          <MapContainer center={[40.02, -83.02]} zoom={11} scrollWheelZoom className="h-[520px] w-full" zoomControl={false}>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors &copy; CARTO'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {visibleZones.map((item) => {
              const value = item[layer.toLowerCase() as keyof typeof item]
              const markerSize = Math.max(10, Math.min(28, Number(value) * 0.28))
              return (
                <Marker
                  key={item.name}
                  position={item.position}
                  icon={MarkerIcon({ size: markerSize, color: selectedLayer.color, label: String(Math.round(Number(value))) })}
                >
                  <Tooltip direction="top" offset={[0, -8]} opacity={1} sticky className="city-map-tooltip">
                    <strong>{item.name}</strong><br />{layer}: {value}
                  </Tooltip>
                  <Popup>
                    <div className="min-w-48 text-slate-900">
                      <p className="font-semibold text-slate-950">{item.name} zone</p>
                      <p className="mt-1 text-xs">Traffic: {item.traffic}% · AQI: {item.aqi} · Energy: {item.energy}% · Incidents: {item.incidents}</p>
                    </div>
                  </Popup>
                </Marker>
              )
            })}
          </MapContainer>
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <span className="rounded-full border border-white/10 bg-ink/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-slate-300 backdrop-blur">{zone === 'All zones' ? 'All six zones' : zone}</span>
            <span className="rounded-full border border-white/10 bg-ink/80 px-3 py-1.5 text-xs text-slate-300 backdrop-blur">Mock data · {layer}</span>
          </div>
        </section>
        <aside className="space-y-4">
          <section className="rounded-3xl border border-white/10 bg-white/[.035] p-5">
            <div className="flex items-center gap-2"><Layers3 className="h-4 w-4 text-sky" /><h3 className="font-semibold">Map layer</h3></div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {(Object.keys(layerConfig) as LayerKey[]).map((item) => {
                const Icon = layerConfig[item].icon
                return <button key={item} type="button" onClick={() => setLayer(item)} className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs transition ${layer === item ? 'border-sky/40 bg-sky/10 text-sky' : 'border-white/10 text-slate-400 hover:bg-white/[.04]'}`} aria-pressed={layer === item}><Icon className="h-4 w-4" />{item}</button>
              })}
            </div>
          </section>
          <section className="rounded-3xl border border-white/10 bg-white/[.035] p-5">
            <h3 className="font-semibold">Layer legend</h3>
            <div className="mt-4 space-y-3 text-xs text-slate-400">
              {(Object.keys(layerConfig) as LayerKey[]).map((item) => <div key={item} className="flex items-center gap-3"><span className="h-3 w-3 rounded-full" style={{ backgroundColor: layerConfig[item].color }} />{item}<span className="ml-auto">{layerConfig[item].radius}px</span></div>)}
            </div>
          </section>
          <section className="rounded-3xl border border-white/10 bg-white/[.035] p-5">
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-violet" /><h3 className="font-semibold">Selected zone</h3></div>
            <p className="mt-3 text-sm text-slate-300">{zone === 'All zones' ? 'Showing all six zones' : `${zone} zone selected`}</p>
            <p className="mt-2 text-xs text-slate-500">Marker values are deterministic mock data only.</p>
          </section>
        </aside>
      </div>
    </div>
  )
}
