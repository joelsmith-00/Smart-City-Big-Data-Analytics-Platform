import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { FilterProvider } from './components/FilterContext'
import { RouteGuard } from './components/RouteGuard'
import { AirQualityPage } from './pages/AirQuality'
import { AlertsPage } from './pages/Alerts'
import { CityMapPage } from './pages/CityMap'
import { EmergencyPage } from './pages/Emergency'
import { EnergyPage } from './pages/Energy'
import { OverviewPage } from './pages/Overview'
import { PipelinePage } from './pages/Pipeline'
import { PredictionsPage } from './pages/Predictions'
import { TrafficPage } from './pages/Traffic'
import { WeatherPage } from './pages/Weather'

function App() {
  return (
    <FilterProvider>
      <BrowserRouter>
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </FilterProvider>
  )
}

export default App
