import { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { Link } from 'react-router';

export interface ChatNotificationData {
  id: number;
  name: string;
  avatar: string;
  message: string;
  time: string;
}

interface ChatNotificationProps {
  notification: ChatNotificationData;
  onClose: (id: number) => void;
  index: number;
}

export function ChatNotification({ notification, onClose, index }: ChatNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);

    // Auto dismiss after 5 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(notification.id);
    }, 300);
  };

  return (
    <div
      className={`fixed right-6 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-w-sm w-80 transition-all duration-300 ease-out z-50 ${
        isVisible && !isLeaving
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0'
      }`}
      style={{
        bottom: `${24 + index * 100}px`,
      }}
    >
      <Link
        to="/pesan"
        className="block hover:bg-gray-50 transition-colors"
        onClick={() => onClose(notification.id)}
      >
        <div className="p-4">
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img
                src={notification.avatar}
                alt={notification.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                <MessageCircle className="w-3 h-3 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <h4 className="font-bold text-gray-900 text-sm truncate">
                  {notification.name}
                </h4>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleClose();
                  }}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0 ml-2"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-1">
                {notification.message}
              </p>
              <span className="text-xs text-gray-400">{notification.time}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Progress bar */}
      <div className="h-1 bg-gray-100 overflow-hidden">
        <div
          className="h-full bg-blue-600 animate-progress"
          style={{
            animation: 'progress 5s linear forwards',
          }}
        />
      </div>

      <style>{`
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        
        .animate-progress {
          width: 100%;
        }
      `}</style>
    </div>
  );
}

interface ChatNotificationsContainerProps {
  notifications: ChatNotificationData[];
  onClose: (id: number) => void;
}

export function ChatNotificationsContainer({
  notifications,
  onClose,
}: ChatNotificationsContainerProps) {
  return (
    <>
      {notifications.map((notification, index) => (
        <ChatNotification
          key={notification.id}
          notification={notification}
          onClose={onClose}
          index={index}
        />
      ))}
    </>
  );
}
