import { Heart, Mic, BarChart3, LineChart, Search, CalendarCheck, BookOpen, Baby, Lock, Lightbulb, Users, Stethoscope, UserRound, Info } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext.jsx';
import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';

function Head({ eyebrow, title, light }) {
  return (
    <Reveal className={`head ${light ? 'head--light' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
    </Reveal>
  );
}

export function About() {
  const { t } = useLang(); const a = t.about;
  return (
    <section id="about" className="sec about">
      <div className="container about__grid">
        <Reveal className="about__stat">
          <Heart size={34} />
          <strong>{a.stat}</strong>
          <span>{a.statSub}</span>
        </Reveal>
        <div>
          <Head eyebrow={a.eyebrow} title={a.title} />
          <Reveal delay={100}><p className="lead">{a.text}</p></Reveal>
          <ul className="about__points">
            {a.points.map((p, i) => <Reveal as="li" key={i} delay={150 + i * 90}>{p}</Reveal>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Journey() {
  const { t } = useLang(); const j = t.journey;
  return (
    <section className="sec journey">
      <div className="container">
        <Head eyebrow={j.eyebrow} title={j.title} />
        <div className="journey__path">
          {j.stages.map((s, i) => (
            <Reveal key={i} delay={i * 120} className={`stage stage--${i + 1}`}>
              <span className="stage__num">{i + 1}</span>
              <h3>{s.t}</h3><p>{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const serviceIcons = [Mic, BarChart3, LineChart, Search, CalendarCheck, BookOpen];
export function Services() {
  const { t } = useLang(); const s = t.services;
  return (
    <section id="services" className="sec services">
      <div className="container">
        <Head eyebrow={s.eyebrow} title={s.title} light />
        <div className="services__grid">
          {s.items.map((it, i) => {
            const Icon = serviceIcons[i];
            return (
              <Reveal key={i} delay={(i % 3) * 100} className="service">
                <Icon size={26} /><h3>{it.t}</h3><p>{it.d}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const { t } = useLang(); const h = t.how;
  return (
    <section id="how" className="sec how">
      <div className="container">
        <Head eyebrow={h.eyebrow} title={h.title} />
        <ol className="how__steps">
          {h.steps.map((s, i) => (
            <Reveal as="li" key={i} delay={i * 110} className="step">
              <span className="step__dot">{i + 1}</span>
              <div><h3>{s.t}</h3><p>{s.d}</p></div>
            </Reveal>
          ))}
        </ol>
        <Reveal className="disclaimer"><Info size={22} /><p>{h.disclaimer}</p></Reveal>
      </div>
    </section>
  );
}

export function Specialists() {
  const { t } = useLang(); const s = t.specialists;
  return (
    <section id="specialists" className="sec spec">
      <div className="container spec__grid">
        <div>
          <Head eyebrow={s.eyebrow} title={s.title} />
          <Reveal delay={100}><p className="lead">{s.text}</p></Reveal>
        </div>
        <div className="spec__cards">
          {s.cards.map((c, i) => (
            <Reveal key={i} delay={i * 120} className={`pro pro--${i + 1}`}>
              <span className="pro__avatar"><UserRound size={28} /></span>
              <div><strong>{c.n}</strong><small>{s.role}</small><em>{c.s}</em></div>
              
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const whyIcons = [Baby, Lock, Lightbulb, Users, Stethoscope];
export function Why() {
  const { t } = useLang(); const w = t.why;
  return (
    <section className="sec why">
      <div className="container">
        <Head eyebrow={w.eyebrow} title={w.title} />
        <div className="why__row">
          {w.items.map((it, i) => {
            const Icon = whyIcons[i];
            return (
              <Reveal key={i} delay={i * 90} className="why__item">
                <span><Icon size={24} /></span><h3>{it.t}</h3><p>{it.d}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  const { t } = useLang(); const c = t.cta;
  return (
    <section id="contact" className="cta">
      <div className="cta__wave" aria-hidden="true">{Array.from({ length: 28 }).map((_, i) => <i key={i} style={{ animationDelay: `${i * 0.1}s` }} />)}</div>
      <Reveal className="container cta__inner">
        <h2>{c.title}</h2><p>{c.text}</p>
        <div className="hero__btns">
          <Link to="/auth?m=register" className="btn btn--yellow">{c.btn}</Link>
          <a href="#specialists" className="btn btn--outline-light">{c.btn2}</a>
        </div>
      </Reveal>
    </section>
  );
}
