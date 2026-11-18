import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { 
  Home, Search, Bell, MessageCircle, Users, 
  Settings, LogOut, Menu, ShoppingBag, Heart, ShoppingCart,
  X, Send, ChevronDown, Puzzle, Newspaper, Calendar, Image as GalleryIcon,
  ArrowLeft
} from 'lucide-react';
import { ChatNotificationData } from './ChatNotification';
import { useCart } from '@/react-app/contexts/CartContext';
import { useNotification } from '@/react-app/contexts/NotificationContext';
import MobileBottomNav from './MobileBottomNav';

interface DemoUser {
  id: string;
  email: string;
  name: string;
  avatar: string;
  loginTime: string;
}

interface ChatMessage {
  id: number;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

interface ActiveChatContact {
  id: number;
  userId?: string;
  name: string;
  avatar: string;
  role?: string;
  status?: string;
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
  const { confirm } = useNotification();
  const [user, setUser] = useState<DemoUser | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showActivityDropdown, setShowActivityDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activityTab, setActivityTab] = useState<'activity' | 'suggestions'>('activity');
  const [chatNotifications, setChatNotifications] = useState<ChatNotificationData[]>([]);
  const [notificationId, setNotificationId] = useState(1);
  const [showMessagingPanel, setShowMessagingPanel] = useState(false);
  const [showLainnyaDropdown, setShowLainnyaDropdown] = useState(false);

