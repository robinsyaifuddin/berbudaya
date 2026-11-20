import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { 
  Home, Users, ShoppingBag, Heart, MoreHorizontal, 
  Puzzle, Newspaper, Calendar, Image as GalleryIcon, X
} from 'lucide-react';

interface MobileBottomNavProps {
  connectionCount?: number;
}

export default function MobileBottomNav({ connectionCount = 0 }: MobileBottomNavProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [showMoreSheet, setShowMoreSheet] = useState(false);

  const isMoreActive = ['/permainan', '/berita', '/komunitas', '/lembaga', '/acara', '/gallery'].some(p => currentPath.startsWith(p));

  const navItems = [
    { name: 'Beranda', path: '/beranda', icon: Home },
    { name: 'Jaringan', path: '/jaringan', icon: Users, badge: connectionCount > 0 ? connectionCount : undefined },
    { name: 'Belanja', path: '/marketplace', icon: ShoppingBag },
    { name: 'Donasi', path: '/crowdfunding', icon: Heart },
  ];

  return (
    <>
      {/* Mobile Drawer / Bottom Sheet for "Lainnya" */}
      {showMoreSheet && (
        <div className="md:hidden fixed inset-0 z-50">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setShowMoreSheet(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl border-t border-stone-200 p-5 shadow-2xl z-50 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
              <span className="text-sm font-bold text-stone-900">Menu Lainnya</span>
              <button 
                onClick={() => setShowMoreSheet(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 py-2">
              <Link
                to="/permainan"
                onClick={() => setShowMoreSheet(false)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors"
              >
                <Puzzle className="w-5 h-5 text-slate-600" />
                <span className="text-xs font-medium text-slate-800">Permainan</span>
              </Link>

              <Link
                to="/berita"
                onClick={() => setShowMoreSheet(false)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors"
              >
                <Newspaper className="w-5 h-5 text-slate-600" />
                <span className="text-xs font-medium text-slate-800">Berita</span>
              </Link>

              <Link
                to="/lembaga"
                onClick={() => setShowMoreSheet(false)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors"
              >
                <Users className="w-5 h-5 text-slate-600" />
                <span className="text-xs font-medium text-slate-800">Lembaga</span>
              </Link>

              <Link
                to="/acara"
                onClick={() => setShowMoreSheet(false)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors"
              >
                <Calendar className="w-5 h-5 text-slate-600" />
                <span className="text-xs font-medium text-slate-800">Acara</span>
              </Link>

              <Link
                to="/gallery"
                onClick={() => setShowMoreSheet(false)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors"
              >
                <GalleryIcon className="w-5 h-5 text-slate-600" />
                <span className="text-xs font-medium text-slate-800">Galeri</span>
              </Link>

              <Link
                to="/pesan"
                onClick={() => setShowMoreSheet(false)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors"
              >
                <MoreHorizontal className="w-5 h-5 text-slate-600" />
                <span className="text-xs font-medium text-slate-800">Obrolan Pesan</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      <nav 
        aria-label="Navigasi Bawah Mobile"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/90 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]"
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

          {/* Tombol Lainnya di Mobile */}
          <button
            type="button"
            onClick={() => setShowMoreSheet(true)}
            className={`flex flex-col items-center justify-center h-full py-1 transition-all duration-150 relative ${
              isMoreActive ? 'text-blue-600 font-semibold' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <MoreHorizontal className={`w-5 h-5 transition-transform duration-150 ${isMoreActive ? 'scale-110' : ''}`} />
            <span className={`text-[10px] tracking-tight mt-0.5 leading-none ${isMoreActive ? 'font-semibold' : 'font-medium'}`}>
              Lainnya
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
