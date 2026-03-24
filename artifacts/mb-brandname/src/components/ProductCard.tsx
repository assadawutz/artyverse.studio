import React from "react";
import { Link } from "wouter";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const wishlisted = isWishlisted(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className={cn("group relative block", className)}>
      <div className="aspect-[3/4] overflow-hidden bg-secondary relative">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        
        {/* Invisible Link Overlay for clean HTML nesting */}
        <Link href={`/product/${product.slug}`} className="absolute inset-0 z-0" />

        {/* Sale Badge */}
        {product.compareAt && (
          <div className="absolute top-3 left-3 z-10 bg-destructive text-destructive-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1">
            Sale
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full text-foreground hover:bg-white hover:scale-110 transition-all shadow-sm"
          aria-label="Toggle wishlist"
        >
          <Heart className={cn("w-4 h-4 transition-colors", wishlisted ? "fill-black" : "")} />
        </button>

        {/* Add to Cart Bar */}
        <div className="absolute bottom-0 left-0 w-full z-10 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full bg-white/95 backdrop-blur-sm py-3 text-xs font-semibold tracking-widest text-primary hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            ADD TO CART
          </button>
        </div>
      </div>

      <Link href={`/product/${product.slug}`} className="mt-4 block cursor-pointer">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
          {product.category}
        </p>
        <h3 className="text-sm font-medium text-foreground leading-tight group-hover:underline underline-offset-4 decoration-border">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-1 text-sm">
          {product.compareAt ? (
            <>
              <span className="text-destructive font-semibold">${product.price}</span>
              <span className="text-muted-foreground line-through">${product.compareAt}</span>
            </>
          ) : (
            <span className="text-foreground">${product.price}</span>
          )}
        </div>
      </Link>
    </div>
  );
}
