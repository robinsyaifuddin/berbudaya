import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { 
  Users, MapPin, Check, Share2, Award, Calendar, 
  MessageSquare, ThumbsUp, ShieldCheck, Info,
  ArrowLeft, Search, Image as ImageIcon, Send,
  Globe, Sparkles, CheckCircle2, MoreHorizontal, Smile,
  Bookmark, UserPlus, ShieldAlert, Heart
} from 'lucide-react';
import TopNavbar from '@/react-app/components/TopNavbar';
import { communitiesData, Community } from '@/react-app/data/communitiesData';

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

  const [activeTab, setActiveTab] = useState<'diskusi' | 'tentang' | 'anggota' | 'agenda' | 'foto'>('diskusi');
  const [isJoined, setIsJoined] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newPostText, setNewPostText] = useState('');
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [openCommentPostIds, setOpenCommentPostIds] = useState<number[]>([]);
  const [commentInputs, setCommentInputs] = useState<{ [postId: number]: string }>({});
  const [memberSearchQuery, setMemberSearchQuery] = useState('');

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
            text: 'Luar biasa sekali! Salut atas dedikasi dan semangat pelestariannya.',
            time: '2 jam lalu',
            likes: 4
          },
          {
            id: 2,
            author: 'Siti Rahmawati',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
            text: 'Izin bertanya, apakah workshop berikutnya terbuka untuk pemula dari luar kota?',
            time: '45 menit lalu',
            likes: 2
          }
        ]
      }));
    }
    return [
      {
        id: 991,
        author: 'Pengurus Komunitas Budaya',
        authorRole: 'Admin Grup',
        authorAvatar: community.avatarImage || community.image,
        time: '1 hari yang lalu',
        content: `Selamat datang di Komunitas ${community.name}! Mari bersama-sama bertukar karya, memperluas wawasan kebudayaan, dan saling mendukung dalam setiap agenda seni daerah.`,
        likes: 24,
        comments: 2,
        commentsList: [
          {
            id: 11,
            author: 'Kurniawan',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
            text: 'Salam kenal semuanya dari pegiat seni daerah!',
            time: '12 jam lalu',
            likes: 3
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

  const handleToggleJoin = () => {
    setIsJoined(!isJoined);
    showToast(!isJoined ? `Selamat! Anda resmi bergabung dengan ${community.name}` : `Anda telah keluar dari grup`);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Tautan profil komunitas berhasil disalin!');
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: PostItem = {
      id: Date.now(),
      author: 'Anda (Pengguna BudayaGO)',
      authorRole: 'Anggota Aktif',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      time: 'Baru saja',
      content: newPostText,
      likes: 0,
      comments: 0,
      commentsList: []
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
    showToast('Kiriman Anda berhasil dipublikasikan!');
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
      author: 'Anda (Pengguna BudayaGO)',
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

  // Detailed realistic members list
  const membersList = [
    { id: 1, name: 'Dewi Sekar Pembayun', role: 'Pengurus Utama & Admin', province: community.province, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', joined: 'Bergabung Mei 2021', badge: 'Admin' },
    { id: 2, name: 'Raden Bagus Wicaksono', role: 'Moderator Komunitas', province: community.province, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', joined: 'Bergabung Nov 2021', badge: 'Moderator' },
    { id: 3, name: 'Ki Anom Danendra', role: 'Anggota Ahli Kesenian', province: community.province, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', joined: 'Bergabung Jan 2022', badge: 'Ahli Tradisi' },
    { id: 4, name: 'Ni Luh Ratnasari', role: 'Pegiat & Koreografer', province: 'Bali', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', joined: 'Bergabung Mar 2022', badge: 'Kontributor' },
    { id: 5, name: 'Bambang Pamungkas', role: 'Anggota Aktif', province: 'Jawa Timur', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80', joined: 'Bergabung Jun 2023', badge: 'Anggota' },
    { id: 6, name: 'Siti Aisyah', role: 'Anggota Aktif', province: 'DI Yogyakarta', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', joined: 'Bergabung Agu 2023', badge: 'Anggota' },
  ];

  const filteredMembers = membersList.filter((m) => 
    m.name.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
    m.role.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
    m.province.toLowerCase().includes(memberSearchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-800 pb-20">
      <TopNavbar />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 border border-slate-700 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Breadcrumb Navigation */}
      <div className="pt-20 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <Link
            to="/komunitas"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#133384] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Jelajah Komunitas</span>
          </Link>
          <div className="text-xs text-slate-400">
            ID Komunitas: #{community.id}
          </div>
        </div>
      </div>

      {/* Hero / Cover Photo Banner (Facebook Group Style) */}
      <div className="bg-white shadow-xs border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          {/* Cover Image Container */}
          <div className="relative h-60 sm:h-72 md:h-88 lg:h-96 w-full bg-slate-200 overflow-hidden md:rounded-b-2xl">
            <img
              src={community.coverImage || community.image}
              alt={community.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1600&auto=format&fit=crop&q=80';
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
            
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md border border-white/20">
                {community.category}
              </span>
            </div>
          </div>

          {/* Profile Header Block */}
          <div className="px-4 sm:px-6 pt-4 pb-2">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 -mt-14 sm:-mt-16 md:-mt-20 relative z-10">
              {/* Avatar + Title Group */}
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden p-1 bg-white shadow-lg border-2 border-white">
                  <img
                    src={community.avatarImage || community.image}
                    alt={community.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  {community.verified && (
                    <div className="absolute bottom-2.5 right-2.5 bg-blue-600 text-white p-1 rounded-full shadow-md" title="Komunitas Terverifikasi">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 mb-2">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                      {community.name}
                    </h1>
                    {community.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Terverifikasi
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium flex items-center justify-center sm:justify-start gap-2">
                    <Globe className="w-4 h-4 text-slate-400" />
                    <span>Grup Publik</span>
                    <span>•</span>
                    <strong className="text-slate-800">{community.members.toLocaleString()} anggota</strong>
                    <span>•</span>
                    <span>{community.province}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-2.5 flex-wrap">
                <button
                  onClick={handleToggleJoin}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-[0.98] ${
                    isJoined
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                      : 'bg-[#133384] hover:bg-[#1844A6] text-white'
                  }`}
                >
                  {isJoined ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Tergabung</span>
                    </>
                  ) : (
                    <>
                      <Users className="w-4 h-4" />
                      <span>+ Gabung Grup</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Bagikan</span>
                </button>
              </div>
            </div>

            {/* Navigation Tabs (Facebook Style with Clean Underline) */}
            <div className="flex items-center gap-6 sm:gap-8 mt-6 overflow-x-auto scrollbar-none border-b border-slate-200">
              {[
                { key: 'diskusi', label: 'Diskusi', icon: MessageSquare },
                { key: 'tentang', label: 'Tentang & Profil', icon: Info },
                { key: 'anggota', label: `Anggota (${community.members.toLocaleString()})`, icon: Users },
                { key: 'agenda', label: 'Agenda & Acara', icon: Calendar },
                { key: 'foto', label: 'Foto & Media', icon: ImageIcon },
              ].map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`inline-flex items-center gap-2 pb-3.5 pt-2 text-xs sm:text-sm font-bold whitespace-nowrap transition-colors relative ${
                      isActive
                        ? 'text-[#133384]'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#133384]' : 'text-slate-500'}`} />
                    <span>{tab.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#133384] rounded-t-sm" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content Area */}
      <div className="max-w-6xl mx-auto px-4 mt-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column / Feed (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {activeTab === 'diskusi' && (
              <>
                {/* Create Post Box (Facebook Style) */}
                <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <input
                      type="text"
                      placeholder={`Tulis sesuatu ke komunitas ${community.name}...`}
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCreatePost(e);
                      }}
                      className="flex-1 bg-slate-100 hover:bg-slate-200/80 focus:bg-white text-xs sm:text-sm px-4 py-2.5 rounded-full border border-transparent focus:border-slate-300 focus:outline-none transition-all"
                    />
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors">
                        <ImageIcon className="w-4 h-4 text-emerald-600" />
                        <span>Foto/Video</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>Aktivitas</span>
                      </button>
                    </div>
                    <button
                      onClick={handleCreatePost}
                      disabled={!newPostText.trim()}
                      className="inline-flex items-center gap-1.5 bg-[#133384] hover:bg-[#1844A6] disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kirim</span>
                    </button>
                  </div>
                </div>

                {/* Posts Feed */}
                {posts.map((post) => {
                  const isLiked = likedPosts.includes(post.id);
                  const isCommentOpen = openCommentPostIds.includes(post.id);
                  const commentCount = post.commentsList ? post.commentsList.length : post.comments;

                  return (
                    <div key={post.id} className="bg-white rounded-xl shadow-xs border border-slate-200/90 overflow-hidden">
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
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900 hover:underline cursor-pointer">
                                {post.author}
                              </h4>
                              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                                {post.authorRole}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400">{post.time} • 🌐 Grup Publik</p>
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
                            alt="Post attachment"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Post Reaction Stats */}
                      <div className="px-4 py-2 flex items-center justify-between text-xs text-slate-500 border-b border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px]">👍</span>
                          <span>{post.likes} menyukai</span>
                        </div>
                        <button 
                          onClick={() => toggleComments(post.id)}
                          className="hover:underline text-slate-500"
                        >
                          {commentCount} komentar
                        </button>
                      </div>

                      {/* Reaction Action Buttons */}
                      <div className="px-2 py-1 flex items-center justify-around text-xs font-semibold text-slate-600 border-b border-slate-100">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className={`flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-50 rounded-lg transition-colors ${
                            isLiked ? 'text-blue-600' : ''
                          }`}
                        >
                          <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-blue-600' : ''}`} />
                          <span>Suka</span>
                        </button>
                        <button 
                          onClick={() => toggleComments(post.id)}
                          className={`flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-50 rounded-lg transition-colors ${
                            isCommentOpen ? 'text-blue-600 bg-blue-50/50' : ''
                          }`}
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Komentari</span>
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

                      {/* Comment Section (Facebook Style Bubble) - Toggleable on click */}
                      {isCommentOpen && (
                        <div className="p-4 bg-slate-50/70 space-y-3 animate-fade-in border-t border-slate-100">
                          {/* Comments List */}
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
                                    <div className="bg-slate-200/70 rounded-2xl px-3.5 py-2 inline-block max-w-full">
                                      <h5 className="text-xs font-bold text-slate-900">{c.author}</h5>
                                      <p className="text-xs text-slate-700 leading-relaxed">{c.text}</p>
                                    </div>
                                    <div className="flex items-center gap-3 px-2 pt-1 text-[11px] text-slate-500 font-semibold">
                                      <button className="hover:underline">Suka</button>
                                      <button className="hover:underline">Balas</button>
                                      <span className="text-slate-400 font-normal">{c.time}</span>
                                      {c.likes > 0 && (
                                        <span className="flex items-center gap-0.5 text-blue-600">
                                          <ThumbsUp className="w-3 h-3 fill-blue-600" />
                                          <span>{c.likes}</span>
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-slate-400 text-center py-2">Belum ada komentar. Jadilah yang pertama berkomentar!</p>
                          )}

                          {/* Input Box for Comment */}
                          <div className="flex items-center gap-2.5 pt-1">
                            <img
                              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                              alt="Me"
                              className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                            />
                            <div className="flex-1 relative">
                              <input
                                type="text"
                                placeholder="Tulis komentar publik..."
                                value={commentInputs[post.id] || ''}
                                onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleAddComment(post.id);
                                }}
                                autoFocus
                                className="w-full bg-white border border-slate-200 text-xs sm:text-sm pl-3.5 pr-10 py-2 rounded-full focus:outline-none focus:border-blue-500"
                              />
                              <button
                                onClick={() => handleAddComment(post.id)}
                                disabled={!commentInputs[post.id]?.trim()}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-blue-600 disabled:text-slate-300 hover:text-blue-800 transition-colors p-1"
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

            {/* Tab: Tentang */}
            {activeTab === 'tentang' && (
              <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-5 space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                    Tentang Komunitas {community.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-3 whitespace-pre-line">
                    {community.about || community.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Kategori</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{community.category}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Wilayah Utama</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{community.province}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Tahun Berdiri</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{community.foundedYear || '2020'}</span>
                  </div>
                </div>

                {community.rules && (
                  <div className="pt-2">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-amber-600" />
                      <span>Aturan & Pedoman Grup Komunitas</span>
                    </h4>
                    <ul className="space-y-2.5">
                      {community.rules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/60 leading-relaxed">
                          <span className="font-bold text-[#133384] shrink-0">{idx + 1}.</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Anggota (Facebook Group Member Directory Style) */}
            {activeTab === 'anggota' && (
              <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-5 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Daftar Anggota Komunitas
                    </h3>
                    <p className="text-xs text-slate-500">
                      Total {community.members.toLocaleString()} anggota bergabung
                    </p>
                  </div>
                  {/* Member Search Bar */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari nama anggota..."
                      value={memberSearchQuery}
                      onChange={(e) => setMemberSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  {filteredMembers.map((m) => (
                    <div key={m.id} className="py-3.5 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">
                              {m.name}
                            </h4>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                              m.badge === 'Admin' ? 'bg-blue-100 text-blue-700' :
                              m.badge === 'Moderator' ? 'bg-purple-100 text-purple-700' :
                              'bg-slate-100 text-slate-600'
                            }`}>
                              {m.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">{m.role} • {m.province}</p>
                          <p className="text-[11px] text-slate-400">{m.joined}</p>
                        </div>
                      </div>

                      <button className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold inline-flex items-center gap-1.5 transition-all">
                        <UserPlus className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Hubungkan</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Agenda */}
            {activeTab === 'agenda' && (
              <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-5 space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Agenda & Acara Terdaftar
                </h3>
                {community.upcomingEvents && community.upcomingEvents.length > 0 ? (
                  <div className="space-y-3">
                    {community.upcomingEvents.map((evt) => (
                      <div key={evt.id} className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-slate-900">{evt.title}</h4>
                          <p className="text-xs text-blue-600 font-medium flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {evt.date}
                          </p>
                          <p className="text-xs text-slate-500 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            {evt.location}
                          </p>
                        </div>
                        <button className="px-4 py-2 bg-[#133384] text-white text-xs font-semibold rounded-lg hover:bg-[#1844A6] transition-all whitespace-nowrap self-start sm:self-center">
                          Tertarik
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 py-6 text-center">Belum ada agenda terdaftar saat ini.</p>
                )}
              </div>
            )}

            {/* Tab: Foto */}
            {activeTab === 'foto' && (
              <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-5 space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Galeri Foto Komunitas
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[community.coverImage, community.image, 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=80'].filter(Boolean).map((imgUrl, i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                      <img src={imgUrl!} alt="Galeri" className="w-full h-full object-cover hover:scale-105 transition-transform duration-200 cursor-pointer" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column / Sidebar Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* About Card */}
            <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-4 space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                Tentang Grup Ini
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {community.description}
              </p>

              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <span className="font-semibold block text-slate-800">Grup Publik</span>
                    <span className="text-[11px] text-slate-500">Siapa pun dapat melihat siapa anggota grup dan kiriman mereka.</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <span className="font-semibold block text-slate-800">Wilayah</span>
                    <span className="text-[11px] text-slate-500">{community.province} {community.city ? `(${community.city})` : ''}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <span className="font-semibold block text-slate-800">Rating Komunitas</span>
                    <span className="text-[11px] text-slate-500">{community.rating} / 5.0 dari ulasan anggota</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Agenda Widget */}
            {community.upcomingEvents && community.upcomingEvents.length > 0 && (
              <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    Agenda Terdekat
                  </h3>
                  <button onClick={() => setActiveTab('agenda')} className="text-xs text-[#133384] hover:underline font-semibold">
                    Lihat Semua
                  </button>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900">{community.upcomingEvents[0].title}</h4>
                  <p className="text-[11px] text-blue-600 font-medium">{community.upcomingEvents[0].date}</p>
                  <p className="text-[11px] text-slate-500">{community.upcomingEvents[0].location}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
