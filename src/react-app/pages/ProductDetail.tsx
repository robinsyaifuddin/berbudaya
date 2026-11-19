import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import TopNavbar from '@/react-app/components/TopNavbar';
import { useCart } from '@/react-app/contexts/CartContext';
import { useNotification } from '@/react-app/contexts/NotificationContext';
import { 
  Heart, Star, Truck, Package, RotateCcw, Calendar, ShoppingCart, 
  ChevronRight, ShieldCheck, MapPin, Store, Check, Info, Award,
  ArrowLeft, Share2, Clock
} from 'lucide-react';

const productData: Record<string, any> = {
  '1': {
    id: 1,
    name: 'Songket Pandai Sikek Motif Pucuak Rabuang Emas',
    price: 3850000,
    oldPrice: 4200000,
    seller: 'Pertenunan Harapan Ibu Pandai Sikek',
    rating: 4.95,
    reviews: 78,
    category: 'Kriya & Tekstil',
    location: 'Tanah Datar, Sumatera Barat',
    images: [
      'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600&h=800&fit=crop',
    ],
    sizes: ['2m x 1.05m (Set Kain + Selendang)'],
    colors: [
      { name: 'Merah Marun Emas', class: 'bg-red-900' },
      { name: 'Hitam Emas Adat', class: 'bg-black' }
    ],
    culturalTag: {
      ethnicGroup: 'Minangkabau',
      philosophy: 'Motif Pucuak Rabuang melambangkan kearifan adat: waktu kecil berguna sebagai rebung penawar lapar, setelah besar menjadi bambu penyangga rumah adat dan masyarakat.',
      technique: 'Tenun Balapak menggunakan alat tenun panta tradisional selama 45 hari pengerjaan dengan pakan benang emas murni.',
      curationStandard: 'Terkurasi Dewan Kesenian Daerah & Bersertifikat Asal Geografis',
      preservationImpact: 'Mendukung keberlanjutan 12 perajin tenun sepuh di Nagari Pandai Sikek.'
    },
    description: 'Kain Songket tenun tangan otentik khas Nagari Pandai Sikek. Memadukan warna merah marun klasik dengan sulaman benang emas pakan makao. Digunakan pada upacara batagak gala penghulu maupun pesta perkawinan adat luhak nan tigo.',
    materials: 'Benang Katun Sutra Halus, Benang Emas Makao Asli, Pewarna Alami',
    care: 'Jangan dicuci mesin. Simpan dengan cara digulung rapi dan dilapisi kain mori putih.',
    shipping: {
      estimated: '3-5 Hari Kerja',
      type: 'JNE/J&T Regular + Asuransi Penuh',
      arrival: '16-19 November 2026'
    }
  },
  '2': {
    id: 2,
    name: 'Keris Gayaman Surakarta Luk 7 Pamor Wos Wutah',
    price: 5200000,
    oldPrice: 5800000,
    seller: 'Besalen Empu Subandi Joyo',
    rating: 5.0,
    reviews: 42,
    category: 'Senjata Tradisional',
    location: 'Surakarta, Jawa Tengah',
    images: [
      'https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop',
    ],
    sizes: ['Bilah 36 cm (Total 49 cm)'],
    colors: [
      { name: 'Warangka Timoho Pelet', class: 'bg-amber-950' }
    ],
    culturalTag: {
      ethnicGroup: 'Jawa (Mataraman)',
      philosophy: 'Pamor Beras Wutah (Wos Wutah) menyimbolkan doa kelimpahan rezeki, ketentraman batin, dan keharmonisan rumah tangga.',
      technique: 'Ditempa manual ratusan lipatan bilah besi, baja, dan batu meteorit titanium asli dengan metode tempa lipat tradisi Abad ke-17.',
      curationStandard: 'Sertifikasi Keaslian Logam & Kurasi Paguyuban Tosan Aji Solo',
      preservationImpact: 'Melestarikan tradisi empu muda penerus besalen tosan aji Jawa Tengah.'
    },
    description: 'Keris mahakarya tradisi Surakarta Hadiningrat model Gayaman. Bilah berlekuk 7 (luk pitu) yang seimbang dan anggun, dilengkapi warangka kayu Timoho pelet pilihan serta pendok tembaga tatahan halus.',
    materials: 'Besi Tempa Antik, Meteorit Nikel, Kayu Timoho Pelet, Kuningan Tatah Solo',
    care: 'Olesi tipis dengan minyak cendana atau melati setiap 3 bulan sekali agar terhindar dari oksidasi.',
    shipping: {
      estimated: '4-6 Hari Kerja',
      type: 'Cargo Khusus Pusaka (Asuransi Penuh)',
      arrival: '17-21 November 2026'
    }
  },
  '3': {
    id: 3,
    name: 'Kain Tenun Ikat Sumba Timur Motif Patola Ratu',
    price: 2950000,
    oldPrice: undefined,
    seller: 'Sanggar Tenun Oriang Prailiu',
    rating: 4.9,
    reviews: 56,
    category: 'Batik & Kain',
    location: 'Waingapu, Nusa Tenggara Timur',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=600&h=800&fit=crop'
    ],
    sizes: ['2.4m x 1.15m'],
    colors: [
      { name: 'Kombu Merah Indigo Alami', class: 'bg-red-800' }
    ],
    culturalTag: {
      ethnicGroup: 'Sumba (Marapu)',
      philosophy: 'Figur kuda (Andung) dan rusa melambangkan keberanian bangsawan, kepemimpinan bijaksana, serta penghormatan pada arwah leluhur Marapu.',
      technique: 'Ikat lungsi celup 4 tingkatan warna alami ekstrak akar mengkudu (kombu) dan daun nila (wora) memakan waktu 4-6 bulan pengerjaan.',
      curationStandard: 'Indikasi Geografis Tenun Ikat Sumba Timur',
      preservationImpact: '100% laba dibagikan langsung ke kelompok penenun perempuan di desa adat Prailiu.'
    },
    description: 'Hinggi Kombu Tenun Ikat Sumba Timur karya maestro perempuan Sumba. Tekstur tebal dengan kekuatan benang kapas pintal tangan asli. Pewarnaan alami bebas bahan kimia sintetik.',
    materials: 'Kapas Lokal Pintal Tangan, Ekstrak Daun Nila, Akar Pohon Mengkudu',
    care: 'Hindari pencucian dengan detergen kimiawi keras; cukup diangin-anginkan di tempat teduh berangin.',
    shipping: {
      estimated: '5-7 Hari Kerja',
      type: 'JNE/J&T Regular',
      arrival: '18-22 November 2026'
    }
  },
  '4': {
    id: 4,
    name: 'Wayang Kulit Purwa Tokoh Gatotkaca Gagrag Banyumasan',
    price: 1850000,
    oldPrice: 2100000,
    seller: 'Paguyuban Wayang Gendon Giri',
    rating: 4.88,
    reviews: 64,
    category: 'Wayang & Seni',
    location: 'Banyumas, Jawa Tengah',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&h=800&fit=crop'
    ],
    sizes: ['Tinggi 72 cm (Total Gapit 95 cm)'],
    colors: [
      { name: 'Prada Emas Sungging', class: 'bg-amber-500' }
    ],
    culturalTag: {
      ethnicGroup: 'Jawa Banyumasan',
      philosophy: 'Ksatria Pringgandani Gatotkaca melambangkan kesetiaan berbangsa, keteguhan hati memegang sumpah, dan keberanian membela kebenaran tanpa pamrih.',
      technique: 'Ditatah secara presisi oleh pengrajin sepuh menggunakan kulit kerbau bunting kering dan gapit sungu (tanduk) kerbau bule asli.',
      curationStandard: 'Standar Pementasan Wayang Lakon Mahabarata',
      preservationImpact: 'Mendukung regenerasi pembuat wayang kulit di pedesaan Banyumas.'
    },
    description: '',
    materials: 'Kulit Kerbau Pilihan, Gapit Sungu Tanduk Kerbau Asli, Pewarna Prada Emas',
    care: 'Simpan di dalam kotak kayu/kain beludru kering dengan kapur barus halus untuk mencegah serangga.',
    shipping: {
      estimated: '3-5 Hari Kerja',
      type: 'JNE Regular (Kemasan Kayu Fragile)',
      arrival: '17-20 November 2026'
    }
  },
  '5': {
    id: 5,
    name: 'Noken Rajut Serat Kulit Kayu Mahkota Kasuari Papua',
    price: 650000,
    oldPrice: undefined,
    seller: 'Mama-Mama Noken Wamena Mandiri',
    rating: 4.98,
    reviews: 112,
    category: 'Kerajinan',
    location: 'Wamena, Lembah Baliem, Papua Pegunungan',
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=600&h=800&fit=crop'
    ],
    sizes: ['Lebar 32 cm x Panjang 38 cm'],
    colors: [
      { name: 'Coklat Alami Serat Pohon', class: 'bg-amber-800' }
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
    care: 'Bisa dicuci dengan air tawar dingin jika kotor, lalu dikeringkan di tempat terbuka teduh.',
    shipping: {
      estimated: '6-9 Hari Kerja',
      type: 'Pos Indonesia Kilat Khusus',
      arrival: '19-24 November 2026'
    }
  },
  '6': {
    id: 6,
    name: 'Kecapi Sunda Rincik Perahu Kayu Mahoni Ukir Kujang',
    price: 1450000,
    oldPrice: 1650000,
    seller: 'Bengkel Nada Parahyangan',
    rating: 4.92,
    reviews: 38,
    category: 'Alat Musik',
    location: 'Sumedang, Jawa Barat',
    images: [
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1582735689851-574f29054c5f?w=600&h=800&fit=crop'
    ],
    sizes: ['Panjang 98 cm x Lebar 22 cm'],
    colors: [
      { name: 'Coklat Mahoni Klasik', class: 'bg-amber-900' }
    ],
    culturalTag: {
      ethnicGroup: 'Sunda',
      philosophy: 'Alunan dawai kecapi rincik memvisualisasikan gemercik air pegunungan Priangan yang menenangkan batin dan menjunjung keselarasan manusia dengan alam.',
      technique: 'Kotak resonansi dibuat dari kayu mahoni solid berpola perahu koral, distem presisi tangga nada laras Salendro/Madenda.',
      curationStandard: 'Standar Konser Gamelan Tembang Sunda Cianjuran',
      preservationImpact: 'Menyediakan instrumen berkualitas bagi sanggar tari dan musik anak muda tanah Pasundan.'
    },
    description: 'Kecapi Sunda model Parahu dengan 15 dawai kawat baja anti karat. Dilengkapi ukiran ornamen kujang khas Sunda di bagian buritan dan kepala perahu.',
    materials: 'Kayu Mahoni Solid Kering Udara 5 Tahun, Kawat Baja Jerman, Peninggi Kayu Sonokeling',
    care: 'Kendurkan dawai sedikit jika tidak digunakan dalam jangka lama, simpan dalam suhu ruangan stabil.',
    shipping: {
      estimated: '3-5 Hari Kerja',
      type: 'JNE Trucking (Packing Kayu Aman)',
      arrival: '17-20 November 2026'
    }
  }
};

