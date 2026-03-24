import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { X } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export function MobileMenu() {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useShop();

  const close = () => setIsMobileMenuOpen(false);

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/20"
            onClick={close}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed inset-y-0 right-0 z-[100] w-full lg:hidden bg-white overflow-y-auto"
          >
            <div className="container mx-auto px-6 relative">
              {/* Close button */}
              <button
                onClick={close}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-2xl text-gray-600 hover:text-black"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Nav items */}
              <nav className="mt-16 flex flex-col divide-y divide-gray-100">
                <Link href="/" onClick={close} className="flex items-center justify-between py-5">
                  <span className="text-[22px] font-black uppercase tracking-tight text-black">Home</span>
                </Link>
                <Link href="/collection/new-arrivals" onClick={close} className="flex items-center justify-between py-5">
                  <span className="text-[22px] font-black uppercase tracking-tight text-black">New Arrivals</span>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest ml-3">NEW</span>
                </Link>
                <Link href="/collection/bags" onClick={close} className="flex items-center justify-between py-5">
                  <span className="text-[22px] font-black uppercase tracking-tight text-black">Bags</span>
                </Link>
                <Link href="/collection/accessories" onClick={close} className="flex items-center justify-between py-5">
                  <span className="text-[22px] font-black uppercase tracking-tight text-black">Accessories</span>
                </Link>
                <Link href="/about" onClick={close} className="flex items-center justify-between py-5">
                  <span className="text-[22px] font-black uppercase tracking-tight text-black">About Us</span>
                </Link>
                <div className="flex items-center justify-between py-5">
                  <span className="text-[22px] font-black uppercase tracking-tight text-black">Collections +</span>
                </div>
                <div className="flex items-center justify-between py-5">
                  <span className="text-[22px] font-black uppercase tracking-tight text-black">Products +</span>
                </div>
                <div className="flex items-center justify-between py-5">
                  <span className="text-[22px] font-black uppercase text-[#E91E8C]">Special Price</span>
                </div>
                <div className="flex items-center justify-between py-5">
                  <span className="text-[22px] font-black italic text-[#CC0000]">GentlewomanUniverse</span>
                </div>
                <div className="flex items-center justify-between py-5">
                  <span className="text-[22px] font-black uppercase tracking-[0.2em] text-black">Gentle&nbsp; Littlewoman</span>
                </div>
              </nav>

              {/* Language toggle */}
              <div className="flex items-center gap-3 py-5 mt-2 border-t border-gray-100">
                <span className="text-sm font-black uppercase text-black">EN</span>
                <span className="text-gray-300">/</span>
                <span className="text-sm font-normal uppercase text-gray-400 cursor-pointer hover:text-black transition-colors">TH</span>
              </div>

              {/* Bottom links grid */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-gray-200 pt-6 mt-4">
                <Link href="/stores" onClick={close} className="text-xs uppercase tracking-widest font-semibold text-gray-700 hover:text-black transition-colors">Stores</Link>
                <Link href="/about" onClick={close} className="text-xs uppercase tracking-widest font-semibold text-gray-700 hover:text-black transition-colors">About Us</Link>
                <Link href="/partnership" onClick={close} className="text-xs uppercase tracking-widest font-semibold text-gray-700 hover:text-black transition-colors">Partnership</Link>
                <Link href="/supplier" onClick={close} className="text-xs uppercase tracking-widest font-semibold text-gray-700 hover:text-black transition-colors">Supplier Applications</Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
