import ModernLayout from '@/react-app/components/ModernLayout';
import { User, Lock, Bell, Globe, Shield, CreditCard, HelpCircle, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';

export default function PengaturanPage() {
  const [fullName, setFullName] = useState('Robin Syaifuddin');
  const [email, setEmail] = useState('robin.syaifuddin@budaya.id');
  const [phone, setPhone] = useState('+62 812 3456 7890');
  const [bio, setBio] = useState('Pelestari seni tradisi dan kriya Nusantara. Mengembangkan ruang digital bersama pengrajin dan seniman daerah.');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const demoUserStr = localStorage.getItem('demo_user');
    if (demoUserStr) {
      try {
        const u = JSON.parse(demoUserStr);
        if (u.name) setFullName(u.name);
        if (u.email) setEmail(u.email);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage('Perubahan informasi profil berhasil disimpan!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <ModernLayout showLeftSidebar={false} showRightSidebar={false}>
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-gray-700 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-1">
            Pengaturan Akun & Privasi
          </h1>
          <p className="text-sm text-gray-600">
            Kelola profil kebudayaan, preferensi keamanan, dan notifikasi platform
          </p>
        </div>

        {/* Profile Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Informasi Profil
              </h2>
              <p className="text-xs text-gray-500">Data ini akan ditampilkan pada profil publik budayawan Anda</p>
            </div>
          </div>
          
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Email Akun
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Nomor Telepon / WhatsApp
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Biografi Kebudayaan
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
              />
            </div>
            
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm active:scale-[0.98]"
            >
              Simpan Perubahan Profil
            </button>
          </form>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Keamanan & Akses
              </h2>
              <p className="text-xs text-gray-500">Kelola kata sandi dan proteksi akun berlapis</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200/60">
              <div>
                <p className="font-semibold text-gray-900 text-sm">Kata Sandi Akun</p>
                <p className="text-xs text-gray-500">Terakhir diperbarui secara berkala</p>
              </div>
              <button
                onClick={() => {
                  setToastMessage('Fitur ubah kata sandi dibuka!');
                  setTimeout(() => setToastMessage(null), 2500);
                }}
                className="px-4 py-2 border border-gray-300 hover:border-gray-400 bg-white text-gray-700 text-xs font-semibold rounded-lg transition-colors"
              >
                Ubah Sandi
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200/60">
              <div>
                <p className="font-semibold text-gray-900 text-sm">Autentikasi Dua Langkah (2FA)</p>
                <p className="text-xs text-gray-500">Proteksi ekstra dengan kode konfirmasi masuk</p>
              </div>
              <button
                onClick={() => {
                  setToastMessage('2FA saat ini aktif dalam mode verifikasi Google OAuth!');
                  setTimeout(() => setToastMessage(null), 2500);
                }}
                className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Terproteksi
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Preferensi Notifikasi
              </h2>
              <p className="text-xs text-gray-500">Tentukan pembaruan apa saja yang ingin Anda terima</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900 text-sm">Notifikasi Kolaborasi & Relasi</p>
                <p className="text-xs text-gray-500">Kabar saat ada permintaan koneksi atau ajakan sanggar</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
            </div>
            
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900 text-sm">Pembaruan Donasi & Crowdfunding</p>
                <p className="text-xs text-gray-500">Kabar progres kampanye yang Anda dukung</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-900 text-sm">Pengingat Agenda & Festival Seni</p>
                <p className="text-xs text-gray-500">Jadwal acara pementasan budaya di wilayah Anda</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
            </div>
          </div>
        </div>

        {/* Other Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-400 transition-all">
            <Globe className="w-5 h-5 text-blue-600 mb-2" />
            <h3 className="font-semibold text-gray-900 text-sm mb-1">Bahasa & Wilayah</h3>
            <p className="text-xs text-gray-500">Bahasa Indonesia (WIB)</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-400 transition-all">
            <Shield className="w-5 h-5 text-blue-600 mb-2" />
            <h3 className="font-semibold text-gray-900 text-sm mb-1">Privasi Profil</h3>
            <p className="text-xs text-gray-500">Terbuka untuk Umum</p>
          </div>
          
          <Link to="/cart" className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-400 transition-all block">
            <CreditCard className="w-5 h-5 text-blue-600 mb-2" />
            <h3 className="font-semibold text-gray-900 text-sm mb-1">Pembayaran Kriya</h3>
            <p className="text-xs text-gray-500">Kelola Tagihan & Nota</p>
          </Link>
          
          <Link to="/bantuan" className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-400 transition-all block">
            <HelpCircle className="w-5 h-5 text-blue-600 mb-2" />
            <h3 className="font-semibold text-gray-900 text-sm mb-1">Pusat Bantuan</h3>
            <p className="text-xs text-gray-500">FAQ & Kontak Tim</p>
          </Link>
        </div>
      </div>
    </ModernLayout>
  );
}
