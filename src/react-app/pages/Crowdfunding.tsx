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
    title: 'RESTORASI CANDI BOROBUDUR: SELAMATKAN WARISAN DUNIA UNESCO',
    description: 'Candi Borobudur mengalami kerusakan akibat gempa dan erosi. Bantu restorasi relief dan struktur candi agar tetap kokoh untuk generasi mendatang.',
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&h=400&fit=crop',
    raised: 45250000,
    target: 100000000,
    daysLeft: 45,
    donors: 1245,
    category: 'Pelestarian',
    location: 'Magelang, Jawa Tengah',
    urgent: true,
    badge: 'URGENT! Restorasi Segera Diperlukan',
    organizer: 'Yayasan Warisan Budaya Indonesia',
    verified: true
  },
  {
    id: 2,
    title: 'SELAMATKAN PENGRAJIN BATIK TULIS SOLO DARI KEPUNAHAN',
    description: 'Pengrajin batik tulis tradisional Solo terancam gulung tikar. Bantu mereka dengan modal usaha, pelatihan, dan akses pasar yang lebih luas.',
    image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=600&h=400&fit=crop',
    raised: 18750000,
    target: 35000000,
    daysLeft: 30,
    donors: 456,
    category: 'Ekonomi Kreatif',
    location: 'Solo, Jawa Tengah',
    urgent: true,
    badge: 'URGENT! 50+ Pengrajin Terancam',
    organizer: 'Komunitas Batik Nusantara',
    verified: true
  },
  {
    id: 3,
    title: 'DIGITALISASI MANUSKRIP KUNO NUSANTARA',
    description: 'Ratusan naskah kuno dan manuskrip berusia 300+ tahun terancam rusak. Proyek digitalisasi ini akan mengabadikan warisan intelektual nenek moyang kita.',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=400&fit=crop',
    raised: 22500000,
    target: 50000000,
    daysLeft: 60,
    donors: 789,
    category: 'Pendidikan',
    location: 'Jakarta & Yogyakarta',
    badge: 'Program Prioritas Nasional',
    organizer: 'Perpustakaan Nasional RI',
    verified: true
  },
  {
    id: 4,
    title: 'BANGUN SANGGAR SENI WAYANG UNTUK ANAK MUDA',
    description: 'Seni wayang kulit mulai ditinggalkan generasi muda. Mari bangun sanggar modern dengan fasilitas lengkap untuk menarik minat anak muda melestarikan wayang.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
    raised: 35000000,
    target: 75000000,
    daysLeft: 90,
    donors: 567,
    category: 'Seni & Budaya',
    location: 'Yogyakarta',
    badge: 'Investasi Masa Depan Wayang',
    organizer: 'Yayasan Seni Pewayangan Indonesia',
    verified: true
  },
  {
    id: 5,
    title: 'FESTIVAL TENUN NUSANTARA 2025: LESTARIKAN 100+ MOTIF TRADISIONAL',
    description: 'Gelar festival tenun terbesar se-Indonesia untuk mempromosikan 100+ motif tenun dari Sabang sampai Merauke dan memberdayakan 500+ penenun lokal.',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=400&fit=crop',
    raised: 42000000,
    target: 80000000,
    daysLeft: 75,
    donors: 892,
    category: 'Acara Budaya',
    location: 'Jakarta Convention Center',
    badge: 'Event Nasional 2025',
    organizer: 'Dekranasda Indonesia',
    verified: true
  },
  {
    id: 6,
    title: 'PROGRAM BEASISWA DALANG MUDA: REGENERASI PEWAYANGAN',
    description: 'Hanya tersisa 200 dalang profesional di Indonesia. Program ini akan memberikan beasiswa penuh selama 3 tahun untuk 50 calon dalang muda berbakat.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop',
    raised: 28500000,
    target: 60000000,
    daysLeft: 120,
    donors: 345,
    category: 'Pendidikan',
    location: 'Surakarta',
    badge: 'Program Jangka Panjang',
    organizer: 'Institut Seni Indonesia Surakarta',
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
      <div className="max-w-7xl mx-auto px-4 py-6 pt-20">
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 relative">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Filter</span>
              
              {/* Category Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowCategoryDropdown(!showCategoryDropdown);
                    setShowRegionDropdown(false);
                    setShowSortDropdown(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-gray-400 transition-colors"
                >
                  <span>Kategori</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showCategoryDropdown && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowCategoryDropdown(false)} />
                    <div className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-xl border border-gray-200 z-50 min-w-[200px]">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setShowCategoryDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between"
                        >
                          <span className="text-sm">{cat}</span>
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
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-gray-400 transition-colors"
                >
                  <span>Wilayah</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showRegionDropdown && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowRegionDropdown(false)} />
                    <div className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-xl border border-gray-200 z-50 min-w-[200px]">
                      {regions.map((reg) => (
                        <button
                          key={reg}
                          onClick={() => {
                            setSelectedRegion(reg);
                            setShowRegionDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between"
                        >
                          <span className="text-sm">{reg}</span>
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
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-gray-400 transition-colors"
              >
                <span>Urutkan</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showSortDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowSortDropdown(false)} />
                  <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border border-gray-200 z-50 min-w-[220px]">
                    {sortOptions.map((sort) => (
                      <button
                        key={sort}
                        onClick={() => {
                          setSelectedSort(sort);
                          setShowSortDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between"
                      >
                        <span className="text-sm">{sort}</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Link
              key={campaign.id}
              to={`/crowdfunding/${campaign.id}`}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
            >
              {/* Campaign Image */}
              <div className="relative h-48">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
                {campaign.urgent && (
                  <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold">
                    URGENT
                  </div>
                )}
                {campaign.badge && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <p className="text-white text-sm font-bold">{campaign.badge}</p>
                  </div>
                )}
              </div>

              {/* Campaign Content */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2 min-h-[48px]">
                  {campaign.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
                  {campaign.description}
                </p>

                {/* Organizer */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs text-gray-700 font-medium">{campaign.organizer}</span>
                  {campaign.verified && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${calculateProgress(campaign.raised, campaign.target)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="text-gray-500">Terkumpul</span>
                      <p className="font-bold text-gray-900">{formatCurrency(campaign.raised)}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-500">Sisa Hari</span>
                      <p className="font-bold text-gray-900">{campaign.daysLeft}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
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
