import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext.jsx';
import HeroVisual from './HeroVisual.jsx';

export default function Hero() {
  const { t, lang } = useLang();
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight; // arrow points in reading direction
  return (
    <section id="home" className="hero">
      <div className="container hero__grid">
        <div className="hero__text">
          <span className="badge">{t.hero.badge}</span>
          <h1>{t.hero.title1}<br /><em>{t.hero.title2}</em></h1>
          <p className="hero__lead">{t.hero.text}</p>
          <div className="hero__btns">
            <Link to="/auth?m=register" className="btn btn--primary">{t.hero.primary}<Arrow size={18} /></Link>
            <a href="#how" className="btn btn--ghost">{t.hero.secondary}</a>
          </div>
          <p className="hero__note"><ShieldCheck size={16} />{t.hero.note}</p>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}
