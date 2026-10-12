import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Heart, Menu, Search, ShoppingBag, Sparkles, X } from "lucide-react";

type Find = {
  name: string;
  creator: string;
  category: string;
  categoryKey: string;
  price: number;
  note: string;
  colors: [string, string, string];
  shape: number;
};

const finds: Find[] = [
  { name: "Pixel Garden Creator Kit", creator: "Nia Studio", category: "Digital packs", categoryKey: "digital", price: 18, note: "42 little tools for big ideas", colors: ["#d7f146", "#efacd4", "#393248"], shape: 0 },
  { name: "Afterglow No. 04 Riso Print", creator: "Ari Sol", category: "Art & prints", categoryKey: "art", price: 38, note: "Signed, numbered · edition of 120", colors: ["#f2c5dc", "#e2ef79", "#262631"], shape: 1 },
  { name: "Cloud Keeper Vinyl Figure", creator: "Momo Works", category: "Collectible figures", categoryKey: "figure", price: 58, note: "A pocket-sized daydream guardian", colors: ["#c6b5ff", "#ff9ac5", "#27243b"], shape: 2 },
  { name: "Shape Language Typeface", creator: "Form Dept.", category: "Digital packs", categoryKey: "digital", price: 26, note: "Four weights, one unmistakable voice", colors: ["#b7e9dc", "#e8e672", "#30564f"], shape: 3 },
  { name: "Moon Market Poster", creator: "Kei Okada", category: "Art & prints", categoryKey: "art", price: 29, note: "A familiar kind of far away", colors: ["#bfe5ff", "#7778df", "#272749"], shape: 4 },
  { name: "Everywhere Studio Tee", creator: "Nia Studio", category: "Creator goods", categoryKey: "merch", price: 38, note: "For wherever ideas happen", colors: ["#ffbb78", "#f3d8c4", "#593d77"], shape: 5 },
];

const categories = [
  { key: "all", name: "Everything", count: "18" },
  { key: "digital", name: "Digital packs", count: "04" },
  { key: "art", name: "Art & prints", count: "04" },
  { key: "figure", name: "Collectible figures", count: "04" },
  { key: "merch", name: "Creator goods", count: "04" },
];

function Artwork({ item, className = "" }: { item: Find; className?: string }) {
  const [a, b, c] = item.colors;
  return (
    <div className={`atlas-art atlas-art-${item.shape} ${className}`} style={{ "--art-a": a, "--art-b": b, "--art-c": c } as CSSProperties}>
      <svg viewBox="0 0 600 600" role="img" aria-label={`${item.name} artwork`} className="atlas-artwork">
        <defs>
          <pattern id={`grain-${item.shape}`} width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r=".65" fill={c} opacity=".22" />
          </pattern>
        </defs>
        {item.shape % 3 === 0 ? (
          <>
            <circle cx="397" cy="213" r="163" fill={b} />
            <circle cx="260" cy="325" r="151" fill={a} />
            <path d="M118 514 344 129l230 385Z" fill={c} />
            <path d="M161 504 347 191l185 313Z" fill={a} opacity=".55" />
          </>
        ) : item.shape % 3 === 1 ? (
          <>
            <rect x="203" y="65" width="237" height="465" rx="116" fill={b} transform="rotate(19 321 298)" />
            <circle cx="249" cy="257" r="139" fill={a} />
            <path d="M68 438Q280 180 520 403" fill="none" stroke={c} strokeWidth="39" />
            <circle cx="420" cy="155" r="44" fill={c} />
          </>
        ) : (
          <>
            <path d="m301 70 225 229-225 230L74 299Z" fill={a} />
            <circle cx="301" cy="299" r="130" fill={b} />
            <path d="M166 436 436 162" stroke={c} strokeWidth="34" />
            <circle cx="300" cy="300" r="51" fill={a} />
          </>
        )}
        <rect width="600" height="600" fill={`url(#grain-${item.shape})`} />
        <text x="36" y="557" fill={c} fontSize="13" letterSpacing="4" fontFamily="monospace">ARTYVERSE / FIND {String(item.shape + 1).padStart(2, "0")}</text>
      </svg>
      <span className="atlas-art-stamp"><Sparkles size={13} strokeWidth={1.8} /> MAKER PICK</span>
    </div>
  );
}

function AtlasMark() {
  return <span className="atlas-mark" aria-hidden="true"><span>A</span><i /></span>;
}

