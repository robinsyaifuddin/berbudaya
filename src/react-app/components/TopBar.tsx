import { Search, Bell, MessageCircle, Menu, Globe } from 'lucide-react';
import { useNavigate } from 'react-router';

interface TopBarProps {
  onMenuClick?: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('demo_user');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      localStorage.removeItem('demo_user');
      navigate('/');
    }
  };
  return (
    <header className="bg-card border-b border-gray h-14 px-4">
      <div className="flex items-center justify-between h-full">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-secondary" />
          </button>
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <h1 className="text-xl font-bold text-primary hidden sm:block">RuangBudaya.id</h1>
          </div>
        </div>

        {/* Search Bar - Center */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tertiary" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray border border-gray rounded-full focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Globe className="w-5 h-5 text-secondary" />
          </button>
          
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MessageCircle className="w-5 h-5 text-secondary" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-secondary" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="relative group">
            <button className="flex items-center gap-2 ml-2">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="hidden sm:block text-sm font-medium text-primary">⌄</span>
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Keluar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
