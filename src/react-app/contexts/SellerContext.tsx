import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ShopProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  stock: number;
  image: string;
  description: string;
  cultureOrigin: string; // misal 'Surakarta, Jawa Tengah'
  material: string;
  isActive: boolean;
  soldCount: number;
  rating: number;
  reviewsCount: number;
  seller: string;
  sellerCity: string;
}

export interface ShopOrder {
  id: string; // e.g. ORD-2026-001
  customerName: string;
  customerCity: string;
  items: {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  totalAmount: number;
  status: 'perlu_diproses' | 'dikirim' | 'selesai' | 'dibatalkan';
  courier: string;
  trackingNumber?: string;
  createdAt: string;
}

export interface ShopProfile {
  name: string;
  username: string;
  slogan: string;
  description: string;
  category: string;
  city: string;
  address: string;
  phone: string;
  avatar: string;
  banner: string;
  isOpen: boolean;
  joinedDate: string;
  rating: number;
}

interface SellerContextType {
  shop: ShopProfile | null;
  products: ShopProduct[];
  orders: ShopOrder[];
  hasShop: boolean;
  createShop: (profile: Omit<ShopProfile, 'rating' | 'isOpen' | 'joinedDate'>) => void;
  updateShopProfile: (profile: Partial<ShopProfile>) => void;
  addProduct: (product: Omit<ShopProduct, 'id' | 'soldCount' | 'rating' | 'reviewsCount' | 'seller' | 'sellerCity'>) => void;
  updateProduct: (id: number, product: Partial<ShopProduct>) => void;
  deleteProduct: (id: number) => void;
  toggleProductStatus: (id: number) => void;
  shipOrder: (orderId: string, trackingNumber: string) => void;
  completeOrder: (orderId: string) => void;
}

const STORAGE_KEY_SHOP = 'budayago_seller_shop';
const STORAGE_KEY_PRODUCTS = 'budayago_seller_products';
const STORAGE_KEY_ORDERS = 'budayago_seller_orders';

const initialDemoProducts: ShopProduct[] = [
  {
    id: 901,
    name: 'Wayang Kulit Arjuna Gagrak Surakarta Emas Asli',
    category: 'Wayang & Seni Teater',
    price: 1850000,
    oldPrice: 2100000,
    stock: 5,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=600&fit=crop',
    description: 'Wayang kulit tokoh Arjuna tatahan halus tatahan khas Surakarta dengan cat prada emas asli dan gagang tanduk kerbau bule.',
    cultureOrigin: 'Surakarta, Jawa Tengah',
    material: 'Kulit Kerbau Kualitas Super & Emas Prada',
    isActive: true,
    soldCount: 14,
    rating: 4.9,
    reviewsCount: 12,
    seller: 'Sanggar Seni Budaya Nusantara',
    sellerCity: 'Surakarta'
  },
  {
    id: 902,
    name: 'Kain Tenun Ikat Toraja Motif Sekomandi Sutra',
    category: 'Tenun & Songket',
    price: 950000,
    oldPrice: 1200000,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=600&h=600&fit=crop',
    description: 'Kain tenun ikat asli buatan tangan mama penenun Toraja menggunakan pewarna alami akar kayu dan serat sutra alam.',
    cultureOrigin: 'Toraja, Sulawesi Selatan',
    material: 'Sutra Alam & Pewarna Akar Morinda',
    isActive: true,
    soldCount: 9,
    rating: 5.0,
    reviewsCount: 8,
    seller: 'Sanggar Seni Budaya Nusantara',
    sellerCity: 'Surakarta'
  },
  {
    id: 903,
    name: 'Keris Kamardikan Luk 7 Pamor Beras Wutah',
    category: 'Kriya & Senjata Tradisional',
    price: 3200000,
    stock: 2,
    image: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=600&h=600&fit=crop',
    description: 'Karya empu masa kini dengan pamor Beras Wutah filosofi kemakmuran, warangka kayu trembalo sepuh kuno.',
    cultureOrigin: 'Madura & Yogyakarta',
    material: 'Besi Waja & Pamor Nikel Meteorit',
    isActive: true,
    soldCount: 3,
    rating: 4.8,
    reviewsCount: 3,
    seller: 'Sanggar Seni Budaya Nusantara',
    sellerCity: 'Surakarta'
  }
];

const initialDemoOrders: ShopOrder[] = [
  {
    id: 'BDY-2026-901',
    customerName: 'Ahmad Fauzi',
    customerCity: 'Jakarta Selatan, DKI Jakarta',
    items: [
      {
        productId: 901,
        productName: 'Wayang Kulit Arjuna Gagrak Surakarta Emas Asli',
        quantity: 1,
        price: 1850000,
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&h=300&fit=crop'
      }
    ],
    totalAmount: 1875000,
    status: 'perlu_diproses',
    courier: 'JNE YES (Next Day)',
    createdAt: '19 Nov 2026, 14:20'
  },
  {
    id: 'BDY-2026-898',
    customerName: 'Siti Rahmawati',
    customerCity: 'Bandung, Jawa Barat',
    items: [
      {
        productId: 902,
        productName: 'Kain Tenun Ikat Toraja Motif Sekomandi Sutra',
        quantity: 1,
        price: 950000,
        image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=300&h=300&fit=crop'
      }
    ],
    totalAmount: 972000,
    status: 'dikirim',
    courier: 'J&T Express',
    trackingNumber: 'JT9982310029ID',
    createdAt: '18 Nov 2026, 19:45'
  },
  {
    id: 'BDY-2026-874',
    customerName: 'Budi Santoso',
    customerCity: 'Surabaya, Jawa Timur',
    items: [
      {
        productId: 903,
        productName: 'Keris Kamardikan Luk 7 Pamor Beras Wutah',
        quantity: 1,
        price: 3200000,
        image: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=300&h=300&fit=crop'
      }
    ],
    totalAmount: 3225000,
    status: 'selesai',
    courier: 'SiCepat Reg',
    trackingNumber: 'SCP7728192019',
    createdAt: '15 Nov 2026, 11:10'
  }
];

const SellerContext = createContext<SellerContextType | undefined>(undefined);

export const SellerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shop, setShop] = useState<ShopProfile | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SHOP);
    return saved ? JSON.parse(saved) : null;
  });

  const [products, setProducts] = useState<ShopProduct[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<ShopOrder[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
    return saved ? JSON.parse(saved) : [];
  });

  // Sync state to LocalStorage
  useEffect(() => {
    if (shop) {
      localStorage.setItem(STORAGE_KEY_SHOP, JSON.stringify(shop));
    } else {
      localStorage.removeItem(STORAGE_KEY_SHOP);
    }
  }, [shop]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
  }, [orders]);

  const createShop = (profileData: Omit<ShopProfile, 'rating' | 'isOpen' | 'joinedDate'>) => {
    const newShop: ShopProfile = {
      ...profileData,
      isOpen: true,
      rating: 4.9,
      joinedDate: 'November 2026'
    };
    setShop(newShop);
    // Seed initial products & orders for immediate rich demo
    if (products.length === 0) {
      setProducts(initialDemoProducts.map(p => ({ ...p, seller: newShop.name, sellerCity: newShop.city })));
    }
    if (orders.length === 0) {
      setOrders(initialDemoOrders);
    }
  };

  const updateShopProfile = (updatedFields: Partial<ShopProfile>) => {
    if (!shop) return;
    setShop(prev => prev ? { ...prev, ...updatedFields } : null);
  };

  const addProduct = (productData: Omit<ShopProduct, 'id' | 'soldCount' | 'rating' | 'reviewsCount' | 'seller' | 'sellerCity'>) => {
    const newId = Date.now();
    const newProduct: ShopProduct = {
      ...productData,
      id: newId,
      soldCount: 0,
      rating: 5.0,
      reviewsCount: 0,
      seller: shop ? shop.name : 'Toko Seni Budaya',
      sellerCity: shop ? shop.city : 'Indonesia'
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: number, updatedFields: Partial<ShopProduct>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const toggleProductStatus = (id: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
  };

  const shipOrder = (orderId: string, trackingNumber: string) => {
    setOrders(prev => prev.map(ord => ord.id === orderId ? {
      ...ord,
      status: 'dikirim',
      trackingNumber
    } : ord));
  };

  const completeOrder = (orderId: string) => {
    setOrders(prev => prev.map(ord => ord.id === orderId ? {
      ...ord,
      status: 'selesai'
    } : ord));
  };

  return (
    <SellerContext.Provider value={{
      shop,
      products,
      orders,
      hasShop: !!shop,
      createShop,
      updateShopProfile,
      addProduct,
      updateProduct,
      deleteProduct,
      toggleProductStatus,
      shipOrder,
      completeOrder
    }}>
      {children}
    </SellerContext.Provider>
  );
};

export const useSeller = () => {
  const context = useContext(SellerContext);
  if (!context) {
    throw new Error('useSeller must be used within a SellerProvider');
  }
  return context;
};
