import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LandingPage from "@/pages/LandingPage";
import BookingWizard from "@/pages/BookingWizard";
import ReservationLookup from "@/pages/ReservationLookup";
import FindReservation from "./pages/FindReservation";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminReservations from "@/pages/admin/AdminReservations";
import AdminReservationDetail from "@/pages/admin/AdminReservationDetail";
import AdminAvailability from "@/pages/admin/AdminAvailability";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminTechnicalBrake from "./pages/admin/AdminTechnicalBrake";
import NotFound from "@/pages/NotFound";
import { getAdminSession } from '@/lib/cookies';

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = getAdminSession();
  if (!token) return <Navigate to="/admin" replace />;
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<><LandingPage /><Footer /></>} />
          <Route path="/rezerwacja" element={<BookingWizard />} />
          <Route path="/rezerwacja/:number" element={<ReservationLookup />} />
          <Route path="/znajdz-rezerwacje" element={<><FindReservation /><Footer /></>} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/rezerwacje" element={<AdminReservations />} />
            <Route path="/admin/rezerwacje/:id" element={<AdminReservationDetail />} />
            <Route path="/admin/dostepnosc" element={<AdminAvailability />} />
            <Route path="/admin/przerwa-techniczna" element={<AdminTechnicalBrake />} />
            <Route path="/admin/ustawienia" element={<AdminSettings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
