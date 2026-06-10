import { Product, Review } from './types';

// Exporting generated image assets
export const IMAGES = {
  heroBanner: '/src/assets/images/hero_banner_1781080639210.png',
  cosmeticsHero: '/src/assets/images/cosmetics_category_1781080654185.png',
  fashionHero: '/src/assets/images/fashion_category_1781080667144.png',
  familyBrand: '/src/assets/images/family_brand_1781080680355.png',
  lipstickTint: '/src/assets/images/lipstick_tint_1781081319860.png',
  lotusCream: '/src/assets/images/lotus_cream_1781081334866.png',
  georgetteFrock: '/src/assets/images/georgette_frock_1781081350941.png',
  anarkaliSuit: '/src/assets/images/anarkali_suit_1781081367092.png',
};

export const PRODUCTS: Product[] = [
  // COSMETICS / SKINCARE
  {
    id: 'cos-01',
    name: 'Vinshu Radiant Elixir Rose Serum',
    category: 'cosmetics',
    type: 'Skincare',
    price: 38.00,
    rating: 4.9,
    reviewsCount: 148,
    description: 'A luxurious, lightweight glowing elixir infused with cold-pressed organic rose extract, pure gold flakes, and botanical hyaluronic acid to instantly brighten, plump, and deeply hydrate your skin.',
    image: IMAGES.cosmeticsHero, // Use generated cosmetics category image
    badge: 'Bestseller',
    ingredients: ['Organic Rose Extract', '24k Gold Flakes', 'Hyaluronic Acid', 'Niacinamide (Vitamin B3)'],
    familyDemographic: 'Women',
    isFeatured: true
  },
  {
    id: 'cos-02',
    name: 'Aura Glow Dewy Lip & Cheek Tint',
    category: 'cosmetics',
    type: 'Makeup',
    price: 24.00,
    rating: 4.8,
    reviewsCount: 92,
    description: 'A versatile, buildable creamy tint containing organic peach pulp and nourishing shea butter. Provides a natural healthy flush of warm pink color for dynamic daily wear.',
    image: IMAGES.lipstickTint,
    badge: 'New',
    colors: ['Sweet Rose', 'Vibrant Peach', 'Gold Sand'],
    ingredients: ['Peach Seed Oil', 'Shea Butter', 'Vitamin E', 'Organic Mineral Pigments'],
    familyDemographic: 'Women',
    isFeatured: true
  },
  {
    id: 'cos-03',
    name: 'Golden Lotus Wrinkle-Repair Cream',
    category: 'cosmetics',
    type: 'Skincare',
    price: 52.00,
    rating: 4.7,
    reviewsCount: 74,
    description: 'A rich, comforting age-defying cream infused with Golden Lotus stem cells, amino peptides, and cold-pressed squalane. Refines skin texture while restoring overnight suppleness.',
    image: IMAGES.lotusCream,
    ingredients: ['Lotus Flower Extract', 'Micro-peptides', 'Eco-squalane', 'Rosehip Oil'],
    familyDemographic: 'Elders',
    isFeatured: false
  },
  {
    id: 'cos-04',
    name: 'Botanical Energizing Clay Face Polish',
    category: 'cosmetics',
    type: 'Skincare',
    price: 29.00,
    rating: 4.6,
    reviewsCount: 51,
    description: 'Deeply purifying fine clay facial polish infused with organic peppermint, tea tree oil, and bamboo micro-scrubbers. Perfect for refreshing daily skincare routines.',
    image: 'https://picsum.photos/seed/cosmetics_scrub/600/600',
    badge: 'Eco Friendly',
    ingredients: ['White Kaolin Clay', 'Peppermint Oil', 'Bamboo Micro-extracts', 'Aloe Vera Leaf Juice'],
    familyDemographic: 'Men',
    isFeatured: false
  },
  {
    id: 'cos-05',
    name: 'Vinshu Ultra-Gentle Oats Moisture Balm',
    category: 'cosmetics',
    type: 'Skincare',
    price: 19.00,
    rating: 4.9,
    reviewsCount: 110,
    description: 'An absolute savior for sensitive skins. Formulated with colloidal oats, chamomile floral water, and organic coconut wax. Designed to safely hydrate soft and dry barrier patches.',
    image: 'https://picsum.photos/seed/baby_cream/600/600',
    ingredients: ['Colloidal Oat Flour', 'Chamomile Water', 'Organic Coconut Oil', 'Calendula Extract'],
    familyDemographic: 'Kids',
    isFeatured: true
  },

  // CLOTHING / APPAREL
  {
    id: 'clo-01',
    name: 'Sunset Garden Silk Wrap Dress',
    category: 'clothing',
    type: 'Apparel',
    price: 89.00,
    rating: 4.9,
    reviewsCount: 220,
    description: 'Bring bright, artistic elegance with you. Tailored in an exquisite mulberry silk blend featuring a hand-drawn floral design, adjustable gold-ring waist tie, and elegant balloon sleeves.',
    image: IMAGES.fashionHero, // Use generated fashion boutique image
    badge: 'Bestseller',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Rose Pink', 'Peach Nectar', 'Soft Lavender'],
    familyDemographic: 'Women',
    isFeatured: true
  },
  {
    id: 'clo-02',
    name: 'Golden Coast Tailored Linen Blazer',
    category: 'clothing',
    type: 'Apparel',
    price: 115.00,
    rating: 4.7,
    reviewsCount: 64,
    description: 'An unvarnished modern standard. Effortlessly structured using premium organic breathable French linen with subtle peach contrast lining, gold luxury buttons, and internal travel pockets.',
    image: 'https://picsum.photos/seed/men_blazer/600/800',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Oatmeal', 'Soft Sage', 'Light Denim'],
    familyDemographic: 'Men',
    isFeatured: true
  },
  {
    id: 'clo-03',
    name: 'Kids Sweet Organic Cotton Overalls',
    category: 'clothing',
    type: 'Apparel',
    price: 34.00,
    rating: 4.8,
    reviewsCount: 88,
    description: 'Cute, chemical-free and incredibly durable. Woven from 100% GOTS-certified organic cotton, with adjustable button suspenders and snap closures for quick play adjustments.',
    image: 'https://picsum.photos/seed/kids_overall/600/800',
    badge: 'Eco Friendly',
    sizes: ['2T', '3T', '4T', '5-6Y'],
    colors: ['Blossom Pink', 'Peach Splash', 'Mint Sage'],
    familyDemographic: 'Kids',
    isFeatured: true
  },
  {
    id: 'clo-04',
    name: 'Luxe Cashmere Blend Meadow Cardigan',
    category: 'clothing',
    type: 'Apparel',
    price: 145.00,
    rating: 4.9,
    reviewsCount: 42,
    description: 'Wrap yourself in absolute warmth and prestige. This heavyweight meadow cardigan is constructed using Mongolian cashmere and superfine merino wool, featuring gorgeous hand-carved horn buttons and modern dropped shoulders.',
    image: 'https://picsum.photos/seed/elder_cardigan/600/800',
    badge: 'Limited Edition',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Creamy Butter', 'Heather Lavender', 'Soft Rose'],
    familyDemographic: 'Elders',
    isFeatured: true
  },
  {
    id: 'clo-05',
    name: 'Casual Sunday Slub Cotton Tee',
    category: 'clothing',
    type: 'Apparel',
    price: 28.00,
    rating: 4.5,
    reviewsCount: 130,
    description: 'An upgraded wardrobe fundamental. Crafted from thick pre-shrunk premium slub cotton, displaying a charming uneven premium knit texture and custom reinforcement neck stitching.',
    image: 'https://picsum.photos/seed/men_tee/600/800',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Sandstone', 'Rose Clay', 'Mist Blue'],
    familyDemographic: 'Men',
    isFeatured: false
  },
  {
    id: 'clo-06',
    name: 'Elders Classic Pleated Linen Trouser',
    category: 'clothing',
    type: 'Apparel',
    price: 68.00,
    rating: 4.8,
    reviewsCount: 39,
    description: 'Perfect ease of movement meets exquisite dressing. Designed with a flexible side-elasticated waist, pleated details, and breathable relaxed tailoring matching perfect casual style.',
    image: 'https://picsum.photos/seed/elder_pants/600/800',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Soft Off-White', 'Muted Gold', 'Desert Sand'],
    familyDemographic: 'Elders',
    isFeatured: false
  },
  {
    id: 'clo-07',
    name: 'Inaya Peach Georgette Flounced Frock',
    category: 'clothing',
    type: 'Apparel',
    price: 74.00,
    rating: 4.9,
    reviewsCount: 115,
    description: 'A charming, ultra-feminine, lightweight frock dress tailored from cloud-soft georgette fabric. Features fine layered ruffles, a synched ribbon waist, and micro-pleat details that dance beautifully.',
    image: IMAGES.georgetteFrock,
    badge: 'New',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Peach Silk', 'Blush Rose', 'Off-White'],
    familyDemographic: 'Women',
    isFeatured: true
  },
  {
    id: 'clo-08',
    name: 'Royale Heritage Embroidered Anarkali Suit',
    category: 'clothing',
    type: 'Apparel',
    price: 155.00,
    rating: 4.9,
    reviewsCount: 84,
    description: 'An exceptional celebration of classical artistry. Beautifully tailored peach and rose-red georgette silhouette featuring grand imperial sweeps, intricate golden zari floral embroidery, and a matching hand-spun chiffon dupatta.',
    image: IMAGES.anarkaliSuit,
    badge: 'Limited Edition',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Empress Pink & Gold', 'Soft Peach & Ivory'],
    familyDemographic: 'Women',
    isFeatured: true
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-01',
    author: 'Miraya S.',
    rating: 5,
    comment: 'The Radiant Elixir Serum is absolutely magical! My dry skin has completely vanished. I pair it with the Silk Wrap Dress which feels incredibly luxurious. This brand understands both beauty and high-end aesthetics!',
    date: '2026-05-18',
    avatarColor: 'bg-rose-100 text-rose-600',
    role: 'Verified Buyer'
  },
  {
    id: 'rev-02',
    author: 'Devendra K.',
    rating: 5,
    comment: 'Great finding clean products that suit both me and my mom. The linen blazer has a fabulous cut and the gold buttons are extremely high value. Fast checkout and lovely pink/peach boxes!',
    date: '2026-06-01',
    avatarColor: 'bg-amber-100 text-amber-600',
    role: 'Style Guide'
  },
  {
    id: 'rev-03',
    author: 'Nisha R.',
    rating: 4,
    comment: 'We booked a virtual style consultation and it was fantastic! The recommendations perfectly paired cosmetics with clothing types. Outstanding customer service and gorgeous floral designs.',
    date: '2026-06-08',
    avatarColor: 'bg-violet-100 text-violet-600',
    role: 'Skincare Lover'
  }
];

export const BEAUTY_SALON_SERVICES = [
  {
    id: 'serv-01',
    name: 'Virtual Skincare Consultation & Facial Scan',
    price: 0,
    duration: '30 Mins',
    description: 'Meet our senior dermatologist online to perform an interactive dermal visual scan and discover your ideal botanical routine.',
    expert: 'Dr. Ananya Ray, Skin Scientist'
  },
  {
    id: 'serv-02',
    name: 'Signature Bride & Wedding Style Portrait',
    price: 120,
    duration: '90 Mins',
    description: 'In-store luxurious fitting of our premium silk collections combined with a customized glowing bio-active makeup draft.',
    expert: 'Lina Sen, Head of Creative Fashion'
  },
  {
    id: 'serv-03',
    name: 'Multi-Generation Boutique Family Styling',
    price: 75,
    duration: '60 Mins',
    description: 'Styling package crafted specifically for kids, parents and grandparents to achieve harmonious apparel matching and skincare prep.',
    expert: 'Vikram Grover, Lead Family Stylist'
  }
];

export const PROMO_CODES = [
  { code: 'VINSHUWELCOME', discount: 15, label: '15% Off Your First Order' },
  { code: 'GLOWSEASON', discount: 10, label: '10% Off Eco-Beauty' },
];
