import { useState } from 'react';
import { X, Link as LinkIcon, Check, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    id: number;
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    image?: string;
  };
}

export default function ShareDialog({ isOpen, onClose, post }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen) return null;

  const postUrl = `${window.location.origin}/post/${post.id}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(`${post.author.name} - Berbudaya`);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-600 hover:bg-green-700',
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop tap to close */}
      <div 
        className="fixed inset-0 -z-10"
        onClick={onClose}
      />
      
      {/* Container: Fullscreen on mobile, centered card on desktop */}
      <div 
        className="bg-white w-full h-[100dvh] sm:h-auto sm:max-h-[85vh] sm:max-w-lg sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-100 bg-white sticky top-0 z-10 flex-shrink-0">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">Bagikan Postingan</h3>
          <button
            onClick={onClose}
            className="p-2 -mr-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 active:scale-95 transition-all"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Content Preview */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 sm:p-4">
            <div className="flex items-center gap-2.5 mb-2.5">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-9 h-9 rounded-full object-cover border border-slate-200/60"
              />
              <div className="min-w-0">
                <h4 className="font-semibold text-slate-900 text-xs sm:text-sm truncate">{post.author.name}</h4>
                <p className="text-[11px] text-slate-500">Ruang Budaya</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 line-clamp-2 leading-relaxed">{post.content}</p>
            {post.image && (
              <img
                src={post.image}
                alt="Post"
                className="mt-3 rounded-lg w-full h-36 object-cover border border-slate-200/60"
              />
            )}
          </div>

          {/* Copy Link */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Tautan Langsung
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={postUrl}
                readOnly
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className={`px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all flex items-center gap-1.5 flex-shrink-0 active:scale-95 shadow-xs ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Tersalin
                  </>
                ) : (
                  <>
                    <LinkIcon className="w-4 h-4" />
                    Salin
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Media Share */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wider">
              Bagikan ke Platform
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {shareLinks.map((platform) => {
                const Icon = platform.icon;
                return (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${platform.color} text-white px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 active:scale-98 shadow-xs`}
                  >
                    <Icon className="w-4 h-4" />
                    {platform.name}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 bg-slate-50 border-t border-slate-100 flex-shrink-0">
          <p className="text-xs text-slate-500 text-center">
            Bagikan ke teman dan komunitas pecinta budaya Nusantara
          </p>
        </div>
      </div>
    </div>
  );
}
