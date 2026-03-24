import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#060606] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Col 1: Logo + address + social */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex flex-col leading-none mb-5">
              <span className="text-2xl font-bold tracking-tight text-white">m3</span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-gray-500 mt-0.5">MBbrandname</span>
            </Link>
            <address className="not-italic text-xs text-gray-400 leading-relaxed mb-5 space-y-1">
              <p>1418 River Drive, Suite 35 Cottonhall, Ca 9522</p>
              <p>United States</p>
              <a href="mailto:sale@mbbrand.com" className="hover:text-white transition-colors block">sale@mbbrand.com</a>
              <a href="tel:+12463450695" className="hover:text-white transition-colors block">+1 246-345-0695</a>
            </address>
            <div className="flex items-center gap-4 text-gray-500">
              <a href="#" aria-label="Facebook" className="hover:text-white transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" aria-label="Twitter" className="hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" aria-label="Instagram" className="hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" aria-label="Youtube" className="hover:text-white transition-colors"><Youtube className="w-4 h-4" /></a>
              <a href="#" aria-label="Pinterest" className="hover:text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.03-2.83.19-.77 1.25-5.32 1.25-5.32s-.32-.64-.32-1.58c0-1.48.86-2.58 1.93-2.58.91 0 1.35.68 1.35 1.5 0 .92-.58 2.29-.88 3.56-.25 1.06.53 1.92 1.57 1.92 1.88 0 3.14-2.4 3.14-5.24 0-2.16-1.46-3.78-4.1-3.78-2.98 0-4.84 2.23-4.84 4.73 0 .86.25 1.47.64 1.94.18.21.2.3.14.54-.05.17-.15.59-.2.76-.07.25-.28.34-.51.25-1.4-.58-2.05-2.13-2.05-3.87 0-2.89 2.43-6.35 7.25-6.35 3.88 0 6.44 2.82 6.44 5.85 0 4.01-2.22 7.01-5.5 7.01-1.1 0-2.13-.59-2.48-1.26l-.68 2.59c-.25.95-.91 2.15-1.36 2.88.56.17 1.14.26 1.74.26 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: COMPANY */}
          <div>
            <h4 className="text-[10px] font-bold tracking-widest uppercase mb-5 text-white">COMPANY</h4>
            <ul className="space-y-3">
              {["About Us", "Careers", "Affiliates", "Blog", "Contact Us"].map(item => (
                <li key={item}>
                  <Link href="#" className="text-xs text-gray-400 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: SHOP */}
          <div>
            <h4 className="text-[10px] font-bold tracking-widest uppercase mb-5 text-white">SHOP</h4>
            <ul className="space-y-3">
              <li><Link href="/collection/new-arrivals" className="text-xs text-gray-400 hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link href="/collection/accessories" className="text-xs text-gray-400 hover:text-white transition-colors">Accessories</Link></li>
              <li><Link href="/collection/bags" className="text-xs text-gray-400 hover:text-white transition-colors">Bags</Link></li>
            </ul>
          </div>

          {/* Col 4: HELP */}
          <div>
            <h4 className="text-[10px] font-bold tracking-widest uppercase mb-5 text-white">HELP</h4>
            <ul className="space-y-3">
              {["Customer Service", "My Account", "Find a Store", "Legal & Privacy", "Contact", "Gift Card"].map(item => (
                <li key={item}>
                  <Link href="#" className="text-xs text-gray-400 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: OPENING TIME */}
          <div>
            <h4 className="text-[10px] font-bold tracking-widest uppercase mb-5 text-white">OPENING TIME</h4>
            <ul className="space-y-3 text-xs text-gray-400">
              <li>Mon – Fri: 9AM – 9PM</li>
              <li>Sat: 9 AM – 8 PM</li>
              <li>Sun: Closed</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">©{new Date().getFullYear()} MBbrandname</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>United Kingdom</span>
            <span className="text-gray-700">|</span>
            <span>English</span>
            <span className="text-gray-700">|</span>
            <span>$ USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
