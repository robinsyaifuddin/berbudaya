import { useState, useEffect } from 'react';
import TopNavbar from '@/react-app/components/TopNavbar';
import { Link } from 'react-router';
import { Plus, Heart, MessageSquare, Share2, Eye } from 'lucide-react';

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
  },
  {
    id: 4,
    title: 'Filosofi Motif Batik Parang Rusak',
    excerpt: 'Mengenal lebih dalam makna dan filosofi di balik motif batik Parang Rusak yang ikonik...',
    date: '2 minggu yang lalu',
    likes: 156,
    comments: 22,
    shares: 15,
    views: 2108,
    image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=400&h=250&fit=crop'
  },
  {
    id: 5,
    title: 'Pelestarian Gamelan di Generasi Muda',
    excerpt: 'Bagaimana generasi muda menjaga kelestarian gamelan dengan sentuhan kreativitas modern...',
    date: '3 minggu yang lalu',
    likes: 203,
    comments: 28,
    shares: 19,
    views: 2876,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=250&fit=crop'
  }
];

export default function PostingAktivitasPage() {
  const [user, setUser] = useState<DemoUser | null>(null);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      
      <div className="pt-16">
        <div className="max-w-4xl mx-auto p-4 md:p-6">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Posting & Aktivitas</h1>
                <p className="text-gray-600 mt-1">Semua postingan dan aktivitas Anda di RuangBudaya</p>
              </div>
              <Link to="/beranda">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-5 h-5" />
                  <span className="hidden md:inline">Buat Postingan</span>
                </button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{userPosts.length}</p>
                <p className="text-sm text-gray-600">Postingan</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-pink-600">
                  {userPosts.reduce((sum, post) => sum + post.likes, 0)}
                </p>
                <p className="text-sm text-gray-600">Total Likes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {userPosts.reduce((sum, post) => sum + post.comments, 0)}
                </p>
                <p className="text-sm text-gray-600">Komentar</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {userPosts.reduce((sum, post) => sum + post.views, 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Views</p>
              </div>
            </div>
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
                  <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-pink-500" />
                      <span className="font-medium">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">{post.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 className="w-4 h-4 text-green-500" />
                      <span className="font-medium">{post.shares}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-purple-500" />
                      <span className="font-medium">{post.views}</span>
                    </div>
                    <span className="ml-auto text-gray-500">{post.date}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                      Lihat Detail
                    </button>
                    <button className="flex-1 py-2 px-4 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                      Edit
                    </button>
                    <button className="py-2 px-4 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                      •••
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {userPosts.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada postingan</h3>
              <p className="text-gray-600 mb-6">Mulai berbagi cerita dan pengalaman budaya Anda</p>
              <Link to="/beranda">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Buat Postingan Pertama
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
