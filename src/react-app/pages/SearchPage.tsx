import React, { useState, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router';
import { 
  Search, Users, ShoppingBag, Newspaper, Heart, Image as GalleryIcon,
  Calendar, MapPin, CheckCircle, ExternalLink, Filter,
  Sparkles, SlidersHorizontal, ArrowRight, Store, Eye, ChevronRight
} from 'lucide-react';
import TopNavbar from '@/react-app/components/TopNavbar';
import VerifiedBadge from '@/react-app/components/VerifiedBadge';
import { usersDatabase } from '@/react-app/data/usersDatabase';
import { CULTURAL_PRODUCTS } from '@/react-app/data/productsData';
import { communitiesData } from '@/react-app/data/communitiesData';
import { newsArticles } from '@/react-app/data/newsData';
import { campaignData } from '@/react-app/data/crowdfundingData';

// Types filter kategori Facebook-style
type CategoryType = 'all' | 'people' | 'products' | 'communities' | 'news' | 'gallery' | 'crowdfunding' | 'events';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryParam = searchParams.get('q') || '';
  const typeParam = (searchParams.get('type') as CategoryType) || 'all';

  const [searchInput, setSearchInput] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(typeParam);

  // Sync state if url param changes
  React.useEffect(() => {
    setSearchInput(queryParam);
    setSelectedCategory(typeParam);
  }, [queryParam, typeParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim(), type: selectedCategory });
    }
  };

  const handleCategoryChange = (cat: CategoryType) => {
    setSelectedCategory(cat);
    setSearchParams({ q: searchInput.trim() || queryParam, type: cat });
  };

  const lowerQuery = (searchInput.trim() || queryParam).toLowerCase();

  // 1. Data Orang / Seniman
  const peopleResults = useMemo(() => {
    const list = Object.values(usersDatabase || {});
    if (!lowerQuery) return list;
    const q = lowerQuery.trim();
    // Sinonim & pemetaan kata kunci budaya
    const isCraftQuery = /kerajinan|kriya|anyam|tenun|batik|ukir|pahat|gerabah|keramik|tatah/i.test(q);
    return list.filter(u => {
      const matchBasic = 
        u?.name?.toLowerCase().includes(q) ||
        u?.username?.toLowerCase().includes(q) ||
        u?.profession?.toLowerCase().includes(q) ||
        u?.category?.toLowerCase().includes(q) ||
        u?.headline?.toLowerCase().includes(q) ||
        u?.location?.toLowerCase().includes(q) ||
        (Array.isArray(u?.culturalFocus) && u.culturalFocus.some(c => c?.toLowerCase().includes(q)));
      
      const matchCraft = isCraftQuery && (
        u?.profession?.toLowerCase().includes('kriya') ||
        u?.profession?.toLowerCase().includes('tenun') ||
        u?.profession?.toLowerCase().includes('songket') ||
        u?.profession?.toLowerCase().includes('wayang') ||
        u?.category?.toLowerCase().includes('tekstil')
      );

      return matchBasic || matchCraft;
    });
  }, [lowerQuery]);

  // 2. Data Produk Pasar Seni / Toko
  const productResults = useMemo(() => {
    if (!Array.isArray(CULTURAL_PRODUCTS)) return [];
    if (!lowerQuery) return CULTURAL_PRODUCTS;
    const q = lowerQuery.trim();
    const isCraftQuery = /kerajinan|kriya|anyam|tenun|batik|ukir|pahat|gerabah|keramik|tatah/i.test(q);

    return CULTURAL_PRODUCTS.filter(p => {
      const matchBasic =
        p?.name?.toLowerCase().includes(q) ||
        p?.seller?.toLowerCase().includes(q) ||
        p?.category?.toLowerCase().includes(q) ||
        p?.origin?.toLowerCase().includes(q) ||
        p?.description?.toLowerCase().includes(q) ||
        p?.materials?.toLowerCase().includes(q) ||
        p?.culturalTag?.ethnicGroup?.toLowerCase().includes(q) ||
        p?.culturalTag?.philosophy?.toLowerCase().includes(q) ||
        p?.culturalTag?.technique?.toLowerCase().includes(q);

      const matchCraft = isCraftQuery && (
        p?.category?.toLowerCase().includes('kriya') ||
        p?.category?.toLowerCase().includes('anyaman') ||
        p?.category?.toLowerCase().includes('tekstil')
      );

      return matchBasic || matchCraft;
    });
  }, [lowerQuery]);

  // 3. Data Komunitas Budaya
  const communityResults = useMemo(() => {
    if (!Array.isArray(communitiesData)) return [];
    if (!lowerQuery) return communitiesData;
    const q = lowerQuery.trim();
    const isCraftQuery = /kerajinan|kriya|anyam|tenun|batik|ukir|pahat|gerabah|keramik|tatah/i.test(q);

    return communitiesData.filter(c => {
      const matchBasic =
        c?.name?.toLowerCase().includes(q) ||
        c?.category?.toLowerCase().includes(q) ||
        c?.location?.toLowerCase().includes(q) ||
        c?.province?.toLowerCase().includes(q) ||
        c?.tagline?.toLowerCase().includes(q) ||
        c?.description?.toLowerCase().includes(q) ||
        c?.about?.toLowerCase().includes(q);

      const matchCraft = isCraftQuery && (
        c?.name?.toLowerCase().includes('pengrajin') ||
        c?.tagline?.toLowerCase().includes('pengrajin') ||
        c?.category?.toLowerCase().includes('kriya')
      );

      return matchBasic || matchCraft;
    });
  }, [lowerQuery]);

  // 4. Data Berita / Artikel
  const newsResults = useMemo(() => {
    if (!Array.isArray(newsArticles)) return [];
    if (!lowerQuery) return newsArticles;
    const q = lowerQuery.trim();
    const isCraftQuery = /kerajinan|kriya|anyam|tenun|batik|ukir|pahat|gerabah|keramik|tatah/i.test(q);

    return newsArticles.filter(n => {
      const matchBasic =
        n?.title?.toLowerCase().includes(q) ||
        n?.category?.toLowerCase().includes(q) ||
        n?.excerpt?.toLowerCase().includes(q) ||
        n?.author?.toLowerCase().includes(q) ||
        (Array.isArray(n?.tags) && n.tags.some(t => t?.toLowerCase().includes(q)));

      const matchCraft = isCraftQuery && (
        n?.title?.toLowerCase().includes('pengrajin') ||
        n?.category?.toLowerCase().includes('kriya')
      );

      return matchBasic || matchCraft;
    });
  }, [lowerQuery]);

  // 5. Data Donasi / Crowdfunding
  const crowdfundingResults = useMemo(() => {
    const list = Object.values(campaignData || {});
    if (!lowerQuery) return list;
    const q = lowerQuery.trim();
    const isCraftQuery = /kerajinan|kriya|anyam|tenun|batik|ukir|pahat|gerabah|keramik|tatah/i.test(q);

    return list.filter(c => {
      const matchBasic =
        c?.title?.toLowerCase().includes(q) ||
        c?.organizer?.toLowerCase().includes(q) ||
        c?.category?.toLowerCase().includes(q) ||
        c?.location?.toLowerCase().includes(q) ||
        c?.description?.toLowerCase().includes(q) ||
        c?.fullDescription?.toLowerCase().includes(q);

      const matchCraft = isCraftQuery && (
        c?.title?.toLowerCase().includes('pengrajin') ||
        c?.description?.toLowerCase().includes('pengrajin')
      );

      return matchBasic || matchCraft;
    });
  }, [lowerQuery]);

  // Total results count
  const totalCount = 
    peopleResults.length + 
    productResults.length + 
    communityResults.length + 
    newsResults.length + 
    crowdfundingResults.length;

  const categories = [
    { id: 'all', label: 'Semua Hasil', icon: Sparkles, count: totalCount },
    { id: 'people', label: 'Orang & Seniman', icon: Users, count: peopleResults.length },
    { id: 'products', label: 'Pasar Seni & Toko', icon: ShoppingBag, count: productResults.length },
    { id: 'communities', label: 'Komunitas', icon: Users, count: communityResults.length },
    { id: 'news', label: 'Berita & Artikel', icon: Newspaper, count: newsResults.length },
    { id: 'crowdfunding', label: 'Donasi & Program', icon: Heart, count: crowdfundingResults.length },
  ];

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-900 pt-16">
      <TopNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* SIDEBAR FILTER KIRI (Facebook Search Style) */}
          <aside className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sticky top-[80px]">
            <div className="border-b border-slate-100 pb-3 mb-3">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Hasil Pencarian</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {lowerQuery ? (
                  <>Menampilkan hasil untuk <span className="font-semibold text-slate-800">"{lowerQuery}"</span></>
                ) : (
                  'Eksplorasi seluruh ekosistem kebudayaan'
                )}
              </p>
            </div>

            {/* Form Pencarian Cepat di Halaman */}
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari lagi..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </form>

            <div className="space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Kategori
              </div>
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id as CategoryType)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-slate-100 text-slate-900 font-semibold' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-900' : 'text-slate-500'}`} />
                      <span>{cat.label}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      isActive ? 'bg-slate-200 text-slate-800' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* KONTEN HASIL PENCARIAN (Feed Kanan) */}
          <section className="lg:col-span-8 space-y-6">
            
            {/* KONDISI TIDAK DITEMUKAN */}
            {totalCount === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Tidak ada hasil ditemukan</h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                  Coba periksa ejaan kata kunci "{lowerQuery}" atau gunakan kata kunci budaya yang lebih umum.
                </p>
              </div>
            )}

            {/* 1. SEKSI ORANG / SENIMAN */}
            {(selectedCategory === 'all' || selectedCategory === 'people') && peopleResults.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-slate-700" />
                    <h2 className="font-bold text-slate-900 text-base">Orang & Pelestari Budaya</h2>
                    <span className="text-xs text-slate-500">({peopleResults.length})</span>
                  </div>
                  {selectedCategory === 'all' && peopleResults.length > 3 && (
                    <button 
                      onClick={() => handleCategoryChange('people')} 
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
                    >
                      Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="divide-y divide-slate-100">
                  {(selectedCategory === 'all' ? peopleResults.slice(0, 3) : peopleResults).map((person) => (
                    <div key={person.id} className="p-4 flex items-center justify-between hover:bg-slate-50/70 transition-colors">
                      <div className="flex items-center gap-3.5">
                        <img 
                          src={person.avatar} 
                          alt={person.name} 
                          className="w-12 h-12 rounded-full object-cover border border-slate-200" 
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <Link to={`/user/${person.id}`} className="font-bold text-slate-900 hover:text-blue-600 text-sm">
                              {person.name}
                            </Link>
                            {person.verified && (
                              <VerifiedBadge className="w-4 h-4 text-[#1D9BF0] shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-slate-500 font-medium">{person.profession} • {person.location}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{(person.followers ?? 0).toLocaleString()} Pengikut</p>
                        </div>
                      </div>
                      <Link
                        to={`/user/${person.id}`}
                        className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-colors"
                      >
                        Lihat Profil
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. SEKSI KOMUNITAS BUDAYA (Mirip Grup di Facebook) */}
            {(selectedCategory === 'all' || selectedCategory === 'communities') && communityResults.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-slate-700" />
                    <h2 className="font-bold text-slate-900 text-base">Komunitas & Sanggar</h2>
                    <span className="text-xs text-slate-500">({communityResults.length})</span>
                  </div>
                  {selectedCategory === 'all' && communityResults.length > 3 && (
                    <button 
                      onClick={() => handleCategoryChange('communities')} 
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
                    >
                      Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="divide-y divide-slate-100">
                  {(selectedCategory === 'all' ? communityResults.slice(0, 3) : communityResults).map((community) => {
                    const memberCount = community.membersCount ?? community.members ?? 0;
                    const communityImg = community.avatar || community.image || community.avatarImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop';
                    return (
                      <div key={community.id} className="p-4 flex items-center justify-between hover:bg-slate-50/70 transition-colors">
                        <div className="flex items-center gap-3.5">
                          <img 
                            src={communityImg} 
                            alt={community.name} 
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200" 
                          />
                          <div>
                            <Link to={`/komunitas/${community.id}`} className="font-bold text-slate-900 hover:text-blue-600 text-sm">
                              {community.name}
                            </Link>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {community.isPrivate ? 'Komunitas Privat' : 'Publik'} • {memberCount.toLocaleString()} Anggota
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1 max-w-md">
                              {community.location || community.province} • {community.description}
                            </p>
                          </div>
                        </div>
                        <Link
                          to={`/komunitas/${community.id}`}
                          className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded-lg transition-colors"
                        >
                          Gabung
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. SEKSI PRODUK / PASAR SENI (Marketplace) */}
            {(selectedCategory === 'all' || selectedCategory === 'products') && productResults.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-slate-700" />
                    <h2 className="font-bold text-slate-900 text-base">Pasar Seni & Kerajinan</h2>
                    <span className="text-xs text-slate-500">({productResults.length})</span>
                  </div>
                  {selectedCategory === 'all' && productResults.length > 4 && (
                    <button 
                      onClick={() => handleCategoryChange('products')} 
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
                    >
                      Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(selectedCategory === 'all' ? productResults.slice(0, 4) : productResults).map((product) => (
                    <Link
                      key={product.id}
                      to={`/marketplace/${product.id}`}
                      className="flex gap-3 p-2.5 rounded-xl border border-slate-200/80 hover:border-slate-300 hover:shadow-sm transition-all group bg-white"
                    >
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0 bg-slate-100" 
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                          {product.category}
                        </span>
                        <h4 className="font-medium text-xs text-slate-900 line-clamp-1 group-hover:text-blue-600 mt-0.5">
                          {product.name}
                        </h4>
                        <p className="text-xs font-bold text-slate-900 mt-1">
                          Rp {(product.price ?? 0).toLocaleString('id-ID')}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1 truncate">
                          <Store className="w-3 h-3 text-slate-400" />
                          {product.seller}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 4. SEKSI BERITA & ARTIKEL BUDAYA */}
            {(selectedCategory === 'all' || selectedCategory === 'news') && newsResults.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <Newspaper className="w-5 h-5 text-slate-700" />
                    <h2 className="font-bold text-slate-900 text-base">Kabar & Warta Budaya</h2>
                    <span className="text-xs text-slate-500">({newsResults.length})</span>
                  </div>
                  {selectedCategory === 'all' && newsResults.length > 3 && (
                    <button 
                      onClick={() => handleCategoryChange('news')} 
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
                    >
                      Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="divide-y divide-slate-100">
                  {(selectedCategory === 'all' ? newsResults.slice(0, 3) : newsResults).map((news) => (
                    <Link
                      key={news.id}
                      to={`/berita/${news.slug}`}
                      className="p-4 flex gap-4 hover:bg-slate-50/70 transition-colors block group"
                    >
                      <img 
                        src={news.image} 
                        alt={news.title} 
                        className="w-24 h-18 sm:w-28 sm:h-20 rounded-xl object-cover flex-shrink-0 bg-slate-100" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                            {news.category}
                          </span>
                          <span className="text-[11px] text-slate-400">{news.date}</span>
                        </div>
                        <h4 className="font-semibold text-sm text-slate-900 group-hover:text-blue-600 line-clamp-2">
                          {news.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                          {news.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 5. SEKSI DONASI & CROWDFUNDING */}
            {(selectedCategory === 'all' || selectedCategory === 'crowdfunding') && crowdfundingResults.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-slate-700" />
                    <h2 className="font-bold text-slate-900 text-base">Galang Dana & Restorasi</h2>
                    <span className="text-xs text-slate-500">({crowdfundingResults.length})</span>
                  </div>
                  {selectedCategory === 'all' && crowdfundingResults.length > 2 && (
                    <button 
                      onClick={() => handleCategoryChange('crowdfunding')} 
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
                    >
                      Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="divide-y divide-slate-100">
                  {(selectedCategory === 'all' ? crowdfundingResults.slice(0, 2) : crowdfundingResults).map((cf) => {
                    const percentage = Math.min(100, Math.round((cf.raised / cf.target) * 100));
                    return (
                      <div key={cf.id} className="p-4 flex flex-col sm:flex-row gap-4 hover:bg-slate-50/70 transition-colors">
                        <img 
                          src={cf.image} 
                          alt={cf.title} 
                          className="w-full sm:w-36 h-24 rounded-xl object-cover bg-slate-100" 
                        />
                        <div className="flex-1">
                          <Link to={`/crowdfunding/${cf.id}`} className="font-bold text-sm text-slate-900 hover:text-blue-600 line-clamp-1">
                            {cf.title}
                          </Link>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                            {cf.description}
                          </p>
                          
                          {/* Progress bar */}
                          <div className="mt-3">
                            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                              <span>Rp {(cf.raised ?? 0).toLocaleString('id-ID')}</span>
                              <span className="text-slate-700">{percentage}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-slate-800 rounded-full" style={{ width: `${percentage}%` }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </section>
        </div>
      </main>
    </div>
  );
}
