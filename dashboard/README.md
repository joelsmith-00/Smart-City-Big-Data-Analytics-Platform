# SmartCity BigData Dashboard

A React 18, TypeScript, Vite, Tailwind CSS, and Recharts dashboard for the SmartCity BigData research platform. The application currently uses deterministic mock records and demonstrates the complete Stage 2 information architecture without contacting a live API.

## Features

- Responsive dark operations dashboard
- Traffic, weather, air quality, energy, emergency, map, prediction, alert, and pipeline views
- Global zone and date-range filters
- Interactive Leaflet city map with layer controls and zone-aware markers
- Recharts visualizations and Framer Motion transitions
- Route-level lazy loading, page skeletons, error recovery, and 404 handling
- Keyboard-accessible navigation and responsive layouts for mobile, tablet, and desktop

## Setup

From this directory, install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run the complete validation commands:

```bash
npm run build
npm run lint
```

Preview a production build:

```bash
npm run preview
```

## Project Structure

```text
.
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── AppLayout.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── FilterContext.tsx
│   │   ├── GlobalFilters.tsx
│   │   ├── PageLoader.tsx
│   │   └── shared UI components
│   ├── data/
│   │   ├── dashboardSeries.ts
│   │   └── mockData.ts
│   ├── pages/
│   │   ├── Alerts.tsx
│   │   ├── AirQuality.tsx
│   │   ├── CityMap.tsx
│   │   ├── Emergency.tsx
│   │   ├── Energy.tsx
│   │   ├── NotFound.tsx
│   │   ├── Overview.tsx
│   │   ├── Pipeline.tsx
│   │   ├── Predictions.tsx
│   │   ├── Traffic.tsx
│   │   └── Weather.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## Mock Data and Real API Switching

The dashboard intentionally uses mock data only. All page data is sourced from deterministic local modules under `src/data/`; do not add a live service without an explicit integration task.

When a real API integration is introduced, use the following boundary:

1. Add a typed API client in a dedicated data-service layer.
2. Keep route and page components free of direct HTTP calls.
3. Add environment variables through Vite's `VITE_` prefix.
4. Keep the mock implementation as the default behind `VITE_USE_MOCK=true`.
5. Add a compatibility test that compares the real response schema with the mock schema.

Example environment variables:

```text
VITE_USE_MOCK=true
VITE_API_BASE_URL=https://api.example.invalid
VITE_API_TOKEN=
```

The current implementation does not read the API variables. The application should remain mock-only unless a separate real-data integration task explicitly enables them.

## Responsive Validation

Validate the interface at 375px, 768px, and 1440px widths. Capture screenshots in the repository-level `docs/screenshots/` directory and reference them from the root README.

## Build and Quality Checks

```bash
npm run build
npm run lint
```

The production build runs TypeScript compilation and Vite bundling. The lint command runs ESLint across the dashboard source and configuration.