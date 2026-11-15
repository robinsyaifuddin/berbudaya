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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Pasar Budaya Nusantara</h1>
              <p className="text-gray-600 text-sm">Menampilkan <span className="font-semibold">{products.length} produk</span> dari <span className="font-semibold">1000+ produk</span></p>
            </div>

            {/* Header with Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Filter</span>
                  
                  {/* Category Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowCategoryDropdown(!showCategoryDropdown);
                        setShowLocationDropdown(false);
                        setShowSortDropdown(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-gray-400 transition-colors"
                    >
                      <span>Kategori</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {showCategoryDropdown && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowCategoryDropdown(false)} />
                        <div className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-xl border border-gray-200 z-50 min-w-[200px]">
                          {categories.map((cat) => (
                            <button
                              key={cat}
                              onClick={() => {
                                setSelectedCategory(cat);
                                setShowCategoryDropdown(false);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between"
                            >
                              <span className="text-sm">{cat}</span>
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
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-gray-400 transition-colors"
                    >
                      <span>Lokasi</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {showLocationDropdown && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowLocationDropdown(false)} />
                        <div className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-xl border border-gray-200 z-50 min-w-[200px]">
                          {locations.map((loc) => (
                            <button
                              key={loc}
                              onClick={() => {
                                setSelectedLocation(loc);
                                setShowLocationDropdown(false);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between"
                            >
                              <span className="text-sm">{loc}</span>
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
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-gray-400 transition-colors"
                  >
                    <span>Urutkan</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {showSortDropdown && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowSortDropdown(false)} />
                      <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border border-gray-200 z-50 min-w-[220px]">
                        {sortOptions.map((sort) => (
                          <button
                            key={sort}
                            onClick={() => {
                              setSelectedSort(sort);
                              setShowSortDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between"
                          >
                            <span className="text-sm">{sort}</span>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/marketplace/${product.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  {/* Product Image */}
                  <div className="relative h-48">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.badge && (
                      <div className={`absolute top-3 left-3 px-3 py-1 rounded text-xs font-bold text-white ${
                        product.badge === 'Sale' ? 'bg-red-600' :
                        product.badge === 'Popular' ? 'bg-orange-600' :
                        'bg-blue-600'
                      }`}>
                        {product.badge === 'Sale' && product.discount ? `-${product.discount}%` : product.badge}
                      </div>
                    )}
                    <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Product Content */}
                  <div className="p-4">
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(product.rating)}
                      <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                    </div>

                    <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2 min-h-[48px]">
                      {product.name}
                    </h3>

                    {/* Seller */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs text-gray-700 font-medium">{product.seller}</span>
                      {product.verified && (
                        <Check className="w-4 h-4 text-blue-600" />
                      )}
                    </div>

                    {/* Location */}
                    <p className="text-xs text-gray-500 mb-3">{product.location}</p>

                    {/* Price */}
                    <div className="mb-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                        {product.oldPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            {formatPrice(product.oldPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
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
