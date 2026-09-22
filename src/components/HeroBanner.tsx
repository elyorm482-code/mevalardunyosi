import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Copy, Check, Truck, ShieldCheck, HeartHandshake } from 'lucide-react';
import { FruitCategory } from '../types';

interface HeroBannerProps {
  onSelectCategory: (cat: FruitCategory) => void;
  activeCategory: FruitCategory;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectCategory, activeCategory }) => {
  const [copiedPromo, setCopiedPromo] = useState(false);

  const handleCopyPromo = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedPromo(true);
    setTimeout(() => setCopiedPromo(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-stone-900 to-amber-950 text-white shadow-xl mx-4 sm:mx-6 lg:mx-8 my-6">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -ml-20 -mb-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Animated Fruit Elements */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-8 right-12 text-5xl md:text-6xl drop-shadow-lg select-none hidden sm:block pointer-events-none opacity-90"
      >
        🍎
      </motion.div>
      <motion.div
        animate={{ y: [0, 14, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-10 right-48 text-5xl md:text-6xl drop-shadow-lg select-none hidden lg:block pointer-events-none opacity-90"
      >
        🍊
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-24 right-72 text-4xl drop-shadow-lg select-none hidden md:block pointer-events-none opacity-80"
      >
        🍌
      </motion.div>
      <motion.div
        animate={{ y: [0, 8, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-6 right-20 text-4xl drop-shadow-lg select-none hidden sm:block pointer-events-none opacity-80"
      >
        🍇
      </motion.div>

      <div className="relative px-6 py-8 sm:px-10 sm:py-12 max-w-4xl">
        {/* Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 text-xs sm:text-sm font-semibold mb-4">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Yangi terilgan va to'yimli mevalar do'koni</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Outfit',sans-serif] tracking-tight leading-tight mb-4">
          Bog'dan to'g'ridan-to'g'ri{' '}
          <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-emerald-300 bg-clip-text text-transparent">
            dasturxoningizga!
          </span>
        </h1>

        <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl mb-6 font-normal">
          Namanganning karsillagan qizil olmalari, Marokko va Turkiyaning shirin mandarinlari,
          hamda saralangan xilma-xil tabiiy mevalar. Barchasi eng yuqori sifatda va toza holda yetkaziladi.
        </p>

        {/* Promo code badge */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-2 rounded-xl backdrop-blur-sm">
            <span className="text-xs text-stone-300">Promokod:</span>
            <span className="font-mono font-extrabold text-amber-400 tracking-wider text-sm">
              MEVA10
            </span>
            <button
              onClick={() => handleCopyPromo('MEVA10')}
              className="ml-1 text-xs px-2 py-1 rounded-md bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
              title="Promokodni nusxalash"
            >
              {copiedPromo ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-950" />
                  Nusxalandi!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  10% Chegirma
                </>
              )}
            </button>
          </div>
          <span className="text-xs text-stone-400">100 000 so'mdan yuqori buyurtmaga bepul yetkazish</span>
        </div>

        {/* Quick Filter CTAs for Apples & Mandarins */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onSelectCategory('apples')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeCategory === 'apples'
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 ring-2 ring-white/50'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <span>🍎</span> Olmalar ({5})
          </button>
          <button
            onClick={() => onSelectCategory('mandarins')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeCategory === 'mandarins'
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 ring-2 ring-white/50'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <span>🍊</span> Mandarinlar ({4})
          </button>
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 ring-2 ring-white/50'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <span>🧺</span> Barcha Mevalar ({16})
          </button>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-white/10 text-xs text-stone-300">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>30-45 daqiqada sovutilgan kuryer</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Meva yoqmasa — 100% almashtirish</span>
          </div>
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Kimyoviy ishlov berilmagan, tabiiy</span>
          </div>
        </div>
      </div>
    </div>
  );
};
