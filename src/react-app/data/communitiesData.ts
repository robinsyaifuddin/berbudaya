export interface CommunityNews {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category?: string;
  readTime: string;
  image: string;
  content?: string[];
  author?: string;
  authorRole?: string;
}

export interface CommunityEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'offline' | 'online';
  price: number; // 0 = Gratis
  quota: number;
  registered: number;
  image: string;
}

export interface CommunityDonation {
  id: number;
  title: string;
  description: string;
  targetAmount: number;
  collectedAmount: number;
  donorsCount: number;
  daysLeft: number;
  image: string;
  isUrgent?: boolean;
}

export interface CommunityStaff {
  name: string;
  role: string;
  avatar: string;
}

export interface Community {
  id: number;
  name: string;
  slug?: string;
  tagline?: string;
  description: string;
  about?: string;
  image: string;
  coverImage?: string;
  avatarImage?: string;
  members: number; // Pengikut / Followers
  province: string;
  city?: string;
  location?: string;
  avatar?: string;
  isPrivate?: boolean;
  membersCount?: number;
  category: string;
  activities: number;
  rating: number;
  verified: boolean;
  institutionType?: string; // e.g. "Yayasan Kebudayaan", "Sanggar Terakreditasi", "Paguyuban Pelestari"
  skLegalitas?: string;
  addressDetail?: string;
  contactEmail?: string;
  contactPhone?: string;
  trending?: boolean;
  foundedYear?: string;
  staffList?: CommunityStaff[];
  newsList?: CommunityNews[];
  eventsList?: CommunityEvent[];
  donationsList?: CommunityDonation[];
  rules?: string[];
  recentPosts?: {
    id: number;
    author: string;
    authorRole: string;
    authorAvatar: string;
    time: string;
    content: string;
    image?: string;
    likes: number;
    comments: number;
  }[];
  upcomingEvents?: {
    id: number;
    title: string;
    date: string;
    location: string;
  }[];
}

