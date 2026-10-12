import { useState } from "react";
import { Link } from "wouter";
import { Heart, ShoppingBag, ArrowUpRight } from "lucide-react";
import { Product } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { cn } from "@/lib/utils";
export function ProductCard({product,className}:{product:Product;className?:string}){
 const {addToCart,toggleWishlist,isWishlisted}=useShop();const saved=isWishlisted(product.id);const [added,setAdded]=useState(false);
 return <article className={cn("group min-w-0",className)} data-testid={`card-product-${product.id}`}>
  <div className="relative aspect-[.88] overflow-hidden rounded-[18px] bg-[#efeee8]">
   <Link href={`/product/${product.slug}`} className="absolute inset-0 z-[1]" aria-label={`View ${product.name}`}><img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"/></Link>
   <span className="absolute top-3 left-3 z-[2] rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.12em]">{product.tags.includes("limited drop")?"Limited drop":product.type}</span>
   <button onClick={()=>toggleWishlist(product)} aria-label={saved?"Remove from saved":"Save product"} className={cn("absolute top-3 right-3 z-[3] w-9 h-9 rounded-full bg-white/90 flex items-center justify-center transition-all hover:scale-105",saved?"text-[#df2c99]":"text-[#26252b]")}><Heart size={17} className={saved?"fill-current":""}/></button>
   <button onClick={()=>{addToCart(product);setAdded(true);window.setTimeout(()=>setAdded(false),1400);}} className="absolute z-[2] bottom-3 left-3 right-3 rounded-xl bg-white/95 py-3 text-xs font-bold flex items-center justify-center gap-2 sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all hover:bg-[#b2ed19]"><ShoppingBag size={15}/>{added?"Added to your bag":"Add to bag"}</button>
  </div>
  <Link href={`/product/${product.slug}`} className="block pt-3 px-1">
   <p className="text-[10px] uppercase tracking-[.14em] text-[#88858b] mb-1">{product.creator} <span className="text-[#d52d9a]">·</span> {product.category}</p>
   <div className="flex justify-between gap-2 items-start"><h3 className="font-semibold leading-snug text-[14px] group-hover:underline decoration-[#b2ed19] underline-offset-4">{product.name}</h3><ArrowUpRight size={15} className="text-[#aaa7a0] mt-0.5 shrink-0"/></div>
   <p className="mt-1.5 text-sm font-bold">${product.price.toFixed(2)}{product.compareAt&&<span className="ml-2 text-xs font-normal text-[#aaa] line-through">${product.compareAt.toFixed(2)}</span>}</p>
  </Link>
 </article>;
}
