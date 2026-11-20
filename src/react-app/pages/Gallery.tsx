import { useState } from 'react';
import { Link } from 'react-router';
import { Search, Heart, MessageCircle, Filter } from 'lucide-react';
import TopNavbar from '@/react-app/components/TopNavbar';

// Premium gallery data - Kebudayaan Indonesia dengan foto berkualitas tinggi
const galleryItems = [
  {
    id: 1,
    title: 'Batik Tulis Mega Mendung Cirebon',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&h=1000&auto=format&fit=crop&q=90',
    author: { name: 'Dewi Lestari', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    likes: 1234,
    comments: 87,
    category: 'Batik & Tenun',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 2,
    title: 'Tari Tradisional Bali - Pementasan Sakral',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=900&auto=format&fit=crop&q=90',
    author: { name: 'Made Suarta', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
    likes: 2456,
    comments: 143,
    category: 'Tari Tradisional',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 3,
    title: 'Wayang Kulit Purwa - Lakon Mahabarata',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1100&auto=format&fit=crop&q=90',
    author: { name: 'Budi Santoso', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
    likes: 1889,
    comments: 92,
    category: 'Kerajinan',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 4,
    title: 'Tenun Ikat Tradisional Nusantara',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&h=800&auto=format&fit=crop&q=90',
    author: { name: 'Maria Flores', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
    likes: 1512,
    comments: 76,
    category: 'Batik & Tenun',
    aspect: 'aspect-square'
  },
  {
    id: 5,
    title: 'Ukiran & Kriya Seni Kayu Nusantara',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=1200&auto=format&fit=crop&q=90',
    author: { name: 'Ahmad Yani', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    likes: 3523,
    comments: 201,
    category: 'Kerajinan',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 6,
    title: 'Kain Songket & Tenun Pewarna Alami',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=800&h=950&auto=format&fit=crop&q=90',
    author: { name: 'Siti Aminah', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
    likes: 2178,
    comments: 134,
    category: 'Batik & Tenun',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 7,
    title: 'Arsitektur Rumah Tradisional Nusantara',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&h=850&auto=format&fit=crop&q=90',
    author: { name: 'Reza Fahlevi', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
    likes: 2445,
    comments: 156,
    category: 'Arsitektur',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 8,
    title: 'Gamelan & Alat Musik Tradisional Bambu',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=1000&auto=format&fit=crop&q=90',
    author: { name: 'Dedi Mulyadi', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
    likes: 1867,
    comments: 98,
    category: 'Alat Musik',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 9,
    title: 'Kerajinan Anyaman & Kriya Tradisional',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&h=1050&auto=format&fit=crop&q=90',
    author: { name: 'Sugeng Wibowo', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    likes: 1598,
    comments: 89,
    category: 'Kerajinan',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 10,
    title: 'Pementasan Seni Teater Tari Daerah',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=850&auto=format&fit=crop&q=90',
    author: { name: 'Farhan Hakim', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
    likes: 3612,
    comments: 234,
    category: 'Tari Tradisional',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 11,
    title: 'Koleksi Wayang Kulit Klasik Surakarta',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&h=900&auto=format&fit=crop&q=90',
    author: { name: 'Lina Wijaya', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
    likes: 1289,
    comments: 67,
    category: 'Kerajinan',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 12,
    title: 'Harmoni Tabuhan Gamelan Gong Jawa',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=950&auto=format&fit=crop&q=90',
    author: { name: 'Pak Karno', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
    likes: 2423,
    comments: 178,
    category: 'Alat Musik',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 13,
    title: 'Batik Cap & Pewarnaan Alami Pesisir',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&h=850&auto=format&fit=crop&q=90',
    author: { name: 'Ibu Sari', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
    likes: 1756,
    comments: 94,
    category: 'Batik & Tenun',
    aspect: 'aspect-square'
  },
  {
    id: 14,
    title: 'Rumah Adat Warisan Leluhur Minangkabau',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&h=1000&auto=format&fit=crop&q=90',
    author: { name: 'Daniel Rante', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
    likes: 2890,
    comments: 167,
    category: 'Arsitektur',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 15,
    title: 'Keanggunan Gerak Tari Sakral Nusantara',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=900&auto=format&fit=crop&q=90',
    author: { name: 'Ketut Sari', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
    likes: 2234,
    comments: 145,
    category: 'Tari Tradisional',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 16,
    title: 'Kain Tenun Lurik Tradisional Yogyakarta',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&h=1000&auto=format&fit=crop&q=90',
    author: { name: 'Novi Handayani', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    likes: 1980,
    comments: 112,
    category: 'Batik & Tenun',
    aspect: 'aspect-[3/4]'
  }
];

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Batik & Tenun', 'Tari Tradisional', 'Kerajinan', 'Alat Musik', 'Arsitektur'];

  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <TopNavbar />

      {/* Main Content with proper spacing for fixed top navbar (h-14 on mobile, h-16 on desktop) and bottom mobile nav */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-24 md:pb-12">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-3.5 sm:p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-2.5">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari karya seni, budaya, atau seniman..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 sm:py-2.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all text-xs sm:text-sm placeholder-slate-400 text-slate-800"
              />
            </div>

            {/* Filter Indicator / Action */}
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-600 font-medium">
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                <span>Kategori</span>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto mt-3 pt-1 pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid - 4 Columns on Desktop with Zigzag / Masonry rhythm */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200/80 p-8">
            <p className="text-sm font-medium text-slate-700">Tidak ada karya yang sesuai dengan pencarian Anda</p>
            <button
              onClick={() => { setSelectedCategory('Semua'); setSearchQuery(''); }}
              className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Reset Filter & Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-start">
            {[0, 1, 2, 3].map((colIndex) => {
              const colItems = filteredItems.filter((_, idx) => idx % 4 === colIndex);
              return (
                <div 
                  key={colIndex} 
                  className={`flex flex-col gap-4 sm:gap-5 ${colIndex % 2 === 1 ? 'lg:pt-8' : ''}`}
                >
                  {colItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl shadow-xs hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden border border-slate-200/80 flex flex-col hover:-translate-y-1"
                    >
                      <div className={`relative overflow-hidden bg-slate-100 w-full ${item.aspect}`}>
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        {/* Category Badge */}
                        <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-blue-600/90 backdrop-blur-xs text-white rounded-md text-[10px] font-semibold tracking-wide shadow-xs">
                          {item.category}
                        </div>
                        
                        {/* Overlay Actions */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                          <div className="flex items-center justify-between text-white">
                            <button className="flex items-center gap-1.5 text-xs font-medium backdrop-blur-xs bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-md transition-colors">
                              <Heart className="w-3.5 h-3.5 fill-transparent hover:fill-white transition-colors" />
                              <span>{item.likes >= 1000 ? `${(item.likes/1000).toFixed(1)}k` : item.likes}</span>
                            </button>
                            <button className="flex items-center gap-1.5 text-xs font-medium backdrop-blur-xs bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-md transition-colors">
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>{item.comments}</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-3.5 flex flex-col justify-between flex-1">
                        <h3 className="font-semibold text-slate-900 text-xs sm:text-sm mb-2.5 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                        <Link 
                          to={`/user/${item.id % 3 + 1}`}
                          className="flex items-center gap-2 hover:opacity-80 transition-opacity mt-auto"
                        >
                          <img
                            src={item.author.avatar}
                            alt={item.author.name}
                            className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200"
                          />
                          <span className="text-[11px] text-slate-500 font-medium hover:text-blue-600 transition-colors">
                            {item.author.name}
                          </span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
