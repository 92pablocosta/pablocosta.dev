/* portfolio.jsx — pablocosta.dev
   ──────────────────────────────────────────────────────────────────────── */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#4ADE80",
  "background": "dim",
  "heroVariant": "editorial",
  "cardVariant": "ascii"
}/*EDITMODE-END*/;

// Map accent hex → theme name (used to flip the [data-accent="…"] attribute)
const ACCENT_THEMES = {
  "#4ade80": "green",
  "#60a5fa": "blue",
  "#fbbf24": "amber",
  "#f472b6": "magenta",
};

/* ─── data ─────────────────────────────────────────────────────────────── */

const PROJECTS = [
  {
    id: "dentbot",
    n: "01",
    name: "DentBot",
    problem: "AI WhatsApp receptionist that handles appointment booking, rescheduling, and patient questions for a dental clinic — running in production today.",
    status: "production",
    statusLabel: "live in production",
    meta: [
      { k: "client", v: "Dental Studio Odontologia" },
      { k: "region", v: "Brazil" },
    ],
    stack: ["n8n", "Evolution API", "OpenAI", "Docker", "PostgreSQL"],
    github: "https://github.com/92pablocosta",
    demo: null,
    glyph: [
      "  ┌─────────────┐   ┌──────────┐   ┌──────────┐",
      "  │  WhatsApp   │──▶│   n8n    │──▶│  OpenAI  │",
      "  │  (patient)  │   │  flows   │   │  GPT-4o  │",
      "  └─────────────┘   └────┬─────┘   └──────────┘",
      "                         ▼",
      "                  ┌────────────┐",
      "                  │ Postgres   │",
      "                  │ (bookings) │",
      "                  └────────────┘",
    ].join("\n"),
  },
  {
    id: "vishpath",
    n: "02",
    name: "VishPath AU",
    problem: "SaaS that helps Brazilian immigrants research Australian visa pathways — live product with Stripe payments and Clerk auth.",
    status: "live",
    statusLabel: "live SaaS · paid",
    meta: [
      { k: "auth",     v: "Clerk" },
      { k: "payments", v: "Stripe" },
    ],
    stack: ["Next.js", "Gemini 2.5 Flash", "Clerk", "Stripe", "Railway"],
    github: "https://github.com/92pablocosta",
    demo: null,
    glyph: [
      "  GET  /visas/:type          → AI-guided pathway",
      "  POST /auth/session         → Clerk",
      "  POST /billing/checkout     → Stripe",
      "  GET  /dashboard            → user journey state",
    ].join("\n"),
  },
];

const CLIENTS = [
  {
    name: "Dental Studio Odontologia",
    desc: "WhatsApp AI bot · running in production",
    badge: "production",
    badgeLabel: "production",
    link: null,
  },
  {
    name: "Pioneira Laundromat",
    desc: "Marketing landing page · live",
    badge: "production",
    badgeLabel: "live",
    link: null,
  },
  {
    name: "Law Firm (São Paulo)",
    desc: "Legal process monitoring automation · Python + CNJ API",
    badge: "production",
    badgeLabel: "production",
    link: null,
  },
];

const STACK_PROD = ["Python", "n8n", "OpenAI API", "Evolution API", "PostgreSQL", "Docker", "Java", "Spring Boot"];
const STACK_LEARN = ["LangGraph", "FastMCP", "RAG", "LLM evaluation", "Langfuse", "Next.js"];

/* ─── live time ────────────────────────────────────────────────────────── */

function useSaoPauloTime() {
  const [t, setT] = React.useState(() => formatSP(new Date()));
  React.useEffect(() => {
    const id = setInterval(() => setT(formatSP(new Date())), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}
function formatSP(d) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: false, timeZone: "America/Sao_Paulo",
    }).format(d);
  } catch (e) { return d.toTimeString().slice(0, 8); }
}

/* ─── reveal on scroll ─────────────────────────────────────────────────── */

