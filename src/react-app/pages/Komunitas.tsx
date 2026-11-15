import { useState } from 'react';
import { Link } from 'react-router';
import { 
  Users, MapPin, Search, Filter, ChevronDown, Check, 
  Share2, TrendingUp, Activity, Award,
  UserPlus, Star
} from 'lucide-react';
import TopNavbar from '@/react-app/components/TopNavbar';

interface Community {
  id: number;
  name: string;
  description: string;
  image: string;
  members: number;
  province: string;
  category: string;
  activities: number;
  rating: number;
  verified: boolean;
  trending?: boolean;
}

const communities: Community[] = [
  {
    id: 1,
    name: 'Pelestari Batik Indonesia',
    description: 'Komunitas pengrajin dan pecinta batik yang berkomitmen melestarikan warisan budaya batik nusantara.',
    image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=400&h=300&fit=crop',
    members: 2500,
    province: 'Jawa Tengah',
    category: 'Kriya',
    activities: 45,
    rating: 4.8,
    verified: true,
    trending: true
  },
  {
    id: 2,
    name: 'Komunitas Dalang Muda',
    description: 'Wadah bagi generasi muda dalang wayang untuk berbagi ilmu dan melestarikan seni pedalangan.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    members: 1200,
    province: 'Jawa Timur',
    category: 'Seni Pertunjukan',
    activities: 32,
    rating: 4.6,
    verified: true
  },
  {
    id: 3,
    name: 'Penari Tradisional Nusantara',
    description: 'Komunitas penari dari berbagai daerah yang aktif mementaskan dan mengajarkan tari tradisional.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop',
    members: 3800,
    province: 'DI Yogyakarta',
    category: 'Tari',
    activities: 67,
    rating: 4.9,
    verified: true,
    trending: true
  },
  {
    id: 4,
    name: 'Pengrajin Anyaman Indonesia',
    description: 'Perkumpulan pengrajin anyaman rotan, bambu, dan pandan yang ingin mengembangkan pasar kerajinan.',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=300&fit=crop',
    members: 1850,
    province: 'Kalimantan Selatan',
    category: 'Kriya',
    activities: 28,
    rating: 4.5,
    verified: false
  },
  {
    id: 5,
    name: 'Musisi Gamelan Modern',
    description: 'Komunitas musisi yang mengkolaborasikan gamelan tradisional dengan musik kontemporer.',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&h=300&fit=crop',
    members: 950,
    province: 'Bali',
    category: 'Musik',
    activities: 41,
    rating: 4.7,
    verified: true
  },
  {
    id: 6,
    name: 'Koki Kuliner Nusantara',
    description: 'Perkumpulan koki dan food enthusiast yang melestarikan resep tradisional Indonesia.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    members: 4200,
    province: 'Jawa Barat',
    category: 'Kuliner',
    activities: 89,
    rating: 4.9,
    verified: true,
    trending: true
  },
  {
    id: 7,
    name: 'Arsitek Heritage Indonesia',
    description: 'Komunitas arsitek dan pemerhati bangunan bersejarah yang fokus pada konservasi heritage.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
    members: 680,
    province: 'DKI Jakarta',
    category: 'Arsitektur',
    activities: 23,
    rating: 4.4,
    verified: true
  },
  {
    id: 8,
    name: 'Pencinta Cerita Rakyat',
    description: 'Komunitas pendongeng dan penulis yang mengumpulkan dan menyebarkan cerita rakyat nusantara.',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    members: 1560,
    province: 'Sumatera Barat',
    category: 'Sastra',
    activities: 34,
    rating: 4.6,
    verified: false
  }
];

const provinces = [
  'Semua Provinsi', 'Jawa Tengah', 'Jawa Timur', 'Jawa Barat', 'DI Yogyakarta', 
  'DKI Jakarta', 'Bali', 'Sumatera Barat', 'Kalimantan Selatan'
];

const categories = ['Semua', 'Kriya', 'Seni Pertunjukan', 'Tari', 'Musik', 'Kuliner', 'Arsitektur', 'Sastra'];

