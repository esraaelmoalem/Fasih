import { Instagram, Facebook, Linkedin, Mail } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext.jsx';
import Logo from './Logo.jsx';

export default function Footer() {
  const { t } = useLang(); const f = t.footer;
  const links = [['home', '#home'], ['about', '#about'], ['services', '#services'], ['how', '#how'], ['specialists', '#specialists']];
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div><a href="#home" className="nav__brand"><Logo size={34} /><span>{t.brand}</span></a><p>{f.about}</p></div>
        <div><h4>{f.links}</h4>{links.map(([k, h]) => <a key={k} href={h}>{t.nav[k]}</a>)}</div>
        <div><h4>{f.project}</h4><p>{f.projectText}</p></div>
        <div>
          <h4>{f.social}</h4>
          <div className="footer__social">
            {/* Placeholder links: replace "#" with real URLs */}
            {[Instagram, Facebook, Linkedin, Mail].map((Icon, i) => <a key={i} href="#" aria-label="social"><Icon size={18} /></a>)}
          </div>
        </div>
      </div>
      <div className="footer__bar">{f.rights}</div>
    </footer>
  );
}
