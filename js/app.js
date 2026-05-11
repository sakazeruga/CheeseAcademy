/* Cheese Academy — Editorial LP */
// Resource fallback: before super_inline_html bundles, use direct paths so the page runs.
if (!window.__resources) {
  window.__resources = {
    heroLoop: "assets/hero.mp4",
    artisanHands: "assets/artisan-hands.jpg",
    cheeseBoard6: "assets/cheese-board-6.jpg",
    beerCheesePairing: "assets/beer-cheese-pairing.jpg",
    breweryConsulting: "assets/brewery-consulting.jpg",
    pastureTerroir: "assets/pasture-terroir.jpg",
    consumersScene: "assets/consumers-scene.jpg"
  };
}
const { useState, useEffect, useRef, useMemo } = React;

// ---------- Tweaks defaults ----------
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroHeadline": "日本のテロワールを、科学し、学び、繋ぐ。",
  "heroSub": "職人の情熱を最高の体験に変える、次世代の食学習＆経営プラットフォーム。",
  "accentMode": "amber",
  "heroLayout": "editorial",
  "showMarquee": true
} /*EDITMODE-END*/;

// ============================================================
// Primitives
// ============================================================

const Rule = ({ vertical = false, style = {} }) =>
<div style={{ background: "var(--rule)", ...(vertical ? { width: 1, height: "100%" } : { height: 1, width: "100%" }), ...style }} />;


const SectionMark = ({ n, label }) =>
<div className="mono" style={{ fontSize: 11, letterSpacing: ".24em", textTransform: "uppercase", color: "var(--bordeaux)", display: "flex", alignItems: "center", gap: 14 }}>
    <span style={{ fontWeight: 500 }}>§{n}</span>
    <span style={{ width: 28, height: 1, background: "var(--bordeaux)", opacity: .5 }} />
    <span style={{ color: "var(--ink-2)" }}>{label}</span>
  </div>;


const Seal = ({ size = 92 }) =>
<svg width={size} height={size} viewBox="0 0 100 100" style={{ display: "block" }}>
    <defs>
      <path id="circ" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
    </defs>
    <circle cx="50" cy="50" r="46" fill="none" stroke="var(--bordeaux)" strokeWidth=".6" />
    <circle cx="50" cy="50" r="42" fill="none" stroke="var(--bordeaux)" strokeWidth=".4" />
    <text fontFamily="JetBrains Mono, monospace" fontSize="5.2" fill="var(--bordeaux)" letterSpacing="2.8">
      <textPath href="#circ" startOffset="0">CHEESE · ACADEMY · TOKYO · EST · 2026 · </textPath>
    </text>
    <text x="50" y="46" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="18" fill="var(--bordeaux)" fontStyle="italic">CA</text>
    <text x="50" y="60" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="4" fill="var(--bordeaux)" letterSpacing="1.4">TERROIR · JP</text>
  </svg>;


// Monogram C logo
const Logo = ({ dark = false }) =>
<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <div style={{ width: 40, height: 40, border: "1px solid " + (dark ? "rgba(253,253,245,.5)" : "var(--ink)"), display: "grid", placeItems: "center", fontFamily: "Cormorant Garamond, serif", fontSize: 26, fontWeight: 500, color: dark ? "var(--parchment)" : "var(--ink)" }}>C</div>
    <div style={{ lineHeight: 1.1 }}>
      <div className="serif" style={{ fontSize: 18, letterSpacing: ".02em", color: dark ? "var(--parchment)" : "var(--ink)" }}>Cheese Academy</div>
      <div className="mono" style={{ fontSize: 9, letterSpacing: ".28em", color: dark ? "rgba(253,253,245,.6)" : "var(--mute)" }}>TOKYO · TERROIR · TECH</div>
    </div>
  </div>;


// ============================================================
// Nav
// ============================================================
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on);on();
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [
  ["§01", "Market"], ["§02", "Pillars"], ["§03", "For You"], ["§04", "AI Mentor"], ["§05", "Journal"]];

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, transition: "all .35s ease",
      background: scrolled ? "rgba(253,253,245,.92)" : "transparent",
      backdropFilter: scrolled ? "blur(10px)" : "none",
      borderBottom: scrolled ? "1px solid var(--rule-soft)" : "1px solid transparent"
    }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "18px 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Logo />
        <nav style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {links.map(([k, l]) =>
          <a key={l} href={"#s" + k.replace("§", "")} style={{ textDecoration: "none", color: "var(--ink-2)", fontSize: 13, display: "flex", gap: 8, alignItems: "baseline" }}>
              <span className="mono" style={{ fontSize: 10, color: "var(--bordeaux)", opacity: .7 }}>{k}</span>
              <span>{l}</span>
            </a>
          )}
        </nav>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={btnGhost}>ログイン</button>
          <button style={btnFilled}>無料で始める →</button>
        </div>
      </div>
    </div>);

}
const btnFilled = {
  background: "var(--bordeaux)", color: "var(--parchment)", border: "none",
  padding: "11px 20px", fontSize: 12, letterSpacing: ".12em", cursor: "pointer",
  fontFamily: "'Noto Sans JP',sans-serif", fontWeight: 500
};
const btnGhost = {
  background: "transparent", color: "var(--ink)", border: "1px solid var(--ink)",
  padding: "10px 18px", fontSize: 12, letterSpacing: ".12em", cursor: "pointer",
  fontFamily: "'Noto Sans JP',sans-serif", fontWeight: 500
};

