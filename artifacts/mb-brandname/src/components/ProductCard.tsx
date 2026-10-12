import { useState } from "react";
import { Link } from "wouter";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { cn } from "@/lib/utils";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const saved = isWishlisted(product.id);
  const [added, setAdded] = useState(false);
  return <article className={cn("group min-w-0", className)} data-testid={`card-product-${product.id}`}>
    <Link href={`/preview/${product.slug}`} className="arty-focus product-artwork block aspect-[.91] overflow-hidden rounded-[20px] bg-[#efeee8]" aria-label={`Preview ${product.name}`} data-testid={`link-preview-${product.id}`}>
      <img src={product.image} alt={`${product.name}, ${product.type} by ${product.creator}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"/>
    </Link>
    <div className="px-1 pt-3">
      <p className="mb-1 text-[10px] uppercase tracking-[.14em] text-[#88858b]">{product.creator} <span className="text-[#d52d9a]">·</span> {product.type}</p>
      <Link href={`/product/${product.slug}`} className="arty-focus block rounded-sm" data-testid={`link-detail-${product.id}`}>
        <div className="flex items-start justify-between gap-2"><h3 className="text-[14px] font-semibold leading-snug group-hover:underline decoration-[#b2ed19] underline-offset-4">{product.name}</h3><span className="shrink-0 text-[9px] font-bold uppercase tracking-[.08em] text-[#99959b]">{product.category}</span></div>
        <p className="mt-1.5 text-sm font-bold" data-testid={`text-price-${product.id}`}>${product.price.toFixed(2)}{product.compareAt && <span className="ml-2 text-xs font-normal text-[#aaa] line-through">${product.compareAt.toFixed(2)}</span>}</p>
      </Link>
      <div className="mt-3 flex items-center gap-2">
        <Link href={`/preview/${product.slug}`} data-testid={`button-open-preview-${product.id}`} className="arty-focus inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#dedbd2] bg-[#fffdf7] px-2 text-[11px] font-bold transition-colors hover:bg-[#f4f2e9]"><Eye size={14}/> Preview</Link>
        <button onClick={() => { addToCart(product); setAdded(true); window.setTimeout(() => setAdded(false), 1400); }} data-testid={`button-add-${product.id}`} className="arty-focus inline-flex min-h-10 flex-[1.25] items-center justify-center gap-1.5 rounded-xl bg-[#b2ed19] px-2 text-[11px] font-bold transition-colors hover:bg-[#a2dc12]"><ShoppingBag size={14}/>{added ? "Added" : "Add to bag"}</button>
        <button onClick={() => toggleWishlist(product)} aria-label={saved ? "Remove from saved" : `Save ${product.name}`} aria-pressed={saved} data-testid={`button-wishlist-${product.id}`} className={cn("arty-focus flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#dedbd2] bg-[#fffdf7] transition-colors hover:bg-[#fdeaf5]", saved ? "text-[#df2c99]" : "text-[#26252b]")}><Heart size={16} className={saved ? "fill-current" : ""}/></button>
      </div>
    </div>
  </article>;
}
