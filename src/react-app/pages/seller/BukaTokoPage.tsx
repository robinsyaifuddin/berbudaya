import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { 
  Building2, 
  MapPin, 
  ArrowLeft, 
  CheckCircle2, 
  Store,
  CreditCard,
  FileText,
  ShieldCheck,
  Plus,
  Eye,
  Settings,
  ChevronRight,
  Award
} from 'lucide-react';
import TopNavbar from '@/react-app/components/TopNavbar';
import VerifiedBadge from '@/react-app/components/VerifiedBadge';
import { useSeller } from '@/react-app/contexts/SellerContext';
import { useNotification } from '@/react-app/contexts/NotificationContext';

// Data toko-toko budaya lain terverifikasi yang ada di platform
interface PartnerShop {
  id: number;
  name: string;
  category: string;
  entityType: string;
  city: string;
  province: string;
  avatar: string;
  banner: string;
  description: string;
  rating: number;
  productsCount: number;
  soldCount: number;
  verified: boolean;
}

const otherShopsData: PartnerShop[] = [
  {
    id: 101,
    name: 'Pertenunan Harapan Ibu Pandai Sikek',
    category: 'Kriya & Tekstil',
    entityType: 'Sanggar Tenun Warisan',
    city: 'Tanah Datar',
    province: 'Sumatera Barat',
    avatar: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=300&h=300&fit=crop',
    banner: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&fit=crop',
    description: 'Pusat tenun songket motif pucuak rabuang dengan teknik silang benang emas asli dan pewarna alami.',
    rating: 4.95,
    productsCount: 16,
    soldCount: 148,
    verified: true
  },
  {
    id: 102,
    name: 'Sanggar Wayang Kulit Adiluhung Surakarta',
    category: 'Wayang & Seni Rupa',
    entityType: 'Sanggar Seni Budaya',
    city: 'Surakarta',
    province: 'Jawa Tengah',
    avatar: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&h=300&fit=crop',
    banner: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=800&fit=crop',
    description: 'Spesialis pembuat wayang kulit purwa gagrak kraton Solo berbahan kulit kerbau terbaik dan tatahan halus.',
    rating: 4.9,
    productsCount: 24,
    soldCount: 215,
    verified: true
  },
  {
    id: 103,
    name: 'Padepokan Keris Aji Nusantara',
    category: 'Senjata Tradisional',
    entityType: 'Komunitas Pengrajin Berbadan Hukum',
    city: 'Sumenep',
    province: 'Jawa Timur',
    avatar: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=300&h=300&fit=crop',
    banner: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&fit=crop',
    description: 'Kolektif empu muda pelestari tosan aji pamor beras wutah & tirto tejo bersertifikasi kuratorial kebudayaan.',
    rating: 4.88,
    productsCount: 12,
    soldCount: 89,
    verified: true
  },
  {
    id: 104,
    name: 'Bengkel Karawitan & Gamelan Gong Kebyar',
    category: 'Alat Musik Tradisional',
    entityType: 'Sanggar Seni Tradisi',
    city: 'Gianyar',
    province: 'Bali',
    avatar: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop',
    banner: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&fit=crop',
    description: 'Pembuat perangkat gamelan perunggu dan instrumen tabuh Bali dengan laras pelog & slendro standar ISI.',
    rating: 4.96,
    productsCount: 9,
    soldCount: 64,
    verified: true
  }
];

