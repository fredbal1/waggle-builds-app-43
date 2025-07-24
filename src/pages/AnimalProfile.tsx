
import { motion } from "framer-motion";
import { ArrowLeft, Edit, Share, Camera, Heart, Calendar, Activity, MessageCircle, Stethoscope, TrendingUp, Plus, Filter, Play, FileText, Syringe, Clock, MapPin, Weight, Ruler, Phone, Info, CheckCircle, AlertCircle, Brain } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { BreedInfoModal } from "@/components/BreedInfoModal";
import { ImageFullScreen } from "@/components/ImageFullScreen";
import { AddEventModal } from "@/components/AddEventModal";
import { WeightChart } from "@/components/WeightChart";
import { AddVaccinationModal } from "@/components/AddVaccinationModal";
import { AddTreatmentModal } from "@/components/AddTreatmentModal";
import { AddMedicalRecordModal } from "@/components/AddMedicalRecordModal";
import { AddWeightModal } from "@/components/AddWeightModal";
import { TimelineFilters } from "@/components/TimelineFilters";
import { AnimalSwitcher } from "@/components/AnimalSwitcher";
import { useToast } from "@/hooks/use-toast";

// Mock data pour l'animal
const mockAnimalData = {
  id: "1",
  name: "Max",
  breed: "Golden Retriever",
  age: "3 ans",
  weight: "28 kg",
  gender: "Mâle",
  sterilized: true,
  chipNumber: "FR123456789",
  color: "Doré",
  birthDate: "2021-03-15",
  photo: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop&crop=face",
  healthStatus: "excellent" as const,
  mood: { emoji: "😊", label: "Joyeux" },
  veterinarian: {
    name: "Dr. Martin",
    phone: "01 23 45 67 89",
    address: "123 Rue de la Santé, 75001 Paris"
  }
};

const AnimalProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("infos");
  const [showBreedModal, setShowBreedModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showAddVaccinationModal, setShowAddVaccinationModal] = useState(false);
  const [showAddTreatmentModal, setShowAddTreatmentModal] = useState(false);
  const [showAddMedicalRecordModal, setShowAddMedicalRecordModal] = useState(false);
  const [showAddWeightModal, setShowAddWeightModal] = useState(false);
  const [showTimelineFilters, setShowTimelineFilters] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [timeFilter, setTimeFilter] = useState("week");
  const [selectedTimelineFilter, setSelectedTimelineFilter] = useState("all");
  const [timelineFilters, setTimelineFilters] = useState({
    dateFrom: "",
    dateTo: "",
    type: "all",
    search: ""
  });
  const { toast } = useToast();
  
  const animal = mockAnimalData; // En réalité, récupérer via l'ID

  const [healthData, setHealthData] = useState({
    vaccinations: [
      { id: 1, name: "Rage", date: "2024-01-15", nextDue: "2025-01-15", status: "up-to-date" },
      { id: 2, name: "CHPPI", date: "2024-02-10", nextDue: "2025-02-10", status: "up-to-date" },
      { id: 3, name: "Leishmaniose", date: "2023-12-05", nextDue: "2024-12-05", status: "overdue" }
    ],
    treatments: [
      { id: 1, name: "Antiparasitaire", type: "Préventif", date: "2024-01-20", frequency: "Mensuel", status: "en-cours" },
      { id: 2, name: "Vermifuge", type: "Traitement", date: "2024-01-10", frequency: "Trimestriel", status: "en-cours" }
    ],
    visits: [
      { id: 1, date: "2024-01-15", reason: "Vaccins annuels", vet: "Dr. Martin", notes: "RAS, animal en bonne santé" },
      { id: 2, date: "2023-12-20", reason: "Contrôle général", vet: "Dr. Martin", notes: "Léger surpoids à surveiller" }
    ]
  });

  const activityData = [
    { date: "2024-01-22", type: "Balade", duration: "45 min", notes: "Parc des Buttes-Chaumont" },
    { date: "2024-01-21", type: "Jeu", duration: "20 min", notes: "Jeu de balle dans le jardin" },
    { date: "2024-01-20", type: "Toilettage", duration: "30 min", notes: "Brossage et lavage des dents" }
  ];

  const memories = [
    { id: 1, type: "photo", url: "/src/assets/timeline-1.jpg", date: "2024-01-20", caption: "Première neige!" },
    { id: 2, type: "video", url: "/src/assets/timeline-2.jpg", date: "2024-01-18", caption: "Max apprend un nouveau tour" },
    { id: 3, type: "photo", url: "/src/assets/timeline-3.jpg", date: "2024-01-15", caption: "Visite chez le vétérinaire" }
  ];

  const [weightData, setWeightData] = useState([
    { date: "2023-12-01", weight: 26.5 },
    { date: "2023-12-15", weight: 27.0 },
    { date: "2024-01-01", weight: 27.8 },
    { date: "2024-01-15", weight: 28.2 },
    { date: "2024-01-22", weight: 28.0 }
  ]);

  const openImageModal = (image: any) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  const handleAddEvent = (event: any) => {
    console.log('Nouvel événement ajouté:', event);
    toast({
      title: "Événement ajouté",
      description: `${event.title} a été ajouté à la timeline.`,
    });
  };

  const handleAddVaccination = (vaccination: any) => {
    setHealthData(prev => ({
      ...prev,
      vaccinations: [...prev.vaccinations, vaccination]
    }));
    toast({
      title: "Vaccination ajoutée",
      description: `${vaccination.name} a été ajouté au carnet de santé.`,
    });
  };

  const handleAddTreatment = (treatment: any) => {
    setHealthData(prev => ({
      ...prev,
      treatments: [...prev.treatments, treatment]
    }));
    toast({
      title: "Traitement ajouté",
      description: `${treatment.name} a été ajouté aux traitements en cours.`,
    });
  };

  const handleAddMedicalRecord = (record: any) => {
    setHealthData(prev => ({
      ...prev,
      visits: [...prev.visits, record]
    }));
    toast({
      title: "Visite médicale ajoutée",
      description: `${record.reason} a été ajouté à l'historique médical.`,
    });
  };

  const handleAddWeight = (weightEntry: any) => {
    setWeightData(prev => [...prev, weightEntry]);
    toast({
      title: "Pesée ajoutée",
      description: `Nouveau poids de ${weightEntry.weight}kg enregistré.`,
    });
  };

  const handleApplyTimelineFilters = (filters: any) => {
    setTimelineFilters(filters);
    toast({
      title: "Filtres appliqués",
      description: "La timeline a été filtrée selon vos critères.",
    });
  };

  const toggleVaccinationStatus = (id: number) => {
    setHealthData(prev => ({
      ...prev,
      vaccinations: prev.vaccinations.map(vaccination =>
        vaccination.id === id 
          ? { ...vaccination, status: vaccination.status === "up-to-date" ? "overdue" : "up-to-date" }
          : vaccination
      )
    }));
  };

  const toggleTreatmentStatus = (id: number) => {
    setHealthData(prev => ({
      ...prev,
      treatments: prev.treatments.map(treatment =>
        treatment.id === id 
          ? { ...treatment, status: treatment.status === "en-cours" ? "terminé" : "en-cours" }
          : treatment
      )
    }));
  };

  // Fonction pour obtenir les données selon la période sélectionnée
  const getStatsData = (period: string) => {
    const baseData = {
      day: { walks: 3, activity: "2h 15min", distance: "4.8 km", grooming: 1 },
      week: { walks: 12, activity: "8h 30min", distance: "4.2 km", grooming: 3 },
      month: { walks: 48, activity: "35h 20min", distance: "4.5 km", grooming: 12 },
      year: { walks: 580, activity: "420h 00min", distance: "4.3 km", grooming: 144 }
    };
    
    return baseData[period as keyof typeof baseData] || baseData.week;
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-pet-orange-400 to-pet-orange-600 safe-area-top">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <motion.button
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft size={20} className="text-white" />
            </motion.button>
            
            <div className="flex space-x-3">
              <motion.button
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                whileTap={{ scale: 0.9 }}
              >
                <Share size={20} className="text-white" />
              </motion.button>
              
              <motion.button
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                whileTap={{ scale: 0.9 }}
              >
                <Edit size={20} className="text-white" />
              </motion.button>
            </div>
          </div>

          {/* Animal Info Header */}
          <div className="flex items-center space-x-4">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-20 h-20 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden">
                <img src={animal.photo} alt={animal.name} className="w-full h-full object-cover" />
              </div>
              <motion.button
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-pet-orange-500 rounded-full flex items-center justify-center border-2 border-white"
                whileTap={{ scale: 0.9 }}
              >
                <Camera size={12} className="text-white" />
              </motion.button>
            </motion.div>

            <div className="flex-1 text-white">
              <h1 className="text-2xl font-bold">{animal.name}</h1>
              <p className="opacity-90">{animal.breed} • {animal.age}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="flex items-center space-x-1">
                  <span>{animal.mood.emoji}</span>
                  <span className="text-sm">{animal.mood.label}</span>
                </span>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm">Excellent état</span>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* IA Assistant dans le header */}
        <div className="px-6 py-4 bg-gradient-to-r from-orange-100/50 to-orange-200/50 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <motion.div 
              className="flex items-center justify-between rounded-2xl p-4 shadow-lg flex-1 mr-4 animal-switcher"
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/petsoul")}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                     style={{
                       background: "linear-gradient(135deg, hsl(var(--primary)) 0%, rgba(251, 146, 60, 1) 100%)",
                       boxShadow: "0 4px 16px rgba(239, 122, 21, 0.3)"
                     }}>
                  <Brain size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">IA Animalière</p>
                  <p className="text-sm text-gray-600">Max semble très heureux aujourd'hui!</p>
                </div>
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg"
              />
            </motion.div>
            
            {/* Animal Switcher */}
            <AnimalSwitcher 
              currentAnimal={{
                id: animal.id,
                name: animal.name,
                photo: animal.photo,
                breed: animal.breed
              }}
              onAnimalChange={(newAnimal) => {
                // Ici vous pourriez changer l'animal sélectionné
                console.log('Switching to animal:', newAnimal);
              }}
            />
          </div>
        </div>

        {/* Content with Tabs */}
        <div className="px-6 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="modern-tabs grid w-full grid-cols-4 p-2">
              <TabsTrigger 
                value="infos" 
                className="modern-tab flex items-center justify-center px-3 py-3"
              >
                <Info size={16} className="mr-1" />
                <span className="hidden sm:inline">Infos</span>
              </TabsTrigger>
              <TabsTrigger 
                value="health" 
                className="modern-tab flex items-center justify-center px-3 py-3"
              >
                <Stethoscope size={16} className="mr-1" />
                <span className="hidden sm:inline">Santé</span>
              </TabsTrigger>
              <TabsTrigger 
                value="stats" 
                className="modern-tab flex items-center justify-center px-3 py-3"
              >
                <TrendingUp size={16} className="mr-1" />
                <span className="hidden sm:inline">Stats</span>
              </TabsTrigger>
              <TabsTrigger 
                value="timeline" 
                className="modern-tab flex items-center justify-center px-3 py-3"
              >
                <Clock size={16} className="mr-1" />
                <span className="hidden sm:inline">Timeline</span>
              </TabsTrigger>
            </TabsList>

          {/* Onglet Infos */}
          <TabsContent value="infos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Informations complètes</h2>
              <Button size="sm" variant="outline" className="rounded-full">
                <Edit size={16} className="mr-2" />
                Modifier
              </Button>
            </div>

            {/* Fiche d'identité complète */}
            <motion.div
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                <Heart size={20} className="mr-2 text-pet-orange-500" />
                Fiche d'identité
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 flex items-center"><Calendar size={14} className="mr-1" />Date de naissance</p>
                  <p className="font-medium">{new Date(animal.birthDate).toLocaleDateString('fr-FR')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Âge exact</p>
                  <p className="font-medium">{animal.age}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sexe</p>
                  <p className="font-medium">{animal.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center"><Weight size={14} className="mr-1" />Poids</p>
                  <p className="font-medium">{animal.weight}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Stérilisé(e)</p>
                  <p className="font-medium">{animal.sterilized ? "✅ Oui" : "❌ Non"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Couleur</p>
                  <p className="font-medium">{animal.color}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">N° de puce électronique</p>
                  <p className="font-medium font-mono text-sm bg-gray-50 p-2 rounded">{animal.chipNumber}</p>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Race</p>
                      <p className="font-medium">{animal.breed}</p>
                    </div>
                    <motion.button
                      onClick={() => setShowBreedModal(true)}
                      className="px-3 py-1 bg-pet-orange-100 hover:bg-pet-orange-200 text-pet-orange-700 rounded-full text-sm font-medium flex items-center space-x-1 transition-colors"
                      whileTap={{ scale: 0.95 }}
                    >
                      <Info size={14} />
                      <span>Fiche</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Assurance et documents */}
            <motion.div
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 flex items-center">
                  <FileText size={20} className="mr-2 text-emerald-500" />
                  Assurance & Documents
                </h3>
                <Button size="sm" variant="ghost">
                  <Plus size={16} />
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <p className="font-medium text-emerald-800">Assurance SantéVet</p>
                  <p className="text-sm text-emerald-600">Contrat: SV-2024-0158 • Expire le 15/03/2025</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="font-medium">Carnet de vaccination</p>
                  <p className="text-sm text-gray-600">Dernière mise à jour: 15/01/2024</p>
                </div>
              </div>
            </motion.div>

            {/* Vétérinaire référent */}
            <motion.div
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 flex items-center">
                  <Stethoscope size={20} className="mr-2 text-blue-500" />
                  Vétérinaire référent
                </h3>
                <Button size="sm" variant="ghost">
                  <Edit size={16} />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-lg">{animal.veterinarian.name}</p>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin size={14} className="mr-1" />
                    {animal.veterinarian.address}
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-blue-500 hover:bg-blue-600"
                    onClick={() => window.open(`tel:${animal.veterinarian.phone}`)}
                  >
                    <Phone size={16} className="mr-2" />
                    Appeler
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Calendar size={16} className="mr-2" />
                    RDV
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Notes importantes */}
            <motion.div
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800">Notes importantes</h3>
                <Button size="sm" variant="ghost">
                  <Plus size={16} />
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <p className="text-sm font-medium text-amber-800">⚠️ Allergie aux acariens</p>
                  <p className="text-xs text-amber-600">Éviter la poussière, aspirer régulièrement</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-sm font-medium text-blue-800">💊 Traitement anti-inflammatoire</p>
                  <p className="text-xs text-blue-600">À donner avec la nourriture</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Onglet Santé - Carnet complet */}
          <TabsContent value="health" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Carnet de santé</h2>
              <motion.div whileTap={{ scale: 0.95 }}>
                 <Button 
                   size="sm" 
                   variant="outline" 
                   className="premium-button rounded-full"
                   onClick={() => setShowAddMedicalRecordModal(true)}
                 >
                  <Plus size={16} className="mr-2" />
                  Ajouter
                </Button>
              </motion.div>
            </div>

            {/* Statut santé global */}
            <motion.div
              className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl p-6 border border-emerald-200"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-emerald-800 flex items-center">
                  <Heart size={20} className="mr-2" />
                  État de santé général
                </h3>
                <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-emerald-700 font-medium">Excellent état général</p>
              <p className="text-sm text-emerald-600 mt-1">Dernière visite: 15/01/2024 • Prochain contrôle: 15/07/2024</p>
            </motion.div>

            {/* Vaccinations */}
            <motion.div
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 flex items-center">
                  <Syringe size={20} className="mr-2 text-blue-500" />
                  Vaccinations
                </h3>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="clay-btn hover:bg-blue-100 hover:text-blue-600"
                    onClick={() => setShowAddVaccinationModal(true)}
                  >
                    <Plus size={16} />
                  </Button>
                </motion.div>
              </div>
              
              <div className="space-y-3">
                {healthData.vaccinations.map((vaccine, index) => (
                   <motion.div 
                     key={index} 
                     className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                     whileTap={{ scale: 0.98 }}
                     onClick={() => toggleVaccinationStatus(vaccine.id)}
                   >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${vaccine.status === "up-to-date" ? "bg-green-500" : "bg-red-500"}`}></div>
                      <div>
                        <p className="font-medium">{vaccine.name}</p>
                        <p className="text-sm text-gray-600">Fait le: {vaccine.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        vaccine.status === "up-to-date" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      }`}>
                        {vaccine.status === "up-to-date" ? "✅ À jour" : "⚠️ En retard"}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">Rappel: {vaccine.nextDue}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Traitements en cours */}
            <motion.div
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 flex items-center">
                  <Activity size={20} className="mr-2 text-purple-500" />
                  Traitements en cours
                </h3>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="clay-btn hover:bg-purple-100 hover:text-purple-600"
                    onClick={() => setShowAddTreatmentModal(true)}
                  >
                    <Plus size={16} />
                  </Button>
                </motion.div>
              </div>
              
               <div className="space-y-3">
                 {healthData.treatments.map((treatment, index) => (
                   <motion.div 
                     key={index} 
                     className="p-4 bg-purple-50 rounded-xl border border-purple-200 cursor-pointer hover:bg-purple-100 transition-colors"
                     whileTap={{ scale: 0.98 }}
                     onClick={() => toggleTreatmentStatus(treatment.id)}
                   >
                     <div className="flex justify-between items-start mb-2">
                       <div className="flex items-center space-x-3">
                         <div className={`w-3 h-3 rounded-full ${treatment.status === "en-cours" ? "bg-blue-500" : "bg-green-500"}`}></div>
                         <div>
                           <p className="font-medium text-purple-800">{treatment.name}</p>
                           <p className="text-sm text-purple-600">{treatment.type}</p>
                         </div>
                       </div>
                       <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                         treatment.status === "en-cours" 
                           ? "bg-blue-100 text-blue-700" 
                           : "bg-green-100 text-green-700"
                       }`}>
                         {treatment.status === "en-cours" ? "En cours" : "Terminé"}
                       </span>
                     </div>
                     <div className="flex items-center justify-between">
                       <p className="text-sm text-purple-600">Dernier: {treatment.date}</p>
                       <span className="text-sm text-purple-700 font-medium bg-purple-200 px-2 py-1 rounded-full">{treatment.frequency}</span>
                     </div>
                   </motion.div>
                 ))}
               </div>
            </motion.div>

            {/* Historique visites vétérinaires */}
            <motion.div
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 flex items-center">
                  <Stethoscope size={20} className="mr-2 text-blue-500" />
                  Historique médical
                </h3>
                 <motion.div whileTap={{ scale: 0.95 }}>
                   <Button 
                     size="sm" 
                     variant="ghost" 
                     className="hover:bg-blue-100 hover:text-blue-600"
                     onClick={() => setShowAddMedicalRecordModal(true)}
                   >
                     <Plus size={16} />
                   </Button>
                 </motion.div>
              </div>
              
              <div className="space-y-3">
                {healthData.visits.map((visit, index) => (
                  <div key={index} className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-blue-800">{visit.reason}</p>
                        <p className="text-sm text-blue-600">{visit.vet} • {visit.date}</p>
                      </div>
                    </div>
                    <p className="text-sm text-blue-700 bg-blue-100 p-2 rounded mt-2">
                      📝 {visit.notes}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Poids et mesures */}
            <motion.div
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 flex items-center">
                  <Weight size={20} className="mr-2 text-emerald-500" />
                  Suivi du poids
                </h3>
                 <motion.div whileTap={{ scale: 0.95 }}>
                   <Button 
                     size="sm" 
                     variant="ghost" 
                     className="hover:bg-emerald-100 hover:text-emerald-600"
                     onClick={() => setShowAddWeightModal(true)}
                   >
                     <Plus size={16} />
                   </Button>
                 </motion.div>
              </div>
              
              <WeightChart 
                data={weightData} 
                targetWeight={{ min: 25, max: 30 }}
              />
            </motion.div>
          </TabsContent>

          {/* Onglet Statistiques */}
          <TabsContent value="stats" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Statistiques</h2>
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-[140px] rounded-full bg-white/80 backdrop-blur-sm border-gray-300">
                  <Calendar size={16} className="mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-md border-gray-300">
                  <SelectItem value="day">Aujourd'hui</SelectItem>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                  <SelectItem value="year">Cette année</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Métriques principales */}
            <motion.div
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
               <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                 <TrendingUp size={20} className="mr-2 text-emerald-500" />
                 {timeFilter === 'day' ? "Aujourd'hui" : 
                  timeFilter === 'week' ? "Cette semaine" :
                  timeFilter === 'month' ? "Ce mois" : "Cette année"}
               </h3>
               
               <div className="grid grid-cols-2 gap-4 mb-6">
                 {(() => {
                   const data = getStatsData(timeFilter);
                   return (
                     <>
                       <motion.div 
                         className="text-center p-4 bg-blue-50 rounded-2xl border border-blue-100 shadow-sm"
                         initial={{ scale: 0.9, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         transition={{ duration: 0.3 }}
                       >
                         <p className="text-2xl font-bold text-blue-600">{data.walks}</p>
                         <p className="text-sm text-gray-600">Sorties</p>
                         <p className="text-xs text-blue-500">
                           {timeFilter === 'day' ? 'vs hier' : 
                            timeFilter === 'week' ? '+2 vs semaine dernière' :
                            timeFilter === 'month' ? '+8 vs mois dernier' : '+20 vs année dernière'}
                         </p>
                       </motion.div>
                       <motion.div 
                         className="text-center p-4 bg-emerald-50 rounded-2xl border border-emerald-100 shadow-sm"
                         initial={{ scale: 0.9, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         transition={{ duration: 0.3, delay: 0.1 }}
                       >
                         <p className="text-2xl font-bold text-emerald-600">{data.activity}</p>
                         <p className="text-sm text-gray-600">Activité physique</p>
                         <p className="text-xs text-emerald-500">Objectif atteint ✅</p>
                       </motion.div>
                       <motion.div 
                         className="text-center p-4 bg-purple-50 rounded-2xl border border-purple-100 shadow-sm"
                         initial={{ scale: 0.9, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         transition={{ duration: 0.3, delay: 0.2 }}
                       >
                         <p className="text-2xl font-bold text-purple-600">{data.distance}</p>
                         <p className="text-sm text-gray-600">Distance moyenne</p>
                         <p className="text-xs text-purple-500">
                           {timeFilter === 'day' ? 'Sortie' : 
                            timeFilter === 'week' ? 'Balade/jour' :
                            timeFilter === 'month' ? 'Par sortie' : 'Par sortie'}
                         </p>
                       </motion.div>
                       <motion.div 
                         className="text-center p-4 bg-amber-50 rounded-2xl border border-amber-100 shadow-sm"
                         initial={{ scale: 0.9, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         transition={{ duration: 0.3, delay: 0.3 }}
                       >
                         <p className="text-2xl font-bold text-amber-600">{data.grooming}</p>
                         <p className="text-sm text-gray-600">Toilettage</p>
                         <p className="text-xs text-amber-500">Fréquence normale</p>
                       </motion.div>
                     </>
                   );
                 })()}
               </div>

              {/* Graphique d'activité */}
              <div className="space-y-3">
                <p className="font-medium text-gray-700">Temps d'activité quotidien</p>
                {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day, index) => {
                  const activityTimes = [45, 60, 30, 75, 50, 90, 65]; // Minutes réalistes
                  const percentage = (activityTimes[index] / 90) * 100;
                  return (
                    <div key={day} className="flex items-center space-x-3">
                      <span className="w-8 text-sm text-gray-600 font-medium">{day}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                        <motion.div
                          className="bg-gradient-to-r from-pet-orange-400 to-pet-orange-600 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: index * 0.1, duration: 0.8 }}
                        />
                      </div>
                      <span className="text-sm text-gray-500 w-12">{activityTimes[index]}min</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Bien-être calculé */}
            <motion.div
              className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-3xl p-6 border border-emerald-200"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                <Heart size={20} className="mr-2 text-emerald-500" />
                Indice de bien-être
              </h3>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-3xl font-bold text-emerald-600">8.5/10</p>
                  <p className="text-sm text-emerald-700">Excellent état général</p>
                </div>
                <div className="text-right">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl">😊</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Activité physique</span>
                  <span className="text-emerald-600 font-medium">Optimal ✅</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Régularité des sorties</span>
                  <span className="text-emerald-600 font-medium">Excellent ✅</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Soins & santé</span>
                  <span className="text-emerald-600 font-medium">À jour ✅</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Socialisation</span>
                  <span className="text-blue-600 font-medium">Bon 👥</span>
                </div>
              </div>
            </motion.div>

            {/* Comparaison avec d'autres animaux */}
            <motion.div
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-bold text-gray-800 mb-4">Comparaison avec les Golden Retrievers</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Temps d'exercice</span>
                    <span className="text-sm font-medium">Max: 8h30 | Moyenne: 6h45</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Nombre de sorties</span>
                    <span className="text-sm font-medium">Max: 12 | Moyenne: 10</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-4/5"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Onglet Timeline */}
          <TabsContent value="timeline" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Chronologie</h2>
              <div className="flex gap-2">
                 <motion.div whileTap={{ scale: 0.95 }}>
                   <Button 
                     size="sm" 
                     variant="outline" 
                     className="rounded-full bg-white/80 backdrop-blur-sm border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                     onClick={() => setShowTimelineFilters(true)}
                   >
                     <Filter size={16} className="mr-2" />
                     Filtrer
                   </Button>
                 </motion.div>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="rounded-full bg-white/80 backdrop-blur-sm border-gray-300 hover:bg-pet-orange-50 hover:border-pet-orange-300"
                    onClick={() => setShowAddEventModal(true)}
                  >
                    <Plus size={16} className="mr-2" />
                    Ajouter
                  </Button>
                </motion.div>
              </div>
            </div>

             {/* Filtres rapides */}
             <motion.div 
               className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
               initial={{ x: -20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ duration: 0.4 }}
             >
               {[
                 { key: "all", label: "Tout", emoji: "🌟", color: "default" },
                 { key: "photos", label: "Photos", emoji: "📸", color: "outline" },
                 { key: "videos", label: "Vidéos", emoji: "🎥", color: "outline" },
                 { key: "notes", label: "Notes", emoji: "📝", color: "outline" },
                 { key: "soins", label: "Soins", emoji: "🏥", color: "outline" }
               ].map((filter, index) => (
                 <motion.div 
                   key={filter.key} 
                   whileTap={{ scale: 0.95 }}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: index * 0.1 }}
                 >
                   <Button 
                     size="sm" 
                     variant={selectedTimelineFilter === filter.key ? "default" : "outline"}
                     className={`rounded-2xl whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                       selectedTimelineFilter === filter.key 
                         ? "bg-gradient-to-r from-pet-orange-500 to-pet-orange-600 text-white shadow-lg border-none" 
                         : "bg-white/80 backdrop-blur-sm border-gray-300 hover:bg-white hover:shadow-md"
                     }`}
                     onClick={() => setSelectedTimelineFilter(filter.key)}
                   >
                     <span className="mr-2">{filter.emoji}</span>
                     {filter.label}
                   </Button>
                 </motion.div>
               ))}
             </motion.div>

             <motion.div
               className="space-y-4"
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
             >
               {[...healthData.visits, ...activityData, ...memories]
                 .filter(event => {
                   // Filtre rapide
                   if (selectedTimelineFilter === "photos" && 'type' in event && event.type !== 'photo') return false;
                   if (selectedTimelineFilter === "videos" && 'type' in event && event.type !== 'video') return false;
                   if (selectedTimelineFilter === "notes" && ('type' in event && (event.type === 'photo' || event.type === 'video'))) return false;
                   if (selectedTimelineFilter === "soins" && !('reason' in event)) return false;
                   
                   // Filtres avancés
                   if (timelineFilters.search) {
                     const searchLower = timelineFilters.search.toLowerCase();
                     const eventText = JSON.stringify(event).toLowerCase();
                     if (!eventText.includes(searchLower)) return false;
                   }
                   
                   if (timelineFilters.dateFrom) {
                     if (new Date(event.date) < new Date(timelineFilters.dateFrom)) return false;
                   }
                   
                   if (timelineFilters.dateTo) {
                     if (new Date(event.date) > new Date(timelineFilters.dateTo)) return false;
                   }
                   
                   if (timelineFilters.type !== "all") {
                     if (timelineFilters.type === "photos" && (!('type' in event) || event.type !== 'photo')) return false;
                     if (timelineFilters.type === "videos" && (!('type' in event) || event.type !== 'video')) return false;
                     if (timelineFilters.type === "medical" && !('reason' in event)) return false;
                     if (timelineFilters.type === "activities" && ('reason' in event || ('type' in event && (event.type === 'photo' || event.type === 'video')))) return false;
                   }
                   
                   return true;
                 })
                 .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                 .map((event, index) => {
                const isPhoto = 'type' in event && event.type === 'photo';
                const isVideo = 'type' in event && event.type === 'video';
                const isMedical = 'reason' in event;
                const isActivity = 'type' in event && event.type !== 'photo' && event.type !== 'video';

                return (
                    <motion.div
                      key={index}
                      className="timeline-card rounded-3xl p-5 overflow-hidden"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                    <div className="flex space-x-4">
                      {/* Timeline indicator */}
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${
                          isMedical ? 'bg-blue-500' : 
                          isPhoto || isVideo ? 'bg-purple-500' : 
                          'bg-emerald-500'
                        } mb-2`} />
                        <div className="w-0.5 bg-gray-200 flex-1" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center space-x-2">
                              {isMedical && <Stethoscope size={16} className="text-blue-500" />}
                              {isPhoto && <Camera size={16} className="text-purple-500" />}
                              {isVideo && <Play size={16} className="text-purple-500" />}
                              {isActivity && <Activity size={16} className="text-emerald-500" />}
                              
                              <p className="font-medium text-gray-800">
                                {'reason' in event ? event.reason : 
                                 'type' in event ? event.type.charAt(0).toUpperCase() + event.type.slice(1) : 
                                 'Souvenir'}
                              </p>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {new Date(event.date).toLocaleDateString('fr-FR', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                          
                          <div className="text-right">
                            <span className="text-xs text-gray-400">
                              {new Date(event.date).toLocaleTimeString('fr-FR', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Image miniature pour photos/vidéos */}
                        {(isPhoto || isVideo) && 'url' in event && (
                          <motion.div 
                            className="relative mb-3 cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => openImageModal(event)}
                          >
                            <div className="w-full h-40 bg-gray-100 rounded-2xl overflow-hidden relative shadow-md">
                              <img 
                                src={event.url} 
                                alt={'caption' in event ? event.caption : 'Souvenir'} 
                                className="w-full h-full object-cover" 
                              />
                              {isVideo && (
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                  <motion.div 
                                    className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                                    whileHover={{ scale: 1.1 }}
                                  >
                                    <Play size={24} className="text-gray-800 ml-1" />
                                  </motion.div>
                                </div>
                              )}
                              <div className="absolute top-3 right-3">
                                <div className="bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2">
                                  <span className="text-white text-sm font-medium">
                                    {isPhoto ? '📸' : '🎥'}
                                  </span>
                                </div>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                                <p className="text-white text-sm font-medium">
                                  {'caption' in event ? event.caption : 'Souvenir'}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Description/Notes */}
                        <div className="space-y-2">
                          {'notes' in event && event.notes && (
                            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                              <p className="text-sm text-blue-800">📝 {event.notes}</p>
                            </div>
                          )}
                          
                          {'caption' in event && event.caption && (
                            <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                              <p className="text-sm text-purple-800">💭 {event.caption}</p>
                            </div>
                          )}
                          
                          {'duration' in event && event.duration && (
                            <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200">
                              <p className="text-xs text-emerald-700 flex items-center">
                                <Clock size={12} className="mr-1" />
                                Durée: {event.duration}
                              </p>
                            </div>
                          )}
                          
                          {'vet' in event && event.vet && (
                            <div className="p-2 bg-blue-50 rounded-xl border border-blue-200">
                              <p className="text-xs text-blue-700 flex items-center">
                                <Stethoscope size={12} className="mr-1" />
                                {event.vet}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Actions rapides */}
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" className="h-7 px-2 text-gray-500">
                              <Edit size={12} className="mr-1" />
                              Modifier
                            </Button>
                            {(isPhoto || isVideo) && (
                              <Button size="sm" variant="ghost" className="h-7 px-2 text-gray-500">
                                <Share size={12} className="mr-1" />
                                Partager
                              </Button>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {isMedical && (
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                Médical
                              </span>
                            )}
                            {(isPhoto || isVideo) && (
                              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                                Souvenir
                              </span>
                            )}
                            {isActivity && (
                              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                                Activité
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Bouton charger plus */}
            <motion.div 
              className="text-center pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button variant="outline" className="rounded-full">
                Charger plus d'événements
              </Button>
            </motion.div>
          </TabsContent>

        </Tabs>
      </div>

      {/* Modales */}
      <BreedInfoModal 
        isOpen={showBreedModal}
        onClose={() => setShowBreedModal(false)}
        breed={animal.breed}
      />

      <ImageFullScreen
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        imageUrl={selectedImage?.url || ""}
        caption={selectedImage?.caption}
        date={selectedImage?.date}
        onEdit={() => console.log('Éditer image')}
        onDelete={() => console.log('Supprimer image')}
      />

      <AddEventModal
        isOpen={showAddEventModal}
        onClose={() => setShowAddEventModal(false)}
        onAdd={handleAddEvent}
        selectedFilter={selectedTimelineFilter !== "all" ? selectedTimelineFilter : undefined}
      />

      <AddVaccinationModal
        isOpen={showAddVaccinationModal}
        onClose={() => setShowAddVaccinationModal(false)}
        onAdd={handleAddVaccination}
      />

      <AddTreatmentModal
        isOpen={showAddTreatmentModal}
        onClose={() => setShowAddTreatmentModal(false)}
        onAdd={handleAddTreatment}
      />

      <AddMedicalRecordModal
        isOpen={showAddMedicalRecordModal}
        onClose={() => setShowAddMedicalRecordModal(false)}
        onAdd={handleAddMedicalRecord}
      />

      <AddWeightModal
        isOpen={showAddWeightModal}
        onClose={() => setShowAddWeightModal(false)}
        onAdd={handleAddWeight}
      />

      <TimelineFilters
        isOpen={showTimelineFilters}
        onClose={() => setShowTimelineFilters(false)}
        onApplyFilters={handleApplyTimelineFilters}
        currentFilters={timelineFilters}
      />
    </motion.div>
  );
};

export default AnimalProfile;
