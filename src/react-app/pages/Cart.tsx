import { Link } from 'react-router';
import TopNavbar from '@/react-app/components/TopNavbar';
import { useCart } from '@/react-app/contexts/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const shippingCost = cartItems.length > 0 ? 15000 : 0;
  const subtotal = getTotalPrice();
  const total = subtotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNavbar />
        
        <div className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center py-16">
              <div className="inline-block p-6 bg-gray-100 rounded-full mb-6">
                <ShoppingBag className="w-16 h-16 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Keranjang Belanja Kosong</h2>
              <p className="text-gray-600 mb-6">Anda belum menambahkan produk apapun ke keranjang</p>
              <Link
                to="/marketplace"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#133384] hover:bg-[#1844A6] text-white rounded-lg font-semibold transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Belanja Sekarang
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <span>›</span>
            <Link to="/marketplace" className="hover:text-gray-900">Marketplace</Link>
            <span>›</span>
            <span className="text-gray-900">Keranjang</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">Keranjang Belanja</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0 pr-4">
                          <Link
                            to={`/marketplace/${item.id}`}
                            className="font-semibold text-gray-900 hover:text-blue-600 line-clamp-2 mb-1"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-gray-600">{item.seller}</p>
                          <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus dari keranjang"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Variant Info */}
                      <div className="flex flex-wrap gap-3 mb-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">Ukuran:</span>
                          <span className="font-medium text-gray-900">{item.selectedSize}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">Warna:</span>
                          <span className="font-medium text-gray-900">{item.selectedColor}</span>
                        </div>
                      </div>

                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-gray-900">
                          {formatPrice(item.price)}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal per item */}
                      <div className="mt-2 text-right">
                        <span className="text-sm text-gray-600">Subtotal: </span>
                        <span className="font-semibold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              <button
                onClick={clearCart}
                className="w-full py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors border border-red-200"
              >
                Kosongkan Keranjang
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Ringkasan Belanja</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} produk)</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Ongkos Kirim</span>
                    <span className="font-medium">{formatPrice(shippingCost)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="block w-full py-3 bg-[#133384] hover:bg-[#1844A6] text-white text-center rounded-lg font-semibold transition-colors mb-3"
                >
                  Lanjut ke Pembayaran
                </Link>

                <Link
                  to="/marketplace"
                  className="block w-full py-3 text-center border-2 border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg font-semibold transition-colors"
                >
                  Lanjut Belanja
                </Link>

                {/* Additional Info */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">Gratis Ongkir</h3>
                  <p className="text-xs text-gray-600">
                    Untuk pembelian minimal Rp 500.000, dapatkan gratis ongkir ke seluruh Indonesia
                  </p>
                </div>

                {/* Payment Methods */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">Metode Pembayaran</h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Kami menerima berbagai metode pembayaran:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-white border border-gray-200 rounded text-xs">Transfer Bank</span>
                    <span className="px-2 py-1 bg-white border border-gray-200 rounded text-xs">E-Wallet</span>
                    <span className="px-2 py-1 bg-white border border-gray-200 rounded text-xs">QRIS</span>
                    <span className="px-2 py-1 bg-white border border-gray-200 rounded text-xs">COD</span>
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
