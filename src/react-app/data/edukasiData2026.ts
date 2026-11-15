export interface CourseItem {
  id: number;
  title: string;
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  level: 'Pemula' | 'Menengah' | 'Lanjutan';
  duration: string;
  modulesCount: number;
  students: number;
  rating: number;
  category: 'Aksara & Bahasa' | 'Tari Nusantara' | 'Batik & Kriya' | 'Karawitan & Musik';
  description: string;
  curriculum: string[];
}

export const COURSES_2026: CourseItem[] = [
  {
    id: 1,
    title: 'Masterclass Membatik Tulis: Dari Nyanting hingga Pewarnaan Alami Soga',
    instructor: {
      name: 'Dewi Lestari Hadiningrat',
      role: 'Maestro Batik Canting Surakarta',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120'
    },
    image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=600',
    level: 'Pemula',
    duration: '4 Minggu (12 Jam)',
    modulesCount: 8,
    students: 1420,
    rating: 4.96,
    category: 'Batik & Kriya',
    description: 'Pelajari seni membatik otentik warisan dunia UNESCO. Dari memegang canting tembaga yang ergonomis, mengatur aliran malam panas, hingga teknik pencelupan warna soga alam.',
    curriculum: [
      'Pengenalan Alat & Kain Mori Primissima',
      'Membuat Sketsa Motif Klasik Parang & Kawung',
      'Teknik Mengendalikan Canting & Suhu Malam Panas',
      'Proses Nyuntik, Nembok, dan Nglorot Lilin',
      'Pewarnaan Ramah Lingkungan Ekstrak Alami'
    ]
  },
  {
    id: 2,
    title: 'Literasi Kuno: Membaca & Menulis Aksara Jawa (Hanacaraka) Lengkap',
    instructor: {
      name: 'Ki Danang Daniswara, M.Hum',
      role: 'Filolog & Penggiat Aksara Nusantara',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120'
    },
    image: 'https://images.unsplash.com/photo-1582735689851-574f29054c5f?w=600',
    level: 'Pemula',
    duration: '3 Minggu (9 Jam)',
    modulesCount: 6,
    students: 2180,
    rating: 4.98,
    category: 'Aksara & Bahasa',
    description: 'Bongkar rahasia aksara leluhur dengan metode visual interaktif. Memahami 20 aksara nglegena, pasangan, sandhangan swara, serta tata cara membaca manuskrip babad lawas.',
    curriculum: [
      '20 Aksara Nglegena & Filosofi Ha-Na-Ca-Ra-Ka',
      'Penerapan Sandhangan Swara & Panyigeging Wanda',
      'Memahami Pasangan Huruf & Aturan Penulisan Kalimat',
      'Latihan Membaca Naskah Cerita Rakyat & Prasasti Singkat'
    ]
  },
  {
    id: 3,
    title: 'Ritme & Sinkronisasi Gerak Dasar Tari Saman Aceh',
    instructor: {
      name: 'Cut Mutia Syahrani',
      role: 'Pelatih Tari Sanggar Jeumpa Puteh',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120'
    },
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600',
    level: 'Menengah',
    duration: '4 Minggu (10 Jam)',
    modulesCount: 7,
    students: 980,
    rating: 4.92,
    category: 'Tari Nusantara',
    description: 'Latih kelincahan tepukan dada, paha, dan lantai dalam tempo berjenjang. Memahami harmonisasi syair nasehat religius Gayo serta kekompakan gerak serempak.',
    curriculum: [
      'Posisi Bersimpuh Duduk Bersila (Timpuh) yang Kokoh',
      'Tepukan Dada, Tangan, dan Sinkronisasi Tempo Rengguk',
      'Syair Rantuk & Nyanyian Pengiring Syeikh',
      'Pola Dinamika Cepat (Kutip) & Gerakan Gelombang Kolosal'
    ]
  },
  {
    id: 4,
    title: 'Harmoni Karawitan Jawa: Pengenalan Ricikan Bonang & Saron',
    instructor: {
      name: 'Bambang Sukotjo',
      role: 'Pengrawit Keraton Yogyakarta',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120'
    },
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600',
    level: 'Menengah',
    duration: '5 Minggu (14 Jam)',
    modulesCount: 10,
    students: 760,
    rating: 4.9,
    category: 'Karawitan & Musik',
    description: 'Belajar laras Slendro dan Pelog, membaca titi laras angka Kepatihan, dan teknik tabuhan instrumen melodi bonang barung serta saron penerus.',
    curriculum: [
      'Konsep Dasar Laras Slendro & Pelog',
      'Membaca Notasi Not Angka Kepatihan',
      'Teknik Menabuh & Meredam (Mitet) Bilah Saron',
      'Teknik Tabuhan Mipil & Gembyang Bonang Barung',
      'Praktek Gending Lancaran Kebogiro Bersama'
    ]
  }
];

