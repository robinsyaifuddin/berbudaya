import React, { useState, useEffect } from 'react';
import TopNavbar from '@/react-app/components/TopNavbar';
import { 
  Edit3, Mail, Globe, Plus, 
  Calendar, User, Briefcase, GraduationCap, MapPin,
  Camera, X, Image as ImageIcon, FileText,
  Link as LinkIcon, Share2, ShieldCheck, Heart, MessageCircle, Send, Bookmark, MoreHorizontal,
  ArrowLeft, Check, Upload, Sparkles
} from 'lucide-react';
import { useNotification } from '@/react-app/contexts/NotificationContext';
import VerifiedBadge from '@/react-app/components/VerifiedBadge';

interface CulturalInterest {
  name: string;
  region: string;
  description: string;
}

interface ExperienceItem {
  id: string;
  role: string;
  institution: string;
  period: string;
  description: string;
}

interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  year: string;
}

export default function ProfilPage() {
  const { success } = useNotification();
  const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');
  
  // State Profile
  const [name, setName] = useState('Emma Smith');
  const [headline, setHeadline] = useState('Kreator Budaya & Kurator Seni Nusantara');
  const [location, setLocation] = useState('Jakarta, Indonesia');
  const [role, setRole] = useState('Kreator Budaya');
  const [summary, setSummary] = useState(
    'Saya adalah seorang pecinta budaya Indonesia yang berdedikasi untuk melestarikan dan mempromosikan kekayaan warisan budaya nusantara melalui digitalisasi seni, pertunjukan interaktif, dan pemberdayaan komunitas lokal.'
  );
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop');
  const [coverGradient, setCoverGradient] = useState('from-blue-600 via-indigo-600 to-sky-700');
  
  // Additional details
  const [email, setEmail] = useState('emma.smith@Berbudaya.id');
  const [languages, setLanguages] = useState('Indonesia, Inggris, Jawa');
  const [pronouns, setPronouns] = useState('Dia / Beliau');
  const [nickname, setNickname] = useState('Emma');
  const [website, setWebsite] = useState('https://Berbudaya.id/kreator/emma');

  // Keahlian
  const [skills, setSkills] = useState<string[]>([
    'Wayang Kulit', 'Batik Tulis', 'Tari Tradisional', 'Angklung', 'Kurasi Etnografi', 'Seni Teater Rakyat'
  ]);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [showAddSkill, setShowAddSkill] = useState(false);

  // Minat Budaya
  const [interests, setInterests] = useState<CulturalInterest[]>([
    { 
      name: 'Wayang Kulit', 
      region: 'Jawa Tengah & Jawa Timur',
      description: 'Seni teater & tari tradisi pedalangan dan cerita epos wayang purwa.'
    },
    { 
      name: 'Tari Saman', 
      region: 'Aceh',
      description: 'Tarian tepuk tangan dan ritme serempak berkecepatan tinggi.'
    },
    { 
      name: 'Batik Tulis Pewarna Alam', 
      region: 'Yogyakarta & Solo',
      description: 'Kain mori dengan malam panas dan ekstraksi tanaman nusantara.'
    },
    { 
      name: 'Angklung', 
      region: 'Jawa Barat',
      description: 'Instrumen bambu multitonal yang telah diakui Warisan UNESCO.'
    }
  ]);

  // Pengalaman (LinkedIn Style)
  const [experiences, setExperiences] = useState<ExperienceItem[]>([
    {
      id: '1',
      role: 'Lead Cultural Content Creator',
      institution: 'Berbudaya Indonesia',
      period: '2022 - Sekarang · Penuh Waktu',
      description: 'Memimpin riset kuratorial konten nusantara, memproduksi 50+ dokumenter mini kesenian lokal, serta menginisiasi pameran virtual.'
    },
    {
      id: '2',
      role: 'Kurator Seni & Edukator Etnis',
      institution: 'Museum Nasional Indonesia',
      period: '2019 - 2022 · 3 thn',
      description: 'Mengelola arsip kain tenun dan artefak wayang, serta menjadi fasilitator workshop kebudayaan untuk generasi muda.'
    }
  ]);

  // Pendidikan
  const [educations] = useState<EducationItem[]>([
    {
      id: '1',
      school: 'Universitas Indonesia (UI)',
      degree: 'Sarjana Humaniora (S.Hum)',
      field: 'Arkeologi & Kajian Budaya',
      year: '2015 - 2019'
    }
  ]);

  // Full-page Edit Mode
  const [isEditMode, setIsEditMode] = useState(false);

  // Modals for other sub-items
  const [isEditSummaryOpen, setIsEditSummaryOpen] = useState(false);
  const [isAddExperienceOpen, setIsAddExperienceOpen] = useState(false);
  const [isAddInterestOpen, setIsAddInterestOpen] = useState(false);
  const [isEditDetailsOpen, setIsEditDetailsOpen] = useState(false);

  // Form temp states
  const [tempProfile, setTempProfile] = useState({ name: '', headline: '', location: '', role: '', avatar: '' });
  const [tempSummary, setTempSummary] = useState('');
  const [newExp, setNewExp] = useState({ role: '', institution: '', period: '', description: '' });
  const [newInterest, setNewInterest] = useState({ name: '', region: '', description: '' });
  const [tempDetails, setTempDetails] = useState({ email: '', languages: '', pronouns: '', nickname: '', website: '' });

  // Load demo user if available
  useEffect(() => {
    const demoUserStr = localStorage.getItem('demo_user');
    if (demoUserStr) {
      try {
        const u = JSON.parse(demoUserStr);
        if (u.name) setName(u.name);
        if (u.avatar) setAvatar(u.avatar);
        if (u.email) setEmail(u.email);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Handlers
  const openEditProfile = () => {
    setTempProfile({ name, headline, location, role, avatar });
    setIsEditMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditProfile = () => {
    setIsEditMode(false);
  };

  const saveEditProfile = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setName(tempProfile.name);
    setHeadline(tempProfile.headline);
    setLocation(tempProfile.location);
    setRole(tempProfile.role);
    setAvatar(tempProfile.avatar);
    
    // Simpan juga ke localStorage demo_user agar sinkron
    const demoUserStr = localStorage.getItem('demo_user');
    if (demoUserStr) {
      try {
        const u = JSON.parse(demoUserStr);
        localStorage.setItem('demo_user', JSON.stringify({
          ...u,
          name: tempProfile.name,
          avatar: tempProfile.avatar
        }));
      } catch (err) {
        console.error(err);
      }
    }

    setIsEditMode(false);
    success('Profil berhasil diperbarui!');
  };

  const openEditSummary = () => {
    setTempSummary(summary);
    setIsEditSummaryOpen(true);
  };

  const saveEditSummary = () => {
    setSummary(tempSummary);
    setIsEditSummaryOpen(false);
  };

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
      setSkills([...skills, newSkillInput.trim()]);
      setNewSkillInput('');
      setShowAddSkill(false);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExp.role && newExp.institution) {
      setExperiences([
        {
          id: Date.now().toString(),
          role: newExp.role,
          institution: newExp.institution,
          period: newExp.period || 'Sekarang',
          description: newExp.description
        },
        ...experiences
      ]);
      setNewExp({ role: '', institution: '', period: '', description: '' });
      setIsAddExperienceOpen(false);
    }
  };

  const handleAddInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (newInterest.name) {
      setInterests([
        {
          name: newInterest.name,
          region: newInterest.region || 'Nusantara',
          description: newInterest.description || 'Minat budaya aktif.'
        },
        ...interests
      ]);
      setNewInterest({ name: '', region: '', description: '' });
      setIsAddInterestOpen(false);
    }
  };

  const openEditDetails = () => {
    setTempDetails({ email, languages, pronouns, nickname, website });
    setIsEditDetailsOpen(true);
  };

  const saveEditDetails = () => {
    setEmail(tempDetails.email);
    setLanguages(tempDetails.languages);
    setPronouns(tempDetails.pronouns);
    setNickname(tempDetails.nickname);
    setWebsite(tempDetails.website);
    setIsEditDetailsOpen(false);
  };

  return (
    <div className="min-h-screen bg-neutral-100/70 text-neutral-900 pb-16">
      <TopNavbar />

      {/* FULL-PAGE EDIT PROFIL VIEW */}
      {isEditMode ? (
        <div className="pt-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header Navigasi Kembali */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={cancelEditProfile}
                className="p-2 -ml-2 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60 transition active:scale-95 flex items-center justify-center"
                title="Kembali ke Profil"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                  Edit Profil Utama
                </h1>
                <p className="text-xs sm:text-sm text-neutral-500">
                  Perbarui identitas publik, profesi kebudayaan, dan foto profil Anda
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={cancelEditProfile}
                className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-xl text-xs sm:text-sm font-semibold hover:bg-neutral-100 transition active:scale-95"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={saveEditProfile}
                className="px-5 py-2 bg-[#133384] hover:bg-[#1844A6] text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition active:scale-95 flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </div>

          <form onSubmit={saveEditProfile} className="space-y-6">
            {/* Bagian Visual: Banner & Avatar */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden">
              <div className="px-6 py-4 border-b border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-neutral-900">Tampilan Visual & Foto</h2>
                  <p className="text-xs text-neutral-500">Foto profil dan tema sampul identitas kreator</p>
                </div>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>

              <div className="p-6">
                {/* Banner Preview */}
                <div className={`h-32 sm:h-44 w-full rounded-xl relative bg-gradient-to-r ${coverGradient} mb-8 flex items-center justify-center overflow-hidden shadow-inner`}>
                  <button
                    type="button"
                    onClick={() => {
                      const palettes = [
                        'from-blue-600 via-indigo-600 to-sky-700',
                        'from-emerald-700 via-teal-700 to-cyan-800',
                        'from-amber-700 via-orange-600 to-rose-700',
                        'from-neutral-900 via-neutral-800 to-neutral-900'
                      ];
                      const next = palettes[(palettes.indexOf(coverGradient) + 1) % palettes.length];
                      setCoverGradient(next);
                    }}
                    className="px-3.5 py-1.5 bg-white/90 hover:bg-white text-neutral-800 rounded-full text-xs font-semibold shadow-md backdrop-blur transition active:scale-95 flex items-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5 text-neutral-600" />
                    <span>Ganti Palet Sampul</span>
                  </button>
                </div>

                {/* Avatar Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2">
                  <div className="relative">
                    <img
                      src={tempProfile.avatar || avatar}
                      alt={tempProfile.name || name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop';
                      }}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-md bg-neutral-100"
                    />
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <label className="block text-xs sm:text-sm font-semibold text-neutral-800">
                      URL Avatar / Tautan Foto Profil
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={tempProfile.avatar}
                        onChange={(e) => setTempProfile({ ...tempProfile, avatar: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="flex-1 px-3.5 py-2.5 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#133384] focus:ring-1 focus:ring-[#133384] transition"
                      />
                    </div>
                    <p className="text-[11px] text-neutral-500">
                      Gunakan tautan gambar HTTPS berkualitas tinggi (persegi atau portrait rasio 1:1 direkomendasikan).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bagian Informasi Utama */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden">
              <div className="px-6 py-4 border-b border-neutral-100 bg-neutral-50/50">
                <h2 className="text-sm sm:text-base font-bold text-neutral-900">Informasi Dasar & Bio</h2>
                <p className="text-xs text-neutral-500">Informasi utama yang tampil pada kartu profil depan</p>
              </div>

              <div className="p-6 space-y-5">
                {/* Nama Lengkap */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-neutral-800 mb-1.5">
                    Nama Lengkap <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={tempProfile.name}
                    onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                    placeholder="Contoh: official.rbnsyaf atau Robin Syaifuddin"
                    className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-[#133384] focus:ring-1 focus:ring-[#133384] transition"
                  />
                </div>

                {/* Headline Profil */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs sm:text-sm font-semibold text-neutral-800">
                      Headline Profil <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[11px] text-neutral-400">
                      {(tempProfile.headline || '').length}/120 karakter
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    maxLength={120}
                    value={tempProfile.headline}
                    onChange={(e) => setTempProfile({ ...tempProfile, headline: e.target.value })}
                    placeholder="Contoh: Kreator Budaya & Kurator Seni Nusantara..."
                    className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-[#133384] focus:ring-1 focus:ring-[#133384] transition resize-none"
                  />
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Ringkasan fokus Anda yang muncul tepat di bawah nama Anda.
                  </p>
                </div>

                {/* Peran Utama & Lokasi (Grid 2 Kolom) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-neutral-800 mb-1.5">
                      Peran Utama
                    </label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={tempProfile.role}
                        onChange={(e) => setTempProfile({ ...tempProfile, role: e.target.value })}
                        placeholder="Contoh: Kreator Budaya, Kurator Seni"
                        className="w-full pl-10 pr-3.5 py-2.5 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-[#133384] focus:ring-1 focus:ring-[#133384] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-neutral-800 mb-1.5">
                      Lokasi / Domisili
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={tempProfile.location}
                        onChange={(e) => setTempProfile({ ...tempProfile, location: e.target.value })}
                        placeholder="Contoh: Jakarta, Indonesia"
                        className="w-full pl-10 pr-3.5 py-2.5 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-[#133384] focus:ring-1 focus:ring-[#133384] transition"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bagian Tentang & Dedikasi Singkat */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden">
              <div className="px-6 py-4 border-b border-neutral-100 bg-neutral-50/50">
                <h2 className="text-sm sm:text-base font-bold text-neutral-900">Tentang & Narasi Diri</h2>
                <p className="text-xs text-neutral-500">Uraian mengenai karya, pengalaman kebudayaan, atau visi misi Anda</p>
              </div>

              <div className="p-6">
                <textarea
                  rows={4}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Ceritakan latar belakang, dedikasi seni, tradisi nusantara yang ditekuni..."
                  className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-[#133384] focus:ring-1 focus:ring-[#133384] transition"
                />
              </div>
            </div>

            {/* Tombol Simpan Bawah */}
            <div className="flex items-center justify-end gap-3 pt-2 pb-8">
              <button
                type="button"
                onClick={cancelEditProfile}
                className="px-5 py-2.5 border border-neutral-300 text-neutral-700 rounded-xl text-xs sm:text-sm font-semibold hover:bg-neutral-100 transition active:scale-95"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#133384] hover:bg-[#1844A6] text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition active:scale-95 flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
      <div className="pt-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Main Profile Column (8 Cols in Desktop) */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* Header Card (LinkedIn-style Card 1) */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden">
              
              {/* Cover Banner */}
              <div className={`h-36 sm:h-52 w-full relative bg-gradient-to-r ${coverGradient}`}>
                <button 
                  onClick={() => {
                    const palettes = [
                      'from-blue-600 via-indigo-600 to-sky-700',
                      'from-emerald-700 via-teal-700 to-cyan-800',
                      'from-amber-700 via-orange-600 to-rose-700',
                      'from-neutral-900 via-neutral-800 to-neutral-900'
                    ];
                    const next = palettes[(palettes.indexOf(coverGradient) + 1) % palettes.length];
                    setCoverGradient(next);
                  }}
                  title="Ganti Tema Banner"
                  className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-neutral-700 rounded-full shadow-sm backdrop-blur transition active:scale-95 flex items-center gap-1.5 text-xs font-medium"
                >
                  <Camera className="w-4 h-4" />
                  <span className="hidden sm:inline">Ganti Banner</span>
                </button>
              </div>

              {/* Profile Intro Area */}
              <div className="px-5 sm:px-7 pb-6 relative">
                
                {/* Avatar & Edit button row */}
                <div className="flex justify-between items-end -mt-16 sm:-mt-20 mb-3 sm:mb-4">
                  <div className="relative group">
                    <img 
                      src={avatar} 
                      alt={name}
                      className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-md object-cover bg-neutral-100"
                    />
                    <button 
                      onClick={openEditProfile}
                      className="absolute bottom-1 right-1 p-2 bg-[#133384] hover:bg-[#1844A6] text-white rounded-full shadow-md transition active:scale-95"
                      title="Ubah Foto Profil"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Edit Header Profile Button & Bagikan */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={openEditProfile}
                      className="p-2 sm:px-3.5 sm:py-1.5 border border-neutral-300 hover:bg-neutral-50 rounded-full text-neutral-700 text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 active:scale-95"
                    >
                      <Edit3 className="w-4 h-4 text-neutral-600" />
                      <span className="hidden sm:inline">Edit Profil</span>
                    </button>
                    <button 
                      onClick={() => {
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(window.location.href);
                          success('Tautan profil berhasil disalin ke clipboard!');
                        }
                      }}
                      className="p-2 sm:px-3.5 sm:py-1.5 border border-neutral-300 hover:bg-neutral-50 rounded-full text-neutral-700 text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 active:scale-95"
                      title="Bagikan Profil"
                    >
                      <Share2 className="w-4 h-4 text-neutral-600" />
                      <span className="hidden sm:inline">Bagikan</span>
                    </button>
                  </div>
                </div>

                {/* Name, Headline, Location */}
                <div className="space-y-1 sm:space-y-1.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                      {name}
                    </h1>
                    <VerifiedBadge className="w-5 h-5 text-[#1D9BF0] shrink-0" />
                  </div>

                  <p className="text-sm sm:text-base text-neutral-700 font-normal leading-snug max-w-2xl">
                    {headline}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-neutral-500 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      {location}
                    </span>
                    <span>•</span>
                    <span className="text-neutral-500">
                      <strong className="text-neutral-800 font-semibold">1.240</strong> pengikut
                    </span>
                  </div>
                </div>

              </div>

              {/* Navigation Tabs */}
              <div className="border-t border-slate-100 px-5 sm:px-8 bg-slate-50/50">
                <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                  <button 
                    onClick={() => setActiveTab('posts')}
                    className={`tab-item py-3.5 text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                      activeTab === 'posts' ? 'active font-bold' : ''
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    Postingan (1)
                  </button>
                  <button 
                    onClick={() => setActiveTab('about')}
                    className={`tab-item py-3.5 text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                      activeTab === 'about' ? 'active font-bold' : ''
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Tentang
                  </button>
                </div>
              </div>

            </div>

            {/* TAB 1: KARYA & POSTINGAN */}
            {activeTab === 'posts' && (
              <div className="space-y-4">
                <article className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden transition-all duration-300">
                  {/* Header Post ala Facebook / LinkedIn */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={avatar}
                          alt={name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200/80 flex-shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-semibold text-slate-900 text-sm leading-tight hover:text-blue-600 transition-colors">
                              {name}
                            </h3>
                            <VerifiedBadge className="w-4 h-4 text-[#1D9BF0] shrink-0" />
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{headline}</p>
                          <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <span>2 hari yang lalu</span>
                            <span>•</span>
                            <Globe className="w-3 h-3 text-slate-400" />
                          </p>
                        </div>
                      </div>

                      <button 
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                        aria-label="Opsi postingan"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Judul & Narasi Postingan Full */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-900 text-base leading-snug">
                        Kajian Visual: Keberagaman Ragam Hias Batik Klasik Pesisir
                      </h4>
                      <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                        Dokumentasi riset kuratorial mendalam mengenai filosofi motif lereng dan mega mendung dalam representasi kosmologi lokal nusantara. Keindahan teknik canting lilin malam tradisional membuktikan dedikasi perajin pesisir yang sarat makna leluhur.
                      </p>
                    </div>
                  </div>

                  {/* Gambar Postingan Full Lebar */}
                  <div className="bg-slate-100 overflow-hidden border-y border-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1000&h=600&fit=crop"
                      alt="Kajian Visual Ragam Hias Batik"
                      className="w-full h-auto max-h-[520px] object-cover hover:scale-[1.01] transition-transform duration-300"
                    />
                  </div>

                  {/* Post Stats & Reactions Counter */}
                  <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center">
                        <Heart className="w-2.5 h-2.5 fill-white text-white" />
                      </div>
                      <span className="text-[11px] text-slate-600 font-medium">
                        318 apresiasi
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span>42 tanggapan</span>
                      <span>•</span>
                      <span>Pelestarian Budaya</span>
                    </div>
                  </div>

                  {/* Action Bar (Suka, Tanggapi, Bagikan, Simpan) */}
                  <div className="px-2 py-1.5 bg-slate-50/40">
                    <div className="flex items-center gap-1">
                      <button className="flex items-center gap-1.5 py-2 hover:bg-white rounded-xl transition-all flex-1 justify-center whitespace-nowrap group text-slate-600 hover:text-rose-600">
                        <Heart className="w-4 h-4 transition-transform group-hover:scale-110 group-hover:text-rose-600" />
                        <span className="text-xs font-medium">Suka</span>
                      </button>
                      <button className="flex items-center gap-1.5 py-2 hover:bg-white rounded-xl transition-all flex-1 justify-center whitespace-nowrap group text-slate-600 hover:text-blue-600">
                        <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-medium">Tanggapi</span>
                      </button>
                      <button className="flex items-center gap-1.5 py-2 hover:bg-white rounded-xl transition-all flex-1 justify-center whitespace-nowrap group text-slate-600 hover:text-emerald-600">
                        <Send className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-medium">Bagikan</span>
                      </button>
                      <button className="flex items-center gap-1.5 py-2 hover:bg-white rounded-xl transition-all flex-1 justify-center whitespace-nowrap group text-slate-600 hover:text-amber-600">
                        <Bookmark className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-medium">Simpan</span>
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            )}

            {/* TAB 2: ABOUT */}
            {activeTab === 'about' && (
              <div className="space-y-5">
                {/* About / Summary Section */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base sm:text-lg font-bold text-neutral-900">Tentang Saya</h2>
                    <button 
                      onClick={openEditSummary}
                      className="p-1.5 hover:bg-neutral-100 rounded-full text-neutral-600 transition"
                      title="Edit Ringkasan"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                    {summary}
                  </p>
                </div>

                {/* Skills Section */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-neutral-900">Keahlian & Keilmuan Budaya</h2>
                      <p className="text-xs text-neutral-500">Spesialisasi kesenian yang Anda kuasai</p>
                    </div>
                    <button 
                      onClick={() => setShowAddSkill(!showAddSkill)}
                      className="p-2 hover:bg-neutral-100 rounded-full text-blue-600 transition"
                      title="Tambah Keahlian"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {showAddSkill && (
                    <div className="flex items-center gap-2 mb-4 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                      <input 
                        type="text"
                        placeholder="Contoh: Kaligrafi Aksara Jawa, Seni Pahat..."
                        value={newSkillInput}
                        onChange={(e) => setNewSkillInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                        className="flex-1 px-3 py-2 bg-white border border-neutral-600 rounded-[4px] text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                      />
                      <button 
                        onClick={handleAddSkill}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition"
                      >
                        Simpan
                      </button>
                      <button 
                        onClick={() => setShowAddSkill(false)}
                        className="p-1.5 text-neutral-500 hover:text-neutral-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100/80 hover:bg-neutral-200 text-neutral-800 rounded-lg text-xs sm:text-sm font-medium border border-neutral-200/60 transition group"
                      >
                        {skill}
                        <button 
                          onClick={() => handleRemoveSkill(skill)}
                          className="opacity-0 group-hover:opacity-100 hover:text-red-600 transition text-neutral-400"
                          title="Hapus"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Minat Budaya Section inside About */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-neutral-900">Minat Kebudayaan</h2>
                      <p className="text-xs text-neutral-500">Budaya nusantara yang Anda ikuti dan dalami</p>
                    </div>
                    <button 
                      onClick={() => setIsAddInterestOpen(true)}
                      className="p-2 hover:bg-neutral-100 rounded-full text-blue-600 transition"
                      title="Tambah Minat"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="divide-y divide-neutral-100">
                    {interests.map((item, idx) => (
                      <div key={idx} className="py-3.5 first:pt-0 last:pb-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">{item.name}</h3>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-1">
                          <MapPin className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
                          <span>{item.region}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experiences (Dedikasi) */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-neutral-900">Pengalaman Profesional & Komunitas</h2>
                      <p className="text-xs text-neutral-500 mt-0.5">Peran dalam pelestarian dan industri seni kebudayaan</p>
                    </div>
                    <button 
                      onClick={() => setIsAddExperienceOpen(true)}
                      className="p-2 hover:bg-neutral-100 rounded-full text-blue-600 transition"
                      title="Tambah Pengalaman"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="relative">
                    {experiences.map((exp, idx) => {
                      const isLast = idx === experiences.length - 1;
                      return (
                        <div key={exp.id} className="relative flex gap-4 pb-7 last:pb-1">
                          {/* Vertical Connector Line */}
                          {!isLast && (
                            <div className="absolute left-[17px] top-[34px] bottom-0 w-[1.5px] bg-neutral-200" />
                          )}

                          {/* Round Dark Icon */}
                          <div className="relative z-10 w-[34px] h-[34px] rounded-full bg-neutral-900 flex items-center justify-center shrink-0 shadow-sm ring-4 ring-white">
                            <Briefcase className="w-4 h-4 text-white" />
                          </div>

                          <div className="flex-1 min-w-0 pt-0.5">
                            <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">{exp.role}</h3>
                            <p className="text-xs sm:text-sm font-medium text-neutral-700 mt-0.5">{exp.institution}</p>
                            <p className="text-xs text-neutral-400 font-medium mt-0.5 mb-2">{exp.period}</p>
                            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{exp.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Educations (Riwayat Pendidikan) */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-neutral-900">Pendidikan</h2>
                      <p className="text-xs text-neutral-500 mt-0.5">Latar belakang pendidikan akademis</p>
                    </div>
                  </div>

                  <div className="relative">
                    {educations.map((edu, idx) => {
                      const isLast = idx === educations.length - 1;
                      return (
                        <div key={edu.id} className="relative flex gap-4 pb-6 last:pb-1">
                          {!isLast && (
                            <div className="absolute left-[17px] top-[34px] bottom-0 w-[1.5px] bg-neutral-200" />
                          )}
                          <div className="relative z-10 w-[34px] h-[34px] rounded-full bg-neutral-900 flex items-center justify-center shrink-0 shadow-sm ring-4 ring-white">
                            <GraduationCap className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0 pt-0.5">
                            <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">{edu.school}</h3>
                            <p className="text-xs sm:text-sm text-neutral-700 mt-0.5">{edu.degree} · {edu.field}</p>
                            <p className="text-xs text-neutral-400 font-medium mt-0.5">{edu.year}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column / Sidebar (4 Cols in Desktop, Stacks neatly on Mobile) */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Detail Kontak & Informasi (LinkedIn-style Details Card) */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-5">
              <div className="flex items-center justify-between mb-3.5">
                <h2 className="text-sm sm:text-base font-bold text-neutral-900">Informasi Pribadi</h2>
                <button 
                  onClick={openEditDetails}
                  className="p-1 hover:bg-neutral-100 rounded-full text-neutral-600 transition"
                  title="Edit Detail"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Email</p>
                    <a href={`mailto:${email}`} className="text-neutral-800 hover:text-blue-600 truncate block font-medium">
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Globe className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Bahasa</p>
                    <p className="text-neutral-800 font-medium">{languages}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <User className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Nama Panggilan & Pronouns</p>
                    <p className="text-neutral-800 font-medium">{nickname} ({pronouns})</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <LinkIcon className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Tautan Web</p>
                    <a href={website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate block font-medium">
                      {website}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Bergabung</p>
                    <p className="text-neutral-600">Desember 2020</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rekomendasi Jaringan Budaya */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-5">
              <h2 className="text-sm sm:text-base font-bold text-neutral-900 mb-3">Kreator Budaya Serupa</h2>
              <div className="space-y-3">
                {[
                  { name: 'Ki Anom Suroto', role: 'Dalang & Budayawan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
                  { name: 'Dewi Sekar', role: 'Koreografer Tari Tradisi', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
                  { name: 'Bambang Sukses', role: 'Pengrajin Gamelan Perunggu', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img src={item.avatar} alt={item.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-neutral-900 truncate">{item.name}</p>
                        <p className="text-[11px] text-neutral-500 truncate">{item.role}</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full text-xs font-semibold shrink-0 transition">
                      Ikuti
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
      )}

      {/* MODAL 2: EDIT SUMMARY */}
      {isEditSummaryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-neutral-200">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-100">
              <h3 className="text-base sm:text-lg font-bold text-neutral-900">Edit Tentang Saya</h3>
              <button onClick={() => setIsEditSummaryOpen(false)} className="p-1 rounded-full hover:bg-neutral-100 text-neutral-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-5">
              <label className="block text-neutral-700 font-semibold mb-1 text-xs sm:text-sm">Ringkasan Narasi Profil</label>
              <textarea 
                rows={6}
                value={tempSummary}
                onChange={(e) => setTempSummary(e.target.value)}
                placeholder="Tuliskan latar belakang kebudayaan, dedikasi, visi misi, atau karya yang sedang Anda tekuni..."
                className="w-full px-3 py-2 border border-neutral-600 rounded-[4px] text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
              />
            </div>

            <div className="p-4 sm:p-5 border-t border-neutral-100 flex justify-end gap-2">
              <button 
                onClick={() => setIsEditSummaryOpen(false)}
                className="px-4 py-2 border border-neutral-300 rounded-full text-xs sm:text-sm font-semibold hover:bg-neutral-50 transition"
              >
                Batal
              </button>
              <button 
                onClick={saveEditSummary}
                className="px-5 py-2 bg-blue-600 text-white rounded-full text-xs sm:text-sm font-semibold hover:bg-blue-700 transition"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: TAMBAH PENGALAMAN */}
      {isAddExperienceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <form onSubmit={handleAddExperience} className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-100">
              <h3 className="text-base sm:text-lg font-bold text-neutral-900">Tambah Pengalaman Baru</h3>
              <button type="button" onClick={() => setIsAddExperienceOpen(false)} className="p-1 rounded-full hover:bg-neutral-100 text-neutral-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Posisi / Jabatan</label>
                <input 
                  type="text"
                  required
                  placeholder="Misal: Kurator Kain Tradisional, Instruktur Tari"
                  value={newExp.role}
                  onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-600 rounded-[4px] text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Instansi / Lembaga / Komunitas</label>
                <input 
                  type="text"
                  required
                  placeholder="Misal: Sanggar Tari Saraswati, Galeri Nasional"
                  value={newExp.institution}
                  onChange={(e) => setNewExp({ ...newExp, institution: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-600 rounded-[4px] text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Periode Waktu</label>
                <input 
                  type="text"
                  placeholder="Misal: 2021 - Sekarang · 3 thn"
                  value={newExp.period}
                  onChange={(e) => setNewExp({ ...newExp, period: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-600 rounded-[4px] text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Deskripsi Kegiatan & Kontribusi</label>
                <textarea 
                  rows={3}
                  placeholder="Jelaskan peran, proyek budaya yang dikerjakan, atau pencapaian..."
                  value={newExp.description}
                  onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-600 rounded-[4px] text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                />
              </div>
            </div>

            <div className="p-4 sm:p-5 border-t border-neutral-100 flex justify-end gap-2">
              <button 
                type="button"
                onClick={() => setIsAddExperienceOpen(false)}
                className="px-4 py-2 border border-neutral-300 rounded-full text-xs sm:text-sm font-semibold hover:bg-neutral-50 transition"
              >
                Batal
              </button>
              <button 
                type="submit"
                className="px-5 py-2 bg-blue-600 text-white rounded-full text-xs sm:text-sm font-semibold hover:bg-blue-700 transition"
              >
                Tambahkan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 4: TAMBAH MINAT BUDAYA */}
      {isAddInterestOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <form onSubmit={handleAddInterest} className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-neutral-200">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-100">
              <h3 className="text-base sm:text-lg font-bold text-neutral-900">Tambah Minat Kebudayaan</h3>
              <button type="button" onClick={() => setIsAddInterestOpen(false)} className="p-1 rounded-full hover:bg-neutral-100 text-neutral-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Nama Tradisi / Seni Budaya</label>
                <input 
                  type="text"
                  required
                  placeholder="Misal: Tari Kecak, Tenun Ikat Sumba"
                  value={newInterest.name}
                  onChange={(e) => setNewInterest({ ...newInterest, name: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-600 rounded-[4px] text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Asal Daerah / Wilayah</label>
                <input 
                  type="text"
                  placeholder="Misal: Jawa Tengah & Jawa Timur, Bali, Aceh"
                  value={newInterest.region}
                  onChange={(e) => setNewInterest({ ...newInterest, region: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-600 rounded-[4px] text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Keterangan Singkat</label>
                <textarea 
                  rows={3}
                  placeholder="Keterangan singkat mengenai minat atau ketertarikan Anda..."
                  value={newInterest.description}
                  onChange={(e) => setNewInterest({ ...newInterest, description: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-600 rounded-[4px] text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                />
              </div>
            </div>

            <div className="p-4 sm:p-5 border-t border-neutral-100 flex justify-end gap-2">
              <button 
                type="button"
                onClick={() => setIsAddInterestOpen(false)}
                className="px-4 py-2 border border-neutral-300 rounded-full text-xs sm:text-sm font-semibold hover:bg-neutral-50 transition"
              >
                Batal
              </button>
              <button 
                type="submit"
                className="px-5 py-2 bg-blue-600 text-white rounded-full text-xs sm:text-sm font-semibold hover:bg-blue-700 transition"
              >
                Simpan Minat
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 5: EDIT DETAIL INFORMASI PRIBADI */}
      {isEditDetailsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-100">
              <h3 className="text-base sm:text-lg font-bold text-neutral-900">Edit Informasi Pribadi & Kontak</h3>
              <button onClick={() => setIsEditDetailsOpen(false)} className="p-1 rounded-full hover:bg-neutral-100 text-neutral-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Email</label>
                <input 
                  type="email"
                  value={tempDetails.email}
                  onChange={(e) => setTempDetails({ ...tempDetails, email: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-600 rounded-[4px] text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Bahasa yang Dikuasai</label>
                <input 
                  type="text"
                  placeholder="Misal: Indonesia, Inggris, Sunda"
                  value={tempDetails.languages}
                  onChange={(e) => setTempDetails({ ...tempDetails, languages: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-600 rounded-[4px] text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Nama Panggilan</label>
                  <input 
                    type="text"
                    value={tempDetails.nickname}
                    onChange={(e) => setTempDetails({ ...tempDetails, nickname: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-600 rounded-[4px] text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Kata Ganti (Pronouns)</label>
                  <input 
                    type="text"
                    placeholder="Dia / Beliau"
                    value={tempDetails.pronouns}
                    onChange={(e) => setTempDetails({ ...tempDetails, pronouns: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-600 rounded-[4px] text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Tautan Web / Portofolio</label>
                <input 
                  type="text"
                  value={tempDetails.website}
                  onChange={(e) => setTempDetails({ ...tempDetails, website: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-600 rounded-[4px] text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                />
              </div>
            </div>

            <div className="p-4 sm:p-5 border-t border-neutral-100 flex justify-end gap-2">
              <button 
                onClick={() => setIsEditDetailsOpen(false)}
                className="px-4 py-2 border border-neutral-300 rounded-full text-xs sm:text-sm font-semibold hover:bg-neutral-50 transition"
              >
                Batal
              </button>
              <button 
                onClick={saveEditDetails}
                className="px-5 py-2 bg-blue-600 text-white rounded-full text-xs sm:text-sm font-semibold hover:bg-blue-700 transition"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
