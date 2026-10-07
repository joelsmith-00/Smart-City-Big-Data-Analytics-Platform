import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { ErrorBoundary } from './components/ErrorBoundary'
import { PageLoader } from './components/PageLoader'
import { FilterProvider } from './components/FilterContext'
import { RouteGuard } from './components/RouteGuard'

const AirQualityPage = lazy(() => import('./pages/AirQuality').then((module) => ({ default: module.AirQualityPage })))
const AlertsPage = lazy(() => import('./pages/Alerts').then((module) => ({ default: module.AlertsPage })))
const CityMapPage = lazy(() => import('./pages/CityMap').then((module) => ({ default: module.CityMapPage })))
const EmergencyPage = lazy(() => import('./pages/Emergency').then((module) => ({ default: module.EmergencyPage })))
const EnergyPage = lazy(() => import('./pages/Energy').then((module) => ({ default: module.EnergyPage })))
const OverviewPage = lazy(() => import('./pages/Overview').then((module) => ({ default: module.OverviewPage })))
const PipelinePage = lazy(() => import('./pages/Pipeline').then((module) => ({ default: module.PipelinePage })))
const PredictionsPage = lazy(() => import('./pages/Predictions').then((module) => ({ default: module.PredictionsPage })))
const TrafficPage = lazy(() => import('./pages/Traffic').then((module) => ({ default: module.TrafficPage })))
const WeatherPage = lazy(() => import('./pages/Weather').then((module) => ({ default: module.WeatherPage })))
const NotFoundPage = lazy(() => import('./pages/NotFound').then((module) => ({ default: module.NotFoundPage })))

function App() {
  return (
    <FilterProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<RouteGuard routeName="Overview"><OverviewPage /></RouteGuard>} />
                <Route path="traffic" element={<RouteGuard routeName="Traffic"><TrafficPage /></RouteGuard>} />
                <Route path="weather" element={<RouteGuard routeName="Weather"><WeatherPage /></RouteGuard>} />
                <Route path="air-quality" element={<RouteGuard routeName="Air quality"><AirQualityPage /></RouteGuard>} />
                <Route path="energy" element={<RouteGuard routeName="Energy"><EnergyPage /></RouteGuard>} />
                <Route path="emergency" element={<RouteGuard routeName="Emergency"><EmergencyPage /></RouteGuard>} />
                <Route path="city-map" element={<RouteGuard routeName="City map"><CityMapPage /></RouteGuard>} />
                <Route path="predictions" element={<RouteGuard routeName="Predictions"><PredictionsPage /></RouteGuard>} />
                <Route path="alerts" element={<RouteGuard routeName="Alerts"><AlertsPage /></RouteGuard>} />
                <Route path="pipeline" element={<RouteGuard routeName="Data pipeline"><PipelinePage /></RouteGuard>} />
                <Route path="not-found" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/not-found" replace />} />
              </Route>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </FilterProvider>
  )
}

export default App
