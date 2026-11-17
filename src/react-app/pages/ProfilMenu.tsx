import { useState, useEffect } from 'react';
import TopNavbar from '@/react-app/components/TopNavbar';
import { Link } from 'react-router';
import { 
  Settings, HelpCircle, Globe, 
  FileText, Briefcase, LogOut, 
  ChevronRight, Plus, Users,
  Heart, MessageSquare, Share2, Eye
} from 'lucide-react';

interface DemoUser {
  id: string;
  email: string;
  name: string;
  avatar: string;
  loginTime: string;
}

interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  image?: string;
}

interface Community {
  id: number;
  name: string;
  description: string;
  members: number;
  image: string;
  role: 'admin' | 'member';
  category: string;
}

const userPosts: Post[] = [
  {
    id: 1,
    title: 'Keindahan Wayang Kulit di Era Modern',
    excerpt: 'Wayang kulit terus berkembang dan beradaptasi dengan zaman modern sambil mempertahankan nilai-nilai tradisional...',
    date: '2 hari yang lalu',
    likes: 124,
    comments: 18,
    shares: 12,
    views: 1543,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=250&fit=crop'
  },
  {
    id: 2,
    title: 'Workshop Membatik untuk Pemula',
    excerpt: 'Bergabunglah dalam workshop membatik yang ramah pemula. Pelajari teknik dasar membatik dari pengrajin berpengalaman...',
    date: '5 hari yang lalu',
    likes: 89,
    comments: 12,
    shares: 8,
    views: 892,
    image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=400&h=250&fit=crop'
  },
  {
    id: 3,
    title: 'Dokumentasi Festival Reog Ponorogo 2024',
    excerpt: 'Momen-momen terbaik dari Festival Reog Ponorogo yang meriah dan penuh warna budaya...',
    date: '1 minggu yang lalu',
    likes: 245,
    comments: 34,
    shares: 28,
    views: 3421,
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=250&fit=crop'
  }
];

const userCommunities: Community[] = [
  {
    id: 1,
    name: 'Komunitas Wayang Indonesia',
    description: 'Komunitas pecinta wayang dari seluruh Indonesia. Berbagi informasi, diskusi, dan event seputar dunia pewayangan.',
    members: 1250,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&h=200&fit=crop',
    role: 'admin',
    category: 'Seni Teater & Tari'
  },
  {
    id: 2,
    name: 'Pecinta Batik Nusantara',
    description: 'Ruang belajar dan berbagi tentang batik dari berbagai daerah di Indonesia. Dari pembuatan hingga filosofi motif.',
    members: 2340,
    image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=300&h=200&fit=crop',
    role: 'admin',
    category: 'Kerajinan'
  }
];

