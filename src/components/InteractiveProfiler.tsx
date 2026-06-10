import React, { useState } from 'react';
import { PRODUCTS } from '../data';
import { Product, CartItem } from '../types';
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, Star, CheckCircle, ShoppingCart } from 'lucide-react';

interface InteractiveProfilerProps {
  onAddToCart: (product: Product, size?: string, color?: string) => void;
}

export default function InteractiveProfiler({ onAddToCart }: InteractiveProfilerProps) {
  const [step, setStep] = useState(1);
  const [familyDemographic, setFamilyDemographic] = useState<'Women' | 'Men' | 'Kids' | 'Elders'>('Women');
  const [skinCareGoal, setSkinCareGoal] = useState('Brightening and Glow');
  const [clothingStyle, setClothingStyle] = useState('Elegant Silhouette');
  
  // Completed state
  const [isCompleted, setIsCompleted] = useState(false);

  // Recommendations calculated dynamically
  const recommendedSkincare = React.useMemo(() => {
    return PRODUCTS.filter(p => p.category === 'cosmetics' && p.familyDemographic === familyDemographic);
  }, [familyDemographic]);

  const recommendedApparel = React.useMemo(() => {
    return PRODUCTS.filter(p => p.category === 'clothing' && p.familyDemographic === familyDemographic);
  }, [familyDemographic]);

  const handleNext = () => {
    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setIsCompleted(false);
    setFamilyDemographic('Women');
    setSkinCareGoal('Brightening and Glow');
    setClothingStyle('Elegant Silhouette');
  };

  const addBundleToCart = () => {
    const itemsAdded: string[] = [];
    if (recommendedSkincare[0]) {
      onAddToCart(recommendedSkincare[0]);
      itemsAdded.push(recommendedSkincare[0].name);
    }
    if (recommendedApparel[0]) {
      onAddToCart(recommendedApparel[0]);
      itemsAdded.push(recommendedApparel[0].name);
    }
    alert(`💐 Your personalized bundle has been added to your bag!\n\nMatched routine:\n1. ${itemsAdded.join('\n2. ')}`);
  };

  return (
    <section id="profiler" className="py-16 bg-white border-b border-pink-100/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-pink-brand font-display block mb-1">Vinshu Interactive Experience</span>
          <h2 className="font-display text-3xl font-extrabold text-gray-800">Virtual Lookbook & Skin Profiler</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-xs sm:text-sm mt-1">
            Answer 3 quick aesthetic questions about your family target to receive a personalized, harmonized skincare-and-clothing pairing.
          </p>
        </div>

        {/* Quiz Canvas */}
        <div className="bg-gradient-to-tr from-pink-50/50 via-white to-peach-50/40 rounded-3xl p-6 sm:p-10 border border-pink-100 shadow-lg relative overflow-hidden">
          {/* Progress bar */}
          {!isCompleted && (
            <div className="w-full bg-pink-100 h-1.5 rounded-full mb-8 relative">
              <div 
                className="bg-gradient-to-r from-pink-brand to-peach-brand h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
              <span className="absolute right-0 -top-6 text-[11px] font-bold text-pink-brand">Step {step} of 3</span>
            </div>
          )}

          {!isCompleted ? (
            <div className="space-y-6">
              {/* STEP 1: DEMOGRAPHIC PREFERENCE */}
              {step === 1 && (
                <div className="space-y-4 text-left">
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-gray-800 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-pink-brand text-white flex items-center justify-center text-xs font-bold">1</span>
                    Who are we styling and treating today?
                  </h3>
                  <p className="text-xs text-gray-500">Each generation possesses distinct skin chemistry and movement silhouettes.</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {[
                      { id: 'Women', title: 'Women Line', subtitle: 'Mulberry silk / Radiant rose' },
                      { id: 'Men', title: 'Men Line', subtitle: 'French flax linen / Clay polish' },
                      { id: 'Kids', title: 'Little Kids', subtitle: 'Organic GOTS cotton / Oats balm' },
                      { id: 'Elders', title: 'Graceful Elders', subtitle: 'Cashmere blend / Lotus cream' }
                    ].map((dem) => (
                      <button
                        key={dem.id}
                        onClick={() => setFamilyDemographic(dem.id as any)}
                        className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between ${
                          familyDemographic === dem.id
                            ? 'bg-gradient-to-br from-pink-500 to-pink-600 text-white border-pink-brand shadow-sm scale-102 font-bold'
                            : 'bg-white border-pink-100 text-gray-700 hover:bg-pink-50/30'
                        }`}
                      >
                        <span className="text-sm font-display font-bold block">{dem.title}</span>
                        <span className={`text-[10px] block mt-1 ${familyDemographic === dem.id ? 'text-pink-100' : 'text-gray-400'}`}>{dem.subtitle}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: SKINCARE CONCERN */}
              {step === 2 && (
                <div className="space-y-4 text-left">
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-gray-800 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-pink-brand text-white flex items-center justify-center text-xs font-bold">2</span>
                    Select your primary dermal priority
                  </h3>
                  <p className="text-xs text-gray-500">Our botanically active formulas prioritize non-irritant organic carriers.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {[
                      "Hydration & Rose Glow Elixir",
                      "Gentle Oats Barrier Defense",
                      "Peptide Wrinkle Repair & Cellular Re-texturing",
                      "Pure Clay Pores Refinement",
                      "Natural Peach Cheek Highlights"
                    ].map((goal) => (
                      <button
                        key={goal}
                        onClick={() => setSkinCareGoal(goal)}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          skinCareGoal === goal
                            ? 'bg-gradient-to-r from-pink-brand/10 to-peach-brand/10 border-pink-brand text-pink-700 shadow-xs scale-[1.01] font-bold'
                            : 'bg-white border-pink-100/70 text-gray-700 hover:bg-pink-50/20'
                        }`}
                      >
                        <span className="text-xs block">✨ {goal}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: LIFESTYLE VIBE */}
              {step === 3 && (
                <div className="space-y-4 text-left">
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-gray-800 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-pink-brand text-white flex items-center justify-center text-xs font-bold">3</span>
                    Choose your dream seasonal wardrobe vibe
                  </h3>
                  <p className="text-xs text-gray-500">Vinshu textiles utilize high-breathability organic fibres for physical comfort.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {[
                      "Boutique Mulberry Dress / High-End Grace",
                      "French Linen Tailored Structure",
                      "Ultra Cozy Combed Cotton Activewear",
                      "Heavyweight Cashmere Leisure",
                      "Relaxed Pleated Lounge Comfort"
                    ].map((style) => (
                      <button
                        key={style}
                        onClick={() => setClothingStyle(style)}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          clothingStyle === style
                            ? 'bg-gradient-to-r from-pink-brand/10 to-peach-brand/10 border-pink-brand text-pink-700 shadow-xs scale-[1.01] font-bold'
                            : 'bg-white border-pink-100/70 text-gray-700 hover:bg-pink-50/20'
                        }`}
                      >
                        <span className="text-xs block">👗 {style}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Back / Next Controls */}
              <div className="flex justify-between items-center pt-6 border-t border-pink-100/50 mt-6">
                <button
                  onClick={handlePrev}
                  disabled={step === 1}
                  className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full cursor-pointer transition ${
                    step === 1 ? 'text-gray-300 pointer-events-none' : 'text-gray-500 hover:text-pink-brand'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-6 py-3 bg-gradient-to-r from-pink-brand to-peach-brand text-white text-xs font-extrabold rounded-full hover:scale-103 shadow-md active:scale-97 cursor-pointer glow-pink"
                >
                  <span>{step === 3 ? "Generate Recipe" : "Continue"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* COMPLETION STATE: SHOW MATCHED BUNDLE RECIPE */
            <div className="space-y-6 text-center">
              <div className="w-12 h-12 bg-mint-brand/20 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce mb-3">
                <CheckCircle className="w-6 h-6" />
              </div>
              
              <span className="text-[10px] bg-gold-brand/10 text-amber-700 border border-gold-brand/35 px-3 py-1 rounded-full font-bold uppercase font-display tracking-widest inline-block">
                Custom Styling Bio-Recipe Completed
              </span>
              <h3 className="font-display text-2xl font-extrabold text-gray-800">
                Your Vinshu Glow Coordinates
              </h3>
              
              <p className="text-gray-500 text-xs sm:text-sm max-w-lg mx-auto">
                Based on shopping for <strong>{familyDemographic}</strong> line requesting <strong>{skinCareGoal}</strong> and styled in <strong>{clothingStyle}</strong>, we handpicked this harmonious lifestyle set.
              </p>

              {/* Matched Skincare & Apparel Pairing cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto pt-4">
                {/* 1. Matched Apothecary */}
                <div className="bg-white p-5 rounded-2xl border border-pink-100 text-left flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-pink-brand font-bold uppercase tracking-widest block mb-1">1. Matched Beauty</span>
                    {recommendedSkincare[0] ? (
                      <>
                        <div className="flex gap-3 items-center mb-3">
                          <img 
                            src={recommendedSkincare[0].image} 
                            alt={recommendedSkincare[0].name}
                            className="w-14 h-14 object-cover rounded-xl border border-gray-100"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h4 className="font-display font-black text-xs sm:text-sm text-gray-800 line-clamp-1">{recommendedSkincare[0].name}</h4>
                            <span className="font-mono text-[10px] text-gray-400 block">${recommendedSkincare[0].price.toFixed(2)}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                          {recommendedSkincare[0].description}
                        </p>
                      </>
                    ) : (
                      <p className="text-xs text-gray-400">Our signature Radiant Elixir Rose Serum matches elegantly.</p>
                    )}
                  </div>
                  <button
                    onClick={() => onAddToCart(recommendedSkincare[0] || PRODUCTS[0])}
                    className="w-full mt-4 py-2 bg-pink-50 hover:bg-pink-100 text-pink-brand text-[11px] font-bold rounded-full transition-colors cursor-pointer"
                  >
                    Add Skincare Only
                  </button>
                </div>

                {/* 2. Matched Apparel */}
                <div className="bg-white p-5 rounded-2xl border border-pink-100 text-left flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-orange-500 font-bold uppercase tracking-widest block mb-1">2. Coordinates Outfit</span>
                    {recommendedApparel[0] ? (
                      <>
                        <div className="flex gap-3 items-center mb-3">
                          <img 
                            src={recommendedApparel[0].image} 
                            alt={recommendedApparel[0].name}
                            className="w-14 h-14 object-cover rounded-xl border border-gray-100"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h4 className="font-display font-black text-xs sm:text-sm text-gray-800 line-clamp-1">{recommendedApparel[0].name}</h4>
                            <span className="font-mono text-[10px] text-gray-400 block">${recommendedApparel[0].price.toFixed(2)}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                          {recommendedApparel[0].description}
                        </p>
                      </>
                    ) : (
                      <p className="text-xs text-gray-400">Our silk apparel collections harmonize beautiful complexions.</p>
                    )}
                  </div>
                  <button
                    onClick={() => onAddToCart(recommendedApparel[0] || PRODUCTS[5])}
                    className="w-full mt-4 py-2 bg-peach-brand/10 hover:bg-peach-brand/20 text-orange-700 text-[11px] font-bold rounded-full transition-colors cursor-pointer"
                  >
                    Add Apparel Only
                  </button>
                </div>
              </div>

              {/* Action bundle buttons */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center max-w-md mx-auto pt-6 border-t border-pink-100">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-pink-50 text-gray-600 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
                  <span>Restart Quiz</span>
                </button>
                <button
                  onClick={addBundleToCart}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-pink-brand to-peach-brand text-white rounded-full text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-md glow-pink"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Buy Matched Bundle</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
