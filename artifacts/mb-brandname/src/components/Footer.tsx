import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#060606] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex flex-col items-start mb-6">
              <span className="text-3xl font-serif font-bold tracking-tighter leading-none text-white">
                m3
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mt-2">
                MBbrandname
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed pr-4">
              Curating the finest luxury fashion, jewelry, and accessories from around the world.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-widest uppercase mb-6 text-gray-200">Shop</h4>
            <ul className="space-y-4">
              <li><Link href="/collection/new-arrivals" className="text-gray-400 hover:text-white text-sm transition-colors">New Arrivals</Link></li>
              <li><Link href="/collection/bags" className="text-gray-400 hover:text-white text-sm transition-colors">Bags</Link></li>
              <li><Link href="/collection/accessories" className="text-gray-400 hover:text-white text-sm transition-colors">Accessories & Jewelry</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-widest uppercase mb-6 text-gray-200">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About Us</Link></li>
              <li><Link href="/stores" className="text-gray-400 hover:text-white text-sm transition-colors">Our Stores</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-widest uppercase mb-6 text-gray-200">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex border-b border-gray-700 pb-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent flex-1 text-sm outline-none placeholder:text-gray-600 text-white"
              />
              <button type="submit" className="text-[10px] tracking-widest uppercase font-bold text-gray-300 hover:text-white transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} MBbrandname. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
