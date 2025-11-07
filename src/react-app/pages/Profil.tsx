import { useState, useEffect } from 'react';
import TopNavbar from '@/react-app/components/TopNavbar';
import { 
  Edit, Mail, Globe, MessageCircle, Plus, ChevronUp, 
  Calendar, User, Briefcase, GraduationCap, MapPin
} from 'lucide-react';

interface DemoUser {
  id: string;
  email: string;
  name: string;
  avatar: string;
  loginTime: string;
}

const culturalInterests = [
  { 
    name: 'Wayang Kulit', 
    region: 'Jawa Tengah & Jawa Timur',
    icon: '🎭',
    description: 'Seni pertunjukan tradisional'
  },
  { 
    name: 'Tari Saman', 
    region: 'Aceh',
    icon: '💃',
    description: 'Tarian tradisional yang dinamis'
  },
  { 
    name: 'Batik', 
    region: 'Jawa',
    icon: '👔',
    description: 'Kain tradisional dengan motif khas'
  },
  { 
    name: 'Angklung', 
    region: 'Jawa Barat',
    icon: '🎵',
    description: 'Alat musik tradisional dari bambu'
  },
  { 
    name: 'Reog Ponorogo', 
    region: 'Jawa Timur',
    icon: '🦁',
    description: 'Kesenian dengan topeng singa barong'
  }
];

const askMeAboutTags = [
  { text: 'A Very Long Example Text Here', count: 42 },
  { text: 'Example', count: 132 },
  { text: 'Medium Length', count: 51 },
  { text: 'A Very Long Example', count: 1 },
  { text: 'Human Resources', count: 24 },
  { text: 'Last Test', count: 3 }
];

