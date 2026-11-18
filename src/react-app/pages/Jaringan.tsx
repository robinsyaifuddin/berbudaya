import ModernLayout from '@/react-app/components/ModernLayout';
import ProfileSidebar from '@/react-app/components/ProfileSidebar';
import { useState } from 'react';
import { Link } from 'react-router';
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

  const leftSidebarNode = (
    <div className="space-y-3">
      {/* Profil User */}
      <ProfileSidebar hideNavAndCta={true} />

      {/* Gambaran Umum Jaringan diletakkan di sidebar kiri menggantikan menu/cta */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-4">
        <h3 className="font-semibold text-slate-900 text-xs tracking-tight mb-3">Gambaran umum jaringan</h3>
        
        <div className="space-y-1">
          <button className="w-full text-left hover:bg-slate-50 p-2 rounded-xl transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">Undangan diterima</span>
              <span className="text-xs font-semibold text-slate-900">0</span>
            </div>
          </button>

          <button className="w-full text-left hover:bg-slate-50 p-2 rounded-xl transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">Koneksi</span>
              <span className="text-xs font-semibold text-slate-900">0</span>
            </div>
          </button>

          <button className="w-full text-left hover:bg-slate-50 p-2 rounded-xl transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">Mengikuti</span>
              <span className="text-xs font-semibold text-slate-900">6</span>
            </div>
          </button>
        </div>

        <div className="border-t border-slate-100 mt-3 pt-3">
          <button className="text-xs font-medium text-blue-600 hover:underline">
            Lihat selengkapnya →
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <ModernLayout showRightSidebar={false} leftSidebarContent={leftSidebarNode}>
      <div className="space-y-3 pb-8">
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
              <button className="flex items-center gap-2 px-3.5 py-1.5 bg-primary-600 text-white rounded-md text-xs font-medium hover:bg-primary-700 transition-colors">
                <Search className="w-3.5 h-3.5" />
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
                  className="group bg-white border border-slate-200/90 rounded-lg overflow-hidden hover:shadow-sm hover:border-primary-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Card Header with Dismiss Button */}
                    <div className="relative">
                      <div className="h-16 bg-gradient-to-r from-[#133384] to-[#0e245e]"></div>
                      <button
                        onClick={() => handleDismiss(person.id)}
                        className="absolute top-2 right-2 p-1.5 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-sm transition-colors z-10"
                        title="Abaikan saran"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <Link
                        to={`/user/${person.id}`}
                        className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 block rounded-full focus:outline-none"
                      >
                        <img
                          src={person.avatar}
                          alt={person.name}
                          className="w-14 h-14 rounded-full border-2 border-white object-cover shadow-xs hover:scale-105 transition-transform"
                        />
                      </Link>
                    </div>

                    {/* Card Body */}
                    <div className="pt-8 pb-3 px-3 text-center">
                      <p className="text-[10px] font-medium text-slate-400 mb-0.5">
                        {person.category}
                      </p>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900 mb-0.5 hover:text-primary-600 transition-colors line-clamp-1">
                        <Link to={`/user/${person.id}`}>
                          {person.name}
                        </Link>
                      </h4>
                      <p className="text-[11px] text-slate-500 mb-1.5 line-clamp-2 min-h-[30px] leading-relaxed">
                        {person.headline}
                      </p>
                      
                      {person.location && (
                        <p className="text-[10px] text-slate-400 mb-2">
                          {person.location}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="px-3 pb-3">
                    <button
                      onClick={() => handleConnect(person.id)}
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#133384] hover:bg-[#1844A6] text-white rounded-md text-xs font-medium shadow-xs transition-colors active:scale-[0.98]"
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
    </ModernLayout>
  );
}
