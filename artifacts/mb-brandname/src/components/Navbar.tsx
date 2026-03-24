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
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-20">
          
          {/* Mobile Menu Trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-foreground hover:opacity-70 transition-opacity"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Logo */}
          <Link href="/" className="flex flex-col items-center justify-center group lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <span className="text-2xl md:text-3xl font-serif font-bold tracking-tighter leading-none group-hover:text-accent transition-colors">
              m3
            </span>
            <span className="text-[8px] md:text-[9px] tracking-[0.3em] uppercase text-muted-foreground mt-1">
              MBbrandname
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm tracking-wide transition-colors hover:text-foreground/70 relative",
                  location === link.href ? "text-foreground font-medium" : "text-foreground/80"
                )}
              >
                {link.label}
                {location === link.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-foreground" />
                )}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 text-foreground hover:opacity-70 transition-opacity hidden sm:block">
              <Search className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button className="p-2 text-foreground hover:opacity-70 transition-opacity hidden sm:block">
              <User className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button className="p-2 text-foreground hover:opacity-70 transition-opacity">
              <Heart className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              className="p-2 text-foreground hover:opacity-70 transition-opacity relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-0 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center border border-background">
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
