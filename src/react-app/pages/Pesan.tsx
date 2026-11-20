import ModernLayout from '@/react-app/components/ModernLayout';
import { Search, Send, Smile, Paperclip, MoreVertical, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const chats = [
  {
    id: 1,
    name: 'Dewi Lestari',
    role: 'Pengrajin Batik',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    lastMessage: 'Terima kasih sudah tertarik dengan produk batik saya!',
    time: '10:30',
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: 'Bambang Supriyanto',
    role: 'Dalang Wayang',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    lastMessage: 'Pertunjukan wayang besok dimulai jam 19:00',
    time: '09:15',
    unread: 0,
    online: false
  },
  {
    id: 3,
    name: 'Siti Rahma',
    role: 'Penari Saman',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    lastMessage: 'Boleh, kita bisa kolaborasi untuk festival nanti',
    time: 'Kemarin',
    unread: 0,
    online: true
  },
  {
    id: 4,
    name: 'Agus Setiawan',
    role: 'Pengrajin Keris',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    lastMessage: 'Proses pembuatan keris membutuhkan waktu 3 bulan',
    time: 'Kemarin',
    unread: 1,
    online: false
  }
];

const currentMessages = [
  {
    id: 1,
    sender: 'them',
    text: 'Halo! Saya tertarik dengan motif batik parang yang Anda posting kemarin',
    time: '10:25'
  },
  {
    id: 2,
    sender: 'me',
    text: 'Halo! Terima kasih sudah menghubungi. Motif parang itu memang salah satu karya terbaik kami',
    time: '10:27'
  },
  {
    id: 3,
    sender: 'them',
    text: 'Apakah bisa custom ukuran dan warna?',
    time: '10:28'
  },
  {
    id: 4,
    sender: 'me',
    text: 'Tentu bisa! Kami menerima custom order. Untuk ukuran dan warna bisa disesuaikan dengan kebutuhan Anda',
    time: '10:29'
  },
  {
    id: 5,
    sender: 'them',
    text: 'Terima kasih sudah tertarik dengan produk batik saya!',
    time: '10:30'
  }
];

export default function PesanPage() {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(1);
  const activeChat = chats.find(c => c.id === selectedChatId) || chats[0];

  return (
    <ModernLayout showLeftSidebar={false} showRightSidebar={false}>
      <div className="flex h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Chat List Column */}
        <div className={`w-full md:w-80 border-r border-slate-200 bg-white flex flex-col ${
          selectedChatId !== null ? 'hidden md:flex' : 'flex'
        }`}>
          <div className="p-3.5 sm:p-4 border-b border-slate-200">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
              Pesan
            </h1>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari pesan..."
                className="w-full pl-9 pr-3.5 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                className={`p-3.5 border-b border-slate-100 cursor-pointer transition-all ${
                  chat.id === selectedChatId ? 'bg-blue-50/70 border-l-3 border-l-blue-600' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-11 h-11 rounded-full object-cover border border-slate-100"
                    />
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h4 className="font-semibold text-slate-900 text-xs sm:text-sm truncate">
                          {chat.name}
                        </h4>
                        <p className="text-[11px] text-slate-500">{chat.role}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0 ml-1">{chat.time}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-600 truncate flex-1">
                        {chat.lastMessage}
                      </p>
                      {chat.unread > 0 && (
                        <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full ml-1.5 font-bold shrink-0">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat Window Column */}
        <div className={`flex-1 flex flex-col bg-slate-50/60 ${
          selectedChatId === null ? 'hidden md:flex' : 'flex'
        }`}>
          {/* Chat Header */}
          <div className="bg-white border-b border-slate-200 px-3.5 py-2.5 sm:px-4 sm:py-3 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {/* Back button on mobile */}
                <button
                  type="button"
                  onClick={() => setSelectedChatId(null)}
                  className="md:hidden p-1.5 -ml-1 text-slate-600 hover:bg-slate-100 rounded-lg"
                  aria-label="Kembali ke daftar pesan"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="relative shrink-0">
                  <img
                    src={activeChat.avatar}
                    alt={activeChat.name}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-slate-100"
                  />
                  {activeChat.online && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-xs sm:text-sm">{activeChat.name}</h3>
                  <p className="text-[11px] text-slate-500">{activeChat.role}</p>
                </div>
              </div>
              
              <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-500">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3">
            {currentMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-md px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm ${
                    message.sender === 'me'
                      ? 'bg-[#133384] text-white rounded-br-xs'
                      : 'bg-white border border-slate-200/90 text-slate-900 rounded-bl-xs shadow-2xs'
                  }`}
                >
                  <p className={message.sender === 'me' ? 'text-white' : 'text-slate-800'}>
                    {message.text}
                  </p>
                  <p
                    className={`text-[10px] mt-1 text-right ${
                      message.sender === 'me' ? 'text-blue-100/80' : 'text-slate-400'
                    }`}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Message Input */}
          <div className="bg-white border-t border-slate-200 p-2.5 sm:p-3 shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500">
                <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              
              <input
                type="text"
                placeholder="Tulis pesan..."
                className="flex-1 px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600 focus:bg-white bg-slate-50"
              />
              
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 hidden sm:block">
                <Smile className="w-5 h-5" />
              </button>
              
              <button className="bg-[#133384] hover:bg-[#1844A6] text-white p-2 sm:p-2.5 rounded-xl transition-colors shadow-xs shrink-0 active:scale-95">
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModernLayout>
  );
}
