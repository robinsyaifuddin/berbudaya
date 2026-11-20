import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from '@getmocha/users-service/react';
import { CartProvider } from '@/react-app/contexts/CartContext';
import { NotificationProvider } from '@/react-app/contexts/NotificationContext';
import { SellerProvider } from '@/react-app/contexts/SellerContext';
import LandingPage from "@/react-app/pages/Landing";
import ProtectedRoute from "@/react-app/components/ProtectedRoute";
import ErrorBoundary from "@/react-app/components/ErrorBoundary";
import ScrollToTop from "@/react-app/components/ScrollToTop";

// Lazy-loaded routes for code-splitting & ultra-fast initial load on Vercel
const HomePage = lazy(() => import("@/react-app/pages/Home"));
const MarketplacePage = lazy(() => import("@/react-app/pages/Marketplace"));
const JaringanPage = lazy(() => import("@/react-app/pages/Jaringan"));
const CrowdfundingPage = lazy(() => import("@/react-app/pages/Crowdfunding"));
const PermainanPage = lazy(() => import("@/react-app/pages/Permainan"));
const BeritaPage = lazy(() => import("@/react-app/pages/Berita"));
const BeritaDetailPage = lazy(() => import("@/react-app/pages/BeritaDetail"));
const KomunitasPage = lazy(() => import("@/react-app/pages/Lembaga"));
const DetailKomunitasPage = lazy(() => import("@/react-app/pages/DetailLembaga"));
const LembagaPage = lazy(() => import("@/react-app/pages/Lembaga"));
const DetailLembagaPage = lazy(() => import("@/react-app/pages/DetailLembaga"));
const KelolaLembagaPage = lazy(() => import("@/react-app/pages/KelolaLembaga"));
const AcaraPage = lazy(() => import("@/react-app/pages/Acara"));
const GalleryPage = lazy(() => import("@/react-app/pages/Gallery"));
const CartPage = lazy(() => import("@/react-app/pages/Cart"));
const ProfilPage = lazy(() => import("@/react-app/pages/Profil"));
const ProfilMenuPage = lazy(() => import("@/react-app/pages/ProfilMenu"));
const ProductDetailPage = lazy(() => import("@/react-app/pages/ProductDetail"));
const CheckoutPage = lazy(() => import("@/react-app/pages/CheckoutPage"));
const ProyekPage = lazy(() => import("@/react-app/pages/Proyek"));
const Edukasi = lazy(() => import("@/react-app/pages/Edukasi"));
const CrowdfundingDetailPage = lazy(() => import("@/react-app/pages/CrowdfundingDetail"));
const CrowdfundingDonatePage = lazy(() => import("@/react-app/pages/CrowdfundingDonate"));
const PesanPage = lazy(() => import("@/react-app/pages/Pesan"));
const PostingAktivitasPage = lazy(() => import("@/react-app/pages/PostingAktivitas"));
const KelolaKomunitasPage = lazy(() => import("@/react-app/pages/KelolaKomunitas"));
const PengaturanPage = lazy(() => import("@/react-app/pages/Pengaturan"));
const BantuanPage = lazy(() => import("@/react-app/pages/Bantuan"));
const AuthCallbackPage = lazy(() => import("@/react-app/pages/AuthCallback"));
const KuisBudayaPage = lazy(() => import("@/react-app/pages/games/KuisBudayaPage"));
const PuzzleBudayaPage = lazy(() => import("@/react-app/pages/games/PuzzleBudayaPage"));
const TebakDaerahPage = lazy(() => import("@/react-app/pages/games/TebakDaerahPage"));
const SavedPostsPage = lazy(() => import("@/react-app/pages/SavedPosts"));
const UserProfilePage = lazy(() => import("@/react-app/pages/UserProfile"));
const SellerCenterPage = lazy(() => import("@/react-app/pages/seller/SellerCenterPage"));
const ShopProfilePage = lazy(() => import("@/react-app/pages/seller/ShopProfilePage"));
const BukaTokoPage = lazy(() => import("@/react-app/pages/seller/BukaTokoPage"));
const SearchPage = lazy(() => import("@/react-app/pages/SearchPage"));

