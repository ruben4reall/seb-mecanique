'use client'

import { useEffect, useRef, useState } from 'react'

/* ── Inline SVG logo (replace with <img src="/logo.png"> once logo is placed) ── */
function SebLogo({ size = 40 }: { size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: size, height: size, borderRadius: '50%', background: '#111',
        border: '2px solid #1d6ef5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
      }}>
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 32 18" fill="none">
          <rect x="2" y="8" width="28" height="8" rx="3" fill="white" />
          <rect x="7" y="4" width="14" height="7" rx="2" fill="white" />
          <circle cx="8" cy="16" r="3" fill="#111" stroke="white" strokeWidth="1.5" />
          <circle cx="24" cy="16" r="3" fill="#111" stroke="white" strokeWidth="1.5" />
        </svg>
      </div>
      <div style={{ lineHeight: 1 }}>
        <div style={{ fontSize: size * 0.38, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>SEB</div>
        <div style={{ fontSize: size * 0.25, fontWeight: 600, color: '#1d6ef5', letterSpacing: '0.12em' }}>MÉCANIQUE</div>
      </div>
    </div>
  )
}

/* ── Scroll reveal hook ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.12 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ── Sections ── */
const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Réalisations', href: '#projects' },
  { label: 'À propos', href: '#about' },
  { label: 'Tarifs', href: '#tarifs' },
  { label: 'Contact', href: '#contact' },
]

const SERVICES = [
  {
    icon: '🔧',
    title: 'Révision & entretien',
    desc: 'Vidange, filtres, bougies, courroies — tout le nécessaire pour garder votre véhicule en parfait état.',
    badge: 'Populaire',
  },
  {
    icon: '🔬',
    title: 'Diagnostic électronique',
    desc: 'Lecture OBD, analyse des défauts moteur et systèmes embarqués avec outils professionnels.',
  },
  {
    icon: '🛞',
    title: 'Pneus & jantes',
    desc: "Montage, démontage, équilibrage et stockage de pneus. Toutes dimensions, toutes marques.",
  },
  {
    icon: '🛑',
    title: 'Freins & suspension',
    desc: 'Remplacement disques, plaquettes, étriers. Contrôle et réglage de la géométrie.',
  },
  {
    icon: '⚡',
    title: 'Préparation & performance',
    desc: 'Reprogrammation moteur, optimisation de la cartographie, préparation circuit.',
    badge: 'Spécialité',
  },
  {
    icon: '📋',
    title: 'Expertise & pré-contrôle',
    desc: 'Expertise avant achat, pré-contrôle technique, bilan santé complet du véhicule.',
  },
]

const PROJECTS = [
  {
    title: 'Subaru WRX STI',
    tag: 'Préparation',
    desc: 'Stage 2+ — reprogrammation, downpipe 3\", intercooler sport, 380 ch.',
    color: '#1a3a6e',
  },
  {
    title: 'BMW M3 E46',
    tag: 'Restauration',
    desc: 'Révision complète moteur S54, joints de culasse, chaîne de distribution.',
    color: '#1a1a3a',
  },
  {
    title: 'Golf GTI Mk7',
    tag: 'Stage 1',
    desc: 'Remap ECU, filtre à air sport, ligne d\'échappement cat-back.',
    color: '#1a3630',
  },
  {
    title: 'Audi RS3 8V',
    tag: 'Entretien',
    desc: 'Vidange DSG, révision complète 60 000 km, remplacement injecteurs.',
    color: '#2a1a1a',
  },
]

const STATS = [
  { value: '10+', label: 'années d\'expérience' },
  { value: 'CFC', label: 'mécanicien diplômé' },
  { value: '100%', label: 'transparent' },
  { value: '2', label: 'ponts élévateurs' },
]

const TARIFS = [
  { service: 'Vidange huile + filtre', prix: 'dès CHF 89' },
  { service: 'Révision complète (petite)', prix: 'dès CHF 249' },
  { service: 'Diagnostic électronique', prix: 'dès CHF 89' },
  { service: 'Freins avant (disques + plaquettes)', prix: 'dès CHF 280' },
  { service: 'Pneus (montage + équilibrage × 4)', prix: 'dès CHF 80' },
  { service: 'Expertise avant achat', prix: 'dès CHF 120' },
  { service: 'Reprogrammation Stage 1', prix: 'sur devis' },
]

