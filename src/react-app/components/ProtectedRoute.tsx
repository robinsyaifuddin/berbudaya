import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';

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
    // Loading state: hanya putaran spinner bersih dan minimalis
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-stone-200 border-t-[#C45A34] rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to landing page if not authenticated
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
