import { useState, useRef } from "react";

/* ─── EDITOR PASSWORD ────────────────────────────────────────────── */
const EDITOR_PASSWORD = "papelis2025";

/* ─── ALL NOTEBOOKS (merged from both chats) ─────────────────────── */
const ALL_NOTEBOOKS = [
  // ── FROM REFERENCE CHAT (editorial / your aesthetic) ──
  {
    id: "slow-living", collection: "slow", type: "NOTES",
    name: "Slow Living",
    cover: "#F5F0E8", textColor: "#1a1a1a", accentColor: "#C8A882",
    style: "serif-mixed",
    lines: ["slow", "living", "journal"],
    sub: "a breath choice",
    quote: "Slow down enough\nto notice\neverything.",
    price: "AED 130",
  },
  {
    id: "peace-mind", collection: "slow", type: "NOTES",
    name: "Peace of Mind",
    cover: "#FFFFFF", textColor: "#1a1a1a", accentColor: "#1a1a1a",
    style: "handwritten",
    lines: ["peace", "of mind", "is the new", "luxury"],
    quote: "Peace of mind\nis the new\nluxury.",
    price: "AED 130",
  },
  {
    id: "make-happen", collection: "power", type: "TO DO",
    name: "Make It Happen",
    cover: "#111111", textColor: "#FFFFFF", accentColor: "#FFFFFF",
    style: "bold-editorial",
    lines: ["make it", "happen"],
    sub: "new habit",
    quote: "Action is\nthe antidote\nto anxiety.",
    price: "AED 120",
  },
  {
    id: "daily-ritual", collection: "slow", type: "TO DO",
    name: "Daily Ritual",
    cover: "#1C1C1C", textColor: "#F5F0E8", accentColor: "#C8A882",
    style: "serif-spaced",
    lines: ["D A I L Y", "RITUAL"],
    sub: "your intentions matter",
    quote: "Discipline is\nchoosing what\nyou want most.",
    price: "AED 120",
  },
  {
    id: "progress", collection: "flow", type: "DREAM BIG",
    name: "Progress",
    cover: "#8BA8BF", textColor: "#FAF7F2", accentColor: "#FAF7F2",
    style: "editorial-overlap",
    lines: ["PROGRESS", "over", "PERFECTION"],
    quote: "Progress over\nperfection.\nAlways.",
    price: "AED 145",
  },
  {
    id: "love-letters", collection: "slow", type: "NOTES",
    name: "Love Letters",
    cover: "#FAF7F2", textColor: "#2C1A0E", accentColor: "#C8A882",
    style: "serif-mixed",
    lines: ["love", "letters", "to yourself"],
    sub: "so be",
    quote: "Write love letters\nto the life\nyou are building.",
    price: "AED 130",
  },
  // ── FROM POWER EDIT (black/red/white) ──
  {
    id: "power-notes", collection: "power", type: "NOTES",
    name: "Power Notes",
    cover: "#0D0D0D", textColor: "#C8102E", accentColor: "#C8102E",
    style: "bold-editorial",
    lines: ["NOTES"],
    sub: "personal diary",
    quote: "Write it down.\nMake it real.",
    price: "AED 130",
  },
  {
    id: "noir-todo", collection: "power", type: "TO DO",
    name: "Noir To Do",
    cover: "#FFFFFF", textColor: "#C8102E", accentColor: "#0D0D0D",
    style: "bold-editorial",
    lines: ["TO DO"],
    sub: "make it happen",
    quote: "One task.\nFull focus.\nDone.",
    price: "AED 120",
  },
  {
    id: "dream-bold", collection: "power", type: "DREAM BIG",
    name: "Dream Bold",
    cover: "#C8102E", textColor: "#FFFFFF", accentColor: "#FFFFFF",
    style: "bold-editorial",
    lines: ["DREAM", "BIG."],
    quote: "Fortune\nfavours\nthe bold.",
    price: "AED 145",
  },
  // ── NYC EDIT ──
  {
    id: "nyc-notes", collection: "nyc", type: "NOTES",
    name: "NYC Notes",
    cover: "#1C1C1C", textColor: "#FFD700", accentColor: "#FFD700",
    style: "bold-editorial",
    lines: ["THE CITY", "NEVER", "SLEEPS."],
    sub: "new york edit",
    quote: "The city never\nsleeps.\nNeither do your\ndreams.",
    price: "AED 130",
  },
  {
    id: "nyc-dream", collection: "nyc", type: "DREAM BIG",
    name: "If You Can Dream It",
    cover: "#0D0D1A", textColor: "#FF6B35", accentColor: "#FF6B35",
    style: "bold-editorial",
    lines: ["IF YOU CAN", "DREAM IT", "HERE—"],
    quote: "If you can\ndream it here,\nyou can do it\nanywhere.",
    price: "AED 145",
  },
  // ── MINIMAL EDIT ──
  {
    id: "less-more", collection: "minimal", type: "NOTES",
    name: "Less. More.",
    cover: "#FAF8F4", textColor: "#2B2B2B", accentColor: "#2B2B2B",
    style: "serif-spaced",
    lines: ["Less.", "More."],
    quote: "Less noise.\nMore clarity.\nWrite it here.",
    price: "AED 130",
  },
  {
    id: "write-down", collection: "minimal", type: "DREAM BIG",
    name: "Write It Down",
    cover: "#2B2B2B", textColor: "#FAF8F4", accentColor: "#FAF8F4",
    style: "bold-editorial",
    lines: ["Write it", "down."],
    quote: "Write it down.\nWatch it\nbecome real.",
    price: "AED 145",
  },
  // ── JOY EDIT ──
  {
    id: "joy-today", collection: "joy", type: "NOTES",
    name: "Today Is Good",
    cover: "#FFE234", textColor: "#1a1a1a", accentColor: "#1a1a1a",
    style: "bold-editorial",
    lines: ["TODAY IS", "A GOOD", "DAY."],
    quote: "Today is\na good day\nto start.",
    price: "AED 130",
  },
  {
    id: "joy-sky", collection: "joy", type: "DREAM BIG",
    name: "Sky Is Not The Limit",
    cover: "#4A90D9", textColor: "#FFE234", accentColor: "#FFE234",
    style: "bold-editorial",
    lines: ["SKY IS", "NOT THE", "LIMIT."],
    quote: "Sky is not\nthe limit.\nYou are.",
    price: "AED 145",
  },
];

