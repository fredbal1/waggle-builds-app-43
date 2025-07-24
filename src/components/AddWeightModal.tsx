import { motion } from "framer-motion";
import { X, Weight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface AddWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (weightEntry: any) => void;
}

export const AddWeightModal = ({ isOpen, onClose, onAdd }: AddWeightModalProps) => {
  const [formData, setFormData] = useState({
    weight: "",
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    location: "",
    notes: ""
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newWeightEntry = {
      id: Date.now(),
      weight: parseFloat(formData.weight),
      date: formData.date,
      time: formData.time,
      location: formData.location,
      notes: formData.notes
    };

    onAdd(newWeightEntry);
    onClose();
    
    setFormData({
      weight: "",
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      location: "",
      notes: ""
    });
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-t-3xl shadow-2xl"
        style={{
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)"
        }}
        initial={{ y: "100%", scale: 0.9 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: "100%", scale: 0.9 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-white/20 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Weight size={24} className="mr-3 text-emerald-500" />
                Ajouter une pesée
              </h2>
              <p className="text-sm text-gray-600">Nouvelle mesure de poids</p>
            </div>
            <motion.button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} className="text-gray-600" />
            </motion.button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Poids */}
          <div className="space-y-2">
            <Label htmlFor="weight" className="text-sm font-medium text-gray-700">Poids (kg)</Label>
            <div className="relative">
              <Input
                id="weight"
                type="number"
                step="0.1"
                min="0"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                placeholder="28.5"
                className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg pr-12"
                required
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">kg</span>
            </div>
          </div>

          {/* Date et heure */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium text-gray-700">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-medium text-gray-700">Heure</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg"
              />
            </div>
          </div>

          {/* Lieu de pesée */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium text-gray-700">Lieu de pesée (optionnel)</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Vétérinaire, maison, animalerie..."
              className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium text-gray-700">Notes (optionnel)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Conditions de pesée, observations..."
              className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg min-h-[80px]"
              rows={3}
            />
          </div>

          {/* Indication de la zone idéale */}
          <div className="p-4 bg-emerald-50/80 backdrop-blur-sm rounded-2xl border border-emerald-200/50">
            <p className="text-sm text-emerald-700 font-medium">💡 Zone de poids idéale</p>
            <p className="text-sm text-emerald-600">Pour votre Golden Retriever: 25 - 30 kg</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button 
              type="button"
              variant="outline" 
              className="flex-1 bg-white/80 backdrop-blur-sm border-white/30 shadow-lg hover:bg-white/90"
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button 
              type="submit"
              className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg"
              disabled={!formData.weight || !formData.date}
            >
              Ajouter
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};