// ============================================================
// HERO
// ============================================================
function Hero({ headline, sub }) {
  return (
    <section style={{ position: "relative", minHeight: "100vh", padding: "120px 48px 60px", overflow: "hidden" }}>
      {/* Background tint */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, var(--parchment) 0%, var(--parchment-2) 100%)" }} />

      {/* Aged-paper cream patch behind headline */}
      <div aria-hidden style={{ position: "absolute", right: "-6%", top: "18%", width: "58%", height: "58%",
        background: "radial-gradient(ellipse at center, rgba(243,229,171,.55), rgba(243,229,171,0) 65%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", minHeight: "calc(100vh - 180px)" }}>
        {/* Left */}
        <div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: ".28em", color: "var(--bordeaux)", marginBottom: 28, display: "flex", gap: 14, alignItems: "center" }}>
            <span style={{ display: "inline-block", width: 8, height: 8, border: "1px solid var(--bordeaux)", transform: "rotate(45deg)" }} />
            <span>VOL.01 — EST. MMXXVI</span>
          </div>
          <h1 className="serif-jp" style={{
            margin: 0, fontSize: "clamp(44px, 5.4vw, 82px)", lineHeight: 1.15, fontWeight: 400,
            letterSpacing: ".01em", color: "var(--ink)"
          }}>
            日本の<br />
            <span style={{ color: "var(--bordeaux)", fontStyle: "italic", fontFamily: "'Cormorant Garamond',serif", fontWeight: 500 }}>テロワール</span>を、<br />
            <em className="serif" style={{ fontStyle: "italic", color: "var(--amber-2)", fontWeight: 500 }}>科学し、</em>学び、<br />
            <span style={{ paddingLeft: "5em" }}>繋ぐ。</span>
          </h1>
          <p style={{ marginTop: 36, fontSize: 17, lineHeight: 1.9, color: "var(--ink-2)", maxWidth: 520 }}>
            {sub}
          </p>

          {/* inline credits row */}
          <div style={{ marginTop: 40, display: "flex", gap: 24, alignItems: "center" }}>
            <button style={{ ...btnFilled, padding: "16px 28px", fontSize: 13 }}>無料で学習を始める →</button>
            <button style={{ ...btnGhost, padding: "15px 26px", fontSize: 13 }}>生産者として登録</button>
          </div>

          <div style={{ marginTop: 72, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, borderTop: "1px solid var(--rule-soft)", borderBottom: "1px solid var(--rule-soft)" }}>
            {[
            ["800+", "日本のクラフトブルワリー数"],
            ["+11%", "クラフトチーズ市場成長率"],
            ["AI", "経営メンター搭載"]].
            map(([n, l], i) =>
            <div key={i} style={{ padding: "22px 0 22px", paddingLeft: i === 0 ? 0 : 24, borderLeft: i === 0 ? "none" : "1px solid var(--rule-soft)" }}>
                <div className="serif" style={{ fontSize: 34, color: "var(--bordeaux)", fontWeight: 500 }}>{n}</div>
                <div style={{ fontSize: 11, letterSpacing: ".14em", color: "var(--mute)", marginTop: 4 }}>{l}</div>
              </div>
            )}
          </div>
        </div>

        {/* Right — editorial image stack */}
        <div style={{ position: "relative", height: "80vh", minHeight: 600 }}>
          {/* Seal */}
          <div style={{ position: "absolute", top: -20, right: 0, animation: "spin 60s linear infinite" }}>
            <Seal size={130} />
          </div>
          <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>

          {/* Main image — animated hero */}
          <video
            src={window.__resources.heroLoop}
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute", top: 40, right: 40, width: "78%", height: "62%",
              objectFit: "cover", // backgroundSize: "cover" の代わり
              boxShadow: "0 30px 80px -20px rgba(74,4,4,.35)"
            }}
          />

          {/* Caption label over image */}
          <div style={{ position: "absolute", top: 60, right: 60, background: "var(--parchment)", padding: "8px 14px", border: "1px solid var(--bordeaux)" }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--bordeaux)" }}>SCENE.N°001 · PASTURE</div>
          </div>

          {/* Small overlap image */}
          <div style={{ position: "absolute", bottom: 20, left: 0, width: "52%", height: "40%",
            backgroundImage: `url(${window.__resources.artisanHands})`, backgroundSize: "cover", backgroundPosition: "center",
            border: "8px solid var(--parchment)", boxShadow: "0 20px 40px -10px rgba(0,0,0,.25)" }} />

          {/* Italic French tag */}
          <div className="serif" style={{ position: "absolute", left: "54%", bottom: "8%", fontStyle: "italic", fontSize: 22, color: "var(--bordeaux)", maxWidth: 240, lineHeight: 1.35 }}>
            — « Le terroir japonais, <br />réinventé par la donnée. »
          </div>

          {/* Corner tick */}
          <div style={{ position: "absolute", top: 0, left: 0, display: "flex", flexDirection: "column", gap: 6 }}>
            <div className="mono" style={{ fontSize: 9, letterSpacing: ".2em", color: "var(--mute)" }}>35°40′08.8″ N · 139°42′12.4″ E</div>
            <div className="mono" style={{ fontSize: 9, letterSpacing: ".2em", color: "var(--mute)" }}>35.669108, 139.703438</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: ".3em", color: "var(--mute)" }}>SCROLL</div>
        <div style={{ width: 1, height: 40, background: "var(--bordeaux)", animation: "drop 2.2s ease-in-out infinite" }} />
        <style>{"@keyframes drop{0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}50.01%{transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}"}</style>
      </div>
    </section>);

}

