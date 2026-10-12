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
function artwork(category:string, slug:string, productIndex:number, view:number) {
  const [a,b,c] = palettes[productIndex % palettes.length];
  const viewTilt = view === 1 ? "rotate(-3 500 500)" : view === 2 ? "rotate(2 500 500)" : "";
  const frameShadow = `<ellipse cx="510" cy="832" rx="275" ry="38" fill="${c}" opacity=".12"/>`;
  const framedPrint = (scene:string) => `${frameShadow}
    <g transform="${viewTilt}">
      <rect x="218" y="104" width="564" height="700" rx="12" fill="#fffdf8" stroke="${c}" stroke-opacity=".16" stroke-width="8"/>
      <rect x="250" y="136" width="500" height="636" rx="4" fill="#f8f4e9"/>
      <rect x="267" y="153" width="466" height="602" fill="${a}" opacity=".16"/>
      <g>${scene}</g>
      <path d="M278 739H722" stroke="${c}" stroke-opacity=".12" stroke-width="3"/>
      <circle cx="282" cy="120" r="4" fill="${c}" opacity=".4"/><circle cx="718" cy="120" r="4" fill="${c}" opacity=".4"/>
    </g>`;
  const moonScene = `<circle cx="626" cy="302" r="84" fill="${b}"/><circle cx="658" cy="276" r="76" fill="#f8f4e9"/>
    <path d="M267 530Q378 458 481 518T733 496V739H267Z" fill="${c}"/>
    <path d="M267 590Q394 510 505 584T733 558V739H267Z" fill="${a}"/>
    <path d="M302 480V381H390V480M426 481V350H534V481M563 481V397H679V481" fill="${b}" stroke="${c}" stroke-width="9"/>
    <path d="M293 386H399L381 355H311ZM417 355H543L524 323H438ZM554 402H688L668 369H574Z" fill="${a}" stroke="${c}" stroke-width="8"/>
    <g fill="${c}"><circle cx="334" cy="425" r="6"/><circle cx="466" cy="393" r="6"/><circle cx="610" cy="439" r="6"/><path d="M340 260l8 18 20 2-15 13 4 20-17-10-17 10 4-20-15-13 20-2z"/></g>`;
  const tideScene = `<rect x="267" y="153" width="466" height="602" fill="#bfe8df"/>
    <circle cx="503" cy="453" r="188" fill="${b}"/><circle cx="503" cy="453" r="139" fill="#7fc9c2"/>
    <circle cx="503" cy="453" r="91" fill="#f1c7a2"/><circle cx="503" cy="453" r="46" fill="${c}"/>
    <path d="M267 615Q345 565 421 615T574 615T733 615V755H267Z" fill="${a}" opacity=".88"/>
    <path d="M267 668Q345 620 421 668T574 668T733 668" fill="none" stroke="#fff8e9" stroke-width="11" opacity=".8"/>
    <path d="M354 303q34-34 68 0m145 21q28-28 56 0M360 510q24-24 48 0m194-118q22-22 44 0" fill="none" stroke="#fff8e9" stroke-width="9" stroke-linecap="round"/>`;
  const worldsScene = `<rect x="270" y="156" width="140" height="594" rx="5" fill="${a}"/><rect x="430" y="156" width="140" height="594" rx="5" fill="${b}"/><rect x="590" y="156" width="140" height="594" rx="5" fill="#e9d9bd"/>
    <circle cx="339" cy="352" r="48" fill="${c}"/><path d="M280 515Q340 425 400 515V685H280Z" fill="#f6b3ca"/><circle cx="339" cy="568" r="18" fill="#fff8e9"/>
    <path d="M451 565Q499 462 550 565V685H451Z" fill="${c}"/><circle cx="500" cy="351" r="43" fill="#fff8e9"/><path d="M465 352h70" stroke="${a}" stroke-width="10"/>
    <path d="M610 485Q664 425 710 485V685H610Z" fill="${a}"/><path d="M659 230l20 48 51 4-38 33 12 49-45-27-44 27 12-49-38-33 51-4z" fill="${b}"/>`;
  const risoScene = `<rect x="267" y="153" width="466" height="602" fill="#f6e6d4"/>
    <path d="M500 650C430 558 322 554 333 428c8-93 102-122 167-38 66-84 159-55 167 38 11 126-98 130-167 222Z" fill="${a}"/>
    <circle cx="500" cy="417" r="98" fill="${b}"/><path d="M500 317V650M384 389Q452 421 500 492M616 389Q548 421 500 492" fill="none" stroke="${c}" stroke-width="16"/>
    <path d="M311 698Q405 637 500 698T689 698" fill="none" stroke="${c}" stroke-width="12" opacity=".65"/>
    <circle cx="370" cy="282" r="20" fill="${b}"/><circle cx="633" cy="282" r="20" fill="${a}"/>`;
  const artScene = slug === "moon-market-poster" ? moonScene
    : slug === "tiny-tide-original" ? tideScene
    : slug === "little-worlds-triptych" ? worldsScene : risoScene;

  const figure = (() => {
    const displayStand = `<ellipse cx="500" cy="744" rx="206" ry="48" fill="${c}" opacity=".17"/><ellipse cx="500" cy="711" rx="157" ry="29" fill="${c}"/><ellipse cx="500" cy="702" rx="157" ry="26" fill="${b}" stroke="${c}" stroke-width="8"/>`;
    const cloud = `<path d="M355 590C291 590 269 543 269 498c0-53 39-91 91-91 16-82 83-131 162-121 72 9 115 61 122 125 62-1 104 42 104 94 0 49-36 85-91 85H355Z" fill="${a}" stroke="${c}" stroke-width="13" stroke-linejoin="round"/>
      <path d="M379 591q-24 69-7 105m249-105q24 69 7 105" fill="none" stroke="${c}" stroke-width="22" stroke-linecap="round"/>
      <ellipse cx="441" cy="500" rx="10" ry="15" fill="${c}"/><ellipse cx="563" cy="500" rx="10" ry="15" fill="${c}"/><path d="M466 542q37 31 73 0" fill="none" stroke="${c}" stroke-width="10" stroke-linecap="round"/>
      <circle cx="394" cy="531" r="15" fill="${b}" opacity=".8"/><circle cx="610" cy="531" r="15" fill="${b}" opacity=".8"/>`;
    const sprout = `<path d="M497 388C392 363 360 279 398 234c72-5 122 42 102 133 20-91 80-138 158-121 24 70-31 137-143 150v55H497Z" fill="${a}" stroke="${c}" stroke-width="13" stroke-linejoin="round"/>
      <path d="M362 590c0-120 65-189 139-189s139 69 139 189v79H362Z" fill="${b}" stroke="${c}" stroke-width="13"/>
      <ellipse cx="453" cy="535" rx="10" ry="15" fill="${c}"/><ellipse cx="548" cy="535" rx="10" ry="15" fill="${c}"/><path d="M473 572q27 23 54 0" fill="none" stroke="${c}" stroke-width="10" stroke-linecap="round"/>
      <path d="M396 670v38m211-38v38" stroke="${c}" stroke-width="19" stroke-linecap="round"/>`;
    const starling = `<ellipse cx="480" cy="520" rx="143" ry="184" fill="${c}" stroke="#191d3c" stroke-width="12"/>
      <path d="M426 450Q502 360 571 455Q490 509 426 450Z" fill="${b}" stroke="#fff3d4" stroke-width="10"/>
      <path d="m600 478 83 33-83 28Z" fill="${a}"/><circle cx="564" cy="454" r="12" fill="#fffdf5"/><circle cx="568" cy="454" r="5" fill="#1d1c2d"/>
      <path d="M390 650 330 711 431 690m143-40 91 61-109-21" fill="${c}" stroke="${c}" stroke-width="10" stroke-linejoin="round"/>
      <path d="M456 699v38m78-38v38" stroke="${a}" stroke-width="14" stroke-linecap="round"/>`;
    const littleBuddy = `<path d="M366 581c-22-75 11-164 96-201 85-37 198 11 208 109 8 79-34 151-101 178H429c-31-17-52-46-63-86Z" fill="${a}" stroke="${c}" stroke-width="13"/>
      <path d="M445 402q-25-72 30-111 68 23 50 99m49 19q16-77 91-74 38 57-16 116" fill="${b}" stroke="${c}" stroke-width="12" stroke-linejoin="round"/>
      <ellipse cx="454" cy="524" rx="10" ry="14" fill="${c}"/><ellipse cx="565" cy="524" rx="10" ry="14" fill="${c}"/><path d="M474 565q37 28 72 0" fill="none" stroke="${c}" stroke-width="10" stroke-linecap="round"/>`;
    const starlingFigure = slug === "starling-figure" ? starling : slug === "sprout-buddy-blindbox" ? sprout : cloud;
    const character = slug === "orbit-friends-set" ? `<g transform="translate(-165 70) scale(.66)">${cloud}</g><g transform="translate(160 78) scale(.64)">${sprout}</g><g transform="translate(0 -105) scale(.57)">${littleBuddy}</g>` : slug === "sprout-buddy-blindbox" ? sprout : slug === "starling-figure" ? starlingFigure : cloud;
    return `${frameShadow}<g transform="${viewTilt}">${displayStand}${character}
      ${slug !== "orbit-friends-set" ? `<path d="M650 280l10 22 24 2-18 15 6 23-22-12-21 12 5-23-17-15 23-2z" fill="${b}"/>` : ""}</g>`;
  })();

  const clothing = (() => {
    const tee = `<path d="m373 237 92-57h70l92 57 105 59-76 122-67-38v329H411V380l-67 38-76-122Z" fill="${a}" stroke="${c}" stroke-width="14" stroke-linejoin="round"/>
      <path d="M465 184q0 66 35 66t35-66" fill="none" stroke="${c}" stroke-width="12"/>
      <path d="M461 355q38-29 76 0-38 29-76 0Z" fill="${b}"/><circle cx="499" cy="355" r="13" fill="${c}"/>`;
    const hoodie = `<path d="M393 279q5-125 107-125t107 125l107 77-71 117-65-39v274H422V434l-65 39-71-117Z" fill="${a}" stroke="${c}" stroke-width="14" stroke-linejoin="round"/>
      <path d="M433 199q67-93 134 0l-13 92H446Z" fill="${b}" stroke="${c}" stroke-width="12"/>
      <path d="M476 307v85m48-85v85" stroke="${c}" stroke-width="10" stroke-linecap="round"/><path d="M462 454q38-27 76 0-38 31-76 0Z" fill="${b}"/>`;
    const tote = `<path d="M322 333h356l-33 409H355Z" fill="${a}" stroke="${c}" stroke-width="15" stroke-linejoin="round"/>
      <path d="M410 349V285q0-92 90-92t90 92v64" fill="none" stroke="${c}" stroke-width="18" stroke-linecap="round"/>
      <circle cx="500" cy="516" r="68" fill="${b}"/><path d="M469 522q31-58 62 0-31 55-62 0Z" fill="${c}"/>`;
    const socks = `<path d="M365 190h120v302l96 39q54 21 38 76-12 43-64 33l-190-32Z" fill="${a}" stroke="${c}" stroke-width="14" stroke-linejoin="round"/>
      <path d="M515 190h120v302l96 39q54 21 38 76-12 43-64 33l-190-32Z" fill="${b}" stroke="${c}" stroke-width="14" stroke-linejoin="round"/>
      <path d="M368 260h114m36-1h114m-262 79h112m37 0h114" stroke="${c}" stroke-width="15" opacity=".7"/>`;
    const garment = slug === "everywhere-studio-tee" ? tee : slug === "make-room-hoodie" ? hoodie : slug === "tiny-orbit-socks" ? socks : tote;
    return `${frameShadow}<g transform="${viewTilt}">${garment}</g>`;
  })();

  const accessory = (() => {
    const bottle = `<rect x="430" y="236" width="140" height="84" rx="22" fill="${c}"/><rect x="384" y="293" width="232" height="461" rx="84" fill="${a}" stroke="${c}" stroke-width="14"/>
      <path d="M395 485h210v179H395Z" fill="${b}"/><path d="M419 518q80-74 158 0-78 91-158 0Z" fill="${a}"/><path d="M478 320v92" stroke="#fffdf3" stroke-width="12" opacity=".8"/>`;
    const keychain = `<path d="M473 265a86 86 0 1 1 139 67l-95 94" fill="none" stroke="${c}" stroke-width="34"/>
      <path d="M505 371q128 72 4 222-117 140 35 148 152 8 67-137-54-91 40-172" fill="none" stroke="${a}" stroke-width="72" stroke-linecap="round"/>
      <path d="M505 371q128 72 4 222-117 140 35 148 152 8 67-137-54-91 40-172" fill="none" stroke="${b}" stroke-width="18" stroke-linecap="round" stroke-dasharray="4 18"/>`;
    const pins = `<g transform="translate(0 2)"><circle cx="350" cy="452" r="115" fill="${a}" stroke="${c}" stroke-width="17"/><circle cx="650" cy="452" r="115" fill="${b}" stroke="${c}" stroke-width="17"/><path d="M500 286l39 83 91 9-68 59 20 89-82-47-82 47 20-89-68-59 91-9Z" fill="${a}" stroke="${c}" stroke-width="13"/></g>
      <path d="M310 590v92m380-92v92m-190-14v99" stroke="#b7b3a9" stroke-width="16" stroke-linecap="round"/>`;
    const notebook = `<path d="M337 227q-16-20 15-24l290 32q28 4 28 32v453q0 31-31 27l-285-35q-27-4-27-31Z" fill="${c}" opacity=".18" transform="translate(20 20)"/>
      <path d="M324 216q-16-20 15-24l290 32q28 4 28 32v453q0 31-31 27l-285-35q-27-4-27-31Z" fill="${a}" stroke="${c}" stroke-width="14"/>
      <path d="M368 282 613 308v341l-245-30Z" fill="#fffaf0"/><path d="M397 350l173 18m-173 51 173 18m-173 51 173 18m-173 51 173 18" stroke="${b}" stroke-width="12" stroke-linecap="round"/>
      <circle cx="373" cy="258" r="8" fill="${c}"/><circle cx="435" cy="265" r="8" fill="${c}"/><circle cx="497" cy="271" r="8" fill="${c}"/>`;
    if (slug === "color-block-water-bottle") return `${frameShadow}<g transform="${viewTilt}">${bottle}</g>`;
    if (slug === "soft-loop-keychain") return `${frameShadow}<g transform="${viewTilt}">${keychain}</g>`;
    if (slug === "orbit-enamel-pins") return `${frameShadow}<g transform="${viewTilt}">${pins}</g>`;
    return `${frameShadow}<g transform="${viewTilt}">${notebook}</g>`;
  })();

  const digitalPack = (() => {
    const garden = `<rect x="286" y="243" width="428" height="298" rx="25" fill="#dff1b5"/>
      <path d="M286 476Q390 415 500 477T714 470V541H286Z" fill="${a}"/>
      <g fill="${c}"><path d="M365 439v-73m0 33q-40-6-47-43 42-5 47 43m0 16q42-6 50-43-43-6-50 43Z"/><path d="M500 439v-99m0 43q-52-9-61-57 54-7 61 57m0 16q52-9 61-57-54-7-61 57Z"/><path d="M631 439v-68m0 30q-37-6-44-40 39-5 44 40m0 14q38-6 45-40-40-5-45 40Z"/></g>
      <rect x="302" y="579" width="115" height="90" rx="16" fill="${b}"/><rect x="442" y="579" width="115" height="90" rx="16" fill="${a}"/><rect x="582" y="579" width="115" height="90" rx="16" fill="${c}"/>
      <circle cx="359" cy="623" r="24" fill="${c}"/><path d="M466 645l31-50 35 50Z" fill="${c}"/><path d="M609 624h60" stroke="${b}" stroke-width="14" stroke-linecap="round"/>`;
    const orbit = `<rect x="286" y="243" width="428" height="298" rx="25" fill="#24243a"/>
      <ellipse cx="500" cy="397" rx="169" ry="72" fill="none" stroke="${b}" stroke-width="13" transform="rotate(-22 500 397)"/>
      <circle cx="500" cy="379" r="74" fill="${a}" stroke="#fff5e3" stroke-width="10"/><circle cx="477" cy="371" r="8" fill="${c}"/><circle cx="523" cy="371" r="8" fill="${c}"/><path d="M479 402q21 18 42 0" fill="none" stroke="${c}" stroke-width="8" stroke-linecap="round"/>
      <circle cx="353" cy="355" r="26" fill="${b}"/><circle cx="650" cy="438" r="21" fill="#ffb06d"/><path d="M302 624q52-63 104 0v47H302Zm140 0q52-63 104 0v47H442Zm140 0q52-63 104 0v47H582Z" fill="${a}"/>`;
    const presets = `<rect x="286" y="243" width="428" height="298" rx="25" fill="#d8e5dc"/>
      <rect x="314" y="271" width="179" height="239" rx="15" fill="#f2c3a2"/><circle cx="406" cy="350" r="48" fill="#f7e8ad"/><path d="M314 438q49-73 92-7t87-20v99H314Z" fill="#4d7977"/>
      <rect x="507" y="271" width="179" height="239" rx="15" fill="#edd8c8"/><circle cx="596" cy="353" r="48" fill="#f8ead0"/><path d="M507 435q53-61 94-6t85-24v105H507Z" fill="${c}"/>
      <rect x="306" y="590" width="183" height="13" rx="7" fill="${b}"/><rect x="306" y="621" width="115" height="13" rx="7" fill="${a}"/><circle cx="529" cy="596" r="14" fill="${c}"/><circle cx="633" cy="627" r="14" fill="${b}"/>`;
    const typeface = `<rect x="286" y="243" width="428" height="298" rx="25" fill="#e9e1ff"/>
      <path d="M345 474 425 293h47l82 181h-49l-17-43h-78l-17 43Zm78-79h51l-25-63Zm141 79V293h44v181Zm62 0V293h44v181Z" fill="${c}"/>
      <circle cx="369" cy="608" r="38" fill="${a}"/><path d="M468 648v-77h71v77m-71-38h71" fill="none" stroke="${c}" stroke-width="13"/><circle cx="639" cy="608" r="38" fill="${b}"/>`;
    const showcase = slug === "pixel-garden-kit" ? garden : slug === "orbit-hero-pack" ? orbit : slug === "soft-signal-presets" ? presets : typeface;
    return `${frameShadow}<g transform="${viewTilt}"><rect x="255" y="210" width="490" height="510" rx="42" fill="#fffdf9" stroke="${c}" stroke-width="12"/>${showcase}</g>`;
  })();
  const content = category === "art" ? framedPrint(artScene)
    : category === "figure" ? figure
    : category === "merch" ? clothing
    : category === "accessories" ? accessory
    : digitalPack;
  const background = productIndex % 2 ? "#f4f1e9" : "#f7f6f0";
  const decor = view === 1
    ? `<circle cx="844" cy="173" r="64" fill="${b}" opacity=".4"/><path d="M127 732q57-46 114 0" fill="none" stroke="${a}" stroke-width="18" stroke-linecap="round"/>`
    : view === 2
      ? `<path d="M832 178l23 49 54 7-40 37 10 53-47-26-47 26 10-53-40-37 54-7z" fill="${b}" opacity=".55"/><circle cx="160" cy="772" r="32" fill="${a}" opacity=".45"/>`
      : `<circle cx="112" cy="149" r="106" fill="${a}" opacity=".2"/><circle cx="856" cy="796" r="82" fill="${b}" opacity=".25"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><rect width="1000" height="1000" fill="${background}"/><path d="M0 810Q210 760 400 824T1000 800V1000H0Z" fill="${a}" opacity=".13"/>${decor}${content}</svg>`;
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
  const image=artwork(r[4],r[0],i,0);
  return {
    id:`av-${String(i+1).padStart(3,"0")}`, slug:r[0], name:r[1], price:r[2], ...(r[3]?{compareAt:r[3]}:{}),
    category:r[4], type:r[5], creator:r[6], tags:r[7].split(", "), description:r[8], details:r[9],
    rating:r[10], reviews:r[11], image, gallery:[image,artwork(r[4],r[0],i,1),artwork(r[4],r[0],i,2)],
  };
});
