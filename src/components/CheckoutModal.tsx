import React, { useState } from 'react';
import { CartItem, OrderDetails } from '../types';
import { formatPrice } from '../utils/formatters';
import { X, Check, Clock, MapPin, Phone, User, CreditCard, Banknote, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedPromo: string | null;
  discountAmount: number;
  onOrderCompleted: (order: OrderDetails) => void;
}

const FREE_DELIVERY_THRESHOLD = 100000;
const STANDARD_DELIVERY_FEE = 15000;

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedPromo,
  discountAmount,
  onOrderCompleted,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [address, setAddress] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('Tezkor (30-45 daqiqada)');
  const [paymentMethod, setPaymentMethod] = useState<'payme' | 'click' | 'cash' | 'uzum'>('click');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.fruit.price * item.quantity, 0);
  const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = subtotal === 0 || isFreeDelivery ? 0 : STANDARD_DELIVERY_FEE;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Iltimos, ismingizni kiriting');
      return;
    }
    if (phone.trim().length < 13) {
      setFormError('Iltimos, to\'liq telefon raqamingizni kiriting');
      return;
    }
    if (!address.trim()) {
      setFormError('Iltimos, yetkazib berish manzilini kiriting');
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    // Trigger celebratory confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#F59E0B', '#EF4444', '#3B82F6'],
    });

    setTimeout(() => {
      const newOrder: OrderDetails = {
        orderId: 'MO-' + Math.floor(100000 + Math.random() * 900000),
        customerName: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        deliveryTime,
        paymentMethod,
        notes: notes.trim() || undefined,
        items: [...items],
        totalAmount: subtotal,
        discount: discountAmount,
        deliveryFee,
        finalTotal,
        createdAt: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      };

      setIsSubmitting(false);
      onOrderCompleted(newOrder);
    }, 800);
  };

  const handlePhoneChange = (val: string) => {
    if (!val.startsWith('+998')) {
      setPhone('+998 ');
    } else {
      setPhone(val);
    }
  };

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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-stone-200"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-emerald-800 text-white flex items-center justify-between">
            <div>
              <h3 className="font-['Outfit',sans-serif] font-bold text-lg leading-tight">
                Buyurtmani Tasdiqlash
              </h3>
              <p className="text-xs text-emerald-200">
                Yetkazib berish ma'lumotlarini to'ldiring
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {formError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Name input */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-stone-400" />
                Ism va Familiyangiz *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masalan: Sardor Aliyev"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
              />
            </div>

            {/* Phone input */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                Telefon raqamingiz *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="+998 90 123 45 67"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-medium focus:outline-hidden focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
              />
            </div>

            {/* Delivery address */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                Yetkazib berish manzili *
              </label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Shahar, tuman, ko'cha, uy va xonadon raqami"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
              />
            </div>

            {/* Delivery time selector */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                Qulay yetkazish vaqti
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  'Tezkor (30-45 daqiqa)',
                  'Bugun kechqurun (18:00 - 21:00)',
                  'Ertaga ertalab (09:00 - 12:00)',
                ].map((time) => (
                  <button
                    type="button"
                    key={time}
                    onClick={() => setDeliveryTime(time)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                      deliveryTime === time
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-600/20'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment method selector */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                To'lov usuli
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'click', label: 'Click', icon: CreditCard, color: 'text-blue-600' },
                  { id: 'payme', label: 'Payme', icon: CreditCard, color: 'text-teal-600' },
                  { id: 'uzum', label: 'Uzum Pay', icon: CreditCard, color: 'text-purple-600' },
                  { id: 'cash', label: 'Naqd pul', icon: Banknote, color: 'text-emerald-600' },
                ].map((item) => {
                  const isSelected = paymentMethod === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setPaymentMethod(item.id as any)}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-600/20'
                          : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${item.color}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">
                Kuryer uchun qo'shimcha izoh (ixtiyoriy)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Masalan: Domofon kodi 34, qizil darvoza"
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:border-emerald-600"
              />
            </div>

            {/* Total summary box */}
            <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/90 text-xs space-y-1">
              <div className="flex justify-between text-stone-600">
                <span>Tanlangan mevalar:</span>
                <span>{items.length} xil</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Promokod ({appliedPromo}):</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Yetkazib berish:</span>
                <span>{deliveryFee === 0 ? 'Bepul (Bonus)' : formatPrice(deliveryFee)}</span>
              </div>
              <div className="flex justify-between font-black text-sm text-stone-900 pt-1.5 border-t border-stone-200">
                <span>To'lanadigan summa:</span>
                <span className="text-emerald-700 font-['Outfit',sans-serif]">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 disabled:bg-stone-400 text-white font-extrabold text-sm shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
            >
              {isSubmitting ? (
                <span>Buyurtma qabul qilinmoqda...</span>
              ) : (
                <>
                  <Check className="w-4 h-4 text-emerald-200" />
                  <span>Buyurtmani tasdiqlash ({formatPrice(finalTotal)})</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
