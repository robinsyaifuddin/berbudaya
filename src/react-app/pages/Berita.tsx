import { useState } from 'react';
import { Link } from 'react-router';
import { 
  Newspaper, 
  ChevronRight, 
  Bookmark, 
  Search, 
  TrendingUp, 
  ShieldCheck, 
  ArrowUpRight, 
  CheckCircle2, 
  Send,
  SlidersHorizontal,
  ChevronLeft
} from 'lucide-react';
import TopNavbar from '@/react-app/components/TopNavbar';
import { newsArticles, popularSearches, latestIntelligence, type NewsItem } from '@/react-app/data/newsData';

const categories = [
  'Semua Berita',
  'Kebijakan Budaya',
  'Seni Teater & Tari',
  'Kriya & Tekstil',
  'Teknologi & Arsip',
  'Tari & Musik',
  'Arkeologi',
  'Arsitektur Vernakular'
];

export default function BeritaPage() {
  const [selectedCategory, setSelectedCategory] = useState('Semua Berita');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const [sortOption, setSortOption] = useState<'latest' | 'popular'>('latest');

  const toggleBookmark = (id: number) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredNews = newsArticles.filter(item => {
    const matchesCategory = selectedCategory === 'Semua Berita' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = newsArticles[0];
  const sideFeaturedArticles = newsArticles.slice(1, 3);
  const gridArticles = filteredNews.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-slate-900 font-poppins antialiased">
      <TopNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-20 pb-16">
        
        {/* Top Hero / Header Section */}
        <section className="mb-6 bg-white border border-slate-200/90 rounded-lg p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                Warta Budaya & Riset Nusantara.
              </h1>
              <p className="mt-2.5 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                Jurnal analisis independen, arsip tradisi, kebijakan pelestarian, dan dokumentasi transformasi kriya nusantara untuk pemangku kepentingan kebudayaan dan generasi penerus.
              </p>

              {/* Stat Counters */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-10 mt-5 pt-4 border-t border-slate-100">
                <div>
                  <div className="text-lg sm:text-xl font-bold text-primary-600 tracking-tight">850+</div>
                  <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Arsip & Berita</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-primary-600 tracking-tight">38</div>
                  <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Provinsi Terekam</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-primary-600 tracking-tight">8</div>
                  <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Pilar Tradisi</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Update Harian</div>
                  <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Kurasi Otentik</div>
                </div>
              </div>
            </div>

            {/* Right Mini Card */}
            <div className="lg:col-span-4 flex lg:justify-end">
              <div className="w-full max-w-sm p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200/80 shadow-xs relative overflow-hidden">
                <div className="text-primary-600 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
                  Pusat Informasi Budaya
                </div>
                <h2 className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                  Mendokumentasikan Warisan Leluhur dalam Format Modern & Terbuka
                </h2>
                <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                  Semua warta melalui kurasi kurator terdaftar dan akademisi kebudayaan daerah untuk akurasi data sejarah.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Intelligence Terminal Bar */}
        <section className="mb-6 bg-white border border-slate-200/90 rounded-lg p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-700" />
              <span className="font-semibold text-sm text-slate-900 tracking-tight">Direktori & Terminal Warta Kebudayaan</span>
            </div>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Cari berita berdasarkan judul, topik kriya, komunitas, daerah, atau kata kunci..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
            />
          </div>
        </section>

        {/* Categories Pills & Control Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? 'bg-primary-600 text-white shadow-xs font-semibold' 
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 self-end lg:self-auto">
            <div className="flex items-center gap-1.5 text-xs text-zinc-600 bg-white border border-zinc-200 px-3 py-1.5 rounded-xl shadow-2xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
              <span>Urutan:</span>
              <select 
                value={sortOption} 
                onChange={(e) => setSortOption(e.target.value as 'latest' | 'popular')}
                className="bg-transparent font-medium text-zinc-900 focus:outline-none cursor-pointer"
              >
                <option value="latest">Terbaru</option>
                <option value="popular">Terpopuler</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Layout: 2 Columns (8 / 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (8/12) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Featured Section */}
            {selectedCategory === 'Semua Berita' && !searchQuery && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-primary-600 rounded-full" />
                    <h2 className="text-base font-bold text-zinc-950 tracking-tight">Sorotan Utama</h2>
                  </div>
                  <span className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 cursor-pointer">
                    Semua Sorotan <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  {/* Big Featured Card (7 cols) */}
                  <div className="md:col-span-7 bg-white border border-zinc-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col group">
                    <Link to={`/berita/${featuredArticle.id}`} className="block relative h-56 sm:h-64 overflow-hidden bg-zinc-100">
                      <img 
                        src={featuredArticle.image} 
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-xs">
                        Featured
                      </span>
                    </Link>
                    <button 
                      onClick={() => toggleBookmark(featuredArticle.id)}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full text-zinc-700 hover:text-primary-600 transition-colors shadow-xs z-10"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${bookmarkedIds.includes(featuredArticle.id) ? 'fill-primary-600 text-primary-600' : ''}`} />
                    </button>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <Link to={`/berita/${featuredArticle.id}`} className="block">
                        <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wide text-primary-600 uppercase mb-2">
                          <span>{featuredArticle.category}</span>
                          <span className="text-zinc-300">•</span>
                          <span className="text-zinc-500">{featuredArticle.subCategory}</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-zinc-900 leading-snug group-hover:text-primary-600 transition-colors">
                          {featuredArticle.title}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-zinc-600 line-clamp-3 leading-relaxed">
                          {featuredArticle.excerpt}
                        </p>
                      </Link>

                      <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img 
                            src={featuredArticle.authorAvatar} 
                            alt={featuredArticle.author}
                            className="w-7 h-7 rounded-full object-cover ring-1 ring-zinc-200" 
                          />
                          <div>
                            <div className="text-xs font-semibold text-zinc-800">{featuredArticle.author}</div>
                            <div className="text-[10px] text-zinc-400">{featuredArticle.date}</div>
                          </div>
                        </div>
                        <Link 
                          to={`/berita/${featuredArticle.id}`}
                          className="w-7 h-7 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* 2 Stacked Side Cards (5 cols) */}
                  <div className="md:col-span-5 flex flex-col gap-5">
                    {sideFeaturedArticles.map(article => (
                      <div 
                        key={article.id}
                        className="bg-white border border-zinc-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group flex-1 relative"
                      >
                        <Link to={`/berita/${article.id}`} className="block flex gap-3">
                          <div className="w-24 h-24 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0">
                            <img 
                              src={article.image} 
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-primary-600 uppercase mb-1">
                              <span>{article.category}</span>
                              <span className="text-zinc-300">•</span>
                              <span className="text-zinc-400 font-normal">{article.readTime}</span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 leading-snug line-clamp-2 group-hover:text-primary-600 transition-colors">
                              {article.title}
                            </h4>
                          </div>
                        </Link>

                        <div className="flex items-center justify-between pt-3 mt-3 border-t border-zinc-100">
                          <div className="flex items-center gap-2">
                            <img 
                              src={article.authorAvatar} 
                              alt={article.author}
                              className="w-5 h-5 rounded-full object-cover" 
                            />
                            <span className="text-[11px] font-medium text-zinc-700 truncate max-w-[120px]">{article.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-zinc-400">{article.date}</span>
                            <Link 
                              to={`/berita/${article.id}`}
                              className="w-5 h-5 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors"
                            >
                              <ArrowUpRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Latest News Grid Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 bg-primary-600 rounded-full" />
                  <h2 className="text-base font-bold text-zinc-950 tracking-tight">Warta Terbaru</h2>
                  <span className="text-xs text-zinc-400 font-normal ml-1">
                    Menampilkan 1–{gridArticles.length} dari {newsArticles.length} laporan
                  </span>
                </div>
                <span className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 cursor-pointer">
                  Lihat Arsip Lengkap <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* 3 Columns Clean Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {gridArticles.map((article) => {
                  const isSaved = bookmarkedIds.includes(article.id);
                  return (
                    <article 
                      key={article.id}
                      className="bg-white border border-zinc-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col group relative"
                    >
                      <Link to={`/berita/${article.id}`} className="block relative h-44 overflow-hidden bg-zinc-100">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      <button 
                        onClick={() => toggleBookmark(article.id)}
                        className="absolute top-2.5 right-2.5 p-1.5 bg-white/90 backdrop-blur-md rounded-full text-zinc-700 hover:text-primary-600 transition-colors shadow-2xs z-10"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-primary-600 text-primary-600' : ''}`} />
                      </button>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <Link to={`/berita/${article.id}`} className="block">
                          <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-2">
                            <span className="font-semibold text-primary-600 uppercase tracking-wide">{article.category}</span>
                            <span>{article.readTime}</span>
                          </div>
                          <h3 className="font-bold text-zinc-900 text-sm leading-snug group-hover:text-primary-600 transition-colors line-clamp-2 mb-1.5">
                            {article.title}
                          </h3>
                          <p className="text-zinc-600 text-xs line-clamp-2 leading-relaxed">
                            {article.excerpt}
                          </p>
                        </Link>

                        <div className="pt-3 mt-3 border-t border-zinc-100 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img 
                              src={article.authorAvatar} 
                              alt={article.author}
                              className="w-5 h-5 rounded-full object-cover" 
                            />
                            <div>
                              <div className="text-[11px] font-medium text-zinc-800 truncate max-w-[100px]">{article.author}</div>
                              <div className="text-[9px] text-zinc-400">{article.date}</div>
                            </div>
                          </div>
                          <Link 
                            to={`/berita/${article.id}`}
                            className="w-6 h-6 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors"
                          >
                            <ArrowUpRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {filteredNews.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-zinc-300">
                  <Newspaper className="w-10 h-10 text-zinc-300 mx-auto mb-2" />
                  <h3 className="text-zinc-800 font-semibold text-sm">Tidak ada warta yang sesuai</h3>
                  <p className="text-zinc-500 text-xs mt-1">Coba gunakan kata kunci pencarian lain atau pilih kategori Semua.</p>
                </div>
              )}

              {/* Clean Pagination Bar */}
              <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-zinc-200/80">
                <button className="px-3 py-1.5 rounded-lg border border-zinc-200 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 flex items-center gap-1">
                  <ChevronLeft className="w-3.5 h-3.5" /> Sebelumnya
                </button>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded-lg bg-primary-600 text-white text-xs font-bold shadow-xs">1</button>
                  <button className="w-8 h-8 rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 text-xs font-medium">2</button>
                  <button className="w-8 h-8 rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 text-xs font-medium">3</button>
                  <span className="px-1 text-xs text-zinc-400">...</span>
                  <button className="w-8 h-8 rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 text-xs font-medium">12</button>
                </div>
                <button className="px-3 py-1.5 rounded-lg border border-zinc-200 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 flex items-center gap-1">
                  Berikutnya <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>
          </div>

          {/* Right Sidebar Column (4/12) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Popular Searches Pills */}
            <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 uppercase tracking-wider mb-3">
                <TrendingUp className="w-3.5 h-3.5 text-primary-600" />
                Pencarian Populer
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map(tag => (
                  <button 
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-3 py-1 bg-zinc-50 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-700 transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Institutional Framework / Standard Mutu */}
            <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 uppercase tracking-wider mb-3">
                <ShieldCheck className="w-4 h-4 text-primary-600" />
                Standar Kurasi & Integritas
              </div>
              <ul className="space-y-2.5 text-xs text-zinc-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Verifikasi orisinalitas narasumber adat & pemuka kriya lokal</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Kajian berbasis arsip etnografi dan manuskrip resmi</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Standar pelaporan bebas kepentingan komersial sepihak</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Sinkronisasi data warisan budaya takbenda (WBTb)</span>
                </li>
              </ul>
              <div className="mt-4 pt-3 border-t border-zinc-100">
                <span className="text-xs font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1 cursor-pointer">
                  Pelajari metodologi kurasi kami <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Flash Intelligence Ticker Feed */}
            <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full animate-pulse" />
                  <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Kabar Singkat Terkini</h3>
                </div>
                <span className="text-[11px] font-semibold text-primary-600 hover:underline cursor-pointer">Semua</span>
              </div>

              <div className="divide-y divide-zinc-100">
                {latestIntelligence.map((item, idx) => (
                  <div key={idx} className="py-3 first:pt-0 last:pb-0 group cursor-pointer">
                    <div className="flex items-center gap-2 text-[10px] text-zinc-400 mb-1">
                      <span className="px-1.5 py-0.5 bg-zinc-100 text-zinc-700 font-semibold rounded text-[9px] uppercase">
                        {item.tag}
                      </span>
                      <span>•</span>
                      <span>{item.time}</span>
                    </div>
                    <p className="text-xs font-medium text-zinc-800 group-hover:text-primary-600 transition-colors leading-snug">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Research & Submission Card */}
            <div className="bg-zinc-950 text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 blur-2xl pointer-events-none rounded-full" />
              <div className="flex items-center gap-2 text-primary-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Send className="w-3.5 h-3.5" />
                Kirim Laporan Budaya
              </div>
              <h4 className="text-sm font-bold text-white leading-snug">
                Punya dokumentasi atau riset tradisi di daerah Anda?
              </h4>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Kirimkan naskah atau warta komunitas Anda ke dewan kurasi kami untuk ditinjau dan dipublikasikan.
              </p>
              <button className="w-full mt-4 py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2">
                Ajukan Warta / Riset <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Advisory / Disclaimer Info */}
            <div className="p-4 rounded-xl border border-zinc-200 bg-white text-xs text-zinc-500">
              <span className="font-semibold text-zinc-800">Berbudaya Media: </span>
              Kanal agregasi warta dan literasi seni budaya berbasis arsip independen terkurasi untuk memperkuat ekosistem kebudayaan Indonesia.
            </div>

          </aside>
        </div>

      </main>
    </div>
  );
}
