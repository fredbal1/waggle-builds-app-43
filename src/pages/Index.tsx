
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Heart, Shield, Camera, Sparkles, Zap, Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const Index = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.8, 0.6, 0.2]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [30, -30]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-30, 30]), springConfig);

  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const features = [
    {
      icon: Heart,
      title: "Santé & Bien-être",
      description: "Suivez la santé de votre compagnon avec notre IA avancée",
      gradient: "from-pink-500/20 to-red-500/20",
      iconColor: "text-pink-500",
      delay: 0.1
    },
    {
      icon: Camera,
      title: "Souvenirs magiques",
      description: "Capturez et organisez vos plus beaux moments ensemble",
      gradient: "from-purple-500/20 to-blue-500/20",
      iconColor: "text-purple-500",
      delay: 0.2
    },
    {
      icon: Sparkles,
      title: "IA PetSoul",
      description: "Conseils personnalisés par intelligence artificielle",
      gradient: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-500",
      delay: 0.3
    },
    {
      icon: Shield,
      title: "Protection 24/7",
      description: "Accès instantané aux urgences vétérinaires",
      gradient: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-500",
      delay: 0.4
    }
  ];

  const backgroundShapes = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5
  }));

  return (
    <motion.div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundShapes.map((shape) => (
          <motion.div
            key={shape.id}
            className="absolute rounded-full bg-gradient-to-br from-pet-orange-200/10 to-pet-blue-200/10 backdrop-blur-3xl"
            style={{
              width: shape.size,
              height: shape.size,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
            }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -100, 50, 0],
              scale: [1, 1.2, 0.8, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-pet-orange-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        
        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 100 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="relative mb-8"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="w-32 h-32 mx-auto bg-gradient-to-br from-pet-orange-500 to-pet-orange-600 rounded-3xl flex items-center justify-center shadow-2xl"
              animate={{
                boxShadow: [
                  "0 20px 50px rgba(239, 122, 21, 0.3)",
                  "0 25px 60px rgba(239, 122, 21, 0.5)",
                  "0 20px 50px rgba(239, 122, 21, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Heart size={56} className="text-white" />
              </motion.div>
            </motion.div>
            
            {/* Orbiting elements */}
            {[Sparkles, Shield, Camera].map((Icon, index) => (
              <motion.div
                key={index}
                className="absolute w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center"
                animate={{
                  rotate: [0, 360],
                  x: [0, 40 * Math.cos(index * (Math.PI * 2 / 3)), 0],
                  y: [0, 40 * Math.sin(index * (Math.PI * 2 / 3)), 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.5
                }}
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)"
                }}
              >
                <Icon size={16} className="text-pet-orange-500" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              MyVeto
            </motion.h1>
            
            <motion.p
              className="text-xl text-gray-600 max-w-md mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              L'application révolutionnaire qui transforme le soin de vos compagnons à quatre pattes
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          ref={featuresRef}
          className="grid grid-cols-2 gap-4 w-full max-w-lg mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className={`relative bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20 overflow-hidden`}
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={featuresInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                transition={{ 
                  delay: feature.delay,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  z: 20
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <motion.div
                  className="relative z-10"
                  initial={{ y: 20, opacity: 0 }}
                  animate={featuresInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: feature.delay + 0.2 }}
                >
                  <motion.div
                    className="w-14 h-14 mx-auto mb-4 bg-white/80 rounded-2xl flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon size={28} className={feature.iconColor} />
                  </motion.div>
                  
                  <h3 className="font-bold text-gray-800 text-sm mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>

                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 border-2 border-transparent rounded-3xl"
                  animate={{
                    borderColor: [
                      "transparent",
                      "rgba(239, 122, 21, 0.3)",
                      "transparent"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: feature.delay
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center w-full max-w-sm"
          initial={{ opacity: 0, y: 50 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => navigate("/home")}
              className="w-full h-16 text-lg font-bold bg-gradient-to-r from-pet-orange-500 to-pet-orange-600 hover:from-pet-orange-600 hover:to-pet-orange-700 shadow-2xl relative overflow-hidden group"
              size="lg"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
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
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Commencer l'aventure
                </motion.span>
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </span>
            </Button>
          </motion.div>
          
          <motion.div
            className="mt-6 flex items-center justify-center space-x-2"
            initial={{ opacity: 0 }}
            animate={featuresInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.6 }}
          >
            <div className="flex -space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-8 h-8 bg-gradient-to-br from-pet-orange-400 to-pet-orange-600 rounded-full border-2 border-white flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                >
                  <Star size={12} className="text-white" />
                </motion.div>
              ))}
            </div>
            <motion.p
              className="text-sm text-gray-600 ml-4"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Rejoignez +10k familles satisfaites
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Floating action elements */}
        <motion.div
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-pet-blue-500 to-pet-purple-500 rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 360]
          }}
          transition={{
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 10, repeat: Infinity, ease: "linear" }
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <Zap size={24} className="text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Index;
