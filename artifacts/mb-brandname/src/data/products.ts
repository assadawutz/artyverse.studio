export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAt?: number;
  tags: string[];
  category: string;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: "p_mb_001",
    slug: "mb-signature-necklace",
    name: "MB Signature Necklace",
    price: 429,
    compareAt: 599,
    tags: ["new-arrivals"],
    category: "accessories",
    image: "https://images.unsplash.com/photo-1599643478524-fb66f70a0066?w=800&q=80",
    description: "Our signature piece. Crafted in 18k solid gold with meticulous attention to detail. This elegant necklace redefines modern luxury."
  },
  {
    id: "p_mb_002",
    slug: "mb-oval-gem-necklace",
    name: "MB Oval Gem Necklace",
    price: 289,
    tags: ["new-arrivals"],
    category: "accessories",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    description: "A delicate chain featuring a stunning oval cut gem. The perfect statement piece for evening wear or elevating your everyday look."
  },
  {
    id: "p_mb_003",
    slug: "mb-gold-minimal-watch",
    name: "MB Gold Minimal Watch",
    price: 449,
    tags: ["new-arrivals"],
    category: "accessories",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
    description: "Timeless elegance on your wrist. Features a clean dial, premium sapphire crystal, and an 18k gold plated stainless steel mesh strap."
  },
  {
    id: "p_mb_004",
    slug: "mb-pearl-bracelet",
    name: "MB Pearl Bracelet",
    price: 99,
    compareAt: 129,
    tags: ["new-arrivals"],
    category: "accessories",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
    description: "Freshwater pearls strung on a fine silk thread with a solid gold clasp. A classic addition to any jewelry collection."
  },
  {
    id: "p_mb_005",
    slug: "mb-blue-leather-handbag",
    name: "MB Blue Leather Handbag",
    price: 599,
    tags: [],
    category: "bags",
    image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80",
    description: "Handcrafted in Italy using premium full-grain leather. The striking azure hue makes it a standout piece for any season."
  },
  {
    id: "p_mb_006",
    slug: "mb-minimal-black-tote",
    name: "MB Minimal Black Tote",
    price: 329,
    tags: [],
    category: "bags",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
    description: "The ultimate daily companion. Spacious interior, structured silhouette, and minimal hardware for a sleek, understated look."
  },
  {
    id: "p_mb_007",
    slug: "mb-evening-mini-bag",
    name: "MB Evening Mini Bag",
    price: 249,
    tags: [],
    category: "bags",
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
    description: "Compact and chic. Designed to carry your essentials for a night out, featuring a detachable gold chain strap."
  },
  {
    id: "p_mb_008",
    slug: "mb-boutique-collection-bag",
    name: "MB Boutique Collection Bag",
    price: 399,
    tags: [],
    category: "bags",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    description: "From our exclusive boutique line. Features signature hardware and a beautifully tailored shape that transitions from day to night."
  },
  {
    id: "p_mb_009",
    slug: "mb-gold-silver-necklace",
    name: "MB Gold Silver Necklace",
    price: 199,
    tags: [],
    category: "accessories",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&q=80",
    description: "A modern two-tone design blending solid silver with 18k gold accents. Perfect for layering."
  },
  {
    id: "p_mb_010",
    slug: "mb-bracelet-ring-set",
    name: "MB Bracelet and Ring Set",
    price: 99,
    tags: [],
    category: "accessories",
    image: "https://images.unsplash.com/photo-1602750468305-6f91f37e466c?w=800&q=80",
    description: "A beautifully matched set featuring minimalist bands that catch the light beautifully."
  },
  {
    id: "p_mb_011",
    slug: "mb-classic-bracelet",
    name: "MB Classic Bracelet",
    price: 62,
    tags: [],
    category: "accessories",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
    description: "Simple, elegant, and versatile. The piece you will never want to take off."
  },
  {
    id: "p_mb_012",
    slug: "mb-watch-editorial",
    name: "MB Watch Editorial",
    price: 449,
    tags: [],
    category: "accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    description: "Featured in top fashion editorials. A bold yet refined timepiece designed for the modern connoisseur."
  }
];
