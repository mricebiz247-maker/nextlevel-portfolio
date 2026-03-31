import { useState, useEffect, useRef } from "react";

const LOGO = "./logo.png";

const SERVICES = [
  { icon: "⚡", title: "Web Application Development", desc: "Full-stack React applications built for speed, scale, and impact. From concept to deployment — clean code, real results." },
  { icon: "🤖", title: "AI Integration", desc: "Claude, GPT, and custom LLM pipelines woven into your product. Chatbots, classifiers, assistants — AI that actually works." },
  { icon: "🛒", title: "E-Commerce Development", desc: "Stripe, PayPal, cart logic, checkout flows, product pages. Built to convert from day one." },
  { icon: "📱", title: "Mobile-First Design", desc: "Every pixel optimized for the phone first. Responsive, fast, and frictionless across every screen size." },
  { icon: "🔌", title: "API Integration", desc: "REST, GraphQL, webhooks, third-party services. I connect your app to any ecosystem and make it talk." },
  { icon: "🎨", title: "UI/UX Design", desc: "Dark themes, bold typography, smooth animations. Interfaces that feel as powerful as they perform." },
];

const PROJECTS = [
  {
    name: "Poppersworld",
    tag: "AI E-Commerce",
    url: "https://poppersworld-app.vercel.app",
    color: "#e63946",
    icon: "🏀",
    desc: "AI-powered e-commerce platform for a U.S.-patented basketball net sensory band. Full product catalog, 5-step checkout modal, AI chatbot with Claude, quick-view modals, and free-shipping logic. Detroit-born, Black-owned brand.",
    stack: ["React", "Vite", "Claude AI", "Stripe", "Vercel"],
  },
  {
    name: "ARIA",
    tag: "Medical AI Chatbot",
    url: "#",
    color: "#00bfff",
    icon: "🏥",
    desc: "Intelligent medical chatbot serving patients with chronic conditions, mental health needs, and veteran care. ARIA provides symptom guidance, appointment prep, and compassionate support — never replacing doctors, always augmenting care.",
    stack: ["React", "Claude AI", "Medical NLP", "HIPAA-Aware"],
  },
  {
    name: "Black Ancestral Origins",
    tag: "Genealogy Platform",
    url: "#",
    color: "#ffd700",
    icon: "🌍",
    desc: "Genealogy application built specifically for Freedmen of the Five Civilized Tribes. Helps families trace lineage, access historical records, and reclaim identity. A deeply personal project serving a historically erased community.",
    stack: ["React", "Node.js", "Historical APIs", "AI Search"],
  },
  {
    name: "SpellChamp AI",
    tag: "EdTech — Grades 1–12",
    url: "#",
    color: "#a855f7",
    icon: "✏️",
    desc: "Adaptive spelling bee platform powered by AI. Adjusts difficulty in real time based on student performance, covers grades 1–12, and keeps kids engaged through game mechanics, streaks, and celebrations.",
    stack: ["React", "AI Adaptive Engine", "Speech API", "Firebase"],
  },
  {
    name: "RightsGuard AI",
    tag: "Legal Rights Companion",
    url: "#",
    color: "#22c55e",
    icon: "⚖️",
    desc: "AI-powered legal rights companion covering police encounters, housing discrimination, employment rights, and Indigenous sovereignty. Plain-language answers to complex legal questions — for communities who need it most.",
    stack: ["React", "Claude AI", "Legal Knowledge Base", "PWA"],
  },
];

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

function RevealSection({ children, delay = 0, style = {} }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      ...style
    }}>
      {children}
    </div>
  );
}

