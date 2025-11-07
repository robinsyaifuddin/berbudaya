import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import TopNavbar from '@/react-app/components/TopNavbar';
import { useCart } from '@/react-app/contexts/CartContext';
import { 
  ChevronRight, MapPin, User, Phone, Home, CreditCard, 
  Wallet, Building2, ChevronDown, Copy, QrCode, ShoppingBag, Check
} from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });

  const [paymentCategory, setPaymentCategory] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const shippingCost = 15000;
  const subtotal = getTotalPrice();
  const total = subtotal + shippingCost;

  const getPaymentDetails = (method: string) => {
    const details: Record<string, { type: 'qr' | 'account'; accountNumber?: string; accountName?: string; qrImage?: string }> = {
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
      'bca': { 
        type: 'account',
        accountNumber: '1234 567 890',
        accountName: 'Ruang Budaya Indonesia'
      },
      'mandiri': { 
        type: 'account',
        accountNumber: '1234 5678 9012 345',
        accountName: 'Ruang Budaya Indonesia'
      },
      'bni': { 
        type: 'account',
        accountNumber: '1234 5678 9012',
        accountName: 'Ruang Budaya Indonesia'
      }
    };
    return details[method];
  };

  const getPaymentMethodName = (method: string): string => {
    const methods: Record<string, string> = {
      'gopay': 'GoPay',
      'ovo': 'OVO',
      'dana': 'DANA',
      'bca': 'BCA Transfer',
      'mandiri': 'Mandiri Transfer',
      'bni': 'BNI Transfer'
    };
    return methods[method] || method;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Nomor rekening berhasil disalin!');
  };

  const handleCheckout = () => {
    if (!formData.name || !formData.phone || !formData.address || !selectedPayment) {
      alert('Mohon lengkapi semua data!');
      return;
    }

    // Format order items
    const itemsList = cartItems.map((item, index) => 
      `${index + 1}. ${item.name}\n   - Ukuran: ${item.selectedSize}, Warna: ${item.selectedColor}\n   - ${formatPrice(item.price)} x ${item.quantity} = ${formatPrice(item.price * item.quantity)}`
    ).join('\n\n');

    const message = `*PESANAN MARKETPLACE RUANG BUDAYA*\n\n` +
      `*DATA PENERIMA:*\n` +
      `Nama: ${formData.name}\n` +
      `No. HP: ${formData.phone}\n` +
      `Alamat: ${formData.address}\n` +
      `Kota: ${formData.city}\n` +
      `Kode Pos: ${formData.postalCode}\n` +
      `${formData.notes ? `Catatan: ${formData.notes}\n` : ''}\n` +
      `*DETAIL PESANAN:*\n${itemsList}\n\n` +
      `*RINGKASAN PEMBAYARAN:*\n` +
      `Subtotal: ${formatPrice(subtotal)}\n` +
      `Ongkir: ${formatPrice(shippingCost)}\n` +
      `Total: ${formatPrice(total)}\n\n` +
      `Metode Pembayaran: ${getPaymentMethodName(selectedPayment)}\n\n` +
      `Mohon konfirmasi pesanan dan kirimkan bukti transfer.\n\n` +
      `Terima kasih telah berbelanja di Ruang Budaya! 🙏`;

    const whatsappNumber = '62887437525303';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/marketplace" className="hover:text-gray-900">Marketplace</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/cart" className="hover:text-gray-900">Keranjang</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Checkout</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Alamat Pengiriman</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Masukkan nama lengkap"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      No. Handphone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="08123456789"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Home className="w-4 h-4 inline mr-1" />
                      Alamat Lengkap
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      placeholder="Jl. Contoh No. 123, RT/RW, Kelurahan, Kecamatan"
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kota
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        placeholder="Jakarta"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kode Pos
                      </label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                        placeholder="12345"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catatan (Opsional)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="Catatan tambahan untuk kurir..."
                      rows={2}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Metode Pembayaran</h2>
                </div>

                {/* E-Wallet */}
                <div className="mb-4">
                  <button
                    onClick={() => setPaymentCategory(paymentCategory === 'ewallet' ? '' : 'ewallet')}
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
                        <span className="text-xs text-gray-600">Bayar dengan QRIS</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-600 transform transition-transform ${paymentCategory === 'ewallet' ? 'rotate-180' : ''}`} />
                  </button>
                  {paymentCategory === 'ewallet' && (
                    <div className="mt-3 space-y-2 pl-2">
                      {['gopay', 'ovo', 'dana'].map((method) => (
                        <label key={method} className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all">
                          <input
                            type="radio"
                            name="payment"
                            value={method}
                            checked={selectedPayment === method}
                            onChange={(e) => setSelectedPayment(e.target.value)}
                            className="w-4 h-4 text-blue-600"
                          />
                          <span className="font-medium capitalize">{getPaymentMethodName(method)}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bank Transfer */}
                <div>
                  <button
                    onClick={() => setPaymentCategory(paymentCategory === 'transfer' ? '' : 'transfer')}
                    className={`w-full flex items-center justify-between p-4 border-2 rounded-xl transition-all ${
                      paymentCategory === 'transfer'
                        ? 'border-blue-600 bg-blue-50 shadow-md'
                        : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-blue-600" />
                      <div className="text-left">
                        <span className="font-semibold text-gray-900 block">Bank Transfer</span>
                        <span className="text-xs text-gray-600">Transfer ke rekening bank</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-600 transform transition-transform ${paymentCategory === 'transfer' ? 'rotate-180' : ''}`} />
                  </button>
                  {paymentCategory === 'transfer' && (
                    <div className="mt-3 space-y-2 pl-2">
                      {['bca', 'mandiri', 'bni'].map((method) => (
                        <label key={method} className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all">
                          <input
                            type="radio"
                            name="payment"
                            value={method}
                            checked={selectedPayment === method}
                            onChange={(e) => setSelectedPayment(e.target.value)}
                            className="w-4 h-4 text-blue-600"
                          />
                          <span className="font-medium">{getPaymentMethodName(method)}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                {/* Payment Details */}
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
                        <div className="text-center">
                          <div className="bg-white p-4 rounded-lg inline-block mb-3">
                            <img 
                              src={getPaymentDetails(selectedPayment)?.qrImage} 
                              alt="QR Code" 
                              className="w-48 h-48 mx-auto"
                            />
                          </div>
                          <div className="flex items-center justify-center gap-2 text-blue-700">
                            <QrCode className="w-4 h-4" />
                            <p className="text-xs font-medium">Scan QR code untuk membayar</p>
                          </div>
                        </div>
                      ) : (
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
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Order Summary */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                    Ringkasan Pesanan
                  </h4>
                  
                  <div className="space-y-3 mb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3 text-sm">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 line-clamp-1">{item.name}</p>
                          <p className="text-xs text-gray-600">{item.quantity}x {formatPrice(item.price)}</p>
                        </div>
                        <p className="font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Ongkos Kirim</span>
                      <span className="font-medium">{formatPrice(shippingCost)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={!formData.name || !formData.phone || !formData.address || !selectedPayment}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg ${
                    formData.name && formData.phone && formData.address && selectedPayment
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {formData.name && formData.phone && formData.address && selectedPayment
                    ? `Checkout - ${formatPrice(total)}`
                    : 'Lengkapi Data'}
                </button>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-blue-900 mb-1">Transaksi Aman</p>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        Pesanan akan diproses setelah pembayaran dikonfirmasi via WhatsApp.
                      </p>
                    </div>
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