// ============================================================
// Marquee
// ============================================================
function Marquee() {
  const items = ["TERROIR", "·", "SCIENCE", "·", "ARTISAN", "·", "AI MENTOR", "·", "PAIRING", "·", "CRAFT", "·", "職人", "·", "発酵", "·", "MICRO-BREWERY"];
  return (
    <div style={{ background: "var(--bordeaux)", color: "var(--cream)", padding: "22px 0", overflow: "hidden", position: "relative", borderTop: "1px solid var(--bordeaux-2)", borderBottom: "1px solid var(--bordeaux-2)" }}>
      <div style={{ display: "flex", gap: 48, animation: "marq 40s linear infinite", whiteSpace: "nowrap" }}>
        {[...items, ...items, ...items].map((w, i) =>
        <span key={i} className="serif" style={{ fontSize: 28, letterSpacing: ".06em", fontStyle: w === "·" ? "normal" : "italic", fontWeight: 400, opacity: w === "·" ? .5 : 1 }}>{w}</span>
        )}
      </div>
      <style>{"@keyframes marq{to{transform:translateX(-33.33%)}}"}</style>
    </div>);

}

// ============================================================
// Market Context (§01)
// ============================================================
function Market() {
  const stats = [
  {
    tag: "TAX·REFORM",
    label: "2026年10月 / 酒税改正",
    stat: "−20%",
    statLabel: "ビール酒税",
    headline: "クラフト飲料市場の、\n爆発的拡大。",
    body: "ビール減税と高アルコール帯増税。\n消費者の嗜好は「量」から「質」へ。\n地方発クラフトの黄金期が到来する。",
    src: "Ministry of Finance, 2025"
  },
  {
    tag: "MARKET·SHARE",
    label: "スペシャルティ市場",
    stat: "+6.2%",
    statLabel: "年間成長率",
    headline: "二極化する市場で求められる、\n“本物”の知識。",
    body: "コモディティは減速し、ハイエンドは伸びる。\n消費者は「背景」を読めるだけの教養を求め始めている。",
    src: "Euromonitor JP, 2025"
  },
  {
    tag: "WHITE·SPACE",
    label: "一般向け教育",
    stat: "0",
    statLabel: "デジタル学習の場",
    headline: "プロ向け資格はあっても、\n消費者の学び場はない。",
    body: "W.S.E.T や J.C.S.A の様な体系は存在しない。\n我々が、その空白に最初の橋を架ける。",
    src: "Internal audit, 2026"
  }];


  return (
    <section id="s01" style={{ padding: "140px 48px 120px", background: "var(--parchment)", position: "relative" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, marginBottom: 80, alignItems: "end" }}>
          <SectionMark n="01" label="Market Context" />
          <h2 className="serif-jp" style={{ margin: 0, fontSize: "clamp(40px,4.2vw,64px)", lineHeight: 1.25, fontWeight: 400, letterSpacing: ".005em" }}>
            なぜ、いま<br />
            <span style={{ fontStyle: "italic", fontFamily: "'Cormorant Garamond',serif", color: "var(--bordeaux)", fontWeight: 500 }}>「チーズアカデミー」</span>なのか？
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, borderTop: "1px solid var(--ink)" }}>
          {stats.map((s, i) =>
          <StatCard key={i} s={s} i={i} />
          )}
        </div>
      </div>
    </section>);

}

function StatCard({ s, i }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "44px 40px 48px",
        borderRight: i < 2 ? "1px solid var(--rule)" : "none",
        borderBottom: "1px solid var(--ink)",
        background: hover ? "var(--cream-soft)" : "transparent",
        transition: "background .35s ease",
        position: "relative", cursor: "default"
      }}>
      
      <div className="mono" style={{ fontSize: 10, letterSpacing: ".26em", color: "var(--bordeaux)" }}>{s.tag}</div>
      <div style={{ fontSize: 12, color: "var(--mute)", marginTop: 8, letterSpacing: ".08em" }}>{s.label}</div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 28 }}>
        <div className="serif" style={{
          fontSize: hover ? 108 : 96, lineHeight: 1, fontWeight: 500,
          color: hover ? "var(--bordeaux)" : "var(--ink)",
          transition: "all .35s cubic-bezier(.2,.7,.2,1)",
          fontStyle: hover ? "italic" : "normal"
        }}>{s.stat}</div>
        <div style={{ fontSize: 12, color: "var(--mute)", letterSpacing: ".1em", writingMode: "vertical-rl" }}>{s.statLabel}</div>
      </div>

      <h3 className="serif-jp" style={{ marginTop: 28, marginBottom: 14, fontSize: 22, fontWeight: 500, lineHeight: 1.5, color: "var(--ink)", whiteSpace: "pre-line" }}>
        {s.headline}
      </h3>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.85, color: "var(--ink-2)", whiteSpace: "pre-line" }}>{s.body}</p>

      <div style={{ marginTop: 36, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="mono" style={{ fontSize: 10, color: "var(--mute)", letterSpacing: ".14em" }}>— {s.src}</div>
        <div className="mono" style={{ fontSize: 10, color: "var(--bordeaux)", letterSpacing: ".18em" }}>0{i + 1} / 03</div>
      </div>
    </div>);

}

