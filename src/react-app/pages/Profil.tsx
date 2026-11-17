import React, { useState, useEffect } from 'react';
import TopNavbar from '@/react-app/components/TopNavbar';
import { 
  Edit3, Mail, Globe, Plus, 
  Calendar, User, Briefcase, GraduationCap, MapPin,
  Camera, X,
  Link as LinkIcon, Share2, ShieldCheck
} from 'lucide-react';

interface CulturalInterest {
  name: string;
  region: string;
  category: string;
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
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'experience' | 'interests'>('overview');
  
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
  const [email, setEmail] = useState('emma.smith@ruangbudaya.id');
  const [languages, setLanguages] = useState('Indonesia, Inggris, Jawa');
  const [pronouns, setPronouns] = useState('Dia / Beliau');
  const [nickname, setNickname] = useState('Emma');
  const [website, setWebsite] = useState('https://ruangbudaya.id/kreator/emma');

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
      category: 'Seni Teater & Tari',
      description: 'Seni teater & tari tradisi pedalangan dan cerita epos wayang purwa.'
    },
    { 
      name: 'Tari Saman', 
      region: 'Aceh',
      category: 'Seni Tari',
      description: 'Tarian tepuk tangan dan ritme serempak berkecepatan tinggi.'
    },
    { 
      name: 'Batik Tulis Pewarna Alam', 
      region: 'Yogyakarta & Solo',
      category: 'Kriya Tradisional',
      description: 'Kain mori dengan malam panas dan ekstraksi tanaman nusantara.'
    },
    { 
      name: 'Angklung', 
      region: 'Jawa Barat',
      category: 'Musik Tradisional',
      description: 'Instrumen bambu multitonal yang telah diakui Warisan UNESCO.'
    }
  ]);

  // Pengalaman (LinkedIn Style)
  const [experiences, setExperiences] = useState<ExperienceItem[]>([
    {
      id: '1',
      role: 'Lead Cultural Content Creator',
      institution: 'RuangBudaya Indonesia',
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

  // Modals
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isEditSummaryOpen, setIsEditSummaryOpen] = useState(false);
  const [isAddExperienceOpen, setIsAddExperienceOpen] = useState(false);
  const [isAddInterestOpen, setIsAddInterestOpen] = useState(false);
  const [isEditDetailsOpen, setIsEditDetailsOpen] = useState(false);

  // Form temp states
  const [tempProfile, setTempProfile] = useState({ name: '', headline: '', location: '', role: '', avatar: '' });
  const [tempSummary, setTempSummary] = useState('');
  const [newExp, setNewExp] = useState({ role: '', institution: '', period: '', description: '' });
  const [newInterest, setNewInterest] = useState({ name: '', region: '', category: '', description: '' });
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
    setIsEditProfileOpen(true);
  };

  const saveEditProfile = () => {
    setName(tempProfile.name);
    setHeadline(tempProfile.headline);
    setLocation(tempProfile.location);
    setRole(tempProfile.role);
    setAvatar(tempProfile.avatar);
    setIsEditProfileOpen(false);
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
    if (newInterest.name && newInterest.category) {
      setInterests([
        {
          name: newInterest.name,
          region: newInterest.region || 'Nusantara',
          category: newInterest.category,
          description: newInterest.description || 'Minat budaya aktif.'
        },
        ...interests
      ]);
      setNewInterest({ name: '', region: '', category: '', description: '' });
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
                      className="absolute bottom-1 right-1 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition active:scale-95"
                      title="Ubah Foto Profil"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Edit Header Profile Button */}
                  <button 
                    onClick={openEditProfile}
                    className="p-2 sm:px-3.5 sm:py-1.5 border border-neutral-300 hover:bg-neutral-50 rounded-full text-neutral-700 text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 active:scale-95"
                  >
                    <Edit3 className="w-4 h-4 text-neutral-600" />
                    <span className="hidden sm:inline">Edit Profil</span>
                  </button>
                </div>

                {/* Name, Headline, Location */}
                <div className="space-y-1 sm:space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                      {name}
                    </h1>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      <ShieldCheck className="w-3 h-3" /> Terverifikasi
                    </span>
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
                    <span className="text-blue-600 hover:underline cursor-pointer font-medium" onClick={openEditDetails}>
                      Info Kontak
                    </span>
                    <span>•</span>
                    <span className="text-neutral-500">
                      <strong className="text-neutral-800 font-semibold">1.240</strong> pengikut
                    </span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 mt-4 pt-3 border-t border-neutral-100">
                  <button 
                    onClick={openEditProfile}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs sm:text-sm font-semibold transition shadow-sm active:scale-95"
                  >
                    Edit Profil Saya
                  </button>
                  <button 
                    onClick={() => setIsAddExperienceOpen(true)}
                    className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full text-xs sm:text-sm font-semibold transition active:scale-95 flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah Pengalaman
                  </button>
                  <button 
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Tautan profil berhasil disalin ke clipboard!');
                      }
                    }}
                    className="p-2 sm:px-3 sm:py-2 border border-neutral-300 hover:bg-neutral-50 text-neutral-700 rounded-full text-xs sm:text-sm font-medium transition active:scale-95 flex items-center gap-1.5"
                    title="Bagikan Profil"
                  >
                    <Share2 className="w-4 h-4 text-neutral-600" />
                    <span className="hidden sm:inline">Bagikan</span>
                  </button>
                </div>

                {/* Quick Cards Banner (LinkedIn-style Open To / Highlights) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-5">
                  <div className="p-3 bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200/70 rounded-xl transition cursor-pointer">
                    <p className="text-xs font-semibold text-neutral-900">Siap Kolaborasi Kesenian</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">Terbuka untuk kurasi, pementasan teater, dan riset kebudayaan.</p>
                  </div>
                  <div className="p-3 bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200/70 rounded-xl transition cursor-pointer">
                    <p className="text-xs font-semibold text-neutral-900">Peran Komunitas</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">{role} aktif di RuangBudaya.</p>
                  </div>
                  <div className="p-3 bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200/70 rounded-xl transition cursor-pointer" onClick={openEditSummary}>
                    <p className="text-xs font-semibold text-neutral-900">Lengkapi Sorotan Profil</p>
                    <p className="text-[11px] text-blue-600 font-medium mt-0.5">Perbarui deskripsi tentang Anda →</p>
                  </div>
                </div>

              </div>

              {/* Sub Navigation Bar Tabs */}
              <div className="border-t border-neutral-200 flex px-4 sm:px-7 overflow-x-auto gap-4 sm:gap-8 scrollbar-hide text-xs sm:text-sm font-medium text-neutral-600">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`py-3 border-b-2 transition whitespace-nowrap ${
                    activeTab === 'overview' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-neutral-900'
                  }`}
                >
                  Ringkasan
                </button>
                <button 
                  onClick={() => setActiveTab('experience')}
                  className={`py-3 border-b-2 transition whitespace-nowrap ${
                    activeTab === 'experience' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-neutral-900'
                  }`}
                >
                  Pengalaman & Pendidikan
                </button>
                <button 
                  onClick={() => setActiveTab('interests')}
                  className={`py-3 border-b-2 transition whitespace-nowrap ${
                    activeTab === 'interests' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-neutral-900'
                  }`}
                >
                  Minat Budaya
                </button>
              </div>

            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <>
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
                      className="p-1.5 hover:bg-neutral-100 rounded-full text-neutral-600 transition flex items-center gap-1 text-xs font-semibold text-blue-600"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:inline">Tambah</span>
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
                        className="flex-1 px-3 py-1.5 bg-white border border-neutral-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                {/* Experience Preview in Overview */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base sm:text-lg font-bold text-neutral-900">Riwayat Pengalaman Budaya</h2>
                    <button 
                      onClick={() => setIsAddExperienceOpen(true)}
                      className="p-1.5 hover:bg-neutral-100 rounded-full text-blue-600 transition flex items-center gap-1 text-xs font-semibold"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:inline">Tambah Pengalaman</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="flex gap-3 sm:gap-4 items-start border-b border-neutral-100 last:border-0 pb-4 last:pb-0">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-600">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-base font-bold text-neutral-900">{exp.role}</h3>
                          <p className="text-xs sm:text-sm font-medium text-neutral-700">{exp.institution}</p>
                          <p className="text-[11px] text-neutral-500 mb-1.5">{exp.period}</p>
                          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* TAB 2: EXPERIENCE & EDUCATION */}
            {activeTab === 'experience' && (
              <div className="space-y-5">
                {/* Experiences */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-neutral-900">Pengalaman Profesional & Komunitas</h2>
                      <p className="text-xs text-neutral-500">Peran dalam pelestarian dan industri seni kebudayaan</p>
                    </div>
                    <button 
                      onClick={() => setIsAddExperienceOpen(true)}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-semibold transition flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Tambah
                    </button>
                  </div>

                  <div className="space-y-5">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="flex gap-3 sm:gap-4 items-start border-b border-neutral-100 last:border-0 pb-4 last:pb-0">
                        <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-600">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm sm:text-base font-bold text-neutral-900">{exp.role}</h3>
                          <p className="text-xs sm:text-sm font-medium text-neutral-700">{exp.institution}</p>
                          <p className="text-xs text-neutral-500 mb-2">{exp.period}</p>
                          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Educations */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base sm:text-lg font-bold text-neutral-900">Pendidikan</h2>
                  </div>

                  <div className="space-y-4">
                    {educations.map((edu) => (
                      <div key={edu.id} className="flex gap-3 sm:gap-4 items-start">
                        <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 text-amber-600">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-neutral-900">{edu.school}</h3>
                          <p className="text-xs sm:text-sm text-neutral-700">{edu.degree} · {edu.field}</p>
                          <p className="text-xs text-neutral-500">{edu.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: INTERESTS */}
            {activeTab === 'interests' && (
              <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-neutral-900">Koleksi Minat Kebudayaan</h2>
                    <p className="text-xs text-neutral-500">Kategori budaya nusantara yang Anda ikuti dan dalami</p>
                  </div>
                  <button 
                    onClick={() => setIsAddInterestOpen(true)}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-semibold transition flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Tambah Minat
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {interests.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-neutral-200/80 bg-neutral-50/50 hover:bg-blue-50/50 hover:border-blue-200 transition">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-blue-600 px-2 py-0.5 bg-blue-100/60 rounded">
                          {item.category}
                        </span>
                        <span className="text-[11px] text-neutral-400">{item.region}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-neutral-900 mt-1">{item.name}</h3>
                      <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column / Sidebar (4 Cols in Desktop, Stacks neatly on Mobile) */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Minat Kebudayaan Widget */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-5">
              <div className="flex items-center justify-between mb-3.5">
                <h2 className="text-sm sm:text-base font-bold text-neutral-900">Minat Kebudayaan</h2>
                <button 
                  onClick={() => setIsAddInterestOpen(true)}
                  className="p-1 hover:bg-neutral-100 rounded-full text-blue-600 transition"
                  title="Tambah Minat"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5">
                {interests.slice(0, 4).map((interest, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl border border-neutral-100 bg-neutral-50/70 hover:bg-neutral-100 transition">
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm font-semibold text-neutral-900">{interest.name}</p>
                      <span className="text-[10px] text-blue-600 font-medium px-1.5 py-0.5 bg-blue-50 rounded">
                        {interest.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-neutral-400" />
                      {interest.region}
                    </p>
                    <p className="text-xs text-neutral-600 mt-1 line-clamp-2 leading-relaxed">
                      {interest.description}
                    </p>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setActiveTab('interests')}
                className="w-full mt-3 py-2 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition text-center"
              >
                Lihat Semua ({interests.length})
              </button>
            </div>

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

      {/* MODAL 1: EDIT PROFILE (HEADER) */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-100">
              <h3 className="text-base sm:text-lg font-bold text-neutral-900">Edit Profil Utama</h3>
              <button onClick={() => setIsEditProfileOpen(false)} className="p-1 rounded-full hover:bg-neutral-100 text-neutral-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Nama Lengkap</label>
                <input 
                  type="text"
                  value={tempProfile.name}
                  onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Headline Profil</label>
                <textarea 
                  rows={2}
                  value={tempProfile.headline}
                  onChange={(e) => setTempProfile({ ...tempProfile, headline: e.target.value })}
                  placeholder="Contoh: Pegiat Tari Tradisional & Kurator Etnis..."
                  className="w-full px-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Peran Utama</label>
                  <input 
                    type="text"
                    value={tempProfile.role}
                    onChange={(e) => setTempProfile({ ...tempProfile, role: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Lokasi</label>
                  <input 
                    type="text"
                    value={tempProfile.location}
                    onChange={(e) => setTempProfile({ ...tempProfile, location: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">URL Avatar / Foto Profil</label>
                <input 
                  type="text"
                  value={tempProfile.avatar}
                  onChange={(e) => setTempProfile({ ...tempProfile, avatar: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="p-4 sm:p-5 border-t border-neutral-100 flex justify-end gap-2">
              <button 
                onClick={() => setIsEditProfileOpen(false)}
                className="px-4 py-2 border border-neutral-300 rounded-full text-xs sm:text-sm font-semibold hover:bg-neutral-50 transition"
              >
                Batal
              </button>
              <button 
                onClick={saveEditProfile}
                className="px-5 py-2 bg-blue-600 text-white rounded-full text-xs sm:text-sm font-semibold hover:bg-blue-700 transition"
              >
                Simpan Perubahan
              </button>
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
                className="w-full px-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-xs sm:text-sm"
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
                  className="w-full px-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
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
                  className="w-full px-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Periode Waktu</label>
                <input 
                  type="text"
                  placeholder="Misal: 2021 - Sekarang · 3 thn"
                  value={newExp.period}
                  onChange={(e) => setNewExp({ ...newExp, period: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Deskripsi Kegiatan & Kontribusi</label>
                <textarea 
                  rows={3}
                  placeholder="Jelaskan peran, proyek budaya yang dikerjakan, atau pencapaian..."
                  value={newExp.description}
                  onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
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
                  className="w-full px-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Kategori</label>
                  <input 
                    type="text"
                    required
                    placeholder="Misal: Seni Tari, Kriya, Musik"
                    value={newInterest.category}
                    onChange={(e) => setNewInterest({ ...newInterest, category: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Asal Daerah / Wilayah</label>
                  <input 
                    type="text"
                    placeholder="Misal: Bali, NTT, Jawa Timur"
                    value={newInterest.region}
                    onChange={(e) => setNewInterest({ ...newInterest, region: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Keterangan Singkat</label>
                <textarea 
                  rows={2}
                  placeholder="Keterangan singkat mengenai minat atau ketertarikan Anda..."
                  value={newInterest.description}
                  onChange={(e) => setNewInterest({ ...newInterest, description: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
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
                  className="w-full px-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Bahasa yang Dikuasai</label>
                <input 
                  type="text"
                  placeholder="Misal: Indonesia, Inggris, Sunda"
                  value={tempDetails.languages}
                  onChange={(e) => setTempDetails({ ...tempDetails, languages: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Nama Panggilan</label>
                  <input 
                    type="text"
                    value={tempDetails.nickname}
                    onChange={(e) => setTempDetails({ ...tempDetails, nickname: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Kata Ganti (Pronouns)</label>
                  <input 
                    type="text"
                    placeholder="Dia / Beliau"
                    value={tempDetails.pronouns}
                    onChange={(e) => setTempDetails({ ...tempDetails, pronouns: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Tautan Web / Portofolio</label>
                <input 
                  type="text"
                  value={tempDetails.website}
                  onChange={(e) => setTempDetails({ ...tempDetails, website: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
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
