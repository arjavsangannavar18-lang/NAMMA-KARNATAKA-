import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
export default function NotFoundPage(){const{t}=useLanguage();return(<div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in"><p className="text-8xl mb-4">🔍</p><h1 className="text-4xl font-bold mb-2 text-[var(--color-text)]">404</h1><p className="text-xl text-[var(--color-text-secondary)] mb-6">{t('pageNotFound')}</p><Link to="/" className="btn-primary">{t('goHome')}</Link></div>);}
