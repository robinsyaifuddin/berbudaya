import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { 
  Users, MapPin, Check, Share2, Award, Calendar, 
  MessageSquare, ThumbsUp, ShieldCheck, Info,
  ArrowLeft, Search, Image as ImageIcon, Send,
  Globe, CheckCircle2, MoreHorizontal,
  Bookmark, UserPlus, ShieldAlert, Heart,
  Newspaper, Landmark, Ticket, HandHeart, Clock,
  ExternalLink, ChevronRight, FileText, CheckCircle
} from 'lucide-react';
import TopNavbar from '@/react-app/components/TopNavbar';
import VerifiedBadge from '@/react-app/components/VerifiedBadge';
import { communitiesData, Community, CommunityEvent, CommunityDonation, CommunityNews } from '@/react-app/data/communitiesData';

interface CommentItem {
  id: number;
  author: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
}

interface PostItem {
  id: number;
  author: string;
  authorRole: string;
  authorAvatar: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  commentsList?: CommentItem[];
}

export default function DetailKomunitasPage() {
  const { id } = useParams<{ id: string }>();
  const communityId = Number(id);
  
  // Find community or fallback
  const community: Community = communitiesData.find((c) => c.id === communityId) || communitiesData[0];

  const [activeTab, setActiveTab] = useState<'beranda' | 'berita' | 'acara' | 'donasi' | 'tentang' | 'pengurus'>('beranda');
  const [isFollowing, setIsFollowing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newPostText, setNewPostText] = useState('');
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [openCommentPostIds, setOpenCommentPostIds] = useState<number[]>([]);
  const [commentInputs, setCommentInputs] = useState<{ [postId: number]: string }>({});

  // Initial posts with seeded realistic comments
  const [posts, setPosts] = useState<PostItem[]>(() => {
    if (community.recentPosts && community.recentPosts.length > 0) {
      return community.recentPosts.map((p) => ({
        ...p,
        commentsList: [
          {
            id: 1,
            author: 'Bambang Sudiro',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
            text: 'Salut atas dedikasi dan konsistensi lembaga dalam menjaga mutu wastra nusantara.',
            time: '2 jam lalu',
            likes: 4
          },
          {
            id: 2,
            author: 'Siti Rahmawati',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
            text: 'Izin bertanya min, untuk workshop canting tembaga apakah pendaftaran sudah bisa via laman ini?',
            time: '45 menit lalu',
            likes: 2
          }
        ]
      }));
    }
    return [
      {
        id: 991,
        author: community.name,
        authorRole: 'Lembaga Resmi',
        authorAvatar: community.avatarImage || community.image,
        time: '1 hari yang lalu',
        content: `Selamat datang di Halaman Resmi Lembaga ${community.name}. Kami hadir menyelenggarakan pembinaan kebudayaan, kuratorial karya, pelatihan berkala, dan penyaluran dana restorasi cagar warisan nusantara.`,
        likes: 48,
        comments: 3,
        commentsList: [
          {
            id: 11,
            author: 'Kurniawan',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
            text: 'Salam takzim dan sukses selalu untuk seluruh jajaran dewan pengurus!',
            time: '12 jam lalu',
            likes: 5
          }
        ]
      }
    ];
  });

  const toggleComments = (postId: number) => {
    if (openCommentPostIds.includes(postId)) {
      setOpenCommentPostIds(openCommentPostIds.filter((id) => id !== postId));
    } else {
      setOpenCommentPostIds([...openCommentPostIds, postId]);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleFollow = () => {
    setIsFollowing(!isFollowing);
    showToast(!isFollowing ? `Anda resmi mengikuti profil resmi ${community.name}` : `Anda berhenti mengikuti lembaga ini`);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Tautan profil resmi lembaga berhasil disalin!');
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: PostItem = {
      id: Date.now(),
      author: 'Anda (Pengguna Terverifikasi)',
      authorRole: 'Pegiat Sahabat Budaya',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      time: 'Baru saja',
      content: newPostText,
      likes: 0,
      comments: 0,
      commentsList: []
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
    showToast('Kabar/aspirasi Anda berhasil dikirim ke feed lembaga!');
  };

  const toggleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((p) => p !== postId));
      setPosts(posts.map((p) => (p.id === postId ? { ...p, likes: Math.max(0, p.likes - 1) } : p)));
    } else {
      setLikedPosts([...likedPosts, postId]);
      setPosts(posts.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p)));
    }
  };

  const handleAddComment = (postId: number) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    const newComment: CommentItem = {
      id: Date.now(),
      author: 'Anda (Pengguna Terverifikasi)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      text,
      time: 'Baru saja',
      likes: 0
    };

    setPosts(posts.map((p) => {
      if (p.id === postId) {
        const updatedList = [...(p.commentsList || []), newComment];
        return {
          ...p,
          comments: updatedList.length,
          commentsList: updatedList
        };
      }
      return p;
    }));

    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 pb-24">
      <TopNavbar />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 border border-slate-700 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <div className="pt-20 bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-base font-medium text-blue-700 hover:text-blue-800 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Kembali</span>
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span>ID Lembaga:</span>
            <span className="font-semibold text-slate-700">#{community.slug || `KB-${community.id}`}</span>
          </div>
        </div>
      </div>

      {/* Hero / Cover Photo Banner (Professional Institution Profile Style) */}
      <div className="bg-white border-b border-slate-200/80 shadow-xs">
        <div className="max-w-6xl mx-auto">
          {/* Cover Container */}
          <div className="relative h-60 sm:h-72 md:h-84 lg:h-96 w-full bg-slate-900 overflow-hidden md:rounded-b-2xl">
            <img
              src={community.coverImage || community.image}
              alt={community.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1600&auto=format&fit=crop&q=80';
              }}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            
            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md border border-white/20 flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-amber-400" />
                {community.institutionType || 'Lembaga Kebudayaan'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#C2410C]/90 text-white backdrop-blur-md">
                {community.category}
              </span>
            </div>
          </div>

          {/* Institution Header Details */}
          <div className="px-4 sm:px-6 pt-4 pb-2">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 -mt-16 sm:-mt-20 md:-mt-24 relative z-10">
              {/* Avatar + Title Group */}
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden p-1.5 bg-white shadow-xl border border-slate-200/80">
                  <img
                    src={community.avatarImage || community.image}
                    alt={community.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                <div className="space-y-1.5 mb-2">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                      {community.name}
                    </h1>
                    {community.verified && (
                      <VerifiedBadge className="w-6 h-6 text-[#1D9BF0] shrink-0" />
                    )}
                  </div>
                  
                  <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl">
                    {community.tagline || community.description}
                  </p>

                  <div className="text-xs text-slate-500 flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                    <span className="inline-flex items-center gap-1 text-slate-700 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-[#C2410C]" />
                      {community.city ? `${community.city}, ` : ''}{community.province}
                    </span>
                    <span>•</span>
                    <span>
                      <strong className="text-slate-900">{community.members.toLocaleString()}</strong> Pengikut
                    </span>
                    <span>•</span>
                    <span>
                      Didirikan <strong className="text-slate-900">{community.foundedYear || '2019'}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-2.5 flex-wrap">
                <button
                  onClick={handleToggleFollow}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs active:scale-[0.98] ${
                    isFollowing
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                      : 'bg-[#C2410C] hover:bg-[#9A3412] text-white'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mengikuti</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>+ Ikuti Profil</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('donasi')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs sm:text-sm font-bold transition-all"
                >
                  <HandHeart className="w-4 h-4 text-amber-700" />
                  <span>Dukung Lembaga</span>
                </button>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 p-2.5 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold transition-all"
                  title="Bagikan Tautan Profil"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs (Professional Institutional Profile) */}
            <div className="flex items-center gap-6 sm:gap-8 mt-6 overflow-x-auto scrollbar-none border-b border-slate-200">
              {[
                { key: 'beranda', label: 'Beranda & Kabar', icon: MessageSquare },
                { key: 'berita', label: `Berita & Rilis (${community.newsList?.length || 0})`, icon: Newspaper },
                { key: 'acara', label: `Acara & Pagelaran (${community.eventsList?.length || 0})`, icon: Calendar },
                { key: 'donasi', label: `Galang Dana (${community.donationsList?.length || 0})`, icon: HandHeart },
                { key: 'tentang', label: 'Tentang & Legalitas', icon: Info },
                { key: 'pengurus', label: `Dewan Pengurus (${community.staffList?.length || 3})`, icon: Users },
              ].map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`inline-flex items-center gap-2 pb-3.5 pt-2 text-xs sm:text-sm font-bold whitespace-nowrap transition-colors relative ${
                      isActive
                        ? 'text-[#C2410C]'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#C2410C]' : 'text-slate-500'}`} />
                    <span>{tab.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#C2410C] rounded-t-sm" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content Area */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column / Primary Content (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* TAB: BERANDA & KABAR */}
            {activeTab === 'beranda' && (
              <>
                {/* Official Announcement Highlight Banner */}
                {community.newsList && community.newsList[0] && (
                  <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-amber-500 text-white rounded-xl shrink-0 mt-0.5">
                        <Newspaper className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                          Pengumuman Resmi Tersemat
                        </span>
                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">
                          {community.newsList[0].title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                          {community.newsList[0].excerpt}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('berita')}
                      className="px-3.5 py-1.5 bg-white text-slate-800 hover:bg-amber-100 border border-amber-300 text-xs font-bold rounded-lg transition-colors whitespace-nowrap self-end sm:self-center"
                    >
                      Baca Rilis
                    </button>
                  </div>
                )}

                {/* Create Interaction Box */}
                <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <input
                      type="text"
                      placeholder={`Sampaikan aspirasi / pertanyaan ke ${community.name}...`}
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCreatePost(e);
                      }}
                      className="flex-1 bg-slate-50 hover:bg-slate-100 focus:bg-white text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200/80 focus:border-[#C2410C] focus:outline-none transition-all"
                    />
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="text-xs text-slate-400">
                      Posting resmi terbuka untuk jejaring kebudayaan
                    </span>
                    <button
                      onClick={handleCreatePost}
                      disabled={!newPostText.trim()}
                      className="inline-flex items-center gap-1.5 bg-[#C2410C] hover:bg-[#9A3412] disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kirim</span>
                    </button>
                  </div>
                </div>

                {/* Feed Items */}
                {posts.map((post) => {
                  const isLiked = likedPosts.includes(post.id);
                  const isCommentOpen = openCommentPostIds.includes(post.id);
                  const commentCount = post.commentsList ? post.commentsList.length : post.comments;

                  return (
                    <div key={post.id} className="bg-white rounded-2xl shadow-xs border border-slate-200/90 overflow-hidden">
                      {/* Post Header */}
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.authorAvatar}
                            alt={post.author}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                                {post.author}
                              </h4>
                              <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold border border-slate-200/60">
                                {post.authorRole}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5">{post.time} • Siaran Publik</p>
                          </div>
                        </div>

                        <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Content Text */}
                      <div className="px-4 pb-3">
                        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                          {post.content}
                        </p>
                      </div>

                      {/* Media Image */}
                      {post.image && (
                        <div className="bg-slate-100 max-h-96 overflow-hidden border-y border-slate-100">
                          <img
                            src={post.image}
                            alt="Dokumentasi Kegiatan"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Reaction Stats */}
                      <div className="px-4 py-2 flex items-center justify-between text-xs text-slate-500 border-b border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-[#C2410C] text-white flex items-center justify-center text-[9px]">👍</span>
                          <span>{post.likes} apresiasi</span>
                        </div>
                        <button 
                          onClick={() => toggleComments(post.id)}
                          className="hover:underline text-slate-500"
                        >
                          {commentCount} tanggapan
                        </button>
                      </div>

                      {/* Reaction Buttons */}
                      <div className="px-2 py-1 flex items-center justify-around text-xs font-semibold text-slate-600 border-b border-slate-100">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className={`flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-50 rounded-lg transition-colors ${
                            isLiked ? 'text-[#C2410C]' : ''
                          }`}
                        >
                          <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-[#C2410C]' : ''}`} />
                          <span>Apresiasi</span>
                        </button>
                        <button 
                          onClick={() => toggleComments(post.id)}
                          className={`flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-50 rounded-lg transition-colors ${
                            isCommentOpen ? 'text-[#C2410C] bg-amber-50/50' : ''
                          }`}
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Tanggapi</span>
                        </button>
                        <button 
                          onClick={() => {
                            navigator.clipboard?.writeText(window.location.href);
                            showToast('Tautan postingan berhasil disalin!');
                          }}
                          className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-50 rounded-lg transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                          <span>Bagikan</span>
                        </button>
                      </div>

                      {/* Comments Drawer */}
                      {isCommentOpen && (
                        <div className="p-4 bg-slate-50/70 space-y-3 border-t border-slate-100">
                          {post.commentsList && post.commentsList.length > 0 ? (
                            <div className="space-y-2.5">
                              {post.commentsList.map((c) => (
                                <div key={c.id} className="flex items-start gap-2.5">
                                  <img
                                    src={c.avatar}
                                    alt={c.author}
                                    className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5 border border-slate-200"
                                  />
                                  <div className="flex-1">
                                    <div className="bg-slate-200/80 rounded-2xl px-3.5 py-2 inline-block max-w-full">
                                      <h5 className="text-xs font-bold text-slate-900">{c.author}</h5>
                                      <p className="text-xs text-slate-700 leading-relaxed">{c.text}</p>
                                    </div>
                                    <div className="flex items-center gap-3 px-2 pt-1 text-[11px] text-slate-500 font-semibold">
                                      <span className="text-slate-400 font-normal">{c.time}</span>
                                      {c.likes > 0 && (
                                        <span className="flex items-center gap-0.5 text-[#C2410C]">
                                          <ThumbsUp className="w-3 h-3 fill-[#C2410C]" />
                                          <span>{c.likes}</span>
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-slate-400 text-center py-2">Belum ada tanggapan.</p>
                          )}

                          {/* Comment Input */}
                          <div className="flex items-center gap-2.5 pt-1">
                            <img
                              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                              alt="Me"
                              className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                            />
                            <div className="flex-1 relative">
                              <input
                                type="text"
                                placeholder="Tulis komentar publik yang beretika..."
                                value={commentInputs[post.id] || ''}
                                onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleAddComment(post.id);
                                }}
                                className="w-full bg-white border border-slate-200 text-xs sm:text-sm pl-3.5 pr-10 py-2 rounded-xl focus:outline-none focus:border-[#C2410C]"
                              />
                              <button
                                onClick={() => handleAddComment(post.id)}
                                disabled={!commentInputs[post.id]?.trim()}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#C2410C] disabled:text-slate-300 p-1"
                              >
                                <Send className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            )}

            {/* TAB: BERITA & RILIS RESMI */}
            {activeTab === 'berita' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Berita, Siaran Pers, & Catatan Riset
                    </h3>
                    <p className="text-xs text-slate-500">
                      Rilis berkala resmi yang diterbitkan oleh dewan kuratorial lembaga
                    </p>
                  </div>
                  <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-semibold border border-slate-200">
                    {community.newsList?.length || 0} Terbitan
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {(community.newsList || []).map((news: CommunityNews) => (
                    <article key={news.id} className="bg-white rounded-2xl shadow-xs border border-slate-200/90 overflow-hidden hover:border-slate-300 transition-all flex flex-col sm:flex-row">
                      <div className="sm:w-56 h-48 sm:h-auto bg-slate-100 shrink-0 overflow-hidden">
                        <img src={news.image} alt={news.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-[#C2410C] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              {news.category}
                            </span>
                            <span className="text-xs text-slate-400">• {news.date}</span>
                            <span className="text-xs text-slate-400">• {news.readTime}</span>
                          </div>
                          <h4 className="text-base font-bold text-slate-900 leading-snug hover:text-[#C2410C] cursor-pointer transition-colors">
                            {news.title}
                          </h4>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {news.excerpt}
                          </p>
                        </div>
                        <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-4">
                          <span className="text-xs font-semibold text-slate-500">
                            Penerbit: Redaksi Lembaga
                          </span>
                          <button 
                            onClick={() => showToast('Membuka rilis berita lengkap...')}
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#C2410C] hover:underline"
                          >
                            <span>Baca Selengkapnya</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: ACARA & PAGELARAN */}
            {activeTab === 'acara' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Kalender Acara, Workshop, & Pertunjukan
                    </h3>
                    <p className="text-xs text-slate-500">
                      Pendaftaran resmi bergaransi tiket QR Code yang dapat diverifikasi di lokasi
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {(community.eventsList || []).map((evt: CommunityEvent) => (
                    <div key={evt.id} className="bg-white rounded-2xl shadow-xs border border-slate-200/90 overflow-hidden flex flex-col sm:flex-row hover:border-[#C2410C]/50 transition-all">
                      <div className="sm:w-56 h-48 sm:h-auto bg-slate-100 shrink-0 relative overflow-hidden">
                        <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                        <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full text-white backdrop-blur-md ${
                          evt.type === 'offline' ? 'bg-emerald-600/90' : 'bg-blue-600/90'
                        }`}>
                          {evt.type === 'offline' ? 'Luring (Di Lokasi)' : 'Daring (Online)'}
                        </span>
                      </div>
                      
                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#C2410C] flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {evt.date} • {evt.time}
                            </span>
                            <span className="text-xs font-extrabold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                              {evt.price === 0 ? 'Gratis' : `Rp ${evt.price.toLocaleString()}`}
                            </span>
                          </div>

                          <h4 className="text-base font-bold text-slate-900">
                            {evt.title}
                          </h4>

                          <p className="text-xs text-slate-600 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{evt.location}</span>
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-3">
                          <div className="text-xs text-slate-500">
                            Tersedia: <strong className="text-slate-800">{evt.registered} / {evt.quota} kursi</strong>
                          </div>
                          <button
                            onClick={() => {
                              showToast(`Tiket ${evt.title} berhasil diamankan! E-Tiket dikirim ke akun Anda.`);
                            }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                          >
                            <Ticket className="w-3.5 h-3.5" />
                            <span>Pesan Tiket</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: GALANG DANA & RESTORASI */}
            {activeTab === 'donasi' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Penggalangan Dana & Restorasi Budaya
                    </h3>
                    <p className="text-xs text-slate-500">
                      Penyaluran terverifikasi dengan Laporan Pertanggungjawaban (LPJ) transparan
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  {(community.donationsList || []).map((don: CommunityDonation) => {
                    const percent = Math.min(100, Math.round((don.collectedAmount / don.targetAmount) * 100));
                    return (
                      <div key={don.id} className="bg-white rounded-2xl shadow-xs border border-slate-200/90 overflow-hidden p-5 flex flex-col md:flex-row gap-5">
                        <div className="md:w-60 h-44 md:h-auto bg-slate-100 rounded-xl overflow-hidden shrink-0">
                          <img src={don.image} alt={don.title} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            {don.isUrgent && (
                              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full inline-block mb-2">
                                ⚡ Program Mendesak
                              </span>
                            )}
                            <h4 className="text-base font-bold text-slate-900 leading-snug">
                              {don.title}
                            </h4>
                            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                              {don.description}
                            </p>
                          </div>

                          {/* Progress Bar */}
                          <div className="space-y-2 pt-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-500">Terkumpul: <strong className="text-slate-900">Rp {don.collectedAmount.toLocaleString()}</strong></span>
                              <span className="font-bold text-[#C2410C]">{percent}%</span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-[#C2410C] rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-slate-400">
                              <span>Target: Rp {don.targetAmount.toLocaleString()}</span>
                              <span>{don.donorsCount} donatur • {don.daysLeft} hari lagi</span>
                            </div>
                          </div>

                          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                            <button 
                              onClick={() => showToast('Membuka rincian LPJ & dokumentasi belanja...')}
                              className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline"
                            >
                              Lihat Laporan Transparansi
                            </button>
                            <button
                              onClick={() => {
                                showToast(`Terima kasih! Donasi sebesar Rp 50.000 untuk "${don.title}" berhasil disalurkan.`);
                              }}
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                            >
                              <HandHeart className="w-3.5 h-3.5" />
                              <span>Berdonasi Sekarang</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: TENTANG & LEGALITAS */}
            {activeTab === 'tentang' && (
              <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-6 space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-[#C2410C]" />
                    <span>Profil Resmi Lembaga</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-3 whitespace-pre-line">
                    {community.about || community.description}
                  </p>
                </div>

                {/* Legalitas & Badan Hukum Card */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    <span>Akreditasi & Keputusan Hukum Resmi</span>
                  </div>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p>• <strong>Bentuk Entitas:</strong> {community.institutionType || 'Yayasan Kebudayaan Terdaftar'}</p>
                    <p>• <strong>Nomor SK Legalitas:</strong> {community.skLegalitas || 'AHU-0014292.AH.01.04'}</p>
                    <p>• <strong>Sekretariat:</strong> {community.addressDetail || `${community.city}, ${community.province}`}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Kategori</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{community.category}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Wilayah Pokok</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{community.province}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Tahun Pendirian</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{community.foundedYear || '2019'}</span>
                  </div>
                </div>

                {community.rules && (
                  <div className="pt-2">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-amber-600" />
                      <span>Pakta Integritas & Pedoman Operasional Lembaga</span>
                    </h4>
                    <ul className="space-y-2.5">
                      {community.rules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/60 leading-relaxed">
                          <span className="font-bold text-[#C2410C] shrink-0">{idx + 1}.</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* TAB: DEWAN PENGURUS */}
            {activeTab === 'pengurus' && (
              <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-6 space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">
                    Dewan Kuratorial & Pengurus Lembaga
                  </h3>
                  <p className="text-xs text-slate-500">
                    Penanggung jawab operasional kebudayaan, kurasi riset, dan pengelolaan dana program
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(community.staffList || [
                    { name: 'Dewi Sekar Pembayun', role: 'Ketua Dewan Pengurus', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
                    { name: 'Raden Bagus Wicaksono', role: 'Kepala Riset & Kuratorial', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
                    { name: 'Siti Nurhaliza M.', role: 'Koordinator Acara & Edukasi', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' }
                  ]).map((staff, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center gap-3.5">
                      <img src={staff.avatar} alt={staff.name} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">{staff.name}</h4>
                        <p className="text-xs text-[#C2410C] font-semibold">{staff.role}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">Pengurus Terverifikasi</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column / Quick Sidebar Info (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Quick Summary Card */}
            <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2.5">
                Identitas Resmi Instansi
              </h3>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <Landmark className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Status Lembaga</span>
                    <span className="text-[11px] text-slate-500">{community.institutionType || 'Lembaga Kebudayaan'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Alamat Sekretariat</span>
                    <span className="text-[11px] text-slate-500 leading-relaxed">
                      {community.addressDetail || `${community.city}, ${community.province}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Indeks Dampak Budaya</span>
                    <span className="text-[11px] text-slate-500">{community.rating} / 5.0 (Akreditasi A)</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <Link
                  to="/kelola-komunitas"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all"
                >
                  <Landmark className="w-3.5 h-3.5" />
                  <span>Dasbor Pengurus Lembaga</span>
                </Link>
              </div>
            </div>

            {/* Support / Quick Donation Box */}
            <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-200/80 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                <HandHeart className="w-4 h-4 text-[#C2410C]" />
                <span>Dana Lestari Kebudayaan</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dukungan Anda disalurkan langsung untuk perawatan artefak, lokakarya gratis anak sanggar, dan restorasi cagar tradisi.
              </p>
              <button
                onClick={() => setActiveTab('donasi')}
                className="w-full py-2 bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold rounded-xl transition-all"
              >
                Pilih Program Donasi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}