
import { motion } from "framer-motion";
import { User, Settings, Bell, Shield, Heart, Camera, Edit, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";

const mockUserData = {
  name: "Marie Dubois",
  email: "marie.dubois@email.com",
  phone: "06 12 34 56 78",
  address: "123 Rue de la Paix, 75001 Paris",
  avatar: "/placeholder.svg",
  memberSince: "2023-01-15",
  animalsCount: 3,
  memoriesCount: 127,
  subscription: "Premium"
};

const statsData = [
  { label: "Animaux", value: mockUserData.animalsCount, icon: Heart, color: "text-red-500" },
  { label: "Souvenirs", value: mockUserData.memoriesCount, icon: Camera, color: "text-blue-500" },
  { label: "Jours", value: Math.floor((new Date().getTime() - new Date(mockUserData.memberSince).getTime()) / (1000 * 60 * 60 * 24)), icon: User, color: "text-emerald-500" }
];

const menuItems = [
  { icon: Bell, label: "Notifications", action: "notifications", hasSwitch: true, enabled: true },
  { icon: Shield, label: "Confidentialité", action: "privacy" },
  { icon: Settings, label: "Paramètres", action: "settings" },
  { icon: Heart, label: "Abonnement Premium", action: "subscription", badge: "Premium" },
];

const UserProfile = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header Profile */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 safe-area-top">
        <div className="px-6 py-8">
          <motion.div
            className="text-center text-white"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="relative w-24 h-24 mx-auto mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-full h-full bg-white rounded-full border-4 border-white shadow-lg overflow-hidden">
                <img src={mockUserData.avatar} alt={mockUserData.name} className="w-full h-full object-cover" />
              </div>
              <motion.button
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-pet-orange-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                <Edit size={14} className="text-white" />
              </motion.button>
            </motion.div>

            <h1 className="text-2xl font-bold mb-1">{mockUserData.name}</h1>
            <p className="opacity-90 mb-4">Membre depuis {new Date(mockUserData.memberSince).toLocaleDateString('fr-FR')}</p>
            
            <motion.div
              className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 inline-block"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-sm font-medium">✨ {mockUserData.subscription}</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-8">
        {/* Stats */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid grid-cols-3 gap-4">
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon size={24} className={`mx-auto mb-3 ${stat.color}`} />
                  <p className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Contact Info */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Informations personnelles</h2>
          
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail size={20} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-800">{mockUserData.email}</p>
              </div>
              <Button variant="ghost" size="sm">
                <Edit size={16} />
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <Phone size={20} className="text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Téléphone</p>
                <p className="font-medium text-gray-800">{mockUserData.phone}</p>
              </div>
              <Button variant="ghost" size="sm">
                <Edit size={16} />
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <MapPin size={20} className="text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Adresse</p>
                <p className="font-medium text-gray-800">{mockUserData.address}</p>
              </div>
              <Button variant="ghost" size="sm">
                <Edit size={16} />
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Menu Options */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Préférences</h2>
          
          <div className="space-y-3">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Icon size={20} className="text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{item.label}</p>
                        {item.badge && (
                          <span className="inline-block mt-1 px-2 py-1 bg-gradient-to-r from-pet-orange-400 to-pet-orange-600 text-white text-xs font-medium rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {item.hasSwitch ? (
                      <Switch defaultChecked={item.enabled} />
                    ) : (
                      <motion.button
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                        whileTap={{ scale: 0.9 }}
                        onClick={() => item.action === "settings" && navigate("/settings")}
                      >
                        <Settings size={16} className="text-gray-600" />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Actions */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="space-y-3"
        >
          <Button
            variant="outline"
            className="w-full h-12 border-2 border-gray-200 hover:bg-gray-50"
          >
            Exporter mes données
          </Button>
          
          <Button
            variant="outline"
            className="w-full h-12 border-2 border-red-200 text-red-600 hover:bg-red-50"
          >
            Supprimer mon compte
          </Button>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default UserProfile;
