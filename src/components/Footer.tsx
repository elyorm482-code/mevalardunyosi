import React from 'react';
import { Phone, MapPin, Clock, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t border-stone-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-stone-800">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🍎</span>
              <span className="font-['Outfit',sans-serif] font-black text-2xl text-white tracking-tight">
                Mevalar Olami
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              O'zbekistonning eng sara bog'lari va xorijiy yetakchi yetkazib beruvchilardan to'g'ridan-to'g'ri yangi va xushbo'y mevalar.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Har kuni yangi uzilgan hosil</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Mevalar Turlari
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="hover:text-amber-400 transition-colors">🍎 Shirin & Karsillagan Olmalar</li>
              <li className="hover:text-amber-400 transition-colors">🍊 Marokko & Turkiya Mandarinlari</li>
              <li className="hover:text-amber-400 transition-colors">🍌 Tropik Banan & Mangolar</li>
              <li className="hover:text-amber-400 transition-colors">🍇 Shifobaxsh Anor & Uzumlar</li>
              <li className="hover:text-amber-400 transition-colors">🍓 Yangi Terilgan Rezavorlar</li>
            </ul>
          </div>

          {/* Service Guarantee */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Kafolat va Xizmat
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>🚚 30-45 daqiqada tezkor yetkazish</li>
              <li>🛡️ Meva sifati kafolati (100% almashtirish)</li>
              <li>💳 Qulay to'lov: Click, Payme, Naqd</li>
              <li>🎁 100 000 so'mdan yuqoriga bepul kuryer</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Bog'lanish
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+998 (71) 200-44-88</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Har kuni: 08:00 — 23:00</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Toshkent shahri, Amir Temur shoh ko'chasi 45</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} Mevalar Olami. Barcha huquqlar himoyalangan.</p>
          <p>Yangi, shirin va quvvatbaxsh mevalar siz uchun!</p>
        </div>
      </div>
    </footer>
  );
};
