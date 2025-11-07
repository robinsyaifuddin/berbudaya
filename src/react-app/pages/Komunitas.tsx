import { useState } from 'react';
import { Link } from 'react-router';
import { 
  Users, MapPin, Search, Filter, ChevronDown, Check, 
  Heart, Share2, TrendingUp, Activity, Award,
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

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 pt-20">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari komunitas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all"
              />
            </div>

            {/* Province Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProvinceDropdown(!showProvinceDropdown);
                  setShowCategoryDropdown(false);
                }}
                className="w-full md:w-auto flex items-center justify-between gap-2 px-4 py-3 border-2 border-gray-300 rounded-xl text-sm font-medium hover:border-blue-600 transition-colors bg-white"
              >
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{selectedProvince}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showProvinceDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowProvinceDropdown(false)} />
                  <div className="absolute top-full mt-2 left-0 right-0 md:right-auto md:w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-20 max-h-80 overflow-y-auto">
                    {provinces.map((prov) => (
                      <button
                        key={prov}
                        onClick={() => {
                          setSelectedProvince(prov);
                          setShowProvinceDropdown(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 flex items-center justify-between transition-colors"
                      >
                        <span className="text-sm">{prov}</span>
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
                className="w-full md:w-auto flex items-center justify-between gap-2 px-4 py-3 border-2 border-gray-300 rounded-xl text-sm font-medium hover:border-blue-600 transition-colors bg-white"
              >
                <Filter className="w-4 h-4 text-blue-600" />
                <span>Kategori</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showCategoryDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowCategoryDropdown(false)} />
                  <div className="absolute top-full mt-2 left-0 right-0 md:right-auto md:w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-20">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setShowCategoryDropdown(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 flex items-center justify-between transition-colors"
                      >
                        <span className="text-sm">{cat}</span>
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
          {communities.map((community) => (
            <div
              key={community.id}
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-all group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={community.image}
                  alt={community.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {community.trending && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Trending
                  </div>
                )}
                {community.verified && (
                  <div className="absolute top-3 right-3 bg-blue-600 text-white p-1.5 rounded-full">
                    <Check className="w-4 h-4" />
                  </div>
                )}
                <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {community.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1 flex-1">
                    {community.name}
                  </h3>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Heart className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {community.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center bg-blue-50 rounded-lg p-2">
                    <Users className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                    <div className="text-sm font-bold text-gray-900">{community.members.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Anggota</div>
                  </div>
                  <div className="text-center bg-green-50 rounded-lg p-2">
                    <Activity className="w-4 h-4 text-green-600 mx-auto mb-1" />
                    <div className="text-sm font-bold text-gray-900">{community.activities}</div>
                    <div className="text-xs text-gray-600">Aktivitas</div>
                  </div>
                  <div className="text-center bg-purple-50 rounded-lg p-2">
                    <Award className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                    <div className="text-sm font-bold text-gray-900">{community.rating}</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                </div>

                {/* Location & Rating */}
                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{community.province}</span>
                  </div>
                  {renderStars(community.rating)}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                    <UserPlus className="w-4 h-4" />
                    Gabung
                  </button>
                  <Link
                    to={`/komunitas/${community.id}`}
                    className="px-4 py-2.5 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-all"
                  >
                    Detail
                  </Link>
                  <button className="px-3 py-2.5 rounded-lg border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 transition-all">
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <button className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all">
            Muat Lebih Banyak
          </button>
        </div>
      </div>

      {/* Floating Action Button */}
      <Link
        to="/komunitas/buat"
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white pl-6 pr-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all font-semibold flex items-center gap-2 hover:scale-105"
      >
        <span className="text-xl">+</span>
        <span className="hidden md:inline">Buat Komunitas</span>
      </Link>
    </div>
  );
}
