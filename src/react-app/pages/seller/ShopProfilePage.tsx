import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { 
  Store, MapPin, CheckCircle2, Share2, ArrowLeft,
  Package, Star, MessageCircle, ShieldCheck, Heart,
  Phone, Globe, Clock, ChevronRight, Award, Plus, Sparkles,
  Search, Filter, ShoppingCart
} from 'lucide-react';
import TopNavbar from '@/react-app/components/TopNavbar';
import VerifiedBadge from '@/react-app/components/VerifiedBadge';
import { useSeller } from '@/react-app/contexts/SellerContext';
import { useNotification } from '@/react-app/contexts/NotificationContext';
import { useCart } from '@/react-app/contexts/CartContext';

export default function ShopProfilePage() {
  const navigate = useNavigate();
  const { shop, products } = useSeller();
  const { success } = useNotification();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState<'katalog' | 'tentang' | 'ulasan'>('katalog');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFollowing, setIsFollowing] = useState(false);

  if (!shop) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
        <TopNavbar />
        <div className="pt-28 max-w-xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Store className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Toko Tidak Ditemukan</h2>
          <p className="text-xs text-slate-500 mt-1 mb-6">Profil toko belum terdaftar atau Anda belum membuka gerai.</p>
          <Link
            to="/seller"
            className="px-5 py-2.5 bg-[#133384] text-white text-xs font-bold rounded-xl shadow-xs"
          >
            Buka Seller Center
          </Link>
        </div>
      </div>
    );
  }

  const totalSold = products.reduce((acc, p) => acc + p.soldCount, 0);

  const categories = ['Semua', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(p => {
    const matchCat = selectedCategory === 'Semua' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.cultureOrigin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      success('Tautan etalase profil toko berhasil disalin!', 'Tersalin');
    }
  };

  const handleToggleFollow = () => {
    setIsFollowing(!isFollowing);
    success(
      !isFollowing ? `Anda resmi mengikuti toko resmi ${shop.name}` : `Berhenti mengikuti toko ${shop.name}`,
      'Berhasil'
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-24">
      <TopNavbar />

      {/* Navigation Sub-Header */}
      <div className="pt-20 pb-3 bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link
            to="/seller"
            className="inline-flex items-center gap-2 text-base font-medium text-blue-700 hover:text-blue-800 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Kembali</span>
          </Link>
        </div>
      </div>

      {/* Hero / Cover Photo Banner */}
      <div className="bg-white border-b border-slate-200/80 shadow-xs">
        <div className="max-w-6xl mx-auto">
          {/* Cover Container */}
          <div className="relative h-44 sm:h-56 md:h-64 lg:h-72 w-full bg-slate-900 overflow-hidden md:rounded-b-2xl">
            <img
              src={shop.banner || 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=1600&auto=format&fit=crop&q=80'}
              alt={shop.name}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-black/20" />
          </div>

          {/* Shop Header Details */}
          <div className="px-4 sm:px-6 pt-5 pb-4">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
              {/* Avatar + Title Group */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left relative z-10">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden p-1 bg-white shadow-md border border-slate-200 shrink-0">
                  <img
                    src={shop.avatar}
                    alt={shop.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                    <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-snug">
                      {shop.name}
                    </h1>
                    <VerifiedBadge className="w-5 h-5 text-[#1D9BF0] shrink-0" />
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl leading-relaxed">
                    {shop.slogan || shop.description}
                  </p>

                  <div className="text-xs text-slate-500 flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                    <span className="inline-flex items-center gap-1 text-slate-700 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-[#133384]" />
                      {shop.city}
                    </span>
                    <span>•</span>
                    <span>
                      <strong className="text-slate-900">★ {shop.rating}</strong> Rating Toko
                    </span>
                    <span>•</span>
                    <span>
                      <strong className="text-slate-900">{totalSold}</strong> Karya Terjual
                    </span>
                    <span>•</span>
                    <span>
                      Bergabung <strong className="text-slate-900">{shop.joinedDate}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center sm:justify-start md:justify-end gap-2.5 flex-wrap pt-2 md:pt-1">
                <button
                  onClick={handleToggleFollow}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs active:scale-[0.98] ${
                    isFollowing
                      ? 'bg-blue-50 text-blue-700 border border-blue-300 hover:bg-blue-100'
                      : 'bg-[#133384] hover:bg-[#1844A6] text-white'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mengikuti</span>
                    </>
                  ) : (
                    <>
                      <span>+ Ikuti Toko</span>
                    </>
                  )}
                </button>

                <Link
                  to="/seller"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-all shadow-2xs"
                >
                  <Store className="w-4 h-4 text-slate-500" />
                  <span>Kelola di Seller Center</span>
                </Link>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-all shadow-2xs"
                  title="Bagikan Tautan Toko"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs (Katalog, Tentang, Ulasan) */}
            <div className="flex items-center gap-6 sm:gap-8 mt-6 overflow-x-auto scrollbar-none border-b border-slate-200">
              {[
                { key: 'katalog', label: `Katalog Karya (${products.length})`, icon: Package },
                { key: 'tentang', label: 'Tentang & Filosofi', icon: ShieldCheck },
                { key: 'ulasan', label: `Ulasan Pembeli (4.9)`, icon: Star },
              ].map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`inline-flex items-center gap-2 pb-3.5 pt-2 text-xs sm:text-sm font-bold whitespace-nowrap transition-colors relative ${
                      isActive ? 'text-[#133384]' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#133384]' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#133384] rounded-t-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        {/* TAB 1: KATALOG KARYA */}
        {activeTab === 'katalog' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Filter & Pencarian Form Dropdown Bersih */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center gap-3">
              {/* Kolom Pencarian Penuh */}
              <div className="relative w-full flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Cari karya di etalase toko ini..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#133384] transition-colors"
                />
              </div>

              {/* Dropdown Kategori Sesuai Style Umum Web (Marketplace Style) */}
              <div className="relative w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="w-full sm:w-auto flex items-center justify-between gap-2.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <span className="truncate max-w-[150px]">{selectedCategory === 'Semua' ? 'Semua Kategori' : selectedCategory}</span>
                  <ChevronRight className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${showCategoryDropdown ? '-rotate-90' : 'rotate-90'}`} />
                </button>

                {showCategoryDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-20" 
                      onClick={() => setShowCategoryDropdown(false)} 
                    />
                    <div className="absolute right-0 top-full mt-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1.5 divide-y divide-slate-100 max-h-64 overflow-y-auto">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat);
                            setShowCategoryDropdown(false);
                          }}
                          className="w-full px-3.5 py-2 text-left text-xs sm:text-sm flex items-center justify-between hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <span className={selectedCategory === cat ? 'font-bold text-blue-600' : 'text-slate-700'}>
                            {cat === 'Semua' ? 'Semua Kategori' : cat}
                          </span>
                          {selectedCategory === cat && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center shadow-xs">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-800">Belum Ada Produk di Kategori Ini</h4>
                <p className="text-xs text-slate-500 mt-1">Pilih kategori lain untuk melihat koleksi karya kriya.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                {filteredProducts.map((product) => (
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

                      {/* Title */}
                      <h3 className="font-semibold text-slate-900 text-[12px] line-clamp-2 leading-snug mb-1 min-h-[32px] group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>

                      {/* Price */}
                      <div className="text-[13px] font-bold text-slate-900 mb-1.5">
                        Rp {product.price.toLocaleString('id-ID')}
                      </div>

                      {/* Stars Rating */}
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-2">
                        <div className="flex items-center text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400">({product.soldCount > 0 ? product.soldCount * 8 + 12 : 12})</span>
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
                        onClick={() => {
                          addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            category: product.category,
                            seller: shop.name,
                            quantity: 1
                          });
                          success(`"${product.name}" dimasukkan ke keranjang!`, 'Berhasil');
                        }}
                        className="p-1.5 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 rounded-lg transition-colors flex items-center justify-center shrink-0 active:scale-95"
                        title="Tambah ke Keranjang"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TENTANG & FILOSOFI TOKO */}
        {activeTab === 'tentang' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-150">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 mb-3">Tentang Toko & Komitmen Kriya</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {shop.description || 'Sanggar kriya budaya ini berdedikasi menjaga orisinalitas karya tradisi nusantara. Setiap produk diproduksi oleh para pengrajin lokal berpengalaman dengan standar mutu pengerjaan yang terjamin.'}
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 mb-3">Alamat Penjemputan & Workshop</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {shop.address || `Workshop Sanggar ${shop.name}, ${shop.city}`}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Kota Pengiriman</span>
                    <span className="font-semibold text-slate-800">{shop.city}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Layanan Kurir</span>
                    <span className="font-semibold text-slate-800">JNE, J&T, SiCepat, Pos Indonesia</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Kanan Ringkasan Toko */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Informasi Kontak Resmi
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-3 text-slate-600">
                    <Phone className="w-4 h-4 text-[#133384] shrink-0" />
                    <span>WhatsApp: <strong className="text-slate-900">{shop.phone || '-'}</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Globe className="w-4 h-4 text-[#133384] shrink-0" />
                    <span>Toko BudayaGo Terverifikasi</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Clock className="w-4 h-4 text-[#133384] shrink-0" />
                    <span>Operasional: Senin - Sabtu (08:00 - 17:00)</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50/60 rounded-2xl border border-blue-200/80 p-5 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-blue-700" />
                  <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wide">
                    Jaminan Keaslian Budaya
                  </h4>
                </div>
                <p className="text-xs text-blue-900 leading-relaxed">
                  Semua transaksi melalui Pasar Seni dilindungi oleh sistem rekening bersama BudayaGo untuk menjamin keaslian kriya dan ketepatan pengiriman kurir.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ULASAN TOKO */}
        {activeTab === 'ulasan' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Ulasan & Testimoni Pembeli</h3>
                <p className="text-xs text-slate-500">Penilaian pembeli karya asli dari toko {shop.name}</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span className="text-base font-extrabold text-amber-950">4.9 / 5.0</span>
                <span className="text-xs text-amber-800">({totalSold} transaksi)</span>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {[
                {
                  id: 1,
                  user: 'Bambang Sudiro',
                  city: 'Jakarta Selatan',
                  rating: 5,
                  time: '3 hari lalu',
                  comment: 'Kain batik tulisnya sangat otentik dan aromanya harum malam lilin alami. Pengemasan sangat rapi dan aman sampai tujuan.',
                  product: products[0]?.name || 'Batik Tulis Nusantara'
                },
                {
                  id: 2,
                  user: 'Siti Rahmawati',
                  city: 'Bandung',
                  rating: 5,
                  time: '1 minggu lalu',
                  comment: 'Sangat puas berbelanja karya budaya di gerai ini. Pengrajin sangat komunikatif dan pesanan langsung dikirim tepat waktu.',
                  product: products[1]?.name || 'Kriya Tradisi'
                }
              ].map((rev) => (
                <div key={rev.id} className="py-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{rev.user}</span>
                      <span className="text-[10px] text-slate-400">{rev.city} • {rev.time}</span>
                    </div>
                    <div className="flex items-center text-amber-500">
                      {'★'.repeat(rev.rating)}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium">
                    Karya: {rev.product}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
