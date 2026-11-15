import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  Menu,
  Search,
  ShoppingCart,
  Star,
  Truck,
  RotateCcw,
  Headphones,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Shirt,
  Armchair,
  Sparkle,
  Dumbbell,
  Gamepad2,
  Apple,
  Car,
  Briefcase,
  Grid,
  Award,
  Check
} from 'lucide-react';
import TopNavbar from '@/react-app/components/TopNavbar';
import { useCart } from '@/react-app/contexts/CartContext';

interface ProductItem {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  discountBadge?: string;
  seller: string;
}

const newArrivals: ProductItem[] = [
  {
    id: 1,
    name: 'Kain Songket Silungkang Pandai Sikek Benang Emas',
    category: 'Tenun & Songket',
    price: 1850000,
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&h=500&fit=crop',
    rating: 4.9,
    reviews: 120,
    badge: 'New',
    seller: 'Pertenunan Minang Asli'
  },
  {
    id: 2,
    name: 'Keris Luk 7 Gayaman Surakarta Pamor Wos Wutah',
    category: 'Pusaka Tradisional',
    price: 3200000,
    image: 'https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?w=500&h=500&fit=crop',
    rating: 5.0,
    reviews: 86,
    badge: 'New',
    seller: 'Besalen Empu Joyo'
  },
  {
    id: 3,
    name: 'Tas Noken Anyaman Serat Kayu Asli Lembah Wamena',
    category: 'Kerajinan Anyam',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&h=500&fit=crop',
    rating: 4.8,
    reviews: 42,
    badge: 'New',
    seller: 'Mama Noken Papua'
  },
  {
    id: 4,
    name: 'Cangkir Gerabah Kasongan Set Isi 2 Tanah Liat Halus',
    category: 'Gerabah & Keramik',
    price: 185000,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&h=500&fit=crop',
    rating: 4.7,
    reviews: 64,
    badge: 'New',
    seller: 'Sanggar Kasongan Bantul'
  },
  {
    id: 5,
    name: 'Lampu Meja Ukir Kayu Jati Relief Wayang Minimalis',
    category: 'Dekorasi Rumah',
    price: 550000,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
    rating: 4.9,
    reviews: 91,
    badge: 'New',
    seller: 'Pengrajin Ukir Jepara'
  }
];

const featuredProducts: ProductItem[] = [
  {
    id: 6,
    name: 'Kecapi Sunda Rincik Kayu Mahoni Pelitur Akustik',
    category: 'Alat Musik',
    price: 650000,
    oldPrice: 850000,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=500&fit=crop',
    rating: 4.8,
    reviews: 73,
    discountBadge: '-24%',
    seller: 'Parahyangan Art'
  },
  {
    id: 7,
    name: 'Sandal Selop Kulit Sapi Tatah Ukir Tradisional Pria',
    category: 'Kriya Kulit',
    price: 320000,
    oldPrice: 380000,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop',
    rating: 4.9,
    reviews: 128,
    discountBadge: '-15%',
    seller: 'Mandiri Leather Magetan'
  },
  {
    id: 8,
    name: 'Set Lulur Rempah Tradisional Keraton Boreh Jawa Herbal',
    category: 'Kecantikan Adat',
    price: 175000,
    oldPrice: 235000,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop',
    rating: 4.9,
    reviews: 96,
    discountBadge: '-25%',
    seller: 'Pawon Herbal Solo'
  },
  {
    id: 9,
    name: 'Tumbler Stainless Bungkus Anyaman Bambu Halus Tasik',
    category: 'Gaya Hidup',
    price: 240000,
    oldPrice: 300000,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop',
    rating: 4.8,
    reviews: 58,
    discountBadge: '-20%',
    seller: 'Rajapolah Bamboo'
  },
  {
    id: 10,
    name: 'Matras Tenun Ikat Alami Alas Yoga & Meditasi Sumba',
    category: 'Kain & Tenun',
    price: 490000,
    oldPrice: 580000,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
    rating: 4.9,
    reviews: 110,
    discountBadge: '-15%',
    seller: 'Sanggar Tenun Prailiu'
  }
];

