import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import RightPanel from './RightPanel';
import TopBar from './TopBar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Top Bar - Fixed */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      </div>
      
      <div className="main-layout pt-14">
        {/* Left Sidebar */}
        <aside className={`sidebar-left ${sidebarOpen ? 'open' : ''}`}>
          <Sidebar 
            onClose={() => setSidebarOpen(false)} 
          />
        </aside>
        
        {/* Main Content */}
        <main className="main-content">
          <div className="feed-container">
            {children}
          </div>
        </main>
        
        {/* Right Sidebar - Hidden on mobile */}
        <aside className="sidebar-right">
          <RightPanel />
        </aside>
      </div>
    </div>
  );
}
