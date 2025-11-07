import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { Globe } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Cek localStorage untuk user yang sudah login
        const demoUser = localStorage.getItem('demo_user');
        if (demoUser) {
          setIsAuthenticated(true);
          return;
        }

        // Cek backend authentication (jika menggunakan backend)
        try {
          const response = await fetch('/api/auth/status', {
            credentials: 'include',
          });
          
          if (response.ok) {
            const data = await response.json();
            setIsAuthenticated(data.authenticated);
            return;
          }
        } catch (backendError) {
          // Backend belum tersedia atau error, lanjut ke pengecekan lokal
          console.log('Backend auth check unavailable, checking local only');
        }

        // Jika tidak ada user yang login, set ke false
        setIsAuthenticated(false);
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // Loading state
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Globe className="h-12 w-12 text-blue-600 mr-3 animate-spin" />
            <span className="text-3xl font-bold text-gray-900">RuangBudaya.id</span>
          </div>
          <h2 className="text-xl text-gray-600 mb-4">Memuat...</h2>
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to landing page if not authenticated
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
