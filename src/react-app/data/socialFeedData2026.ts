export interface CulturalFeedPost {
  id: number;
  author: {
    name: string;
    role: string;
    location: string;
    badge: string;
    avatar: string;
  };
  timestamp: string;
  category: 'Kriya Budaya' | 'Pelestarian' | 'Edukasi' | 'Seni Pertunjukan';
  culturalTag: string; // Misal: #PamorKeris #TenunSumba #TopengCirebon
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  verified: boolean;
}

export const CULTURAL_FEED_POSTS: CulturalFeedPost[] = [
  {
    id: 1,
    author: {
      name: 'Dewi Lestari Hadiningrat',
      role: 'Maestro Pembatik & Mentor Ruang Budaya',
      location: 'Laweyan, Surakarta',
      badge: 'Mentor Terverifikasi',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120'
    },
    timestamp: '25 menit yang lalu',
    category: 'Kriya Budaya',
    culturalTag: '#BatikTulisSoga #PucuakRabuang #KriyaNusantara',
    content: 'Pagi ini selesai proses nglorot (melarutkan malam dalam air mendidih) untuk sehelai kain batik tulis motif Kawung Nitik. Warna soganya kami racik dari rebusan kulit kayu tingi dan jambal. Ada keheningan yang luar biasa saat melihat pola putih mori tersingkap setelah 3 bulan pengerjaan teliti. Senang sekali modul kursusnya sudah bisa dipelajari teman-teman muda di Ruang Budaya!',
    image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=800&fit=crop',
    likes: 428,
    comments: 54,
    shares: 89,
    verified: true
  },
  {
    id: 2,
    author: {
      name: 'Komunitas Peduli Lontar Bali',
      role: 'Inisiator Konservasi Manuskrip',
      location: 'Karangasem, Bali',
      badge: 'Mitra Crowdfunding Resmi',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120'
    },
    timestamp: '2 jam yang lalu',
    category: 'Pelestarian',
    culturalTag: '#PusakaLontar #UsadaBali #BudayaGo2026',
    content: 'Update Program Pelestarian: Berkat gotong royong 500+ donatur di pilar Crowdfunding Ruang Budaya, 85 cakep naskah lontar usada pengobatan kuno abad ke-17 telah berhasil dibersihkan dari parasit jamur menggunakan ramuan minyak kemiri dan serbuk intaran! Lempir lontar yang rapuh kembali lentur dan siap dialihmediakan ke format digital multi-spektral.',
    image: 'https://images.unsplash.com/photo-1582735689851-574f29054c5f?w=800&fit=crop',
    likes: 812,
    comments: 97,
    shares: 215,
    verified: true
  },
  {
    id: 3,
    author: {
      name: 'Ki Gendon Giri',
      role: 'Dalang & Pengrajin Wayang Kulit Gagrag Banyumasan',
      location: 'Banyumas, Jawa Tengah',
      badge: 'Seniman Pelestari',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120'
    },
    timestamp: '4 jam yang lalu',
    category: 'Seni Pertunjukan',
    culturalTag: '#WayangKulit #Gatotkaca #SeniTatahBanyumas',
    content: 'Menatah wayang tokoh Gatotkaca bukan sekadar memotong kulit kerbau, tetapi juga menjiwai karakter ksatria yang kokoh berotot kawat bertulang besi namun tetap rendah hati. Setiap detail ornamen prada emas pada mahkota Badhong memerlukan ketelitian mata dan ketenangan nafas. Tokoh ini kini sudah resmi terkurasi di katalog Marketplace Budaya kami.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&fit=crop',
    likes: 635,
    comments: 72,
    shares: 110,
    verified: true
  }
];
