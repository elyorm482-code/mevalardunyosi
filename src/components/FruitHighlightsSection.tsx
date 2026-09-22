import React from 'react';
import { Fruit } from '../types';
import { formatPrice } from '../utils/formatters';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface FruitHighlightsProps {
  fruits: Fruit[];
  onAddToCart: (fruit: Fruit, quantity: number) => void;
  onOpenDetails: (fruit: Fruit) => void;
  onSelectCategory: (cat: any) => void;
}

export const FruitHighlightsSection: React.FC<FruitHighlightsProps> = ({
  fruits,
  onAddToCart,
  onOpenDetails,
  onSelectCategory,
}) => {
  const topApples = fruits.filter((f) => f.category === 'apples').slice(0, 2);
  const topMandarins = fruits.filter((f) => f.category === 'mandarins').slice(0, 2);

  return (
    <section className="px-4 sm:px-6 lg:px-8 my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Apple spotlight */}
        <motion.div
          whileHover={{ y: -4 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-rose-700 to-amber-700 text-white p-6 sm:p-7 shadow-lg flex flex-col justify-between"
        >
          <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur-xs">
                🍎 Bog'imiz Olmalari
              </span>
              <button
                onClick={() => onSelectCategory('apples')}
                className="text-xs text-rose-100 hover:text-white flex items-center gap-1 font-bold underline-offset-4 hover:underline cursor-pointer"
              >
                Barchasi <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <h3 className="font-['Outfit',sans-serif] font-black text-2xl sm:text-3xl mb-2">
              Karsillagan & Shirin Olmalar
            </h3>
            <p className="text-xs sm:text-sm text-rose-100 leading-relaxed mb-4 max-w-sm">
              Namangan va Zomin bog'laridan terilgan, karsillovchi, tabiiy C vitaminiga boy yangi hosil olmalari.
            </p>

            {/* Quick mini cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {topApples.map((apple) => (
                <div
                  key={apple.id}
                  onClick={() => onOpenDetails(apple)}
                  className="bg-white/15 backdrop-blur-md rounded-2xl p-2.5 border border-white/20 cursor-pointer hover:bg-white/25 transition-all"
                >
                  <img
                    src={apple.image}
                    alt={apple.name}
                    className="w-full h-20 rounded-xl object-cover mb-2"
                  />
                  <div className="font-bold text-xs truncate">{apple.name}</div>
                  <div className="text-[11px] text-amber-200 font-extrabold flex justify-between items-center mt-1">
                    <span>{formatPrice(apple.price)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(apple, 1);
                      }}
                      className="w-6 h-6 rounded-lg bg-white text-rose-700 flex items-center justify-center hover:scale-105 active:scale-90 transition-transform"
                      title="Savatga qo'shish"
                    >
                      <ShoppingBag className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mandarin spotlight */}
        <motion.div
          whileHover={{ y: -4 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 text-white p-6 sm:p-7 shadow-lg flex flex-col justify-between"
        >
          <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur-xs">
                🍊 Bayramona Mandarinlar
              </span>
              <button
                onClick={() => onSelectCategory('mandarins')}
                className="text-xs text-amber-100 hover:text-white flex items-center gap-1 font-bold underline-offset-4 hover:underline cursor-pointer"
              >
                Barchasi <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <h3 className="font-['Outfit',sans-serif] font-black text-2xl sm:text-3xl mb-2">
              Marokko & Turkiya Mandarinlari
            </h3>
            <p className="text-xs sm:text-sm text-amber-100 leading-relaxed mb-4 max-w-sm">
              Donasiz, po'sti oson tozalanuvchi, sharbati og'izda eriydigan darmonbaxsh mandarinlar.
            </p>

            {/* Quick mini cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {topMandarins.map((mandarin) => (
                <div
                  key={mandarin.id}
                  onClick={() => onOpenDetails(mandarin)}
                  className="bg-white/15 backdrop-blur-md rounded-2xl p-2.5 border border-white/20 cursor-pointer hover:bg-white/25 transition-all"
                >
                  <img
                    src={mandarin.image}
                    alt={mandarin.name}
                    className="w-full h-20 rounded-xl object-cover mb-2"
                  />
                  <div className="font-bold text-xs truncate">{mandarin.name}</div>
                  <div className="text-[11px] text-amber-200 font-extrabold flex justify-between items-center mt-1">
                    <span>{formatPrice(mandarin.price)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(mandarin, 1);
                      }}
                      className="w-6 h-6 rounded-lg bg-white text-orange-700 flex items-center justify-center hover:scale-105 active:scale-90 transition-transform"
                      title="Savatga qo'shish"
                    >
                      <ShoppingBag className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
