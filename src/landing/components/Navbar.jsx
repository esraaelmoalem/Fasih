import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Languages } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext.jsx';
import Logo from './Logo.jsx';

const links = [['home', '#home'], ['about', '#about'], ['services', '#services'], ['how', '#how'], ['specialists', '#specialists'], ['contact', '#contact']];

export default function Navbar() {
  const { t, toggle } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#home" className="nav__brand"><Logo /><span>{t.brand}</span></a>
        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          {links.map(([key, href]) => (
            <a key={key} href={href} onClick={() => setOpen(false)}>{t.nav[key]}</a>
          ))}
        </nav>
        <div className="nav__actions">
          <button className="lang-btn" onClick={toggle} aria-label="Change language"><Languages size={16} />{t.toggleLabel}</button>
          <Link to="/auth" className="btn btn--ghost nav__login">{t.nav.login}</Link>
          <Link to="/auth?m=register" className="btn btn--primary nav__cta">{t.nav.cta}</Link>
          <button className="nav__burger" onClick={() => setOpen(!open)} aria-label={t.menu}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
    </header>
  );
}
