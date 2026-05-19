'use client'

import { useEffect, useRef, useState } from 'react'

function SebLogo({ size = 38 }: { size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: size, height: size, borderRadius: '50%', background: '#0a0a0a',
        border: '1.5px solid #1d6ef5', display: 'flex', alignItems: 'center',
        justifyContent: 'center', flexShrink: 0,
      }}>
        <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 32 18" fill="none">
          <rect x="2" y="8" width="28" height="8" rx="3" fill="#f0f0f0" />
          <rect x="7" y="4" width="14" height="7" rx="2" fill="#f0f0f0" />
          <circle cx="8" cy="16" r="3" fill="#0a0a0a" stroke="#f0f0f0" strokeWidth="1.5" />
          <circle cx="24" cy="16" r="3" fill="#0a0a0a" stroke="#f0f0f0" strokeWidth="1.5" />
        </svg>
      </div>
      <div style={{ lineHeight: 1 }}>
        <div style={{ fontSize: size * 0.37, fontWeight: 800, color: '#f0f0f0', letterSpacing: '-0.01em' }}>SEB</div>
        <div style={{ fontSize: size * 0.24, fontWeight: 600, color: '#1d6ef5', letterSpacing: '0.14em' }}>MÉCANIQUE</div>
      </div>
    </div>
  )
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const NAV = [
  { label: 'Services', href: '#services' },
  { label: 'Réalisations', href: '#projects' },
  { label: 'À propos', href: '#about' },
  { label: 'Tarifs', href: '#tarifs' },
]

const SERVICES = [
  { num: '01', title: 'Révision & entretien', desc: 'Vidange, filtres, bougies, distribution — tout le préventif pour garder votre moteur en vie.' },
  { num: '02', title: 'Diagnostic électronique', desc: 'Lecture OBD, analyse défauts, ECU — on lit ce que votre voiture essaie de vous dire.' },
  { num: '03', title: 'Freins & suspension', desc: 'Disques, plaquettes, amortisseurs, géométrie — arrêt précis et tenue de route optimale.' },
  { num: '04', title: 'Pneus & jantes', desc: 'Montage, équilibrage, stockage toutes saisons. Toutes dimensions, toutes marques.' },
  { num: '05', title: 'Préparation & performance', desc: 'Reprogrammation moteur, optimisation cartographie, préparation circuit. Ma passion.' },
  { num: '06', title: 'Expertise & pré-contrôle', desc: 'Bilan avant achat, pré-contrôle technique, rapport complet et honnête.' },
]

const PROJECTS = [
  { title: 'Subaru WRX STI', year: '2024', tag: 'Stage 2+', detail: '380 ch — downpipe 3″, intercooler sport, remap', bg: '#0b1829' },
  { title: 'BMW M3 E46', year: '2023', tag: 'Restauration', detail: 'S54 — joints culasse, chaîne distribution complète', bg: '#0f0f1e' },
  { title: 'VW Golf GTI Mk7', year: '2024', tag: 'Stage 1', detail: '280 ch — remap ECU, filtre sport, ligne cat-back', bg: '#0f1a10' },
  { title: 'Audi RS3 8V', year: '2023', tag: 'Entretien 60k', detail: 'Vidange DSG, injecteurs, révision complète', bg: '#1a0f0f' },
]

