import { useState } from 'react';
import { X, Send, Smile, Image as ImageIcon } from 'lucide-react';

interface Comment {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

interface CommentModalProps {
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

export default function CommentModal({ isOpen, onClose, post, userAvatar, userName }: CommentModalProps) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: {
        name: 'Dewi Lestari',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
      },
      content: 'Wah keren sekali! Semangat terus berkarya 🎨',
      timestamp: '2 jam yang lalu'
    },
    {
      id: 2,
      author: {
        name: 'Budi Santoso',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
      },
      content: 'Inspiratif! Terima kasih sudah berbagi 🙏',
      timestamp: '1 jam yang lalu'
    }
  ]);

  if (!isOpen) return null;

  const handleSubmitComment = () => {
    if (!comment.trim()) return;

    const newComment: Comment = {
      id: comments.length + 1,
      author: {
        name: userName,
        avatar: userAvatar
      },
      content: comment,
      timestamp: 'Baru saja'
    };

    setComments([newComment, ...comments]);
    setComment('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

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
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Komentar</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Post Preview */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-start gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-sm">{post.author.name}</h4>
                <p className="text-sm text-gray-700 line-clamp-2 mt-1">{post.content}</p>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {comments.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Belum ada komentar. Jadilah yang pertama!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((c) => (
                  <div key={c.id} className="flex items-start gap-3">
                    <img
                      src={c.author.avatar}
                      alt={c.author.name}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-2xl px-4 py-3">
                        <h5 className="font-semibold text-gray-900 text-sm">{c.author.name}</h5>
                        <p className="text-sm text-gray-700 mt-1">{c.content}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 ml-4">{c.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Comment Input */}
          <div className="px-6 py-4 border-t border-gray-200 bg-white">
            <div className="flex items-start gap-3">
              <img
                src={userAvatar}
                alt={userName}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="relative">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Tulis komentar..."
                    className="w-full px-4 py-3 pr-24 bg-gray-100 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    rows={1}
                  />
                  <div className="absolute right-2 bottom-2 flex items-center gap-1">
                    <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                      <Smile className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                      <ImageIcon className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-end mt-2">
                  <button
                    onClick={handleSubmitComment}
                    disabled={!comment.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold text-sm hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Kirim
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
