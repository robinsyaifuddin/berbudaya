import { useState } from 'react';
import TopNavbar from '@/react-app/components/TopNavbar';
import VerifiedBadge from '@/react-app/components/VerifiedBadge';
import { Link } from 'react-router';
import { 
  Plus, Users, Settings, Eye, TrendingUp, Landmark, 
  ShieldCheck, FileText, Calendar, HandHeart, Newspaper,
  MapPin, CheckCircle, ArrowLeft, Upload, Check, Info,
  Building2, CreditCard, Sparkles, AlertCircle
} from 'lucide-react';
import { useNotification } from '@/react-app/contexts/NotificationContext';
import { communitiesData, Community } from '@/react-app/data/communitiesData';

interface AdminInstitution {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  institutionType: string;
  category: string;
  members: number;
  image: string;
  verified: boolean;
  skLegalitas: string;
  activeEventsCount: number;
  activeDonationsCount: number;
  activeNewsCount: number;
  growth: string;
}

const initialInstitutions: AdminInstitution[] = [
  {
    id: 1,
    name: 'Pelestari Batik Indonesia',
    slug: 'pelestari-batik-indonesia',
    tagline: 'Lembaga Pelestarian, Riset, & Sertifikasi Mutu Wastra Batik Nusantara',
    description: 'Lembaga kebudayaan resmi berbadan hukum yang menaungi 45+ sentra pengrajin batik tulis dan cap nusantara.',
    institutionType: 'Yayasan Kebudayaan Terakreditasi',
    category: 'Kriya',
    members: 2500,
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=600&auto=format&fit=crop&q=80',
    verified: true,
    skLegalitas: 'AHU-0014292.AH.01.04 / Disbud No. 431/2021',
    activeEventsCount: 2,
    activeDonationsCount: 2,
    activeNewsCount: 2,
    growth: '+14% pengikut bulan ini'
  },
  {
    id: 2,
    name: 'Komunitas Wayang Indonesia',
    slug: 'komunitas-wayang-indonesia',
    tagline: 'Paguyuban Pelestari Seni Pedalangan & Karawitan Tradisional',
    description: 'Pusat koordinasi pementasan wayang kulit, wayang golek, dan riset pakeliran klasik nusantara.',
    institutionType: 'Paguyuban Berbadan Hukum',
    category: 'Seni Teater & Tari',
    members: 1250,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&h=200&fit=crop',
    verified: true,
    skLegalitas: 'Disbud Jawa Tengah No. 202/P/2020',
    activeEventsCount: 1,
    activeDonationsCount: 1,
    activeNewsCount: 3,
    growth: '+9% bulan ini'
  }
];