  // Messenger Roomchat Popups state (Facebook style)
  const [activeChat, setActiveChat] = useState<ActiveChatContact | null>(null);
  const [isChatMinimized] = useState(false);
  const [chatSearchText, setChatSearchText] = useState('');
  const [inputMsg, setInputMsg] = useState('');
  const [chatHistory, setChatHistory] = useState<Record<number, ChatMessage[]>>({
    1: [
      { id: 1, sender: 'them', text: 'Halo! Saya tertarik dengan motif batik parang yang Anda posting kemarin', time: '10:25' },
      { id: 2, sender: 'me', text: 'Halo! Terima kasih sudah menghubungi. Motif parang itu memang salah satu karya terbaik kami', time: '10:27' },
      { id: 3, sender: 'them', text: 'Apakah bisa custom ukuran dan warna?', time: '10:28' },
      { id: 4, sender: 'me', text: 'Tentu bisa! Kami menerima custom order untuk ukuran dan warna.', time: '10:29' },
      { id: 5, sender: 'them', text: 'Halo! Saya tertarik dengan motif batik parang yang Anda posting', time: '10:30' }
    ],
    2: [
      { id: 1, sender: 'them', text: 'Halo mas, wayang kulit pesanan saya sedang diproses?', time: '08:45' },
      { id: 2, sender: 'me', text: 'Iya betul, saat ini sedang proses tatah dan pewarnaan prada emas.', time: '08:50' },
      { id: 3, sender: 'them', text: 'Pertunjukan wayang besok dimulai jam 19:00. Jangan lupa ya!', time: '09:15' }
    ],
    3: [
      { id: 1, sender: 'them', text: 'Salam budaya! Kami mengundang sanggar Anda di festival akhir bulan.', time: 'Kemarin' },
      { id: 2, sender: 'me', text: 'Salam! Terdengar sangat menarik. Kapan kita bisa koordinasikan jadwalnya?', time: 'Kemarin' },
      { id: 3, sender: 'them', text: 'Boleh, kita bisa kolaborasi untuk festival nanti. Kapan bisa kita meeting?', time: 'Baru saja' }
    ]
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeChat && !isChatMinimized) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat, chatHistory, isChatMinimized]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMsg.trim() || !activeChat) return;

    const newMsg: ChatMessage = {
      id: Date.now(),
      sender: 'me',
      text: inputMsg.trim(),
      time: 'Baru saja'
    };

    setChatHistory((prev) => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMsg]
    }));
    setInputMsg('');

    // Reset textarea height to initial state
    const textarea = document.getElementById('chat-room-textarea') as HTMLTextAreaElement | null;
    if (textarea) {
      textarea.style.height = 'auto';
    }

    // Simulate smart auto-reply like Facebook
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: Date.now() + 1,
        sender: 'them',
        text: 'Baik, terima kasih konfirmasinya! Segera kami tindak lanjuti.',
        time: 'Baru saja'
      };
      setChatHistory((prev) => ({
        ...prev,
        [activeChat.id]: [...(prev[activeChat.id] || []), replyMsg]
      }));
    }, 1200);
  };
  
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

  const handleLogout = async () => {
    const isLogout = await confirm({
      title: 'Keluar Akun',
      message: 'Apakah Anda yakin ingin keluar dari akun ini?',
      confirmText: 'Ya, Keluar',
      cancelText: 'Batal',
      type: 'danger'
    });

    if (isLogout) {
      localStorage.removeItem('demo_user');
      window.location.href = '/';
    }
  };

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-slate-200/80 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
          {/* Left - Mobile Menu Button & Search Bar */}
          <div className="flex items-center gap-3 flex-1 max-w-md">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              aria-label="Buka Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search Bar */}
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari karya, seniman, budaya..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-100/80 hover:bg-slate-100 border border-transparent focus:border-blue-500/40 rounded-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
              />
            </div>
          </div>

          {/* Center - Navigation Icons with Labels (Modern Professional Culture Hub) */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 flex-1 justify-center max-w-2xl">
            <Link
              to="/beranda"
              className="flex flex-col items-center px-3 py-1.5 hover:bg-slate-100/80 rounded-xl transition-all duration-150 min-w-[70px] lg:min-w-[76px] group"
            >
              <Home className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors mb-0.5" />
              <span className="text-[11px] font-medium text-slate-600 group-hover:text-blue-600 transition-colors tracking-tight">Beranda</span>
            </Link>
            <Link
              to="/jaringan"
              className="flex flex-col items-center px-3 py-1.5 hover:bg-slate-100/80 rounded-xl transition-all duration-150 relative min-w-[70px] lg:min-w-[76px] group"
            >
              <div className="relative">
                <Users className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors mb-0.5" />
                {connectionRequests.length > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-[15px] h-[15px] bg-rose-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold px-0.5 shadow-sm">
                    {connectionRequests.length}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium text-slate-600 group-hover:text-blue-600 transition-colors tracking-tight">Jaringan</span>
            </Link>
            <Link
              to="/marketplace"
              className="flex flex-col items-center px-3 py-1.5 hover:bg-slate-100/80 rounded-xl transition-all duration-150 min-w-[70px] lg:min-w-[76px] group"
            >
              <ShoppingBag className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors mb-0.5" />
              <span className="text-[11px] font-medium text-slate-600 group-hover:text-blue-600 transition-colors tracking-tight">Pasar Seni</span>
            </Link>
            <Link
              to="/crowdfunding"
              className="flex flex-col items-center px-3 py-1.5 hover:bg-slate-100/80 rounded-xl transition-all duration-150 min-w-[70px] lg:min-w-[76px] group"
            >
              <Heart className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors mb-0.5" />
              <span className="text-[11px] font-medium text-slate-600 group-hover:text-blue-600 transition-colors tracking-tight">Donasi</span>
            </Link>
            {/* Menu Lainnya dengan Dropdown Submenu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowLainnyaDropdown(prev => !prev);
                  setShowDropdown(false);
                  setShowActivityDropdown(false);
                }}
                className={`flex flex-col items-center px-3 py-1.5 rounded-xl transition-all duration-150 min-w-[70px] lg:min-w-[76px] group ${
                  showLainnyaDropdown ? 'bg-slate-100 text-blue-600' : 'hover:bg-slate-100/80 text-slate-600'
                }`}
              >
                <div className="flex items-center justify-center gap-0.5">
                  <Menu className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors mb-0.5" />
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${showLainnyaDropdown ? 'rotate-180 text-blue-600' : ''}`} />
                </div>
                <span className="text-[11px] font-medium group-hover:text-blue-600 transition-colors tracking-tight">Lainnya</span>
              </button>

              {/* Submenu Dropdown Popover */}
              {showLainnyaDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowLainnyaDropdown(false)}
                  />
                  <div className="absolute right-0 lg:left-1/2 lg:-translate-x-1/2 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-stone-200/90 py-2 z-40 animate-in fade-in duration-150">
                    <Link
                      to="/permainan"
                      onClick={() => setShowLainnyaDropdown(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors group"
                    >
                      <Puzzle className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
                      <span className="text-sm font-medium tracking-tight">Permainan</span>
                    </Link>

                    <Link
                      to="/berita"
                      onClick={() => setShowLainnyaDropdown(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors group"
                    >
                      <Newspaper className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
                      <span className="text-sm font-medium tracking-tight">Berita</span>
                    </Link>

                    <Link
                      to="/komunitas"
                      onClick={() => setShowLainnyaDropdown(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors group"
                    >
                      <Users className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
                      <span className="text-sm font-medium tracking-tight">Komunitas</span>
                    </Link>

                    <Link
                      to="/acara"
                      onClick={() => setShowLainnyaDropdown(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors group"
                    >
                      <Calendar className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
                      <span className="text-sm font-medium tracking-tight">Acara</span>
                    </Link>

                    <Link
                      to="/gallery"
                      onClick={() => setShowLainnyaDropdown(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors group"
                    >
                      <GalleryIcon className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
                      <span className="text-sm font-medium tracking-tight">Galeri</span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right - Profile & Cart & Notifications */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 hover:bg-slate-100 rounded-full transition-colors md:hidden text-slate-700"
              aria-label="Keranjang Belanja"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-blue-600 rounded-full text-white text-[9px] flex items-center justify-center font-bold px-1">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Pesan Icon - Compact */}
            <button
              onClick={() => {
                setShowMessagingPanel((prev) => !prev);
                setShowDropdown(false);
                setShowActivityDropdown(false);
              }}
              title="Obrolan Pesan"
              className={`relative p-2 rounded-full transition-colors hidden md:block ${
                showMessagingPanel ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              {chatNotifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
              )}
            </button>

            {/* Notifikasi Dropdown - Compact */}
            <div className="relative hidden md:block">
              <button
                onClick={() => {
                  setShowActivityDropdown(!showActivityDropdown);
                  setShowDropdown(false);
                }}
                className="relative p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-700"
                aria-label="Notifikasi"
              >
                <Bell className="w-5 h-5" />
                {activities.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
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
                        to="/posting-aktivitas"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm text-gray-900">Posting & Aktivitas</span>
                      </Link>
                      <Link
                        to="/kelola-komunitas"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="text-sm text-gray-900">Kelola Komunitas Anda</span>
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

          {/* Mobile Profile Button - Navigate to ProfilMenu */}
            <Link
              to="/profil-menu"
              className="md:hidden p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
            </Link>

          </div>
        </div>
      </div>
    </nav>

    {/* Mobile Bottom Navigation Bar */}
    <MobileBottomNav connectionCount={connectionRequests.length} />

    {/* Facebook-style Messenger Dropdown / Obrolan Box in Navbar */}
    {showMessagingPanel && (
      <>
        {/* Backdrop for closing on outside click */}
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowMessagingPanel(false);
          }}
        />
        <div className="fixed top-16 right-4 sm:right-16 w-88 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2 duration-200 h-[520px] max-h-[85vh]">
          {/* Header */}
          <div className="p-3.5 border-b border-gray-100 flex items-center justify-between bg-white flex-shrink-0">
            {activeChat ? (
              /* Header saat berada di Roomchat */
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2.5 min-w-0">
                  <button
                    onClick={() => setActiveChat(null)}
                    title="Kembali ke daftar obrolan"
                    className="p-1.5 -ml-1 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <Link
                    to={`/user/${activeChat.userId || activeChat.id}`}
                    onClick={() => {
                      setShowMessagingPanel(false);
                    }}
                    className="flex items-center gap-2.5 group cursor-pointer"
                    title={`Lihat profil ${activeChat.name}`}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={activeChat.avatar}
                        alt={activeChat.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-500 transition-all"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm truncate leading-tight group-hover:text-blue-600 transition-colors">
                        {activeChat.name}
                      </h4>
                      <p className="text-[11px] text-green-600 font-medium leading-none mt-0.5">Aktif sekarang</p>
                    </div>
                  </Link>
                </div>

                <div className="flex items-center gap-1 text-gray-500">
                  <button 
                    onClick={() => {
                      setActiveChat(null);
                      setShowMessagingPanel(false);
                    }}
                    title="Tutup obrolan"
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              /* Header saat berada di Daftar Obrolan */
              <>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900 text-lg">Obrolan</h3>
                  <span className="text-xs bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded-full">
                    {chatNotifications.length} Baru
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <button 
                    onClick={handleTestNotification}
                    title="Simulasi pesan baru"
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-xs text-blue-600 font-medium"
                  >
                    + Simulasi
                  </button>
                  <button 
                    onClick={() => setShowMessagingPanel(false)}
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Body: Roomchat View ATAU Daftar Obrolan View */}
          {activeChat ? (
            /* ================= VIEW ROOMCHAT DI DALAM KOTAK OBROLAN ================= */
            <div className="flex-1 flex flex-col min-h-0 bg-white">
              {/* Bubble Messages Scroll Area */}
              <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-gray-50/50">
                {/* Intro Pengguna dengan Link ke Profil */}
                <div className="text-center py-2.5">
                  <Link
                    to={`/user/${activeChat.userId || activeChat.id}`}
                    onClick={() => setShowMessagingPanel(false)}
                    className="inline-block group cursor-pointer"
                    title={`Lihat profil ${activeChat.name}`}
                  >
                    <img
                      src={activeChat.avatar}
                      alt={activeChat.name}
                      className="w-16 h-16 rounded-full object-cover mx-auto mb-1.5 ring-2 ring-white shadow-sm group-hover:ring-blue-500 group-hover:scale-105 transition-all"
                    />
                    <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                      {activeChat.name}
                    </p>
                  </Link>
                  <p className="text-xs text-gray-500 mt-0.5">Kreator & Pegiat Berbudaya</p>
                  <Link
                    to={`/user/${activeChat.userId || activeChat.id}`}
                    onClick={() => setShowMessagingPanel(false)}
                    className="inline-block mt-1 text-[11px] font-medium text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Lihat Profil Lengkap →
                  </Link>
                  <div className="h-px bg-gray-200/80 my-3 w-2/3 mx-auto" />
                </div>

                {/* Pesan-pesan */}
                {(chatHistory[activeChat.id] || []).map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed shadow-sm break-words whitespace-pre-wrap ${
                        msg.sender === 'me'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 px-1">
                      {msg.time}
                    </span>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Form Input Balasan Chat Ala WhatsApp (Auto-expanding textarea, Enter = Baris Baru, Send button = Kirim) */}
              <div className="p-3 bg-white border-t border-gray-100 flex items-end gap-2 flex-shrink-0">
                <textarea
                  id="chat-room-textarea"
                  value={inputMsg}
                  onChange={(e) => {
                    setInputMsg(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                  }}
                  onKeyDown={(e) => {
                    // Mekanisme WhatsApp Web: Ctrl+Enter atau Shift+Enter atau Enter biasa
                    // Enter biasa membuat baris baru, jika pengguna menekan tombol Ctrl+Enter bisa kirim opsional
                    if (e.key === 'Enter' && e.ctrlKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  rows={1}
                  placeholder={`Ketik pesan untuk ${activeChat.name.split(' ')[0]}...`}
                  className="flex-1 bg-gray-100 hover:bg-gray-200/50 focus:bg-white text-[13.5px] px-3.5 py-2.5 rounded-2xl border border-transparent focus:border-blue-400 outline-none transition-all placeholder:text-gray-400 text-gray-800 resize-none max-h-28 overflow-y-auto leading-relaxed break-words"
                />
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={!inputMsg.trim()}
                  title="Kirim pesan"
                  className={`p-2.5 rounded-full transition-all flex-shrink-0 ${
                    inputMsg.trim() 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md scale-100 hover:scale-105 active:scale-95' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* ================= VIEW DAFTAR OBROLAN ================= */
            <>
              {/* Search Bar */}
              <div className="p-3 border-b border-gray-100 bg-gray-50/50 flex-shrink-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={chatSearchText}
                    onChange={(e) => setChatSearchText(e.target.value)}
                    placeholder="Cari di Obrolan..."
                    className="w-full pl-9 pr-3 py-2 bg-gray-100 hover:bg-gray-200/70 focus:bg-white border border-transparent focus:border-blue-400 rounded-xl text-sm outline-none transition-all placeholder:text-gray-400 text-gray-800"
                  />
                </div>
              </div>

              {/* List Obrolan */}
              <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                {chatNotifications
                  .filter((n) => n.name.toLowerCase().includes(chatSearchText.toLowerCase()) || n.message.toLowerCase().includes(chatSearchText.toLowerCase()))
                  .map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => {
                        // Petakan ke userId yang sesuai (1, 2, 3, 4) jika ada atau gunakan id notifikasi
                        const matchedUserId = notification.name.includes('Bambang') ? '1' : 
                                              notification.name.includes('Dewi') ? '4' : 
                                              notification.name.includes('Siti') ? '2' : String(notification.id);
                        setActiveChat({
                          id: notification.id,
                          userId: matchedUserId,
                          name: notification.name,
                          avatar: notification.avatar,
                          role: 'Penggiat Budaya',
                          status: 'Aktif sekarang'
                        });
                      }}
                      className="p-3 hover:bg-gray-50/90 cursor-pointer transition-colors flex items-center gap-3 group relative"
                    >
                      <div className="relative flex-shrink-0">
                        <img
                          src={notification.avatar}
                          alt={notification.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-100 transition-all"
                        />
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className="font-semibold text-gray-900 text-sm truncate group-hover:text-blue-600 transition-colors">
                            {notification.name}
                          </h4>
                          <span className="text-[11px] text-gray-400 flex-shrink-0">{notification.time}</span>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-1 group-hover:text-gray-800">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  ))}

                {chatNotifications.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    <MessageCircle className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm font-medium">Belum ada obrolan</p>
                    <p className="text-xs text-gray-400 mt-1">Pesan yang masuk akan muncul di sini.</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-gray-100 bg-gray-50/80 text-center flex-shrink-0">
                <Link
                  to="/pesan"
                  onClick={() => setShowMessagingPanel(false)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Buka Semua di Halaman Pesan Penuh →
                </Link>
              </div>
            </>
          )}
        </div>
      </>
    )}
    </>
  );
}
