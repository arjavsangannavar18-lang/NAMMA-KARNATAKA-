import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import t from '../i18n/translations';
const C=createContext(null),K='namma-karnataka-lang',L=['kn','en'];
function g(){try{const s=localStorage.getItem(K);if(s&&L.includes(s))return s}catch{}return navigator.language?.split('-')[0]==='kn'?'kn':'en'}
export function LanguageProvider({children}){const[l,setL]=useState(g);useEffect(()=>{try{localStorage.setItem(K,l)}catch{};document.documentElement.lang=l==='kn'?'kn-IN':'en-IN'},[l]);const tr=useCallback(k=>t[l]?.[k]||t.en?.[k]||k,[l]);const tl=useCallback(()=>setL(p=>p==='kn'?'en':'kn'),[]);const sl=useCallback(x=>{if(L.includes(x))setL(x)},[]);return <C.Provider value={{lang:l,t:tr,toggleLang:tl,setLanguage:sl}}>{children}</C.Provider>}
export function useLanguage(){const c=useContext(C);if(!c)throw new Error('useLanguage must be used within LanguageProvider');return c}
