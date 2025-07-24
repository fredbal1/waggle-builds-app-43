
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, AlertTriangle, Heart, Car, Shield, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const emergencyContacts = [
  {
    id: 1,
    name: "Dr. Martin - Vétérinaire habituel",
    phone: "01 23 45 67 89",
    address: "123 Rue de la Santé, 75001 Paris",
    distance: "2.3 km",
    availability: "Fermé",
    type: "regular"
  },
  {
    id: 2,
    name: "Clinique Vétérinaire d'Urgence",
    phone: "01 98 76 54 32",
    address: "456 Avenue de l'Urgence, 75002 Paris",
    distance: "1.8 km",
    availability: "24h/24",
    type: "emergency"
  },
  {
    id: 3,
    name: "Centre Hospitalier Vétérinaire",
    phone: "01 11 22 33 44",
    address: "789 Boulevard du Secours, 75003 Paris",
    distance: "3.1 km",
    availability: "Ouvert",
    type: "hospital"
  }
];

const firstAidSteps = [
  {
    title: "Gardez votre calme",
    description: "Votre stress peut angoisser votre animal",
    icon: "🧘‍♀️"
  },
  {
    title: "Sécurisez la zone",
    description: "Éloignez les autres animaux et personnes",
    icon: "🛡️"
  },
  {
    title: "Évaluez la situation",
    description: "Respiration, conscience, saignements",
    icon: "👀"
  },
  {
    title: "Contactez un vétérinaire",
    description: "Décrivez précisément les symptômes",
    icon: "📞"
  }
];

const quickActions = [
  { label: "Empoisonnement", icon: "⚠️", action: "poison" },
  { label: "Blessure", icon: "🩹", action: "injury" },
  { label: "Convulsions", icon: "⚡", action: "seizure" },
  { label: "Étouffement", icon: "🫁", action: "choking" }
];

const Emergency = () => {
  const [selectedAnimal, setSelectedAnimal] = useState("Max");
  const [emergencyType, setEmergencyType] = useState<string | null>(null);

  const callEmergency = (phone: string, name: string) => {
    // Haptic feedback for emergency call
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 100]);
    }
    window.open(`tel:${phone}`);
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Alert Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 safe-area-top">
        <div className="px-6 py-6">
          <motion.div
            className="text-center text-white"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
          >
            <motion.div
              className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <AlertTriangle size={32} />
            </motion.div>
            
            <h1 className="text-2xl font-bold mb-2">Mode Urgence</h1>
            <p className="opacity-90">Aide immédiate pour {selectedAnimal}</p>
            
            <motion.div
              className="mt-4 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 inline-block"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-sm font-medium">🚨 Assistance d'urgence activée</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-8">
        {/* Quick Actions */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Que se passe-t-il ?</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.action}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  emergencyType === action.action
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-gray-800 border-gray-200 hover:border-red-300"
                }`}
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setEmergencyType(action.action)}
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <p className="font-medium text-sm">{action.label}</p>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Emergency Contacts */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Contacts d'urgence</h2>
          
          <div className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    contact.type === "emergency" ? "bg-red-100" :
                    contact.type === "hospital" ? "bg-blue-100" : "bg-emerald-100"
                  }`}>
                    {contact.type === "emergency" ? (
                      <AlertTriangle size={24} className="text-red-600" />
                    ) : contact.type === "hospital" ? (
                      <Shield size={24} className="text-blue-600" />
                    ) : (
                      <Heart size={24} className="text-emerald-600" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{contact.name}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <MapPin size={14} />
                        <span>{contact.distance}</span>
                      </span>
                      <span className={`flex items-center space-x-1 ${
                        contact.availability === "24h/24" ? "text-green-600" :
                        contact.availability === "Ouvert" ? "text-blue-600" : "text-red-600"
                      }`}>
                        <Clock size={14} />
                        <span>{contact.availability}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <motion.button
                      className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => {
                        // Open maps
                        window.open(`https://maps.google.com/?q=${encodeURIComponent(contact.address)}`);
                      }}
                    >
                      <Car size={20} className="text-white" />
                    </motion.button>
                    
                    <motion.button
                      className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                      animate={{ 
                        boxShadow: contact.type === "emergency" 
                          ? ["0 4px 16px rgba(34, 197, 94, 0.4)", "0 8px 32px rgba(34, 197, 94, 0.6)", "0 4px 16px rgba(34, 197, 94, 0.4)"]
                          : "0 4px 16px rgba(34, 197, 94, 0.4)"
                      }}
                      transition={{ duration: 1.5, repeat: contact.type === "emergency" ? Infinity : 0 }}
                      onClick={() => callEmergency(contact.phone, contact.name)}
                    >
                      <Phone size={20} className="text-white" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* First Aid */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Premiers secours</h2>
          
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
            {firstAidSteps.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="text-2xl">{step.icon}</div>
                <div>
                  <p className="font-bold text-gray-800">{index + 1}. {step.title}</p>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Important Info */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-6 text-white">
            <div className="flex items-start space-x-4">
              <Info size={24} className="mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-2">Informations importantes</h3>
                <div className="space-y-2 text-sm opacity-90">
                  <p>• Gardez le carnet de santé de {selectedAnimal} à portée de main</p>
                  <p>• Notez l'heure et les symptômes observés</p>
                  <p>• Ne donnez aucun médicament sans avis vétérinaire</p>
                  <p>• En cas de convulsions, ne touchez pas la gueule</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Emergency Call Button */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            className="w-full h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl text-white font-bold text-lg shadow-2xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={{ 
              boxShadow: ["0 8px 32px rgba(239, 68, 68, 0.4)", "0 12px 48px rgba(239, 68, 68, 0.6)", "0 8px 32px rgba(239, 68, 68, 0.4)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => callEmergency("15", "SAMU Vétérinaire")}
          >
            <div className="flex items-center justify-center space-x-3">
              <Phone size={24} />
              <span>Appel d'urgence vétérinaire - 15</span>
            </div>
          </motion.button>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Emergency;
