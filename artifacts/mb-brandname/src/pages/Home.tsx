import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight, Truck, Phone, Shield } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80",
    label: "New Season",
  },
  {
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=1920&q=80",
    label: "Luxury Bags",
  },
  {
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80",
    label: "Accessories",
  },
];

const promoSlides = [
  {
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
    heading: "A bracelet with timeless elegance.",
    body1: "This bracelet embodies timeless beauty through its refined yet powerful design. The gold-tone frame is paired with soft, luminous white accents, highlighted by the brand's iconic logo at the center — a symbol cherished worldwide.",
    body2: "More than just jewelry, this piece carries a story of taste, craftsmanship, and individuality. Versatile enough to complement any style, it can elevate a glamorous evening look or add sophistication to a simple, everyday outfit.",
    cta: "/collection/accessories",
  },
  {
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
    heading: "Each necklace has its own unique story to tell.",
    body1: "In the world of fashion, true luxury is not defined by price alone, but by the story behind each piece.",
    body2: "This necklace was designed to embody timeless elegance. The gold-tone chain is meticulously crafted, gleaming under the light like a treasure from a classic era that still feels modern today. Its round pendant, adorned with ornate engravings, frames the iconic brand emblem — a symbol admired across the globe.",
    cta: "/collection/new-arrivals",
  },
  {
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    heading: "Crafted for those who understand true luxury.",
    body1: "Our bag collection brings together the finest materials sourced from ateliers across Europe and Japan.",
    body2: "Each piece tells a story of quality and refinement. Designed for the modern connoisseur who values both beauty and function.",
    cta: "/collection/bags",
  },
];

export function Home() {
  const [heroRef, heroApi] = useEmblaCarousel({ loop: true });
  const [heroIndex, setHeroIndex] = useState(0);
  const [promoIndex, setPromoIndex] = useState(0);

  useEffect(() => {
    if (!heroApi) return;
    heroApi.on("select", () => setHeroIndex(heroApi.selectedScrollSnap()));
    const id = setInterval(() => heroApi.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [heroApi]);

  const scrollHeroPrev = useCallback(() => heroApi?.scrollPrev(), [heroApi]);
  const scrollHeroNext = useCallback(() => heroApi?.scrollNext(), [heroApi]);

  const newArrivals = products.filter(p => p.tags.includes("new-arrivals")).slice(0, 8);
  const promo = promoSlides[promoIndex];

  return (
    <div className="w-full">

      {/* ── Hero Carousel ── */}
      <section className="relative w-full overflow-hidden">
        <div
          className="w-full overflow-hidden"
          style={{ height: "min(50vw, 600px)", minHeight: 260 }}
          ref={heroRef}
        >
          <div className="flex h-full">
            {heroSlides.map((slide, i) => (
              <div key={i} className="flex-[0_0_100%] min-w-0 relative h-full">
                <img
                  src={slide.image}
                  alt={slide.label}
                  className="w-full h-full object-cover object-center"
                  loading={i === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-1/2 translate-y-1/2 left-[8%] text-white">
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-widest text-white drop-shadow-lg">
                    NO.1 Luxury Brandname
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={scrollHeroPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/70 rounded-full flex items-center justify-center text-black hover:bg-white transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={scrollHeroNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/70 rounded-full flex items-center justify-center text-black hover:bg-white transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => heroApi?.scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === heroIndex ? "w-6 bg-white" : "w-2 bg-white/50"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── New Arrivals ── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-sm font-semibold uppercase tracking-[0.3em] mb-10">
            NEW ARRIVALS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Link
              href="/collection/new-arrivals"
              className="border border-gray-400 text-xs uppercase tracking-widest px-8 py-3 hover:bg-black hover:text-white hover:border-black transition-colors"
            >
              VIEW MORE →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Promotional Carousel ── */}
      <section className="py-12 lg:py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">

            {/* Image with arrows */}
            <div className="relative w-full md:w-5/12">
              <button
                onClick={() => setPromoIndex((promoIndex - 1 + promoSlides.length) % promoSlides.length)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-400 text-sm bg-white hover:border-gray-600 hover:text-gray-700 transition-colors z-10"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  key={promo.image}
                  src={promo.image}
                  alt="Promotional"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => setPromoIndex((promoIndex + 1) % promoSlides.length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-400 text-sm bg-white hover:border-gray-600 hover:text-gray-700 transition-colors z-10"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Text */}
            <div className="w-full md:w-7/12 flex flex-col gap-4">
              <h2 className="text-2xl lg:text-3xl font-light leading-snug text-black">
                {promo.heading}
              </h2>
              <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                {promo.body1}
              </p>
              <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                {promo.body2}
              </p>
              <div>
                <Link
                  href={promo.cta}
                  className="inline-block bg-gray-800 text-white text-xs uppercase tracking-widest px-6 py-3 mt-4 hover:bg-black transition-colors"
                >
                  FIND YOUR STYLE
                </Link>
              </div>
              <div className="flex gap-2 mt-2">
                {promoSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPromoIndex(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${i === promoIndex ? "bg-gray-800" : "bg-gray-300"}`}
                    aria-label={`Promo slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About Us ── */}
      <section className="py-12 lg:py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-sm uppercase tracking-[0.3em] font-semibold mb-4">ABOUT US</h2>
          <h3 className="text-base font-semibold uppercase tracking-wide mb-4">
            100% AUTHENTIC BRANDED ITEMS FROM JAPAN
          </h3>
          <p className="text-xs text-gray-500 uppercase tracking-wider leading-loose">
            CAREFULLY SELECTED AND IMPORTED DIRECTLY FROM JAPAN.<br />
            WITH OVER 10 YEARS OF EXPERIENCE IN AUTHENTIC SECONDHAND BRANDED GOODS,<br />
            WE GUARANTEE GENUINE QUALITY. EACH ITEM IS THOROUGHLY INSPECTED BEFORE DELIVERY.
          </p>
        </div>
      </section>

      {/* ── Feature Icons ── */}
      <section className="py-10 lg:py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            <div className="flex flex-col items-center pt-8 sm:pt-0">
              <Truck className="w-10 h-10 mb-4 stroke-1 text-gray-700" />
              <h3 className="font-medium text-sm mb-1">Fast And Free Delivery</h3>
              <p className="text-xs text-gray-500">Free delivery for all orders over $140</p>
            </div>
            <div className="flex flex-col items-center pt-8 sm:pt-0">
              <Phone className="w-10 h-10 mb-4 stroke-1 text-gray-700" />
              <h3 className="font-medium text-sm mb-1">24/7 Customer Support</h3>
              <p className="text-xs text-gray-500">Friendly 24/7 customer support</p>
            </div>
            <div className="flex flex-col items-center pt-8 sm:pt-0">
              <Shield className="w-10 h-10 mb-4 stroke-1 text-gray-700" />
              <h3 className="font-medium text-sm mb-1">Money Back Guarantee</h3>
              <p className="text-xs text-gray-500">We return money within 30 days</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
