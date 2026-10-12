import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Product } from "@/data/products";

export type CartItem = Product & { quantity: number };
type ShopContextType = {
  cart: CartItem[]; addToCart: (product:Product,quantity?:number)=>void; removeFromCart:(id:string)=>void; clearCart:()=>void;
  updateQuantity:(id:string,qty:number)=>void; wishlist:Product[]; toggleWishlist:(product:Product)=>void;
  isWishlisted:(id:string)=>boolean; cartTotal:number; cartCount:number; isCartOpen:boolean;
  setIsCartOpen:(open:boolean)=>void; isMobileMenuOpen:boolean; setIsMobileMenuOpen:(open:boolean)=>void;
};
const ShopContext = createContext<ShopContextType | undefined>(undefined);
function stored<T>(key:string, fallback:T):T {
  try { const value=localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; } catch { return fallback; }
}
export function ShopProvider({children}:{children:React.ReactNode}) {
  const [cart,setCart]=useState<CartItem[]>(()=>stored("arty_cart",[]));
  const [wishlist,setWishlist]=useState<Product[]>(()=>stored("arty_wishlist",[]));
  const [isCartOpen,setIsCartOpen]=useState(false);
  const [isMobileMenuOpen,setIsMobileMenuOpen]=useState(false);
  useEffect(()=>{localStorage.setItem("arty_cart",JSON.stringify(cart));},[cart]);
  useEffect(()=>{localStorage.setItem("arty_wishlist",JSON.stringify(wishlist));},[wishlist]);
  const addToCart=(product:Product,quantity=1)=>{setCart(prev=>{const found=prev.find(x=>x.id===product.id);return found?prev.map(x=>x.id===product.id?{...x,quantity:x.quantity+quantity}:x):[...prev,{...product,quantity}];});setIsCartOpen(true);};
  const removeFromCart=(id:string)=>setCart(p=>p.filter(x=>x.id!==id));
  const clearCart=()=>setCart([]);
  const updateQuantity=(id:string,qty:number)=>qty<1?removeFromCart(id):setCart(p=>p.map(x=>x.id===id?{...x,quantity:qty}:x));
  const toggleWishlist=(product:Product)=>setWishlist(p=>p.some(x=>x.id===product.id)?p.filter(x=>x.id!==product.id):[...p,product]);
  const value=useMemo(()=>({cart,addToCart,removeFromCart,clearCart,updateQuantity,wishlist,toggleWishlist,isWishlisted:(id:string)=>wishlist.some(p=>p.id===id),cartTotal:cart.reduce((n,p)=>n+p.price*p.quantity,0),cartCount:cart.reduce((n,p)=>n+p.quantity,0),isCartOpen,setIsCartOpen,isMobileMenuOpen,setIsMobileMenuOpen}),[cart,wishlist,isCartOpen,isMobileMenuOpen]);
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
export function useShop(){const context=useContext(ShopContext);if(!context)throw new Error("useShop must be used within ShopProvider");return context;}
