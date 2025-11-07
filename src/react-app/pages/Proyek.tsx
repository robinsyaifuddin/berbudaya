import ModernLayout from '@/react-app/components/ModernLayout';
import { Clock, Target, Users } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Revitalisasi Alat Musik Tradisional Nusantara',
    description: 'Proyek untuk mendokumentasikan dan merevitalisasi 50 alat musik tradisional dari berbagai daerah di Indonesia yang terancam punah.',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=500&fit=crop',
    creator: 'Yayasan Musik Nusantara',
    funded: 12500000,
    target: 50000000,
    backers: 234,
    daysLeft: 45
  },
  {
    id: 2,
    title: 'Dokumentasi Video Tari Tradisional Indonesia',
    description: 'Membuat dokumentasi profesional untuk 100 tarian tradisional dari Sabang sampai Merauke dalam format video berkualitas tinggi.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=500&fit=crop',
    creator: 'Tim Seni Budaya Indonesia',
    funded: 28000000,
    target: 35000000,
    backers: 412,
    daysLeft: 23
  },
  {
    id: 3,
    title: 'Sekolah Batik untuk Generasi Muda',
    description: 'Mendirikan pusat pembelajaran batik gratis untuk anak-anak dan remaja agar tradisi membatik tetap lestari.',
    image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=800&h=500&fit=crop',
    creator: 'Komunitas Batik Indonesia',
    funded: 15750000,
    target: 25000000,
    backers: 189,
    daysLeft: 60
  },
  {
    id: 4,
    title: 'Buku Digital Cerita Rakyat Nusantara',
    description: 'Mengumpulkan, menerjemahkan, dan menerbitkan 500 cerita rakyat dari seluruh Indonesia dalam format digital interaktif.',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=500&fit=crop',
    creator: 'Perpustakaan Dongeng Indonesia',
    funded: 9200000,
    target: 20000000,
    backers: 156,
    daysLeft: 38
  }
];

export default function ProyekPage() {
  return (
    <ModernLayout>
      
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold font-playfair text-dark-brown mb-2">
            Proyek & Crowdfunding
          </h1>
          <p className="text-gray-600">
            Dukung proyek pelestarian budaya Indonesia dan wujudkan bersama
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-4 mb-6">
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-terracotta to-gold text-white font-semibold shadow-md">
            Semua Proyek
          </button>
          <button className="px-4 py-2 rounded-lg text-dark-brown hover:bg-warm-gray/50 transition-colors">
            Sedang Berjalan
          </button>
          <button className="px-4 py-2 rounded-lg text-dark-brown hover:bg-warm-gray/50 transition-colors">
            Berhasil
          </button>
          <button className="px-4 py-2 rounded-lg text-dark-brown hover:bg-warm-gray/50 transition-colors">
            Proyek Saya
          </button>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {projects.map((project) => {
            const percentage = Math.round((project.funded / project.target) * 100);
            
            return (
              <div
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-warm-gray/30 hover:shadow-xl transition-all"
              >
                <div className="md:flex">
                  <div className="md:w-2/5">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  
                  <div className="md:w-3/5 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h2 className="text-2xl font-bold font-playfair text-dark-brown mb-2">
                          {project.title}
                        </h2>
                        <p className="text-sm text-gray-500">oleh {project.creator}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold text-terracotta">
                          Rp {project.funded.toLocaleString('id-ID')}
                        </span>
                        <span className="text-sm text-gray-500">
                          dari Rp {project.target.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="bg-warm-gray rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-terracotta to-gold h-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{percentage}% terdanai</p>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex items-center gap-6 mb-6">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-terracotta" />
                        <div>
                          <p className="font-bold text-dark-brown">{project.backers}</p>
                          <p className="text-xs text-gray-500">Pendukung</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gold" />
                        <div>
                          <p className="font-bold text-dark-brown">{project.daysLeft}</p>
                          <p className="text-xs text-gray-500">Hari tersisa</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-terracotta" />
                        <div>
                          <p className="font-bold text-dark-brown">{percentage}%</p>
                          <p className="text-xs text-gray-500">Tercapai</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-4">
                      <button className="flex-1 bg-gradient-to-r from-terracotta to-gold text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                        Dukung Sekarang
                      </button>
                      <button className="px-6 py-3 rounded-xl border-2 border-terracotta text-terracotta font-semibold hover:bg-terracotta hover:text-white transition-all">
                        Detail
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Create Project Button */}
        <button className="fixed bottom-8 right-8 bg-gradient-to-r from-terracotta to-gold text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all font-semibold">
          + Buat Proyek Baru
        </button>
      </div>
    </ModernLayout>
  );
}
