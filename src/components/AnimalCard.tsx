
import { motion } from "framer-motion";
import { Heart, Calendar, AlertCircle, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AnimalCardProps {
  id: string;
  name: string;
  breed: string;
  age: string;
  photo?: string;
  healthStatus: "excellent" | "good" | "attention" | "urgent";
  lastActivity: string;
  upcomingEvent?: string;
  color?: "orange" | "blue" | "emerald" | "purple";
  className?: string;
}

const healthStatusConfig = {
  excellent: { color: "text-emerald-600", bg: "bg-emerald-50", icon: "💚" },
  good: { color: "text-blue-600", bg: "bg-blue-50", icon: "💙" },
  attention: { color: "text-orange-600", bg: "bg-orange-50", icon: "💛" },
  urgent: { color: "text-red-600", bg: "bg-red-50", icon: "❤️" }
};

const colorSchemes = {
  orange: "from-pet-orange-400 to-pet-orange-600",
  blue: "from-pet-blue-400 to-pet-blue-600", 
  emerald: "from-pet-emerald-400 to-pet-emerald-600",
  purple: "from-pet-purple-400 to-pet-purple-600"
};

export const AnimalCard = ({
  id,
  name,
  breed,
  age,
  photo,
  healthStatus,
  lastActivity,
  upcomingEvent,
  color = "orange",
  className
}: AnimalCardProps) => {
  const navigate = useNavigate();
  const statusConfig = healthStatusConfig[healthStatus];

  const handleTap = () => {
    // Haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
    navigate(`/animal/${id}`);
  };

  return (
    <motion.div
      className={cn(
        "bg-white rounded-3xl shadow-lg overflow-hidden tap-highlight-none",
        "border border-gray-100 cursor-pointer",
        className
      )}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleTap}
      layout
    >
      {/* Header with gradient */}
      <div className={`h-24 bg-gradient-to-r ${colorSchemes[color]} relative overflow-hidden`}>
        <motion.div
          className="absolute inset-0 bg-white/10"
          animate={{ x: [-100, 100] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="absolute top-4 right-4">
          <motion.div
            className={`${statusConfig.bg} ${statusConfig.color} px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1`}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>{statusConfig.icon}</span>
            <span className="capitalize">{healthStatus}</span>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 relative">
        {/* Photo Avatar */}
        <motion.div
          className="absolute -top-8 left-4 w-16 h-16 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden"
          whileHover={{ scale: 1.1 }}
        >
          {photo ? (
            <img src={photo} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${colorSchemes[color]} flex items-center justify-center`}>
              <Heart size={24} className="text-white" />
            </div>
          )}
        </motion.div>

        <div className="ml-20 space-y-3">
          <div>
            <h3 className="font-bold text-gray-800 text-lg">{name}</h3>
            <p className="text-gray-500 text-sm">{breed} • {age}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-gray-600 text-sm">
              <Calendar size={16} />
              <span>{lastActivity}</span>
            </div>

            {upcomingEvent && (
              <motion.div
                className="flex items-center space-x-2 text-pet-orange-600 text-sm font-medium"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertCircle size={16} />
                <span>{upcomingEvent}</span>
              </motion.div>
            )}
          </div>

          {/* Quick actions */}
          <div className="flex space-x-3 pt-2">
            <motion.button
              className="flex-1 bg-gray-50 hover:bg-gray-100 py-2 px-3 rounded-xl text-sm font-medium text-gray-700 transition-colors"
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                // Navigate to add photo
                console.log("Add photo for", name);
              }}
            >
              <Camera size={16} className="inline mr-1" />
              Photo
            </motion.button>

            <motion.button
              className={`flex-1 bg-gradient-to-r ${colorSchemes[color]} text-white py-2 px-3 rounded-xl text-sm font-medium transition-all`}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/animal/${id}`);
              }}
            >
              Voir le profil
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
