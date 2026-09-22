export type FruitCategory = 'all' | 'apples' | 'mandarins' | 'citrus' | 'tropical' | 'berries' | 'local';

export interface Fruit {
  id: string;
  name: string;
  category: FruitCategory;
  variety: string; // e.g. "Beshyulduz", "Klementin", "Dyushes"
  price: number; // in UZS per kg or per pack
  originalPrice?: number;
  unit: 'kg' | 'dona' | 'quti';
  rating: number;
  reviewCount: number;
  sweetness: number; // 1 to 5
  origin: string; // e.g. "Namangan", "Marokko", "Farg'ona"
  description: string;
  benefits: string[];
  caloriesPer100g: number;
  inStock: boolean;
  isPopular?: boolean;
  isFreshHarvest?: boolean;
  image: string;
  accentColor: string; // hex or tailwind tone
  badge?: string;
}

export interface CartItem {
  fruit: Fruit;
  quantity: number; // number of units (e.g. 1kg, 2kg, or 1 pack)
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  deliveryTime: string;
  paymentMethod: 'click' | 'payme' | 'cash' | 'uzum';
  notes?: string;
  items: CartItem[];
  totalAmount: number;
  discount: number;
  deliveryFee: number;
  finalTotal: number;
  createdAt: string;
}
