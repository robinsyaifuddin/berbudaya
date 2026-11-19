import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import {
  MapPin, Calendar, Link as LinkIcon, Mail, Briefcase,
  Image as ImageIcon, FileText, Heart, MessageCircle,
  UserPlus, Send, ArrowLeft, Check, Share2, ShieldCheck, ChevronRight,
  Globe, User, GraduationCap, MoreHorizontal, Bookmark
} from 'lucide-react';
import TopNavbar from '@/react-app/components/TopNavbar';
import VerifiedBadge from '@/react-app/components/VerifiedBadge';
import { usersDatabase, UserProfileData } from '@/react-app/data/usersDatabase';

export default function UserProfile() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');
  const [isConnected, setIsConnected] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (userId) {
      const data = usersDatabase[userId];
      if (data) {
        setUserData(data);
      } else {
        // Fallback dummy jika ID arbitrary
        setUserData({
          id: userId,
          name: `Penggiat Budaya #${userId}`,
          username: `@user_${userId}`,
          avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop`,
          cover: `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop`,
          headline: 'Pecinta & Pelestari Seni Budaya Nusantara',
          category: 'Kesenian Tradisi',
          profession: 'Pelestari Warisan Budaya',
          bio: 'Aktif berkontribusi dalam pemajuan kebudayaan daerah, festival seni, dan jejaring komunitas nusantara.',
          location: 'Indonesia',
          joinedDate: 'Bergabung 2024',
          verified: false,
          followers: 120,
          following: 85,
          posts: 12,
          culturalFocus: ['Seni Tari', 'Musik Etnik', 'Kriya Nusantara'],
          achievements: [
            {
              title: 'Partisipan Festival Budaya Nusantara',
              organization: 'Komunitas Seni Tradisi',
              year: '2024'
            }
          ],
          experience: [
            {
              role: 'Anggota Aktif',
              organization: 'Jejaring Budaya Nusantara',
              period: '2023 - Sekarang',
              description: 'Terlibat aktif dalam berbagai pementasan dan diskusi pelestarian nilai tradisi.'
            }
          ],
          posts_list: [
            {
              id: 991,
              title: 'Semangat Menjaga Warisan Leluhur',
              content: 'Setiap gerakan dan simfoni memiliki makna mendalam yang memperkaya identitas bangsa.',
              image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
              likes: 45,
              comments: 7,
              timestamp: 'Kemarin'
            }
          ]
        });
      }
    }
  }, [userId]);

  const handleCopyProfile = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-slate-50">
        <TopNavbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center p-8 bg-white border border-slate-200 rounded-2xl max-w-sm mx-auto shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Profil Tidak Ditemukan</h2>
            <p className="text-xs text-slate-500 mb-5">Pengguna yang Anda cari mungkin telah dinonaktifkan atau tautan salah.</p>
            <Link
              to="/jaringan"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Jaringan
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100/70 text-neutral-900 pb-16">
      <TopNavbar />

      <main className="pt-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Back Navigation Bar */}
        <div className="py-2.5 mb-2 flex items-center justify-between text-neutral-500">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-base font-medium text-blue-700 hover:text-blue-800 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Kembali</span>
          </button>
        </div>

        {/* 2-Column Grid matching Profil.tsx */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Main Column (8 Cols in Desktop) */}
          <div className="lg:col-span-8 space-y-5">
            {/* Profile Card Container */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden">
              {/* Cover Header */}
              <div className="relative h-36 sm:h-52 bg-slate-800 overflow-hidden">
                <img
                  src={userData.cover}
                  alt="Sampul Profil"
                  className="w-full h-full object-cover"
                />
                {/* Tombol Bagikan Icon Only di Pojok Kanan Atas Banner */}
                <button
                  onClick={handleCopyProfile}
                  title="Bagikan Profil"
                  className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-neutral-700 rounded-full shadow-sm backdrop-blur transition active:scale-95 flex items-center justify-center"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-neutral-700" />}
                </button>
              </div>

              {/* Profile Intro & Avatar */}
              <div className="px-5 sm:px-7 pb-6 relative">
                {/* Avatar & Action button row */}
                <div className="flex justify-between items-end -mt-16 sm:-mt-20 mb-3 sm:mb-4">
                  <div className="relative group">
                    <img
                      src={userData.avatar}
                      alt={userData.name}
                      className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-md object-cover bg-neutral-100"
                    />
                  </div>

                  {/* Primary Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsConnected(!isConnected)}
                      className="p-2 sm:px-3.5 sm:py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 active:scale-95 shadow-sm"
                    >
                      {isConnected ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Terhubung</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 text-white" />
                          <span>Hubungkan</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        window.dispatchEvent(
                          new CustomEvent('open-user-chat', {
                            detail: {
                              id: Number(userData.id) || Date.now(),
                              userId: String(userData.id),
                              name: userData.name,
                              avatar: userData.avatar,
                              role: userData.profession || 'Penggiat Budaya'
                            }
                          })
                        );
                      }}
                      className="p-2 sm:px-3.5 sm:py-1.5 border border-neutral-300 hover:bg-neutral-50 rounded-full text-neutral-700 text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 active:scale-95"
                    >
                      <Send className="w-4 h-4 text-neutral-600" />
                      <span className="hidden sm:inline">Kirim Pesan</span>
                    </button>
                  </div>
                </div>

                {/* Bio & Details */}
                <div className="space-y-1 sm:space-y-1.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                      {userData.name}
                    </h1>
                    {userData.verified && (
                      <VerifiedBadge className="w-5 h-5 text-[#1D9BF0] shrink-0" />
                    )}
                  </div>

                  <p className="text-xs text-neutral-500 font-medium">
                    {userData.username} • {userData.profession} • <span className="text-neutral-700 font-semibold">{userData.category}</span>
                  </p>

                  <p className="text-sm sm:text-base text-neutral-700 font-normal leading-snug max-w-2xl pt-1">
                    {userData.bio}
                  </p>

                  {/* Metas: Lokasi, Tanggal, Pengikut, Koneksi */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-neutral-500 pt-1.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      {userData.location}
                    </span>
                    <span>•</span>
                    <span className="text-neutral-500">
                      <strong className="text-neutral-800 font-semibold">{userData.followers.toLocaleString('id-ID')}</strong> pengikut
                    </span>
                    <span>•</span>
                    <span className="text-neutral-500">
                      <strong className="text-neutral-800 font-semibold">{userData.following.toLocaleString('id-ID')}</strong> koneksi
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="border-t border-slate-100 px-5 sm:px-8 bg-slate-50/50">
                <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                  <button
                    onClick={() => setActiveTab('posts')}
                    className={`tab-item py-3.5 text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                      activeTab === 'posts' ? 'active font-bold' : ''
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    Postingan ({userData.posts_list.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`tab-item py-3.5 text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                      activeTab === 'about' ? 'active font-bold' : ''
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Tentang
                  </button>
                </div>
              </div>
            </div>

            {/* Tab Content Display */}
            {activeTab === 'posts' && (
              <div className="space-y-4">
                {userData.posts_list.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden transition-all duration-300"
                  >
                    {/* Header Post ala Facebook / LinkedIn */}
                    <div className="p-4 sm:p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={userData.avatar}
                            alt={userData.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200/80 flex-shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-semibold text-slate-900 text-sm leading-tight hover:text-blue-600 transition-colors">
                                {userData.name}
                              </h3>
                              {userData.verified && (
                                <VerifiedBadge className="w-4 h-4 text-[#1D9BF0] shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{userData.headline}</p>
                            <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <span>{post.timestamp}</span>
                              <span>•</span>
                              <Globe className="w-3 h-3 text-slate-400" />
                            </p>
                          </div>
                        </div>

                        <button 
                          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                          aria-label="Opsi postingan"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Judul & Narasi Postingan Full */}
                      <div className="space-y-2">
                        {post.title && (
                          <h4 className="font-bold text-slate-900 text-base leading-snug">
                            {post.title}
                          </h4>
                        )}
                        <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                          {post.content}
                        </p>
                      </div>
                    </div>

                    {/* Gambar Postingan Full Lebar */}
                    {post.image && (
                      <div className="bg-slate-100 overflow-hidden border-y border-slate-100">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-auto max-h-[520px] object-cover hover:scale-[1.01] transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Post Stats & Reactions Counter */}
                    <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center">
                          <Heart className="w-2.5 h-2.5 fill-white text-white" />
                        </div>
                        <span className="text-[11px] text-slate-600 font-medium">
                          {post.likes} apresiasi
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400">
                        <span>{post.comments} tanggapan</span>
                        <span>•</span>
                        <span>Warisan Budaya</span>
                      </div>
                    </div>

                    {/* Action Bar (Suka, Tanggapi, Bagikan, Simpan) */}
                    <div className="px-2 py-1.5 bg-slate-50/40">
                      <div className="flex items-center gap-1">
                        <button className="flex items-center gap-1.5 py-2 hover:bg-white rounded-xl transition-all flex-1 justify-center whitespace-nowrap group text-slate-600 hover:text-rose-600">
                          <Heart className="w-4 h-4 transition-transform group-hover:scale-110 group-hover:text-rose-600" />
                          <span className="text-xs font-medium">Suka</span>
                        </button>
                        <button className="flex items-center gap-1.5 py-2 hover:bg-white rounded-xl transition-all flex-1 justify-center whitespace-nowrap group text-slate-600 hover:text-blue-600">
                          <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-medium">Tanggapi</span>
                        </button>
                        <button className="flex items-center gap-1.5 py-2 hover:bg-white rounded-xl transition-all flex-1 justify-center whitespace-nowrap group text-slate-600 hover:text-emerald-600">
                          <Send className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-medium">Bagikan</span>
                        </button>
                        <button className="flex items-center gap-1.5 py-2 hover:bg-white rounded-xl transition-all flex-1 justify-center whitespace-nowrap group text-slate-600 hover:text-amber-600">
                          <Bookmark className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-medium">Simpan</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* TAB 2: ABOUT */}
            {activeTab === 'about' && (
              <div className="space-y-5">
                {/* About / Summary Section */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-5 sm:p-6">
                  <div className="mb-3">
                    <h2 className="text-base sm:text-lg font-bold text-neutral-900">Tentang Saya</h2>
                  </div>
                  <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                    {userData.bio}
                  </p>
                </div>

                {/* Skills Section */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-5 sm:p-6">
                  <div className="mb-4">
                    <h2 className="text-base sm:text-lg font-bold text-neutral-900">Keahlian & Keilmuan Budaya</h2>
                    <p className="text-xs text-neutral-500">Spesialisasi kesenian yang dikuasai</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {userData.culturalFocus.map((focus, idx) => (
                      <span 
                        key={idx}
                        className="inline-flex items-center px-3 py-1.5 bg-neutral-100/80 text-neutral-800 rounded-lg text-xs sm:text-sm font-medium border border-neutral-200/60"
                      >
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Minat / Penghargaan Section inside About */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-5 sm:p-6">
                  <div className="mb-4">
                    <h2 className="text-base sm:text-lg font-bold text-neutral-900">Penghargaan & Pengakuan Adat</h2>
                    <p className="text-xs text-neutral-500">Apresiasi dedikasi pelestarian tradisi</p>
                  </div>

                  <div className="divide-y divide-neutral-100">
                    {userData.achievements.map((item, idx) => (
                      <div key={idx} className="py-3.5 first:pt-0 last:pb-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">{item.title}</h3>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-1">
                          <MapPin className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
                          <span>{item.organization} · {item.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experiences (Dedikasi) */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-5 sm:p-6">
                  <div className="mb-6">
                    <h2 className="text-base sm:text-lg font-bold text-neutral-900">Pengalaman Profesional & Komunitas</h2>
                    <p className="text-xs text-neutral-500 mt-0.5">Peran dalam pelestarian dan industri seni kebudayaan</p>
                  </div>

                  <div className="relative">
                    {userData.experience.map((exp, idx) => {
                      const isLast = idx === userData.experience.length - 1;
                      return (
                        <div key={idx} className="relative flex gap-4 pb-7 last:pb-1">
                          {/* Vertical Connector Line */}
                          {!isLast && (
                            <div className="absolute left-[17px] top-[34px] bottom-0 w-[1.5px] bg-neutral-200" />
                          )}

                          {/* Round Dark Icon */}
                          <div className="relative z-10 w-[34px] h-[34px] rounded-full bg-neutral-900 flex items-center justify-center shrink-0 shadow-sm ring-4 ring-white">
                            <Briefcase className="w-4 h-4 text-white" />
                          </div>

                          <div className="flex-1 min-w-0 pt-0.5">
                            <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">{exp.role}</h3>
                            <p className="text-xs sm:text-sm font-medium text-neutral-700 mt-0.5">{exp.organization}</p>
                            <p className="text-xs text-neutral-400 font-medium mt-0.5 mb-2">{exp.period}</p>
                            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{exp.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Educations (Riwayat Pendidikan) */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-5 sm:p-6">
                  <div className="mb-6">
                    <h2 className="text-base sm:text-lg font-bold text-neutral-900">Pendidikan</h2>
                    <p className="text-xs text-neutral-500 mt-0.5">Latar belakang pendidikan akademis</p>
                  </div>

                  <div className="relative">
                    <div className="relative flex gap-4 pb-1">
                      <div className="relative z-10 w-[34px] h-[34px] rounded-full bg-neutral-900 flex items-center justify-center shrink-0 shadow-sm ring-4 ring-white">
                        <GraduationCap className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">Institut Seni Indonesia (ISI) Surakarta</h3>
                        <p className="text-xs sm:text-sm text-neutral-700 mt-0.5">Sarjana Seni (S.Sn) · Seni Pedalangan & Pedalangan Klasik</p>
                        <p className="text-xs text-neutral-400 font-medium mt-0.5">2012 - 2016</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column / Sidebar (4 Cols in Desktop) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Informasi Kontak & Pribadi */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-5">
              <h2 className="text-sm sm:text-base font-bold text-neutral-900 mb-3.5">Informasi Pribadi</h2>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Email</p>
                    <a
                      href={`mailto:${userData.email || 'kontak@kreator.id'}`}
                      className="text-neutral-800 hover:text-blue-600 truncate block font-medium"
                    >
                      {userData.email || `${userData.username.replace('@', '')}@gmail.com`}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Globe className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Bahasa</p>
                    <p className="text-neutral-800 font-medium">Indonesia, Daerah</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <User className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Nama Panggilan & Pronouns</p>
                    <p className="text-neutral-800 font-medium">{userData.name.split(' ')[0]} (Dia / Beliau)</p>
                  </div>
                </div>

                {userData.website && (
                  <div className="flex items-start gap-2.5">
                    <LinkIcon className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Tautan Web</p>
                      <a
                        href={userData.website.startsWith('http') ? userData.website : `https://${userData.website}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline truncate block font-medium"
                      >
                        {userData.website}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Bergabung</p>
                    <p className="text-neutral-600">{userData.joinedDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kreator Budaya Serupa */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-5">
              <h2 className="text-sm sm:text-base font-bold text-neutral-900 mb-3">Kreator Budaya Serupa</h2>
              <div className="space-y-3">
                {[
                  { name: 'Ki Anom Suroto', role: 'Dalang & Budayawan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
                  { name: 'Dewi Sekar', role: 'Koreografer Tari Tradisi', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
                  { name: 'Bambang Sukses', role: 'Pengrajin Gamelan Perunggu', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img src={item.avatar} alt={item.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-neutral-900 truncate">{item.name}</p>
                        <p className="text-[11px] text-neutral-500 truncate">{item.role}</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full text-xs font-semibold shrink-0 transition">
                      Ikuti
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
