import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "wouter";
import { ChevronRight, ChevronLeft, ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

/* landing page hero luxury fashion model */
const heroImages = [
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80",
  "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=1920&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80",
];

export function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setSelectedIndex(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  const newArrivals = products.filter(p => p.tags.includes("new-arrivals")).slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Carousel */}
      <section className="relative w-full h-[70vh] md:h-[85vh] bg-secondary overflow-hidden">
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full">
            {heroImages.map((src, idx) => (
              <div key={idx} className="flex-[0_0_100%] min-w-0 relative h-full">
                <div className="absolute inset-0 bg-black/20 z-10" />
                <img src={src} alt="Hero banner" className="object-cover w-full h-full" />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center p-4">
                  <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-semibold mb-4 drop-shadow-md">
                    No.1 Luxury Brandname
                  </span>
                  <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-8 max-w-3xl drop-shadow-lg leading-tight">
                    Elevate Your Style
                  </h2>
                  <Link
                    href="/collection/new-arrivals"
                    className="bg-white text-primary px-8 py-3 text-xs md:text-sm font-bold tracking-widest uppercase hover:bg-accent hover:text-white transition-colors duration-300"
                  >
                    Shop New Arrivals
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === selectedIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
              }`}
              onClick={() => emblaApi?.scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">New Arrivals</h2>
          <div className="w-16 h-0.5 bg-accent mb-6" />
          <p className="text-muted-foreground text-center max-w-2xl">
            Discover our latest collection of curated luxury pieces. Carefully selected for the modern connoisseur.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/collection/new-arrivals"
            className="border-2 border-primary text-primary px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-primary hover:text-white transition-all duration-300"
          >
            View More
          </Link>
        </div>
      </section>

      {/* Promotional Split Section */}
      <section className="bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 h-[50vh] lg:h-[70vh]">
              {/* editorial lifestyle shot of jewelry */}
              <img
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=80"
                alt="Jewelry editorial"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4 font-semibold">
                The Heritage Collection
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                A bracelet with timeless elegance
              </h2>
              <div className="space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
                <p>
                  Experience the perfect harmony of classic design and modern craftsmanship. Our heritage pieces are designed to be passed down through generations, making a quiet yet powerful statement.
                </p>
                <p>
                  Each piece is meticulously crafted using ethically sourced materials, ensuring not just beauty, but sustainability and durability.
                </p>
              </div>
              <div>
                <Link
                  href="/collection/accessories"
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary border-b-2 border-accent pb-1 hover:text-accent transition-colors group"
                >
                  Find Your Style
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 md:py-32 bg-white text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-[12px] tracking-[0.4em] uppercase text-accent font-bold mb-4 block">
            Our Promise
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8">
            100% Authentic
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-12">
            Every piece in our collection is strictly verified and imported directly from verified luxury boutiques in Japan and Europe. We stand behind the authenticity of our entire catalogue with a lifetime guarantee.
          </p>
          <img 
             src="https://pixabay.com/get/gadb51058cd7dc8e3e7ac4bbfc5654994a535a5598388125e58ca7dd9c6b77c87212b7b522c11f9772a1fe1dde10bcf8850c86cd577f8c3b9d07026a4ad08637b_1280.jpg" 
             alt="Authentication process"
             className="w-full max-w-lg mx-auto aspect-[16/9] object-cover rounded-sm shadow-xl"
          />
        </div>
      </section>

      {/* Features Row */}
      <section className="py-16 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-gray-800">
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <Truck className="w-10 h-10 mb-4 text-accent" />
              <h3 className="font-serif text-xl font-bold mb-2">Free Shipping</h3>
              <p className="text-gray-400 text-sm">Complimentary express delivery on all orders over $500.</p>
            </div>
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <ShieldCheck className="w-10 h-10 mb-4 text-accent" />
              <h3 className="font-serif text-xl font-bold mb-2">Authentic Guarantee</h3>
              <p className="text-gray-400 text-sm">Every item is verified by our expert authentication team.</p>
            </div>
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <RefreshCcw className="w-10 h-10 mb-4 text-accent" />
              <h3 className="font-serif text-xl font-bold mb-2">Easy Returns</h3>
              <p className="text-gray-400 text-sm">14-day hassle-free return policy for peace of mind.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
