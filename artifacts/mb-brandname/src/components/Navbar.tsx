import { Link, useLocation } from "wouter";
import { Search, User, Heart, ShoppingBag, Menu } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const { cartCount, setIsCartOpen, setIsMobileMenuOpen } = useShop();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/collection/new-arrivals", label: "New Arrivals" },
    { href: "/collection/bags", label: "Bags" },
    { href: "/collection/accessories", label: "Accessories" },
    { href: "/about", label: "About us" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 lg:h-16">

          {/* Logo — LEFT */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-8 h-8 flex items-center justify-center text-gray-700 hover:text-black"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/" className="flex flex-col leading-none">
              <span className="text-xl font-bold tracking-tight text-black">m3</span>
              <span className="text-[9px] tracking-widest uppercase text-gray-500">MBbrandname</span>
            </Link>
          </div>

          {/* Desktop Nav — CENTER (absolute) */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm tracking-wide transition-colors",
                  location === link.href
                    ? "font-medium text-black underline underline-offset-4"
                    : "font-normal text-gray-800 hover:text-black"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons — RIGHT */}
          <div className="flex items-center gap-3 lg:gap-4">
            <button className="hidden sm:flex w-8 h-8 items-center justify-center text-gray-700 hover:text-black transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="hidden sm:flex w-8 h-8 items-center justify-center text-gray-700 hover:text-black transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-black transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-8 h-8 flex items-center justify-center text-gray-700 hover:text-black transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[9px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
