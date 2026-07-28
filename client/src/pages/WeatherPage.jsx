import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';

export default function WeatherPage() {
  const { data: weather, isLoading, error } = useQuery({
    queryKey: ['weather', 'bengaluru'],
    queryFn: () => apiService.getWeather('bengaluru'),
    staleTime: 10 * 60 * 1000,
  });

  return (
    <div className="space-y-6">
      <h1 className="section-title">🌤 Weather</h1>
      {isLoading && <div className="flex justify-center py-10"><div className="loading-spinner" /></div>}
      {error && <div className="card text-center py-8"><p className="text-red-500">Unable to fetch weather data.</p></div>}
      {weather && (
        <div className="card">
          <div className="text-center mb-6">
            <p className="text-6xl mb-2">{weather.icon || '☀️'}</p>
            <p className="text-4xl font-bold">{weather.temperature}°C</p>
            <p className="text-lg text-gray-600">{weather.condition}</p>
            <p className="text-sm text-gray-500 mt-1">{weather.location}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">Humidity</p><p className="text-xl font-bold">{weather.humidity}%</p></div>
            <div className="p-3 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">Wind</p><p className="text-xl font-bold">{weather.windSpeed} km/h</p></div>
            <div className="p-3 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">Feels Like</p><p className="text-xl font-bold">{weather.feelsLike || weather.temperature}°C</p></div>
            <div className="p-3 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">Visibility</p><p className="text-xl font-bold">{weather.visibility || 'N/A'} km</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
