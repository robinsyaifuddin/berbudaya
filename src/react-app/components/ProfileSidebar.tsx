import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { TrendingUp, Users, Grid3x3, FileText, Calendar } from 'lucide-react';

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
    <div className="sticky top-[68px] space-y-2.5">
      {/* Profile Card - Modern Cultural Creator */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden">
        {/* Cover Image */}
        <div className="h-14 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 relative">
          <Link to="/profil">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'}
              alt="Profile"
              className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full border-3 border-white object-cover hover:brightness-95 transition-all cursor-pointer shadow-sm"
            />
          </Link>
        </div>

        {/* Profile Info */}
        <div className="pt-9 pb-3 text-center">
          <Link to="/profil" className="block hover:underline">
            <h3 className="font-semibold text-slate-900 text-sm px-3">
              {user?.name || 'Kreator RuangBudaya'}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 mt-0.5 px-3 leading-relaxed">
            Pegiat & Kreator Budaya Nusantara
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100"></div>

        {/* Analytics Section */}
        <Link to="/profil" className="block px-3.5 py-2.5 hover:bg-slate-50 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-slate-500">Tayangan portofolio</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs font-semibold text-slate-900">1,245 kunjungan</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Divider */}
        <div className="border-t border-slate-100"></div>

        {/* Connections */}
        <Link to="/jaringan" className="block px-3.5 py-2.5 hover:bg-slate-50 transition-colors">
          <p className="text-[11px] text-slate-500 mb-0.5">Jejaring Budaya</p>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs font-semibold text-slate-900">Hubungkan dengan 350+ maestro</span>
          </div>
        </Link>
      </div>

      {/* Menu Items Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.path}
                className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-slate-50 transition-colors group"
              >
                <Icon className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                <span className="text-xs font-medium text-slate-700 group-hover:text-blue-600 transition-colors">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
