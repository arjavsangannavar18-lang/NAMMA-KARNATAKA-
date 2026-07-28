import { Link } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/weather', label: 'ಹವಾಮಾನ', icon: '🌤' },
  { path: '/transport', label: 'ಸಾರಿಗೆ', icon: '🚌' },
  { path: '/news', label: 'ಸುದ್ದಿ', icon: '📰' },
  { path: '/market-prices', label: 'ಮಾರುಕಟ್ಟೆ', icon: '🌾' },
  { path: '/jobs', label: 'ಉದ್ಯೋಗ', icon: '💼' },
  { path: '/emergency', label: 'ತುರ್ತು', icon: '🚨' },
  { path: '/districts', label: 'ಜಿಲ್ಲೆಗಳು', icon: '🗺' },
];

export default function Navbar({ onMenuToggle }) {
  return (
    <header className="bg-[var(--color-primary)] text-white shadow-lg sticky top-0 z-50">
      <div className="container-app">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link to="/" className="flex items-center gap-2 hover:no-underline">
            <span className="text-2xl">🏛️</span>
            <div>
              <h1 className="text-lg md:text-xl font-bold leading-tight">NAMMA KARNATAKA</h1>
              <p className="text-xs opacity-80 hidden md:block">ನಮ್ಮ ಕರ್ನಾಟಕ</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link key={item.path} to={item.path} className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/15 transition-colors">
                <span className="mr-1">{item.icon}</span>{item.label}
              </Link>
            ))}
          </nav>
          <button onClick={onMenuToggle} className="md:hidden p-2 rounded-lg hover:bg-white/15 transition-colors" aria-label="Open menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
