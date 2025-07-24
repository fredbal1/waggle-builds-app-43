import { motion } from "framer-motion";
import { X, Syringe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface AddVaccinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (vaccination: any) => void;
}

export const AddVaccinationModal = ({ isOpen, onClose, onAdd }: AddVaccinationModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    customName: "",
    date: new Date().toISOString().split('T')[0],
    nextDue: "",
    veterinarian: "",
    notes: ""
  });

  if (!isOpen) return null;

  const vaccineTypes = [
    "Rage",
    "CHPPI (Carré-Hépatite-Parvovirose-Parainfluenza)",
    "Leishmaniose",
    "Piroplasmose",
    "Toux du chenil",
    "Leptospirose",
    "Autre"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newVaccination = {
      id: Date.now(),
      name: formData.name === "Autre" ? formData.customName : formData.name,
      date: formData.date,
      nextDue: formData.nextDue,
      veterinarian: formData.veterinarian,
      notes: formData.notes,
      status: "up-to-date"
    };

    onAdd(newVaccination);
    onClose();
    
    setFormData({
      name: "",
      customName: "",
      date: new Date().toISOString().split('T')[0],
      nextDue: "",
      veterinarian: "",
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
                <Syringe size={24} className="mr-3 text-blue-500" />
                Ajouter une vaccination
              </h2>
              <p className="text-sm text-gray-600">Enregistrer un nouveau vaccin</p>
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
          {/* Nom du vaccin */}
          <div className="space-y-2">
            <Label htmlFor="vaccine-name" className="text-sm font-medium text-gray-700">Nom du vaccin</Label>
            <Select value={formData.name} onValueChange={(value) => setFormData(prev => ({ ...prev, name: value }))}>
              <SelectTrigger className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg">
                <SelectValue placeholder="Sélectionner un vaccin" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-md border-white/30">
                {vaccineTypes.map((vaccine) => (
                  <SelectItem key={vaccine} value={vaccine}>{vaccine}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Champ personnalisé si "Autre" est sélectionné */}
            {formData.name === "Autre" && (
              <div className="mt-2">
                <Label htmlFor="custom-vaccine" className="text-sm font-medium text-gray-700">Nom du vaccin personnalisé</Label>
                <Input
                  id="custom-vaccine"
                  value={formData.customName || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, customName: e.target.value }))}
                  placeholder="Entrez le nom du vaccin"
                  className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg"
                  required
                />
              </div>
            )}
          </div>

          {/* Date de vaccination */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium text-gray-700">Date de vaccination</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg"
              required
            />
          </div>

          {/* Date de rappel */}
          <div className="space-y-2">
            <Label htmlFor="nextDue" className="text-sm font-medium text-gray-700">Prochain rappel</Label>
            <Input
              id="nextDue"
              type="date"
              value={formData.nextDue}
              onChange={(e) => setFormData(prev => ({ ...prev, nextDue: e.target.value }))}
              className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg"
              required
            />
          </div>

          {/* Vétérinaire */}
          <div className="space-y-2">
            <Label htmlFor="veterinarian" className="text-sm font-medium text-gray-700">Vétérinaire</Label>
            <Input
              id="veterinarian"
              value={formData.veterinarian}
              onChange={(e) => setFormData(prev => ({ ...prev, veterinarian: e.target.value }))}
              placeholder="Dr. Martin"
              className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium text-gray-700">Notes (optionnel)</Label>
            <Input
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Observations, réactions..."
              className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg"
            />
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
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
              disabled={!formData.name || !formData.date || !formData.nextDue || (formData.name === "Autre" && !formData.customName)}
            >
              Ajouter
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};