export const communitiesData: Community[] = [
  {
    id: 1,
    name: 'Pelestari Batik Indonesia',
    slug: 'pelestari-batik-indonesia',
    tagline: 'Lembaga Pelestarian, Riset, & Sertifikasi Mutu Wastra Batik Nusantara',
    description: 'Lembaga kebudayaan resmi berbadan hukum yang menaungi 45+ sentra pengrajin batik tulis dan cap nusantara.',
    about: 'Lembaga Pelestari Batik Indonesia didirikan dengan mandat pelestarian wastra tradisional berakar tradisi adiluhung. Kami bertindak sebagai kurator mutu, penyelenggara sertifikasi canting alami, fasilitator lokakarya generasi muda, serta mengelola dana abadi restorasi motif wastra langka keraton dan pesisiran.',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1600&auto=format&fit=crop&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=300&auto=format&fit=crop&q=80',
    members: 2500,
    province: 'Jawa Tengah',
    city: 'Surakarta & Pekalongan',
    category: 'Kriya',
    activities: 45,
    rating: 4.8,
    verified: true,
    trending: true,
    foundedYear: '2019',
    institutionType: 'Yayasan Kebudayaan Terakreditasi',
    skLegalitas: 'AHU-0014292.AH.01.04 / Disbud No. 431/2021',
    addressDetail: 'Kawasan Ndalem Danukusuman, Jl. Slamet Riyadi No. 182, Kota Surakarta',
    contactEmail: 'sekretariat@pelestaribatik.id',
    contactPhone: '+62 812-3456-7890',
    staffList: [
      { name: 'Dewi Sekar Pembayun', role: 'Ketua Dewan Pengurus', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { name: 'Raden Bagus Wicaksono', role: 'Kepala Riset & Kuratorial', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { name: 'Siti Nurhaliza M.', role: 'Koordinator Acara & Edukasi', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' }
    ],
    newsList: [
      {
        id: 101,
        title: 'Siaran Pers: Peluncuran Standardisasi Pewarna Alami Indigofera untuk Pengrajin Muda',
        excerpt: 'Menjawab tantangan limbah sintetis, Lembaga Pelestari Batik resmi menggandeng 12 sentra desa pembatik untuk kembali mengadopsi pasta tom/indigofera alami.',
        date: '18 Nov 2026',
        category: 'Kriya & Tekstil',
        readTime: '4 menit baca',
        image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop&q=80',
        content: [
          'Menjawab tantangan pencemaran limbah sintetis kimiawi di industri tekstil, Lembaga Pelestari Batik hari ini secara resmi meluncurkan inisiatif Standardisasi Pewarna Alami Indigofera untuk pengrajin muda di kawasan Surakarta dan sekitarnya.',
          'Melalui kemitraan strategis dengan 12 sentra desa pembatik, program ini bertujuan mengembalikan pemanfaatan pasta tom (daun Indigofera tinctoria) sebagai bahan baku celup biru alami yang ramah lingkungan, berdaya tahan tinggi, serta memiliki nilai ekonomi premium di pasar global.',
          'Standardisasi ini mencakup formulasi fermentasi ekstrak daun, panduan pengaturan pH berbasis air kelapa dan abu dapur, hingga panduan pencelupan berlapis yang konsisten. Inisiatif ini juga didukung fasilitas pendampingan intensif serta sertifikasi kurasi keaslian batik nusantara.'
        ],
        author: 'Dewi Sekar Pembayun',
        authorRole: 'Ketua Dewan Pengurus Lembaga'
      },
      {
        id: 102,
        title: 'Hasil Riset Terbuka: Dokumentasi 14 Varian Motif Parang Kuna Asal Pesisir Tuban',
        excerpt: 'Tim kuratorial menyelesaikan penelusuran manuskrip kain lawas abad ke-19 yang menyimpan filosofi doa keselamatan bagi para pelaut.',
        date: '12 Nov 2026',
        category: 'Riset & Kurasi',
        readTime: '6 menit baca',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80',
        content: [
          'Tim kuratorial Lembaga Pelestari Batik mengumumkan rampungnya tahap awal riset lapangan penelusuran 14 varian motif Parang Kuna pesisiran yang terdokumentasi di kawasan Tuban dan sekitarnya.',
          'Melalui verifikasi naskah kuno serta wawancara mendalam bersama para sesepuh pembatik, riset ini menyingkap bahwa variasi lereng parang khas pesisir dirancang dengan sudut kemiringan unik yang melambangkan ombak laut penuntun doa keselamatan para nelayan.',
          'Hasil dokumentasi digital dan naskah riset ini akan segera diterbitkan dalam bentuk arsip terbuka yang dapat diakses oleh akademisi, mahasiswa, dan pemerhati seni tradisi nusantara.'
        ],
        author: 'Raden Bagus Wicaksono',
        authorRole: 'Kepala Riset & Kuratorial'
      }
    ],
    eventsList: [
      {
        id: 1,
        title: 'Simposium & Workshop Intensif Canting Tembaga Alusan 2026',
        date: '28 Nov 2026',
        time: '09:00 - 16:00 WIB',
        location: 'Pendopo Ndalem Danukusuman, Surakarta (Offline)',
        type: 'offline',
        price: 75000,
        quota: 50,
        registered: 38,
        image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=800&auto=format&fit=crop&q=80'
      },
      {
        id: 2,
        title: 'Webinar Kurasi: Mengenal Autentisitas Batik Nitik Tradisional',
        date: '05 Des 2026',
        time: '19:30 - 21:00 WIB',
        location: 'Zoom Meeting Interaktif (Online)',
        type: 'online',
        price: 0,
        quota: 200,
        registered: 144,
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
      }
    ],
    donationsList: [
      {
        id: 1,
        title: 'Dana Abadi Restorasi & Penyelamatan 30 Lembar Kain Batik Lawas Abad ke-19',
        description: 'Bantuan pelapisan kaca asam dan preservasi museum bagi serat mori kuno koleksi maestro batik pesisiran yang mulai rapuh dimakan usia.',
        targetAmount: 35000000,
        collectedAmount: 24750000,
        donorsCount: 86,
        daysLeft: 14,
        image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&auto=format&fit=crop&q=80',
        isUrgent: true
      },
      {
        id: 2,
        title: 'Beasiswa Canting Tembaga: Pembinaan 20 Anak Muda Sentra Batik Giriloyo',
        description: 'Pengadaan peralatan wajan tembaga, canting cucuk, dan modul pewarnaan alami bagi murid SMK jurusan kriya tekstil.',
        targetAmount: 20000000,
        collectedAmount: 18200000,
        donorsCount: 64,
        daysLeft: 22,
        image: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=800&auto=format&fit=crop&q=80'
      }
    ],
    rules: [
      'Lembaga beroperasi dengan integritas transparansi riset, preservasi, dan edukasi publik.',
      'Seluruh donasi yang dihimpun tercatat dan dilaporkan secara berkala dalam Laporan Pertanggungjawaban (LPJ).',
      'Pendaftaran acara mengikuti tata tertib kebudayaan dan etika berbusana sopan nusantara.',
      'Kritik dan masukan kuratorial disalurkan melalui saluran resmi kesekretariatan.'
    ],
    recentPosts: [
      {
        id: 101,
        author: 'Dewi Sekar Pembayun',
        authorRole: 'Ketua Paguyuban',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        time: '3 jam yang lalu',
        content: 'Sugeng enjang sedulur pengrajin! Dokumentasi hasil workshop canting tembaga di Ndalem Gondosuli kemarin. Antusiasme generasi muda sangat luar biasa dalam memahami gradasi warna sogan alami.',
        image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop&q=80',
        likes: 142,
        comments: 29
      },
      {
        id: 102,
        author: 'Raden Bagus Wicaksono',
        authorRole: 'Koordinator Edukasi',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        time: 'Kemarin pukul 16:20',
        content: 'Ada diskusi menarik tentang restorasi motif klasik Parang Rusak Barong abad ke-18. Bagaimana tanggapan teman-teman mengenai modifikasi warna kontemporer pada kain motif sakral?',
        likes: 88,
        comments: 41
      }
    ],
    upcomingEvents: [
      {
        id: 201,
        title: 'Workshop Canting Malam Dingin & Pewarnaan Alami Sogan',
        date: 'Sabtu, 28 Nov 2026 • 09:00 WIB',
        location: 'Pendopo Sasana Budaya, Solo'
      },
      {
        id: 202,
        title: 'Festival Pameran Wastra Pesisiran',
        date: '5 - 7 Des 2026',
        location: 'Gedung Kesenian Pekalongan'
      }
    ]
  },
  {
    id: 2,
    name: 'Komunitas Dalang Muda',
    tagline: 'Wadah Kolaborasi Generasi Penerus Seni Pedalangan Wayang Kulit',
    description: 'Wadah bagi generasi muda dalang wayang untuk berbagi ilmu dan melestarikan seni pedalangan.',
    about: 'Komunitas Dalang Muda menghimpun dalang milenial dan Gen-Z di Jawa Timur & Nusantara. Berfokus pada regenerasi seni sastra pedalangan, suluk, sabetan wayang kulit purwa, serta tata gending iringan gamelan.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&auto=format&fit=crop&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&auto=format&fit=crop&q=80',
    members: 1200,
    province: 'Jawa Timur',
    city: 'Mojokerto & Surabaya',
    category: 'Seni Teater & Tari',
    activities: 32,
    rating: 4.6,
    verified: true,
    foundedYear: '2021',
    institutionType: 'Paguyuban Pedalangan Muda Nusantara',
    skLegalitas: 'AHU-0038812.AH.01.07 / Disbudprov Jatim 2021',
    addressDetail: 'Jl. Raden Wijaya No. 45, Kranggan, Kota Mojokerto, Jawa Timur',
    contactEmail: 'sekretariat@dalangmuda.id',
    contactPhone: '+62 821-4455-8899',
    staffList: [
      { name: 'Ki Anom Danendra', role: 'Ketua Paguyuban & Dalang Utama', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { name: 'Nyi Sekar Arum', role: 'Koordinator Karawitan & Pesinden', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
      { name: 'Bagus Panuntun', role: 'Manajer Produksi & Panggung', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' }
    ],
    newsList: [
      {
        id: 201,
        title: 'Siaran Rilis: Kolaborasi 10 Dalang Milenial dalam Festival Wayang Pesisiran 2026',
        excerpt: 'Paguyuban sukses mengemas pertunjukan wayang kulit semalam suntuk dengan tata pencahayaan teater modern dan iringan gamelan dwilaras.',
        date: '17 Nov 2026',
        category: 'Rilis Pementasan',
        readTime: '3 menit baca',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop&q=80'
      },
      {
        id: 202,
        title: 'Lokakarya Sabetan Wayang Purwa & Karakterisasi Tokoh Ksatria',
        excerpt: 'Pelatihan intensif teknik sabetan cepat dan intonasi suluk lakon Mahabarata bagi 25 bibit dalang cilik se-Jawa Timur.',
        date: '10 Nov 2026',
        category: 'Edukasi & Diklat',
        readTime: '5 menit baca',
        image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&auto=format&fit=crop&q=80'
      }
    ],
    eventsList: [
      {
        id: 203,
        title: 'Pentas Wayang Kulit Semalam Suntuk: Lakon Bima Suci',
        date: 'Jumat, 4 Des 2026',
        time: '20:00 - 04:00 WIB',
        location: 'Alun-alun Mojokerto, Jawa Timur (Offline)',
        type: 'offline',
        price: 0,
        quota: 300,
        registered: 215,
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80'
      },
      {
        id: 204,
        title: 'Masterclass Suluk & Garap Gending Pedalangan Surakarta - Jawatimuran',
        date: '12 Des 2026',
        time: '19:30 - 21:30 WIB',
        location: 'Live Streaming Sanggar & Zoom (Online)',
        type: 'online',
        price: 35000,
        quota: 100,
        registered: 64,
        image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=80'
      }
    ],
    donationsList: [
      {
        id: 201,
        title: 'Pengadaan Set Wayang Kulit Purwa Kulit Kerbau untuk Pembinaan Dalang Cilik',
        description: 'Bantuan pembuatan 50 tokoh wayang berbahan kulit kerbau asli tatah sungging halus untuk sanggar latihan gratis anak-anak pedesaan.',
        targetAmount: 25000000,
        collectedAmount: 18500000,
        donorsCount: 52,
        daysLeft: 19,
        image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
        isUrgent: true
      }
    ],
    rules: [
      'Menjaga keluhuran pakem wayang sembari terbuka terhadap inovasi garap pentas.',
      'Dilarang ujaran kebencian atau SARA dalam setiap tafsir lakon cerita.',
      'Saling berbagi referensi suluk dan rekaman rekaman pedalangan kasepuhan.'
    ],
    recentPosts: [
      {
        id: 103,
        author: 'Ki Anom Danendra',
        authorRole: 'Dalang Muda',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        time: '5 jam yang lalu',
        content: 'Gladi resik lakon "Semar Mbangun Kayangan" bersama pengrawit muda. Harmonisasi kendang sunda dan slendro pathet manyura malam ini begitu menyatu!',
        image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=80',
        likes: 95,
        comments: 18
      }
    ],
    upcomingEvents: [
      {
        id: 203,
        title: 'Pentas Wayang Kulit Semalam Suntuk: Bima Suci',
        date: 'Jumat, 4 Des 2026 • 20:00 WIB',
        location: 'Alun-alun Mojokerto'
      }
    ]
  },
  {
    id: 3,
    name: 'Penari Tradisional Nusantara',
    tagline: 'Perhimpunan Penari, Koreografer & Sanggar Tari Nusantara',
    description: 'Komunitas penari dari berbagai daerah yang aktif mementaskan dan mengajarkan tari tradisional.',
    about: 'Komunitas terbuka bagi penari tari klasik keraton hingga tari rakyat seluruh kepulauan Indonesia. Aktif memfasilitasi workshop gerak, olah tubuh, tata rias busana tari, dan pertunjukan kolosal lintas etnis.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&auto=format&fit=crop&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&auto=format&fit=crop&q=80',
    members: 3800,
    province: 'DI Yogyakarta',
    city: 'Yogyakarta',
    category: 'Tari',
    activities: 67,
    rating: 4.9,
    verified: true,
    trending: true,
    foundedYear: '2018',
    institutionType: 'Yayasan Seni Tari & Pertunjukan Tradisi',
    skLegalitas: 'AHU-0019230.AH.01.04 / Disbud DIY No. 120/2018',
    addressDetail: 'Kawasan Ndalem Pujokusuman, Jl. Brigjen Katamso No. 84, Kota Yogyakarta',
    contactEmail: 'kontak@penaritradisional.id',
    contactPhone: '+62 813-9088-7766',
    staffList: [
      { name: 'Ni Luh Ratnasari', role: 'Ketua Dewan Pengurus & Koreografer', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
      { name: 'Kanjeng Raden Arya Sasmito', role: 'Dewan Kurator Tari Klasik', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { name: 'Dian Paramita', role: 'Koordinator Pelatihan Sanggar', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' }
    ],
    newsList: [
      {
        id: 301,
        title: 'Siaran Pers: Peluncuran Kurikulum Gerak Dasar Bedhaya untuk Sanggar Binaan Pelajar',
        excerpt: 'Standardisasi gerak tradisi keraton disesuaikan agar mudah dipelajari oleh siswa sekolah dasar dan menengah tanpa mengurangi esensi filosofis.',
        date: '16 Nov 2026',
        category: 'Kurikulum & Diklat',
        readTime: '4 menit baca',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80'
      }
    ],
    eventsList: [
      {
        id: 302,
        title: 'Gelar Karya Tari Kolosal 1000 Gerak Nusantara',
        date: 'Minggu, 13 Des 2026',
        time: '15:30 - 20:30 WIB',
        location: 'Candi Prambanan Open Stage (Offline)',
        type: 'offline',
        price: 50000,
        quota: 500,
        registered: 380,
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80'
      }
    ],
    donationsList: [
      {
        id: 301,
        title: 'Bantuan Kostum Tari Tradisional & Tata Rias untuk 15 Sanggar Desa Tertinggal',
        description: 'Penyediaan kain jarik, sampur, mahkota, dan perlengkapan rias pentas agar anak-anak desa dapat tampil percaya diri di panggung seni.',
        targetAmount: 30000000,
        collectedAmount: 22400000,
        donorsCount: 78,
        daysLeft: 16,
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80'
      }
    ],
    rules: [
      'Menghormati kesakralan atribut dan busana adat masing-masing tari daerah.',
      'Saling menyemangati dan memberikan kritik konstruktif antar sesama penari.'
    ],
    recentPosts: [
      {
        id: 104,
        author: 'Ni Luh Ratnasari',
        authorRole: 'Koreografer',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        time: '1 hari yang lalu',
        content: 'Tari Bedhaya dan Legong mengajarkan kita bahwa tarian bukan cuma ketangkasan fisik, tapi napas meditatif dan rasa keindahan jiwa.',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
        likes: 210,
        comments: 34
      }
    ],
    upcomingEvents: [
      {
        id: 204,
        title: 'Gelar Karya Tari Kolosal 1000 Gerak Nusantara',
        date: 'Minggu, 13 Des 2026 • 15:30 WIB',
        location: 'Candi Prambanan Open Stage'
      }
    ]
  },
  {
    id: 4,
    name: 'Pengrajin Anyaman Indonesia',
    tagline: 'Jejaring Pengrajin Bambu, Rotan & Serat Alam Nusantara',
    description: 'Perkumpulan pengrajin anyaman rotan, bambu, dan pandan yang ingin mengembangkan pasar kerajinan.',
    about: 'Menghubungkan perajin anyaman tradisional dari desa ke pasar modern dan ekspor melalui inovasi desain ramah lingkungan.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=1600&auto=format&fit=crop&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&auto=format&fit=crop&q=80',
    members: 1850,
    province: 'Kalimantan Selatan',
    city: 'Banjarmasin',
    category: 'Kriya',
    activities: 28,
    rating: 4.5,
    verified: false,
    institutionType: 'Koperasi Kriya Kerajinan Nusantara',
    skLegalitas: 'AHU-0004921.AH.01.26 / Kemenkop 2020',
    addressDetail: 'Kawasan Sentra Anyaman, Jl. Brigjen H. Hasan Basry No. 12, Banjarmasin',
    contactEmail: 'halo@anyamanindonesia.id',
    contactPhone: '+62 852-7711-2233',
    staffList: [
      { name: 'Hj. Anisa Mardiah', role: 'Ketua Paguyuban Anyaman', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
      { name: 'Rustam Efendi', role: 'Pengembangan Desain Produk', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' }
    ],
    newsList: [
      {
        id: 401,
        title: 'Ekspor Perdana Produk Anyaman Purun Ramah Lingkungan ke Pasar Internasional',
        excerpt: 'Karya 40 ibu-ibu pengrajin lahan gambut berhasil menembus pasar ritel interior ramah lingkungan di Jepang dan Eropa.',
        date: '14 Nov 2026',
        category: 'Ekonomi Budaya',
        readTime: '3 menit baca',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
      }
    ],
    eventsList: [
      {
        id: 402,
        title: 'Pelatihan Desain Anyaman Bambu Kontemporer',
        date: '18 Des 2026',
        time: '09:00 - 15:00 WITA',
        location: 'Balai Kerajinan Banjarmasin (Offline)',
        type: 'offline',
        price: 0,
        quota: 40,
        registered: 29,
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
      }
    ],
    donationsList: [
      {
        id: 401,
        title: 'Pengering Bahan Serat Alam Bertenaga Surya untuk Pengrajin Pedesaan',
        description: 'Bantuan rumah surya pengering bahan purun dan rotan agar produksi tidak terkendala saat musim penghujan.',
        targetAmount: 18000000,
        collectedAmount: 11200000,
        donorsCount: 39,
        daysLeft: 25,
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
      }
    ],
    rules: [
      'Menjaga keberlanjutan panen bahan baku serat alam tanpa merusak ekosistem hutan gambut.',
      'Saling terbuka dalam pembagian pesanan kerja kriya untuk kesejahteraan merata.'
    ],
    foundedYear: '2020'
  },
  {
    id: 5,
    name: 'Musisi Gamelan Modern',
    tagline: 'Eksplorasi Nada Pentatonik Tradisi dalam Orkestrasi Masa Kini',
    description: 'Komunitas musisi yang mengkolaborasikan gamelan tradisional dengan musik kontemporer.',
    about: 'Wadah kolaborasi komponis, pengrawit, dan produser musik etnis untuk membawa resonansi gong, bonang, dan saron ke panggung dunia.',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1600&auto=format&fit=crop&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300&auto=format&fit=crop&q=80',
    members: 950,
    province: 'Bali',
    city: 'Denpasar & Ubud',
    category: 'Musik',
    activities: 41,
    rating: 4.7,
    verified: true,
    institutionType: 'Kolektif Orkestra Tradisi & Eksperimental',
    skLegalitas: 'AHU-0021944.AH.01.07 / Disbud Bali 2022',
    addressDetail: 'Banjar Nyuh Kuning, Ubud, Gianyar, Bali',
    contactEmail: 'info@gamelanmodern.id',
    contactPhone: '+62 819-3322-1100',
    staffList: [
      { name: 'I Made Wayan Suarna', role: 'Komponis & Pengrawit Utama', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { name: 'Ni Kadek Ayu Citra', role: 'Manajer Orkestrasi & Tur', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' }
    ],
    newsList: [
      {
        id: 501,
        title: 'Rilis Album Kolaborasi Nada Selonding & Instrumen Dawai Nusantara',
        excerpt: 'Kolektif berhasil merekam 8 komposisi musik sakral Bali yang dipadukan harmonis dengan kecapi Sunda dan sasando Rote.',
        date: '15 Nov 2026',
        category: 'Rilis Karya',
        readTime: '3 menit baca',
        image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop&q=80'
      }
    ],
    eventsList: [
      {
        id: 502,
        title: 'Konser Senja Gamelan Ambient: Gema Semesta di Pelataran Pura',
        date: '20 Des 2026',
        time: '17:30 - 21:00 WITA',
        location: 'Amfiteater Arma Museum Ubud, Bali (Offline)',
        type: 'offline',
        price: 75000,
        quota: 150,
        registered: 110,
        image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop&q=80'
      }
    ],
    donationsList: [
      {
        id: 501,
        title: 'Restorasi Bilah Perunggu Gong Kebyar Abad ke-19 Desa Adat',
        description: 'Penyelarasan kembali laras nada (tumbuk pelog) bilah perunggu tua milik pura desa yang mulai retak dan mengalami korosi.',
        targetAmount: 22000000,
        collectedAmount: 19800000,
        donorsCount: 61,
        daysLeft: 11,
        image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop&q=80'
      }
    ],
    rules: [
      'Menghormati pakem ritual dan pantangan etika sebelum memainkan instrumen gamelan sakral.',
      'Membina ruang eksplorasi musik yang inklusif bagi generasi muda penikmat instrumen tradisi.'
    ],
    foundedYear: '2022'
  },
  {
    id: 6,
    name: 'Koki Kuliner Nusantara',
    tagline: 'Melestarikan Rempah, Dapur Leluhur & Cita Rasa Otentik',
    description: 'Perkumpulan koki dan food enthusiast yang melestarikan resep tradisional Indonesia.',
    about: 'Dari rendang Minang hingga papeda Papua, kami mendokumentasikan resep warisan nenek moyang agar tidak lekang oleh zaman.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1600&auto=format&fit=crop&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&auto=format&fit=crop&q=80',
    members: 4200,
    province: 'Jawa Barat',
    city: 'Bandung',
    category: 'Kuliner',
    activities: 89,
    rating: 4.9,
    verified: true,
    trending: true,
    institutionType: 'Lembaga Riset Gastronomi & Kuliner Pusaka',
    skLegalitas: 'AHU-0018320.AH.01.04 / Disbud Jabar 2017',
    addressDetail: 'Jl. R.E. Martadinata (Riau) No. 92, Citarum, Kota Bandung',
    contactEmail: 'dapur@kulinernusantara.id',
    contactPhone: '+62 811-2334-5566',
    staffList: [
      { name: 'Chef Haryo Sasmita', role: 'Kurator Resep Pusaka & Dewan Pendiri', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { name: 'Ratna Kusuma Wardhani', role: 'Kepala Dokumentasi Rempah Tradisi', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' }
    ],
    newsList: [
      {
        id: 601,
        title: 'Dokumentasi 50 Resep Sambal Lawas Nusantara yang Nyaris Punah',
        excerpt: 'Tim riset merampungkan ekspedisi kuliner 6 pulau untuk mencatat bahan botani lokal dan teknik fermentasi rempah asli nenek moyang.',
        date: '19 Nov 2026',
        category: 'Riset Gastronomi',
        readTime: '5 menit baca',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80'
      }
    ],
    eventsList: [
      {
        id: 602,
        title: 'Festival Dapur Rempah Nusantara & Masterclass Masak Kuno',
        date: '21 - 22 Des 2026',
        time: '10:00 - 18:00 WIB',
        location: 'Taman Budaya Jawa Barat, Bandung (Offline)',
        type: 'offline',
        price: 45000,
        quota: 250,
        registered: 180,
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80'
      }
    ],
    donationsList: [
      {
        id: 601,
        title: 'Penerbitan & Distribusi Gratis Ensiklopedia Rempah Nusantara ke 100 SMK Tata Boga',
        description: 'Mencetak buku panduan botani rempah dan resep pusaka agar generasi calon juru masak bangga memasak kuliner leluhur.',
        targetAmount: 28000000,
        collectedAmount: 23100000,
        donorsCount: 94,
        daysLeft: 18,
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80'
      }
    ],
    rules: [
      'Menjaga keaslian bahan dan metode masak tradisional tanpa jalan pintas bahan kimia berbahaya.',
      'Menghormati kearifan lokal dalam memperlakukan bahan pangan dan tradisi perjamuan adat.'
    ],
    foundedYear: '2017'
  },
  {
    id: 7,
    name: 'Arsitek Heritage Indonesia',
    tagline: 'Konservasi Bangunan Bersejarah & Arsitektur Vernakular',
    description: 'Komunitas arsitek dan pemerhati bangunan bersejarah yang fokus pada konservasi heritage.',
    about: 'Mengkaji arsitektur rumah adat tongkonan, joglo, gadang, serta konservasi bangunan cagar budaya tropis nusantara.',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1600&auto=format&fit=crop&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=300&auto=format&fit=crop&q=80',
    members: 680,
    province: 'DKI Jakarta',
    city: 'Jakarta Pusat',
    category: 'Arsitektur',
    activities: 23,
    rating: 4.4,
    verified: true,
    institutionType: 'Yayasan Konservasi Arsitektur & Cagar Budaya',
    skLegalitas: 'AHU-0012290.AH.01.04 / Disbud DKI 2020',
    addressDetail: 'Kawasan Kota Tua, Jl. Pintu Besar Utara No. 11, Jakarta Barat',
    contactEmail: 'sekretariat@arsitekheritage.id',
    contactPhone: '+62 812-8899-7711',
    staffList: [
      { name: 'Ir. Baskoro Tedjo, M.Arch', role: 'Ketua Dewan Konservasi Heritage', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' }
    ],
    newsList: [
      {
        id: 701,
        title: 'Panduan Restorasi Struktur Kayu Ulin pada Rumah Panggung Tradisional',
        excerpt: 'Kajian teknis perawatan pasak kayu tradisional tanpa menggunakan paku besi untuk mempertahankan elastisitas tahan gempa.',
        date: '13 Nov 2026',
        category: 'Kajian Arsitektur',
        readTime: '6 menit baca',
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&auto=format&fit=crop&q=80'
      }
    ],
    eventsList: [
      {
        id: 702,
        title: 'Walking Tour & Sketsa Arsitektur Cagar Budaya Kota Tua',
        date: '27 Des 2026',
        time: '08:00 - 12:00 WIB',
        location: 'Taman Fatahillah, Jakarta (Offline)',
        type: 'offline',
        price: 25000,
        quota: 60,
        registered: 45,
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&auto=format&fit=crop&q=80'
      }
    ],
    donationsList: [
      {
        id: 701,
        title: 'Pemugaran Atap Sirap Kayu Rumah Gadang Suku Sikumbang di Solok',
        description: 'Bantuan penggantian bilah sirap kayu ulin yang bocor untuk mencegah pelapukan ukiran dinding rumah pusaka berusia 120 tahun.',
        targetAmount: 45000000,
        collectedAmount: 38200000,
        donorsCount: 112,
        daysLeft: 15,
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&auto=format&fit=crop&q=80',
        isUrgent: true
      }
    ],
    rules: [
      'Menjunjung tinggi Piagam Burra dalam setiap asas konservasi dan restorasi cagar budaya.',
      'Mengutamakan pelestarian material asli sebisa mungkin sebelum opsi penggantian komponen.'
    ],
    foundedYear: '2020'
  },
  {
    id: 8,
    name: 'Pencinta Cerita Rakyat',
    tagline: 'Merawat Tutur Lisan & Mitologi Nusantara',
    description: 'Komunitas pendongeng dan penulis yang mengumpulkan dan menyebarkan cerita rakyat nusantara.',
    about: 'Menyajikan hikayat, fabel tradisional, dan legenda daerah dalam bentuk buku cerita ilustrasi anak dan dongeng audio.',
    image: 'https://images.unsplash.com/photo-1507842229451-7f01be8610ce?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1507842229451-7f01be8610ce?w=1600&auto=format&fit=crop&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1507842229451-7f01be8610ce?w=300&auto=format&fit=crop&q=80',
    members: 1560,
    province: 'Sumatera Barat',
    city: 'Padang & Bukittinggi',
    category: 'Sastra',
    activities: 34,
    rating: 4.6,
    verified: false,
    institutionType: 'Paguyuban Tradisi Lisan & Literasi Sastra',
    skLegalitas: 'AHU-0033100.AH.01.07 / Disbud Sumbar 2021',
    addressDetail: 'Kawasan Jam Gadang, Jl. Ahmad Yani No. 18, Bukittinggi',
    contactEmail: 'redaksi@ceritarakyat.id',
    contactPhone: '+62 813-6677-8899',
    staffList: [
      { name: 'Sutan Palindih', role: 'Ketua Paguyuban Pendongeng', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' }
    ],
    newsList: [
      {
        id: 801,
        title: 'Merekam 20 Cerita Lisan Mandeh Rubiah dari Tetua Adat Pesisir Selatan',
        excerpt: 'Upaya digitalisasi audio tutur lisan agar dongeng pengantar tidur nusantara tidak hilang digerus media instan.',
        date: '11 Nov 2026',
        category: 'Literasi Budaya',
        readTime: '4 menit baca',
        image: 'https://images.unsplash.com/photo-1507842229451-7f01be8610ce?w=800&auto=format&fit=crop&q=80'
      }
    ],
    eventsList: [
      {
        id: 802,
        title: 'Festival Panggung Dongeng Anak Nusantara: Kisah Si Kancil & Naga Sakti',
        date: '24 Des 2026',
        time: '14:00 - 17:00 WIB',
        location: 'Gedung Kesenian Bukittinggi (Offline)',
        type: 'offline',
        price: 0,
        quota: 120,
        registered: 95,
        image: 'https://images.unsplash.com/photo-1507842229451-7f01be8610ce?w=800&auto=format&fit=crop&q=80'
      }
    ],
    donationsList: [
      {
        id: 801,
        title: 'Pojok Baca Buku Cerita Nusantara untuk 10 Sekolah Pedalaman Kepulauan Mentawai',
        description: 'Pengiriman 500 eksemplar buku cerita bergambar nusantara dan perlengkapan mendongeng untuk anak-anak Mentawai.',
        targetAmount: 15000000,
        collectedAmount: 12800000,
        donorsCount: 47,
        daysLeft: 20,
        image: 'https://images.unsplash.com/photo-1507842229451-7f01be8610ce?w=800&auto=format&fit=crop&q=80'
      }
    ],
    rules: [
      'Menjaga kelestarian nilai moral, budi pekerti, dan penghormatan terhadap alam dalam setiap hikayat.',
      'Membina ruang dongeng yang ceria dan ramah untuk seluruh anak Indonesia.'
    ],
    foundedYear: '2021'
  },
  {
    id: 9,
    name: 'Biro Hubungan Masyarakat & Kebudayaan Daerah',
    slug: 'biro-humas-kebudayaan-daerah',
    tagline: 'Lembaga Pengampu Regulasi, Revitalisasi Kriya, & Standardisasi Warisan Budaya Daerah',
    description: 'Badan otoritas kebudayaan daerah yang bertugas memfasilitasi riset kriya tenun, perlindungan indikasi geografis, serta advokasi maestro tradisi.',
    about: 'Biro Hubungan Masyarakat & Kebudayaan Daerah merupakan instansi resmi yang menaungi sentra pengrajin tenun ikat, kriya tradisional, dan pelestarian manuskrip daerah. Kami menginisiasi program inkubasi maestro muda, perlindungan hak cipta motif adat, serta jembatan kurasi ekspor ekonomi kreatif nusantara.',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=1600&auto=format&fit=crop&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&auto=format&fit=crop&q=80',
    members: 3420,
    province: 'Nusa Tenggara Timur & Jawa',
    city: 'Kupang & Surakarta',
    category: 'Kebijakan Budaya',
    activities: 58,
    rating: 4.9,
    verified: true,
    trending: true,
    foundedYear: '2018',
    institutionType: 'Badan / Biro Otoritas Kebudayaan Daerah',
    skLegalitas: 'SK-GUB/0481/DISBUD/2021',
    addressDetail: 'Gedung Kesenian Daerah Lt. 3, Jl. Kebudayaan No. 12',
    contactEmail: 'humas@kebudayaandaerah.go.id',
    contactPhone: '+62 811-9876-5432',
    staffList: [
      { name: 'Dr. Iwan Suhanda, M.Hum', role: 'Kepala Biro Kebudayaan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { name: 'Siti Nurhaliza M.', role: 'Pranata Humas & Peliputan Media', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' }
    ],
    newsList: [
      {
        id: 1,
        title: 'Gubernur Resmikan Pusat Revitalisasi Tenun Ikat dan Kriya Tradisional Nusantara',
        excerpt: 'Langkah strategis pemerintah daerah dalam menjaga orisinalitas tenun tradisional sekaligus memperluas jangkauan pasar internasional para pengrajin lokal melalui standarisasi geografis.',
        date: '17 Nov 2026',
        category: 'Kebijakan Budaya',
        readTime: '4 min baca',
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=1200&auto=format&fit=crop&q=80',
        author: 'Biro Hubungan Masyarakat & Kebudayaan Daerah',
        authorRole: 'Lembaga Resmi Kebudayaan'
      }
    ],
    rules: [
      'Menjaga netralitas, transparansi, dan komitmen pelestarian warisan budaya nusantara.',
      'Mendukung perlindungan hak cipta dan royalti adil bagi para pengrajin tenun adat.'
    ]
  }
];