/* ── Main component ── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [formSent, setFormSent] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  useReveal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormSent(true)
    formRef.current?.reset()
    setTimeout(() => setFormSent(false), 5000)
  }

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '0 24px', height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? undefined : 'transparent',
          borderBottom: scrolled ? undefined : '1px solid transparent',
        }}
      >
        <a href="#" style={{ textDecoration: 'none' }}>
          <SebLogo size={36} />
        </a>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hidden-mobile">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} style={{
              color: 'var(--t1)', fontSize: 14, fontWeight: 500, textDecoration: 'none',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--t1)')}
            >{l.label}</a>
          ))}
          <a href="#contact" style={{
            background: 'var(--blue)', color: 'white', padding: '9px 20px',
            borderRadius: 100, fontSize: 13, fontWeight: 600, textDecoration: 'none',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--blue-dark)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--blue)')}
          >
            Devis gratuit
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="show-mobile"
          onClick={() => setMenuOpen(v => !v)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: 'white' }}
          aria-label="Menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {menuOpen
              ? <><line x1="4" y1="4" x2="18" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" /><line x1="18" y1="4" x2="4" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" /></>
              : <><rect x="3" y="6" width="16" height="2" rx="1" fill="white" /><rect x="3" y="10" width="16" height="2" rx="1" fill="white" /><rect x="3" y="14" width="16" height="2" rx="1" fill="white" /></>
            }
          </svg>
        </button>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
            <SebLogo size={44} />
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} style={{ color: 'white', fontSize: 22, fontWeight: 600, textDecoration: 'none' }}>
                {l.label}
              </a>
            ))}
            <a href="#contact" style={{
              background: 'var(--blue)', color: 'white', padding: '14px 32px',
              borderRadius: 100, fontSize: 16, fontWeight: 600, textDecoration: 'none',
            }}>
              Devis gratuit
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        className="hero-grid noise"
        style={{
          position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
          justifyContent: 'center', overflow: 'hidden', padding: '120px 24px 80px',
        }}
      >
        {/* Blobs */}
        <div className="blob" style={{
          position: 'absolute', width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(29,110,245,0.18) 0%, transparent 70%)',
          top: -100, left: -200, pointerEvents: 'none',
        }} />
        <div className="blob-delay" style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(29,110,245,0.12) 0%, transparent 70%)',
          bottom: 0, right: -100, pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 740 }}>
          {/* Availability badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
            <div style={{ position: 'relative', width: 10, height: 10 }}>
              <div className="ping" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#22c55e' }} />
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#22c55e' }} />
            </div>
            <span style={{ color: 'var(--t1)', fontSize: 13, fontWeight: 500 }}>Disponible — Prise en charge sous 48h</span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 7vw, 80px)', fontWeight: 800, lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.03em' }}>
            La mécanique,<br />
            <span className="text-gradient">c'est notre passion.</span>
          </h1>

          <p style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', color: 'var(--t1)', maxWidth: 540, margin: '0 auto 40px', lineHeight: 1.65 }}>
            Mécanicien CFC indépendant depuis plus de 10 ans. Révisions, diagnostics,
            préparations — votre voiture entre de bonnes mains.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#contact" style={{
              background: 'var(--blue)', color: 'white', padding: '15px 32px',
              borderRadius: 100, fontSize: 15, fontWeight: 600, textDecoration: 'none',
              boxShadow: '0 0 40px var(--blue-glow-strong)',
              transition: 'background 0.2s, box-shadow 0.2s',
              display: 'inline-block',
            }}>
              Demander un devis
            </a>
            <a href="#services" style={{
              border: '1px solid var(--border-light)', color: 'var(--t0)', padding: '15px 32px',
              borderRadius: 100, fontSize: 15, fontWeight: 600, textDecoration: 'none',
              transition: 'border-color 0.2s, background 0.2s',
              display: 'inline-block',
            }}>
              Nos services →
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="scroll-indicator" style={{ marginTop: 72, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <span style={{ color: 'var(--t2)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Découvrir</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M4 9l4 4 4-4" stroke="var(--t2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ background: 'var(--bg-1)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '32px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 24 }}>
          {STATS.map((s, i) => (
            <div key={i} className="reveal" style={{ textAlign: 'center', transitionDelay: `${i * 0.1}s` }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--blue)', letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontSize: 13, color: 'var(--t1)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: '100px 24px', maxWidth: 1140, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ color: 'var(--blue)', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Ce qu'on fait</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginTop: 12, letterSpacing: '-0.02em' }}>
            Des services complets,<br /><span className="text-gradient">sans compromis</span>
          </h2>
          <p style={{ color: 'var(--t1)', marginTop: 16, fontSize: 16, maxWidth: 500, margin: '16px auto 0' }}>
            Tout sauf la carrosserie. Révision, performance, diagnostic — on s'occupe de tout.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className={`service-card reveal`}
              style={{
                background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 16,
                padding: 28, position: 'relative', transitionDelay: `${(i % 3) * 0.1}s`,
              }}
            >
              {s.badge && (
                <span style={{
                  position: 'absolute', top: 20, right: 20,
                  background: 'rgba(29,110,245,0.15)', color: 'var(--blue)',
                  fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100,
                  letterSpacing: '0.05em',
                }}>{s.badge}</span>
              )}
              <div style={{ fontSize: 28, marginBottom: 14 }}>{s.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ color: 'var(--t1)', fontSize: 14, lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ background: 'var(--bg-1)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '100px 24px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ color: 'var(--blue)', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Réalisations</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginTop: 12, letterSpacing: '-0.02em' }}>
              Des projets qui parlent<br /><span className="text-gradient">d'eux-mêmes</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {PROJECTS.map((p, i) => (
              <div
                key={i}
                className="project-card reveal"
                style={{
                  background: p.color, border: '1px solid var(--border)', borderRadius: 16,
                  overflow: 'hidden', transitionDelay: `${(i % 4) * 0.1}s`, position: 'relative',
                  minHeight: 220,
                }}
              >
                {/* Gradient overlay at bottom */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)',
                }} />
                {/* Top badge */}
                <div style={{ position: 'absolute', top: 16, left: 16 }}>
                  <span style={{
                    background: 'rgba(29,110,245,0.2)', backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(29,110,245,0.3)', color: 'var(--blue-light)',
                    fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 100,
                  }}>{p.tag}</span>
                </div>
                {/* Car icon */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -60%)', opacity: 0.12 }}>
                  <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
                    <rect x="10" y="28" width="100" height="22" rx="8" fill="white" />
                    <rect x="22" y="14" width="60" height="22" rx="6" fill="white" />
                    <circle cx="30" cy="50" r="10" fill="#333" stroke="white" strokeWidth="3" />
                    <circle cx="90" cy="50" r="10" fill="#333" stroke="white" strokeWidth="3" />
                  </svg>
                </div>
                {/* Content */}
                <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
                  <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{p.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--t1)', lineHeight: 1.5 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: '100px 24px', maxWidth: 1140, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>
          <div className="reveal-left">
            <span style={{ color: 'var(--blue)', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>À propos</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginTop: 12, marginBottom: 24, letterSpacing: '-0.02em' }}>
              Seb, mécanicien<br /><span className="text-gradient">passionné & certifié</span>
            </h2>
            <p style={{ color: 'var(--t1)', fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
              Fort d'un <strong style={{ color: 'white' }}>CFC de mécanicien automobile</strong> et de plus de 10 ans d'expérience dans des garages officiels et indépendants, Sébastien a fondé son propre atelier pour offrir un service <strong style={{ color: 'white' }}>honnête, transparent et de qualité</strong>.
            </p>
            <p style={{ color: 'var(--t1)', fontSize: 15, lineHeight: 1.8, marginBottom: 36 }}>
              Avec 2 ponts élévateurs professionnels et un outillage complet, l'atelier prend en charge tous types de véhicules — des voitures de tous les jours aux préparations sportives.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {['CFC Mécanicien', 'Diagnostic OBD', 'Reprogrammation', 'Géométrie'].map(tag => (
                <span key={tag} style={{
                  border: '1px solid var(--border-light)', color: 'var(--t1)', fontSize: 12,
                  fontWeight: 500, padding: '6px 14px', borderRadius: 100,
                }}>{tag}</span>
              ))}
            </div>
          </div>

          <div className="reveal-right" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '🏆', title: 'CFC mécanicien automobile', desc: 'Diplôme fédéral suisse, formation complète et reconnue.' },
              { icon: '🔧', title: '2 ponts élévateurs', desc: 'Atelier professionnel équipé pour tous types d\'interventions.' },
              { icon: '💬', title: 'Devis transparent', desc: 'Prix fixés à l\'avance, pas de surprises à la facture.' },
              { icon: '⚡', title: 'Spécialiste préparation', desc: 'Reprogrammation moteur, préparation circuit — ma passion.' },
            ].map((c, i) => (
              <div key={i} style={{
                background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 14,
                padding: '18px 22px', display: 'flex', gap: 16, alignItems: 'flex-start',
                transitionDelay: `${i * 0.1}s`,
              }}>
                <div style={{ fontSize: 22 }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{c.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--t1)', lineHeight: 1.5 }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARIFS ── */}
      <section id="tarifs" style={{ background: 'var(--bg-1)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '100px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ color: 'var(--blue)', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Tarifs</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginTop: 12, letterSpacing: '-0.02em' }}>
              Des prix <span className="text-gradient">justes & clairs</span>
            </h2>
            <p style={{ color: 'var(--t1)', marginTop: 16, fontSize: 15 }}>
              Tarifs indicatifs. Devis gratuit pour chaque intervention.
            </p>
          </div>
          <div className="reveal" style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 18, overflow: 'hidden' }}>
            {TARIFS.map((t, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '18px 28px',
                borderBottom: i < TARIFS.length - 1 ? '1px solid var(--border)' : undefined,
              }}>
                <span style={{ fontSize: 14, color: 'var(--t1)' }}>{t.service}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: t.prix === 'sur devis' ? 'var(--blue)' : 'white', whiteSpace: 'nowrap', marginLeft: 16 }}>{t.prix}</span>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ textAlign: 'center', marginTop: 32 }}>
            <a href="#contact" style={{
              background: 'var(--blue)', color: 'white', padding: '13px 28px',
              borderRadius: 100, fontSize: 14, fontWeight: 600, textDecoration: 'none',
              display: 'inline-block', boxShadow: '0 0 30px var(--blue-glow)',
            }}>
              Demander un devis gratuit
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACT / DEVIS ── */}
      <section id="contact" style={{ padding: '100px 24px', maxWidth: 640, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ color: 'var(--blue)', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Contact</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginTop: 12, letterSpacing: '-0.02em' }}>
            Votre devis <span className="text-gradient">gratuit</span>
          </h2>
          <p style={{ color: 'var(--t1)', marginTop: 16, fontSize: 15 }}>
            Décrivez votre véhicule et le service souhaité — je reviens vers vous sous 24h.
          </p>
        </div>

        {formSent ? (
          <div className="reveal visible" style={{
            background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: 16, padding: '32px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Message envoyé !</div>
            <div style={{ color: 'var(--t1)', fontSize: 14 }}>Je vous recontacte dans les 24h. À bientôt !</div>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--t1)', marginBottom: 6, letterSpacing: '0.04em' }}>NOM *</label>
                <input className="form-input" type="text" placeholder="Votre nom" required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--t1)', marginBottom: 6, letterSpacing: '0.04em' }}>TÉLÉPHONE *</label>
                <input className="form-input" type="tel" placeholder="+41 76 000 00 00" required />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--t1)', marginBottom: 6, letterSpacing: '0.04em' }}>VÉHICULE *</label>
              <input className="form-input" type="text" placeholder="Ex: VW Golf GTI 2019" required />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--t1)', marginBottom: 6, letterSpacing: '0.04em' }}>SERVICE SOUHAITÉ</label>
              <select className="form-input" style={{ appearance: 'none', cursor: 'pointer' }}>
                <option value="">Sélectionner un service</option>
                <option>Révision & entretien</option>
                <option>Diagnostic électronique</option>
                <option>Changement de pneus</option>
                <option>Freins & suspension</option>
                <option>Préparation & performance</option>
                <option>Expertise & pré-contrôle</option>
                <option>Autre</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--t1)', marginBottom: 6, letterSpacing: '0.04em' }}>MESSAGE</label>
              <textarea
                className="form-input"
                placeholder="Décrivez le problème ou la prestation souhaitée…"
                rows={4}
                style={{ resize: 'vertical' }}
              />
            </div>
            <button type="submit" style={{
              background: 'var(--blue)', color: 'white', border: 'none', padding: '15px 32px',
              borderRadius: 100, fontSize: 15, fontWeight: 600, cursor: 'pointer',
              boxShadow: '0 0 30px var(--blue-glow)', transition: 'background 0.2s',
              width: '100%',
            }}>
              Envoyer ma demande
            </button>
            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--t2)' }}>
              Réponse garantie sous 24h · Devis 100% gratuit & sans engagement
            </p>
          </form>
        )}

        {/* Contact info */}
        <div className="reveal" style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
          {[
            { icon: '📞', label: 'Téléphone', value: '+41 XX XXX XX XX' },
            { icon: '📧', label: 'Email', value: 'contact@seb-mecanique.ch' },
            { icon: '📍', label: 'Localisation', value: 'Région Lausanne, VD' },
          ].map((c, i) => (
            <div key={i} style={{
              background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 12,
              padding: '16px 20px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{c.icon}</div>
              <div style={{ fontSize: 11, color: 'var(--t2)', letterSpacing: '0.06em', marginBottom: 4 }}>{c.label.toUpperCase()}</div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{c.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: '1px solid var(--border)', padding: '40px 24px',
        background: 'var(--bg-1)',
      }}>
        <div style={{
          maxWidth: 1140, margin: '0 auto',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 24,
        }}>
          <SebLogo size={32} />
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} style={{ color: 'var(--t2)', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--t1)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--t2)')}
              >{l.label}</a>
            ))}
          </div>
          <div style={{ color: 'var(--t2)', fontSize: 12 }}>
            © {new Date().getFullYear()} Seb Mécanique — Tous droits réservés
          </div>
        </div>
      </footer>

      {/* Responsive helpers */}
      <style>{`
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
        @media (max-width: 640px) {
          form > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
