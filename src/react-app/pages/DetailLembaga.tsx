import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { 
  Users, MapPin, Check, Share2, Award, Calendar, 
  MessageSquare, ThumbsUp, ShieldCheck, Info,
  ArrowLeft, Search, Image as ImageIcon, Send,
  Globe, CheckCircle2, MoreHorizontal,
  Bookmark, UserPlus, ShieldAlert, Heart,
  Newspaper, Landmark, Ticket, HandHeart, Clock,
  ExternalLink, ChevronRight, FileText, CheckCircle, X
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

export default function DetailLembagaPage() {
  const { id } = useParams<{ id: string }>();
  const lembagaId = Number(id);
  
  // Find lembaga from communitiesData or from registered institutions in localStorage
  const [lembaga] = useState<Community>(() => {
    const found = communitiesData.find((c) => c.id === lembagaId);
    if (found) return found;

    try {
      const stored = localStorage.getItem('user_registered_institutions');
      if (stored) {
        const parsed: any[] = JSON.parse(stored);
        const match = parsed.find((item) => item.id === lembagaId);
        if (match) {
          return {
            id: match.id,
            name: match.name,
            slug: match.slug,
            tagline: match.tagline,
            description: match.description,
            about: match.description,
            institutionType: match.institutionType,
            category: match.category,
            province: match.province || 'Jawa Tengah',
            city: match.city || 'Surakarta',
            location: `${match.city || 'Surakarta'}, ${match.province || 'Jawa Tengah'}`,
            members: match.members || 1,
            image: match.image || 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop&q=80',
            coverImage: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=1600&auto=format&fit=crop&q=80',
            avatarImage: match.image || 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop&q=80',
            verified: match.verified ?? true,
            skLegalitas: match.skLegalitas || 'AHU Terdaftar',
            rating: 5.0,
            newsList: [],
            eventsList: [],
            donationsList: [],
            rules: [
              'Berkomitmen menjaga kelestarian warisan budaya nusantara.',
              'Menjunjung tinggi transparansi kegiatan, publikasi, dan galang donasi budaya.'
            ],
            foundedYear: match.foundedYear || '2024'
          };
        }
      }
    } catch {
      // ignore
    }

    return communitiesData[0];
  });

  const [activeTab, setActiveTab] = useState<'rilis' | 'agenda' | 'donasi' | 'tentang'>('rilis');
  const [selectedRilis, setSelectedRilis] = useState<CommunityNews | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newPostText, setNewPostText] = useState('');
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [openCommentPostIds, setOpenCommentPostIds] = useState<number[]>([]);
  const [commentInputs, setCommentInputs] = useState<{ [postId: number]: string }>({});

  // Initial posts with seeded realistic comments
  const [posts, setPosts] = useState<PostItem[]>(() => {
    if (lembaga.recentPosts && lembaga.recentPosts.length > 0) {
      return lembaga.recentPosts.map((p) => ({
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
            text: 'Izin bertanya min, untuk workshop canting tembaga apakah pendaftaran sudah bisa via laman profil ini?',
            time: '45 menit lalu',
            likes: 2
          }
        ]
      }));
    }
    return [
      {
        id: 991,
        author: lembaga.name,
        authorRole: 'Lembaga Resmi',
        authorAvatar: lembaga.avatarImage || lembaga.image,
        time: '1 hari yang lalu',
        content: `Selamat datang di Halaman Profil Resmi Lembaga ${lembaga.name}. Kami hadir menyelenggarakan pembinaan kebudayaan, kuratorial karya, pementasan berkala, dan penyaluran dana restorasi cagar warisan nusantara.`,
        likes: 48,
        comments: 3,
        commentsList: [
          {
            id: 11,
            author: 'Kurniawan',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
            text: 'Salam takzim dan sukses selalu untuk seluruh jajaran dewan pengurus lembaga!',
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
    showToast(!isFollowing ? `Anda resmi mengikuti profil resmi ${lembaga.name}` : `Anda berhenti mengikuti lembaga ini`);
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
      authorRole: 'Sahabat Lembaga',
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
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-24">
      <TopNavbar />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-fade-in">
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
            <span className="font-semibold text-slate-700">#{lembaga.slug || `LB-${lembaga.id}`}</span>
          </div>
        </div>
      </div>

      {/* Hero / Cover Photo Banner (Professional Institution Profile Style) */}
      <div className="bg-white border-b border-slate-200/80 shadow-xs">
        <div className="max-w-6xl mx-auto">
          {/* Cover Container */}
          <div className="relative h-44 sm:h-56 md:h-64 lg:h-72 w-full bg-slate-900 overflow-hidden md:rounded-b-2xl">
            <img
              src={lembaga.coverImage || lembaga.image}
              alt={lembaga.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1600&auto=format&fit=crop&q=80';
              }}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />
            
            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md border border-white/20 flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-blue-400" />
                {lembaga.institutionType || 'Lembaga Kebudayaan'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600/90 text-white backdrop-blur-md">
                {lembaga.category}
              </span>
            </div>
          </div>

          {/* Institution Header Details */}
          <div className="px-4 sm:px-6 pt-5 pb-4">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
              {/* Avatar + Title Group */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left relative z-10">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden p-1 bg-white shadow-md border border-slate-200 shrink-0">
                  <img
                    src={lembaga.avatarImage || lembaga.image}
                    alt={lembaga.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                    <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-snug">
                      {lembaga.name}
                    </h1>
                    {lembaga.verified && (
                      <VerifiedBadge className="w-5 h-5 text-[#1D9BF0] shrink-0" />
                    )}
                  </div>
                  
                  <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl leading-relaxed">
                    {lembaga.tagline || lembaga.description}
                  </p>

                  <div className="text-xs text-slate-500 flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                    <span className="inline-flex items-center gap-1 text-slate-700 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      {lembaga.city ? `${lembaga.city}, ` : ''}{lembaga.province}
                    </span>
                    <span>•</span>
                    <span>
                      <strong className="text-slate-900">{lembaga.members.toLocaleString()}</strong> Pengikut
                    </span>
                    <span>•</span>
                    <span>
                      Didirikan <strong className="text-slate-900">{lembaga.foundedYear || '2019'}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center sm:justify-start md:justify-end gap-2.5 flex-wrap pt-2 md:pt-1">
                <button
                  onClick={handleToggleFollow}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs active:scale-[0.98] ${
                    isFollowing
                      ? 'bg-blue-50 text-blue-700 border border-blue-300 hover:bg-blue-100'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
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
                      <span>+ Ikuti Lembaga</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('donasi')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-blue-800 text-xs sm:text-sm font-bold transition-all"
                >
                  <HandHeart className="w-4 h-4 text-blue-600" />
                  <span>Dukung Lembaga</span>
                </button>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 p-2.5 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold transition-all"
                  title="Bagikan Profil Lembaga"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs (Rilis, Agenda, Donasi, Tentang) */}
            <div className="flex items-center gap-6 sm:gap-8 mt-6 overflow-x-auto scrollbar-none border-b border-slate-200">
              {[
                { key: 'rilis', label: `Rilis (${lembaga.newsList?.length || 0})`, icon: Newspaper },
                { key: 'agenda', label: `Agenda (${lembaga.eventsList?.length || 0})`, icon: Calendar },
                { key: 'donasi', label: `Donasi (${lembaga.donationsList?.length || 0})`, icon: HandHeart },
                { key: 'tentang', label: 'Tentang', icon: Info },
              ].map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`inline-flex items-center gap-2 pb-3.5 pt-2 text-xs sm:text-sm font-bold whitespace-nowrap transition-colors relative ${
                      isActive
                        ? 'text-blue-600'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                    <span>{tab.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-blue-600 rounded-t-sm" />
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
            
            {/* TAB: RILIS (Berita & Catatan Lembaga) */}
            {activeTab === 'rilis' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Rilis, Siaran Pers, & Catatan Riset Lembaga
                    </h3>
                    <p className="text-xs text-slate-500">
                      Publikasi resmi berkala yang diterbitkan oleh dewan kuratorial lembaga
                    </p>
                  </div>
                  <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-semibold border border-slate-200">
                    {lembaga.newsList?.length || 0} Terbitan
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {(lembaga.newsList || []).map((news: CommunityNews) => (
                    <article key={news.id} className="bg-white rounded-2xl shadow-xs border border-slate-200/90 overflow-hidden hover:border-slate-300 transition-all flex flex-col sm:flex-row">
                      <Link to={`/berita/${news.id}`} className="sm:w-56 h-48 sm:h-auto bg-slate-100 shrink-0 overflow-hidden block">
                        <img src={news.image} alt={news.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      </Link>
                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400">{news.date}</span>
                            <span className="text-xs text-slate-400">• {news.readTime}</span>
                          </div>
                          <Link 
                            to={`/berita/${news.id}`}
                            className="block text-base font-bold text-slate-900 leading-snug hover:text-blue-600 transition-colors"
                          >
                            {news.title}
                          </Link>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {news.excerpt}
                          </p>
                        </div>
                        <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-4">
                          <span className="text-xs font-semibold text-slate-500">
                            Penerbit: Redaksi Lembaga
                          </span>
                          <Link 
                            to={`/berita/${news.id}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                          >
                            <span>Baca Selengkapnya</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: AGENDA (Acara & Pagelaran) */}
            {activeTab === 'agenda' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Agenda Acara, Workshop, & Pertunjukan Lembaga
                    </h3>
                    <p className="text-xs text-slate-500">
                      Pendaftaran resmi bergaransi tiket QR Code yang dapat diverifikasi di lokasi
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {(lembaga.eventsList || []).map((evt: CommunityEvent) => (
                    <div key={evt.id} className="bg-white rounded-2xl shadow-xs border border-slate-200/90 overflow-hidden flex flex-col sm:flex-row hover:border-blue-300 transition-all">
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
                            <span className="text-xs font-bold text-blue-600 flex items-center gap-1.5">
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
                              showToast(`Tiket ${evt.title} berhasil dipesan! E-Tiket dikirim ke akun Anda.`);
                            }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                          >
                            <Ticket className="w-3.5 h-3.5" />
                            <span>Pesan Tiket Lembaga</span>
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
                      Penyaluran resmi terverifikasi dengan Laporan Pertanggungjawaban (LPJ) berkala
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  {(lembaga.donationsList || []).map((don: CommunityDonation) => {
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
                                ⚡ Program Mendesak Lembaga
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
                              <span className="font-bold text-blue-600">{percent}%</span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
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
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                            >
                              <HandHeart className="w-3.5 h-3.5" />
                              <span>Salurkan Donasi</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: TENTANG & LEGALITAS (Termasuk Dewan Pengurus) */}
            {activeTab === 'tentang' && (
              <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-6 space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-blue-600" />
                    <span>Profil Resmi Lembaga</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-3 whitespace-pre-line">
                    {lembaga.about || lembaga.description}
                  </p>
                </div>

                {/* Dewan Pengurus Lembaga (Dipindah ke dalam Tentang) */}
                <div className="pt-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>Dewan Kuratorial & Pengurus Lembaga</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {(lembaga.staffList || [
                      { name: 'Dewi Sekar Pembayun', role: 'Ketua Dewan Pengurus', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
                      { name: 'Raden Bagus Wicaksono', role: 'Kepala Riset & Kuratorial', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
                      { name: 'Siti Nurhaliza M.', role: 'Koordinator Acara & Edukasi', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' }
                    ]).map((staff, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center gap-3">
                        <img src={staff.avatar} alt={staff.name} className="w-11 h-11 rounded-full object-cover border border-slate-200" />
                        <div>
                          <h5 className="text-xs sm:text-sm font-bold text-slate-900">{staff.name}</h5>
                          <p className="text-xs text-blue-600 font-semibold">{staff.role}</p>
                          <p className="text-[11px] text-slate-400">Pengurus Lembaga Terverifikasi</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legalitas & Badan Hukum Card */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>Akreditasi & Keputusan Hukum Lembaga</span>
                  </div>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p>• <strong>Bentuk Entitas:</strong> {lembaga.institutionType || 'Yayasan Kebudayaan Terdaftar'}</p>
                    <p>• <strong>Nomor SK Legalitas:</strong> {lembaga.skLegalitas || 'AHU-0014292.AH.01.04'}</p>
                    <p>• <strong>Sekretariat:</strong> {lembaga.addressDetail || `${lembaga.city}, ${lembaga.province}`}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Kategori</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{lembaga.category}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Wilayah Pokok</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{lembaga.province}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Tahun Pendirian</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{lembaga.foundedYear || '2019'}</span>
                  </div>
                </div>

                {lembaga.rules && (
                  <div className="pt-2">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-blue-600" />
                      <span>Pakta Integritas & Pedoman Operasional Lembaga</span>
                    </h4>
                    <ul className="space-y-2.5">
                      {lembaga.rules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/60 leading-relaxed">
                          <span className="font-bold text-blue-600 shrink-0">{idx + 1}.</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column / Quick Sidebar Info (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Quick Summary Card */}
            <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2.5">
                Identitas Resmi Lembaga
              </h3>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <Landmark className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Status Lembaga</span>
                    <span className="text-[11px] text-slate-500">{lembaga.institutionType || 'Lembaga Kebudayaan'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Alamat Sekretariat</span>
                    <span className="text-[11px] text-slate-500 leading-relaxed">
                      {lembaga.addressDetail || `${lembaga.city}, ${lembaga.province}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Indeks Dampak Budaya</span>
                    <span className="text-[11px] text-slate-500">{lembaga.rating} / 5.0 (Akreditasi A)</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <Link
                  to="/kelola-lembaga"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                >
                  <Landmark className="w-3.5 h-3.5" />
                  <span>Dasbor Pengurus Lembaga</span>
                </Link>
              </div>
            </div>

            {/* Support / Quick Donation Box */}
            <div className="bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent border border-blue-200/80 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-xs">
                <HandHeart className="w-4 h-4 text-blue-600" />
                <span>Dana Lestari Lembaga Budaya</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dukungan Anda disalurkan langsung untuk perawatan artefak, lokakarya gratis sanggar binaan, dan pelestarian cagar tradisi.
              </p>
              <button
                onClick={() => setActiveTab('donasi')}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all"
              >
                Pilih Program Donasi
              </button>
            </div>
          </div>
        </div>

        {/* Modal Detail Rilis Lembaga (Layout & Style Berita Saya) */}
        {selectedRilis && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            <div 
              className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden my-8 max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Arsip Rilis & Warta Lembaga
                  </span>
                </div>
                <button
                  onClick={() => setSelectedRilis(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="overflow-y-auto p-6 sm:p-9 space-y-6">
                {/* Info Asal Lembaga */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200/60 rounded-md text-[11px] font-bold uppercase tracking-wider">
                    {lembaga.name}
                  </span>
                </div>

                {/* Article Headline */}
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 leading-snug sm:leading-tight">
                  {selectedRilis.title}
                </h1>

                {/* Sub-headline / Excerpt */}
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal border-l-2 border-blue-600 pl-3.5 italic bg-slate-50/50 py-1.5 rounded-r-md">
                  {selectedRilis.excerpt}
                </p>

                {/* Author Byline & Timestamps */}
                <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-100">
                  <div className="flex items-center gap-3">
                    <img 
                      src={lembaga.staffList?.[0]?.avatar || lembaga.image} 
                      alt={selectedRilis.author || lembaga.name}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">
                        {selectedRilis.author || 'Redaksi Lembaga'}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {selectedRilis.authorRole || lembaga.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {selectedRilis.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {selectedRilis.readTime}
                    </span>
                  </div>
                </div>

                {/* Hero Banner Image */}
                <div className="rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80">
                  <img 
                    src={selectedRilis.image} 
                    alt={selectedRilis.title}
                    className="w-full h-[260px] sm:h-[380px] object-cover"
                  />
                  <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                    <span>Sumber / Dokumentasi Resmi: {lembaga.name}</span>
                    <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Terverifikasi Lembaga
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed tracking-normal font-normal">
                  {selectedRilis.content && selectedRilis.content.length > 0 ? (
                    selectedRilis.content.map((p, idx) => (
                      <p key={idx} className="text-justify sm:text-left">
                        {p}
                      </p>
                    ))
                  ) : (
                    <p className="text-justify sm:text-left">
                      {selectedRilis.excerpt}
                    </p>
                  )}
                </div>

                {/* Footer Modal Action */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        showToast('Tautan rilis berhasil disalin!');
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200/90 rounded-lg text-xs font-medium text-slate-700 hover:text-blue-600 shadow-2xs transition-all"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Bagikan</span>
                    </button>
                    <Link
                      to={`/berita/${selectedRilis.id}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-all"
                    >
                      <span>Buka di Halaman Berita</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <button
                    onClick={() => setSelectedRilis(null)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    Tutup Halaman
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}