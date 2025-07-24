
import { motion } from "framer-motion";
import { Plus, Bell, Search, Calendar, Activity, Heart, Camera, MessageCircle } from "lucide-react";
import { AnimalCard } from "@/components/AnimalCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Mock data - à remplacer par des données réelles
const mockAnimals = [
  {
    id: "1",
    name: "Max",
    breed: "Golden Retriever",
    age: "3 ans",
    photo: "/placeholder.svg",
    healthStatus: "excellent" as const,
    lastActivity: "Balade ce matin",
    upcomingEvent: "Vaccin dans 2 semaines",
    color: "orange" as const
  },
  {
    id: "2", 
    name: "Luna",
    breed: "Chat Persan",
    age: "2 ans",
    healthStatus: "good" as const,
    lastActivity: "Repas il y a 3h",
    color: "blue" as const
  },
  {
    id: "3",
    name: "Charlie",
    breed: "Border Collie", 
    age: "5 ans",
    healthStatus: "attention" as const,
    lastActivity: "Visite vétérinaire hier",
    upcomingEvent: "Contrôle dans 3 jours",
    color: "emerald" as const
  }
];

const quickActions = [
  { icon: Camera, label: "Photo", color: "bg-blue-500", action: "add-photo" },
  { icon: Calendar, label: "RDV", color: "bg-emerald-500", action: "add-appointment" },
  { icon: Activity, label: "Activité", color: "bg-purple-500", action: "add-activity" },
  { icon: Heart, label: "Santé", color: "bg-red-500", action: "add-health" }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);

  const upcomingEvents = [
    { id: 1, animal: "Max", event: "Vaccin rappel", date: "Dans 2 semaines", type: "health" },
    { id: 2, animal: "Charlie", event: "Contrôle vétérinaire", date: "Dans 3 jours", type: "checkup" },
    { id: 3, animal: "Luna", event: "Toilettage", date: "Vendredi", type: "care" }
  ];

  const petSoulAdvice = {
    message: "Max semble moins actif ces derniers jours. Pensez à augmenter la durée de ses balades.",
    confidence: "85%",
    animal: "Max"
  };

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
          <div className="flex items-center justify-between mb-4">
            <div>
              <motion.h1 
                className="text-2xl font-bold text-gray-800"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Bonjour ! 👋
              </motion.h1>
              <motion.p 
                className="text-gray-600"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Comment vont vos compagnons aujourd'hui ?
              </motion.p>
            </div>
            
            <div className="flex space-x-3">
              <motion.button
                className="p-3 bg-gray-100 rounded-full"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                <Search size={20} className="text-gray-600" />
              </motion.button>
              
              <motion.button
                className="p-3 bg-gray-100 rounded-full relative"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                <Bell size={20} className="text-gray-600" />
                <motion.div 
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>
            </div>
          </div>

          {/* Quick Actions */}
          <motion.div 
            className="flex space-x-3 overflow-x-auto hide-scrollbar"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.action}
                  className={`flex flex-col items-center p-4 ${action.color} rounded-2xl text-white min-w-[80px] shadow-lg`}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                >
                  <Icon size={24} className="mb-2" />
                  <span className="text-xs font-medium">{action.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-8">
        {/* Animals Section */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Mes compagnons</h2>
            <Button
              onClick={() => navigate("/add-animal")}
              size="sm"
              className="bg-pet-orange-500 hover:bg-pet-orange-600"
            >
              <Plus size={16} className="mr-1" />
              Ajouter
            </Button>
          </div>

          <div className="space-y-4">
            {mockAnimals.map((animal, index) => (
              <motion.div
                key={animal.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <AnimalCard {...animal} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* PetSoul AI Advice */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Conseil PetSoul IA</h2>
          
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl p-6 text-white relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate("/petsoul")}
          >
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-3">
                <motion.div
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MessageCircle size={20} />
                </motion.div>
                <div>
                  <p className="font-medium">PetSoul observe {petSoulAdvice.animal}</p>
                  <p className="text-sm opacity-80">Confiance: {petSoulAdvice.confidence}</p>
                </div>
              </div>
              
              <p className="text-sm leading-relaxed mb-4">
                {petSoulAdvice.message}
              </p>
              
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-0"
              >
                Voir plus de conseils
              </Button>
            </div>
          </motion.div>
        </motion.section>

        {/* Upcoming Events */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Événements à venir</h2>
          
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center space-x-4"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  event.type === "health" ? "bg-red-100" :
                  event.type === "checkup" ? "bg-blue-100" : "bg-green-100"
                }`}>
                  <Calendar size={20} className={
                    event.type === "health" ? "text-red-600" :
                    event.type === "checkup" ? "text-blue-600" : "text-green-600"
                  } />
                </div>
                
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{event.event}</p>
                  <p className="text-sm text-gray-600">{event.animal} • {event.date}</p>
                </div>
                
                <motion.div
                  className="w-2 h-2 bg-pet-orange-400 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Dashboard;
