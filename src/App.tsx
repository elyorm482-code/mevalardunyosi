import { useState, useEffect, useMemo } from 'react';
import { Fruit, FruitCategory, CartItem, OrderDetails } from './types';
import { FRUITS_DATA } from './data/fruits';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter, SortOption } from './components/CategoryFilter';
import { FruitHighlightsSection } from './components/FruitHighlightsSection';
import { FruitCard } from './components/FruitCard';
import { FruitDetailModal } from './components/FruitDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { Footer } from './components/Footer';
import { ShoppingBag, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatPrice } from './utils/formatters';

const CART_STORAGE_KEY = 'mevalar_olami_cart_v1';

export default function App() {
  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState<FruitCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  // UI Modals states
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [detailFruit, setDetailFruit] = useState<Fruit | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  // Promo state
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCartBouncing, setIsCartBouncing] = useState<boolean>(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Trigger brief bounce on cart icon and toast
  const triggerCartAnimation = (fruitName: string, quantity: number, unit: string) => {
    setIsCartBouncing(true);
    setTimeout(() => setIsCartBouncing(false), 500);

    setToastMessage(`✓ ${quantity} ${unit} ${fruitName} savatga qo'shildi`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (fruit: Fruit, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.fruit.id === fruit.id);
      if (existing) {
        return prev.map((item) =>
          item.fruit.id === fruit.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { fruit, quantity }];
    });
    triggerCartAnimation(fruit.name, quantity, fruit.unit);
  };

  const handleUpdateCartQuantity = (fruitId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(fruitId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.fruit.id === fruitId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (fruitId: string) => {
    setCart((prev) => prev.filter((item) => item.fruit.id !== fruitId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Filtered & Sorted fruits
  const filteredFruits = useMemo(() => {
    let result = [...FRUITS_DATA];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((fruit) => fruit.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (fruit) =>
          fruit.name.toLowerCase().includes(query) ||
          fruit.variety.toLowerCase().includes(query) ||
          fruit.origin.toLowerCase().includes(query) ||
          fruit.description.toLowerCase().includes(query)
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'sweetness':
        result.sort((a, b) => b.sweetness - a.sweetness);
        break;
      case 'popular':
      default:
        result.sort((a, b) => {
          if (a.isPopular && !b.isPopular) return -1;
          if (!a.isPopular && b.isPopular) return 1;
          return b.reviewCount - a.reviewCount;
        });
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  // Cart totals
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartAmount = cart.reduce((sum, item) => sum + item.fruit.price * item.quantity, 0);

  const getInCartQuantity = (fruitId: string) => {
    const item = cart.find((i) => i.fruit.id === fruitId);
    return item ? item.quantity : 0;
  };

  const handleProceedToCheckout = (promo: string | null, discount: number) => {
    setAppliedPromo(promo);
    setDiscountAmount(discount);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = (order: OrderDetails) => {
    setIsCheckoutOpen(false);
    setCart([]);
    setAppliedPromo(null);
    setDiscountAmount(0);
    setCompletedOrder(order);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 right-4 sm:right-8 z-50 bg-stone-900 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-2xl shadow-xl border border-stone-700 flex items-center gap-2 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navigation */}
      <Navbar
        cartItemCount={totalCartCount}
        cartTotal={totalCartAmount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isCartBouncing={isCartBouncing}
      />

      <main className="flex-1">
        {/* Hero Interactive Banner */}
        <HeroBanner
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setSearchQuery('');
          }}
          activeCategory={selectedCategory}
        />

        {/* Apple & Mandarin Spotlight section (shown when looking at all or default) */}
        {!searchQuery && selectedCategory === 'all' && (
          <FruitHighlightsSection
            fruits={FRUITS_DATA}
            onAddToCart={handleAddToCart}
            onOpenDetails={setDetailFruit}
            onSelectCategory={setSelectedCategory}
          />
        )}

        {/* Category Selector & Sorting */}
        <div id="catalog-section">
          <CategoryFilter
            activeCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
            }}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalFilteredCount={filteredFruits.length}
          />
        </div>

        {/* Fruit Cards Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFruits.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-dashed border-stone-300 p-8 my-4">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-3xl mx-auto flex items-center justify-center mb-3">
                <AlertCircle className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-1 font-['Outfit',sans-serif]">
                Afsuski, meva topilmadi
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
                "{searchQuery}" so'rovingiz bo'yicha hech qanday meva topilmadi. Qidiruv so'zini o'zgartiring yoki barcha mevalarni ko'ring.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
              >
                Barcha mevalarni ko'rsatish
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6"
            >
              <AnimatePresence>
                {filteredFruits.map((fruit) => (
                  <FruitCard
                    key={fruit.id}
                    fruit={fruit}
                    onAddToCart={handleAddToCart}
                    onOpenDetails={setDetailFruit}
                    currentInCartQuantity={getInCartQuantity(fruit.id)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      {/* Floating Bottom Quick Cart Button for Mobile View */}
      {totalCartCount > 0 && !isCartOpen && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="fixed bottom-5 inset-x-4 z-40 sm:hidden"
        >
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3.5 px-5 bg-stone-950 text-white rounded-2xl shadow-2xl flex items-center justify-between font-bold text-sm active:scale-98 transition-transform border border-white/20"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-amber-400 text-stone-950 text-xs font-black flex items-center justify-center">
                {totalCartCount}
              </span>
              <span>Savatni ko'rish</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-300 font-extrabold">{formatPrice(totalCartAmount)}</span>
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
          </button>
        </motion.div>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Fruit Detail Modal */}
      <FruitDetailModal
        fruit={detailFruit}
        onClose={() => setDetailFruit(null)}
        onAddToCart={handleAddToCart}
        currentInCartQuantity={detailFruit ? getInCartQuantity(detailFruit.id) : 0}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        appliedPromo={appliedPromo}
        discountAmount={discountAmount}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Order Success Celebration Modal */}
      <OrderSuccessModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      {/* Store Footer */}
      <Footer />
    </div>
  );
}
