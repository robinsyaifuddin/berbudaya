import { useState } from 'react';
import { Link } from 'react-router';
import { Search, Heart, MessageCircle, Filter } from 'lucide-react';
import TopNavbar from '@/react-app/components/TopNavbar';

// Premium gallery data - Kebudayaan Indonesia dengan foto berkualitas tinggi
const galleryItems = [
  {
    id: 1,
    title: 'Batik Tulis Mega Mendung Cirebon',
    image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=800&h=1000&fit=crop&q=90',
    author: { name: 'Dewi Lestari', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    likes: 1234,
    comments: 87,
    category: 'Batik & Tenun',
    height: 420
  },
  {
    id: 2,
    title: 'Tari Kecak Bali - Seni Pertunjukan Sakral',
    image: 'https://images.unsplash.com/photo-1555400080-85a5debc4a23?w=800&h=900&fit=crop&q=90',
    author: { name: 'Made Suarta', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
    likes: 2456,
    comments: 143,
    category: 'Tari Tradisional',
    height: 380
  },
  {
    id: 3,
    title: 'Wayang Kulit Jawa - Dalang Masterpiece',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1100&fit=crop&q=90',
    author: { name: 'Budi Santoso', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
    likes: 1889,
    comments: 92,
    category: 'Kerajinan',
    height: 450
  },
  {
    id: 4,
    title: 'Tenun Ikat NTT - Warisan Leluhur',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop&q=90',
    author: { name: 'Maria Flores', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
    likes: 1512,
    comments: 76,
    category: 'Batik & Tenun',
    height: 340
  },
  {
    id: 5,
    title: 'Ukiran Kayu Jepara - Detail Sempurna',
    image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&h=1200&fit=crop&q=90',
    author: { name: 'Ahmad Yani', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    likes: 3523,
    comments: 201,
    category: 'Kerajinan',
    height: 480
  },
  {
    id: 6,
    title: 'Songket Palembang Emas',
    image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=800&h=950&fit=crop&q=90',
    author: { name: 'Siti Aminah', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
    likes: 2178,
    comments: 134,
    category: 'Batik & Tenun',
    height: 400
  },
  {
    id: 7,
    title: 'Rumah Gadang Minangkabau',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=850&fit=crop&q=90',
    author: { name: 'Reza Fahlevi', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
    likes: 2445,
    comments: 156,
    category: 'Arsitektur',
    height: 360
  },
  {
    id: 8,
    title: 'Angklung Bambu Sunda',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=1000&fit=crop&q=90',
    author: { name: 'Dedi Mulyadi', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
    likes: 1867,
    comments: 98,
    category: 'Alat Musik',
    height: 440
  },
  {
    id: 9,
    title: 'Keris Pusaka Jawa - Pamor Beras Wutah',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=1050&fit=crop&q=90',
    author: { name: 'Sugeng Wibowo', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    likes: 1598,
    comments: 89,
    category: 'Kerajinan',
    height: 460
  },
  {
    id: 10,
    title: 'Tari Saman Aceh - Seribu Tangan',
    image: 'https://images.unsplash.com/photo-1555400080-85a5debc4a23?w=800&h=850&fit=crop&q=90',
    author: { name: 'Farhan Hakim', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
    likes: 3612,
    comments: 234,
    category: 'Tari Tradisional',
    height: 370
  },
  {
    id: 11,
    title: 'Keramik Plered Purwakarta',
    image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=800&h=900&fit=crop&q=90',
    author: { name: 'Lina Wijaya', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
    likes: 1289,
    comments: 67,
    category: 'Kerajinan',
    height: 390
  },
  {
    id: 12,
    title: 'Gamelan Jawa - Ensemble Lengkap',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=950&fit=crop&q=90',
    author: { name: 'Pak Karno', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
    likes: 2423,
    comments: 178,
    category: 'Alat Musik',
    height: 430
  },
  {
    id: 13,
    title: 'Batik Cap Pekalongan',
    image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=800&h=850&fit=crop&q=90',
    author: { name: 'Ibu Sari', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
    likes: 1756,
    comments: 94,
    category: 'Batik & Tenun',
    height: 350
  },
  {
    id: 14,
    title: 'Toraja Tongkonan House',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop&q=90',
    author: { name: 'Daniel Rante', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
    likes: 2890,
    comments: 167,
    category: 'Arsitektur',
    height: 410
  },
  {
    id: 15,
    title: 'Tari Pendet Bali - Penyambutan',
    image: 'https://images.unsplash.com/photo-1555400080-85a5debc4a23?w=800&h=900&fit=crop&q=90',
    author: { name: 'Ketut Sari', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
    likes: 2234,
    comments: 145,
    category: 'Tari Tradisional',
    height: 400
  }
];

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Batik & Tenun', 'Tari Tradisional', 'Kerajinan', 'Alat Musik', 'Arsitektur'];
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 pt-20">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari galeri kebudayaan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all"
              />
            </div>

            {/* Filter Button */}
            <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-colors">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filter</span>
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto mt-4 pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Gallery Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 group cursor-pointer overflow-hidden border border-gray-200"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  style={{ height: `${item.height}px` }}
                />
                {/* Gradient overlay always visible but subtle */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-3 right-3 px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold shadow-lg">
                  {item.category}
                </div>
                
                {/* Overlay Actions */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center justify-between text-white">
                    <button className="flex items-center gap-2 text-sm font-semibold backdrop-blur-sm bg-white/20 px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>{item.likes >= 1000 ? `${(item.likes/1000).toFixed(1)}k` : item.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-sm font-semibold backdrop-blur-sm bg-white/20 px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{item.comments}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-2.5 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <Link 
                  to={`/user/${item.id % 3 + 1}`}
                  className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
                >
                  <img
                    src={item.author.avatar}
                    alt={item.author.name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-gray-100"
                  />
                  <span className="text-xs text-gray-600 font-medium hover:text-blue-600 transition-colors">{item.author.name}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
