import { useState, useEffect } from 'react';
import { X, Send, Smile, Image as ImageIcon } from 'lucide-react';
import { mockStorage } from '@/react-app/lib/mockStorage';

interface Comment {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

interface CommentSectionProps {
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
  userAvatar: string;
  userName: string;
}

export default function CommentSection({ isOpen, onClose, post, userAvatar, userName }: CommentSectionProps) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (post?.id) {
      setComments(mockStorage.getComments(post.id));
    }
  }, [post?.id, isOpen]);

  if (!isOpen) return null;

  const handleSubmitComment = () => {
    if (!comment.trim()) return;

    const added = mockStorage.addComment(post.id, comment.trim(), {
      name: userName,
      avatar: userAvatar
    });

    setComments(prev => [added, ...prev]);
    setComment('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop tap to close */}
      <div 
        className="fixed inset-0 -z-10"
        onClick={onClose}
      />
      
      {/* Container: Fullscreen on mobile, centered card on desktop */}
      <div 
        className="bg-white w-full h-[100dvh] sm:h-auto sm:max-h-[85vh] sm:max-w-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-100 bg-white sticky top-0 z-10 flex-shrink-0">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">Komentar</h3>
          <button
            onClick={onClose}
            className="p-2 -mr-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 active:scale-95 transition-all"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Post Preview */}
        <div className="px-4 sm:px-6 py-3 border-b border-slate-100 bg-slate-50/70 flex-shrink-0">
          <div className="flex items-start gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-9 h-9 rounded-full object-cover flex-shrink-0 border border-slate-200/80"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">{post.author.name}</h4>
              <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-0.5">{post.content}</p>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3.5">
          {comments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-sm">Belum ada tanggapan. Jadilah yang pertama berkomentar!</p>
            </div>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="flex items-start gap-3">
                <img
                  src={c.author.avatar}
                  alt={c.author.name}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover flex-shrink-0 border border-slate-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="bg-slate-50 border border-slate-200/60 rounded-2xl px-3.5 py-2.5">
                    <h5 className="font-semibold text-slate-900 text-xs sm:text-sm">{c.author.name}</h5>
                    <p className="text-xs sm:text-sm text-slate-700 mt-0.5 leading-relaxed break-words">{c.content}</p>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 ml-2">{c.timestamp}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Comment Input */}
        <div className="px-4 sm:px-6 py-3 border-t border-slate-100 bg-white flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <img
              src={userAvatar}
              alt={userName}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover flex-shrink-0 border border-slate-100"
            />
            <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-2xl px-3 py-1.5 focus-within:border-blue-500 focus-within:bg-white transition-all">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tulis komentar Anda..."
                className="w-full bg-transparent resize-none focus:outline-none text-xs sm:text-sm text-slate-800 placeholder-slate-400 max-h-24 py-1"
                rows={1}
              />
              <div className="flex items-center gap-0.5 flex-shrink-0">
                <button type="button" className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                  <Smile className="w-4 h-4" />
                </button>
                <button type="button" className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                  <ImageIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
            <button
              onClick={handleSubmitComment}
              disabled={!comment.trim()}
              className="p-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-xl font-medium text-xs sm:text-sm hover:bg-blue-700 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-1.5 flex-shrink-0 shadow-xs"
              aria-label="Kirim"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Kirim</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