export default function ProfilPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState<DemoUser | null>(null);
  const [expandedTags, setExpandedTags] = useState<number[]>([0]);

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

  const toggleTag = (index: number) => {
    setExpandedTags(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      
      <div className="pt-16">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content (2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Header Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Colorful Gradient Cover */}
                <div className="h-32 sm:h-40 relative bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600">
                  {/* Edit Button - Top Right */}
                  <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all">
                    <Edit className="w-5 h-5 text-gray-700" />
                  </button>
                </div>

                {/* Profile Content */}
                <div className="relative px-4 sm:px-6 pb-6">
                  {/* Main Profile Section - Horizontal Layout */}
                  <div className="flex flex-col md:flex-row gap-6 -mt-16 mb-6">
                    {/* Left Side - Avatar & Basic Info */}
                    <div className="flex-shrink-0">
                      <img
                        src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'}
                        alt="Profile"
                        className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-lg object-cover"
                      />
                      
                      {/* Name & Info */}
                      <div className="mt-4">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                          {user?.name || 'Emma Smith'}
                        </h1>
                        <p className="text-base text-gray-600 mb-1">
                          Kreator Budaya
                        </p>
                        <div className="flex items-center gap-1 text-gray-500 mb-4">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">Jakarta, Indonesia</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <button className="px-6 py-2.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors">
                            Edit Profil
                          </button>
                          <button className="px-6 py-2.5 border-2 border-blue-300 text-blue-700 rounded-full font-medium hover:border-blue-400 hover:bg-blue-50 transition-colors">
                            Pengaturan
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Current Role & Skills */}
                    <div className="flex-1 md:mt-4">
                      {/* Current Role Badge */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <Briefcase className="w-4 h-4" />
                          <span className="text-sm font-medium">Peran Saat Ini</span>
                        </div>
                        <div className="inline-block px-4 py-2 bg-gray-100 rounded-lg">
                          <span className="font-semibold text-gray-900">Kreator Budaya</span>
                        </div>
                      </div>

                      {/* Skills Section */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm font-medium text-gray-600">Keahlian</span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {['Wayang Kulit', 'Batik', 'Tari Tradisional', 'Angklung', 'Budaya Nusantara'].map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Siap Berkarya</h4>
                          <p className="text-sm text-gray-600">Tampilkan bahwa Anda siap untuk berkarya dan berkolaborasi.</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700">
                          <ChevronUp className="w-5 h-5 rotate-90" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Bagikan Postingan</h4>
                          <p className="text-sm text-gray-600">Bagikan berita terbaru untuk terhubung dengan orang lain.</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700">
                          <ChevronUp className="w-5 h-5 rotate-90" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Perbarui Profil</h4>
                          <p className="text-sm text-gray-600">Perbarui profil Anda agar orang lain mengenal Anda lebih baik.</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700">
                          <ChevronUp className="w-5 h-5 rotate-90" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Tab Navigation */}
                  <div className="border-t border-gray-200">
                    <div className="flex justify-center gap-8 overflow-x-auto">
                      {[{key: 'overview', label: 'Ringkasan'}, {key: 'groups', label: 'Komunitas'}, {key: 'posts', label: 'Postingan'}, {key: 'pages', label: 'Halaman'}, {key: 'events', label: 'Kegiatan'}, {key: 'more', label: 'Lainnya'}].map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => setActiveTab(tab.key)}
                          className={`py-3 px-1 font-medium whitespace-nowrap transition-colors ${
                            activeTab === tab.key
                              ? 'text-blue-600 border-b-2 border-blue-600'
                              : 'text-gray-500 hover:text-blue-600'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <>
                  {/* Summary Section */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">Ringkasan</h3>
                      <button className="text-blue-600 hover:text-blue-700">
                        <Edit className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>
                        Saya adalah seorang pecinta budaya Indonesia yang berdedikasi untuk melestarikan dan mempromosikan kekayaan warisan budaya nusantara.
                      </p>
                      <p>
                        Dengan pengalaman lebih dari 10 tahun dalam bidang kebudayaan, saya aktif terlibat dalam berbagai kegiatan pelestarian seni tradisional, dokumentasi budaya, dan edukasi masyarakat.
                      </p>
                      <p>
                        Misi saya adalah memastikan generasi muda tetap terhubung dengan akar budaya mereka sambil mengadaptasi tradisi untuk era modern.
                      </p>
                    </div>
                  </div>

                  {/* Ask Me About Section */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="text-xl font-bold text-gray-900">Tanyakan Kepada Saya</h3>
                      <MessageCircle className="w-5 h-5 text-gray-400" />
                      <button className="ml-auto text-blue-600 hover:text-blue-700">
                        <Edit className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {askMeAboutTags.map((tag, index) => (
                        <button
                          key={index}
                          onClick={() => toggleTag(index)}
                          className={`flex items-center justify-between p-3 rounded-lg border-2 transition-colors ${
                            expandedTags.includes(index)
                              ? 'bg-blue-50 border-blue-600'
                              : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {expandedTags.includes(index) ? (
                              <ChevronUp className="w-4 h-4 text-blue-600" />
                            ) : (
                              <Plus className="w-4 h-4 text-gray-600" />
                            )}
                            <span className="text-sm font-medium text-gray-900">
                              {tag.text}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            +{tag.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'groups' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Komunitas Budaya</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'Komunitas Wayang Indonesia', members: 1250, image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&h=200&fit=crop' },
                      { name: 'Pecinta Batik Nusantara', members: 2340, image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=300&h=200&fit=crop' },
                      { name: 'Sanggar Tari Tradisional', members: 876, image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=200&fit=crop' },
                      { name: 'Forum Pelestari Budaya', members: 3421, image: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?w=300&h=200&fit=crop' }
                    ].map((group, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <img src={group.image} alt={group.name} className="w-full h-32 object-cover" />
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-900 mb-1">{group.name}</h4>
                          <p className="text-sm text-gray-600">{group.members.toLocaleString()} anggota</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'posts' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Postingan Saya</h3>
                  <div className="space-y-4">
                    {[
                      { title: 'Keindahan Wayang Kulit di Era Modern', date: '2 hari yang lalu', likes: 124, comments: 18 },
                      { title: 'Workshop Membatik untuk Pemula', date: '5 hari yang lalu', likes: 89, comments: 12 },
                      { title: 'Dokumentasi Festival Reog Ponorogo 2024', date: '1 minggu yang lalu', likes: 245, comments: 34 }
                    ].map((post, idx) => (
                      <div key={idx} className="border-b border-gray-200 pb-4 last:border-0">
                        <h4 className="font-semibold text-gray-900 mb-2">{post.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{post.date}</span>
                          <span>❤️ {post.likes}</span>
                          <span>💬 {post.comments}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'pages' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Halaman yang Saya Kelola</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'Museum Wayang Jakarta', followers: 15420, image: 'https://images.unsplash.com/photo-1566127444979-b533fc1f256e?w=300&h=200&fit=crop' },
                      { name: 'Galeri Batik Indonesia', followers: 8932, image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=300&h=200&fit=crop' }
                    ].map((page, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <img src={page.image} alt={page.name} className="w-full h-32 object-cover" />
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-900 mb-1">{page.name}</h4>
                          <p className="text-sm text-gray-600">{page.followers.toLocaleString()} pengikut</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'events' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Kegiatan Budaya</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Festival Wayang Internasional', date: '15 Nov 2024', location: 'Jakarta', attendees: 450 },
                      { name: 'Pameran Batik Nusantara', date: '22 Nov 2024', location: 'Yogyakarta', attendees: 320 },
                      { name: 'Workshop Tari Saman', date: '5 Des 2024', location: 'Banda Aceh', attendees: 120 },
                      { name: 'Seminar Pelestarian Budaya', date: '10 Des 2024', location: 'Surabaya', attendees: 200 }
                    ].map((event, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">{event.name}</h4>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {event.date}
                              </p>
                              <p className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {event.location}
                              </p>
                            </div>
                          </div>
                          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                            {event.attendees} peserta
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'more' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Informasi Lainnya</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Penghargaan</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">🏆</span>
                          <div>
                            <p className="font-medium text-gray-900">Budayawan Muda Terbaik 2023</p>
                            <p className="text-sm text-gray-600">Kementerian Pendidikan dan Kebudayaan</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">🎖️</span>
                          <div>
                            <p className="font-medium text-gray-900">Pelestari Budaya Terbaik</p>
                            <p className="text-sm text-gray-600">UNESCO Indonesia</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Publikasi</h4>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">📚 "Wayang Kulit dalam Perspektif Modern" (2023)</p>
                        <p className="text-sm text-gray-700">📚 "Batik: Warisan Budaya Dunia" (2022)</p>
                        <p className="text-sm text-gray-700">📚 "Tari Tradisional Nusantara" (2021)</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar (1 col) */}
            <div className="space-y-6">
              {/* Minat Kebudayaan Saya */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Minat Kebudayaan Saya</h3>
                  <button className="text-blue-600 hover:text-blue-700">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  {culturalInterests.map((interest, index) => (
                    <div 
                      key={index} 
                      className="group p-3 rounded-lg hover:bg-blue-50 transition-all border border-transparent hover:border-blue-200 cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-1">
                            {interest.name}
                          </p>
                          <p className="text-xs text-gray-500 mb-1">
                            📍 {interest.region}
                          </p>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {interest.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                  Lihat Semua Minat
                </button>
              </div>

              {/* Additional Details */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Detail Tambahan</h3>
                  <button className="text-blue-600 hover:text-blue-700">
                    <Edit className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs uppercase text-gray-500 mb-1">EMAIL</p>
                      <a href="mailto:ymen.castieo@company.com" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        ymen.castieo@company.com
                      </a>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs uppercase text-gray-500 mb-1">BAHASA</p>
                      <p className="text-sm text-gray-900">Indonesia, Inggris</p>
                    </div>
                  </div>

                  {/* Gender Pronounce */}
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs uppercase text-gray-500 mb-1">KATA GANTI</p>
                      <p className="text-sm text-gray-900">Dia / Beliau</p>
                    </div>
                  </div>

                  {/* Nickname */}
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs uppercase text-gray-500 mb-1">NAMA PANGGILAN</p>
                      <p className="text-sm text-gray-900">Budi</p>
                    </div>
                  </div>

                  {/* Join Date */}
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs uppercase text-gray-500 mb-1">TANGGAL BERGABUNG</p>
                      <p className="text-sm text-gray-900">2 bulan yang lalu, pada 15 Des 2020</p>
                    </div>
                  </div>

                  {/* Work History */}
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs uppercase text-gray-500 mb-1">RIWAYAT PEKERJAAN</p>
                      <p className="text-sm text-blue-600 font-medium">Museum Nasional, Galeri Batik, Sanggar Tari</p>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs uppercase text-gray-500 mb-1">PENDIDIKAN</p>
                      <p className="text-sm text-blue-600 font-medium">Universitas Indonesia</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
