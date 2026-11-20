import { useState, useEffect } from 'react';
import { useAuth } from '@getmocha/users-service/react';
import { ArrowUpRight, Star, Users, Palette, BookOpen, Camera, Search, AlertCircle, Info, Zap, Eye, EyeOff } from 'lucide-react';
import { useNotification } from '@/react-app/contexts/NotificationContext';

export default function Landing() {
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1);
  const [recoveryMethod, setRecoveryMethod] = useState<'email' | 'phone'>('email');
  const [recoveryContact, setRecoveryContact] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [googleEmail, setGoogleEmail] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [landingSearch, setLandingSearch] = useState('');
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { redirectToLogin } = useAuth();
  const { toast, success, error, modalAlert } = useNotification();
  const handleGalleryCTA = () => setShowGalleryModal(true);

  // Scroll Animation for Cultural Ornaments
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(() => {
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }, parseInt(delay as string));
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const ornamentItems = document.querySelectorAll('.ornament-item');
    ornamentItems.forEach(item => observer.observe(item));

    return () => {
      ornamentItems.forEach(item => observer.unobserve(item));
    };
  }, []);

  const handleForgotPasswordClick = () => {
    setAuthMode('forgot');
    setForgotPasswordStep(1);
    setRecoveryContact('');
    setVerificationCode('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSendVerificationCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Generate kode verifikasi 6 digit
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    
    // Simulasi pengiriman kode
    setTimeout(() => {
      setIsLoading(false);
      setForgotPasswordStep(2);
      
      // Tampilkan kode di console untuk testing
      console.log('🔐 Kode Verifikasi:', code);
      modalAlert({
        title: 'Kode Verifikasi Terkirim',
        message: `Kode verifikasi telah dikirim ke ${recoveryContact}\n\nKode: ${code}\n\n(Ini adalah mode simulasi)`,
        buttonText: 'Gunakan Kode'
      });
    }, 1500);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      if (verificationCode === generatedCode) {
        setForgotPasswordStep(3);
      } else {
        error(`Kode verifikasi salah! Coba lagi.\nKode yang benar: ${generatedCode}`, 'Verifikasi Gagal');
      }
    }, 800);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      error('Password tidak cocok! Pastikan kedua password sama.', 'Gagal');
      return;
    }
    
    if (newPassword.length < 6) {
      error('Password minimal 6 karakter!', 'Gagal');
      return;
    }
    
    setIsLoading(true);
    
    // Simulasi update password
    setTimeout(() => {
      // Update password di localStorage jika user ada
      const storedUsers = localStorage.getItem('users_db');
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const userIndex = users.findIndex((u: any) => 
          u.email === recoveryContact || u.phone === recoveryContact
        );
        
        if (userIndex !== -1) {
          users[userIndex].password = newPassword;
          localStorage.setItem('users_db', JSON.stringify(users));
        }
      }
      
      setIsLoading(false);
      setForgotPasswordStep(4);
      
      setTimeout(() => {
        setAuthMode('login');
        setForgotPasswordStep(1);
        setEmail(recoveryContact);
        setPassword('');
        success('Password berhasil diubah! Silakan masuk dengan akun Anda.');
      }, 1500);
    }, 1000);
  };

  const handleGoogleLogin = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    // Tampilkan modal untuk simulasi Google login
    setShowGoogleModal(true);
    setGoogleEmail(''); // Reset email input
  };

  const handleGoogleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!googleEmail || !googleEmail.includes('@')) {
      error('Masukkan email Google yang valid!', 'Format Salah');
      return;
    }
    
    setIsLoading(true);
    
    // Simulasi Google Login - Buat user dari email Google
    const googleUser = {
      id: 'google-user-' + Date.now(),
      email: googleEmail,
      name: googleEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(googleEmail.split('@')[0])}&background=4285F4&color=fff&size=100`,
      provider: 'google',
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('demo_user', JSON.stringify(googleUser));
    
    // Simulasi loading Google authentication
    setTimeout(() => {
      setShowGoogleModal(false);
      setIsLoading(false);
      // Redirect ke beranda dashboard
      window.location.href = '/beranda';
    }, 1000);
  };

  const handleQuickGoogleLogin = () => {
    // Quick login dengan akun Google demo untuk testing
    const googleUser = {
      id: 'google-user-' + Date.now(),
      email: 'mr.robinsyaifuddin@gmail.com',
      name: 'Robin Syaifuddin',
      avatar: 'https://lh3.googleusercontent.com/a/default-user',
      provider: 'google',
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('demo_user', JSON.stringify(googleUser));
    window.location.href = '/beranda';
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    
    // SIMULASI LOGIN - Menggunakan akun demo Robin Syaifuddin
    const demoUser = {
      id: 'demo-user-001',
      email: 'mr.robinsyaifuddin@gmail.com',
      name: 'Robin Syaifuddin',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('demo_user', JSON.stringify(demoUser));
    
    // Simulasi 'memuat...' untuk UX yang lebih baik
    setTimeout(() => {
      // Redirect ke beranda dashboard
      window.location.href = '/beranda';
    }, 500);
  };

  const handleQuickLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    setIsLoading(true);
    
    // Login dengan email yang diisi atau demo
    const user = {
      id: 'user-' + Date.now(),
      email: email || 'demo@Berbudaya.id',
      name: email ? email.split('@')[0] : 'Demo User',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('demo_user', JSON.stringify(user));
    
    setTimeout(() => {
      window.location.href = '/beranda';
    }, 500);
  };

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // DEMO USER DATABASE
    const demoUsers = [
      {
        email: 'mr.robinsyaifuddin@gmail.com',
        password: 'robin123',
        name: 'Robin Syaifuddin',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
      },
      {
        email: 'demo@Berbudaya.id',
        password: 'demo123',
        name: 'Demo User',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
      }
    ];

    // Cek kredensial dengan database demo
    const validUser = demoUsers.find(
      user => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );

    if (validUser) {
      // Login berhasil
      const loggedInUser = {
        id: 'user-' + Date.now(),
        email: validUser.email,
        name: validUser.name,
        avatar: validUser.avatar,
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem('demo_user', JSON.stringify(loggedInUser));
      
      setTimeout(() => {
        window.location.href = '/beranda';
      }, 500);
    } else {
      // Login gagal
      setIsLoading(false);
      error('Email atau password salah!\nAkun demo: mr.robinsyaifuddin@gmail.com / robin123', 'Login Gagal');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Coba backend dulu
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
        credentials: 'include',
      });

      if (response.ok) {
        success('Registrasi berhasil! Silakan login.', 'Berhasil');
        setAuthMode('login');
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.log('Backend unavailable, using simulation mode');
    }

    // FALLBACK: Simulasi registrasi jika backend tidak tersedia
    // Langsung login otomatis setelah register
    const newUser = {
      id: 'user-' + Date.now(),
      email: email,
      name: name,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('demo_user', JSON.stringify(newUser));
    
    success('Registrasi berhasil! Mengarahkan ke beranda...');
    
    setTimeout(() => {
      window.location.href = '/beranda';
    }, 1000);
  };

  // Main Landing Page
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Hero Section - Full Height Centered on Desktop */}
      <section className="bg-white py-8 sm:py-10 lg:py-0 lg:min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center justify-center">
            {/* Left Side (Desktop) - Login Form with Decorative Elements */}
            {/* Mobile: Show second  |  Desktop: Show first (left) */}
            <div className="relative order-2 lg:order-1 lg:col-span-5 flex justify-center lg:justify-end">
              {/* Decorative circle - top right of form */}
              <div className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 w-16 h-16 sm:w-20 sm:h-20 border-2 border-dashed border-gray-300 rounded-full hidden sm:flex items-center justify-center pointer-events-none">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                  <ArrowUpRight className="text-white w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
              </div>

              {/* Main Card - Auth Container */}
              <div id="hero-auth-card" className="relative z-10 w-full max-w-[320px] sm:max-w-[340px] lg:max-w-[350px] xl:max-w-[365px] mx-auto lg:mx-0 mb-4">
                <div className="bg-white rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg border border-gray-100 transition-all duration-300">
                  {/* Logo */}
                  <div className="flex justify-center mb-3">
                    <img 
                      src="/logo.png" 
                      alt="Berbudaya" 
                      className="h-8 sm:h-8.5 lg:h-9 w-auto object-contain"
                    />
                  </div>

                  {/* 1. VIEW: LOGIN */}
                  {authMode === 'login' && (
                    <div>
                      {/* Header */}
                      <div className="text-center mb-3.5">
                        <h2 className="text-lg sm:text-xl lg:text-[22px] font-bold text-gray-900 mb-1">Selamat Datang Kembali</h2>
                        <p className="text-gray-500 text-xs lg:text-[13px]">Silakan masukkan detail Anda untuk masuk.</p>
                      </div>

                      {/* Social Login Buttons */}
                      <div className="flex justify-center mb-3.5">
                        <button 
                          type="button"
                          onClick={redirectToLogin}
                          className="inline-flex items-center justify-center px-4 py-2 border border-blue-600 rounded-full hover:bg-blue-50/50 transition-colors text-xs lg:text-[13px] font-medium text-blue-600 shadow-2xs"
                          title="Masuk dengan Google"
                        >
                          <svg className="w-4 h-4 mr-2 shrink-0" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          Masuk dengan Google
                        </button>
                      </div>

                      {/* OR Divider */}
                      <div className="relative mb-3.5">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-[11px] lg:text-xs">
                          <span className="px-2 bg-white text-gray-400 uppercase tracking-wider">or</span>
                        </div>
                      </div>

                      {/* Login Form */}
                      <form onSubmit={handleQuickLogin}>
                        {/* Email Input */}
                        <div className="mb-3">
                          <input
                            type="email"
                            placeholder="Masukkan email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm lg:text-[14px] focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                          />
                        </div>

                        {/* Password Input */}
                        <div className="mb-3 relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3.5 py-2.5 pr-10 border border-gray-200 rounded-xl text-xs sm:text-sm lg:text-[14px] focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between mb-3.5">
                          <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="w-3.5 h-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                            <span className="ml-2 text-[11px] sm:text-xs lg:text-[13px] text-gray-600">Ingat saya</span>
                          </label>
                          <button 
                            type="button" 
                            onClick={handleForgotPasswordClick}
                            className="text-[11px] sm:text-xs lg:text-[13px] text-blue-600 hover:text-blue-700 font-medium transition-colors"
                          >
                            Lupa kata sandi?
                          </button>
                        </div>

                        {/* Masuk Button */}
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-gray-900 text-white py-2.5 sm:py-3 rounded-xl hover:bg-gray-800 transition-colors text-xs sm:text-sm lg:text-[14px] font-semibold disabled:opacity-50 mb-3"
                        >
                          {isLoading ? 'Memuat...' : 'Masuk'}
                        </button>
                      </form>

                      {/* Sign Up Link */}
                      <div className="text-center">
                        <span className="text-[11px] sm:text-xs lg:text-[13px] text-gray-500">Belum punya akun? </span>
                        <button
                          onClick={() => setAuthMode('register')}
                          className="text-[11px] sm:text-xs lg:text-[13px] text-blue-600 hover:text-blue-700 font-semibold"
                        >
                          Daftar
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 2. VIEW: REGISTER */}
                  {authMode === 'register' && (
                    <div>
                      {/* Header */}
                      <div className="text-center mb-3.5">
                        <h2 className="text-lg sm:text-xl lg:text-[22px] font-bold text-gray-900 mb-1">Daftar Akun</h2>
                        <p className="text-gray-500 text-xs lg:text-[13px]">Buat akun baru untuk bergabung.</p>
                      </div>

                      {/* Google Register Button */}
                      <div className="flex justify-center mb-3.5">
                        <button 
                          type="button"
                          onClick={redirectToLogin}
                          className="inline-flex items-center justify-center px-4 py-2 border border-blue-600 rounded-full hover:bg-blue-50/50 transition-colors text-xs lg:text-[13px] font-medium text-blue-600 shadow-2xs"
                          title="Daftar dengan Google"
                        >
                          <svg className="w-4 h-4 mr-2 shrink-0" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          Daftar dengan Google
                        </button>
                      </div>

                      {/* OR Divider */}
                      <div className="relative mb-3.5">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-[11px] lg:text-xs">
                          <span className="px-2 bg-white text-gray-400 uppercase tracking-wider">or</span>
                        </div>
                      </div>

                      {/* Register Form */}
                      <form onSubmit={handleRegister}>
                        {/* Name Input */}
                        <div className="mb-3">
                          <input
                            type="text"
                            placeholder="Nama Lengkap"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm lg:text-[14px] focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                            required
                          />
                        </div>

                        {/* Email Input */}
                        <div className="mb-3">
                          <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm lg:text-[14px] focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                            required
                          />
                        </div>

                        {/* Password Input */}
                        <div className="mb-3 relative">
                          <input
                            type={showRegisterPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3.5 py-2.5 pr-10 border border-gray-200 rounded-xl text-xs sm:text-sm lg:text-[14px] focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                            aria-label={showRegisterPassword ? "Sembunyikan password" : "Tampilkan password"}
                          >
                            {showRegisterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>

                        {/* Register Button */}
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-xl hover:bg-blue-700 transition-colors text-xs sm:text-sm lg:text-[14px] font-semibold disabled:opacity-50 mb-3"
                        >
                          {isLoading ? 'Memuat...' : 'Buat Akun'}
                        </button>
                      </form>

                      {/* Masuk Link */}
                      <div className="text-center">
                        <span className="text-[11px] sm:text-xs lg:text-[13px] text-gray-500">Sudah punya akun? </span>
                        <button
                          onClick={() => setAuthMode('login')}
                          className="text-[11px] sm:text-xs lg:text-[13px] text-blue-600 hover:text-blue-700 font-semibold"
                        >
                          Masuk
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 3. VIEW: FORGOT PASSWORD */}
                  {authMode === 'forgot' && (
                    <div>
                      {/* Header */}
                      <div className="text-center mb-3.5">
                        <h2 className="text-lg sm:text-xl lg:text-[22px] font-bold text-gray-900 mb-1">
                          {forgotPasswordStep === 1 && 'Lupa Kata Sandi'}
                          {forgotPasswordStep === 2 && 'Verifikasi Kode'}
                          {forgotPasswordStep === 3 && 'Sandi Baru'}
                          {forgotPasswordStep === 4 && 'Berhasil!'}
                        </h2>
                        <p className="text-gray-500 text-xs lg:text-[13px]">
                          {forgotPasswordStep === 1 && 'Pilih metode pemulihan akun Anda'}
                          {forgotPasswordStep === 2 && 'Masukkan kode verifikasi yang dikirim'}
                          {forgotPasswordStep === 3 && 'Buat kata sandi baru Anda'}
                          {forgotPasswordStep === 4 && 'Kata sandi berhasil diperbarui'}
                        </p>
                      </div>

                      {/* Step 1: Pilih Metode & Input Kontak */}
                      {forgotPasswordStep === 1 && (
                        <form onSubmit={handleSendVerificationCode} className="space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setRecoveryMethod('email')}
                              className={`py-2 px-3 border rounded-xl transition-all flex items-center justify-center space-x-1.5 text-xs lg:text-[13px] font-medium ${
                                recoveryMethod === 'email'
                                    ? 'border-blue-600 bg-blue-50/70 text-blue-700'
                                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                              }`}
                            >
                              <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <span>Email</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setRecoveryMethod('phone')}
                              className={`py-2 px-3 border rounded-xl transition-all flex items-center justify-center space-x-1.5 text-xs lg:text-[13px] font-medium ${
                                recoveryMethod === 'phone'
                                  ? 'border-blue-600 bg-blue-50/70 text-blue-700'
                                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
                              }`}
                            >
                              <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              <span>Nomor HP</span>
                            </button>
                          </div>

                          <div>
                            <input
                              type={recoveryMethod === 'email' ? 'email' : 'tel'}
                              value={recoveryContact}
                              onChange={(e) => setRecoveryContact(e.target.value)}
                              placeholder={recoveryMethod === 'email' ? 'contoh@email.com' : '08123456789'}
                              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm lg:text-[14px] focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                              required
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-xl hover:bg-blue-700 transition-colors text-xs sm:text-sm lg:text-[14px] font-semibold disabled:opacity-50"
                          >
                            {isLoading ? 'Mengirim...' : 'Kirim Kode Verifikasi'}
                          </button>
                        </form>
                      )}

                      {/* Step 2: Input Verification Code */}
                      {forgotPasswordStep === 2 && (
                        <form onSubmit={handleVerifyCode} className="space-y-3">
                          <div className="bg-blue-50 border border-blue-100 rounded-xl p-2.5 text-center">
                            <p className="text-[11px] lg:text-xs text-blue-800">
                              Kode dikirim ke <strong>{recoveryContact}</strong>
                            </p>
                          </div>

                          <div>
                            <input
                              type="text"
                              value={verificationCode}
                              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                              placeholder="123456"
                              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-center text-lg tracking-widest font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              maxLength={6}
                              required
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={isLoading || verificationCode.length !== 6}
                            className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-xl hover:bg-blue-700 transition-colors text-xs sm:text-sm lg:text-[14px] font-semibold disabled:opacity-50"
                          >
                            {isLoading ? 'Memverifikasi...' : 'Verifikasi Kode'}
                          </button>

                          <button
                            type="button"
                            onClick={handleSendVerificationCode}
                            className="w-full text-[11px] lg:text-xs text-blue-600 hover:text-blue-700 font-medium text-center block"
                          >
                            Kirim ulang kode
                          </button>
                        </form>
                      )}

                      {/* Step 3: Input New Password */}
                      {forgotPasswordStep === 3 && (
                        <form onSubmit={handleResetPassword} className="space-y-2.5">
                          <div className="relative">
                            <input
                              type={showNewPassword ? "text" : "password"}
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="Kata sandi baru (min. 6)"
                              className="w-full px-3.5 py-2.5 pr-10 border border-gray-200 rounded-xl text-xs sm:text-sm lg:text-[14px] focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder:text-gray-400"
                              minLength={6}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                              aria-label={showNewPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                            >
                              {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>

                          <div className="relative">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="Konfirmasi kata sandi"
                              className="w-full px-3.5 py-2.5 pr-10 border border-gray-200 rounded-xl text-xs sm:text-sm lg:text-[14px] focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder:text-gray-400"
                              minLength={6}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                              aria-label={showConfirmPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                            >
                              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>

                          {newPassword && confirmPassword && newPassword !== confirmPassword && (
                            <p className="text-[11px] lg:text-xs text-red-600 flex items-center justify-center gap-1.5 font-medium">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>Kata sandi tidak cocok</span>
                            </p>
                          )}

                          <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-xl hover:bg-blue-700 transition-colors text-xs sm:text-sm lg:text-[14px] font-semibold disabled:opacity-50"
                          >
                            {isLoading ? 'Menyimpan...' : 'Simpan Sandi Baru'}
                          </button>
                        </form>
                      )}

                      {/* Step 4: Success Animation & Auto Return */}
                      {forgotPasswordStep === 4 && (
                        <div className="text-center py-4">
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-2">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <h3 className="text-sm font-bold text-gray-900 mb-1">Berhasil Diubah!</h3>
                          <p className="text-xs text-gray-500 mb-3">
                            Mengalihkan kembali ke halaman landing...
                          </p>
                          <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                        </div>
                      )}

                      {/* Back to Login Link */}
                      {forgotPasswordStep < 4 && (
                        <div className="text-center mt-3">
                          <button
                            type="button"
                            onClick={() => setAuthMode('login')}
                            className="text-[11px] sm:text-xs text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            ← Kembali ke login
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Right Side (Desktop) - Headline & Content */}
            {/* Mobile: Show first  |  Desktop: Show second (right) */}
            <div className="space-y-4 sm:space-y-5 lg:space-y-6 order-1 lg:order-2 lg:col-span-7 text-center lg:text-left px-2 sm:px-0">
              {/* Main Headline */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] xl:text-[50px] font-bold leading-snug sm:leading-tight lg:leading-[1.18] tracking-tight px-1 sm:px-0">
                <span className="text-gray-900">Ekosistem Budaya</span>
                <br />
                <span className="text-gray-900">Kreatif & Kolaboratif </span>
                <span className="relative inline-block">
                  <span className="text-blue-600">Nusantara</span>
                  <span className="absolute bottom-1 sm:bottom-1.5 left-0 w-full h-2.5 sm:h-3.5 bg-blue-100 -z-10 rounded"></span>
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-gray-600 text-xs sm:text-sm lg:text-[17px] xl:text-[18px] max-w-xl xl:max-w-2xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0">
                Ruang temu bagi pegiat seni, kreator, dan komunitas untuk merayakan, melestarikan, serta mengembangkan mahakarya tradisi Indonesia menuju panggung dunia.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2">
                <button
                  onClick={handleGalleryCTA}
                  className="btn-pill inline-flex items-center justify-center whitespace-nowrap bg-blue-600 text-white px-5 sm:px-7 py-2.5 sm:py-3 hover:bg-blue-700 transition-all font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-95"
                >
                  <span className="sm:hidden">Lihat Galeri</span>
                  <span className="hidden sm:inline">Lihat Galeri Budaya</span>
                </button>
                <button
                  onClick={() => {
                    setAuthMode('register');
                    document.getElementById('hero-auth-card')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  disabled={isLoading}
                  className="btn-pill inline-flex items-center justify-center whitespace-nowrap bg-white text-blue-600 border border-blue-600 hover:border-blue-700 hover:bg-blue-50/50 px-5 sm:px-7 py-2.5 sm:py-3 transition-all font-semibold text-xs sm:text-sm disabled:opacity-50 active:scale-95"
                >
                  {isLoading ? 'Memuat...' : 'Daftar Akun'}
                </button>
              </div>

              {/* Culture & National Heritage Marquee */}
              <div className="pt-2 sm:pt-4">
                {/* Marquee Banner Container */}
                <div className="relative w-full max-w-sm mx-auto lg:max-w-none overflow-hidden py-1 group/marquee">
                  {/* Left Gradient Mask */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
                  
                  {/* Right Gradient Mask */}
                  <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

                  {/* Marquee Track (Infinite Loop Seamless - 2 Identical Tracks) */}
                  <div className="animate-marquee flex items-center group-hover/marquee:[animation-play-state:paused] group-active/marquee:[animation-play-state:paused]">
                    {/* Track 1 */}
                    <div className="flex items-center gap-8 sm:gap-12 shrink-0 pr-8 sm:pr-12">
                      <div className="shrink-0 cursor-pointer">
                        <img
                          src="/marque/Flag_of_Indonesia.png"
                          alt="Bendera Merah Putih"
                          className="h-6 sm:h-7 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                          title="Bendera Republik Indonesia"
                        />
                      </div>

                      <div className="shrink-0 cursor-pointer">
                        <img
                          src="/marque/National_emblem_of_Indonesia_Garuda_Pancasila.svg.webp"
                          alt="Garuda Pancasila"
                          className="h-7 sm:h-8.5 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                          title="Garuda Pancasila"
                        />
                      </div>

                      <a
                        href="https://kemenbud.go.id/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-block"
                        title="Kementerian Kebudayaan Republik Indonesia"
                      >
                        <img
                          src="/marque/Logo_Kementerian_Kebudayaan_Republik_Indonesia_(2024)_(cropped).svg.webp"
                          alt="Kementerian Kebudayaan Republik Indonesia"
                          className="h-7 sm:h-8.5 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                        />
                      </a>

                      <div className="shrink-0 cursor-pointer">
                        <img
                          src="/marque/Flag_of_Indonesia.png"
                          alt="Bendera Merah Putih"
                          className="h-6 sm:h-7 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                          title="Bendera Republik Indonesia"
                        />
                      </div>

                      <div className="shrink-0 cursor-pointer">
                        <img
                          src="/marque/National_emblem_of_Indonesia_Garuda_Pancasila.svg.webp"
                          alt="Garuda Pancasila"
                          className="h-7 sm:h-8.5 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                          title="Garuda Pancasila"
                        />
                      </div>

                      <a
                        href="https://kemenbud.go.id/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-block"
                        title="Kementerian Kebudayaan Republik Indonesia"
                      >
                        <img
                          src="/marque/Logo_Kementerian_Kebudayaan_Republik_Indonesia_(2024)_(cropped).svg.webp"
                          alt="Kementerian Kebudayaan Republik Indonesia"
                          className="h-7 sm:h-8.5 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                        />
                      </a>
                    </div>

                    {/* Track 2 (Clone untuk Seamless Infinite Loop tanpa putus) */}
                    <div className="flex items-center gap-8 sm:gap-12 shrink-0 pr-8 sm:pr-12" aria-hidden="true">
                      <div className="shrink-0 cursor-pointer">
                        <img
                          src="/marque/Flag_of_Indonesia.png"
                          alt="Bendera Merah Putih"
                          className="h-6 sm:h-7 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                          title="Bendera Republik Indonesia"
                        />
                      </div>

                      <div className="shrink-0 cursor-pointer">
                        <img
                          src="/marque/National_emblem_of_Indonesia_Garuda_Pancasila.svg.webp"
                          alt="Garuda Pancasila"
                          className="h-7 sm:h-8.5 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                          title="Garuda Pancasila"
                        />
                      </div>

                      <a
                        href="https://kemenbud.go.id/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-block"
                        title="Kementerian Kebudayaan Republik Indonesia"
                      >
                        <img
                          src="/marque/Logo_Kementerian_Kebudayaan_Republik_Indonesia_(2024)_(cropped).svg.webp"
                          alt="Kementerian Kebudayaan Republik Indonesia"
                          className="h-7 sm:h-8.5 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                        />
                      </a>

                      <div className="shrink-0 cursor-pointer">
                        <img
                          src="/marque/Flag_of_Indonesia.png"
                          alt="Bendera Merah Putih"
                          className="h-6 sm:h-7 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                          title="Bendera Republik Indonesia"
                        />
                      </div>

                      <div className="shrink-0 cursor-pointer">
                        <img
                          src="/marque/National_emblem_of_Indonesia_Garuda_Pancasila.svg.webp"
                          alt="Garuda Pancasila"
                          className="h-7 sm:h-8.5 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                          title="Garuda Pancasila"
                        />
                      </div>

                      <a
                        href="https://kemenbud.go.id/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-block"
                        title="Kementerian Kebudayaan Republik Indonesia"
                      >
                        <img
                          src="/marque/Logo_Kementerian_Kebudayaan_Republik_Indonesia_(2024)_(cropped).svg.webp"
                          alt="Kementerian Kebudayaan Republik Indonesia"
                          className="h-7 sm:h-8.5 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pinterest-Style Hero Section - Clean & Elegant */}
      <section className="relative bg-white pt-8 pb-12 md:pt-12 md:pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
          {/* Pinterest-Style Scattered Layout */}
          <div className="relative">
            {/* Mobile: Simple Grid */}
            <div className="grid grid-cols-2 gap-4 md:hidden mb-4">
              <div className="ornament-item opacity-0 transform translate-y-8" data-delay="0">
                <img 
                  src="/landing/Gemini_Generated_Image_5kqp6h5kqp6h5kqp.png"
                  alt="Budaya Nusantara 1"
                  className="w-full h-56 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div className="ornament-item opacity-0 transform translate-y-8" data-delay="100">
                <img 
                  src="/landing/Gemini_Generated_Image_aoqdfoaoqdfoaoqd.png"
                  alt="Budaya Nusantara 2"
                  className="w-full h-56 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div className="ornament-item opacity-0 transform translate-y-8" data-delay="200">
                <img 
                  src="/landing/Gemini_Generated_Image_c47cq7c47cq7c47c.png"
                  alt="Budaya Nusantara 3"
                  className="w-full h-56 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div className="ornament-item opacity-0 transform translate-y-8" data-delay="300">
                <img 
                  src="/landing/Gemini_Generated_Image_m0e2zkm0e2zkm0e2.png"
                  alt="Budaya Nusantara 4"
                  className="w-full h-56 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>

            {/* Desktop: Symmetric Pinterest Layout */}
            <div className="hidden md:block relative h-[420px] lg:h-[480px] max-w-6xl mx-auto">
              {/* 1. Far Left - TALL (Paling Tinggi) */}
              <div className="ornament-item absolute left-0 top-0 w-32 lg:w-36 opacity-0 transform translate-y-8" data-delay="0">
                <img 
                  src="/landing/Gemini_Generated_Image_5kqp6h5kqp6h5kqp.png"
                  alt="Budaya Nusantara 1"
                  className="w-full h-80 lg:h-96 object-cover rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                />
              </div>

              {/* 2. Left - MEDIUM (Setengah) */}
              <div className="ornament-item absolute left-36 lg:left-44 top-36 lg:top-44 w-32 lg:w-36 opacity-0 transform translate-y-8" data-delay="100">
                <img 
                  src="/landing/Gemini_Generated_Image_aoqdfoaoqdfoaoqd.png"
                  alt="Budaya Nusantara 2"
                  className="w-full h-48 lg:h-56 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-all"
                />
              </div>

              {/* 3. Center Left - SMALL (Kecil) */}
              <div className="ornament-item absolute left-72 lg:left-88 top-52 lg:top-64 w-28 lg:w-32 opacity-0 transform translate-y-8" data-delay="200">
                <img 
                  src="/landing/Gemini_Generated_Image_c47cq7c47cq7c47c.png"
                  alt="Budaya Nusantara 3"
                  className="w-full h-32 lg:h-36 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-all"
                />
              </div>

              {/* 4. CENTER - SMALL (Kecil dengan Button) */}
              <div className="ornament-item absolute left-1/2 transform -translate-x-1/2 top-52 lg:top-64 w-32 lg:w-36 opacity-0 translate-y-8" data-delay="300">
                <div className="relative">
                  <img 
                    src="/landing/Gemini_Generated_Image_m0e2zkm0e2zkm0e2.png"
                    alt="Budaya Nusantara 4"
                    className="w-full h-32 lg:h-36 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-all"
                  />
                  {/* Green Scroll Button */}
                  <button 
                    onClick={() => window.scrollBy({ top: 800, behavior: 'smooth' })}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-green-700 hover:bg-green-800 rounded-full flex items-center justify-center transition-all shadow-xl z-10"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 5. Center Right - SMALL (Kecil, Mirror dari #3) */}
              <div className="ornament-item absolute right-72 lg:right-88 top-52 lg:top-64 w-28 lg:w-32 opacity-0 transform translate-y-8" data-delay="400">
                <img 
                  src="/landing/Gemini_Generated_Image_p69m3qp69m3qp69m.png"
                  alt="Budaya Nusantara 5"
                  className="w-full h-32 lg:h-36 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-all"
                />
              </div>

              {/* 6. Right - MEDIUM (Setengah, Mirror dari #2) */}
              <div className="ornament-item absolute right-36 lg:right-44 top-36 lg:top-44 w-32 lg:w-36 opacity-0 transform translate-y-8" data-delay="500">
                <img 
                  src="/landing/Gemini_Generated_Image_s14g9ps14g9ps14g.png"
                  alt="Budaya Nusantara 6"
                  className="w-full h-48 lg:h-56 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-all"
                />
              </div>

              {/* 7. Far Right - TALL (Paling Tinggi, Mirror dari #1) */}
              <div className="ornament-item absolute right-0 top-0 w-32 lg:w-36 opacity-0 transform translate-y-8" data-delay="600">
                <img 
                  src="/landing/Gemini_Generated_Image_vvw83svvw83svvw8.png"
                  alt="Budaya Nusantara 7"
                  className="w-full h-80 lg:h-96 object-cover rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                />
              </div>
            </div>

            {/* Bottom Scroll Button (Mobile) */}
            <div className="md:hidden text-center mt-4">
              <button 
                onClick={() => window.scrollBy({ top: 700, behavior: 'smooth' })}
                className="w-12 h-12 bg-green-700 hover:bg-green-800 rounded-full inline-flex items-center justify-center transition-all shadow-xl"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimalist & Elegant */}
      <footer className="bg-gray-900 text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Main Footer Content */}
          <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand Section */}
            <div className="space-y-4">
              <img 
                src="/logo.png" 
                alt="Berbudaya" 
                className="h-10 w-auto object-contain brightness-0 invert"
              />
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Platform kolaborasi budaya yang menghubungkan kreator dan komunitas Indonesia.
              </p>
            </div>

            {/* Platform & Company Grid (2 columns on mobile, spans 2 cols on md+) */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8 md:contents">
              {/* Quick Links */}
              <div>
                <h3 className="text-sm font-semibold mb-4 text-gray-300">Platform</h3>
                <ul className="space-y-2.5">
                  <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-sm">Marketplace</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-sm">Komunitas</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-sm">Edukasi</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-sm">Acara</a></li>
                </ul>
              </div>

              {/* Company & Social */}
              <div>
                <h3 className="text-sm font-semibold mb-4 text-gray-300">Perusahaan</h3>
                <ul className="space-y-2.5 mb-6">
                  <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-sm">Tentang Kami</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-sm">Kontak</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-sm">Bantuan</a></li>
                </ul>
                
                {/* Social Media */}
                <div className="flex space-x-3">
                  <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
              <p className="text-gray-500 text-xs">
                © 2025 Berbudaya.id. Hak cipta dilindungi.
              </p>
              <div className="flex space-x-5 text-xs">
                <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors">Privasi</a>
                <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors">Ketentuan</a>
                <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Google Login Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowGoogleModal(false);
                setGoogleEmail('');
                setIsLoading(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Google Logo */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Login dengan Google</h2>
              <p className="text-gray-600 text-sm">Masukkan email Google Anda untuk simulasi login</p>
            </div>

            {/* Form */}
            <form onSubmit={handleGoogleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Google
                </label>
                <input
                  type="email"
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  placeholder="contoh@gmail.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                  disabled={isLoading}
                  autoFocus
                />
                <p className="text-xs text-gray-500 mt-2 flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>Tip: Gunakan email apapun untuk simulasi. Sistem akan membuat akun demo otomatis.</span>
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </>
                ) : (
                  'Lanjutkan dengan Google'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">atau</span>
              </div>
            </div>

            {/* Quick Login Button */}
            <button
              onClick={handleQuickGoogleLogin}
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Quick Login sebagai Robin Syaifuddin</span>
            </button>

            {/* Info */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>Mode Simulasi:</strong> Ini adalah simulasi login Google. 
                Sistem akan membuat akun demo berdasarkan email yang Anda masukkan. 
                Gunakan tombol Quick Login untuk langsung masuk ke dashboard.
              </p>
            </div>
          </div>
        </div>
      )}
      </div>
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Masuk untuk Jelajahi Galeri</h3>
            <p className="text-sm text-gray-600 mb-4">
              Untuk mengunggah ataupun melihat galeri budaya lengkap, silakan masuk terlebih dahulu.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setShowGalleryModal(false);
                  setAuthMode('login');
                  document.getElementById('hero-auth-card')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Masuk Sekarang
              </button>
              <button
                onClick={() => setShowGalleryModal(false)}
                className="flex-1 border border-gray-300 px-4 py-2 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
