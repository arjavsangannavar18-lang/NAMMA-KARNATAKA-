import axios from 'axios';

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getWeatherByCity(city) {
  if (!WEATHER_API_KEY) throw new Error('WEATHER_API_KEY is not configured. Please add your OpenWeatherMap API key to the server .env file.');
  try {
    const response = await axios.get(`${WEATHER_BASE_URL}/weather`, {
      params: { q: `${city},IN`, appid: WEATHER_API_KEY, units: 'metric' },
    });
    const { data } = response;
    return {
      location: data.name,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: getWeatherIcon(data.weather[0].id),
      visibility: Math.round(data.visibility / 1000),
      pressure: data.main.pressure,
      updatedAt: new Date(data.dt * 1000).toISOString(),
    };
  } catch (error) {
    if (error.response?.status === 401) throw new Error('Invalid OpenWeatherMap API key.');
    console.error('Weather API error:', error.message);
    throw error;
  }
}

export async function getWeatherForKarnataka() {
  const cities = ['Bengaluru','Mysuru','Mangaluru','Hubballi','Belagavi','Kalaburagi','Davanagere','Ballari','Shivamogga','Tumakuru'];
  const results = await Promise.allSettled(cities.map((city) => getWeatherByCity(city)));
  return results.map((result, idx) => result.status === 'fulfilled' ? { city: cities[idx], ...result.value } : { city: cities[idx], error: 'Unavailable' });
}

function getWeatherIcon(code) {
  if (code >= 200 && code < 300) return '⛈️';
  if (code >= 300 && code < 400) return '🌧️';
  if (code >= 500 && code < 600) return '🌧️';
  if (code >= 600 && code < 700) return '❄️';
  if (code >= 700 && code < 800) return '🌫️';
  if (code === 800) return '☀️';
  if (code > 800) return '⛅';
  return '🌤️';
}