function PageLoading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-8 h-8 rounded-full bg-blue-600 animate-pulse" />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <NotificationProvider>
          <SellerProvider>
            <CartProvider>
              <Router>
                <ScrollToTop />
                <Suspense fallback={<PageLoading />}>
                <Routes>
                {/* Public Routes - No Authentication Required */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/auth/callback" element={<AuthCallbackPage />} />
                
                {/* Protected Routes - Authentication Required */}
                <Route path="/beranda" element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                } />
                <Route path="/cari" element={
                  <ProtectedRoute>
                    <SearchPage />
                  </ProtectedRoute>
                } />
                <Route path="/marketplace" element={
                  <ProtectedRoute>
                    <MarketplacePage />
                  </ProtectedRoute>
                } />
                <Route path="/marketplace/:id" element={
                  <ProtectedRoute>
                    <ProductDetailPage />
                  </ProtectedRoute>
                } />
                <Route path="/cart" element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                } />
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                } />
                <Route path="/proyek" element={
                  <ProtectedRoute>
                    <ProyekPage />
                  </ProtectedRoute>
                } />
                <Route path="/edukasi" element={
                  <ProtectedRoute>
                    <Edukasi />
                  </ProtectedRoute>
                } />
                <Route path="/komunitas" element={
                  <ProtectedRoute>
                    <LembagaPage />
                  </ProtectedRoute>
                } />
                <Route path="/komunitas/:id" element={
                  <ProtectedRoute>
                    <DetailLembagaPage />
                  </ProtectedRoute>
                } />
                <Route path="/kelola-komunitas" element={
                  <ProtectedRoute>
                    <KelolaLembagaPage />
                  </ProtectedRoute>
                } />
                <Route path="/lembaga" element={
                  <ProtectedRoute>
                    <LembagaPage />
                  </ProtectedRoute>
                } />
                <Route path="/lembaga/:id" element={
                  <ProtectedRoute>
                    <DetailLembagaPage />
                  </ProtectedRoute>
                } />
                <Route path="/kelola-lembaga" element={
                  <ProtectedRoute>
                    <KelolaLembagaPage />
                  </ProtectedRoute>
                } />
                <Route path="/jaringan" element={
                  <ProtectedRoute>
                    <JaringanPage />
                  </ProtectedRoute>
                } />
                <Route path="/crowdfunding" element={
                  <ProtectedRoute>
                    <CrowdfundingPage />
                  </ProtectedRoute>
                } />
                <Route path="/crowdfunding/:id" element={
                  <ProtectedRoute>
                    <CrowdfundingDetailPage />
                  </ProtectedRoute>
                } />
                <Route path="/crowdfunding/:id/donate" element={
                  <ProtectedRoute>
                    <CrowdfundingDonatePage />
                  </ProtectedRoute>
                } />
                <Route path="/acara" element={
                  <ProtectedRoute>
                    <AcaraPage />
                  </ProtectedRoute>
                } />
                <Route path="/pesan" element={
                  <ProtectedRoute>
                    <PesanPage />
                  </ProtectedRoute>
                } />
                <Route path="/profil" element={
                  <ProtectedRoute>
                    <ProfilPage />
                  </ProtectedRoute>
                } />
                <Route path="/profil-menu" element={
                  <ProtectedRoute>
                    <ProfilMenuPage />
                  </ProtectedRoute>
                } />
                <Route path="/posting-aktivitas" element={
                  <ProtectedRoute>
                    <PostingAktivitasPage />
                  </ProtectedRoute>
                } />
                <Route path="/kelola-komunitas" element={
                  <ProtectedRoute>
                    <KelolaKomunitasPage />
                  </ProtectedRoute>
                } />
                <Route path="/user/:userId" element={
                  <ProtectedRoute>
                    <UserProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/pengaturan" element={
                  <ProtectedRoute>
                    <PengaturanPage />
                  </ProtectedRoute>
                } />
                <Route path="/bantuan" element={
                  <ProtectedRoute>
                    <BantuanPage />
                  </ProtectedRoute>
                } />
                <Route path="/games/kuis-budaya" element={
                  <ProtectedRoute>
                    <KuisBudayaPage />
                  </ProtectedRoute>
                } />
                <Route path="/games/puzzle-budaya" element={
                  <ProtectedRoute>
                    <PuzzleBudayaPage />
                  </ProtectedRoute>
                } />
                <Route path="/games/tebak-daerah" element={
                  <ProtectedRoute>
                    <TebakDaerahPage />
                  </ProtectedRoute>
                } />
                <Route path="/saved" element={
                  <ProtectedRoute>
                    <SavedPostsPage />
                  </ProtectedRoute>
                } />
                <Route path="/berita" element={
                  <ProtectedRoute>
                    <BeritaPage />
                  </ProtectedRoute>
                } />
                <Route path="/berita/:id" element={
                  <ProtectedRoute>
                    <BeritaDetailPage />
                  </ProtectedRoute>
                } />
                <Route path="/permainan" element={
                  <ProtectedRoute>
                    <PermainanPage />
                  </ProtectedRoute>
                } />
                <Route path="/seller" element={
                  <ProtectedRoute>
                    <SellerCenterPage />
                  </ProtectedRoute>
                } />
                <Route path="/toko" element={
                  <ProtectedRoute>
                    <ShopProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/toko/:username" element={
                  <ProtectedRoute>
                    <ShopProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/buka-toko" element={
                  <ProtectedRoute>
                    <BukaTokoPage />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<LandingPage />} />
              </Routes>
            </Suspense>
          </Router>
        </CartProvider>
        </SellerProvider>
      </NotificationProvider>
    </AuthProvider>
  </ErrorBoundary>
  );
}