function useReveal() {
  React.useEffect(() => {
    document.documentElement.classList.add("js-reveal");
    if (typeof IntersectionObserver === "undefined") {
      document.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── header ───────────────────────────────────────────────────────────── */

function Header() {
  const time = useSaoPauloTime();
  return (
    <header className="site-header">
      <div className="wrap">
        <a href="#top" className="brand">
          <span className="mark">pc</span>
          <span>pablocosta.dev</span>
          <span className="dot" title="available for remote roles"></span>
        </a>
        <nav className="nav">
          <a href="#projects" className="always"><span className="n">01</span>projects</a>
          <a href="#clients"><span className="n">02</span>clients</a>
          <a href="#stack"><span className="n">03</span>stack</a>
          <a href="#about"><span className="n">04</span>about</a>
          <a href="#contact" className="always"><span className="n">05</span>contact</a>
          <span className="clock">
            <span className="city">São Paulo</span>
            <span className="time">{time}</span>
          </span>
        </nav>
      </div>
    </header>
  );
}

/* ─── hero variants ────────────────────────────────────────────────────── */

function HeroEditorial() {
  return (
    <div className="reveal in">
      <span className="eyebrow">
        <span className="dot" />
        available for remote roles · worldwide
      </span>
      <h1>
        Pablo Costa<br />
        <span className="accent">AI systems</span> that actually ship.
      </h1>
      <p className="role mono">
        AI Automation Engineer
        <span className="sep">·</span>
        Backend Developer
      </p>
      <p className="oneliner">
        Brazilian engineer, <span className="hl">4 years in Australia</span>, building
        production AI &mdash; WhatsApp bots, SaaS platforms, LLM integrations &mdash; for real
        clients, not demos.
      </p>
      <div className="ctas">
        <a href="#projects" className="btn primary">
          View projects <span className="arr">→</span>
        </a>
        <a href="#contact" className="btn">
          Get in touch <span className="arr">↗</span>
        </a>
      </div>
    </div>
  );
}

function HeroTerminal() {
  return (
    <div className="reveal in">
      <span className="eyebrow">
        <span className="dot" />
        available for remote roles · worldwide
      </span>
      <div className="hero-term">
        <span className="row">
          <span className="prompt">~ $</span> <span className="cmd">whoami</span>
        </span>
        <span className="out">
          <span className="k">name</span><span className="v">Pablo Costa</span>
        </span>
        <span className="out">
          <span className="k">role</span><span className="v">AI Automation Engineer · Backend Dev</span>
        </span>
        <span className="out">
          <span className="k">location</span><span className="v">João Pessoa, BR <span style={{color:"var(--fg-faint)"}}>(4y in Australia)</span></span>
        </span>
        <span className="out">
          <span className="k">stack</span><span className="v">Java · Spring · n8n · OpenAI · Postgres</span>
        </span>
        <span className="out">
          <span className="k">status</span><span className="v green">● available for remote roles</span>
        </span>
        <span className="row">
          <span className="prompt">~ $</span> <span className="cmd">cat mission.txt</span>
        </span>
        <span className="out">
          <span className="v">Build production AI systems that actually ship.</span>
          <span className="caret" />
        </span>
      </div>
      <div className="ctas">
        <a href="#projects" className="btn primary">
          ./view-projects <span className="arr">→</span>
        </a>
        <a href="#contact" className="btn">
          ./contact <span className="arr">↗</span>
        </a>
      </div>
    </div>
  );
}

function HeroStatus() {
  const time = useSaoPauloTime();
  return (
    <div className="hero-status reveal in">
      <div>
        <span className="eyebrow">
          <span className="dot" />
          available for remote roles
        </span>
        <h1>
          Pablo Costa
        </h1>
        <p className="role mono">
          AI Automation Engineer
          <span className="sep">·</span>
          Backend Developer
        </p>
        <p className="oneliner">
          <span className="hl">4 years in Australia</span>. Building AI systems that
          actually ship — WhatsApp bots, SaaS, LLM pipelines for real clients.
        </p>
        <div className="ctas">
          <a href="#projects" className="btn primary">
            View projects <span className="arr">→</span>
          </a>
          <a href="#contact" className="btn">
            Get in touch <span className="arr">↗</span>
          </a>
        </div>
      </div>
      <aside className="meta-block">
        <div><span className="k">name</span><span className="v">Pablo Costa</span></div>
        <div><span className="k">based</span><span className="v">João Pessoa, BR</span></div>
        <div><span className="k">local</span><span className="v" style={{fontVariantNumeric:"tabular-nums"}}>{time}</span></div>
        <div><span className="k">english</span><span className="v">fluent (AU, 4y)</span></div>
        <div><span className="k">remote</span><span className="v accent">● available</span></div>
        <div><span className="k">focus</span><span className="v">AI eng · backend</span></div>
      </aside>
    </div>
  );
}

function Hero({ variant }) {
  return (
    <section id="top" className="hero">
      <div className="wrap">
        {variant === "terminal" && <HeroTerminal />}
        {variant === "status" && <HeroStatus />}
        {variant === "editorial" && <HeroEditorial />}
      </div>
    </section>
  );
}

/* ─── projects ─────────────────────────────────────────────────────────── */

function ProjectCard({ p, showGlyph }) {
  return (
    <article className="card reveal">
      <div className="card-head">
        <h3 className="card-title">
          <span className="n">{p.n}</span>
          <span>{p.name}</span>
        </h3>
        <span className={`badge${p.status === "prototype" ? " neutral" : ""}`}>
          {p.statusLabel}
        </span>
      </div>

      <p className="problem">{p.problem}</p>

      {showGlyph && p.glyph && (
        <pre className="glyph" aria-hidden="true">{p.glyph}</pre>
      )}

      <div className="meta-line">
        {p.meta.map((m, i) => (
          <span key={i}><span className="k">{m.k}:</span> {m.v}</span>
        ))}
      </div>

      <div className="tags">
        {p.stack.map(s => <span key={s} className="tag">{s}</span>)}
      </div>

      <div className="links">
        {p.github && (
          <a href={p.github} target="_blank" rel="noreferrer">
            github <span className="arr">↗</span>
          </a>
        )}
        {p.demo && (
          <>
            <span className="sep">·</span>
            <a href={p.demo} target="_blank" rel="noreferrer">
              live demo <span className="arr">↗</span>
            </a>
          </>
        )}
        {!p.demo && (
          <>
            <span className="sep">·</span>
            <span style={{color:"var(--fg-faint)"}}>
              {p.status === "production" ? "private deployment" : "demo on request"}
            </span>
          </>
        )}
      </div>
    </article>
  );
}

function Projects({ cardVariant }) {
  return (
    <section id="projects">
      <div className="wrap">
        <p className="section-label"><span className="num">01</span>projects</p>
        <div className="project-grid">
          {PROJECTS.map(p => (
            <ProjectCard key={p.id} p={p} showGlyph={cardVariant === "ascii"} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── clients ──────────────────────────────────────────────────────────── */

function Clients() {
  return (
    <section id="clients">
      <div className="wrap">
        <p className="section-label"><span className="num">02</span>client work</p>
        <div className="client-grid">
          {CLIENTS.map((c, i) => (
            <div key={i} className="client-card reveal">
              <div className="l">
                <span className="name">{c.name}</span>
                <span className="desc">{c.desc}</span>
              </div>
              <span className="badge">{c.badgeLabel}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── stack (code-block) ───────────────────────────────────────────────── */

function StackBlock({ filename, varname, items, comment }) {
  return (
    <div className="codeblock reveal">
      <div className="cb-head">
        <span className="cb-dots"><i /><i /><i /></span>
        <span>{filename}</span>
        <span style={{visibility:"hidden"}}>—</span>
      </div>
      <pre>
        <span className="cm">{comment}</span>
        {"\n"}
        <span className="kw">const </span>
        <span className="var">{varname}</span>
        <span className="op"> = [</span>
        {"\n"}
        {items.map((it, i) => (
          <React.Fragment key={it}>
            <span className="ind" />
            <span className="str">{it}</span>
            <span className="op">{i < items.length - 1 ? "," : ""}</span>
            {"\n"}
          </React.Fragment>
        ))}
        <span className="op">];</span>
      </pre>
    </div>
  );
}

function Stack() {
  return (
    <section id="stack">
      <div className="wrap">
        <p className="section-label"><span className="num">03</span>stack</p>
        <div className="stack-grid">
          <StackBlock
            filename="production.ts"
            varname="production"
            comment="// Shipped to real users, currently in production"
            items={STACK_PROD}
          />
          <StackBlock
            filename="learning.ts"
            varname="building_with"
            comment="// Actively using on new projects"
            items={STACK_LEARN}
          />
        </div>
      </div>
    </section>
  );
}

/* ─── about ────────────────────────────────────────────────────────────── */

function About() {
  return (
    <section id="about">
      <div className="wrap">
        <p className="section-label"><span className="num">04</span>about</p>
        <div className="about-grid">
          <dl className="facts">
            <dt>// origin</dt>
            <dd>João Pessoa, Brazil 🇧🇷</dd>
            <dt>// english</dt>
            <dd>fluent — 4 years in Australia 🇦🇺</dd>
            <dt>// trajectory</dt>
            <dd>Java backend → AI automation</dd>
            <dt>// target</dt>
            <dd>international remote, AI eng roles</dd>
            <dt>// timezone</dt>
            <dd>UTC-3 · flexible</dd>
          </dl>
          <div className="reveal">
            <p>
              I'm a Brazilian software engineer who spent four years in Australia,
              came back fluent in English and shipped product, and is now building toward
              full-time remote work for international teams.
            </p>
            <p>
              My background is Java backend &mdash; Spring Boot, Postgres, Docker, the
              boring infrastructure that has to actually work. Over the past two years
              I&apos;ve been pulling that experience into AI automation: WhatsApp agents
              for real clinics, SaaS products with paying users, LLM pipelines that
              live in production and not in a notebook.
            </p>
            <p>
              I&apos;m most useful where the AI hype meets the part nobody wants to do
              &mdash; wiring it to a database, putting it behind auth, monitoring it,
              keeping it cheap. If that&apos;s the gap on your team, let&apos;s talk.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── contact ──────────────────────────────────────────────────────────── */

function Contact() {
  const [copied, setCopied] = React.useState(false);
  const email = "92pablocosta@gmail.com";
  const onCopy = (e) => {
    e.preventDefault();
    navigator.clipboard?.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };
  return (
    <section id="contact">
      <div className="wrap">
        <p className="section-label"><span className="num">05</span>contact</p>
        <div className="contact">
          <div className="reveal">
            <p className="lead">
              Hiring for AI engineering or backend?<br />
              <span className="accent">Let&apos;s talk.</span>
            </p>
            <p style={{color:"var(--fg-mute)", maxWidth:420, fontSize:14}}>
              Best on email or LinkedIn. I read both daily and reply within 24h.
            </p>
          </div>
          <div className="contact-links reveal">
            <a href={`mailto:${email}`} className="contact-link" onClick={onCopy}>
              <span className="k">email</span>
              <span className="v">
                {email}
                <span className={`copied${copied ? " on" : ""}`}>copied</span>
              </span>
              <span className="arr">copy ↗</span>
            </a>
            <a href="https://linkedin.com/in/pablocosta-dev" className="contact-link" target="_blank" rel="noreferrer">
              <span className="k">linkedin</span>
              <span className="v">linkedin.com/in/pablocosta-dev</span>
              <span className="arr">↗</span>
            </a>
            <a href="https://github.com/92pablocosta" className="contact-link" target="_blank" rel="noreferrer">
              <span className="k">github</span>
              <span className="v">github.com/92pablocosta</span>
              <span className="arr">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── footer ───────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="l">
          <span>// pablocosta.dev</span>
          <span>// {new Date().getFullYear()}</span>
          <span>// João Pessoa · UTC-3</span>
        </div>
        <div className="r">
          built by hand · no trackers · no cookies
        </div>
      </div>
    </footer>
  );
}

/* ─── app ──────────────────────────────────────────────────────────────── */

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();

  // Apply theme tweaks at document level so :root variables flip globally.
  React.useEffect(() => {
    const themeName = ACCENT_THEMES[String(t.accent).toLowerCase()] || "green";
    document.documentElement.dataset.accent = themeName;
    document.documentElement.dataset.bg = t.background;
  }, [t.accent, t.background]);

  return (
    <>
      <Header />
      <main>
        <Hero variant={t.heroVariant} />
        <Projects cardVariant={t.cardVariant} />
        <Clients />
        <Stack />
        <About />
        <Contact />
      </main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme">
          <TweakColor
            label="Accent"
            value={t.accent}
            options={["#4ADE80", "#60A5FA", "#FBBF24", "#F472B6"]}
            onChange={(v) => setTweak("accent", v)}
          />
          <TweakSelect
            label="Background"
            value={t.background}
            options={[
              { value: "deep",  label: "Deep black" },
              { value: "dim",   label: "Dim (default)" },
              { value: "paper", label: "Paper dark" },
            ]}
            onChange={(v) => setTweak("background", v)}
          />
        </TweakSection>
        <TweakSection label="Layout">
          <TweakSelect
            label="Hero variant"
            value={t.heroVariant}
            options={[
              { value: "editorial", label: "Editorial (clean)" },
              { value: "terminal",  label: "Terminal ($ whoami)" },
              { value: "status",    label: "Status block (metadata)" },
            ]}
            onChange={(v) => setTweak("heroVariant", v)}
          />
          <TweakRadio
            label="Cards"
            value={t.cardVariant}
            options={[
              { value: "text",  label: "Text" },
              { value: "ascii", label: "+ASCII" },
            ]}
            onChange={(v) => setTweak("cardVariant", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
