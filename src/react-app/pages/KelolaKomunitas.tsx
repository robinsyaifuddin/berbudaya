import { useState } from 'react';
import TopNavbar from '@/react-app/components/TopNavbar';
import { Link } from 'react-router';
import { Plus, Users, Settings, Eye, TrendingUp } from 'lucide-react';

interface Community {
  id: number;
  name: string;
  description: string;
  members: number;
  image: string;
  role: 'admin' | 'member';
  category: string;
  growth: string;
}

const userCommunities: Community[] = [
  {
    id: 1,
    name: 'Komunitas Wayang Indonesia',
    description: 'Komunitas pecinta wayang dari seluruh Indonesia. Berbagi informasi, diskusi, dan event seputar dunia pewayangan.',
    members: 1250,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&h=200&fit=crop',
    role: 'admin',
    category: 'Seni Pertunjukan',
    growth: '+12% bulan ini'
  },
  {
    id: 2,
    name: 'Pecinta Batik Nusantara',
    description: 'Ruang belajar dan berbagi tentang batik dari berbagai daerah di Indonesia. Dari pembuatan hingga filosofi motif.',
    members: 2340,
    image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=300&h=200&fit=crop',
    role: 'admin',
    category: 'Kerajinan',
    growth: '+8% bulan ini'
  },
  {
    id: 3,
    name: 'Sanggar Tari Tradisional',
    description: 'Komunitas untuk pelestarian dan pengembangan tari tradisional Indonesia.',
    members: 876,
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=200&fit=crop',
    role: 'member',
    category: 'Tari',
    growth: '+5% bulan ini'
  }
];

export default function KelolaKomunitasPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCommunity, setNewCommunity] = useState({
    name: '',
    description: '',
    category: 'Seni Pertunjukan'
  });

  const handleCreateCommunity = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Komunitas "${newCommunity.name}" berhasil dibuat!\n\nIni adalah mode demo. Dalam produksi, komunitas akan disimpan ke database.`);
    setNewCommunity({ name: '', description: '', category: 'Seni Pertunjukan' });
    setShowCreateForm(false);
  };

  const adminCommunities = userCommunities.filter(c => c.role === 'admin');
  const memberCommunities = userCommunities.filter(c => c.role === 'member');

  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNavbar />
        
        <div className="pt-16">
          <div className="max-w-2xl mx-auto p-4 md:p-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-8">
              <button 
                onClick={() => setShowCreateForm(false)}
                className="text-blue-600 hover:text-blue-700 mb-6 text-sm font-medium"
              >
                ← Kembali
              </button>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Buat Komunitas Baru</h1>
              <p className="text-gray-600 mb-8">Ciptakan komunitas untuk menghubungkan orang-orang dengan minat yang sama</p>

              <form onSubmit={handleCreateCommunity} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Nama Komunitas <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newCommunity.name}
                    onChange={(e) => setNewCommunity({...newCommunity, name: e.target.value})}
                    placeholder="Contoh: Komunitas Batik Jakarta"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Nama komunitas harus unik dan mencerminkan tujuan komunitas</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newCommunity.category}
                    onChange={(e) => setNewCommunity({...newCommunity, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="Seni Pertunjukan">Seni Pertunjukan</option>
                    <option value="Kerajinan">Kerajinan</option>
                    <option value="Musik Tradisional">Musik Tradisional</option>
                    <option value="Kuliner">Kuliner</option>
                    <option value="Arsitektur">Arsitektur</option>
                    <option value="Sastra">Sastra</option>
                    <option value="Tari">Tari</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Deskripsi <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={newCommunity.description}
                    onChange={(e) => setNewCommunity({...newCommunity, description: e.target.value})}
                    placeholder="Jelaskan tentang komunitas Anda, tujuan, dan siapa yang cocok bergabung..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Minimal 100 karakter. Jelaskan visi, misi, dan aktivitas komunitas.</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">💡 Tips Membuat Komunitas yang Menarik:</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Pilih nama yang mudah diingat dan mencerminkan identitas komunitas</li>
                    <li>• Tulis deskripsi yang jelas dan mengundang</li>
                    <li>• Tentukan tema atau fokus komunitas dengan spesifik</li>
                    <li>• Aktif mengajak diskusi dan berbagi konten berkualitas</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Buat Komunitas
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      
      <div className="pt-16">
        <div className="max-w-6xl mx-auto p-4 md:p-6">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Kelola Komunitas Anda</h1>
                <p className="text-gray-600 mt-1">Komunitas yang Anda kelola dan ikuti</p>
              </div>
              <button 
                onClick={() => setShowCreateForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden md:inline">Buat Komunitas</span>
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{adminCommunities.length}</p>
                <p className="text-sm text-gray-600">Komunitas Dikelola</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{memberCommunities.length}</p>
                <p className="text-sm text-gray-600">Komunitas Diikuti</p>
              </div>
              <div className="text-center md:block hidden">
                <p className="text-2xl font-bold text-purple-600">
                  {userCommunities.reduce((sum, c) => sum + c.members, 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Total Anggota</p>
              </div>
            </div>
          </div>

          {/* Admin Communities */}
          {adminCommunities.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Komunitas yang Anda Kelola</h2>
              <div className="space-y-4">
                {adminCommunities.map((community) => (
                  <div key={community.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="md:flex">
                      <img 
                        src={community.image} 
                        alt={community.name}
                        className="w-full md:w-64 h-48 md:h-auto object-cover"
                      />
                      
                      <div className="flex-1 p-4 md:p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{community.name}</h3>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                Administrator
                              </span>
                              <span className="text-sm text-gray-500">
                                {community.category}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{community.description}</p>
                        
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Users className="w-5 h-5" />
                              <span className="font-medium">{community.members.toLocaleString()} anggota</span>
                            </div>
                            <div className="flex items-center gap-2 text-green-600">
                              <TrendingUp className="w-4 h-4" />
                              <span className="text-xs font-medium">{community.growth}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Link to={`/komunitas?group=${community.id}`}>
                              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                                <Settings className="w-4 h-4" />
                                Kelola
                              </button>
                            </Link>
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                              <Eye className="w-4 h-4" />
                              Lihat
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Member Communities */}
          {memberCommunities.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Komunitas yang Anda Ikuti</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {memberCommunities.map((community) => (
                  <div key={community.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <img 
                      src={community.image} 
                      alt={community.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{community.name}</h3>
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full mb-2">
                        Anggota
                      </span>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{community.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Users className="w-4 h-4" />
                          <span>{community.members.toLocaleString()}</span>
                        </div>
                        <Link to={`/komunitas?group=${community.id}`}>
                          <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium">
                            Lihat
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {userCommunities.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada komunitas</h3>
              <p className="text-gray-600 mb-6">Buat komunitas pertama Anda dan mulai membangun jejaring budaya</p>
              <button 
                onClick={() => setShowCreateForm(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Buat Komunitas Baru
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
