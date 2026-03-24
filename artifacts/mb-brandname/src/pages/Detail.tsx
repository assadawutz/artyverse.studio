import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { Heart, ShoppingBag, ChevronRight, Star, Truck, ShieldCheck } from "lucide-react";
import { products } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { ProductCard } from "@/components/ProductCard";

export function Detail() {
  const { slug } = useParams();
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  
  const product = products.find(p => p.slug === slug);
  const [quantity, setQuantity] = useState(1);

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-serif mb-4">Product Not Found</h1>
        <Link href="/" className="text-primary underline">Return Home</Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase font-semibold text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/collection/${product.category}`} className="hover:text-foreground">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Main Product Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Images */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="aspect-[4/5] bg-secondary w-full overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="w-full lg:w-1/2 pt-8">
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold mb-3">
              {product.category}
            </p>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                {product.compareAt ? (
                  <>
                    <span className="text-2xl font-semibold text-destructive">${product.price}</span>
                    <span className="text-lg text-muted-foreground line-through">${product.compareAt}</span>
                  </>
                ) : (
                  <span className="text-2xl font-semibold text-foreground">${product.price}</span>
                )}
              </div>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-accent text-accent" />)}
                <span className="text-xs text-muted-foreground ml-1">(4.9/5)</span>
              </div>
            </div>

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Actions */}
            <div className="space-y-4 mb-12 border-y border-border py-8">
              <div className="flex items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-border h-14">
                  <button 
                    className="px-4 hover:bg-secondary transition-colors h-full"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >-</button>
                  <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                  <button 
                    className="px-4 hover:bg-secondary transition-colors h-full"
                    onClick={() => setQuantity(quantity + 1)}
                  >+</button>
                </div>

                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 h-14 bg-primary text-primary-foreground font-bold tracking-widest text-xs uppercase hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" /> Add To Cart
                </button>
                
                <button
                  onClick={() => toggleWishlist(product)}
                  className="h-14 w-14 border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted(product.id) ? "fill-primary" : ""}`} />
                </button>
              </div>
              
              {product.compareAt && (
                <p className="text-xs text-destructive font-medium">⚡ High demand: Only 3 items left in stock!</p>
              )}
            </div>

            {/* Features list */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-foreground">
                <ShieldCheck className="w-5 h-5 text-accent" />
                <span>100% Authentic Luxury Guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground">
                <Truck className="w-5 h-5 text-accent" />
                <span>Free Express Shipping Worldwide</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-secondary/30 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-center mb-12">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
