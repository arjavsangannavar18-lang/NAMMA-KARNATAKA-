import { NavLink, useLocation } from 'react-router-dom';

const BOTTOM_NAV_ITEMS = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/weather', label: 'Weather', icon: '🌤' },
  { path: '/transport', label: 'Transport', icon: '🚌' },
  { path: '/news', label: 'News', icon: '📰' },
  { path: '/emergency', label: 'Emergency', icon: '🚨' },
];

export default function BottomNav() {
  const location = useLocation();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
      <div className="flex items-center justify-around h-14">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink key={item.path} to={item.path}
              className={`flex flex-col items-center justify-center px-3 py-1 min-w-[60px] ${isActive ? 'text-[var(--color-primary)]' : 'text-gray-500'}`}>
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
