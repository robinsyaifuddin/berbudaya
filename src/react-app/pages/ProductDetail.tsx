import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import TopNavbar from '@/react-app/components/TopNavbar';
import { useCart } from '@/react-app/contexts/CartContext';
import { Heart, Star, Truck, Package, RotateCcw, Calendar, ShoppingCart } from 'lucide-react';

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
    description: 'Wayang kulit purwa tokoh Raden Gatotkaca kualitas pementasan (tancep mantap). Pewarnaan menggunakan cat prada emas berkualitas tinggi dengan teknik tatah sungging halus.',
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
      name: 'Batik Tulis Solo Premium',
      price: 850000,
      rating: 4.8,
      reviews: 124,
      category: 'Batik & Kain',
      image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=300&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'Wayang Kulit Rama Shinta',
      price: 1200000,
      rating: 4.9,
      reviews: 89,
      category: 'Wayang & Seni',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'Angklung Mini Set',
      price: 450000,
      rating: 4.7,
      reviews: 156,
      category: 'Alat Musik',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=400&fit=crop'
    },
    {
      id: 4,
      name: 'Keris Jawa Pusaka',
      price: 3500000,
      rating: 5.0,
      reviews: 45,
      category: 'Senjata Tradisional',
      image: 'https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?w=300&h=400&fit=crop'
    },
    {
      id: 5,
      name: 'Kain Songket Palembang',
      price: 1500000,
      rating: 4.8,
      reviews: 67,
      category: 'Batik & Kain',
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=400&fit=crop'
    },
    {
      id: 6,
      name: 'Anyaman Rotan Set',
      price: 180000,
      rating: 4.6,
      reviews: 342,
      category: 'Kerajinan',
      image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=300&h=400&fit=crop'
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
  const product = productData[id as keyof typeof productData] || productData['1'];
  const relatedProducts = getRelatedProducts(product.id);
  const customerReviews = getCustomerReviews(product.id);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
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
    if (!selectedSize) {
      alert('Mohon pilih ukuran terlebih dahulu');
      return;
    }
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      seller: product.seller,
      selectedSize: selectedSize,
      selectedColor: product.colors[selectedColor].name,
      category: product.category,
    });
    
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 3000);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'
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
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <span>›</span>
            <Link to="/marketplace" className="hover:text-gray-900">Marketplace</Link>
            <span>›</span>
            <span className="text-gray-900">Product detail</span>
          </div>

          {/* Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Left Column - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="bg-gray-100 rounded-lg overflow-hidden aspect-[3/4]">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`bg-gray-100 rounded-lg overflow-hidden aspect-square ${
                      selectedImage === index ? 'ring-2 ring-gray-900' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6">
              {/* Title & Seller */}
              <div>
                <p className="text-sm text-blue-600 mb-2 font-medium">{product.seller}</p>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center gap-3 mb-2">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-600">
                    {product.rating}/5 ({product.reviews} Ulasan)
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {product.category} • {product.location}
                </p>
              </div>

              {/* Price */}
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>
                {product.oldPrice && (
                  <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                    Hemat {formatPrice(product.oldPrice - product.price)}
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Deskripsi Produk</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Materials & Care */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-900">Bahan: </span>
                  <span className="text-sm text-gray-600">{product.materials}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-900">Perawatan: </span>
                  <span className="text-sm text-gray-600">{product.care}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 space-y-4">
                {/* Color Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    Pilih Warna
                  </label>
                  <div className="flex gap-2">
                    {product.colors.map((color: { name: string; class: string }, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`w-10 h-10 rounded-full ${color.class} ${
                          selectedColor === index ? 'ring-2 ring-offset-2 ring-blue-600' : 'ring-1 ring-gray-300'
                        }`}
                        title={color.name}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{product.colors[selectedColor].name}</p>
                </div>

                {/* Size Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    Pilih Ukuran {!selectedSize && <span className="text-red-600">*</span>}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                          selectedSize === size
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex gap-3">
                  <div className="flex items-center bg-gray-100 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 hover:bg-gray-200 rounded-l-lg transition-colors font-bold"
                    >
                      -
                    </button>
                    <span className="px-6 py-3 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 hover:bg-gray-200 rounded-r-lg transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Tambah ke Keranjang
                  </button>
                  <button className="p-3 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors group">
                    <Heart className="w-6 h-6 text-gray-700 group-hover:text-red-500" />
                  </button>
                </div>

                {/* Added to Cart Notification */}
                {showAddedToCart && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 animate-fade-in">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-green-900">Berhasil ditambahkan ke keranjang!</p>
                      <p className="text-xs text-green-700">Produk telah ditambahkan ke keranjang belanja Anda</p>
                    </div>
                    <button 
                      onClick={() => navigate('/cart')}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline"
                    >
                      Lihat Keranjang
                    </button>
                  </div>
                )}
              </div>

              {/* Shipping Info */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Pengiriman & Garansi
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium">Estimasi Pengiriman</p>
                      <p className="text-xs text-gray-500">{product.shipping.estimated}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium">Kurir</p>
                      <p className="text-xs text-gray-500">{product.shipping.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium">Garansi Pengembalian 7 Hari</p>
                      <p className="text-xs text-gray-500">Jika produk tidak sesuai</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium">Perkiraan Tiba</p>
                      <p className="text-xs text-gray-500">{product.shipping.arrival}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rating & Reviews Section */}
          <div className="bg-white rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Rating & Ulasan</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Overall Rating */}
              <div className="text-center">
                <div className="text-6xl font-bold text-gray-900 mb-2">{product.rating}</div>
                <div className="flex justify-center mb-2">{renderStars(product.rating)}</div>
                <p className="text-sm text-gray-600">dari {product.reviews} ulasan</p>
              </div>

              {/* Rating Bars */}
              <div className="lg:col-span-2 space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-sm font-medium">{stars}</span>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${calculateRatingPercentage(stars)}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {Math.round(calculateRatingPercentage(stars))}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="space-y-6">
              {customerReviews.map((review) => (
                <div key={review.id} className="border-t border-gray-200 pt-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="mb-3">{renderStars(review.rating)}</div>
                      <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                      {review.verified && (
                        <p className="text-xs text-green-600 mt-2">✓ Pembelian Terverifikasi</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* You Might Also Like */}
          <div>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Produk Terkait Lainnya
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/marketplace/${relatedProduct.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-shadow group"
                >
                  <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-1">{relatedProduct.category}</p>
                    <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 min-h-[40px]">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      {renderStars(relatedProduct.rating)}
                      <span className="text-xs text-gray-600">
                        ({relatedProduct.reviews})
                      </span>
                    </div>
                    <p className="text-base font-bold text-gray-900">{formatPrice(relatedProduct.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
