import { Link, useLocation } from 'react-router';
import { Home, Users, ShoppingBag, Heart, BookOpen } from 'lucide-react';

interface MobileBottomNavProps {
  connectionCount?: number;
}

export default function MobileBottomNav({ connectionCount = 0 }: MobileBottomNavProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: 'Beranda', path: '/beranda', icon: Home },
    { name: 'Jaringan', path: '/jaringan', icon: Users, badge: connectionCount > 0 ? connectionCount : undefined },
    { name: 'Belanja', path: '/marketplace', icon: ShoppingBag },
    { name: 'Donasi', path: '/crowdfunding', icon: Heart },
    { name: 'Edukasi', path: '/edukasi', icon: BookOpen },
  ];

  return (
    <nav 
      aria-label="Navigasi Bawah Mobile"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200/90 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-5 h-14 max-w-md mx-auto items-center">
        {navItems.map((item) => {
          const isActive = currentPath === item.path || 
            (item.path !== '/beranda' && currentPath.startsWith(item.path));
          const IconComponent = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center h-full py-1 transition-all duration-150 relative ${
                isActive ? 'text-blue-600 font-semibold' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <div className="relative">
                <IconComponent className={`w-5 h-5 transition-transform duration-150 ${isActive ? 'scale-110' : ''}`} />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-[15px] h-[15px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5 shadow-sm">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-0.5 leading-none ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
