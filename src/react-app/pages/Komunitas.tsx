import { useState } from 'react';
import { Link } from 'react-router';
import { 
  Users, MapPin, Search, Filter, ChevronDown, Check, 
  Share2, TrendingUp, Activity, Award,
  UserPlus, Star, Landmark, ShieldCheck, Calendar, HandHeart
} from 'lucide-react';
import TopNavbar from '@/react-app/components/TopNavbar';
import VerifiedBadge from '@/react-app/components/VerifiedBadge';
import { communitiesData, Community } from '@/react-app/data/communitiesData';

const communities: Community[] = communitiesData;

const provinces = [
  'Semua Provinsi', 'Jawa Tengah', 'Jawa Timur', 'Jawa Barat', 'DI Yogyakarta', 
  'DKI Jakarta', 'Bali', 'Sumatera Barat', 'Kalimantan Selatan'
];

const categories = ['Semua', 'Kriya', 'Seni Teater & Tari', 'Tari', 'Musik', 'Kuliner', 'Arsitektur', 'Sastra'];

export default function KomunitasPage() {
  const [selectedProvince, setSelectedProvince] = useState('Semua Provinsi');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [showProvinceDropdown, setShowProvinceDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [followedCommunities, setFollowedCommunities] = useState<number[]>([1]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleFollow = (id: number, name: string) => {
    if (followedCommunities.includes(id)) {
      setFollowedCommunities(followedCommunities.filter((cId) => cId !== id));
      triggerToast(`Anda berhenti mengikuti ${name}`);
    } else {
      setFollowedCommunities([...followedCommunities, id]);
      triggerToast(`Selamat! Anda resmi mengikuti profil lembaga ${name}`);
    }
  };

  const handleShare = (community: Community) => {
    navigator.clipboard?.writeText(window.location.origin + `/komunitas/${community.id}`);
    triggerToast(`Tautan profil lembaga ${community.name} berhasil disalin!`);
  };

  const filteredCommunities = communities.filter((community) => {
    const matchSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        community.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchProvince = selectedProvince === 'Semua Provinsi' || community.province === selectedProvince;
    const matchCategory = selectedCategory === 'Semua' || community.category === selectedCategory;
    return matchSearch && matchProvince && matchCategory;
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 md:pb-12 text-slate-800">
      <TopNavbar />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 pt-20">
        
        {/* Banner Direktori Lembaga */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-5 sm:p-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C2410C] uppercase tracking-wider mb-1">
              <Landmark className="w-4 h-4" />
              <span>Direktori Entitas & Lembaga Kebudayaan</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Profil Resmi Lembaga, Sanggar & Yayasan Budaya Nusantara
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Temukan profil terakreditasi, pantau siaran pers resmi, pesan tiket pementasan, serta dukung kampanye restorasi cagar warisan nusantara.
            </p>
          </div>

          <Link
            to="/kelola-komunitas"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs self-start md:self-auto shrink-0"
          >
            <Landmark className="w-4 h-4" />
            <span>Daftarkan Lembaga</span>
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
                className="w-full pl-9 pr-3.5 py-2.5 border border-slate-200 rounded-xl focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] focus:outline-none transition-all text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-slate-50 focus:bg-white"
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
                <MapPin className="w-3.5 h-3.5 text-[#C2410C]" />
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
                        {selectedProvince === prov && <Check className="w-4 h-4 text-[#C2410C]" />}
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
                <Filter className="w-3.5 h-3.5 text-[#C2410C]" />
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
                        {selectedCategory === cat && <Check className="w-4 h-4 text-[#C2410C]" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {filteredCommunities.slice(0, visibleCount).map((community) => {
            const isFollowed = followedCommunities.includes(community.id);
            return (
              <div
                key={community.id}
                className="bg-white rounded-2xl overflow-hidden shadow-xs border border-slate-200/90 hover:border-slate-300 hover:shadow-sm transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img
                      src={community.coverImage || community.image}
                      alt={community.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80';
                      }}
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
                    />
                    {community.trending && (
                      <div className="absolute top-2.5 left-2.5 bg-slate-900/85 backdrop-blur-md text-amber-300 px-2 py-0.5 rounded-md text-[10px] font-semibold flex items-center gap-1 border border-amber-400/20">
                        <TrendingUp className="w-3 h-3" />
                        <span>Terakreditasi</span>
                      </div>
                    )}
                    <div className="absolute bottom-2.5 left-2.5 bg-white/95 text-slate-800 px-2.5 py-0.5 rounded-md text-[10px] font-bold border border-slate-200 shadow-xs">
                      {community.institutionType || community.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        <Link
                          to={`/komunitas/${community.id}`}
                          className="text-base font-bold text-slate-900 truncate hover:text-[#C2410C] transition-colors"
                        >
                          {community.name}
                        </Link>
                        {community.verified && (
                          <VerifiedBadge className="w-4 h-4 text-[#1D9BF0] shrink-0" />
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed flex-1">
                      {community.tagline || community.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="text-center bg-slate-50 rounded-xl p-2 border border-slate-100">
                        <Users className="w-3.5 h-3.5 text-[#C2410C] mx-auto mb-0.5" />
                        <div className="text-xs font-bold text-slate-900">{community.members.toLocaleString()}</div>
                        <div className="text-[10px] text-slate-500">Pengikut</div>
                      </div>
                      <div className="text-center bg-slate-50 rounded-xl p-2 border border-slate-100">
                        <Calendar className="w-3.5 h-3.5 text-blue-600 mx-auto mb-0.5" />
                        <div className="text-xs font-bold text-slate-900">{community.eventsList?.length || community.activities}</div>
                        <div className="text-[10px] text-slate-500">Acara</div>
                      </div>
                      <div className="text-center bg-slate-50 rounded-xl p-2 border border-slate-100">
                        <HandHeart className="w-3.5 h-3.5 text-emerald-600 mx-auto mb-0.5" />
                        <div className="text-xs font-bold text-slate-900">{community.donationsList?.length || 1}</div>
                        <div className="text-[10px] text-slate-500">Donasi</div>
                      </div>
                    </div>

                    {/* Location & Rating */}
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1 text-slate-600 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#C2410C]" />
                        <span>{community.city ? `${community.city}, ` : ''}{community.province}</span>
                      </div>
                      {renderStars(community.rating)}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 pt-0">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleFollow(community.id, community.name)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs ${
                        isFollowed
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                          : 'bg-[#C2410C] hover:bg-[#9A3412] text-white'
                      }`}
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

                    <Link
                      to={`/komunitas/${community.id}`}
                      className="py-2 px-3 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition-colors inline-flex items-center justify-center"
                    >
                      Profil Lembaga
                    </Link>

                    <button
                      onClick={() => handleShare(community)}
                      className="p-2 border border-slate-200 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
                      title="Bagikan Tautan Profil"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredCommunities.length && (
          <div className="text-center pt-2">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              Tampilkan Lebih Banyak Lembaga Budaya
            </button>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <Link
        to="/kelola-komunitas"
        className="fixed bottom-6 right-6 bg-[#C2410C] hover:bg-[#9A3412] text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all font-bold text-xs sm:text-sm flex items-center gap-2 hover:scale-105 z-40 active:scale-[0.98]"
      >
        <Landmark className="w-4 h-4" />
        <span>Daftarkan Lembaga</span>
      </Link>
    </div>
  );
}
