import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ChevronDown, Check, Star, Heart, ShoppingCart } from 'lucide-react';
import TopNavbar from '@/react-app/components/TopNavbar';
import CommunitySidebar from '@/react-app/components/CommunitySidebar';
import { useCart } from '@/react-app/contexts/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  seller: string;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  location: string;
  badge?: string;
  discount?: number;
  verified: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Songket Pandai Sikek Pucuak Rabuang Emas',
    price: 3850000,
    oldPrice: 4200000,
    seller: 'Pertenunan Harapan Ibu',
    image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=400&h=400&fit=crop',
    rating: 4.95,
    reviews: 78,
    category: 'Batik & Kain',
    location: 'Tanah Datar, Sumbar',
    badge: 'Pilihan Maestro',
    discount: 8,
    verified: true
  },
  {
    id: 2,
    name: 'Keris Gayaman Solo Luk 7 Pamor Wos Wutah',
    price: 5200000,
    oldPrice: 5800000,
    seller: 'Besalen Empu Subandi Joyo',
    image: 'https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?w=400&h=400&fit=crop',
    rating: 5.0,
    reviews: 42,
    category: 'Senjata Tradisional',
    location: 'Surakarta, Jateng',
    badge: 'Warisan Langka',
    discount: 10,
    verified: true
  },
  {
    id: 3,
    name: 'Kain Tenun Ikat Sumba Timur Patola Ratu',
    price: 2950000,
    seller: 'Sanggar Tenun Oriang Prailiu',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 56,
    category: 'Batik & Kain',
    location: 'Sumba Timur, NTT',
    badge: 'Karya Terverifikasi',
    verified: true
  },
  {
    id: 4,
    name: 'Wayang Kulit Gatotkaca Gagrag Banyumasan',
    price: 1850000,
    oldPrice: 2100000,
    seller: 'Paguyuban Gendon Giri',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    rating: 4.88,
    reviews: 64,
    category: 'Wayang & Seni',
    location: 'Banyumas, Jateng',
    badge: 'Best Seller',
    discount: 12,
    verified: true
  },
  {
    id: 5,
    name: 'Noken Rajut Serat Kulit Kayu Asli Lembah Baliem',
    price: 650000,
    seller: 'Mama-Mama Noken Wamena',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=400&fit=crop',
    rating: 4.98,
    reviews: 112,
    category: 'Kerajinan',
    location: 'Wamena, Papua',
    badge: 'Pilihan Maestro',
    verified: true
  },
  {
    id: 6,
    name: 'Kecapi Sunda Rincik Perahu Ukir Kujang Kayu Mahoni',
    price: 1450000,
    oldPrice: 1650000,
    seller: 'Bengkel Nada Parahyangan',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
    rating: 4.92,
    reviews: 38,
    category: 'Alat Musik',
    location: 'Sumedang, Jabar',
    badge: 'Karya Terverifikasi',
    discount: 12,
    verified: true
  }
];

const categories = ['Semua', 'Batik & Kain', 'Kerajinan', 'Alat Musik', 'Wayang & Seni', 'Perhiasan', 'Kuliner'];
const locations = ['Semua', 'Jawa', 'Sumatera', 'Bali', 'Kalimantan', 'Sulawesi'];
const sortOptions = ['Terbaru', 'Harga Terendah', 'Harga Tertinggi', 'Rating Tertinggi', 'Terpopuler'];

