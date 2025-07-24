import { motion } from "framer-motion";
import { X, Camera, Video, FileText, Stethoscope, Activity, Calendar, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (event: any) => void;
  selectedFilter?: string;
}

export const AddEventModal = ({ isOpen, onClose, onAdd, selectedFilter }: AddEventModalProps) => {
  const [eventType, setEventType] = useState(selectedFilter || "");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    duration: "",
    file: null as File | null
  });

  if (!isOpen) return null;

  const eventTypes = [
    { value: "photo", label: "📸 Photo", icon: Camera },
    { value: "video", label: "🎥 Vidéo", icon: Video },
    { value: "note", label: "📝 Note", icon: FileText },
    { value: "medical", label: "🏥 Soin médical", icon: Stethoscope },
    { value: "activity", label: "🏃 Activité", icon: Activity }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEvent = {
      id: Date.now(),
      type: eventType,
      date: `${formData.date}T${formData.time}`,
      title: formData.title,
      description: formData.description,
      duration: formData.duration,
      file: formData.file
    };

    onAdd(newEvent);
    onClose();
    
    // Reset form
    setEventType("");
    setFormData({
      title: "",
      description: "",
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      duration: "",
      file: null
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
        className="bg-white rounded-t-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl"
        style={{
          background: "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid hsl(var(--border))",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
        }}
        initial={{ y: "100%", scale: 0.9 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: "100%", scale: 0.9 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Ajouter un événement</h2>
              <p className="text-sm text-gray-600">Nouveau souvenir ou information</p>
            </div>
            <motion.button
              onClick={onClose}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} className="text-gray-600" />
            </motion.button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Type d'événement */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Type d'événement</Label>
            <div className="grid grid-cols-2 gap-3">
              {eventTypes.map((type) => (
                <motion.button
                  key={type.value}
                  type="button"
                  onClick={() => setEventType(type.value)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                    eventType === type.value
                      ? 'border-pet-orange-500 bg-pet-orange-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <type.icon size={24} className={`mx-auto mb-2 ${
                    eventType === type.value ? 'text-pet-orange-500' : 'text-gray-500'
                  }`} />
                  <p className={`text-sm font-medium ${
                    eventType === type.value ? 'text-pet-orange-700' : 'text-gray-700'
                  }`}>
                    {type.label}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Titre */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">Titre</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Ex: Première visite chez le vétérinaire"
              className="bg-white/80 backdrop-blur-sm border-gray-300"
              required
            />
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
                className="bg-white/80 backdrop-blur-sm border-gray-300"
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
                className="bg-white/80 backdrop-blur-sm border-gray-300"
                required
              />
            </div>
          </div>

          {/* Durée (pour activités) */}
          {eventType === "activity" && (
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm font-medium text-gray-700">Durée</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="Ex: 45 minutes"
                className="bg-white/80 backdrop-blur-sm border-gray-300"
              />
            </div>
          )}

          {/* Upload de fichier (pour photos/vidéos) */}
          {(eventType === "photo" || eventType === "video") && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                {eventType === "photo" ? "Photo" : "Vidéo"}
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-pet-orange-300 transition-colors">
                <Upload size={32} className="mx-auto mb-3 text-gray-400" />
                <p className="text-sm text-gray-600 mb-3">
                  Glissez votre {eventType === "photo" ? "photo" : "vidéo"} ici ou cliquez pour sélectionner
                </p>
                <Input
                  type="file"
                  accept={eventType === "photo" ? "image/*" : "video/*"}
                  onChange={(e) => setFormData(prev => ({ ...prev, file: e.target.files?.[0] || null }))}
                  className="hidden"
                  id="file-upload"
                />
                <Label htmlFor="file-upload">
                  <Button type="button" variant="outline" className="cursor-pointer">
                    Sélectionner un fichier
                  </Button>
                </Label>
                {formData.file && (
                  <p className="text-sm text-pet-orange-600 mt-2">
                    Fichier sélectionné: {formData.file.name}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Ajoutez des détails, des notes ou des observations..."
              className="bg-white/80 backdrop-blur-sm border-gray-300 min-h-[100px]"
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button 
              type="button"
              variant="outline" 
              className="flex-1 bg-white/80 backdrop-blur-sm border-gray-300"
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button 
              type="submit"
              className="flex-1 bg-pet-orange-500 hover:bg-pet-orange-600 text-white"
              disabled={!eventType || !formData.title}
            >
              Ajouter
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};