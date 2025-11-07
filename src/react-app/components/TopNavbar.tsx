import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { 
  Home, Search, Bell, MessageCircle, Users, 
  Settings, LogOut, Menu, MoreHorizontal, ShoppingBag, Heart, BookOpen, ShoppingCart
} from 'lucide-react';
import { ChatNotificationData } from './ChatNotification';
import { useCart } from '@/react-app/contexts/CartContext';

interface DemoUser {
  id: string;
  email: string;
  name: string;
  avatar: string;
  loginTime: string;
}

interface TopNavbarProps {
  onMenuClick?: () => void;
}

// Sample data untuk friends
const connectionRequests = [
  {
    id: 1,
    name: 'Siti Nurhaliza',
    subtitle: 'Pengrajin Batik',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    mutualFriends: 12
  },
  {
    id: 2,
    name: 'Ahmad Fadli',
    subtitle: 'Seniman Ukir Kayu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    mutualFriends: 8
  },
  {
    id: 3,
    name: 'Rina Kusuma',
    subtitle: 'Desainer Tenun',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    mutualFriends: 5
  }
];

// Activity notifications
const activities = [
  {
    id: 1,
    user: {
      name: 'Deraa',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      action: 'started following you',
      time: '5m'
    }
  },
  {
    id: 2,
    user: {
      name: 'Ediwp',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      action: 'liked your photo',
      time: '30m',
      image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=100&h=100&fit=crop'
    }
  },
  {
    id: 3,
    user: {
      name: 'Praho',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      action: 'liked your photo',
      time: '1h',
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=100&h=100&fit=crop'
    }
  },
  {
    id: 4,
    user: {
      name: 'Praho',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      action: 'liked your photo',
      time: '1h',
      image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=100&h=100&fit=crop'
    }
  }
];

const suggestedPeople = [
  {
    id: 1,
    name: 'Najid',
    subtitle: 'Followed by Dms',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  },
  {
    id: 2,
    name: 'Sheila Dara',
    subtitle: 'Suggested for you',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
  },
  {
    id: 3,
    name: 'Divaurey',
    subtitle: 'Suggested for you',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop'
  },
  {
    id: 4,
    name: 'Jhonson',
    subtitle: 'Followed by Andrea',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  }
];

