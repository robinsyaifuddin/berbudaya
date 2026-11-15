import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';

interface PostCardProps {
  author: {
    name: string;
    role: string;
    avatar: string;
    location: string;
    timestamp: string;
    isSponsored?: boolean;
  };
  content: string;
  image?: string;
}

export default function PostCard({ author, content, image }: PostCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-0 mb-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between p-3.5 sm:p-4">
        <div className="flex items-center gap-3">
          <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full object-cover border border-slate-100 shadow-xs" />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-slate-900 text-sm">{author.name}</h4>
              <span className="text-xs text-slate-500">• {author.role}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
              <span>{author.location}</span>
              <span>•</span>
              <span>{author.timestamp}</span>
            </div>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-lg hover:bg-slate-50">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-slate-800 text-sm leading-relaxed">{content}</p>
      </div>

      {/* Image */}
      {image && (
        <div className="overflow-hidden bg-slate-100">
          <img src={image} alt="Karya Budaya" className="w-full h-auto max-h-[500px] object-cover" />
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-4 py-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            <div className="w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center border border-white">
              <Heart className="w-2.5 h-2.5 text-white fill-current" />
            </div>
          </div>
          <span className="text-[11px] text-slate-500">Apresiasi 28 kreator budaya</span>
        </div>
        <span className="text-[11px] text-slate-400">12 tanggapan</span>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-3 gap-1 px-3 py-1.5 bg-slate-50/50">
        <button className="flex items-center justify-center gap-2 py-2 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-white text-xs font-medium transition-all group">
          <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Apresiasi</span>
        </button>
        
        <button className="flex items-center justify-center gap-2 py-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-white text-xs font-medium transition-all group">
          <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Tanggapi</span>
        </button>
        
        <button className="flex items-center justify-center gap-2 py-2 rounded-xl text-slate-600 hover:text-emerald-600 hover:bg-white text-xs font-medium transition-all group">
          <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Bagikan</span>
        </button>
      </div>

      {/* Comment Section */}
      <div className="border-t border-slate-100 p-3 sm:p-4 bg-slate-50/20">
        <div className="flex items-center gap-3">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" 
            alt="Your avatar" 
            className="w-8 h-8 rounded-full object-cover border border-slate-100 shadow-xs" 
          />
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Tulis apresiasi atau diskusi..."
              className="w-full pl-3.5 pr-10 py-2 bg-white rounded-full border border-slate-200 focus:outline-none focus:border-blue-600 transition-all text-xs text-slate-800 placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
