import ModernLayout from '@/react-app/components/ModernLayout';
import { User, Lock, Bell, Globe, Shield, CreditCard, HelpCircle } from 'lucide-react';

export default function PengaturanPage() {
  return (
    <ModernLayout showLeftSidebar={false} showRightSidebar={false}>
      
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold font-playfair text-dark-brown mb-6">
          Pengaturan Akun
        </h1>

        {/* Profile Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-warm-gray/30 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-terracotta" />
            <h2 className="text-xl font-bold font-playfair text-dark-brown">
              Informasi Profil
            </h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                defaultValue="Dewi Lestari"
                className="w-full px-4 py-3 rounded-lg border border-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-terracotta/50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue="dewi.lestari@email.com"
                className="w-full px-4 py-3 rounded-lg border border-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-terracotta/50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-2">
                Nomor Telepon
              </label>
              <input
                type="tel"
                defaultValue="+62 812 3456 7890"
                className="w-full px-4 py-3 rounded-lg border border-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-terracotta/50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-2">
                Bio
              </label>
              <textarea
                rows={4}
                defaultValue="Pengrajin batik tulis dengan pengalaman lebih dari 15 tahun. Fokus pada pelestarian motif batik tradisional Solo dengan teknik pewarnaan alami."
                className="w-full px-4 py-3 rounded-lg border border-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-terracotta/50 resize-none"
              />
            </div>
            
            <button className="bg-gradient-to-r from-terracotta to-gold text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
              Simpan Perubahan
            </button>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-warm-gray/30 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-6 h-6 text-terracotta" />
            <h2 className="text-xl font-bold font-playfair text-dark-brown">
              Keamanan
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-warm-gray/20 rounded-xl">
              <div>
                <p className="font-semibold text-dark-brown">Ubah Kata Sandi</p>
                <p className="text-sm text-gray-600">Terakhir diubah 3 bulan yang lalu</p>
              </div>
              <button className="text-terracotta font-semibold hover:text-gold transition-colors">
                Ubah
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-warm-gray/20 rounded-xl">
              <div>
                <p className="font-semibold text-dark-brown">Autentikasi Dua Faktor</p>
                <p className="text-sm text-gray-600">Tambahkan lapisan keamanan ekstra</p>
              </div>
              <button className="bg-terracotta text-white px-4 py-2 rounded-lg font-semibold hover:bg-gold transition-colors">
                Aktifkan
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-warm-gray/30 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-terracotta" />
            <h2 className="text-xl font-bold font-playfair text-dark-brown">
              Notifikasi
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border-b border-warm-gray/30">
              <div>
                <p className="font-semibold text-dark-brown">Notifikasi Email</p>
                <p className="text-sm text-gray-600">Terima pembaruan melalui email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-terracotta/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-terracotta"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 border-b border-warm-gray/30">
              <div>
                <p className="font-semibold text-dark-brown">Notifikasi Push</p>
                <p className="text-sm text-gray-600">Terima notifikasi di browser</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-terracotta/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-terracotta"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="font-semibold text-dark-brown">Notifikasi Acara</p>
                <p className="text-sm text-gray-600">Pengingat acara dan festival</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-terracotta/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-terracotta"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Other Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-warm-gray/30 p-6 cursor-pointer hover:shadow-lg transition-all">
            <Globe className="w-8 h-8 text-terracotta mb-3" />
            <h3 className="font-bold text-dark-brown mb-2">Bahasa & Wilayah</h3>
            <p className="text-sm text-gray-600">Atur preferensi bahasa dan lokasi</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-warm-gray/30 p-6 cursor-pointer hover:shadow-lg transition-all">
            <Shield className="w-8 h-8 text-gold mb-3" />
            <h3 className="font-bold text-dark-brown mb-2">Privasi</h3>
            <p className="text-sm text-gray-600">Kelola pengaturan privasi akun</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-warm-gray/30 p-6 cursor-pointer hover:shadow-lg transition-all">
            <CreditCard className="w-8 h-8 text-terracotta mb-3" />
            <h3 className="font-bold text-dark-brown mb-2">Pembayaran</h3>
            <p className="text-sm text-gray-600">Metode pembayaran dan tagihan</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-warm-gray/30 p-6 cursor-pointer hover:shadow-lg transition-all">
            <HelpCircle className="w-8 h-8 text-gold mb-3" />
            <h3 className="font-bold text-dark-brown mb-2">Bantuan & Dukungan</h3>
            <p className="text-sm text-gray-600">Hubungi tim dukungan kami</p>
          </div>
        </div>
      </div>
    </ModernLayout>
  );
}