const getRelatedProducts = (currentId: number) => {
  const allProducts = [
    {
      id: 1,
      name: 'Kain Songket Silungkang Pandai Sikek Benang Emas',
      category: 'Tenun & Songket',
      price: 1850000,
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 120,
      badge: 'New',
      seller: 'Pertenunan Minang Asli'
    },
    {
      id: 2,
      name: 'Keris Luk 7 Gayaman Surakarta Pamor Wos Wutah',
      category: 'Pusaka Tradisional',
      price: 3200000,
      image: 'https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?w=500&h=500&fit=crop',
      rating: 5.0,
      reviews: 86,
      badge: 'New',
      seller: 'Besalen Empu Joyo'
    },
    {
      id: 3,
      name: 'Tas Noken Anyaman Serat Kayu Asli Lembah Wamena',
      category: 'Kerajinan Anyam',
      price: 450000,
      image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 42,
      badge: 'New',
      seller: 'Mama Noken Papua'
    },
    {
      id: 4,
      name: 'Cangkir Gerabah Kasongan Set Isi 2 Tanah Liat Halus',
      category: 'Gerabah & Keramik',
      price: 185000,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 64,
      badge: 'New',
      seller: 'Sanggar Kasongan Bantul'
    },
    {
      id: 5,
      name: 'Lampu Meja Ukir Kayu Jati Relief Wayang Minimalis',
      category: 'Dekorasi Rumah',
      price: 550000,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 91,
      badge: 'New',
      seller: 'Pengrajin Ukir Jepara'
    }
  ];
  
  return allProducts.filter(p => p.id !== currentId).slice(0, 4);
};