export interface CulturalQuizItem {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  culturalInsight: string;
}

export const CULTURAL_QUIZ_2026: CulturalQuizItem[] = [
  {
    id: 1,
    question: "Kain Songket Pandai Sikek di Minangkabau terkenal dengan motif rebung yang sarat makna. Apa nama motif tersebut dan filosofinya?",
    options: [
      "Pucuak Rabuang (kegunaan diri bagi masyarakat sejak muda hingga tua)",
      "Itik Pulang Patang (keindahan hewan ternak)",
      "Kaluak Paku (keindahan tumbuhan paku tepi sawah)",
      "Bungo Lado (keberanian rempah pedas Minang)"
    ],
    answer: "Pucuak Rabuang (kegunaan diri bagi masyarakat sejak muda hingga tua)",
    explanation: "Pucuak Rabuang menggambarkan falsafah: ketek paguno, gadang bapaedah (waktu kecil menjadi rebung untuk dimakan, waktu besar menjadi bambu penopang rumah).",
    culturalInsight: "Filosofi Minang menuntut setiap anak bangsa memiliki kontribusi sosial nyata di setiap fase usianya."
  },
  {
    id: 2,
    question: "Dalam seni kriya Keris Jawa, apakah yang dimaksud dengan 'Pamor' pada bilah keris?",
    options: [
      "Pola guratan berkilau dari paduan logam besi, baja, dan nikel/meteorit",
      "Gagang keris yang terbuat dari kayu langka",
      "Sarung pelindung bagian luar keris",
      "Nama mantra saat keris dimandikan"
    ],
    answer: "Pola guratan berkilau dari paduan logam besi, baja, dan nikel/meteorit",
    explanation: "Pamor adalah pola dekoratif metalurgi tinggi yang muncul di permukaan bilah akibat lipatan tempa berulang antara besi dan nikel meteorit.",
    culturalInsight: "Metode tempa pamor Nusantara telah diakui UNESCO sebagai teknik metalurgi purba paling canggih di Asia Tenggara."
  },
  {
    id: 3,
    question: "Tas tradisional Noken dari Papua telah diakui UNESCO pada 2012. Mengapa cara pembuatannya sangat istimewa?",
    options: [
      "Dirajut dari pilinan serat kulit kayu alami langsung menggunakan jemari tangan tanpa jarum",
      "Dijahit menggunakan mesin bordir modern",
      "Ditenun menggunakan alat tenun bukan mesin berbahan sutra",
      "Ditempa dari kulit kerbau kering"
    ],
    answer: "Dirajut dari pilinan serat kulit kayu alami langsung menggunakan jemari tangan tanpa jarum",
    explanation: "Noken dirajut oleh Mama-mama Papua menggunakan serat pohon melinjo (ganemo) atau anggrek hutan murni dengan jemari tangan secara sabar dan lentur.",
    culturalInsight: "Noken menyimbolkan rahim ibu, kasih sayang, perdamaian antarsuku, dan kearifan menjaga hutan Papua."
  },
  {
    id: 4,
    question: "Instrumen Gamelan biasanya dilaras ke dalam dua sistem tangga nada nada pentatonik Nusantara, yaitu:",
    options: [
      "Slendro (5 nada berjarak sama) dan Pelog (7 nada berjarak tak sama)",
      "Mayor dan Minor Diatonis",
      "Dorian dan Phrygian",
      "Pentatonis Blues dan Kromatik"
    ],
    answer: "Slendro (5 nada berjarak sama) dan Pelog (7 nada berjarak tak sama)",
    explanation: "Laras Slendro membagi oktaf menjadi 5 interval relatif setara, sedangkan Laras Pelog memiliki 7 interval dengan nuansa hening dan agung.",
    culturalInsight: "Tangga nada gamelan melatih rasa keselarasan batin (nglaras rasa) antara manusia, alam semesta, dan Sang Pencipta."
  },
  {
    id: 5,
    question: "Arsitektur rumah adat Uma Kelada di Sumba Timur tidak menggunakan satu paku besi pun. Bagaimana strukturnya tahan gempa?",
    options: [
      "Menggunakan sistem sambungan pasak kayu bertingkat dan ikatan tali rotan fleksibel",
      "Menggunakan lem getah pohon damar yang direkatkan ke tanah",
      "Menggunakan fondasi batu semen cor beton",
      "Menggantung rumah di atas dahan pohon beringin besar"
    ],
    answer: "Menggunakan sistem sambungan pasak kayu bertingkat dan ikatan tali rotan fleksibel",
    explanation: "Prinsip arsitektur vernakular Nusantara mengutamakan kelenturan kinetik: pasak kayu dan ikatan rotan meredam gelombang gempa tanpa patah getas.",
    culturalInsight: "Kearifan leluhur nusantara sejak ratusan tahun lalu telah menguasai teknologi tahan gempa paling ramah lingkungan."
  }
];
