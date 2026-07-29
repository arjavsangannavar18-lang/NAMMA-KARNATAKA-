import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import WeatherPage from './pages/WeatherPage';
import TransportPage from './pages/TransportPage';
import NewsPage from './pages/NewsPage';
import MarketPricesPage from './pages/MarketPricesPage';
import JobsPage from './pages/JobsPage';
import EducationPage from './pages/EducationPage';
import FarmerPage from './pages/FarmerPage';
import EmergencyPage from './pages/EmergencyPage';
import DistrictsPage from './pages/DistrictsPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="weather" element={<WeatherPage />} />
        <Route path="transport" element={<TransportPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="market-prices" element={<MarketPricesPage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="education" element={<EducationPage />} />
        <Route path="farmer" element={<FarmerPage />} />
        <Route path="emergency" element={<EmergencyPage />} />
        <Route path="districts" element={<DistrictsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
