import { useState, useEffect, useRef } from "react";

const LOGO = "./logo.png";

const SERVICES = [
  { title: "Web Application Development", desc: "Full-stack React applications built for speed, scale, and impact. From concept to deployment — clean code, real results." },
  { title: "AI Integration", desc: "Claude, GPT, and custom LLM pipelines woven into your product. Chatbots, classifiers, assistants — AI that actually works." },
  { title: "E-Commerce Development", desc: "Stripe, PayPal, cart logic, checkout flows, product pages. Built to convert from day one." },
  { title: "Mobile-First Design", desc: "Every pixel optimized for the phone first. Responsive, fast, and frictionless across every screen size." },
  { title: "API Integration", desc: "REST, GraphQL, webhooks, third-party services. I connect your app to any ecosystem and make it talk." },
  { title: "UI/UX Design", desc: "Dark themes, bold typography, smooth animations. Interfaces that feel as powerful as they perform." },
];

const PROJECTS = [
  {
    name: "Poppersworld",
    tag: "AI E-Commerce",
    url: "https://poppersworld-app.vercel.app",
    desc: "AI-powered e-commerce platform for a U.S.-patented basketball net sensory band. Full product catalog, 5-step checkout modal, AI chatbot with Claude, quick-view modals, and free-shipping logic. Detroit-born, Black-owned brand.",
    stack: ["React", "Vite", "Claude AI", "Stripe", "Vercel"],
  },
  {
    name: "ARIA",
    tag: "Medical AI Chatbot",
    url: "#",
    desc: "Intelligent medical chatbot serving patients with chronic conditions, mental health needs, and veteran care. ARIA provides symptom guidance, appointment prep, and compassionate support — never replacing doctors, always augmenting care.",
    stack: ["React", "Claude AI", "Medical NLP", "HIPAA-Aware"],
  },
  {
    name: "Black Ancestral Origins",
    tag: "Genealogy Platform",
    url: "#",
    desc: "Genealogy application built specifically for Freedmen of the Five Civilized Tribes. Helps families trace lineage, access historical records, and reclaim identity. A deeply personal project serving a historically erased community.",
    stack: ["React", "Node.js", "Historical APIs", "AI Search"],
  },
  {
    name: "SpellChamp AI",
    tag: "EdTech — Grades 1–12",
    url: "#",
    desc: "Adaptive spelling bee platform powered by AI. Adjusts difficulty in real time based on student performance, covers grades 1–12, and keeps kids engaged through game mechanics, streaks, and celebrations.",
    stack: ["React", "AI Adaptive Engine", "Speech API", "Firebase"],
  },
  {
    name: "RightsGuard AI",
    tag: "Legal Rights Companion",
    url: "#",
    desc: "AI-powered legal rights companion covering police encounters, housing discrimination, employment rights, and Indigenous sovereignty. Plain-language answers to complex legal questions — for communities who need it most.",
    stack: ["React", "Claude AI", "Legal Knowledge Base", "PWA"],
  },
];

