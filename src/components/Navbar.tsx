import React from 'react';
import { ShoppingBag, Search, Sparkles, PhoneCall, ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatPrice } from '../utils/formatters';

interface NavbarProps {
  cartItemCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isCartBouncing: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemCount,
  cartTotal,
  onOpenCart,
  searchQuery,
  onSearchChange,
  isCartBouncing,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      {/* Top micro-bar for trust & delivery */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-white/20">
              ⚡
            </span>
            <span>Toshkent bo'ylab 30-45 daqiqada tezkor va bepul yetkazib berish!</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-emerald-100">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              100% Saralangan & Yangi
            </span>
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-300" />
              Aloqa: +998 (71) 200-44-88
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 select-none cursor-pointer">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.08 }}
              transition={{ duration: 0.5 }}
              className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center shadow-md shadow-orange-500/20 text-2xl"
            >
              🍎
            </motion.div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Outfit',sans-serif] font-black text-2xl tracking-tight bg-gradient-to-r from-emerald-800 via-amber-700 to-orange-600 bg-clip-text text-transparent">
                  Mevalar Olami
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  <Sparkles className="w-2.5 h-2.5 mr-1 text-amber-600" />
                  Yangi Hosil
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium hidden sm:block">
                Eng shirin olmalar, mandarinlar va sara mevalar do'koni
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-2">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                id="fruit-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Olma, mandarin, banan yoki anor qidirish..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-stone-100/90 border border-stone-200 text-sm placeholder:text-stone-400 focus:outline-hidden focus:bg-white focus:border-amber-500 focus:ring-3 focus:ring-amber-500/15 transition-all"
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5 rounded-full hover:bg-stone-200/60"
                  >
                    <X className="w-3.5 h-3.5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Cart Button */}
          <motion.button
            id="open-cart-button"
            onClick={onOpenCart}
            animate={isCartBouncing ? { scale: [1, 1.15, 0.95, 1.05, 1] } : {}}
            transition={{ duration: 0.4 }}
            className="relative flex items-center gap-2.5 sm:gap-3 py-2 px-3 sm:px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold shadow-md shadow-emerald-700/20 active:scale-95 transition-all cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-white" />
              {cartItemCount > 0 && (
                <motion.span
                  key={cartItemCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2.5 bg-amber-500 text-stone-900 text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </div>
            <div className="text-left hidden xs:block">
              <div className="text-[11px] uppercase tracking-wider text-emerald-200 font-bold leading-none">
                Savat
              </div>
              <div className="text-sm font-bold text-white leading-tight">
                {cartTotal > 0 ? formatPrice(cartTotal) : "0 so'm"}
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    </header>
  );
};
