import TopNavbar from '@/react-app/components/TopNavbar';
import { Calendar as CalendarIcon, MapPin, Clock, Users, Ticket, Search } from 'lucide-react';
import { useState } from 'react';

const events = [
  {
    id: 1,
    title: 'Festival Batik Nusantara 2025',
    description: 'Festival batik terbesar di Indonesia menampilkan ribuan motif batik dari Sabang sampai Merauke.',
    image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=800&h=500&fit=crop',
    date: '15-17 November 2025',
    time: '09:00 - 21:00 WIB',
    location: 'Solo, Jawa Tengah',
    venue: 'Kompleks Keraton Surakarta',
    attendees: 2500,
    price: 'Gratis',
    category: 'Festival'
  },
  {
    id: 2,
    title: 'Pertunjukan Wayang Kulit Ramayana',
    description: 'Pertunjukan wayang kulit spektakuler dengan lakon Ramayana yang dibawakan oleh dalang terkenal.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop',
    date: '20 November 2025',
    time: '19:00 - 23:00 WIB',
    location: 'Yogyakarta',
    venue: 'Pendopo Keraton Yogyakarta',
    attendees: 500,
    price: 'Rp 50.000',
    category: 'Pertunjukan'
  },
  {
    id: 3,
    title: 'Pasar Seni & Kriya Indonesia',
    description: 'Bazar seni dan kerajinan tangan menampilkan produk-produk unggulan dari pengrajin lokal.',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&h=500&fit=crop',
    date: '25-28 November 2025',
    time: '10:00 - 20:00 WIB',
    location: 'Bandung',
    venue: 'Gedung Sate',
    attendees: 3000,
    price: 'Rp 25.000',
    category: 'Pameran'
  },
  {
    id: 4,
    title: 'Workshop Membatik Tulis',
    description: 'Belajar teknik membatik tulis langsung dari pengrajin batik berpengalaman.',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=500&fit=crop',
    date: '2 Desember 2025',
    time: '13:00 - 17:00 WIB',
    location: 'Solo, Jawa Tengah',
    venue: 'Kampung Batik Laweyan',
    attendees: 30,
    price: 'Rp 150.000',
    category: 'Workshop'
  },
  {
    id: 5,
    title: 'Konser Gamelan Kontemporer',
    description: 'Pertunjukan kolaborasi gamelan tradisional dengan musik modern yang memukau.',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=500&fit=crop',
    date: '10 Desember 2025',
    time: '19:30 - 22:00 WIB',
    location: 'Jakarta',
    venue: 'Teater Jakarta',
    attendees: 800,
    price: 'Rp 100.000',
    category: 'Konser'
  },
  {
    id: 6,
    title: 'Tari Tradisional Nusantara',
    description: 'Pentas tari dari berbagai daerah di Indonesia dalam satu panggung megah.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=500&fit=crop',
    date: '18 Desember 2025',
    time: '18:00 - 21:00 WIB',
    location: 'Bali',
    venue: 'Taman Budaya Bali',
    attendees: 1200,
    price: 'Rp 75.000',
    category: 'Pertunjukan'
  }
];

const months = [
  'November 2025', 'Desember 2025', 'Januari 2026', 'Februari 2026'
];

export default function AcaraPage() {
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Semua Acara');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Semua Acara', 'Festival', 'Pertunjukan', 'Pameran', 'Workshop', 'Konser'];

  const filteredEvents = events.filter(event => {
    const matchCategory = selectedCategory === 'Semua Acara' || event.category === selectedCategory;
    const matchSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Kegiatan Budaya
          </h1>
          <p className="text-blue-100 mb-6">
            Ikuti berbagai acara dan festival budaya di seluruh Indonesia
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
            <input
              type="text"
              placeholder="Cari acara atau lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-blue-200 focus:bg-white/20 focus:border-white/40 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <CalendarIcon className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Pilih Bulan</h3>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {months.map((month, index) => (
              <button
                key={index}
                onClick={() => setSelectedMonth(index)}
                className={`px-6 py-2 rounded-lg whitespace-nowrap transition-all font-medium ${
                  selectedMonth === index
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-gray-600">
            Menampilkan <span className="font-semibold text-gray-900">{filteredEvents.length}</span> acara
          </p>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-all"
            >
              <div className="md:flex">
                <div className="md:w-2/5">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                
                <div className="md:w-3/5 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                        {event.category}
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {event.title}
                      </h2>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {event.description}
                  </p>
                  
                  {/* Event Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start gap-3">
                      <CalendarIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Tanggal</p>
                        <p className="font-semibold text-gray-900">{event.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Waktu</p>
                        <p className="font-semibold text-gray-900">{event.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Lokasi</p>
                        <p className="font-semibold text-gray-900">{event.location}</p>
                        <p className="text-sm text-gray-500">{event.venue}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Ticket className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Harga Tiket</p>
                        <p className="font-semibold text-gray-900">{event.price}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Attendees */}
                  <div className="flex items-center gap-2 mb-6">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-600">
                      {event.attendees.toLocaleString()} orang tertarik
                    </span>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-4">
                    <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all">
                      {event.price === 'Gratis' ? 'Ikuti Acara' : 'Beli Tiket'}
                    </button>
                    <button className="px-6 py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-all">
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Event Button */}
        <button className="fixed bottom-8 right-8 bg-blue-600 text-white px-6 py-4 rounded-full shadow-xl hover:bg-blue-700 hover:shadow-2xl transition-all font-semibold z-40">
          + Buat Acara Baru
        </button>
      </div>
    </div>
  );
}
