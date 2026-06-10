import React from 'react';
import { IMAGES } from '../data';
import { ShieldCheck, Heart, Sparkles, Smile } from 'lucide-react';

export default function AboutSection() {
  const pillars = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-pink-brand" />,
      title: "Dermal Integrity",
      desc: "All skincare is clinically formulated with pure bioactive botanicals, zero paraben toxins, and is completely pediatrician & dermatologist approved."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-gold-brand" />,
      title: "Artisanal Looms",
      desc: "Apparel handwoven with eco-friendly French flax linens, Grade-A mulberry silks, and GOTS-certified baby-safe organic combed cotton."
    },
    {
      icon: <Smile className="w-5 h-5 text-emerald-500" />,
      title: "Timeless Inclusivity",
      desc: "An exceptional, thoughtful line meticulously designed for four active generations: from lively toddlers, parents, up to graceful elders."
    }
  ];

  return (
    <section id="about" className="py-16 bg-pastel-pink/40 border-b border-pink-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-5 relative">
            {/* Background design glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-200 to-peach-brand/40 opacity-30 blur-2xl rounded-full scale-95"></div>
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white glow-pink">
              <img
                src={IMAGES.familyBrand}
                alt="Vinshu Family Heritage"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-5 py-4 rounded-2xl border border-pink-100 text-left">
                <span className="text-[10px] uppercase tracking-widest text-pink-brand font-bold font-display">Est. 2026 Boutique</span>
                <p className="text-gray-800 text-sm font-semibold mt-0.5">"Nurtures your skin, wraps your soul across all ages."</p>
              </div>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6 text-left lg:pl-4">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-pink-brand font-display block">A Legacy of Comfort</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-800 leading-tight">
              Crafting Harmony for Every Generation
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              At **Vinshu Beauty N Clothing Brand**, we believe beautiful self-care and rich dressing shouldn’t be fragmented. We arose from a single mission: to design a lifestyle house where a mother, children, father, and grandparents can discover premium garments and safe botanical cosmetics under one roof.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Every moisturizer we refine is tested for sensitive skin. Every knit garment is sewn to facilitate breezy motion and timeless elegance. We celebrate family longevity, beauty preservation, and custom artisanal luxury.
            </p>

            {/* List of Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-pink-100">
              {pillars.map((pil, idx) => (
                <div key={idx} className="space-y-2 bg-white/80 p-4 rounded-2xl border border-pink-100/50 shadow-xs">
                  <div className="p-2 bg-pink-50 rounded-xl self-start inline-block">
                    {pil.icon}
                  </div>
                  <h3 className="font-display font-bold text-gray-850 text-xs sm:text-sm">
                    {pil.title}
                  </h3>
                  <p className="text-gray-500 text-[11px] leading-relaxed">
                    {pil.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