// ============================================================
// 3 Pillars (§02)
// ============================================================
function Pillars() {
  const pillars = [
  {
    k: "I",
    cat: "EDTECH",
    name: "Cheese Academy",
    jp: "学ぶ。",
    desc: "AI診断とゲーミフィケーションを融合したデジタル学習。\n消費者を「目利き」へと育てる、体系的カリキュラム。",
    features: ["AIテイスティング診断", "47テロワール・マップ", "認定バッジ制度"],
    img: window.__resources.cheeseBoard6,
    href: "academy.html"
  },
  {
    k: "II",
    cat: "MARKETPLACE",
    name: "Terroir Matching",
    jp: "繋ぐ。",
    desc: "成長著しい地方型ブルワリー（CAGR 12.6%）と\nチーズ職人の最適ペアリングを、需要データから創出する。",
    features: ["需要予測アルゴリズム", "契約から物流まで", "共同ブランディング支援"],
    img: window.__resources.beerCheesePairing,
    href: "terroir-matching.html"
  },
  {
    k: "III",
    cat: "SAAS",
    name: "AI Business Mentor",
    jp: "育てる。",
    desc: "職人が直面する経営課題 — 廃業理由1位の「ビジネス経験不足」を、AIが24時間伴走して解決する。",
    features: ["原価最適化", "販路・価格診断", "財務レポート自動化"],
    img: window.__resources.breweryConsulting,
    href: "ai-mentor.html"
  }];


  return (
    <section id="s02" style={{ padding: "140px 0 120px", background: "var(--parchment-2)", position: "relative" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, marginBottom: 60, alignItems: "end" }}>
          <SectionMark n="02" label="Three Pillars" />
          <h2 className="serif-jp" style={{ margin: 0, fontSize: "clamp(40px,4.2vw,64px)", lineHeight: 1.25, fontWeight: 400 }}>
            一つのエコシステム、<br />
            <span style={{ fontStyle: "italic", fontFamily: "'Cormorant Garamond',serif", color: "var(--bordeaux)" }}>三つの</span>役割。
          </h2>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {pillars.map((p, i) => <Pillar key={i} p={p} i={i} />)}
      </div>
    </section>);

}

function Pillar({ p, i }) {
  const left = i % 2 === 0;
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
      borderTop: "1px solid var(--rule)",
      borderBottom: "1px solid var(--rule)"
    }}>
      {/* Image side */}
      <div style={{
        order: left ? 1 : 2,
        minHeight: 520, position: "relative",
        backgroundImage: `url(${p.img})`, backgroundSize: "cover", backgroundPosition: "center",
        borderRight: left ? "1px solid var(--rule)" : "none",
        borderLeft: left ? "none" : "1px solid var(--rule)"
      }}>
        {/* Tint */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(74,4,4,.15), rgba(74,4,4,.35))" }} />
        <div style={{ position: "absolute", top: 30, [left ? "left" : "right"]: 30 }}>
          <div className="serif" style={{ fontSize: 180, color: "var(--parchment)", lineHeight: .9, fontWeight: 300, opacity: .95, fontStyle: "italic" }}>{p.k}</div>
        </div>
        <div style={{ position: "absolute", bottom: 30, [left ? "right" : "left"]: 30 }}>
          <div className="mono" style={{ color: "var(--cream)", fontSize: 10, letterSpacing: ".3em" }}>— {p.cat}</div>
        </div>
      </div>

      {/* Content side */}
      <div style={{ order: left ? 2 : 1, padding: "80px 72px", display: "flex", flexDirection: "column", justifyContent: "center", background: "var(--parchment)" }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: ".26em", color: "var(--bordeaux)" }}>PILLAR · {p.k}</div>
        <div className="serif-jp" style={{ fontSize: 28, color: "var(--amber-2)", marginTop: 18, fontWeight: 400 }}>{p.jp}</div>
        <h3 className="serif" style={{ margin: "4px 0 0 0", fontSize: 52, fontWeight: 500, letterSpacing: ".01em", color: "var(--ink)", fontStyle: "italic" }}>{p.name}</h3>

        <div style={{ width: 72, height: 1, background: "var(--bordeaux)", margin: "32px 0" }} />

        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.95, color: "var(--ink-2)", maxWidth: 460, whiteSpace: "pre-line" }}>{p.desc}</p>

        <ul style={{ listStyle: "none", padding: 0, margin: "36px 0 0", display: "flex", flexDirection: "column", gap: 14 }}>
          {p.features.map((f, j) =>
          <li key={j} style={{ display: "flex", gap: 16, alignItems: "baseline", fontSize: 14, color: "var(--ink)" }}>
              <span className="mono" style={{ fontSize: 10, color: "var(--amber-2)", letterSpacing: ".18em", minWidth: 28 }}>0{j + 1}</span>
              <span style={{ flex: 1, paddingBottom: 10, borderBottom: "1px dashed var(--rule)" }}>{f}</span>
            </li>
          )}
        </ul>

        <div style={{ marginTop: 40 }}>
          <a href={p.href} style={{ fontSize: 12, letterSpacing: ".16em", color: "var(--bordeaux)", textDecoration: "none", borderBottom: "1px solid var(--bordeaux)", paddingBottom: 4 }}>READ THE BRIEF →</a>
        </div>
      </div>
    </div>);

}

