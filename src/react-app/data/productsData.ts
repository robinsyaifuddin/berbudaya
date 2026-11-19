export interface CulturalProduct {
  id: number;
  name: string;
  origin: string;
  category: 'Kriya & Tekstil' | 'Wayang & Seni Rupa' | 'Alat Musik Tradisional' | 'Senjata Tradisional' | 'Kriya Anyaman & Kayu';
  seller: string;
  sellerBadge: string;
  location: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  verified: boolean;
  badge?: 'Pilihan Maestro' | 'Warisan Langka' | 'Best Seller' | 'Karya Terverifikasi';
  images: string[];
  // Cultural Value Tagging (Pilar 2 Berbudaya)
  culturalTag: {
    ethnicGroup: string; // Suku / Etnis Asal
    philosophy: string; // Filosofi & Makna Simbolis
    technique: string; // Teknik Pengerjaan Tradisional
    curationStandard: string; // Standar Kurasi Kebudayaan
    preservationImpact: string; // Dampak Pelestarian
  };
  description: string;
  materials: string;
  dimensions: string;
  careInstructions: string;
}

export const CULTURAL_PRODUCTS: CulturalProduct[] = [
  {
    id: 1,
    name: 'Songket Pandai Sikek Motif Pucuak Rabuang Emas',
    origin: 'Tanah Datar, Sumatera Barat',
    category: 'Kriya & Tekstil',
    seller: 'Pertenunan Harapan Ibu Pandai Sikek',
    sellerBadge: 'Sanggar Tenun Warisan',
    location: 'Sumatera Barat',
    price: 3850000,
    oldPrice: 4200000,
    rating: 4.95,
    reviews: 78,
    stock: 4,
    verified: true,
    badge: 'Pilihan Maestro',
    images: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&fit=crop',
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&fit=crop',
      'https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=800&fit=crop'
    ],
    culturalTag: {
      ethnicGroup: 'Minangkabau',
      philosophy: 'Motif Pucuak Rabuang melambangkan kearifan adat Minang: kecil berguna menjadi rebung, besar bermanfaat menjadi bambu, penopang kaum dan masyarakat.',
      technique: 'Tenun Balapak menggunakan alat tenun panta tradisional selama 45 hari pengerjaan dengan benang emas makao murni.',
      curationStandard: 'Terkurasi Dewan Kesenian Daerah & Bersertifikat Asal Geografis',
      preservationImpact: 'Mendukung keberlanjutan 12 perajin tenun perempuan sepuh di Nagari Pandai Sikek.'
    },
    description: 'Kain Songket tenun tangan otentik khas Nagari Pandai Sikek. Memadukan warna merah marun klasik dengan sulaman benang emas pakan makao. Sering digunakan pada upacara batagak gala penghulu maupun pesta perkawinan adat luhak nan tigo.',
    materials: 'Benang Katun Sutra Halus, Benang Emas Makao Asli, Pewarna Alami',
    dimensions: 'Panjang 200 cm x Lebar 105 cm (Set Kain + Selendang)',
    careInstructions: 'Jangan dicuci mesin. Simpan dengan cara digulung rapi dan dilapisi kertas roti atau kain mori putih.'
  },
  {
    id: 2,
    name: 'Keris Gayaman Surakarta Luk 7 Pamor Wos Wutah',
    origin: 'Surakarta, Jawa Tengah',
    category: 'Senjata Tradisional',
    seller: 'Besalen Empu Subandi Joyo',
    sellerBadge: 'Empu Besalen Keraton',
    location: 'Jawa Tengah',
    price: 5200000,
    oldPrice: 5800000,
    rating: 5.0,
    reviews: 42,
    stock: 2,
    verified: true,
    badge: 'Warisan Langka',
    images: [
      'https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?w=800&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&fit=crop'
    ],
    culturalTag: {
      ethnicGroup: 'Jawa (Mataraman)',
      philosophy: 'Pamor Beras Wutah (Wos Wutah) menyimbolkan doa kemakmuran, kelimpahan rezeki, dan ketentraman keluarga pemiliknya.',
      technique: 'Ditempa manual ratusan lipatan bilah besi, baja, dan batu meteorit titanium asli dengan metode tempa lipat tradisi Abad ke-17.',
      curationStandard: 'Sertifikasi Keaslian Logam & Kurasi Paguyuban Tosan Aji Solo',
      preservationImpact: 'Melestarikan tradisi empu muda penerus besalen tosan aji Jawa Tengah.'
    },
    description: 'Keris mahakarya tradisi Surakarta Hadiningrat model Gayaman. Bilah berlekuk 7 (luk pitu) yang seimbang dan anggun, dilengkapi warangka kayu Timoho pelet pilihan serta pendok tembaga tatahan halus.',
    materials: 'Besi Tempa Antik, Meteorit Nikel, Kayu Timoho Pelet, Kuningan Tatah Solo',
    dimensions: 'Panjang bilah 36 cm, Total panjang dengan warangka 49 cm',
    careInstructions: 'Olesi tipis dengan minyak cendana atau melati setiap malam Anggara Kasih / 3 bulan sekali agar terhindar dari oksidasi.'
  },
  {
    id: 3,
    name: 'Kain Tenun Ikat Sumba Timur Motif Patola Ratu',
    origin: 'Waingapu, Nusa Tenggara Timur',
    category: 'Kriya & Tekstil',
    seller: 'Sanggar Tenun Oriang Prailiu',
    sellerBadge: 'Kolektif Ibu Tenun NTT',
    location: 'Nusa Tenggara Timur',
    price: 2950000,
    rating: 4.9,
    reviews: 56,
    stock: 5,
    verified: true,
    badge: 'Karya Terverifikasi',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&fit=crop',
      'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=800&fit=crop'
    ],
    culturalTag: {
      ethnicGroup: 'Sumba (Marapu)',
      philosophy: 'Figur kuda (Andung) dan rusa melambangkan keberanian bangsawan, kepemimpinan bijaksana, serta penghormatan pada leluhur.',
      technique: 'Ikat lungsi celup 4 tingkatan warna alami ekstrak akar mengkudu (kombu) dan daun nila (wora) memakan waktu 4-6 bulan.',
      curationStandard: 'Indikasi Geografis Tenun Ikat Sumba Timur',
      preservationImpact: '100% laba dibagikan langsung ke kelompok penenun perempuan di desa adat Prailiu.'
    },
    description: 'Hinggi Kombu Tenun Ikat Sumba Timur karya maestro perempuan Sumba. Tekstur tebal dengan kekuatan benang kapas pintal tangan asli. Pewarnaan alami bebas bahan kimia sintetik.',
    materials: 'Kapas Lokal Pintal Tangan, Ekstrak Daun Nila, Akar Pohon Mengkudu',
    dimensions: 'Panjang 240 cm x Lebar 115 cm',
    careInstructions: 'Hindari pencucian dengan detergen kimiawi keras; cukup diangin-anginkan di tempat teduh berangin.'
  },
  {
    id: 4,
    name: 'Wayang Kulit Purwa Tokoh Gatotkaca Gagrag Banyumasan',
    origin: 'Banyumas, Jawa Tengah',
    category: 'Wayang & Seni Rupa',
    seller: 'Paguyuban Wayang Gendon Giri',
    sellerBadge: 'Pengrajin Wayang Standar Dalang',
    location: 'Jawa Tengah',
    price: 1850000,
    oldPrice: 2100000,
    rating: 4.88,
    reviews: 64,
    stock: 6,
    verified: true,
    badge: 'Best Seller',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&fit=crop',
      'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&fit=crop'
    ],
    culturalTag: {
      ethnicGroup: 'Jawa Banyumasan',
      philosophy: 'Ksatria Pringgandani Gatotkaca melambangkan kesetiaan berbangsa, keteguhan hati memegang sumpah, dan keberanian membela kebenaran.',
      technique: 'Ditatah secara presisi oleh pengrajin sepuh menggunakan kulit kerbau bunting kering dan sungu (tanduk) kerbau bule.',
      curationStandard: 'Standar Pementasan Wayang Lakon Mahabarata',
      preservationImpact: 'Mendukung regenerasi pembuat wayang kulit di pedesaan Banyumas.'
    },
    description: '',
    materials: 'Kulit Kerbau Pilihan, Gapit Sungu Tanduk Kerbau Asli, Pewarna Prada Emas',
    dimensions: 'Tinggi wayang 72 cm (Total dengan gapit 95 cm)',
    careInstructions: 'Simpan di dalam kotak kayu/kain beludru kering dengan kapur barus halus untuk mencegah serangga.'
  },
  {
    id: 5,
    name: 'Noken Rajut Serat Kulit Kayu Mahkota Kasuari Papua',
    origin: 'Wamena, Lembah Baliem, Papua Pegunungan',
    category: 'Kriya Anyaman & Kayu',
    seller: 'Mama-Mama Noken Wamena Mandiri',
    sellerBadge: 'Kolektif Mama Papua',
    location: 'Papua Pegunungan',
    price: 650000,
    rating: 4.98,
    reviews: 112,
    stock: 12,
    verified: true,
    badge: 'Pilihan Maestro',
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&fit=crop',
      'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=800&fit=crop'
    ],
    culturalTag: {
      ethnicGroup: 'Dani / Hubula',
      philosophy: 'Noken adalah simbol rahim ibu, kesuburan, kehidupan, persaudaraan, dan lambang kemandirian pangan masyarakat Papua.',
      technique: 'Pintalan serat kulit kayu pohon melinjo (ganemo) atau anggrek hutan dirajut jemari tangan tanpa alat bantu jarum logam.',
      curationStandard: 'Warisan Budaya Takbenda UNESCO (Inscribed 2012)',
      preservationImpact: 'Memperkuat ekonomi langsung mama-mama perajin di pasar tradisional Lembah Baliem.'
    },
    description: 'Tas Noken tradisional asli Papua yang dibuat dengan ketelitian jemari Mama Papua. Tali fleksibel, elastis, kuat menahan beban, serta ramah lingkungan 100% terurai alami.',
    materials: 'Serat Kulit Kayu Pohon Ganemo Asli Hutan Pegunungan Papua',
    dimensions: 'Lebar 32 cm, Panjang rajutan 38 cm, Tali selempang lentur 85 cm',
    careInstructions: 'Bisa dicuci dengan air tawar dingin jika kotor, lalu dikeringkan di tempat terbuka teduh.'
  },
  {
    id: 6,
    name: 'Kecapi Sunda Rincik Perahu Kayu Mahoni Ukir Kujang',
    origin: 'Sumedang, Jawa Barat',
    category: 'Alat Musik Tradisional',
    seller: 'Bengkel Nada Parahyangan',
    sellerBadge: 'Pembuat Instrumen Tradisi',
    location: 'Jawa Barat',
    price: 1450000,
    oldPrice: 1650000,
    rating: 4.92,
    reviews: 38,
    stock: 3,
    verified: true,
    badge: 'Karya Terverifikasi',
    images: [
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&fit=crop',
      'https://images.unsplash.com/photo-1582735689851-574f29054c5f?w=800&fit=crop'
    ],
    culturalTag: {
      ethnicGroup: 'Sunda',
      philosophy: 'Alunan dawai kecapi rincik memvisualisasikan gemercik air pegunungan Priangan yang menenangkan batin dan menjunjung keselarasan alam.',
      technique: 'Kotak resonansi dibuat dari kayu mahoni solid berpola perahu koral, distem presisi tangga nada laras Salendro/Madenda.',
      curationStandard: 'Standar Konser Gamelan Tembang Sunda Cianjuran',
      preservationImpact: 'Menyediakan instrumen berkualitas bagi sanggar tari dan musik anak muda tanah Pasundan.'
    },
    description: 'Kecapi Sunda model Parahu dengan 15 dawai kawat baja baja anti karat. Dilengkapi ukiran ornamen kujang khas Sunda di bagian buritan dan kepala perahu.',
    materials: 'Kayu Mahoni Solid Kering Udara 5 Tahun, Kawat Baja Jerman, Peninggi Kayu Sonokeling',
    dimensions: 'Panjang 98 cm x Lebar 22 cm x Tinggi 14 cm',
    careInstructions: 'Kendurkan dawai sedikit jika tidak digunakan dalam jangka lama, simpan dalam suhu ruangan stabil.'
  }
];
