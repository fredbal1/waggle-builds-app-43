
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AnimalProfile from "./pages/AnimalProfile";
import PetSoulAI from "./pages/PetSoulAI";
import Gallery from "./pages/Gallery";
import UserProfile from "./pages/UserProfile";
import Settings from "./pages/Settings";
import Emergency from "./pages/Emergency";
import NotFound from "./pages/NotFound";
import { BottomNavigation } from "./components/BottomNavigation";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  const hideBottomNav = ["/", "/home"].includes(location.pathname);
  
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/animal/:id" element={<AnimalProfile />} />
          <Route path="/petsoul" element={<PetSoulAI />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      
      {!hideBottomNav && <BottomNavigation />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