function ServiceCard({ icon, title, desc, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${index * 80}ms, transform 0.6s ease ${index * 80}ms, box-shadow 0.3s ease, border-color 0.3s ease`,
        background: "linear-gradient(135deg, #0d0d14 0%, #08080f 100%)",
        border: `1px solid ${hovered ? "#00bfff" : "#1a1a2e"}`,
        borderRadius: "16px", padding: "32px 28px",
        boxShadow: hovered ? "0 8px 40px rgba(0,191,255,0.18)" : "0 2px 12px rgba(0,0,0,0.4)",
        cursor: "default",
      }}>
      <div style={{ fontSize: "2.4rem", marginBottom: "16px" }}>{icon}</div>
      <h3 style={{
        fontFamily: "'Oswald', sans-serif", fontSize: "1.05rem", fontWeight: 700,
        letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px",
        color: hovered ? "#00bfff" : "#fff", transition: "color 0.3s ease"
      }}>{title}</h3>
      <p style={{
        fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", color: "#888",
        lineHeight: 1.75
      }}>{desc}</p>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useScrollReveal();
  const isLive = project.url !== "#";
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(44px)",
        transition: `opacity 0.65s ease ${index * 100}ms, transform 0.65s ease ${index * 100}ms, box-shadow 0.3s ease, border-color 0.3s ease`,
        background: "linear-gradient(135deg, #0a0a12 0%, #06060e 100%)",
        border: `1px solid ${hovered ? project.color : "#1a1a2e"}`,
        borderRadius: "20px", overflow: "hidden",
        boxShadow: hovered ? `0 12px 48px ${project.color}28` : "0 2px 14px rgba(0,0,0,0.5)",
      }}>
      {/* Card top strip */}
      <div style={{
        height: "6px",
        background: `linear-gradient(90deg, ${project.color}, ${project.color}88)`,
        transition: "opacity 0.3s ease",
        opacity: hovered ? 1 : 0.6,
      }} />
      <div style={{ padding: "28px 28px 24px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "14px", gap: "12px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <span style={{ fontSize: "1.6rem" }}>{project.icon}</span>
              <h3 style={{
                fontFamily: "'Oswald', sans-serif", fontSize: "1.25rem", fontWeight: 700,
                letterSpacing: "1px", textTransform: "uppercase", color: "#fff"
              }}>{project.name}</h3>
            </div>
            <span style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", fontWeight: 600,
              letterSpacing: "2px", textTransform: "uppercase",
              color: project.color, display: "block"
            }}>{project.tag}</span>
          </div>
          {isLive && (
            <a href={project.url} target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 600,
                letterSpacing: "1px", textTransform: "uppercase", color: "#00bfff",
                textDecoration: "none", border: "1px solid rgba(0,191,255,0.4)",
                padding: "6px 12px", borderRadius: "6px", whiteSpace: "nowrap",
                transition: "all 0.2s ease", flexShrink: 0,
                background: "rgba(0,191,255,0.06)",
              }}
              onMouseOver={e => { e.currentTarget.style.background = "rgba(0,191,255,0.16)"; e.currentTarget.style.borderColor = "#00bfff"; }}
              onMouseOut={e => { e.currentTarget.style.background = "rgba(0,191,255,0.06)"; e.currentTarget.style.borderColor = "rgba(0,191,255,0.4)"; }}
            >Live ↗</a>
          )}
        </div>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: "0.87rem", color: "#888",
          lineHeight: 1.75, marginBottom: "20px"
        }}>{project.desc}</p>
        {/* Stack pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {project.stack.map(tech => (
            <span key={tech} style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 600,
              letterSpacing: "1px", textTransform: "uppercase",
              background: `${project.color}14`, border: `1px solid ${project.color}40`,
              color: project.color, padding: "4px 10px", borderRadius: "20px"
            }}>{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

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
      fontFamily: "'Oswald', 'Impact', sans-serif",
      background: "#04040a",
      color: "#fff",
      minHeight: "100vh",
      overflowX: "hidden"
    }}>
      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #04040a; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#00bfff, #ffd700); border-radius: 3px; }

        @keyframes shimmerGold {
          0%   { background-position: 0% center; }
          100% { background-position: 300% center; }
        }
        @keyframes shimmerBlue {
          0%   { background-position: 0% center; }
          100% { background-position: 300% center; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatLogo {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(0,191,255,0.3), 0 0 60px rgba(255,215,0,0.1); }
          50%       { box-shadow: 0 0 40px rgba(0,191,255,0.6), 0 0 100px rgba(255,215,0,0.25); }
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.03; }
          50%       { opacity: 0.07; }
        }
        @keyframes borderFlow {
          0%   { border-color: #00bfff; }
          50%  { border-color: #ffd700; }
          100% { border-color: #00bfff; }
        }

        .shimmer-gold {
          background: linear-gradient(90deg, #ffd700, #fff8dc, #ffd700, #ffaa00, #ffd700);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerGold 4s linear infinite;
        }
        .shimmer-blue {
          background: linear-gradient(90deg, #00bfff, #ffffff, #00bfff, #0080ff, #00bfff);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerBlue 3.5s linear infinite;
        }
        .btn-primary {
          background: linear-gradient(135deg, #00bfff, #0080ff);
          color: #fff;
          border: none;
          padding: 14px 36px;
          font-family: 'Oswald', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.25s ease;
          text-decoration: none;
          display: inline-block;
        }
        .btn-primary:hover {
          background: linear-gradient(135deg, #00d4ff, #0066ff);
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0,191,255,0.45);
        }
        .btn-outline {
          background: transparent;
          color: #ffd700;
          border: 2px solid #ffd700;
          padding: 12px 32px;
          font-family: 'Oswald', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.25s ease;
          text-decoration: none;
          display: inline-block;
        }
        .btn-outline:hover {
          background: rgba(255,215,0,0.1);
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(255,215,0,0.3);
        }
        .nav-link {
          font-family: 'Oswald', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #aaa;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.2s ease;
          border: none;
          background: none;
          padding: 0;
        }
        .nav-link:hover { color: #00bfff; }
        .section-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #ffd700;
          margin-bottom: 14px;
          display: block;
        }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 900px) {
          .grid-3 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .grid-2 { grid-template-columns: 1fr; }
          .grid-3 { grid-template-columns: 1fr; }
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
          #hero { padding: 130px 20px 80px !important; }
          #about, #services, #portfolio, #contact { padding: 80px 20px !important; }
          .hero-ctas { flex-direction: column; align-items: center; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(4,4,10,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,191,255,0.1)" : "1px solid transparent",
        transition: "all 0.35s ease",
        padding: "0 32px", height: "72px",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        {/* Logo mark */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}
          onClick={() => scrollTo("hero")}>
          <img src={LOGO} alt="Next Level Development" style={{ height: "48px", objectFit: "contain" }} />
          <div>
            <div style={{
              fontFamily: "'Oswald', sans-serif", fontSize: "0.95rem", fontWeight: 700,
              letterSpacing: "1px", lineHeight: 1.1
            }}>
              <span className="shimmer-blue">NEXT LEVEL</span>
            </div>
            <div style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.58rem", fontWeight: 600,
              letterSpacing: "3px", textTransform: "uppercase", color: "#ffd700"
            }}>DEVELOPMENT</div>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: "flex", gap: "36px", alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <button key={l.id} className="nav-link" onClick={() => scrollTo(l.id)}>{l.label}</button>
          ))}
          <a href="mailto:michael@michaelnextleveldevelopment.com" className="btn-primary"
            style={{ padding: "9px 22px", fontSize: "0.82rem" }}>
            Hire Me
          </a>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(o => !o)} className="hamburger"
          style={{ background: "none", border: "none", color: "#fff", fontSize: "1.5rem", cursor: "pointer", display: "none" }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: "72px", left: 0, right: 0, zIndex: 999,
          background: "rgba(4,4,10,0.98)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,191,255,0.15)",
          padding: "28px 32px", display: "flex", flexDirection: "column", gap: "24px"
        }}>
          {NAV_LINKS.map(l => (
            <button key={l.id} className="nav-link" style={{ fontSize: "1.1rem", textAlign: "left" }}
              onClick={() => scrollTo(l.id)}>{l.label}</button>
          ))}
          <a href="mailto:michael@michaelnextleveldevelopment.com" className="btn-primary"
            style={{ textAlign: "center", marginTop: "8px" }}>
            Hire Me
          </a>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="hero" style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", textAlign: "center",
        padding: "140px 24px 100px",
        position: "relative", overflow: "hidden",
        background: "radial-gradient(ellipse at 50% 0%, #000d1a 0%, #04040a 65%)"
      }}>
        {/* Grid background */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(0,191,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,191,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          animation: "gridPulse 4s ease-in-out infinite"
        }} />
        {/* Glow orbs */}
        <div style={{
          position: "absolute", top: "15%", left: "10%", width: "400px", height: "400px",
          borderRadius: "50%", background: "radial-gradient(circle, rgba(0,191,255,0.08) 0%, transparent 70%)",
          filter: "blur(40px)", pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", top: "20%", right: "8%", width: "350px", height: "350px",
          borderRadius: "50%", background: "radial-gradient(circle, rgba(255,215,0,0.06) 0%, transparent 70%)",
          filter: "blur(40px)", pointerEvents: "none"
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Logo */}
          <div style={{ marginBottom: "36px", animation: "floatLogo 5s ease-in-out infinite" }}>
            <img src={LOGO} alt="Next Level Development"
              style={{
                width: "min(280px, 65vw)", filter: "drop-shadow(0 0 40px rgba(0,191,255,0.45)) drop-shadow(0 0 80px rgba(255,215,0,0.2))",
                animation: "pulseGlow 4s ease-in-out infinite"
              }}
            />
          </div>

          {/* Tag */}
          <div style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 600,
            letterSpacing: "5px", textTransform: "uppercase", color: "#ffd700",
            marginBottom: "20px", animation: "fadeUp 0.8s ease 0.1s both"
          }}>
            Black-Owned · Arizona · AI-Powered Web Development
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(2.8rem, 8vw, 6rem)", fontWeight: 700,
            letterSpacing: "2px", textTransform: "uppercase",
            lineHeight: 1.05, marginBottom: "10px",
            animation: "fadeUp 0.8s ease 0.2s both"
          }}>
            <span className="shimmer-blue">Next Level</span>
          </h1>
          <h1 style={{
            fontSize: "clamp(2.8rem, 8vw, 6rem)", fontWeight: 700,
            letterSpacing: "2px", textTransform: "uppercase",
            lineHeight: 1.05, marginBottom: "32px",
            animation: "fadeUp 0.8s ease 0.3s both"
          }}>
            <span className="shimmer-gold">Development</span>
          </h1>

          {/* Tagline */}
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            fontWeight: 400, color: "#aaa", maxWidth: "580px", margin: "0 auto 44px",
            lineHeight: 1.75, animation: "fadeUp 0.8s ease 0.4s both"
          }}>
            Building AI-powered web applications for communities that deserve the best technology.
            Clean code. Electrifying design. Real impact.
          </p>

          {/* CTAs */}
          <div className="hero-ctas" style={{
            display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap",
            animation: "fadeUp 0.8s ease 0.55s both"
          }}>
            <button className="btn-primary" style={{ fontSize: "1rem", padding: "15px 40px" }}
              onClick={() => scrollTo("portfolio")}>
              View My Work
            </button>
            <a href="mailto:michael@michaelnextleveldevelopment.com" className="btn-outline"
              style={{ fontSize: "1rem", padding: "13px 38px" }}>
              Let's Build
            </a>
          </div>

          {/* Scroll indicator */}
          <div style={{
            marginTop: "72px", display: "flex", flexDirection: "column",
            alignItems: "center", gap: "8px", opacity: 0.4,
            animation: "fadeUp 0.8s ease 0.9s both"
          }}>
            <div style={{
              width: "1px", height: "48px",
              background: "linear-gradient(180deg, transparent, #00bfff, transparent)",
            }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "3px", textTransform: "uppercase", color: "#00bfff" }}>scroll</span>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "120px 32px", background: "#04040a" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="grid-2" style={{ alignItems: "center", gap: "80px" }}>
            {/* Left: Text */}
            <div>
              <RevealSection>
                <span className="section-label">About the Developer</span>
                <h2 style={{
                  fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700,
                  letterSpacing: "2px", textTransform: "uppercase",
                  lineHeight: 1.1, marginBottom: "28px"
                }}>
                  <span className="shimmer-gold">Michael Rice</span>
                </h2>
              </RevealSection>

              <RevealSection delay={100}>
                <p style={{
                  fontFamily: "'Inter', sans-serif", color: "#888", fontSize: "1.05rem",
                  lineHeight: 1.85, marginBottom: "20px"
                }}>
                  I'm a solo developer building AI-powered web applications for
                  <strong style={{ color: "#00bfff" }}> underserved communities</strong> — the people
                  who have been left behind by the tech industry and deserve better.
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif", color: "#888", fontSize: "1.05rem",
                  lineHeight: 1.85, marginBottom: "20px"
                }}>
                  From medical chatbots to genealogy platforms, legal rights companions to
                  adaptive education tools — every product I build is driven by a single
                  question: <em style={{ color: "#ffd700" }}>who needs this most?</em>
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif", color: "#888", fontSize: "1.05rem",
                  lineHeight: 1.85
                }}>
                  Based in Arizona. <strong style={{ color: "#00bfff" }}>Black-owned brand.</strong> Building
                  with React, Vite, Claude AI, and a relentless commitment to craft.
                </p>
              </RevealSection>

              <RevealSection delay={200}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "32px" }}>
                  {["Black-Owned", "Arizona-Based", "Solo Developer", "AI Specialist", "React Expert", "Community-Focused"].map(tag => (
                    <span key={tag} style={{
                      fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", fontWeight: 600,
                      letterSpacing: "1.5px", textTransform: "uppercase",
                      background: "rgba(0,191,255,0.08)", border: "1px solid rgba(0,191,255,0.25)",
                      color: "#00bfff", padding: "6px 14px", borderRadius: "20px"
                    }}>{tag}</span>
                  ))}
                </div>
              </RevealSection>
            </div>

            {/* Right: Stats card */}
            <RevealSection delay={150}>
              <div style={{
                background: "linear-gradient(135deg, #080814 0%, #050510 100%)",
                border: "1px solid #1a1a2e",
                borderRadius: "20px", padding: "48px 36px",
                position: "relative", overflow: "hidden",
                animation: "borderFlow 4s ease-in-out infinite"
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                  background: "linear-gradient(90deg, #00bfff, #ffd700, #00bfff)",
                  backgroundSize: "200% auto",
                  animation: "shimmerGold 3s linear infinite"
                }} />
                {[
                  ["5", "AI-Powered Projects"],
                  ["100%", "Black-Owned"],
                  ["0", "Compromises on Quality"],
                  ["∞", "Community Impact"],
                ].map(([stat, label]) => (
                  <div key={label} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "20px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.05)"
                  }}>
                    <span style={{
                      fontFamily: "'Oswald', sans-serif", fontSize: "2.4rem", fontWeight: 700,
                      color: "#ffd700"
                    }}>{stat}</span>
                    <span style={{
                      fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "#666",
                      letterSpacing: "1px", textAlign: "right", maxWidth: "160px"
                    }}>{label}</span>
                  </div>
                ))}
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#444",
                  marginTop: "20px", letterSpacing: "0.5px"
                }}>
                  michael@michaelnextleveldevelopment.com
                </p>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{
        padding: "120px 32px",
        background: "linear-gradient(180deg, #04040a 0%, #060612 50%, #04040a 100%)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <RevealSection>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <span className="section-label">What I Build</span>
              <h2 style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700,
                letterSpacing: "3px", textTransform: "uppercase"
              }}>
                <span className="shimmer-blue">Services</span>
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif", color: "#555", marginTop: "16px",
                fontSize: "0.95rem"
              }}>
                Full-spectrum development — from idea to deployed product.
              </p>
            </div>
          </RevealSection>

          <div className="grid-3">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" style={{ padding: "120px 32px", background: "#04040a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <RevealSection>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <span className="section-label">Built & Deployed</span>
              <h2 style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700,
                letterSpacing: "3px", textTransform: "uppercase"
              }}>
                <span className="shimmer-gold">The Work</span>
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif", color: "#555", marginTop: "16px",
                fontSize: "0.95rem"
              }}>
                Five products. Five communities served. All built by one developer.
              </p>
            </div>
          </RevealSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "28px" }}>
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.name} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{
        padding: "120px 32px",
        background: "linear-gradient(180deg, #04040a 0%, #020208 100%)",
        position: "relative", overflow: "hidden"
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px", height: "300px",
          background: "radial-gradient(ellipse, rgba(0,191,255,0.06) 0%, transparent 70%)",
          filter: "blur(40px)", pointerEvents: "none"
        }} />

        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <RevealSection>
            <span className="section-label">Ready to Build?</span>
            <h2 style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700,
              letterSpacing: "3px", textTransform: "uppercase", marginBottom: "20px"
            }}>
              <span className="shimmer-blue">Let's Work</span><br />
              <span className="shimmer-gold">Together</span>
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif", color: "#777", fontSize: "1.05rem",
              lineHeight: 1.8, marginBottom: "52px", maxWidth: "520px", margin: "0 auto 52px"
            }}>
              Have a project? An idea? A community that needs better technology?
              I want to hear about it. Let's build something that matters.
            </p>
          </RevealSection>

          <RevealSection delay={100}>
            <div style={{
              background: "linear-gradient(135deg, #080814, #050510)",
              border: "1px solid rgba(0,191,255,0.2)",
              borderRadius: "20px", padding: "48px 40px",
              marginBottom: "36px"
            }}>
              {/* Email block */}
              <div style={{
                display: "flex", alignItems: "center", gap: "16px",
                justifyContent: "center", marginBottom: "28px"
              }}>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "12px", flexShrink: 0,
                  background: "linear-gradient(135deg, rgba(0,191,255,0.2), rgba(0,191,255,0.05))",
                  border: "1px solid rgba(0,191,255,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.3rem"
                }}>✉️</div>
                <div style={{ textAlign: "left" }}>
                  <div style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: "#555",
                    letterSpacing: "2px", textTransform: "uppercase", marginBottom: "4px"
                  }}>Direct Email</div>
                  <a href="mailto:michael@michaelnextleveldevelopment.com"
                    style={{
                      fontFamily: "'Oswald', sans-serif", fontSize: "1.1rem", fontWeight: 600,
                      letterSpacing: "0.5px", color: "#00bfff", textDecoration: "none",
                      transition: "color 0.2s"
                    }}
                    onMouseOver={e => e.currentTarget.style.color = "#ffd700"}
                    onMouseOut={e => e.currentTarget.style.color = "#00bfff"}
                  >
                    michael@michaelnextleveldevelopment.com
                  </a>
                </div>
              </div>

              {/* Domain */}
              <div style={{
                display: "flex", alignItems: "center", gap: "16px",
                justifyContent: "center", marginBottom: "36px"
              }}>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "12px", flexShrink: 0,
                  background: "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,215,0,0.05))",
                  border: "1px solid rgba(255,215,0,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.3rem"
                }}>🌐</div>
                <div style={{ textAlign: "left" }}>
                  <div style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: "#555",
                    letterSpacing: "2px", textTransform: "uppercase", marginBottom: "4px"
                  }}>Website</div>
                  <a href="https://michaelnextleveldevelopment.com" target="_blank" rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Oswald', sans-serif", fontSize: "1.1rem", fontWeight: 600,
                      letterSpacing: "0.5px", color: "#ffd700", textDecoration: "none",
                      transition: "color 0.2s"
                    }}
                    onMouseOver={e => e.currentTarget.style.color = "#00bfff"}
                    onMouseOut={e => e.currentTarget.style.color = "#ffd700"}
                  >
                    michaelnextleveldevelopment.com
                  </a>
                </div>
              </div>

              {/* CTA Buttons */}
              <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                <a href="mailto:michael@michaelnextleveldevelopment.com"
                  className="btn-primary" style={{ fontSize: "0.95rem", padding: "14px 36px" }}>
                  Send a Message
                </a>
                <a href="https://michaelnextleveldevelopment.com" target="_blank" rel="noopener noreferrer"
                  className="btn-outline" style={{ fontSize: "0.95rem", padding: "12px 32px" }}>
                  Visit Site
                </a>
              </div>
            </div>
          </RevealSection>

          <RevealSection delay={200}>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "#444",
              lineHeight: 1.7
            }}>
              Available for freelance projects, long-term partnerships, and consulting.<br />
              Response time: within 24 hours.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: "48px 32px 36px",
        background: "#020208",
        borderTop: "1px solid rgba(0,191,255,0.1)"
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "20px", marginBottom: "28px"
          }}>
            {/* Logo + name */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img src={LOGO} alt="Next Level Development" style={{ height: "40px", objectFit: "contain", opacity: 0.85 }} />
              <div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "1px" }}>
                  <span className="shimmer-blue">Next Level Development</span>
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: "#555", letterSpacing: "2px", textTransform: "uppercase" }}>
                  Michael Rice — Arizona
                </div>
              </div>
            </div>
            {/* Nav */}
            <div style={{ display: "flex", gap: "28px", flexWrap: "wrap" }}>
              {NAV_LINKS.map(l => (
                <button key={l.id} className="nav-link" style={{ fontSize: "0.75rem" }}
                  onClick={() => scrollTo(l.id)}>{l.label}</button>
              ))}
            </div>
          </div>

          <div style={{
            borderTop: "1px solid #0d0d1a", paddingTop: "24px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: "12px"
          }}>
            <p style={{ fontFamily: "'Inter', sans-serif", color: "#444", fontSize: "0.78rem" }}>
              © 2025 Next Level Development. All rights reserved.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", color: "#ffd700", fontSize: "0.72rem", letterSpacing: "1px" }}>
              Built by Next Level Development ⚡
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