const categorySidebar = [
  { name: 'Kain & Tenun Adat', icon: Shirt },
  { name: 'Busana Tradisional', icon: Sparkles },
  { name: 'Dekorasi & Interior Etnik', icon: Armchair },
  { name: 'Perawatan Alami & Rempah', icon: Sparkle },
  { name: 'Pusaka & Senjata Tradisional', icon: Award },
  { name: 'Kerajinan Tangan & Anyaman', icon: Dumbbell },
  { name: 'Wayang, Topeng & Mainan Adat', icon: Gamepad2 },
  { name: 'Pangan & Kuliner Warisan', icon: Apple },
  { name: 'Alat Musik Tradisional', icon: Car },
  { name: 'Cinderamata Kantor & Souvenir', icon: Briefcase },
];

const blogArticles = [
  {
    id: 1,
    title: '5 Cara Merawat Kain Songket & Tenun Sutra Tetap Berkilau Alami',
    category: 'Tips Budaya',
    date: '10 Nov 2026',
    image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=500&h=300&fit=crop'
  },
  {
    id: 2,
    title: 'Panduan Pemula Mengenal Nilai Filosofis dan Luk pada Keris Jawa',
    category: 'Filosofi Adat',
    date: '05 Nov 2026',
    image: 'https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?w=500&h=300&fit=crop'
  },
  {
    id: 3,
    title: 'Menata Ruang Kerja Modern dengan Sentuhan Kriya Bambu & Kayu Jati',
    category: 'Dekorasi Rumah',
    date: '28 Okt 2026',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=300&fit=crop'
  }
];

const brandLogos = [
  { name: 'Danar Hadi', label: 'DANAR HADI' },
  { name: 'Batik Semar', label: 'BATIK SEMAR' },
  { name: 'Iwan Tirta', label: 'IWAN TIRTA' },
  { name: 'Sarinah', label: 'SARINAH' },
  { name: 'Besalen Surakarta', label: 'BESALEN SOLO' },
  { name: 'Prailiu Sumba', label: 'PRAILIU SUMBA' },
  { name: 'Celuk Silver', label: 'CELUK BALI' },
  { name: 'Kasongan Pottery', label: 'KASONGAN' }
];

