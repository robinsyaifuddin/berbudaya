import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronDown, Check } from 'lucide-react';
import TopNavbar from '@/react-app/components/TopNavbar';
import CommunitySidebar from '@/react-app/components/CommunitySidebar';

interface Campaign {
  id: number;
  title: string;
  description: string;
  image: string;
  raised: number;
  target: number;
  daysLeft: number;
  donors: number;
  category: string;
  location: string;
  urgent?: boolean;
  badge?: string;
  organizer: string;
  verified: boolean;
}

const campaigns: Campaign[] = [
  {
    id: 1,
    title: 'Revitalisasi Sanggar Tari Topeng Cirebon Gaya Slangit & Klana',
    description: 'Bantu renovasi ruang latihan sanggar maestro sepuh Mimi Rasinah dan pengadaan 30 set topeng kayu jaranan untuk anak-anak pedesaan Cirebon.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
    raised: 38450000,
    target: 50000000,
    daysLeft: 18,
    donors: 326,
    category: 'Seni Teater & Tari',
    location: 'Cirebon, Jawa Barat',
    urgent: true,
    badge: 'Mendesak & Terverifikasi',
    organizer: 'Yayasan Pelestari Tari Topeng Nusantara',
    verified: true
  },
  {
    id: 2,
    title: 'Digitalisasi & Konservasi 150 Naskah Lontar Kuno Puri Karangasem',
    description: 'Penyelamatan naskah kuno berbahan daun lontar berisi pengobatan Usada Bali dan sastra Jawa Kuno melalui pemindaian multi-spektral dan preservasi fisik.',
    image: 'https://images.unsplash.com/photo-1582735689851-574f29054c5f?w=600&h=400&fit=crop',
    raised: 62700000,
    target: 75000000,
    daysLeft: 24,
    donors: 512,
    category: 'Manuskrip & Cagar Budaya',
    location: 'Karangasem, Bali',
    urgent: false,
    badge: 'Warisan Dunia',
    organizer: 'Komunitas Pusaka Aksara & Sastra Lontar Bali',
    verified: true
  },
  {
    id: 3,
    title: 'Pembangunan Kembali Rumah Adat Uma Kelada Sumba Pasca Erosi',
    description: 'Gotong royong membangun kembali rumah panggung bertingkat atap menara tradisi Marapu di Desa Adat Praiyawang yang ambruk akibat pergeseran tanah.',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&h=400&fit=crop',
    raised: 41800000,
    target: 80000000,
    daysLeft: 35,
    donors: 284,
    category: 'Arsitektur Vernakular',
    location: 'Sumba Timur, NTT',
    urgent: true,
    badge: 'Gotong Royong',
    organizer: 'Lembaga Adat Kampung Praiyawang & Mitra Arsitektur Nusantara',
    verified: true
  },
  {
    id: 4,
    title: 'Restorasi Ukiran & Fondasi Pendopo Ageng Pura Mangkunegaran',
    description: 'Konservasi tiang jati lawas saka guru dan ornamen langit-langit batik Kumudowati yang telah berusia lebih dari dua abad.',
    image: 'https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?w=600&h=400&fit=crop',
    raised: 55000000,
    target: 95000000,
    daysLeft: 42,
    donors: 418,
    category: 'Cagar Budaya',
    location: 'Surakarta, Jawa Tengah',
    badge: 'Cagar Budaya Nasional',
    organizer: 'Kerabat Pusaka Mangkunegaran',
    verified: true
  },
  {
    id: 5,
    title: 'Pengadaan Alat Tenun Panta untuk 25 Penenun Sepuh Songket Pandai Sikek',
    description: 'Bantu peremajaan alat tenun kayu tradisional agar ibu-ibu penenun sepuh di Tanah Datar tetap produktif dan dapat mewariskan ilmunya.',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=400&fit=crop',
    raised: 28900000,
    target: 40000000,
    daysLeft: 29,
    donors: 275,
    category: 'Kriya Tradisional',
    location: 'Tanah Datar, Sumatera Barat',
    badge: 'Pemberdayaan Perempuan',
    organizer: 'Koperasi Tenun Harapan Ibu',
    verified: true
  },
  {
    id: 6,
    title: 'Pelatihan Regenerasi Pengrajin Gamelan Perunggu Desa Wirun',
    description: 'Program magang 2 tahun bagi 20 pemuda desa untuk mendalami seni menempa bilah perunggu gamelan kualitas agung.',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop',
    raised: 31200000,
    target: 45000000,
    daysLeft: 50,
    donors: 310,
    category: 'Musik & Tradisi',
    location: 'Sukoharjo, Jawa Tengah',
    badge: 'Regenerasi Maestro',
    organizer: 'Paguyuban Pande Perunggu Wirun',
    verified: true
  },
  {
    id: 7,
    title: 'REVITALISASI RUMAH ADAT TONGKONAN TORAJA',
    description: 'Puluhan rumah adat Tongkonan mengalami kerusakan parah. Proyek ini akan merestorasi 15 rumah adat dengan tetap mempertahankan teknik konstruksi tradisional.',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&h=400&fit=crop',
    raised: 52000000,
    target: 120000000,
    daysLeft: 150,
    donors: 678,
    category: 'Pelestarian',
    location: 'Tana Toraja, Sulawesi Selatan',
    badge: 'Warisan Budaya Tak Benda',
    organizer: 'Pemerintah Daerah Tana Toraja',
    verified: true
  },
  {
    id: 8,
    title: 'DOKUMENTER: PERJALANAN GAMELAN JAWA DI ERA MODERN',
    description: 'Produksi film dokumenter tentang kehidupan pengrajin dan pemain gamelan. Film ini akan ditayangkan di festival internasional dan platform streaming.',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop',
    raised: 15750000,
    target: 45000000,
    daysLeft: 45,
    donors: 423,
    category: 'Seni & Budaya',
    location: 'Jawa Tengah & DIY',
    badge: 'Proyek Film Dokumenter',
    organizer: 'Rumah Produksi Nusantara Films',
    verified: true
  },
  {
    id: 9,
    title: 'WORKSHOP BATIK GRATIS UNTUK 1000 SISWA SD DI PEKALONGAN',
    description: 'Kenalkan seni batik sejak dini melalui workshop interaktif. Setiap siswa akan mendapat kit batik dan sertifikat dari Balai Batik Indonesia.',
    image: 'https://images.unsplash.com/photo-1609619385002-f40f5e5bae7f?w=600&h=400&fit=crop',
    raised: 8500000,
    target: 25000000,
    daysLeft: 35,
    donors: 267,
    category: 'Pendidikan',
    location: 'Pekalongan, Jawa Tengah',
    badge: 'Program Pendidikan Anak',
    organizer: 'Balai Batik Pekalongan',
    verified: true
  },
  {
    id: 10,
    title: 'MUSEUM INTERAKTIF BUDAYA NUSANTARA: TEKNOLOGI VR & AR',
    description: 'Bangun museum modern dengan teknologi VR/AR untuk pengalaman belajar budaya yang immersive. Targetkan 100 ribu pengunjung per tahun.',
    image: 'https://images.unsplash.com/photo-1566738780863-f9608f88f3a9?w=600&h=400&fit=crop',
    raised: 125000000,
    target: 300000000,
    daysLeft: 180,
    donors: 1567,
    category: 'Pelestarian',
    location: 'Jakarta Pusat',
    badge: 'Proyek Infrastruktur Budaya',
    organizer: 'Kementerian Pendidikan & Kebudayaan',
    verified: true
  },
  {
    id: 11,
    title: 'PELATIHAN UKIR KAYU ASMAT UNTUK GENERASI MUDA PAPUA',
    description: 'Seni ukir Asmat terancam punah karena kurangnya regenerasi. Program ini melatih 100 pemuda Papua dalam seni ukir tradisional selama 1 tahun.',
    image: 'https://images.unsplash.com/photo-1582735689851-574f29054c5f?w=600&h=400&fit=crop',
    raised: 12000000,
    target: 40000000,
    daysLeft: 90,
    donors: 234,
    category: 'Ekonomi Kreatif',
    location: 'Asmat, Papua Selatan',
    badge: 'Program Pemberdayaan Pemuda',
    organizer: 'Yayasan Asmat Lestari',
    verified: true
  },
  {
    id: 12,
    title: 'KONSERVASI TARI SAMAN: REKAM & DOKUMENTASI 100 GERAKAN',
    description: 'Tari Saman Aceh adalah Warisan Budaya Tak Benda UNESCO. Proyek ini mendokumentasikan setiap gerakan dalam format digital HD untuk pembelajaran global.',
    image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=600&h=400&fit=crop',
    raised: 18000000,
    target: 35000000,
    daysLeft: 60,
    donors: 445,
    category: 'Seni & Budaya',
    location: 'Gayo Lues, Aceh',
    badge: 'Warisan UNESCO',
    organizer: 'Sanggar Tari Saman Aceh',
    verified: true
  }
];

