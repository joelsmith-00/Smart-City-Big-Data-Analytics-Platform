export const chartTheme = {
  grid: 'rgba(148, 163, 184, 0.08)',
  tick: '#64748b',
  tooltipBackground: '#0b1222',
  tooltipBorder: 'rgba(255,255,255,.1)',
  sky: '#38bdf8',
  violet: '#a78bfa',
  emerald: '#34d399',
  amber: '#fbbf24',
  coral: '#f87171',
}

export const aqiCategories = [
  { label: 'Good', min: 0, max: 50, color: '#34d399' },
  { label: 'Moderate', min: 51, max: 100, color: '#fbbf24' },
  { label: 'Unhealthy for sensitive groups', min: 101, max: 150, color: '#fb923c' },
  { label: 'Unhealthy', min: 151, max: 200, color: '#f87171' },
  { label: 'Very unhealthy', min: 201, max: 300, color: '#a855f7' },
  { label: 'Hazardous', min: 301, max: 500, color: '#7f1d1d' },
] as const