/* ── Hook: Intersection Observer for scroll reveals ── */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── Clip-reveal animation for section titles ── */
function ClipRevealTitle({ children, delay = 0, style = {} }) {
  const [ref, visible] = useScrollReveal(0.2);
  return (
    <div ref={ref} style={{
      overflow: "hidden",
      ...style,
    }}>
      <div style={{
        transform: visible ? "translateY(0)" : "translateY(110%)",
        transition: `transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}>
        {children}
      </div>
    </div>
  );
}

/* ── Fade-up reveal for content blocks ── */
function FadeReveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ── Diagonal Divider ── */
function DiagonalDivider({ color = "#DC143C", flip = false }) {
  return (
    <div style={{
      width: "100%",
      height: "clamp(60px, 8vw, 120px)",
      overflow: "hidden",
      position: "relative",
      background: "transparent",
    }}>
      <div style={{
        position: "absolute",
        inset: 0,
        background: color,
        clipPath: flip
          ? "polygon(0 0, 100% 100%, 0 100%)"
          : "polygon(0 0, 100% 0, 100% 100%)",
        opacity: 0.08,
      }} />
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "1px",
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity: 0.4,
      }} />
    </div>
  );
}

/* ── Numbered Portfolio Item with hover reveal ── */
function PortfolioItem({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useScrollReveal();
  const num = String(index + 1).padStart(2, "0");
  const isLive = project.url !== "#";

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-60px)",
        transition: `opacity 0.7s ease ${index * 120}ms, transform 0.7s ease ${index * 120}ms`,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        cursor: "default",
      }}
    >
      {/* Main row */}
      <div style={{
        display: "flex",
        alignItems: "baseline",
        gap: "clamp(16px, 3vw, 48px)",
        padding: "36px 0",
        position: "relative",
        zIndex: 2,
      }}>
        {/* Number */}
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
          color: hovered ? "#DC143C" : "rgba(255,255,255,0.08)",
          transition: "color 0.4s ease",
          lineHeight: 1,
          flexShrink: 0,
          minWidth: "clamp(50px, 6vw, 90px)",
        }}>
          {num}
        </span>

        {/* Project name */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2rem, 4.5vw, 4rem)",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: hovered ? "#fff" : "rgba(255,255,255,0.5)",
            transition: "color 0.4s ease",
            lineHeight: 1.1,
          }}>
            {project.name}
          </h3>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: hovered ? "#3B82F6" : "rgba(255,255,255,0.2)",
            transition: "color 0.4s ease",
          }}>
            {project.tag}
          </span>
        </div>

        {/* Arrow */}
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "1.8rem",
          color: hovered ? "#DC143C" : "rgba(255,255,255,0.1)",
          transition: "color 0.4s ease, transform 0.4s ease",
          transform: hovered ? "translateX(8px)" : "translateX(0)",
          flexShrink: 0,
        }}>
          {isLive ? "\u2197" : "\u2192"}
        </span>
      </div>

      {/* Hover reveal panel */}
      <div style={{
        maxHeight: hovered ? "400px" : "0",
        opacity: hovered ? 1 : 0,
        overflow: "hidden",
        transition: "max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
        paddingLeft: "clamp(66px, 9vw, 138px)",
        paddingBottom: hovered ? "36px" : "0",
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.95rem",
          color: "rgba(255,255,255,0.5)",
          lineHeight: 1.8,
          maxWidth: "600px",
          marginBottom: "20px",
        }}>
          {project.desc}
        </p>

        {/* Stack tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
          {project.stack.map(tech => (
            <span key={tech} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              border: "1px solid rgba(220,20,60,0.3)",
              color: "#DC143C",
              padding: "5px 14px",
              borderRadius: "0",
            }}>
              {tech}
            </span>
          ))}
        </div>

        {isLive && (
          <a href={project.url} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "0.9rem",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#3B82F6",
            textDecoration: "none",
            borderBottom: "1px solid #3B82F6",
            paddingBottom: "2px",
            transition: "color 0.3s ease",
          }}>
            View Live Project \u2197
          </a>
        )}
      </div>

      {/* Hover background flash */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(90deg, rgba(220,20,60,0.04), transparent)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
        zIndex: 1,
      }} />
    </div>
  );
}

/* ── Main Portfolio Component ── */
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const NAV_LINKS = [
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Work" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div style={{
      fontFamily: "'Bebas Neue', 'Impact', sans-serif",
      background: "#0A0A0A",
      color: "#fff",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0A0A0A; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0A0A; }
        ::-webkit-scrollbar-thumb { background: #DC143C; border-radius: 2px; }

        @keyframes clipIn {
          from { clip-path: inset(0 0 100% 0); }
          to   { clip-path: inset(0 0 0% 0); }
        }
        @keyframes lineExpand {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50%      { opacity: 1; }
        }

        .nav-link-ed {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.95rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          cursor: pointer;
          transition: color 0.3s ease;
          border: none;
          background: none;
          padding: 0;
          position: relative;
        }
        .nav-link-ed:hover { color: #DC143C; }
        .nav-link-ed::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: #DC143C;
          transition: width 0.3s ease;
        }
        .nav-link-ed:hover::after { width: 100%; }

        @media (max-width: 768px) {
          .desktop-nav-ed { display: none !important; }
          .hamburger-ed { display: block !important; }
          .hero-grid { flex-direction: column !important; text-align: center !important; }
          .hero-grid > div:first-child { align-items: center !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .portfolio-section { padding: 80px 20px !important; }
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(220,20,60,0.15)" : "1px solid transparent",
        transition: "all 0.4s ease",
        padding: "0 clamp(20px, 4vw, 48px)",
        height: "72px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", cursor: "pointer" }}
          onClick={() => scrollTo("hero")}>
          <img src={LOGO} alt="Next Level Development" style={{ height: "42px", objectFit: "contain" }} />
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.1rem",
            letterSpacing: "4px",
            lineHeight: 1,
          }}>
            <span style={{ color: "#DC143C" }}>NEXT LEVEL</span>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="desktop-nav-ed" style={{ display: "flex", gap: "40px", alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <button key={l.id} className="nav-link-ed" onClick={() => scrollTo(l.id)}>{l.label}</button>
          ))}
          <a href="mailto:michael@michaelnextleveldevelopment.com" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "0.9rem",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#0A0A0A",
            background: "#DC143C",
            padding: "10px 28px",
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
            onMouseOver={e => { e.currentTarget.style.background = "#3B82F6"; }}
            onMouseOut={e => { e.currentTarget.style.background = "#DC143C"; }}
          >
            Hire Me
          </a>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(o => !o)} className="hamburger-ed"
          style={{ background: "none", border: "none", color: "#DC143C", fontSize: "1.5rem", cursor: "pointer", display: "none" }}>
          {menuOpen ? "\u2715" : "\u2630"}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: "72px", left: 0, right: 0, bottom: 0, zIndex: 999,
          background: "rgba(10,10,10,0.98)", backdropFilter: "blur(20px)",
          padding: "48px 32px", display: "flex", flexDirection: "column", gap: "32px",
        }}>
          {NAV_LINKS.map(l => (
            <button key={l.id} className="nav-link-ed" style={{ fontSize: "2rem", letterSpacing: "6px", textAlign: "left" }}
              onClick={() => scrollTo(l.id)}>{l.label}</button>
          ))}
          <a href="mailto:michael@michaelnextleveldevelopment.com" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.2rem",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#0A0A0A",
            background: "#DC143C",
            padding: "16px 36px",
            textDecoration: "none",
            textAlign: "center",
            marginTop: "16px",
          }}>
            Hire Me
          </a>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="hero" style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "140px clamp(24px, 6vw, 80px) 100px",
        position: "relative",
        overflow: "hidden",
        background: "#0A0A0A",
      }}>
        {/* Background oversized text */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "-5%",
          transform: "translateY(-50%)",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(15rem, 25vw, 35rem)",
          color: "rgba(255,255,255,0.015)",
          letterSpacing: "-0.02em",
          lineHeight: 0.85,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}>
          NLD
        </div>

        {/* Vertical accent line */}
        <div style={{
          position: "absolute",
          top: "15%",
          left: "clamp(20px, 4vw, 60px)",
          width: "1px",
          height: "70%",
          background: "linear-gradient(180deg, transparent, #DC143C, transparent)",
          opacity: 0.3,
          zIndex: 0,
        }} />

        <div className="hero-grid" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "60px",
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}>
          {/* Left: Content */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            {/* Tag */}
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "5px",
              textTransform: "uppercase",
              color: "#DC143C",
              marginBottom: "32px",
              animation: "fadeUp 0.8s ease 0.1s both",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}>
              <span style={{
                width: "40px",
                height: "1px",
                background: "#DC143C",
                display: "inline-block",
              }} />
              Black-Owned / Arizona / AI-Powered
            </div>

            {/* Headline — oversized and asymmetric */}
            <div style={{ animation: "fadeUp 0.8s ease 0.2s both" }}>
              <h1 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(4rem, 12vw, 10rem)",
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                lineHeight: 0.9,
                marginBottom: "0",
                color: "#fff",
              }}>
                Next
              </h1>
              <h1 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(4rem, 12vw, 10rem)",
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                lineHeight: 0.9,
                marginBottom: "0",
                color: "#fff",
                paddingLeft: "clamp(20px, 4vw, 80px)",
              }}>
                Level
              </h1>
              <h1 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(4rem, 12vw, 10rem)",
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                lineHeight: 0.9,
                color: "#DC143C",
              }}>
                Dev<span style={{ color: "rgba(255,255,255,0.15)" }}>.</span>
              </h1>
            </div>

            {/* Subtext */}
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)",
              fontWeight: 400,
              color: "rgba(255,255,255,0.4)",
              maxWidth: "480px",
              lineHeight: 1.8,
              marginTop: "36px",
              marginBottom: "44px",
              animation: "fadeUp 0.8s ease 0.5s both",
            }}>
              Building AI-powered web applications for communities that deserve the best technology.
              Clean code. Electrifying design. Real impact.
            </p>

            {/* CTAs */}
            <div style={{
              display: "flex", gap: "16px", flexWrap: "wrap",
              animation: "fadeUp 0.8s ease 0.65s both",
            }}>
              <button onClick={() => scrollTo("portfolio")} style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.1rem",
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#0A0A0A",
                background: "#DC143C",
                border: "none",
                padding: "16px 44px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
                onMouseOver={e => { e.currentTarget.style.background = "#3B82F6"; }}
                onMouseOut={e => { e.currentTarget.style.background = "#DC143C"; }}
              >
                View Work
              </button>
              <a href="mailto:michael@michaelnextleveldevelopment.com" style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.1rem",
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#DC143C",
                background: "transparent",
                border: "1px solid rgba(220,20,60,0.4)",
                padding: "15px 42px",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
                onMouseOver={e => { e.currentTarget.style.borderColor = "#DC143C"; e.currentTarget.style.color = "#fff"; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(220,20,60,0.4)"; e.currentTarget.style.color = "#DC143C"; }}
              >
                Let's Build
              </a>
            </div>
          </div>

          {/* Right: Logo */}
          <div style={{
            flex: "0 0 auto",
            animation: "fadeUp 1s ease 0.4s both",
          }}>
            <img src={LOGO} alt="Next Level Development" style={{
              width: "clamp(180px, 22vw, 320px)",
              filter: "drop-shadow(0 0 60px rgba(220,20,60,0.25)) drop-shadow(0 0 120px rgba(59,130,246,0.15))",
            }} />
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute",
          bottom: "40px",
          right: "clamp(24px, 4vw, 60px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          animation: "fadeUp 0.8s ease 1s both",
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
            writingMode: "vertical-rl",
          }}>
            Scroll
          </span>
          <div style={{
            width: "1px",
            height: "48px",
            background: "linear-gradient(180deg, #DC143C, transparent)",
          }} />
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div style={{
        overflow: "hidden",
        background: "#DC143C",
        padding: "14px 0",
        whiteSpace: "nowrap",
      }}>
        <div style={{
          display: "inline-flex",
          animation: "marquee 20s linear infinite",
        }}>
          {Array(8).fill(null).map((_, i) => (
            <span key={i} style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.1rem",
              letterSpacing: "6px",
              textTransform: "uppercase",
              color: "#0A0A0A",
              padding: "0 40px",
            }}>
              Web Development &nbsp;&bull;&nbsp; AI Integration &nbsp;&bull;&nbsp; E-Commerce &nbsp;&bull;&nbsp; Community Impact &nbsp;&bull;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" style={{
        padding: "clamp(80px, 10vw, 160px) clamp(24px, 6vw, 80px)",
        background: "#0A0A0A",
        position: "relative",
      }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <div className="about-grid" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "clamp(40px, 6vw, 100px)",
            alignItems: "start",
          }}>
            {/* Left: Label + big type */}
            <div>
              <FadeReveal>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "5px",
                  textTransform: "uppercase",
                  color: "#3B82F6",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "32px",
                }}>
                  <span style={{ width: "40px", height: "1px", background: "#3B82F6", display: "inline-block" }} />
                  About
                </span>
              </FadeReveal>

              <ClipRevealTitle>
                <h2 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(3rem, 7vw, 6rem)",
                  letterSpacing: "-0.02em",
                  textTransform: "uppercase",
                  lineHeight: 0.95,
                  marginBottom: "24px",
                }}>
                  Michael<br />
                  <span style={{ color: "#DC143C" }}>Rice</span>
                </h2>
              </ClipRevealTitle>

              <FadeReveal delay={200}>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  marginTop: "40px",
                }}>
                  {[
                    { val: "05", label: "AI-Powered Projects" },
                    { val: "100%", label: "Black-Owned" },
                    { val: "00", label: "Compromises" },
                  ].map(({ val, label }) => (
                    <div key={label} style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "20px",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      paddingBottom: "16px",
                    }}>
                      <span style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "2.2rem",
                        color: "#DC143C",
                      }}>{val}</span>
                      <span style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.8rem",
                        color: "rgba(255,255,255,0.3)",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                      }}>{label}</span>
                    </div>
                  ))}
                </div>
              </FadeReveal>
            </div>

            {/* Right: Bio */}
            <div style={{ paddingTop: "clamp(0px, 3vw, 60px)" }}>
              <FadeReveal delay={100}>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                  lineHeight: 1.9,
                  marginBottom: "24px",
                }}>
                  I'm a solo developer building AI-powered web applications for
                  <strong style={{ color: "#3B82F6" }}> underserved communities</strong> — the people
                  who have been left behind by the tech industry and deserve better.
                </p>
              </FadeReveal>

              <FadeReveal delay={200}>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                  lineHeight: 1.9,
                  marginBottom: "24px",
                }}>
                  From medical chatbots to genealogy platforms, legal rights companions to
                  adaptive education tools — every product I build is driven by a single
                  question: <em style={{ color: "#DC143C", fontStyle: "normal", fontWeight: 600 }}>who needs this most?</em>
                </p>
              </FadeReveal>

              <FadeReveal delay={300}>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                  lineHeight: 1.9,
                  marginBottom: "36px",
                }}>
                  Based in Arizona. <strong style={{ color: "#3B82F6" }}>Black-owned brand.</strong> Building
                  with React, Vite, Claude AI, and a relentless commitment to craft.
                </p>
              </FadeReveal>

              <FadeReveal delay={400}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {["Black-Owned", "Arizona-Based", "Solo Developer", "AI Specialist", "React Expert", "Community-Focused"].map(tag => (
                    <span key={tag} style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      border: "1px solid rgba(220,20,60,0.25)",
                      color: "rgba(255,255,255,0.35)",
                      padding: "8px 16px",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeReveal>
            </div>
          </div>
        </div>
      </section>

      <DiagonalDivider color="#DC143C" />

      {/* ── SERVICES — Typographic, no cards, no icons ── */}
      <section id="services" style={{
        padding: "clamp(80px, 10vw, 160px) clamp(24px, 6vw, 80px)",
        background: "#0A0A0A",
      }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <FadeReveal>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "5px",
              textTransform: "uppercase",
              color: "#3B82F6",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "32px",
            }}>
              <span style={{ width: "40px", height: "1px", background: "#3B82F6", display: "inline-block" }} />
              What I Build
            </span>
          </FadeReveal>

          <ClipRevealTitle>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 7vw, 6.5rem)",
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              lineHeight: 0.95,
              marginBottom: "clamp(48px, 6vw, 80px)",
            }}>
              Services<span style={{ color: "#DC143C" }}>.</span>
            </h2>
          </ClipRevealTitle>

          {/* Typographic service list */}
          <div className="services-grid" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0",
          }}>
            {SERVICES.map((s, i) => {
              const [hovered, setHovered] = useState(false);
              const [ref, visible] = useScrollReveal();
              return (
                <div
                  key={s.title}
                  ref={ref}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(30px)",
                    transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms`,
                    padding: "clamp(28px, 3vw, 48px)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    cursor: "default",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Number */}
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "0.85rem",
                    letterSpacing: "3px",
                    color: hovered ? "#DC143C" : "rgba(255,255,255,0.12)",
                    transition: "color 0.3s ease",
                    display: "block",
                    marginBottom: "16px",
                  }}>
                    {String(i + 1).padStart(2, "0")} /
                  </span>

                  <h3 style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: hovered ? "#fff" : "rgba(255,255,255,0.6)",
                    transition: "color 0.3s ease",
                    marginBottom: "16px",
                    lineHeight: 1.1,
                  }}>
                    {s.title}
                  </h3>

                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.88rem",
                    color: "rgba(255,255,255,0.3)",
                    lineHeight: 1.75,
                    maxWidth: "400px",
                  }}>
                    {s.desc}
                  </p>

                  {/* Hover accent */}
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "3px",
                    height: "100%",
                    background: "#DC143C",
                    transform: hovered ? "scaleY(1)" : "scaleY(0)",
                    transformOrigin: "top",
                    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <DiagonalDivider color="#3B82F6" flip />

      {/* ── PORTFOLIO — Numbered list with hover reveal ── */}
      <section id="portfolio" className="portfolio-section" style={{
        padding: "clamp(80px, 10vw, 160px) clamp(24px, 6vw, 80px)",
        background: "#0A0A0A",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <FadeReveal>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "5px",
              textTransform: "uppercase",
              color: "#DC143C",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "32px",
            }}>
              <span style={{ width: "40px", height: "1px", background: "#DC143C", display: "inline-block" }} />
              Selected Work
            </span>
          </FadeReveal>

          <ClipRevealTitle style={{ marginBottom: "clamp(48px, 6vw, 80px)" }}>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 7vw, 6.5rem)",
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              lineHeight: 0.95,
            }}>
              The Work<span style={{ color: "#3B82F6" }}>.</span>
            </h2>
          </ClipRevealTitle>

          <FadeReveal delay={100}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.3)",
              marginBottom: "48px",
              maxWidth: "500px",
            }}>
              Five products. Five communities served. All built by one developer.
            </p>
          </FadeReveal>

          {/* Portfolio list */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {PROJECTS.map((p, i) => (
              <PortfolioItem key={p.name} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <DiagonalDivider color="#DC143C" />

      {/* ── CONTACT ── */}
      <section id="contact" style={{
        padding: "clamp(80px, 10vw, 160px) clamp(24px, 6vw, 80px)",
        background: "#0A0A0A",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background oversized text */}
        <div style={{
          position: "absolute",
          top: "50%",
          right: "-10%",
          transform: "translateY(-50%)",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(10rem, 20vw, 28rem)",
          color: "rgba(255,255,255,0.015)",
          letterSpacing: "-0.02em",
          lineHeight: 0.85,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}>
          SAY HI
        </div>

        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <FadeReveal>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "5px",
              textTransform: "uppercase",
              color: "#3B82F6",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "32px",
            }}>
              <span style={{ width: "40px", height: "1px", background: "#3B82F6", display: "inline-block" }} />
              Ready to Build?
            </span>
          </FadeReveal>

          <ClipRevealTitle>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3.5rem, 8vw, 7rem)",
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              lineHeight: 0.95,
              marginBottom: "36px",
            }}>
              Let's Work<br />
              <span style={{ color: "#DC143C" }}>Together</span><span style={{ color: "#3B82F6" }}>.</span>
            </h2>
          </ClipRevealTitle>

          <FadeReveal delay={100}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "rgba(255,255,255,0.4)",
              fontSize: "1.1rem",
              lineHeight: 1.8,
              marginBottom: "56px",
              maxWidth: "520px",
            }}>
              Have a project? An idea? A community that needs better technology?
              I want to hear about it. Let's build something that matters.
            </p>
          </FadeReveal>

          <FadeReveal delay={200}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              marginBottom: "56px",
            }}>
              {/* Email */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
              }}>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "0.85rem",
                  letterSpacing: "3px",
                  color: "rgba(255,255,255,0.15)",
                  minWidth: "60px",
                }}>
                  EMAIL
                </span>
                <a href="mailto:michael@michaelnextleveldevelopment.com" style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                  letterSpacing: "1px",
                  color: "#DC143C",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                  wordBreak: "break-all",
                }}
                  onMouseOver={e => e.currentTarget.style.color = "#3B82F6"}
                  onMouseOut={e => e.currentTarget.style.color = "#DC143C"}
                >
                  michael@michaelnextleveldevelopment.com
                </a>
              </div>

              {/* Website */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
              }}>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "0.85rem",
                  letterSpacing: "3px",
                  color: "rgba(255,255,255,0.15)",
                  minWidth: "60px",
                }}>
                  WEB
                </span>
                <a href="https://michaelnextleveldevelopment.com" target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                  letterSpacing: "1px",
                  color: "#3B82F6",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
                  onMouseOver={e => e.currentTarget.style.color = "#DC143C"}
                  onMouseOut={e => e.currentTarget.style.color = "#3B82F6"}
                >
                  michaelnextleveldevelopment.com
                </a>
              </div>
            </div>
          </FadeReveal>

          {/* CTA Buttons */}
          <FadeReveal delay={300}>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a href="mailto:michael@michaelnextleveldevelopment.com" style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.1rem",
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#0A0A0A",
                background: "#DC143C",
                padding: "16px 44px",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
                onMouseOver={e => { e.currentTarget.style.background = "#3B82F6"; }}
                onMouseOut={e => { e.currentTarget.style.background = "#DC143C"; }}
              >
                Send a Message
              </a>
              <a href="https://michaelnextleveldevelopment.com" target="_blank" rel="noopener noreferrer" style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.1rem",
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#DC143C",
                background: "transparent",
                border: "1px solid rgba(220,20,60,0.4)",
                padding: "15px 42px",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
                onMouseOver={e => { e.currentTarget.style.borderColor = "#DC143C"; e.currentTarget.style.color = "#fff"; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(220,20,60,0.4)"; e.currentTarget.style.color = "#DC143C"; }}
              >
                Visit Site
              </a>
            </div>
          </FadeReveal>

          <FadeReveal delay={400}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.2)",
              marginTop: "48px",
              lineHeight: 1.7,
            }}>
              Available for freelance projects, long-term partnerships, and consulting.
              Response time: within 24 hours.
            </p>
          </FadeReveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: "48px clamp(24px, 4vw, 48px) 36px",
        background: "#060606",
        borderTop: "1px solid rgba(220,20,60,0.1)",
      }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "28px",
          }}>
            {/* Logo + name */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <img src={LOGO} alt="Next Level Development" style={{ height: "36px", objectFit: "contain", opacity: 0.7 }} />
              <div>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "0.95rem",
                  letterSpacing: "4px",
                  color: "rgba(255,255,255,0.4)",
                }}>
                  Next Level Development
                </span>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.6rem",
                  color: "rgba(255,255,255,0.15)",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}>
                  Michael Rice — Arizona
                </div>
              </div>
            </div>

            {/* Nav */}
            <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
              {NAV_LINKS.map(l => (
                <button key={l.id} className="nav-link-ed" style={{ fontSize: "0.8rem" }}
                  onClick={() => scrollTo(l.id)}>{l.label}</button>
              ))}
            </div>
          </div>

          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "rgba(255,255,255,0.2)",
              fontSize: "0.75rem",
            }}>
              &copy; 2025 Next Level Development. All rights reserved.
            </p>
            <p style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: "#DC143C",
              fontSize: "0.8rem",
              letterSpacing: "3px",
            }}>
              Built by Next Level Development
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