export default function ProfilMenuPage() {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [activeView, setActiveView] = useState<'menu' | 'posts' | 'communities' | 'create-community'>('menu');
  const [newCommunity, setNewCommunity] = useState({
    name: '',
    description: '',
    category: 'Seni Teater & Tari'
  });

  useEffect(() => {
    const demoUserStr = localStorage.getItem('demo_user');
    if (demoUserStr) {
      try {
        setUser(JSON.parse(demoUserStr));
      } catch (error) {
        console.error('Error parsing demo user:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('demo_user');
    window.location.href = '/';
  };

  const handleCreateCommunity = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Komunitas "${newCommunity.name}" berhasil dibuat!\n\nIni adalah mode demo. Dalam produksi, komunitas akan disimpan ke database.`);
    setNewCommunity({ name: '', description: '', category: 'Seni Teater & Tari' });
    setActiveView('communities');
  };

  // Menu View
  if (activeView === 'menu') {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNavbar />
        
        <div className="pt-16 max-w-md mx-auto bg-white min-h-screen">
          {/* Profile Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {user?.name || 'mr.robinsyaifuddin99'}
                </h2>
                <p className="text-gray-600">Kreator Budaya</p>
              </div>
            </div>
            
            <Link to="/profil">
              <button className="w-full mt-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Lihat profil
              </button>
            </Link>
          </div>

          {/* Akun Section */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 mb-3">Akun</h3>
            <div className="space-y-1">
              <Link to="/pengaturan">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span className="flex-1 text-left text-gray-900">Pengaturan & Privasi</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </Link>
              
              <Link to="/bantuan">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <HelpCircle className="w-5 h-5 text-gray-600" />
                  <span className="flex-1 text-left text-gray-900">Bantuan</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </Link>
              
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <Globe className="w-5 h-5 text-gray-600" />
                <span className="flex-1 text-left text-gray-900">Bahasa</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Kelola Section */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 mb-3">Kelola</h3>
            <div className="space-y-1">
              <button 
                onClick={() => setActiveView('posts')}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FileText className="w-5 h-5 text-gray-600" />
                <span className="flex-1 text-left text-gray-900">Posting & Aktivitas</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              
              <button 
                onClick={() => setActiveView('communities')}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Briefcase className="w-5 h-5 text-gray-600" />
                <span className="flex-1 text-left text-gray-900">Kelola Komunitas Anda</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Logout */}
          <div className="p-6">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5 text-red-600" />
              <span className="flex-1 text-left text-red-600 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Posts View
  if (activeView === 'posts') {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNavbar />
        
        <div className="pt-16">
          <div className="max-w-4xl mx-auto p-4 md:p-6">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 mb-4">
              <button 
                onClick={() => setActiveView('menu')}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 md:hidden"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
                <span>Kembali</span>
              </button>
              
              <div className="flex items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Posting & Aktivitas</h1>
                <Link to="/beranda">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-5 h-5" />
                    <span className="hidden md:inline">Buat Postingan</span>
                  </button>
                </Link>
              </div>
              <p className="text-gray-600 mt-2">Semua postingan dan aktivitas Anda di RuangBudaya</p>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {userPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 md:h-64 object-cover"
                    />
                  )}
                  
                  <div className="p-4 md:p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    
                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 className="w-4 h-4" />
                        <span>{post.shares}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{post.views}</span>
                      </div>
                      <span className="ml-auto text-gray-500">{post.date}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        Edit
                      </button>
                      <button className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        Statistik
                      </button>
                      <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Communities View
  if (activeView === 'communities') {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNavbar />
        
        <div className="pt-16">
          <div className="max-w-4xl mx-auto p-4 md:p-6">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 mb-4">
              <button 
                onClick={() => setActiveView('menu')}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 md:hidden"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
                <span>Kembali</span>
              </button>
              
              <div className="flex items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Kelola Komunitas Anda</h1>
                <button 
                  onClick={() => setActiveView('create-community')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden md:inline">Buat Komunitas</span>
                </button>
              </div>
              <p className="text-gray-600 mt-2">Komunitas yang Anda kelola dan ciptakan</p>
            </div>

            {/* Communities List */}
            <div className="space-y-4">
              {userCommunities.map((community) => (
                <div key={community.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="md:flex">
                    <img 
                      src={community.image} 
                      alt={community.name}
                      className="w-full md:w-64 h-48 md:h-auto object-cover"
                    />
                    
                    <div className="flex-1 p-4 md:p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{community.name}</h3>
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                            {community.role === 'admin' ? 'Administrator' : 'Anggota'}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {community.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{community.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-5 h-5" />
                          <span className="font-medium">{community.members.toLocaleString()} anggota</span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Link to={`/komunitas?group=${community.id}`}>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                              Kelola
                            </button>
                          </Link>
                          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                            Lihat
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Empty State */}
              {userCommunities.length === 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada komunitas</h3>
                  <p className="text-gray-600 mb-6">Buat komunitas pertama Anda dan mulai membangun jejaring budaya</p>
                  <button 
                    onClick={() => setActiveView('create-community')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Buat Komunitas Baru
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Create Community View
  if (activeView === 'create-community') {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNavbar />
        
        <div className="pt-16">
          <div className="max-w-2xl mx-auto p-4 md:p-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-8">
              <button 
                onClick={() => setActiveView('communities')}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
                <span>Kembali</span>
              </button>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Buat Komunitas Baru</h1>
              <p className="text-gray-600 mb-8">Ciptakan komunitas untuk menghubungkan orang-orang dengan minat yang sama</p>

              <form onSubmit={handleCreateCommunity} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Nama Komunitas <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newCommunity.name}
                    onChange={(e) => setNewCommunity({...newCommunity, name: e.target.value})}
                    placeholder="Contoh: Komunitas Batik Jakarta"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Nama komunitas harus unik dan mencerminkan tujuan komunitas</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newCommunity.category}
                    onChange={(e) => setNewCommunity({...newCommunity, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="Seni Teater & Tari">Seni Teater & Tari</option>
                    <option value="Kerajinan">Kerajinan</option>
                    <option value="Musik Tradisional">Musik Tradisional</option>
                    <option value="Kuliner">Kuliner</option>
                    <option value="Arsitektur">Arsitektur</option>
                    <option value="Sastra">Sastra</option>
                    <option value="Tari">Tari</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Deskripsi <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={newCommunity.description}
                    onChange={(e) => setNewCommunity({...newCommunity, description: e.target.value})}
                    placeholder="Jelaskan tentang komunitas Anda, tujuan, dan siapa yang cocok bergabung..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Minimal 100 karakter. Jelaskan visi, misi, dan aktivitas komunitas.</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">💡 Tips Membuat Komunitas yang Menarik:</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Pilih nama yang mudah diingat dan mencerminkan identitas komunitas</li>
                    <li>• Tulis deskripsi yang jelas dan mengundang</li>
                    <li>• Tentukan tema atau fokus komunitas dengan spesifik</li>
                    <li>• Aktif mengajak diskusi dan berbagi konten berkualitas</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveView('communities')}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Buat Komunitas
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
