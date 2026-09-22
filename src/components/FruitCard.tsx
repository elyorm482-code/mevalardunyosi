import React, { useState } from 'react';
import { Fruit } from '../types';
import { formatPrice } from '../utils/formatters';
import { Plus, Minus, Check, Star, Info, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FruitCardProps {
  fruit: Fruit;
  onAddToCart: (fruit: Fruit, quantity: number) => void;
  onOpenDetails: (fruit: Fruit) => void;
  currentInCartQuantity?: number;
}

export const FruitCard: React.FC<FruitCardProps> = ({
  fruit,
  onAddToCart,
  onOpenDetails,
  currentInCartQuantity = 0,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isAddedRecently, setIsAddedRecently] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => Math.min(prev + 1, 50));
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(fruit, quantity);
    setIsAddedRecently(true);
    setTimeout(() => {
      setIsAddedRecently(false);
    }, 1500);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Top Media Section */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onOpenDetails(fruit)}>
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {fruit.badge && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-amber-500 text-stone-950 shadow-sm">
              {fruit.badge}
            </span>
          )}
          {fruit.isFreshHarvest && !fruit.badge && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-600 text-white shadow-sm">
              Yangi hosil
            </span>
          )}
        </div>

        {/* Origin Pill */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 backdrop-blur-xs text-stone-700 shadow-xs border border-stone-200/60">
            📍 {fruit.origin}
          </span>
        </div>

        {/* Fruit Image */}
        {!imgError ? (
          <img
            src={fruit.image}
            alt={fruit.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-amber-50 text-stone-400">
            <span className="text-6xl mb-2">
              {fruit.category === 'apples' ? '🍎' : fruit.category === 'mandarins' ? '🍊' : '🍌'}
            </span>
            <span className="text-xs font-semibold">{fruit.name}</span>
          </div>
        )}

        {/* In Cart Indicator */}
        {currentInCartQuantity > 0 && (
          <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-full bg-emerald-700/90 text-white text-xs font-bold backdrop-blur-xs shadow-md flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-300" />
            <span>Savatda: {currentInCartQuantity} {fruit.unit}</span>
          </div>
        )}

        {/* Quick View Button on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(fruit);
          }}
          className="absolute bottom-3 right-3 z-10 p-2 rounded-xl bg-white/90 hover:bg-white text-stone-700 shadow-md backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          title="Batafsil ma'lumot"
        >
          <Info className="w-4 h-4 text-stone-700" />
        </button>
      </div>

      {/* Body Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Variety & Sweetness row */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-xs font-semibold text-emerald-700 truncate">
              {fruit.variety}
            </span>
            <div className="flex items-center gap-1 shrink-0" title={`Shirinlik darajasi: ${fruit.sweetness}/5`}>
              <span className="text-[11px] font-bold text-amber-500">Shirin:</span>
              <div className="flex text-amber-400 text-xs">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < fruit.sweetness ? 'text-amber-400' : 'text-stone-300'}>
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Fruit Name */}
          <h3
            onClick={() => onOpenDetails(fruit)}
            className="font-['Outfit',sans-serif] font-bold text-lg text-stone-900 group-hover:text-emerald-800 transition-colors cursor-pointer line-clamp-1"
          >
            {fruit.name}
          </h3>

          <p className="text-stone-500 text-xs line-clamp-2 mt-1 mb-3 leading-relaxed">
            {fruit.description}
          </p>
        </div>

        {/* Bottom Pricing & Actions */}
        <div className="pt-3 border-t border-stone-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="text-lg font-black text-stone-950 font-['Outfit',sans-serif]">
                {formatPrice(fruit.price)}
                <span className="text-xs font-normal text-stone-500 ml-1">/ {fruit.unit}</span>
              </div>
              {fruit.originalPrice && (
                <div className="text-xs text-stone-400 line-through font-medium">
                  {formatPrice(fruit.originalPrice)}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 text-xs text-stone-600 font-semibold bg-stone-100 px-2 py-0.5 rounded-md">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{fruit.rating.toFixed(1)}</span>
              <span className="text-stone-400 font-normal">({fruit.reviewCount})</span>
            </div>
          </div>

          {/* Quantity Selector & Add Button */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-stone-100 rounded-xl p-1 border border-stone-200">
              <button
                onClick={handleDecrement}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-stone-700 shadow-xs hover:bg-stone-200 active:scale-95 transition-all cursor-pointer"
                title="Kamaytirish"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-9 text-center text-xs font-bold text-stone-800">
                {quantity} {fruit.unit}
              </span>
              <button
                onClick={handleIncrement}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-stone-700 shadow-xs hover:bg-stone-200 active:scale-95 transition-all cursor-pointer"
                title="Ko'paytirish"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAdd}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                isAddedRecently
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-900 hover:bg-emerald-700 text-white'
              }`}
            >
              <AnimatePresence mode="wait">
                {isAddedRecently ? (
                  <motion.span
                    key="added"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="flex items-center gap-1"
                  >
                    <Check className="w-4 h-4 text-emerald-300" />
                    Qo'shildi!
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-300" />
                    Savatga
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
