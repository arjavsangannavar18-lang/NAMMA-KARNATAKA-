import { useState, useCallback, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLanguage } from '../context/LanguageContext';
import { apiService } from '../services/api';
import MarketCategoryTabs from '../components/market/CategoryTabs';
import MarketSearch from '../components/market/MarketSearch';
import PriceCard from '../components/market/PriceCard';

function useLS(k, fb) {
  const [v, s] = useState(() => { try { const x = localStorage.getItem(k); return x ? JSON.parse(x) : fb; } catch { return fb; } });
  const set = nv => { s(nv); try { localStorage.setItem(k, JSON.stringify(nv)); } catch {} };
  return [v, set];
}

export default function MarketPricesPage() {
  const { lang } = useLanguage();
  const qc = useQueryClient();
  const [cat, setCat] = useState('all');
  const [favs, setFavs] = useLS('nk-market-favs', []);
  const [nearby, setNearby] = useState([]);
  const [detecting, setDetecting] = useState(false);

  // Commodities
  const { data: commodities } = useQuery({
    queryKey: ['market', 'commodities', cat],
    queryFn: () => apiService.getCommodities(cat === 'all' ? null : cat),
    staleTime: 3600000,
  });

  // Metals
  const { data: metals } = useQuery({
    queryKey: ['market', 'metals'],
    queryFn: () => apiService.getMetalPrices(),
    staleTime: 10 * 60 * 1000,
    retry: 2,
  });

  // Fuel
  const { data: fuel } = useQuery({
    queryKey: ['market', 'fuel'],
    queryFn: () => apiService.getFuelPrices(),
    staleTime: 3600000,
    retry: 1,
  });

  // Dairy
  const { data: dairy } = useQuery({
    queryKey: ['market', 'dairy'],
    queryFn: () => apiService.getDairyPrices(),
    staleTime: 3600000,
    retry: 1,
  });

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) return;
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(async pos => {
      const data = await apiService.getNearbyMarkets(pos.coords.latitude, pos.coords.longitude);
      setNearby(data || []);
      setDetecting(false);
    }, () => setDetecting(false), { timeout: 10000 });
  }, []);

  const toggleFav = useCallback(item => {
    if (!item?.name) return;
    setFavs(p => {
      const ex = p.find(f => f.name === item.name);
      return ex ? p.filter(f => f.name !== item.name) : [item, ...p].slice(0, 20);
    });
  }, []);

  const isFav = name => favs.some(f => f.name === name);

  const showMetals = cat === 'all' || cat === 'metals';
  const showFuel = cat === 'all' || cat === 'fuel';
  const showDairy = cat === 'all' || cat === 'dairy';
  const showAgri = cat !== 'metals' && cat !== 'fuel' && cat !== 'dairy';

  // Commodities display
  let commodityList = [];
  if (cat === 'all') {
    for (const items of Object.values(commodities || {})) {
      if (Array.isArray(items)) commodityList.push(...items);
    }
  } else if (Array.isArray(commodities)) {
    commodityList = commodities;
  }

  const handleRefresh = useCallback(async () => {
    await qc.invalidateQueries({ queryKey: ['market'] });
  }, [qc]);

  return (
    <div className="space-y-5 pb-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          🌾 {lang === 'kn' ? 'ಮಾರುಕಟ್ಟೆ ದರಗಳು' : 'Market Prices'}
        </h1>
        <button onClick={handleRefresh} className="p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <MarketSearch onSelect={item => {
        if (item.type === 'commodity' && item.category && item.category !== cat) setCat(item.category);
      }} />

      <MarketCategoryTabs active={cat} onSelect={setCat} />

      {/* Metals Section */}
      {showMetals && metals && (
        <div>
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            🪙 {lang === 'kn' ? 'ಚಿನ್ನ & ಬೆಳ್ಳಿ' : 'Gold & Silver'}
          </h3>
          {metals.gold?.unavailable ? (
            <div className="rounded-xl p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 text-sm text-amber-700 dark:text-amber-300">
              ⚠️ {lang === 'kn' ? 'ಲೈವ್ ಚಿನ್ನ/ಬೆಳ್ಳಿ ದರಗಳು ಲಭ್ಯವಿಲ್ಲ. GOLD_API_KEY ಅಗತ್ಯವಿದೆ.' : 'Live gold/silver prices unavailable. GOLD_API_KEY required.'}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {[metals.gold, metals.silver].filter(Boolean).map((m, i) => (
                <PriceCard key={i} item={{ ...m, name: lang === 'kn' ? m.nameKn : m.name }} isFavorite={isFav(m.name)} onFavorite={toggleFav} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Fuel Section */}
      {showFuel && fuel && (
        <div>
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            ⛽ {lang === 'kn' ? 'ಇಂಧನ ದರಗಳು' : 'Fuel Prices'}
          </h3>
          {fuel.petrol?.unavailable ? (
            <div className="rounded-xl p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 text-sm text-amber-700 dark:text-amber-300">
              ⚠️ {lang === 'kn' ? 'ಲೈವ್ ಇಂಧನ ದರಗಳು API ಏಕೀಕರಣಕ್ಕಾಗಿ ಕಾಯುತ್ತಿವೆ.' : 'Live fuel prices awaiting API integration.'}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {[fuel.petrol, fuel.diesel].filter(Boolean).map((f, i) => (
                <PriceCard key={i} item={{ ...f, name: lang === 'kn' ? f.nameKn : f.name }} isFavorite={isFav(f.name)} onFavorite={toggleFav} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Agriculture Commodities */}
      {showAgri && commodityList.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            📦 {lang === 'kn' ? 'ಕೃಷಿ ಉತ್ಪನ್ನಗಳು' : 'Agricultural Commodities'}
          </h3>
          <div className="rounded-xl p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 mb-3 text-sm text-amber-700 dark:text-amber-300">
            ⚠️ {lang === 'kn'
              ? 'ನೈಜ-ಸಮಯದ APMC ಬೆಲೆಗಳು ಪ್ರಸ್ತುತ ಲಭ್ಯವಿಲ್ಲ. AGMARKNET/APMC API ಏಕೀಕರಣಕ್ಕಾಗಿ ಕಾಯುತ್ತಿದೆ. ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್‌ಗಳು: agmarknet.gov.in, apmc.karnataka.gov.in'
              : 'Real-time APMC prices currently unavailable. Awaiting AGMARKNET/APMC API integration. Official sites: agmarknet.gov.in, apmc.karnataka.gov.in'}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {commodityList.slice(0, 20).map((item, i) => (
              <PriceCard key={i} item={{ ...item, unavailable: true }} isFavorite={isFav(item.name)} onFavorite={toggleFav} />
            ))}
          </div>
        </div>
      )}

      {/* Dairy Section */}
      {showDairy && dairy && (
        <div>
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            🥛 {lang === 'kn' ? 'ಹಾಲು & ಮಾಂಸ' : 'Dairy & Meat'}
          </h3>
          <div className="rounded-xl p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 mb-3 text-sm text-amber-700 dark:text-amber-300">
            ⚠️ {lang === 'kn' ? 'ಲೈವ್ ಡೈರಿ ಬೆಲೆಗಳು KMF/NANDINI API ಏಕೀಕರಣಕ್ಕಾಗಿ ಕಾಯುತ್ತಿವೆ.' : 'Live dairy prices awaiting KMF/NANDINI API integration.'}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {(dairy.items || []).map((item, i) => (
              <PriceCard key={i} item={{ ...item, name: lang === 'kn' ? item.nameKn : item.name, unavailable: true }} isFavorite={isFav(item.name)} onFavorite={toggleFav} />
            ))}
          </div>
        </div>
      )}

      {/* Nearby Markets */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">
            📍 {lang === 'kn' ? 'ಹತ್ತಿರದ ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆಗಳು' : 'Nearby APMC Markets'}
          </h3>
          <button onClick={detectLocation} disabled={detecting}
            className="px-3 py-1.5 rounded-lg bg-[var(--color-primary)] text-white text-xs font-medium hover:bg-[var(--color-primary-dark)] disabled:opacity-50 flex items-center gap-1">
            {detecting ? <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> : '📍'}
            {lang === 'kn' ? 'ಪತ್ತೆ ಮಾಡಿ' : 'Detect'}
          </button>
        </div>
        {nearby.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {nearby.map((m, i) => (
              <a key={i} href={`https://www.google.com/maps?q=${m.lat},${m.lon}`} target="_blank" rel="noopener noreferrer"
                className="rounded-xl p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[var(--color-primary)] transition-all hover:no-underline group">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 truncate">{lang === 'kn' && m.nameKn ? m.nameKn : m.name}</p>
                <p className="text-[10px] text-gray-400 mt-1">{m.district} · {m.distance} km</p>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 text-center py-4">{lang === 'kn' ? 'ಸ್ಥಳ ಪತ್ತೆ ಮಾಡಲು "ಪತ್ತೆ ಮಾಡಿ" ಕ್ಲಿಕ್ ಮಾಡಿ' : 'Click "Detect" to find nearby markets'}</p>
        )}
      </div>

      {/* Favorites */}
      {favs.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">
            ⭐ {lang === 'kn' ? 'ಮೆಚ್ಚಿನವು' : 'Favorites'} ({favs.length})
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {favs.map((f, i) => (
              <button key={i} onClick={() => toggleFav(f)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 text-xs text-amber-800 dark:text-amber-200 shrink-0">
                ⭐ {lang === 'kn' && f.nameKn ? f.nameKn : f.name} <span className="text-red-400 ml-1">✕</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="text-center text-xs text-gray-400 dark:text-gray-500 pt-2">
        {lang === 'kn'
          ? 'ಮೂಲಗಳು: AGMARKNET, GoldAPI, IndianOil/HPCL/BPCL. ನೈಜ-ಸಮಯದ API ಗಳು ಲಭ್ಯವಾದಾಗ ಲೈವ್ ಬೆಲೆಗಳನ್ನು ತೋರಿಸಲಾಗುವುದು.'
          : 'Sources: AGMARKNET, GoldAPI, IndianOil/HPCL/BPCL. Live prices shown when APIs are available.'}
      </p>
    </div>
  );
}