const getCustomerReviews = (productId: number) => {
  const reviewsData: Record<string, any[]> = {
    '1': [
      {
        id: 1,
        name: 'Siti Nurhaliza',
        rating: 5,
        date: '28 Okt 2024',
        comment: "Batik tulis yang luar biasa! Kualitas premium dengan motif yang sangat halus. Sudah saya pakai untuk acara pernikahan adik dan banyak yang memuji. Pengrajinnya sangat teliti. Sangat puas!",
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
      },
      {
        id: 2,
        name: 'Budi Santoso',
        rating: 5,
        date: '15 Okt 2024',
        comment: "Koleksi batik ke-5 saya dari toko ini. Selalu konsisten kualitasnya. Warna soga alami yang indah dan tahan lama. Packaging juga rapih dan aman.",
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
      }
    ],
    '2': [
      {
        id: 1,
        name: 'Agus Widjaya',
        rating: 5,
        date: '1 Nov 2024',
        comment: "Wayang kulit yang sangat indah! Detail ukirannya presisi sekali. Saya kolektor wayang dan ini termasuk yang terbaik. Worth the price. Terima kasih untuk karya seni yang menakjubkan ini.",
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
      },
      {
        id: 2,
        name: 'Dewi Kusuma',
        rating: 5,
        date: '20 Okt 2024',
        comment: "Pembelian untuk museum budaya kami. Kualitas luar biasa dengan sertifikat keaslian. Packing sangat aman. Highly recommended untuk kolektor serius!",
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
      }
    ],
    '3': [
      {
        id: 1,
        name: 'Rina Puspita',
        rating: 5,
        date: '5 Nov 2024',
        comment: "Angklung set yang sempurna untuk sekolah kami! Nada-nadanya jernih dan sudah ter-tuning dengan baik. Anak-anak sangat senang belajar musik tradisional dengan angklung ini.",
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
      },
      {
        id: 2,
        name: 'Muhammad Rizki',
        rating: 4,
        date: '22 Okt 2024',
        comment: "Kualitas bagus, suara resonan. Sedikit penyesuaian di beberapa nada tapi overall sangat puas. Panduan bermainnya juga mudah dipahami. Recommended!",
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop'
      }
    ],
    '4': [
      {
        id: 1,
        name: 'Raden Wijaya',
        rating: 5,
        date: '10 Nov 2024',
        comment: "Keris pusaka yang benar-benar berkualitas tinggi. Pamor besinya indah sekali, warangka dari kayu trembalo dengan ukiran yang detail. Empu-nya sangat berpengalaman. Sertifikat keaslian juga lengkap. Sangat puas dengan pusaka warisan ini.",
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
      }
    ],
    '5': [
      {
        id: 1,
        name: 'Lestari Indah',
        rating: 5,
        date: '3 Nov 2024',
        comment: "Songket Palembang yang sangat mewah! Benang emasnya benar-benar 24k, kilauannya natural tidak norak. Saya pakai untuk kebaya pengantin dan hasilnya memukau. Terima kasih sudah menjaga kualitas kerajinan tradisional!",
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop'
      },
      {
        id: 2,
        name: 'Kartika Sari',
        rating: 5,
        date: '18 Okt 2024',
        comment: "Pembelian kedua dari toko ini. Konsisten dengan kualitas. Motif bungo pacik sangat cantik. Packaging premium, pengiriman cepat. Highly recommended!",
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop'
      }
    ],
    '6': [
      {
        id: 1,
        name: 'Nina Handayani',
        rating: 5,
        date: '7 Nov 2024',
        comment: "Set anyaman rotan yang cantik dan fungsional! Anyamannya rapih, rotan kuat dan awet. Saya pakai untuk hampers lebaran kemarin dan banyak yang suka. Harga terjangkau untuk kualitas sebagus ini.",
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop'
      },
      {
        id: 2,
        name: 'Dian Pratiwi',
        rating: 4,
        date: '25 Okt 2024',
        comment: "Bagus untuk dekorasi rumah! Natural dan eco-friendly. Beberapa serat rotan ada yang sedikit lepas tapi tidak mengurangi kualitas. Overall sangat puas.",
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop'
      }
    ]
  };
  
  return reviewsData[productId.toString()] || [];
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { warning, success } = useNotification();
  const product = productData[id as keyof typeof productData] || productData['1'];
  const relatedProducts = getRelatedProducts(product.id);
  const customerReviews = getCustomerReviews(product.id);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      seller: product.seller,
      selectedSize: selectedSize || product.sizes?.[0] || 'Standard',
      selectedColor: product.colors?.[selectedColor]?.name || '',
      category: product.category,
    });
    
    success(`"${product.name}" berhasil ditambahkan ke keranjang`);
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 3000);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-neutral-200 text-neutral-200'
            }`}
          />
        ))}
      </div>
    );
  };

  const calculateRatingPercentage = (stars: number) => {
    const total = product.reviews;
    const count = stars === 5 ? 400 : stars === 4 ? 150 : stars === 3 ? 70 : stars === 2 ? 20 : 10;
    return (count / total) * 100;
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-900 font-sans antialiased pb-20">
      <TopNavbar />
      
      <div className="pt-16 sm:pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
          {/* Tombol Kembali Simple */}
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-base font-medium text-blue-700 hover:text-blue-800 transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Kembali</span>
            </button>
          </div>

          {/* Top Hero Layout: 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-10">
            {/* Left Column: Product Image in Rounded Container (Compact & Hanya 1 Gambar) */}
            <div className="lg:col-span-5">
              <div className="relative bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-sm overflow-hidden">
                {/* Badge Favorit di pojok kiri atas foto */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#133384] text-white shadow-xs">
                    FAVORIT
                  </span>
                </div>

                {/* Main Product Image (Hanya 1 Gambar & Ukuran Lebih Pas) */}
                <div className="relative w-full aspect-square max-h-[290px] rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Title, Price, Form Options & CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-start space-y-4">
              {/* Category Tag */}
              <div>
                <p className="text-[11px] font-bold tracking-wider uppercase text-[#133384] mb-1">
                  {product.category}
                </p>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                  {product.name}
                </h1>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-base text-slate-400 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>

              {/* Short Intro Description */}
              {product.description && (
                <p className="text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Action Row: Stepper + Primary Button + Share */}
              <div className="flex items-center gap-2.5 pt-1">
                {/* Stepper Quantity */}
                <div className="flex items-center justify-between border border-slate-200 bg-white rounded-xl h-11 px-1.5 shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent font-medium text-sm transition-colors"
                    aria-label="Kurangi"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs sm:text-sm font-semibold text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 font-medium text-sm transition-colors"
                    aria-label="Tambah"
                  >
                    +
                  </button>
                </div>

                {/* Primary CTA Blue Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-11 px-5 rounded-xl bg-[#133384] hover:bg-[#0e2666] text-white text-xs sm:text-sm font-semibold transition-all active:scale-[0.99] flex items-center justify-center shadow-xs"
                >
                  Pesan Sekarang
                </button>

                {/* Share Button */}
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    success('Tautan produk berhasil disalin!');
                  }}
                  className="h-11 w-11 flex items-center justify-center border border-slate-200 bg-white rounded-xl text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors shrink-0"
                  aria-label="Bagikan"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Feedback Notifikasi */}
              {showAddedToCart && (
                <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white stroke-[3]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-emerald-950">Berhasil ditambahkan ke pesanan</p>
                    <p className="text-[11px] text-emerald-800 truncate">Produk siap di-checkout bersama karya lainnya.</p>
                  </div>
                  <button 
                    onClick={() => navigate('/cart')}
                    className="text-xs font-semibold text-emerald-900 hover:underline shrink-0"
                  >
                    Lihat Keranjang
                  </button>
                </div>
              )}

              {/* Informasi Toko Pengrajin */}
              <div className="pt-2">
                <Link
                  to="/toko"
                  className="group inline-flex items-center gap-3 p-2.5 -ml-1 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                >
                  <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-700 shrink-0 group-hover:bg-[#133384] group-hover:text-white transition-colors">
                    <Store className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-900 group-hover:text-[#133384] transition-colors truncate">
                        {product.seller || 'Pertenunan Harapan Ibu Pandai Sikek'}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#133384] group-hover:translate-x-0.5 transition-all" />
                    </div>
                    {product.location && (
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{product.location}</span>
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Section: Detail Mahakarya & Spesifikasi (Tabel Bersih Horizontal) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-12 shadow-xs">
            <h2 className="text-xs font-bold tracking-wider uppercase text-slate-800 mb-6 pb-4 border-b border-slate-100">
              DETAIL MAHAKARYA & SPESIFIKASI
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 py-2 border-b border-slate-100">
                <span className="sm:col-span-4 text-slate-500 font-medium">Kategori & Material</span>
                <span className="sm:col-span-8 text-slate-800 font-normal">{product.category} ({product.materials})</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 py-2 border-b border-slate-100">
                <span className="sm:col-span-4 text-slate-500 font-medium">Gaya Rangkaian / Teknik</span>
                <span className="sm:col-span-8 text-slate-800 font-normal">
                  {product.culturalTag?.technique || 'Teknik pahatan & tenun otentik nusantara'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 py-2 border-b border-slate-100">
                <span className="sm:col-span-4 text-slate-500 font-medium">Kemasan & Sentuhan Akhir</span>
                <span className="sm:col-span-8 text-slate-800 font-normal">
                  {product.care} Dilengkapi packing kayu aman & sertifikat keaslian.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 py-2">
                <span className="sm:col-span-4 text-slate-500 font-medium">Momen Paling Tepat</span>
                <span className="sm:col-span-8 text-slate-800 font-normal">
                  Peringatan Hari Budaya, Koleksi Pusaka, Dekorasi Interior Mewah, Apresiasi Seni & Cinderamata Kehormatan
                </span>
              </div>
            </div>
          </div>

          {/* Section: Koleksi Pelengkap / Pilihan Mahakarya Sejenis */}
          <div>
            <div className="mb-6">
              <p className="text-xs font-bold tracking-wider uppercase text-[#133384] mb-1">
                KOLEKSI PELENGKAP
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Pilihan Mahakarya Sejenis Dari Pengrajin
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="group bg-white rounded-xl p-3 border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Container with Blue "New" Pill */}
                    <div className="relative aspect-square w-full rounded-lg bg-slate-50 overflow-hidden mb-2.5 flex items-center justify-center">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        {relatedProduct.badge || 'New'}
                      </span>
                    </div>

                    {/* Title & Specs */}
                    <h3 className="font-semibold text-slate-900 text-[12px] line-clamp-2 leading-snug mb-1 min-h-[32px] group-hover:text-blue-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 mb-1">{relatedProduct.category}</p>

                    {/* Price */}
                    <div className="text-[13px] font-bold text-slate-900 mb-1.5">
                      {formatPrice(relatedProduct.price)}
                    </div>

                    {/* Stars Rating */}
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-2">
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-400">({relatedProduct.reviews})</span>
                    </div>
                  </div>

                  {/* Bottom Action: Tombol Lihat + Icon Keranjang */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <Link
                      to={`/marketplace/${relatedProduct.id}`}
                      className="flex-1 py-1.5 px-3 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-[11px] font-semibold rounded-lg text-center transition-colors"
                    >
                      Lihat
                    </Link>
                    <button
                      onClick={() => {
                        addToCart({
                          id: relatedProduct.id,
                          name: relatedProduct.name,
                          price: relatedProduct.price,
                          image: relatedProduct.image,
                          category: relatedProduct.category || 'Kriya',
                          quantity: 1,
                          seller: relatedProduct.seller || 'Pengrajin Budaya'
                        });
                        success(`Berhasil menambahkan ${relatedProduct.name} ke keranjang belanja!`);
                      }}
                      className="p-1.5 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 rounded-lg transition-colors flex items-center justify-center shrink-0 active:scale-95"
                      title="Tambah ke Keranjang"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
