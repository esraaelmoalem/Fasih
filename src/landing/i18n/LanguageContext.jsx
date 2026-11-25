import translations from './translations.js';import {useLang as useAppLang} from '../../lang.jsx';
export const useLang=()=>{const {lang,toggle}=useAppLang();return {lang,t:translations[lang],toggle}};
