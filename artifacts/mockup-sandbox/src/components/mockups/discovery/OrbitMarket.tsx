import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Bookmark, Check, Compass, Heart, Menu, Search, ShoppingBag, Sparkles, X } from "lucide-react";

type Intent = "Everything" | "Make something" | "Hang it up" | "Collect a tiny thing" | "Wear the idea";
type ShelfItem = {
  id: number;
  name: string;
  maker: string;
  kind: string;
  price: number;
  tag: string;
  intent: Intent[];
  art: string;
  ink: string;
  motif: string;
};

const items: ShelfItem[] = [
  { id: 1, name: "Afterglow No. 04", maker: "Ari Sol", kind: "Art & prints", price: 38, tag: "Only 18 left", intent: ["Hang it up"], art: "#f2acd0", ink: "#432545", motif: "circle" },
  { id: 2, name: "Pixel Garden Kit", maker: "Nia Studio", kind: "Digital packs", price: 18, tag: "New arrival", intent: ["Make something"], art: "#d9f56c", ink: "#293727", motif: "garden" },
  { id: 3, name: "Cloud Keeper", maker: "Momo Works", kind: "Collectible figures", price: 58, tag: "Small-batch drop", intent: ["Collect a tiny thing"], art: "#b9b2f1", ink: "#332c64", motif: "cloud" },
  { id: 4, name: "Everywhere Studio Tee", maker: "Nia Studio", kind: "Creator goods", price: 38, tag: "Maker favorite", intent: ["Wear the idea"], art: "#f6c69b", ink: "#553c32", motif: "shirt" },
  { id: 5, name: "Soft Signal Presets", maker: "June Park", kind: "Digital packs", price: 14, tag: "Bestseller", intent: ["Make something"], art: "#ffbe75", ink: "#543c5d", motif: "signal" },
  { id: 6, name: "Moon Market Poster", maker: "Kei Okada", kind: "Art & prints", price: 29, tag: "New arrival", intent: ["Hang it up"], art: "#a6d5d5", ink: "#183c51", motif: "moon" },
  { id: 7, name: "Sprout Buddy", maker: "Tiny Orbit", kind: "Collectible figures", price: 24, tag: "Mystery edition", intent: ["Collect a tiny thing"], art: "#b6e4c1", ink: "#31534a", motif: "sprout" },
  { id: 8, name: "Momo Doodle Tote", maker: "Momo Works", kind: "Creator goods", price: 26, tag: "Made in small runs", intent: ["Wear the idea"], art: "#f6d963", ink: "#433b32", motif: "tote" },
];

