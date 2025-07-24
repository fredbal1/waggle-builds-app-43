import { motion } from "framer-motion";
import { X, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface AddMedicalRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (record: any) => void;
}

export const AddMedicalRecordModal = ({ isOpen, onClose, onAdd }: AddMedicalRecordModalProps) => {
  const [formData, setFormData] = useState({
    reason: "",
    date: new Date().toISOString().split('T')[0],
    veterinarian: "",
    diagnosis: "",
    treatment: "",
    notes: "",
    followUp: "",
    cost: ""
  });

  if (!isOpen) return null;

  const visitReasons = [
    "Visite de routine",
    "Vaccination",
    "Problème de santé",
    "Urgence",
    "Contrôle post-opératoire",
    "Bilan de santé",
    "Problème comportemental",
    "Autre"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRecord = {
      id: Date.now(),
      reason: formData.reason,
      date: formData.date,
      veterinarian: formData.veterinarian,
      diagnosis: formData.diagnosis,
      treatment: formData.treatment,
      notes: formData.notes,
      followUp: formData.followUp,
      cost: formData.cost
    };

    onAdd(newRecord);
    onClose();
    
    setFormData({
      reason: "",
      date: new Date().toISOString().split('T')[0],
      veterinarian: "",
      diagnosis: "",
      treatment: "",
      notes: "",
      followUp: "",
      cost: ""
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
                <Stethoscope size={24} className="mr-3 text-blue-500" />
                Ajouter un historique médical
              </h2>
              <p className="text-sm text-gray-600">Nouvelle visite ou consultation</p>
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
          {/* Motif de la visite */}
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-sm font-medium text-gray-700">Motif de la visite</Label>
            <Select value={formData.reason} onValueChange={(value) => setFormData(prev => ({ ...prev, reason: value }))}>
              <SelectTrigger className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg">
                <SelectValue placeholder="Sélectionner le motif" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-md border-white/30">
                {visitReasons.map((reason) => (
                  <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium text-gray-700">Date de la visite</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
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
              required
            />
          </div>

          {/* Diagnostic */}
          <div className="space-y-2">
            <Label htmlFor="diagnosis" className="text-sm font-medium text-gray-700">Diagnostic</Label>
            <Textarea
              id="diagnosis"
              value={formData.diagnosis}
              onChange={(e) => setFormData(prev => ({ ...prev, diagnosis: e.target.value }))}
              placeholder="Diagnostic établi par le vétérinaire..."
              className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg min-h-[80px]"
              rows={3}
            />
          </div>

          {/* Traitement */}
          <div className="space-y-2">
            <Label htmlFor="treatment" className="text-sm font-medium text-gray-700">Traitement prescrit</Label>
            <Textarea
              id="treatment"
              value={formData.treatment}
              onChange={(e) => setFormData(prev => ({ ...prev, treatment: e.target.value }))}
              placeholder="Médicaments, soins prescrits..."
              className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg min-h-[80px]"
              rows={3}
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium text-gray-700">Observations générales</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="État général, comportement, autres observations..."
              className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg min-h-[80px]"
              rows={3}
            />
          </div>

          {/* Suivi */}
          <div className="space-y-2">
            <Label htmlFor="followUp" className="text-sm font-medium text-gray-700">Suivi recommandé</Label>
            <Input
              id="followUp"
              value={formData.followUp}
              onChange={(e) => setFormData(prev => ({ ...prev, followUp: e.target.value }))}
              placeholder="Prochaine visite dans 6 mois..."
              className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg"
            />
          </div>

          {/* Coût */}
          <div className="space-y-2">
            <Label htmlFor="cost" className="text-sm font-medium text-gray-700">Coût (optionnel)</Label>
            <Input
              id="cost"
              type="number"
              step="0.01"
              value={formData.cost}
              onChange={(e) => setFormData(prev => ({ ...prev, cost: e.target.value }))}
              placeholder="120.50"
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
              disabled={!formData.reason || !formData.date || !formData.veterinarian}
            >
              Ajouter
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};