// ============================================================
// Target Segments (§03) — tabs
// ============================================================
function Segments() {
  const [tab, setTab] = useState(0);
  const tabs = [
  {
    k: "CONSUMERS",
    title: "For Consumers",
    jp: "食を、もっと深く味わいたい人へ。",
    audiences: ["20-30代の探索型ユーザー", "若年女性", "インバウンド層"],
    benefits: [
    ["AIテイスティング診断", "あなたの味覚を15軸でマップ化。推薦精度はInstagramに勝る。"],
    ["テロワール・ジャーナル", "47都道府県の生産地を、週1本のエッセイで巡る。"],
    ["目利きバッジ制度", "学んだ知識は履歴書になる。SNSでも映える認定バッジ。"],
    ["リアル連携ツアー", "オンライン修了生限定、生産地訪問＆ペアリングディナー。"]],

    img: window.__resources.consumersScene
  },
  {
    k: "PRODUCERS",
    title: "For Producers",
    jp: "技術を、経営に変えたい職人へ。",
    audiences: ["地方発テロワール志向の職人", "マイクロブルワリー創業者", "六次産業化を目指す酪農家"],
    benefits: [
    ["AI経営メンター", "原価・販路・価格を24時間診断。元銀行員AIが伴走。"],
    ["需要マッチング", "ブルワリーとの最適ペアリング需要を先に可視化。"],
    ["ストーリー流通", "職人の背景ごと、都市の目利き層に直送。"],
    ["共同ブランディング", "Cheese Academy 認定ラベルで信頼を外装。"]],

    img: window.__resources.artisanHands
  }];

  const t = tabs[tab];

  return (
    <section id="s03" style={{ padding: "140px 48px 120px", background: "var(--bordeaux)", color: "var(--parchment)", position: "relative", backgroundColor: "rgb(74, 18, 4)" }}>
      {/* Deco rule */}
      <div style={{ position: "absolute", top: 0, left: 48, right: 48, height: 1, background: "rgba(253,253,245,.2)" }} />

      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, marginBottom: 60, alignItems: "end" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: ".24em", color: "var(--cream)", display: "flex", alignItems: "center", gap: 14 }}>
            <span>§03</span>
            <span style={{ width: 28, height: 1, background: "var(--cream)", opacity: .5 }} />
            <span style={{ color: "rgba(253,253,245,.75)" }}>Who It's For</span>
          </div>
          <h2 className="serif-jp" style={{ margin: 0, fontSize: "clamp(40px,4.2vw,64px)", lineHeight: 1.25, fontWeight: 400, color: "var(--parchment)" }}>
            あなたの立場で、<br />
            <span style={{ fontStyle: "italic", fontFamily: "'Cormorant Garamond',serif", color: "var(--cream)" }}>違う扉</span>が開きます。
          </h2>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(253,253,245,.25)", marginBottom: 60 }}>
          {tabs.map((x, i) =>
          <button key={i} onClick={() => setTab(i)}
          style={{
            background: "transparent", border: "none", cursor: "pointer",
            padding: "22px 40px 22px 0", marginRight: 36,
            color: i === tab ? "var(--cream)" : "rgba(253,253,245,.5)",
            fontSize: 14, letterSpacing: ".16em", position: "relative",
            fontFamily: "'JetBrains Mono',monospace",
            transition: "color .25s"
          }}>
              <span className="mono">0{i + 1} · {x.k}</span>
              {i === tab && <div style={{ position: "absolute", bottom: -1, left: 0, right: 36, height: 2, background: "var(--amber)" }} />}
            </button>
          )}
        </div>

        {/* Content */}
        <div key={tab} style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 72, animation: "fadeUp .6s ease" }}>
          <style>{"@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}"}</style>

          <div>
            <div style={{ height: 460, backgroundImage: `url(${t.img})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(74,4,4,.6))" }} />
              <div style={{ position: "absolute", bottom: 24, left: 24, right: 24 }}>
                <div className="serif" style={{ fontSize: 40, fontStyle: "italic", lineHeight: 1.1, color: "var(--parchment)" }}>{t.title}</div>
                <div className="serif-jp" style={{ fontSize: 16, color: "var(--cream)", marginTop: 10 }}>{t.jp}</div>
              </div>
            </div>
            <div style={{ marginTop: 30 }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--cream)", marginBottom: 14 }}>AUDIENCE</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {t.audiences.map((a, i) =>
                <span key={i} style={{ fontSize: 12, padding: "8px 14px", border: "1px solid rgba(253,253,245,.3)", color: "var(--parchment)" }}>{a}</span>
                )}
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
              {t.benefits.map((b, i) =>
              <div key={i} style={{
                padding: "30px 28px",
                borderBottom: i < 2 ? "1px solid rgba(253,253,245,.2)" : "none",
                borderRight: i % 2 === 0 ? "1px solid rgba(253,253,245,.2)" : "none"
              }}>
                  <div className="mono" style={{ fontSize: 10, color: "var(--amber)", letterSpacing: ".22em" }}>BENEFIT · 0{i + 1}</div>
                  <h4 className="serif-jp" style={{ margin: "14px 0 10px", fontSize: 20, fontWeight: 500, color: "var(--cream)" }}>{b[0]}</h4>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.8, color: "rgba(253,253,245,.8)" }}>{b[1]}</p>
                </div>
              )}
            </div>
            <div style={{ marginTop: 36, display: "flex", gap: 16 }}>
              <button style={{ ...btnFilled, background: "var(--amber)", color: "var(--ink)", padding: "15px 26px" }}>
                {tab === 0 ? "学習を始める →" : "生産者として登録 →"}
              </button>
              <button style={{ ...btnGhost, borderColor: "var(--parchment)", color: "var(--parchment)", padding: "14px 26px" }}>詳細資料をみる</button>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ============================================================
// AI Dashboard (§04)
// ============================================================
function AIDashboard() {
  const [bars, setBars] = useState([64, 82, 48, 91, 72, 58, 34]);
  const [ring, setRing] = useState(72);
  useEffect(() => {
    const id = setInterval(() => {
      setBars((b) => b.map((x) => Math.max(20, Math.min(100, x + (Math.random() * 14 - 7)))));
      setRing((r) => Math.max(40, Math.min(95, r + (Math.random() * 6 - 3))));
    }, 1800);
    return () => clearInterval(id);
  }, []);
  const circ = 2 * Math.PI * 54;

  return (
    <section id="s04" style={{ padding: "140px 48px 120px", background: "var(--parchment)" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, marginBottom: 80, alignItems: "end" }}>
          <SectionMark n="04" label="AI Business Mentor" />
          <h2 className="serif-jp" style={{ margin: 0, fontSize: "clamp(40px,4.2vw,64px)", lineHeight: 1.25, fontWeight: 400 }}>
            職人の<em style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", color: "var(--bordeaux)" }}>第二の脳。</em><br />
            ペアリング需要と、<br />原価が見える。
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          {/* Left — mentor console */}
          <div style={{ background: "var(--ink)", color: "var(--parchment)", padding: "32px 32px 24px", position: "relative", minHeight: 520, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(253,253,245,.18)", paddingBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--amber)", boxShadow: "0 0 12px var(--amber)" }} />
                <span className="mono" style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--cream)" }}>MENTOR · LIVE</span>
              </div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: ".18em", color: "rgba(253,253,245,.6)" }}>SESSION · #3412</div>
            </div>

            <div style={{ flex: 1, marginTop: 22, display: "flex", flexDirection: "column", gap: 14, fontSize: 13.5, lineHeight: 1.75 }}>
              <div style={{ alignSelf: "flex-start", maxWidth: "86%", background: "rgba(253,253,245,.06)", padding: "12px 14px", border: "1px solid rgba(253,253,245,.15)" }}>
                <div className="mono" style={{ fontSize: 9, letterSpacing: ".2em", color: "var(--amber)", marginBottom: 6 }}>ARTISAN · 小林 牧場</div>
                来月の出荷量、例年の1.3倍の見込み。値上げすべき？
              </div>
              <div style={{ alignSelf: "flex-end", maxWidth: "88%", background: "var(--bordeaux-2)", padding: "14px 16px", borderLeft: "2px solid var(--amber)" }}>
                <div className="mono" style={{ fontSize: 9, letterSpacing: ".2em", color: "var(--cream)", marginBottom: 8 }}>CA · MENTOR</div>
                周辺4県のクラフトビール需要が<b style={{ color: "var(--amber)" }}>+18%</b>、モッツァレラ系の検索流入も上昇中です。
                <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[["原価", "¥1,840/kg"], ["推奨価格", "¥3,200"], ["粗利", "+12.4%"]].map(([k, v], i) =>
                  <div key={i} style={{ padding: "6px 10px", background: "rgba(253,253,245,.08)", border: "1px solid rgba(253,253,245,.2)" }}>
                      <div style={{ fontSize: 9, color: "var(--cream)", letterSpacing: ".18em" }} className="mono">{k}</div>
                      <div className="serif" style={{ fontSize: 18, color: "var(--parchment)", fontStyle: "italic" }}>{v}</div>
                    </div>
                  )}
                </div>
              </div>
              <div style={{ alignSelf: "flex-start", maxWidth: "80%", background: "rgba(253,253,245,.06)", padding: "12px 14px", border: "1px solid rgba(253,253,245,.15)" }}>
                契約ブルワリー候補を3件、マッチングしました。表示しますか？
              </div>
            </div>

            <div style={{ marginTop: 18, display: "flex", gap: 10, borderTop: "1px solid rgba(253,253,245,.18)", paddingTop: 16 }}>
              <div style={{ flex: 1, padding: "10px 14px", background: "rgba(253,253,245,.06)", fontSize: 12, color: "rgba(253,253,245,.6)" }}>質問を入力...</div>
              <div style={{ width: 40, display: "grid", placeItems: "center", background: "var(--amber)", color: "var(--ink)" }}>↑</div>
            </div>
          </div>

          {/* Right — dashboard widget */}
          <div style={{ background: "var(--parchment-2)", padding: "32px 36px", minHeight: 520, display: "grid", gridTemplateRows: "auto 1fr auto", gap: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div className="mono" style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--bordeaux)" }}>PAIRING · DEMAND · FORECAST</div>
                <h4 className="serif-jp" style={{ margin: "10px 0 0", fontSize: 22, fontWeight: 500 }}>関東7県 / 今月の需要予測</h4>
              </div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: ".2em", color: "var(--mute)" }}>UPDATED · LIVE</div>
            </div>

            {/* Chart */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 36, alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 220, borderBottom: "1px solid var(--rule)", borderLeft: "1px solid var(--rule)", paddingLeft: 10, paddingBottom: 0, position: "relative" }}>
                {/* grid lines */}
                {[0, 25, 50, 75, 100].map((v) =>
                <div key={v} style={{ position: "absolute", left: 10, right: 0, bottom: v / 100 * 220 - 1, height: 1, background: "var(--rule-soft)" }} />
                )}
                {bars.map((v, i) =>
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, position: "relative", zIndex: 2 }}>
                    <div className="mono" style={{ fontSize: 9, color: "var(--bordeaux)", marginBottom: -4 }}>{Math.round(v)}</div>
                    <div style={{ width: "72%", height: v / 100 * 200, background: i === 3 ? "var(--amber)" : "var(--bordeaux)", transition: "height 1.2s cubic-bezier(.3,.7,.2,1)", boxShadow: i === 3 ? "0 8px 20px -6px var(--amber)" : "none" }} />
                    <div className="mono" style={{ fontSize: 9, color: "var(--mute)", letterSpacing: ".08em" }}>{["東京", "神奈", "埼玉", "千葉", "群馬", "栃木", "茨城"][i]}</div>
                  </div>
                )}
              </div>

              <div style={{ position: "relative", width: 160, height: 160, margin: "0 auto" }}>
                <svg viewBox="0 0 120 120" width="160" height="160">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="var(--rule)" strokeWidth="4" />
                  <circle cx="60" cy="60" r="54" fill="none" stroke="var(--bordeaux)" strokeWidth="4" strokeDasharray={circ} strokeDashoffset={circ * (1 - ring / 100)} strokeLinecap="butt" transform="rotate(-90 60 60)" style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.3,.7,.2,1)" }} />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <div className="serif" style={{ fontSize: 44, color: "var(--bordeaux)", lineHeight: 1, fontStyle: "italic", fontWeight: 500 }}>{Math.round(ring)}<span style={{ fontSize: 22 }}>%</span></div>
                    <div className="mono" style={{ fontSize: 9, letterSpacing: ".2em", color: "var(--mute)", marginTop: 4 }}>MATCH · SCORE</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, borderTop: "1px solid var(--rule)", paddingTop: 16 }}>
              {[["原価", "¥1,840"], ["在庫回転", "6.2×"], ["粗利率", "+12%"], ["予測精度", "94%"]].map(([k, v], i) =>
              <div key={i} style={{ paddingLeft: i === 0 ? 0 : 18, borderLeft: i === 0 ? "none" : "1px solid var(--rule-soft)" }}>
                  <div className="mono" style={{ fontSize: 9, color: "var(--mute)", letterSpacing: ".2em" }}>{k}</div>
                  <div className="serif" style={{ fontSize: 22, color: "var(--ink)", marginTop: 4, fontStyle: "italic" }}>{v}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ============================================================
// Journal (§05)
// ============================================================
function Journal() {
  const posts = [
  { kicker: "ESSAY · N°012", title: "発酵は、未来の言語である。", meta: "Apr 2026 · 8 min read", img: window.__resources.beerCheesePairing },
  { kicker: "REPORT · N°011", title: "北海道・富良野のテロワール考察。", meta: "Apr 2026 · 12 min read", img: window.__resources.pastureTerroir },
  { kicker: "INTERVIEW · N°010", title: "小規模ブルワリーは、なぜ勝てるのか。", meta: "Mar 2026 · 6 min read", img: window.__resources.breweryConsulting }];

  return (
    <section id="s05" style={{ padding: "140px 48px 120px", background: "var(--parchment)" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, marginBottom: 60, alignItems: "end" }}>
          <SectionMark n="05" label="The Journal" />
          <h2 className="serif-jp" style={{ margin: 0, fontSize: "clamp(40px,4.2vw,64px)", lineHeight: 1.25, fontWeight: 400 }}>
            読むだけで、<br />
            <span style={{ fontStyle: "italic", fontFamily: "'Cormorant Garamond',serif", color: "var(--bordeaux)" }}>味覚</span>が深まる。
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 36 }}>
          {posts.map((p, i) =>
          <a href="#" key={i} style={{ textDecoration: "none", color: "inherit", display: "block", transition: "transform .4s" }} className="journal-card">
              <div style={{ height: 340, backgroundImage: `url(${p.img})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
                <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 60, background: "linear-gradient(180deg, transparent, var(--parchment))" }} />
              </div>
              <div style={{ padding: "26px 0 0" }}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--bordeaux)" }}>{p.kicker}</div>
                <h3 className="serif-jp" style={{ margin: "14px 0 18px", fontSize: 24, fontWeight: 500, lineHeight: 1.5 }}>{p.title}</h3>
                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--rule-soft)", paddingTop: 14 }}>
                  <span style={{ fontSize: 11, color: "var(--mute)", letterSpacing: ".1em" }}>{p.meta}</span>
                  <span className="serif" style={{ fontStyle: "italic", fontSize: 13, color: "var(--bordeaux)" }}>read →</span>
                </div>
              </div>
            </a>
          )}
        </div>
        <style>{".journal-card:hover{transform:translateY(-6px)}"}</style>
      </div>
    </section>);

}