function cover(item: ShelfItem) {
  let object = "";
  if (item.motif === "circle") object = `<circle cx="356" cy="312" r="184" fill="#f8d876"/><circle cx="345" cy="325" r="111" fill="${item.art}"/><path d="M110 550 365 180l235 370Z" fill="${item.ink}"/><path d="M0 465 Q260 390 720 490" fill="none" stroke="#ee5a9a" stroke-width="35"/>`;
  if (item.motif === "garden") object = `<path d="M360 540V254M360 367Q231 333 202 218q139-16 158 118M360 430q132-36 169-157-140-11-169 135" fill="none" stroke="${item.ink}" stroke-width="24" stroke-linecap="round"/><circle cx="360" cy="250" r="52" fill="#ee83bb"/><circle cx="227" cy="219" r="37" fill="#f29d69"/><circle cx="529" cy="270" r="42" fill="#b8a0fa"/><path d="M190 543Q358 508 535 543" fill="none" stroke="${item.ink}" stroke-width="9"/>`;
  if (item.motif === "cloud") object = `<path d="M209 401c-67-8-91-104-29-147 10-79 117-103 161-42 61-17 113 41 89 98 56 61 1 143-69 129H209Z" fill="#f7e9d4" stroke="${item.ink}" stroke-width="14"/><circle cx="313" cy="383" r="8" fill="${item.ink}"/><circle cx="384" cy="383" r="8" fill="${item.ink}"/><path d="M329 414q20 18 39 0" fill="none" stroke="${item.ink}" stroke-width="8" stroke-linecap="round"/><path d="M177 494q178 77 358 0" fill="none" stroke="#fa7bb5" stroke-width="14"/>`;
  if (item.motif === "shirt") object = `<path d="m238 228 87-48h86l87 48 72 74-70 66-42-42v210H278V326l-42 42-70-66Z" fill="#f9e8d1" stroke="${item.ink}" stroke-width="13" stroke-linejoin="round"/><path d="M337 183q31 75 64 0" fill="none" stroke="${item.ink}" stroke-width="10"/><path d="m352 317 19-23 18 23-18 25Z" fill="#ee4da5"/>`;
  if (item.motif === "signal") object = `<rect x="185" y="182" width="350" height="346" rx="34" fill="#f8e5d2" transform="rotate(-7 360 355)"/><path d="M203 412q60-155 120 0t120 0 120 0" fill="none" stroke="${item.ink}" stroke-width="27" stroke-linecap="round"/><circle cx="282" cy="276" r="27" fill="#f08bb4"/><circle cx="438" cy="254" r="16" fill="#91c9bb"/>`;
  if (item.motif === "moon") object = `<circle cx="365" cy="320" r="166" fill="#f6ca81"/><circle cx="425" cy="272" r="163" fill="${item.art}"/><circle cx="311" cy="335" r="11" fill="${item.ink}"/><circle cx="393" cy="365" r="8" fill="${item.ink}"/><path d="M90 480q95-60 174 0t160 0 177 0" fill="none" stroke="${item.ink}" stroke-width="18"/><path d="M127 525h469" stroke="#f4f0df" stroke-width="15"/>`;
  if (item.motif === "sprout") object = `<path d="M361 490V305" stroke="${item.ink}" stroke-width="22" stroke-linecap="round"/><path d="M352 363Q214 347 225 228q124 0 138 102M365 405q132-23 147-146-124-13-151 113" fill="#f5e9c7" stroke="${item.ink}" stroke-width="12"/><circle cx="355" cy="516" r="83" fill="#f08aa9"/><circle cx="329" cy="502" r="7" fill="${item.ink}"/><circle cx="380" cy="502" r="7" fill="${item.ink}"/><path d="M338 530q17 15 34 0" fill="none" stroke="${item.ink}" stroke-width="6"/>`;
  if (item.motif === "tote") object = `<path d="M238 265h252l30 284H208Z" fill="#f7ead4" stroke="${item.ink}" stroke-width="14" stroke-linejoin="round"/><path d="M292 272v-57q0-77 72-77t72 77v57" fill="none" stroke="${item.ink}" stroke-width="13"/><circle cx="305" cy="387" r="38" fill="#ee8bb3"/><path d="M362 347 409 393l-47 46-47-46Z" fill="#b0dcaa"/><circle cx="430" cy="460" r="21" fill="#f2c45f"/>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 720"><rect width="720" height="720" fill="${item.art}"/><circle cx="87" cy="115" r="146" fill="#fff7e6" opacity=".35"/><circle cx="670" cy="653" r="205" fill="${item.ink}" opacity=".08"/><path d="M0 607q195-61 366 3t354-5v115H0Z" fill="#fff9e9" opacity=".38"/>${object}<text x="40" y="670" fill="${item.ink}" font-family="sans-serif" font-weight="700" font-size="18" letter-spacing="3">ARTYVERSE   /   OBJECT ${String(item.id).padStart(2, "0")}</text></svg>`)}`;
}

const intents: Intent[] = ["Everything", "Make something", "Hang it up", "Collect a tiny thing", "Wear the idea"];
const categoryByIntent: Partial<Record<Intent, string>> = {
  "Make something": "Digital packs",
  "Hang it up": "Art & prints",
  "Collect a tiny thing": "Collectible figures",
  "Wear the idea": "Creator goods",
};

export function OrbitMarket() {
  const [intent, setIntent] = useState<Intent>("Everything");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All finds");
  const [saved, setSaved] = useState<number[]>([]);
  const [bag, setBag] = useState<number[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");

  const shelf = useMemo(() => items.filter((item) => {
    const matchesIntent = intent === "Everything" || item.intent.includes(intent);
    const matchesSearch = `${item.name} ${item.maker} ${item.kind}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "All finds" || (filter === "Fresh in" && item.tag.includes("New")) || (filter === "Limited" && (item.tag.includes("drop") || item.tag.includes("Only")));
    return matchesIntent && matchesSearch && matchesFilter;
  }), [intent, query, filter]);

  const announce = (text: string) => {
    setToast(text);
    window.setTimeout(() => setToast(""), 2100);
  };
  const toggleSaved = (item: ShelfItem) => {
    setSaved((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id]);
    announce(saved.includes(item.id) ? "Removed from your saved shelf" : "Tucked into your saved shelf");
  };
  const addToBag = (item: ShelfItem) => {
    setBag((current) => [...current, item.id]);
    announce(`${item.name} added to your bag`);
  };
  const featured = items[0];
  const bagTotal = bag.reduce((sum, id) => sum + (items.find((item) => item.id === id)?.price ?? 0), 0);

  return (
    <div className="orbit-market">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .orbit-market{--paper:#f8f6ef;--ink:#25232a;--muted:#87828a;--line:#e8e3d9;--pink:#db369c;--lime:#c7ed50;min-height:100dvh;background:var(--paper);color:var(--ink);font-family:'DM Sans',sans-serif;overflow:hidden}
        .orbit-market *{box-sizing:border-box}.orbit-market button,.orbit-market input{font:inherit}.orbit-market button{cursor:pointer}
        .orbit-market h1,.orbit-market h2,.orbit-market h3,.orbit-market strong{font-family:'Space Grotesk',sans-serif}
        .om-ribbon{height:30px;background:#222027;color:#f7f5eb;display:flex;justify-content:center;align-items:center;gap:9px;font-size:9px;letter-spacing:.17em;text-transform:uppercase}
        .om-header{height:80px;border-bottom:1px solid var(--line);display:flex;align-items:center;padding:0 max(28px,calc((100vw - 1500px)/2));gap:34px;background:rgba(248,246,239,.96)}
        .om-brand{display:flex;align-items:center;gap:10px;border:0;background:none;color:var(--ink);padding:0;white-space:nowrap}.om-mark{width:33px;height:33px;border-radius:10px;background:linear-gradient(135deg,#b9e93d 0 56%,#eb5dac 56%);display:grid;place-items:center;font:700 20px 'Space Grotesk',sans-serif}.om-brand-name{font:700 21px 'Space Grotesk',sans-serif;letter-spacing:-1.5px}
        .om-edition{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:#817c81;border-left:1px solid var(--line);padding-left:22px;white-space:nowrap}
        .om-head-links{display:flex;align-items:center;gap:23px;margin-left:auto}.om-head-links button{border:0;background:none;padding:8px 0;color:#65616a;font-size:12px;font-weight:600}.om-head-links button:hover,.om-head-links button.active{color:var(--pink)}
        .om-search{position:relative;width:min(230px,20vw)}.om-search svg{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:#8a858b}.om-search input{width:100%;height:39px;border:1px solid var(--line);border-radius:12px;background:#fffdf8;padding:0 13px 0 37px;outline:none;font-size:12px}.om-search input:focus{border-color:#aea89f;box-shadow:0 0 0 3px #eae3d0}
        .om-head-icon{position:relative;width:39px;height:39px;border:1px solid var(--line);background:#fffdf8;border-radius:12px;display:grid;place-items:center;color:var(--ink)}.om-count{position:absolute;right:-5px;top:-5px;min-width:17px;height:17px;padding:0 4px;display:grid;place-items:center;border-radius:10px;background:var(--lime);font-size:9px;font-weight:800}
        .om-layout{width:min(1500px,calc(100% - 64px));margin:auto;display:grid;grid-template-columns:188px minmax(0,1fr);gap:42px}
        .om-rail{padding:47px 0 40px;border-right:1px solid var(--line);min-height:calc(100vh - 110px);display:flex;flex-direction:column;align-items:stretch}.om-rail-label{font-size:9px;color:#a39da4;letter-spacing:.18em;text-transform:uppercase;font-weight:700;padding:0 13px 15px}.om-nav{display:grid;gap:5px}.om-nav button{border:0;background:none;min-height:40px;padding:0 12px;border-radius:10px;display:flex;align-items:center;gap:10px;text-align:left;color:#706c73;font-size:12px;font-weight:600}.om-nav button:hover{background:#f0ede4}.om-nav button.on{background:#ebe9df;color:#2b2930}.om-nav button.on:before{content:'';width:6px;height:6px;background:var(--pink);border-radius:50%;margin-left:-3px}.om-rail-note{margin-top:auto;background:#e8edcf;padding:16px;border-radius:14px;position:relative;overflow:hidden}.om-rail-note:after{content:'✳';position:absolute;right:-4px;top:-14px;font-size:80px;line-height:1;color:#d3e59a;transform:rotate(15deg)}.om-rail-note small{display:block;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:#73775c}.om-rail-note b{display:block;margin-top:8px;max-width:120px;font:600 16px/1.15 'Space Grotesk',sans-serif;position:relative;z-index:1}.om-rail-note button{border:0;background:none;padding:12px 0 0;color:#5d623c;font-size:10px;font-weight:700;position:relative;z-index:1}
        .om-main{min-width:0;padding:40px 0 74px}.om-intro{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;padding:0 0 27px}.om-kicker{display:flex;align-items:center;gap:8px;color:var(--pink);font-weight:700;text-transform:uppercase;letter-spacing:.15em;font-size:9px}.om-intro h1{font-size:clamp(36px,4vw,55px);letter-spacing:-.065em;line-height:.98;margin:14px 0 10px;max-width:680px}.om-intro p{color:#76717a;font-size:13px;margin:0;line-height:1.6}.om-issue{text-align:right;min-width:160px;color:#8a858b;font-size:10px;line-height:1.8}.om-issue b{display:block;color:#39363c;font:600 14px 'Space Grotesk',sans-serif}
        .om-journey{display:grid;grid-template-columns:220px minmax(0,1fr);gap:18px;align-items:center;background:#eeece3;border-radius:17px;padding:19px 22px;margin-bottom:28px}.om-question{font:600 15px/1.2 'Space Grotesk',sans-serif}.om-question span{display:block;margin-top:5px;color:#89848b;font:500 10px 'DM Sans',sans-serif}.om-intents{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none}.om-intents::-webkit-scrollbar{display:none}.om-intents button{white-space:nowrap;display:flex;align-items:center;gap:7px;height:39px;border:1px solid #ded9ce;background:#f8f6ef;border-radius:11px;padding:0 13px;color:#66616a;font-size:10px;font-weight:700;transition:background .18s,color .18s,transform .18s}.om-intents button:hover{transform:translateY(-1px)}.om-intents button.on{background:#27252b;color:white;border-color:#27252b}.om-intents button.on svg{color:var(--lime)}
        .om-feature{display:grid;grid-template-columns:1.02fr .98fr;background:#28262d;border-radius:19px;overflow:hidden;min-height:300px;color:white}.om-feature-art{position:relative;min-height:300px;overflow:hidden;background:#ecadd0}.om-feature-art img{width:100%;height:100%;position:absolute;inset:0;object-fit:cover}.om-art-stamp{position:absolute;top:17px;left:17px;color:#2b2530;background:#fff9ed;border-radius:99px;padding:8px 11px;font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase}.om-feature-content{padding:30px 34px;display:flex;flex-direction:column;align-items:flex-start;justify-content:center}.om-feature-content .om-kicker{color:#d5ef83}.om-feature-content h2{font-size:34px;letter-spacing:-.05em;line-height:1;margin:14px 0 8px}.om-feature-content .maker{color:#c7c0ca;font-size:11px}.om-feature-copy{max-width:380px;color:#cbc6ce;font-size:12px;line-height:1.65;margin:16px 0 22px}.om-feature-foot{width:100%;display:flex;align-items:center;justify-content:space-between;gap:10px}.om-feature-price{font:700 18px 'Space Grotesk',sans-serif}.om-feature-price small{display:block;color:#aaa4ad;font:400 9px 'DM Sans',sans-serif;margin-top:3px}.om-feature-actions{display:flex;gap:8px}.om-add{height:40px;border:0;border-radius:11px;padding:0 15px;background:var(--lime);color:#28262d;font-size:10px;font-weight:800;display:flex;align-items:center;gap:8px}.om-save{width:40px;height:40px;border:1px solid #5f5a63;border-radius:11px;background:transparent;color:white;display:grid;place-items:center}.om-save.active{color:#f28dc0;border-color:#f28dc0}
        .om-shelf-head{display:flex;align-items:flex-end;justify-content:space-between;gap:15px;margin:36px 0 16px}.om-shelf-title small{display:block;color:var(--pink);font-size:9px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;margin-bottom:6px}.om-shelf-title h2{margin:0;font-size:25px;letter-spacing:-.04em}.om-shelf-title p{margin:5px 0 0;color:#8b858d;font-size:11px}.om-controls{display:flex;align-items:center;gap:12px}.om-filters{display:flex;gap:4px;padding:4px;border:1px solid var(--line);border-radius:11px;background:#fcfaf4}.om-filters button{border:0;background:transparent;color:#77717a;border-radius:7px;padding:8px 11px;font-size:9px;font-weight:700}.om-filters button.on{background:#29272e;color:#fff}.om-view{display:flex;gap:2px}.om-view button{border:0;background:transparent;color:#969098;padding:6px}.om-view button.on{color:#28262d}
        .om-products{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:13px}.om-products.list{grid-template-columns:1fr;gap:8px}.om-product{position:relative;min-width:0;background:#fffdf7;border:1px solid #ece7dc;border-radius:15px;overflow:hidden;transition:transform .2s,border-color .2s}.om-product:hover{transform:translateY(-3px);border-color:#d5cfc1}.om-product-image{height:auto;aspect-ratio:1.17;position:relative;overflow:hidden;background:#eee}.om-product-image img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .45s}.om-product:hover .om-product-image img{transform:scale(1.035)}.om-tag{position:absolute;left:10px;top:10px;background:#fffaf0;border-radius:99px;padding:6px 9px;font-size:8px;font-weight:700;letter-spacing:.04em}.om-heart{position:absolute;right:9px;top:9px;width:30px;height:30px;border:0;border-radius:50%;background:rgba(255,252,244,.94);display:grid;place-items:center;color:#29272d}.om-heart.active{color:var(--pink)}.om-product-info{padding:12px 12px 13px}.om-meta{font-size:8px;color:#89838a;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.om-product-name{font:600 14px 'Space Grotesk',sans-serif;margin:5px 0 10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.om-product-bottom{display:flex;align-items:center;justify-content:space-between}.om-product-price{font:700 13px 'Space Grotesk',sans-serif}.om-quick{height:29px;padding:0 9px;border:1px solid #e6e0d5;border-radius:8px;background:#fffdf7;color:#4b474e;font-size:9px;font-weight:700;display:flex;align-items:center;gap:5px}.om-quick:hover{background:var(--lime);border-color:var(--lime)}
        .om-products.list .om-product{display:grid;grid-template-columns:100px minmax(0,1fr) auto;align-items:center}.om-products.list .om-product-image{width:100px;height:85px;aspect-ratio:auto}.om-products.list .om-tag{top:7px;left:7px;font-size:7px;padding:4px 6px}.om-products.list .om-heart{top:7px;right:7px;width:26px;height:26px}.om-products.list .om-product-info{padding:12px 18px}.om-products.list .om-product-name{margin-bottom:4px}.om-products.list .om-product-bottom{padding-right:14px}
        .om-empty{padding:40px 20px;text-align:center;border:1px dashed #d9d3c7;border-radius:16px;color:#817c84}.om-empty b{display:block;color:#302d34;font:600 19px 'Space Grotesk',sans-serif;margin:8px}.om-empty button{border:0;border-radius:9px;background:var(--lime);padding:9px 14px;font-size:10px;font-weight:700;margin-top:10px}
        .om-footer{border-top:1px solid var(--line);padding:21px 0 0;display:flex;justify-content:space-between;gap:12px;color:#8a858b;font-size:9px;margin-top:37px}.om-footer b{color:#444149;letter-spacing:.04em}
        .om-toast{position:fixed;z-index:60;bottom:22px;left:50%;transform:translateX(-50%);background:#29272d;color:white;border-radius:12px;padding:12px 16px;box-shadow:0 12px 32px #29272d2c;display:flex;align-items:center;gap:9px;font-size:11px;animation:om-in .18s ease-out}.om-toast svg{color:var(--lime)}@keyframes om-in{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}
        .om-bag-panel{position:fixed;z-index:55;top:122px;right:max(25px,calc((100vw - 1500px)/2));width:310px;background:#fffdf8;border:1px solid var(--line);border-radius:16px;box-shadow:0 18px 55px #302a1c22;padding:18px}.om-bag-top{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--line);padding-bottom:12px}.om-bag-top b{font:600 18px 'Space Grotesk',sans-serif}.om-bag-top button{border:0;background:none}.om-bag-lines{max-height:220px;overflow:auto}.om-bag-line{display:flex;justify-content:space-between;gap:10px;padding:11px 0;border-bottom:1px solid #eee9df;font-size:10px}.om-bag-line span{color:#7d7780}.om-bag-total{display:flex;justify-content:space-between;padding-top:14px;font:700 13px 'Space Grotesk',sans-serif}.om-checkout{width:100%;margin-top:14px;border:0;border-radius:10px;background:var(--lime);padding:12px;font-size:10px;font-weight:800}.om-bag-empty{padding:25px 0;text-align:center;color:#89838a;font-size:11px}.om-mobile-menu{display:none}
        @media(max-width:1080px){.om-layout{grid-template-columns:150px minmax(0,1fr);gap:25px}.om-head-links{gap:14px}.om-edition{display:none}.om-products{grid-template-columns:repeat(3,minmax(0,1fr))}.om-journey{grid-template-columns:160px minmax(0,1fr)}.om-intents{gap:6px}.om-intents button{padding:0 10px}}
        @media(max-width:760px){.om-ribbon{height:27px;font-size:8px}.om-header{height:65px;padding:0 17px;gap:12px}.om-brand-name{font-size:18px}.om-head-links{display:none}.om-search{width:auto;flex:1;margin-left:auto}.om-search input{height:36px}.om-head-icon{width:36px;height:36px;flex:none}.om-mobile-menu{display:grid}.om-layout{display:block;width:calc(100% - 32px)}.om-rail{display:none}.om-main{padding:27px 0 48px}.om-intro{padding-bottom:20px;align-items:flex-start}.om-intro h1{font-size:39px}.om-intro p{font-size:12px}.om-issue{display:none}.om-journey{display:block;padding:15px;margin-bottom:18px}.om-question{margin-bottom:12px}.om-intents{padding-bottom:2px}.om-intents button{height:35px;font-size:9px}.om-feature{grid-template-columns:1fr;min-height:0}.om-feature-art{min-height:260px;aspect-ratio:1.5}.om-feature-content{padding:22px}.om-feature-content h2{font-size:29px}.om-feature-copy{margin:12px 0 16px}.om-shelf-head{align-items:flex-start;flex-direction:column;margin:28px 0 14px}.om-controls{width:100%;justify-content:space-between}.om-products{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.om-product-image{aspect-ratio:.98}.om-product-info{padding:10px}.om-product-name{font-size:12px}.om-product-bottom{align-items:flex-end}.om-quick{font-size:0;width:29px;justify-content:center;padding:0}.om-quick svg{width:14px}.om-products.list .om-product{grid-template-columns:75px minmax(0,1fr) auto}.om-products.list .om-product-image{width:75px;height:74px}.om-products.list .om-product-info{padding:9px}.om-products.list .om-product-bottom{padding-right:8px}.om-bag-panel{top:99px;right:12px;width:min(310px,calc(100vw - 24px))}.om-footer{font-size:8px}}
        @media(max-width:390px){.om-header{padding:0 11px;gap:8px}.om-brand-name{font-size:16px}.om-mark{width:29px;height:29px}.om-search input{width:36px;padding-left:35px;transition:width .2s}.om-search input:focus{width:150px;position:absolute;right:0;z-index:2}.om-layout{width:calc(100% - 24px)}.om-intro h1{font-size:35px}.om-filters button{padding:7px 8px}.om-shelf-title h2{font-size:23px}}
      `}</style>
      <div className="om-ribbon"><Sparkles size={11} color="#c7ed50" /> Little wonders, picked with care <span style={{ color: "#8b8790" }}>·</span> The independent things index</div>
      <header className="om-header">
        <button className="om-brand" onClick={() => { setIntent("Everything"); setQuery(""); setFilter("All finds"); }} aria-label="Reset to discover">
          <span className="om-mark">A</span><span className="om-brand-name">ARTYVERSE</span>
        </button>
        <span className="om-edition">A collector’s field guide&nbsp; / &nbsp;04</span>
        <nav className="om-head-links" aria-label="Quick categories">
          {(["Everything", "Make something", "Hang it up"] as Intent[]).map((value) => <button key={value} className={intent === value ? "active" : ""} onClick={() => setIntent(value)}>{value === "Everything" ? "Discover" : value === "Make something" ? "Digital" : "Prints"}</button>)}
        </nav>
        <label className="om-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a little wonder" aria-label="Search finds" /></label>
        <button className="om-head-icon" aria-label="Open shopping bag" onClick={() => setBagOpen((open) => !open)}><ShoppingBag size={16} />{bag.length > 0 && <span className="om-count">{bag.length}</span>}</button>
        <button className="om-head-icon om-mobile-menu" aria-label="Toggle browse menu" onClick={() => setMenuOpen((open) => !open)}><Menu size={17} /></button>
      </header>
      {menuOpen && <div style={{ display: "flex", gap: 6, padding: "10px 16px", background: "#eeece3", overflowX: "auto" }}>{intents.map((value) => <button key={value} onClick={() => { setIntent(value); setMenuOpen(false); }} style={{ whiteSpace: "nowrap", border: "0", borderRadius: 9, padding: "8px 11px", background: intent === value ? "#27252b" : "#f8f6ef", color: intent === value ? "white" : "#555", fontSize: 10 }}>{value}</button>)}</div>}
      {bagOpen && <aside className="om-bag-panel" aria-label="Shopping bag">
        <div className="om-bag-top"><b>Your little haul</b><button aria-label="Close bag" onClick={() => setBagOpen(false)}><X size={17} /></button></div>
        {bag.length ? <><div className="om-bag-lines">{bag.map((id, index) => { const item = items.find((entry) => entry.id === id)!; return <div className="om-bag-line" key={`${id}-${index}`}><span>{item.name} · {item.maker}</span><b>${item.price.toFixed(2)}</b></div>; })}</div><div className="om-bag-total"><span>Subtotal</span><span>${bagTotal.toFixed(2)}</span></div><button className="om-checkout" onClick={() => announce("Your finds are ready when you are")}>Continue to checkout <ArrowRight size={13} style={{ verticalAlign: "middle" }} /></button></> : <div className="om-bag-empty">Nothing tucked in here yet.<br />Find something that feels like you.</div>}
      </aside>}

      <div className="om-layout">
        <aside className="om-rail">
          <div className="om-rail-label">Browse by aisle</div>
          <nav className="om-nav">
            {intents.map((value, index) => {
              const labels = ["Everywhere", "Digital things", "Prints & art", "Tiny collectibles", "Wearable ideas"];
              const icons = [<Compass size={14} />, <Sparkles size={14} />, <Bookmark size={14} />, <ArrowDownRight size={14} />, <ArrowUpRight size={14} />];
              return <button key={value} className={intent === value ? "on" : ""} onClick={() => setIntent(value)}>{icons[index]}{labels[index]}</button>;
            })}
          </nav>
          <div className="om-rail-note"><small>From the makers</small><b>Good ideas travel.</b><button onClick={() => announce("Maker stories are coming to your field guide")}>Meet the studios <ArrowUpRight size={12} style={{ verticalAlign: "middle" }} /></button></div>
        </aside>

        <main className="om-main">
          <section className="om-intro">
            <div><div className="om-kicker"><span style={{ width: 6, height: 6, borderRadius: 8, background: "currentColor" }} />The collector’s index · Issue 04</div>
              <h1>Good finds,<br />by feeling.</h1>
              <p>A considered little corner of the internet for things made by people<br className="wide-break" /> with something to say.</p>
            </div>
            <div className="om-issue"><b>14–21 September</b>Eight small discoveries<br />worth making room for.</div>
          </section>

          <section className="om-journey" aria-label="Choose what you are looking for">
            <div className="om-question">What brought you here?<span>Pick a feeling. We’ll find the good stuff.</span></div>
            <div className="om-intents">{intents.map((value, index) => <button key={value} onClick={() => setIntent(value)} className={intent === value ? "on" : ""}>
              {index === 0 ? <Compass size={13} /> : index === 1 ? <Sparkles size={13} /> : index === 2 ? <Bookmark size={13} /> : index === 3 ? <Heart size={13} /> : <ArrowUpRight size={13} />}{value}
            </button>)}</div>
          </section>

          {intent === "Everything" && !query && filter === "All finds" && <section className="om-feature">
            <div className="om-feature-art"><img src={cover(featured)} alt="Graphic artwork for Afterglow No. 04, a vivid limited edition risograph print" /><span className="om-art-stamp">Field note no. 04&nbsp; · &nbsp;Limited edition</span></div>
            <div className="om-feature-content">
              <div className="om-kicker"><Sparkles size={12} /> Today's object of affection</div>
              <h2>{featured.name}</h2><div className="maker">Ari Sol&nbsp; · &nbsp;Risograph on recycled stock</div>
              <p className="om-feature-copy">Two inks, one very good feeling. Signed and numbered by the artist; no two prints land quite the same.</p>
              <div className="om-feature-foot"><div className="om-feature-price">${featured.price}<small>Edition of 120 · ships flat</small></div><div className="om-feature-actions"><button className="om-save" aria-label="Save featured print" onClick={() => toggleSaved(featured)}>{saved.includes(featured.id) ? <Heart size={16} fill="currentColor" /> : <Heart size={16} />}</button><button className="om-add" onClick={() => addToBag(featured)}>Add to bag <ArrowRight size={14} /></button></div></div>
            </div>
          </section>}

          <section>
            <div className="om-shelf-head">
              <div className="om-shelf-title"><small>{categoryByIntent[intent] ?? "The finds desk"}</small><h2>{intent === "Everything" ? "On our radar" : intent === "Make something" ? "Tools for the next idea" : intent === "Hang it up" ? "A little art for your walls" : intent === "Collect a tiny thing" ? "Small objects, big charm" : "Good things to take along"}</h2><p>{shelf.length} pieces with a point of view, picked by independent makers.</p></div>
              <div className="om-controls">
                <div className="om-filters">{["All finds", "Fresh in", "Limited"].map((value) => <button key={value} className={filter === value ? "on" : ""} onClick={() => setFilter(value)}>{value}</button>)}</div>
                <div className="om-view"><button aria-label="Show cards" title="Cards" className={view === "grid" ? "on" : ""} onClick={() => setView("grid")}><span style={{ display: "grid", gridTemplateColumns: "repeat(2,4px)", gap: 2 }}>{[1,2,3,4].map((x) => <i key={x} style={{ width: 4, height: 4, background: "currentColor", borderRadius: 1 }} />)}</span></button><button aria-label="Show list" title="List" className={view === "list" ? "on" : ""} onClick={() => setView("list")}><span style={{ display: "grid", gap: 3 }}>{[1,2,3].map((x) => <i key={x} style={{ width: 12, height: 2, background: "currentColor", borderRadius: 1 }} />)}</span></button></div>
              </div>
            </div>
            {shelf.length ? <div className={`om-products ${view === "list" ? "list" : ""}`}>
              {shelf.map((item) => <article className="om-product" key={item.id}>
                <div className="om-product-image"><img src={cover(item)} alt={`Artwork for ${item.name}`} loading="lazy" /><span className="om-tag">{item.tag}</span><button className={`om-heart ${saved.includes(item.id) ? "active" : ""}`} aria-label={saved.includes(item.id) ? `Remove ${item.name} from saved` : `Save ${item.name}`} onClick={() => toggleSaved(item)}><Heart size={14} fill={saved.includes(item.id) ? "currentColor" : "none"} /></button></div>
                <div className="om-product-info"><div className="om-meta">{item.maker}&nbsp; · &nbsp;{item.kind}</div><h3 className="om-product-name">{item.name}</h3><div className="om-product-bottom"><span className="om-product-price">${item.price.toFixed(2)}</span><button className="om-quick" onClick={() => addToBag(item)}><ShoppingBag size={12} /> Add</button></div></div>
              </article>)}
            </div> : <div className="om-empty"><Search size={20} /><b>No finds on this shelf.</b>Try a different word or feeling.<br /><button onClick={() => { setQuery(""); setFilter("All finds"); setIntent("Everything"); }}>Reset the field guide</button></div>}
          </section>

          <footer className="om-footer"><b>ARTYVERSE&nbsp; · &nbsp;Collect without limits</b><span>Good things, made by real people.</span><span>Keep wandering&nbsp; ↗</span></footer>
        </main>
      </div>
      {toast && <div className="om-toast" role="status"><Check size={14} />{toast}</div>}
    </div>
  );
}
