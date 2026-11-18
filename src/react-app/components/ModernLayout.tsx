import { ReactNode, useState } from 'react';
import TopNavbar from './TopNavbar';
import ProfileSidebar from './ProfileSidebar';
import RightSidebar from './RightSidebar';
import { X } from 'lucide-react';

interface ModernLayoutProps {
  children: ReactNode;
  showLeftSidebar?: boolean;
  showRightSidebar?: boolean;
  leftSidebarContent?: ReactNode;
}

export default function ModernLayout({ 
  children, 
  showLeftSidebar = true, 
  showRightSidebar = true,
  leftSidebarContent
}: ModernLayoutProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <TopNavbar onMenuClick={() => setShowMobileMenu(true)} />

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setShowMobileMenu(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 lg:hidden overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>
              {leftSidebarContent || <ProfileSidebar />}
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="pt-16 pb-16 md:pb-6">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left Sidebar - Profile & Navigasi */}
            {showLeftSidebar && (
              <aside className="hidden lg:block lg:col-span-3 sticky top-[76px] self-start">
                {leftSidebarContent || <ProfileSidebar />}
              </aside>
            )}

            {/* Main Content (Center Feed) */}
            <main className={`${
              showLeftSidebar && showRightSidebar
                ? 'lg:col-span-6'
                : showLeftSidebar || showRightSidebar
                ? 'lg:col-span-9'
                : 'lg:col-span-12'
            }`}>
              {children}
            </main>

            {/* Right Sidebar - News & Exploration */}
            {showRightSidebar && (
              <aside className="hidden lg:block lg:col-span-3 sticky top-[76px] self-start">
                <RightSidebar />
              </aside>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
