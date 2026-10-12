import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, Check, Eye, Heart, PackageCheck, ShieldCheck, ShoppingBag, Sparkles, Star } from "lucide-react";
import { products } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { ProductCard } from "@/components/ProductCard";

export function Detail() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(product?.image || "");

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(product?.image || "");
    setQuantity(1);
    setAdded(false);
  }, [slug, product?.image]);

  if (!product) return <section className="arty-container py-24 text-center">
    <p className="text-xs font-bold uppercase tracking-[.2em] text-[#d52d9a]">Product not found</p>
    <h1 className="mt-3 text-3xl font-bold">That find has wandered off.</h1>
    <p className="mt-2 text-sm text-[#77747b]">No worries—there are plenty more curiosities to discover.</p>
    <Link href="/collection/all" className="arty-focus mt-6 inline-flex rounded-full bg-[#b2ed19] px-5 py-3 text-sm font-bold">Explore the marketplace</Link>
  </section>;

  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
  const saved = isWishlisted(product.id);
  const gallery = product.gallery.length ? product.gallery : [product.image];

  return <div className="arty-container">
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 py-5 text-xs text-[#858189]">
      <Link href="/" className="arty-focus hover:text-[#25242b]">Home</Link><span aria-hidden="true">/</span>
      <Link href={`/collection/${product.category}`} className="arty-focus capitalize hover:text-[#25242b]">{product.type}</Link><span aria-hidden="true">/</span>
      <span className="text-[#28272d]">{product.name}</span>
    </nav>

    <div className="grid gap-8 pb-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,.95fr)] lg:gap-14">
      <section aria-label="Product images" className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[72px_minmax(0,1fr)]">
        <div className="order-2 flex gap-2 overflow-x-auto sm:order-1 sm:flex-col">
          {gallery.map((image, index) => <button key={`${product.id}-detail-view-${index}`} onClick={() => setSelectedImage(image)} aria-label={`View product image ${index + 1}`} aria-pressed={selectedImage === image} data-testid={`button-detail-image-${index + 1}`} className={`arty-focus aspect-square w-[58px] shrink-0 overflow-hidden rounded-xl border-2 bg-[#efede3] sm:w-full ${selectedImage === image ? "border-[#a3d719]" : "border-transparent"}`}><img src={image} alt="" className="h-full w-full object-cover"/></button>)}
        </div>
        <Link href={`/preview/${product.slug}`} aria-label={`Open visual preview for ${product.name}`} data-testid="link-detail-preview" className="arty-focus product-artwork relative order-1 flex aspect-square items-center justify-center overflow-hidden rounded-[24px] bg-[#efeee8] sm:order-2 sm:aspect-[.9]">
          <img src={selectedImage || product.image} alt={`${product.name} by ${product.creator}`} className="h-full w-full object-contain p-2 transition-opacity duration-300 sm:p-4"/>
          <span className="absolute m-4 self-end justify-self-end inline-flex items-center gap-1.5 rounded-full bg-[#fffdf6]/95 px-3 py-2 text-xs font-bold shadow-sm"><Eye size={14}/> Open visual preview</span>
        </Link>
      </section>

      <section className="lg:pt-5">
        <p className="inline-flex rounded-full bg-[#e8f4c3] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.15em]">{product.type}</p>
        <p className="mt-5 text-xs uppercase tracking-[.16em] text-[#858189]">Made by <span className="font-bold text-[#28272d]">{product.creator}</span></p>
        <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight md:text-[42px]" data-testid={`text-product-name-${product.id}`}>{product.name}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-2" data-testid={`status-demo-rating-${product.id}`}>
          <div className="flex text-[#efab22]" aria-label={`Catalog demo rating ${product.rating.toFixed(1)} out of 5`}>{[1,2,3,4,5].map((star) => <Star key={star} size={14} fill="currentColor"/>)}</div>
          <span className="text-xs font-semibold">{product.rating.toFixed(1)}</span>
          <span className="text-xs text-[#88858b]">· {product.reviews} ratings in demo catalog</span>
        </div>
        <div className="mt-5 flex items-baseline gap-3">
          <span className="text-2xl font-bold" data-testid={`text-detail-price-${product.id}`}>${product.price.toFixed(2)}</span>
          {product.compareAt && <><span className="text-sm text-[#9b979e] line-through">${product.compareAt.toFixed(2)}</span><span className="text-xs font-bold text-[#d52d9a]">A little saving</span></>}
        </div>
        <p className="mt-5 leading-7 text-[#68656c]">{product.description}</p>
        <div className="mt-7 space-y-3 border-y border-[#e5e2da] py-5">{product.details.map((line) => <div key={line} className="flex gap-2 text-sm"><Check size={16} className="mt-0.5 shrink-0 text-[#729500]"/><span>{line}</span></div>)}</div>

        <div className="mt-6 flex gap-2">
          <div className="flex h-12 items-center rounded-xl border border-[#d8d5cc] bg-[#fffdf7]" aria-label="Quantity">
            <button aria-label="Decrease quantity" data-testid="button-quantity-decrease" className="arty-focus h-full rounded-l-xl px-4 hover:bg-[#f2f0e9]" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
            <span className="w-5 text-center text-sm" data-testid="text-quantity">{quantity}</span>
            <button aria-label="Increase quantity" data-testid="button-quantity-increase" className="arty-focus h-full rounded-r-xl px-4 hover:bg-[#f2f0e9]" onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          <button onClick={() => { addToCart(product, quantity); setAdded(true); window.setTimeout(() => setAdded(false), 1400); }} data-testid="button-detail-add-to-bag" className="arty-focus flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#b2ed19] px-3 text-sm font-bold transition-colors hover:bg-[#a2dc12]"><ShoppingBag size={17}/>{added ? "Added to bag" : `Add to bag · $${(product.price * quantity).toFixed(2)}`}</button>
          <button onClick={() => toggleWishlist(product)} aria-label={saved ? "Remove from wishlist" : "Save to wishlist"} aria-pressed={saved} data-testid="button-detail-wishlist" className={`arty-focus flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#d8d5cc] transition-colors ${saved ? "bg-[#fdeaf5] text-[#d52d9a]" : "bg-[#fffdf7] hover:bg-[#f7f4ec]"}`}><Heart className={saved ? "fill-current" : ""}/></button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="flex gap-3 rounded-xl border border-[#e9e6dd] bg-[#fffdf7] p-4"><ShieldCheck className="shrink-0 text-[#d52d9a]"/><div><b className="text-xs">Thoughtful maker details</b><p className="mt-1 text-[11px] leading-5 text-[#858189]">Item specifics are listed clearly, right from the creator.</p></div></div>
          <div className="flex gap-3 rounded-xl border border-[#e9e6dd] bg-[#fffdf7] p-4"><PackageCheck className="shrink-0 text-[#729500]"/><div><b className="text-xs">Demo marketplace</b><p className="mt-1 text-[11px] leading-5 text-[#858189]">{product.category === "digital" ? "Digital item details are noted above." : "Checkout and delivery details are part of this local demo."}</p></div></div>
        </div>
        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-[#f0eee7] p-4">
          <div className="arty-grad flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold">{product.creator.slice(0, 1)}</div>
          <div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#8a858a]">A note from the maker</p><b className="mt-1 block text-sm">{product.creator}</b><p className="mt-1 text-xs leading-5 text-[#6f6c71]">Independent creator bringing a little more color, curiosity, and care to everyday life.</p></div>
        </div>
      </section>
    </div>

    <section className="border-t border-[#e5e2da] py-10">
      <div className="grid gap-6 rounded-[24px] bg-[#eceee3] p-6 md:grid-cols-[.8fr_1.2fr] md:items-center md:p-9">
        <div><p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#d52d9a]"><Sparkles size={14}/> A note on ratings</p><h2 className="mt-2 text-2xl font-bold">Demo catalog data, plainly.</h2></div>
        <p className="text-sm leading-6 text-[#68656c]">The star score and rating count shown above are sample values attached to this local product catalog. ARTYVERSE does not process real orders or host verified customer reviews in this demo.</p>
      </div>
    </section>

    {related.length > 0 && <section className="border-t border-[#e5e2da] py-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#d52d9a]">Keep wandering</p><h2 className="mt-2 text-3xl font-bold">More from this orbit</h2></div>
        <Link href={`/collection/${product.category}`} className="arty-focus flex items-center gap-2 text-xs font-bold">See all <ArrowRight size={15}/></Link>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5">{related.map((item) => <ProductCard key={item.id} product={item}/>)}</div>
    </section>}
    <div className="pb-8"><Link href={`/collection/${product.category}`} className="arty-focus inline-flex items-center gap-2 text-xs font-semibold text-[#6f6c71]"><ArrowLeft size={14}/> Back to the collection</Link></div>
  </div>;
}
