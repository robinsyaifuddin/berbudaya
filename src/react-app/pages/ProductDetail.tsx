import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import TopNavbar from '@/react-app/components/TopNavbar';
import { useCart } from '@/react-app/contexts/CartContext';
import { Heart, Star, Truck, Package, RotateCcw, Calendar, ShoppingCart } from 'lucide-react';

const productData = {
  '1': {
    id: 1,
    name: 'Batik Tulis Solo Premium',
    price: 850000,
    oldPrice: 1000000,
    seller: 'Dewi Batik Gallery',
    rating: 4.8,
    reviews: 124,
    category: 'Batik & Kain',
    location: 'Solo, Jawa Tengah',
    images: [
      'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=600&h=800&fit=crop',
    ],
    sizes: ['2m x 1.15m', '2.5m x 1.15m'],
    colors: [
      { name: 'Coklat Soga', class: 'bg-amber-900' },
      { name: 'Biru Indigo', class: 'bg-blue-900' },
      { name: 'Hitam', class: 'bg-black' },
    ],
    description: 'Batik tulis premium dari Solo dengan motif klasik parang dan kawung. Dibuat dengan teknik tradisional menggunakan canting dan malam berkualitas tinggi. Setiap helai membutuhkan waktu 2-3 bulan pengerjaan oleh pengrajin berpengalaman. Kain katun prima yang lembut dan nyaman dipakai. Cocok untuk acara formal, resepsi, atau koleksi pribadi.',
    materials: 'Kain Katun Prima, Malam Batik Alami, Pewarna Soga',
    care: 'Cuci dengan tangan menggunakan detergen lembut, jemur di tempat teduh',
    shipping: {
      estimated: '3-5 Hari Kerja',
      type: 'JNE/J&T Regular',
      arrival: '10-15 November 2024'
    }
  },
  '2': {
    id: 2,
    name: 'Wayang Kulit Rama Shinta',
    price: 1200000,
    oldPrice: undefined,
    seller: 'Karya Wayang Nusantara',
    rating: 4.9,
    reviews: 89,
    category: 'Wayang & Seni',
    location: 'Yogyakarta',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=600&h=800&fit=crop',
    ],
    sizes: ['Tinggi 60cm', 'Tinggi 80cm', 'Tinggi 100cm'],
    colors: [
      { name: 'Emas Klasik', class: 'bg-yellow-600' },
      { name: 'Multi Warna', class: 'bg-gradient-to-r from-red-500 to-yellow-500' },
    ],
    description: 'Wayang kulit sepasang Rama dan Shinta dari kisah Ramayana. Dibuat dari kulit kerbau pilihan dengan detail ukiran yang halus dan presisi. Dicat dengan warna tradisional yang tahan lama. Dilengkapi dengan gagang dari tanduk kerbau yang kokoh. Karya dalang dan pengukir berpengalaman lebih dari 30 tahun. Cocok untuk koleksi, dekorasi, atau pertunjukan.',
    materials: 'Kulit Kerbau Premium, Cat Tradisional, Tanduk Kerbau',
    care: 'Simpan di tempat kering, hindari sinar matahari langsung, bersihkan dengan kain lembut',
    shipping: {
      estimated: '5-7 Hari Kerja',
      type: 'Cargo Khusus (Fragile)',
      arrival: '12-18 November 2024'
    }
  },
  '3': {
    id: 3,
    name: 'Angklung Mini Set',
    price: 450000,
    oldPrice: undefined,
    seller: 'Saung Angklung Mang Udjo',
    rating: 4.7,
    reviews: 156,
    category: 'Alat Musik',
    location: 'Bandung, Jawa Barat',
    images: [
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1460036521480-ff49c08c2781?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=800&fit=crop',
    ],
    sizes: ['Set 5 Nada', 'Set 8 Nada', 'Set 12 Nada (Full Oktaf)'],
    colors: [
      { name: 'Natural Bamboo', class: 'bg-amber-700' },
      { name: 'Varnish Coklat', class: 'bg-amber-900' },
    ],
    description: 'Set angklung mini berkualitas dari Saung Angklung Mang Udjo, Bandung. Terbuat dari bambu pilihan yang telah dikeringkan dengan sempurna untuk menghasilkan nada yang jernih dan resonan. Setiap angklung sudah di-tuning dengan presisi. Cocok untuk edukasi musik anak, terapi musik, atau koleksi alat musik tradisional. Dilengkapi dengan buku panduan cara bermain angklung.',
    materials: 'Bambu Hitam Pilihan, Tali Rotan, Kayu Mahoni',
    care: 'Simpan di tempat kering, hindari kelembaban tinggi, bersihkan dengan kain kering',
    shipping: {
      estimated: '4-6 Hari Kerja',
      type: 'JNE/J&T Regular',
      arrival: '11-16 November 2024'
    }
  },
  '4': {
    id: 4,
    name: 'Keris Jawa Pusaka',
    price: 3500000,
    oldPrice: undefined,
    seller: 'Empu Jaya Sakti',
    rating: 5.0,
    reviews: 45,
    category: 'Senjata Tradisional',
    location: 'Surakarta',
    images: [
      'https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&h=800&fit=crop',
    ],
    sizes: ['Luk 5', 'Luk 7', 'Luk 9', 'Luk 13'],
    colors: [
      { name: 'Besi Pamor Perak', class: 'bg-gray-400' },
      { name: 'Besi Pamor Emas', class: 'bg-yellow-700' },
    ],
    description: 'Keris pusaka Jawa dengan pamor berkualitas tinggi karya Empu berpengalaman. Dibuat dari besi meteorit dan baja berkualitas tinggi melalui proses tempa tradisional. Motif pamor yang indah dan bilah yang presisi. Warangka (sarung keris) dari kayu trembalo pilihan dengan ukiran halus. Mendho (hiasan atas) dari logam kuningan atau perak. Dilengkapi sertifikat keaslian dari Empu. Cocok untuk koleksi, pusaka keluarga, atau pelengkap busana adat.',
    materials: 'Besi Meteorit, Baja Tempa, Kayu Trembalo, Kuningan/Perak',
    care: 'Bersihkan bilah dengan minyak khusus keris, simpan di tempat kering, periksa secara berkala',
    shipping: {
      estimated: '7-10 Hari Kerja',
      type: 'Cargo Asuransi (Barang Berharga)',
      arrival: '14-21 November 2024'
    }
  },
  '5': {
    id: 5,
    name: 'Kain Songket Palembang',
    price: 1500000,
    oldPrice: 1800000,
    seller: 'Tenun Songket Lestari',
    rating: 4.8,
    reviews: 67,
    category: 'Batik & Kain',
    location: 'Palembang',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1562137369-1a1a0bc66744?w=600&h=800&fit=crop',
    ],
    sizes: ['2m x 1m', '2.5m x 1.2m'],
    colors: [
      { name: 'Merah Maroon', class: 'bg-red-900' },
      { name: 'Hijau Emerald', class: 'bg-green-800' },
      { name: 'Biru Royal', class: 'bg-blue-900' },
    ],
    description: 'Kain songket Palembang asli dengan benang emas 24 karat. Ditenun secara tradisional menggunakan alat tenun bukan mesin (ATBM). Motif lepus, bungo pacik, dan nago besaung yang khas Palembang. Setiap kain membutuhkan waktu pengerjaan 1-2 bulan. Kualitas premium dengan benang sutra berkualitas tinggi. Cocok untuk kebaya pengantin, busana formal, atau koleksi kain tradisional.',
    materials: 'Benang Sutra, Benang Emas 24K, Pewarna Alami',
    care: 'Dry clean only, simpan dengan digantung atau digulung, hindari lipatan tajam',
    shipping: {
      estimated: '4-6 Hari Kerja',
      type: 'JNE/J&T YES (Kilat)',
      arrival: '11-16 November 2024'
    }
  },
  '6': {
    id: 6,
    name: 'Anyaman Rotan Set',
    price: 180000,
    oldPrice: undefined,
    seller: 'Kriya Rotan Indonesia',
    rating: 4.6,
    reviews: 342,
    category: 'Kerajinan',
    location: 'Cirebon',
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1585666274671-1e0ce16e6808?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1588997859645-1c56e8f49e9b?w=600&h=800&fit=crop',
    ],
    sizes: ['Set Kecil (3 items)', 'Set Sedang (5 items)', 'Set Besar (8 items)'],
    colors: [
      { name: 'Natural', class: 'bg-amber-600' },
      { name: 'Dark Brown', class: 'bg-amber-900' },
      { name: 'White Wash', class: 'bg-amber-100' },
    ],
    description: 'Set anyaman rotan handmade dari Cirebon. Terdiri dari berbagai ukuran wadah multiguna yang cocok untuk penyimpanan, dekorasi, atau hampers. Rotan pilihan yang kuat dan lentur, dianyam dengan teknik tradisional yang rapi. Finishing halus dan tahan lama. Produk ramah lingkungan dan sustainable. Cocok untuk kebutuhan rumah tangga, dekorasi rumah, atau hadiah.',
    materials: 'Rotan Pilihan, Cat Water Based (opsional)',
    care: 'Bersihkan dengan lap lembab, hindari air berlebihan, jemur sesekali agar tidak lembab',
    shipping: {
      estimated: '3-5 Hari Kerja',
      type: 'JNE/J&T Regular',
      arrival: '10-15 November 2024'
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