const categories = ['Semua', 'Pelestarian', 'Seni & Budaya', 'Pendidikan', 'Ekonomi Kreatif', 'Acara Budaya'];
const regions = ['Semua', 'Jawa', 'Sumatera', 'Kalimantan', 'Sulawesi', 'Papua', 'Bali & Nusa Tenggara'];
const sortOptions = ['Terbaru', 'Paling Banyak Donatur', 'Paling Dekat Deadline', 'Target Terbesar'];

export default function CrowdfundingPage() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedRegion, setSelectedRegion] = useState('Semua');
  const [selectedSort, setSelectedSort] = useState('Terbaru');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = (raised: number, target: number) => {
    return Math.min((raised / target) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 pt-18 sm:pt-20 pb-20 md:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Community */}
          <div className="hidden lg:block lg:col-span-3">
            <CommunitySidebar />
          </div>

          {/* Mobile Community Banner */}
          <div className="lg:hidden bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-sm text-gray-900 mb-1">Lestarikan Budaya Bersama</h3>
                <p className="text-xs text-gray-600">Gabung komunitas budaya dan mulai campaign Anda</p>
              </div>
              <Link 
                to="/komunitas"
                className="ml-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                Buat Komunitas
              </Link>
            </div>
          </div>

          {/* Right Content - Campaigns */}
          <div className="col-span-1 lg:col-span-9">
            {/* Page Title */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Galang Dana untuk Pelestarian Budaya Nusantara</h1>
              <p className="text-gray-600 text-sm">Menampilkan <span className="font-semibold">12 proyek</span> dari <span className="font-semibold">50+ proyek</span> kebudayaan aktif</p>
            </div>

        {/* Header with Filters */}
        <div className="bg-white rounded-lg shadow-xs border border-slate-200/90 p-3 sm:p-3.5 mb-5 relative">
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">Filter</span>
              
              {/* Category Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowCategoryDropdown(!showCategoryDropdown);
                    setShowRegionDropdown(false);
                    setShowSortDropdown(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 border border-slate-200 rounded-md text-xs sm:text-sm font-medium text-slate-700 hover:border-slate-300 bg-slate-50/50 hover:bg-white transition-colors"
                >
                  <span>{selectedCategory}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
                {showCategoryDropdown && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowCategoryDropdown(false)} />
                    <div className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-xl border border-slate-200 z-50 min-w-[200px] py-1">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setShowCategoryDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center justify-between transition-colors"
                        >
                          <span className="text-xs sm:text-sm text-slate-700">{cat}</span>
                          {selectedCategory === cat && <Check className="w-4 h-4 text-blue-600" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Region Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowRegionDropdown(!showRegionDropdown);
                    setShowCategoryDropdown(false);
                    setShowSortDropdown(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 border border-slate-200 rounded-full text-xs sm:text-sm font-medium text-slate-700 hover:border-slate-400 bg-slate-50/50 hover:bg-white transition-colors"
                >
                  <span>{selectedRegion}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
                {showRegionDropdown && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowRegionDropdown(false)} />
                    <div className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-xl border border-slate-200 z-50 min-w-[200px] py-1">
                      {regions.map((reg) => (
                        <button
                          key={reg}
                          onClick={() => {
                            setSelectedRegion(reg);
                            setShowRegionDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center justify-between transition-colors"
                        >
                          <span className="text-xs sm:text-sm text-slate-700">{reg}</span>
                          {selectedRegion === reg && <Check className="w-4 h-4 text-blue-600" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSortDropdown(!showSortDropdown);
                  setShowCategoryDropdown(false);
                  setShowRegionDropdown(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 border border-slate-200 rounded-full text-xs sm:text-sm font-medium text-slate-700 hover:border-slate-400 bg-slate-50/50 hover:bg-white transition-colors"
              >
                <span>{selectedSort}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {showSortDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowSortDropdown(false)} />
                  <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-xl border border-slate-200 z-50 min-w-[220px] py-1">
                    {sortOptions.map((sort) => (
                      <button
                        key={sort}
                        onClick={() => {
                          setSelectedSort(sort);
                          setShowSortDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center justify-between transition-colors"
                      >
                        <span className="text-xs sm:text-sm text-slate-700">{sort}</span>
                        {selectedSort === sort && <Check className="w-4 h-4 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Campaign Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {campaigns.map((campaign) => {
            const progress = calculateProgress(campaign.raised, campaign.target);
            return (
              <Link
                key={campaign.id}
                to={`/crowdfunding/${campaign.id}`}
                className="group bg-white rounded-lg overflow-hidden shadow-xs hover:shadow-sm border border-slate-200/90 hover:border-primary-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Campaign Image */}
                  <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {campaign.urgent && (
                      <div className="absolute top-2.5 left-2.5 bg-rose-600 text-white px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wide uppercase shadow-xs">
                        Prioritas Restorasi
                      </div>
                    )}
                    {campaign.badge && (
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-2.5 pt-5">
                        <p className="text-white text-xs font-semibold">{campaign.badge}</p>
                      </div>
                    )}
                  </div>

                  {/* Campaign Content */}
                  <div className="p-3.5 sm:p-4">
                    <span className="inline-block px-2 py-0.5 mb-2 text-[10px] font-medium text-primary-700 bg-primary-50 rounded-md border border-primary-100">
                      {campaign.category}
                    </span>
                    <h3 className="font-semibold text-slate-900 text-xs sm:text-sm mb-1.5 line-clamp-2 min-h-[38px] group-hover:text-primary-600 transition-colors leading-snug">
                      {campaign.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-600 mb-3 line-clamp-2 min-h-[32px] leading-relaxed">
                      {campaign.description}
                    </p>

                    {/* Organizer */}
                    <div className="flex items-center gap-1.5 mb-3 text-xs text-slate-500">
                      <span className="truncate">{campaign.organizer}</span>
                      {campaign.verified && (
                        <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-blue-600 text-white text-[8px] font-bold shrink-0">✓</span>
                      )}
                    </div>

                    {/* Progress Bar & Stats */}
                    <div className="pt-2 border-t border-slate-100">
                      <div className="w-full bg-slate-100 rounded-full h-2 mb-2.5 overflow-hidden">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Terkumpul</span>
                          <p className="font-bold text-slate-900">{formatCurrency(campaign.raised)}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Sisa Waktu</span>
                          <p className="font-bold text-slate-900">{campaign.daysLeft} hari</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <div className="w-full text-center py-2 bg-slate-50 group-hover:bg-blue-600 text-slate-700 group-hover:text-white rounded-xl text-xs font-semibold transition-colors">
                    Salurkan Dukungan Budaya →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors">
            Muat Lebih Banyak
          </button>
        </div>
          </div>
          {/* End Right Content */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Container */}
    </div>
  );
}