// ============================================================
// Manifesto / Final CTA
// ============================================================
function Manifesto() {
  return (
    <section style={{ padding: "160px 48px 140px", background: "var(--cream)", position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", top: -80, right: -60, opacity: .5 }}><Seal size={260} /></div>

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: ".28em", color: "var(--bordeaux)", marginBottom: 40 }}>MANIFESTO · 2026</div>
        <h2 className="serif-jp" style={{ margin: 0, fontSize: "clamp(52px,6vw,104px)", lineHeight: 1.1, fontWeight: 400, color: "var(--ink)" }}>
          日本の食文化の、<br />
          <span style={{ fontStyle: "italic", fontFamily: "'Cormorant Garamond',serif", color: "var(--bordeaux)", fontWeight: 500 }}>新しい OS に</span>なる。
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 80, marginTop: 60, alignItems: "start" }}>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 2, color: "var(--ink-2)", maxWidth: 700 }}>職人の手と、AIの知性。土地の記憶と、世界の市場。
二つの極を繋ぐのは、学ぶ人の好奇心と、作る人の覚悟です。
私たちは、その橋を設計します。</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <button style={{ ...btnFilled, padding: "18px 24px", fontSize: 13 }}>無料で学習を始める →</button>
            <button style={{ ...btnGhost, padding: "17px 24px", fontSize: 13 }}>生産者として登録</button>
            <div className="serif" style={{ fontStyle: "italic", fontSize: 14, color: "var(--bordeaux)", marginTop: 10, textAlign: "right" }}>— Cheese Academy Tokyo</div>
          </div>
        </div>
      </div>
    </section>);

}

