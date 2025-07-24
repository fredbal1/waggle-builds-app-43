
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Heart, Plus, ArrowRight, Camera, Stethoscope, Sparkles, Shield, Star, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const onboardingSteps = [
  {
    title: "Bienvenue dans MyVeto",
    subtitle: "Votre compagnon numérique révolutionnaire pour prendre soin de vos animaux avec l'intelligence artificielle",
    icon: Heart,
    color: "pet-orange",
    gradient: "from-pink-500 to-orange-500",
    bgGradient: "from-pink-50 to-orange-50"
  },
  {
    title: "Ajoutez vos compagnons",
    subtitle: "Créez des profils personnalisés pour chaque animal avec reconnaissance d'image IA",
    icon: Plus,
    color: "pet-blue",
    gradient: "from-blue-500 to-purple-500",
    bgGradient: "from-blue-50 to-purple-50"
  },
  {
    title: "Suivi santé intelligent",
    subtitle: "Vaccins, visites, traitements... Notre IA analyse et anticipe les besoins de santé",
    icon: Stethoscope,
    color: "pet-emerald",
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50"
  },
  {
    title: "Souvenirs magiques",
    subtitle: "Photos, vidéos, anecdotes... Créez le journal de vie digital de vos compagnons",
    icon: Camera,
    color: "pet-purple",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50"
  }
];

const Home = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [20, -20]);
  const rotateY = useTransform(mouseX, [-300, 300], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const nextStep = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (currentStep < onboardingSteps.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      navigate("/dashboard");
    }
  };

  const currentStepData = onboardingSteps[currentStep];
  const Icon = currentStepData.icon;

  // Floating particles for current step
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2
  }));

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentStepData.bgGradient} relative overflow-hidden transition-colors duration-1000`}>
      {/* Advanced Progress Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 safe-area-top">
        <div className="p-6">
          <div className="flex space-x-2 mb-2">
            {onboardingSteps.map((_, index) => (
              <motion.div
                key={index}
                className="h-2 rounded-full flex-1 bg-white/20 overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <motion.div
                  className={`h-full bg-gradient-to-r ${currentStepData.gradient} rounded-full`}
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: index <= currentStep ? "100%" : "0%",
                    opacity: index <= currentStep ? 1 : 0.3
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="flex justify-between text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span>Étape {currentStep + 1}</span>
            <span>{Math.round(((currentStep + 1) / onboardingSteps.length) * 100)}%</span>
          </motion.div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full bg-gradient-to-r ${currentStepData.gradient} opacity-20`}
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, 50, -50, 0],
              scale: [1, 1.5, 0.5, 1],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Large background shapes */}
        <motion.div
          className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            className="text-center max-w-sm mx-auto"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Icon Section */}
            <motion.div
              className="relative mb-8"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
              <motion.div
                className={`w-40 h-40 mx-auto bg-gradient-to-br ${currentStepData.gradient} rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden`}
                animate={{
                  boxShadow: [
                    "0 20px 60px rgba(59, 130, 246, 0.3)",
                    "0 30px 80px rgba(59, 130, 246, 0.5)",
                    "0 20px 60px rgba(59, 130, 246, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                
                <motion.div
                  className="relative z-10"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Icon size={64} className="text-white" />
                </motion.div>

                {/* Orbiting stars */}
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-white rounded-full"
                    animate={{
                      rotate: [0, 360],
                      x: [0, 60 * Math.cos(i * (Math.PI * 2 / 3))],
                      y: [0, 60 * Math.sin(i * (Math.PI * 2 / 3))]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.5
                    }}
                    style={{
                      left: "50%",
                      top: "50%",
                      transformOrigin: "0 0"
                    }}
                  />
                ))}
              </motion.div>

              {/* Step indicator rings */}
              <motion.div
                className="absolute inset-0 border-4 border-dashed border-white/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-4 border-2 border-white/20 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <motion.h1
                className="text-4xl font-bold text-gray-800 mb-6"
                animate={{
                  backgroundImage: [
                    "linear-gradient(45deg, #1f2937, #374151)",
                    "linear-gradient(45deg, #374151, #1f2937)",
                    "linear-gradient(45deg, #1f2937, #374151)"
                  ]
                }}
                style={{
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {currentStepData.title}
              </motion.h1>

              <motion.p
                className="text-lg text-gray-600 leading-relaxed mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {currentStepData.subtitle}
              </motion.p>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Section */}
        <motion.div
          className="w-full max-w-sm space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={nextStep}
              disabled={isAnimating}
              className={`w-full h-16 text-lg font-bold bg-gradient-to-r ${currentStepData.gradient} hover:shadow-2xl transition-all duration-300 relative overflow-hidden group`}
              size="lg"
            >
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ["-100%", "100%"]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <span className="relative z-10 flex items-center justify-center space-x-3">
                <motion.span
                  animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === onboardingSteps.length - 1 ? "Découvrir MyVeto" : "Continuer"}
                </motion.span>
                
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={24} />
                </motion.div>
              </span>
            </Button>
          </motion.div>

          {/* Skip button */}
          {currentStep > 0 && (
            <motion.button
              onClick={() => navigate("/dashboard")}
              className="w-full text-gray-500 hover:text-gray-700 py-4 transition-colors relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <span className="relative z-10">Passer l'introduction</span>
              <motion.div
                className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gray-400 group-hover:w-full transition-all duration-300"
                style={{ transform: "translateX(-50%)" }}
              />
            </motion.button>
          )}
        </motion.div>

        {/* Step Counter */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="flex space-x-2">
            {onboardingSteps.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep ? 'bg-gray-800 w-8' : 'bg-gray-300'
                }`}
                animate={{
                  scale: index === currentStep ? [1, 1.2, 1] : 1
                }}
                transition={{ duration: 0.5 }}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 font-medium">
            {currentStep + 1} sur {onboardingSteps.length}
          </span>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="fixed top-20 right-6 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360]
          }}
          transition={{
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" }
          }}
        >
          <Star size={20} className="text-yellow-500" />
        </motion.div>

        <motion.div
          className="fixed bottom-20 left-6 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
          animate={{
            y: [0, 15, 0],
            x: [0, 10, 0],
            rotate: [0, -360]
          }}
          transition={{
            y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 6, repeat: Infinity, ease: "linear" }
          }}
        >
          <Zap size={16} className="text-blue-500" />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
