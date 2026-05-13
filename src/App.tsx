import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

/** Redes y material de difusión */
const INSTAGRAM = "https://www.instagram.com/anep_uruguay/";
const REEL_PRESENTACION = "https://www.instagram.com/reels/DAB0FZYPVdn/";
const WHATSAPP_CONSULTAS = "https://wa.me/59897385931";
const BLOG_HISTORICO = "https://asociacionanepa.blogspot.com/";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX, transformOrigin: "0 50%" }}
      aria-hidden
    />
  );
}

function Nav() {
  return (
    <motion.header
      className="site-nav"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <a href="#inicio" className="nav-brand">
        <span className="nav-mark" aria-hidden>
          <svg width="36" height="36" viewBox="0 0 64 64" fill="none">
            <rect width="64" height="64" rx="14" fill="#0f172a" />
            <path
              d="M18 44V20l14 18 14-18v24"
              stroke="#c9a227"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="32" cy="16" r="3.5" fill="#c9a227" />
          </svg>
        </span>
        <span className="nav-titles">
          <span className="nav-name">ANEPA</span>
          <span className="nav-sub tracking-wide">Uruguay</span>
        </span>
      </a>
      <nav className="nav-links" aria-label="Principal">
        <a href="#mision">Misión</a>
        <a href="#actividades">Actividades</a>
        <a href="#socios">Socios</a>
        <a href="#contacto">Contacto</a>
      </nav>
    </motion.header>
  );
}

function SectionShell({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <section
      id={id}
      className={`panel ${className ?? ""}`}
      style={reduce ? { scrollSnapAlign: "none" as const } : undefined}
    >
      {children}
    </section>
  );
}

function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_CONSULTAS}
      className="wa-fab"
      target="_blank"
      rel="noreferrer"
      aria-label="Consultas por WhatsApp"
      title="WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden>
        <path
          fill="currentColor"
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
        />
      </svg>
    </a>
  );
}

