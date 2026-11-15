import ModernLayout from '@/react-app/components/ModernLayout';
import { useState, useEffect } from 'react';
import { Image as ImageIcon, Video as VideoIcon, MoreHorizontal, Heart, MessageCircle, Bookmark, Send, ChevronDown, FileText, X, Globe, Sparkles } from 'lucide-react';
import CreatePostModal from '@/react-app/components/CreatePostModal';
import ShareModal from '@/react-app/components/ShareModal';
import CommentModal from '@/react-app/components/CommentModal';

interface DemoUser {
  id: string;
  email: string;
  name: string;
  avatar: string;
  loginTime: string;
}

const samplePosts = [
  {
    id: 1,
    author: {
      name: 'Dewi Lestari Hadiningrat',
      subtitle: 'Maestro Pembatik • Surakarta',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      timestamp: '25 menit yang lalu'
    },
    content: 'Pagi ini selesai proses nglorot sehelai kain batik tulis motif Kawung Nitik. Warna soganya diracik murni dari rebusan kulit kayu tingi dan jambal tanpa pewarna sintetis. Senang sekali modul pembelajarannya kini sudah bisa diakses teman-teman generasi muda di pilar Edukasi Ruang Budaya! 🌿✨ #BatikTulisSoga #PucuakRabuang #KriyaNusantara',
    image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=800&h=600&fit=crop',
    likes: 1245,
    comments: 88,
    bookmarks: 194
  },
  {
    id: 2,
    author: {
      name: 'Ki Gendon Giri',
      subtitle: 'Pengrajin Wayang Kulit • Banyumas',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      timestamp: '1 jam yang lalu'
    },
    content: 'Menatah wayang tokoh Raden Gatotkaca memerlukan ketenangan nafas dan ketelitian memegang tatah baja. Setiap ornamen prada emas melambangkan watak ksatria yang kokoh berotot kawat bertulang besi. Karya terkurasi ini sudah resmi tersedia di Marketplace Budaya. 🎭🛡️ #WayangKulit #Gatotkaca #SeniTatahBanyumas',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    likes: 2580,
    comments: 142,
    bookmarks: 310
  },
  {
    id: 3,
    author: {
      name: 'Komunitas Peduli Lontar Bali',
      subtitle: 'Pelestari Manuskrip Kuno • Karangasem',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      timestamp: '3 jam yang lalu'
    },
    content: 'Kabar Baik Crowdfunding: Berkat gotong royong 500+ donatur di Ruang Budaya, 85 cakep naskah lontar usada pengobatan kuno abad ke-17 di Puri Karangasem telah selesai dibersihkan dari parasit jamur menggunakan minyak kemiri organik. Siap memasuki fase alih media digital! 📜🌿 #PusakaLontar #UsadaBali #BudayaGo2026',
    image: 'https://images.unsplash.com/photo-1582735689851-574f29054c5f?w=800&h=600&fit=crop',
    likes: 3410,
    comments: 215,
    bookmarks: 520
  }
];

