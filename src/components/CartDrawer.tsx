import React, { useState } from 'react';
import { CartItem, Product } from '../types';
import { PROMO_CODES } from '../data';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag, X, Check, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, quantity: number) => void;
  onRemoveFromCart: (cartItemId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  
  // Checkout flow state
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'tracking'>('cart');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  // Calculators
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const discountAmount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0;
  const deliveryFee = subtotal > 75 || subtotal === 0 ? 0 : 5.99;
  const grandTotal = subtotal - discountAmount + deliveryFee;

  const handleApplyPromo = () => {
    const matched = PROMO_CODES.find(p => p.code.toUpperCase() === promoCode.trim().toUpperCase());
    if (matched) {
      setAppliedPromo(matched);
      setPromoCode('');
    } else {
      alert("💐 Invalid coupon code! Try 'VINSHUWELCOME' for 15% off.");
    }
  };

  const handleNextToShipping = () => {
    if (cart.length === 0) {
      alert("💐 Your shopping bag is empty. Explore our bestsellers first!");
      return;
    }
    setCheckoutStep('shipping');
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !address || !city) {
      alert("💐 Please fill out essential shipping coordinates!");
      return;
    }
    setOrderId(`VN-${Math.floor(Math.random() * 900000) + 100000}`);
    setCheckoutStep('tracking');
  };

  const handleCloseAndReset = () => {
    onClearCart();
    setAppliedPromo(null);
    setCheckoutStep('cart');
    setAddress('');
    setCity('');
    setPostalCode('');
    setBuyerName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Blurred Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-pink-100 flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-5 bg-gradient-to-r from-pink-brand via-pink-400 to-peach-brand text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <h2 className="font-display font-extrabold text-base sm:text-lg">Your Elegant Wardrobe Bag</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-1 px-2 text-white hover:bg-white/20 rounded-full cursor-pointer transition text-xs font-bold"
            >
              ✕ Close
            </button>
          </div>

          {/* CHECKOUT STEP 1: CART COLLECTION */}
          {checkoutStep === 'cart' && (
            <div className="flex-grow flex flex-col justify-between overflow-hidden">
              {cart.length === 0 ? (
                <div className="flex-grow flex flex-col justify-center items-center p-6 text-center">
                  <div className="w-16 h-16 bg-pink-50 text-pink-brand rounded-full flex items-center justify-center animate-bounce mb-4 border border-pink-100">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-extrabold text-base text-gray-800">Your Shopping Bag is Quiet</h3>
                  <p className="text-gray-500 text-xs mt-1.5 max-w-xs">
                    Curate your family wardrobes or botanical active skincare from our collections and watch physical elegance assemble here.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-5 px-6 py-2.5 bg-gradient-to-r from-pink-brand to-peach-brand text-white text-xs font-bold rounded-full cursor-pointer shadow-xs"
                  >
                    Return to Boutique Shelf
                  </button>
                </div>
              ) : (
                <>
                  {/* Items List scrollbox */}
                  <div className="flex-grow overflow-y-auto p-6 space-y-4">
                    {cart.map((item) => (
                      <div 
                        key={item.id}
                        className="flex gap-4 bg-pastel-pink/15 p-3 rounded-2xl border border-pink-100/40 relative group"
                      >
                        {/* Remove trigger */}
                        <button
                          onClick={() => onRemoveFromCart(item.id)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-pink-brand p-1 rounded-full cursor-pointer transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-pink-100/80 bg-white"
                          referrerPolicy="no-referrer"
                        />

                        <div className="flex-grow text-left flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] uppercase font-bold text-pink-600 block bg-pink-50 self-start px-1.5 py-0.5 rounded-md w-max">
                              {item.product.type}
                            </span>
                            <h4 className="font-display font-bold text-xs sm:text-sm text-gray-800 line-clamp-1 pr-6 mt-0.5">
                              {item.product.name}
                            </h4>
                            
                            {/* Color / Size info */}
                            {(item.selectedSize || item.selectedColor) && (
                              <div className="flex gap-1.5 mt-1 text-[10px] text-gray-500 font-medium">
                                {item.selectedSize && <span>Size: <strong>{item.selectedSize}</strong></span>}
                                {item.selectedColor && <span>Color: <strong>{item.selectedColor}</strong></span>}
                              </div>
                            )}
                          </div>

                          <div className="flex justify-between items-center mt-2.5">
                            <span className="font-display font-black text-xs sm:text-sm text-gray-800">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            
                            {/* Quantity buttons */}
                            <div className="flex items-center gap-1.5 bg-white border border-pink-100 rounded-full px-2 py-0.5 select-none">
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="p-0.5 hover:bg-pink-50 text-gray-500 rounded-full cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-mono font-bold w-4 text-center text-gray-700">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="p-0.5 hover:bg-pink-50 text-gray-500 rounded-full cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Block */}
                  <div className="bg-neutral-50/90 border-t border-pink-100 p-6 space-y-4">
                    {/* Promo Codes */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5 text-pink-brand" /> Have a luxury promo voucher?
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="E.g. VINSHUWELCOME, GLOWSEASON"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-grow bg-white border border-pink-100 rounded-full py-1.5 px-3.5 text-xs focus:outline-none focus:border-pink-brand uppercase text-gray-700 font-mono font-bold"
                        />
                        <button
                          type="button"
                          onClick={handleApplyPromo}
                          className="bg-gray-800 hover:bg-pink-brand text-white px-4 py-1.5 text-xs font-bold rounded-full transition-colors cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>

                      {appliedPromo && (
                        <div className="flex items-center justify-between bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg border border-emerald-150 text-[11px] font-semibold mt-1">
                          <span className="flex items-center gap-1">✓ Applied <strong>{appliedPromo.code}</strong></span>
                          <span>-{appliedPromo.discount}% Off</span>
                        </div>
                      )}
                    </div>

                    {/* Pricing Grid */}
                    <div className="space-y-2 text-xs font-medium text-gray-600">
                      <div className="flex justify-between">
                        <span>Items Subtotal</span>
                        <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                      </div>
                      {appliedPromo && (
                        <div className="flex justify-between text-emerald-600">
                          <span>Promo Coupon Discount</span>
                          <span>-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Delivery & Ribbon Packaging</span>
                        <span className="font-bold text-gray-900">
                          {deliveryFee === 0 ? <strong className="text-emerald-600">Complimentary</strong> : `$${deliveryFee}`}
                        </span>
                      </div>
                      {subtotal < 75 && (
                        <p className="text-[10px] text-pink-500 italic text-left">
                          Add <strong>${(75 - subtotal).toFixed(2)}</strong> more to unlock Free Boutique Shipping!
                        </p>
                      )}
                      <div className="flex justify-between text-sm font-black text-gray-800 border-t border-pink-100 pt-2">
                        <span>Grand Styling Value</span>
                        <span className="text-pink-brand font-display font-extrabold text-base">${grandTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Submit checkout */}
                    <button
                      onClick={handleNextToShipping}
                      className="w-full py-4 bg-gradient-to-r from-pink-brand via-pink-400 to-peach-brand text-white font-display text-sm font-bold rounded-full shadow-md hover:scale-[1.01] transition-transform cursor-pointer flex items-center justify-center gap-2 glow-pink"
                    >
                      <span>Proceed to Shipping Delivery</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* CHECKOUT STEP 2: SHIPPING FORMS */}
          {checkoutStep === 'shipping' && (
            <form onSubmit={handleCompleteOrder} className="flex-grow flex flex-col justify-between overflow-hidden p-6 text-left">
              <div className="space-y-4 flex-grow overflow-y-auto">
                <div className="flex items-center justify-between border-b border-pink-50 pb-3 mb-4">
                  <h3 className="font-display font-extrabold text-base text-gray-800">Secure Delivery Registry</h3>
                  <button 
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="text-xs font-bold text-pink-brand underline cursor-pointer"
                  >
                    Edit Bag
                  </button>
                </div>

                <div>
                  <label className="text-xs text-gray-400 font-bold block mb-1">Receiver Name</label>
                  <input
                    type="text"
                    placeholder="E.g. Shanaya Roy"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full bg-neutral-50/50 border border-pink-100 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-pink-brand text-gray-700"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 font-bold block mb-1">Delivery Street Address</label>
                  <input
                    type="text"
                    placeholder="E.g. Apt 405, 12 Magnolia Dr"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-neutral-50/50 border border-pink-100 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-pink-brand text-gray-700"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 font-bold block mb-1">City</label>
                    <input
                      type="text"
                      placeholder="E.g. San Francisco"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-neutral-50/50 border border-pink-100 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-pink-brand text-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 font-bold block mb-1">Postal Zip Code</label>
                    <input
                      type="text"
                      placeholder="94103"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-neutral-50/50 border border-pink-100 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-pink-brand text-gray-700"
                      required
                    />
                  </div>
                </div>

                {/* Secure checkout assurances */}
                <div className="bg-pink-50/40 p-4 rounded-2xl border border-pink-100/50 space-y-2 mt-4 text-xs text-pink-700 font-medium">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <ShieldCheck className="w-4 h-4 text-pink-brand" />
                    <span>Vinshu Premium Packaging Assured</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Your items are tissue paper-wrapped inside a gorgeous gold-stamped peach box. All cosmetics are stored in chilled botanical sealers until final dispatch.
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="bg-neutral-50/50 border-t border-pink-100 p-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="px-6 py-3 border border-pink-200 text-gray-600 rounded-full text-xs font-bold"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-grow py-3 bg-gradient-to-r from-pink-brand to-peach-brand text-white font-display text-xs font-bold rounded-full shadow-md text-center cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Transmit Secure Checkout (${grandTotal.toFixed(2)})</span>
                </button>
              </div>
            </form>
          )}

          {/* CHECKOUT STEP 3: INTERACTIVE ORDER SUCCESS & DELIVERY TRACKING */}
          {checkoutStep === 'tracking' && (
            <div className="flex-grow flex flex-col justify-between overflow-hidden p-6 text-center">
              <div className="space-y-6 flex-grow overflow-y-auto">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-200">
                  <Check className="w-8 h-8" />
                </div>
                
                <span className="text-[10px] tracking-widest font-bold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full text-emerald-700 uppercase font-display inline-block">
                  SECURE CODING CHECKOUT SUCCESSFUL
                </span>
                
                <h3 className="font-display text-2xl font-black text-gray-800">
                  Order Handed Over, {buyerName}!
                </h3>

                <p className="text-gray-500 text-xs max-w-sm mx-auto">
                  Your luxury peach box is registered. Our boutique scientists are compounding your active serums and tailoring silk ensembles right now.
                </p>

                {/* Delivery progress tracking bar */}
                <div className="bg-pastel-pink/15 rounded-3xl p-5 border border-pink-100/50 text-left space-y-4">
                  <div className="flex justify-between items-center border-b border-pink-100/30 pb-2.5">
                    <div>
                      <span className="text-[9px] text-gray-400 block uppercase font-bold">Tracking Code</span>
                      <span className="font-mono text-xs font-black text-pink-700">{orderId}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-gray-400 block uppercase font-bold">Estimated Arrival</span>
                      <span className="text-xs font-bold text-gray-700">3-4 Premium Days</span>
                    </div>
                  </div>

                  {/* Vertical Progress list */}
                  <div className="relative pl-6 space-y-4 text-xs font-medium text-gray-600">
                    {/* Line connector */}
                    <div className="absolute left-[7px] top-[7px] bottom-[7px] w-0.5 bg-pink-brand"></div>

                    <div className="relative flex items-center gap-2">
                      <div className="bg-pink-brand text-white w-4 h-4 rounded-full flex items-center justify-center absolute -left-[23px] font-bold text-[9px]">✓</div>
                      <div>
                        <span className="text-gray-800 block font-bold">Checkout Secured</span>
                        <span className="text-[10px] text-emerald-600 block">Funds cleared & registered.</span>
                      </div>
                    </div>

                    <div className="relative flex items-center gap-2">
                      <div className="bg-pink-brand text-white w-4 h-4 rounded-full flex items-center justify-center absolute -left-[23px] font-bold text-[9px]">✓</div>
                      <div>
                        <span className="text-gray-800 block font-bold">Cosmetic Integrity Scan</span>
                        <span className="text-[10px] text-gray-550 block">Ph levels and organic cotton seals verified.</span>
                      </div>
                    </div>

                    <div className="relative flex items-center gap-2 animate-pulse">
                      <div className="bg-orange-500 text-white w-4 h-4 rounded-full flex items-center justify-center absolute -left-[23px] font-bold text-[9px] animate-spin">⟳</div>
                      <div>
                        <span className="text-gray-850 block font-bold">Assembling Ribbon Peach Giftbox</span>
                        <span className="text-[10px] text-orange-600 block">Currently wrapping with organic botanical wax card.</span>
                      </div>
                    </div>

                    <div className="relative flex items-center gap-2 opacity-50">
                      <div className="bg-gray-300 text-white w-4 h-4 rounded-full flex items-center justify-center absolute -left-[23px] font-bold text-[9px]">✓</div>
                      <div>
                        <span className="text-gray-500 block">Dispatched with Premium Courier</span>
                        <span className="text-[10px] block">Awaiting package scan.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-center gap-2 text-xs text-pink-700 font-bold bg-pink-50 p-3 rounded-xl border border-pink-100">
                  <Truck className="w-4 h-4" />
                  <span>Free boutique shipping tracker enabled!</span>
                </div>
              </div>

              <button
                onClick={handleCloseAndReset}
                className="w-full py-3.5 bg-gradient-to-r from-pink-brand to-peach-brand text-white font-display text-xs font-bold rounded-full cursor-pointer shadow-md text-center"
              >
                Close & Return to Browsing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
