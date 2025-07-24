
import { motion } from "framer-motion";
import { ArrowLeft, Bell, Moon, Globe, Smartphone, Volume2, Shield, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const settingsGroups = [
  {
    title: "Notifications",
    icon: Bell,
    settings: [
      { id: "push", label: "Notifications push", description: "Recevoir les alertes importantes", enabled: true },
      { id: "email", label: "Notifications email", description: "Recevoir un résumé hebdomadaire", enabled: false },
      { id: "reminders", label: "Rappels de santé", description: "Vaccins, visites vétérinaires", enabled: true },
      { id: "tips", label: "Conseils PetSoul", description: "Conseils personnalisés de l'IA", enabled: true }
    ]
  },
  {
    title: "Apparence",
    icon: Moon,
    settings: [
      { id: "theme", label: "Thème", description: "Clair ou sombre", type: "select", options: ["Clair", "Sombre", "Auto"] },
      { id: "haptic", label: "Retour haptique", description: "Vibrations lors des interactions", enabled: true }
    ]
  },
  {
    title: "Confidentialité",
    icon: Shield,
    settings: [
      { id: "analytics", label: "Analyse d'usage", description: "Aider à améliorer l'application", enabled: false },
      { id: "location", label: "Localisation", description: "Pour trouver les vétérinaires proches", enabled: true },
      { id: "photos", label: "Sauvegarde photos", description: "Synchroniser avec le cloud", enabled: true }
    ]
  },
  {
    title: "Application",
    icon: Smartphone,
    settings: [
      { id: "language", label: "Langue", description: "Français", type: "select", options: ["Français", "English", "Español"] },
      { id: "sound", label: "Sons", description: "Sons d'interface", enabled: true },
      { id: "cache", label: "Cache", description: "Vider le cache de l'application", type: "action" }
    ]
  }
];

const Settings = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 safe-area-top">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </motion.button>
            
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Paramètres</h1>
              <p className="text-gray-600">Personnalisez votre expérience MyVeto</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-8">
        {settingsGroups.map((group, groupIndex) => {
          const GroupIcon = group.icon;
          return (
            <motion.section
              key={group.title}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + groupIndex * 0.1 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-pet-orange-100 rounded-full flex items-center justify-center">
                  <GroupIcon size={20} className="text-pet-orange-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{group.title}</h2>
              </div>
              
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                {group.settings.map((setting, index) => (
                  <motion.div
                    key={setting.id}
                    className={`p-4 ${index !== group.settings.length - 1 ? 'border-b border-gray-100' : ''}`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + groupIndex * 0.1 + index * 0.05 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{setting.label}</p>
                        <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                      </div>
                      
                      <div className="ml-4">
                        {setting.type === "select" ? (
                          <Select defaultValue={setting.options?.[0]}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {setting.options?.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : setting.type === "action" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            Vider
                          </Button>
                        ) : (
                          <Switch 
                            defaultChecked={setting.enabled}
                            onCheckedChange={(checked) => {
                              // Haptic feedback simulation
                              if (navigator.vibrate && checked) {
                                navigator.vibrate(10);
                              }
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          );
        })}

        {/* About Section */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <Database size={20} className="text-gray-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">À propos</h2>
          </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Version de l'application</span>
              <span className="font-medium text-gray-800">1.2.0</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Dernière mise à jour</span>
              <span className="font-medium text-gray-800">15 janvier 2024</span>
            </div>
            
            <div className="border-t border-gray-100 pt-4 space-y-3">
              <Button variant="ghost" className="w-full justify-start">
                Conditions d'utilisation
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Politique de confidentialité
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Nous contacter
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Reset Button */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            variant="outline"
            className="w-full h-12 border-2 border-red-200 text-red-600 hover:bg-red-50"
          >
            Réinitialiser les paramètres
          </Button>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Settings;
