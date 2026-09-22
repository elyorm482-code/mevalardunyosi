import React from 'react';
import { FruitCategory } from '../types';
import { CATEGORIES } from '../data/fruits';
import { ArrowUpDown } from 'lucide-react';
import { motion } from 'motion/react';

export type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'sweetness';

interface CategoryFilterProps {
  activeCategory: FruitCategory;
  onSelectCategory: (category: FruitCategory) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalFilteredCount: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  totalFilteredCount,
}) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        {/* Category horizontal scrolling bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as FruitCategory)}
                className={`relative px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'text-emerald-950 font-extrabold shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/70 bg-white border border-stone-200/80'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryBg"
                    className="absolute inset-0 bg-gradient-to-r from-amber-300 via-amber-200 to-emerald-200 rounded-xl -z-10 border border-amber-300 shadow-xs"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{cat.label}</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-emerald-950 text-white font-black'
                      : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sort Controls and Counter */}
        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
          <span className="text-xs text-stone-500 font-medium">
            Topildi: <strong className="text-stone-800 font-bold">{totalFilteredCount}</strong> xil meva
          </span>

          <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-xl px-2.5 py-1.5 shadow-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="text-xs font-semibold text-stone-700 bg-transparent focus:outline-hidden cursor-pointer"
            >
              <option value="popular">Tavsiya etilgan</option>
              <option value="price-asc">Narxi: Arzondan qimmatga</option>
              <option value="price-desc">Narxi: Qimmatdan arzonga</option>
              <option value="sweetness">Eng shirinlari oldinda</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
