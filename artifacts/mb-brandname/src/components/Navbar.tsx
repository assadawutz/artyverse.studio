import { Link, useLocation } from "wouter";
import { Heart, Menu, Search, ShoppingBag, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { useShop } from "@/context/ShopContext";
import { cn } from "@/lib/utils";

const links=[["New drops","/collection/new-arrivals"],["Digital","/collection/digital"],["Art & prints","/collection/art"],["Figures","/collection/figure"],["Creator goods","/collection/merch"]];
export function Navbar(){
 const [location,setLocation]=useLocation(); const [searchOpen,setSearchOpen]=useState(false); const [query,setQuery]=useState("");
 const {cartCount,setIsCartOpen,setIsMobileMenuOpen,wishlist}=useShop();
 return <header className="sticky top-0 z-50 border-b border-[#e8e5dc] bg-[#fbfaf6]/95 backdrop-blur-xl">
  <div className="h-8 bg-[#17171d] text-white flex items-center justify-center text-[10px] tracking-[.17em] uppercase">A good day to find something different <Sparkles size={12} className="text-lime-300 ml-2"/></div>
  <div className="arty-container flex h-[68px] items-center justify-between gap-4">
   <div className="flex items-center gap-3">
    <button className="md:hidden p-2" aria-label="Open menu" onClick={()=>setIsMobileMenuOpen(true)}><Menu size={21}/></button>
    <Link href="/" className="flex items-center gap-2" aria-label="ARTYVERSE home"><span className="w-8 h-8 arty-grad rounded-lg flex items-center justify-center font-bold text-xl">A</span><span className="arty-wordmark text-[21px]">ARTYVERSE</span></Link>
   </div>
   <nav className="hidden md:flex items-center gap-6 xl:gap-8">{links.map(([label,href])=><Link key={href} href={href} className={cn("text-[12px] font-semibold transition-colors hover:text-[#d31c91]",location===href?"text-[#d31c91]":"text-[#55545a]")}>{label}</Link>)}</nav>
   <div className="flex items-center gap-1">
    <button className="p-2.5 hover:bg-[#f0eee6] rounded-full" aria-label="Search products" onClick={()=>setSearchOpen(v=>!v)}><Search size={19}/></button>
    <Link href="/wishlist" aria-label="Saved products" className="relative p-2.5 hover:bg-[#f0eee6] rounded-full"><Heart size={19}/>{wishlist.length>0&&<i className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#ee2da0]"/>}</Link>
    <button className="relative p-2.5 hover:bg-[#f0eee6] rounded-full" aria-label="Open cart" onClick={()=>setIsCartOpen(true)}><ShoppingBag size={19}/>{cartCount>0&&<span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 rounded-full bg-[#b2ed19] text-[9px] font-bold flex items-center justify-center px-1">{cartCount}</span>}</button>
   </div>
  </div>
  {searchOpen&&<form className="arty-container pb-4 flex gap-2" onSubmit={e=>{e.preventDefault();setLocation(`/collection/all?q=${encodeURIComponent(query)}`);setSearchOpen(false);}}><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search the universe…" className="flex-1 bg-white border border-[#dedbd2] rounded-xl px-4 py-3 outline-none focus:ring-2 ring-lime-300"/><button className="bg-[#b2ed19] px-5 rounded-xl font-bold">Search</button><button type="button" onClick={()=>setSearchOpen(false)} className="p-2" aria-label="Close search"><X size={18}/></button></form>}
 </header>;
}
