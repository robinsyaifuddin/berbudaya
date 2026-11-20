import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { 
  Check, Heart, Share2, Facebook, Twitter, MessageCircle, ChevronRight,
  MapPin, Users, Calendar, Clock, FileText, Bell, Flag, ArrowLeft, MessageSquare
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
  waContact?: string;
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

  // Injeksi dari localStorage 'user_published_donations' jika ada kampanye yang dibuat dari lembaga
  try {
    const customDonations = localStorage.getItem('user_published_donations');
    if (customDonations) {
      const parsedDonations = JSON.parse(customDonations);
      if (Array.isArray(parsedDonations)) {
        parsedDonations.forEach((item: any) => {
          data[item.id.toString()] = {
            id: item.id,
            title: item.title,
            description: item.description,
            fullDescription: item.fullDescription || item.description,
            image: item.image,
            gallery: item.gallery || [item.image],
            raised: item.raised || 0,
            target: item.target || 25000000,
            daysLeft: item.daysLeft || 30,
            donors: item.donors || 0,
            category: item.category || 'Pelestarian',
            location: item.location || 'Indonesia',
            organizer: item.organizer || 'Lembaga Kebudayaan',
            verified: item.verified ?? true,
            badge: item.badge || (item.urgent ? 'Mendesak & Terverifikasi' : 'Program Terverifikasi Lembaga'),
            waContact: item.waContact || '6281234567890',
            milestones: item.milestones || [
              { title: 'Persiapan & Pengadaan', description: 'Pelaksanaan tahap awal dan koordinasi teknis', target: Math.round((item.target || 25000000) * 0.3), completed: true },
              { title: 'Implementasi Inti Program', description: 'Eksekusi lapangan dan konservasi berkelanjutan', target: item.target || 25000000, completed: false }
            ],
            updates: item.updates || [
              {
                date: 'Hari ini',
                title: 'Program Resmi Diumumkan Lembaga',
                content: `Program "${item.title}" telah resmi diverifikasi dan siap menerima donasi dari seluruh masyarakat kebudayaan.`
              }
            ]
          };
        });
      }
    }
  } catch {
    // ignore
  }

  return data;
};

