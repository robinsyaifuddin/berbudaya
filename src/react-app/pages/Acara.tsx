import TopNavbar from '@/react-app/components/TopNavbar';
import { Calendar as CalendarIcon, MapPin, Clock, Users, Search, CheckCircle2, X, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';

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
  const [selectedEventModal, setSelectedEventModal] = useState<any | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [allEvents, setAllEvents] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem('user_published_events');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return [...parsed, ...events];
        }
      }
    } catch {
      // ignore
    }
    return events;
  });

  useEffect(() => {
    const handleEventsUpdate = () => {
      try {
        const stored = localStorage.getItem('user_published_events');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setAllEvents([...parsed, ...events]);
          }
        }
      } catch {
        // ignore
      }
    };
    window.addEventListener('events_updated', handleEventsUpdate);
    return () => window.removeEventListener('events_updated', handleEventsUpdate);
  }, []);

  // Form acara baru
  const [eventTitle, setEventTitle] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventPrice, setEventPrice] = useState('Gratis');

  const categories = ['Semua Acara', 'Festival', 'Pertunjukan', 'Pameran', 'Workshop', 'Konser'];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCreateModal(false);
    triggerToast(`Pengajuan acara "${eventTitle}" berhasil dikirim untuk kurasi agenda!`);
    setEventTitle('');
    setEventVenue('');
    setEventDate('');
  };

  const handleConfirmTicket = (ev: any) => {
    setSelectedEventModal(null);
    triggerToast(`Pendaftaran untuk "${ev.title}" berhasil! E-tiket telah dikirimkan ke profil Anda.`);
  };

  const filteredEvents = allEvents.filter(event => {
    const matchCategory = selectedCategory === 'Semua Acara' || event.category === selectedCategory;
    const matchSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-12">
      <TopNavbar />

      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-gray-700 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
      
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-5 md:p-6 mb-5 shadow-xs">
          <div className="max-w-3xl">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 mb-1.5">
              Agenda Acara & Festival Seni Tradisi
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
              Temukan jadwal pementasan wayang, workshop membatik, pasar seni kriya, dan festival budaya di seluruh Indonesia
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari acara, sanggar penampil, atau kota lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md focus:border-primary-600 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-all text-xs sm:text-sm placeholder-slate-400"
            />
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="bg-white rounded-lg shadow-xs border border-slate-200/90 p-4 mb-5">
          <div className="flex items-center gap-2 mb-2.5">
            <CalendarIcon className="w-4 h-4 text-primary-600" />
            <h3 className="font-semibold text-slate-900 text-xs sm:text-sm">Pilih Periode Bulan</h3>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {months.map((month, index) => (
              <button
                key={index}
                onClick={() => setSelectedMonth(index)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedMonth === index
                    ? 'bg-primary-600 text-white shadow-xs font-semibold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white font-semibold shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:border-gray-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-blue-700 px-2.5 py-1 rounded-md text-xs font-bold border border-gray-200">
                    {event.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-md text-xs font-semibold">
                    {event.price}
                  </div>
                </div>
                
                <div className="p-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {event.title}
                  </h2>
                  
                  <p className="text-xs text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>
                  
                  {/* Event Details */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                    <div className="flex items-center gap-2 text-gray-600">
                      <CalendarIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="font-medium text-gray-900 line-clamp-1">{event.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="font-medium text-gray-900 line-clamp-1">{event.time}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600 col-span-2">
                      <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="font-medium text-gray-900">{event.venue}, {event.location}</span>
                    </div>
                  </div>
                  
                  {/* Attendees */}
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 pt-2 border-t border-gray-100">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{event.attendees.toLocaleString()} orang terdaftar & berminat</span>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="p-5 pt-0">
                <div className="flex gap-2.5">
                  <button
                    onClick={() => setSelectedEventModal(event)}
                    className="flex-1 bg-[#133384] hover:bg-[#1844A6] text-white py-2.5 rounded-xl font-medium text-xs transition-all shadow-sm active:scale-[0.98]"
                  >
                    {event.price === 'Gratis' ? 'Daftar Hadir' : 'Beli Tiket'}
                  </button>
                  <button
                    onClick={() => setSelectedEventModal(event)}
                    className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium text-xs hover:bg-gray-50 hover:border-gray-400 transition-all"
                  >
                    Detail Acara
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Konfirmasi Tiket / Acara */}
        {selectedEventModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-200">
              <div className="relative h-44 bg-gray-100">
                <img
                  src={selectedEventModal.image}
                  alt={selectedEventModal.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedEventModal(null)}
                  className="absolute top-3 right-3 bg-black/60 text-white p-1.5 rounded-full hover:bg-black/80"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5">
                <div className="inline-block bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold mb-2">
                  {selectedEventModal.category}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{selectedEventModal.title}</h3>
                <p className="text-xs text-gray-600 mb-4">{selectedEventModal.description}</p>

                <div className="space-y-2 p-3 bg-gray-50 rounded-xl mb-5 text-xs text-gray-700 border border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Waktu:</span>
                    <span className="font-semibold">{selectedEventModal.date} ({selectedEventModal.time})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Lokasi:</span>
                    <span className="font-semibold">{selectedEventModal.venue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Biaya:</span>
                    <span className="font-bold text-blue-700">{selectedEventModal.price}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedEventModal(null)}
                    className="flex-1 py-2 border border-gray-300 text-gray-700 font-medium text-xs rounded-xl hover:bg-gray-50"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => handleConfirmTicket(selectedEventModal)}
                    className="flex-1 py-2 bg-[#133384] hover:bg-[#1844A6] text-white font-medium text-xs rounded-xl shadow-sm"
                  >
                    Konfirmasi Kehadiran
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Buat Acara Baru */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-200">
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h3 className="text-base font-bold text-gray-900">Ajukan Agenda Acara Budaya</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateEvent} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Acara *</label>
                  <input
                    type="text"
                    required
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="Contoh: Pentas Kesenian Ketoprak Remaja"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Tanggal Acara *</label>
                    <input
                      type="text"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      placeholder="Contoh: 12-14 Desember 2026"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Harga Tiket</label>
                    <input
                      type="text"
                      value={eventPrice}
                      onChange={(e) => setEventPrice(e.target.value)}
                      placeholder="Gratis / Rp 25.000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Lokasi & Venue *</label>
                  <input
                    type="text"
                    required
                    value={eventVenue}
                    onChange={(e) => setEventVenue(e.target.value)}
                    placeholder="Contoh: Gedung Wayang Orang Sriwedari, Solo"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-2.5 border border-gray-300 text-gray-700 font-medium text-xs rounded-xl hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#133384] hover:bg-[#1844A6] text-white font-medium text-xs rounded-xl shadow-sm"
                  >
                    Publikasikan Acara
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Floating Action Button */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="fixed bottom-6 right-6 bg-[#133384] hover:bg-[#1844A6] text-white px-5 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all font-medium text-sm flex items-center gap-2 z-40 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Ajukan Acara Baru</span>
        </button>
      </div>
    </div>
  );
}
