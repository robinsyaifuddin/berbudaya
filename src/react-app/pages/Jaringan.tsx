import ModernLayout from '@/react-app/components/ModernLayout';
import { useState } from 'react';
import { Search, X, UserPlus } from 'lucide-react';

interface NetworkUser {
  id: number;
  name: string;
  headline: string;
  avatar: string;
  mutualConnections?: number;
  location?: string;
}

const peopleMayKnow: NetworkUser[] = [
  {
    id: 1,
    name: 'Nana Dharmaliana,S.H.',
    headline: 'Legal Officer - Mining',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    location: 'Jakarta Raya'
  },
  {
    id: 2,
    name: 'Desi N.',
    headline: 'UI Payroll',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    location: 'Composition & Benefit...'
  },
  {
    id: 3,
    name: 'Muhammad Isa R.',
    headline: 'Talent Ready | HR',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    location: 'Generalist Supervisor'
  },
  {
    id: 4,
    name: 'Galih Dwi Respati',
    headline: 'HCP || IMI Unibadan ||',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    location: 'Recruiter || General Affa...'
  },
  {
    id: 5,
    name: 'Rina Melati',
    headline: 'Desainer Grafis • Bandung',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    location: 'Bandung'
  },
  {
    id: 6,
    name: 'Budi Santoso',
    headline: 'Pelukis Wayang • Solo',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    location: 'Solo'
  },
  {
    id: 7,
    name: 'Maya Anggraini',
    headline: 'Desainer Tenun • Sumba',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
    location: 'Sumba'
  },
  {
    id: 8,
    name: 'Dika Prasetyo',
    headline: 'Content Creator • Bali',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    location: 'Bali'
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {filteredPeople.map((person) => (
                    <div
                      key={person.id}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      {/* Card Header with Dismiss Button */}
                      <div className="relative">
                        <div className="h-16 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                        <button
                          onClick={() => handleDismiss(person.id)}
                          className="absolute top-2 right-2 p-1 bg-white/90 hover:bg-white rounded-full transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-600" />
                        </button>
                        <img
                          src={person.avatar}
                          alt={person.name}
                          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full border-2 border-white object-cover"
                        />
                      </div>

                      {/* Card Body */}
                      <div className="pt-10 pb-3 px-3 text-center">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1 hover:underline cursor-pointer">
                          {person.name}
                        </h4>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2 min-h-[32px]">
                          {person.headline}
                        </p>
                        
                        {person.location && (
                          <p className="text-xs text-gray-500 mb-3">
                            {person.location}
                          </p>
                        )}

                        <button className="text-xs text-gray-600 hover:underline mb-3">
                          Berdasarkan profil Anda
                        </button>

                        <button
                          onClick={() => handleConnect(person.id)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-full text-sm font-semibold hover:bg-blue-50 transition-colors"
                        >
                          <UserPlus className="w-4 h-4" />
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