export default function TopNavbar({ onMenuClick }: TopNavbarProps) {
  const { getTotalItems } = useCart();
  const [user, setUser] = useState<DemoUser | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showActivityDropdown, setShowActivityDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activityTab, setActivityTab] = useState<'activity' | 'suggestions'>('activity');
  const [chatNotifications, setChatNotifications] = useState<ChatNotificationData[]>([]);
  const [notificationId, setNotificationId] = useState(1);
  const [showMessagingPanel, setShowMessagingPanel] = useState(false);
  
  const cartItemsCount = getTotalItems();

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

  // Simulate incoming messages
  useEffect(() => {
    const sampleMessages = [
      {
        name: 'Dewi Lestari',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        message: 'Halo! Saya tertarik dengan motif batik parang yang Anda posting',
        time: 'Baru saja'
      },
      {
        name: 'Bambang Supriyanto',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        message: 'Pertunjukan wayang besok dimulai jam 19:00. Jangan lupa ya!',
        time: 'Baru saja'
      },
      {
        name: 'Siti Rahma',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        message: 'Boleh, kita bisa kolaborasi untuk festival nanti. Kapan bisa kita meeting?',
        time: 'Baru saja'
      }
    ];

    // Simulate new message every 15 seconds
    const interval = setInterval(() => {
      const randomMessage = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
      const newNotification: ChatNotificationData = {
        id: notificationId,
        ...randomMessage
      };
      
      setChatNotifications((prev) => [...prev, newNotification]);
      setNotificationId((prev) => prev + 1);
    }, 15000);

    return () => clearInterval(interval);
  }, [notificationId]);

  const handleTestNotification = () => {
    const sampleMessages = [
      {
        name: 'Dewi Lestari',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        message: 'Halo! Saya tertarik dengan motif batik parang yang Anda posting',
        time: 'Baru saja'
      },
      {
        name: 'Bambang Supriyanto',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        message: 'Pertunjukan wayang besok dimulai jam 19:00. Jangan lupa ya!',
        time: 'Baru saja'
      }
    ];
    
    const randomMessage = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
    const newNotification: ChatNotificationData = {
      id: notificationId,
      ...randomMessage
    };
    
    setChatNotifications((prev) => [...prev, newNotification]);
    setNotificationId((prev) => prev + 1);
  };

  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      localStorage.removeItem('demo_user');
      window.location.href = '/';
    }
  };

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left - Logo & Search */}
          <div className="flex items-center gap-4 flex-1">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>

            {/* Logo */}
            <Link to="/beranda" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="RuangBudaya" 
                className="h-8 sm:h-10 w-auto object-contain"
              />
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                />
              </div>
            </div>
          </div>

          {/* Center - Navigation Icons with Labels (LinkedIn Style) */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 flex-1 justify-center max-w-2xl">
            <Link
              to="/beranda"
              className="flex flex-col items-center px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors min-w-[70px] lg:min-w-[80px]"
            >
              <Home className="w-6 h-6 text-gray-700 mb-1" />
              <span className="text-xs font-medium text-gray-700">Beranda</span>
            </Link>
            <Link
              to="/jaringan"
              className="flex flex-col items-center px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors relative min-w-[70px] lg:min-w-[80px]"
            >
              <Users className="w-6 h-6 text-gray-700 mb-1" />
              <span className="text-xs font-medium text-gray-700">Jaringan</span>
              {connectionRequests.length > 0 && (
                <span className="absolute top-1 right-2 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                  {connectionRequests.length}
                </span>
              )}
            </Link>
            <Link
              to="/marketplace"
              className="flex flex-col items-center px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors min-w-[70px] lg:min-w-[80px]"
            >
              <ShoppingBag className="w-6 h-6 text-gray-700 mb-1" />
              <span className="text-xs font-medium text-gray-700">Marketplace</span>
            </Link>
            <Link
              to="/crowdfunding"
              className="flex flex-col items-center px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors min-w-[70px] lg:min-w-[80px]"
            >
              <Heart className="w-6 h-6 text-gray-700 mb-1" />
              <span className="text-xs font-medium text-gray-700">Crowdfunding</span>
            </Link>
            <Link
              to="/edukasi"
              className="flex flex-col items-center px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors min-w-[70px] lg:min-w-[80px]"
            >
              <BookOpen className="w-6 h-6 text-gray-700 mb-1" />
              <span className="text-xs font-medium text-gray-700">Edukasi</span>
            </Link>
          </div>

          {/* Right - Profile & Premium */}
          <div className="flex items-center gap-1">
            {/* Pesan Icon - Compact */}
            <button
              onClick={() => {
                handleTestNotification();
                setTimeout(() => {
                  window.location.href = '/pesan';
                }, 300);
              }}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block"
            >
              <MessageCircle className="w-6 h-6 text-gray-700" />
              {chatNotifications.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">
                  {chatNotifications.length}
                </span>
              )}
            </button>

            {/* Notifikasi Dropdown - Compact */}
            <div className="relative hidden md:block">
              <button
                onClick={() => {
                  setShowActivityDropdown(!showActivityDropdown);
                  setShowDropdown(false);
                }}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Bell className="w-6 h-6 text-gray-700" />
                {activities.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              {/* Activity & Suggestions Dropdown */}
              {showActivityDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowActivityDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-20 max-h-[600px] flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Notifikasi</h3>
                      
                      {/* Tabs */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setActivityTab('activity')}
                          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activityTab === 'activity'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          Activity
                        </button>
                        <button
                          onClick={() => setActivityTab('suggestions')}
                          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activityTab === 'suggestions'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          Suggested For You
                        </button>
                      </div>
                    </div>

                    {/* Activity/Suggestions List */}
                    <div className="overflow-y-auto flex-1">
                      {activityTab === 'activity' ? (
                        <div className="p-4 space-y-3">
                          {activities.map((activity) => (
                            <div key={activity.id} className="flex items-center gap-2.5">
                              <img
                                src={activity.user.avatar}
                                alt={activity.user.name}
                                className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-900 leading-tight">
                                  <span className="font-semibold">{activity.user.name}</span>{' '}
                                  <span className="text-gray-500">{activity.user.action}</span>
                                </p>
                                <p className="text-[10px] text-gray-400 mt-0.5">{activity.user.time}</p>
                              </div>
                              {activity.user.image && (
                                <img
                                  src={activity.user.image}
                                  alt="Post"
                                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                                />
                              )}
                              {activity.user.action === 'started following you' && (
                                <button className="px-2.5 py-1 bg-blue-600 text-white text-[10px] font-medium rounded-md hover:bg-blue-700 transition-colors flex-shrink-0">
                                  Follow
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 space-y-3">
                          {suggestedPeople.map((person) => (
                            <div key={person.id} className="flex items-center gap-2.5">
                              <img
                                src={person.avatar}
                                alt={person.name}
                                className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-gray-900">
                                  {person.name}
                                </p>
                                <p className="text-[10px] text-gray-500">{person.subtitle}</p>
                              </div>
                              <button className="px-2.5 py-1 bg-blue-600 text-white text-[10px] font-medium rounded-md hover:bg-blue-700 transition-colors flex-shrink-0">
                                Follow
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="p-3 border-t border-gray-200">
                      <button
                        onClick={() => setShowActivityDropdown(false)}
                        className="block w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Lihat Semua
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Cart Icon - Added */}
            <Link
              to="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown with vertical layout */}
            <div className="relative hidden md:block">
              <button
                onClick={() => {
                  setShowDropdown(!showDropdown);
                  setShowActivityDropdown(false);
                }}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'}
                  alt="Profile"
                  className="w-6 h-6 rounded-full object-cover border-2 border-gray-200"
                />
              </button>

              {/* LinkedIn-Style Dropdown Menu */}
              {showDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-20 max-h-[600px] overflow-y-auto">
                    {/* Profile Section */}
                    <Link
                      to="/profil"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-200"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'}
                          alt="Profile"
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-sm">{user?.name || 'Tamu'}</p>
                          <p className="text-xs text-gray-500">Kreator Budaya</p>
                        </div>
                      </div>
                      <button className="w-full px-3 py-1.5 border-2 border-blue-600 text-blue-600 rounded-full font-semibold text-sm hover:bg-blue-50 transition-colors">
                        Lihat profil
                      </button>
                    </Link>

                    {/* Akun Section */}
                    <div className="py-2 border-b border-gray-200">
                      <h4 className="px-4 py-2 text-xs font-bold text-gray-900">Akun</h4>
                      <Link
                        to="/pengaturan"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <Settings className="w-5 h-5 text-gray-700" />
                        <span className="text-sm text-gray-900">Pengaturan & Privasi</span>
                      </Link>
                      <Link
                        to="/bantuan"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-gray-900">Bantuan</span>
                      </Link>
                      <button
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors w-full text-left"
                      >
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                        <span className="text-sm text-gray-900">Bahasa</span>
                      </button>
                    </div>

                    {/* Kelola Section */}
                    <div className="py-2 border-b border-gray-200">
                      <h4 className="px-4 py-2 text-xs font-bold text-gray-900">Kelola</h4>
                      <Link
                        to="/beranda"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm text-gray-900">Posting & Aktivitas</span>
                      </Link>
                      <Link
                        to="/proyek"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-gray-900">Akun Posting Pekerjaan</span>
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors text-gray-900"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Profile Button */}
            <button
              onClick={() => {
                setShowDropdown(!showDropdown);
              }}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'}
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover border-2 border-gray-200"
              />
            </button>

          </div>
        </div>
      </div>
    </nav>

    {/* Messaging Panel - LinkedIn Style */}
    <div className={`fixed bottom-0 right-6 w-80 bg-white border border-gray-300 rounded-t-lg shadow-2xl transition-all duration-300 z-50 ${showMessagingPanel ? 'h-96' : 'h-14'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-gray-700" />
          <h3 className="font-semibold text-gray-900 text-sm">Pesan</h3>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            onClick={() => setShowMessagingPanel(!showMessagingPanel)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            {showMessagingPanel ? (
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Messages Content */}
      {showMessagingPanel && (
        <div className="h-[calc(100%-56px)] flex flex-col">
          {/* Search */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari pesan"
                className="w-full pl-9 pr-3 py-2 bg-gray-100 border-0 rounded-md text-sm outline-none focus:bg-gray-200 transition-colors"
              />
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto">
            {chatNotifications.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {chatNotifications.slice(0, 5).map((notification) => (
                  <div key={notification.id} className="p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-start gap-3">
                      <img
                        src={notification.avatar}
                        alt={notification.name}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900 text-sm truncate">{notification.name}</h4>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2">{notification.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <MessageCircle className="w-12 h-12 text-gray-300 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-1">Belum ada pesan</h4>
                <p className="text-sm text-gray-500 mb-4">
                  Hubungi orang dan mulai percakapan untuk mengawali karier Anda
                </p>
                <button 
                  onClick={() => window.location.href = '/pesan'}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
                >
                  Kirim pesan
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200">
            <Link
              to="/pesan"
              className="block text-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Lihat semua di Pesan
            </Link>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
