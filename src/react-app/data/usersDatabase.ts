export interface UserProfileData {
  id: string;
  name: string;
  username: string;
  avatar: string;
  cover: string;
  bio: string;
  location: string;
  category: string;
  headline: string;
  profession: string;
  website?: string;
  email?: string;
  phone?: string;
  joinedDate: string;
  verified: boolean;
  followers: number;
  following: number;
  posts: number;
  isFollowing?: boolean;
  culturalFocus: string[];
  achievements: {
    title: string;
    organization: string;
    year: string;
  }[];
  experience: {
    role: string;
    organization: string;
    period: string;
    description: string;
  }[];
  posts_list: {
    id: number;
    title: string;
    content: string;
    image?: string;
    likes: number;
    comments: number;
    timestamp: string;
  }[];
}

export const usersDatabase: Record<string, UserProfileData> = {
  '1': {
    id: '1',
    name: 'Ki Anom Sudarsono',
    username: '@anom_sudarsono',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop',
    headline: 'Dalang & Konservator Wayang Kulit Gagrag Surakarta',
    category: 'Wayang & Pertunjukan',
    profession: 'Dalang & Maestro Wayang Purwa',
    bio: 'Menjaga nafas tradisi pedalangan Gagrag Surakarta. Lebih dari 25 tahun mementaskan lakon Mahabarata dan Ramayana dengan nilai-nilai filosofis luhur nusantara.',
    location: 'Surakarta, Jawa Tengah',
    website: 'wayanganomsudarsono.id',
    email: 'kontak@anomsudarsono.id',
    phone: '+62 812-4455-8890',
    joinedDate: 'Bergabung Februari 2023',
    verified: true,
    followers: 4320,
    following: 310,
    posts: 84,
    culturalFocus: ['Wayang Kulit Purwa', 'Pedalangan Surakarta', 'Gamelan Jawa', 'Filosofi Lakon Kuno'],
    achievements: [
      {
        title: 'Anugerah Maestro Seni Tradisi Jawa Tengah',
        organization: 'Dinas Kebudayaan Prov. Jawa Tengah',
        year: '2023'
      },
      {
        title: 'Pelestari Seni Pedalangan Gagrag Surakarta',
        organization: 'Institut Seni Indonesia Surakarta',
        year: '2021'
      }
    ],
    experience: [
      {
        role: 'Ketua Paguyuban Dalang Muda Surakarta',
        organization: 'Sanggar Cahya Budaya',
        period: '2018 - Sekarang',
        description: 'Membina 40+ dalang muda dan menyelenggarakan pentas wayang kulit rutin keliling Nusantara.'
      },
      {
        role: 'Konsultan Restorasi Wayang Bersejarah',
        organization: 'Museum Radya Pustaka',
        period: '2015 - 2020',
        description: 'Melakukan konservasi dan pendataan karakter wayang kulit abad ke-18.'
      }
    ],
    posts_list: [
      {
        id: 101,
        title: 'Menghidupkan Karakter Kumbakarna',
        content: 'Lakon Kumbakarna Gugur selalu menyentuh hati nurani tentang rasa cinta tanah air melampaui kepentingan keluarga. Dokumentasi pentas semalam suntuk di Keraton Solo.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
        likes: 542,
        comments: 63,
        timestamp: '2 hari yang lalu'
      },
      {
        id: 102,
        title: 'Pemilihan Kulit Kerbau untuk Tatah Wayang',
        content: 'Tingkat kekenyalan kulit menentukan keawetan sunggingan dan detail tatahan halus bagian mahkota ksatria.',
        image: 'https://images.unsplash.com/photo-1582735689851-574f29054c5f?w=800&h=600&fit=crop',
        likes: 389,
        comments: 29,
        timestamp: '1 minggu yang lalu'
      }
    ]
  },
  '2': {
    id: '2',
    name: 'Nyoman Tri Astuti',
    username: '@nyoman_triastuti',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    cover: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&h=400&fit=crop',
    headline: 'Koreografer Tari Legong & Pembina Sanggar Suara Dewata',
    category: 'Tari Tradisi',
    profession: 'Koreografer & Penari Tradisi Bali',
    bio: 'Menghidupkan keagungan gerak tari Legong Kraton dan Condong. Berdedikasi melatih anak-anak banjar menjaga kemurnian pakem tari Bali.',
    location: 'Gianyar, Bali',
    website: 'suaradewata-dance.org',
    email: 'nyoman@suaradewata.org',
    phone: '+62 813-7722-1100',
    joinedDate: 'Bergabung Maret 2023',
    verified: true,
    followers: 6180,
    following: 420,
    posts: 128,
    culturalFocus: ['Tari Legong Kraton', 'Tari Condong', 'Koreografi Kontemporer Tradisi', 'Tata Rias Payas Agung'],
    achievements: [
      {
        title: 'Koreografer Terbaik Pesta Kesenian Bali (PKB)',
        organization: 'Pemerintah Provinsi Bali',
        year: '2024'
      },
      {
        title: 'Delegasi Kebudayaan Indonesia di Festival Seni Dunia',
        organization: 'Kemendikbudristek RI',
        year: '2022'
      }
    ],
    experience: [
      {
        role: 'Direktur Artistik',
        organization: 'Sanggar Suara Dewata Gianyar',
        period: '2016 - Sekarang',
        description: 'Mendidik 120+ penari muda dalam regenerasi pakem Legong Keraton klasik.'
      }
    ],
    posts_list: [
      {
        id: 201,
        title: 'Eksplorasi Gerak Agem dan Seledet Legong',
        content: 'Kekuatan tari Bali ada pada tatapan mata seledet yang tajam namun penuh penjiwaan estetis. Cuplikan latihan pagi bersama penari muda.',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop',
        likes: 820,
        comments: 94,
        timestamp: '3 hari yang lalu'
      }
    ]
  },
  '3': {
    id: '3',
    name: 'Raden Mas Haryo',
    username: '@rm_haryokusumo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&h=400&fit=crop',
    headline: 'Peneliti Naskah Kuno & Preservasi Lontar Nusantara',
    category: 'Filologi & Aksara',
    profession: 'Filolog & Konservator Manuskrip Kuno',
    bio: 'Menelusuri jejak peradaban Nusantara melalui aksara Jawa Kawi, lontar Sunda Kuno, dan naskah Melayu. Fokus pada konservasi fisik serat daun lontar dan digitalisasi pustaka nusantara.',
    location: 'Yogyakarta, D.I.Y',
    website: 'naskahnusantara.id',
    email: 'haryo@naskahnusantara.id',
    phone: '+62 811-9988-7711',
    joinedDate: 'Bergabung Januari 2023',
    verified: true,
    followers: 5210,
    following: 280,
    posts: 95,
    culturalFocus: ['Aksara Jawa & Kawi', 'Konservasi Lontar', 'Kriptografi Aksara Kuna', 'Katalogisasi Manuskrip'],
    achievements: [
      {
        title: 'Riset Filologi Terbaik Naskah Merapi-Merbabu',
        organization: 'Pusat Riset Manuskrip Nusantara',
        year: '2023'
      }
    ],
    experience: [
      {
        role: 'Kurator Digitalisasi Manuskrip',
        organization: 'Pusat Studi Lontar & Budaya Keraton',
        period: '2019 - Sekarang',
        description: 'Telah mendigitalisasi lebih dari 350 gulungan lontar langka nusantara.'
      }
    ],
    posts_list: [
      {
        id: 301,
        title: 'Minyak Kemiri untuk Ketahanan Daun Lontar',
        content: 'Perawatan berkala menggunakan minyak kemiri dan serbuk jelaga alami menghidupkan kembali tulisan yang memudar tanpa merusak serat organik.',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600&fit=crop',
        likes: 672,
        comments: 48,
        timestamp: '4 hari yang lalu'
      }
    ]
  },
  '4': {
    id: '4',
    name: 'Siti Maria Ulfah',
    username: '@siti_maria_songket',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    cover: 'https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=1200&h=400&fit=crop',
    headline: 'Maestro Tenun Songket Pandai Sikek & Pewarna Alami',
    category: 'Tekstil Nusantara',
    profession: 'Penata Tenun Songket Minangkabau',
    bio: 'Menghidupkan motif kuno Songket Pandai Sikek seperti Saik Galamai dan Pucuak Rabuang. Komitmen pada benang pakan sutera murni dan ekstrak gambir serta kulit mahoni.',
    location: 'Tanah Datar, Sumbar',
    website: 'songketpandaisikek.com',
    email: 'maria@songketpandaisikek.com',
    phone: '+62 821-3344-5566',
    joinedDate: 'Bergabung April 2023',
    verified: true,
    followers: 8940,
    following: 340,
    posts: 162,
    culturalFocus: ['Songket Pandai Sikek', 'Pewarna Alami Gambir & Mangrove', 'Tenun Silungkang', 'Benang Makao'],
    achievements: [
      {
        title: 'Penghargaan Kriya Warisan Takbenda Indonesia',
        organization: 'UNESCO & Kemendikbud',
        year: '2022'
      }
    ],
    experience: [
      {
        role: 'Pendiri Galeri Tenun Pusaka Sikek',
        organization: 'Rumah Tenun Tradisi Nagari',
        period: '2012 - Sekarang',
        description: 'Membimbing 60 ibu-ibu penenun nagari untuk ekspor produk tenun ramah lingkungan.'
      }
    ],
    posts_list: [
      {
        id: 401,
        title: 'Ketelitian Motif Saik Galamai',
        content: 'Menghitung helai benang pakan dengan lidi bambu memerlukan fokus penuh. Satu kain bisa memakan waktu hingga tiga bulan pengerjaan.',
        image: 'https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=800&h=600&fit=crop',
        likes: 934,
        comments: 112,
        timestamp: '5 hari yang lalu'
      }
    ]
  },
  '5': {
    id: '5',
    name: 'Ahmad Faisal Marapu',
    username: '@faisal_marapu',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    cover: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=400&fit=crop',
    headline: 'Arsitek Rumah Adat Sumba & Pegiat Konservasi Uma',
    category: 'Arsitektur Vernakular',
    profession: 'Arsitek Vernakular & Pegiat Kampung Adat',
    bio: 'Meneliti dan merevitalisasi Uma Mbatangu dan arsitektur megalitikum Sumba. Menggabungkan kearifan iklim lokal dengan material bambu petung dan alang-alang.',
    location: 'Sumba Timur, NTT',
    website: 'arsitektursumba.org',
    email: 'faisal@arsitektursumba.org',
    phone: '+62 812-7788-9900',
    joinedDate: 'Bergabung Juni 2023',
    verified: false,
    followers: 3410,
    following: 195,
    posts: 78,
    culturalFocus: ['Uma Mbatangu', 'Arsitektur Megalitikum', 'Sambungan Pasak Tradisional', 'Atap Alang-Alang'],
    achievements: [
      {
        title: 'Penghargaan Konservasi Kampung Adat Nusantara',
        organization: 'Ikatan Arsitek Indonesia (IAI)',
        year: '2023'
      }
    ],
    experience: [
      {
        role: 'Koordinator Revitalisasi Pasca-Kebakaran Kampung Adat',
        organization: 'Yayasan Reksa Rumah Tradisi',
        period: '2020 - Sekarang',
        description: 'Membangun kembali 18 rumah menara adat dengan partisipasi gotong royong warga kampung.'
      }
    ],
    posts_list: [
      {
        id: 501,
        title: 'Struktur Menara Uma Mbatangu yang Tahan Gempa',
        content: 'Sistem sambungan purus dan pasak kayu tanpa paku besi membuat struktur sangat lentur terhadap goyangan gempa bumi.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop',
        likes: 615,
        comments: 42,
        timestamp: '1 minggu yang lalu'
      }
    ]
  },
  '6': {
    id: '6',
    name: 'Endah Retnowati, M.Sn',
    username: '@endah_retnowati',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=400&fit=crop',
    headline: 'Komposer Karawitan Kontemporer & Dosen Etnomusikologi',
    category: 'Musik & Karawitan',
    profession: 'Komposer Etnik & Dosen Karawitan',
    bio: 'Menjembatani laras slendro dan pelog klasik ke dalam komposisi orkestrasi kontemporer nusantara. Peneliti frekuensi resonansi bilah perunggu gamelan klenengan.',
    location: 'Surakarta, Jawa Tengah',
    website: 'endah-karawitan.ac.id',
    email: 'endah@isi-ska.ac.id',
    phone: '+62 813-8899-0011',
    joinedDate: 'Bergabung Juli 2023',
    verified: true,
    followers: 4780,
    following: 510,
    posts: 114,
    culturalFocus: ['Gamelan Pelog & Slendro', 'Etnomusikologi Nusantara', 'Vokal Sinden Tradisi', 'Gong Ageng Perunggu'],
    achievements: [
      {
        title: 'Komposer Karya Musik Tradisi Baru Terbaik',
        organization: 'Festival Seni Pertunjukan Internasional',
        year: '2024'
      }
    ],
    experience: [
      {
        role: 'Kepala Laboratorium Karawitan & Akustik',
        organization: 'Fakultas Seni Pertunjukan ISI Surakarta',
        period: '2017 - Sekarang',
        description: 'Membimbing riset akustik instrumen kuno dan perancangan konser gamelan kamar.'
      }
    ],
    posts_list: [
      {
        id: 601,
        title: 'Harmoni Gaung Bilah Gender Barung',
        content: 'Tabuhan gender menuntut ketangkasan tangan kiri dan kanan dalam mematuk serta meredam nada (ngempyak & ngemat).',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop',
        likes: 720,
        comments: 55,
        timestamp: '3 hari yang lalu'
      }
    ]
  },
  '7': {
    id: '7',
    name: 'M. Idrus Sulaeman',
    username: '@idrus_phinisi',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=400&fit=crop',
    headline: 'Empu Pembuat Kapal Phinisi Bulukumba Warisan Dunia UNESCO',
    category: 'Kemaritiman Tradisi',
    profession: 'Panrita Lopi (Empu Galangan Phinisi)',
    bio: 'Generasi kelima Panrita Lopi Tanah Beru. Membangun kapal layar Phinisi kayu ulin dan bitti tanpa cetak biru modern, hanya mengandalkan intuisi batin dan perhitungan adat luhur.',
    location: 'Bulukumba, Sulsel',
    website: 'panritaphinisi.id',
    email: 'idrus@panritaphinisi.id',
    phone: '+62 852-4411-2233',
    joinedDate: 'Bergabung Agustus 2023',
    verified: true,
    followers: 7320,
    following: 215,
    posts: 89,
    culturalFocus: ['Kapal Layar Phinisi', 'Ritual Adat Sambung Kayu', 'Navigasi Bintang Tradisional', 'Kayu Besi Ulin'],
    achievements: [
      {
        title: 'Maestro Seni Pembuatan Perahu Pinisi Dunia',
        organization: 'UNESCO World Heritage Representative',
        year: '2019'
      }
    ],
    experience: [
      {
        role: 'Kepala Galangan Kapal Pusaka Tanah Beru',
        organization: 'Galangan Bahari Bulukumba',
        period: '2005 - Sekarang',
        description: 'Telah memimpin pembuatan lebih dari 28 kapal ekspedisi layar tradisional mengarungi samudera.'
      }
    ],
    posts_list: [
      {
        id: 701,
        title: 'Upacara Annyorong Lopi: Mendorong Kapal ke Lautan Lepas',
        content: 'Momen sakral saat ratusan pasang tangan warga bergotong royong menarik lopi phinisi meluncur di atas pasir putih menuju air laut.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
        likes: 1450,
        comments: 138,
        timestamp: '6 hari yang lalu'
      }
    ]
  },
  '8': {
    id: '8',
    name: 'Dewi Ayu Saraswati',
    username: '@dewi_saraswati_aksara',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&h=400&fit=crop',
    headline: 'Pakar Aksara Kawi & Kurator Museum Cagar Budaya',
    category: 'Pustaka Nusantara',
    profession: 'Epigraf & Kurator Museum Cagar Budaya',
    bio: 'Meneliti prasasti batu dan lempeng tembaga era Medang hingga Majapahit. Bersemangat mengedukasi generasi muda agar aksara nusantara tetap hidup di ranah digital.',
    location: 'Denpasar, Bali',
    website: 'aksarasantun.id',
    email: 'saraswati@aksarasantun.id',
    phone: '+62 812-3344-9988',
    joinedDate: 'Bergabung September 2023',
    verified: true,
    followers: 5930,
    following: 460,
    posts: 102,
    culturalFocus: ['Prasasti Jawa Kuno', 'Epigrafi Hindu-Buddha', 'Digitalisasi Fon Nusantara', 'Kurasi Cagar Budaya'],
    achievements: [
      {
        title: 'Peneliti Muda Terbaik Kurasi Prasasti Logam',
        organization: 'Ikatan Ahli Arkeologi Indonesia',
        year: '2023'
      }
    ],
    experience: [
      {
        role: 'Kepala Tim Kuratorial Pameran Pustaka Kawi',
        organization: 'Museum Kebudayaan Denpasar',
        period: '2020 - Sekarang',
        description: 'Menyusun katalog dan alih aksara 50+ prasasti tembaga berumur 1000 tahun.'
      }
    ],
    posts_list: [
      {
        id: 801,
        title: 'Membaca Penanggalan Candrasangkala Majapahit',
        content: 'Di balik susunan kata puitis, tersimpan angka tahun presisi yang merekam peristiwa penting peradaban leluhur kita.',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=600&fit=crop',
        likes: 812,
        comments: 73,
        timestamp: '4 hari yang lalu'
      }
    ]
  }
};
