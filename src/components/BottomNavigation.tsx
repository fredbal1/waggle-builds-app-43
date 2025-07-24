
import { Home, Calendar, Camera, MessageCircle, User, AlertTriangle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navigationItems = [
  { icon: Home, path: "/dashboard", label: "Accueil" },
  { icon: Calendar, path: "/gallery", label: "Souvenirs" },
  { icon: MessageCircle, path: "/petsoul", label: "IA" },
  { icon: User, path: "/profile", label: "Profil" },
];

export const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleEmergency = () => {
    // Haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate([10, 50, 10]);
    }
    navigate("/emergency");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom">
      <div className="bg-white/80 backdrop-blur-lg border-t border-gray-200/50 px-4 py-2">
        <div className="flex items-center justify-around max-w-screen-sm mx-auto relative">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200",
                  "min-w-[60px] tap-highlight-none",
                  isActive 
                    ? "text-pet-orange-500 bg-pet-orange-50" 
                    : "text-gray-500 hover:text-gray-700"
                )}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <Icon size={24} className="mb-1" />
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 w-1 h-1 bg-pet-orange-500 rounded-full"
                      layoutId="activeIndicator"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      style={{ x: "-50%" }}
                    />
                  )}
                </div>
                <span className={cn(
                  "text-xs font-medium transition-colors",
                  isActive ? "text-pet-orange-600" : "text-gray-500"
                )}>
                  {item.label}
                </span>
              </motion.button>
            );
          })}
          
          {/* Emergency Button */}
          <motion.button
            onClick={handleEmergency}
            className="flex flex-col items-center justify-center p-2 bg-red-500 text-white rounded-xl min-w-[60px] tap-highlight-none"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            animate={{ 
              boxShadow: location.pathname === "/emergency" 
                ? "0 0 20px rgba(239, 68, 68, 0.5)" 
                : "0 4px 12px rgba(239, 68, 68, 0.3)" 
            }}
          >
            <AlertTriangle size={24} className="mb-1" />
            <span className="text-xs font-medium">Urgence</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};
