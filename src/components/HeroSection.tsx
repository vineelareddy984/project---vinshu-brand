import React, { useState, useEffect } from 'react';
import { IMAGES } from '../data';
import { ArrowRight, Sparkles, Heart, Smile } from 'lucide-react';

interface HeroSectionProps {
  onNavigateToProducts: () => void;
  onNavigateToQuiz: () => void;
}

export default function HeroSection({ onNavigateToProducts, onNavigateToQuiz }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Where Bright Aesthetics Meet Supreme Family Luxury",
      subtitle: "VINSHU BEAUTY N CLOTHING BRAND",
      description: "Discover a premium, light-filled showcase of bio-active clinical skincare, dewy makeup tints, and custom handwoven apparel tailored exquisitely for women, men, kids, and elders.",
      image: IMAGES.heroBanner,
      badge: "SKINCARE & FASHION UNIFIED",
      ctaPrimary: "Explore Bestsellers",
      ctaSecondary: "Virtual Style Quiz",
      bgGradient: "from-pink-50/70 via-peach-50/50 to-lavender-50/40"
    },
    {
      title: "Designed For Every Generation Of Your Family",
      subtitle: "TIMELESS STYLE, DERMAL PURITY",
      description: "From certified organic cotton toddler overalls to luxury Mongolian cashmere sweaters for elders, Vinshu brings premium, non-toxic products designed to spark family warmth.",
      image: IMAGES.familyBrand,
      badge: "FOUR GENERATIONS OF ELEGANCE",
      ctaPrimary: "Fittings & Consultation",
      ctaSecondary: "Boutique Collection",
      bgGradient: "from-peach-50/70 via-pink-50/50 to-mint-brand/10"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-bg-brand to-white">
      {/* Floating abstract decorative objects */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-100 rounded-full blur-3xl opacity-65 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-44 h-44 bg-peach-brand/20 rounded-full blur-3xl opacity-75 animate-bounce" style={{ animationDuration: '12s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-36 h-36 bg-lavender-brand/15 rounded-full blur-2xl opacity-60"></div>
      
      {/* Floating flower elements for boutique feel */}
      <div className="hidden lg:block absolute top-[15%] left-[5%] animate-float pointer-events-none">
        <div className="w-6 h-6 bg-pink-brand/30 rounded-full border border-pink-brand/60 flex items-center justify-center text-[10px] text-pink-brand font-bold backdrop-blur-xs shadow-xs">🌸</div>
      </div>
      <div className="hidden lg:block absolute bottom-[25%] left-[45%] animate-float pointer-events-none" style={{ animationDelay: '2s' }}>
        <div className="w-8 h-8 bg-peach-brand/40 rounded-full border border-peach-brand/70 flex items-center justify-center text-xs text-orange-600 font-bold backdrop-blur-xs shadow-xs">✨</div>
      </div>
      <div className="hidden lg:block absolute top-[25%] right-[8%] animate-float pointer-events-none" style={{ animationDelay: '4s' }}>
        <div className="w-7 h-7 bg-purple-100 rounded-full border border-purple-300 flex items-center justify-center text-[11px] text-purple-600 font-bold backdrop-blur-xs shadow-xs">💐</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-pink-50 min-h-[500px] lg:min-h-[550px] transition-all duration-1000">
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-tr ${slides[currentSlide].bgGradient} transition-all duration-1000`}></div>
          
          <div className="absolute inset-0 bg-[radial-gradient(#ffebf0_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 h-full items-center gap-8 p-6 sm:p-10 lg:p-14 z-10">
            {/* Slide Narrative Column */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
              {/* Animated Accent Badge */}
              <div className="inline-flex items-center gap-1.5 self-start px-4 py-1.5 rounded-full bg-white border border-pink-100 text-pink-brand font-display text-xs font-bold tracking-widest shadow-xs glow-pink animate-pulse">
                <Sparkles className="w-3 h-3 text-gold-brand animate-spin" />
                <span>{slides[currentSlide].badge}</span>
              </div>

              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.25em] font-sans font-extrabold text-orange-500/90">
                  {slides[currentSlide].subtitle}
                </p>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight">
                  {slides[currentSlide].title}
                </h1>
              </div>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
                {slides[currentSlide].description}
              </p>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={currentSlide === 0 ? onNavigateToProducts : () => {
                    const el = document.getElementById('scheduler');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-pink-brand via-pink-400 to-peach-brand text-white font-display text-sm font-bold shadow-md hover:scale-103 active:scale-97 transition-all cursor-pointer glow-pink"
                >
                  <span>{slides[currentSlide].ctaPrimary}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onNavigateToQuiz}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-pink-brand border-2 border-pink-100 font-display text-sm font-bold shadow-sm hover:border-pink-200 hover:bg-pink-50/40 active:scale-97 transition-all cursor-pointer"
                >
                  <span>{slides[currentSlide].ctaSecondary}</span>
                </button>
              </div>

              {/* Feature Points on Hero */}
              <div className="grid grid-cols-3 gap-2 pt-6 border-t border-pink-100/40 max-w-lg">
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
                  <div className="bg-pink-100 p-1 rounded-full text-pink-brand">
                    <Heart className="w-3 h-3" />
                  </div>
                  <span>100% Skin Safe</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
                  <div className="bg-peach-brand/20 p-1 rounded-full text-orange-600">
                    <Smile className="w-3 h-3" />
                  </div>
                  <span>Family Approved</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
                  <div className="bg-mint-brand/20 p-1 rounded-full text-emerald-600">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <span>Luxe Bio-Actives</span>
                </div>
              </div>
            </div>

            {/* Slide Visual Column representing luxury aesthetic */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center mt-6 lg:mt-0">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-4/3 sm:aspect-16/10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white glow-peach group">
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Embedded luxury glowing card effect on bottom left of image */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/80 backdrop-blur-md p-3 rounded-xl border border-white/50 text-left flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-pink-brand uppercase tracking-widest block font-display">Vinshu Certified</span>
                    <span className="text-xs font-bold text-gray-800">Premium Luxury Standards</span>
                  </div>
                  <div className="bg-gold-brand text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                    GOLD SEED
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bullet Indicator controls */}
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === index ? 'w-8 bg-pink-brand' : 'w-2.5 bg-pink-200 hover:bg-pink-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