const COLLECTIONS = [
  { id: "all",     label: "All" },
  { id: "slow",    label: "Slow Edit" },
  { id: "power",   label: "Power Edit" },
  { id: "nyc",     label: "NYC Edit" },
  { id: "minimal", label: "Minimal Edit" },
  { id: "joy",     label: "Joy Edit" },
];

const TYPES = ["All", "NOTES", "TO DO", "DREAM BIG"];

/* ─── NOTEBOOK SVG ───────────────────────────────────────────────── */
function NotebookSVG({ nb, W = 150, H = 210 }) {
  const isLight = ["#FFFFFF","#FAF7F2","#F5F0E8","#FAF8F4","#8BA8BF","#FFE234","#4ECDC4","#F5F5F5","#FAFAFA"].includes(nb.cover);
  const rim = isLight ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.05)";

  const txt = (x, y, content, size, opts = {}) => (
    <text x={x} y={y} fontFamily={opts.font || "Georgia,'Times New Roman',serif"}
      fontSize={size} fill={opts.color || nb.textColor}
      fontWeight={opts.weight || "normal"} fontStyle={opts.style || "normal"}
      letterSpacing={opts.ls || 0} opacity={opts.op || 1} textAnchor={opts.anchor || "start"}>
      {content}
    </text>
  );

  const lines = nb.lines || [];

  const renderStyle = () => {
    switch (nb.style) {
      case "serif-mixed":
        return (<g>
          {nb.sub && txt(W*0.1, H*0.12, nb.sub.toUpperCase(), 6, {font:"'Helvetica Neue',Arial,sans-serif", color:nb.accentColor, op:0.5, ls:2})}
          {lines[0] && txt(W*0.1, H*0.42, lines[0], Math.min(W*0.18, 26), {style:"italic", op:0.92})}
          {lines[1] && txt(W*0.1, H*0.56, lines[1], Math.min(W*0.18, 26), {style:"italic", op:0.92})}
          {lines[2] && txt(W*0.1, H*0.68, lines[2], 11, {color:nb.textColor, op:0.45, ls:1})}
          <line x1={W*0.1} y1={H*0.75} x2={W*0.62} y2={H*0.75} stroke={nb.accentColor} strokeWidth={0.5} opacity={0.35}/>
        </g>);
      case "handwritten":
        return (<g fontFamily="'Courier New',monospace">
          {lines.map((l,i) => txt(W*0.1, H*(0.32 + i*0.16), l, 15, {font:"'Courier New',monospace", op:0.88}))}
        </g>);
      case "bold-editorial":
        return (<g>
          {nb.sub && txt(W*0.1, H*0.12, nb.sub.toUpperCase(), 6, {font:"'Helvetica Neue',Arial,sans-serif", color:nb.textColor, op:0.3, ls:2})}
          {lines[0] && txt(W*0.08, lines.length===1 ? H*0.55 : H*0.44, lines[0], Math.min(W*0.24, 34), {style:"italic", weight:"bold", op:0.95})}
          {lines[1] && txt(W*0.08, H*0.62, lines[1], Math.min(W*0.24, 34), {style:"italic", weight:"bold", op:0.95})}
          {lines[2] && txt(W*0.08, H*0.78, lines[2], Math.min(W*0.24, 34), {style:"italic", weight:"bold", op:0.95})}
        </g>);
      case "serif-spaced":
        return (<g>
          {lines[0] && txt(W*0.5, H*0.4, lines[0], 12, {font:"'Helvetica Neue',Arial,sans-serif", ls:5, anchor:"middle", op:0.88})}
          {lines[1] && txt(W*0.5, H*0.54, lines[1], 20, {weight:"bold", anchor:"middle", op:0.95})}
          {nb.sub && txt(W*0.5, H*0.68, nb.sub, 8, {style:"italic", color:nb.accentColor, op:0.55, anchor:"middle"})}
          <line x1={W*0.25} y1={H*0.6} x2={W*0.75} y2={H*0.6} stroke={nb.accentColor} strokeWidth={0.4} opacity={0.25}/>
        </g>);
      case "editorial-overlap":
        return (<g>
          {lines[0] && txt(W*0.5, H*0.36, lines[0], 19, {weight:"bold", anchor:"middle", ls:0.5, op:0.95})}
          {lines[1] && txt(W*0.5, H*0.52, lines[1], 24, {style:"italic", anchor:"middle", op:0.7})}
          {lines[2] && txt(W*0.5, H*0.66, lines[2], 15, {weight:"bold", anchor:"middle", ls:0.3, op:0.95})}
        </g>);
      default: return null;
    }
  };

  return (
    <svg width={W+6} height={H} viewBox={`0 0 ${W+6} ${H}`}
      style={{ display:"block", filter:"drop-shadow(2px 5px 14px rgba(0,0,0,0.18))" }}>
      <rect x={4} y={4} width={W} height={H-4} rx={3} fill="rgba(0,0,0,0.12)"/>
      <rect x={0} y={0} width={W} height={H-4} rx={3} fill={nb.cover}/>
      <rect x={0} y={0} width={W} height={H-4} rx={3} fill="none" stroke={rim} strokeWidth={1.2}/>
      <rect x={0} y={0} width={2.5} height={H-4} rx={1} fill={isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.04)"}/>
      {renderStyle()}
      <text x={W-8} y={H-14} fontFamily="'Helvetica Neue',Arial,sans-serif"
        fontSize={5.5} fill={nb.textColor} opacity={0.18} textAnchor="end" letterSpacing={1.5}>PAPELIS</text>
      {[1,2,3].map(i=><line key={i} x1={W+i*1.2} y1={3} x2={W+i*1.2} y2={H-7} stroke="#ccc" strokeWidth={0.4}/>)}
    </svg>
  );
}

