export interface Community {
  id: number;
  name: string;
  tagline?: string;
  description: string;
  about?: string;
  image: string;
  coverImage?: string;
  avatarImage?: string;
  members: number;
  province: string;
  city?: string;
  category: string;
  activities: number;
  rating: number;
  verified: boolean;
  trending?: boolean;
  foundedYear?: string;
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
    tagline: 'Grup Publik Komunitas Pelestari & Pengrajin Batik Nusantara',
    description: 'Komunitas pengrajin dan pecinta batik yang berkomitmen melestarikan warisan budaya batik nusantara.',
    about: 'Pelestari Batik Indonesia didirikan sebagai wadah kolaborasi antara seniman batik, canting makers, kolektor, dan pegiat UMKM tekstil etnik nusantara. Komunitas ini aktif mengadakan workshop membatik bulanan, riset motif nusantara, dan pameran wastra tingkat nasional.',
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
    rules: [
      'Gunakan bahasa yang sopan dan saling menghargai sesama pegiat seni batik.',
      'Dilarang melakukan spamming jualan di luar thread pasar karya mingguan.',
      'Hargai hak cipta motif otentik dan sebutkan asal muasal daerah pembatik.',
      'Posting karya batik wajib mencantumkan jenis batik (Tulis, Cap, atau Kombinasi).'
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
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&auto=format&fit=crop&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&auto=format&fit=crop&q=80',
    members: 1200,
    province: 'Jawa Timur',
    city: 'Mojokerto & Surabaya',
    category: 'Seni Teater & Tari',
    activities: 32,
    rating: 4.6,
    verified: true,
    foundedYear: '2021',
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
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?w=1600&auto=format&fit=crop&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&auto=format&fit=crop&q=80',
    members: 3800,
    province: 'DI Yogyakarta',
    city: 'Yogyakarta',
    category: 'Tari',
    activities: 67,
    rating: 4.9,
    verified: true,
    trending: true,
    foundedYear: '2018',
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
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&auto=format&fit=crop&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=300&auto=format&fit=crop&q=80',
    members: 1850,
    province: 'Kalimantan Selatan',
    city: 'Banjarmasin',
    category: 'Kriya',
    activities: 28,
    rating: 4.5,
    verified: false,
    foundedYear: '2020'
  },
  {
    id: 5,
    name: 'Musisi Gamelan Modern',
    tagline: 'Eksplorasi Nada Pentatonik Tradisi dalam Orkestrasi Masa Kini',
    description: 'Komunitas musisi yang mengkolaborasikan gamelan tradisional dengan musik kontemporer.',
    about: 'Wadah kolaborasi komponis, pengrawit, dan produser musik etnis untuk membawa resonansi gong, bonang, dan saron ke panggung dunia.',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1600&auto=format&fit=crop&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300&auto=format&fit=crop&q=80',
    members: 950,
    province: 'Bali',
    city: 'Denpasar & Ubud',
    category: 'Musik',
    activities: 41,
    rating: 4.7,
    verified: true,
    foundedYear: '2022'
  },
  {
    id: 6,
    name: 'Koki Kuliner Nusantara',
    tagline: 'Melestarikan Rempah, Dapur Leluhur & Cita Rasa Otentik',
    description: 'Perkumpulan koki dan food enthusiast yang melestarikan resep tradisional Indonesia.',
    about: 'Dari rendang Minang hingga papeda Papua, kami mendokumentasikan resep warisan nenek moyang agar tidak lekang oleh zaman.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&auto=format&fit=crop&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&auto=format&fit=crop&q=80',
    members: 4200,
    province: 'Jawa Barat',
    city: 'Bandung',
    category: 'Kuliner',
    activities: 89,
    rating: 4.9,
    verified: true,
    trending: true,
    foundedYear: '2017'
  },
  {
    id: 7,
    name: 'Arsitek Heritage Indonesia',
    tagline: 'Konservasi Bangunan Bersejarah & Arsitektur Vernakular',
    description: 'Komunitas arsitek dan pemerhati bangunan bersejarah yang fokus pada konservasi heritage.',
    about: 'Mengkaji arsitektur rumah adat tongkonan, joglo, gadang, serta konservasi bangunan cagar budaya tropis nusantara.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&auto=format&fit=crop&q=80',
    members: 680,
    province: 'DKI Jakarta',
    city: 'Jakarta Pusat',
    category: 'Arsitektur',
    activities: 23,
    rating: 4.4,
    verified: true,
    foundedYear: '2020'
  },
  {
    id: 8,
    name: 'Pencinta Cerita Rakyat',
    tagline: 'Merawat Tutur Lisan & Mitologi Nusantara',
    description: 'Komunitas pendongeng dan penulis yang mengumpulkan dan menyebarkan cerita rakyat nusantara.',
    about: 'Menyajikan hikayat, fabel tradisional, dan legenda daerah dalam bentuk buku cerita ilustrasi anak dan dongeng audio.',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1600&auto=format&fit=crop&q=80',
    avatarImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&auto=format&fit=crop&q=80',
    members: 1560,
    province: 'Sumatera Barat',
    city: 'Padang & Bukittinggi',
    category: 'Sastra',
    activities: 34,
    rating: 4.6,
    verified: false,
    foundedYear: '2021'
  }
];
