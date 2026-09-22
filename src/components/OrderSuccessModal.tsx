import React from 'react';
import { OrderDetails } from '../types';
import { formatPrice } from '../utils/formatters';
import { CheckCircle2, Clock, MapPin, Phone, PackageCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OrderSuccessModalProps {
  order: OrderDetails | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-stone-200"
        >
          {/* Green celebratory banner */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 sm:p-8 text-center relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="w-16 h-16 rounded-full bg-white text-emerald-600 mx-auto flex items-center justify-center mb-3 shadow-lg"
            >
              <CheckCircle2 className="w-10 h-10" />
            </motion.div>
            <h2 className="text-2xl font-black font-['Outfit',sans-serif] mb-1">
              Buyurtmangiz Qabul Qilindi!
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-sm mx-auto">
              Rahmat! Operatorlarimiz va kuryerimiz mevalarni eng yangi holda yetkazish uchun harakatga tushishdi.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-white">
              <span>Buyurtma raqami:</span>
              <span className="font-mono text-amber-300 font-extrabold">{order.orderId}</span>
            </div>
          </div>

          {/* Receipt Body */}
          <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto text-xs">
            {/* Status card */}
            <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="font-bold text-stone-900">Taxminiy yetkazish vaqti</div>
                <div className="text-stone-600 text-[11px]">{order.deliveryTime}</div>
              </div>
            </div>

            {/* Recipient Details */}
            <div className="space-y-1.5 border border-stone-200 rounded-2xl p-3.5 bg-stone-50">
              <div className="font-bold text-stone-900 mb-1 flex items-center gap-1.5">
                <PackageCheck className="w-4 h-4 text-emerald-600" />
                Yetkazish ma'lumotlari:
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <span className="font-medium text-stone-500">Mijoz:</span>
                <span className="font-semibold">{order.customerName}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span>{order.phone}</span>
              </div>
              <div className="flex items-start gap-2 text-stone-700">
                <MapPin className="w-3.5 h-3.5 text-stone-400 mt-0.5" />
                <span>{order.address}</span>
              </div>
            </div>

            {/* Ordered Items summary */}
            <div className="border border-stone-200 rounded-2xl p-3.5 bg-stone-50 space-y-2">
              <div className="font-bold text-stone-900 mb-1">Buyurtma qilingan mevalar:</div>
              {order.items.map((item) => (
                <div key={item.fruit.id} className="flex justify-between items-center text-stone-700">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span>{item.fruit.category === 'apples' ? '🍎' : item.fruit.category === 'mandarins' ? '🍊' : '✨'}</span>
                    <span className="truncate">{item.fruit.name}</span>
                    <span className="text-stone-400">({item.quantity} {item.fruit.unit})</span>
                  </div>
                  <span className="font-bold shrink-0">
                    {formatPrice(item.fruit.price * item.quantity)}
                  </span>
                </div>
              ))}

              <div className="pt-2 border-t border-stone-200 space-y-1 text-stone-600">
                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Chegirma:</span>
                    <span>-{formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Yetkazib berish:</span>
                  <span>{order.deliveryFee === 0 ? 'Bepul' : formatPrice(order.deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-stone-900 font-extrabold text-sm pt-1 border-t border-stone-200">
                  <span>Jami to'lov:</span>
                  <span className="text-emerald-700 font-['Outfit',sans-serif]">
                    {formatPrice(order.finalTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-4 bg-stone-50 border-t border-stone-200">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <span>Yana mevalar tanlash</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
