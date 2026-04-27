import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

const INSTAGRAM = "https://www.instagram.com/carlafrolapisacco/";
const WHATSAPP = "https://wa.me/59897385931";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Albisu+44%2C+Salto%2C+Uruguay";
const MAPS_EMBED =
  "https://maps.google.com/maps?q=Albisu+44,+Salto,+Uruguay&hl=es&z=16&output=embed";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
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
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, delay: 0.15 }}
    >
      <a href="#inicio" className="nav-brand">
        <span className="nav-brand-script font-script">Carla Frola</span>
        <span className="nav-brand-sub tracking-wide">Beauty Concept</span>
      </a>
      <nav className="nav-links" aria-label="Principal">
        <a href="#sobre">Sobre</a>
        <a href="#servicios">Servicios</a>
        <a href="#ubicacion">Salón</a>
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
      href={WHATSAPP}
      className="wa-fab"
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir por WhatsApp"
      title="WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden>
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
  const logoY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 100]);
  const logoScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, reduceMotion ? 1 : 0.9]
  );
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0.4]);

  return (
    <>
      <div className="ambient" aria-hidden>
        <span className="orb orb-a" />
        <span className="orb orb-b" />
        <span className="orb orb-c" />
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
        <div className="hero-frame" aria-hidden />
        <motion.div className="hero-inner" style={{ opacity: heroOpacity }}>
          <motion.div
            className="hero-badges"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="pill tracking-wide">Peluquería</span>
            <span className="pill pill-rose tracking-wide">Salto, UY</span>
          </motion.div>
          <motion.div
            className="hero-logo-wrap"
            style={{ y: logoY, scale: logoScale }}
          >
            <div className="hero-logo-ring">
              <img
                src="/logo.png"
                alt="Carla Frola Beauty Concept — peluquería"
                className="hero-logo"
                width={420}
                height={280}
              />
            </div>
          </motion.div>
          <motion.p
            className="hero-kicker tracking-wide"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
          >
            Estilista &amp; colorista profesional
          </motion.p>
          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            Más de <strong>30 años</strong> creando color y formas que te hacen brillar.
          </motion.p>
          <motion.div
            className="hero-cta-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.55 }}
          >
            <a className="btn btn-primary" href={WHATSAPP} target="_blank" rel="noreferrer">
              Pedir turno
            </a>
            <a className="btn btn-ghost" href={INSTAGRAM} target="_blank" rel="noreferrer">
              Ver Instagram
            </a>
          </motion.div>
        </motion.div>
        <div className="scroll-hint" aria-hidden>
          <span className="scroll-hint-line" />
          <span className="scroll-hint-text tracking-wide">Descubrí más</span>
        </div>
      </section>

      <SectionShell id="sobre" className="section-dark">
        <motion.div
          className="section-inner about-grid"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-70px" }}
        >
          <div className="about-copy">
            <p className="eyebrow eyebrow-rose tracking-wide">La peluquería</p>
            <h2 className="section-title font-script">Tu pelo, en buenas manos</h2>
            <p className="section-body">
              En <strong>Beauty Concept</strong> combinamos experiencia y tendencias: color
              con criterio, cortes que favorecen y un trato cercano. Cada visita es para
              que te vayas con el pelo —y la energía— que querés.
            </p>
          </div>
          <ul className="about-stats">
            <li>
              <span className="stat-num font-script">30+</span>
              <span className="stat-label tracking-wide">Años de oficio</span>
            </li>
            <li>
              <span className="stat-num" aria-hidden>
                💇‍♀️
              </span>
              <span className="stat-label tracking-wide">Corte &amp; estilo</span>
            </li>
            <li>
              <span className="stat-num" aria-hidden>
                🎨
              </span>
              <span className="stat-label tracking-wide">Colorista</span>
            </li>
          </ul>
        </motion.div>
      </SectionShell>

      <SectionShell id="servicios" className="section-services">
        <div className="section-inner">
          <motion.div
            className="services-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <p className="eyebrow eyebrow-rose tracking-wide">En el salón</p>
            <h2 className="section-title font-script">Servicios</h2>
            <p className="services-lead">
              Trabajamos con productos de calidad y técnicas pensadas para el cabello
              uruguayo.
            </p>
          </motion.div>
          <ul className="service-grid">
            {[
              {
                title: "Color",
                text: "Mechas, balayage, tintes y correcciones con acabado luminoso y natural.",
              },
              {
                title: "Corte",
                text: "Formas limpias o con movimiento, según tu rostro y tu estilo de vida.",
              },
              {
                title: "Peinado",
                text: "Brushing, ondas y recogidos para el día a día o tu evento especial.",
              },
              {
                title: "Tratamientos",
                text: "Nutrición, brillo y alivio para cabellos castigados o con frizz.",
              },
            ].map((item, i) => (
              <motion.li
                key={item.title}
                className="service-card"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-36px" }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="service-accent" aria-hidden />
                <span className="service-num tracking-wide">0{i + 1}</span>
                <h3 className="service-title tracking-wide">{item.title}</h3>
                <p className="service-text">{item.text}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </SectionShell>

      <SectionShell id="ubicacion" className="section-map">
        <motion.div
          className="section-inner map-layout"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-70px" }}
        >
          <div className="map-copy">
            <p className="eyebrow eyebrow-rose tracking-wide">Salón</p>
            <h2 className="section-title font-script">Visitános</h2>
            <p className="section-body map-address">
              <span className="map-pin" aria-hidden>
                📍
              </span>
              <strong>Albisu 44</strong>
              <br />
              Salto, Uruguay
            </p>
            <a className="btn btn-outline" href={MAPS_URL} target="_blank" rel="noreferrer">
              Abrir en Google Maps
            </a>
          </div>
          <div className="map-embed-wrap">
            <iframe
              title="Ubicación — Albisu 44, Salto"
              className="map-embed"
              src={MAPS_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </SectionShell>

      <SectionShell id="contacto" className="section-cta">
        <div className="cta-glow" aria-hidden />
        <motion.div
          className="section-inner cta-block"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="eyebrow eyebrow-rose tracking-wide">Reservá</p>
          <h2 className="section-title font-script">Hablemos por WhatsApp</h2>
          <p className="section-body cta-lead">
            Como en nuestro{" "}
            <a href={INSTAGRAM} className="inline-link" target="_blank" rel="noreferrer">
              Instagram
            </a>
            : escribinos y coordinamos tu próxima visita al salón.
          </p>
          <div className="cta-buttons">
            <a className="btn btn-primary btn-lg" href={WHATSAPP} target="_blank" rel="noreferrer">
              WhatsApp +598 97 385 931
            </a>
            <a className="btn btn-ghost btn-lg" href={INSTAGRAM} target="_blank" rel="noreferrer">
              @carlafrolapisacco
            </a>
          </div>
        </motion.div>
      </SectionShell>

      <footer className="site-footer">
        <p className="footer-brand font-script">Carla Frola Pisacco</p>
        <p className="footer-tag tracking-wide">Beauty Concept · Peluquería</p>
        <p className="footer-address">Albisu 44 · Salto, UY</p>
        <p className="footer-copy">© {new Date().getFullYear()}</p>
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
          filter: blur(80px);
          opacity: 0.5;
        }
        .orb-a {
          width: min(55vw, 420px);
          height: min(55vw, 420px);
          background: radial-gradient(circle, var(--rose-muted) 0%, transparent 70%);
          top: -8%;
          right: -10%;
        }
        .orb-b {
          width: min(45vw, 360px);
          height: min(45vw, 360px);
          background: radial-gradient(circle, rgba(190, 24, 93, 0.2) 0%, transparent 70%);
          bottom: 20%;
          left: -15%;
        }
        .orb-c {
          width: 280px;
          height: 280px;
          background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
          top: 45%;
          right: 5%;
        }
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--rose-deep), var(--rose-soft), #fff);
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
          padding: 1rem clamp(1rem, 4vw, 2.5rem);
          background: linear-gradient(to bottom, rgba(7,7,8,0.94) 0%, rgba(7,7,8,0.75) 55%, transparent 100%);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .nav-brand {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.15rem;
        }
        .nav-brand-script {
          font-size: 1.35rem;
          line-height: 1;
          background: linear-gradient(135deg, #fff 0%, var(--rose-soft) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .nav-brand-sub {
          font-size: 0.55rem;
          font-weight: 600;
          color: var(--muted);
          letter-spacing: 0.28em;
        }
        .nav-links {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: clamp(0.65rem, 2vw, 1.35rem);
          font-size: 0.58rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 600;
        }
        .nav-links a {
          color: var(--muted);
          transition: color 0.2s, text-shadow 0.2s;
        }
        .nav-links a:hover {
          color: var(--fg);
          text-shadow: 0 0 20px var(--rose-glow);
        }
        .wa-fab {
          position: fixed;
          bottom: 1.35rem;
          right: 1.35rem;
          z-index: 60;
          width: 3.35rem;
          height: 3.35rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(145deg, var(--rose-soft), var(--rose-deep));
          color: #fff;
          box-shadow: 0 12px 32px rgba(190, 24, 93, 0.45), 0 0 0 1px rgba(255,255,255,0.12);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .wa-fab:hover {
          transform: scale(1.06);
          box-shadow: 0 16px 40px rgba(190, 24, 93, 0.55);
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
          padding: clamp(4.5rem, 11vh, 6.5rem) clamp(1.15rem, 4.5vw, 2.75rem);
        }
        .hero-wrap {
          padding-top: 5.5rem;
          background:
            radial-gradient(ellipse 100% 80% at 50% 0%, rgba(232, 72, 140, 0.14), transparent 55%),
            radial-gradient(ellipse 60% 40% at 80% 60%, rgba(255,255,255,0.05), transparent),
            var(--bg);
        }
        .hero-frame {
          position: absolute;
          inset: clamp(4.5rem, 10vh, 6rem) clamp(1rem, 4vw, 2rem);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 1.25rem;
          pointer-events: none;
          mask-image: linear-gradient(to bottom, black 0%, transparent 92%);
        }
        .hero-inner {
          text-align: center;
          max-width: 38rem;
          position: relative;
        }
        .hero-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .pill {
          font-size: 0.55rem;
          font-weight: 600;
          padding: 0.4rem 0.85rem;
          border-radius: 999px;
          border: 1px solid var(--line);
          color: var(--muted);
          background: rgba(255,255,255,0.03);
        }
        .pill-rose {
          border-color: rgba(232, 72, 140, 0.35);
          color: var(--rose-soft);
          background: var(--rose-muted);
        }
        .hero-logo-wrap {
          margin: 0 auto 1.25rem;
          max-width: min(88vw, 400px);
        }
        .hero-logo-ring {
          padding: clamp(0.75rem, 2.5vw, 1.25rem);
          border-radius: 1.5rem;
          background: linear-gradient(145deg, rgba(255,255,255,0.06), rgba(232, 72, 140, 0.08));
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.08),
            0 24px 64px rgba(0,0,0,0.45),
            0 0 80px rgba(232, 72, 140, 0.12);
        }
        .hero-logo {
          width: 100%;
          height: auto;
          border-radius: 0.75rem;
        }
        .hero-kicker {
          font-size: 0.68rem;
          font-weight: 600;
          color: var(--rose-soft);
          margin: 0 0 0.65rem;
          letter-spacing: 0.22em;
        }
        .hero-tagline {
          font-size: 0.95rem;
          font-weight: 300;
          color: var(--muted);
          margin: 0 0 2rem;
          line-height: 1.65;
          max-width: 26rem;
          margin-left: auto;
          margin-right: auto;
        }
        .hero-tagline strong {
          color: var(--fg);
          font-weight: 600;
        }
        .hero-cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
          justify-content: center;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.9rem 1.6rem;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          border: 1px solid transparent;
          border-radius: 2px;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s, border-color 0.2s, color 0.2s;
        }
        .btn:hover {
          transform: translateY(-1px);
        }
        .btn-primary {
          background: linear-gradient(135deg, var(--rose-soft), var(--rose-deep));
          color: #fff;
          box-shadow: 0 8px 28px rgba(190, 24, 93, 0.35);
        }
        .btn-primary:hover {
          box-shadow: 0 12px 36px rgba(190, 24, 93, 0.45);
        }
        .btn-ghost {
          border-color: rgba(255,255,255,0.14);
          color: var(--fg);
          background: rgba(255,255,255,0.03);
        }
        .btn-ghost:hover {
          border-color: rgba(232, 72, 140, 0.45);
          background: rgba(232, 72, 140, 0.08);
        }
        .btn-outline {
          border-color: rgba(232, 72, 140, 0.5);
          color: var(--rose-soft);
          background: transparent;
        }
        .btn-outline:hover {
          background: var(--rose-muted);
          border-color: var(--rose-soft);
        }
        .btn-lg {
          padding: 1.05rem 1.85rem;
          font-size: 0.64rem;
        }
        .scroll-hint {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.45rem;
          opacity: 0.5;
        }
        .scroll-hint-line {
          width: 1px;
          height: 2.75rem;
          background: linear-gradient(to bottom, transparent, var(--rose-soft));
          animation: pulse-line 2.2s ease-in-out infinite;
        }
        .scroll-hint-text {
          font-size: 0.55rem;
          color: var(--muted);
        }
        @keyframes pulse-line {
          0%, 100% { opacity: 0.35; transform: scaleY(0.88); }
          50% { opacity: 1; transform: scaleY(1); }
        }
        .section-dark {
          background: linear-gradient(180deg, #060607 0%, var(--bg-elevated) 100%);
          border-top: 1px solid var(--line);
        }
        .section-inner {
          width: 100%;
          max-width: 58rem;
        }
        .about-grid {
          display: grid;
          gap: 2.5rem;
          align-items: center;
        }
        @media (min-width: 768px) {
          .about-grid {
            grid-template-columns: 1.1fr 0.9fr;
            gap: 3rem;
          }
          .about-copy { text-align: left; }
        }
        .about-copy {
          text-align: center;
        }
        .about-stats {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 1rem;
        }
        @media (min-width: 768px) {
          .about-stats { gap: 1.15rem; }
        }
        .about-stats li {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.25rem 1rem;
          border: 1px solid var(--line);
          border-radius: 0.75rem;
          background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(232, 72, 140, 0.05));
        }
        @media (min-width: 768px) {
          .about-stats li { align-items: flex-start; }
        }
        .stat-num {
          font-size: 2.25rem;
          line-height: 1;
          color: var(--fg);
        }
        .stat-num.font-script {
          font-size: 2.75rem;
          background: linear-gradient(135deg, #fff, var(--rose-soft));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .stat-label {
          font-size: 0.58rem;
          color: var(--muted);
          margin-top: 0.5rem;
          font-weight: 600;
        }
        .eyebrow {
          font-size: 0.62rem;
          font-weight: 600;
          color: var(--muted);
          margin: 0 0 0.65rem;
        }
        .eyebrow-rose {
          color: var(--rose-soft);
        }
        .section-title {
          font-size: clamp(2.35rem, 7.5vw, 3.75rem);
          margin: 0 0 1rem;
          line-height: 1.08;
        }
        .section-body {
          margin: 0;
          color: var(--muted);
          font-size: 0.95rem;
          font-weight: 300;
          line-height: 1.78;
        }
        .section-body strong {
          color: var(--fg);
          font-weight: 500;
        }
        .section-services {
          background: var(--bg);
          border-top: 1px solid var(--line);
        }
        .services-header {
          text-align: center;
          margin-bottom: 2.5rem;
          max-width: 36rem;
          margin-left: auto;
          margin-right: auto;
        }
        .services-lead {
          margin: 0.75rem 0 0;
          color: var(--muted);
          font-size: 0.9rem;
          font-weight: 300;
          line-height: 1.65;
        }
        .service-grid {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 1.1rem;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }
        .service-card {
          position: relative;
          border: 1px solid var(--line);
          border-radius: 0.85rem;
          padding: 1.65rem 1.4rem 1.5rem;
          background: rgba(255,255,255,0.02);
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .service-card:hover {
          border-color: rgba(232, 72, 140, 0.35);
          transform: translateY(-3px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.35), 0 0 40px rgba(232, 72, 140, 0.08);
        }
        .service-accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--rose-deep), var(--rose-soft));
          opacity: 0;
          transition: opacity 0.3s;
        }
        .service-card:hover .service-accent {
          opacity: 1;
        }
        .service-num {
          font-size: 0.58rem;
          color: var(--rose-soft);
          font-weight: 600;
        }
        .service-title {
          font-size: 0.72rem;
          margin: 0.65rem 0 0.45rem;
          font-weight: 700;
          color: var(--fg);
        }
        .service-text {
          margin: 0;
          font-size: 0.84rem;
          color: var(--muted);
          font-weight: 300;
          line-height: 1.62;
        }
        .section-map {
          background: linear-gradient(180deg, var(--bg-elevated), #050506);
          border-top: 1px solid var(--line);
        }
        .map-layout {
          display: grid;
          gap: 2rem;
          align-items: stretch;
        }
        @media (min-width: 860px) {
          .map-layout {
            grid-template-columns: 0.95fr 1.15fr;
            gap: 2.5rem;
            align-items: center;
          }
        }
        .map-copy {
          text-align: center;
        }
        @media (min-width: 860px) {
          .map-copy { text-align: left; }
        }
        .map-address {
          margin: 1rem 0 1.5rem;
          font-size: 1rem;
        }
        .map-pin { margin-right: 0.25rem; }
        .map-embed-wrap {
          border-radius: 1rem;
          overflow: hidden;
          border: 1px solid var(--line);
          box-shadow: 0 24px 60px rgba(0,0,0,0.4);
          min-height: 280px;
          background: #111;
        }
        .map-embed {
          width: 100%;
          height: min(50vh, 380px);
          border: 0;
          display: block;
        }
        .section-cta {
          position: relative;
          background: radial-gradient(ellipse 80% 60% at 50% 100%, rgba(232, 72, 140, 0.18), transparent),
            linear-gradient(180deg, #040405, #070708);
          border-top: 1px solid var(--line);
          overflow: hidden;
        }
        .cta-glow {
          position: absolute;
          width: 120%;
          height: 50%;
          left: -10%;
          bottom: 0;
          background: radial-gradient(ellipse at center, rgba(232, 72, 140, 0.15), transparent 70%);
          pointer-events: none;
        }
        .cta-block {
          position: relative;
          text-align: center;
        }
        .cta-lead {
          max-width: 30rem;
          margin: 0 auto 2rem;
        }
        .inline-link {
          color: var(--rose-soft);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .inline-link:hover {
          color: #fff;
        }
        .cta-buttons {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.9rem;
        }
        @media (min-width: 520px) {
          .cta-buttons {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
        .site-footer {
          position: relative;
          z-index: 1;
          scroll-snap-align: end;
          padding: 2.75rem 1.5rem 3.5rem;
          text-align: center;
          border-top: 1px solid var(--line);
          background: #040404;
        }
        .footer-brand {
          font-size: clamp(1.85rem, 5vw, 2.35rem);
          margin: 0;
        }
        .footer-tag {
          font-size: 0.58rem;
          color: var(--muted);
          margin: 0.4rem 0 0.35rem;
          font-weight: 600;
        }
        .footer-address {
          margin: 0 0 0.85rem;
          font-size: 0.78rem;
          color: var(--rose-soft);
          font-weight: 500;
        }
        .footer-copy {
          margin: 0;
          font-size: 0.68rem;
          color: var(--muted);
        }
      `}</style>
    </>
  );
}
