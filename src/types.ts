export interface Product {
  id: string;
  name: string;
  category: 'cosmetics' | 'clothing';
  type: string; // e.g., "Skincare", "Makeup", "Leisurewear", "Festive", "Kids Activewear", "Elegant Cashmere"
  price: number;
  originalPrice?: number; // Slashed price like Flipkart
  rating: number;
  reviewsCount: number;
  stockCount?: number; // Stock count alerts
  vinshuAssured?: boolean; // Flipkart Assured equivalent badge
  description: string;
  image: string;
  badge?: 'New' | 'Bestseller' | 'Limited Edition' | 'Eco Friendly';
  sizes?: string[];
  colors?: string[];
  ingredients?: string[];
  familyDemographic: 'Women' | 'Men' | 'Kids' | 'Elders';
  isFeatured?: boolean;
}

export interface CartItem {
  id: string; // unique cart entry ID (productId + size + color)
  product: Product;
  selectedSize?: string;
  selectedColor?: string;
  quantity: number;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  date: string;
  time: string;
  specialist: string;
  notes?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  avatarColor: string;
  role: string; // E.g. "Verified Buyer", "Skincare Lover", "Style Guide"
}

export interface ProfilerResult {
  skinType?: string;
  skinCareGoal?: string;
  clothingStyle?: string;
  fitPreference?: string;
  familyFocus?: 'Women' | 'Men' | 'Kids' | 'Elders';
  recommendedProducts: Product[];
  recommendedOutfits: Product[];
  vibeSummary: string;
}
