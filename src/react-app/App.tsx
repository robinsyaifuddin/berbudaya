import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from '@getmocha/users-service/react';
import { CartProvider } from '@/react-app/contexts/CartContext';
import HomePage from "@/react-app/pages/Home";
import MarketplacePage from "@/react-app/pages/Marketplace";
import ProductDetailPage from "@/react-app/pages/ProductDetail";
import CartPage from "@/react-app/pages/Cart";
import CheckoutPage from "@/react-app/pages/CheckoutPage";
import ProyekPage from "@/react-app/pages/Proyek";
import Edukasi from "@/react-app/pages/Edukasi";
import KomunitasPage from "@/react-app/pages/Komunitas";
import JaringanPage from "@/react-app/pages/Jaringan";
import CrowdfundingPage from "@/react-app/pages/Crowdfunding";
import CrowdfundingDetailPage from "@/react-app/pages/CrowdfundingDetail";
import CrowdfundingDonatePage from "@/react-app/pages/CrowdfundingDonate";
import AcaraPage from "@/react-app/pages/Acara";
import PesanPage from "@/react-app/pages/Pesan";
import ProfilPage from "@/react-app/pages/Profil";
import ProfilMenuPage from "@/react-app/pages/ProfilMenu";
import PengaturanPage from "@/react-app/pages/Pengaturan";
import BantuanPage from "@/react-app/pages/Bantuan";
import LandingPage from "@/react-app/pages/Landing";
import GalleryPage from "@/react-app/pages/Gallery";
import AuthCallbackPage from "@/react-app/pages/AuthCallback";
import ProtectedRoute from "@/react-app/components/ProtectedRoute";
import KuisBudayaPage from "@/react-app/pages/games/KuisBudayaPage";
import PuzzleBudayaPage from "@/react-app/pages/games/PuzzleBudayaPage";
import TebakDaerahPage from "@/react-app/pages/games/TebakDaerahPage";
import SavedPostsPage from "@/react-app/pages/SavedPosts";
import UserProfilePage from "@/react-app/pages/UserProfile";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
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
              <KomunitasPage />
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
          <Route path="*" element={<LandingPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
