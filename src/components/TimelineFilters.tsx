import { motion } from "framer-motion";
import { Calendar, Filter, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface TimelineFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
  currentFilters: any;
}

export const TimelineFilters = ({ isOpen, onClose, onApplyFilters, currentFilters }: TimelineFiltersProps) => {
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    type: "all",
    search: "",
    ...currentFilters
  });

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      dateFrom: "",
      dateTo: "",
      type: "all",
      search: ""
    };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-lg rounded-3xl shadow-2xl"
        style={{
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)"
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Filter size={24} className="mr-3 text-pet-orange-500" />
              Filtres avancés
            </h2>
            <motion.button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} className="text-gray-600" />
            </motion.button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 space-y-6">
          {/* Recherche */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Rechercher</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                placeholder="Rechercher dans la timeline..."
                className="pl-10 bg-white/80 backdrop-blur-sm border-white/30 shadow-lg"
              />
            </div>
          </div>

          {/* Type d'événement */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Type d'événement</label>
            <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
              <SelectTrigger className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-md border-white/30">
                <SelectItem value="all">Tous les événements</SelectItem>
                <SelectItem value="photos">Photos uniquement</SelectItem>
                <SelectItem value="videos">Vidéos uniquement</SelectItem>
                <SelectItem value="medical">Événements médicaux</SelectItem>
                <SelectItem value="activities">Activités</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Période */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date de début</label>
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date de fin</label>
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-white/20 flex gap-3">
          <Button 
            variant="outline" 
            onClick={handleReset}
            className="flex-1 bg-white/80 backdrop-blur-sm border-white/30 shadow-lg hover:bg-white/90"
          >
            Réinitialiser
          </Button>
          <Button 
            onClick={handleApply}
            className="flex-1 bg-gradient-to-r from-pet-orange-500 to-pet-orange-600 hover:from-pet-orange-600 hover:to-pet-orange-700 text-white shadow-lg"
          >
            Appliquer
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};