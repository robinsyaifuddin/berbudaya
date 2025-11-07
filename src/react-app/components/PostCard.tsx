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
    <div className="card p-0 mb-4">
      {/* Header */}
      <div className="flex items-start justify-between p-4">
        <div className="flex items-center gap-3">
          <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-primary text-sm">{author.name}</h4>
              <span className="text-xs text-secondary">is feeling excited 😃 with {author.role}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-tertiary mt-1">
              <span>{author.timestamp}</span>
            </div>
          </div>
        </div>
        <button className="text-tertiary hover:text-secondary transition-colors p-1 rounded hover:bg-gray-100">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-primary text-sm leading-relaxed">{content}</p>
      </div>

      {/* Image */}
      {image && (
        <div>
          <img src={image} alt="Post" className="w-full h-auto object-cover" />
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-tertiary px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="flex -space-x-1">
              <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center border border-white">
                <Heart className="w-2.5 h-2.5 text-white fill-current" />
              </div>
              <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center border border-white">
                <span className="text-xs">😂</span>
              </div>
            </div>
            <span className="ml-1">Ryan Reynolds, Eula Reyes and 25 others</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="post-actions">
        <button className="post-action group">
          <Heart className="w-5 h-5 group-hover:text-red-500 transition-colors" />
          <span>Like</span>
        </button>
        
        <button className="post-action group">
          <MessageCircle className="w-5 h-5 group-hover:text-primary transition-colors" />
          <span>Comment</span>
        </button>
        
        <button className="post-action group">
          <Share2 className="w-5 h-5 group-hover:text-primary transition-colors" />
          <span>Share</span>
        </button>
      </div>

      {/* Comment Section */}
      <div className="border-t border-gray p-4">
        <div className="flex items-center gap-3">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" 
            alt="Your avatar" 
            className="w-8 h-8 rounded-full object-cover" 
          />
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Write a comment..."
              className="w-full px-4 py-2 bg-gray rounded-full focus:outline-none focus:bg-white focus:border border-primary transition-all text-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button className="text-tertiary hover:text-secondary">😊</button>
              <button className="text-tertiary hover:text-secondary">📷</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
