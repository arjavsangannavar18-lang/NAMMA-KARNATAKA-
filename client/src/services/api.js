import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) console.error('API Error:', error.response.status, error.response.data);
    else if (error.request) console.error('Network Error:', error.message);
    return Promise.reject(error);
  }
);

export const apiService = {
  async getWeather(city = 'bengaluru') {
    try { const { data } = await apiClient.get(`/weather/${city}`); return data; }
    catch (e) { console.error('Failed to fetch weather:', e); return null; }
  },
  async getNews(category) {
    try { const params = category ? { category } : {}; const { data } = await apiClient.get('/news', { params }); return data; }
    catch (e) { console.error('Failed to fetch news:', e); return []; }
  },
  async getTransport(type) {
    try { const params = type ? { type } : {}; const { data } = await apiClient.get('/transport', { params }); return data; }
    catch (e) { console.error('Failed to fetch transport:', e); return []; }
  },
  async getMarketPrices(commodity) {
    try { const params = commodity ? { commodity } : {}; const { data } = await apiClient.get('/market-prices', { params }); return data; }
    catch (e) { console.error('Failed to fetch market prices:', e); return []; }
  },
  async getJobs() {
    try { const { data } = await apiClient.get('/jobs'); return data; }
    catch (e) { console.error('Failed to fetch jobs:', e); return []; }
  },
  async getDistrictInfo(district) {
    try { const { data } = await apiClient.get(`/districts/${district}`); return data; }
    catch (e) { console.error('Failed to fetch district info:', e); return null; }
  },
  async getEmergencyContacts() {
    try { const { data } = await apiClient.get('/emergency'); return data; }
    catch (e) { console.error('Failed to fetch emergency contacts:', e); return []; }
  },
};

export default apiService;