export default function KelolaKomunitasPage() {
  const { success } = useNotification();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [institutions, setInstitutions] = useState<AdminInstitution[]>(initialInstitutions);

  // Form State Lengkap
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    institutionType: 'Yayasan Kebudayaan Terakreditasi',
    category: 'Kriya',
    tagline: '',
    description: '',
    foundedYear: '2024',
    province: 'Jawa Tengah',
    city: 'Surakarta',
    addressDetail: '',
    skLegalitas: '',
    officialEmail: '',
    officialWhatsapp: '',
    bankName: 'Bank BCA',
    bankAccountNumber: '',
    bankAccountHolder: '',
    agreedRules: true
  });

  const handleSubmitLembaga = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newInst: AdminInstitution = {
      id: Date.now(),
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
      tagline: formData.tagline || 'Lembaga Kebudayaan Terdaftar',
      description: formData.description,
      institutionType: formData.institutionType,
      category: formData.category,
      members: 1,
      image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop&q=80',
      verified: true,
      skLegalitas: formData.skLegalitas || 'SK Sementara Verifikasi Dinas Kebudayaan',
      activeEventsCount: 0,
      activeDonationsCount: 0,
      activeNewsCount: 0,
      growth: '+1 pengikut baru'
    };

    setInstitutions([newInst, ...institutions]);
    success(`Profil Lembaga "${formData.name}" berhasil diterbitkan dan siap beroperasi!`, 'Pendaftaran Lembaga Sukses');
    setShowCreateForm(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      <TopNavbar />

      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          
          {/* TAMPILAN 1: FORMULIR PENDAFTARAN PENUH (FULL-WIDTH 2-KOLOM BENTO, BANNER DASBOR DISEMBUNYIKAN) */}
          {showCreateForm ? (
            <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-5 md:p-8 animate-fade-in w-full">
              {/* Form Title & Top Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-200 gap-3 mb-6">
                <div>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 font-semibold mb-2 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Kembali ke Dasbor Lembaga</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <Landmark className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      Pendaftaran & Formulir Profil Lembaga Kebudayaan
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Lengkapi seluruh data entitas berikut agar lembaga Anda resmi terdaftar, terakreditasi, dan dapat menyelenggarakan acara serta donasi
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 text-xs font-bold self-start sm:self-auto">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Formulir Terpadu 2-Kolom</span>
                </div>
              </div>

              <form onSubmit={handleSubmitLembaga} className="space-y-6">
                
                {/* GRID 2-KOLOM UTAMA: KIRI (IDENTITAS & NARASI) + KANAN (LEGALITAS & REKENING) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* KOLOM KIRI */}
                  <div className="space-y-6">
                    {/* SEKSI 1: IDENTITAS RESMI */}
                    <div className="p-5 bg-slate-50/60 rounded-2xl border border-slate-200/80 space-y-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                        <Building2 className="w-4 h-4 text-blue-600" />
                        <span>1. Identitas Resmi & Kelembagaan</span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                          Nama Resmi Lembaga / Sanggar / Yayasan <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: Yayasan Seni Adiluhung Nusantara"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                            Bentuk Entitas
                          </label>
                          <select
                            value={formData.institutionType}
                            onChange={(e) => setFormData({ ...formData, institutionType: e.target.value })}
                            className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                          >
                            <option value="Yayasan Kebudayaan Terakreditasi">Yayasan Kebudayaan</option>
                            <option value="Sanggar Terdaftar Dinas Kebudayaan">Sanggar Terdaftar Disbud</option>
                            <option value="Paguyuban Berbadan Hukum">Paguyuban Berbadan Hukum</option>
                            <option value="Lembaga Adat / Dewan Cagar Budaya">Lembaga Adat / Cagar Budaya</option>
                            <option value="Komunitas Rintisan">Komunitas Rintisan</option>
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
                            <option value="Kriya">Kriya & Wastra</option>
                            <option value="Seni Teater & Tari">Teater, Tari & Pedalangan</option>
                            <option value="Musik Tradisional">Musik Tradisional & Karawitan</option>
                            <option value="Arsitektur & Cagar Budaya">Arsitektur & Cagar Budaya</option>
                            <option value="Sastra & Aksara">Sastra & Aksara Kuna</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                            Custom URL Handle
                          </label>
                          <div className="flex items-center">
                            <span className="px-3 py-2 bg-slate-100 border border-r-0 border-slate-200 text-xs text-slate-500 rounded-l-xl">
                              ruangbudaya.id/@
                            </span>
                            <input
                              type="text"
                              placeholder="nama-lembaga"
                              value={formData.slug}
                              onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
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
                            placeholder="Contoh: 2018"
                            value={formData.foundedYear}
                            onChange={(e) => setFormData({ ...formData, foundedYear: e.target.value })}
                            className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SEKSI 2: PROFIL, VISI & MISI */}
                    <div className="p-5 bg-slate-50/60 rounded-2xl border border-slate-200/80 space-y-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span>2. Profil Narasi, Visi & Misi</span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                          Tagline / Slogan Lembaga (Maks. 120 Karakter)
                        </label>
                        <input
                          type="text"
                          placeholder="Contoh: Menjaga Martabat Wastra, Mengakar pada Luhurnya Tradisi"
                          value={formData.tagline}
                          onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                          className="w-full px-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                          Profil Lengkap, Visi & Misi Kebudayaan <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Uraikan sejarah berdirinya lembaga, fokus kuratorial, ruang lingkup pementasan, dan sasaran pembinaan generasi muda..."
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>

                  {/* KOLOM KANAN */}
                  <div className="space-y-6">
                    {/* SEKSI 3: DOMISILI & DOKUMEN LEGALITAS */}
                    <div className="p-5 bg-slate-50/60 rounded-2xl border border-slate-200/80 space-y-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span>3. Domisili Sekretariat & Dokumen Legalitas</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                            Provinsi
                          </label>
                          <input
                            type="text"
                            value={formData.province}
                            onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                            className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                          />
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
                          Alamat Lengkap Sekretariat / Sanggar
                        </label>
                        <input
                          type="text"
                          placeholder="Jl. Raya Budaya No. 12, Kelurahan / Desa..."
                          value={formData.addressDetail}
                          onChange={(e) => setFormData({ ...formData, addressDetail: e.target.value })}
                          className="w-full px-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                            Nomor SK Kemenkumham / Rekomendasi Disbud
                          </label>
                          <input
                            type="text"
                            placeholder="AHU-001292.AH.01.04"
                            value={formData.skLegalitas}
                            onChange={(e) => setFormData({ ...formData, skLegalitas: e.target.value })}
                            className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                            WhatsApp Resmi Lembaga
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

                    {/* SEKSI 4: REKENING RESMI & AKUNTABILITAS DONASI */}
                    <div className="p-5 bg-slate-50/60 rounded-2xl border border-slate-200/80 space-y-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                        <span>4. Rekening Penampungan Donasi & Penjualan Tiket</span>
                      </div>

                      <div className="p-3.5 bg-blue-50/80 border border-blue-200/80 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-bold">Transparansi Dana Kebudayaan</strong>
                          Penampung resmi donasi dan tiket. Pengurus wajib mempublikasikan LPJ secara berkala di profil lembaga.
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
                            className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                            Atas Nama <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Yayasan/Sanggar"
                            value={formData.bankAccountHolder}
                            onChange={(e) => setFormData({ ...formData, bankAccountHolder: e.target.value })}
                            className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Persetujuan & Submit Action */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <input
                      type="checkbox"
                      id="agreed"
                      required
                      checked={formData.agreedRules}
                      onChange={(e) => setFormData({ ...formData, agreedRules: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                    <label htmlFor="agreed" className="cursor-pointer">
                      Saya menyatakan data kelembagaan ini benar dan siap mematuhi pakta transparansi kebudayaan.
                    </label>
                  </div>

                  <div className="flex items-center gap-2.5 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="px-5 py-2.5 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                    >
                      Terbitkan Profil Lembaga
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            /* TAMPILAN 2: DASBOR UTAMA & DAFTAR LEMBAGA (HANYA MUNCUL SAAT TIDAK SEDANG MENAMBAH LEMBAGA) */
            <>
              {/* Header Dashboard Lembaga */}
              <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-5 md:p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Landmark className="w-5 h-5 text-blue-600" />
                      <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        Dasbor Tata Kelola Profil Lembaga Kebudayaan
                      </h1>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Pusat operasional siaran pers lembaga, tiket acara pementasan, dan transparansi galang dana
                    </p>
                  </div>

                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Daftarkan Lembaga Baru</span>
                  </button>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Lembaga Terkelola</span>
                    <span className="text-xl font-extrabold text-slate-900">{institutions.length} Instansi</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Jejaring Pengikut</span>
                    <span className="text-xl font-extrabold text-blue-600">
                      {institutions.reduce((acc, c) => acc + c.members, 0).toLocaleString()} Pegiat
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Agenda Pementasan Aktif</span>
                    <span className="text-xl font-extrabold text-blue-600">
                      {institutions.reduce((acc, c) => acc + c.activeEventsCount, 0)} Acara
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Kampanye Donasi Transparan</span>
                    <span className="text-xl font-extrabold text-emerald-600">
                      {institutions.reduce((acc, c) => acc + c.activeDonationsCount, 0)} Program
                    </span>
                  </div>
                </div>
              </div>

              {/* DAFTAR LEMBAGA YANG DIKELOLA - DESAIN MINIMALIS (FOTO + JUDUL + BUTTON) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-slate-900">
                    Profil Lembaga & Instansi yang Anda Kelola
                  </h2>
                  <span className="text-xs text-slate-500 font-medium">
                    {institutions.length} Lembaga Aktif
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {institutions.map((inst) => (
                    <div
                      key={inst.id}
                      className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-4 hover:border-blue-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      {/* Foto + Judul Lembaga */}
                      <div className="flex items-center gap-3.5">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                          <img
                            src={inst.image}
                            alt={inst.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="text-base font-bold text-slate-900">
                              {inst.name}
                            </h3>
                            {inst.verified && (
                              <VerifiedBadge className="w-4 h-4 text-[#1D9BF0] shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {inst.institutionType} • {inst.category}
                          </p>
                        </div>
                      </div>

                      {/* Tombol Aksi */}
                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <Link
                          to={`/lembaga/${inst.id}`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Lihat Profil</span>
                        </Link>
                        <Link
                          to={`/lembaga/${inst.id}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                        >
                          <Settings className="w-3.5 h-3.5" />
                          <span>Kelola Lembaga</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