export default function MarketplacePage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedLocation, setSelectedLocation] = useState('Semua');
  const [selectedSort, setSelectedSort] = useState('Terbaru');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      seller: product.seller,
      category: product.category,
      selectedSize: product.category === 'Batik & Kain' ? '2m x 1.15m' : 
                     product.category === 'Wayang & Seni' ? 'Tinggi 60cm' :
                     product.category === 'Alat Musik' ? 'Set 5 Nada' :
                     product.category === 'Senjata Tradisional' ? 'Luk 5' :
                     product.category === 'Kerajinan' ? 'Set Kecil (3 items)' : 'Default',
      selectedColor: 'Default',
    });
    
    // Show notification and redirect to cart
    setTimeout(() => {
      const goToCart = window.confirm('Produk berhasil ditambahkan ke keranjang! Lihat keranjang sekarang?');
      if (goToCart) {
        navigate('/cart');
      }
    }, 100);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 pt-18 sm:pt-20 pb-20 md:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Community */}
          <div className="hidden lg:block lg:col-span-3">
            <CommunitySidebar />
          </div>

          {/* Mobile Community Banner */}
          <div className="lg:hidden bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-sm text-gray-900 mb-1">Marketplace Budaya</h3>
                <p className="text-xs text-gray-600">Jelajahi produk kebudayaan terpercaya dari seluruh Indonesia</p>
              </div>
              <Link 
                to="/marketplace"
                className="ml-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                Jelajahi
              </Link>
            </div>
          </div>

          {/* Right Content - Products */}
          <div className="col-span-1 lg:col-span-9">
            {/* Page Title */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1.5">Pasar Budaya Nusantara</h1>
              <p className="text-slate-600 text-sm">Menampilkan <span className="font-semibold text-slate-800">{filteredProducts.length} karya otentik</span> kurasi langsung dari sanggar & maestro daerah</p>
            </div>

            {/* Header with Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-3 sm:p-4 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">Filter</span>
                  
                  {/* Category Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowCategoryDropdown(!showCategoryDropdown);
                        setShowLocationDropdown(false);
                        setShowSortDropdown(false);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 border border-slate-200 rounded-full text-xs sm:text-sm font-medium text-slate-700 hover:border-slate-400 bg-slate-50/50 hover:bg-white transition-colors"
                    >
                      <span>{selectedCategory}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    {showCategoryDropdown && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowCategoryDropdown(false)} />
                        <div className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-xl border border-slate-200 z-50 min-w-[200px] py-1">
                          {categories.map((cat) => (
                            <button
                              key={cat}
                              onClick={() => {
                                setSelectedCategory(cat);
                                setShowCategoryDropdown(false);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center justify-between transition-colors"
                            >
                              <span className="text-xs sm:text-sm text-slate-700">{cat}</span>
                              {selectedCategory === cat && <Check className="w-4 h-4 text-blue-600" />}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Location Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowLocationDropdown(!showLocationDropdown);
                        setShowCategoryDropdown(false);
                        setShowSortDropdown(false);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 border border-slate-200 rounded-full text-xs sm:text-sm font-medium text-slate-700 hover:border-slate-400 bg-slate-50/50 hover:bg-white transition-colors"
                    >
                      <span>{selectedLocation}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    {showLocationDropdown && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowLocationDropdown(false)} />
                        <div className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-xl border border-slate-200 z-50 min-w-[200px] py-1">
                          {locations.map((loc) => (
                            <button
                              key={loc}
                              onClick={() => {
                                setSelectedLocation(loc);
                                setShowLocationDropdown(false);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center justify-between transition-colors"
                            >
                              <span className="text-xs sm:text-sm text-slate-700">{loc}</span>
                              {selectedLocation === loc && <Check className="w-4 h-4 text-blue-600" />}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowSortDropdown(!showSortDropdown);
                      setShowCategoryDropdown(false);
                      setShowLocationDropdown(false);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 border border-slate-200 rounded-full text-xs sm:text-sm font-medium text-slate-700 hover:border-slate-400 bg-slate-50/50 hover:bg-white transition-colors"
                  >
                    <span>{selectedSort}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  {showSortDropdown && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowSortDropdown(false)} />
                      <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-xl border border-slate-200 z-50 min-w-[220px] py-1">
                        {sortOptions.map((sort) => (
                          <button
                            key={sort}
                            onClick={() => {
                              setSelectedSort(sort);
                              setShowSortDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center justify-between transition-colors"
                          >
                            <span className="text-xs sm:text-sm text-slate-700">{sort}</span>
                            {selectedSort === sort && <Check className="w-4 h-4 text-blue-600" />}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/marketplace/${product.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-lg border border-slate-200/90 hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Product Image */}
                    <div className="relative h-52 overflow-hidden bg-slate-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.badge && (
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold text-white bg-slate-900/85 backdrop-blur-xs shadow-xs">
                          {product.badge}
                        </div>
                      )}
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full text-slate-600 hover:text-rose-500 shadow-xs backdrop-blur-xs transition-colors"
                        title="Simpan ke Wishlist"
                      >
                        <Heart className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Product Content */}
                    <div className="p-4">
                      {/* Rating & Reviews */}
                      <div className="flex items-center gap-1.5 mb-2">
                        {renderStars(product.rating)}
                        <span className="text-xs font-semibold text-slate-700 ml-0.5">{product.rating}</span>
                        <span className="text-xs text-slate-400">({product.reviews})</span>
                      </div>

                      <h3 className="font-semibold text-slate-900 text-sm mb-2 line-clamp-2 min-h-[40px] group-hover:text-blue-600 transition-colors leading-snug">
                        {product.name}
                      </h3>

                      {/* Seller & Verification */}
                      <div className="flex items-center gap-1.5 mb-2 text-xs text-slate-600">
                        <span className="truncate font-medium">{product.seller}</span>
                        {product.verified && (
                          <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-blue-600 text-white text-[8px] font-bold shrink-0">✓</span>
                        )}
                      </div>

                      {/* Location */}
                      <p className="text-[11px] text-slate-400 mb-3">{product.location}</p>

                      {/* Price */}
                      <div className="mb-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-slate-900">
                            {formatPrice(product.price)}
                          </span>
                          {product.oldPrice && (
                            <span className="text-xs text-slate-400 line-through">
                              {formatPrice(product.oldPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="px-4 pb-4">
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-full bg-slate-900 hover:bg-blue-600 text-white py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 active:scale-[0.98] shadow-xs"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Tambah ke Keranjang</span>
                    </button>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <button className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors">
                Muat Lebih Banyak
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