export default function App() {
  const heroRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 56]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 0.96]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.45]);

  return (
    <>
      <div className="ambient" aria-hidden>
        <span className="orb orb-a" />
        <span className="orb orb-b" />
      </div>
      <ScrollProgress />
      <Nav />
      <WhatsAppFab />

      <section
        ref={heroRef}
        id="inicio"
        className="panel hero-wrap"
        style={reduceMotion ? { scrollSnapAlign: "none" as const } : undefined}
      >
        <div className="hero-grid-bg" aria-hidden />
        <motion.div
          className="hero-inner"
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
        >
          <p className="hero-eyebrow tracking-wide">Asociación civil · Uruguay</p>
          <h1 className="hero-title font-display">
            Asociación Nacional de{" "}
            <span className="hero-title-gold">Peluqueros, Estilistas y Afines</span>
          </h1>
          <p className="hero-lead">
            Unimos a peluqueros, barberos, maquilladores, especialistas en uñas y demás
            profesionales de la estética para capacitarnos, crecer y representar al sector.
          </p>
          <div className="hero-cta-row">
            <a className="btn btn-gold" href={REEL_PRESENTACION} target="_blank" rel="noreferrer">
              Ver presentación
            </a>
            <a className="btn btn-outline" href={INSTAGRAM} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a className="btn btn-ghost" href={WHATSAPP_CONSULTAS} target="_blank" rel="noreferrer">
              Ser socio · Consultas
            </a>
          </div>
          <p className="hero-note">
            Contenido alineado a la misión pública de ANEPA. Seguinos en{" "}
            <a href={INSTAGRAM} className="link-inline" target="_blank" rel="noreferrer">
              @anep_uruguay
            </a>
            .
          </p>
        </motion.div>
        <div className="scroll-hint" aria-hidden>
          <span className="scroll-hint-line" />
          <span className="scroll-hint-text tracking-wide">Conocé más</span>
        </div>
      </section>

      <SectionShell id="mision" className="section-muted">
        <motion.div
          className="section-inner split"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-70px" }}
        >
          <div>
            <p className="eyebrow tracking-wide">Por qué existimos</p>
            <h2 className="section-title font-display">Misión</h2>
            <p className="section-body">
              ANEPA agrupa oficios de la belleza —no solo el cabello— para fortalecer la
              comunidad profesional: aprender en conjunto, abrir puertas a la competencia
              sana y dar visibilidad al trabajo técnico y artístico del sector en Uruguay.
            </p>
          </div>
          <blockquote className="pullquote font-display">
            «La competencia no es con el otro, es con uno mismo. Perdamos el miedo,
            cambiemos el chip y ayudémonos mutuamente.»
            <footer className="pullquote-footer tracking-wide">
              — Carla Frola, entrevista ANEPA · 2025
            </footer>
          </blockquote>
        </motion.div>
      </SectionShell>

      <SectionShell id="actividades" className="section-activities">
        <div className="section-inner">
          <motion.div
            className="block-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <p className="eyebrow tracking-wide">Qué hacemos</p>
            <h2 className="section-title font-display">Actividades y proyectos</h2>
            <p className="section-sub">
              Talleres, encuentros en el interior, ferias y participación en eventos
              internacionales: la asociación impulsa formación continua y redes entre
              colegas.
            </p>
          </motion.div>
          <ul className="card-grid">
            {[
              {
                t: "Capacitación",
                d: "Talleres de técnica y tendencias con educadores invitados, en salón o en gira por el país.",
              },
              {
                t: "ANEPA Tour",
                d: "Jornadas en distintas ciudades: corte, permanente, brushing y más, acercando la formación a cada región.",
              },
              {
                t: "Ferias y congresos",
                d: "Presencia en exposiciones de belleza y espacios de networking con marcas y profesionales.",
              },
              {
                t: "Vínculos internacionales",
                d: "Intercambios y participación en competencias y congresos del mundo de la peluquería.",
              },
            ].map((item, i) => (
              <motion.li
                key={item.t}
                className="info-card"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-32px" }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="card-bar" aria-hidden />
                <h3 className="card-title tracking-wide">{item.t}</h3>
                <p className="card-text">{item.d}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </SectionShell>

      <SectionShell id="socios" className="section-socios">
        <motion.div
          className="section-inner socios-layout"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-70px" }}
        >
          <div>
            <p className="eyebrow tracking-wide">Sumate</p>
            <h2 className="section-title font-display">Ser socio</h2>
            <p className="section-body">
              La membresía es una forma concreta de sostener encuentros, traer referentes y
              mantener canales de consulta para el gremio. Si tenés salón o trabajás por
              cuenta propia en belleza y estética, podés pedir información de requisitos y
              cuota vigente por WhatsApp o Instagram.
            </p>
            <ul className="checklist">
              <li>Red de colegas a nivel país</li>
              <li>Prioridad en talleres y eventos</li>
              <li>Apoyo institucional y difusión</li>
            </ul>
          </div>
          <aside className="socios-aside">
            <p className="aside-kicker tracking-wide">Material extra</p>
            <p className="aside-text">
              Notas y contexto sobre la asociación en medios locales ayudan a entender el
              momento del sector.
            </p>
            <a
              className="btn btn-outline btn-block"
              href="https://elpueblodigital.uy/anepa-impulsa-la-unidad-y-el-crecimiento-en-la-industria-de-la-belleza-en-uruguay/"
              target="_blank"
              rel="noreferrer"
            >
              Nota en El Pueblo Digital
            </a>
            <a className="btn btn-ghost btn-block" href={BLOG_HISTORICO} target="_blank" rel="noreferrer">
              Blog histórico ANEPA
            </a>
          </aside>
        </motion.div>
      </SectionShell>

      <SectionShell id="contacto" className="section-contact">
        <div className="contact-glow" aria-hidden />
        <motion.div
          className="section-inner contact-block"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="eyebrow tracking-wide">Contacto</p>
          <h2 className="section-title font-display">Escribinos</h2>
          <p className="section-body contact-lead">
            Para sumarte como socio, prensa o alianzas: WhatsApp, Instagram o el video de
            presentación que compartimos en redes.
          </p>
          <div className="contact-actions">
            <a className="btn btn-gold btn-lg" href={WHATSAPP_CONSULTAS} target="_blank" rel="noreferrer">
              WhatsApp +598 97 385 931
            </a>
            <a className="btn btn-outline btn-lg" href={INSTAGRAM} target="_blank" rel="noreferrer">
              @anep_uruguay
            </a>
            <a className="btn btn-ghost btn-lg" href={REEL_PRESENTACION} target="_blank" rel="noreferrer">
              Ver reel de presentación
            </a>
          </div>
        </motion.div>
      </SectionShell>

      <footer className="site-footer">
        <p className="footer-acronym font-display">ANEPA</p>
        <p className="footer-full tracking-wide">
          Asociación Nacional de Peluqueros, Estilistas y Afines
        </p>
        <p className="footer-meta">Uruguay · Comunidad profesional de la belleza</p>
        <p className="footer-copy">© {new Date().getFullYear()} ANEPA</p>
      </footer>

      <style>{`
        .ambient {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.45;
        }
        .orb-a {
          width: min(50vw, 380px);
          height: min(50vw, 380px);
          background: radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, transparent 70%);
          top: -5%;
          right: -8%;
        }
        .orb-b {
          width: min(42vw, 320px);
          height: min(42vw, 320px);
          background: radial-gradient(circle, var(--gold-dim) 0%, transparent 70%);
          bottom: 15%;
          left: -12%;
        }
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--gold-soft), var(--accent));
          z-index: 100;
          pointer-events: none;
        }
        .site-nav {
          position: fixed;
          top: 3px;
          left: 0;
          right: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.85rem clamp(0.9rem, 3.5vw, 2.25rem);
          background: linear-gradient(
            to bottom,
            rgba(11, 18, 32, 0.96) 0%,
            rgba(11, 18, 32, 0.78) 60%,
            transparent
          );
          backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--line);
        }
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }
        .nav-mark svg {
          display: block;
          border-radius: 10px;
        }
        .nav-titles {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }
        .nav-name {
          font-weight: 700;
          font-size: 1.15rem;
          letter-spacing: 0.06em;
        }
        .nav-sub {
          font-size: 0.55rem;
          font-weight: 600;
          color: var(--muted);
          margin-top: 0.15rem;
        }
        .nav-links {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: clamp(0.5rem, 2vw, 1.1rem);
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .nav-links a {
          color: var(--muted);
          transition: color 0.2s;
        }
        .nav-links a:hover {
          color: var(--gold-soft);
        }
        .wa-fab {
          position: fixed;
          bottom: 1.25rem;
          right: 1.25rem;
          z-index: 60;
          width: 3.25rem;
          height: 3.25rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(145deg, #0f766e, #0d9488);
          color: #fff;
          box-shadow: 0 12px 32px rgba(13, 148, 136, 0.4);
          transition: transform 0.2s;
        }
        .wa-fab:hover {
          transform: scale(1.05);
        }
        .panel {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: clamp(4.25rem, 10vh, 6rem) clamp(1rem, 4vw, 2.5rem);
        }
        .hero-wrap {
          padding-top: 5rem;
          background: radial-gradient(ellipse 90% 55% at 50% 0%, rgba(201, 162, 39, 0.08), transparent 50%),
            var(--bg);
        }
        .hero-grid-bg {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(148, 163, 184, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.06) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent);
          pointer-events: none;
        }
        .hero-inner {
          position: relative;
          max-width: 46rem;
          text-align: center;
        }
        .hero-eyebrow {
          font-size: 0.62rem;
          font-weight: 600;
          color: var(--gold-soft);
          margin: 0 0 1rem;
        }
        .hero-title {
          font-size: clamp(1.75rem, 5vw, 2.85rem);
          font-weight: 600;
          line-height: 1.15;
          margin: 0 0 1.25rem;
          color: var(--fg);
        }
        .hero-title-gold {
          color: var(--gold-soft);
          display: inline;
        }
        .hero-lead {
          margin: 0 auto 2rem;
          max-width: 38rem;
          font-size: 1.02rem;
          font-weight: 300;
          color: var(--muted);
          line-height: 1.7;
        }
        .hero-cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.85rem 1.35rem;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border-radius: 3px;
          border: 1px solid transparent;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s, border-color 0.2s, color 0.2s;
        }
        .btn:hover {
          transform: translateY(-1px);
        }
        .btn-gold {
          background: linear-gradient(135deg, var(--gold-soft), var(--gold));
          color: #0b1220;
          box-shadow: 0 8px 28px rgba(201, 162, 39, 0.25);
        }
        .btn-gold:hover {
          box-shadow: 0 12px 36px rgba(201, 162, 39, 0.35);
        }
        .btn-outline {
          border-color: rgba(201, 162, 39, 0.45);
          color: var(--gold-soft);
          background: rgba(201, 162, 39, 0.06);
        }
        .btn-outline:hover {
          border-color: var(--gold-soft);
          background: rgba(201, 162, 39, 0.12);
        }
        .btn-ghost {
          border-color: var(--line);
          color: var(--fg);
          background: rgba(255, 255, 255, 0.03);
        }
        .btn-ghost:hover {
          border-color: rgba(148, 163, 184, 0.35);
        }
        .btn-lg {
          padding: 1rem 1.5rem;
          font-size: 0.6rem;
        }
        .btn-block {
          width: 100%;
        }
        .hero-note {
          font-size: 0.8rem;
          color: var(--muted);
          margin: 0;
        }
        .link-inline {
          color: var(--accent);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .link-inline:hover {
          color: var(--gold-soft);
        }
        .scroll-hint {
          position: absolute;
          bottom: 1.75rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          opacity: 0.45;
        }
        .scroll-hint-line {
          width: 1px;
          height: 2.5rem;
          background: linear-gradient(to bottom, transparent, var(--gold-soft));
          animation: pulse-line 2.2s ease-in-out infinite;
        }
        .scroll-hint-text {
          font-size: 0.52rem;
          color: var(--muted);
        }
        @keyframes pulse-line {
          0%, 100% { opacity: 0.35; transform: scaleY(0.88); }
          50% { opacity: 1; transform: scaleY(1); }
        }
        .section-inner {
          width: 100%;
          max-width: 56rem;
        }
        .section-muted {
          background: var(--bg-elevated);
          border-top: 1px solid var(--line);
        }
        .split {
          display: grid;
          gap: 2rem;
          align-items: start;
        }
        @media (min-width: 840px) {
          .split {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: center;
          }
        }
        .eyebrow {
          font-size: 0.6rem;
          font-weight: 700;
          color: var(--gold-soft);
          margin: 0 0 0.5rem;
        }
        .section-title {
          font-size: clamp(1.85rem, 4.5vw, 2.6rem);
          margin: 0 0 1rem;
          line-height: 1.15;
        }
        .section-body {
          margin: 0;
          color: var(--muted);
          font-size: 0.95rem;
          font-weight: 300;
          line-height: 1.75;
        }
        .pullquote {
          margin: 0;
          padding: 1.5rem 1.35rem;
          border-left: 3px solid var(--gold);
          background: rgba(201, 162, 39, 0.06);
          border-radius: 0 12px 12px 0;
          font-size: 1.05rem;
          font-style: italic;
          color: var(--fg);
          line-height: 1.55;
        }
        .pullquote-footer {
          display: block;
          margin-top: 1rem;
          font-size: 0.55rem;
          font-style: normal;
          color: var(--muted);
          letter-spacing: 0.12em;
        }
        .section-activities {
          background: var(--bg);
          border-top: 1px solid var(--line);
        }
        .block-header {
          text-align: center;
          max-width: 40rem;
          margin: 0 auto 2.5rem;
        }
        .section-sub {
          margin: 0.75rem 0 0;
          color: var(--muted);
          font-size: 0.92rem;
          font-weight: 300;
          line-height: 1.65;
        }
        .card-grid {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        }
        .info-card {
          position: relative;
          padding: 1.5rem 1.35rem 1.35rem;
          border: 1px solid var(--line);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          transition: border-color 0.25s, transform 0.25s;
        }
        .info-card:hover {
          border-color: rgba(201, 162, 39, 0.35);
          transform: translateY(-2px);
        }
        .card-bar {
          position: absolute;
          top: 0;
          left: 1.35rem;
          right: 1.35rem;
          height: 2px;
          background: linear-gradient(90deg, var(--gold), var(--accent));
          border-radius: 2px;
          opacity: 0.85;
        }
        .card-title {
          font-size: 0.68rem;
          margin: 0.85rem 0 0.45rem;
          font-weight: 700;
          color: var(--fg);
        }
        .card-text {
          margin: 0;
          font-size: 0.84rem;
          color: var(--muted);
          line-height: 1.55;
          font-weight: 300;
        }
        .section-socios {
          background: linear-gradient(180deg, var(--bg-elevated), var(--bg));
          border-top: 1px solid var(--line);
        }
        .socios-layout {
          display: grid;
          gap: 2rem;
        }
        @media (min-width: 800px) {
          .socios-layout {
            grid-template-columns: 1.15fr 0.85fr;
            gap: 2.5rem;
            align-items: start;
          }
        }
        .checklist {
          margin: 1.25rem 0 0;
          padding: 0 0 0 1.1rem;
          color: var(--muted);
          font-size: 0.9rem;
          line-height: 1.7;
        }
        .checklist li {
          margin-bottom: 0.35rem;
        }
        .socios-aside {
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid var(--line);
          background: rgba(15, 23, 42, 0.6);
        }
        .aside-kicker {
          font-size: 0.58rem;
          color: var(--gold-soft);
          margin: 0 0 0.5rem;
          font-weight: 700;
        }
        .aside-text {
          margin: 0 0 1rem;
          font-size: 0.85rem;
          color: var(--muted);
          line-height: 1.55;
        }
        .socios-aside .btn + .btn {
          margin-top: 0.5rem;
        }
        .section-contact {
          position: relative;
          border-top: 1px solid var(--line);
          overflow: hidden;
          background: radial-gradient(ellipse 70% 50% at 50% 100%, rgba(56, 189, 248, 0.1), transparent),
            var(--bg);
        }
        .contact-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 80%, rgba(201, 162, 39, 0.12), transparent 55%);
          pointer-events: none;
        }
        .contact-block {
          position: relative;
          text-align: center;
        }
        .contact-lead {
          max-width: 32rem;
          margin: 0 auto 1.75rem;
        }
        .contact-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        @media (min-width: 540px) {
          .contact-actions {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
        .site-footer {
          position: relative;
          z-index: 1;
          scroll-snap-align: end;
          padding: 2.5rem 1.25rem 3.25rem;
          text-align: center;
          border-top: 1px solid var(--line);
          background: #080e18;
        }
        .footer-acronym {
          font-size: clamp(2rem, 5vw, 2.5rem);
          font-weight: 700;
          margin: 0;
          color: var(--gold-soft);
        }
        .footer-full {
          font-size: 0.55rem;
          font-weight: 600;
          color: var(--muted);
          margin: 0.5rem 0 0.25rem;
          max-width: 22rem;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.5;
        }
        .footer-meta {
          margin: 0 0 0.75rem;
          font-size: 0.78rem;
          color: var(--muted);
        }
        .footer-copy {
          margin: 0;
          font-size: 0.68rem;
          color: var(--muted);
          opacity: 0.85;
        }
      `}</style>
    </>
  );
}
