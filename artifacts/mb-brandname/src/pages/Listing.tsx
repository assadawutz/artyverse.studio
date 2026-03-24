import { useState, useMemo } from "react";
import { useParams } from "wouter";
import { SlidersHorizontal } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/utils";

const categoryBanners: Record<string, string> = {
  "new-arrivals": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80",
  "bags": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1600&q=80",
  "accessories": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=80",
  "default": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80",
};

const COLS_OPTIONS = [2, 3, 4] as const;

export function Listing() {
  const params = useParams();
  const rawCategory = params.category || "all";

  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [cols, setCols] = useState<2 | 3 | 4>(4);
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (rawCategory === "new-arrivals") {
      list = list.filter(p => p.tags.includes("new-arrivals"));
    } else if (rawCategory !== "all") {
      list = list.filter(p => p.category === rawCategory);
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [rawCategory, sort]);

  const pageTitle =
    rawCategory === "new-arrivals" ? "New Arrivals"
    : rawCategory === "all" ? "All Collections"
    : rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);

  const bannerImg = categoryBanners[rawCategory] || categoryBanners.default;
  const visible = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const gridClass = cn(
    "gap-x-4 gap-y-8",
    cols === 2 ? "grid grid-cols-2" :
    cols === 3 ? "grid grid-cols-2 sm:grid-cols-3" :
    "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
  );

  return (
    <div className="min-h-screen bg-white">

      {/* Category banner hero */}
      <section className="relative w-full h-[200px] md:h-[280px] overflow-hidden bg-gray-900">
        <img
          src={bannerImg}
          alt={pageTitle}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-widest drop-shadow-lg">
            {pageTitle}
          </h1>
        </div>
      </section>

      {/* Sorting / filter toolbar */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4 gap-4">
            <p className="text-xs text-gray-500">
              Showing {Math.min(visibleCount, filteredProducts.length)} of {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-6">
              <select
                value={sort}
                onChange={e => setSort(e.target.value as typeof sort)}
                className="text-xs uppercase tracking-widest border-none outline-none bg-transparent cursor-pointer text-gray-700 hover:text-black"
              >
                <option value="featured">DEFAULT SORTING</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>

              {/* Column switcher */}
              <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400">
                <span className="mr-1">VIEW</span>
                {COLS_OPTIONS.map(c => (
                  <button
                    key={c}
                    onClick={() => setCols(c)}
                    className={cn(
                      "w-6 h-6 flex items-center justify-center transition-colors",
                      cols === c ? "text-black font-bold" : "hover:text-black"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <button className="flex items-center gap-1 text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">FILTER</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="container mx-auto px-4 py-8 pb-24">
        {visible.length > 0 ? (
          <>
            <div className={gridClass}>
              {visible.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-16">
                <button
                  onClick={() => setVisibleCount(c => c + 12)}
                  className="border border-gray-400 text-xs uppercase tracking-widest px-8 py-3 hover:bg-black hover:text-white hover:border-black transition-colors"
                >
                  SHOW MORE
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-32">
            <p className="text-gray-400 text-sm uppercase tracking-widest">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
