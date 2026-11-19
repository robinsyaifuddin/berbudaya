export interface CampaignDetail {
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
  impactStory: {
    beneficiaries: number;
    locations: number;
    achievement: string;
  };
  faq: {
    question: string;
    answer: string;
  }[];
}

export const campaignData: Record<string, CampaignDetail> = {
  '1': {
    id: 1,
    title: 'RESTORASI CANDI BOROBUDUR: SELAMATKAN WARISAN DUNIA UNESCO',
    description: 'Candi Borobudur mengalami kerusakan akibat gempa dan erosi. Bantu restorasi relief dan struktur candi agar tetap kokoh untuk generasi mendatang.',
    fullDescription: `Candi Borobudur, salah satu keajaiban dunia yang telah berdiri sejak abad ke-9 Masehi, kini menghadapi ancaman serius. Gempa bumi berkekuatan 5.9 SR pada tahun lalu telah menyebabkan keretakan pada lebih dari 150 panel relief dan beberapa stupa mengalami pergeseran struktur.

Ditambah dengan erosi alami akibat curah hujan tinggi dan aktivitas vulkanik Gunung Merapi, kondisi candi semakin memprihatinkan. Jika tidak segera ditangani, kita berisiko kehilangan salah satu warisan budaya dunia yang paling berharga ini.

MENGAPA INI PENTING?
• Candi Borobudur adalah Warisan Dunia UNESCO sejak 1991
• Menjadi situs Buddha terbesar di dunia dengan 2.672 panel relief
• Dikunjungi lebih dari 3,7 juta wisatawan per tahun
• Menjadi ikon kebanggaan Indonesia dan Asia Tenggara
• Nilai sejarah dan spiritual yang tak ternilai harganya

APA YANG AKAN KAMI LAKUKAN?
Dengan donasi Anda, kami akan:

1. Restorasi Relief Candi (40% dana)
   - Perbaikan 150+ panel relief yang retak dan rusak
   - Menggunakan teknik konservasi UNESCO
   - Pembersihan lumut dan organisme pengganggu
   - Dokumentasi digital resolusi tinggi

2. Perkuatan Struktur (35% dana)
   - Stabilisasi fondasi dengan sistem drainage modern
   - Perbaikan stupa yang bergeser
   - Penguatan dinding dan tangga
   - Monitoring struktur dengan sensor IoT

3. Sistem Pencegahan (15% dana)
   - Instalasi sistem drainase canggih
   - Perlindungan dari erosi air hujan
   - Sistem monitoring gempa real-time
   - Jalur evakuasi wisatawan yang lebih aman

4. Edukasi & Dokumentasi (10% dana)
   - Film dokumenter restorasi
   - Buku panduan konservasi untuk generasi mendatang
   - Workshop untuk tenaga ahli lokal
   - Museum virtual 360° Borobudur

DAMPAK YANG AKAN DICAPAI:
✅ Candi Borobudur akan aman untuk 50+ tahun ke depan
✅ Meningkatkan standar konservasi candi di Indonesia
✅ Menciptakan 150+ lapangan kerja untuk ahli konservasi lokal
✅ Melestarikan 2.672 panel relief yang menceritakan ajaran Buddha
✅ Menyelamatkan sumber ekonomi untuk 10.000+ UMKM di sekitar candi

Tim ahli kami terdiri dari:
• 25 arkeolog bersertifikat UNESCO
• 40 teknisi konservasi berpengalaman 15+ tahun
• 10 insinyur struktur sipil
• Konsultan internasional dari Jepang dan Prancis

Waktu adalah segalanya. Setiap hari yang berlalu, kerusakan semakin parah. Mari bersama-sama menyelamatkan Candi Borobudur untuk anak cucu kita!`,
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop'
    ],
    raised: 45250000,
    target: 100000000,
    daysLeft: 45,
    donors: 1245,
    category: 'Pelestarian',
    location: 'Magelang, Jawa Tengah',
    organizer: 'Yayasan Warisan Budaya Indonesia',
    verified: true,
    badge: 'URGENT! Restorasi Segera Diperlukan',
    milestones: [
      {
        title: 'Survei & Dokumentasi Kerusakan',
        description: 'Pemetaan lengkap semua kerusakan dengan teknologi 3D scanning',
        target: 15000000,
        completed: true
      },
      {
        title: 'Restorasi Panel Relief Prioritas',
        description: 'Perbaikan 50 panel relief yang paling parah',
        target: 45000000,
        completed: true
      },
      {
        title: 'Perkuatan Struktur Stupa',
        description: 'Stabilisasi dan perbaikan 15 stupa utama',
        target: 70000000,
        completed: false
      },
      {
        title: 'Sistem Drainage & Monitoring',
        description: 'Instalasi sistem pencegahan kerusakan jangka panjang',
        target: 100000000,
        completed: false
      }
    ],
    updates: [
      {
        date: '3 November 2024',
        title: 'Pencapaian 45% dari Target!',
        content: 'Alhamdulillah, berkat dukungan 1.245 donatur, kami telah mencapai 45% dari target! Pekerjaan restorasi panel relief fase pertama telah dimulai dengan tim 15 ahli konservasi.',
        image: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&h=400&fit=crop'
      },
      {
        date: '28 Oktober 2024',
        title: 'Tim Ahli UNESCO Telah Tiba',
        content: '5 konsultan konservasi dari UNESCO World Heritage Centre telah bergabung dengan tim kami. Mereka akan memberikan supervisi untuk memastikan restorasi sesuai standar internasional.',
        image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&h=400&fit=crop'
      },
      {
        date: '20 Oktober 2024',
        title: 'Dokumentasi 3D Scanning Selesai',
        content: 'Proses scanning 3D seluruh candi telah selesai! Data ini akan menjadi arsip digital permanen dan membantu proses restorasi menjadi lebih presisi.'
      }
    ],
    impactStory: {
      beneficiaries: 3700000,
      locations: 1,
      achievement: 'Menyelamatkan warisan dunia untuk generasi mendatang'
    },
    faq: [
      {
        question: 'Apakah donasi saya akan langsung digunakan untuk restorasi?',
        answer: '100% donasi akan digunakan untuk program restorasi. Kami memiliki transparansi penuh dan laporan keuangan yang dapat diakses publik setiap bulan.'
      },
      {
        question: 'Berapa lama waktu yang dibutuhkan untuk menyelesaikan restorasi?',
        answer: 'Restorasi fase pertama ditargetkan selesai dalam 18 bulan. Namun monitoring dan pemeliharaan akan berlanjut untuk jangka panjang.'
      },
      {
        question: 'Apakah saya bisa mengunjungi lokasi restorasi?',
        answer: 'Ya! Kami akan mengadakan tur khusus untuk donatur yang berkontribusi minimal Rp 1.000.000. Anda akan dipandu oleh tim ahli konservasi kami.'
      },
      {
        question: 'Bagaimana jika target tidak tercapai?',
        answer: 'Dana yang terkumpul tetap akan digunakan untuk restorasi sesuai prioritas. Kami akan melakukan fase restorasi bertahap sesuai dana yang tersedia.'
      }
    ]
  },
  '2': {
    id: 2,
    title: 'SELAMATKAN PENGRAJIN BATIK TULIS SOLO DARI KEPUNAHAN',
    description: 'Pengrajin batik tulis tradisional Solo terancam gulung tikar. Bantu mereka dengan modal usaha, pelatihan, dan akses pasar yang lebih luas.',
    fullDescription: `Di tengah gempuran batik printing yang murah dan cepat, pengrajin batik tulis tradisional Solo kini berada di ujung tanduk. Dari 500 pengrajin pada tahun 2010, kini hanya tersisa 180 pengrajin aktif. Rata-rata usia mereka di atas 50 tahun, dan hampir tidak ada regenerasi.

KONDISI YANG MEMPRIHATINKAN:
• Penghasilan pengrajin hanya Rp 50.000-100.000 per hari
• Tidak ada modal untuk membeli bahan baku berkualitas
• Akses pasar terbatas, tergantung tengkulak
• Tidak ada pengetahuan pemasaran digital
• Rumah produksi yang tidak layak dan pengap
• Anak-anak mereka memilih profesi lain karena tidak menjanjikan

Ibu Sumini (62 tahun), sudah membatik selama 45 tahun. "Saya tidak ingin seni batik tulis punah. Tapi anak saya tidak mau melanjutkan karena penghasilannya kecil dan tidak stabil," ujarnya dengan mata berkaca-kaca.

SOLUSI KOMPREHENSIF KAMI:

1. MODAL USAHA (40% dana - Rp 14 juta)
   • Hibah modal Rp 5 juta per pengrajin untuk 50 pengrajin
   • Pembelian bahan baku berkualitas tinggi (kain, malam, pewarna alami)
   • Peralatan canting modern yang ergonomis
   • Stock buffer untuk 3 bulan produksi

2. PELATIHAN & PENGEMBANGAN (25% dana - Rp 8,75 juta)
   • Workshop desain motif kontemporer yang tetap tradisional
   • Pelatihan fotografi produk untuk jualan online
   • Kelas social media marketing & marketplace
   • Manajemen keuangan dan pembukuan usaha
   • Standardisasi kualitas dan packaging premium

3. AKSES PASAR (25% dana - Rp 8,75 juta)
   • Pembangunan website e-commerce kolektif
   • Booth di 5 exhibition nasional
   • Kerjasama dengan hotel dan boutique
   • MOU dengan brand fashion untuk custom batik
   • Export marketing ke Jepang dan Eropa

4. INFRASTRUKTUR (10% dana - Rp 3,5 juta)
   • Renovasi 10 rumah produksi dengan ventilasi baik
   • Sistem pewarnaan yang ramah lingkungan
   • Ruang pamer kolektif di pusat kota Solo
   • Studio foto untuk katalog produk

DAMPAK NYATA YANG AKAN DICAPAI:
✅ 180 pengrajin batik tulis Solo terselamatkan
✅ Pendapatan meningkat 300% dari Rp 1,5 juta menjadi Rp 6 juta per bulan
✅ 50 pemuda akan dilatih sebagai generasi penerus
✅ 500 desain motif baru yang relevan dengan trend modern
✅ Ekspor batik Solo ke 5 negara
✅ Melestarikan warisan budaya tak benda UNESCO

TESTIMONI PENGRAJIN:
"Saya sempat putus asa dan ingin berhenti. Tapi program ini memberikan saya harapan baru. Anak saya sekarang tertarik belajar batik karena melihat prospeknya bagus." - Pak Joko (55 tahun)

Target kami ambisius tapi realistis. Dengan modal yang tepat, bimbingan bisnis, dan akses pasar yang luas, pengrajin batik Solo bisa bangkit dan bersaing!

Setiap Rp 100.000 yang Anda donasikan = 1 kain batik tulis bisa diproduksi = 1 hari kerja untuk pengrajin = 1 warisan budaya terselamatkan.

Mari bersama selamatkan batik tulis Solo sebelum terlambat!`,
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1609619385002-f40f5e5bae7f?w=800&h=600&fit=crop'
    ],
    raised: 18750000,
    target: 35000000,
    daysLeft: 30,
    donors: 456,
    category: 'Ekonomi Kreatif',
    location: 'Solo, Jawa Tengah',
    organizer: 'Komunitas Batik Nusantara',
    verified: true,
    badge: 'URGENT! 50+ Pengrajin Terancam',
    milestones: [
      {
        title: 'Distribusi Modal Usaha Tahap 1',
        description: 'Modal Rp 5 juta untuk 25 pengrajin pertama',
        target: 12500000,
        completed: true
      },
      {
        title: 'Workshop Desain & Marketing',
        description: 'Pelatihan intensif 3 hari untuk 50 pengrajin',
        target: 21250000,
        completed: false
      },
      {
        title: 'Launching E-commerce Platform',
        description: 'Website marketplace khusus batik Solo',
        target: 28000000,
        completed: false
      },
      {
        title: 'Exhibition & Export Readiness',
        description: 'Persiapan ekspor dan pameran internasional',
        target: 35000000,
        completed: false
      }
    ],
    updates: [
      {
        date: '5 November 2024',
        title: 'Modal Usaha Tahap 1 Telah Disalurkan!',
        content: '25 pengrajin batik telah menerima modal usaha Rp 5 juta masing-masing. Mereka sangat bersyukur dan termotivasi untuk meningkatkan produksi!',
        image: 'https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=800&h=400&fit=crop'
      },
      {
        date: '30 Oktober 2024',
        title: 'Workshop Fotografi Produk Sukses Digelar',
        content: '50 pengrajin mengikuti pelatihan fotografi produk dan social media marketing. Antusiasme sangat tinggi dan banyak yang langsung praktek!'
      },
      {
        date: '22 Oktober 2024',
        title: 'Kunjungan Buyer dari Jepang',
        content: 'Tim buyer dari Tokyo mengunjungi kampung batik kami dan tertarik untuk order 500 pcs batik tulis untuk butik mereka!'
      }
    ],
    impactStory: {
      beneficiaries: 180,
      locations: 5,
      achievement: '25 pengrajin telah menerima bantuan dan pendapatan meningkat 150%'
    },
    faq: [
      {
        question: 'Bagaimana cara penyaluran modal usaha?',
        answer: 'Modal disalurkan langsung ke rekening pengrajin setelah melalui verifikasi dan assessment kebutuhan. Kami juga memberikan pendampingan penggunaan dana.'
      },
      {
        question: 'Apakah ada bunga atau harus dikembalikan?',
        answer: 'Tidak! Ini adalah hibah murni, bukan pinjaman. Pengrajin tidak perlu mengembalikan dana yang diterima.'
      },
      {
        question: 'Bagaimana Anda memastikan pengrajin tidak kembali kesulitan?',
        answer: 'Kami memberikan pendampingan bisnis selama 12 bulan, akses pasar yang luas, dan membangun koperasi pengrajin untuk sustainability jangka panjang.'
      }
    ]
  }
};

// Export untuk campaign lainnya (akan dilanjutkan)