export default function KomunitasPage() {
  const [selectedProvince, setSelectedProvince] = useState('Semua Provinsi');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [showProvinceDropdown, setShowProvinceDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [joinedCommunities, setJoinedCommunities] = useState<number[]>([]);
  const [selectedPreviewCommunity, setSelectedPreviewCommunity] = useState<Community | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleJoin = (id: number, name: string) => {
    if (joinedCommunities.includes(id)) {
      setJoinedCommunities(joinedCommunities.filter((cId) => cId !== id));
      triggerToast(`Anda telah keluar dari ${name}`);
    } else {
      setJoinedCommunities([...joinedCommunities, id]);
      triggerToast(`Selamat! Anda resmi bergabung dengan ${name}`);
    }
  };

  const handleShare = (community: Community) => {
    navigator.clipboard?.writeText(window.location.origin + '/komunitas');
    triggerToast(`Tautan profil ${community.name} berhasil disalin!`);
  };

  const filteredCommunities = communities.filter((community) => {
    const matchSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        community.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchProvince = selectedProvince === 'Semua Provinsi' || community.province === selectedProvince;
    const matchCategory = selectedCategory === 'Semua' || community.category === selectedCategory;
    return matchSearch && matchProvince && matchCategory;
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-10">
      <TopNavbar />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-gray-700 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 pt-20">
        {/* Page Title & Action */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-1">
              Komunitas & Paguyuban Budaya
            </h1>
            <p className="text-sm text-gray-600">
              Jelajahi dan terhubung dengan sanggar seni, paguyuban kriya, dan komunitas tradisi di seluruh Nusantara
            </p>
          </div>
          <Link
            to="/kelola-komunitas"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all shadow-sm active:scale-[0.98] w-fit"
          >
            <span>+ Buat Komunitas Baru</span>
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari sanggar seni, kriya, atau tradisi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all text-sm"
              />
            </div>

            {/* Province Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProvinceDropdown(!showProvinceDropdown);
                  setShowCategoryDropdown(false);
                }}
                className="w-full md:w-auto flex items-center justify-between gap-2 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium hover:border-gray-400 transition-colors bg-white text-gray-700"
              >
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{selectedProvince}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {showProvinceDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowProvinceDropdown(false)} />
                  <div className="absolute top-full mt-2 left-0 right-0 md:right-auto md:w-60 bg-white rounded-xl shadow-xl border border-gray-200 z-20 max-h-80 overflow-y-auto py-1">
                    {provinces.map((prov) => (
                      <button
                        key={prov}
                        onClick={() => {
                          setSelectedProvince(prov);
                          setShowProvinceDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-blue-50 flex items-center justify-between transition-colors text-sm text-gray-700"
                      >
                        <span>{prov}</span>
                        {selectedProvince === prov && <Check className="w-4 h-4 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowCategoryDropdown(!showCategoryDropdown);
                  setShowProvinceDropdown(false);
                }}
                className="w-full md:w-auto flex items-center justify-between gap-2 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium hover:border-gray-400 transition-colors bg-white text-gray-700"
              >
                <Filter className="w-4 h-4 text-blue-600" />
                <span>{selectedCategory === 'Semua' ? 'Kategori' : selectedCategory}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {showCategoryDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowCategoryDropdown(false)} />
                  <div className="absolute top-full mt-2 left-0 right-0 md:right-auto md:w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-20 py-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setShowCategoryDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-blue-50 flex items-center justify-between transition-colors text-sm text-gray-700"
                      >
                        <span>{cat}</span>
                        {selectedCategory === cat && <Check className="w-4 h-4 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCommunities.slice(0, visibleCount).map((community) => {
            const isJoined = joinedCommunities.includes(community.id);
            return (
              <div
                key={community.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden bg-gray-100">
                    <img
                      src={community.image}
                      alt={community.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {community.trending && (
                      <div className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-md text-amber-300 px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 border border-amber-400/20">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>Populer</span>
                      </div>
                    )}
                    {community.verified && (
                      <div className="absolute top-3 right-3 bg-blue-600 text-white p-1 rounded-full shadow-sm">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-gray-800 px-2.5 py-0.5 rounded-md text-xs font-semibold border border-gray-200">
                      {community.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-1.5">
                      <h3 className="text-base font-bold text-gray-900 line-clamp-1 flex-1 group-hover:text-blue-600 transition-colors">
                        {community.name}
                      </h3>
                    </div>

                    <p className="text-xs text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                      {community.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="text-center bg-gray-50 rounded-lg p-2 border border-gray-100">
                        <Users className="w-3.5 h-3.5 text-blue-600 mx-auto mb-0.5" />
                        <div className="text-xs font-bold text-gray-900">{community.members.toLocaleString()}</div>
                        <div className="text-[10px] text-gray-500">Anggota</div>
                      </div>
                      <div className="text-center bg-gray-50 rounded-lg p-2 border border-gray-100">
                        <Activity className="w-3.5 h-3.5 text-emerald-600 mx-auto mb-0.5" />
                        <div className="text-xs font-bold text-gray-900">{community.activities}</div>
                        <div className="text-[10px] text-gray-500">Agenda</div>
                      </div>
                      <div className="text-center bg-gray-50 rounded-lg p-2 border border-gray-100">
                        <Award className="w-3.5 h-3.5 text-amber-600 mx-auto mb-0.5" />
                        <div className="text-xs font-bold text-gray-900">{community.rating}</div>
                        <div className="text-[10px] text-gray-500">Rating</div>
                      </div>
                    </div>

                    {/* Location & Rating */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1 text-gray-600 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span>{community.province}</span>
                      </div>
                      {renderStars(community.rating)}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-5 pt-0">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleJoin(community.id, community.name)}
                      className={`flex-1 py-2 px-3 rounded-xl font-medium text-xs transition-all flex items-center justify-center gap-1.5 ${
                        isJoined
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                      }`}
                    >
                      {isJoined ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Tergabung</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>Gabung</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setSelectedPreviewCommunity(community)}
                      className="px-3.5 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium text-xs hover:bg-gray-50 hover:border-gray-400 transition-all"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => handleShare(community)}
                      className="px-2.5 py-2 rounded-xl border border-gray-300 text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all"
                      title="Salin Tautan"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        {visibleCount < filteredCommunities.length && (
          <div className="text-center">
            <button
              onClick={() => setVisibleCount(prev => prev + 3)}
              className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all shadow-sm"
            >
              Muat Lebih Banyak ({filteredCommunities.length - visibleCount} tersisa)
            </button>
          </div>
        )}
      </div>

      {/* Detail Preview Modal */}
      {selectedPreviewCommunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-200">
            <div className="relative h-48 bg-gray-100">
              <img
                src={selectedPreviewCommunity.image}
                alt={selectedPreviewCommunity.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedPreviewCommunity(null)}
                className="absolute top-3 right-3 bg-black/60 text-white p-1.5 rounded-full hover:bg-black/80"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
                <span>{selectedPreviewCommunity.category}</span>
                <span>•</span>
                <span>{selectedPreviewCommunity.province}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">{selectedPreviewCommunity.name}</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">{selectedPreviewCommunity.description}</p>
              
              <div className="grid grid-cols-3 gap-3 p-3 bg-gray-50 rounded-xl mb-6 text-center border border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">Anggota</p>
                  <p className="text-sm font-bold text-gray-900">{selectedPreviewCommunity.members.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Agenda Aktif</p>
                  <p className="text-sm font-bold text-gray-900">{selectedPreviewCommunity.activities}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Rating Komunitas</p>
                  <p className="text-sm font-bold text-gray-900">{selectedPreviewCommunity.rating} / 5.0</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleToggleJoin(selectedPreviewCommunity.id, selectedPreviewCommunity.name);
                    setSelectedPreviewCommunity(null);
                  }}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all"
                >
                  {joinedCommunities.includes(selectedPreviewCommunity.id) ? 'Batal Gabung' : 'Gabung Komunitas Ini'}
                </button>
                <button
                  onClick={() => setSelectedPreviewCommunity(null)}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <Link
        to="/kelola-komunitas"
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all font-medium text-sm flex items-center gap-2 hover:scale-105 z-40 active:scale-[0.98]"
      >
        <span className="text-lg leading-none">+</span>
        <span className="hidden sm:inline">Buat Komunitas</span>
      </Link>
    </div>
  );
}
