import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { 
  Users, MapPin, Check, Share2, Award, Calendar, 
  MessageSquare, ThumbsUp, ShieldCheck, Info,
  ArrowLeft, Bell, Search, Image as ImageIcon, Send,
  Globe, Sparkles, CheckCircle2
} from 'lucide-react';
import TopNavbar from '@/react-app/components/TopNavbar';
import { communitiesData, Community } from '@/react-app/data/communitiesData';

export default function DetailKomunitasPage() {
  const { id } = useParams<{ id: string }>();
  const communityId = Number(id);
  
  // Find community or fallback to first one
  const community: Community = communitiesData.find((c) => c.id === communityId) || communitiesData[0];

  const [activeTab, setActiveTab] = useState<'diskusi' | 'tentang' | 'anggota' | 'agenda' | 'foto'>('diskusi');
  const [isJoined, setIsJoined] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newPostText, setNewPostText] = useState('');
  const [posts, setPosts] = useState(community.recentPosts || []);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

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

    const newPost = {
      id: Date.now(),
      author: 'Anda (Pengguna BudayaGO)',
      authorRole: 'Anggota Aktif',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      time: 'Baru saja',
      content: newPostText,
      likes: 0,
      comments: 0
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
    showToast('Kiriman berhasil dipublikasikan ke grup!');
  };

  const toggleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((p) => p !== postId));
      setPosts(posts.map((p) => (p.id === postId ? { ...p, likes: p.likes - 1 } : p)));
    } else {
      setLikedPosts([...likedPosts, postId]);
      setPosts(posts.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p)));
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-800 pb-16">
      <TopNavbar />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 border border-slate-700 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header / Back Button bar */}
      <div className="pt-16 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/komunitas"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-[#133384] transition-colors"
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
      <div className="bg-white shadow-xs">
        <div className="max-w-6xl mx-auto">
          {/* Cover Image Container */}
          <div className="relative h-56 sm:h-72 md:h-84 lg:h-96 w-full bg-slate-200 overflow-hidden md:rounded-b-xl">
            <img
              src={community.coverImage || community.image}
              alt={community.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1600&auto=format&fit=crop&q=80';
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md border border-white/20">
                {community.category}
              </span>
            </div>
          </div>

          {/* Profile Header Block */}
          <div className="px-4 sm:px-6 pb-4 pt-4 border-b border-slate-200">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 -mt-12 sm:-mt-16 md:-mt-20 relative z-10">
              {/* Avatar + Title Group */}
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden p-1 bg-white shadow-md border-2 border-white">
                  <img
                    src={community.avatarImage || community.image}
                    alt={community.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  {community.verified && (
                    <div className="absolute bottom-2 right-2 bg-blue-600 text-white p-1 rounded-full shadow-md" title="Komunitas Terverifikasi">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                <div className="space-y-1 mb-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                      {community.name}
                    </h1>
                    {community.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Terverifikasi
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium flex items-center justify-center sm:justify-start gap-2">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Grup Publik</span>
                    <span>•</span>
                    <strong className="text-slate-700">{community.members.toLocaleString()} anggota</strong>
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
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-medium transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Bagikan</span>
                </button>
              </div>
            </div>

            {/* Navigation Tabs (Facebook Style) */}
            <div className="flex items-center gap-1 sm:gap-2 mt-6 overflow-x-auto scrollbar-none border-t border-slate-200 pt-1">
              {[
                { key: 'diskusi', label: 'Diskusi' },
                { key: 'tentang', label: 'Tentang' },
                { key: 'anggota', label: 'Anggota' },
                { key: 'agenda', label: 'Agenda & Acara' },
                { key: 'foto', label: 'Foto & Media' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-4 py-3 text-xs sm:text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                    activeTab === tab.key
                      ? 'border-[#133384] text-[#133384]'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-t-md'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content Area */}
      <div className="max-w-6xl mx-auto px-4 mt-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column / Feed (7 or 8 cols) */}
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
                      className="flex-1 bg-slate-100 hover:bg-slate-200/80 focus:bg-white text-xs sm:text-sm px-4 py-2.5 rounded-full border border-transparent focus:border-slate-300 focus:outline-none transition-all"
                    />
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1.5 text-xs text-slate-600 font-medium hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors">
                        <ImageIcon className="w-4 h-4 text-emerald-600" />
                        <span>Foto/Video</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-xs text-slate-600 font-medium hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>Aktivitas</span>
                      </button>
                    </div>
                    <button
                      onClick={handleCreatePost}
                      disabled={!newPostText.trim()}
                      className="inline-flex items-center gap-1.5 bg-[#133384] hover:bg-[#1844A6] disabled:opacity-50 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kirim</span>
                    </button>
                  </div>
                </div>

                {/* Posts Feed */}
                {posts.map((post) => {
                  const isLiked = likedPosts.includes(post.id);
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
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900 hover:underline cursor-pointer">
                                {post.author}
                              </h4>
                              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                                {post.authorRole}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400">{post.time}</p>
                          </div>
                        </div>
                      </div>

                      {/* Content Text */}
                      <div className="px-4 pb-3">
                        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                          {post.content}
                        </p>
                      </div>

                      {/* Media Image */}
                      {post.image && (
                        <div className="bg-slate-100 max-h-96 overflow-hidden">
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
                        <div>
                          <span>{post.comments} komentar</span>
                        </div>
                      </div>

                      {/* Reaction Buttons */}
                      <div className="px-2 py-1 flex items-center justify-around text-xs font-semibold text-slate-600">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className={`flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-50 rounded-lg transition-colors ${
                            isLiked ? 'text-blue-600' : ''
                          }`}
                        >
                          <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-blue-600' : ''}`} />
                          <span>Suka</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-50 rounded-lg transition-colors">
                          <MessageSquare className="w-4 h-4" />
                          <span>Komentari</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-50 rounded-lg transition-colors">
                          <Share2 className="w-4 h-4" />
                          <span>Bagikan</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {activeTab === 'tentang' && (
              <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-5 space-y-5">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Tentang Komunitas {community.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {community.about || community.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Kategori</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{community.category}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Lokasi Utama</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{community.province}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Tahun Berdiri</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{community.foundedYear || '2020'}</span>
                  </div>
                </div>

                {community.rules && (
                  <div className="pt-3">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-2.5">
                      Aturan Grup Komunitas
                    </h4>
                    <ul className="space-y-2">
                      {community.rules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                          <span className="font-bold text-[#133384]">{idx + 1}.</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'agenda' && (
              <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-5 space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Agenda Mendatang
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

            {activeTab === 'anggota' && (
              <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">
                    Anggota Grup ({community.members.toLocaleString()})
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { name: 'Dewi Sekar Pembayun', role: 'Pengurus Utama', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
                    { name: 'Raden Bagus Wicaksono', role: 'Moderator', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
                    { name: 'Ki Anom Danendra', role: 'Anggota Ahli', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
                    { name: 'Ni Luh Ratnasari', role: 'Anggota', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
                  ].map((m, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200/60">
                      <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h5 className="text-xs sm:text-sm font-bold text-slate-800">{m.name}</h5>
                        <p className="text-[11px] text-slate-500">{m.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                  <button onClick={() => setActiveTab('agenda')} className="text-xs text-[#133384] hover:underline font-medium">
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
