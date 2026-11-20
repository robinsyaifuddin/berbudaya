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
    name: 'Batik Tulis Canting Alusan Sutra Solo',
    origin: 'Surakarta, Jawa Tengah',
    category: 'Kriya & Tekstil',
    seller: 'Paguyuban Batik Canting Surakarta',
    sellerBadge: 'Sanggar Tenun Warisan',
    location: 'Jawa Tengah',
    price: 3850000,
    oldPrice: 4200000,
    rating: 4.95,
    reviews: 78,
    stock: 4,
    verified: true,
    badge: 'Pilihan Maestro',
    images: [
      '/images/budaya/batik-tulis-canting.jpg'
    ],
    culturalTag: {
      ethnicGroup: 'Jawa (Surakarta)',
      philosophy: 'Goresan canting malam panas di atas katun mori sutra menyimbolkan ketelitian batin, kesabaran jiwa, dan keharmonisan hidup masyarakat Jawa.',
      technique: 'Batik tulis manual menggunakan canting tembaga alusan dengan pewarnaan alami kulit soga Jawa fermentasi bertahap.',
      curationStandard: 'Terkurasi Dewan Kesenian Daerah & Bersertifikat Asal Geografis',
      preservationImpact: 'Mendukung keberlanjutan para ibu pembatik sepuh di sentra Laweyan.'
    },
    description: 'Kain Batik Tulis asli karya maestro pembatik Surakarta. Dibuat dengan ketelitian canting tembaga malam panas di atas kain mori primissima alusan.',
    materials: 'Kain Mori Sutra Primissima, Malam Tawon Alami, Pewarna Alami Soga Jawa',
    dimensions: 'Panjang 250 cm x Lebar 105 cm',
    careInstructions: 'Cuci manual hanya menggunakan buah lerak atau air hangat tanpa deterjen kimiawi. Jemur di tempat teduh.'
  },
  {
    id: 2,
    name: 'Keris Gayaman Pamor Tosan Aji Surakarta',
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
      '/images/budaya/keris-pusaka.jpg'
    ],
    culturalTag: {
      ethnicGroup: 'Jawa (Mataraman)',
      philosophy: 'Pamor beras wutah dan bilah tempa lipat menyimbolkan doa kemakmuran, kepemimpinan bijaksana, dan keteguhan iman ksatria.',
      technique: 'Ditempa manual ratusan lipatan bilah besi, baja, dan meteorit titanium dengan teknik tempa lipat leluhur.',
      curationStandard: 'Sertifikasi Keaslian Logam & Kurasi Paguyuban Tosan Aji Solo',
      preservationImpact: 'Melestarikan tradisi empu muda penerus besalen tosan aji Jawa Tengah.'
    },
    description: 'Keris mahakarya tradisi Surakarta Hadiningrat model Gayaman. Bilah berlekuk seimbang dan anggun, dilengkapi warangka kayu pelet dan pendok tatahan kuningan halus.',
    materials: 'Besi Tempa Antik, Meteorit Nikel, Kayu Pelet Alami, Kuningan Tatah Solo',
    dimensions: 'Panjang bilah 36 cm, Total panjang dengan warangka 49 cm',
    careInstructions: 'Olesi tipis dengan minyak cendana atau melati setiap malam Anggara Kasih / 3 bulan sekali agar terhindar dari oksidasi.'
  },
  {
    id: 3,
    name: 'Kain Songket Palembang Benang Emas Tradisional',
    origin: 'Palembang, Sumatera Selatan',
    category: 'Kriya & Tekstil',
    seller: 'Sanggar Tenun Warisan Sriwijaya',
    sellerBadge: 'Kolektif Ibu Tenun Songket',
    location: 'Sumatera Selatan',
    price: 2950000,
    rating: 4.9,
    reviews: 56,
    stock: 5,
    verified: true,
    badge: 'Karya Terverifikasi',
    images: [
      '/images/budaya/songket-palembang.jpg'
    ],
    culturalTag: {
      ethnicGroup: 'Melayu Palembang',
      philosophy: 'Kilauan benang emas melambangkan kejayaan Sriwijaya, kemuliaan budi pekerti, dan penghormatan pada leluhur.',
      technique: 'Tenun sungkit manual dengan pakan benang emas murni di atas alat tenun tradisional gedogan selama 3-5 bulan.',
      curationStandard: 'Warisan Budaya Takbenda UNESCO & Sertifikasi Tenun Palembang',
      preservationImpact: '100% laba dibagikan langsung ke kelompok penenun perempuan di sentra tenun Palembang.'
    },
    description: 'Kain Songket asli tenun tangan Palembang dengan kilau benang emas motif cantik dan anggun. Tekstur rapi dan padat karya tangan penenun berpengalaman.',
    materials: 'Benang Emas Berkualitas, Sutra Katun Pilihan, Pewarna Alami',
    dimensions: 'Panjang 210 cm x Lebar 105 cm',
    careInstructions: 'Simpan digulung dengan tabung karton atau kain bersih di tempat sejuk; jangan diperas atau disetrika langsung.'
  },
  {
    id: 4,
    name: 'Wayang Kulit Purwa Tokoh Gatotkaca Gagrag Jawa',
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
      '/images/budaya/wayang-kulit.jpg'
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
    name: 'Noken Rajut Serat Kulit Kayu Tradisional Papua',
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
      '/images/budaya/noken-papua.jpg'
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
    name: 'Gamelan Pelog Gong Perunggu Klasik Jawa',
    origin: 'Surakarta, Jawa Tengah',
    category: 'Alat Musik Tradisional',
    seller: 'Bengkel Nada Parahyangan & Karawitan Solo',
    sellerBadge: 'Pembuat Instrumen Tradisi',
    location: 'Jawa Tengah',
    price: 1450000,
    oldPrice: 1650000,
    rating: 4.92,
    reviews: 38,
    stock: 3,
    verified: true,
    badge: 'Karya Terverifikasi',
    images: [
      '/images/budaya/gamelan-jawa.jpg'
    ],
    culturalTag: {
      ethnicGroup: 'Jawa (Surakarta)',
      philosophy: 'Harmoni tabuhan gamelan memvisualisasikan ketentraman batin, tata krama luhur, dan keselarasan antar sesama manusia.',
      technique: 'Pengecoran manual logam perunggu alusan dengan penalaan laras pelog dan slendro oleh empu gong berpengalaman.',
      curationStandard: 'Standar Konser Karawitan Keraton Surakarta Hadiningrat',
      preservationImpact: 'Menyediakan instrumen berkualitas bagi sanggar karawitan anak muda nusantara.'
    },
    description: 'Set instrumen gamelan tradisional perunggu berukir naga dan ornamen lung-lungan Jawa. Distem presisi tangga nada laras Pelog.',
    materials: 'Perunggu Cor Berkualitas Tinggi, Kayu Jati Solid Ukir',
    dimensions: 'Standar pementasan karawitan tradisional',
    careInstructions: 'Bersihkan bilah dengan kain katun halus kering, simpan dalam suhu ruangan stabil.'
  },
  {
    id: 7,
    name: 'Alat Musik Tradisional Angklung Bambu Sunda',
    origin: 'Bandung, Jawa Barat',
    category: 'Alat Musik Tradisional',
    seller: 'Saung Angklung Paguyuban Pasundan',
    sellerBadge: 'Sanggar Musik Bambu Tradisi',
    location: 'Jawa Barat',
    price: 850000,
    oldPrice: 1100000,
    rating: 4.96,
    reviews: 52,
    stock: 7,
    verified: true,
    badge: 'Pilihan Maestro',
    images: [
      '/images/budaya/angklung-bambu.jpg'
    ],
    culturalTag: {
      ethnicGroup: 'Sunda',
      philosophy: 'Angklung melambangkan gotong royong dan keharmonisan hidup, di mana nada indah tercipta dari kebersamaan banyak instrumen bambu.',
      technique: 'Dibuat dari bambu wulung pilihan yang telah dikeringkan dan ditala laras diatonik serta pentatonik oleh pengrajin bambu Sunda.',
      curationStandard: 'Warisan Budaya Takbenda UNESCO (Inscribed 2010)',
      preservationImpact: 'Mendukung keberlanjutan bengkel kerajinan bambu di Jawa Barat.'
    },
    description: 'Set instrumen musik tradisional Angklung bambu bernada merdu dan bersih. Dikerjakan dengan kehalusan tatah bambu tradisional.',
    materials: 'Bambu Hitam Wulung Pilihan, Tali Rotan Alami',
    dimensions: 'Tinggi 65 cm x Lebar 45 cm',
    careInstructions: 'Simpan di ruangan berventilasi baik dan hindari tempat lembab berlebih agar bambu tetap awet.'
  },
  {
    id: 8,
    name: 'Pahat Ukir Relief Kayu Jati Motif Lung-Lungan',
    origin: 'Jepara, Jawa Tengah',
    category: 'Kriya Anyaman & Kayu',
    seller: 'Padepokan Ukir Ukir Kayu Jepara',
    sellerBadge: 'Empu Seni Ukir',
    location: 'Jawa Tengah',
    price: 2150000,
    oldPrice: 2500000,
    rating: 4.91,
    reviews: 31,
    stock: 2,
    verified: true,
    badge: 'Karya Terverifikasi',
    images: [
      '/images/budaya/ukiran-kayu-jepara.jpg'
    ],
    culturalTag: {
      ethnicGroup: 'Jawa (Pesisir Jepara)',
      philosophy: 'Motif sulur flora (Lung-lungan) menggambarkan kelenturan budi pekerti, kesinambungan generasi, dan jalinan persaudaraan tanpa putus.',
      technique: 'Pahat manual tiga dimensi (3D relief carving) dari papan jati perhutani utuh tanpa sambungan lem.',
      curationStandard: 'Standar Mutu Ekspor Asosiasi Industri Permebelan & Kerajinan Indonesia',
      preservationImpact: 'Regenerasi pemahat muda penerus tradisi ukir klasik Jepara.'
    },
    description: 'Plakat hiasan dinding relief ukir kayu jati solid berkualitas tinggi. Menampilkan kedalaman kontur daun dan bunga sulur khas seni ukir klasik pesisiran.',
    materials: 'Kayu Jati Solid TPK Perhutani Kering Oven, Finishing Natural Wax Ramah Lingkungan',
    dimensions: 'Panjang 60 cm x Lebar 40 cm x Tebal 3.5 cm',
    careInstructions: 'Bersihkan debu dengan kuas halus kering atau lap mikrofiber. Olesi beeswax tipis setahun sekali.'
  }
];
