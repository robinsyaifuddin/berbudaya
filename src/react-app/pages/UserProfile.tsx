import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import {
  MapPin, Calendar, Link as LinkIcon, Mail, Phone, Briefcase,
  Award, Image as ImageIcon, FileText, Heart, MessageCircle,
  UserPlus, Send, ArrowLeft, Check, Sparkles, Share2, ShieldCheck, ChevronRight
} from 'lucide-react';
import TopNavbar from '@/react-app/components/TopNavbar';
import { usersDatabase, UserProfileData } from '@/react-app/data/usersDatabase';

export default function UserProfile() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const [activeTab, setActiveTab] = useState<'posts' | 'about' | 'experience'>('posts');
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
    <div className="min-h-screen bg-slate-50">
      <TopNavbar />

      <main className="pt-16 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Back Navigation Bar */}
          <div className="py-3 flex items-center justify-between text-xs text-slate-500">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 font-medium text-slate-700 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Kembali
            </button>
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <Link to="/jaringan" className="hover:text-slate-600">Jaringan</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-700 font-medium truncate max-w-[140px]">{userData.name}</span>
            </div>
          </div>

          {/* Profile Card Container */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden mb-6">
            {/* Cover Header */}
            <div className="relative h-44 sm:h-56 bg-slate-800 overflow-hidden">
              <img
                src={userData.cover}
                alt="Sampul Profil"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={handleCopyProfile}
                  className="px-3 py-1.5 bg-black/40 hover:bg-black/60 text-white rounded-xl text-xs font-medium backdrop-blur-md transition-colors flex items-center gap-1.5 border border-white/10"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  {copiedLink ? 'Tersalin' : 'Bagikan'}
                </button>
              </div>
            </div>

            {/* Profile Intro & Avatar */}
            <div className="px-5 sm:px-8 pb-6">
              <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-14 sm:-mt-16 mb-5">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-full h-full rounded-2xl object-cover border-4 border-white shadow-md bg-white"
                  />
                  {userData.verified && (
                    <div
                      title="Pelestari Budaya Terverifikasi"
                      className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-600 text-white rounded-lg flex items-center justify-center border-2 border-white shadow-sm"
                    >
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Primary Action Buttons */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setIsConnected(!isConnected)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-[0.98] ${
                      isConnected
                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                        : 'bg-slate-900 hover:bg-blue-600 text-white shadow-sm'
                    }`}
                  >
                    {isConnected ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-blue-600" />
                        Terhubung
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" />
                        Hubungkan
                      </>
                    )}
                  </button>

                  <Link
                    to="/pesan"
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 text-slate-500" />
                    Kirim Pesan
                  </Link>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="space-y-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-1">
                    {userData.name}
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">
                    {userData.username} • {userData.profession} • <span className="text-slate-700 font-semibold">{userData.category}</span>
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-3xl">
                  {userData.bio}
                </p>

                {/* Metas: Lokasi, Website, Tanggal */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{userData.location}</span>
                  </div>
                  {userData.website && (
                    <div className="flex items-center gap-1.5">
                      <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
                      <a
                        href={`https://${userData.website}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {userData.website}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{userData.joinedDate}</span>
                  </div>
                </div>

                {/* Statistics Pills */}
                <div className="flex items-center gap-6 pt-3">
                  <div>
                    <span className="text-sm font-bold text-slate-900">{userData.posts}</span>
                    <span className="text-xs text-slate-500 ml-1.5">Karya</span>
                  </div>
                  <div className="h-3 w-px bg-slate-200" />
                  <div>
                    <span className="text-sm font-bold text-slate-900">{userData.followers.toLocaleString('id-ID')}</span>
                    <span className="text-xs text-slate-500 ml-1.5">Pengikut</span>
                  </div>
                  <div className="h-3 w-px bg-slate-200" />
                  <div>
                    <span className="text-sm font-bold text-slate-900">{userData.following.toLocaleString('id-ID')}</span>
                    <span className="text-xs text-slate-500 ml-1.5">Koneksi</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-t border-slate-100 px-5 sm:px-8 bg-slate-50/50">
              <div className="flex gap-6 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('posts')}
                  className={`tab-item py-3.5 text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                    activeTab === 'posts' ? 'active font-bold' : ''
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  Karya & Postingan ({userData.posts_list.length})
                </button>
                <button
                  onClick={() => setActiveTab('about')}
                  className={`tab-item py-3.5 text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                    activeTab === 'about' ? 'active font-bold' : ''
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  Tentang & Keahlian
                </button>
                <button
                  onClick={() => setActiveTab('experience')}
                  className={`tab-item py-3.5 text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                    activeTab === 'experience' ? 'active font-bold' : ''
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  Dedikasi & Riwayat
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content Display */}
          {activeTab === 'posts' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userData.posts_list.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden hover:border-slate-300 transition-all shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      {post.image && (
                        <div className="h-48 overflow-hidden bg-slate-100">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="text-[11px] text-slate-400 mb-1.5">{post.timestamp}</div>
                        <h3 className="font-semibold text-slate-900 text-sm mb-1.5 leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                          {post.content}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 py-3 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer transition-colors">
                          <Heart className="w-3.5 h-3.5" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer transition-colors">
                          <MessageCircle className="w-3.5 h-3.5" />
                          {post.comments}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">Warisan Budaya</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Left Column: Fokus Budaya */}
              <div className="md:col-span-2 space-y-5">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm">
                  <h3 className="font-semibold text-sm text-slate-900 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    Fokus & Keahlian Budaya
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {userData.culturalFocus.map((focus, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg border border-slate-200/80"
                      >
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm">
                  <h3 className="font-semibold text-sm text-slate-900 mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    Penghargaan & Pengakuan Adat
                  </h3>
                  <div className="space-y-3">
                    {userData.achievements.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                        <div>
                          <h4 className="text-xs font-semibold text-slate-900">{item.title}</h4>
                          <p className="text-[11px] text-slate-500">{item.organization} • {item.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Kontak Langsung */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm">
                  <h3 className="font-semibold text-sm text-slate-900 mb-3">Informasi Kontak</h3>
                  <div className="space-y-2.5 text-xs text-slate-600">
                    {userData.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{userData.email}</span>
                      </div>
                    )}
                    {userData.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{userData.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{userData.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm">
              <h3 className="font-semibold text-sm text-slate-900 mb-5 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                Dedikasi Komunitas & Riwayat Pelestarian
              </h3>
              <div className="space-y-6">
                {userData.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-6 pb-6 border-l-2 border-slate-200 last:border-0 last:pb-0">
                    <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-blue-600" />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{exp.role}</h4>
                      <p className="text-xs font-medium text-blue-600 mb-1">{exp.organization} • {exp.period}</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
