import React from 'react';
import { ShoppingBag, Sparkles, Calendar, Heart, Menu, X, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ cart, onOpenCart, onNavigate, activeSection }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { id: 'hero', label: 'Boutique Home' },
    { id: 'about', label: 'Our Heritage' },
    { id: 'categories', label: 'Categories' },
    { id: 'products', label: 'Bestsellers' },
    { id: 'profiler', label: 'AI Lookbook Quiz' },
    { id: 'scheduler', label: 'Book Consultation' },
    { id: 'testimonials', label: 'Client Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pink-100/50 shadow-sm transition-all duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-pink-brand via-peach-brand to-lavender-brand text-white text-xs py-1.5 px-4 text-center font-medium tracking-wider flex items-center justify-center gap-2">
        <Sparkles className="w-3 H-3 animate-pulse" />
        <span>CELEBRATING THE LAUNCH: Use coupon Code <strong className="font-bold underline">VINSHUWELCOME</strong> for 15% OFF!</span>
        <Sparkles className="w-3 H-3 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo - Luxury Fashion/Beauty Aesthetic */}
          <div 
            onClick={() => onNavigate('hero')}
            className="flex flex-col cursor-pointer select-none group"
          >
            <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-brand via-peach-brand to-gold-brand">
              VINSHU
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] font-sans text-gray-500 group-hover:text-pink-brand transition-colors -mt-1 font-medium">
              Beauty & Clothing Brand
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 sm:space-x-3 xl:space-x-5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`px-3 py-2 text-sm font-medium rounded-full cursor-pointer transition-all duration-300 ${
                  activeSection === link.id
                    ? 'bg-pink-50 text-pink-brand font-bold'
                    : 'text-gray-600 hover:text-pink-brand hover:bg-pink-50/40'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button 
              onClick={() => onNavigate('profiler')}
              className="hidden md:flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-pink-brand to-peach-brand text-white text-xs font-semibold rounded-full hover:scale-105 shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Style Quiz</span>
            </button>

            <button 
              onClick={() => onNavigate('scheduler')}
              className="hidden sm:flex items-center gap-1.5 text-gray-600 hover:text-pink-brand transition-all text-sm font-medium"
              title="Schedule consultation"
            >
              <Calendar className="w-4 h-4 text-pink-brand" />
              <span className="hidden lg:inline text-xs font-semibold text-gray-700">Book Session</span>
            </button>

            {/* Shopping Cart button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full hover:bg-pink-50 text-gray-700 hover:text-pink-brand transition-all duration-300 border border-gray-100 cursor-pointer flex items-center justify-center"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-brand to-gold-brand text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce shadow-md">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full hover:bg-pink-50 text-gray-700 hover:text-pink-brand transition-all duration-300 border border-gray-100 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-pink-100 bg-white/98 backdrop-blur-md">
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                  activeSection === link.id
                    ? 'bg-gradient-to-r from-pink-50 to-peach-50/50 text-pink-brand border-l-4 border-pink-brand pl-3'
                    : 'text-gray-600 hover:bg-pink-50/30'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4 flex flex-col gap-2 mt-4 border-t border-gray-100">
              <button 
                onClick={() => {
                  onNavigate('profiler');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-pink-brand to-peach-brand text-white font-semibold rounded-xl"
              >
                <Sparkles className="w-4 h-4" />
                <span>Take Virtual Lookbook Quiz</span>
              </button>
              <button 
                onClick={() => {
                  onNavigate('scheduler');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-3 bg-gray-100 hover:bg-pink-50 text-gray-700 font-semibold rounded-xl"
              >
                <Calendar className="w-4 h-4 text-pink-brand" />
                <span>Schedule Consultation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
