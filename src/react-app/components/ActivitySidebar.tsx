// Activity sidebar component

const activities = [
  {
    user: {
      name: 'Deraa',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      action: 'started following you',
      time: '5m'
    }
  },
  {
    user: {
      name: 'Ediwp',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      action: 'liked your photo',
      time: '30m',
      image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=100&h=100&fit=crop'
    }
  },
  {
    user: {
      name: 'Praho',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      action: 'liked your photo',
      time: '1h',
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=100&h=100&fit=crop'
    }
  },
  {
    user: {
      name: 'Praho',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      action: 'liked your photo',
      time: '1h',
      image: 'https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=100&h=100&fit=crop'
    }
  }
];

const suggestions = [
  {
    name: 'Najid',
    subtitle: 'Followed by Dms',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  },
  {
    name: 'Sheila Dara',
    subtitle: 'Suggested for you',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
  },
  {
    name: 'Divaurey',
    subtitle: 'Suggested for you',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop'
  },
  {
    name: 'Jhonson',
    subtitle: 'Followed by Andrea',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  }
];

export default function ActivitySidebar() {
  return (
    <div className="sticky top-[68px] space-y-3">
      {/* Activity Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-gray-900 text-sm">Activity</h4>
          <button className="text-xs text-gray-500 hover:text-gray-700">
            See all
          </button>
        </div>

        <div className="space-y-2.5">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-2.5">
              <img
                src={activity.user.avatar}
                alt={activity.user.name}
                className="w-9 h-9 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-900 leading-tight">
                  <span className="font-semibold">{activity.user.name}</span>{' '}
                  <span className="text-gray-500">{activity.user.action}</span>
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">{activity.user.time}</p>
              </div>
              {activity.user.image && (
                <img
                  src={activity.user.image}
                  alt="Post"
                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                />
              )}
              {activity.user.action === 'started following you' && (
                <button className="px-2.5 py-1 bg-blue-600 text-white text-[10px] font-medium rounded-md hover:bg-blue-700 transition-colors flex-shrink-0">
                  Follow
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Yesterday Section */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-[10px] font-semibold text-gray-500 mb-2">Yesterday</p>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                alt="User"
                className="w-9 h-9 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-900 leading-tight">
                  <span className="font-semibold">Praho</span>{' '}
                  <span className="text-gray-500">liked your photo</span>
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">1d</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=100&h=100&fit=crop"
                alt="Post"
                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
              />
            </div>
            <div className="flex items-center gap-2.5">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                alt="User"
                className="w-9 h-9 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-900 leading-tight">
                  <span className="font-semibold">Praho</span>{' '}
                  <span className="text-gray-500">liked your photo</span>
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">1d</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1610464882336-5ffb76ce9b18?w=100&h=100&fit=crop"
                alt="Post"
                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Suggested For You Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-gray-900 text-sm">Suggested For you</h4>
          <button className="text-xs text-gray-500 hover:text-gray-700">
            See all
          </button>
        </div>

        <div className="space-y-2.5">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-center gap-2.5">
              <img
                src={suggestion.avatar}
                alt={suggestion.name}
                className="w-9 h-9 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900">
                  {suggestion.name}
                </p>
                <p className="text-[10px] text-gray-500">{suggestion.subtitle}</p>
              </div>
              <button className="px-2.5 py-1 text-[10px] font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors flex-shrink-0">
                {index === 0 || index === 1 ? 'Followed' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
