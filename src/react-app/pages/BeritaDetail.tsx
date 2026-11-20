import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Check, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  Send,
  Building2
} from 'lucide-react';
import TopNavbar from '@/react-app/components/TopNavbar';
import { newsArticles, popularSearches, latestIntelligence, type NewsItem } from '@/react-app/data/newsData';
import { communitiesData } from '@/react-app/data/communitiesData';

export default function BeritaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Cari berita di newsArticles utama terlebih dahulu
  let article: NewsItem | undefined = newsArticles.find(item => item.id === Number(id));

  // Simpan ref lembaga jika berita berasal dari lembaga
  let matchedLembaga = communitiesData.find(c => 
    c.name.toLowerCase() === (article?.source || '').toLowerCase() ||
    c.name.toLowerCase() === (article?.author || '').toLowerCase() ||
    (article?.source && c.name.toLowerCase().includes(article.source.toLowerCase())) ||
    (article?.source && article.source.toLowerCase().includes(c.name.toLowerCase()))
  );

  // Jika tidak ditemukan di data berita utama, cari otomatis di rilis lembaga (communitiesData)
  if (!article) {
    for (const comm of communitiesData) {
      const foundInLembaga = (comm.newsList || []).find(n => n.id === Number(id));
      if (foundInLembaga) {
        matchedLembaga = comm;
        article = {
          id: foundInLembaga.id,
          slug: `rilis-${foundInLembaga.id}`,
          title: foundInLembaga.title,
          category: foundInLembaga.category || comm.category || 'Warta Lembaga',
          subCategory: 'Rilis Resmi Lembaga',
          image: foundInLembaga.image,
          excerpt: foundInLembaga.excerpt,
          content: foundInLembaga.content || [foundInLembaga.excerpt],
          author: comm.name,
          authorRole: 'Lembaga Resmi Kebudayaan',
          authorAvatar: comm.avatarImage || comm.image,
          date: foundInLembaga.date,
          readTime: foundInLembaga.readTime,
          tags: ['Rilis Lembaga', comm.name, comm.category],
          source: comm.name
        };
        break;
      }
    }
  }

  // Jika matchedLembaga belum terisi (misal artikel dari newsArticles), pastikan matchedLembaga dicari ulang
  if (!matchedLembaga && article) {
    matchedLembaga = communitiesData.find(c => 
      c.name.toLowerCase() === (article?.source || '').toLowerCase() ||
      c.name.toLowerCase() === (article?.author || '').toLowerCase() ||
      (article?.source && c.name.toLowerCase().includes(article.source.toLowerCase())) ||
      (article?.source && article.source.toLowerCase().includes(c.name.toLowerCase()))
    );
  }

  // Related articles from same or similar category
  const relatedArticles = newsArticles
    .filter(item => item.id !== Number(id))
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] text-slate-900 font-poppins antialiased">
        <TopNavbar />
        <main className="max-w-4xl mx-auto px-4 py-20 pt-28 text-center">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-10 shadow-xs">
            <h1 className="text-xl font-bold text-slate-900 mb-2">Laporan Warta Tidak Ditemukan</h1>
            <p className="text-xs text-slate-500 mb-6">Warta yang Anda cari mungkin telah dipindahkan atau diarsipkan.</p>
            <Link 
              to="/berita" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-xs font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke Indeks Warta
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-slate-900 font-poppins antialiased">
      <TopNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-20 pb-16">
        {/* Back Button Navigation Bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center gap-2 text-base font-medium text-blue-700 hover:text-blue-800 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Kembali</span>
          </button>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="p-2 bg-white border border-slate-200/90 rounded-lg text-slate-700 hover:text-primary-600 shadow-2xs transition-all"
              title="Simpan Warta"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-primary-600 text-primary-600' : ''}`} />
            </button>
            <button 
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200/90 rounded-lg text-xs font-medium text-slate-700 hover:text-primary-600 shadow-2xs transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tautan Disalin!' : 'Bagikan'}</span>
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Layout (8 / 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Article Content (8 Cols) */}
          <article className="lg:col-span-8 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-9 shadow-xs">
            {/* Publisher & Metadata */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 bg-primary-50 text-primary-700 border border-primary-200/60 rounded-md text-[11px] font-bold uppercase tracking-wider">
                {article.source || 'Warta Kebudayaan'}
              </span>
            </div>

            {/* Article Headline */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 leading-snug sm:leading-tight">
              {article.title}
            </h1>

            {/* Sub-headline / Excerpt */}
            <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal border-l-2 border-primary-600 pl-3.5 italic bg-slate-50/50 py-1.5 rounded-r-md">
              {article.excerpt}
            </p>

            {/* Author / Institution Bio & Timestamps */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 my-6 border-y border-slate-100">
              {matchedLembaga ? (
                <Link 
                  to={`/lembaga/${matchedLembaga.id}`}
                  className="flex items-center gap-3 group/author hover:opacity-90 transition-opacity"
                  title={`Lihat Profil Lembaga ${matchedLembaga.name}`}
                >
                  <img 
                    src={matchedLembaga.avatarImage || matchedLembaga.image || article.authorAvatar} 
                    alt={matchedLembaga.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-500/20 group-hover/author:ring-primary-600 transition-all"
                  />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover/author:text-primary-600 transition-colors flex items-center gap-1.5">
                      <span>{matchedLembaga.name}</span>
                      <Building2 className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <span>{matchedLembaga.institutionType || 'Lembaga Resmi Kebudayaan'}</span>
                      <span className="text-primary-600 font-medium">· Lihat Profil Lembaga &rarr;</span>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="flex items-center gap-3">
                  <img 
                    src={article.authorAvatar} 
                    alt={article.author}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900">{article.author}</div>
                    <div className="text-[11px] text-slate-500">{article.authorRole || 'Lembaga Kebudayaan'}</div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {article.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {article.readTime}
                </span>
              </div>
            </div>

            {/* Hero Banner Image */}
            <div className="rounded-xl overflow-hidden bg-slate-100 mb-6 border border-slate-200/80">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-[280px] sm:h-[400px] object-cover"
              />
              {article.source && (
                <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>
                    Sumber / Dokumentasi Resmi:{' '}
                    {matchedLembaga ? (
                      <Link 
                        to={`/lembaga/${matchedLembaga.id}`}
                        className="font-semibold text-primary-700 hover:text-primary-800 hover:underline"
                        title={`Kunjungi Lembaga ${matchedLembaga.name}`}
                      >
                        {article.source}
                      </Link>
                    ) : (
                      <span className="font-semibold text-slate-700">{article.source}</span>
                    )}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-medium">Terverifikasi Digital</span>
                </div>
              )}
            </div>

            {/* Body Text Paragraphs */}
            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed tracking-normal font-normal">
              {article.content.map((paragraph, idx) => (
                <p key={idx} className="text-justify sm:text-left">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags & Keywords */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                  Kata Kunci & Indeks Arsip:
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}


            {/* Bottom Related Articles Section */}
            <div className="mt-10 pt-8 border-t border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900 tracking-tight">Warta Terkait Lainnya</h3>
                <Link to="/berita" className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
                  Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map(rel => (
                  <Link 
                    key={rel.id} 
                    to={`/berita/${rel.id}`}
                    className="group bg-slate-50 hover:bg-white border border-slate-200/80 rounded-xl p-3.5 transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-28 rounded-lg overflow-hidden mb-2.5 bg-slate-200">
                        <img 
                          src={rel.image} 
                          alt={rel.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <span className="text-[10px] font-bold text-primary-600 uppercase tracking-wider">{rel.source || 'Warta'}</span>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-2 mt-1 group-hover:text-primary-600 transition-colors leading-snug">
                        {rel.title}
                      </h4>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-2.5 pt-2 border-t border-slate-200/60">
                      {rel.date}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </article>

          {/* Sidebar Column (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Quick Context Card */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
              <div className="text-primary-600 text-xs font-semibold uppercase tracking-wider mb-2">
                Kurasi Arsip Budaya
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                Pilar Pelestarian & Integritas Publikasi
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Setiap materi warta ini telah dikonfirmasi narasumber kriya daerah dan diverifikasi dokumen adatnya untuk menjamin keaslian sejarah.
              </p>
            </div>

            {/* Popular Searches */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                <TrendingUp className="w-3.5 h-3.5 text-primary-600" />
                Pencarian Populer
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map(tag => (
                  <Link 
                    key={tag}
                    to="/berita"
                    className="px-3 py-1 bg-slate-50 hover:bg-primary-50 hover:text-primary-600 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 transition-all"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Standard Kurasi */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                <ShieldCheck className="w-4 h-4 text-primary-600" />
                Standar Kurasi & Integritas
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
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
              </ul>
            </div>

            {/* Kabar Singkat Feed */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full animate-pulse" />
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Kabar Singkat Terkini</h3>
                </div>
                <Link to="/berita" className="text-[11px] font-semibold text-primary-600 hover:underline">Semua</Link>
              </div>

              <div className="divide-y divide-slate-100">
                {latestIntelligence.map((item, idx) => (
                  <div key={idx} className="py-3 first:pt-0 last:pb-0 group">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1">
                      <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 font-semibold rounded text-[9px] uppercase">
                        {item.tag}
                      </span>
                      <span>•</span>
                      <span>{item.time}</span>
                    </div>
                    <p className="text-xs font-medium text-slate-800 group-hover:text-primary-600 transition-colors leading-snug">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Send Report */}
            <div className="bg-slate-950 text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 blur-2xl pointer-events-none rounded-full" />
              <div className="flex items-center gap-2 text-primary-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Send className="w-3.5 h-3.5" />
                Kirim Laporan Budaya
              </div>
              <h4 className="text-sm font-bold text-white leading-snug">
                Punya dokumentasi atau riset tradisi di daerah Anda?
              </h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Kirimkan naskah atau warta komunitas Anda ke dewan kurasi kami untuk ditinjau.
              </p>
              <button 
                onClick={() => alert('Fitur kirim warta sedang disiapkan.')}
                className="w-full mt-4 py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
              >
                Ajukan Warta / Riset
              </button>
            </div>

          </aside>
        </div>

      </main>
    </div>
  );
}
