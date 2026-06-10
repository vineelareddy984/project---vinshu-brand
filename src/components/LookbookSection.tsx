import React, { useState } from 'react';
import { IMAGES } from '../data';
import { Sparkles, Heart, Eye } from 'lucide-react';

export default function LookbookSection() {
  const [activeTab, setActiveTab] = useState<'All' | 'Skincare' | 'Sartorial'>('All');

  const galleryItems = [
    {
      id: 1,
      tag: "Sartorial",
      title: "Mulberry Blossom Silk Coordinates",
      image: IMAGES.heroBanner,
      desc: "Styled for afternoon high tea and luxury gatherings."
    },
    {
      id: 2,
      tag: "Skincare",
      title: "Bio-Active Rose Elixir Ceremony",
      image: IMAGES.cosmeticsHero,
      desc: "Nourishes deeply under direct golden evening light."
    },
    {
      id: 3,
      tag: "Sartorial",
      title: "French Flax Linen Tailoring Set",
      image: IMAGES.fashionHero,
      desc: "Lightweight, breathable linen matching father & grandfather style."
    },
    {
      id: 4,
      tag: "Sartorial",
      title: "Multigenerational Comfort Lounge",
      image: IMAGES.familyBrand,
      desc: "Pastel peach knit cardigans wrapping four generations of love."
    }
  ];

  const filteredItems = galleryItems.filter(item => {
    if (activeTab === 'All') return true;
    return item.tag === activeTab;
  });

  return (
    <section id="portfolio" className="py-16 bg-white border-b border-pink-100/35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-pink-brand font-display block mb-1">Visual Masterpiece Directory</span>
          <h2 className="font-display text-4xl font-extrabold text-gray-800">Our Seasonal Lookbook</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-xs sm:text-sm mt-1">
            Browse styled portraits demonstrating how our botanical dermal finishes coordinate elegantly with our premium GOTS-certified luxury looms.
          </p>

          {/* Filter Tab controls */}
          <div className="flex justify-center gap-1.5 mt-6">
            {(['All', 'Skincare', 'Sartorial'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4.5 py-1.5 text-xs font-bold rounded-full transition-all duration-300 cursor-pointer ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-pink-brand to-peach-brand text-white shadow-xs'
                    : 'bg-neutral-50 hover:bg-neutral-100 text-gray-600 border border-neutral-200'
                }`}
              >
                {tab === 'Sartorial' ? 'Handcrafted Wardrobe' : tab === 'Skincare' ? 'Apothecary' : 'All Masterworks'}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div 
              id={`portfolio-item-${item.id}`}
              key={item.id}
              className="bg-neutral-50 rounded-3xl overflow-hidden group border border-pink-100 transition-transform duration-300 hover:scale-[1.01] hover:shadow-lg flex flex-col justify-between"
            >
              <div className="relative aspect-3/4 overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual hover effect */}
                <div className="absolute inset-0 bg-pink-brand/10 opacity-0 group-hover:opacity-15 transition-opacity"></div>
                
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-pink-brand font-display text-[9px] uppercase font-extrabold tracking-widest px-2.5 py-1 rounded-full border border-pink-100 shadow-xs">
                  ★ {item.tag}
                </span>
              </div>

              <div className="p-5 text-left bg-white">
                <h3 className="font-display font-bold text-sm text-gray-800 line-clamp-1">{item.title}</h3>
                <p className="text-gray-500 text-[11px] mt-1 leading-relaxed line-clamp-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
