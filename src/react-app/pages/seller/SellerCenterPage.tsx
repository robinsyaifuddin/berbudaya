import React, { useState } from 'react';
import { 
  Building2, 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  Star, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Globe, 
  AlertCircle,
  Eye,
  Check,
  ChevronRight,
  ArrowUpRight,
  Filter,
  CreditCard,
  ShieldCheck,
  Store,
  PanelLeftClose,
  PanelLeftOpen,
  LayoutDashboard,
  Home
} from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import TopNavbar from '@/react-app/components/TopNavbar';
import { useSeller, ShopProduct, ShopOrder } from '@/react-app/contexts/SellerContext';
import { useNotification } from '@/react-app/contexts/NotificationContext';
import ProductFormModal from '@/react-app/components/seller/ProductFormModal';

export default function SellerCenterPage() {
  const navigate = useNavigate();
  const { 
    shop, 
    products, 
    orders, 
    hasShop, 
    deleteProduct, 
    toggleProductStatus, 
    shipOrder, 
    completeOrder,
    updateShopProfile 
  } = useSeller();

  const { success, confirm } = useNotification();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'profile' | 'shop_view'>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<ShopProduct | null>(null);

  // Filter & Search states
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('Semua');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'semua' | 'perlu_diproses' | 'dikirim' | 'selesai'>('semua');

  // Shipping modal prompt state
  const [shippingOrderId, setShippingOrderId] = useState<string | null>(null);
  const [trackingInput, setTrackingInput] = useState('');

  // Profile Edit State
  const [editProfileData, setEditProfileData] = useState({
    name: shop?.name || '',
    slogan: shop?.slogan || '',
    description: shop?.description || '',
    city: shop?.city || '',
    address: shop?.address || '',
    phone: shop?.phone || ''
  });

  // Calculate Metrics
  const totalRevenue = orders
    .filter(o => o.status === 'selesai')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingOrdersCount = orders.filter(o => o.status === 'perlu_diproses').length;
  const shippingOrdersCount = orders.filter(o => o.status === 'dikirim').length;
  const completedOrdersCount = orders.filter(o => o.status === 'selesai').length;

  const activeProductsCount = products.filter(p => p.isActive).length;
  const totalItemsSold = products.reduce((sum, p) => sum + p.soldCount, 0);

  // Jika belum buka toko, tampilkan halaman ajakan bergaya lembaga/marketplace resmi
  if (!hasShop || !shop) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
        <TopNavbar />
        <div className="pt-24 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-8 md:p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-5 text-[#133384]">
              <Store className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
              Anda Belum Memiliki Toko Budaya
            </h1>
            <p className="text-sm text-slate-500 max-w-lg mx-auto mb-8 leading-relaxed">
              Daftarkan sanggar atau gerai karya seni tradisi Anda sekarang. Dapatkan akses ke Seller Center untuk mengelola produk kriya, pesanan pembeli, dan penerbitan langsung di Pasar Seni BudayaGo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8 text-left">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] font-bold text-blue-700 uppercase">Tahap 1</span>
                <h4 className="text-xs font-bold text-slate-900 mt-1">Daftar Toko Resmi</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Isi identitas sanggar, kota asal, dan nomor kontak.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] font-bold text-blue-700 uppercase">Tahap 2</span>
                <h4 className="text-xs font-bold text-slate-900 mt-1">Unggah Produk Budaya</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Pajang karya, filosofi motif, serta tentukan harga.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] font-bold text-blue-700 uppercase">Tahap 3</span>
                <h4 className="text-xs font-bold text-slate-900 mt-1">Kelola Pesanan</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Kirim resi dan terima hasil penjualan secara aman.</p>
              </div>
            </div>

            <Link
              to="/buka-toko"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#133384] hover:bg-[#1844A6] text-white font-bold text-sm rounded-xl shadow-xs transition-colors active:scale-95"
            >
              <span>Buka Toko Sekarang (Gratis)</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchSearch = product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                        product.category.toLowerCase().includes(productSearch.toLowerCase());
    const matchCat = productCategoryFilter === 'Semua' || product.category.toLowerCase().includes(productCategoryFilter.toLowerCase());
    return matchSearch && matchCat;
  });

  // Filter orders
  const filteredOrders = orders.filter(order => {
    if (orderStatusFilter === 'semua') return true;
    return order.status === orderStatusFilter;
  });

  // Handle ship action
  const handleOpenShipModal = (orderId: string) => {
    setShippingOrderId(orderId);
    setTrackingInput(`BDY-${Math.floor(100000 + Math.random() * 900000)}JNE`);
  };

  const handleConfirmShip = () => {
    if (shippingOrderId && trackingInput.trim()) {
      shipOrder(shippingOrderId, trackingInput.trim());
      success(`Pesanan ${shippingOrderId} berhasil dikirim dengan no resi ${trackingInput}!`, 'Pesanan Dikirim');
      setShippingOrderId(null);
      setTrackingInput('');
    }
  };

  const handleCompleteOrder = async (orderId: string) => {
    const ok = await confirm({
      title: 'Selesaikan Pesanan',
      message: 'Konfirmasi bahwa pembeli telah menerima pesanan ini? Saldo penjualan akan otomatis bertambah ke pendapatan toko.',
      confirmText: 'Ya, Selesaikan',
      cancelText: 'Batal',
      type: 'info'
    });

    if (ok) {
      completeOrder(orderId);
      success(`Pesanan ${orderId} selesai! Pendapatan masuk ke saldo toko.`, 'Pesanan Selesai');
    }
  };

  const handleDeleteProduct = async (id: number, name: string) => {
    const ok = await confirm({
      title: 'Hapus Produk',
      message: `Apakah Anda yakin ingin menghapus "${name}" dari etalase toko dan Pasar Seni?`,
      confirmText: 'Hapus',
      cancelText: 'Batal',
      type: 'danger'
    });

    if (ok) {
      deleteProduct(id);
      success('Produk berhasil dihapus!', 'Terhapus');
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateShopProfile(editProfileData);
    success('Profil dan informasi toko berhasil diperbarui!', 'Tersimpan');
  };

  const navItems = [
    {
      id: 'dashboard' as const,
      label: 'Dasbor & Ringkasan',
      shortLabel: 'Dasbor',
      icon: TrendingUp,
      badge: null
    },
    {
      id: 'products' as const,
      label: 'Katalog Produk',
      shortLabel: 'Produk',
      icon: Package,
      badge: products.length
    },
    {
      id: 'orders' as const,
      label: 'Kelola Pesanan',
      shortLabel: 'Pesanan',
      icon: ShoppingBag,
      badge: pendingOrdersCount > 0 ? pendingOrdersCount : null,
      badgeColor: 'bg-blue-600 text-white'
    },
    {
      id: 'profile' as const,
      label: 'Profil & Workshop',
      shortLabel: 'Profil',
      icon: Building2,
      badge: null
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 pb-10">
      <TopNavbar />

      <main className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Layout: Sidebar sticky di desktop + Konten scrollable di kanan */}
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Sticky Sidebar Nav (Mengikuti scroll dan berhenti saat konten berakhir) */}
          <aside
            className={`transition-all duration-300 ease-in-out shrink-0 w-full lg:sticky lg:top-20 z-30 ${
              isSidebarCollapsed ? 'lg:w-18' : 'lg:w-64'
            }`}
          >
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-3 flex flex-col">
              {/* Sidebar Header & Toggle Button */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 px-2 pt-1">
                {!isSidebarCollapsed && (
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Menu Seller
                    </span>
                    <span className="text-xs font-bold text-slate-800">Pusat Kelola Toko</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  title={isSidebarCollapsed ? "Perluas Sidebar" : "Perkecil Sidebar"}
                  className={`p-1.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors ${
                    isSidebarCollapsed ? 'mx-auto' : ''
                  }`}
                >
                  {isSidebarCollapsed ? (
                    <PanelLeftOpen className="w-5 h-5 text-blue-700" />
                  ) : (
                    <PanelLeftClose className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Navigation Tabs List */}
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      title={isSidebarCollapsed ? item.label : undefined}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all group ${
                        isActive
                          ? 'bg-[#133384] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      } ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-between'}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'}`} />
                        {!isSidebarCollapsed && (
                          <span className="truncate">{item.label}</span>
                        )}
                      </div>

                      {/* Badges */}
                      {item.badge !== null && !isSidebarCollapsed && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : item.badgeColor || 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* 2 Tombol Ekstra: Beranda & Profil Toko (Halaman Resmi Toko) */}
              <div className="mt-2.5 pt-2.5 border-t border-slate-100 space-y-1">
                <Link
                  to="/beranda"
                  title={isSidebarCollapsed ? "Beranda" : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors ${
                    isSidebarCollapsed ? 'justify-center px-0' : ''
                  }`}
                >
                  <Home className="w-4 h-4 text-slate-400 shrink-0" />
                  {!isSidebarCollapsed && <span>Beranda</span>}
                </Link>

                <Link
                  to="/toko"
                  title={isSidebarCollapsed ? "Profil Toko" : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors ${
                    isSidebarCollapsed ? 'justify-center px-0' : ''
                  }`}
                >
                  <Store className="w-4 h-4 text-slate-400 shrink-0" />
                  {!isSidebarCollapsed && <span>Profil Toko</span>}
                </Link>
              </div>

              {/* Profil Toko Pas Tepat di Bawah Pintasan */}
              <div className="mt-2.5 pt-2.5 border-t border-slate-100">
                {isSidebarCollapsed ? (
                  <div className="flex justify-center" title={`${shop.name} • ${shop.city}`}>
                    <img
                      src={shop.avatar}
                      alt={shop.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-2xs"
                    />
                  </div>
                ) : (
                  <div className="p-1 flex items-center gap-3">
                    <img
                      src={shop.avatar}
                      alt={shop.name}
                      className="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0 shadow-2xs"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-xs font-bold text-slate-900 truncate">{shop.name}</p>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                          Terverifikasi
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        {shop.city}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Right Main Content Area (Tab Panels) */}
          <div className="flex-1 min-w-0 w-full space-y-6">

        {/* TAB 1: DASBOR & RINGKASAN */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Quick Stats Grid (Identik dengan KelolaKomunitas & PRD Standar) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wide">
                  Total Pendapatan Selesai
                </span>
                <span className="text-lg sm:text-2xl font-extrabold text-slate-900 mt-1 block">
                  Rp {totalRevenue.toLocaleString('id-ID')}
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3 h-3" /> +14.2% bulan ini
                </span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wide">
                  Pesanan Perlu Diproses
                </span>
                <span className="text-lg sm:text-2xl font-extrabold text-blue-700 mt-1 block">
                  {pendingOrdersCount} Pesanan
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Menunggu pengiriman kurir
                </span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wide">
                  Karya Aktif di Etalase
                </span>
                <span className="text-lg sm:text-2xl font-extrabold text-slate-900 mt-1 block">
                  {activeProductsCount} Produk
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Tayang di Pasar Seni
                </span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wide">
                  Transaksi Berhasil
                </span>
                <span className="text-lg sm:text-2xl font-extrabold text-emerald-700 mt-1 block">
                  {completedOrdersCount} Pesanan
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Kepuasan toko 99.2%
                </span>
              </div>
            </div>

            {/* Status Pesanan Cepat */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between mb-3.5">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Status Pengiriman & Pesanan Toko
                </h3>
                <button 
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-blue-600 font-semibold hover:underline"
                >
                  Buka Rincian Pesanan →
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div 
                  onClick={() => { setOrderStatusFilter('perlu_diproses'); setActiveTab('orders'); }}
                  className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/70 hover:bg-blue-100/60 cursor-pointer transition-colors"
                >
                  <span className="text-xs text-blue-900 font-semibold">Perlu Diproses</span>
                  <p className="text-lg font-black text-blue-950 mt-0.5">{pendingOrdersCount}</p>
                </div>

                <div 
                  onClick={() => { setOrderStatusFilter('dikirim'); setActiveTab('orders'); }}
                  className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-200/70 hover:bg-sky-100/60 cursor-pointer transition-colors"
                >
                  <span className="text-xs text-sky-900 font-semibold">Dalam Pengiriman</span>
                  <p className="text-lg font-black text-sky-950 mt-0.5">{shippingOrdersCount}</p>
                </div>

                <div 
                  onClick={() => { setOrderStatusFilter('selesai'); setActiveTab('orders'); }}
                  className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/70 hover:bg-emerald-100/60 cursor-pointer transition-colors"
                >
                  <span className="text-xs text-emerald-900 font-semibold">Pesanan Selesai</span>
                  <p className="text-lg font-black text-emerald-950 mt-0.5">{completedOrdersCount}</p>
                </div>

                <div 
                  onClick={() => { setActiveTab('products'); }}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:bg-slate-100 cursor-pointer transition-colors"
                >
                  <span className="text-xs text-slate-700 font-semibold">Total Karya Toko</span>
                  <p className="text-lg font-black text-slate-900 mt-0.5">{products.length}</p>
                </div>
              </div>
            </div>

            {/* Grafik Performa Penjualan 7 Hari (Style Minimalis Bersih) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Performa Omzet Penjualan</h3>
                  <p className="text-xs text-slate-500">Estimasi transaksi harian 7 hari terakhir</p>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg border border-slate-200">
                  Data Terverifikasi
                </span>
              </div>

              <div className="grid grid-cols-7 gap-3 items-end h-44 pt-6 px-2 border-b border-slate-100">
                {[
                  { day: 'Sen', amount: 850000, height: '40%' },
                  { day: 'Sel', amount: 1200000, height: '60%' },
                  { day: 'Rab', amount: 950000, height: '50%' },
                  { day: 'Kam', amount: 2100000, height: '85%' },
                  { day: 'Jum', amount: 1400000, height: '65%' },
                  { day: 'Sab', amount: 3200000, height: '100%' },
                  { day: 'Min', amount: 1850000, height: '75%' }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-[10px] font-semibold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {(item.amount / 1000).toFixed(0)}k
                    </span>
                    <div 
                      style={{ height: item.height }}
                      className="w-full max-w-[40px] bg-[#133384] group-hover:bg-[#1844A6] rounded-t-lg transition-all"
                    />
                    <span className="text-xs text-slate-500 font-medium">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KELOLA PRODUK */}
        {activeTab === 'products' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Action & Filter Header */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari karya di etalase toko..."
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#133384]"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
                <select
                  value={productCategoryFilter}
                  onChange={e => setProductCategoryFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-700"
                >
                  <option value="Semua">Semua Kategori</option>
                  <option value="Batik">Batik & Tenun</option>
                  <option value="Wayang">Wayang & Teater</option>
                  <option value="Keris">Keris & Pusaka</option>
                  <option value="Kayu">Kriya Kayu</option>
                </select>

                <button
                  onClick={() => {
                    setProductToEdit(null);
                    setIsProductModalOpen(true);
                  }}
                  className="px-4 py-2 bg-[#133384] hover:bg-[#1844A6] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Produk Baru</span>
                </button>
              </div>
            </div>

            {/* List Produk Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-slate-800">Tidak ada produk ditemukan</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Tambahkan produk karya kriya pertama Anda atau sesuaikan filter pencarian.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map(product => (
                  <div 
                    key={product.id}
                    className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2.5 right-2.5">
                          <button
                            onClick={() => toggleProductStatus(product.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-2xs transition-colors ${
                              product.isActive 
                                ? 'bg-emerald-600 text-white' 
                                : 'bg-slate-700/80 backdrop-blur-sm text-slate-200'
                            }`}
                          >
                            {product.isActive ? 'Aktif' : 'Arsip'}
                          </button>
                        </div>
                        <div className="absolute bottom-2.5 left-2.5 bg-slate-900/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white font-medium">
                          {product.category}
                        </div>
                      </div>

                      <div className="p-4">
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1 mb-1">
                          {product.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mb-3">
                          {product.description}
                        </p>

                        <div className="flex items-baseline justify-between mb-2">
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase font-bold">Harga Jual</span>
                            <span className="text-sm font-black text-slate-900">
                              Rp {product.price.toLocaleString('id-ID')}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-slate-400 block uppercase font-bold">Stok</span>
                            <span className={`text-xs font-bold ${product.stock <= 2 ? 'text-rose-600' : 'text-slate-700'}`}>
                              {product.stock} pcs
                            </span>
                          </div>
                        </div>

                        <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-2 flex items-center justify-between">
                          <span>Terjual: <strong>{product.soldCount}</strong></span>
                          <span>Rating: <strong>★ {product.rating}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          setProductToEdit(product);
                          setIsProductModalOpen(true);
                        }}
                        className="flex-1 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(product.id, product.name)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Hapus Produk"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: KELOLA PESANAN */}
        {activeTab === 'orders' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Filter Pesanan */}
            <div className="flex border-b border-slate-200 bg-white rounded-t-2xl px-4 pt-3 gap-2 overflow-x-auto shadow-xs">
              {[
                { id: 'semua', label: 'Semua Pesanan' },
                { id: 'perlu_diproses', label: `Perlu Diproses (${pendingOrdersCount})` },
                { id: 'dikirim', label: `Dalam Pengiriman (${shippingOrdersCount})` },
                { id: 'selesai', label: `Selesai (${completedOrdersCount})` }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setOrderStatusFilter(f.id as any)}
                  className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                    orderStatusFilter === f.id
                      ? 'border-[#133384] text-[#133384]'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* List Pesanan */}
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-slate-800">Tidak ada pesanan di kategori ini</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Pesanan masuk dari pembeli Pasar Seni akan tampil di sini.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOrders.map(order => (
                  <div 
                    key={order.id}
                    className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-900 font-mono">{order.id}</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">{order.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                          order.status === 'perlu_diproses' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'dikirim' ? 'bg-sky-100 text-sky-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {order.status === 'perlu_diproses' ? 'Perlu Diproses' :
                           order.status === 'dikirim' ? 'Dalam Pengiriman' : 'Pesanan Selesai'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <img 
                            src={item.image} 
                            alt={item.productName}
                            className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 truncate">
                              {item.productName}
                            </h4>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {item.quantity} x Rp {item.price.toLocaleString('id-ID')}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-bold text-slate-900">
                              Rp {(item.quantity * item.price).toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 flex flex-col md:flex-row justify-between gap-3 border border-slate-200/60">
                      <div>
                        <span className="font-semibold text-slate-800 block">Penerima: {order.customerName}</span>
                        <span className="text-slate-500">{order.customerCity}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-slate-800 block">Kurir: {order.courier}</span>
                        {order.trackingNumber ? (
                          <span className="text-blue-700 font-mono font-semibold">Resi: {order.trackingNumber}</span>
                        ) : (
                          <span className="text-slate-400 italic">Belum ada nomor resi</span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between pt-2 gap-3">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Total Pembayaran</span>
                        <p className="text-base font-extrabold text-slate-900">
                          Rp {order.totalAmount.toLocaleString('id-ID')}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {order.status === 'perlu_diproses' && (
                          <button
                            onClick={() => handleOpenShipModal(order.id)}
                            className="px-4 py-2 bg-[#133384] hover:bg-[#1844A6] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 active:scale-95"
                          >
                            <Truck className="w-4 h-4" />
                            <span>Kirim Pesanan (Input Resi)</span>
                          </button>
                        )}

                        {order.status === 'dikirim' && (
                          <button
                            onClick={() => handleCompleteOrder(order.id)}
                            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 active:scale-95"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Selesaikan Pesanan</span>
                          </button>
                        )}

                        {order.status === 'selesai' && (
                          <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                            <Check className="w-4 h-4" /> Dana Selesai & Diteruskan ke Saldo
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PROFIL & WORKSHOP */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs max-w-3xl animate-in fade-in duration-150">
            <h3 className="text-base font-bold text-slate-900 mb-1">Pengaturan Profil Sanggar & Toko</h3>
            <p className="text-xs text-slate-500 mb-6">Informasi resmi yang ditampilkan kepada calon pembeli di Pasar Seni.</p>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Nama Toko / Sanggar Pengrajin
                </label>
                <input
                  type="text"
                  required
                  value={editProfileData.name}
                  onChange={e => setEditProfileData({ ...editProfileData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#133384]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Slogan Singkat Toko
                </label>
                <input
                  type="text"
                  value={editProfileData.slogan}
                  onChange={e => setEditProfileData({ ...editProfileData, slogan: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#133384]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Kota Asal Workshop
                  </label>
                  <input
                    type="text"
                    required
                    value={editProfileData.city}
                    onChange={e => setEditProfileData({ ...editProfileData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#133384]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    No. WhatsApp Penjual
                  </label>
                  <input
                    type="tel"
                    required
                    value={editProfileData.phone}
                    onChange={e => setEditProfileData({ ...editProfileData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#133384]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Alamat Lengkap Penjemputan Paket Kurir
                </label>
                <textarea
                  rows={2}
                  value={editProfileData.address}
                  onChange={e => setEditProfileData({ ...editProfileData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#133384] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Filosofi Karya & Dedikasi Tradisi
                </label>
                <textarea
                  rows={3}
                  value={editProfileData.description}
                  onChange={e => setEditProfileData({ ...editProfileData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#133384] resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#133384] hover:bg-[#1844A6] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors active:scale-95"
                >
                  Simpan Perubahan Profil
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 5: TAMPILAN PROFIL TOKO (HALAMAN ETALASE RESMI TOKO) */}
        {activeTab === 'shop_view' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Banner Header Toko */}
            <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
              <div className="h-36 sm:h-44 w-full relative bg-slate-800">
                <img
                  src={shop.banner}
                  alt={shop.name}
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 text-slate-800 backdrop-blur-xs flex items-center gap-1.5 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Gerai Terverifikasi
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6 relative">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-4">
                  <div className="flex items-end gap-4">
                    <img
                      src={shop.avatar}
                      alt={shop.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-white shadow-md bg-white shrink-0"
                    />
                    <div className="pb-1">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                          {shop.name}
                        </h2>
                      </div>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {shop.city} • Bergabung sejak {shop.joinedDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('profile')}
                      className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                      <span>Edit Info Toko</span>
                    </button>
                    <Link
                      to="/marketplace"
                      className="px-4 py-2 rounded-xl bg-[#133384] hover:bg-[#1844A6] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat Pasar Seni</span>
                    </Link>
                  </div>
                </div>

                {/* Slogan & Filosofi Toko */}
                <div className="pt-2 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Filosofi Sanggar & Profil Pengrajin
                    </span>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {shop.description || 'Dedikasi melestarikan warisan seni kriya budaya nusantara dengan mutu terpercaya dan keaslian ragam motif tradisi.'}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 flex flex-col justify-center space-y-1.5 text-xs">
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Rating Kepuasan:</span>
                      <span className="font-bold text-slate-900">★ {shop.rating} / 5.0</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Karya Terjual:</span>
                      <span className="font-bold text-slate-900">{totalItemsSold} Produk</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600">
                      <span>WhatsApp Penjual:</span>
                      <span className="font-bold text-[#133384]">{shop.phone || '-'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Katalog Karya Toko */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Etalase Karya ({products.length})</h3>
                  <p className="text-xs text-slate-500">Semua produk budaya yang dipajang oleh {shop.name}</p>
                </div>
                <button
                  onClick={() => {
                    setProductToEdit(null);
                    setIsProductModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 bg-[#133384] hover:bg-[#1844A6] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Produk</span>
                </button>
              </div>

              {products.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200/90 p-10 text-center shadow-xs">
                  <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-slate-800">Belum Ada Karya di Etalase</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Mulai unggah karya seni pertama toko Anda sekarang.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-sm transition-all group flex flex-col"
                    >
                      <div className="h-44 w-full relative bg-slate-100 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-slate-800 backdrop-blur-xs">
                          {product.category}
                        </span>
                        <span
                          className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            product.isActive
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {product.isActive ? 'Tayang' : 'Diarsipkan'}
                        </span>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {product.cultureOrigin}
                          </p>
                          <h4 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-[#133384] transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                            {product.description}
                          </p>
                        </div>

                        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-slate-400 block">Harga Karya</span>
                            <span className="text-sm font-extrabold text-[#133384]">
                              Rp {product.price.toLocaleString('id-ID')}
                            </span>
                          </div>

                          <span className="text-[11px] text-slate-500 font-medium">
                            Stok: {product.stock}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
          </div>
        </div>
      </main>

      {/* Input Resi Kurir Modal Sederhana (Clean Minimalist Prompt) */}
      {shippingOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Kirim Pesanan {shippingOrderId}</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Masukkan nomor resi pengiriman kurir untuk memperbarui status pesanan pembeli.
            </p>

            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Nomor Resi / AWB Kurir <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={trackingInput}
                  onChange={e => setTrackingInput(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#133384] font-mono uppercase"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShippingOrderId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmShip}
                className="px-5 py-2 bg-[#133384] hover:bg-[#1844A6] text-white rounded-xl text-xs font-semibold shadow-xs active:scale-95 transition-colors"
              >
                Konfirmasi Kirim
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah & Edit Produk */}
      <ProductFormModal 
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        productToEdit={productToEdit}
      />
    </div>
  );
}
