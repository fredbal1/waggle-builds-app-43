
import { motion } from "framer-motion";
import { Camera, Filter, Search, Heart, Play, Calendar, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const mockMemories = [
  { id: 1, type: "photo", url: "/placeholder.svg", date: "2024-01-22", animal: "Max", caption: "Première neige!", mood: "😊", tags: ["hiver", "jeu"] },
  { id: 2, type: "video", url: "/placeholder.svg", date: "2024-01-21", animal: "Luna", caption: "Luna découvre son nouveau jouet", mood: "😸", tags: ["jouet", "découverte"] },
  { id: 3, type: "photo", url: "/placeholder.svg", date: "2024-01-20", animal: "Max", caption: "Sieste au soleil", mood: "😴", tags: ["repos", "soleil"] },
  { id: 4, type: "photo", url: "/placeholder.svg", date: "2024-01-19", animal: "Charlie", caption: "Entraînement d'agilité", mood: "💪", tags: ["sport", "entraînement"] },
  { id: 5, type: "video", url: "/placeholder.svg", date: "2024-01-18", animal: "Max", caption: "Max apprend 'donne la patte'", mood: "🤓", tags: ["apprentissage", "dressage"] },
  { id: 6, type: "photo", url: "/placeholder.svg", date: "2024-01-17", animal: "Luna", caption: "Câlins du matin", mood: "🥰", tags: ["câlin", "matin"] }
];

const filterTags = ["Tous", "Max", "Luna", "Charlie", "Jeu", "Repos", "Apprentissage", "Santé"];
const viewModes = ["grid", "list"] as const;

const Gallery = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFilter, setSelectedFilter] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null);

  const filteredMemories = mockMemories.filter(memory => {
    const matchesFilter = selectedFilter === "Tous" || 
                         memory.animal === selectedFilter || 
                         memory.tags.includes(selectedFilter.toLowerCase());
    const matchesSearch = memory.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         memory.animal.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 safe-area-top">
        <div className="px-6 py-4">
          <motion.div
            className="text-center mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Souvenirs</h1>
            <p className="text-gray-600">Tous vos moments précieux en un lieu</p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="relative mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher dans vos souvenirs..."
              className="pl-10 rounded-2xl border-gray-200 focus:border-purple-400"
            />
          </motion.div>

          {/* Filters */}
          <motion.div
            className="flex space-x-2 overflow-x-auto hide-scrollbar mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {filterTags.map((tag, index) => (
              <motion.button
                key={tag}
                onClick={() => setSelectedFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedFilter === tag
                    ? "bg-purple-500 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5 + index * 0.05, type: "spring" }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>

          {/* View Toggle */}
          <motion.div
            className="flex items-center justify-between"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-sm text-gray-600">
              {filteredMemories.length} souvenir(s)
            </span>
            
            <div className="flex bg-gray-100 rounded-xl p-1">
              {viewModes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === mode ? "bg-white shadow-sm" : "text-gray-500"
                  }`}
                >
                  {mode === "grid" ? <Grid size={16} /> : <List size={16} />}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Grid View */}
        {viewMode === "grid" && (
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {filteredMemories.map((memory, index) => (
              <motion.div
                key={memory.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMemory(memory.id)}
              >
                <div className="relative aspect-square bg-gray-100">
                  <img 
                    src={memory.url} 
                    alt={memory.caption}
                    className="w-full h-full object-cover"
                  />
                  
                  {memory.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                        <Play size={20} className="text-white ml-1" />
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-white text-xs font-medium">{memory.animal}</span>
                  </div>
                  
                  <div className="absolute top-3 right-3 text-xl">
                    {memory.mood}
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="font-medium text-gray-800 text-sm leading-relaxed line-clamp-2">
                    {memory.caption}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">
                      {new Date(memory.date).toLocaleDateString('fr-FR')}
                    </span>
                    <motion.button
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      whileTap={{ scale: 0.8 }}
                    >
                      <Heart size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {filteredMemories.map((memory, index) => (
              <motion.div
                key={memory.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedMemory(memory.id)}
              >
                <div className="flex space-x-4">
                  <div className="relative w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img 
                      src={memory.url} 
                      alt={memory.caption}
                      className="w-full h-full object-cover"
                    />
                    {memory.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 bg-black/50 rounded-full flex items-center justify-center">
                          <Play size={12} className="text-white ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-800">{memory.caption}</p>
                        <p className="text-sm text-gray-600">{memory.animal}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{memory.mood}</span>
                        <motion.button
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          whileTap={{ scale: 0.8 }}
                        >
                          <Heart size={16} />
                        </motion.button>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Calendar size={14} />
                        <span className="text-xs">
                          {new Date(memory.date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      
                      <div className="flex space-x-1">
                        {memory.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {filteredMemories.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Camera size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Aucun souvenir trouvé</h3>
            <p className="text-gray-600 mb-6">Commencez à capturer les moments précieux avec vos compagnons</p>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
              <Camera size={16} className="mr-2" />
              Ajouter un souvenir
            </Button>
          </motion.div>
        )}
      </div>

      {/* Add Memory Button */}
      <motion.button
        className="fixed bottom-32 right-6 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          boxShadow: ["0 8px 32px rgba(168, 85, 247, 0.4)", "0 8px 32px rgba(236, 72, 153, 0.4)", "0 8px 32px rgba(168, 85, 247, 0.4)"]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Camera size={24} className="text-white" />
      </motion.button>
    </motion.div>
  );
};

export default Gallery;
