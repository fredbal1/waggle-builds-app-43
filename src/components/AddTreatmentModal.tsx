import { motion } from "framer-motion";
import { X, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface AddTreatmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (treatment: any) => void;
}

export const AddTreatmentModal = ({ isOpen, onClose, onAdd }: AddTreatmentModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    startDate: new Date().toISOString().split('T')[0],
    endDate: "",
    frequency: "",
    dosage: "",
    instructions: "",
    veterinarian: ""
  });

  if (!isOpen) return null;

  const treatmentTypes = [
    "Antibiotique",
    "Anti-inflammatoire", 
    "Antiparasitaire",
    "Vermifuge",
    "Complément alimentaire",
    "Traitement de la peau",
    "Collyre",
    "Autre"
  ];

  const frequencies = [
    "Une fois par jour",
    "Deux fois par jour", 
    "Trois fois par jour",
    "Une fois par semaine",
    "Tous les 15 jours",
    "Une fois par mois",
    "Selon les besoins"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTreatment = {
      id: Date.now(),
      name: formData.name,
      type: formData.type,
      startDate: formData.startDate,
      endDate: formData.endDate,
      frequency: formData.frequency,
      dosage: formData.dosage,
      instructions: formData.instructions,
      veterinarian: formData.veterinarian,
      status: "en-cours"
    };

    onAdd(newTreatment);
    onClose();
    
    setFormData({
      name: "",
      type: "",
      startDate: new Date().toISOString().split('T')[0],
      endDate: "",
      frequency: "",
      dosage: "",
      instructions: "",
      veterinarian: ""
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
                <Activity size={24} className="mr-3 text-purple-500" />
                Ajouter un traitement
              </h2>
              <p className="text-sm text-gray-600">Nouveau traitement ou médicament</p>
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
          {/* Nom du traitement */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">Nom du médicament/traitement</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ex: Metacam"
              className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg"
              required
            />
          </div>

          {/* Type de traitement */}
          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium text-gray-700">Type de traitement</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg">
                <SelectValue placeholder="Sélectionner le type" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-md border-white/30">
                {treatmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">Date de début</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">Date de fin</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg"
              />
            </div>
          </div>

          {/* Fréquence */}
          <div className="space-y-2">
            <Label htmlFor="frequency" className="text-sm font-medium text-gray-700">Fréquence</Label>
            <Select value={formData.frequency} onValueChange={(value) => setFormData(prev => ({ ...prev, frequency: value }))}>
              <SelectTrigger className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg">
                <SelectValue placeholder="Sélectionner la fréquence" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-md border-white/30">
                {frequencies.map((freq) => (
                  <SelectItem key={freq} value={freq}>{freq}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dosage */}
          <div className="space-y-2">
            <Label htmlFor="dosage" className="text-sm font-medium text-gray-700">Dosage</Label>
            <Input
              id="dosage"
              value={formData.dosage}
              onChange={(e) => setFormData(prev => ({ ...prev, dosage: e.target.value }))}
              placeholder="Ex: 1 comprimé de 5mg"
              className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg"
            />
          </div>

          {/* Vétérinaire */}
          <div className="space-y-2">
            <Label htmlFor="veterinarian" className="text-sm font-medium text-gray-700">Vétérinaire prescripteur</Label>
            <Input
              id="veterinarian"
              value={formData.veterinarian}
              onChange={(e) => setFormData(prev => ({ ...prev, veterinarian: e.target.value }))}
              placeholder="Dr. Martin"
              className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg"
            />
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <Label htmlFor="instructions" className="text-sm font-medium text-gray-700">Instructions particulières</Label>
            <Textarea
              id="instructions"
              value={formData.instructions}
              onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
              placeholder="À donner avec la nourriture, surveiller les effets secondaires..."
              className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg min-h-[80px]"
              rows={3}
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
              className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg"
              disabled={!formData.name || !formData.type}
            >
              Ajouter
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};