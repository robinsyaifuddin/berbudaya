import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  Upload, 
  CheckCircle2, 
  ShieldCheck, 
  X
} from 'lucide-react';
import { useSeller } from '@/react-app/contexts/SellerContext';
import { useNotification } from '@/react-app/contexts/NotificationContext';

interface OpenShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CITIES = [
  'Surakarta (Solo), Jawa Tengah',
  'Yogyakarta, D.I. Yogyakarta',
  'Gianyar, Bali',
  'Denpasar, Bali',
  'Bandung, Jawa Barat',
  'Cirebon, Jawa Barat',
  'Pekalongan, Jawa Tengah',
  'Jepara, Jawa Tengah',
  'Toraja, Sulawesi Selatan',
  'Padang, Sumatera Barat',
  'Jakarta Selatan, DKI Jakarta'
];

const CATEGORIES = [
  'Batik, Tenun & Songket',
  'Wayang & Seni Teater',
  'Ukiran Kayu & Pahat Batu',
  'Keramik & Gerabah Tradisional',
  'Kriya Logam, Keris & Pusaka',
  'Alat Musik Tradisional (Gamelan, Angklung)',
  'Aksesoris Etnik & Manik-Manik',
  'Seni Lukis Tradisional'
];

export default function OpenShopModal({ isOpen, onClose, onSuccess }: OpenShopModalProps) {
  const { createShop } = useSeller();
  const { success } = useNotification();

  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    slogan: '',
    category: CATEGORIES[0],
    city: CITIES[0],
    address: '',
    phone: '',
    description: '',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&h=300&fit=crop',
    banner: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&h=400&fit=crop'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createShop({
      name: formData.name.trim() || 'Sanggar Seni Budaya',
      username: (formData.username.trim() || formData.name.toLowerCase().replace(/\s+/g, '-')) || 'sanggar-budaya',
      slogan: formData.slogan.trim() || 'Karya Kriya Autentik Warisan Leluhur',
      description: formData.description.trim() || 'Menyediakan beragam produk seni dan kerajinan tradisional nusantara langsung dari tangan pengrajin lokal.',
      category: formData.category,
      city: formData.city.split(',')[0].trim(),
      address: formData.address.trim() || 'Jl. Budaya Nusantara No. 12',
      phone: formData.phone.trim() || '081234567890',
      avatar: formData.avatar,
      banner: formData.banner
    });

    success('Selamat! Toko budaya Anda berhasil dibuat. Selamat berjualan di Pasar Seni!', 'Toko Aktif');
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Modal */}
        <div className="relative px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-amber-600 via-amber-700 to-orange-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Building2 className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Buka Toko Budaya Gratis</h2>
              <p className="text-xs text-amber-100/90">Mulai jual karya seni & kriya tradisi Anda ke nusantara</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1.5 rounded-md border border-amber-100 w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                Langkah 1 dari 2: Identitas Sanggar / Toko
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Nama Toko / Sanggar Pengrajin *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Sanggar Ukir Jepara Asli"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Kategori Utama *
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Kota Asal Pengiriman *
                  </label>
                  <select
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
                  >
                    {CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Slogan Singkat Toko
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Karya Kayu Jati Pilihan Warisan Leluhur"
                  value={formData.slogan}
                  onChange={e => setFormData({ ...formData, slogan: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Deskripsi / Sejarah Singkat Sanggar
                </label>
                <textarea
                  rows={3}
                  placeholder="Ceritakan tentang karya tradisi, material lokal, atau komunitas pengrajin Anda..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1.5 rounded-md border border-amber-100 w-fit">
                <ShieldCheck className="w-3.5 h-3.5" />
                Langkah 2 dari 2: Kontak & Verifikasi Pengiriman
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    No. WhatsApp Pengrajin *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="08xxxxxxxxxx"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Username / Domain Toko
                  </label>
                  <div className="flex items-center text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:border-amber-600">
                    <span className="px-2.5 py-2.5 bg-gray-100 border-r border-gray-200">toko/</span>
                    <input
                      type="text"
                      placeholder="sanggar-jaya"
                      value={formData.username}
                      onChange={e => setFormData({ ...formData, username: e.target.value })}
                      className="w-full px-2.5 py-2.5 text-sm bg-transparent focus:outline-none text-gray-800"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Alamat Lengkap Workshop / Penjemputan Paket *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Nama jalan, nomor workshop, RT/RW, kelurahan..."
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Foto Profil / Logo Sanggar (URL Foto)
                </label>
                <div className="flex gap-3 items-center">
                  <img 
                    src={formData.avatar} 
                    alt="Preview" 
                    className="w-12 h-12 rounded-xl object-cover border border-gray-200 shadow-sm"
                  />
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.avatar}
                    onChange={e => setFormData({ ...formData, avatar: e.target.value })}
                    className="flex-1 px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
                  />
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <p className="text-xs text-emerald-800 leading-relaxed">
                  <strong>Gratis Selamanya:</strong> Tidak ada biaya pendaftaran. Produk Anda akan langsung tampil di etalase Pasar Seni BudayaGo.
                </p>
              </div>
            </div>
          )}

          {/* Footer Navigation */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            {step === 2 ? (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Kembali
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
              >
                Batal
              </button>
            )}

            {step === 1 ? (
              <button
                type="button"
                onClick={() => {
                  if (!formData.name.trim()) {
                    alert('Mohon isi nama toko atau sanggar Anda.');
                    return;
                  }
                  setStep(2);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-amber-700 text-white rounded-xl text-sm font-medium hover:bg-amber-800 active:scale-[0.98] transition-all shadow-sm shadow-amber-900/10"
              >
                Lanjutkan
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-700 to-orange-700 text-white rounded-xl text-sm font-semibold hover:from-amber-800 hover:to-orange-800 active:scale-[0.98] transition-all shadow-md shadow-orange-900/20"
              >
                <CheckCircle2 className="w-4 h-4" />
                Buka Toko Sekarang
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