/* ─── SITE SECTIONS (editable) ───────────────────────────────────── */
const DEFAULT_SECTIONS = [
  { id:"hero",    visible:true,  label:"Hero Banner" },
  { id:"tagline", visible:true,  label:"Tagline Strip" },
  { id:"filter",  visible:true,  label:"Collection Filter" },
  { id:"shop",    visible:true,  label:"Product Grid" },
  { id:"utp",     visible:true,  label:"Why Papelis" },
  { id:"footer",  visible:true,  label:"Footer" },
];

const DEFAULT_HERO = {
  headline1: "Slow down.",
  headline2: "Write it. Own it.",
  sub: "Premium notebooks for women who grow with intention.",
  bg: "#FFFFFF",
  textColor: "#1a1a1a",
};

const DEFAULT_TAGLINE = {
  text: "FREE WORLDWIDE DELIVERY · PRINT-TO-ORDER · NO STOCK · NO WASTE",
  bg: "#F5F0E8",
  textColor: "#C8A882",
};

/* ─── MAIN APP ───────────────────────────────────────────────────── */
export default function Papelis() {
  const [mode, setMode]           = useState("site"); // "site" | "editor" | "login"
  const [password, setPassword]   = useState("");
  const [pwError, setPwError]     = useState(false);
  const [sections, setSections]   = useState(DEFAULT_SECTIONS);
  const [hero, setHero]           = useState(DEFAULT_HERO);
  const [tagline, setTagline]     = useState(DEFAULT_TAGLINE);
  const [colFilter, setColFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selected, setSelected]   = useState(null);
  const [editingNb, setEditingNb] = useState(null); // notebook being moved/edited

  const visible = (id) => sections.find(s => s.id === id)?.visible;
  const toggleSection = (id) => setSections(prev =>
    prev.map(s => s.id === id ? { ...s, visible: !s.visible } : s));

  const filtered = ALL_NOTEBOOKS.filter(nb => {
    const matchCol  = colFilter === "all" || nb.collection === colFilter;
    const matchType = typeFilter === "All" || nb.type === typeFilter;
    return matchCol && matchType;
  });

  const handleLogin = () => {
    if (password === EDITOR_PASSWORD) { setMode("editor"); setPwError(false); }
    else setPwError(true);
  };

  /* ── SITE VIEW ── */
  const SiteView = () => (
    <div style={{ background:"#FFFFFF", minHeight:"100vh" }}>

      {/* NAV */}
      <nav style={{
        position:"sticky", top:0, zIndex:50,
        background:"rgba(255,255,255,0.95)", backdropFilter:"blur(12px)",
        borderBottom:"1px solid #EEEEE9",
      }}>
        {visible("tagline") && (
          <div style={{ background: tagline.bg, padding:"7px 0", textAlign:"center" }}>
            <span style={{ fontSize:9, letterSpacing:"0.22em", color: tagline.textColor }}>
              {tagline.text}
            </span>
          </div>
        )}
        <div style={{ padding:"0 32px", display:"flex", alignItems:"center", justifyContent:"space-between", height:52 }}>
          <div style={{ display:"flex", gap:24 }}>
            {["Shop","Collections","Custom"].map(n => (
              <span key={n} style={{ fontSize:10, letterSpacing:"0.12em", color:"#888", cursor:"pointer", textTransform:"uppercase" }}>{n}</span>
            ))}
          </div>
          <span style={{ fontSize:16, fontWeight:700, letterSpacing:"0.22em", color:"#1a1a1a" }}>PAPELIS</span>
          <div style={{ display:"flex", gap:20 }}>
            <span style={{ fontSize:10, letterSpacing:"0.12em", color:"#888", cursor:"pointer" }}>SEARCH</span>
            <span style={{ fontSize:10, letterSpacing:"0.12em", color:"#1a1a1a", cursor:"pointer", fontWeight:600 }}>CART (0)</span>
          </div>
        </div>
      </nav>

      {/* HERO */}
      {visible("hero") && (
        <div style={{ background: hero.bg, padding:"72px 32px 60px", textAlign:"center", borderBottom:"1px solid #F0EFE9" }}>
          <p style={{ fontSize:10, letterSpacing:"0.3em", color:"#C8A882", marginBottom:16, textTransform:"uppercase" }}>
            Dubai · New York · Shanghai
          </p>
          <h1 style={{
            fontFamily:"Georgia,'Times New Roman',serif",
            fontSize:"clamp(32px,6vw,64px)",
            fontWeight:400, fontStyle:"italic",
            color: hero.textColor, lineHeight:1.1,
            marginBottom:16, letterSpacing:"-0.02em",
          }}>
            {hero.headline1}<br/>{hero.headline2}
          </h1>
          <p style={{ fontSize:13, color:"#888", maxWidth:400, margin:"0 auto 28px", lineHeight:1.7 }}>
            {hero.sub}
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button style={{ padding:"12px 32px", background:"#1a1a1a", color:"white", border:"none", fontSize:10, letterSpacing:"0.15em", cursor:"pointer" }}>
              SHOP NOW
            </button>
            <button style={{ padding:"12px 32px", background:"white", color:"#1a1a1a", border:"1px solid #1a1a1a", fontSize:10, letterSpacing:"0.15em", cursor:"pointer" }}>
              BUILD YOURS
            </button>
          </div>
          <p style={{ fontSize:9, color:"#ccc", marginTop:16, letterSpacing:"0.15em" }}>
            PRINT-TO-ORDER · NO STOCK · NO WASTE · 100% INTENTIONAL
          </p>
        </div>
      )}

      {/* FILTER */}
      {visible("filter") && (
        <div style={{ padding:"28px 32px 0", borderBottom:"1px solid #F0EFE9" }}>
          <div style={{ display:"flex", gap:0, overflowX:"auto", marginBottom:16 }}>
            {COLLECTIONS.map(c => (
              <button key={c.id} onClick={() => setColFilter(c.id)} style={{
                padding:"10px 18px", border:"none", background:"none", cursor:"pointer",
                fontSize:10, letterSpacing:"0.12em", whiteSpace:"nowrap",
                color: colFilter === c.id ? "#1a1a1a" : "#aaa",
                borderBottom: colFilter === c.id ? "2px solid #1a1a1a" : "2px solid transparent",
                fontWeight: colFilter === c.id ? 700 : 400,
              }}>{c.label}</button>
            ))}
          </div>
          <div style={{ display:"flex", gap:8, paddingBottom:16, flexWrap:"wrap" }}>
            {TYPES.map(t => (
              <button key={t} onClick={() => setTypeFilter(t)} style={{
                padding:"5px 14px", border:"1px solid", cursor:"pointer",
                fontSize:9, letterSpacing:"0.1em",
                borderColor: typeFilter === t ? "#1a1a1a" : "#E0E0E0",
                background: typeFilter === t ? "#1a1a1a" : "white",
                color: typeFilter === t ? "white" : "#888",
                borderRadius:40,
              }}>{t}</button>
            ))}
          </div>
        </div>
      )}

      {/* SHOP GRID */}
      {visible("shop") && (
        <div style={{ padding:"36px 32px 60px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:32 }}>
            {filtered.map(nb => (
              <div key={nb.id} onClick={() => setSelected(nb)}
                style={{ cursor:"pointer" }}>
                <div style={{
                  background:"#F7F6F3", display:"flex", justifyContent:"center",
                  alignItems:"flex-end", padding:"24px 16px 16px", marginBottom:12,
                  transition:"transform 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.transform="translateY(-4px)"}
                  onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}
                >
                  <NotebookSVG nb={nb} W={110} H={155} />
                </div>
                <div style={{ fontSize:11, fontWeight:700, color:"#1a1a1a", marginBottom:2 }}>{nb.name}</div>
                <div style={{ fontSize:10, color:"#aaa", marginBottom:5 }}>{nb.type}</div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:12, color:"#1a1a1a", fontWeight:600 }}>{nb.price}</span>
                  <span style={{ fontSize:9, color:"#C8A882", letterSpacing:"0.1em", cursor:"pointer", borderBottom:"1px solid #C8A882" }}>ADD +</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WHY PAPELIS */}
      {visible("utp") && (
        <div style={{ padding:"60px 32px", borderTop:"1px solid #F0EFE9", background:"#FAFAF8" }}>
          <p style={{ fontSize:9, letterSpacing:"0.25em", color:"#C8A882", marginBottom:12, textTransform:"uppercase" }}>Why Papelis</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:24 }}>
            {[
              ["No dates", "No structure imposed. Your notebook, your rhythm."],
              ["Premium paper", "100 gsm. Every pen glides. Every word counts."],
              ["Print-to-order", "Made for you. Not sitting in a warehouse."],
              ["Zero waste", "We print what you order. Nothing more."],
            ].map(([t, d]) => (
              <div key={t}>
                <div style={{ fontSize:12, fontWeight:700, color:"#1a1a1a", marginBottom:6 }}>{t}</div>
                <div style={{ fontSize:12, color:"#888", lineHeight:1.6 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FOOTER */}
      {visible("footer") && (
        <div style={{ padding:"24px 32px", borderTop:"1px solid #F0EFE9", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <span style={{ fontSize:13, letterSpacing:"0.2em", fontWeight:700, color:"#1a1a1a" }}>PAPELIS</span>
          <span style={{ fontSize:9, color:"#bbb", letterSpacing:"0.1em" }}>PRINT-TO-ORDER · UAE · WORLDWIDE SHIPPING</span>
          <span style={{ fontSize:9, color:"#ddd" }}>Crafted intentionally. Never overproduced.</span>
        </div>
      )}

      {/* PRODUCT MODAL */}
      {selected && (
        <div onClick={() => setSelected(null)}
          style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background:"white", maxWidth:600, width:"100%", padding:"32px", display:"flex", gap:32, flexWrap:"wrap", maxHeight:"90vh", overflowY:"auto" }}>
            <div style={{ flexShrink:0 }}>
              <NotebookSVG nb={selected} W={150} H={210} />
            </div>
            <div style={{ flex:1, minWidth:200 }}>
              <p style={{ fontSize:9, letterSpacing:"0.2em", color:"#C8A882", marginBottom:8 }}>{selected.type}</p>
              <h2 style={{ fontSize:22, fontWeight:700, color:"#1a1a1a", marginBottom:12 }}>{selected.name}</h2>
              <div style={{ borderLeft:"2px solid #E8E5DF", paddingLeft:14, marginBottom:20 }}>
                {selected.quote.split("\n").map((l,i) => (
                  <p key={i} style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:15, color:"#1a1a1a", lineHeight:1.5 }}>{l}</p>
                ))}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20, fontSize:11 }}>
                {[["Format","B5 Hardcover"],["Paper","100 gsm"],["Binding","Thread/PUR/Spiral"],["Dates","None"]].map(([l,v2])=>(
                  <div key={l}>
                    <p style={{ fontSize:8, color:"#bbb", letterSpacing:"0.15em", marginBottom:2 }}>{l.toUpperCase()}</p>
                    <p style={{ fontWeight:600, color:"#1a1a1a" }}>{v2}</p>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                <span style={{ fontSize:20, fontWeight:700 }}>{selected.price}</span>
                <button style={{ padding:"10px 24px", background:"#1a1a1a", color:"white", border:"none", fontSize:10, letterSpacing:"0.15em", cursor:"pointer" }}>
                  ADD TO CART
                </button>
              </div>
              <p style={{ fontSize:10, color:"#aaa", marginTop:10 }}>Delivery 7–14 days worldwide</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  /* ── EDITOR VIEW ── */
  const EditorView = () => (
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:"'Helvetica Neue',Arial,sans-serif" }}>

      {/* SIDEBAR */}
      <div style={{
        width:280, background:"#111", color:"white",
        padding:"24px 0", display:"flex", flexDirection:"column",
        position:"sticky", top:0, height:"100vh", overflowY:"auto",
        flexShrink:0,
      }}>
        <div style={{ padding:"0 20px 20px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontSize:10, letterSpacing:"0.2em", color:"rgba(255,255,255,0.35)", marginBottom:4 }}>EDITOR MODE</p>
          <p style={{ fontSize:14, fontWeight:700, color:"white" }}>PAPELIS Studio</p>
        </div>

        {/* SECTIONS */}
        <div style={{ padding:"16px 20px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontSize:9, letterSpacing:"0.2em", color:"rgba(255,255,255,0.3)", marginBottom:12 }}>SECTIONS (toggle visibility)</p>
          {sections.map(s => (
            <div key={s.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
              <span style={{ fontSize:12, color: s.visible ? "white" : "rgba(255,255,255,0.3)" }}>{s.label}</span>
              <button onClick={() => toggleSection(s.id)} style={{
                width:36, height:20, borderRadius:10, border:"none", cursor:"pointer",
                background: s.visible ? "#C8A882" : "rgba(255,255,255,0.15)",
                position:"relative", transition:"background 0.2s",
              }}>
                <span style={{
                  position:"absolute", top:3, width:14, height:14, borderRadius:"50%",
                  background:"white", transition:"left 0.2s",
                  left: s.visible ? 19 : 3,
                }}/>
              </button>
            </div>
          ))}
        </div>

        {/* HERO EDITOR */}
        <div style={{ padding:"16px 20px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontSize:9, letterSpacing:"0.2em", color:"rgba(255,255,255,0.3)", marginBottom:12 }}>HERO SECTION</p>
          {[
            { label:"Headline 1", key:"headline1" },
            { label:"Headline 2", key:"headline2" },
            { label:"Subtitle",   key:"sub" },
          ].map(({ label, key }) => (
            <div key={key} style={{ marginBottom:10 }}>
              <p style={{ fontSize:9, color:"rgba(255,255,255,0.4)", marginBottom:4 }}>{label}</p>
              <input value={hero[key]} onChange={e => setHero(h => ({ ...h, [key]: e.target.value }))}
                style={{ width:"100%", background:"rgba(255,255,255,0.08)", border:"none", padding:"7px 10px", color:"white", fontSize:11, borderRadius:3, outline:"none" }}/>
            </div>
          ))}
          <p style={{ fontSize:9, color:"rgba(255,255,255,0.4)", marginBottom:4 }}>Hero background color</p>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {["#FFFFFF","#F5F0E8","#1a1a1a","#FAF7F2","#F7F6F3"].map(c => (
              <button key={c} onClick={() => setHero(h => ({ ...h, bg: c, textColor: c === "#1a1a1a" ? "#FFFFFF" : "#1a1a1a" }))}
                style={{ width:24, height:24, borderRadius:"50%", background:c, border: hero.bg === c ? "2px solid #C8A882" : "1px solid rgba(255,255,255,0.2)", cursor:"pointer" }}/>
            ))}
          </div>
        </div>

        {/* TAGLINE EDITOR */}
        <div style={{ padding:"16px 20px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontSize:9, letterSpacing:"0.2em", color:"rgba(255,255,255,0.3)", marginBottom:12 }}>TAGLINE STRIP</p>
          <textarea value={tagline.text} onChange={e => setTagline(t => ({ ...t, text: e.target.value }))}
            rows={2} style={{ width:"100%", background:"rgba(255,255,255,0.08)", border:"none", padding:"7px 10px", color:"white", fontSize:11, borderRadius:3, outline:"none", resize:"vertical" }}/>
          <p style={{ fontSize:9, color:"rgba(255,255,255,0.4)", marginBottom:4, marginTop:8 }}>Strip background</p>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {["#F5F0E8","#1a1a1a","#FFFFFF","#C8A882","#FAF7F2"].map(c => (
              <button key={c} onClick={() => setTagline(t => ({ ...t, bg: c, textColor: c === "#1a1a1a" ? "#C8A882" : "#C8A882" }))}
                style={{ width:24, height:24, borderRadius:"50%", background:c, border: tagline.bg === c ? "2px solid #C8A882" : "1px solid rgba(255,255,255,0.2)", cursor:"pointer" }}/>
            ))}
          </div>
        </div>

        {/* EXIT */}
        <div style={{ padding:"16px 20px", marginTop:"auto" }}>
          <button onClick={() => setMode("site")} style={{
            width:"100%", padding:"10px", background:"rgba(255,255,255,0.08)",
            color:"white", border:"1px solid rgba(255,255,255,0.12)",
            fontSize:10, letterSpacing:"0.15em", cursor:"pointer",
          }}>
            PREVIEW SITE
          </button>
          <button onClick={() => { setMode("site"); setPassword(""); }} style={{
            width:"100%", padding:"10px", marginTop:8, background:"none",
            color:"rgba(255,255,255,0.3)", border:"none", fontSize:10, cursor:"pointer",
          }}>
            Exit Editor
          </button>
        </div>
      </div>

      {/* PREVIEW PANEL */}
      <div style={{ flex:1, background:"#F0EDE8", overflowY:"auto" }}>
        <div style={{ padding:"20px", background:"rgba(0,0,0,0.05)", borderBottom:"1px solid rgba(0,0,0,0.08)", display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:10, height:10, borderRadius:"50%", background:"#FF5F57" }}/>
          <div style={{ width:10, height:10, borderRadius:"50%", background:"#FFBD2E" }}/>
          <div style={{ width:10, height:10, borderRadius:"50%", background:"#28CA41" }}/>
          <span style={{ fontSize:10, color:"#888", marginLeft:8 }}>Live Preview — papelis.co</span>
        </div>
        <div style={{ transform:"scale(0.82)", transformOrigin:"top center", minHeight:800 }}>
          <SiteView />
        </div>
      </div>
    </div>
  );

  /* ── LOGIN VIEW ── */
  const LoginView = () => (
    <div style={{
      minHeight:"100vh", background:"#FAFAF7", display:"flex",
      alignItems:"center", justifyContent:"center",
      fontFamily:"'Helvetica Neue',Arial,sans-serif",
    }}>
      <div style={{ width:320, textAlign:"center" }}>
        <p style={{ fontSize:10, letterSpacing:"0.3em", color:"#C8A882", marginBottom:8 }}>PAPELIS</p>
        <h2 style={{ fontSize:20, fontWeight:700, color:"#1a1a1a", marginBottom:24 }}>Studio Access</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          style={{
            width:"100%", padding:"12px 16px", border:"1px solid #E0E0E0",
            fontSize:13, outline:"none", marginBottom:12, borderRadius:3,
            color:"#1a1a1a", background:"white",
          }}
        />
        {pwError && <p style={{ fontSize:11, color:"#C8102E", marginBottom:10 }}>Incorrect password</p>}
        <button onClick={handleLogin} style={{
          width:"100%", padding:"12px", background:"#1a1a1a", color:"white",
          border:"none", fontSize:11, letterSpacing:"0.15em", cursor:"pointer",
        }}>
          ENTER
        </button>
        <button onClick={() => setMode("site")} style={{
          marginTop:12, background:"none", border:"none", fontSize:11,
          color:"#aaa", cursor:"pointer",
        }}>
          Back to site
        </button>
      </div>
    </div>
  );

  /* ── SECRET EDITOR TRIGGER ── */
  // Triple-click on PAPELIS logo opens editor login
  const logoClicks = useRef(0);
  const logoTimer  = useRef(null);
  const handleLogoClick = () => {
    logoClicks.current += 1;
    clearTimeout(logoTimer.current);
    logoTimer.current = setTimeout(() => { logoClicks.current = 0; }, 600);
    if (logoClicks.current >= 3) {
      logoClicks.current = 0;
      setMode("login");
    }
  };

  if (mode === "login")  return <LoginView />;
  if (mode === "editor") return <EditorView />;

  return (
    <div onClick={(e) => {
      // Intercept triple-clicks on PAPELIS text anywhere
    }}>
      <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:1000 }}>
        {/* Hidden trigger — triple-click bottom-right corner */}
        <div
          onClick={handleLogoClick}
          style={{ position:"fixed", bottom:0, right:0, width:40, height:40, zIndex:9999, cursor:"default" }}
          title=""
        />
      </div>
      <SiteView />
    </div>
  );
}
