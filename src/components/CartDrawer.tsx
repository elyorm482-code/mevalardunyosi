import React, { useState } from 'react';
import { CartItem } from '../types';
import { formatPrice } from '../utils/formatters';
import { PROMO_CODES } from '../data/fruits';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (fruitId: string, quantity: number) => void;
  onRemoveItem: (fruitId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: (appliedPromo: string | null, discountAmount: number) => void;
}

const FREE_DELIVERY_THRESHOLD = 100000;
const STANDARD_DELIVERY_FEE = 15000;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.fruit.price * item.quantity, 0);
  const discountPercent = appliedPromo ? PROMO_CODES[appliedPromo] || 0 : 0;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = subtotal === 0 || isFreeDelivery ? 0 : STANDARD_DELIVERY_FEE;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const amountNeededForFree = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  const handleApplyPromo = () => {
    const cleanCode = promoInput.trim().toUpperCase();
    if (!cleanCode) return;

    if (PROMO_CODES[cleanCode]) {
      setAppliedPromo(cleanCode);
      setPromoError(null);
    } else {
      setPromoError("Yaroqsiz promokod. 'MEVA10' kodini sinab ko'ring!");
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoInput('');
    setPromoError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-['Outfit',sans-serif] font-black text-lg text-stone-900 leading-tight">
                  Xaridor Savati
                </h2>
                <span className="text-xs text-stone-500 font-medium">
                  {items.length > 0 ? `${items.length} xil meva tanlandi` : 'Savat bo\'sh'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-stone-400 hover:text-rose-600 text-xs font-semibold px-2 py-1 rounded-md hover:bg-rose-50 transition-colors"
                  title="Savatni tozalash"
                >
                  Tozalash
                </button>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-stone-200/80 hover:bg-stone-300 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Free Delivery Bar */}
          {items.length > 0 && (
            <div className="bg-amber-50/70 border-b border-amber-200/60 px-5 py-3">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5 text-stone-800">
                  <Truck className="w-3.5 h-3.5 text-amber-600" />
                  {isFreeDelivery ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Bepul yetkazib berish berildi!
                    </span>
                  ) : (
                    <span>
                      Yana <strong className="text-amber-700">{formatPrice(amountNeededForFree)}</strong> xarid qiling
                    </span>
                  )}
                </span>
                <span className="text-[11px] text-stone-500">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5 }}
                  className={`h-full rounded-full ${
                    isFreeDelivery ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'
                  }`}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center text-4xl mb-4 shadow-inner">
                  🧺
                </div>
                <h3 className="font-['Outfit',sans-serif] font-bold text-lg text-stone-800 mb-1">
                  Sizning savatingiz hozircha bo'sh
                </h3>
                <p className="text-stone-500 text-xs max-w-xs mb-6">
                  Eng sara Namangan olmalari, suvli Marokko mandarinlari va yangi mevalarni savatga qo'shing!
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 shadow-md transition-all"
                >
                  Mevalarni tanlash
                </button>
              </div>
            ) : (
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.fruit.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-200/80"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.fruit.image}
                      alt={item.fruit.name}
                      className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-stone-900 text-sm truncate font-['Outfit',sans-serif]">
                        {item.fruit.name}
                      </h4>
                      <div className="text-[11px] text-stone-500 mb-1.5 truncate">
                        {formatPrice(item.fruit.price)} / {item.fruit.unit}
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onUpdateQuantity(item.fruit.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-md bg-white border border-stone-300 text-stone-700 flex items-center justify-center hover:bg-stone-100 active:scale-90 transition-all cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-stone-800 px-2">
                          {item.quantity} {item.fruit.unit}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.fruit.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-md bg-white border border-stone-300 text-stone-700 flex items-center justify-center hover:bg-stone-100 active:scale-90 transition-all cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Price and Delete */}
                    <div className="flex flex-col items-end justify-between self-stretch">
                      <button
                        onClick={() => onRemoveItem(item.fruit.id)}
                        className="text-stone-400 hover:text-rose-500 p-1 rounded-md transition-colors"
                        title="O'chirish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-extrabold text-stone-900 text-xs sm:text-sm font-['Outfit',sans-serif]">
                        {formatPrice(item.fruit.price * item.quantity)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Footer with Promo & Totals */}
          {items.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50/90 space-y-4">
              {/* Promo Code Input */}
              <div>
                {!appliedPromo ? (
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Promokod (masalan: MEVA10)"
                        className="w-full pl-9 pr-3 py-2 text-xs uppercase font-semibold bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:border-amber-500"
                      />
                    </div>
                    <button
                      onClick={handleApplyPromo}
                      className="px-3 py-2 bg-stone-800 hover:bg-stone-950 text-white text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer"
                    >
                      Qo'llash
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-xs">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{appliedPromo} ({discountPercent}% chegirma)</span>
                    </div>
                    <button
                      onClick={handleRemovePromo}
                      className="text-rose-600 font-bold hover:underline"
                    >
                      Bekor qilish
                    </button>
                  </div>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-600 mt-1 font-medium">{promoError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Mevalar narxi:</span>
                  <span className="font-semibold text-stone-800">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Chegirma ({discountPercent}%):</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Yetkazib berish:</span>
                  <span className="font-semibold text-stone-800">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">Bepul</span>
                    ) : (
                      formatPrice(deliveryFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 text-sm sm:text-base font-black text-stone-950 font-['Outfit',sans-serif]">
                  <span>Jami to'lov:</span>
                  <span className="text-emerald-700">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onProceedToCheckout(appliedPromo, discountAmount)}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Buyurtmani rasmiylashtirish</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
