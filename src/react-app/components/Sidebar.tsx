import { Home, Users, Calendar, BookOpen, ShoppingBag, Briefcase, MessageSquare, User, Settings, HelpCircle, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { useNotification } from '@/react-app/contexts/NotificationContext';

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface SidebarProps {
  onClose: () => void;
}

interface DemoUser {
  id: string;
  email: string;
  name: string;
  avatar: string;
  loginTime: string;
}

const menuItems: MenuItem[] = [
  { icon: Home, label: 'Beranda', path: '/beranda' },
  { icon: ShoppingBag, label: 'Marketplace', path: '/marketplace' },
  { icon: Briefcase, label: 'Proyek', path: '/proyek' },
  { icon: BookOpen, label: 'Edukasi', path: '/edukasi' },
  { icon: Users, label: 'Komunitas', path: '/komunitas' },
  { icon: Calendar, label: 'Acara', path: '/acara' },
  { icon: MessageSquare, label: 'Pesan', path: '/pesan' },
  { icon: User, label: 'Profil', path: '/profil' },
  { icon: Settings, label: 'Pengaturan', path: '/pengaturan' },
  { icon: HelpCircle, label: 'Bantuan', path: '/bantuan' },
];

export default function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation();
  const [user, setUser] = useState<DemoUser | null>(null);
  const { confirm } = useNotification();

  useEffect(() => {
    // Load user dari localStorage
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

  const handleLogout = async () => {
    const isLogout = await confirm({
      title: 'Keluar Akun',
      message: 'Apakah Anda yakin ingin keluar dari akun ini?',
      confirmText: 'Ya, Keluar',
      cancelText: 'Batal',
      type: 'danger'
    });

    if (isLogout) {
      // Hapus data user dari localStorage
      localStorage.removeItem('demo_user');
      // Redirect ke landing page
      window.location.href = '/';
    }
  };

  return (
    <>
      <div className="sidebar-content h-full overflow-y-auto">
        {/* Logo Section - Only visible on mobile */}
        <div className="lg:hidden p-4 border-b border-gray">
          <img 
            src="/logo.png" 
            alt="Berbudaya" 
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-info">
            <img 
              src={user?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"} 
              alt="Profile" 
              className="profile-avatar"
            />
            <div>
              <h3 className="profile-name">{user?.name || 'Guest User'}</h3>
              <p className="profile-username">@{user?.email?.split('@')[0] || 'guest'}</p>
            </div>
          </div>
          
          {/* Edit Profile Button */}
          <Link
            to="/profil"
            onClick={onClose}
            className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm hover:shadow-md"
          >
            <User className="w-4 h-4" />
            <span className="font-medium">Edit Profil</span>
          </Link>
        </div>

        {/* Main Menu */}
        <div className="p-2">
          <h4 className="section-header">MENU UTAMA</h4>
          <nav>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`menu-item ${isActive ? 'active' : ''}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-2 mt-4 border-t border-gray">
          <button
            onClick={handleLogout}
            className="menu-item w-full flex items-center gap-2 text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5" />
            <span>Keluar</span>
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 mt-auto text-center text-xs text-tertiary border-t border-gray">
          <p> 2025 Berbudaya.id</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/bantuan" className="text-tertiary hover:text-secondary">
              Bantuan
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
