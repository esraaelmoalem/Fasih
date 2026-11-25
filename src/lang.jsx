import {createContext,useContext,useState,useEffect} from 'react';
const C=createContext();
export const LangProvider=({children})=>{const [lang,setLang]=useState(localStorage.getItem('lang')||'ar');
useEffect(()=>{document.documentElement.dir=lang==='ar'?'rtl':'ltr';document.documentElement.lang=lang;localStorage.setItem('lang',lang)},[lang]);
return <C.Provider value={{lang,t:(a,e)=>lang==='ar'?a:e,toggle:()=>setLang(lang==='ar'?'en':'ar')}}>{children}</C.Provider>};
export const useLang=()=>useContext(C);
