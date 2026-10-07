import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import {
  AirQualityPage,
  AlertsPage,
  CityMapPage,
  EmergencyPage,
  EnergyPage,
  OverviewPage,
  PipelinePage,
  PredictionsPage,
  TrafficPage,
  WeatherPage,
} from './pages/DashboardPages'
import { RouteGuard } from './components/RouteGuard'

function App() {
  return (
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
  )
}

export default App
