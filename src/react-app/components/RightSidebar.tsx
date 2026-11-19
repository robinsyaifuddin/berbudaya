import { Link } from 'react-router';
import { ChevronDown, ChevronRight, Brain, Puzzle, Map } from 'lucide-react';
import { useState } from 'react';
import SavedPostsSidebar from './SavedPostsSidebar';

const newsItems = [
  {
    id: 1,
    title: 'Teknik Membatik Tulis untuk Pemula',
    author: 'Dewi Lestari',
    timeAgo: '2 jam',
    readers: '1,245'
  },
  {
    id: 2,
    title: 'Sejarah Gamelan Jawa dan Filosofinya',
    author: 'Bambang Supriyanto',
    timeAgo: '5 jam',
    readers: '892'
  },
  {
    id: 3,
    title: 'Makna Simbolik Tari Saman Aceh',
    author: 'Siti Rahma',
    timeAgo: '8 jam',
    readers: '1,567'
  },
  {
    id: 4,
    title: 'Panduan Lengkap Menenun Songket',
    author: 'Ratna Sari',
    timeAgo: '12 jam',
    readers: '734'
  },
  {
    id: 5,
    title: 'Keunikan Arsitektur Rumah Gadang',
    author: 'Budi Santoso',
    timeAgo: '1 hari',
    readers: '2,103'
  },
  {
    id: 6,
    title: 'Filosofi Wayang Kulit Jawa',
    author: 'Agus Setiawan',
    timeAgo: '1 hari',
    readers: '1,834'
  },
  {
    id: 7,
    title: 'Seni Ukir Kayu Tradisional Bali',
    author: 'Made Wijaya',
    timeAgo: '2 hari',
    readers: '956'
  }
];

const games = [
  { 
    id: 1, 
    name: 'Kuis Budaya', 
    subtitle: 'Uji pengetahuan budaya Nusantara', 
    color: 'bg-gradient-to-br from-blue-50 to-blue-100', 
    Icon: Brain,
    iconColor: 'text-blue-600',
    hoverColor: 'hover:from-blue-100 hover:to-blue-200',
    link: '/games/kuis-budaya'
  },
  { 
    id: 2, 
    name: 'Puzzle Budaya', 
    subtitle: 'Susun gambar kebudayaan Indonesia', 
    color: 'bg-gradient-to-br from-purple-50 to-purple-100', 
    Icon: Puzzle,
    iconColor: 'text-purple-600',
    hoverColor: 'hover:from-purple-100 hover:to-purple-200',
    link: '/games/puzzle-budaya'
  },
  { 
    id: 3, 
    name: 'Tebak Daerah', 
    subtitle: 'Tebak asal daerah dari gambar budaya', 
    color: 'bg-gradient-to-br from-green-50 to-green-100', 
    Icon: Map,
    iconColor: 'text-green-600',
    hoverColor: 'hover:from-green-100 hover:to-green-200',
    link: '/games/tebak-daerah'
  }
];



export default function RightSidebar() {
  const [showAllNews, setShowAllNews] = useState(false);

  return (
    <div className="space-y-2">
      {/* Saved Posts Section */}
      <SavedPostsSidebar />

      {/* News Section - Refined Editorial Minimalist */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden">
        <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <h4 className="font-semibold text-slate-900 text-xs tracking-tight">Kabar Kebudayaan</h4>
          <span className="text-[10px] text-blue-600 font-medium">Terkini</span>
        </div>
        <div className="px-4 py-3">
          <div className="space-y-3">
            {newsItems.slice(0, showAllNews ? newsItems.length : 3).map((news) => (
              <Link
                key={news.id}
                to="/berita"
                className="w-full text-left group transition-all block"
              >
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-600 transition-colors mt-1.5 shrink-0"></span>
                  <div className="flex-1">
                    <h5 className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                      {news.title}
                    </h5>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1">
                      <span>{news.author}</span>
                      <span>•</span>
                      <span>{news.timeAgo}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <button
            onClick={() => setShowAllNews(!showAllNews)}
            className="flex items-center gap-1 mt-3 text-xs text-slate-600 hover:text-blue-600 font-medium transition-colors pt-2 border-t border-slate-100 w-full justify-center"
          >
            {showAllNews ? 'Perkecil' : 'Lihat semua kabar'} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAllNews ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Game Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden">
        <div className="px-4 py-3.5 border-b border-slate-100">
          <h4 className="font-semibold text-slate-900 text-xs tracking-tight">Eksplorasi Budaya Interaktif</h4>
        </div>
        <div className="p-3 space-y-2">
          {games.map((game) => {
            const Icon = game.Icon;
            return (
              <Link
                key={game.id}
                to={game.link}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/90 border border-slate-100 transition-all duration-150 group"
              >
                <div className="p-2 rounded-lg bg-white shadow-xs border border-slate-200/60 text-slate-700 group-hover:text-blue-600 transition-colors shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">{game.name}</h5>
                  <p className="text-[11px] text-slate-500 truncate leading-tight">{game.subtitle}</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
