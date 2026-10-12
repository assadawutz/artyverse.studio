export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAt?: number;
  tags: string[];
  category: string;
  type: string;
  creator: string;
  image: string;
  gallery: string[];
  description: string;
  details: string[];
  rating: number;
  reviews: number;
}

const palettes = [
  ["#d6f34a","#f3b7dc","#29252f"], ["#ffb06d","#f4d8c3","#5e3b80"],
  ["#c7b7ff","#ff83b5","#242339"], ["#e4e5d8","#9bd9cb","#334f61"],
  ["#f3db5b","#ff8a69","#362b32"], ["#bce9ff","#7a7ce1","#25254a"],
  ["#f6c6d3","#f3efde","#362b33"], ["#a8eac9","#e4f17d","#335b55"],
];
function artwork(name:string, index:number) {
  const [a,b,c] = palettes[index % palettes.length];
  const shape = index % 3 === 0
    ? `<circle cx="680" cy="310" r="185" fill="${b}"/><circle cx="590" cy="385" r="130" fill="${a}"/><path d="M250 720 590 200l325 520Z" fill="${c}" opacity=".92"/>`
    : index % 3 === 1
      ? `<rect x="365" y="145" width="390" height="550" rx="190" fill="${b}" transform="rotate(18 560 420)"/><circle cx="465" cy="365" r="178" fill="${a}"/><path d="M180 650Q470 330 850 610" fill="none" stroke="${c}" stroke-width="45"/>`
      : `<path d="M535 135 825 420 535 705 245 420Z" fill="${a}"/><circle cx="535" cy="420" r="150" fill="${b}"/><path d="M330 640 730 220" stroke="${c}" stroke-width="36"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><rect width="1000" height="1000" fill="${index % 2 ? "#f4f1e9" : "#f7f6f0"}"/><circle cx="100" cy="130" r="210" fill="${a}" opacity=".26"/>${shape}<text x="58" y="900" font-family="Arial,sans-serif" font-size="34" font-weight="700" letter-spacing="8" fill="${c}">ARTYVERSE / ${String(index+1).padStart(2,"0")}</text><text x="58" y="950" font-family="Arial,sans-serif" font-size="18" letter-spacing="4" fill="${c}" opacity=".7">${name.toUpperCase()}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const raw = [
 ["pixel-garden-kit","Pixel Garden Creator Kit",18,24,"digital","Digital packs","Nia Studio","new, creator pick","A bright little toolkit for building playful worlds. Includes 42 layered PNG assets, editable color palettes, and a mini guide for your next digital canvas.",["42 transparent PNG assets","Procreate + Photoshop ready","Instant digital delivery"],4.9,86],
 ["orbit-hero-pack","Orbit Hero 3D Pack",32,0,"digital","Digital packs","Milo Tan","limited drop, 3D","Meet your next desktop companion. Six polished 3D character poses, turntable renders, and printable wallpapers in one collectible bundle.",["6 high-resolution renders","4K wallpapers included","Personal creator license"],4.8,42],
 ["soft-signal-presets","Soft Signal Photo Presets",14,18,"digital","Digital packs","June Park","bestseller, photo","A warm, airy preset set tuned for everyday stories, studio portraits, and city light. One click, a whole new point of view.",["12 mobile + desktop presets","Lightroom compatible","Quick-start color guide"],4.7,113],
 ["shape-language-font","Shape Language Typeface",26,0,"digital","Digital packs","Form Dept.","new, design","A friendly geometric display family with enough character for posters, packaging, and little-big ideas.",["4 weights + variable font","OTF, TTF and WOFF2","Commercial license"],4.9,29],
 ["afterglow-riso-print","Afterglow No. 04 Riso Print",38,46,"art","Art & prints","Ari Sol","limited drop, signed","Two-color risograph print on richly textured recycled stock. Signed and numbered by the artist; every print carries its own subtle ink variation.",["A3 / 11.7 × 16.5 in","Edition of 120","Ships flat in a protective sleeve"],4.9,61],
 ["little-worlds-triptych","Little Worlds Triptych",64,0,"art","Art & prints","Studio Luma","art, set","Three small windows into a very large imagination. This set of archival art prints makes a gallery wall feel instantly personal.",["Set of three 8 × 10 in prints","Museum-grade matte paper","Frame not included"],4.8,34],
 ["moon-market-poster","Moon Market Poster",29,0,"art","Art & prints","Kei Okada","new, poster","A late-night market on a moon that feels almost familiar. A vivid, dreamlike scene from illustrator Kei Okada.",["18 × 24 in","Archival pigment print","Printed to order"],4.9,57],
 ["tiny-tide-original","Tiny Tide Original Canvas",92,110,"art","Art & prints","Lena Wu","one of one, art","An original miniature painting of a tidepool in motion, finished with a glossy cobalt edge. One artwork, one collector.",["Original 8 × 10 in painting","Signed on reverse","Certificate of authenticity"],5,12],
 ["cloud-keeper-figure","Cloud Keeper Vinyl Figure",58,0,"figure","Collectible figures","Momo Works","limited drop, collectible","A pocket-sized guardian for big daydreams. The Cloud Keeper arrives in a display-ready box with a tiny illustrated story card.",["7 in soft-touch vinyl","Numbered edition of 500","Designed by Momo Works"],4.9,98],
 ["sprout-buddy-blindbox","Sprout Buddy Mini Figure",24,0,"figure","Collectible figures","Tiny Orbit","blind box, collectible","One of six tiny sprouts, each with a different expression and a very important mission: keep your desk company.",["Mystery character inside","2.5 in collectible vinyl","Six designs to discover"],4.7,146],
 ["starling-figure","Starling Night Edition",76,88,"figure","Collectible figures","Momo Works","limited drop, signed","A midnight-blue special edition with pearlescent details. This numbered Starling is made for the front row of your collection.",["8 in hand-finished vinyl","Edition of 240","Includes display stand"],4.9,31],
 ["orbit-friends-set","Orbit Friends 3-Pack",64,0,"figure","Collectible figures","Orbit Lab","set, collectible","Three friends, one little universe. Each figure has a different finish and fits together to form a tiny orbiting scene.",["Three 3 in figures","Mix-and-match display base","Gift-ready box"],4.8,45],
 ["everywhere-studio-tee","Everywhere Studio Tee",38,0,"merch","Creator merchandise","Nia Studio","creator pick, merch","The studio uniform for wherever ideas happen. Heavyweight cotton, relaxed shape, and a screen-printed art mark by Nia.",["100% organic cotton","Relaxed unisex fit, XS–XXL","Printed in small batches"],4.8,74],
 ["make-room-hoodie","Make Room Hoodie",72,84,"merch","Creator merchandise","Form Dept.","bestseller, merch","An extra-soft layer for making space, taking space, and making something weird. Designed with Form Dept. in a limited run.",["Midweight brushed cotton","Screen printed front + sleeve","Unisex sizes XS–XXL"],4.9,52],
 ["momo-doodle-tote","Momo Doodle Tote",26,0,"merch","Creator merchandise","Momo Works","everyday, merch","A sturdy everyday carryall scattered with Momo's tiny doodle universe. Room for a sketchbook, snacks, and the unexpected.",["Recycled cotton canvas","Interior pocket","12 × 14 in"],4.7,91],
 ["tiny-orbit-socks","Tiny Orbit Socks",18,0,"merch","Creator merchandise","Tiny Orbit","gift, merch","A little orbit around your ankles. These cushioned crew socks feature the Tiny Orbit cast in a limited colorway.",["Organic cotton blend","One size fits most","Illustrated all-over knit"],4.8,68],
 ["soft-loop-keychain","Soft Loop Keychain",16,0,"accessories","Accessories","Studio Luma","gift, everyday","A satisfying soft-touch loop with a color-pop carabiner. Clip your keys, badge, or tiny everyday essentials.",["Recycled woven cord","Aluminum clip","Made for everyday carry"],4.6,38],
 ["color-block-water-bottle","Color Block Bottle",34,0,"accessories","Accessories","Good Form","everyday, new","A double-wall bottle built for long studio days and impromptu walks. The limited lime-and-lilac finish is an instant mood lift.",["18 oz stainless steel","Keeps drinks cold 24 hours","Leak-resistant lid"],4.8,107],
 ["orbit-enamel-pins","Orbit Enamel Pin Set",22,0,"accessories","Accessories","Orbit Lab","set, gift","Three little hard-enamel pins for bags, jackets, or the pinboard that keeps your ideas in orbit.",["Set of 3 pins","Soft enamel with polished metal","Backing cards included"],4.9,56],
 ["color-study-notebook","Color Study Notebook",20,0,"accessories","Accessories","Ari Sol","artist, everyday","A blank page with a tiny nudge to begin. Lay-flat binding, bright color study endpapers, and paper that loves ink.",["160 uncoated pages","A5 lay-flat binding","FSC-certified paper"],4.8,44],
];
export const products: Product[] = raw.map((r:any,i) => {
  const image=artwork(r[1],i);
  return {
    id:`av-${String(i+1).padStart(3,"0")}`, slug:r[0], name:r[1], price:r[2], ...(r[3]?{compareAt:r[3]}:{}),
    category:r[4], type:r[5], creator:r[6], tags:r[7].split(", "), description:r[8], details:r[9],
    rating:r[10], reviews:r[11], image, gallery:[image,artwork(r[1],i+3),artwork(r[1],i+5)],
  };
});
