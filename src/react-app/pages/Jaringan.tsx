import ModernLayout from '@/react-app/components/ModernLayout';
import { useState } from 'react';
import { Search, X, UserPlus } from 'lucide-react';

interface NetworkUser {
  id: number;
  name: string;
  headline: string;
  avatar: string;
  location?: string;
  category: string;
}

const peopleMayKnow: NetworkUser[] = [
  {
    id: 1,
    name: 'Ki Anom Sudarsono',
    headline: 'Dalang & Konservator Wayang Kulit Gagrag Surakarta',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    location: 'Surakarta, Jawa Tengah',
    category: 'Wayang & Pertunjukan'
  },
  {
    id: 2,
    name: 'Nyoman Tri Astuti',
    headline: 'Koreografer Tari Legong & Pembina Sanggar Suara Dewata',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    location: 'Gianyar, Bali',
    category: 'Tari Tradisi'
  },
  {
    id: 3,
    name: 'Raden Mas Haryo',
    headline: 'Peneliti Naskah Kuno & Preservasi Lontar Nusantara',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    location: 'Yogyakarta, D.I.Y',
    category: 'Filologi & Aksara'
  },
  {
    id: 4,
    name: 'Siti Maria Ulfah',
    headline: 'Maestro Tenun Songket Pandai Sikek & Pewarna Alami',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    location: 'Tanah Datar, Sumbar',
    category: 'Tekstil Nusantara'
  },
  {
    id: 5,
    name: 'Ahmad Faisal Marapu',
    headline: 'Arsitek Rumah Adat Sumba & Pegiat Konservasi Uma',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
    location: 'Sumba Timur, NTT',
    category: 'Arsitektur Vernakular'
  },
  {
    id: 6,
    name: 'Endah Retnowati, M.Sn',
    headline: 'Komposer Karawitan Kontemporer & Dosen Etnomusikologi',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    location: 'Surakarta, Jawa Tengah',
    category: 'Musik & Karawitan'
  },
  {
    id: 7,
    name: 'M. Idrus Sulaeman',
    headline: 'Empu Pembuat Kapal Phinisi Bulukumba Warisan Dunia UNESCO',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    location: 'Bulukumba, Sulsel',
    category: 'Kemaritiman Tradisi'
  },
  {
    id: 8,
    name: 'Dewi Ayu Saraswati',
    headline: 'Pakar Aksara Kawi & Kurator Museum Cagar Budaya',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    location: 'Denpasar, Bali',
    category: 'Pustaka Nusantara'
  }
];

export default function JaringanPage() {
  const [dismissedUsers, setDismissedUsers] = useState<number[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<number[]>([]);

  const handleDismiss = (userId: number) => {
    setDismissedUsers([...dismissedUsers, userId]);
  };

  const handleConnect = (userId: number) => {
    setConnectedUsers([...connectedUsers, userId]);
  };

  const filteredPeople = peopleMayKnow.filter(
    (person) => !dismissedUsers.includes(person.id) && !connectedUsers.includes(person.id)
  );

  return (
    <ModernLayout showRightSidebar={false}>
      <div className="space-y-3 pb-8">
        {/* Left Sidebar - Network Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-[68px]">
              <h3 className="font-semibold text-gray-900 text-sm mb-4">Gambaran umum jaringan</h3>
              
              <div className="space-y-3">
                <button className="w-full text-left hover:bg-gray-50 p-2 rounded transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Undangan diterima</span>
                    <span className="text-sm font-semibold text-gray-900">0</span>
                  </div>
                </button>

                <button className="w-full text-left hover:bg-gray-50 p-2 rounded transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Koneksi</span>
                    <span className="text-sm font-semibold text-gray-900">0</span>
                  </div>
                </button>

                <button className="w-full text-left hover:bg-gray-50 p-2 rounded transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Mengikuti</span>
                    <span className="text-sm font-semibold text-gray-900">6</span>
                  </div>
                </button>
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4">
                <button className="text-xs text-blue-600 hover:underline">
                  Lihat selengkapnya →
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-3">
            {/* Invite Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-base mb-2">
                    Undang 5 teman seangkatan Anda untuk terhubung sekarang
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">
                    Temukan peluang baru dengan jaringan yang luas. Mulailah dengan teman, teman serumah, dan rekan sekerja.
                  </p>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-semibold hover:bg-blue-700 transition-colors">
                    <Search className="w-4 h-4" />
                    Cari orang yang Anda kenal
                  </button>
                </div>
              </div>
            </div>

            {/* No Pending Invitations */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">
                  Tidak ada undangan yang belum direspons
                </h3>
                <button className="text-xs text-gray-600 hover:text-blue-600 transition-colors">
                  Kelola
                </button>
              </div>
            </div>

            {/* People You May Know */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 text-base">
                  Orang yang mungkin Anda kenal berdasarkan aktivitas terbaru Anda
                </h3>
              </div>

              <div className="p-3">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500">
                    {filteredPeople.length} hasil
                  </span>
                  <button className="text-xs text-blue-600 hover:underline">
                    Tampilkan semua
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {filteredPeople.map((person) => (
                    <div
                      key={person.id}
                      className="group bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
                    >
                      <div>
                        {/* Card Header with Dismiss Button */}
                        <div className="relative">
                          <div className="h-16 bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-950"></div>
                          <button
                            onClick={() => handleDismiss(person.id)}
                            className="absolute top-2 right-2 p-1.5 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm transition-colors"
                            title="Abaikan saran"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <img
                            src={person.avatar}
                            alt={person.name}
                            className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 w-15 h-15 rounded-full border-3 border-white object-cover shadow-sm"
                          />
                        </div>

                        {/* Card Body */}
                        <div className="pt-9 pb-3 px-3.5 text-center">
                          <span className="inline-block px-2 py-0.5 mb-1.5 text-[10px] font-medium text-blue-700 bg-blue-50 border border-blue-100 rounded-full">
                            {person.category}
                          </span>
                          <h4 className="text-sm font-semibold text-slate-900 mb-1 hover:text-blue-600 transition-colors cursor-pointer line-clamp-1">
                            {person.name}
                          </h4>
                          <p className="text-xs text-slate-600 mb-2 line-clamp-2 min-h-[32px] leading-relaxed">
                            {person.headline}
                          </p>
                          
                          {person.location && (
                            <p className="text-[11px] text-slate-400 mb-2">
                              {person.location}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="px-3.5 pb-3.5">
                        <button
                          onClick={() => handleConnect(person.id)}
                          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors active:scale-[0.98]"
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                          Hubungkan
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModernLayout>
  );
}