export default function MarketplacePage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('Semua Kategori');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleBuy = (e: React.MouseEvent, product: ProductItem) => {
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
      selectedSize: 'Standar',
      selectedColor: 'Default',
    });

    const confirmCart = window.confirm(`"${product.name}" berhasil ditambahkan ke keranjang. Lihat keranjang belanja sekarang?`);
    if (confirmCart) {
      navigate('/cart');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-['Inter',system-ui,sans-serif] antialiased text-[13px]">
      
      {/* NAVBAR RESMI RUANGBUDAYA */}
      <TopNavbar />

      {/* JARAK KE BAWAH DARI NAVBAR (pt-20 memberi ruang lega sehingga strip promo tidak bertabrakan dengan navbar) */}
      <div className="pt-20">
        {/* SUB-HEADER / PROMO STRIP SESUAI TEMA BIRU UTAMA */}
        <div className="bg-[#1e3a8a] text-white text-[11px] py-2 px-4 shadow-xs">
          <div className="max-w-[1280px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4 text-blue-100">
              <span className="flex items-center gap-1.5 font-medium">
                <Truck className="w-3.5 h-3.5 text-blue-300" />
                Gratis Ongkir se-Indonesia Min. Belanja Rp 200rb
              </span>
              <span className="text-blue-400 hidden sm:inline">|</span>
              <span className="hidden sm:inline">Garansi 30 Hari Pengembalian Aman</span>
              <span className="text-blue-400 hidden md:inline">|</span>
              <span className="hidden md:inline">Diskon 10% untuk Transaksi Perdana!</span>
            </div>
          </div>
        </div>

        {/* SUB-NAVIGATION DARI GAMBAR 2 (TEMA BIRU) */}
        <div className="border-b border-blue-100 bg-white shadow-2xs">
          <div className="max-w-[1280px] mx-auto px-4 flex items-center justify-between gap-6 py-2.5">
            <div className="flex items-center gap-8 text-[12px] font-medium text-slate-600 overflow-x-auto no-scrollbar">
              <Link to="/marketplace" className="text-blue-600 font-bold whitespace-nowrap">Beranda Pasar</Link>
              <a href="#promo" className="hover:text-blue-600 whitespace-nowrap transition-colors">Promo Spesial</a>
              <a href="#new-arrivals" className="hover:text-blue-600 whitespace-nowrap transition-colors">Koleksi Baru</a>
              <a href="#featured" className="hover:text-blue-600 whitespace-nowrap transition-colors">Karya Terlaris</a>
              <a href="#brands" className="hover:text-blue-600 whitespace-nowrap transition-colors">Sanggar Mitra</a>
              <a href="#blog" className="hover:text-blue-600 whitespace-nowrap transition-colors">Kisah Pengrajin</a>
              <Link to="/cart" className="hover:text-blue-600 whitespace-nowrap transition-colors">Lacak Pesanan</Link>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="max-w-[1280px] mx-auto px-4 py-6 space-y-7">

        {/* SECTION 1: HERO ROW (Full Width Hero dengan Bar Pencarian & Dropdown Kategori di Atas) */}
        <section className="flex flex-col gap-4">
          {/* BAR PENCARIAN & DROPDOWN KATEGORI SEBELAH ATAS DARI GAMBAR BANNER */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Sebelah kiri: Kolom Pencarian Cepat */}
            <div className="relative w-full sm:flex-1">
              <input
                type="text"
                placeholder="Cari karya kriya, kain songket, keris, dekorasi adat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-[12px] bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-600 transition-all text-slate-800 placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            {/* Sebelah kanan: Dropdown Kategori Pilihan */}
            <div className="relative w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="w-full sm:w-auto flex items-center justify-between gap-2.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[12px] font-medium text-slate-700 hover:text-blue-600 transition-colors"
              >
                <span className="truncate max-w-[150px]">{activeCategory}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>

              {showCategoryDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-20" 
                    onClick={() => setShowCategoryDropdown(false)} 
                  />
                  <div className="absolute right-0 top-full mt-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1.5 divide-y divide-slate-100">
                    <button
                      onClick={() => {
                        setActiveCategory('Semua Kategori');
                        setShowCategoryDropdown(false);
                      }}
                      className="w-full px-3.5 py-2 text-left text-[12px] flex items-center justify-between hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <span className={activeCategory === 'Semua Kategori' ? 'font-bold text-blue-600' : 'text-slate-700'}>
                        Semua Kategori
                      </span>
                      {activeCategory === 'Semua Kategori' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                    {categorySidebar.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveCategory(item.name);
                          setShowCategoryDropdown(false);
                        }}
                        className="w-full px-3.5 py-2 text-left text-[12px] flex items-center justify-between hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <span className={activeCategory === item.name ? 'font-bold text-blue-600' : 'text-slate-700'}>
                          {item.name}
                        </span>
                        {activeCategory === item.name && <Check className="w-3.5 h-3.5 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Big Hero Banner Full Width */}
          <div className="rounded-xl bg-gradient-to-br from-blue-50/80 via-slate-50 to-blue-100/40 border border-blue-200/80 p-8 md:p-12 relative overflow-hidden min-h-[380px] flex flex-col justify-between shadow-xs">
            <div className="max-w-md z-10 space-y-3">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold tracking-wide uppercase">
                Kurasi Resmi Sanggar
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Hadirkan Budaya <br />Di Ruang Hunian Anda
              </h1>
              <p className="text-slate-600 text-[13px] md:text-[14px] leading-relaxed pt-1">
                Karya kriya otentik, keris pusaka, dan tenun sutra dari tangan maestro nusantara untuk memperindah setiap sudut rumah Anda.
              </p>
              <div className="pt-3">
                <a
                  href="#new-arrivals"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors active:scale-[0.98]"
                >
                  <span>Belanja Sekarang</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Pagination Dots at Bottom of Banner */}
            <div className="flex items-center gap-1.5 z-10 pt-4">
              <span className="w-5 h-1.5 rounded-full bg-blue-600" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            </div>

            {/* Right Side Visual Furniture + Lifestyle Showcase */}
            <div className="hidden sm:block absolute right-6 top-1/2 -translate-y-1/2 w-[340px] md:w-[380px] pointer-events-none">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=500&fit=crop"
                  alt="Ruang Budaya Showcase"
                  className="rounded-xl shadow-xl object-cover w-full h-[300px] border border-white"
                />
                <div className="absolute -top-3 -left-3 bg-white/95 backdrop-blur-xs border border-blue-100 rounded-lg p-2.5 shadow-md">
                  <span className="text-[10px] font-bold text-blue-600 block">Ruang Maestro</span>
                  <span className="text-[11px] font-semibold text-slate-800">Ukir Jati & Keramik Adat</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: 4 VALUE PROPOSITIONS BAR (TEMA BIRU) */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 border border-slate-200 rounded-xl bg-white p-4 shadow-xs">
          <div className="flex items-center gap-3.5 px-2">
            <Truck className="w-6 h-6 text-blue-600 shrink-0" />
            <div>
              <h4 className="text-[12px] font-bold text-slate-900 leading-tight">Gratis Ongkir</h4>
              <p className="text-[11px] text-slate-500">Min. transaksi Rp 200rb</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-2 border-l border-slate-100">
            <RotateCcw className="w-6 h-6 text-blue-600 shrink-0" />
            <div>
              <h4 className="text-[12px] font-bold text-slate-900 leading-tight">30 Hari Garansi</h4>
              <p className="text-[11px] text-slate-500">Pengembalian tanpa repot</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-2 border-l border-slate-100">
            <Headphones className="w-6 h-6 text-blue-600 shrink-0" />
            <div>
              <h4 className="text-[12px] font-bold text-slate-900 leading-tight">Layanan Kurator 24/7</h4>
              <p className="text-[11px] text-slate-500">Konsultasi keaslian karya</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-2 border-l border-slate-100">
            <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0" />
            <div>
              <h4 className="text-[12px] font-bold text-slate-900 leading-tight">Pembayaran Aman</h4>
              <p className="text-[11px] text-slate-500">Sertifikat garansi resmi</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: NEW ARRIVALS (5 KOLOM PERSIS GAMBAR 2) */}
        <section id="new-arrivals" className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h2 className="text-[16px] font-bold text-slate-900">Koleksi Rilisan Baru</h2>
            <a href="#new-arrivals" className="text-[12px] font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1">
              <span>Lihat Semua</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* 5-Column Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {newArrivals.map((product) => (
              <div
                key={product.id}
                className="group border border-slate-200 rounded-xl bg-white p-3 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image Container with Blue "New" Pill */}
                  <div className="relative aspect-square w-full rounded-lg bg-slate-50 overflow-hidden mb-2.5 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      New
                    </span>
                  </div>

                  {/* Title & Specs */}
                  <h3 className="font-semibold text-slate-900 text-[12px] line-clamp-2 leading-snug mb-1 min-h-[32px] group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mb-1">{product.category}</p>

                  {/* Price */}
                  <div className="text-[13px] font-bold text-slate-900 mb-1.5">
                    {formatPrice(product.price)}
                  </div>

                  {/* Stars Rating */}
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-2">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400">({product.reviews})</span>
                  </div>
                </div>

                {/* Bottom Action: Tombol Lihat + Icon Keranjang */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <Link
                    to={`/marketplace/${product.id}`}
                    className="flex-1 py-1.5 px-3 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-[11px] font-semibold rounded-lg text-center transition-colors"
                  >
                    Lihat
                  </Link>
                  <button
                    onClick={(e) => handleBuy(e, product)}
                    className="p-1.5 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 rounded-lg transition-colors flex items-center justify-center shrink-0 active:scale-95"
                    title="Tambah ke Keranjang"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: 2 DUAL PROMO BANNER CARDS (TEMA BIRU & ACCENT) */}
        <section id="promo" className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Promo Card 1 - Busana & Tenun Adat */}
          <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 p-6 sm:p-7 flex items-center justify-between relative overflow-hidden shadow-xs">
            <div className="max-w-[210px] sm:max-w-xs z-10">
              <span className="inline-block px-2 py-0.5 rounded bg-blue-600 text-white text-[9px] font-bold uppercase mb-2">
                Diskon s.d 50%
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight mb-1.5">
                Gaya Busana Tenun Nusantara
              </h3>
              <p className="text-slate-600 text-[11px] mb-3 leading-relaxed">
                Koleksi wastra tradisional modern untuk keseharian berkelas.
              </p>
              <a
                href="#new-arrivals"
                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <span>Lihat Busana</span>
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>
            <img
              src="https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=350&h=350&fit=crop"
              alt="Busana Tenun"
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-xl object-cover shadow-sm shrink-0 ml-3"
            />
          </div>

          {/* Promo Card 2 - Hunian & Dekorasi Kriya */}
          <div className="rounded-xl bg-gradient-to-r from-slate-50 to-sky-50 border border-sky-200/80 p-6 sm:p-7 flex items-center justify-between relative overflow-hidden shadow-xs">
            <div className="max-w-[210px] sm:max-w-xs z-10">
              <span className="inline-block px-2 py-0.5 rounded bg-sky-600 text-white text-[9px] font-bold uppercase mb-2">
                Diskon s.d 40%
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight mb-1.5">
                Kriya Etnik untuk Rumah Modern
              </h3>
              <p className="text-slate-600 text-[11px] mb-3 leading-relaxed">
                Dekorasi kayu jati, keramik kasongan, dan seni ukir dinding.
              </p>
              <a
                href="#featured"
                className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <span>Lihat Dekorasi</span>
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>
            <img
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=350&h=350&fit=crop"
              alt="Dekorasi Kriya"
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-xl object-cover shadow-sm shrink-0 ml-3"
            />
          </div>
        </section>

        {/* SECTION 5: FEATURED PRODUCTS (PRODUK UNGGULAN - 5 KOLOM) */}
        <section id="featured" className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h2 className="text-[16px] font-bold text-slate-900">Produk Unggulan Terlaris</h2>
            <a href="#featured" className="text-[12px] font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1">
              <span>Lihat Semua</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* 5-Column Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group border border-slate-200 rounded-xl bg-white p-3 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image Container with Red Discount Pill */}
                  <div className="relative aspect-square w-full rounded-lg bg-slate-50 overflow-hidden mb-2.5 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.discountBadge && (
                      <span className="absolute top-2 left-2 bg-rose-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        {product.discountBadge}
                      </span>
                    )}
                  </div>

                  {/* Title & Specs */}
                  <h3 className="font-semibold text-slate-900 text-[12px] line-clamp-2 leading-snug mb-1 min-h-[32px] group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mb-1">{product.category}</p>

                  {/* Price with strikethrough */}
                  <div className="flex items-baseline gap-1.5 mb-1.5">
                    <span className="text-[13px] font-bold text-slate-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-[10px] text-slate-400 line-through">
                        {formatPrice(product.oldPrice)}
                      </span>
                    )}
                  </div>

                  {/* Stars Rating */}
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-2">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400">({product.reviews})</span>
                  </div>
                </div>

                {/* Bottom Action: Tombol Lihat + Icon Keranjang */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <Link
                    to={`/marketplace/${product.id}`}
                    className="flex-1 py-1.5 px-3 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-[11px] font-semibold rounded-lg text-center transition-colors"
                  >
                    Lihat
                  </Link>
                  <button
                    onClick={(e) => handleBuy(e, product)}
                    className="p-1.5 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 rounded-lg transition-colors flex items-center justify-center shrink-0 active:scale-95"
                    title="Tambah ke Keranjang"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: FROM OUR BLOG / ARTIKEL BUDAYA (3 KOLOM) */}
        <section id="blog" className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h2 className="text-[16px] font-bold text-slate-900">Kabar Dari Sanggar Budaya</h2>
            <Link to="/academy" className="text-[12px] font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1">
              <span>Lihat Semua Artikel</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {blogArticles.map((article) => (
              <div
                key={article.id}
                className="border border-slate-200 rounded-xl bg-white overflow-hidden group hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="h-44 overflow-hidden bg-slate-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="text-[11px] text-slate-400 mb-1">
                    {article.category} • {article.date}
                  </div>
                  <h3 className="font-bold text-slate-900 text-[13px] leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
                    {article.title}
                  </h3>
                  <Link
                    to="/academy"
                    className="text-[11px] font-semibold text-blue-600 inline-flex items-center gap-1"
                  >
                    <span>Baca Selengkapnya</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: NEWSLETTER BANNER (TEMA BIRU) */}
        <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-xl p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-blue-700/80 text-white flex items-center justify-center shrink-0 border border-blue-400/30">
              <Sparkles className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <h3 className="text-[14px] font-bold leading-tight">
                Bergabung dalam Komunitas Pengrajin RuangBudaya
              </h3>
              <p className="text-[11px] text-blue-200 mt-0.5">
                Dapatkan info rilisan karya pusaka dan voucher promo budaya berkala langsung ke email Anda.
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto flex items-center gap-2">
            <input
              type="email"
              placeholder="Masukkan alamat email Anda"
              className="w-full md:w-72 px-3.5 py-2 text-[12px] bg-white text-slate-800 border border-transparent rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={() => alert('Terima kasih! Anda berhasil terdaftar.')}
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 text-[12px] font-semibold rounded-lg whitespace-nowrap transition-colors shadow-xs"
            >
              Langganan
            </button>
          </div>
        </section>

        {/* SECTION 8: BRANDS LOGO STRIP */}
        <section id="brands" className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h2 className="text-[16px] font-bold text-slate-900">Sanggar & Brand Terpercaya</h2>
            <a href="#brands" className="text-[12px] font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1">
              <span>Lihat Semua</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {brandLogos.map((brand, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl bg-white p-3 text-center flex items-center justify-center hover:border-blue-400 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <span className="text-[10px] font-extrabold text-slate-500 hover:text-blue-600 tracking-wider">
                  {brand.label}
                </span>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* FOOTER WARNA BIRU TUA (DEEP NAVY BLUE SESUAI TEMA WEB RUANGBUDAYA) */}
      <footer className="bg-[#0f172a] text-slate-300 mt-14 pt-10 pb-6 border-t border-slate-800 text-[12px]">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-8 border-b border-white/10">
            {/* Col 1: Brand Info */}
            <div className="md:col-span-2 space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
                  R
                </div>
                <span className="text-lg font-black text-white tracking-tight">Ruang<span className="text-blue-400">Budaya</span></span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed max-w-sm">
                Pasar Budaya Nusantara: Wadah digital resmi kurasi karya seni, kriya, tenun, pusaka, dan ornamen tradisional nusantara langsung dari sanggar daerah.
              </p>
              <div className="text-[11px] text-blue-400 font-medium">
                Lestarikan Seni, Sejahterakan Pengrajin Lokal.
              </div>
            </div>

            {/* Col 2: Kategori */}
            <div>
              <h5 className="font-bold text-white text-[12px] mb-2.5">Kategori Pasar</h5>
              <ul className="space-y-1.5 text-slate-400 text-[11px]">
                <li><a href="#new-arrivals" className="hover:text-blue-400 transition-colors">Semua Kategori</a></li>
                <li><a href="#new-arrivals" className="hover:text-blue-400 transition-colors">Kain & Tenun Adat</a></li>
                <li><a href="#featured" className="hover:text-blue-400 transition-colors">Pusaka & Keris Tradisional</a></li>
                <li><a href="#featured" className="hover:text-blue-400 transition-colors">Dekorasi & Interior Etnik</a></li>
              </ul>
            </div>

            {/* Col 3: Bantuan */}
            <div>
              <h5 className="font-bold text-white text-[12px] mb-2.5">Pusat Bantuan</h5>
              <ul className="space-y-1.5 text-slate-400 text-[11px]">
                <li><span className="hover:text-blue-400 transition-colors cursor-pointer">Lacak Pesanan</span></li>
                <li><span className="hover:text-blue-400 transition-colors cursor-pointer">Pengembalian Barang</span></li>
                <li><span className="hover:text-blue-400 transition-colors cursor-pointer">Kebijakan Pengiriman</span></li>
                <li><span className="hover:text-blue-400 transition-colors cursor-pointer">FAQ & Bantuan Kurasi</span></li>
              </ul>
            </div>

            {/* Col 4: Platform */}
            <div>
              <h5 className="font-bold text-white text-[12px] mb-2.5">Tentang Platform</h5>
              <ul className="space-y-1.5 text-slate-400 text-[11px]">
                <li><Link to="/" className="hover:text-blue-400 transition-colors">Beranda Utama</Link></li>
                <li><Link to="/crowdfunding" className="hover:text-blue-400 transition-colors">Donasi Budaya</Link></li>
                <li><Link to="/academy" className="hover:text-blue-400 transition-colors">Akademi Seni</Link></li>
                <li><Link to="/games" className="hover:text-blue-400 transition-colors">Game Interaktif</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <p>© 2026 RuangBudaya. Seluruh hak cipta dilindungi.</p>
            <div className="flex gap-4">
              <span className="hover:text-slate-400 cursor-pointer">Kebijakan Privasi</span>
              <span>•</span>
              <span className="hover:text-slate-400 cursor-pointer">Syarat & Ketentuan</span>
              <span>•</span>
              <span className="hover:text-slate-400 cursor-pointer">Peta Situs</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
