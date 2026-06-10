/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProductSection from './components/ProductSection';
import LookbookSection from './components/LookbookSection';
import SpecialistScheduler from './components/SpecialistScheduler';
import InteractiveProfiler from './components/InteractiveProfiler';
import TestimonialSection from './components/TestimonialSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { Product, CartItem } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Load cart from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('vinshu_cart');
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Cart retrieval failure:", e);
    }
  }, []);

  // Save cart to LocalStorage
  const saveCartToStorage = (updatedCart: CartItem[]) => {
    try {
      localStorage.setItem('vinshu_cart', JSON.stringify(updatedCart));
    } catch (e) {
      console.error("Cart save failure:", e);
    }
  };

  const handleAddToCart = (product: Product, size?: string, color?: string) => {
    // Generate unique slot key (e.g., prodId_size_color)
    const cartItemId = `${product.id}_${size || 'none'}_${color || 'none'}`;
    
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((item) => item.id === cartItemId);
      let updated: CartItem[];

      if (existingIdx > -1) {
        updated = prevCart.map((item, idx) => 
          idx === existingIdx ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updated = [
          ...prevCart,
          {
            id: cartItemId,
            product,
            selectedSize: size,
            selectedColor: color,
            quantity: 1,
          },
        ];
      }
      saveCartToStorage(updated);
      return updated;
    });

    // Automatically open checkout drawer to confirm item in bag
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, quantity: number) => {
    setCart((prevCart) => {
      let updated: CartItem[];
      if (quantity <= 0) {
        updated = prevCart.filter((item) => item.id !== cartItemId);
      } else {
        updated = prevCart.map((item) => 
          item.id === cartItemId ? { ...item, quantity } : item
        );
      }
      saveCartToStorage(updated);
      return updated;
    });
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCart((prevCart) => {
      const updated = prevCart.filter((item) => item.id !== cartItemId);
      saveCartToStorage(updated);
      return updated;
    });
  };

  const handleClearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem('vinshu_cart');
    } catch (e) {
      console.error(e);
    }
  };

  // Nav scroll automation
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-bg-brand selection:bg-pink-100 selection:text-pink-700">
      {/* Navigation Header */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Main Grid Pages Assembly */}
      <main className="pb-0">
        
        {/* 1. Hero Zone */}
        <HeroSection
          onNavigateToProducts={() => handleNavigate('products')}
          onNavigateToQuiz={() => handleNavigate('profiler')}
        />

        {/* 2. About Company Heritage (Blush Pink background tint) */}
        <AboutSection />

        {/* 3. Product Categories Grid & Products Catalog Shelf (White & Peach background shifts) */}
        <ProductSection onAddToCart={handleAddToCart} />

        {/* 4. Portfolio Gallery Lookbook (White background) */}
        <LookbookSection />

        {/* 5. Smart Diagnostic Quiz Lookbook Profiler (White/Rosa border blend) */}
        <InteractiveProfiler onAddToCart={handleAddToCart} />

        {/* 6. Signature Services Specialist Slot Booking (Lavender Tint background) */}
        <SpecialistScheduler />

        {/* 7. Client feedback & testimonials (Cream background) */}
        <TestimonialSection />

        {/* 8. Contact & support Coordinates channels (Soft Mint green background) */}
        <ContactSection />
        
      </main>

      {/* 9. Corporate navigation & newsletter Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Sliding Bag Drawer Panel */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
