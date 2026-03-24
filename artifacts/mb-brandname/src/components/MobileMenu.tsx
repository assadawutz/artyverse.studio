import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { X } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useShop();
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/collection/new-arrivals", label: "New Arrivals", badge: "NEW" },
    { href: "/collection/bags", label: "Bags" },
    { href: "/collection/accessories", label: "Accessories" },
  ];

  const bottomLinks = [
    { href: "/stores", label: "Stores" },
    { href: "/about", label: "About Us" },
    { href: "/partnership", label: "Partnership" },
    { href: "/careers", label: "Careers" },
  ];

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[100] w-full max-w-sm bg-background shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-serif font-bold text-xl">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 bg-secondary rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <nav className="flex flex-col py-6">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between py-4 px-6 text-[22px] font-black uppercase tracking-tight border-b border-border/50",
                      location === link.href ? "text-accent" : "text-foreground hover:text-accent transition-colors"
                    )}
                  >
                    {link.label}
                    {link.badge && (
                      <span className="text-[10px] font-bold tracking-widest bg-muted text-muted-foreground px-2 py-1 rounded">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>

              <div className="px-6 py-8">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {bottomLinks.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                
                <div className="mt-12 flex gap-4 text-sm font-bold">
                  <span className="text-foreground">EN</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">TH</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