export default function CrowdfundingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'detail' | 'updates' | 'milestones'>('detail');
  const [isFavorite, setIsFavorite] = useState(false);

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

      {/* Back Button Navigation */}
      <div className="bg-white border-b border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-base font-medium text-blue-700 hover:text-blue-800 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Kembali</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-6 pb-24 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-5">
            {/* Hero Image */}
            <div className="space-y-2.5">
              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-100 aspect-[16/10] sm:aspect-[16/9]">
                <img
                  src={campaign.image || (campaign.gallery && campaign.gallery[0])}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
                {campaign.badge && (
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <span className="px-3 py-1 bg-red-600/95 backdrop-blur-sm text-white text-xs font-semibold rounded-md shadow-sm">
                      {campaign.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Badges / Tags Category & Verification - diletakkan rapi di bawah foto seperti screenshot */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg border border-blue-200/60">
                  {campaign.category}
                </span>
                {campaign.verified && (
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg border border-emerald-200/60 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Terverifikasi
                  </span>
                )}
              </div>
            </div>

            {/* Title & Meta Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/90 p-5 sm:p-6 space-y-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                {campaign.title}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {campaign.description}
              </p>
              
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-y-2.5 gap-x-6 text-xs sm:text-sm text-gray-500 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="font-medium text-gray-700">{campaign.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span>Penyelenggara: <strong className="font-semibold text-gray-800">{campaign.organizer}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span>Sisa Waktu: <strong className="font-semibold text-gray-800">{campaign.daysLeft} hari lagi</strong></span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 overflow-x-auto bg-white">
                <div className="flex min-w-max px-4">
                  {[
                    { key: 'detail', label: 'Detail Program', icon: FileText },
                    { key: 'updates', label: 'Kabar Terbaru', icon: Bell },
                    { key: 'milestones', label: 'Milestone', icon: Flag },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.key;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key as any)}
                        className={`tab-item flex items-center gap-2 py-3.5 px-4 text-sm font-semibold transition-all relative ${
                          isActive
                            ? 'active font-bold text-[#133384]'
                            : 'text-gray-500 hover:text-gray-800'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#133384]' : 'text-gray-500'}`} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-4 sm:p-5">
                {activeTab === 'detail' && (
                  <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                    {campaign.fullDescription}
                  </div>
                )}

                {activeTab === 'updates' && (
                  <div className="space-y-4">
                    {campaign.updates.map((update, idx) => (
                      <div key={idx} className="border-l-2 border-blue-600 pl-3.5 py-0.5">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-xs text-gray-500">{update.date}</span>
                        </div>
                        <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1">{update.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{update.content}</p>
                        {update.image && (
                          <img src={update.image} alt={update.title} className="mt-2.5 rounded-lg w-full max-h-60 object-cover" />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'milestones' && (
                  <div className="space-y-3">
                    {campaign.milestones.map((milestone, idx) => (
                      <div 
                        key={idx}
                        className={`p-3.5 rounded-lg border transition-all ${
                          milestone.completed ? 'bg-blue-50/60 border-blue-200' : 'bg-gray-50/80 border-gray-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                            milestone.completed ? 'bg-blue-600' : 'bg-gray-300'
                          }`}>
                            {milestone.completed ? (
                              <Check className="w-4 h-4 text-white" />
                            ) : (
                              <span className="text-white font-bold text-xs">{idx + 1}</span>
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-gray-900">{milestone.title}</h4>
                            <p className="text-xs text-gray-600 mt-0.5">{milestone.description}</p>
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
          <div className="lg:col-span-5 h-full">
            <div className="sticky top-20 z-10 bg-white rounded-2xl shadow-sm border border-gray-200/90 p-5 sm:p-6 space-y-5">
              {/* Progress */}
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  {formatCurrency(campaign.raised)}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-0.5 mb-3">
                  terkumpul dari <span className="font-medium text-gray-700">{formatCurrency(campaign.target)}</span>
                </div>
                
                <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${calculateProgress(campaign.raised, campaign.target)}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-blue-600">
                    {calculateProgress(campaign.raised, campaign.target).toFixed(1)}% tercapai
                  </span>
                  <span className="text-gray-400">Target 100%</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                  <Users className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-gray-900">{campaign.donors.toLocaleString('id-ID')}</div>
                  <div className="text-xs text-gray-500">Donatur</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                  <Clock className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-gray-900">{campaign.daysLeft}</div>
                  <div className="text-xs text-gray-500">Hari Lagi</div>
                </div>
              </div>

              {/* Donate Button */}
              <Link
                to={`/crowdfunding/${campaign.id}/donate`}
                className="block w-full py-3.5 px-4 bg-[#133384] hover:bg-[#1844A6] active:scale-[0.99] text-white text-center font-bold text-sm tracking-wide rounded-xl shadow-sm hover:shadow transition-all"
              >
                DONASI SEKARANG
              </Link>

              {/* Konfirmasi Donasi via WhatsApp */}
              <a
                href={`https://wa.me/${(campaign.waContact || '6281234567890').replace(/\D/g, '')}?text=${encodeURIComponent(
                  `Halo Pengelola ${campaign.organizer}, saya ingin konfirmasi donasi untuk program kebudayaan: "${campaign.title}". Mohon informasi verifikasi dan tanda terima resminya. Terima kasih.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-center font-bold text-xs sm:text-sm tracking-wide rounded-xl shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Konfirmasi Donasi via WhatsApp</span>
              </a>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 border border-gray-200 rounded-xl hover:bg-gray-50 active:scale-[0.99] transition-all"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Favorit</span>
                </button>
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: campaign.title, url: window.location.href }).catch(() => {});
                    }
                  }}
                  className="p-2.5 px-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 active:scale-[0.99] transition-all"
                >
                  <Share2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Sticky Action for Mobile Screens */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 shadow-lg">
        <div className="max-w-lg mx-auto flex items-center gap-2.5">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 active:scale-95 transition-all flex-shrink-0"
            aria-label="Simpan Favorit"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
          <Link
            to={`/crowdfunding/${campaign.id}/donate`}
            className="flex-1 py-3 px-4 bg-[#133384] active:scale-[0.98] text-white text-center font-bold text-sm rounded-xl shadow-md transition-all tracking-wide"
          >
            DONASI SEKARANG
          </Link>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: campaign.title, url: window.location.href }).catch(() => {});
              }
            }}
            className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 active:scale-95 transition-all flex-shrink-0"
            aria-label="Bagikan"
          >
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
