import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { TrendingUp, Users, Grid3x3, FileText, Calendar, Crown } from 'lucide-react';

interface DemoUser {
  id: string;
  email: string;
  name: string;
  avatar: string;
  loginTime: string;
}

const menuItems = [
  { name: 'Komunitas Budaya', icon: Grid3x3, path: '/komunitas' },
  { name: 'Galeri Budaya', icon: FileText, path: '/gallery' },
  { name: 'Kegiatan Budaya', icon: Calendar, path: '/acara' },
];

export default function ProfileSidebar() {
  const [user, setUser] = useState<DemoUser | null>(null);

  useEffect(() => {
    const demoUserStr = localStorage.getItem('demo_user');
    if (demoUserStr) {
      try {
        const demoUser = JSON.parse(demoUserStr);
        setUser(demoUser);
      } catch (error) {
        console.error('Error parsing demo user:', error);
      }
    }
  }, []);

  return (
    <div className="sticky top-[68px] space-y-2">
      {/* Profile Card - LinkedIn Style */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Cover Image */}
        <div className="h-12 bg-gradient-to-r from-blue-600 to-blue-700 relative">
          <Link to="/profil">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'}
              alt="Profile"
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full border-2 border-white object-cover hover:brightness-90 transition-all cursor-pointer"
            />
          </Link>
        </div>

        {/* Profile Info */}
        <div className="pt-10 pb-2">
          <Link to="/profil" className="block text-center hover:underline">
            <h3 className="font-semibold text-gray-900 text-sm px-3">
              {user?.name || 'Guest User'}
            </h3>
          </Link>
          <p className="text-xs text-gray-600 text-center mt-1 px-3 leading-relaxed">
            Kreator Budaya • Jakarta Raya
          </p>
          <p className="text-xs text-gray-500 text-center mt-0.5 px-3">
            Institut Teknologi Sumatera
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-1"></div>

        {/* Analytics Section */}
        <Link to="/profil" className="block px-3 py-1.5 hover:bg-gray-50 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Lihat profil saya</p>
              <div className="flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3 h-3 text-gray-500" />
                <span className="text-xs font-semibold text-gray-900">1,245 tayangan profil</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Divider */}
        <div className="border-t border-gray-200 my-1"></div>

        {/* Connections */}
        <div className="px-3 py-1.5">
          <p className="text-xs text-gray-600 mb-1">Koneksi</p>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 text-gray-500" />
            <span className="text-xs font-semibold text-gray-900">Kembangkan jaringan Anda</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-1"></div>

        {/* Premium CTA */}
        <Link to="/pengaturan" className="block px-3 py-2 hover:bg-gray-50 transition-colors">
          <div className="flex items-start gap-2">
            <Crown className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-600">Akses fitur dan layanan eksklusif</p>
              <p className="text-xs font-semibold text-gray-900 mt-0.5">Coba Premium seharga IDR0</p>
            </div>
          </div>
        </Link>

      </div>

      {/* Menu Items Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.path}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors"
              >
                <Icon className="w-4 h-4 text-gray-600" />
                <span className="text-xs font-semibold text-gray-900">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
