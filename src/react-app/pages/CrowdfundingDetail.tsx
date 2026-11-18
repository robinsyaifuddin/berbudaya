import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { 
  Check, Heart, Share2, Facebook, Twitter, MessageCircle, ChevronRight,
  MapPin, Users, Calendar, Clock
} from 'lucide-react';
import TopNavbar from '@/react-app/components/TopNavbar';

interface CampaignDetail {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  raised: number;
  target: number;
  daysLeft: number;
  donors: number;
  category: string;
  location: string;
  organizer: string;
  verified: boolean;
  badge?: string;
  milestones: {
    title: string;
    description: string;
    target: number;
    completed: boolean;
  }[];
  updates: {
    date: string;
    title: string;
    content: string;
    image?: string;
  }[];
}

// Data untuk semua campaign
const getCampaignData = (): Record<string, CampaignDetail> => {
  // Campaign base template yang sama dari halaman Crowdfunding
  const campaigns = [
    {
      id: 1,
      title: 'RESTORASI CANDI BOROBUDUR: SELAMATKAN WARISAN DUNIA UNESCO',
      description: 'Candi Borobudur mengalami kerusakan akibat gempa dan erosi. Bantu restorasi relief dan struktur candi agar tetap kokoh untuk generasi mendatang.',
      image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&h=600&fit=crop',
      raised: 45250000,
      target: 100000000,
      daysLeft: 45,
      donors: 1245,
      category: 'Pelestarian',
      location: 'Magelang, Jawa Tengah',
      organizer: 'Yayasan Warisan Budaya Indonesia',
      verified: true,
      badge: 'URGENT! Restorasi Segera Diperlukan',
      fullDescription: `Candi Borobudur, salah satu keajaiban dunia yang telah berdiri sejak abad ke-9 Masehi, kini menghadapi ancaman serius. Gempa bumi telah menyebabkan keretakan pada lebih dari 150 panel relief dan beberapa stupa mengalami pergeseran struktur.

MENGAPA INI PENTING?
• Candi Borobudur adalah Warisan Dunia UNESCO sejak 1991
• Menjadi situs Buddha terbesar di dunia dengan 2.672 panel relief
• Dikunjungi lebih dari 3,7 juta wisatawan per tahun

DAMPAK YANG DICAPAI:
✅ Candi aman untuk 50+ tahun kedepan
✅ 150+ lapangan kerja untuk ahli konservasi lokal
✅ Menyelamatkan sumber ekonomi untuk 10.000+ UMKM

Dengan donasi Anda, kami akan melakukan restorasi komprehensif meliputi perbaikan relief yang retak, penguatan struktur stupa, dan instalasi sistem drainage modern.`,
      gallery: [
        'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&h=600&fit=crop',
      ],
      milestones: [
        { title: 'Survei & Dokumentasi', description: 'Pemetaan lengkap kerusakan', target: 15000000, completed: true },
        { title: 'Restorasi Panel Relief', description: 'Perbaikan 50 panel prioritas', target: 45000000, completed: true },
        { title: 'Perkuatan Struktur', description: 'Stabilisasi 15 stupa utama', target: 70000000, completed: false },
      ],
      updates: [
        {
          date: '3 November 2024',
          title: 'Pencapaian 45% dari Target!',
          content: 'Alhamdulillah, berkat dukungan 1.245 donatur, pekerjaan restorasi panel relief fase pertama telah dimulai.',
        }
      ]
    },
    {
      id: 2,
      title: 'SELAMATKAN PENGRAJIN BATIK TULIS SOLO DARI KEPUNAHAN',
      description: 'Pengrajin batik tulis tradisional Solo terancam gulung tikar. Bantu mereka dengan modal usaha, pelatihan, dan akses pasar.',
      image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=800&h=600&fit=crop',
      raised: 18750000,
      target: 35000000,
      daysLeft: 30,
      donors: 456,
      category: 'Ekonomi Kreatif',
      location: 'Solo, Jawa Tengah',
      organizer: 'Komunitas Batik Nusantara',
      verified: true,
      badge: 'URGENT! 50+ Pengrajin Terancam',
      fullDescription: `Dari 500 pengrajin pada 2010, kini hanya tersisa 180 pengrajin aktif. Rata-rata usia di atas 50 tahun dengan penghasilan Rp 50.000-100.000 per hari.

SOLUSI KAMI:
• Modal Usaha - Rp 5 juta per pengrajin untuk 50 pengrajin
• Pelatihan - Workshop desain, fotografi, social media marketing
• Akses Pasar - Website e-commerce dan exhibition
• Infrastruktur - Renovasi rumah produksi

DAMPAK:
✅ 180 pengrajin terselamatkan
✅ Pendapatan meningkat 300% menjadi Rp 6 juta/bulan
✅ 50 pemuda dilatih sebagai penerus`,
      gallery: [
        'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=800&h=600&fit=crop',
      ],
      milestones: [
        { title: 'Modal Usaha Tahap 1', description: 'Rp 5 juta untuk 25 pengrajin', target: 12500000, completed: true },
        { title: 'Workshop Marketing', description: 'Pelatihan 50 pengrajin', target: 21250000, completed: false },
      ],
      updates: [
        {
          date: '5 November 2024',
          title: 'Modal Tahap 1 Disalurkan!',
          content: '25 pengrajin telah menerima modal usaha. Mereka sangat termotivasi!',
        }
      ]
    }
  ];

  // Convert array to Record dengan semua ID dari 1-12
  const data: Record<string, CampaignDetail> = {};
  
  campaigns.forEach(camp => {
    data[camp.id.toString()] = camp;
  });

  // Generate template untuk campaign 3-12 berdasarkan data dari Crowdfunding.tsx
  const additionalCampaigns = [
    { id: 3, title: 'DIGITALISASI MANUSKRIP KUNO NUSANTARA', category: 'Pendidikan', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=400&fit=crop' },
    { id: 4, title: 'BANGUN SANGGAR SENI WAYANG UNTUK ANAK MUDA', category: 'Seni & Budaya', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop' },
    { id: 5, title: 'FESTIVAL TENUN NUSANTARA 2025', category: 'Acara Budaya', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=400&fit=crop' },
    { id: 6, title: 'PROGRAM BEASISWA DALANG MUDA', category: 'Pendidikan', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop' },
    { id: 7, title: 'REVITALISASI RUMAH ADAT TONGKONAN TORAJA', category: 'Pelestarian', image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&h=400&fit=crop' },
    { id: 8, title: 'DOKUMENTER: PERJALANAN GAMELAN JAWA', category: 'Seni & Budaya', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop' },
    { id: 9, title: 'WORKSHOP BATIK GRATIS 1000 SISWA SD', category: 'Pendidikan', image: 'https://images.unsplash.com/photo-1609619385002-f40f5e5bae7f?w=600&h=400&fit=crop' },
    { id: 10, title: 'MUSEUM INTERAKTIF VR & AR', category: 'Pelestarian', image: 'https://images.unsplash.com/photo-1566738780863-f9608f88f3a9?w=600&h=400&fit=crop' },
    { id: 11, title: 'PELATIHAN UKIR KAYU ASMAT', category: 'Ekonomi Kreatif', image: 'https://images.unsplash.com/photo-1582735689851-574f29054c5f?w=600&h=400&fit=crop' },
    { id: 12, title: 'KONSERVASI TARI SAMAN ACEH', category: 'Seni & Budaya', image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=600&h=400&fit=crop' },
  ];

  additionalCampaigns.forEach(camp => {
    data[camp.id.toString()] = {
      id: camp.id,
      title: camp.title,
      description: `Program ${camp.title.toLowerCase()} untuk melestarikan warisan budaya Indonesia.`,
      fullDescription: `Program ini bertujuan untuk ${camp.title.toLowerCase()} sebagai upaya pelestarian budaya Indonesia. Detail lengkap program akan segera diumumkan.`,
      image: camp.image,
      gallery: [camp.image],
      raised: Math.floor(Math.random() * 50000000) + 10000000,
      target: Math.floor(Math.random() * 100000000) + 50000000,
      daysLeft: Math.floor(Math.random() * 150) + 30,
      donors: Math.floor(Math.random() * 1000) + 100,
      category: camp.category,
      location: 'Indonesia',
      organizer: 'Yayasan Budaya Nusantara',
      verified: true,
      badge: 'Program Aktif',
      milestones: [
        { title: 'Tahap Persiapan', description: 'Survei dan perencanaan', target: 0, completed: true },
        { title: 'Tahap Eksekusi', description: 'Implementasi program', target: 0, completed: false },
      ],
      updates: [
        {
          date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
          title: 'Program Diluncurkan',
          content: 'Program ini telah resmi diluncurkan. Terima kasih atas dukungan Anda!',
        }
      ]
    };
  });

  return data;
};

export default function CrowdfundingDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'detail' | 'updates' | 'milestones'>('detail');
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const campaignData = getCampaignData();
  const campaign = campaignData[id || '1'] || campaignData['1'];

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

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-blue-600">Beranda</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/crowdfunding" className="text-gray-600 hover:text-blue-600">Crowdfunding</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium truncate">{campaign.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src={campaign.gallery[selectedImage]}
                alt={campaign.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              {campaign.badge && (
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-lg shadow-lg">
                    {campaign.badge}
                  </span>
                </div>
              )}
              
              {/* Gallery Thumbnails */}
              {campaign.gallery.length > 1 && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex gap-2">
                    {campaign.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === idx ? 'border-blue-600 scale-110' : 'border-white/50'
                        }`}
                      >
                        <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Title & Meta */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                  {campaign.category}
                </span>
                {campaign.verified && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    Terverifikasi
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {campaign.title}
              </h1>
              <p className="text-gray-600 leading-relaxed mb-4">
                {campaign.description}
              </p>
              
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{campaign.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{campaign.organizer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{campaign.daysLeft} hari lagi</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="border-b border-gray-200 overflow-x-auto">
                <div className="flex min-w-max">
                  {['detail', 'updates', 'milestones'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`flex-1 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab
                          ? 'border-blue-600 text-blue-600 bg-blue-50'
                          : 'border-transparent text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {tab === 'detail' ? 'Detail Program' : tab === 'updates' ? 'Kabar Terbaru' : 'Milestone'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'detail' && (
                  <div className="prose max-w-none">
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {campaign.fullDescription}
                    </div>
                  </div>
                )}

                {activeTab === 'updates' && (
                  <div className="space-y-6">
                    {campaign.updates.map((update, idx) => (
                      <div key={idx} className="border-l-4 border-blue-600 pl-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-500">{update.date}</span>
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{update.title}</h3>
                        <p className="text-gray-700">{update.content}</p>
                        {update.image && (
                          <img src={update.image} alt={update.title} className="mt-3 rounded-lg w-full" />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'milestones' && (
                  <div className="space-y-4">
                    {campaign.milestones.map((milestone, idx) => (
                      <div 
                        key={idx}
                        className={`p-4 rounded-lg border-2 ${
                          milestone.completed ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            milestone.completed ? 'bg-blue-600' : 'bg-gray-400'
                          }`}>
                            {milestone.completed ? (
                              <Check className="w-5 h-5 text-white" />
                            ) : (
                              <span className="text-white font-bold text-sm">{idx + 1}</span>
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">{milestone.title}</h4>
                            <p className="text-sm text-gray-600">{milestone.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              {/* Progress */}
              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {formatCurrency(campaign.raised)}
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  terkumpul dari {formatCurrency(campaign.target)}
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all"
                    style={{ width: `${calculateProgress(campaign.raised, campaign.target)}%` }}
                  />
                </div>
                <div className="text-sm font-semibold text-blue-600">
                  {calculateProgress(campaign.raised, campaign.target).toFixed(1)}% tercapai
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-xl font-bold">{campaign.donors}</div>
                  <div className="text-xs text-gray-600">Donatur</div>
                </div>
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <Clock className="w-5 h-5 text-red-600 mx-auto mb-1" />
                  <div className="text-xl font-bold">{campaign.daysLeft}</div>
                  <div className="text-xs text-gray-600">Hari Lagi</div>
                </div>
              </div>

              {/* Donate Button */}
              <Link
                to={`/crowdfunding/${campaign.id}/donate`}
                className="block w-full py-3 bg-[#133384] hover:bg-[#1844A6] text-white text-center font-bold rounded-lg transition-colors mb-3"
              >
                DONASI SEKARANG
              </Link>

              {/* Actions */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  <span className="text-sm">Favorit</span>
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Share */}
              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-3">Bagikan</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                    <Facebook className="w-4 h-4" />
                  </button>
                  <button className="flex-1 bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 flex items-center justify-center gap-2">
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
