import { useState, useMemo } from "react";
import { useParams } from "wouter";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export function Listing() {
  const params = useParams();
  const rawCategory = params.category || "all";
  
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (rawCategory === "new-arrivals") {
      list = list.filter(p => p.tags.includes("new-arrivals"));
    } else if (rawCategory !== "all") {
      list = list.filter(p => p.category === rawCategory);
    }

    if (sort === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    }
    return list;
  }, [rawCategory, sort]);

  const pageTitle = rawCategory === "new-arrivals" 
    ? "New Arrivals" 
    : rawCategory === "all" 
      ? "All Collections" 
      : rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);

  return (
    <div className="min-h-screen bg-background pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center py-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">{pageTitle}</h1>
          <div className="w-16 h-0.5 bg-accent mx-auto" />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6 border-b border-border mb-8 gap-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} result{filteredProducts.length !== 1 && 's'}
          </p>

          <div className="flex items-center gap-4">
            <label className="text-sm text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Sort By:</label>
            <select 
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="text-sm border border-border bg-transparent py-2 px-4 outline-none focus:border-primary transition-colors cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <h3 className="text-xl font-serif text-muted-foreground">No products found in this category.</h3>
          </div>
        )}

      </div>
    </div>
  );
}
