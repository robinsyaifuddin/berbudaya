import ModernLayout from '@/react-app/components/ModernLayout';
import { Search, Send, Smile, Paperclip, MoreVertical } from 'lucide-react';

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
  return (
    <ModernLayout showLeftSidebar={false} showRightSidebar={false}>
      <div className="flex h-screen">
        {/* Chat List */}
        <div className="w-80 border-r border-warm-gray/30 bg-white flex flex-col">
          <div className="p-4 border-b border-warm-gray/30">
            <h1 className="text-2xl font-bold font-playfair text-dark-brown mb-4">
              Pesan
            </h1>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari pesan..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-blue-600/50"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`p-4 border-b border-warm-gray/30 cursor-pointer transition-all ${
                  chat.id === 1 ? 'bg-warm-gray/20' : 'hover:bg-warm-gray/10'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h4 className="font-semibold text-dark-brown text-sm">
                          {chat.name}
                        </h4>
                        <p className="text-xs text-gray-500">{chat.role}</p>
                      </div>
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate flex-1">
                        {chat.lastMessage}
                      </p>
                      {chat.unread > 0 && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full ml-2">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-warm-gray/30">
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
              Mulai Obrolan Baru
            </button>
          </div>
        </div>
        
        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-cream">
          {/* Chat Header */}
          <div className="bg-white border-b border-warm-gray/30 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={chats[0].avatar}
                    alt={chats[0].name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark-brown">{chats[0].name}</h3>
                  <p className="text-xs text-gray-500">{chats[0].role}</p>
                </div>
              </div>
              
              <button className="p-2 hover:bg-warm-gray/50 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {currentMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md px-4 py-3 rounded-2xl ${
                    message.sender === 'me'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                      : 'bg-white border border-warm-gray/30'
                  }`}
                >
                  <p className={message.sender === 'me' ? 'text-white' : 'text-dark-brown'}>
                    {message.text}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'me' ? 'text-white/70' : 'text-gray-500'
                    }`}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Message Input */}
          <div className="bg-white border-t border-warm-gray/30 p-4">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-warm-gray/50 rounded-lg transition-colors">
                <Paperclip className="w-5 h-5 text-gray-600" />
              </button>
              
              <input
                type="text"
                placeholder="Tulis pesan..."
                className="flex-1 px-4 py-3 rounded-xl border border-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-blue-600/50"
              />
              
              <button className="p-2 hover:bg-warm-gray/50 rounded-lg transition-colors">
                <Smile className="w-5 h-5 text-gray-600" />
              </button>
              
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-xl hover:shadow-lg transition-all">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModernLayout>
  );
}
