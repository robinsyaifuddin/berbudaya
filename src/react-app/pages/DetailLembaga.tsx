import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, Link } from 'react-router';
import { 
  Users, MapPin, Check, Share2, Award, Calendar, 
  MessageSquare, ThumbsUp, ShieldCheck, Info,
  ArrowLeft, Search, Image as ImageIcon, Send,
  Globe, CheckCircle2, MoreHorizontal,
  Bookmark, UserPlus, ShieldAlert, Heart,
  Newspaper, Landmark, Ticket, HandHeart, Clock,
  ExternalLink, ChevronRight, FileText, CheckCircle, X,
  Plus, Edit3, Settings, Eye, SlidersHorizontal, Bold, Italic, Link2,
  Heading1, Heading2, Quote, List
} from 'lucide-react';
import TopNavbar from '@/react-app/components/TopNavbar';
import VerifiedBadge from '@/react-app/components/VerifiedBadge';
import { communitiesData, Community, CommunityEvent, CommunityDonation, CommunityNews } from '@/react-app/data/communitiesData';

interface CommentItem {
  id: number;
  author: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
}

interface PostItem {
  id: number;
  author: string;
  authorRole: string;
  authorAvatar: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  commentsList?: CommentItem[];
}

export default function DetailLembagaPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const lembagaId = Number(id);
  
  // Cek apakah lembaga ini adalah milik user yang sedang login/dibuat oleh user
  const isMyInstitution = (() => {
    try {
      const stored = localStorage.getItem('user_registered_institutions');
      if (stored) {
        const parsed: any[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.some(item => Number(item.id) === lembagaId)) {
          return true;
        }
      }
      const myInstStr = localStorage.getItem('user_my_institution');
      if (myInstStr) {
        const myInst = JSON.parse(myInstStr);
        if (Number(myInst?.id) === lembagaId) {
          return true;
        }
      }
    } catch {
      // ignore
    }
    return false;
  })();

  // Deteksi mode kelola (hanya aktif jika user adalah pemilik lembaga tersebut)
  const [isManageMode, setIsManageMode] = useState<boolean>(() => {
    if (!isMyInstitution) return false;
    return searchParams.get('manage') === 'true' || searchParams.get('mode') === 'edit';
  });

  // Find lembaga from communitiesData or from registered institutions in localStorage
  const [lembaga, setLembaga] = useState<Community>(() => {
    const found = communitiesData.find((c) => c.id === lembagaId);
    if (found) return found;

    try {
      const stored = localStorage.getItem('user_registered_institutions');
      if (stored) {
        const parsed: any[] = JSON.parse(stored);
        const match = parsed.find((item) => item.id === lembagaId);
        if (match) {
          return {
            id: match.id,
            name: match.name,
            slug: match.slug,
            tagline: match.tagline,
            description: match.description,
            about: match.description,
            institutionType: match.institutionType,
            category: match.category,
            province: match.province || 'Jawa Tengah',
            city: match.city || 'Surakarta',
            location: `${match.city || 'Surakarta'}, ${match.province || 'Jawa Tengah'}`,
            members: match.members || 1,
            image: match.image || 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop&q=80',
            coverImage: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=1600&auto=format&fit=crop&q=80',
            avatarImage: match.image || 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop&q=80',
            verified: match.verified ?? true,
            skLegalitas: match.skLegalitas || 'AHU Terdaftar',
            rating: 5.0,
            activities: 12,
            newsList: [],
            eventsList: [],
            donationsList: [],
            rules: [
              'Berkomitmen menjaga kelestarian warisan budaya nusantara.',
              'Menjunjung tinggi transparansi kegiatan, publikasi, dan galang donasi budaya.'
            ],
            foundedYear: match.foundedYear || '2024'
          };
        }
      }
    } catch {
      // ignore
    }

    return communitiesData[0];
  });

  // Update URL param saat isManageMode berubah (hanya jika memang milik user)
  useEffect(() => {
    if (isManageMode && isMyInstitution) {
      searchParams.set('manage', 'true');
    } else {
      searchParams.delete('manage');
      if (!isMyInstitution && isManageMode) {
        setIsManageMode(false);
      }
    }
    setSearchParams(searchParams, { replace: true });
  }, [isManageMode, isMyInstitution]);

  // Modal / Form States
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showAddNewsModal, setShowAddNewsModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showAddDonationModal, setShowAddDonationModal] = useState(false);

  // Edit Profil Lembaga Form State
  const [profileForm, setProfileForm] = useState({
    name: lembaga.name,
    tagline: lembaga.tagline || '',
    description: lembaga.description || '',
    about: lembaga.about || lembaga.description || '',
    image: lembaga.avatarImage || lembaga.image,
    institutionType: lembaga.institutionType || 'Yayasan Kebudayaan Terakreditasi',
    category: lembaga.category,
    province: lembaga.province,
    city: lembaga.city || '',
    addressDetail: lembaga.addressDetail || '',
    skLegalitas: lembaga.skLegalitas || ''
  });

  // Add News Form State (Menyesuaikan Format WordPress Gutenberg / Tambah Artikel)
  const [newsTitle, setNewsTitle] = useState('');
  const [newsExcerpt, setNewsExcerpt] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsCover, setNewsCover] = useState<string | null>(null);
  const [newsCategory, setNewsCategory] = useState(lembaga.category || 'Tradisi & Upacara Adat');
  const [isNewsSidebarOpen, setIsNewsSidebarOpen] = useState(true);
  const newsContentEditableRef = useRef<HTMLDivElement>(null);
  const newsCoverInputRef = useRef<HTMLInputElement>(null);
  const newsInlineImageInputRef = useRef<HTMLInputElement>(null);

  // Formatting helpers untuk Editor Rilis
  const applyNewsFormatting = (command: string, value: string | undefined = undefined) => {
    if (command === 'h1' || command === 'h2') {
      document.execCommand('formatBlock', false, command);
    } else if (command === 'link') {
      const url = prompt('Masukkan URL tautan:');
      if (url) document.execCommand('createLink', false, url);
    } else if (command === 'quote') {
      document.execCommand('formatBlock', false, 'blockquote');
    } else if (command === 'list') {
      document.execCommand('insertUnorderedList', false);
    } else {
      document.execCommand(command, false, value);
    }
  };

  const handleNewsInlineImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        document.execCommand('insertImage', false, url);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewsCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewsCover(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Event Form State
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '12 Des 2026',
    time: '19:30 - 22:00 WIB',
    location: `${lembaga.city || 'Solo'}, ${lembaga.province}`,
    type: 'offline' as 'offline' | 'online',
    price: 0,
    quota: 100,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop&q=80'
  });

  // Add Donation Form State
  const [donationForm, setDonationForm] = useState({
    title: '',
    description: '',
    targetAmount: 25000000,
    daysLeft: 30,
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=800&auto=format&fit=crop&q=80',
    isUrgent: false
  });

  const [activeTab, setActiveTab] = useState<'rilis' | 'agenda' | 'donasi' | 'tentang'>('rilis');
  const [selectedRilis, setSelectedRilis] = useState<CommunityNews | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newPostText, setNewPostText] = useState('');
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [openCommentPostIds, setOpenCommentPostIds] = useState<number[]>([]);
  const [commentInputs, setCommentInputs] = useState<{ [postId: number]: string }>({});

  // Initial posts with seeded realistic comments
  const [posts, setPosts] = useState<PostItem[]>(() => {
    if (lembaga.recentPosts && lembaga.recentPosts.length > 0) {
      return lembaga.recentPosts.map((p) => ({
        ...p,
        commentsList: [
          {
            id: 1,
            author: 'Bambang Sudiro',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
            text: 'Salut atas dedikasi dan konsistensi lembaga dalam menjaga mutu wastra nusantara.',
            time: '2 jam lalu',
            likes: 4
          },
          {
            id: 2,
            author: 'Siti Rahmawati',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
            text: 'Izin bertanya min, untuk workshop canting tembaga apakah pendaftaran sudah bisa via laman profil ini?',
            time: '45 menit lalu',
            likes: 2
          }
        ]
      }));
    }
    return [
      {
        id: 991,
        author: lembaga.name,
        authorRole: 'Lembaga Resmi',
        authorAvatar: lembaga.avatarImage || lembaga.image,
        time: '1 hari yang lalu',
        content: `Selamat datang di Halaman Profil Resmi Lembaga ${lembaga.name}. Kami hadir menyelenggarakan pembinaan kebudayaan, kuratorial karya, pementasan berkala, dan penyaluran dana restorasi cagar warisan nusantara.`,
        likes: 48,
        comments: 3,
        commentsList: [
          {
            id: 11,
            author: 'Kurniawan',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
            text: 'Salam takzim dan sukses selalu untuk seluruh jajaran dewan pengurus lembaga!',
            time: '12 jam lalu',
            likes: 5
          }
        ]
      }
    ];
  });

  const toggleComments = (postId: number) => {
    if (openCommentPostIds.includes(postId)) {
      setOpenCommentPostIds(openCommentPostIds.filter((id) => id !== postId));
    } else {
      setOpenCommentPostIds([...openCommentPostIds, postId]);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleFollow = () => {
    setIsFollowing(!isFollowing);
    showToast(!isFollowing ? `Anda resmi mengikuti profil resmi ${lembaga.name}` : `Anda berhenti mengikuti lembaga ini`);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Tautan profil resmi lembaga berhasil disalin!');
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: PostItem = {
      id: Date.now(),
      author: 'Anda (Pengguna Terverifikasi)',
      authorRole: 'Sahabat Lembaga',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      time: 'Baru saja',
      content: newPostText,
      likes: 0,
      comments: 0,
      commentsList: []
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
    showToast('Kabar/aspirasi Anda berhasil dikirim ke feed lembaga!');
  };

  const toggleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((p) => p !== postId));
      setPosts(posts.map((p) => (p.id === postId ? { ...p, likes: Math.max(0, p.likes - 1) } : p)));
    } else {
      setLikedPosts([...likedPosts, postId]);
      setPosts(posts.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p)));
    }
  };

  const handleAddComment = (postId: number) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    const newComment: CommentItem = {
      id: Date.now(),
      author: 'Anda (Pengguna Terverifikasi)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      text,
      time: 'Baru saja',
      likes: 0
    };

    setPosts(posts.map((p) => {
      if (p.id === postId) {
        const updatedList = [...(p.commentsList || []), newComment];
        return {
          ...p,
          comments: updatedList.length,
          commentsList: updatedList
        };
      }
      return p;
    }));

    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  // Handlers Pengelolaan Lembaga (Edit Profil, Tambah Rilis Berita, Acara, Donasi)
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...lembaga,
      name: profileForm.name,
      tagline: profileForm.tagline,
      description: profileForm.description,
      about: profileForm.about,
      avatarImage: profileForm.image,
      image: profileForm.image,
      institutionType: profileForm.institutionType,
      category: profileForm.category,
      province: profileForm.province,
      city: profileForm.city,
      addressDetail: profileForm.addressDetail,
      skLegalitas: profileForm.skLegalitas
    };
    setLembaga(updated);

    // Sinkronisasi ke localStorage
    try {
      const stored = localStorage.getItem('user_registered_institutions');
      let list = stored ? JSON.parse(stored) : [];
      if (Array.isArray(list)) {
        const idx = list.findIndex(item => item.id === lembaga.id);
        if (idx !== -1) {
          list[idx] = { ...list[idx], ...updated };
        } else {
          list.push(updated);
        }
        localStorage.setItem('user_registered_institutions', JSON.stringify(list));
      }
      localStorage.setItem('user_my_institution', JSON.stringify(updated));
      window.dispatchEvent(new Event('institution_updated'));
    } catch {
      // ignore
    }

    setShowEditProfileModal(false);
    showToast('Profil lembaga berhasil diperbarui!');
  };

  const handleAddNews = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newsTitle.trim()) return;

    const wordCount = (newsContent.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length) || 10;
    const calcReadTime = `${Math.max(1, Math.ceil(wordCount / 180))} min baca`;
    const finalImage = newsCover || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80';

    const newNewsItem: CommunityNews = {
      id: Date.now(),
      title: newsTitle,
      excerpt: newsExcerpt || newsTitle,
      date: 'Hari ini',
      category: newsCategory,
      readTime: calcReadTime,
      image: finalImage,
      content: newsContent ? [newsContent] : [newsExcerpt || newsTitle],
      author: lembaga.name,
      authorRole: 'Lembaga Resmi Kebudayaan'
    };

    const updatedNewsList = [newNewsItem, ...(lembaga.newsList || [])];
    const updatedLembaga = { ...lembaga, newsList: updatedNewsList };
    setLembaga(updatedLembaga);

    // Simpan ke localStorage user_published_news agar langsung muncul di halaman /berita dan /berita/:id
    try {
      const storedNews = localStorage.getItem('user_published_news');
      let newsArr = storedNews ? JSON.parse(storedNews) : [];
      const globalNewsItem = {
        id: newNewsItem.id,
        slug: `rilis-${newNewsItem.id}`,
        title: newNewsItem.title,
        category: newNewsItem.category || 'Tradisi & Upacara Adat',
        subCategory: 'Rilis Resmi Lembaga',
        image: newNewsItem.image,
        excerpt: newNewsItem.excerpt,
        content: newNewsItem.content,
        author: lembaga.name,
        authorRole: 'Lembaga Resmi Kebudayaan',
        authorAvatar: lembaga.avatarImage || lembaga.image,
        date: newNewsItem.date,
        readTime: newNewsItem.readTime,
        tags: ['Rilis Lembaga', lembaga.name, lembaga.category],
        source: lembaga.name
      };
      newsArr = [globalNewsItem, ...newsArr];
      localStorage.setItem('user_published_news', JSON.stringify(newsArr));
      window.dispatchEvent(new Event('news_updated'));
    } catch {
      // ignore
    }

    setNewsTitle('');
    setNewsExcerpt('');
    setNewsContent('');
    setNewsCover(null);
    if (newsContentEditableRef.current) {
      newsContentEditableRef.current.innerHTML = '';
    }
    setShowAddNewsModal(false);
    showToast('Rilis siaran pers baru berhasil diterbitkan dan masuk ke Halaman Berita!');
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title.trim()) return;

    const newEventItem: CommunityEvent = {
      id: Date.now(),
      title: eventForm.title,
      date: eventForm.date,
      time: eventForm.time,
      location: eventForm.location,
      type: eventForm.type,
      price: Number(eventForm.price) || 0,
      quota: Number(eventForm.quota) || 100,
      registered: 0,
      image: eventForm.image
    };

    const updatedEventsList = [newEventItem, ...(lembaga.eventsList || [])];
    setLembaga({ ...lembaga, eventsList: updatedEventsList });

    // Simpan ke localStorage user_published_events agar langsung sinkron ke halaman /acara
    try {
      const storedEvt = localStorage.getItem('user_published_events');
      let evtArr = storedEvt ? JSON.parse(storedEvt) : [];
      const globalEventItem = {
        id: newEventItem.id,
        title: newEventItem.title,
        description: `Diselenggarakan resmi oleh ${lembaga.name}. Bergaransi tiket QR Code dan sertifikat kehadiran.`,
        image: newEventItem.image,
        date: newEventItem.date,
        time: newEventItem.time,
        location: newEventItem.location,
        venue: newEventItem.location,
        attendees: 0,
        price: newEventItem.price === 0 ? 'Gratis' : `Rp ${newEventItem.price.toLocaleString()}`,
        category: 'Pertunjukan'
      };
      evtArr = [globalEventItem, ...evtArr];
      localStorage.setItem('user_published_events', JSON.stringify(evtArr));
      window.dispatchEvent(new Event('events_updated'));
    } catch {
      // ignore
    }

    setEventForm({
      title: '',
      date: '12 Des 2026',
      time: '19:30 - 22:00 WIB',
      location: `${lembaga.city || 'Solo'}, ${lembaga.province}`,
      type: 'offline',
      price: 0,
      quota: 100,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop&q=80'
    });
    setShowAddEventModal(false);
    showToast('Agenda acara baru berhasil ditambahkan dan masuk ke Halaman Acara!');
  };

  const handleAddDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donationForm.title.trim()) return;

    const newDonationItem: CommunityDonation = {
      id: Date.now(),
      title: donationForm.title,
      description: donationForm.description,
      targetAmount: Number(donationForm.targetAmount) || 20000000,
      collectedAmount: 0,
      donorsCount: 0,
      daysLeft: Number(donationForm.daysLeft) || 30,
      image: donationForm.image,
      isUrgent: donationForm.isUrgent
    };

    const updatedDonationsList = [newDonationItem, ...(lembaga.donationsList || [])];
    setLembaga({ ...lembaga, donationsList: updatedDonationsList });

    // Simpan ke localStorage user_published_donations agar langsung sinkron ke halaman /crowdfunding
    try {
      const storedDon = localStorage.getItem('user_published_donations');
      let donArr = storedDon ? JSON.parse(storedDon) : [];
      const globalCampaignItem = {
        id: newDonationItem.id,
        title: newDonationItem.title,
        description: newDonationItem.description,
        image: newDonationItem.image,
        raised: 0,
        target: newDonationItem.targetAmount,
        daysLeft: newDonationItem.daysLeft,
        donors: 0,
        category: 'Pelestarian',
        location: `${lembaga.city || 'Solo'}, ${lembaga.province}`,
        urgent: newDonationItem.isUrgent,
        badge: newDonationItem.isUrgent ? 'Mendesak & Terverifikasi' : 'Program Terverifikasi Lembaga',
        organizer: lembaga.name,
        verified: true
      };
      donArr = [globalCampaignItem, ...donArr];
      localStorage.setItem('user_published_donations', JSON.stringify(donArr));
      window.dispatchEvent(new Event('donations_updated'));
    } catch {
      // ignore
    }

    setDonationForm({
      title: '',
      description: '',
      targetAmount: 25000000,
      daysLeft: 30,
      image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=800&auto=format&fit=crop&q=80',
      isUrgent: false
    });
    setShowAddDonationModal(false);
    showToast('Program donasi baru berhasil dibuka dan masuk ke Halaman Donasi!');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-24">
      <TopNavbar />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <div className="pt-20 bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-base font-medium text-blue-700 hover:text-blue-800 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Kembali</span>
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span>ID Lembaga:</span>
            <span className="font-semibold text-slate-700">#{lembaga.slug || `LB-${lembaga.id}`}</span>
          </div>
        </div>
      </div>

      {/* Hero / Cover Photo Banner (Professional Institution Profile Style) */}
      <div className="bg-white border-b border-slate-200/80 shadow-xs">
        <div className="max-w-6xl mx-auto">
          {/* Cover Container */}
          <div className="relative h-44 sm:h-56 md:h-64 lg:h-72 w-full bg-slate-900 overflow-hidden md:rounded-b-2xl">
            <img
              src={lembaga.coverImage || lembaga.image}
              alt={lembaga.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1600&auto=format&fit=crop&q=80';
              }}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />
            
            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md border border-white/20 flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-blue-400" />
                {lembaga.institutionType || 'Lembaga Kebudayaan'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600/90 text-white backdrop-blur-md">
                {lembaga.category}
              </span>
            </div>
          </div>

          {/* Institution Header Details */}
          <div className="px-4 sm:px-6 pt-5 pb-4">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
              {/* Avatar + Title Group */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left relative z-10">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden p-1 bg-white shadow-md border border-slate-200 shrink-0">
                  <img
                    src={lembaga.avatarImage || lembaga.image}
                    alt={lembaga.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                    <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-snug">
                      {lembaga.name}
                    </h1>
                    {lembaga.verified && (
                      <VerifiedBadge className="w-5 h-5 text-[#1D9BF0] shrink-0" />
                    )}
                  </div>
                  
                  <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl leading-relaxed">
                    {lembaga.tagline || lembaga.description}
                  </p>

                  <div className="text-xs text-slate-500 flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                    <span className="inline-flex items-center gap-1 text-slate-700 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      {lembaga.city ? `${lembaga.city}, ` : ''}{lembaga.province}
                    </span>
                    <span>•</span>
                    <span>
                      <strong className="text-slate-900">{lembaga.members.toLocaleString()}</strong> Pengikut
                    </span>
                    <span>•</span>
                    <span>
                      Didirikan <strong className="text-slate-900">{lembaga.foundedYear || '2019'}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center sm:justify-start md:justify-end gap-2.5 flex-wrap pt-2 md:pt-1">
                {isManageMode ? (
                  <>
                    <button
                      onClick={() => setShowEditProfileModal(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold transition-all shadow-xs"
                    >
                      <Edit3 className="w-4 h-4 text-slate-500" />
                      <span>Edit Profil</span>
                    </button>

                    <button
                      onClick={() => setIsManageMode(false)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-blue-800 text-xs sm:text-sm font-bold transition-all"
                    >
                      <Eye className="w-4 h-4 text-blue-600" />
                      <span>Lihat Mode Publik</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleToggleFollow}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs active:scale-[0.98] ${
                        isFollowing
                          ? 'bg-blue-50 text-blue-700 border border-blue-300 hover:bg-blue-100'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isFollowing ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Mengikuti</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4" />
                          <span>+ Ikuti Lembaga</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setActiveTab('donasi')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-blue-800 text-xs sm:text-sm font-bold transition-all"
                    >
                      <HandHeart className="w-4 h-4 text-blue-600" />
                      <span>Dukung Lembaga</span>
                    </button>

                    {isMyInstitution && (
                      <button
                        onClick={() => setIsManageMode(true)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold transition-all shadow-xs"
                        title="Beralih ke Mode Kelola Lembaga"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Kelola</span>
                      </button>
                    )}
                  </>
                )}

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 p-2.5 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold transition-all"
                  title="Bagikan Profil Lembaga"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs (Rilis, Agenda, Donasi, Tentang) */}
            <div className="flex items-center gap-6 sm:gap-8 mt-6 overflow-x-auto scrollbar-none border-b border-slate-200">
              {[
                { key: 'rilis', label: `Rilis (${lembaga.newsList?.length || 0})`, icon: Newspaper },
                { key: 'agenda', label: `Agenda (${lembaga.eventsList?.length || 0})`, icon: Calendar },
                { key: 'donasi', label: `Donasi (${lembaga.donationsList?.length || 0})`, icon: HandHeart },
                { key: 'tentang', label: 'Tentang', icon: Info },
              ].map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`inline-flex items-center gap-2 pb-3.5 pt-2 text-xs sm:text-sm font-bold whitespace-nowrap transition-colors relative ${
                      isActive
                        ? 'text-blue-600'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                    <span>{tab.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-blue-600 rounded-t-sm" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content Area */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column / Primary Content (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* TAB: RILIS (Berita & Catatan Lembaga) */}
            {activeTab === 'rilis' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Rilis, Siaran Pers, & Catatan Riset Lembaga
                    </h3>
                    <p className="text-xs text-slate-500">
                      Publikasi resmi berkala yang diterbitkan oleh dewan kuratorial lembaga
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-semibold border border-slate-200">
                      {lembaga.newsList?.length || 0} Terbitan
                    </span>
                    {isManageMode && (
                      <button
                        onClick={() => setShowAddNewsModal(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah Rilis</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {(lembaga.newsList || []).map((news: CommunityNews) => (
                    <article key={news.id} className="bg-white rounded-2xl shadow-xs border border-slate-200/90 overflow-hidden hover:border-slate-300 transition-all flex flex-col sm:flex-row">
                      <Link to={`/berita/${news.id}`} className="sm:w-56 h-48 sm:h-auto bg-slate-100 shrink-0 overflow-hidden block">
                        <img src={news.image} alt={news.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      </Link>
                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400">{news.date}</span>
                            <span className="text-xs text-slate-400">• {news.readTime}</span>
                          </div>
                          <Link 
                            to={`/berita/${news.id}`}
                            className="block text-base font-bold text-slate-900 leading-snug hover:text-blue-600 transition-colors"
                          >
                            {news.title}
                          </Link>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {news.excerpt}
                          </p>
                        </div>
                        <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-4">
                          <Link 
                            to={`/lembaga/${lembaga.id}`}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors group/pub"
                            title={`Lihat Profil ${lembaga.name}`}
                          >
                            <span className="text-slate-400">Penerbit:</span>
                            <span className="font-bold underline decoration-slate-300 group-hover/pub:decoration-blue-500">{lembaga.name}</span>
                          </Link>
                          <Link 
                            to={`/berita/${news.id}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                          >
                            <span>Baca Selengkapnya</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: AGENDA (Acara & Pagelaran) */}
            {activeTab === 'agenda' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Agenda Acara, Workshop, & Pertunjukan Lembaga
                    </h3>
                    <p className="text-xs text-slate-500">
                      Pendaftaran resmi bergaransi tiket QR Code yang dapat diverifikasi di lokasi
                    </p>
                  </div>
                  {isManageMode && (
                    <button
                      onClick={() => setShowAddEventModal(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs self-start sm:self-auto shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Agenda Acara</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {(lembaga.eventsList || []).map((evt: CommunityEvent) => (
                    <div key={evt.id} className="bg-white rounded-2xl shadow-xs border border-slate-200/90 overflow-hidden flex flex-col sm:flex-row hover:border-blue-300 transition-all">
                      <div className="sm:w-56 h-48 sm:h-auto bg-slate-100 shrink-0 relative overflow-hidden">
                        <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                        <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full text-white backdrop-blur-md ${
                          evt.type === 'offline' ? 'bg-emerald-600/90' : 'bg-blue-600/90'
                        }`}>
                          {evt.type === 'offline' ? 'Luring (Di Lokasi)' : 'Daring (Online)'}
                        </span>
                      </div>
                      
                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-blue-600 flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {evt.date} • {evt.time}
                            </span>
                            <span className="text-xs font-extrabold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                              {evt.price === 0 ? 'Gratis' : `Rp ${evt.price.toLocaleString()}`}
                            </span>
                          </div>

                          <h4 className="text-base font-bold text-slate-900">
                            {evt.title}
                          </h4>

                          <p className="text-xs text-slate-600 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{evt.location}</span>
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-3">
                          <div className="text-xs text-slate-500">
                            Tersedia: <strong className="text-slate-800">{evt.registered} / {evt.quota} kursi</strong>
                          </div>
                          <button
                            onClick={() => {
                              showToast(`Tiket ${evt.title} berhasil dipesan! E-Tiket dikirim ke akun Anda.`);
                            }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                          >
                            <Ticket className="w-3.5 h-3.5" />
                            <span>Pesan Tiket Lembaga</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: GALANG DANA & RESTORASI */}
            {activeTab === 'donasi' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Penggalangan Dana & Restorasi Budaya
                    </h3>
                    <p className="text-xs text-slate-500">
                      Penyaluran resmi terverifikasi dengan Laporan Pertanggungjawaban (LPJ) berkala
                    </p>
                  </div>
                  {isManageMode && (
                    <button
                      onClick={() => setShowAddDonationModal(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs self-start sm:self-auto shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Buat Program Donasi</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-5">
                  {(lembaga.donationsList || []).map((don: CommunityDonation) => {
                    const percent = Math.min(100, Math.round((don.collectedAmount / don.targetAmount) * 100));
                    return (
                      <div key={don.id} className="bg-white rounded-2xl shadow-xs border border-slate-200/90 overflow-hidden p-5 flex flex-col md:flex-row gap-5">
                        <div className="md:w-60 h-44 md:h-auto bg-slate-100 rounded-xl overflow-hidden shrink-0">
                          <img src={don.image} alt={don.title} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            {don.isUrgent && (
                              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full inline-block mb-2">
                                ⚡ Program Mendesak Lembaga
                              </span>
                            )}
                            <h4 className="text-base font-bold text-slate-900 leading-snug">
                              {don.title}
                            </h4>
                            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                              {don.description}
                            </p>
                          </div>

                          {/* Progress Bar */}
                          <div className="space-y-2 pt-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-500">Terkumpul: <strong className="text-slate-900">Rp {don.collectedAmount.toLocaleString()}</strong></span>
                              <span className="font-bold text-blue-600">{percent}%</span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-slate-400">
                              <span>Target: Rp {don.targetAmount.toLocaleString()}</span>
                              <span>{don.donorsCount} donatur • {don.daysLeft} hari lagi</span>
                            </div>
                          </div>

                          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                            <button 
                              onClick={() => showToast('Membuka rincian LPJ & dokumentasi belanja...')}
                              className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline"
                            >
                              Lihat Laporan Transparansi
                            </button>
                            <button
                              onClick={() => {
                                showToast(`Terima kasih! Donasi sebesar Rp 50.000 untuk "${don.title}" berhasil disalurkan.`);
                              }}
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                            >
                              <HandHeart className="w-3.5 h-3.5" />
                              <span>Salurkan Donasi</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: TENTANG & LEGALITAS (Termasuk Dewan Pengurus) */}
            {activeTab === 'tentang' && (
              <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-blue-600" />
                    <span>Profil Resmi Lembaga</span>
                  </h3>
                  {isManageMode && (
                    <button
                      onClick={() => setShowEditProfileModal(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all self-start sm:self-auto shrink-0"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                      <span>Edit Tentang & Data Lembaga</span>
                    </button>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {lembaga.about || lembaga.description}
                </p>

                {/* Dewan Pengurus Lembaga (Dipindah ke dalam Tentang) */}
                <div className="pt-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>Dewan Kuratorial & Pengurus Lembaga</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {(lembaga.staffList || [
                      { name: 'Dewi Sekar Pembayun', role: 'Ketua Dewan Pengurus', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
                      { name: 'Raden Bagus Wicaksono', role: 'Kepala Riset & Kuratorial', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
                      { name: 'Siti Nurhaliza M.', role: 'Koordinator Acara & Edukasi', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' }
                    ]).map((staff, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center gap-3">
                        <img src={staff.avatar} alt={staff.name} className="w-11 h-11 rounded-full object-cover border border-slate-200" />
                        <div>
                          <h5 className="text-xs sm:text-sm font-bold text-slate-900">{staff.name}</h5>
                          <p className="text-xs text-blue-600 font-semibold">{staff.role}</p>
                          <p className="text-[11px] text-slate-400">Pengurus Lembaga Terverifikasi</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legalitas & Badan Hukum Card */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>Akreditasi & Keputusan Hukum Lembaga</span>
                  </div>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p>• <strong>Bentuk Entitas:</strong> {lembaga.institutionType || 'Yayasan Kebudayaan Terdaftar'}</p>
                    <p>• <strong>Nomor SK Legalitas:</strong> {lembaga.skLegalitas || 'AHU-0014292.AH.01.04'}</p>
                    <p>• <strong>Sekretariat:</strong> {lembaga.addressDetail || `${lembaga.city}, ${lembaga.province}`}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Kategori</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{lembaga.category}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Wilayah Pokok</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{lembaga.province}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Tahun Pendirian</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{lembaga.foundedYear || '2019'}</span>
                  </div>
                </div>

                {lembaga.rules && (
                  <div className="pt-2">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-blue-600" />
                      <span>Pakta Integritas & Pedoman Operasional Lembaga</span>
                    </h4>
                    <ul className="space-y-2.5">
                      {lembaga.rules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/60 leading-relaxed">
                          <span className="font-bold text-blue-600 shrink-0">{idx + 1}.</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column / Quick Sidebar Info (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Quick Summary Card */}
            <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2.5">
                Identitas Resmi Lembaga
              </h3>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <Landmark className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Status Lembaga</span>
                    <span className="text-[11px] text-slate-500">{lembaga.institutionType || 'Lembaga Kebudayaan'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Alamat Sekretariat</span>
                    <span className="text-[11px] text-slate-500 leading-relaxed">
                      {lembaga.addressDetail || `${lembaga.city}, ${lembaga.province}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Indeks Dampak Budaya</span>
                    <span className="text-[11px] text-slate-500">{lembaga.rating} / 5.0 (Akreditasi A)</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <Link
                  to="/kelola-lembaga"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                >
                  <Landmark className="w-3.5 h-3.5" />
                  <span>Dasbor Pengurus Lembaga</span>
                </Link>
              </div>
            </div>

            {/* Support / Quick Donation Box */}
            <div className="bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent border border-blue-200/80 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-xs">
                <HandHeart className="w-4 h-4 text-blue-600" />
                <span>Dana Lestari Lembaga Budaya</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dukungan Anda disalurkan langsung untuk perawatan artefak, lokakarya gratis sanggar binaan, dan pelestarian cagar tradisi.
              </p>
              <button
                onClick={() => setActiveTab('donasi')}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all"
              >
                Pilih Program Donasi
              </button>
            </div>
          </div>
        </div>

        {/* Modal Detail Rilis Lembaga (Layout & Style Berita Saya) */}
        {selectedRilis && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            <div 
              className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden my-8 max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Arsip Rilis & Warta Lembaga
                  </span>
                </div>
                <button
                  onClick={() => setSelectedRilis(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="overflow-y-auto p-6 sm:p-9 space-y-6">
                {/* Info Asal Lembaga */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200/60 rounded-md text-[11px] font-bold uppercase tracking-wider">
                    {lembaga.name}
                  </span>
                </div>

                {/* Article Headline */}
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 leading-snug sm:leading-tight">
                  {selectedRilis.title}
                </h1>

                {/* Sub-headline / Excerpt */}
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal border-l-2 border-blue-600 pl-3.5 italic bg-slate-50/50 py-1.5 rounded-r-md">
                  {selectedRilis.excerpt}
                </p>

                {/* Author Byline & Timestamps */}
                <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-100">
                  <div className="flex items-center gap-3">
                    <img 
                      src={lembaga.staffList?.[0]?.avatar || lembaga.image} 
                      alt={selectedRilis.author || lembaga.name}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">
                        {selectedRilis.author || 'Redaksi Lembaga'}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {selectedRilis.authorRole || lembaga.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {selectedRilis.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {selectedRilis.readTime}
                    </span>
                  </div>
                </div>

                {/* Hero Banner Image */}
                <div className="rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80">
                  <img 
                    src={selectedRilis.image} 
                    alt={selectedRilis.title}
                    className="w-full h-[260px] sm:h-[380px] object-cover"
                  />
                  <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                    <span>Sumber / Dokumentasi Resmi: {lembaga.name}</span>
                    <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Terverifikasi Lembaga
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed tracking-normal font-normal">
                  {selectedRilis.content && selectedRilis.content.length > 0 ? (
                    selectedRilis.content.map((p, idx) => (
                      <p key={idx} className="text-justify sm:text-left">
                        {p}
                      </p>
                    ))
                  ) : (
                    <p className="text-justify sm:text-left">
                      {selectedRilis.excerpt}
                    </p>
                  )}
                </div>

                {/* Footer Modal Action */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        showToast('Tautan rilis berhasil disalin!');
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200/90 rounded-lg text-xs font-medium text-slate-700 hover:text-blue-600 shadow-2xs transition-all"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Bagikan</span>
                    </button>
                    <Link
                      to={`/berita/${selectedRilis.id}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-all"
                    >
                      <span>Buka di Halaman Berita</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <button
                    onClick={() => setSelectedRilis(null)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    Tutup Halaman
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 1: EDIT PROFIL & TENTANG LEMBAGA */}
        {showEditProfileModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            <div 
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden my-8 max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-bold text-slate-900">Edit Profil & Data Lembaga</h3>
                </div>
                <button 
                  onClick={() => setShowEditProfileModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Nama Lembaga / Sanggar / Yayasan <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Slogan / Tagline Singkat
                  </label>
                  <input
                    type="text"
                    value={profileForm.tagline}
                    onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Bentuk Entitas
                    </label>
                    <select
                      value={profileForm.institutionType}
                      onChange={(e) => setProfileForm({ ...profileForm, institutionType: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                    >
                      <option value="Yayasan Kebudayaan Terakreditasi">Yayasan Kebudayaan</option>
                      <option value="Sanggar Terdaftar Dinas Kebudayaan">Sanggar Terdaftar Disbud</option>
                      <option value="Paguyuban Berbadan Hukum">Paguyuban Berbadan Hukum</option>
                      <option value="Lembaga Adat / Dewan Cagar Budaya">Lembaga Adat / Cagar Budaya</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Kategori Kebudayaan
                    </label>
                    <select
                      value={profileForm.category}
                      onChange={(e) => setProfileForm({ ...profileForm, category: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                    >
                      <option value="Kriya">Kriya & Wastra</option>
                      <option value="Seni Teater & Tari">Teater, Tari & Pedalangan</option>
                      <option value="Musik Tradisional">Musik Tradisional & Karawitan</option>
                      <option value="Arsitektur & Cagar Budaya">Arsitektur & Cagar Budaya</option>
                      <option value="Sastra & Aksara">Sastra & Aksara Kuna</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Kota / Kabupaten
                    </label>
                    <input
                      type="text"
                      value={profileForm.city}
                      onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Provinsi
                    </label>
                    <input
                      type="text"
                      value={profileForm.province}
                      onChange={(e) => setProfileForm({ ...profileForm, province: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    URL Foto Profil / Logo Lembaga (Rasio 1:1)
                  </label>
                  <input
                    type="url"
                    value={profileForm.image}
                    onChange={(e) => setProfileForm({ ...profileForm, image: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Nomor SK Legalitas / Akreditasi
                  </label>
                  <input
                    type="text"
                    value={profileForm.skLegalitas}
                    onChange={(e) => setProfileForm({ ...profileForm, skLegalitas: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Tentang & Visi Misi Lembaga (Bisa Diedit) <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={profileForm.about}
                    onChange={(e) => setProfileForm({ ...profileForm, about: e.target.value, description: e.target.value.slice(0, 150) })}
                    placeholder="Tuliskan latar belakang, visi, misi, dan aktivitas dewan kuratorial lembaga..."
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-xs sm:text-sm resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowEditProfileModal(false)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-xs"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: TAMBAH RILIS SIARAN PERS (FULL SCREEN GUTENBERG/WORDPRESS PERSIS GAMBAR 2) */}
        {showAddNewsModal && (
          <div className="fixed inset-0 z-50 overflow-hidden bg-white flex flex-col animate-in fade-in duration-200">
            {/* Hidden Input for inserting images inside article body */}
            <input
              type="file"
              ref={newsInlineImageInputRef}
              onChange={handleNewsInlineImage}
              accept="image/*"
              className="hidden"
            />

            {/* Hidden Input for Featured Cover Image */}
            <input
              type="file"
              ref={newsCoverInputRef}
              onChange={handleNewsCoverChange}
              accept="image/*"
              className="hidden"
            />

            {/* Top Bar Header (Persis Header Gambar 2) */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-100 bg-white sticky top-0 z-20 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="text-amber-600">
                  <FileText className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                    Tambah Artikel Narasi
                  </h2>
                  <p className="text-[11px] text-slate-400 hidden sm:block">
                    Tulis narasi dan artikel budaya lengkap
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddNewsModal(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* WordPress Gutenberg Secondary Toolbar (Persis Toolbar Gambar 2) */}
            <div className="px-3 sm:px-6 py-2 border-b border-slate-200/80 bg-slate-50/90 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-xs flex-shrink-0">
              <div className="flex items-center gap-1 text-slate-600 overflow-x-auto scrollbar-none py-1 max-w-full">
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); applyNewsFormatting('h1'); }}
                  className="px-2 py-1 hover:bg-slate-200 active:bg-blue-100 rounded text-slate-700 font-bold transition-colors"
                  title="Heading 1"
                >
                  <Heading1 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); applyNewsFormatting('h2'); }}
                  className="px-2 py-1 hover:bg-slate-200 active:bg-blue-100 rounded text-slate-700 font-bold transition-colors"
                  title="Heading 2"
                >
                  <Heading2 className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-slate-300 mx-1 flex-shrink-0" />
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); applyNewsFormatting('bold'); }}
                  className="p-1.5 hover:bg-slate-200 active:bg-blue-100 rounded text-slate-700 transition-colors"
                  title="Tebal (Ctrl+B)"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); applyNewsFormatting('italic'); }}
                  className="p-1.5 hover:bg-slate-200 active:bg-blue-100 rounded text-slate-700 transition-colors"
                  title="Miring (Ctrl+I)"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); applyNewsFormatting('quote'); }}
                  className="p-1.5 hover:bg-slate-200 active:bg-blue-100 rounded text-slate-700 transition-colors"
                  title="Kutipan (Quote)"
                >
                  <Quote className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); applyNewsFormatting('list'); }}
                  className="p-1.5 hover:bg-slate-200 active:bg-blue-100 rounded text-slate-700 transition-colors"
                  title="Daftar List"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); applyNewsFormatting('link'); }}
                  className="p-1.5 hover:bg-slate-200 active:bg-blue-100 rounded text-slate-700 transition-colors"
                  title="Sisipkan Tautan"
                >
                  <Link2 className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-slate-300 mx-1 flex-shrink-0" />
                <button
                  type="button"
                  onClick={() => newsInlineImageInputRef.current?.click()}
                  className="p-1.5 hover:bg-slate-200 active:bg-blue-100 rounded text-slate-700 transition-colors"
                  title="Sisipkan Gambar"
                >
                  <ImageIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Toggle Sidebar & Action Terbitkan Artikel */}
              <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
                <button
                  type="button"
                  onClick={() => setIsNewsSidebarOpen(!isNewsSidebarOpen)}
                  className={`p-1.5 rounded-lg border transition-all ${
                    isNewsSidebarOpen 
                      ? 'bg-blue-50 text-blue-700 border-blue-200' 
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                  title={isNewsSidebarOpen ? 'Sembunyikan Pengaturan Post' : 'Buka Pengaturan Post'}
                  aria-label="Pengaturan Post"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleAddNews()}
                  disabled={!newsTitle.trim()}
                  className="px-4 sm:px-5 py-1.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-xs text-xs"
                >
                  Terbitkan Artikel
                </button>
              </div>
            </div>

            {/* Split Screen: Left Writing Canvas, Right Document Inspector (Persis Gambar 2) */}
            <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
              {/* Left Canvas: Title & Narration Gutenberg Canvas */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 flex flex-col items-center">
                <div className="max-w-3xl w-full space-y-6">
                  {/* Judul Artikel (Headline Gutenberg) */}
                  <div>
                    <textarea
                      value={newsTitle}
                      onChange={(e) => setNewsTitle(e.target.value)}
                      placeholder="Tambahkan judul artikel..."
                      rows={2}
                      className="w-full text-2xl sm:text-4xl font-extrabold text-slate-900 placeholder-slate-300 resize-none focus:outline-none border-b border-transparent focus:border-blue-500 pb-2 transition-colors leading-tight"
                      autoFocus
                    />
                  </div>

                  {/* Narasi / Isi Artikel Gutenberg Block (Rich Text WYSIWYG) */}
                  <div className="relative w-full">
                    <div
                      ref={newsContentEditableRef}
                      contentEditable
                      suppressContentEditableWarning
                      onInput={(e) => {
                        const html = e.currentTarget.innerHTML;
                        const text = e.currentTarget.innerText;
                        setNewsContent(text.trim() ? html : '');
                      }}
                      data-placeholder="Mulai menulis narasi budaya di sini... Gunakan Ctrl+B untuk tebal, Ctrl+I untuk miring, atau tombol toolbar di atas."
                      className="w-full text-slate-800 text-base sm:text-lg leading-relaxed focus:outline-none min-h-[380px] font-sans article-rich-editor empty:before:content-[attr(data-placeholder)] empty:before:text-slate-300 empty:before:cursor-text"
                    />
                  </div>
                </div>
              </div>

              {/* Right Sidebar: WordPress Document Settings (Persis Gambar 2) */}
              {isNewsSidebarOpen && (
                <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-slate-200/80 bg-slate-50/60 p-4 sm:p-5 overflow-y-auto space-y-5 flex-shrink-0 animate-in fade-in duration-150">
                  {/* Gambar Sampul (Featured Image) */}
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      GAMBAR SAMPUL ARTIKEL
                    </span>
                    {newsCover ? (
                      <div className="relative group rounded-xl overflow-hidden border border-slate-200 max-h-[180px] w-full bg-slate-100">
                        <img
                          src={newsCover}
                          alt="Sampul Artikel"
                          className="w-full h-36 object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => newsCoverInputRef.current?.click()}
                            className="px-2.5 py-1 bg-white text-slate-900 text-xs font-semibold rounded-lg shadow-md hover:bg-slate-100 transition-colors"
                          >
                            Ganti Sampul
                          </button>
                          <button
                            type="button"
                            onClick={() => setNewsCover(null)}
                            className="p-1 bg-rose-600 text-white rounded-lg shadow-md hover:bg-rose-700 transition-colors"
                            title="Hapus"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => newsCoverInputRef.current?.click()}
                        className="w-full py-4 px-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-500 bg-white hover:bg-blue-50/30 flex flex-col items-center justify-center gap-1.5 text-xs font-medium text-slate-600 transition-colors group cursor-pointer"
                      >
                        <ImageIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                        <span className="font-semibold text-slate-700">Unggah Gambar Sampul</span>
                        <span className="text-[10px] text-slate-400">Pilih foto rasio landscape</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">DOKUMEN POST</span>
                    <span className="text-[11px] font-semibold text-blue-600">Draft Siap</span>
                  </div>

                  {/* Status & Visibilitas */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>Visibilitas</span>
                      <span className="font-semibold text-slate-800">Publik</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>Estimasi</span>
                      <span className="font-semibold text-slate-800">3 min baca</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>Penulis</span>
                      <span className="font-semibold text-slate-800 truncate max-w-[120px]">{lembaga.name}</span>
                    </div>
                  </div>

                  <hr className="border-slate-200" />

                  {/* Kategori Artikel */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Kategori Artikel
                    </label>
                    <select
                      value={newsCategory}
                      onChange={(e) => setNewsCategory(e.target.value)}
                      className="w-full text-xs font-medium text-slate-800 border border-slate-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Tradisi & Upacara Adat">Tradisi & Upacara Adat</option>
                      <option value="Kajian & Naskah Kuno">Kajian & Naskah Kuno</option>
                      <option value="Profil Maestro Budaya">Profil Maestro Budaya</option>
                      <option value="Kisah Legenda & Mitologi">Kisah Legenda & Mitologi</option>
                      <option value="Eksplorasi Wastra & Motif">Eksplorasi Wastra & Motif</option>
                    </select>
                  </div>

                  {/* Ringkasan / Kutipan (WordPress Excerpt) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Kutipan Ringkas (Excerpt)
                    </label>
                    <textarea
                      value={newsExcerpt}
                      onChange={(e) => setNewsExcerpt(e.target.value)}
                      placeholder="Tulis ringkasan 1-2 kalimat untuk kartu pratinjau artikel..."
                      rows={3}
                      className="w-full text-xs text-slate-800 placeholder-slate-400 border border-slate-200 rounded-lg p-2.5 bg-white focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODAL 3: TAMBAH AGENDA ACARA (MASUK KE HALAMAN ACARA) */}
        {showAddEventModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            <div 
              className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden my-8 max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Tambah Agenda Acara & Workshop</h3>
                    <p className="text-[11px] text-slate-500">Otomatis masuk ke kalender agenda di Halaman Acara</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAddEventModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddEvent} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Judul Acara / Pementasan <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Lokakarya Intensif Canting Tulis Klasik"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Tanggal Pelaksanaan
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="18 Des 2026"
                      value={eventForm.date}
                      onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Waktu / Jam
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="09:00 - 15:00 WIB"
                      value={eventForm.time}
                      onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Format Pelaksanaan
                    </label>
                    <select
                      value={eventForm.type}
                      onChange={(e) => setEventForm({ ...eventForm, type: e.target.value as any })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                    >
                      <option value="offline">Luring (Di Lokasi Fisik)</option>
                      <option value="online">Daring (Virtual / Zoom)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Biaya Tiket (0 = Gratis)
                    </label>
                    <input
                      type="number"
                      value={eventForm.price}
                      onChange={(e) => setEventForm({ ...eventForm, price: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Lokasi / Venue Pementasan
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Pendopo / Balai Budaya / Tautan Meeting"
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    URL Banner Gambar Acara
                  </label>
                  <input
                    type="url"
                    value={eventForm.image}
                    onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                  />
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowAddEventModal(false)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-xs"
                  >
                    Terbitkan ke Acara
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 4: BUAT PROGRAM DONASI (MASUK KE HALAMAN DONASI / CROWDFUNDING) */}
        {showAddDonationModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            <div 
              className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden my-8 max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
                <div className="flex items-center gap-2">
                  <HandHeart className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Buka Galang Dana & Donasi Lembaga</h3>
                    <p className="text-[11px] text-slate-500">Otomatis masuk dan aktif di Halaman Donasi (Crowdfunding)</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAddDonationModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddDonation} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Judul Kampanye Donasi <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Restorasi Serat Pusaka & Modul Pelatihan Sanggar"
                    value={donationForm.title}
                    onChange={(e) => setDonationForm({ ...donationForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Deskripsi Program & Rencana Penyaluran
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Jelaskan kebutuhan dana, urgensi perbaikan, dan komitmen LPJ berkala..."
                    value={donationForm.description}
                    onChange={(e) => setDonationForm({ ...donationForm, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-xs sm:text-sm resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Target Dana (Rp) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={donationForm.targetAmount}
                      onChange={(e) => setDonationForm({ ...donationForm, targetAmount: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Durasi Hari Aktif
                    </label>
                    <input
                      type="number"
                      value={donationForm.daysLeft}
                      onChange={(e) => setDonationForm({ ...donationForm, daysLeft: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    URL Foto Sampul Program
                  </label>
                  <input
                    type="url"
                    value={donationForm.image}
                    onChange={(e) => setDonationForm({ ...donationForm, image: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="urgentCheck"
                    checked={donationForm.isUrgent}
                    onChange={(e) => setDonationForm({ ...donationForm, isUrgent: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300"
                  />
                  <label htmlFor="urgentCheck" className="text-xs text-slate-700 font-medium cursor-pointer">
                    Tandai sebagai Program Mendesak (Urgent Badge)
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowAddDonationModal(false)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-xs"
                  >
                    Buka Kampanye ke Donasi
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}