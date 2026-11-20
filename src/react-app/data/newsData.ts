export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  category: string;
  subCategory?: string;
  image: string;
  excerpt: string;
  content: string[];
  author: string;
  authorRole?: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  featured?: boolean;
  trending?: boolean;
  tags?: string[];
  source?: string;
}

export const newsArticles: NewsItem[] = [
  {
    id: 101,
    slug: 'peluncuran-standardisasi-pewarna-alami-indigofera',
    title: 'Siaran Pers: Peluncuran Standardisasi Pewarna Alami Indigofera untuk Pengrajin Muda',
    category: 'Kriya & Tekstil',
    subCategory: 'Rilis Resmi Lembaga',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Menjawab tantangan limbah sintetis, Lembaga Pelestari Batik resmi menggandeng 12 sentra desa pembatik untuk kembali mengadopsi pasta tom/indigofera alami.',
    author: 'Dewi Sekar Pembayun',
    authorRole: 'Ketua Dewan Pengurus Lembaga Pelestari Batik',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    date: '18 Nov 2026',
    readTime: '4 min baca',
    featured: true,
    trending: true,
    tags: ['Batik Alami', 'Indigofera', 'Pelestari Batik Indonesia', 'Standarisasi Mutu'],
    source: 'Lembaga Pelestari Batik Indonesia',
    content: [
      'Menjawab tantangan pencemaran limbah sintetis kimiawi di industri tekstil, Lembaga Pelestari Batik hari ini secara resmi meluncurkan inisiatif Standardisasi Pewarna Alami Indigofera untuk pengrajin muda di kawasan Surakarta dan sekitarnya.',
      'Melalui kemitraan strategis dengan 12 sentra desa pembatik, program ini bertujuan mengembalikan pemanfaatan pasta tom (daun Indigofera tinctoria) sebagai bahan baku celup biru alami yang ramah lingkungan, berdaya tahan tinggi, serta memiliki nilai ekonomi premium di pasar global.',
      'Standardisasi ini mencakup formulasi fermentasi ekstrak daun, panduan pengaturan pH berbasis air kelapa dan abu dapur, hingga panduan pencelupan berlapis yang konsisten. Inisiatif ini juga didukung fasilitas pendampingan intensif serta sertifikasi kurasi keaslian batik nusantara.'
    ]
  },
  {
    id: 102,
    slug: 'dokumentasi-14-varian-motif-parang-kuna-tuban',
    title: 'Hasil Riset Terbuka: Dokumentasi 14 Varian Motif Parang Kuna Asal Pesisir Tuban',
    category: 'Kriya & Tekstil',
    subCategory: 'Riset & Kurasi',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Tim kuratorial menyelesaikan penelusuran manuskrip kain lawas abad ke-19 yang menyimpan filosofi doa keselamatan bagi para pelaut.',
    author: 'Raden Bagus Wicaksono',
    authorRole: 'Kepala Riset & Kuratorial Pelestari Batik',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    date: '12 Nov 2026',
    readTime: '6 min baca',
    tags: ['Motif Parang', 'Manuskrip Kuno', 'Tuban', 'Riset Wastra'],
    source: 'Lembaga Pelestari Batik Indonesia',
    content: [
      'Tim kuratorial Lembaga Pelestari Batik mengumumkan rampungnya tahap awal riset lapangan penelusuran 14 varian motif Parang Kuna pesisiran yang terdokumentasi di kawasan Tuban dan sekitarnya.',
      'Melalui verifikasi naskah kuno serta wawancara mendalam bersama para sesepuh pembatik, riset ini menyingkap bahwa variasi lereng parang khas pesisir dirancang dengan sudut kemiringan unik yang melambangkan ombak laut penuntun doa keselamatan para nelayan.',
      'Hasil dokumentasi digital dan naskah riset ini akan segera diterbitkan dalam bentuk arsip terbuka yang dapat diakses oleh akademisi, mahasiswa, dan pemerhati seni tradisi nusantara.'
    ]
  },
  {
    id: 201,
    slug: 'kolaborasi-dalang-milenial-festival-wayang-pesisiran',
    title: 'Siaran Rilis: Kolaborasi 10 Dalang Milenial dalam Festival Wayang Pesisiran 2026',
    category: 'Seni Teater & Tari',
    subCategory: 'Rilis Pementasan',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Paguyuban sukses mengemas pertunjukan wayang kulit semalam suntuk dengan tata pencahayaan teater modern dan iringan gamelan dwilaras.',
    author: 'Komunitas Dalang Muda',
    authorRole: 'Paguyuban Pedalangan Muda Nusantara',
    authorAvatar: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&auto=format&fit=crop&q=80',
    date: '17 Nov 2026',
    readTime: '3 min baca',
    tags: ['Wayang Kulit', 'Dalang Milenial', 'Pentas Seni'],
    source: 'Komunitas Dalang Muda',
    content: [
      'Paguyuban sukses mengemas pertunjukan wayang kulit semalam suntuk dengan tata pencahayaan teater modern dan iringan gamelan dwilaras.',
      'Pementasan ini menghadirkan kolaborasi lintas generasi dalang muda dari Solo, Yogyakarta, dan pesisir utara Jawa dengan aransemen musik yang dinamis dan visual pencahayaan terkini.'
    ]
  },
  {
    id: 1,
    slug: 'gubernur-resmikan-pusat-revitalisasi-tenun-ikat',
    title: 'Gubernur Resmikan Pusat Revitalisasi Tenun Ikat dan Kriya Tradisional Nusantara',
    category: 'Kebijakan Budaya',
    subCategory: 'Konservasi Daerah',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=1200&auto=format&fit=crop&q=80',
    excerpt: 'Langkah strategis pemerintah daerah dalam menjaga orisinalitas tenun tradisional sekaligus memperluas jangkauan pasar internasional para pengrajin lokal melalui standarisasi geografis.',
    author: 'Biro Hubungan Masyarakat & Kebudayaan Daerah',
    authorRole: 'Lembaga Resmi Kebudayaan',
    authorAvatar: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&auto=format&fit=crop&q=80',
    date: '17 Nov 2026',
    readTime: '4 min baca',
    featured: true,
    tags: ['Tenun Ikat', 'Kebijakan Daerah', 'Ekspor Budaya', 'Kriya Tradisional'],
    source: 'Biro Hubungan Masyarakat & Kebudayaan Daerah',
    content: [
      'Pemerintah daerah resmi meresmikan Pusat Revitalisasi Tenun Ikat dan Kriya Tradisional Nusantara sebagai komitmen nyata menjaga warisan adiluhung nenek moyang dari kepunahan. Fasilitas terpadu ini menggabungkan sentra riset pewarnaan alami, pelatihan tenun bagi generasi muda, serta laboratorium sertifikasi indikasi geografis tenun tradisional nusantara.',
      'Dalam sambutannya, perwakilan pimpinan daerah menegaskan bahwa tenun tradisional bukan sekadar komoditas kain, melainkan naskah sejarah visual yang memuat kosmologi masyarakat adat. "Setiap goresan lungsi dan pakan pada selembar tenun merefleksikan doa, filosofi relasi manusia dengan alam, serta martabat sosial komunitas penenunnya," ujar beliau di hadapan puluhan perwakilan maestro tenun daerah.',
      'Melalui inisiatif ini, sentra revitalisasi akan menaungi lebih dari 450 penenun rumahan di berbagai pelosok daerah. Program inkubasi mencakup standarisasi mutu benang serat alami, regenerasi penenun muda di bawah umur 30 tahun, serta perlindungan hak cipta motif adat dari klaim maupun pembajakan industri tekstil sintetis massal.',
      'Selain itu, sentra ini juga dilengkapi dengan galeri pameran interaktif dan platform terhubung langsung ke pasar ekspor kurasi Berbudaya.id, memungkinkan para kolektor internasional bertransaksi langsung dengan koperasi perajin tanpa perantara spekulatif yang kerap merugikan penenun lokal.'
    ]
  },
  {
    id: 2,
    slug: 'inovasi-pewarnaan-alami-soga-jawa-raih-sertifikasi-ekspor',
    title: 'Inovasi Pewarnaan Alami Soga Jawa Raih Sertifikasi Ekspor Ramah Lingkungan',
    category: 'Kriya & Tekstil',
    subCategory: 'Ekonomi Hijau',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=1000&auto=format&fit=crop&q=80',
    excerpt: 'Komunitas pembatik Surakarta membuktikan pewarna organik dari kulit kayu tingi dan daun mangga mampu lolos uji toksisitas ketat Uni Eropa.',
    author: 'Dewi Lestari',
    authorRole: 'Peneliti Kriya Tradisional',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    date: '16 Nov 2026',
    readTime: '5 min baca',
    tags: ['Batik Soga', 'Pewarna Alami', 'Ekonomi Hijau', 'Surakarta'],
    source: 'Balai Besar Kerajinan dan Batik',
    content: [
      'Terobosan membanggakan datang dari klaster pembatik tradisional Surakarta. Setelah lebih dari tiga tahun riset laboratorium bersama akademisi teknologi tekstil, formula pewarna soga alami yang mereka ramu berhasil mengantongi sertifikasi keamanan lingkungan internasional OEKO-TEX dan Eco-Cert.',
      'Pewarna soga tradisional yang diracik dari kombinasi ekstrak kulit kayu tingi, tegeran, dan daun mangga ini membuktikan ketahanan luntur cuci dan gesek yang setara dengan pewarna sintetis naphtol dan indanthrene, namun tanpa meninggalkan residu logam berat berbahaya bagi sungai dan lingkungan.',
      '"Sertifikasi ini membuka jalan lebar bagi batik tulis pewarna alami kita untuk masuk ke butik etis di Paris, Berlin, dan Tokyo dengan nilai tambah berkali lipat," ungkap ketua perhimpunan perajin batik setempat.',
      'Keberhasilan ini membuktikan kearifan lokal masa lampau mampu menjawab tantangan industri fesyen sirkular global masa kini.'
    ]
  },
  {
    id: 3,
    slug: 'digitalisasi-aksara-kuno-manuskrip-daun-lontar-ai',
    title: 'Digitalisasi Aksara Kuno: Mengamankan Manuskrip Daun Lontar dengan Visi AI',
    category: 'Teknologi & Arsip',
    subCategory: 'AI Preservation',
    image: 'https://images.unsplash.com/photo-1507842229451-7f01be8610ce?w=1000&auto=format&fit=crop&q=80',
    excerpt: 'Kolaborasi filolog dan insinyur komputasi mentranskripsi ribuan lontar rapuh Bali & Jawa kuno ke format teks digital berbasis OCR multimodal.',
    author: 'Ahmad Fadli',
    authorRole: 'Arsiparis Digital & Sejarawan',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    date: '16 Nov 2026',
    readTime: '6 min baca',
    tags: ['Aksara Kuno', 'AI Preservation', 'Manuskrip Lontar', 'Arsip Digital'],
    source: 'Pusat Dokumentasi Kebudayaan Bali & Tim Riset AI',
    content: [
      'Ribuan lempeng daun lontar bersejarah yang menyimpan catatan astronomi, pengobatan tradisional Usada, hingga sastra kawi kini memasuki babak baru penyelamatan melalui pemanfaatan visi komputer berbasis kecerdasan buatan.',
      'Kondisi fisik lontar yang sebagian besar telah rapuh dan terancam lapuk akibat kelembaban tropis berhasil dipindai dengan sensor resolusi ultra-tinggi multispektral. Model OCR multimodal khusus yang dilatih dengan ribuan glif aksara Jawa dan Bali kuno mampu mengenali guratan pisau pengrupak dengan akurasi mencapai 94.8%.',
      'Data hasil transkripsi dan terjemahan otomatis ini akan dibuka secara bertahap dalam repositori terbuka yang dapat diakses oleh peneliti dan pelajar di seluruh penjuru dunia.',
      '"Teknologi tidak menggantikan sakralitas lontar, melainkan menjadi benteng pertahanan digital agar pengetahuan leluhur kita tidak hilang ditelan zaman," jelas koordinator proyek riset.'
    ]
  },
  {
    id: 4,
    slug: 'festival-wayang-kulit-virtual-generasi-z',
    title: 'Festival Wayang Kulit Virtual Gaet Ratusan Ribu Penonton Generasi Z',
    category: 'Seni Teater & Tari',
    subCategory: 'Media Interaktif',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&auto=format&fit=crop&q=80',
    excerpt: 'Perpaduan tata cahaya projection mapping dan narasi dwibahasa sukses mendekatkan pakem lakon Mahabarata ke generasi digital.',
    author: 'Ki Danang Daniswara',
    authorRole: 'Pengamat Seni Pertunjukan',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    date: '15 Nov 2026',
    readTime: '3 min baca',
    tags: ['Wayang Digital', 'Seni Pertunjukan', 'Generasi Z', 'Teater'],
    source: 'Komunitas Wayang Muda Indonesia',
    content: [
      'Gagasan menggelar pertunjukan wayang kulit dengan sentuhan tata panggung imersif dan siaran interaktif multiperspektif menuai respons luar biasa dari kalangan muda. Selama tiga malam penyelenggaraan, siaran langsung tercatat ditonton oleh lebih dari 320.000 pemirsa unik.',
      'Dalang muda menyajikan lakon klasik dengan durasi padat 90 menit tanpa mengurangi filosofi tancep kayon dan pesan moral lakon. Dialog juga disertai terjemahan teks langsung dalam bahasa Indonesia dan Inggris.',
      'Inovasi ini membuktikan bahwa minat generasi muda terhadap seni pertunjukan klasik tetap tinggi bila disajikan dengan medium komunikasi kontemporer yang relevan.'
    ]
  },
  {
    id: 5,
    slug: 'semarak-harmoni-tari-saman-gayo-diplomasi-asean',
    title: 'Semarak Harmoni Tari Saman Gayo Membuka Konferensi Diplomasi ASEAN',
    category: 'Tari & Musik',
    subCategory: 'Diplomasi Budaya',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1000&auto=format&fit=crop&q=80',
    excerpt: 'Keserempakan tepuk dada dan ritme vokal tanpa instrumen memukau menteri kebudayaan mancanegara di Gedung Kesenian Jakarta.',
    author: 'Cut Mutia Syahrani',
    authorRole: 'Koresponden Seni & Diplomasi',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    date: '14 Nov 2026',
    readTime: '4 min baca',
    tags: ['Tari Saman', 'Diplomasi Budaya', 'ASEAN', 'Warisan Budaya'],
    source: 'Sekretariat Kebudayaan Nasional',
    content: [
      'Tepuk dada yang bergemuruh dalam sinkronisasi sempurna oleh 60 penari Saman asal dataran tinggi Gayo berhasil menyihir seluruh delegasi Konferensi Tingkat Tinggi Diplomasi Kebudayaan ASEAN di Jakarta.',
      'Saman, yang telah diakui sebagai Warisan Budaya Takbenda oleh UNESCO sejak 2011, menampilkan kekuatan kolektivisme dan persaudaraan sejati masyarakat Nusantara. Tanpa iringan alat musik satu pun, ritme tercipta murni dari vokal syeh dan ketukan dinamis para penari.',
      'Para delegasi internasional menyampaikan apresiasi mendalam atas kemampuan bangsa Indonesia merawat tradisi komunal yang sarat nilai spiritual dan sosial ini.'
    ]
  },
  {
    id: 6,
    slug: 'ekskavasi-candi-megalitikum-lahat-tata-air-purba',
    title: 'Ekskavasi Candi Megalitikum Lahat Mengungkap Sistem Tata Air Purba',
    category: 'Arkeologi',
    subCategory: 'Riset Sejarah',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=1000&auto=format&fit=crop&q=80',
    excerpt: 'Penemuan saluran irigasi batu andesit bertingkat membuktikan peradaban agraris nusantara telah mengenal manajemen hidrologi maju sejak abad ke-7.',
    author: 'Bambang Prasetyo',
    authorRole: 'Arkeolog Situs Sejarah',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    date: '14 Nov 2026',
    readTime: '7 min baca',
    tags: ['Arkeologi', 'Megalitikum', 'Lahat', 'Hidrologi Purba'],
    source: 'Pusat Riset Arkeologi Nasional',
    content: [
      'Ekskavasi lanjutan di kawasan dataran tinggi Lahat, Sumatera Selatan, kembali menyingkap fakta peradaban mengagumkan. Tim arkeolog gabungan menemukan bentangan saluran irigasi purba yang tersusun rapi dari balok-balok andesit berundak.',
      'Penanggalan radiokarbon pada sedimen organik di sekitar kanal mengindikasikan sistem hidrologi ini dibangun dan beroperasi intensif sekitar abad ke-7 hingga ke-8 Masehi. Kanal ini dirancang untuk mendistribusikan limpasan air hujan dari lereng perbukitan menuju terasering sawah tanpa memicu erosi tebing.',
      'Temuan ini merevisi pandangan lama dan menegaskan bahwa arsitektur hidrolik nusantara kuno setara dengan peradaban irigasi dunia lainnya.'
    ]
  },
  {
    id: 7,
    slug: 'modernisasi-arsitektur-tongkonan-bambu-laminasi',
    title: 'Modernisasi Arsitektur Tongkonan: Sinergi Bambu Laminasi dan Pasak Kayu',
    category: 'Arsitektur Vernakular',
    subCategory: 'Rancang Bangun',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=80',
    excerpt: 'Arsitek muda Toraja memadukan ketahanan gempa konstruksi tradisional dengan material engineered bamboo untuk hunian komunal ramah iklim.',
    author: 'Indah Paramitha',
    authorRole: 'Arsitek & Kurator Vernakular',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    date: '13 Nov 2026',
    readTime: '5 min baca',
    tags: ['Arsitektur Vernakular', 'Tongkonan', 'Toraja', 'Bambu Laminasi'],
    source: 'Institut Arsitektur Tradisional Indonesia',
    content: [
      'Arsitektur vernakular Tongkonan Toraja dengan atap menjulang khas seperti perahu kini diadaptasi ke dalam konsep hunian ramah lingkungan masa depan. Para arsitek lokal mempertahankan struktur pasak kayu tanpa paku besi yang terkenal fleksibel meredam guncangan gempa bumi.',
      'Pembaruan dilakukan pada material lengkungan atap dan dinding yang kini memanfaatkan bambu laminasi terawetkan (engineered bamboo). Pendekatan ini menekan bobot struktur sekaligus menjaga suhu ruangan tetap sejuk secara pasif.',
      '"Kita tidak meninggalkan kaidah adat, melainkan melengkapinya agar rumah tradisional dapat terus bertahan dan dibangun secara berkelanjutan di era kelangkaan kayu hutan keras," tutur sang inisiator.'
    ]
  },
  {
    id: 8,
    slug: 'gamelan-pelog-kurikulum-konservatori-eropa',
    title: 'Gamelan Pelog Masuk Kurikulum Musik Konservatori Musik Wina & London',
    category: 'Tari & Musik',
    subCategory: 'Pendidikan Global',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1000&auto=format&fit=crop&q=80',
    excerpt: 'Studi poliritme dan microtonal tuning gamelan Jawa kini dipelajari formal oleh mahasiswa komposisi orkestra kelas dunia di Eropa.',
    author: 'Arya Wicaksono',
    authorRole: 'Etnomusikolog',
    authorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    date: '12 Nov 2026',
    readTime: '4 min baca',
    tags: ['Gamelan', 'Musik Tradisional', 'Konservatori Eropa', 'Etnomusikologi'],
    source: 'Asosiasi Komponis & Etnomusikologi Internasional',
    content: [
      'Gamelan Jawa dengan laras pelog dan slendro kini bukan lagi sekadar instrumen eksotis pengisi museum, melainkan mata kuliah wajib teknik komposisi poliritmik di sejumlah akademi musik terkemuka di Wina dan London.',
      'Para profesor musik mengamati bahwa struktur jalinan imbal dan kendangan gamelan memberikan pemahaman baru tentang tekstur musik heterofonik yang sangat kompleks dan mendalam bagi calon komponis modern.',
      'Pengakuan ini semakin memperkokoh posisi instrumen tradisional Indonesia di panggung seni musik klasik internasional.'
    ]
  },
  {
    id: 9,
    slug: 'riset-gastronomi-fermentasi-tempe-tradisional',
    title: 'Riset Gastronomi Nusantara: Menyingkap Manfaat Fermentasi Tempe Tradisional',
    category: 'Kriya & Tekstil',
    subCategory: 'Kuliner & Sains',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1000&auto=format&fit=crop&q=80',
    excerpt: 'Kultur kapang Rhizopus oligosporus lokal terbukti menghasilkan senyawa bioaktif pencegah inflamasi seluler berstandar pangan medis.',
    author: 'Dr. Maria Ulfah',
    authorRole: 'Peneliti Pangan Tradisional & Bioteknologi',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    date: '11 Nov 2026',
    readTime: '5 min baca',
    tags: ['Gastronomi', 'Tempe Tradisional', 'Riset Pangan', 'Kuliner Nusantara'],
    source: 'Pusat Studi Pangan Tradisional Nusantara',
    content: [
      'Warisan fermentasi tempe tradisional khas Jawa yang dibungkus daun pisang kembali membuktikan keunggulannya di ranah ilmiah. Riset komparatif menemukan bahwa fermentasi mikroflora daun pisang menghasilkan peptid bioaktif antioksidan yang lebih kaya dibandingkan kemasan plastik modern.',
      'Kultur kapang murni lokal terbukti membantu perbaikan mikrobioma usus dan menurunkan biomarker peradangan dalam uji klinis pendahuluan.',
      'Temuan ini mendorong pengusulan resmi tempe sebagai superfood warisan dunia yang menyehatkan bagi kesehatan global masa depan.'
    ]
  }
];

export const popularSearches = ['Tenun Ikat', 'Wayang Digital', 'Aksara Kuno', 'Gamelan', 'Batik Soga', 'Megalitikum'];

export const latestIntelligence = [
  { title: 'Kemendikbud terbitkan juknis fasilitasi dana abadi kebudayaan 2027', time: '2 jam lalu', tag: 'Regulasi' },
  { title: 'Festival Keraton se-Nusantara ke-XIV resmi digelar di Cirebon', time: '5 jam lalu', tag: 'Agenda' },
  { title: 'Pendaftaran kurator muda seni rupa kontemporer dibuka nasional', time: '8 jam lalu', tag: 'Peluang' },
  { title: 'Inventarisasi 120 motif songket Palembang masuk WBTb UNESCO', time: '1 hari lalu', tag: 'Heritage' },
  { title: 'Pameran kriya bambu nusantara di Osaka catat transaksi 14 Miliar', time: '2 hari lalu', tag: 'Ekonomi' },
];
