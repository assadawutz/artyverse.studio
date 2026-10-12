import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, Check, Eye, Heart, Maximize2, ShoppingBag, Sparkles } from "lucide-react";
import { products } from "@/data/products";
import { useShop } from "@/context/ShopContext";

export function Preview() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const [active, setActive] = useState(0);
  const [added, setAdded] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    setActive(0);
    setAdded(false);
  }, [slug]);

  if (!product) return <section className="arty-container py-24 text-center">
    <p className="text-xs font-bold uppercase tracking-[.2em] text-[#d52d9a]">Preview not found</p>
    <h1 className="mt-3 text-3xl font-bold">That little find wandered off.</h1>
    <p className="mt-2 text-sm text-[#77747b]">It may have moved. The whole collection is still right here.</p>
    <Link href="/collection/all" className="arty-focus mt-6 inline-flex rounded-full bg-[#b2ed19] px-5 py-3 text-sm font-bold">Explore everything</Link>
  </section>;

  const gallery = product.gallery.length ? product.gallery : [product.image];
  const saved = isWishlisted(product.id);
  const nextImage = () => setActive((index) => (index + 1) % gallery.length);
  const prevImage = () => setActive((index) => (index - 1 + gallery.length) % gallery.length);

  return <div className="arty-container pb-14">
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 py-5 text-xs text-[#858189]">
      <Link href={`/collection/${product.category}`} className="arty-focus inline-flex items-center gap-1 hover:text-[#25242b]"><ArrowLeft size={14}/> Back to {product.type}</Link>
      <span aria-hidden="true">/</span><span className="truncate text-[#28272d]">{product.name}</span>
    </nav>
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,.65fr)] lg:gap-12">
      <section aria-label="Product visual preview" className="min-w-0">
        <div className="preview-stage relative flex aspect-[1/1] min-h-[330px] items-center justify-center overflow-hidden rounded-[28px] border border-[#e7e3d8] sm:aspect-[1.15/1]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,.63),transparent_68%)]"/>
          <img key={gallery[active]} src={gallery[active]} alt={`${product.name} preview ${active + 1} of ${gallery.length}`} className="relative z-[1] h-full w-full object-contain p-5 transition-opacity duration-300 sm:p-10" data-testid={`img-preview-${product.id}`}/>
          <button type="button" onClick={prevImage} aria-label="Previous preview image" data-testid="button-preview-previous" className="arty-focus absolute left-3 top-1/2 z-[2] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#fffdf6]/90 shadow-sm hover:bg-white"><ArrowLeft size={18}/></button>
          <button type="button" onClick={nextImage} aria-label="Next preview image" data-testid="button-preview-next" className="arty-focus absolute right-3 top-1/2 z-[2] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#fffdf6]/90 shadow-sm hover:bg-white"><ArrowRight size={18}/></button>
          <div className="absolute bottom-4 left-1/2 z-[2] flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#fffdf6]/90 px-3 py-2 shadow-sm" aria-label={`Image ${active + 1} of ${gallery.length}`}>
            {gallery.map((image, index) => <button key={`${product.id}-preview-dot-${index}`} onClick={() => setActive(index)} aria-label={`Show preview image ${index + 1}`} aria-current={active === index} data-testid={`button-preview-image-${index + 1}`} className={`arty-focus h-2 rounded-full transition-all ${active === index ? "w-6 bg-[#d52d9a]" : "w-2 bg-[#c8c4b9] hover:bg-[#817d74]"}`} />)}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3" aria-label="Choose a product view">
          {gallery.map((image, index) => <button key={`${product.id}-preview-thumb-${index}`} onClick={() => setActive(index)} aria-label={`View ${product.name}, image ${index + 1}`} aria-pressed={active === index} data-testid={`button-preview-thumb-${index + 1}`} className={`arty-focus aspect-square overflow-hidden rounded-2xl border-2 bg-[#efede3] transition-colors ${active === index ? "border-[#a3d719]" : "border-transparent hover:border-[#d5d1c5]"}`}><img src={image} alt="" className="h-full w-full object-cover"/></button>)}
        </div>
      </section>
      <aside className="lg:sticky lg:top-8 lg:self-start">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f4c3] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.14em]"><Eye size={13}/>{product.type} · Visual preview</p>
        <p className="mt-5 text-xs uppercase tracking-[.16em] text-[#858189]">A find by <span className="font-bold text-[#28272d]">{product.creator}</span></p>
        <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight md:text-[42px]" data-testid={`text-preview-name-${product.id}`}>{product.name}</h1>
        <p className="mt-4 text-sm leading-7 text-[#68656c]">{product.description}</p>
        <div className="mt-6 flex items-baseline gap-3"><span className="text-2xl font-bold">${product.price.toFixed(2)}</span>{product.compareAt && <span className="text-sm text-[#9b979e] line-through">${product.compareAt.toFixed(2)}</span>}</div>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button onClick={() => { addToCart(product); setAdded(true); window.setTimeout(() => setAdded(false), 1400); }} data-testid="button-preview-add-to-bag" className="arty-focus flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#b2ed19] px-5 text-sm font-bold transition-colors hover:bg-[#a2dc12]"><ShoppingBag size={17}/>{added ? "Added to your bag" : `Add to bag · $${product.price.toFixed(2)}`}</button>
          <button onClick={() => toggleWishlist(product)} aria-label={saved ? "Remove from wishlist" : "Save to wishlist"} aria-pressed={saved} data-testid="button-preview-wishlist" className={`arty-focus flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#d8d5cc] px-4 text-sm font-semibold transition-colors ${saved ? "bg-[#fdeaf5] text-[#d52d9a]" : "bg-white hover:bg-[#f7f4ec]"}`}><Heart size={17} className={saved ? "fill-current" : ""}/><span className="sm:hidden">{saved ? "Saved" : "Save"}</span></button>
        </div>
        <Link href={`/product/${product.slug}`} data-testid="link-preview-details" className="arty-focus mt-3 flex min-h-12 items-center justify-between rounded-xl border border-[#dedbd2] bg-[#fffdf7] px-4 text-sm font-bold transition-colors hover:bg-white">
          <span className="flex items-center gap-2"><Maximize2 size={16} className="text-[#d52d9a]"/> See full product details</span><ArrowRight size={16}/>
        </Link>
        <div className="mt-6 rounded-2xl border border-[#e6e2d8] bg-[#fffdf7] p-5">
          <div className="flex items-center gap-2"><Sparkles size={16} className="text-[#d52d9a]"/><h2 className="text-sm font-bold">A closer look</h2></div>
          <ul className="mt-4 space-y-3">{product.details.slice(0, 3).map((line) => <li key={line} className="flex gap-2 text-sm leading-5 text-[#58565c]"><Check size={15} className="mt-0.5 shrink-0 text-[#729500]"/>{line}</li>)}</ul>
          <p className="mt-4 border-t border-[#ece8df] pt-3 text-[11px] leading-5 text-[#858189]">You’re viewing artwork supplied with this demo catalog. Format and item specifics are listed on the detail page.</p>
        </div>
      </aside>
    </div>
  </div>;
}
