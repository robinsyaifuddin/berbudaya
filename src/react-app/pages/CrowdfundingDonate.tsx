import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { Check, ChevronRight, ChevronDown, Wallet, CreditCard, Building2, ShieldCheck, Info, Copy, QrCode } from 'lucide-react';
import TopNavbar from '@/react-app/components/TopNavbar';

// Campaign data untuk setiap ID
const getCampaignInfo = (id: string) => {
  const campaigns: Record<string, { title: string; organizer: string; image: string }> = {
    '1': {
      title: 'RESTORASI CANDI BOROBUDUR: SELAMATKAN WARISAN DUNIA UNESCO',
      organizer: 'Yayasan Warisan Budaya Indonesia',
      image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400&h=300&fit=crop'
    },
    '2': {
      title: 'SELAMATKAN PENGRAJIN BATIK TULIS SOLO DARI KEPUNAHAN',
      organizer: 'Komunitas Batik Nusantara',
      image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=400&h=300&fit=crop'
    },
    '3': {
      title: 'DIGITALISASI MANUSKRIP KUNO NUSANTARA',
      organizer: 'Perpustakaan Nasional RI',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop'
    }
  };
  return campaigns[id] || campaigns['1'];
};

export default function CrowdfundingDonatePage() {
  const { id } = useParams();
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [paymentCategory, setPaymentCategory] = useState<'ewallet' | 'va' | 'transfer'>('ewallet');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleCustomAmountChange = (value: string) => {
    const numValue = value.replace(/\D/g, '');
    setCustomAmount(numValue);
    setSelectedAmount(null);
  };

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;
  const minAmount = 10000;

  const campaign = getCampaignInfo(id || '1');

  const handlePayment = () => {
    if (!finalAmount || finalAmount < minAmount || !selectedPayment) return;

    // Format pesan WhatsApp
    const message = `*KONFIRMASI DONASI CROWDFUNDING*\n\n` +
      `Campaign: ${campaign.title}\n` +
      `Penyelenggara: ${campaign.organizer}\n\n` +
      `Nominal Donasi: ${formatCurrency(finalAmount)}\n` +
      `Metode Pembayaran: ${getPaymentMethodName(selectedPayment)}\n\n` +
      `Mohon konfirmasi pembayaran dan kirimkan bukti transfer.\n\n` +
      `Terima kasih telah berkontribusi untuk pelestarian budaya Indonesia! 🙏`;

    const whatsappNumber = '62887437525303';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const getPaymentMethodName = (method: string): string => {
    const methods: Record<string, string> = {
      'jenius': 'JeniusPay',
      'gopay': 'GoPay',
      'ovo': 'OVO',
      'dana': 'DANA',
      'permata': 'Permata VA',
      'maybank': 'Maybank Syariah VA',
      'bca': 'BCA VA',
      'bni': 'BNI VA',
      'bri': 'BRI VA',
      'cimb': 'CIMB Niaga VA',
      'transfer-bca': 'BCA Transfer',
      'transfer-mandiri': 'Mandiri Transfer',
      'transfer-bni': 'BNI Transfer'
    };
    return methods[method] || method;
  };

  const getPaymentDetails = (method: string) => {
    const details: Record<string, { type: 'qr' | 'account'; accountNumber?: string; accountName?: string; qrImage?: string }> = {
      'jenius': { 
        type: 'qr',
        qrImage: 'https://via.placeholder.com/200x200/0066CC/FFFFFF?text=Scan+QR+JeniusPay'
      },
      'gopay': { 
        type: 'qr',
        qrImage: 'https://via.placeholder.com/200x200/00AA13/FFFFFF?text=Scan+QR+GoPay'
      },
      'ovo': { 
        type: 'qr',
        qrImage: 'https://via.placeholder.com/200x200/4C3494/FFFFFF?text=Scan+QR+OVO'
      },
      'dana': { 
        type: 'qr',
        qrImage: 'https://via.placeholder.com/200x200/118EEA/FFFFFF?text=Scan+QR+DANA'
      },
      'permata': { 
        type: 'account',
        accountNumber: '8800 1234 5678 9012',
        accountName: 'Yayasan Berbudaya Indonesia'
      },
      'maybank': { 
        type: 'account',
        accountNumber: '1234 5678 9012',
        accountName: 'Yayasan Berbudaya Indonesia'
      },
      'bca': { 
        type: 'account',
        accountNumber: '1234 567 890',
        accountName: 'Yayasan Berbudaya Indonesia'
      },
      'bni': { 
        type: 'account',
        accountNumber: '1234 5678 9012',
        accountName: 'Yayasan Berbudaya Indonesia'
      },
      'bri': { 
        type: 'account',
        accountNumber: '1234 5678 9012 345',
        accountName: 'Yayasan Berbudaya Indonesia'
      },
      'cimb': { 
        type: 'account',
        accountNumber: '1234 5678 9012',
        accountName: 'Yayasan Berbudaya Indonesia'
      },
      'transfer-bca': { 
        type: 'account',
        accountNumber: '1234 567 890',
        accountName: 'Yayasan Berbudaya Indonesia'
      },
      'transfer-mandiri': { 
        type: 'account',
        accountNumber: '1234 5678 9012 345',
        accountName: 'Yayasan Berbudaya Indonesia'
      },
      'transfer-bni': { 
        type: 'account',
        accountNumber: '1234 5678 9012',
        accountName: 'Yayasan Berbudaya Indonesia'
      }
    };
    return details[method];
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Nomor rekening berhasil disalin!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Beranda</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/crowdfunding" className="text-gray-600 hover:text-blue-600 transition-colors">Crowdfunding</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to={`/crowdfunding/${id}`} className="text-gray-600 hover:text-blue-600 transition-colors">Detail</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Donasi</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Donasi Sekarang</h1>
          <p className="text-gray-600">Bantu wujudkan program ini dengan donasi Anda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Campaign Info Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md border border-blue-200 p-4 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <p className="text-sm text-blue-700 font-semibold">
                  Kamu akan berdonasi untuk campaign:
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <img
                  src={campaign.image}
                  alt="Campaign"
                  className="w-full sm:w-40 h-32 object-cover rounded-lg shadow-md"
                />
                <div className="flex-1">
                  <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                    {campaign.title}
                  </h2>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{campaign.organizer}</span>
                    <Check className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Donation Amount */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Wallet className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">
                  Nominal Donasi
                </h3>
              </div>

              {/* Custom Amount Input */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Masukkan Nominal Donasi
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-semibold text-lg">
                    Rp
                  </span>
                  <input
                    type="text"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    placeholder="Masukkan nominal"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl text-lg font-semibold focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all shadow-sm"
                  />
                </div>
                {customAmount && parseInt(customAmount) < minAmount && (
                  <div className="flex items-center gap-2 mt-2 text-red-600">
                    <Info className="w-4 h-4" />
                    <p className="text-sm font-medium">
                      Minimal donasi {formatCurrency(minAmount)}
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">
                  Metode Pembayaran
                </h3>
              </div>

              {/* E-Wallet Section */}
              <div className="mb-4">
                <button
                  onClick={() => setPaymentCategory('ewallet')}
                  className={`w-full flex items-center justify-between p-4 border-2 rounded-xl transition-all ${
                    paymentCategory === 'ewallet'
                      ? 'border-blue-600 bg-blue-50 shadow-md'
                      : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-blue-600" />
                    <div className="text-left">
                      <span className="font-semibold text-gray-900 block">E-Wallet</span>
                      <span className="text-xs text-gray-600">Verifikasi Otomatis</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transform transition-transform ${paymentCategory === 'ewallet' ? 'rotate-180' : ''}`} />
                </button>
                {paymentCategory === 'ewallet' && (
                  <div className="mt-3 space-y-2 pl-2">
                    <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all">
                      <input
                        type="radio"
                        name="payment"
                        value="jenius"
                        checked={selectedPayment === 'jenius'}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div className="flex items-center gap-2 flex-1">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">
                          PAY
                        </div>
                        <span className="font-medium">JeniusPay</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all">
                      <input
                        type="radio"
                        name="payment"
                        value="gopay"
                        checked={selectedPayment === 'gopay'}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div className="flex items-center gap-2 flex-1">
                        <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white font-bold text-xs">
                          GO
                        </div>
                        <span className="font-medium">GoPay</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all">
                      <input
                        type="radio"
                        name="payment"
                        value="ovo"
                        checked={selectedPayment === 'ovo'}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div className="flex items-center gap-2 flex-1">
                        <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center text-white font-bold text-xs">
                          OVO
                        </div>
                        <span className="font-medium">OVO</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all">
                      <input
                        type="radio"
                        name="payment"
                        value="dana"
                        checked={selectedPayment === 'dana'}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div className="flex items-center gap-2 flex-1">
                        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-xs">
                          DANA
                        </div>
                        <span className="font-medium">DANA</span>
                      </div>
                    </label>
                  </div>
                )}
          </div>

              {/* Virtual Account Section */}
              <div className="mb-4">
                <button
                  onClick={() => setPaymentCategory('va')}
                  className={`w-full flex items-center justify-between p-4 border-2 rounded-xl transition-all ${
                    paymentCategory === 'va'
                      ? 'border-blue-600 bg-blue-50 shadow-md'
                      : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <div className="text-left">
                      <span className="font-semibold text-gray-900 block">Virtual Account</span>
                      <span className="text-xs text-gray-600">Verifikasi Otomatis</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transform transition-transform ${paymentCategory === 'va' ? 'rotate-180' : ''}`} />
                </button>

                {paymentCategory === 'va' && (
                  <div className="mt-3 space-y-2 pl-2">
                    <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="payment"
                    value="permata"
                    checked={selectedPayment === 'permata'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="flex items-center gap-2 flex-1">
                    <img src="https://via.placeholder.com/32x32/000000/FFFFFF?text=PB" alt="Permata" className="w-8 h-8" />
                    <span className="font-medium">Permata VA</span>
                  </div>
                </label>

                    <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="payment"
                    value="maybank"
                    checked={selectedPayment === 'maybank'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="flex items-center gap-2 flex-1">
                    <img src="https://via.placeholder.com/32x32/FFCC00/000000?text=M" alt="Maybank" className="w-8 h-8" />
                    <span className="font-medium">Maybank Syariah VA</span>
                  </div>
                </label>

                    <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="payment"
                    value="bca"
                    checked={selectedPayment === 'bca'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="flex items-center gap-2 flex-1">
                    <img src="https://via.placeholder.com/32x32/0066CC/FFFFFF?text=BCA" alt="BCA" className="w-8 h-8" />
                    <span className="font-medium">BCA VA</span>
                  </div>
                </label>

                    <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="payment"
                    value="bri"
                    checked={selectedPayment === 'bri'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="flex items-center gap-2 flex-1">
                    <img src="https://via.placeholder.com/32x32/0055AA/FFFFFF?text=BRI" alt="BRI" className="w-8 h-8" />
                    <span className="font-medium">BRI VA</span>
                  </div>
                </label>

                    <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="payment"
                    value="cimb"
                    checked={selectedPayment === 'cimb'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="flex items-center gap-2 flex-1">
                    <img src="https://via.placeholder.com/32x32/CC0000/FFFFFF?text=CIMB" alt="CIMB" className="w-8 h-8" />
                    <span className="font-medium">CIMB Niaga VA</span>
                  </div>
                </label>

                    <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="payment"
                    value="bni"
                    checked={selectedPayment === 'bni'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="flex items-center gap-2 flex-1">
                    <img src="https://via.placeholder.com/32x32/FF6600/FFFFFF?text=BNI" alt="BNI" className="w-8 h-8" />
                    <span className="font-medium">BNI VA</span>
                  </div>
                </label>
              </div>
            )}
          </div>

              {/* Bank Transfer Section */}
              <div>
                <button
                  onClick={() => setPaymentCategory('transfer')}
                  className={`w-full flex items-center justify-between p-4 border-2 rounded-xl transition-all ${
                    paymentCategory === 'transfer'
                      ? 'border-blue-600 bg-blue-50 shadow-md'
                      : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-purple-600" />
                    <div className="text-left">
                      <span className="font-semibold text-gray-900 block">Bank Transfer</span>
                      <span className="text-xs text-gray-600">Verifikasi Manual 1x24 Jam</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transform transition-transform ${paymentCategory === 'transfer' ? 'rotate-180' : ''}`} />
                </button>

                {paymentCategory === 'transfer' && (
                  <div className="mt-3 space-y-2 pl-2">
                    <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="payment"
                    value="transfer-bca"
                    checked={selectedPayment === 'transfer-bca'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="flex items-center gap-2 flex-1">
                    <img src="https://via.placeholder.com/32x32/0066CC/FFFFFF?text=BCA" alt="BCA" className="w-8 h-8" />
                    <span className="font-medium">BCA Transfer</span>
                  </div>
                </label>

                    <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="payment"
                    value="transfer-mandiri"
                    checked={selectedPayment === 'transfer-mandiri'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="flex items-center gap-2 flex-1">
                    <img src="https://via.placeholder.com/32x32/0055AA/FFFFFF?text=M" alt="Mandiri" className="w-8 h-8" />
                    <span className="font-medium">Mandiri Transfer</span>
                  </div>
                </label>

                    <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="payment"
                    value="transfer-bni"
                    checked={selectedPayment === 'transfer-bni'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="flex items-center gap-2 flex-1">
                    <img src="https://via.placeholder.com/32x32/FF6600/FFFFFF?text=BNI" alt="BNI" className="w-8 h-8" />
                    <span className="font-medium">BNI Transfer</span>
                  </div>
                </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Submit */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Payment Details Card */}
              {selectedPayment && getPaymentDetails(selectedPayment) && (
                <div className="bg-white rounded-xl shadow-lg border border-blue-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-gray-900">Detail Pembayaran</h4>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-200">
                    <p className="text-sm font-semibold text-blue-900 mb-3">
                      {getPaymentMethodName(selectedPayment)}
                    </p>
                    
                    {getPaymentDetails(selectedPayment)?.type === 'qr' ? (
                      // QR Code Display
                      <div className="text-center">
                        <div className="bg-white p-4 rounded-lg inline-block mb-3">
                          <img 
                            src={getPaymentDetails(selectedPayment)?.qrImage} 
                            alt="QR Code" 
                            className="w-40 h-40 mx-auto"
                          />
                        </div>
                        <div className="flex items-center justify-center gap-2 text-blue-700">
                          <QrCode className="w-4 h-4" />
                          <p className="text-xs font-medium">Scan QR code untuk membayar</p>
                        </div>
                      </div>
                    ) : (
                      // Account Number Display
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-medium text-gray-600 block mb-1">
                            Nomor Rekening
                          </label>
                          <div className="flex items-center gap-2 bg-white rounded-lg p-3 border border-blue-300">
                            <span className="font-mono font-bold text-gray-900 flex-1">
                              {getPaymentDetails(selectedPayment)?.accountNumber}
                            </span>
                            <button
                              onClick={() => copyToClipboard(getPaymentDetails(selectedPayment)?.accountNumber || '')}
                              className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                              title="Salin nomor rekening"
                            >
                              <Copy className="w-4 h-4 text-blue-600" />
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-xs font-medium text-gray-600 block mb-1">
                            Nama Penerima
                          </label>
                          <div className="bg-white rounded-lg p-3 border border-blue-300">
                            <span className="font-semibold text-gray-900">
                              {getPaymentDetails(selectedPayment)?.accountName}
                            </span>
                          </div>
                        </div>

                        <div className="bg-blue-600 bg-opacity-10 rounded-lg p-3 mt-3">
                          <p className="text-xs text-blue-800 leading-relaxed">
                            <strong>Catatan:</strong> Transfer sesuai nominal donasi yang tertera di ringkasan. Simpan bukti transfer untuk konfirmasi.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Summary Card */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h4 className="font-bold text-gray-900 mb-4">Ringkasan Donasi</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Nominal Donasi</span>
                    <span className="font-bold text-gray-900">
                      {finalAmount ? formatCurrency(finalAmount) : 'Rp 0'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Biaya Admin</span>
                    <span className="font-bold text-gray-900">Rp 0</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="font-bold text-blue-600 text-xl">
                        {finalAmount ? formatCurrency(finalAmount) : 'Rp 0'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handlePayment}
                disabled={!finalAmount || (finalAmount < minAmount) || !selectedPayment}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg ${
                  finalAmount && finalAmount >= minAmount && selectedPayment
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {finalAmount && finalAmount >= minAmount && selectedPayment
                  ? `Lanjut Bayar ${formatCurrency(finalAmount)}`
                  : 'Lengkapi Form'}
              </button>

              {/* Info Box */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-1">Donasi Aman & Terpercaya</p>
                    <p className="text-xs text-blue-700 leading-relaxed">
                      Transaksi dilindungi dengan enkripsi SSL dan sistem keamanan berlapis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