export default function BukaTokoPage() {
  const navigate = useNavigate();
  const { shop, hasShop, createShop, products, orders } = useSeller();
  const { success } = useNotification();

  const [showCreateForm, setShowCreateForm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Kriya & Wastra',
    institutionType: 'Sanggar Seni Budaya',
    username: '',
    foundedYear: '2024',
    tagline: '',
    description: '',
    province: 'Jawa Tengah',
    city: 'Surakarta',
    addressDetail: '',
    skLegalitas: '',
    officialWhatsapp: '',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&h=400&fit=crop',
    banner: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&h=400&fit=crop',
    bankName: 'Bank Mandiri',
    bankAccountNumber: '',
    bankAccountHolder: '',
    agreeTerms: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createShop({
      name: formData.name.trim() || 'Sanggar Seni Budaya',
      username: (formData.username.trim() || formData.name.toLowerCase().replace(/[^a-z0-9]/g, '')) || 'sanggar-budaya',
      slogan: formData.tagline.trim() || 'Karya Kriya Tradisi Asli Warisan Budaya Nusantara',
      description: formData.description.trim() || 'Menyediakan beragam produk seni, wastra, dan kerajinan tradisional nusantara langsung dari workshop pengrajin lokal.',
      category: formData.category,
      city: formData.city,
      address: formData.addressDetail.trim() || `${formData.city}, ${formData.province}`,
      phone: formData.officialWhatsapp.trim() || '081234567890',
      avatar: formData.avatar,
      banner: formData.banner
    });

    success('Toko & Sanggar resmi Anda berhasil didaftarkan! Selamat datang di Seller Center BudayaGo.', 'Toko Aktif');
    setShowCreateForm(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      <TopNavbar />

      <main className="pt-20 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Tombol Navigasi Cepat */}
        <div className="mb-4 flex items-center justify-between">
          <Link
            to="/profil-menu"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Menu Profil</span>
          </Link>

          {hasShop && (
            <Link
              to="/seller"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Buka Dasbor Toko Saya</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* JIKA USER MENGKLIK TOMBOL FORM ATAU SEDANG MEMBUAT TOKO */}
        {showCreateForm ? (
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-5 md:p-8">
            {/* Header Title & Badge 2-Kolom */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 mb-6 gap-3">
              <div>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Daftar Toko</span>
                </button>
                <div className="flex items-center gap-2">
                  <Store className="w-6 h-6 text-[#133384]" />
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Pendaftaran & Formulir Profil Toko Budaya
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Lengkapi seluruh data entitas berikut agar toko & sanggar Anda resmi terdaftar, terverifikasi, dan dapat memasarkan produk di Pasar Seni.
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 text-xs font-bold self-start sm:self-auto shrink-0">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Formulir Terpadu 2-Kolom</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* GRID 2-KOLOM UTAMA: KIRI (IDENTITAS & NARASI) + KANAN (LEGALITAS & REKENING) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* KOLOM KIRI */}
                <div className="space-y-6">
                  {/* SEKSI 1: IDENTITAS RESMI */}
                  <div className="p-5 bg-slate-50/60 rounded-2xl border border-slate-200/80 space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <span>1. Identitas Resmi & Kelembagaan Toko</span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        Nama Resmi Toko / Sanggar / Pengrajin <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Sanggar Seni Adiluhung Nusantara"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                          Bentuk Entitas Usaha
                        </label>
                        <select
                          value={formData.institutionType}
                          onChange={(e) => setFormData({ ...formData, institutionType: e.target.value })}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                        >
                          <option value="Sanggar Seni Budaya">Sanggar Seni Budaya</option>
                          <option value="Kelompok Pengrajin / Mitra">Kelompok Pengrajin</option>
                          <option value="Koperasi Kriya Seni">Koperasi Kriya Seni</option>
                          <option value="Usaha Perorangan Maestro/Artisan">Artisan / Maestro Independen</option>
                          <option value="Yayasan / Paguyuban Tradisi">Yayasan Tradisi</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                          Kategori Kebudayaan
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                        >
                          <option value="Kriya & Wastra (Batik/Tenun)">Kriya & Wastra (Batik/Tenun)</option>
                          <option value="Wayang & Seni Rupa">Wayang & Seni Rupa</option>
                          <option value="Alat Musik Tradisional">Alat Musik Tradisional</option>
                          <option value="Senjata Tradisional & Tosan Aji">Senjata Tradisional & Tosan Aji</option>
                          <option value="Pahatan Kayu & Logam">Pahatan Kayu & Logam</option>
                          <option value="Kuliner Tradisional Awet">Kuliner Tradisional Awet</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                          Custom URL Handle Toko
                        </label>
                        <div className="flex items-center">
                          <span className="px-3 py-2 bg-slate-100 border border-r-0 border-slate-200 text-xs text-slate-500 rounded-l-xl">
                            budayago.id/toko/
                          </span>
                          <input
                            type="text"
                            placeholder="nama-toko"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                            className="flex-1 px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-r-xl focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                          Tahun Berdiri
                        </label>
                        <input
                          type="text"
                          placeholder="2024"
                          value={formData.foundedYear}
                          onChange={(e) => setFormData({ ...formData, foundedYear: e.target.value })}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SEKSI 2: NARASI & NILAI TRADISI */}
                  <div className="p-5 bg-slate-50/60 rounded-2xl border border-slate-200/80 space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>2. Profil Narasi & Filosofi Karya Toko</span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        Slogan Toko / Tagline Singkat
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Menjaga Keluhuran Wastra Batik Pewarna Alam Nusantara"
                        value={formData.tagline}
                        onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        Deskripsi Cerita Sanggar & Spesialisasi Karya
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Ceritakan latar belakang pengrajin, asal tradisi daerah, teknik turun-temurun, serta dampak pemberdayaan ekonomi komunitas..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* KOLOM KANAN */}
                <div className="space-y-6">
                  {/* SEKSI 3: DOMISILI & WORKSHOP */}
                  <div className="p-5 bg-slate-50/60 rounded-2xl border border-slate-200/80 space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>3. Domisili Workshop, Kontak & Legalitas</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                          Provinsi
                        </label>
                        <select
                          value={formData.province}
                          onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                        >
                          <option value="Jawa Tengah">Jawa Tengah</option>
                          <option value="DI Yogyakarta">DI Yogyakarta</option>
                          <option value="Jawa Barat">Jawa Barat</option>
                          <option value="Jawa Timur">Jawa Timur</option>
                          <option value="DKI Jakarta">DKI Jakarta</option>
                          <option value="Bali">Bali</option>
                          <option value="Sumatera Barat">Sumatera Barat</option>
                          <option value="Sulawesi Selatan">Sulawesi Selatan</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                          Kota / Kabupaten
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        Alamat Lengkap Workshop / Penjemputan Kurir
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Jl. Raya Budaya No. 12, Kelurahan / Desa..."
                        value={formData.addressDetail}
                        onChange={(e) => setFormData({ ...formData, addressDetail: e.target.value })}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                          Nomor NIB / SK Rekomendasi Disbud
                        </label>
                        <input
                          type="text"
                          placeholder="NIB-91201928310 / Dishud Solo"
                          value={formData.skLegalitas}
                          onChange={(e) => setFormData({ ...formData, skLegalitas: e.target.value })}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                          WhatsApp Resmi Pengrajin
                        </label>
                        <input
                          type="text"
                          placeholder="+62 812-xxxx-xxxx"
                          value={formData.officialWhatsapp}
                          onChange={(e) => setFormData({ ...formData, officialWhatsapp: e.target.value })}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SEKSI 4: REKENING RESMI PENERIMAAN PENJUALAN */}
                  <div className="p-5 bg-slate-50/60 rounded-2xl border border-slate-200/80 space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <span>4. Rekening Penerima Hasil Penjualan Produk</span>
                    </div>

                    <div className="p-3.5 bg-blue-50/80 border border-blue-200/80 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold">Transparansi & Keamanan Pencairan</strong>
                        Penampung resmi hasil transaksi karya seni. Dana pembeli diteruskan otomatis ke rekening ini setelah pesanan terkonfirmasi selesai.
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                          Bank
                        </label>
                        <select
                          value={formData.bankName}
                          onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                        >
                          <option value="Bank BCA">Bank BCA</option>
                          <option value="Bank Mandiri">Bank Mandiri</option>
                          <option value="Bank BNI">Bank BNI</option>
                          <option value="Bank BRI">Bank BRI</option>
                          <option value="Bank BSI (Syariah)">Bank BSI</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                          No. Rekening <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: 8820192831"
                          value={formData.bankAccountNumber}
                          onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value })}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                          Atas Nama <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Sanggar/Pemilik"
                          value={formData.bankAccountHolder}
                          onChange={(e) => setFormData({ ...formData, bankAccountHolder: e.target.value })}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Aksi */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="px-7 py-2.5 bg-[#133384] hover:bg-[#1844A6] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-200" />
                  <span>Terbitkan Profil & Buka Toko</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* TAMPILAN UTAMA: PERSIS SEPERTI DI KELOLA LEMBAGA */
          <div className="space-y-6">
            {/* Header Dasbor Toko */}
            <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-5 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Store className="w-5 h-5 text-blue-600" />
                    <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      Dasbor Tata Kelola Toko Budaya & Pengrajin
                    </h1>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Pusat pendaftaran entitas toko budaya, manajemen katalog kriya nusantara, dan kurasi pasar seni
                  </p>
                </div>

                {/* Tombol Buat Toko Anda jika belum buat, atau Tambah Toko jika sudah */}
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs self-start sm:self-auto shrink-0 active:scale-[0.98]"
                >
                  <Plus className="w-4 h-4" />
                  <span>{hasShop ? 'Daftarkan Toko Baru' : 'Buat Toko Anda Sekarang'}</span>
                </button>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Toko Anda</span>
                  <span className="text-xl font-extrabold text-slate-900">
                    {hasShop && shop ? '1 Toko Aktif' : 'Belum Ada'}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Toko Budaya Mitra</span>
                  <span className="text-xl font-extrabold text-blue-600">{otherShopsData.length} Sanggar</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Karya Terkatalogkan</span>
                  <span className="text-xl font-extrabold text-blue-600">
                    {(products.length + otherShopsData.reduce((acc, s) => acc + s.productsCount, 0))} Produk
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Transaksi Selesai</span>
                  <span className="text-xl font-extrabold text-emerald-600">
                    {(orders.length + otherShopsData.reduce((acc, s) => acc + s.soldCount, 0))} Terjual
                  </span>
                </div>
              </div>
            </div>

            {/* SEKSI 1: TABEL / KARTU TOKO YANG SUDAH DIBUAT (JIKA SUDAH ADA TOKO) */}
            {hasShop && shop ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      Tabel Toko Budaya yang Anda Kelola
                    </h2>
                    <p className="text-xs text-slate-500">
                      Toko Anda telah terdaftar resmi dan aktif menjual produk di Pasar Seni BudayaGo.
                    </p>
                  </div>
                  <Link
                    to="/seller"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Masuk ke Seller Center</span>
                  </Link>
                </div>

                {/* TABEL RESPONSIVE TOKO ANDA */}
                <div className="bg-white rounded-2xl shadow-xs border border-blue-200/80 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-blue-50/50 border-b border-blue-100 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                          <th className="py-3 px-4">Profil & Nama Toko</th>
                          <th className="py-3 px-4">Kategori & Asal</th>
                          <th className="py-3 px-4">Status & Verifikasi</th>
                          <th className="py-3 px-4 text-center">Jumlah Produk</th>
                          <th className="py-3 px-4 text-center">Pesanan Masuk</th>
                          <th className="py-3 px-4 text-right">Tindakan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        <tr className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={shop.avatar}
                                alt={shop.name}
                                className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                              />
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-slate-900 text-sm">{shop.name}</span>
                                  <VerifiedBadge className="w-4 h-4 text-[#1D9BF0] shrink-0" />
                                </div>
                                <span className="text-[11px] text-slate-500 block">@{shop.username}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-medium text-slate-800 block">{shop.category}</span>
                            <span className="text-[11px] text-slate-500">{shop.city}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Toko Aktif (Resmi)
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="font-extrabold text-blue-600 text-sm">{products.length}</span>
                            <span className="text-slate-400 text-[11px] block">karya aktif</span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="font-extrabold text-amber-600 text-sm">
                              {orders.filter(o => o.status === 'perlu_diproses').length}
                            </span>
                            <span className="text-slate-400 text-[11px] block">perlu diproses</span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                to="/marketplace"
                                className="inline-flex items-center gap-1 px-3 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-lg transition-colors"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Lihat di Pasar</span>
                              </Link>
                              <Link
                                to="/seller"
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#133384] hover:bg-[#1844A6] text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
                              >
                                <Settings className="w-3.5 h-3.5" />
                                <span>Kelola Toko</span>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              /* BANNER AJAKAN JIKA BELUM BUAT TOKO (ADA BUTTON BUAT TOKO ANDA) */
              <div className="bg-gradient-to-r from-blue-50/80 via-white to-blue-50/40 rounded-2xl border border-blue-200 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">
                    <Award className="w-3.5 h-3.5" />
                    <span>Peluang Pengrajin & Pelestari Budaya</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-slate-900">
                    Anda Belum Memiliki Toko Budaya Resmi di Platform Ini
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                    Buka gerai toko atau sanggar Anda sekarang secara gratis. Pasarkan karya seni, wastra batik/tenun, senjata tradisional, dan instrumen musik langsung ke ribuan pecinta budaya nusantara.
                  </p>
                </div>

                <button
                  onClick={() => setShowCreateForm(true)}
                  className="px-6 py-3 bg-[#133384] hover:bg-[#1844A6] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all shrink-0 flex items-center gap-2 active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Buat Toko Anda Sekarang</span>
                </button>
              </div>
            )}

            {/* SEKSI 2: MENAMPILKAN TOKO LAIN (SEPERTI DI LEMBAGA) */}
            <div className="space-y-4 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Daftar Toko & Sanggar Budaya Mitra Lainnya
                  </h2>
                  <p className="text-xs text-slate-500">
                    Eksplorasi sanggar seni, sentra tenun, dan paguyuban kriya terverifikasi di berbagai daerah Indonesia
                  </p>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {otherShopsData.length} Toko Terverifikasi
                </span>
              </div>

              {/* LIST / GRID KARTU TOKO LAIN */}
              <div className="grid grid-cols-1 gap-3">
                {otherShopsData.map((otherShop) => (
                  <div
                    key={otherShop.id}
                    className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-4 hover:border-blue-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    {/* Foto + Judul Toko */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                        <img
                          src={otherShop.avatar}
                          alt={otherShop.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="text-base font-bold text-slate-900">
                            {otherShop.name}
                          </h3>
                          {otherShop.verified && (
                            <VerifiedBadge className="w-4 h-4 text-[#1D9BF0] shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {otherShop.entityType} • {otherShop.category}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{otherShop.city}, {otherShop.province}</span>
                          <span className="mx-1">•</span>
                          <span>{otherShop.productsCount} Karya</span>
                          <span className="mx-1">•</span>
                          <span className="text-amber-600 font-bold">★ {otherShop.rating}</span>
                        </p>
                      </div>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <Link
                        to="/marketplace"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Lihat Produk</span>
                      </Link>
                      <button
                        onClick={() => navigate('/marketplace')}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                      >
                        <span>Kunjungi Toko</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