const TARIFS = [
  { service: 'Vidange huile + filtre', prix: 'dès CHF 89', note: 'huile synthétique incluse' },
  { service: 'Révision complète', prix: 'dès CHF 249', note: 'petite révision' },
  { service: 'Diagnostic électronique', prix: 'dès CHF 89', note: 'tous systèmes' },
  { service: 'Freins avant — disques + plaquettes', prix: 'dès CHF 280', note: 'pièces + pose' },
  { service: 'Pneus — montage + équilibrage ×4', prix: 'dès CHF 80', note: 'sans les pneus' },
  { service: 'Expertise avant achat', prix: 'dès CHF 120', note: 'rapport écrit inclus' },
  { service: 'Reprogrammation moteur', prix: 'sur devis', note: 'selon véhicule' },
]

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [formSent, setFormSent] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  useReveal()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormSent(true)
    formRef.current?.reset()
    setTimeout(() => setFormSent(false), 5000)
  }

  return (
    <>
      {/* NAVBAR */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 60, padding: '0 32px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', background: 'transparent', borderBottom: '1px solid transparent',
      }}>
        <a href="#" style={{ textDecoration: 'none' }}><SebLogo size={34} /></a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="nav-desktop">
          {NAV.map(l => (
            <a key={l.href} href={l.href} style={{ color: 'var(--t1)', fontSize: 13, fontWeight: 500, textDecoration: 'none', letterSpacing: '0.02em', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--t0)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--t1)')}
            >{l.label}</a>
          ))}
          <a href="#contact" style={{
            background: 'var(--blue)', color: 'white', padding: '8px 18px',
            borderRadius: 4, fontSize: 12, fontWeight: 700, textDecoration: 'none',
            letterSpacing: '0.06em', textTransform: 'uppercase',
          }}>Devis</a>
        </div>

        <button className="nav-burger" onClick={() => setMenuOpen(v => !v)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: 'var(--t0)' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {menuOpen
              ? <><line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>
              : <><rect x="2" y="5" width="16" height="1.5" rx="0.75" fill="currentColor" /><rect x="2" y="9.25" width="16" height="1.5" rx="0.75" fill="currentColor" /><rect x="2" y="13.5" width="16" height="1.5" rx="0.75" fill="currentColor" /></>
            }
          </svg>
        </button>

        {menuOpen && (
          <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
            <SebLogo size={44} />
            {NAV.map(l => <a key={l.href} href={l.href} style={{ color: 'var(--t0)', fontSize: 28, fontWeight: 800, textDecoration: 'none', letterSpacing: '-0.02em' }}>{l.label}</a>)}
            <a href="#contact" style={{ background: 'var(--blue)', color: 'white', padding: '14px 36px', borderRadius: 4, fontSize: 14, fontWeight: 700, textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Devis gratuit</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 32px 64px', position: 'relative', overflow: 'hidden' }}>
        {/* Background grid */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
        {/* Blue vertical accent */}
        <div style={{ position: 'absolute', left: 32, top: '15%', bottom: '15%', width: 1, background: 'linear-gradient(to bottom, transparent, var(--blue) 30%, var(--blue) 70%, transparent)', zIndex: 1, opacity: 0.4 }} />
        {/* Big background text */}
        <div style={{
          position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)',
          fontSize: 'clamp(120px, 20vw, 260px)', fontWeight: 900, color: 'rgba(255,255,255,0.025)',
          letterSpacing: '-0.06em', lineHeight: 1, userSelect: 'none', zIndex: 0, pointerEvents: 'none',
          fontStyle: 'italic',
        }}>GARAGE</div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1100, width: '100%', margin: '0 auto' }}>
          {/* Label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ color: 'var(--t1)', fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Disponible — Prise en charge sous 48h</span>
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: 'clamp(42px, 8.5vw, 112px)', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.04em', marginBottom: 36 }}>
            <span style={{ display: 'block', color: 'var(--t0)' }}>Votre voiture</span>
            <span style={{ display: 'block', color: 'var(--t0)' }}>mérite</span>
            <span style={{ display: 'block', color: 'var(--blue)', fontStyle: 'italic' }}>mieux.</span>
          </h1>

          {/* Sub + CTA row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
            <p style={{ color: 'var(--t1)', fontSize: 'clamp(14px, 1.8vw, 18px)', maxWidth: 440, lineHeight: 1.7, fontWeight: 400 }}>
              Mécanicien CFC indépendant depuis plus de 10 ans. Révisions, diagnostics, préparations — un seul artisan, une seule responsabilité.
            </p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <a href="#contact" style={{
                background: 'var(--blue)', color: 'white', padding: '14px 28px',
                borderRadius: 4, fontSize: 13, fontWeight: 700, textDecoration: 'none',
                letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap',
              }}>Devis gratuit</a>
              <a href="#services" style={{
                color: 'var(--t1)', fontSize: 13, fontWeight: 500, textDecoration: 'none',
                letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: 6,
                transition: 'color 0.15s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--t0)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--t1)')}
              >
                Voir les services
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
          </div>

          {/* Stats inline */}
          <div style={{ display: 'flex', gap: 0, marginTop: 64, borderTop: '1px solid var(--border)', paddingTop: 32 }}>
            {[
              { v: '10+', l: 'ans d\'expérience' },
              { v: 'CFC', l: 'mécanicien diplômé' },
              { v: '2', l: 'ponts élévateurs' },
              { v: '100%', l: 'prix transparent' },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, paddingRight: 24, borderRight: i < 3 ? '1px solid var(--border)' : undefined, paddingLeft: i > 0 ? 24 : 0 }}>
                <div style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: 'var(--t0)', letterSpacing: '-0.03em' }}>{s.v}</div>
                <div style={{ fontSize: 11, color: 'var(--t2)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ background: 'var(--bg-1)', padding: '80px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ fontSize: 11, color: 'var(--blue)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Ce qu'on fait</p>
              <h2 style={{ fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }}>Services</h2>
            </div>
            <p style={{ color: 'var(--t1)', fontSize: 14, maxWidth: 320, lineHeight: 1.7 }}>
              Tout sauf la carrosserie. Si votre voiture a un problème mécanique, électronique ou de performance — on le règle.
            </p>
          </div>

          <div>
            {SERVICES.map((s, i) => (
              <div key={i} className={`service-row reveal`} style={{ padding: '24px 0', display: 'flex', alignItems: 'center', gap: 24 }}>
                <span className="service-num">{s.num}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, letterSpacing: '-0.01em' }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--t1)', lineHeight: 1.6 }}>{s.desc}</div>
                </div>
                <svg className="service-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 11, color: 'var(--blue)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Réalisations</p>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em' }}>Projets récents</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 2 }}>
            {PROJECTS.map((p, i) => (
              <div key={i} className="proj-card reveal" style={{ background: p.bg, minHeight: 280, padding: '28px 28px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {/* Top row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span className="proj-tag" style={{
                    background: 'rgba(255,255,255,0.08)', color: 'var(--t1)',
                    fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 2,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                  }}>{p.tag}</span>
                  <span style={{ color: 'var(--t2)', fontSize: 11, fontWeight: 500 }}>{p.year}</span>
                </div>

                {/* Car silhouette */}
                <div style={{ display: 'flex', justifyContent: 'center', opacity: 0.15, paddingTop: 16 }}>
                  <svg width="140" height="70" viewBox="0 0 140 70" fill="none">
                    <rect x="10" y="32" width="120" height="26" rx="10" fill="white" />
                    <rect x="28" y="14" width="70" height="26" rx="7" fill="white" />
                    <circle cx="35" cy="58" r="12" fill="#222" stroke="white" strokeWidth="3" />
                    <circle cx="105" cy="58" r="12" fill="#222" stroke="white" strokeWidth="3" />
                    <line x1="28" y1="32" x2="28" y2="38" stroke="white" strokeWidth="1.5" />
                    <line x1="98" y1="32" x2="98" y2="38" stroke="white" strokeWidth="1.5" />
                  </svg>
                </div>

                {/* Bottom */}
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 6 }}>{p.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--t1)', lineHeight: 1.5 }}>{p.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ background: 'var(--bg-1)', padding: '80px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 80, alignItems: 'center' }}>
          <div className="reveal">
            <p style={{ fontSize: 11, color: 'var(--blue)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>À propos</p>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 32, lineHeight: 1.05 }}>
              Un mécanicien.<br />Un atelier.<br /><span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>Zéro intermédiaire.</span>
            </h2>
            <p style={{ color: 'var(--t1)', fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
              Fort d'un <strong style={{ color: 'var(--t0)', fontWeight: 600 }}>CFC de mécanicien automobile</strong> et plus de 10 ans d'expérience en garages officiels et indépendants, Sébastien a ouvert son propre atelier pour faire les choses à sa façon : honnêtement.
            </p>
            <p style={{ color: 'var(--t1)', fontSize: 15, lineHeight: 1.8, marginBottom: 36 }}>
              2 ponts professionnels, outillage diagnostique complet, passion pour la mécanique haute performance. Du quotidien à la préparation sportive.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['CFC Mécanicien auto', 'Diagnostic OBD', 'Reprogrammation ECU', 'Géométrie'].map(t => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>

          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { label: 'Formation', value: 'CFC Mécanicien automobile, Suisse' },
              { label: 'Expérience', value: '10+ années, garages officiels & indépendant' },
              { label: 'Équipement', value: '2 ponts élévateurs, outil diag. multi-marques' },
              { label: 'Spécialité', value: 'Préparation moteur, reprogrammation, performance' },
              { label: 'Zone', value: 'Région Lausanne, Vaud' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, padding: '18px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 11, color: 'var(--t2)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', minWidth: 100, paddingTop: 2 }}>{row.label}</span>
                <span style={{ fontSize: 13, color: 'var(--t1)', lineHeight: 1.6 }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TARIFS */}
      <section id="tarifs" style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ fontSize: 11, color: 'var(--blue)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Tarifs</p>
              <h2 style={{ fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em' }}>Prix indicatifs</h2>
            </div>
            <p style={{ fontSize: 13, color: 'var(--t2)' }}>Devis gratuit pour chaque intervention.</p>
          </div>

          <div className="reveal">
            {TARIFS.map((t, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '20px 0', borderBottom: '1px solid var(--border)', gap: 16, flexWrap: 'wrap',
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{t.service}</div>
                  <div style={{ fontSize: 11, color: 'var(--t2)', letterSpacing: '0.04em' }}>{t.note}</div>
                </div>
                <span style={{
                  fontSize: 14, fontWeight: 800, color: t.prix === 'sur devis' ? 'var(--blue)' : 'var(--t0)',
                  letterSpacing: t.prix === 'sur devis' ? '0.04em' : '-0.01em', whiteSpace: 'nowrap',
                }}>{t.prix}</span>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ marginTop: 36 }}>
            <a href="#contact" style={{
              display: 'inline-block', background: 'var(--blue)', color: 'white',
              padding: '13px 26px', borderRadius: 4, fontSize: 12, fontWeight: 700,
              textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>Demander un devis gratuit</a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: 'var(--bg-1)', padding: '80px 32px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 11, color: 'var(--blue)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Contact</p>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 14 }}>Votre devis</h2>
            <p style={{ color: 'var(--t1)', fontSize: 14, lineHeight: 1.7 }}>Décrivez votre véhicule et la prestation souhaitée. Réponse garantie sous 24h.</p>
          </div>

          {formSent ? (
            <div className="reveal visible" style={{ border: '1px solid rgba(34,197,94,0.3)', borderRadius: 4, padding: '40px 32px', textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#22c55e', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Message envoyé</div>
              <div style={{ color: 'var(--t1)', fontSize: 14 }}>Je vous recontacte dans les 24h.</div>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--t2)', marginBottom: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Nom *</label>
                  <input className="field" type="text" placeholder="Votre nom" required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--t2)', marginBottom: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Téléphone *</label>
                  <input className="field" type="tel" placeholder="+41 76 000 00 00" required />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--t2)', marginBottom: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Véhicule *</label>
                <input className="field" type="text" placeholder="Marque, modèle, année — ex: BMW M3 2019" required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--t2)', marginBottom: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Service</label>
                <select className="field" style={{ appearance: 'none', cursor: 'pointer' }}>
                  <option value="">Sélectionner</option>
                  {SERVICES.map(s => <option key={s.num}>{s.title}</option>)}
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--t2)', marginBottom: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Message</label>
                <textarea className="field" placeholder="Décrivez le problème ou la prestation souhaitée…" rows={4} style={{ resize: 'vertical' }} />
              </div>
              <button type="submit" style={{
                background: 'var(--blue)', color: 'white', border: 'none', padding: '14px',
                borderRadius: 4, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                letterSpacing: '0.08em', textTransform: 'uppercase', width: '100%', marginTop: 4,
              }}>Envoyer →</button>
              <p style={{ fontSize: 11, color: 'var(--t2)', textAlign: 'center', letterSpacing: '0.04em' }}>
                DEVIS GRATUIT · SANS ENGAGEMENT · RÉPONSE SOUS 24H
              </p>
            </form>
          )}

          <div className="reveal" style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border)' }}>
            {[
              { icon: '↗', label: 'Téléphone', value: '+41 XX XXX XX XX' },
              { icon: '↗', label: 'Email', value: 'contact@seb-mecanique.ch' },
              { icon: '↗', label: 'Localisation', value: 'Région Lausanne, VD' },
            ].map((c, i) => (
              <div key={i} style={{ background: 'var(--bg-1)', padding: '20px 18px' }}>
                <div style={{ fontSize: 10, color: 'var(--t2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>{c.label}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--t1)' }}>{c.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <SebLogo size={30} />
          <div style={{ display: 'flex', gap: 28 }}>
            {NAV.map(l => (
              <a key={l.href} href={l.href} style={{ color: 'var(--t2)', fontSize: 12, textDecoration: 'none', letterSpacing: '0.04em', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--t1)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--t2)')}
              >{l.label}</a>
            ))}
          </div>
          <span style={{ color: 'var(--t2)', fontSize: 11 }}>© {new Date().getFullYear()} Seb Mécanique</span>
        </div>
      </footer>

      <style>{`
        @media (min-width: 769px) { .nav-burger { display: none !important; } }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-burger { display: flex !important; }
        }
        @media (max-width: 520px) {
          form > div:first-child { grid-template-columns: 1fr !important; }
          #contact > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
