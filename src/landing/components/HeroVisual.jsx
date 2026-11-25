import { useRef } from 'react';
import { Mic, TrendingUp } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext.jsx';

export default function HeroVisual() {
  const { t } = useLang();
  const ref = useRef(null);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(2));
    ref.current.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(2));
  };

  return (
    <div className="hv" ref={ref} onMouseMove={onMove} role="img" aria-label={t.hero.visualAlt}>
      <svg className="hv__art" viewBox="0 0 520 520">
        <path className="hv__blob hv__blob--a" d="M96 150C130 50 300 20 400 90s120 190 70 290-210 120-310 70S62 250 96 150Z" fill="#DFEAE0" />
        <path className="hv__blob hv__blob--b" d="M360 40c50 0 100 40 90 90s-70 60-110 40-30-130 20-130Z" fill="#E9C878" />
        <circle cx="70" cy="420" r="26" fill="#A8C5B2" />
        {/* Parent (left, taller, leaning in to listen) */}
        <g>
          <path d="M70 520c0-90 40-150 100-150s100 60 100 150Z" fill="#205B4C" />
          <rect x="150" y="330" width="40" height="50" rx="18" fill="#C98E6A" />
          <circle cx="170" cy="290" r="52" fill="#D9A07A" />
          <path d="M118 285c-4-50 30-70 60-66 38 4 46 40 42 70-14-30-40-34-60-30-20 4-34 14-42 26Z" fill="#26352E" />
          <circle cx="152" cy="296" r="4" fill="#26352E" /><circle cx="190" cy="296" r="4" fill="#26352E" />
          <path d="M156 318q15 12 30 0" stroke="#26352E" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
        {/* Child (right, smaller, speaking) */}
        <g>
          <path d="M290 520c0-70 30-110 80-110s80 40 80 110Z" fill="#E9C878" />
          <rect x="352" y="378" width="34" height="36" rx="16" fill="#E8B58F" />
          <circle cx="370" cy="340" r="46" fill="#F0BF9A" />
          <path d="M326 335c-6-40 22-58 48-55 34 3 42 30 38 56-10-22-34-28-50-24-16 4-30 12-36 23Z" fill="#6B4A36" />
          <circle cx="354" cy="346" r="4" fill="#26352E" /><circle cx="388" cy="346" r="4" fill="#26352E" />
          <ellipse cx="371" cy="366" rx="9" ry="7" fill="#9B4A3A" />
          <circle cx="342" cy="362" r="7" fill="#EBA08A" opacity=".6" /><circle cx="400" cy="362" r="7" fill="#EBA08A" opacity=".6" />
        </g>
      </svg>

      <div className="hv__wave" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => <i key={i} style={{ animationDelay: `${i * 0.12}s` }} />)}
      </div>

      {t.hero.bubbles.map((b, i) => (
        <span key={i} className={`hv__bubble hv__bubble--${i + 1}`}>{b}</span>
      ))}
      <span className="hv__chip hv__chip--1"><Mic size={16} />{t.hero.chip1}</span>
      <span className="hv__chip hv__chip--2"><TrendingUp size={16} />{t.hero.chip2}</span>
    </div>
  );
}
