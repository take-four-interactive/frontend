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
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminReservations from "@/pages/admin/AdminReservations";
import AdminReservationDetail from "@/pages/admin/AdminReservationDetail";
import AdminAvailability from "@/pages/admin/AdminAvailability";
import AdminSettings from "@/pages/admin/AdminSettings";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('mosir_admin_token');
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
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="rezerwacje" element={<AdminReservations />} />
            <Route path="rezerwacje/:id" element={<AdminReservationDetail />} />
            <Route path="dostepnosc" element={<AdminAvailability />} />
            <Route path="ustawienia" element={<AdminSettings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
