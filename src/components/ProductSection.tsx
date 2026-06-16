import React, { useState, useMemo } from 'react';
import { PRODUCTS, IMAGES } from '../data';
import { Product, CartItem } from '../types';
import { Sparkles, Eye, ShoppingCart, ShoppingBag, Search, Check, Star, Filter, Heart } from 'lucide-react';

interface ProductSectionProps {
  onAddToCart: (product: Product, size?: string, color?: string) => void;
}

export default function ProductSection({ onAddToCart }: ProductSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cosmetics' | 'clothing'>('all');
  const [selectedDemographic, setSelectedDemographic] = useState<'All' | 'Women' | 'Men' | 'Kids' | 'Elders'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Quick View State
  const [activeQuickView, setActiveQuickView] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  
  // Flipkart Pincode check state
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  
  // Simple favorites / heart wishlist simulation
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(prod => {
      const matchCategory = selectedCategory === 'all' || prod.category === selectedCategory;
      const matchDemo = selectedDemographic === 'All' || prod.familyDemographic === selectedDemographic;
      const matchSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchDemo && matchSearch;
    });
  }, [selectedCategory, selectedDemographic, searchQuery]);

  // Featured lists (Peach Backed Section)
  const featuredProducts = useMemo(() => {
    return PRODUCTS.filter(p => p.isFeatured);
  }, []);

  const selectQuickviewItem = (product: Product) => {
    setActiveQuickView(product);
    setSelectedSize(product.sizes ? product.sizes[0] : '');
    setSelectedColor(product.colors ? product.colors[0] : '');
    setPincode('');
    setPincodeStatus(null);
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.trim().length !== 6) {
      setPincodeStatus("❌ Please enter active 6-digit postal pin-code.");
      return;
    }
    const digitSum = pincode.split('').reduce((sum, d) => sum + (parseInt(d, 10) || 0), 0);
    if (digitSum % 3 === 0) {
      setPincodeStatus("⚡ Super Saver Express: Free 1-Day Premium Delivery is active! Cash on Delivery (COD) enabled.");
    } else if (digitSum % 2 === 0) {
      setPincodeStatus("🚚 Vinshu Handloom Dispatch: Standard Free Delivery in 2-3 Days. Free COD active.");
    } else {
      setPincodeStatus("📦 Premium Velvet Box Delivery: Delivery in 4-5 Luxury Days. Secured prepaid dispatch.");
    }
  };

  return (
    <div id="catalog-section" className="scroll-mt-20">
      {/* SECTION 1: PRODUCT CATEGORIES (WHITE BACKGROUND) */}
      <section id="categories" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-pink-brand font-display block mb-2">Discover Our Dual Legacy</span>
          <h2 className="font-display text-3xl font-extrabold text-gray-800 mb-3">Harmonious Beauty & Style</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base mb-10">
            We seamlessly unify high-efficacy clinical-botanical skincare formula with breathable apparel collections designed to complement each other.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Category Card: Cosmetics */}
            <div 
              id="category-cosmetics-card"
              onClick={() => {
                setSelectedCategory('cosmetics');
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative rounded-3xl overflow-hidden h-72 sm:h-96 shadow-lg group cursor-pointer border border-pink-100 glow-pink"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-pink-brand/60 to-black/10 z-10 mix-blend-multiply group-hover:from-pink-brand/80 transition-all duration-300"></div>
              <img 
                src={IMAGES.cosmeticsHero} 
                alt="Luxury Cosmetics" 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 z-20 text-left">
                <span className="text-[11px] font-bold text-white uppercase tracking-widest bg-pink-500/80 self-start px-2.5 py-1 rounded-full mb-3 shadow-xs">
                  Premium Apothecary
                </span>
                <span className="font-display text-2xl sm:text-4xl font-extrabold text-white">
                  Vinshu Skincare & Cosmetics
                </span>
                <p className="text-pink-50 text-xs sm:text-sm mt-2 max-w-md">
                  Active serums, peach dewy lip highlights, calming oat barrier locks, and clay facial polishes. 100% hypoallergenic.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-white group-hover:translate-x-2 transition-transform">
                  <span>Explore Science & Botanical formulas</span>
                  <span>→</span>
                </div>
              </div>
            </div>

            {/* Category Card: Clothing */}
            <div 
              id="category-clothing-card"
              onClick={() => {
                setSelectedCategory('clothing');
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative rounded-3xl overflow-hidden h-72 sm:h-96 shadow-lg group cursor-pointer border border-pink-100 glow-peach"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-orange-400/50 to-black/10 z-10 mix-blend-multiply group-hover:from-orange-500/70 transition-all duration-300"></div>
              <img 
                src={IMAGES.fashionHero} 
                alt="Boutique Clothes" 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 z-20 text-left">
                <span className="text-[11px] font-bold text-white uppercase tracking-widest bg-yellow-600/80 self-start px-2.5 py-1 rounded-full mb-3 shadow-xs">
                  Luxe Apparel Loom
                </span>
                <span className="font-display text-2xl sm:text-4xl font-extrabold text-white">
                  Vinshu Apparel Closet
                </span>
                <p className="text-orange-50 text-xs sm:text-sm mt-2 max-w-md">
                  Premium French linen blazers, Mulberry silk flower wrap dresses, and toddler organic overall sets. Crafted with love.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-white group-hover:translate-x-2 transition-transform">
                  <span>Explore Garments Loom</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FEATURED PRODUCTS (SOFT PEACH BACKGROUND) */}
      <section id="featured" className="py-16 bg-pastel-pink/35 border-t border-b border-pink-100/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
            <div className="text-center sm:text-left">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-pink-brand font-display block">Aura of Grace</span>
              <h2 className="font-display text-3xl font-extrabold text-gray-800">Featured Masterpieces</h2>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-pink-100/80 shadow-xs text-xs font-bold text-pink-brand animate-pulse">
              <Sparkles className="w-4 h-4 text-gold-brand" />
              <span>Free Premium Giftbox with 2+ Items!</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((prod) => (
              <div 
                id={`featured-card-${prod.id}`}
                key={prod.id}
                className="bg-white rounded-2xl overflow-hidden shadow-xs border border-pink-100/50 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <button 
                    onClick={() => toggleWishlist(prod.id)}
                    className="absolute top-3 right-3 p-2 bg-white/70 backdrop-blur-md hover:bg-white rounded-full text-pink-brand border border-pink-100 cursor-pointer shadow-xs"
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(prod.id) ? 'fill-pink-brand text-pink-brand' : 'text-gray-400 hover:text-pink-brand'}`} />
                  </button>
                  {prod.badge && (
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-pink-brand to-peach-brand text-white text-[9px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                      {prod.badge}
                    </span>
                  )}
                </div>

                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                      <span className="text-pink-brand/80 font-display uppercase tracking-wider">{prod.type}</span>
                      <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full font-medium">{prod.familyDemographic}</span>
                    </div>
                    
                    {/* Title + Assured tag row */}
                    <div className="flex items-start justify-between gap-1 mt-0.5">
                      <h3 className="font-display font-bold text-gray-800 text-sm line-clamp-1 group-hover:text-pink-brand transition-colors flex-grow text-left">
                        {prod.name}
                      </h3>
                      {prod.vinshuAssured && (
                        <span className="inline-flex items-center gap-0.5 bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded-sm text-[9px] font-black tracking-tight border border-blue-100 shrink-0">
                          <span className="text-[8px] bg-blue-600 text-white font-extrabold px-0.5 rounded-sm">V</span> Assured
                        </span>
                      )}
                    </div>
                    
                    {/* Rating display */}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <div className="flex text-amber-400 shrink-0">
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <span className="text-xs font-bold text-gray-700">{prod.rating}</span>
                      <span className="text-[10px] text-gray-400">({prod.reviewsCount} reviews)</span>
                    </div>

                    {/* Stock Alert block */}
                    {prod.stockCount !== undefined && prod.stockCount <= 5 ? (
                      <span className="text-[10px] text-rose-600 font-extrabold block text-left mt-1.5 animate-pulse">
                        🔥 Hurry, only {prod.stockCount} left in stock!
                      </span>
                    ) : (
                      <span className="text-[10px] text-emerald-600 font-medium block text-left mt-1.5">✓ Instock & ready to dispatch</span>
                    )}
                  </div>

                  <div className="pt-3 mt-3 border-t border-dashed border-pink-100 flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-[10px] text-gray-400 block">Offer Price</span>
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="font-display font-extrabold text-base text-gray-850">${prod.price.toFixed(2)}</span>
                        {prod.originalPrice && (
                          <>
                            <span className="text-xs text-gray-400 line-through font-medium">${prod.originalPrice.toFixed(2)}</span>
                            <span className="text-[10px] text-emerald-600 font-extrabold">
                              {Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100)}% Off
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => selectQuickviewItem(prod)}
                      className="p-1.5 rounded-full hover:bg-pink-50 border border-pink-100 text-pink-brand transition-colors cursor-pointer"
                      title="Quick View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: ALL PRODUCTS (WHITE BACKGROUND WITH POWERFUL FILTERS) */}
      <section id="products" className="py-16 bg-white border-b border-pink-100/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-pink-brand font-display block mb-1">Our Wardrobe & Apothecary</span>
            <h2 className="font-display text-4xl font-extrabold text-gray-800">The Vinshu Boutique Shelf</h2>
          </div>

          {/* Filtering and Search Controls */}
          <div className="bg-pastel-pink/20 rounded-3xl p-5 border border-pink-100/50 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Filter Tabs by Category */}
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  { id: 'all', label: 'All Shelves' },
                  { id: 'cosmetics', label: 'Beauty & Cosmetics' },
                  { id: 'clothing', label: 'Family Clothing' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id as any)}
                    className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 cursor-pointer ${
                      selectedCategory === tab.id
                        ? 'bg-gradient-to-r from-pink-brand to-peach-brand text-white shadow-md'
                        : 'bg-white hover:bg-pink-50 text-gray-600 border border-pink-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Filter Tabs by Family Demographic */}
              <div className="flex flex-wrap gap-1.5 justify-center">
                <span className="text-xs font-bold text-gray-500 flex items-center mr-1 gap-1"><Filter className="w-3 h-3" /> Family:</span>
                {['All', 'Women', 'Men', 'Kids', 'Elders'].map((demo) => (
                  <button
                    key={demo}
                    onClick={() => setSelectedDemographic(demo as any)}
                    className={`px-3 py-1.5 text-[11px] font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                      selectedDemographic === demo
                        ? 'bg-pink-brand text-white font-bold shadow-xs'
                        : 'bg-white/80 hover:bg-pink-50 text-gray-600 border border-pink-100/70'
                    }`}
                  >
                    {demo}
                  </button>
                ))}
              </div>

              {/* Dynamic Search Box */}
              <div className="relative w-full lg:w-64">
                <input
                  type="text"
                  placeholder="Query ingredients, knit type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-pink-100 rounded-full py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-pink-brand text-gray-700"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>
          </div>

          {/* Catalog grid results */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-pastel-cream rounded-2xl border border-dashed border-pink-100 max-w-md mx-auto">
              <ShoppingBag className="w-12 h-12 text-pink-200 mx-auto mb-3" />
              <p className="text-gray-500 font-bold text-sm">No items match your specific query.</p>
              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedDemographic('All');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs font-bold text-pink-brand underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts.map((prod) => (
                <div 
                  id={`product-card-${prod.id}`}
                  key={prod.id}
                  className="bg-white rounded-3xl overflow-hidden border border-pink-100/45 hover:scale-[1.01] hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <button 
                      onClick={() => toggleWishlist(prod.id)}
                      className="absolute top-3.5 right-3.5 p-2 bg-white/80 backdrop-blur-md rounded-full text-pink-brand hover:bg-white border border-pink-100 cursor-pointer shadow-xs z-10"
                    >
                      <Heart className={`w-4 h-4 ${wishlist.includes(prod.id) ? 'fill-pink-brand text-pink-brand' : 'text-gray-400 hover:text-pink-brand'}`} />
                    </button>
                    {prod.badge && (
                      <span className="absolute top-3.5 left-3.5 bg-gradient-to-r from-pink-brand to-peach-brand text-white text-[9px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                        {prod.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                        <span className="text-pink-brand/80 font-display uppercase tracking-widest">{prod.type}</span>
                        <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full font-medium">{prod.familyDemographic}</span>
                      </div>
                      
                      {/* Title + Assured tag row */}
                      <div className="flex items-start justify-between gap-1 mt-0.5">
                        <h3 className="font-display font-bold text-gray-800 text-sm line-clamp-1 group-hover:text-pink-brand transition-colors text-left flex-grow">
                          {prod.name}
                        </h3>
                        {prod.vinshuAssured && (
                          <span className="inline-flex items-center gap-0.5 bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded-sm text-[8px] font-black tracking-tight border border-blue-100 shrink-0">
                            <span className="text-[7px] bg-blue-600 text-white font-extrabold px-0.5 rounded-sm">V</span> Assured
                          </span>
                        )}
                      </div>
                      
                      {/* Rating block */}
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <div className="flex text-amber-400 shrink-0">
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </div>
                        <span className="text-xs font-bold text-gray-700">{prod.rating}</span>
                        <span className="text-[10px] text-gray-400">({prod.reviewsCount} reviews)</span>
                      </div>

                      {/* Stock availability banner */}
                      {prod.stockCount !== undefined && prod.stockCount <= 5 ? (
                        <span className="text-[10px] lg:text-[11px] text-rose-600 font-extrabold block text-left mt-1.5 animate-pulse">
                          🔥 Only {prod.stockCount} left in stock!
                        </span>
                      ) : (
                        <span className="text-[10px] text-emerald-600 font-medium block text-left mt-1.5">✓ Ready at Warehouse</span>
                      )}

                      <p className="text-gray-500 text-xs mt-2 line-clamp-2 text-left">
                        {prod.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-pink-50 flex items-center justify-between">
                      <div className="text-left">
                        <span className="text-[9px] text-gray-400 block">Offer Price</span>
                        <div className="flex items-baseline gap-1 flex-wrap">
                          <span className="font-display font-black text-sm sm:text-base text-gray-850">${prod.price.toFixed(2)}</span>
                          {prod.originalPrice && (
                            <>
                              <span className="text-[10px] text-gray-400 line-through">${prod.originalPrice.toFixed(2)}</span>
                              <span className="text-[9px] text-emerald-600 font-black">
                                {Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100)}% Off
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => selectQuickviewItem(prod)}
                          className="bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-gray-600 px-2.5 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => onAddToCart(prod, prod.sizes?.[0], prod.colors?.[0])}
                          className="bg-gradient-to-r from-pink-brand to-peach-brand text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-xs hover:shadow-md cursor-pointer glow-pink"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Buy</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* QUICK VIEW DETAILS MODAL */}
      {activeQuickView && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto relative animate-float-slow shadow-2xl origin-center duration-300">
            {/* Close trigger */}
            <button
              onClick={() => setActiveQuickView(null)}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-pink-100 text-gray-700 hover:text-pink-brand p-2 rounded-full cursor-pointer transition-colors z-10"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Visual */}
              <div className="relative aspect-square md:aspect-auto h-72 md:h-full bg-gray-50">
                <img
                  src={activeQuickView.image}
                  alt={activeQuickView.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {activeQuickView.badge && (
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-pink-brand to-peach-brand text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                    {activeQuickView.badge}
                  </span>
                )}
              </div>

              {/* Product Spec Content */}
              <div className="p-6 md:p-8 flex flex-col justify-between text-left">
                <div>
                  <span className="text-xs font-extrabold uppercase text-pink-brand font-display tracking-widest">
                    Vinshu {activeQuickView.type}
                  </span>
                  <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-800 mt-1">
                    {activeQuickView.name}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(activeQuickView.rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-gray-700">{activeQuickView.rating}</span>
                    <span className="text-xs text-gray-400">({activeQuickView.reviewsCount} verified purchases)</span>
                  </div>

                  <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                    {activeQuickView.description}
                  </p>

                  {/* Dynamic Fields - SKINCARE INGREDIENTS */}
                  {activeQuickView.ingredients && (
                    <div className="mt-4">
                      <span className="text-xs font-bold text-gray-700 block mb-1">Key Active Ingredients:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeQuickView.ingredients.map((ing, i) => (
                          <span key={i} className="bg-pink-50/70 text-pink-700 text-[11px] px-2.5 py-1 rounded-full border border-pink-100/50">
                            ✨ {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dynamic Fields - APPAREL OPTIONS */}
                  {activeQuickView.sizes && (
                    <div className="mt-4">
                      <span className="text-xs font-bold text-gray-700 block mb-1.5">Select Boutique Size:</span>
                      <div className="flex gap-2">
                        {activeQuickView.sizes.map((sz) => (
                          <button
                            key={sz}
                            onClick={() => setSelectedSize(sz)}
                            className={`w-10 h-10 rounded-full border text-xs font-bold flex items-center justify-center cursor-pointer transition-all ${
                              selectedSize === sz
                                ? 'bg-pink-brand text-white border-pink-brand shadow-xs'
                                : 'bg-white border-gray-200 text-gray-600 hover:border-pink-300'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeQuickView.colors && (
                    <div className="mt-4">
                      <span className="text-xs font-bold text-gray-700 block mb-1.5">Select Color:</span>
                      <div className="flex gap-2">
                        {activeQuickView.colors.map((col) => (
                          <button
                            key={col}
                            onClick={() => setSelectedColor(col)}
                            className={`px-3 py-1.5 rounded-full border text-xs font-bold cursor-pointer transition-all ${
                              selectedColor === col
                                ? 'bg-peach-brand/20 border-orange-400 text-orange-700 shadow-xs'
                                : 'bg-white border-gray-200 text-gray-600 hover:border-peach-300'
                            }`}
                          >
                            {col}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Flipkart Styled Pincode Checker */}
                  <div className="mt-5 pt-4 border-t border-dashed border-gray-150">
                    <span className="text-xs font-bold text-gray-750 block mb-1.5">Check Delivery Pin Code:</span>
                    <div className="flex gap-2 max-w-sm">
                      <input
                        type="text"
                        placeholder="Enter 6-digit Pincode (e.g. 500001)"
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          setPincode(val);
                          setPincodeStatus(null);
                        }}
                        className="bg-neutral-50 border border-gray-200 focus:outline-none focus:border-pink-brand rounded-xl py-2 px-3 text-xs w-full text-gray-800 tracking-wider font-mono font-bold"
                      />
                      <button
                        type="button"
                        onClick={handleCheckPincode}
                        className="bg-gray-800 hover:bg-pink-brand text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer select-none transition-colors"
                      >
                        Check
                      </button>
                    </div>
                    {pincodeStatus && (
                      <p className={`text-[11px] font-bold mt-2 text-left p-2.5 rounded-lg border leading-tight ${pincodeStatus.startsWith('❌') ? 'text-red-500 bg-red-50 border-red-100' : 'text-emerald-700 bg-emerald-50 border-emerald-100'}`}>
                        {pincodeStatus}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-pink-50 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400 block">Total Luxury Value</span>
                    <span className="font-display font-extrabold text-2xl text-gray-800">${activeQuickView.price.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(activeQuickView, selectedSize, selectedColor);
                      setActiveQuickView(null);
                    }}
                    className="px-8 py-3.5 bg-gradient-to-r from-pink-brand via-pink-400 to-peach-brand text-white rounded-full font-display text-sm font-bold shadow-md hover:scale-102 active:scale-98 transition-all cursor-pointer glow-pink flex items-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Shopping Bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
