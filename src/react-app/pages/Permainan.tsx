import { useState } from 'react';
import { Link } from 'react-router';
import { 
  Puzzle, 
  HelpCircle, 
  Compass, 
  Trophy, 
  Sparkles, 
  Play, 
  Flame, 
  Users, 
  Clock, 
  ChevronRight, 
  Award,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import TopNavbar from '@/react-app/components/TopNavbar';

interface GameItem {
  id: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  path: string;
  badge: string;
  badgeTone: string;
  icon: any;
  image: string;
  players: string;
  duration: string;
  difficulty: string;
  tags: string[];
  stats: {
    label: string;
    value: string;
  };
}

const gamesList: GameItem[] = [
  {
    id: 'puzzle-budaya',
    title: 'Game Puzzle Budaya',
    tagline: 'Susun Kepingan Candi & Warisan Nusantara',
    category: 'Ketangkasan & Visual',
    description: 'Tantang persepsi visual dan ketelitian Anda merekonstruksi kepingan Candi Borobudur, Rumah Tongkonan, hingga motif Batik klasik nusantara dalam waktu terbaik.',
    path: '/games/puzzle-budaya',
    badge: 'Terpopuler',
    badgeTone: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    icon: Puzzle,
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1000&auto=format&fit=crop&q=80',
    players: '12.4k pemain',
    duration: '3 - 8 Menit',
    difficulty: 'Mudah • Sedang • Ahli',
    tags: ['Candi', 'Batik', 'Arsitektur Adat'],
    stats: {
      label: 'Skor Rekor Minggu Ini',
      value: '2.840 Pts'
    }
  },
  {
    id: 'kuis-budaya',
    title: 'Kuis Pintar Budaya',
    tagline: 'Asah Wawasan Tradisi, Falsafah & Sejarah',
    category: 'Edukasi & Asah Otak',
    description: 'Uji kedalaman wawasan nusantara melalui rangkaian trivia seputar kerajaan maritim, filosofi pusaka adat, alat musik etnik, dan fakta sejarah otentik.',
    path: '/games/kuis-budaya',
    badge: 'Tantangan Mingguan',
    badgeTone: 'bg-blue-50 text-blue-700 border-blue-200/80',
    icon: HelpCircle,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1000&auto=format&fit=crop&q=80',
    players: '8.9k pemain',
    duration: '5 Menit',
    difficulty: 'Multi-Pilihan Bertingkat',
    tags: ['Wayang', 'Sejarah', 'Alat Musik'],
    stats: {
      label: 'Akurasi Jawaban',
      value: '78% Rata-rata'
    }
  },
  {
    id: 'tebak-daerah',
    title: 'Tebak Daerah & Pakaian Adat',
    tagline: 'Kenali Busana Tradisi, Pusaka & Kuliner Khas',
    category: 'Eksplorasi Etnografi',
    description: 'Kenali asal provinsi dan identitas etnis dari petunjuk detail ragam hias kain tenun, mahkota adat, senjata pusaka, dan kekayaan kuliner rempah tradisional.',
    path: '/games/tebak-daerah',
    badge: 'Edisi Spesial',
    badgeTone: 'bg-purple-50 text-purple-700 border-purple-200/80',
    icon: Compass,
    image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e7?w=1000&auto=format&fit=crop&q=80',
    players: '6.1k pemain',
    duration: '4 Menit',
    difficulty: '38 Provinsi',
    tags: ['Kain Adat', 'Kuliner', 'Senjata'],
    stats: {
      label: 'Tingkat Keberhasilan',
      value: '84% Tuntas'
    }
  }
];

const miniShowcases = [
  {
    name: 'Tebak Candi Megah',
    type: 'Puzzle Visual',
    players: '4.2k',
    path: '/games/puzzle-budaya',
    image: 'https://images.unsplash.com/photo-1555400080-85a5debc4a23?w=400&auto=format&fit=crop&q=80'
  },
  {
    name: 'Motif Tenun Songket',
    type: 'Tebak Daerah',
    players: '3.1k',
    path: '/games/tebak-daerah',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&auto=format&fit=crop&q=80'
  }
];

export default function PermainanPage() {
  const [activeTab, setActiveTab] = useState<'semua' | 'puzzle' | 'kuis' | 'tebak'>('semua');
  const featured = gamesList[0];

  const filteredGames = gamesList.filter(game => {
    if (activeTab === 'puzzle') return game.id === 'puzzle-budaya';
    if (activeTab === 'kuis') return game.id === 'kuis-budaya';
    if (activeTab === 'tebak') return game.id === 'tebak-daerah';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      <TopNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        
        {/* ========================================================= */}
        {/* HERO SECTION: Ruang Budaya Consistent Cultural Palette */}
        {/* ========================================================= */}
        <section className="relative rounded-lg overflow-hidden bg-white border border-slate-200/90 shadow-sm mb-10">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-8">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary-50 border border-primary-200/80 rounded-md text-[11px] font-semibold text-primary-700 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-600" />
                  Eksplorasi Budaya Interaktif
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-snug mb-3">
                  Uji Wawasan, Hidupkan Tradisi.
                </h1>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                  Selami kekayaan nusantara melalui tantangan interaktif. Rekonstruksi relief candi, bedah falsafah pusaka, dan taklukkan teka-teki budaya Indonesia.
                </p>
              </div>

              {/* Action Button & Metric */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to={featured.path}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white hover:bg-primary-700 rounded-md text-xs sm:text-sm font-medium transition-all shadow-xs active:scale-[0.98]"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Mulai Game Populer
                </Link>

                <div className="flex items-center gap-2 px-3.5 py-2 bg-slate-50 border border-slate-200/90 rounded-md text-xs text-slate-600">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-semibold text-slate-900">27.400+</span> Sesi Dimainkan
                </div>
              </div>
            </div>

            {/* Center Hero Focal Image */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-full max-w-sm group">
                <div className="relative aspect-[4/3] sm:aspect-[4/5] rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=80"
                    alt={featured.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                  
                  {/* Floating Tag inside Hero Image */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/95 text-[11px] font-semibold text-slate-900 shadow-xs">
                      <Trophy className="w-3 h-3 text-amber-500" />
                      Highlight Utama
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[11px] text-slate-300 font-medium">{featured.category}</p>
                    <h3 className="text-base font-bold text-white mb-0.5">{featured.title}</h3>
                    <p className="text-xs text-slate-200/90 line-clamp-1">{featured.tagline}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Mini-Cards List */}
            <div className="lg:col-span-3 flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-0.5">
                <span>Pilihan Lainnya</span>
                <span className="text-slate-400 font-normal">Cepat Akses</span>
              </div>

              {miniShowcases.map((mini, idx) => (
                <Link
                  key={idx}
                  to={mini.path}
                  className="group flex items-center gap-3 p-2.5 bg-slate-50/70 border border-slate-200/80 hover:border-primary-400 hover:bg-white rounded-lg transition-all shadow-xs"
                >
                  <img
                    src={mini.image}
                    alt={mini.name}
                    className="w-12 h-12 rounded-md object-cover border border-slate-200 shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-medium text-slate-400 block">{mini.type}</span>
                    <h4 className="text-xs font-semibold text-slate-900 truncate group-hover:text-primary-600 transition-colors">
                      {mini.name}
                    </h4>
                    <span className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                      <Users className="w-3 h-3 text-slate-400" />
                      {mini.players} main
                    </span>
                  </div>
                  <div className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-primary-600 group-hover:border-primary-600 group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-600">
                <p className="font-semibold text-slate-800 mb-0.5">Papan Peringkat Aktif</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">Skor terakumulasi otomatis ke profil setiap kali kamu menyelesaikan game.</p>
              </div>
            </div>

          </div>
        </section>


        {/* ========================================================= */}
        {/* LOWER SECTION: Header + Bento Grid Cards (Sesuai Referensi Gambar 2 Bawah) */}
        {/* ========================================================= */}
        <section className="mb-14">
          
          {/* Section Header dengan Proporsi Jelas */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-stone-200">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 block mb-1">
                Koleksi Wahana Edukatif
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-stone-950 tracking-tight">
                Jelajahi Berbagai Macam Permainan
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 max-w-md md:text-right leading-relaxed">
              Mulai dari tantangan visual puzzle, kuis pengetahuan nusantara, hingga tebak busana dan pusaka tradisional.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'semua', label: 'Semua Arena' },
              { id: 'puzzle', label: 'Puzzle Budaya' },
              { id: 'kuis', label: 'Kuis Sejarah' },
              { id: 'tebak', label: 'Tebak Daerah' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white shadow-xs font-semibold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Asymmetric Bento / Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredGames.map((game) => {
              const Icon = game.icon;
              return (
                <div
                  key={game.id}
                  className="group bg-white rounded-lg border border-slate-200/90 hover:border-primary-300 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between overflow-hidden"
                >
                  {/* Top Image Preview Card */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                    
                    {/* Floating Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border shadow-xs bg-white/95 text-slate-800`}>
                        {game.badge}
                      </span>
                      <div className="w-7 h-7 rounded-md bg-white/95 flex items-center justify-center text-slate-700 shadow-xs">
                        <Icon className="w-3.5 h-3.5 text-primary-600" />
                      </div>
                    </div>

                    {/* Bottom Metadata inside Image */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
                      <span className="flex items-center gap-1 font-medium bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-xs">
                        <Clock className="w-3.5 h-3.5 text-stone-300" />
                        {game.duration}
                      </span>
                      <span className="font-medium bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-xs">
                        {game.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {game.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-serif font-bold text-stone-950 text-lg mb-1 group-hover:text-amber-800 transition-colors">
                        {game.title}
                      </h3>

                      <p className="text-xs font-medium text-amber-800/90 mb-2">
                        {game.tagline}
                      </p>

                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                        {game.description}
                      </p>
                    </div>

                    {/* Bottom Stats & Action Bar */}
                    <div>
                      <div className="pt-3 mb-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-stone-400" />
                          {game.players}
                        </span>
                        <span className="font-semibold text-stone-800">
                          {game.stats.value}
                        </span>
                      </div>

                      <Link
                        to={game.path}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-stone-900 text-white hover:bg-stone-800 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 shadow-xs hover:shadow active:scale-[0.98]"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Mainkan Sekarang
                      </Link>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </section>


        {/* ========================================================= */}
        {/* BANNER PROMOSI KOMUNITAS & LEADERBOARD (Clean & Tactile) */}
        {/* ========================================================= */}
        <section className="bg-slate-900 text-white rounded-lg p-6 sm:p-8 border border-slate-800 relative overflow-hidden shadow-sm">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 rounded-md text-[11px] font-semibold text-primary-300 mb-3 border border-white/10">
                <Award className="w-3.5 h-3.5" />
                Sistem Papan Peringkat Budaya
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                Tantang Rekan Komunitas & Rebut Posisi Teratas
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Setiap keberhasilan menyelesaikan puzzle dan kuis menambah poin reputasi adat Anda di komunitas RuangBudaya. Buktikan wawasan kebudayaan nusantaramu sekarang!
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/komunitas"
                className="px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-md text-xs sm:text-sm transition-all shadow-xs active:scale-[0.98]"
              >
                Kunjungi Komunitas
              </Link>
              <Link
                to="/jaringan"
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-md text-xs sm:text-sm transition-all border border-slate-700 active:scale-[0.98]"
              >
                Lihat Peringkat
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
