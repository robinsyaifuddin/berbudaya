import ModernLayout from '@/react-app/components/ModernLayout';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Image as ImageIcon, Video as VideoIcon, MoreHorizontal, Heart, MessageCircle, Bookmark, Send, ChevronDown, FileText, X, Globe } from 'lucide-react';
import CreatePostDialog from '@/react-app/components/CreatePostDialog';
import ShareDialog from '@/react-app/components/ShareDialog';
import CommentSection from '@/react-app/components/CommentSection';

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
    content: 'Pagi ini selesai proses nglorot sehelai kain batik tulis motif Kawung Nitik. Warna soganya diracik murni dari rebusan kulit kayu tingi dan jambal tanpa pewarna sintetis. Senang sekali modul pembelajarannya kini sudah bisa diakses teman-teman generasi muda di pilar Edukasi Berbudaya! 🌿✨ #BatikTulisSoga #PucuakRabuang #KriyaNusantara',
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
    content: 'Kabar Baik Crowdfunding: Berkat gotong royong 500+ donatur di Berbudaya, 85 cakep naskah lontar usada pengobatan kuno abad ke-17 di Puri Karangasem telah selesai dibersihkan dari parasit jamur menggunakan minyak kemiri organik. Siap memasuki fase alih media digital! 📜🌿 #PusakaLontar #UsadaBali #BudayaGo2026',
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
      <div className="space-y-3 pb-8">

        {/* Post Composer */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
          {/* Main Input */}
          <div className="p-3 sm:p-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'}
                alt="Your avatar"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-slate-200/80 flex-shrink-0"
              />
              <button 
                onClick={() => setShowPostModal(true)}
                className="flex-1 px-3.5 sm:px-4 py-2 sm:py-2.5 text-left text-slate-500 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/90 rounded-full transition-all text-xs sm:text-sm font-medium tracking-tight truncate"
              >
                <span className="sm:hidden">Bagikan karya budaya...</span>
                <span className="hidden sm:inline">Mulai buat posting atau bagikan karya budaya...</span>
              </button>
            </div>
          </div>

          {/* Post Options */}
          <div className="flex items-center px-2 sm:px-3 py-1.5 sm:py-2 border-t border-slate-100 bg-slate-50/40 gap-1 sm:gap-1.5">
            <button 
              onClick={() => setShowPostModal(true)}
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 hover:bg-white rounded-xl transition-all flex-1 justify-center group"
            >
              <ImageIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-xs font-medium text-slate-600 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                <span className="sm:hidden">Foto</span>
                <span className="hidden sm:inline">Foto Galeri</span>
              </span>
            </button>
            <button 
              onClick={() => setShowPostModal(true)}
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 hover:bg-white rounded-xl transition-all flex-1 justify-center group"
            >
              <VideoIcon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="text-xs font-medium text-slate-600 group-hover:text-emerald-600 transition-colors whitespace-nowrap">
                <span className="sm:hidden">Video</span>
                <span className="hidden sm:inline">Rekaman Video</span>
              </span>
            </button>
            <button 
              onClick={() => setShowPostModal(true)}
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 hover:bg-white rounded-xl transition-all flex-1 justify-center group"
            >
              <FileText className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span className="text-xs font-medium text-slate-600 group-hover:text-amber-600 transition-colors whitespace-nowrap">
                <span className="sm:hidden">Artikel</span>
                <span className="hidden sm:inline">Artikel Narasi</span>
              </span>
            </button>
          </div>
        </div>

        {/* Create Post Dialog */}
        <CreatePostDialog
          isOpen={showPostModal}
          onClose={() => setShowPostModal(false)}
          userAvatar={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'}
          userName={user?.name || 'User'}
        />

        {/* Sort Bar */}
        <div className="flex items-center justify-between px-2 py-1">
          <span className="text-xs text-slate-500 font-medium">Urutkan lini masa:</span>
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <span>{sortBy === 'recent' ? 'Terpopuler' : 'Terbaru'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {showSortDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowSortDropdown(false)}
                />
                <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-xl shadow-lg border border-slate-200/90 py-1 z-20">
                  <button
                    onClick={() => {
                      setSortBy('recent');
                      setShowSortDropdown(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs transition-colors ${
                      sortBy === 'recent' ? 'text-blue-600 font-semibold bg-blue-50/50' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Terpopuler
                  </button>
                  <button
                    onClick={() => {
                      setSortBy('top');
                      setShowSortDropdown(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs transition-colors ${
                      sortBy === 'top' ? 'text-blue-600 font-semibold bg-blue-50/50' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Terbaru
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Feed Posts */}
        {samplePosts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
            {/* Post Header */}
            <div className="p-3.5 sm:p-4">
              <div className="flex items-start justify-between mb-2.5">
                <div className="flex items-start gap-3">
                  <Link to={`/user/${post.id}`}>
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200/80 flex-shrink-0 hover:ring-2 hover:ring-blue-500/20 transition-all"
                    />
                  </Link>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm hover:text-blue-600 transition-colors leading-tight">
                      <Link to={`/user/${post.id}`}>
                        {post.author.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{post.author.subtitle}</p>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      {post.author.timestamp} • <Globe className="w-3 h-3 text-slate-400" />
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors" aria-label="Opsi">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors" aria-label="Tutup">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-line">{post.content}</p>
            </div>

            {/* Post Image */}
            {post.image && (
              <div className="bg-slate-100 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.content.slice(0, 40)}
                  className="w-full object-cover max-h-[460px] hover:scale-[1.01] transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            )}

            {/* Post Stats */}
            <div className="px-4 py-2 border-b border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                  <div className="w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center">
                    <Heart className="w-2.5 h-2.5 fill-white text-white" />
                  </div>
                  <span className="text-[11px] text-slate-600 font-medium">
                    {postLikes[post.id]?.count >= 1000 ? `${(postLikes[post.id]?.count/1000).toFixed(1)}rb` : postLikes[post.id]?.count} apresiasi
                  </span>
                </button>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <button onClick={() => handleComment(post)} className="hover:text-blue-600 transition-colors">
                    {post.comments} tanggapan
                  </button>
                  <span>•</span>
                  <button onClick={() => handleShare(post)} className="hover:text-blue-600 transition-colors">
                    {post.bookmarks} dibagikan
                  </button>
                </div>
              </div>
            </div>

            {/* Post Actions */}
            <div className="px-2 py-1.5 bg-slate-50/40">
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1.5 py-2 hover:bg-white rounded-xl transition-all flex-1 justify-center whitespace-nowrap group ${postLikes[post.id]?.liked ? 'text-rose-600 font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <Heart className={`w-4 h-4 transition-transform group-hover:scale-110 ${postLikes[post.id]?.liked ? 'fill-rose-500 text-rose-500' : 'group-hover:text-rose-600'}`} />
                  <span className="text-xs">Suka</span>
                </button>
                <button 
                  onClick={() => handleComment(post)}
                  className="flex items-center gap-1.5 py-2 hover:bg-white rounded-xl transition-all flex-1 justify-center whitespace-nowrap group text-slate-600 hover:text-blue-600"
                >
                  <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">Tanggapi</span>
                </button>
                <button 
                  onClick={() => handleShare(post)}
                  className="flex items-center gap-1.5 py-2 hover:bg-white rounded-xl transition-all flex-1 justify-center whitespace-nowrap group text-slate-600 hover:text-emerald-600"
                >
                  <Send className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">Bagikan</span>
                </button>
                <button 
                  onClick={() => handleSave(post)}
                  className={`flex items-center gap-1.5 py-2 hover:bg-white rounded-xl transition-all flex-1 justify-center whitespace-nowrap group ${savedPostIds.has(post.id) ? 'text-amber-600 font-semibold' : 'text-slate-600 hover:text-amber-600'}`}
                >
                  <Bookmark className={`w-4 h-4 group-hover:scale-110 transition-transform ${savedPostIds.has(post.id) ? 'fill-amber-500 text-amber-500' : ''}`} />
                  <span className="text-xs font-medium">Simpan</span>
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

        {/* Share Dialog */}
        {selectedPost && (
          <ShareDialog
            isOpen={showShareModal}
            onClose={() => setShowShareModal(false)}
            post={selectedPost}
          />
        )}

        {/* Comment Section */}
        {selectedPost && (
          <CommentSection
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