// ============================================================
// Footer
// ============================================================
function Footer() {
  return (
    <footer style={{ background: "var(--ink)", color: "var(--parchment)", padding: "80px 48px 36px" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 40, paddingBottom: 60, borderBottom: "1px solid rgba(253,253,245,.18)" }}>
          <div>
            <Logo dark />
            <p style={{ marginTop: 20, fontSize: 13, lineHeight: 1.9, color: "rgba(253,253,245,.6)", maxWidth: 360, whiteSpace: "pre-line" }}>
              日本のテロワールを、学習と経営のプラットフォームに。{"\n"}2026年、Tokyo より始動。
            </p>
          </div>
          {[
          ["PRODUCT", [["Academy", "academy.html"], ["Terroir Matching", "terroir-matching.html"], ["AI Mentor", "ai-mentor.html"], ["Pricing", "academy.html#pricing"]]],
          ["COMPANY", [["About", "#"], ["Team", "#"], ["Press", "#"], ["Careers", "#"]]],
          ["RESOURCES", [["Journal", "#"], ["Research", "#"], ["Partners", "#"], ["Guide", "#"]]],
          ["CONTACT", [["hello@cheese.ac", "#"], ["Privacy", "#"], ["Terms", "#"], ["Sitemap", "#"]]]].
          map(([h, items], i) =>
          <div key={i}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: ".26em", color: "var(--cream)" }}>{h}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map(([label, href], j) =>
              <li key={j}><a href={href} style={{ color: "rgba(253,253,245,.75)", fontSize: 13, textDecoration: "none" }}>{label}</a></li>
              )}
              </ul>
            </div>
          )}
        </div>
        <div style={{ paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: ".2em", color: "rgba(253,253,245,.4)" }}>© 2026 CHEESE ACADEMY TOKYO · ALL RIGHTS RESERVED</div>
          <div className="serif" style={{ fontStyle: "italic", fontSize: 14, color: "var(--cream)" }}>terroir · science · craft</div>
        </div>
      </div>
    </footer>);

}

// ============================================================
// App
// ============================================================
function App() {
  const { values, setValue } = window.useTweaks(TWEAK_DEFAULTS);

  return (
    <>
      <Nav />
      <Hero headline={values.heroHeadline} sub={values.heroSub} />
      {values.showMarquee && <Marquee />}
      <Market />
      <Pillars />
      <Segments />
      <AIDashboard />
      <Journal />
      <Manifesto />
      <Footer />

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection title="Hero">
          <window.TweakText label="Headline" value={values.heroHeadline} onChange={(v) => setValue("heroHeadline", v)} />
          <window.TweakText label="Subheading" value={values.heroSub} onChange={(v) => setValue("heroSub", v)} multiline />
        </window.TweakSection>
        <window.TweakSection title="Display">
          <window.TweakToggle label="Show marquee band" value={values.showMarquee} onChange={(v) => setValue("showMarquee", v)} />
        </window.TweakSection>
      </window.TweaksPanel>
    </>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);