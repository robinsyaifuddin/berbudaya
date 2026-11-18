import ModernLayout from '@/react-app/components/ModernLayout';
import { Clock, Target, Users, Plus, CheckCircle2, ChevronRight, X, HeartHandshake } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  creator: string;
  funded: number;
  target: number;
  backers: number;
  daysLeft: number;
  category: string;
}

const initialProjects: Project[] = [
  {
    id: 1,
    title: 'Revitalisasi Alat Musik Tradisional Nusantara',
    description: 'Proyek untuk mendokumentasikan dan merevitalisasi 50 alat musik tradisional dari berbagai daerah di Indonesia yang terancam punah.',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=500&fit=crop',
    creator: 'Yayasan Musik Nusantara',
    funded: 12500000,
    target: 50000000,
    backers: 234,
    daysLeft: 45,
    category: 'Musik'
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
    daysLeft: 23,
    category: 'Tari'
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
    daysLeft: 60,
    category: 'Kriya'
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
    daysLeft: 38,
    category: 'Sastra'
  }
];

export default function ProyekPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'running' | 'success' | 'mine'>('all');
  const [projectsList, setProjectsList] = useState<Project[]>(initialProjects);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formCreator, setFormCreator] = useState('');
  const [formTarget, setFormTarget] = useState('');
  const [formCategory, setFormCategory] = useState('Kriya');
  const [formDescription, setFormDescription] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formTarget) return;

    const newProject: Project = {
      id: Date.now(),
      title: formTitle,
      creator: formCreator || 'Penggagas Budaya',
      description: formDescription || 'Proyek pelestarian budaya bersama masyarakat Nusantara.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop',
      funded: 0,
      target: Number(formTarget),
      backers: 1,
      daysLeft: 60,
      category: formCategory
    };

    setProjectsList([newProject, ...projectsList]);
    setShowCreateModal(false);
    setFormTitle('');
    setFormCreator('');
    setFormTarget('');
    setFormDescription('');
    triggerToast('Proyek baru berhasil diajukan dan sedang dalam proses kurasi verifikasi!');
  };

  const filteredProjects = projectsList.filter((p) => {
    const percentage = Math.round((p.funded / p.target) * 100);
    if (activeTab === 'running') return percentage < 100;
    if (activeTab === 'success') return percentage >= 100;
    if (activeTab === 'mine') return p.id > 4;
    return true;
  });

  return (
    <ModernLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-gray-700 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-1">
                Proyek & Crowdfunding Budaya
              </h1>
              <p className="text-sm text-gray-600">
                Gotong royong mendukung pembiayaan inisiatif pelestarian warisan budaya Indonesia
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#133384] hover:bg-[#1844A6] text-white font-medium text-sm transition-all shadow-sm active:scale-[0.98] w-fit"
            >
              <Plus className="w-4 h-4" />
              <span>Buat Proyek Baru</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-3 mb-6 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'Semua Proyek' },
            { id: 'running', label: 'Sedang Berjalan' },
            { id: 'success', label: 'Tercapai' },
            { id: 'mine', label: 'Inisiatif Saya' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {filteredProjects.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
              <HeartHandshake className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-gray-900 mb-1">Belum ada proyek di kategori ini</h3>
              <p className="text-sm text-gray-500 mb-4">Mulai inisiasi pelestarian budaya lokal Anda sekarang</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Buat Inisiatif Baru
              </button>
            </div>
          ) : (
            filteredProjects.map((project) => {
              const percentage = Math.min(100, Math.round((project.funded / project.target) * 100));

              return (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:border-gray-300 transition-all group"
                >
                  <div className="md:flex">
                    <div className="md:w-2/5 relative overflow-hidden bg-gray-100">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-56 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-md border border-gray-200">
                        {project.category}
                      </div>
                    </div>

                    <div className="md:w-3/5 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h2 className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                            {project.title}
                          </h2>
                        </div>
                        <p className="text-xs text-gray-500 mb-3 font-medium">oleh {project.creator}</p>

                        <p className="text-sm text-gray-600 mb-6 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      <div>
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-lg font-bold text-gray-900">
                              Rp {project.funded.toLocaleString('id-ID')}
                            </span>
                            <span className="text-xs text-gray-500">
                              Target: Rp {project.target.toLocaleString('id-ID')}
                            </span>
                          </div>
                          <div className="bg-gray-100 rounded-full h-2.5 overflow-hidden border border-gray-200/50">
                            <div
                              className="bg-blue-600 h-full rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <p className="text-xs font-medium text-blue-600 mt-1.5">{percentage}% tercapai</p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-100 mb-5 text-center">
                          <div className="flex items-center justify-center gap-1.5 text-gray-700">
                            <Users className="w-4 h-4 text-blue-600" />
                            <div className="text-left">
                              <p className="text-xs font-bold text-gray-900 leading-tight">{project.backers}</p>
                              <p className="text-[10px] text-gray-500">Pendukung</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-center gap-1.5 text-gray-700">
                            <Clock className="w-4 h-4 text-amber-600" />
                            <div className="text-left">
                              <p className="text-xs font-bold text-gray-900 leading-tight">{project.daysLeft}</p>
                              <p className="text-[10px] text-gray-500">Hari tersisa</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-center gap-1.5 text-gray-700">
                            <Target className="w-4 h-4 text-emerald-600" />
                            <div className="text-left">
                              <p className="text-xs font-bold text-gray-900 leading-tight">{percentage}%</p>
                              <p className="text-[10px] text-gray-500">Kesiapan</p>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                          <Link
                            to={`/crowdfunding/${project.id}/donate`}
                            className="flex-1 bg-[#133384] hover:bg-[#1844A6] text-white text-center py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm active:scale-[0.98]"
                          >
                            Dukung Sekarang
                          </Link>
                          <Link
                            to={`/crowdfunding/${project.id}`}
                            className="px-5 py-2.5 rounded-xl border border-gray-300 hover:border-gray-400 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-1"
                          >
                            <span>Detail</span>
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Buat Proyek Baru */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-200">
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Ajukan Inisiatif Proyek Baru</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProject} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Judul Inisiatif Budaya *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Contoh: Restorasi Bale Kesenian Adat"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Nama Penggagas / Komunitas
                    </label>
                    <input
                      type="text"
                      value={formCreator}
                      onChange={(e) => setFormCreator(e.target.value)}
                      placeholder="Sanggar / Yayasan"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Kategori
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                    >
                      <option value="Kriya">Kriya & Seni Rupa</option>
                      <option value="Tari">Seni Tari</option>
                      <option value="Musik">Musik Tradisional</option>
                      <option value="Sastra">Sastra & Manuskrip</option>
                      <option value="Cagar Budaya">Cagar Budaya</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Target Pendanaan (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    min={500000}
                    value={formTarget}
                    onChange={(e) => setFormTarget(e.target.value)}
                    placeholder="Contoh: 25000000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Deskripsi Ringkas & Dampak Pelestarian
                  </label>
                  <textarea
                    rows={3}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Jelaskan tujuan dan manfaat nyata bagi pelestarian budaya..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-2.5 border border-gray-300 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#133384] hover:bg-[#1844A6] text-white font-medium text-sm rounded-xl shadow-sm"
                  >
                    Ajukan Proyek
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ModernLayout>
  );
}