export default function Home() {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'top'>('recent');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [postLikes, setPostLikes] = useState<{[key: number]: {liked: boolean, count: number}}>({
    1: { liked: false, count: 1234 },
    2: { liked: false, count: 2567 },
    3: { liked: false, count: 3421 },
    4: { liked: false, count: 5678 }
  });
  const [savedPostIds, setSavedPostIds] = useState<Set<number>>(new Set());

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

    // Load saved posts
    const saved = localStorage.getItem('saved_posts');
    if (saved) {
      try {
        const savedPosts = JSON.parse(saved);
        const ids = new Set<number>(savedPosts.map((p: any) => p.id as number));
        setSavedPostIds(ids);
      } catch (error) {
        console.error('Error loading saved posts:', error);
      }
    }
  }, []);

  const handleLike = (postId: number) => {
    setPostLikes(prev => ({
      ...prev,
      [postId]: {
        liked: !prev[postId].liked,
        count: prev[postId].liked ? prev[postId].count - 1 : prev[postId].count + 1
      }
    }));
  };

  const handleComment = (post: any) => {
    setSelectedPost(post);
    setShowCommentModal(true);
  };

  const handleShare = (post: any) => {
    setSelectedPost(post);
    setShowShareModal(true);
  };

  const handleSave = (post: any) => {
    const saved = localStorage.getItem('saved_posts');
    let savedPosts = saved ? JSON.parse(saved) : [];
    
    if (savedPostIds.has(post.id)) {
      // Remove from saved
      savedPosts = savedPosts.filter((p: any) => p.id !== post.id);
      setSavedPostIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(post.id);
        return newSet;
      });
    } else {
      // Add to saved
      savedPosts.unshift({
        id: post.id,
        author: post.author,
        content: post.content,
        image: post.image,
        savedAt: 'Baru saja'
      });
      setSavedPostIds(prev => new Set(prev).add(post.id));
    }
    
    localStorage.setItem('saved_posts', JSON.stringify(savedPosts));
    window.dispatchEvent(new Event('savedPostsUpdated'));
  };

  return (
    <ModernLayout>
      <div className="space-y-2 pb-8">

        {/* Post Composer - LinkedIn Style */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Main Input */}
          <div className="p-4">
            <div className="flex items-center gap-3">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'}
                alt="Your avatar"
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <button 
                onClick={() => setShowPostModal(true)}
                className="flex-1 px-5 py-3 text-left text-gray-600 border-2 border-gray-300 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all text-sm font-medium"
              >
                Mulai buat posting
              </button>
            </div>
          </div>

          {/* Post Options */}
          <div className="flex items-center px-2 py-2 border-t border-gray-200">
            <button 
              onClick={() => setShowPostModal(true)}
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-100 rounded-lg transition-colors flex-1 justify-center group"
            >
              <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">Foto</span>
            </button>
            <button 
              onClick={() => setShowPostModal(true)}
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-100 rounded-lg transition-colors flex-1 justify-center group"
            >
              <VideoIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-green-600 transition-colors">Video</span>
            </button>
            <button 
              onClick={() => setShowPostModal(true)}
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-100 rounded-lg transition-colors flex-1 justify-center group"
            >
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-red-600 transition-colors">Artikel</span>
            </button>
          </div>
        </div>

        {/* Create Post Modal */}
        <CreatePostModal
          isOpen={showPostModal}
          onClose={() => setShowPostModal(false)}
          userAvatar={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'}
          userName={user?.name || 'User'}
        />

        {/* Sort Bar - LinkedIn Style */}
        <div className="border-b border-gray-300">
          <div className="flex items-center justify-between px-2 py-1.5">
            <span className="text-xs text-gray-500">Surut menurut:</span>
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-1 text-xs font-semibold text-gray-900 hover:bg-gray-100 px-2 py-1 rounded transition-colors"
              >
                <span>{sortBy === 'recent' ? 'Terpopuler' : 'Terbaru'}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {showSortDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowSortDropdown(false)}
                  />
                  <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-20">
                    <button
                      onClick={() => {
                        setSortBy('recent');
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors ${
                        sortBy === 'recent' ? 'text-blue-600 font-semibold' : 'text-gray-700'
                      }`}
                    >
                      Terpopuler
                    </button>
                    <button
                      onClick={() => {
                        setSortBy('top');
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors ${
                        sortBy === 'top' ? 'text-blue-600 font-semibold' : 'text-gray-700'
                      }`}
                    >
                      Terbaru
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Feed Posts - LinkedIn Style */}
        {samplePosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Post Header */}
            <div className="p-2.5">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm hover:text-blue-600 hover:underline cursor-pointer">{post.author.name}</h3>
                    <p className="text-xs text-gray-500">{post.author.subtitle}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      {post.author.timestamp} • <Globe className="w-3 h-3 text-gray-400" />
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-900 text-sm leading-relaxed">{post.content}</p>
            </div>

            {/* Post Image */}
            {post.image && (
              <img
                src={post.image}
                alt="Post content"
                className="w-full object-cover max-h-96"
              />
            )}

            {/* Post Stats */}
            <div className="px-3 py-2">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                  <div className="flex items-center -space-x-1">
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border border-white">
                      <svg className="w-2.5 h-2.5 fill-white" viewBox="0 0 16 16">
                        <path d="M2 8l4 4 8-8-1.5-1.5L6 9 3.5 6.5z"/>
                      </svg>
                    </div>
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center border border-white">
                      <Heart className="w-2.5 h-2.5 fill-white text-white" />
                    </div>
                    <div className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center border border-white">
                      <Sparkles className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                  <span className="ml-1">{postLikes[post.id]?.count >= 1000 ? `${(postLikes[post.id]?.count/1000).toFixed(1)}rb` : postLikes[post.id]?.count}</span>
                </button>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleComment(post)} className="hover:text-blue-600 transition-colors">
                    {post.comments} komentar
                  </button>
                  <span>•</span>
                  <button onClick={() => handleShare(post)} className="hover:text-blue-600 transition-colors">
                    {post.bookmarks} kali dibagikan
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Post Actions - LinkedIn Style */}
            <div className="px-1 py-1">
              <div className="flex items-center">
                <button 
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-1.5 hover:bg-gray-100 rounded transition-colors flex-1 justify-center group ${postLikes[post.id]?.liked ? 'text-red-500' : ''}`}
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${postLikes[post.id]?.liked ? 'fill-red-500 text-red-500' : 'text-gray-600 group-hover:text-red-500'}`} />
                  <span className={`text-[11px] sm:text-xs font-semibold ${postLikes[post.id]?.liked ? 'text-red-500' : 'text-gray-600 group-hover:text-red-500'}`}>Suka</span>
                </button>
                <button 
                  onClick={() => handleComment(post)}
                  className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-1.5 hover:bg-gray-100 rounded transition-colors flex-1 justify-center group"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  <span className="text-[11px] sm:text-xs font-semibold text-gray-600 group-hover:text-blue-600">Komen</span>
                </button>
                <button 
                  onClick={() => handleShare(post)}
                  className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-1.5 hover:bg-gray-100 rounded transition-colors flex-1 justify-center group"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-green-600 transition-colors" />
                  <span className="text-[11px] sm:text-xs font-semibold text-gray-600 group-hover:text-green-600">Bagikan</span>
                </button>
                <button 
                  onClick={() => handleSave(post)}
                  className={`flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-1.5 hover:bg-gray-100 rounded transition-colors flex-1 justify-center group ${savedPostIds.has(post.id) ? 'text-yellow-600' : ''}`}
                >
                  <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${savedPostIds.has(post.id) ? 'fill-yellow-600 text-yellow-600' : 'text-gray-600 group-hover:text-yellow-600'}`} />
                  <span className={`text-[11px] sm:text-xs font-semibold ${savedPostIds.has(post.id) ? 'text-yellow-600' : 'text-gray-600 group-hover:text-yellow-600'}`}>Simpan</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Load More Section */}
        <div className="text-center py-4">
          <div className="border-t border-gray-300 mb-4"></div>
          <p className="text-xs text-gray-500 mb-3">Anda sudah melihat semua konten terbaru</p>
          <button className="px-5 py-2 text-xs font-semibold text-gray-700 border border-gray-300 rounded-full hover:border-gray-400 hover:bg-gray-50 transition-all">
            Lihat postingan lainnya
          </button>
        </div>

        {/* Share Modal */}
        {selectedPost && (
          <ShareModal
            isOpen={showShareModal}
            onClose={() => setShowShareModal(false)}
            post={selectedPost}
          />
        )}

        {/* Comment Modal */}
        {selectedPost && (
          <CommentModal
            isOpen={showCommentModal}
            onClose={() => setShowCommentModal(false)}
            post={selectedPost}
            userAvatar={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'}
            userName={user?.name || 'User'}
          />
        )}
      </div>
    </ModernLayout>
  );
}
