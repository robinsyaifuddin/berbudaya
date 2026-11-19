import { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Image as ImageIcon, 
  FileText, 
  UploadCloud, 
  Sparkles, 
  Eye, 
  Hash, 
  CheckCircle2, 
  Globe, 
  Layers, 
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
  Quote, 
  List, 
  Link2,
  HelpCircle,
  Clock,
  ChevronRight,
  ChevronLeft,
  SlidersHorizontal,
  Upload,
  Smile,
  MapPin,
  Tag,
  MessageSquare
} from 'lucide-react';

export type PostDialogTab = 'post' | 'gallery' | 'article';

interface CreatePostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userAvatar: string;
  userName: string;
  initialTab?: PostDialogTab;
  onPostCreated?: (newPost: any) => void;
}

export default function CreatePostDialog({ 
  isOpen, 
  onClose, 
  userAvatar, 
  userName,
  initialTab = 'post',
  onPostCreated
}: CreatePostDialogProps) {
  const [activeTab, setActiveTab] = useState<PostDialogTab>(initialTab);

  // --- Post Status Form State (Facebook style) ---
  const [postText, setPostText] = useState('');
  const [postImages, setPostImages] = useState<string[]>([]);
  const [postCategory, setPostCategory] = useState('Budaya Umum');
  const [postLocation, setPostLocation] = useState('');
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [postAudience, setPostAudience] = useState<'public' | 'community'>('public');
  const postFileInputRef = useRef<HTMLInputElement>(null);

  // --- Galeri Form State (Pinterest style: Image, Title, Description/Caption, Tags) ---
  const [galleryImage, setGalleryImage] = useState<string | null>(null);
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryCaption, setGalleryCaption] = useState('');
  const [galleryCategory, setGalleryCategory] = useState('Seni Kriya');
  const [galleryTags, setGalleryTags] = useState('');
  const [isDraggingGallery, setIsDraggingGallery] = useState(false);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  // --- Artikel Form State (WordPress Gutenberg style: Cover Image, Title, Narrative Body, Category, Excerpt) ---
  const [articleCover, setArticleCover] = useState<string | null>(null);
  const [articleTitle, setArticleTitle] = useState('');
  const [articleNarrative, setArticleNarrative] = useState('');
  const [articleCategory, setArticleCategory] = useState('Tradisi & Upacara');
  const [articleExcerpt, setArticleExcerpt] = useState('');
  const [articleReadingTime, setArticleReadingTime] = useState('3 min baca');
  const [isArticlePublishSidebarOpen, setIsArticlePublishSidebarOpen] = useState(true);
  const articleCoverInputRef = useRef<HTMLInputElement>(null);
  const articleInlineImageInputRef = useRef<HTMLInputElement>(null);
  const narrativeTextareaRef = useRef<HTMLTextAreaElement>(null);

  // WYSIWYG Editor Helpers for Article Canvas
  const articleContentEditableRef = useRef<HTMLDivElement>(null);

  const formatDoc = (cmd: string, val: string | undefined = undefined) => {
    document.execCommand(cmd, false, val);
    if (articleContentEditableRef.current) {
      setArticleNarrative(articleContentEditableRef.current.innerHTML);
    }
  };

  const applyFormatting = (type: 'h1' | 'h2' | 'bold' | 'italic' | 'quote' | 'list' | 'link') => {
    if (articleContentEditableRef.current) {
      articleContentEditableRef.current.focus();
    }
    switch (type) {
      case 'h1':
        formatDoc('formatBlock', '<h1>');
        break;
      case 'h2':
        formatDoc('formatBlock', '<h2>');
        break;
      case 'bold':
        formatDoc('bold');
        break;
      case 'italic':
        formatDoc('italic');
        break;
      case 'quote':
        formatDoc('formatBlock', '<blockquote>');
        break;
      case 'list':
        formatDoc('insertUnorderedList');
        break;
      case 'link': {
        const url = prompt('Masukkan tautan URL:', 'https://');
        if (url) {
          formatDoc('createLink', url);
        }
        break;
      }
      default:
        break;
    }
  };

  const handleEditorKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey) {
      const key = e.key.toLowerCase();
      if (key === 'b') {
        e.preventDefault();
        formatDoc('bold');
      } else if (key === 'i') {
        e.preventDefault();
        formatDoc('italic');
      } else if (key === 'u') {
        e.preventDefault();
        formatDoc('underline');
      }
    }
  };

  // Inline Image handler inside article narrative
  const handleInsertInlineImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        if (articleContentEditableRef.current) {
          articleContentEditableRef.current.focus();
          formatDoc('insertImage', imageUrl);
        } else {
          setArticleNarrative((prev) => prev + `<p><img src="${imageUrl}" alt="Gambar artikel" class="max-w-full rounded-xl my-3" /></p>`);
        }
      };
      reader.readAsDataURL(file);
    }
    // Reset file input so same file can be uploaded again if needed
    e.target.value = '';
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Sync activeTab whenever dialog opens or initialTab changes
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  // File Upload Handlers (converts to base64 preview)
  const handlePostImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setPostImages((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePostImage = (index: number) => {
    setPostImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, target: 'gallery' | 'article') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (target === 'gallery') {
          setGalleryImage(reader.result as string);
        } else {
          setArticleCover(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      let createdItem: any;

      if (activeTab === 'post') {
        createdItem = {
          id: Date.now(),
          type: 'post',
          author: {
            name: userName,
            subtitle: postLocation ? `Pegiat Budaya • ${postLocation}` : 'Pengguna Ruang Budaya',
            avatar: userAvatar,
            timestamp: 'Baru saja'
          },
          content: postText,
          image: postImages.length > 0 ? postImages[0] : undefined,
          images: postImages.length > 1 ? postImages : undefined,
          category: postCategory,
          likes: 0,
          comments: 0,
          bookmarks: 0
        };
      } else {
        createdItem = {
          id: Date.now(),
          type: activeTab,
          author: {
            name: userName,
            subtitle: activeTab === 'gallery' ? 'Kontributor Galeri Budaya' : 'Penulis Narasi Budaya',
            avatar: userAvatar,
            timestamp: 'Baru saja'
          },
          content: activeTab === 'gallery' 
            ? `${galleryTitle ? `**${galleryTitle}**\n\n` : ''}${galleryCaption}${galleryTags ? `\n\n${galleryTags.split(' ').map(t => t.startsWith('#') ? t : `#${t}`).join(' ')}` : ''}`
            : `${articleTitle ? `### ${articleTitle}\n\n` : ''}${articleNarrative.slice(0, 280)}${articleNarrative.length > 280 ? '...' : ''}`,
          image: activeTab === 'gallery' 
            ? (galleryImage || 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=800&h=600&fit=crop')
            : (articleCover || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'),
          title: activeTab === 'gallery' ? galleryTitle : articleTitle,
          narrative: activeTab === 'article' ? articleNarrative : undefined,
          category: activeTab === 'gallery' ? galleryCategory : articleCategory,
          likes: 0,
          comments: 0,
          bookmarks: 0
        };
      }

      if (onPostCreated) {
        onPostCreated(createdItem);
      }

      setIsSubmitting(false);
      setShowSuccessToast(true);

      setTimeout(() => {
        setShowSuccessToast(false);
        // Reset states
        setPostText('');
        setPostImages([]);
        setPostLocation('');
        setShowLocationInput(false);
        setGalleryImage(null);
        setGalleryTitle('');
        setGalleryCaption('');
        setGalleryTags('');
        setArticleCover(null);
        setArticleTitle('');
        setArticleNarrative('');
        if (articleContentEditableRef.current) {
          articleContentEditableRef.current.innerHTML = '';
        }
        setArticleExcerpt('');
        onClose();
      }, 700);
    }, 600);
  };

  const isPostValid = Boolean(postText.trim() || postImages.length > 0);
  const isGalleryValid = Boolean(galleryImage || galleryTitle.trim());
  const isArticleValid = Boolean(articleTitle.trim() && articleNarrative.trim());

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex p-0">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 -z-10"
        onClick={onClose}
      />

      {/* Main Container: Full screen seperti lembar kerja artikel */}
      <div 
        className="bg-white w-full h-[100dvh] flex flex-col overflow-hidden animate-in fade-in duration-200 rounded-none border-none shadow-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-100 bg-white sticky top-0 z-20 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="text-slate-800">
              {activeTab === 'post' ? <MessageSquare className="w-5 h-5 text-blue-600" /> : activeTab === 'gallery' ? <ImageIcon className="w-5 h-5 text-emerald-600" /> : <FileText className="w-5 h-5 text-amber-600" />}
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                {activeTab === 'post' ? 'Buat Postingan' : activeTab === 'gallery' ? 'Tambah Foto Galeri' : 'Tambah Artikel Narasi'}
              </h2>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {activeTab === 'post' ? 'Bagikan pemikiran, cerita, atau kabar budaya' : activeTab === 'gallery' ? 'Unggah karya visual & dokumentasi budaya' : 'Tulis narasi dan artikel budaya lengkap'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TAB 0: BUAT POSTINGAN (Full-page Canvas Editor Layout)   */}
        {/* ========================================================= */}
        {activeTab === 'post' && (
          <div className="flex-1 overflow-y-auto bg-slate-50/50 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto w-full bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-7 lg:p-8 space-y-6">
              {/* User Profile Info & Metadata Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <img
                    src={userAvatar}
                    alt={userName}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200 shadow-2xs"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">{userName}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Berbagi pemikiran dan kabar budaya publik</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPostAudience(prev => prev === 'public' ? 'community' : 'public')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 bg-white transition-all shadow-2xs active:scale-95"
                  >
                    <Globe className="w-3.5 h-3.5 text-blue-600" />
                    <span>{postAudience === 'public' ? 'Publik' : 'Komunitas'}</span>
                  </button>

                  <select
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value)}
                    className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-3 py-1.5 outline-none cursor-pointer transition-colors shadow-2xs"
                  >
                    <option value="Budaya Umum">Budaya Umum</option>
                    <option value="Seni Tradisi">Seni Tradisi</option>
                    <option value="Wastra Nusantara">Wastra Nusantara</option>
                    <option value="Kuliner Tradisional">Kuliner Tradisional</option>
                    <option value="Upacara & Adat">Upacara & Adat</option>
                    <option value="Kriya & Kerajinan">Kriya & Kerajinan</option>
                  </select>
                </div>
              </div>

              {/* Text Area Canvas */}
              <div className="relative">
                <textarea
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder={`Apa yang sedang Anda pikirkan tentang budaya hari ini, ${userName.split(' ')[0]}? Tulis kisah, opini, atau informasi tradisi Anda di sini...`}
                  rows={6}
                  className="w-full text-base sm:text-lg text-slate-800 placeholder-slate-300 border-none outline-none resize-none bg-transparent focus:ring-0 leading-relaxed font-normal"
                  autoFocus
                />
              </div>

              {/* Location Input if enabled */}
              {showLocationInput && (
                <div className="flex items-center gap-2.5 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 animate-in fade-in">
                  <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <input
                    type="text"
                    value={postLocation}
                    onChange={(e) => setPostLocation(e.target.value)}
                    placeholder="Tambah lokasi budaya (misal: Kraton Surakarta, Jawa Tengah)..."
                    className="w-full text-xs sm:text-sm text-slate-800 bg-transparent outline-none placeholder-slate-400"
                  />
                  {postLocation && (
                    <button 
                      type="button" 
                      onClick={() => setPostLocation('')}
                      className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}

              {/* Hidden File Input */}
              <input
                type="file"
                ref={postFileInputRef}
                onChange={handlePostImageChange}
                accept="image/*"
                multiple
                className="hidden"
              />

              {/* Images Preview Grid */}
              {postImages.length > 0 && (
                <div className={`grid gap-3 rounded-2xl overflow-hidden border border-slate-200 p-2 bg-slate-50 ${postImages.length === 1 ? 'grid-cols-1' : postImages.length === 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}>
                  {postImages.map((img, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden bg-slate-200 aspect-video max-h-64 shadow-xs">
                      <img src={img} alt={`Unggahan ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePostImage(idx)}
                        className="absolute top-2.5 right-2.5 p-1.5 bg-slate-900/80 hover:bg-rose-600 text-white rounded-full transition-colors shadow-sm"
                        title="Hapus foto"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {postImages.length < 4 && (
                    <button
                      type="button"
                      onClick={() => postFileInputRef.current?.click()}
                      className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-4 text-slate-500 hover:text-blue-600 transition-colors aspect-video max-h-64 bg-white"
                    >
                      <Upload className="w-6 h-6 mb-1.5 text-slate-400" />
                      <span className="text-xs font-semibold">Tambah Foto Lagi</span>
                    </button>
                  )}
                </div>
              )}

              {/* Media & Tag Toolbar Box */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-semibold text-slate-700">Lampirkan ke Postingan:</span>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => postFileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 active:scale-95 transition-all text-xs font-medium"
                    title="Foto / Gambar"
                  >
                    <ImageIcon className="w-4 h-4 text-emerald-600" />
                    <span>Foto / Media</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLocationInput(!showLocationInput)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg active:scale-95 transition-all text-xs font-medium ${showLocationInput ? 'bg-rose-100 text-rose-700' : 'bg-rose-50 text-rose-600 hover:bg-rose-100/80'}`}
                    title="Lokasi Budaya"
                  >
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span>Lokasi</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const tags = prompt('Masukkan tag budaya (misal: #Batik #Wayang):', '#BudayaNusantara');
                      if (tags) {
                        setPostText(prev => prev ? `${prev} ${tags}` : tags);
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100/80 active:scale-95 transition-all text-xs font-medium"
                    title="Tagar Budaya"
                  >
                    <Tag className="w-4 h-4 text-blue-600" />
                    <span>Tagar</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPostText(prev => prev + ' 🌿');
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-amber-700 bg-amber-50 hover:bg-amber-100/80 active:scale-95 transition-all text-xs font-medium"
                    title="Emoji Budaya"
                  >
                    <Smile className="w-4 h-4 text-amber-500" />
                    <span>Emoji</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Action Footer for Post */}
            <div className="max-w-4xl mx-auto w-full pt-4 flex items-center justify-between border-t border-slate-200/60 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={!isPostValid || isSubmitting}
                onClick={handlePublish}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-blue-700 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-xs"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Menerbitkan postingan...</span>
                  </>
                ) : (
                  <span>Kirim Postingan</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 1: TAMBAH FOTO GALERI (Full-page Canvas Layout)      */}
        {/* ========================================================= */}
        {activeTab === 'gallery' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50/50 flex flex-col justify-between">
            <div className="max-w-4xl mx-auto w-full bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-7 lg:p-8 space-y-6">
              {/* Header subtitle */}
              <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Dokumentasi Foto Budaya</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Unggah foto karya seni atau artefak warisan budaya Nusantara ke galeri publik.</p>
                </div>
              </div>

              {/* 2-Column Responsive Layout: Left Media Canvas, Right Meta Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Left Column: Image Dropzone / Preview */}
                <div className="md:col-span-5 flex flex-col">
                  <input
                    type="file"
                    ref={galleryFileInputRef}
                    onChange={(e) => handleFileChange(e, 'gallery')}
                    accept="image/*"
                    className="hidden"
                  />

                  {galleryImage ? (
                    <div className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-[3/4] max-h-[380px] sm:max-h-[460px] flex items-center justify-center shadow-xs">
                      <img
                        src={galleryImage}
                        alt="Preview Pin"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => galleryFileInputRef.current?.click()}
                          className="px-3.5 py-1.5 bg-white text-slate-900 text-xs font-semibold rounded-xl shadow-lg hover:bg-slate-100 active:scale-95 transition-all"
                        >
                          Ganti Foto
                        </button>
                        <button
                          type="button"
                          onClick={() => setGalleryImage(null)}
                          className="p-1.5 bg-rose-600 text-white rounded-xl shadow-lg hover:bg-rose-700 active:scale-95 transition-all"
                          title="Hapus"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => galleryFileInputRef.current?.click()}
                      onDragOver={(e) => { e.preventDefault(); setIsDraggingGallery(true); }}
                      onDragLeave={() => setIsDraggingGallery(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDraggingGallery(false);
                        const file = e.dataTransfer.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setGalleryImage(reader.result as string);
                          reader.readAsDataURL(file);
                        }
                      }}
                      className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-all aspect-[4/3] sm:aspect-[3/4] max-h-[300px] sm:max-h-[460px] bg-slate-50/70 ${
                        isDraggingGallery 
                          ? 'border-blue-500 bg-blue-50/50' 
                          : 'border-slate-300 hover:border-blue-400 hover:bg-slate-100/60'
                      }`}
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-xs border border-slate-200/80 flex items-center justify-center text-blue-600 mb-3 group-hover:scale-105 transition-transform">
                        <UploadCloud className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <p className="font-semibold text-slate-800 text-xs sm:text-sm mb-1">
                        Pilih foto atau seret ke sini
                      </p>
                      <p className="text-[11px] sm:text-xs text-slate-400 max-w-[220px] leading-relaxed mb-3 sm:mb-4">
                        Format JPG, PNG, WEBP resolusi tinggi
                      </p>
                      <span className="px-4 py-2 bg-white text-slate-700 text-xs font-semibold rounded-xl border border-slate-200/80 shadow-xs hover:bg-slate-50 active:scale-95 transition-all">
                        Jelajahi File
                      </span>
                    </div>
                  )}
                </div>

                {/* Right Column: Title, Caption, Category & Tags */}
                <div className="md:col-span-7 flex flex-col space-y-4">
                  {/* User identity mini badge */}
                  <div className="flex items-center gap-2.5 pb-1">
                    <img src={userAvatar} alt={userName} className="w-9 h-9 rounded-full object-cover border border-slate-200 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 leading-tight">{userName}</p>
                      <p className="text-[11px] text-slate-400">Papan Galeri Budaya Publik</p>
                    </div>
                  </div>

                  {/* Judul Galeri */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Judul Foto / Karya
                    </label>
                    <input
                      type="text"
                      value={galleryTitle}
                      onChange={(e) => setGalleryTitle(e.target.value)}
                      placeholder="Tambahkan judul foto..."
                      className="w-full text-base sm:text-xl font-bold text-slate-900 placeholder-slate-300 border-b-2 border-slate-200 focus:border-blue-600 outline-none pb-2 transition-colors bg-transparent"
                    />
                  </div>

                  {/* Caption Deskripsi */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Keterangan / Caption
                    </label>
                    <textarea
                      value={galleryCaption}
                      onChange={(e) => {
                        setGalleryCaption(e.target.value);
                        e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight + 'px';
                      }}
                      placeholder="Jelaskan detail karya, makna filosofis motif, nama seniman atau lokasi dokumentasi ini..."
                      rows={1}
                      className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 border-b-2 border-slate-200 focus:border-blue-600 outline-none pb-2 transition-colors bg-transparent resize-none overflow-hidden"
                    />
                    <div className="flex justify-between items-center mt-1 text-[10px] sm:text-[11px] text-slate-400">
                      <span>Gunakan deskripsi yang informatif.</span>
                      <span>{galleryCaption.length} karakter</span>
                    </div>
                  </div>

                  {/* Kategori Budaya & Tag */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Kategori Galeri
                      </label>
                      <select
                        value={galleryCategory}
                        onChange={(e) => setGalleryCategory(e.target.value)}
                        className="w-full text-xs sm:text-sm font-medium text-slate-800 border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-2xs"
                      >
                        <option value="Seni Kriya">Seni Kriya & Kerajinan</option>
                        <option value="Batik & Tenun">Batik & Tenun Nusantara</option>
                        <option value="Arsitektur Tradisional">Arsitektur Tradisional</option>
                        <option value="Tari & Pertunjukan">Tari & Pertunjukan</option>
                        <option value="Senjata Tradisional">Senjata & Pusaka</option>
                        <option value="Kuliner Nusantara">Kuliner Nusantara</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Hashtag / Label
                      </label>
                      <div className="relative">
                        <Hash className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={galleryTags}
                          onChange={(e) => setGalleryTags(e.target.value)}
                          placeholder="batik wayang nusantara"
                          className="w-full text-xs sm:text-sm text-slate-800 pl-8 pr-3 py-2.5 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-2xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Footer for Gallery */}
            <div className="max-w-4xl mx-auto w-full pt-4 flex items-center justify-between border-t border-slate-200/60 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handlePublish}
                disabled={!isGalleryValid || isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-blue-700 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-xs"
              >
                {isSubmitting ? 'Menerbitkan...' : 'Simpan & Publikasikan Foto'}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: TAMBAH ARTIKEL (WordPress Gutenberg Editor Layout) */}
        {/* ========================================================= */}
        {activeTab === 'article' && (
          <div className="flex-1 overflow-hidden flex flex-col bg-white">
            {/* Hidden Input for inserting images inside article body */}
            <input
              type="file"
              ref={articleInlineImageInputRef}
              onChange={handleInsertInlineImage}
              accept="image/*"
              className="hidden"
            />

            {/* Hidden Input for Featured Cover Image */}
            <input
              type="file"
              ref={articleCoverInputRef}
              onChange={(e) => handleFileChange(e, 'article')}
              accept="image/*"
              className="hidden"
            />

            {/* WordPress Gutenberg Top Secondary Toolbar */}
            <div className="px-3 sm:px-6 py-2 border-b border-slate-200/80 bg-slate-50/90 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-xs flex-shrink-0">
              {/* Gutenberg Text Tools */}
              <div className="flex items-center gap-1 text-slate-600 overflow-x-auto scrollbar-none py-1 max-w-full">
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); applyFormatting('h1'); }}
                  className="px-2 py-1 hover:bg-slate-200 active:bg-blue-100 rounded text-slate-700 font-bold transition-colors"
                  title="Heading 1"
                >
                  <Heading1 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); applyFormatting('h2'); }}
                  className="px-2 py-1 hover:bg-slate-200 active:bg-blue-100 rounded text-slate-700 font-bold transition-colors"
                  title="Heading 2"
                >
                  <Heading2 className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-slate-300 mx-1 flex-shrink-0" />
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); applyFormatting('bold'); }}
                  className="p-1.5 hover:bg-slate-200 active:bg-blue-100 rounded text-slate-700 transition-colors"
                  title="Tebal (Ctrl+B)"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); applyFormatting('italic'); }}
                  className="p-1.5 hover:bg-slate-200 active:bg-blue-100 rounded text-slate-700 transition-colors"
                  title="Miring (Ctrl+I)"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); applyFormatting('quote'); }}
                  className="p-1.5 hover:bg-slate-200 active:bg-blue-100 rounded text-slate-700 transition-colors"
                  title="Kutipan (Quote)"
                >
                  <Quote className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); applyFormatting('list'); }}
                  className="p-1.5 hover:bg-slate-200 active:bg-blue-100 rounded text-slate-700 transition-colors"
                  title="Daftar List"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); applyFormatting('link'); }}
                  className="p-1.5 hover:bg-slate-200 active:bg-blue-100 rounded text-slate-700 transition-colors"
                  title="Sisipkan Tautan"
                >
                  <Link2 className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-slate-300 mx-1 flex-shrink-0" />
                <button
                  type="button"
                  onClick={() => articleInlineImageInputRef.current?.click()}
                  className="p-1.5 hover:bg-slate-200 active:bg-blue-100 rounded text-slate-700 transition-colors"
                  title="Sisipkan Gambar"
                >
                  <ImageIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Toggle Sidebar & Action */}
              <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
                <button
                  type="button"
                  onClick={() => setIsArticlePublishSidebarOpen(!isArticlePublishSidebarOpen)}
                  className={`p-1.5 rounded-lg border transition-all ${
                    isArticlePublishSidebarOpen 
                      ? 'bg-blue-50 text-blue-700 border-blue-200' 
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                  title={isArticlePublishSidebarOpen ? 'Sembunyikan Pengaturan Post' : 'Buka Pengaturan Post'}
                  aria-label="Pengaturan Post"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={!isArticleValid || isSubmitting}
                  className="px-4 sm:px-5 py-1.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-xs text-xs"
                >
                  {isSubmitting ? 'Menerbitkan...' : 'Terbitkan Artikel'}
                </button>
              </div>
            </div>

            {/* Split Screen: Left Writing Canvas, Right Document Inspector */}
            <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
              {/* Left Canvas: Cover, Title, Narration Gutenberg Canvas */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 flex flex-col items-center">
                <div className="max-w-3xl w-full space-y-6">
                  {/* Judul Artikel (Headline Gutenberg) */}
                  <div>
                    <textarea
                      value={articleTitle}
                      onChange={(e) => setArticleTitle(e.target.value)}
                      placeholder="Tambahkan judul artikel..."
                      rows={2}
                      className="w-full text-2xl sm:text-4xl font-extrabold text-slate-900 placeholder-slate-300 resize-none focus:outline-none border-b border-transparent focus:border-blue-500 pb-2 transition-colors leading-tight"
                      autoFocus
                    />
                  </div>

                  {/* Narasi / Isi Artikel Gutenberg Block (Rich Text WYSIWYG) */}
                  <div className="relative w-full">
                    <div
                      ref={articleContentEditableRef}
                      contentEditable
                      suppressContentEditableWarning
                      onInput={(e) => {
                        const html = e.currentTarget.innerHTML;
                        const text = e.currentTarget.innerText;
                        setArticleNarrative(text.trim() ? html : '');
                      }}
                      onKeyDown={handleEditorKeyDown}
                      data-placeholder="Mulai menulis narasi budaya di sini... Gunakan Ctrl+B untuk tebal, Ctrl+I untuk miring, atau tombol toolbar di atas."
                      className="w-full text-slate-800 text-base sm:text-lg leading-relaxed focus:outline-none min-h-[380px] font-sans article-rich-editor empty:before:content-[attr(data-placeholder)] empty:before:text-slate-300 empty:before:cursor-text"
                    />
                  </div>
                </div>
              </div>

              {/* Right Sidebar: WordPress Document Settings / Panel Kategori & Ringkasan */}
              {isArticlePublishSidebarOpen && (
                <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-slate-200/80 bg-slate-50/60 p-4 sm:p-5 overflow-y-auto space-y-5 flex-shrink-0 animate-in fade-in duration-150">
                  {/* Gambar Sampul (Featured Image) - Di sebelah kiri atas dokumen post */}
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Gambar Sampul Artikel
                    </span>
                    {articleCover ? (
                      <div className="relative group rounded-xl overflow-hidden border border-slate-200 max-h-[180px] w-full bg-slate-100">
                        <img
                          src={articleCover}
                          alt="Sampul Artikel"
                          className="w-full h-36 object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => articleCoverInputRef.current?.click()}
                            className="px-2.5 py-1 bg-white text-slate-900 text-xs font-semibold rounded-lg shadow-md hover:bg-slate-100 transition-colors"
                          >
                            Ganti Sampul
                          </button>
                          <button
                            type="button"
                            onClick={() => setArticleCover(null)}
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
                        onClick={() => articleCoverInputRef.current?.click()}
                        className="w-full py-4 px-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-500 bg-white hover:bg-blue-50/30 flex flex-col items-center justify-center gap-1.5 text-xs font-medium text-slate-600 transition-colors group cursor-pointer"
                      >
                        <ImageIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                        <span className="font-semibold text-slate-700">Unggah Gambar Sampul</span>
                        <span className="text-[10px] text-slate-400">Pilih foto rasio landscape</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Dokumen Post</span>
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
                      <span className="font-semibold text-slate-800">{articleReadingTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>Penulis</span>
                      <span className="font-semibold text-slate-800 truncate max-w-[120px]">{userName}</span>
                    </div>
                  </div>

                  <hr className="border-slate-200" />

                  {/* Kategori Artikel */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Kategori Artikel
                    </label>
                    <select
                      value={articleCategory}
                      onChange={(e) => setArticleCategory(e.target.value)}
                      className="w-full text-xs font-medium text-slate-800 border border-slate-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Tradisi & Upacara">Tradisi & Upacara Adat</option>
                      <option value="Kajian & Naskah Kuno">Kajian & Naskah Kuno</option>
                      <option value="Profil Tokoh & Maestro">Profil Maestro Budaya</option>
                      <option value="Kisah Legenda & Mitos">Kisah Legenda & Mitologi</option>
                      <option value="Eksplorasi Wastra">Eksplorasi Wastra & Motif</option>
                    </select>
                  </div>

                  {/* Ringkasan / Kutipan (WordPress Excerpt) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Kutipan Ringkas (Excerpt)
                    </label>
                    <textarea
                      value={articleExcerpt}
                      onChange={(e) => setArticleExcerpt(e.target.value)}
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

        {/* Success Toast */}
        {showSuccessToast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Karya budaya berhasil diterbitkan!</span>
          </div>
        )}
      </div>
    </div>
  );
}
