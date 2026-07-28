import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
export default function Layout(){const[s,setS]=useState(false);const{theme}=useTheme();const{t}=useLanguage();return(<div className={`min-h-screen flex flex-col theme-${theme}`}><Navbar onMenuToggle={()=>setS(!s)}/>{s&&(<div className="md:hidden fixed inset-0 z-40"><div className="absolute inset-0 bg-black/50" onClick={()=>setS(false)}/></div>)}<main className="flex-1 container-app py-4 md:py-6 mb-16 md:mb-0 animate-fade-in"><Outlet/></main><BottomNav/><footer className="bg-[var(--color-primary)] text-white py-4 mt-auto hidden md:block"><div className="container-app text-center text-xs md:text-sm"><p>© {new Date().getFullYear()} NAMMA KARNATAKA — {t('appFooter')} ❤️</p><p className="mt-1 opacity-75">{t('appFooterSub')}</p></div></footer></div>);}
