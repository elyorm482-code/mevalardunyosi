import React, { useState } from 'react';
import { Fruit } from '../types';
import { formatPrice } from '../utils/formatters';
import { X, Check, Star, Plus, Minus, ShoppingBag, ShieldCheck, Flame, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FruitDetailModalProps {
  fruit: Fruit | null;
  onClose: () => void;
  onAddToCart: (fruit: Fruit, quantity: number) => void;
  currentInCartQuantity?: number;
}

export const FruitDetailModal: React.FC<FruitDetailModalProps> = ({
  fruit,
  onClose,
  onAddToCart,
  currentInCartQuantity = 0,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!fruit) return null;

  const handleIncrement = () => setQuantity((q) => Math.min(q + 1, 50));
  const handleDecrement = () => setQuantity((q) => Math.max(q - 1, 1));

  const handleAdd = () => {
    onAddToCart(fruit, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const totalPrice = fruit.price * quantity;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-stone-200"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-stone-900 shadow-md flex items-center justify-center backdrop-blur-xs transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Image View */}
            <div className="relative aspect-square md:aspect-auto bg-stone-100 min-h-[260px] md:min-h-full">
              <img
                src={fruit.image}
                alt={fruit.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {fruit.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-stone-950 shadow-md">
                    {fruit.badge}
                  </span>
                )}
                {fruit.isFreshHarvest && (
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-600 text-white shadow-md">
                    Yangi terim
                  </span>
                )}
              </div>
            </div>

            {/* Right Information */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                {/* Origin & Variety */}
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{fruit.origin}</span>
                  <span className="text-stone-300">•</span>
                  <span className="text-stone-500 font-medium">{fruit.variety}</span>
                </div>

                {/* Name */}
                <h2 className="text-2xl font-black font-['Outfit',sans-serif] text-stone-900 leading-tight mb-2">
                  {fruit.name}
                </h2>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-900 px-2.5 py-0.5 rounded-lg text-xs font-bold">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{fruit.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-xs text-stone-500">
                    ({fruit.reviewCount} ta ijobiy xaridor fikri)
                  </span>
                </div>

                {/* Description */}
                <p className="text-stone-600 text-sm leading-relaxed mb-4">
                  {fruit.description}
                </p>

                {/* Characteristics Badges */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80">
                    <div className="text-[11px] text-stone-400 font-medium">Shirinlik darajasi</div>
                    <div className="text-xs font-bold text-amber-600 flex items-center gap-1 mt-0.5">
                      <span>{'★'.repeat(fruit.sweetness)}</span>
                      <span className="text-stone-400">{'★'.repeat(5 - fruit.sweetness)}</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80">
                    <div className="text-[11px] text-stone-400 font-medium flex items-center gap-1">
                      <Flame className="w-3 h-3 text-orange-500" />
                      Energiya (100g)
                    </div>
                    <div className="text-xs font-bold text-stone-800 mt-0.5">
                      {fruit.caloriesPer100g} kkal
                    </div>
                  </div>
                </div>

                {/* Health Benefits */}
                <div className="mb-6">
                  <div className="text-xs font-bold text-stone-900 mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Foydali xususiyatlari:
                  </div>
                  <ul className="space-y-1">
                    {fruit.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-stone-600">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-stone-100">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs text-stone-400 font-medium block">Narxi:</span>
                    <span className="text-xl font-black text-stone-900 font-['Outfit',sans-serif]">
                      {formatPrice(totalPrice)}
                    </span>
                    {quantity > 1 && (
                      <span className="text-xs text-stone-500 ml-1">
                        ({formatPrice(fruit.price)} / {fruit.unit})
                      </span>
                    )}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center bg-stone-100 rounded-xl p-1 border border-stone-200">
                    <button
                      onClick={handleDecrement}
                      className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-stone-700 hover:bg-stone-200 active:scale-95 transition-all cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-xs font-bold text-stone-800">
                      {quantity} {fruit.unit}
                    </span>
                    <button
                      onClick={handleIncrement}
                      className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-stone-700 hover:bg-stone-200 active:scale-95 transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Add to Cart button */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdd}
                  className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                    isAdded
                      ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/20'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5 text-emerald-200" />
                      Savatga muvaffaqiyatli qo'shildi!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 text-amber-300" />
                      Savatga qo'shish ({quantity} {fruit.unit})
                    </>
                  )}
                </motion.button>

                {currentInCartQuantity > 0 && (
                  <p className="text-center text-[11px] text-stone-500 mt-2">
                    Sizning savatingizda allaqachon {currentInCartQuantity} {fruit.unit} mavjud.
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
