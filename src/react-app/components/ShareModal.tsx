import { useState } from 'react';
import { X, Link as LinkIcon, Check, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';

interface ShareModalProps {
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

export default function ShareModal({ isOpen, onClose, post }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen) return null;

  const postUrl = `${window.location.origin}/post/${post.id}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(`${post.author.name} - RuangBudaya`);

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
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-in fade-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Bagikan Postingan</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Content Preview */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{post.author.name}</h4>
                  <p className="text-xs text-gray-500">RuangBudaya</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 line-clamp-3">{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="mt-3 rounded-lg w-full h-32 object-cover"
                />
              )}
            </div>
          </div>

          {/* Copy Link */}
          <div className="px-6 py-4">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Salin Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={postUrl}
                readOnly
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleCopyLink}
                className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                  copied
                    ? 'bg-green-600 text-white'
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
          <div className="px-6 py-4 border-t border-gray-200">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Bagikan ke Platform Lain
            </label>
            <div className="grid grid-cols-2 gap-3">
              {shareLinks.map((platform) => {
                const Icon = platform.icon;
                return (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${platform.color} text-white px-4 py-3 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 hover:scale-105`}
                  >
                    <Icon className="w-5 h-5" />
                    {platform.name}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-2xl">
            <p className="text-xs text-gray-500 text-center">
              Bagikan postingan ini dengan teman dan komunitasmu
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
