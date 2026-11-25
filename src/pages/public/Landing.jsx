import {useLang} from '../../lang.jsx';import '../../landing/styles/landing.css';
import Navbar from '../../landing/components/Navbar.jsx';import Hero from '../../landing/components/Hero.jsx';
import {About,Journey,Services,HowItWorks,Specialists,Why,FinalCTA} from '../../landing/components/Sections.jsx';import Footer from '../../landing/components/Footer.jsx';
export default function Landing(){const {lang}=useLang();
const onClick=e=>{if(e.defaultPrevented)return;const a=e.target.closest('a[href^="#"]');if(!a)return;e.preventDefault();const id=a.getAttribute('href').slice(1);if(id)document.getElementById(id)?.scrollIntoView({behavior:'smooth'})};
return <div className="lp" onClick={onClick}><Navbar/><main key={lang} className="lang-fade"><Hero/><About/><Journey/><Services/><HowItWorks/><Specialists/><Why/><FinalCTA/></main><Footer/></div>}
