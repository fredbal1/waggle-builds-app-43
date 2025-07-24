import { motion } from "framer-motion";
import { X, Heart, Ruler, Weight, Brain, Activity, Users, Stethoscope, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import goldenRetrieverPhoto from "@/assets/golden-retriever-photo.jpg";

interface BreedInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  breed: string;
}

const breedData: Record<string, any> = {
  "Golden Retriever": {
    description: "Le Golden Retriever est un chien de taille moyenne à grande, connu pour son tempérament doux et sa loyauté exceptionnelle. Originaire d'Écosse, cette race est idéale pour les familles.",
    characteristics: {
      temperament: ["Amical", "Intelligent", "Dévoué", "Confiant"],
      size: "Moyen à grand",
      weight: "25-34 kg",
      height: "51-61 cm",
      lifespan: "10-12 ans",
      energy: "Élevé",
      grooming: "Régulier",
      training: "Facile"
    },
    health: {
      common_issues: ["Dysplasie de la hanche", "Problèmes oculaires", "Allergies cutanées"],
      care_tips: ["Brossage quotidien", "Exercice régulier", "Contrôles vétérinaires annuels"]
    },
    nutrition: {
      daily_intake: "300-400g de croquettes",
      feeding_frequency: "2 repas par jour",
      special_needs: "Surveiller le poids, tendance à l'embonpoint"
    },
    exercise: {
      daily_needs: "1-2 heures par jour",
      activities: ["Promenade", "Natation", "Jeu de balle", "Jogging"],
      mental_stimulation: "Jeux d'intelligence, dressage"
    }
  },
  // Ajouter d'autres races par défaut
  "default": {
    description: "Cette race possède des caractéristiques uniques qui en font un compagnon merveilleux pour les bonnes familles.",
    characteristics: {
      temperament: ["Affectueux", "Loyal", "Intelligent"],
      size: "Variable",
      weight: "Variable",
      height: "Variable",
      lifespan: "10-15 ans",
      energy: "Moyen",
      grooming: "Modéré",
      training: "Modéré"
    },
    health: {
      common_issues: ["Consultez votre vétérinaire"],
      care_tips: ["Soins réguliers", "Exercice adapté", "Alimentation équilibrée"]
    },
    nutrition: {
      daily_intake: "Selon les recommandations vétérinaires",
      feeding_frequency: "1-2 repas par jour",
      special_needs: "Adaptation selon l'âge et l'activité"
    },
    exercise: {
      daily_needs: "30 minutes à 2 heures",
      activities: ["Promenade", "Jeu"],
      mental_stimulation: "Stimulation mentale recommandée"
    }
  }
};

export const BreedInfoModal = ({ isOpen, onClose, breed }: BreedInfoModalProps) => {
  if (!isOpen) return null;

  const data = breedData[breed] || breedData.default;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-3xl shadow-2xl"
        style={{
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)"
        }}
        initial={{ y: 50, scale: 0.9, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 50, scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header avec photo plein écran */}
        <div className="relative">
          {/* Photo en header */}
          <div className="h-64 md:h-80 relative overflow-hidden rounded-t-3xl">
            <img 
              src={goldenRetrieverPhoto} 
              alt={breed}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Bouton fermer */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} className="text-white" />
            </motion.button>

            {/* Titre sur l'image */}
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-3xl font-bold">{breed}</h2>
              <p className="text-white/90">Guide complet de la race</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 md:grid md:grid-cols-2 md:gap-8">
          {/* Description */}
          <motion.div
            className="md:col-span-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-gray-700 leading-relaxed text-lg">{data.description}</p>
          </motion.div>

          {/* Caractéristiques principales */}
          <motion.div
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-white/20 shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <Heart size={20} className="mr-2 text-pet-orange-500" />
              Caractéristiques
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 flex items-center"><Ruler size={14} className="mr-1" />Taille</p>
                <p className="font-medium">{data.characteristics.height}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 flex items-center"><Weight size={14} className="mr-1" />Poids</p>
                <p className="font-medium">{data.characteristics.weight}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Espérance de vie</p>
                <p className="font-medium">{data.characteristics.lifespan}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 flex items-center"><Activity size={14} className="mr-1" />Énergie</p>
                <p className="font-medium">{data.characteristics.energy}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Tempérament</p>
              <div className="flex flex-wrap gap-2">
                {data.characteristics.temperament.map((trait: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-pet-orange-100 text-pet-orange-700 rounded-full text-sm font-medium">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Santé */}
          <motion.div
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-white/20 shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <Stethoscope size={20} className="mr-2 text-blue-500" />
              Santé & Soins
            </h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Problèmes de santé courants:</p>
                <ul className="space-y-1">
                  {data.health.common_issues.map((issue: string, index: number) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mr-2" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Conseils de soins:</p>
                <ul className="space-y-1">
                  {data.health.care_tips.map((tip: string, index: number) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Exercice */}
          <motion.div
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-white/20 shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <Activity size={20} className="mr-2 text-emerald-500" />
              Exercice & Activité
            </h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 flex items-center"><Clock size={14} className="mr-1" />Besoins quotidiens</p>
                <p className="font-medium">{data.exercise.daily_needs}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Activités recommandées:</p>
                <div className="flex flex-wrap gap-2">
                  {data.exercise.activities.map((activity: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Nutrition */}
          <motion.div
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-white/20 shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <Users size={20} className="mr-2 text-purple-500" />
              Nutrition
            </h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Quantité quotidienne</p>
                <p className="font-medium">{data.nutrition.daily_intake}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fréquence des repas</p>
                <p className="font-medium">{data.nutrition.feeding_frequency}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Besoins spéciaux</p>
                <p className="font-medium text-amber-700">{data.nutrition.special_needs}</p>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            className="flex gap-3 pt-4 md:col-span-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button 
              variant="outline" 
              className="flex-1 bg-white/80 backdrop-blur-sm border-white/30 shadow-lg hover:bg-white/90"
              onClick={onClose}
            >
              Fermer
            </Button>
            <Button 
              className="flex-1 bg-gradient-to-r from-pet-orange-500 to-pet-orange-600 hover:from-pet-orange-600 hover:to-pet-orange-700 text-white shadow-lg"
              onClick={() => {
                // Logic to save breed info to favorites
                onClose();
              }}
            >
              Sauvegarder
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};