import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <main className="flex-1 container-app py-6 mb-16 md:mb-0">
        <Outlet />
      </main>
      <BottomNav />
      <footer className="bg-[var(--color-primary)] text-white py-6 mt-auto hidden md:block">
        <div className="container-app text-center text-sm">
          <p>© {new Date().getFullYear()} NAMMA KARNATAKA — Built for the people of Karnataka ❤️</p>
          <p className="mt-1 opacity-75">A public utility platform with trusted, real information</p>
        </div>
      </footer>
    </div>
  );
}
