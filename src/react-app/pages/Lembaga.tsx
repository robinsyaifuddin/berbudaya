import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { 
  Search, Filter, ChevronDown, Check, 
  Share2, UserPlus, Landmark, Eye, ArrowRight
} from 'lucide-react';
import TopNavbar from '@/react-app/components/TopNavbar';
import VerifiedBadge from '@/react-app/components/VerifiedBadge';
import { communitiesData, Community } from '@/react-app/data/communitiesData';

const lembagaList: Community[] = communitiesData;

const provinces = [
  'Semua Provinsi', 'Jawa Tengah', 'Jawa Timur', 'Jawa Barat', 'DI Yogyakarta', 
  'DKI Jakarta', 'Bali', 'Sumatera Barat', 'Kalimantan Selatan'
];

const categories = ['Semua', 'Kriya', 'Seni Teater & Tari', 'Tari', 'Musik', 'Kuliner', 'Arsitektur', 'Sastra'];

export default function LembagaPage() {
  const navigate = useNavigate();
  const [selectedProvince, setSelectedProvince] = useState('Semua Provinsi');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [showProvinceDropdown, setShowProvinceDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [followedInstitutions, setFollowedInstitutions] = useState<number[]>([1]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleFollow = (e: React.MouseEvent, id: number, name: string) => {
    e.stopPropagation();
    if (followedInstitutions.includes(id)) {
      setFollowedInstitutions(followedInstitutions.filter((cId) => cId !== id));
      triggerToast(`Anda berhenti mengikuti ${name}`);
    } else {
      setFollowedInstitutions([...followedInstitutions, id]);
      triggerToast(`Selamat! Anda resmi mengikuti profil lembaga ${name}`);
    }
  };

  const handleShare = (e: React.MouseEvent, lembaga: Community) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.origin + `/lembaga/${lembaga.id}`);
    triggerToast(`Tautan profil lembaga ${lembaga.name} berhasil disalin!`);
  };

  const filteredInstitutions = lembagaList.filter((lembaga) => {
    const matchSearch = lembaga.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        lembaga.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (lembaga.institutionType && lembaga.institutionType.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchProvince = selectedProvince === 'Semua Provinsi' || lembaga.province === selectedProvince;
    const matchCategory = selectedCategory === 'Semua' || lembaga.category === selectedCategory;
    return matchSearch && matchProvince && matchCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-12 text-slate-800">
      <TopNavbar />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-8">
        
        {/* Banner Direktori Lembaga */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-5 sm:p-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              <Landmark className="w-4 h-4" />
              <span>Direktori Entitas & Lembaga Kebudayaan</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Profil Resmi Lembaga, Sanggar & Yayasan Budaya Nusantara
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Temukan profil terakreditasi, pantau siaran pers resmi, pesan tiket pementasan, serta dukung kampanye restorasi cagar warisan nusantara.
            </p>
          </div>

          <Link
            to="/kelola-lembaga"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs self-start md:self-auto shrink-0 active:scale-[0.98]"
          >
            <Landmark className="w-4 h-4" />
            <span>Daftarkan Lembaga Baru</span>
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-3.5 sm:p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-2.5">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari yayasan kebudayaan, sanggar tari, lembaga kriya, atau tradisi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-slate-50 focus:bg-white"
              />
            </div>

            {/* Province Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProvinceDropdown(!showProvinceDropdown);
                  setShowCategoryDropdown(false);
                }}
                className="w-full md:w-auto flex items-center justify-between gap-2 px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold hover:border-slate-300 transition-colors bg-white text-slate-700"
              >
                <span>{selectedProvince}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {showProvinceDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowProvinceDropdown(false)} />
                  <div className="absolute top-full mt-1.5 left-0 right-0 md:right-auto md:w-56 bg-white rounded-xl shadow-lg border border-slate-200 z-20 max-h-72 overflow-y-auto py-1">
                    {provinces.map((prov) => (
                      <button
                        key={prov}
                        onClick={() => {
                          setSelectedProvince(prov);
                          setShowProvinceDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center justify-between transition-colors text-xs text-slate-700"
                      >
                        <span>{prov}</span>
                        {selectedProvince === prov && <Check className="w-4 h-4 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowCategoryDropdown(!showCategoryDropdown);
                  setShowProvinceDropdown(false);
                }}
                className="w-full md:w-auto flex items-center justify-between gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold hover:border-slate-300 transition-colors bg-white text-slate-700"
              >
                <Filter className="w-3.5 h-3.5 text-blue-600" />
                <span>{selectedCategory === 'Semua' ? 'Kategori' : selectedCategory}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {showCategoryDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowCategoryDropdown(false)} />
                  <div className="absolute top-full mt-2 left-0 right-0 md:right-auto md:w-56 bg-white rounded-xl shadow-xl border border-slate-200 z-20 py-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setShowCategoryDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center justify-between transition-colors text-xs text-slate-700"
                      >
                        <span>{cat}</span>
                        {selectedCategory === cat && <Check className="w-4 h-4 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tabel Data Lembaga Budaya */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Lembaga Kebudayaan</th>
                  <th className="py-3.5 px-4 text-right sm:pr-6">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredInstitutions.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="py-12 text-center text-slate-400">
                      Tidak ada lembaga kebudayaan yang sesuai dengan pencarian atau filter.
                    </td>
                  </tr>
                ) : (
                  filteredInstitutions.map((item) => {
                    const isFollowed = followedInstitutions.includes(item.id);
                    return (
                      <tr
                        key={item.id}
                        onClick={() => navigate(`/lembaga/${item.id}`)}
                        className="group hover:bg-blue-50/40 cursor-pointer transition-colors relative"
                      >
                        {/* Nama Lembaga & Informasi Inti */}
                        <td className="py-4 px-4 sm:px-6">
                          <div className="flex items-center gap-4">
                            <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-2xs group-hover:ring-2 group-hover:ring-blue-500/30 transition-all">
                              <img
                                src={item.avatarImage || item.image}
                                alt={item.name}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300&auto=format&fit=crop&q=80';
                                }}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-sm sm:text-base">
                                  {item.name}
                                </span>
                                {item.verified && (
                                  <VerifiedBadge className="w-4 h-4 text-[#1D9BF0] shrink-0" />
                                )}
                              </div>
                              <p className="text-xs text-slate-600 mt-0.5 line-clamp-1 max-w-xl">
                                {item.tagline || item.description}
                              </p>
                              {/* Hover indicator "Lihat Profil" */}
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs font-bold text-blue-600 mt-1.5">
                                <Eye className="w-3.5 h-3.5" />
                                <span>Lihat Profil Lengkap</span>
                                <ArrowRight className="w-3 h-3" />
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Aksi (+ Ikuti & Share) */}
                        <td className="py-4 px-4 sm:pr-6 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={(e) => handleToggleFollow(e, item.id, item.name)}
                              className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs active:scale-[0.98] ${
                                isFollowed
                                  ? 'bg-blue-50 text-blue-700 border border-blue-300 hover:bg-blue-100'
                                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                              }`}
                              title={isFollowed ? 'Berhenti Mengikuti' : 'Ikuti Lembaga'}
                            >
                              {isFollowed ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Mengikuti</span>
                                </>
                              ) : (
                                <>
                                  <UserPlus className="w-3.5 h-3.5" />
                                  <span>+ Ikuti</span>
                                </>
                              )}
                            </button>

                            <button
                              onClick={(e) => handleShare(e, item)}
                              className="p-2 border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 rounded-xl transition-colors"
                              title="Salin Tautan Lembaga"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <Link
        to="/kelola-lembaga"
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all font-bold text-xs sm:text-sm flex items-center gap-2 hover:scale-105 z-40 active:scale-[0.98]"
      >
        <Landmark className="w-4 h-4" />
        <span>Daftarkan Lembaga</span>
      </Link>
    </div>
  );
}
