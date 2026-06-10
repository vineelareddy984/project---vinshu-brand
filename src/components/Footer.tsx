import React, { useState } from 'react';
import { Mail, Sparkles, Smile, Heart, Star } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-gray-800">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-4 space-y-4 text-left">
            <div className="flex flex-col cursor-pointer select-none group" onClick={() => onNavigate('hero')}>
              <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-brand via-peach-brand to-gold-brand">
                VINSHU
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] font-sans text-gray-400 group-hover:text-pink-brand transition-colors -mt-1 font-semibold">
                Beauty & Clothing Brand
              </span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              We seamlessly marry bioactive dermatologist-certified cosmetic formulas with breathable, organic clothing threads. A premium family sanctuary celebrating four generations.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-pink-400 font-bold">
              <Star className="w-4 h-4 fill-current text-gold-brand" />
              <span>Dermal Safe & GOTS Organic Certified</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 text-left">
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-4">
              Explore Our House
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'hero', label: 'Boutique Home' },
                { id: 'about', label: 'Our Heritage' },
                { id: 'categories', label: 'Dual Categories' },
                { id: 'products', label: 'Bestseller Shelf' },
                { id: 'profiler', label: 'Virtual Lookbook Quiz' },
                { id: 'scheduler', label: 'Consult with Experts' },
                { id: 'testimonials', label: 'Client Testimonials' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-pink-brand text-gray-400 hover:translate-x-1 transition-all cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact coordinates info summary */}
          <div className="md:col-span-2 text-left">
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-4">
              Concierge Help
            </h4>
            <ul className="space-y-2 text-xs text-gray-400 pb-1">
              <li>Lounge Bookings</li>
              <li>Sizing Guides</li>
              <li>Organic Cotton Seals</li>
              <li>Return Shipping</li>
              <li>Corporate Giftboxes</li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div className="md:col-span-3 text-left space-y-4">
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Subscribe For Graceful Drops
            </h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              Unlock early invitations to silk collection releases, active derm formulas drafts, and 15% discount codes.
            </p>

            {subscribed ? (
              <div className="bg-emerald-950/50 text-emerald-400 border border-emerald-800 p-3 rounded-xl text-xs font-semibold">
                ✓ Joined! Welcome to the Vinshu circle.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border border-gray-700 focus:outline-none focus:border-pink-brand rounded-full py-2.5 px-4 text-xs w-full text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="py-2.5 bg-gradient-to-r from-pink-brand to-peach-brand text-white text-xs font-bold rounded-full hover:scale-103 transition-transform cursor-pointer block-center text-center shadow-md w-full"
                >
                  Join Member Circular
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Footer Base Credits */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-xs text-gray-500 gap-4">
          <div className="flex items-center gap-1">
            <span>© 2026 **Vinshu Beauty N Clothing Brand**. Beautiful family-inclusive aesthetics. Made with</span>
            <Heart className="w-3.5 h-3.5 text-pink-brand fill-pink-brand" />
            <span>for dynamic skin.</span>
          </div>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">Security Policy</span>
            <span className="hover:text-white cursor-pointer">Apparel Terms</span>
            <span className="hover:text-white cursor-pointer">Allergen Safety guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
