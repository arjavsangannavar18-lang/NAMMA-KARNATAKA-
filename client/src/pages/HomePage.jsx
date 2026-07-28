import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';

export default function HomePage() {
  const { data: weather, isLoading: weatherLoading } = useQuery({
    queryKey: ['weather', 'bengaluru'],
    queryFn: () => apiService.getWeather('bengaluru'),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });

  const { data: news } = useQuery({
    queryKey: ['news', 'headlines'],
    queryFn: () => apiService.getNews(),
    staleTime: 15 * 60 * 1000,
    retry: 1,
  });

  const SERVICES = [
    { to: '/weather', icon: '🌤', title: 'Weather', desc: 'Real-time weather across Karnataka', color: 'from-blue-500 to-blue-600' },
    { to: '/transport', icon: '🚌', title: 'Transport', desc: 'BMTC, KSRTC & Metro info', color: 'from-green-500 to-green-600' },
    { to: '/news', icon: '📰', title: 'News', desc: 'Latest Karnataka news', color: 'from-purple-500 to-purple-600' },
    { to: '/market-prices', icon: '🌾', title: 'Market Prices', desc: 'APMC & agriculture prices', color: 'from-yellow-500 to-yellow-600' },
    { to: '/jobs', icon: '💼', title: 'Government Jobs', desc: 'Latest job notifications', color: 'from-red-500 to-red-600' },
    { to: '/emergency', icon: '🚨', title: 'Emergency', desc: 'Helplines & services', color: 'from-pink-500 to-pink-600' },
    { to: '/districts', icon: '🗺', title: 'Districts', desc: 'District-wise info', color: 'from-indigo-500 to-indigo-600' },
  ];

  return (
    <div className="space-y-8">
      <section className="text-center py-6 md:py-10">
        <h1 className="text-3xl md:text-5xl font-bold text-[var(--color-text)] mb-3">ನಮ್ಮ ಕರ್ನಾಟಕ</h1>
        <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          One platform for all your daily needs — trusted, real, and useful information for every Kannadiga.
        </p>
      </section>

      <section className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">🌤 Today's Weather</h2>
          <Link to="/weather" className="text-[var(--color-primary)] text-sm font-medium">View all →</Link>
        </div>
        {weatherLoading ? (
          <div className="flex justify-center py-4"><div className="loading-spinner" /></div>
        ) : weather ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-[var(--color-bg)] rounded-lg">
              <p className="text-3xl mb-1">🌡️</p>
              <p className="text-2xl font-bold">{weather.temperature}°C</p>
              <p className="text-xs text-gray-500">Temperature</p>
            </div>
            <div className="p-3 bg-[var(--color-bg)] rounded-lg">
              <p className="text-3xl mb-1">💧</p>
              <p className="text-2xl font-bold">{weather.humidity}%</p>
              <p className="text-xs text-gray-500">Humidity</p>
            </div>
            <div className="p-3 bg-[var(--color-bg)] rounded-lg">
              <p className="text-3xl mb-1">🌬️</p>
              <p className="text-2xl font-bold">{weather.windSpeed}</p>
              <p className="text-xs text-gray-500">Wind (km/h)</p>
            </div>
            <div className="p-3 bg-[var(--color-bg)] rounded-lg">
              <p className="text-3xl mb-1">{weather.icon || '☀️'}</p>
              <p className="text-lg font-bold">{weather.condition}</p>
              <p className="text-xs text-gray-500">Condition</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-4">Weather data unavailable. Please try again later.</p>
        )}
      </section>

      <section>
        <h2 className="section-title">📋 Our Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SERVICES.map((service) => (
            <Link key={service.to} to={service.to}
              className={`bg-gradient-to-br ${service.color} text-white rounded-xl p-5 hover:scale-105 transition-transform duration-200 shadow-md`}>
              <span className="text-3xl block mb-2">{service.icon}</span>
              <h3 className="font-bold text-lg">{service.title}</h3>
              <p className="text-sm opacity-90 mt-1">{service.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {news && news.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">📰 Latest News</h2>
            <Link to="/news" className="text-[var(--color-primary)] text-sm font-medium">View all →</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {news.slice(0, 3).map((item, idx) => (
              <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" className="card p-4 hover:no-underline block">
                <h3 className="font-semibold text-sm mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.source} · {item.publishedAt}</p>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
