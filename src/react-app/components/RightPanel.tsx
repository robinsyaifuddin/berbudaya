import { MoreHorizontal, Search, Video, Calendar } from 'lucide-react';

const stories = [
  {
    id: 1,
    name: 'Mario',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop'
  },
  {
    id: 2,
    name: 'Ralph',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=300&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop'
  }
];

const contacts = [
  { 
    id: 1, 
    name: 'Francisco Gibbs', 
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop', 
    isOnline: true 
  },
  { 
    id: 2, 
    name: 'Della Garrett', 
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop', 
    isOnline: true 
  },
  { 
    id: 3, 
    name: 'Louis Patrick', 
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop', 
    isOnline: true 
  },
  { 
    id: 4, 
    name: 'Lester Berry', 
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop', 
    isOnline: true 
  },
  { 
    id: 5, 
    name: 'Maude Valdez', 
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop', 
    isOnline: false,
    time: '9m'
  },
  { 
    id: 6, 
    name: 'Cynthia Copeland', 
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop', 
    isOnline: true 
  },
  { 
    id: 7, 
    name: 'Sadie Dawson', 
    avatar: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=50&h=50&fit=crop', 
    isOnline: false,
    time: '32m'
  },
  { 
    id: 8, 
    name: 'Francisco Weber', 
    avatar: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=50&h=50&fit=crop', 
    isOnline: false,
    time: '15m'
  },
  { 
    id: 9, 
    name: 'Eula Osborne', 
    avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=50&h=50&fit=crop', 
    isOnline: true 
  },
  { 
    id: 10, 
    name: 'Essie Bates', 
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=50&h=50&fit=crop', 
    isOnline: true 
  }
];

const groups = [
  {
    id: 1,
    name: 'Z Girls',
    members: 'Lucy, Claire, Sarah',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop'
  },
  {
    id: 2,
    name: 'Elementary School 16',
    members: 'Jason, Romelu, Carlos...',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop'
  }
];

const events = [
  { id: 1, title: '5 Event Invites' },
  { id: 2, title: "Noah Frank's birthday" }
];

const suggestedPages = [
  {
    id: 1,
    name: 'Chili Burgers',
    type: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop'
  }
];

export default function RightPanel() {
  return (
    <div className="space-y-6">
      {/* Stories */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="section-header">Stories</h3>
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal className="w-4 h-4 text-tertiary" />
          </button>
        </div>
        <div className="flex gap-3">
          {stories.map((story) => (
            <div key={story.id} className="story-item">
              <img src={story.image} alt={story.name} />
              <img src={story.avatar} alt={story.name} className="story-avatar" />
              <div className="story-name">{story.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Page */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="section-header">Suggested Page</h3>
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal className="w-4 h-4 text-tertiary" />
          </button>
        </div>
        
        {suggestedPages.map((page) => (
          <div key={page.id} className="card p-0 overflow-hidden">
            <img src={page.image} alt={page.name} className="w-full h-32 object-cover" />
            <div className="p-3">
              <h4 className="font-semibold text-primary mb-1">{page.name}</h4>
              <p className="text-sm text-secondary mb-3">{page.type}</p>
              <button className="w-full btn-primary text-sm">Like Page</button>
            </div>
          </div>
        ))}
      </div>

      {/* Events */}
      <div>
        <div className="space-y-2">
          {events.map((event) => (
            <div key={event.id} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-primary">{event.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contacts */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="section-header">CONTACTS</h3>
          <div className="flex gap-1">
            <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
              <Video className="w-4 h-4 text-tertiary" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-4 h-4 text-tertiary" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
              <MoreHorizontal className="w-4 h-4 text-tertiary" />
            </button>
          </div>
        </div>
        
        <div className="space-y-1">
          {contacts.map((contact) => (
            <div key={contact.id} className="contact-item">
              <div className="contact-avatar">
                <img src={contact.avatar} alt={contact.name} />
                {contact.isOnline && <div className="online-indicator"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-primary text-sm truncate">{contact.name}</h4>
              </div>
              {contact.time && (
                <span className="text-xs text-tertiary">{contact.time}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Groups */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="section-header">GROUPS</h3>
        </div>
        
        <div className="space-y-2">
          {groups.map((group) => (
            <div key={group.id} className="contact-item">
              <img src={group.avatar} alt={group.name} className="w-9 h-9 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-primary text-sm">{group.name}</h4>
                <p className="text-xs text-secondary truncate">{group.members}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <span className="text-sm text-secondary">MORE CONTACTS (50)</span>
        </div>
      </div>
    </div>
  );
}