export function ArtyverseAtlas() {
  const [category, setCategory] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [bag, setBag] = useState(0);
  const [notice, setNotice] = useState("");
  const [mobileNav, setMobileNav] = useState(false);

  const filteredFinds = useMemo(() => finds.filter((item) => {
    const matchesCategory = category === "all" || item.categoryKey === category;
    const term = search.trim().toLowerCase();
    const matchesSearch = !term || `${item.name} ${item.creator} ${item.category}`.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  }), [category, search]);

  const toggleSaved = (name: string) => {
    const alreadySaved = saved.includes(name);
    setSaved((current) => alreadySaved ? current.filter((item) => item !== name) : [...current, name]);
    setNotice(alreadySaved ? "Removed from your saved finds" : "Saved for later");
    window.setTimeout(() => setNotice(""), 2100);
  };
  const addToBag = () => {
    setBag((count) => count + 1);
    setNotice("Added to your bag");
    window.setTimeout(() => setNotice(""), 2100);
  };

  const feature = finds[0];
  const listFinds = filteredFinds.filter((item) => item.name !== feature.name);

  return (
    <div className="atlas-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .atlas-page{--paper:#f8f7f1;--ink:#19191f;--muted:#77757a;--line:#e5e2d9;--lime:#b6ec29;--pink:#e62d9d;--display:'Space Grotesk',sans-serif;--body:'DM Sans',sans-serif;background:var(--paper);color:var(--ink);font-family:var(--body);min-height:100vh;overflow:hidden}
        .atlas-page *{box-sizing:border-box}
        .atlas-page button,.atlas-page a,.atlas-page input{font:inherit;-webkit-tap-highlight-color:transparent}
        .atlas-page button{cursor:pointer;color:inherit}
        .atlas-topline{height:31px;background:#1b1b20;color:#f7f5ed;display:flex;align-items:center;justify-content:center;gap:9px;font-size:9px;letter-spacing:.17em;text-transform:uppercase}
        .atlas-topline svg{color:var(--lime)}
        .atlas-header{height:76px;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;padding:0 clamp(20px,5vw,78px);gap:22px}
        .atlas-brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:inherit}
        .atlas-wordmark{font:700 21px/1 var(--display);letter-spacing:-1.6px}
        .atlas-mark{position:relative;width:31px;height:31px;border-radius:9px;background:linear-gradient(135deg,#b8ee2d 18%,#e9ec73 57%,#ed3ba8);display:grid;place-items:center;font:700 20px/1 var(--display);overflow:hidden}
        .atlas-mark i{position:absolute;width:10px;height:10px;border-radius:50%;background:#ee37a3;right:2px;bottom:2px;mix-blend-mode:multiply}
        .atlas-header-right{display:flex;align-items:center;gap:28px}
        .atlas-header-link{border:0;background:none;text-decoration:none;color:#56545a;font-size:11px;font-weight:700}
        .atlas-header-link:hover{color:var(--pink)}
        .atlas-actions{display:flex;align-items:center;gap:5px}
        .atlas-icon-button{height:38px;min-width:38px;display:grid;place-items:center;background:transparent;border:0;border-radius:50%;position:relative}
        .atlas-icon-button:hover{background:#eeece5}
        .atlas-bag-count{position:absolute;top:0;right:-1px;min-width:16px;height:16px;border-radius:99px;background:var(--lime);font-size:9px;font-weight:800;display:grid;place-items:center;padding:0 3px}
        .atlas-searchbar{padding:12px clamp(20px,5vw,78px);border-bottom:1px solid var(--line);display:flex;gap:8px}
        .atlas-searchbar input{border:1px solid var(--line);border-radius:12px;background:#fff;padding:12px 16px;flex:1;outline:none}
        .atlas-searchbar input:focus{border-color:#a0bd37}
        .atlas-search-submit{border:0;border-radius:12px;background:var(--lime);font-size:12px;font-weight:800;padding:0 21px}
        .atlas-mobile-menu{display:none}
        .atlas-layout{max-width:1480px;margin:0 auto;padding:45px clamp(20px,5vw,78px) 65px;display:grid;grid-template-columns:210px minmax(0,1fr);gap:clamp(32px,5.5vw,86px)}
        .atlas-rail{padding-top:8px;align-self:stretch;display:flex;flex-direction:column}
        .atlas-rail-kicker{font-size:9px;letter-spacing:.17em;text-transform:uppercase;color:#a19d91;font-weight:700}
        .atlas-rail-heading{font:600 19px/1.12 var(--display);letter-spacing:-.7px;margin:11px 0 25px}
        .atlas-rail-nav{display:grid;gap:3px}
        .atlas-category{border:0;background:none;display:flex;justify-content:space-between;align-items:center;text-align:left;padding:11px 10px;border-radius:10px;color:#6f6c71;font-size:11px;transition:background .18s,color .18s}
        .atlas-category:hover{background:#efeee7;color:var(--ink)}
        .atlas-category.is-active{background:#e9f1d0;color:var(--ink);font-weight:800}
        .atlas-category-count{font:10px/1 var(--body);color:#9d9a91}
        .atlas-rail-rule{border-top:1px solid var(--line);margin:25px 0 19px}
        .atlas-rail-feature{background:#eeece3;border-radius:14px;padding:15px 14px 14px}
        .atlas-rail-feature-label{font-size:8px;text-transform:uppercase;letter-spacing:.15em;color:#827e73;font-weight:700}
        .atlas-rail-feature strong{display:block;font:600 16px/1.2 var(--display);letter-spacing:-.4px;margin:9px 0 6px}
        .atlas-rail-feature p{font-size:10px;line-height:1.65;color:#77736a;margin:0}
        .atlas-rail-feature button{display:flex;align-items:center;gap:7px;background:none;border:0;padding:12px 0 0;font-size:10px;font-weight:800}
        .atlas-rail-note{margin-top:auto;padding-top:30px;color:#aaa69c;font-size:9px;line-height:1.6;letter-spacing:.04em}
        .atlas-content{min-width:0}
        .atlas-breadcrumb{font-size:9px;letter-spacing:.17em;text-transform:uppercase;color:#8a8781;font-weight:700}
        .atlas-breadcrumb b{color:var(--pink);font-weight:800;margin:0 7px}
        .atlas-hero{margin-top:22px;display:grid;grid-template-columns:minmax(255px,.85fr) minmax(340px,1.15fr);gap:30px;min-height:355px;align-items:center}
        .atlas-hero-copy{padding:12px 0 20px;position:relative;z-index:1}
        .atlas-eyebrow{display:flex;align-items:center;gap:9px;font-size:9px;letter-spacing:.16em;text-transform:uppercase;font-weight:800;color:#746f68}
        .atlas-eyebrow::before{content:"";width:23px;height:1px;background:var(--pink)}
        .atlas-hero h1{font:600 clamp(43px,5.2vw,73px)/.98 var(--display);letter-spacing:-.075em;margin:21px 0 17px;max-width:420px}
        .atlas-hero h1 em{font-style:normal;color:var(--pink)}
        .atlas-hero-copy>p{font-size:12px;line-height:1.75;color:#77747b;max-width:315px;margin:0}
        .atlas-hero-cta{margin-top:24px;display:inline-flex;align-items:center;gap:17px;border:0;border-radius:999px;background:var(--lime);padding:12px 15px 12px 19px;font-size:10px;font-weight:800;transition:transform .2s}
        .atlas-hero-cta:hover{transform:translateY(-2px)}
        .atlas-hero-cta span{width:25px;height:25px;border-radius:50%;display:grid;place-items:center;background:#1c1c20;color:white}
        .atlas-hero-index{margin-top:28px;display:flex;align-items:center;gap:11px;font-size:9px;color:#9a968d}
        .atlas-hero-index i{width:38px;height:1px;background:#d4d0c5}
        .atlas-hero-index b{font-weight:700;color:#29282d}
        .atlas-spotlight{min-height:352px;border-radius:20px;background:#e8efc7;overflow:hidden;position:relative;display:grid;grid-template-columns:1fr 1fr;align-items:center;padding:20px 26px 20px 28px}
        .atlas-spotlight::before{content:"";position:absolute;width:330px;height:330px;border:1px solid rgba(40,45,29,.12);border-radius:50%;right:2%;top:2%;box-shadow:0 0 0 30px rgba(255,255,255,.08),0 0 0 62px rgba(255,255,255,.08)}
        .atlas-spot-copy{position:relative;z-index:2;align-self:end;padding:0 0 11px}
        .atlas-spot-label{font-size:8px;text-transform:uppercase;letter-spacing:.16em;color:#686d4e;font-weight:800}
        .atlas-spot-copy h2{font:600 clamp(21px,2.5vw,32px)/1.05 var(--display);letter-spacing:-1.2px;max-width:215px;margin:10px 0 7px}
        .atlas-spot-copy p{font-size:10px;color:#737562;margin:0}
        .atlas-spot-price{display:flex;align-items:center;gap:9px;margin-top:13px;font-size:12px;font-weight:800}
        .atlas-spot-price del{font-size:9px;font-weight:500;color:#929582}
        .atlas-spot-action{margin-top:14px;border:0;background:#202027;color:#fff!important;border-radius:999px;padding:9px 12px;display:inline-flex;gap:7px;align-items:center;font-size:9px;font-weight:700}
        .atlas-spot-art{position:absolute!important;width:min(70%,380px);height:auto;right:-2%;top:0;bottom:0;display:flex;align-items:center;justify-content:center;transform:rotate(5deg)}
        .atlas-spot-art svg{width:100%;max-height:335px;filter:drop-shadow(0 20px 24px rgba(32,35,24,.12))}
        .atlas-art{position:relative;overflow:hidden;background:#eeece3;isolation:isolate}
        .atlas-artwork{width:100%;height:100%;display:block}
        .atlas-art-stamp{position:absolute;top:15px;left:15px;border-radius:99px;background:rgba(248,247,241,.9);display:flex;align-items:center;gap:6px;padding:7px 10px;font-size:7px;letter-spacing:.12em;font-weight:800}
        .atlas-section-top{margin-top:57px;padding-top:21px;border-top:1px solid var(--line);display:flex;align-items:end;justify-content:space-between;gap:20px}
        .atlas-section-kicker{font-size:8px;letter-spacing:.17em;text-transform:uppercase;color:var(--pink);font-weight:800}
        .atlas-section-title{font:600 26px/1 var(--display);letter-spacing:-1.3px;margin:8px 0 0}
        .atlas-section-sub{margin:8px 0 0;color:#85817a;font-size:10px}
        .atlas-view-all{border:0;background:none;display:flex;align-items:center;gap:7px;font-size:10px;font-weight:800;padding:8px 0}
        .atlas-view-all:hover{color:var(--pink)}
        .atlas-discovery{margin-top:19px;display:grid;grid-template-columns:minmax(255px,1.06fr) minmax(270px,.94fr);gap:13px;align-items:stretch}
        .atlas-feature-card{min-height:315px;display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--line);border-radius:16px;overflow:hidden;background:#fff}
        .atlas-feature-card>.atlas-art{min-height:315px}
        .atlas-feature-info{display:flex;flex-direction:column;justify-content:flex-end;padding:21px 18px}
        .atlas-product-kicker{color:#8c8880;text-transform:uppercase;font-size:8px;letter-spacing:.12em;font-weight:700}
        .atlas-feature-info h3{font:600 20px/1.07 var(--display);letter-spacing:-.8px;margin:9px 0 7px}
        .atlas-feature-info p{font-size:10px;line-height:1.5;color:#8c8880;margin:0}
        .atlas-rating{margin-top:12px;display:flex;gap:6px;align-items:center;font-size:9px}
        .atlas-stars{color:#d99f32;letter-spacing:1px}
        .atlas-feature-bottom{display:flex;justify-content:space-between;align-items:center;margin-top:13px}
        .atlas-feature-bottom strong{font-size:13px}
        .atlas-round-action{width:32px;height:32px;border-radius:50%;border:1px solid var(--line);background:#fff;display:grid;place-items:center}
        .atlas-round-action:hover{border-color:#b8e930;background:#f4f8e6}
        .atlas-feature-actions{display:flex;align-items:center;gap:7px}
        .atlas-quick-add{border:0;background:#1d1d23;color:#fff!important;border-radius:99px;padding:9px 12px;font-size:9px;font-weight:700}
        .atlas-quick-add:hover{background:#39393d}
        .atlas-list{border-top:1px solid var(--line)}
        .atlas-list-row{min-height:78px;border-bottom:1px solid var(--line);display:grid;grid-template-columns:57px 1fr auto;align-items:center;gap:13px;padding:9px 0}
        .atlas-mini-art{height:57px;width:57px;border-radius:10px}
        .atlas-mini-art .atlas-art-stamp{display:none}
        .atlas-row-copy{min-width:0}
        .atlas-row-copy .atlas-product-kicker{font-size:7px}
        .atlas-row-copy h3{font:600 13px/1.18 var(--display);letter-spacing:-.25px;margin:5px 0 3px}
        .atlas-row-copy p{font-size:9px;color:#918d85;margin:0}
        .atlas-row-end{display:flex;align-items:center;gap:9px}
        .atlas-row-end strong{font-size:11px}
        .atlas-row-heart{height:28px;width:28px;border-radius:50%;border:0;background:transparent;display:grid;place-items:center;color:#8a8781}
        .atlas-row-heart:hover,.atlas-row-heart.is-saved{color:var(--pink)}
        .atlas-empty{padding:34px 20px;text-align:center;color:#77747b;font-size:11px;grid-column:1/-1}
        .atlas-empty button{border:0;background:var(--lime);border-radius:99px;padding:8px 12px;font-size:10px;font-weight:800;margin-top:10px}
        .atlas-maker-band{margin-top:62px;border-radius:18px;overflow:hidden;background:#202027;color:white;display:grid;grid-template-columns:1.15fr .85fr;min-height:242px}
        .atlas-maker-copy{padding:35px 38px;display:flex;flex-direction:column;justify-content:center}
        .atlas-maker-copy .atlas-section-kicker{color:#c7f34e}
        .atlas-maker-copy h2{font:600 clamp(28px,3.5vw,42px)/1.01 var(--display);letter-spacing:-1.8px;margin:13px 0 11px;max-width:400px}
        .atlas-maker-copy p{font-size:11px;line-height:1.7;color:#c2c0c3;max-width:390px;margin:0}
        .atlas-maker-copy button{align-self:flex-start;border:0;background:var(--lime);border-radius:999px;display:flex;align-items:center;gap:9px;margin-top:20px;padding:10px 14px;font-size:10px;font-weight:800}
        .atlas-maker-art{position:relative;overflow:hidden;background:linear-gradient(120deg,#b5e82b 1%,#d0df6c 47%,#e92f9c 100%)}
        .atlas-maker-art::before,.atlas-maker-art::after{content:"";position:absolute;border:1px solid rgba(30,30,29,.28);border-radius:50%;width:270px;height:270px;left:18%;top:-18%;transform:rotate(24deg)}
        .atlas-maker-art::after{width:220px;height:220px;left:34%;top:14%;transform:rotate(-35deg)}
        .atlas-maker-orb{position:absolute;width:135px;height:135px;border-radius:50%;background:#ed2fa0;mix-blend-mode:multiply;left:43%;top:30%}
        .atlas-maker-word{position:absolute;left:24px;top:21px;font:700 17px/1 var(--display);letter-spacing:-1px;color:#242329}
        .atlas-maker-word small{display:block;margin-top:6px;font:500 7px/1 var(--body);letter-spacing:.18em}
        .atlas-maker-index{position:absolute;right:23px;bottom:13px;font:700 56px/.9 var(--display);letter-spacing:-7px;color:rgba(25,25,31,.85)}
        .atlas-values{margin-top:30px;border-top:1px solid var(--line);display:grid;grid-template-columns:repeat(3,1fr)}
        .atlas-value{padding:19px 17px 10px 0;display:grid;grid-template-columns:25px 1fr;gap:10px}
        .atlas-value+.atlas-value{border-left:1px solid var(--line);padding-left:18px}
        .atlas-value-index{font:11px/1.3 var(--display);color:var(--pink)}
        .atlas-value h3{font:600 12px/1.2 var(--display);margin:0}
        .atlas-value p{font-size:9px;line-height:1.55;color:#88847e;margin:6px 0 0;max-width:215px}
        .atlas-footer{border-top:1px solid var(--line);margin-top:24px;padding-top:18px;display:flex;justify-content:space-between;gap:15px;color:#89857e;font-size:9px}
        .atlas-footer strong{color:var(--ink);font:700 10px var(--display);letter-spacing:-.4px}
        .atlas-toast{position:fixed;z-index:30;bottom:22px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:8px;padding:11px 16px;border-radius:999px;background:#202027;color:#fff;font-size:11px;box-shadow:0 10px 35px rgba(20,20,20,.16);animation:atlasToast .25s ease-out}
        @keyframes atlasToast{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}
        @media(max-width:950px){
          .atlas-layout{grid-template-columns:170px minmax(0,1fr);gap:26px;padding-inline:28px}
          .atlas-header{padding-inline:28px}
          .atlas-header-right{gap:17px}
          .atlas-hero{grid-template-columns:minmax(200px,.8fr) minmax(300px,1.2fr);gap:19px}
          .atlas-spotlight{padding-inline:19px}
          .atlas-feature-card{grid-template-columns:.85fr 1fr}
          .atlas-feature-info{padding:15px 13px}
          .atlas-feature-info h3{font-size:17px}
        }
        @media(max-width:700px){
          .atlas-topline{height:28px;font-size:8px}
          .atlas-header{height:65px;padding-inline:16px}
          .atlas-mobile-menu{display:grid}
          .atlas-header-right{gap:0}
          .atlas-header-link{display:none}
          .atlas-wordmark{font-size:19px}
          .atlas-layout{display:block;padding:24px 16px 42px}
          .atlas-rail{display:none}
          .atlas-rail.atlas-open{display:flex;position:absolute;z-index:10;top:93px;left:0;right:0;padding:18px 17px 20px;background:var(--paper);border-bottom:1px solid var(--line);box-shadow:0 16px 20px rgba(35,33,25,.07)}
          .atlas-rail-heading{margin-bottom:13px}
          .atlas-rail-nav{grid-template-columns:repeat(2,1fr)}
          .atlas-rail-rule,.atlas-rail-feature,.atlas-rail-note{display:none}
          .atlas-hero{margin-top:18px;grid-template-columns:1fr;gap:20px}
          .atlas-hero-copy{padding:7px 0 0}
          .atlas-hero h1{font-size:52px;max-width:360px;margin:17px 0 12px}
          .atlas-hero-copy>p{font-size:11px}
          .atlas-hero-index{margin-top:18px}
          .atlas-spotlight{min-height:310px}
          .atlas-spot-art{width:68%;right:-5%}
          .atlas-spot-art svg{max-height:285px}
          .atlas-section-top{margin-top:40px}
          .atlas-section-title{font-size:23px}
          .atlas-view-all{font-size:9px}
          .atlas-discovery{grid-template-columns:1fr}
          .atlas-feature-card{grid-template-columns:1fr 1fr;min-height:275px}
          .atlas-feature-card>.atlas-art{min-height:275px}
          .atlas-maker-band{margin-top:43px;grid-template-columns:1fr}
          .atlas-maker-copy{padding:28px 24px}
          .atlas-maker-copy h2{font-size:34px}
          .atlas-maker-art{min-height:200px}
          .atlas-maker-orb{width:115px;height:115px}
          .atlas-values{grid-template-columns:1fr}
          .atlas-value{padding:15px 0}
          .atlas-value+.atlas-value{border-left:0;border-top:1px solid var(--line);padding-left:0}
          .atlas-value p{max-width:none}
          .atlas-footer{flex-direction:column}
          .atlas-searchbar{padding-inline:15px}
        }
        @media(max-width:380px){
          .atlas-hero h1{font-size:45px}
          .atlas-spotlight{min-height:280px;padding:15px}
          .atlas-spot-art{width:73%;right:-12%}
          .atlas-spot-copy h2{font-size:22px}
          .atlas-feature-card{grid-template-columns:.9fr 1fr}
          .atlas-feature-info h3{font-size:16px}
          .atlas-feature-actions{gap:4px}
          .atlas-quick-add{padding-inline:8px}
        }
      `}</style>
      <div className="atlas-topline">A good day to find something different <Sparkles size={12} /></div>
      <header className="atlas-header">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button className="atlas-icon-button atlas-mobile-menu" aria-label={mobileNav ? "Close categories" : "Open categories"} onClick={() => setMobileNav((open) => !open)}>
            {mobileNav ? <X size={19} /> : <Menu size={19} />}
          </button>
          <a className="atlas-brand" href="#top" aria-label="Artyverse home" onClick={() => { setCategory("all"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <AtlasMark /><span className="atlas-wordmark">ARTYVERSE</span>
          </a>
        </div>
        <div className="atlas-header-right">
          <button className="atlas-header-link" onClick={() => { setCategory("all"); document.getElementById("discover")?.scrollIntoView({ behavior: "smooth" }); }}>Just dropped</button>
          <button className="atlas-header-link" onClick={() => document.getElementById("makers")?.scrollIntoView({ behavior: "smooth" })}>Meet the makers</button>
          <div className="atlas-actions">
            <button className="atlas-icon-button" aria-label={searchOpen ? "Close search" : "Search products"} onClick={() => setSearchOpen((open) => !open)}>{searchOpen ? <X size={18} /> : <Search size={18} />}</button>
            <button className="atlas-icon-button" aria-label="Saved finds" onClick={() => { setNotice(saved.length ? `${saved.length} find${saved.length === 1 ? "" : "s"} saved` : "Your saved list is ready for a little inspiration"); window.setTimeout(() => setNotice(""), 2100); }}>
              <Heart size={18} />{saved.length > 0 && <span className="atlas-bag-count">{saved.length}</span>}
            </button>
            <button className="atlas-icon-button" aria-label="Shopping bag" onClick={() => { setNotice(bag ? `${bag} item${bag === 1 ? "" : "s"} in your bag` : "Your bag is waiting for a good find"); window.setTimeout(() => setNotice(""), 2100); }}>
              <ShoppingBag size={18} />{bag > 0 && <span className="atlas-bag-count">{bag}</span>}
            </button>
          </div>
        </div>
      </header>
      {searchOpen && <form className="atlas-searchbar" onSubmit={(event) => { event.preventDefault(); document.getElementById("discover")?.scrollIntoView({ behavior: "smooth" }); }}>
        <input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search creators, prints, little treasures…" aria-label="Search marketplace" />
        {search && <button type="button" aria-label="Clear search" className="atlas-icon-button" onClick={() => setSearch("")}><X size={16} /></button>}
        <button className="atlas-search-submit">Search finds</button>
      </form>}
      <main className="atlas-layout" id="top">
        <aside className={`atlas-rail ${mobileNav ? "atlas-open" : ""}`}>
          <span className="atlas-rail-kicker">The collection</span>
          <h2 className="atlas-rail-heading">Find your kind<br />of thing.</h2>
          <nav className="atlas-rail-nav" aria-label="Marketplace categories">
            {categories.map((item) => <button key={item.key} className={`atlas-category ${category === item.key ? "is-active" : ""}`} onClick={() => { setCategory(item.key); setMobileNav(false); }}>
              <span>{item.name}</span><span className="atlas-category-count">{item.count}</span>
            </button>)}
          </nav>
          <div className="atlas-rail-rule" />
          <div className="atlas-rail-feature">
            <span className="atlas-rail-feature-label">Curated by people</span>
            <strong>Not an algorithm.<br />A point of view.</strong>
            <p>Small-batch finds from the minds that made them.</p>
            <button onClick={() => document.getElementById("makers")?.scrollIntoView({ behavior: "smooth" })}>How we pick <ArrowUpRight size={13} /></button>
          </div>
          <p className="atlas-rail-note">18 makers making things<br />worth keeping close.</p>
        </aside>
        <div className="atlas-content">
          <div className="atlas-breadcrumb">ARTYVERSE <b>/</b> THE MARKETPLACE</div>
          <section className="atlas-hero">
            <div className="atlas-hero-copy">
              <div className="atlas-eyebrow">A field guide to good finds</div>
              <h1>A universe<br />of <em>good</em><br />finds.</h1>
              <p>Made to remix, frame, collect, and keep. A curious little marketplace with a real person behind every find.</p>
              <button className="atlas-hero-cta" onClick={() => document.getElementById("discover")?.scrollIntoView({ behavior: "smooth" })}>
                Wander through <span><ArrowDownRight size={15} /></span>
              </button>
              <div className="atlas-hero-index"><b>01</b><i /> A different kind of marketplace</div>
            </div>
            <div className="atlas-spotlight">
              <div className="atlas-spot-copy">
                <span className="atlas-spot-label">Fresh from Nia Studio</span>
                <h2>Pixel Garden<br />Creator Kit</h2>
                <p>42 tools to build a brighter little world.</p>
                <div className="atlas-spot-price">$18.00 <del>$24.00</del></div>
                <button className="atlas-spot-action" onClick={addToBag}>Add to bag <ArrowRight size={13} /></button>
              </div>
              <Artwork item={feature} className="atlas-spot-art" />
            </div>
          </section>
          <section id="discover">
            <div className="atlas-section-top">
              <div>
                <div className="atlas-section-kicker">Worth a closer look</div>
                <h2 className="atlas-section-title">{category === "all" ? "Fresh from the universe" : categories.find((item) => item.key === category)?.name}</h2>
                <p className="atlas-section-sub">{search ? `A few good things matching “${search}”.` : "A small edit of things made with feeling."}</p>
              </div>
              <button className="atlas-view-all" onClick={() => { setCategory("all"); setSearch(""); }}>See all finds <ArrowUpRight size={14} /></button>
            </div>
            <div className="atlas-discovery">
              {listFinds.length > 0 ? <>
                <article className="atlas-feature-card">
                  <Artwork item={listFinds[0]} />
                  <div className="atlas-feature-info">
                    <span className="atlas-product-kicker">{listFinds[0].creator} · {listFinds[0].category}</span>
                    <h3>{listFinds[0].name}</h3>
                    <p>{listFinds[0].note}</p>
                    <div className="atlas-rating"><span className="atlas-stars">★★★★★</span><span>4.9 · loved by collectors</span></div>
                    <div className="atlas-feature-bottom">
                      <strong>${listFinds[0].price.toFixed(2)}</strong>
                      <div className="atlas-feature-actions">
                        <button className={`atlas-round-action ${saved.includes(listFinds[0].name) ? "is-saved" : ""}`} aria-label="Save featured find" onClick={() => toggleSaved(listFinds[0].name)}>
                          <Heart size={15} fill={saved.includes(listFinds[0].name) ? "currentColor" : "none"} />
                        </button>
                        <button className="atlas-quick-add" onClick={addToBag}>Add to bag</button>
                      </div>
                    </div>
                  </div>
                </article>
                <div className="atlas-list">
                  {listFinds.slice(1).map((item) => <article className="atlas-list-row" key={item.name}>
                    <Artwork item={item} className="atlas-mini-art" />
                    <div className="atlas-row-copy">
                      <span className="atlas-product-kicker">{item.creator} · {item.category}</span>
                      <h3>{item.name}</h3>
                      <p>{item.note}</p>
                    </div>
                    <div className="atlas-row-end">
                      <strong>${item.price.toFixed(2)}</strong>
                      <button className={`atlas-row-heart ${saved.includes(item.name) ? "is-saved" : ""}`} aria-label={`Save ${item.name}`} onClick={() => toggleSaved(item.name)}>
                        <Heart size={15} fill={saved.includes(item.name) ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </article>)}
                </div>
              </> : <div className="atlas-empty">No finds in this little corner yet.<br /><button onClick={() => { setCategory("all"); setSearch(""); }}>Bring me back to everything</button></div>}
            </div>
          </section>
          <section className="atlas-maker-band" id="makers">
            <div className="atlas-maker-copy">
              <div className="atlas-section-kicker">Independent by nature</div>
              <h2>The best things come from making.</h2>
              <p>Meet the artists, designers, and collectors shaping this place. Every drop has a person and a point of view behind it.</p>
              <button onClick={() => { setCategory("all"); document.getElementById("discover")?.scrollIntoView({ behavior: "smooth" }); }}>Meet the makers <ArrowUpRight size={14} /></button>
            </div>
            <div className="atlas-maker-art" aria-hidden="true">
              <div className="atlas-maker-word">ARTYVERSE<small>COLLECT WITHOUT LIMITS</small></div>
              <div className="atlas-maker-orb" />
              <div className="atlas-maker-index">A<span style={{ color: "#ed319e" }}>✳</span></div>
            </div>
          </section>
          <section className="atlas-values" aria-label="Marketplace promises">
            <article className="atlas-value"><span className="atlas-value-index">01</span><div><h3>A trusted place to collect</h3><p>Thoughtful makers, clear details, and room to find your next favorite.</p></div></article>
            <article className="atlas-value"><span className="atlas-value-index">02</span><div><h3>Digital, delivered instantly</h3><p>Creative tools and downloadable art, straight to your inbox.</p></div></article>
            <article className="atlas-value"><span className="atlas-value-index">03</span><div><h3>Made by real people</h3><p>Every shop is creator-led. Your find keeps independent ideas moving.</p></div></article>
          </section>
          <footer className="atlas-footer"><strong>ARTYVERSE <span style={{ color: "var(--pink)" }}>✳</span></strong><span>Curiosity looks good on you. Keep wandering.</span><span>Collect without limits · 2025</span></footer>
        </div>
      </main>
      {notice && <div className="atlas-toast" role="status"><Check size={14} color="#b6ec29" />{notice}</div>}
    </div>
  );
}
