import { Camera, Smile, Video } from 'lucide-react';

export default function PostComposer() {
  return (
    <div className="card p-0 mb-4">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <img 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" 
          alt="Your avatar" 
          className="w-10 h-10 rounded-full object-cover" 
        />
        <button className="flex-1 text-left bg-gray hover:bg-gray-100 transition-colors rounded-full px-4 py-3 text-tertiary">
          Where you at? What are you doing? What's your number? Share it!
        </button>
      </div>

      {/* Actions */}
      <div className="border-t border-gray p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-6 h-6 bg-red-500 rounded-lg flex items-center justify-center">
                <Camera className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-secondary">Photo/Video Album</span>
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-6 h-6 bg-red-500 rounded-lg flex items-center justify-center">
                <Video className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-secondary">Live Video</span>
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                <Smile className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-secondary">Feeling/Activity</span>
            </button>
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-tertiary rounded-full"></div>
              <div className="w-1 h-1 bg-tertiary rounded-full"></div>
              <div className="w-1 h-1 bg-tertiary rounded-full"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
