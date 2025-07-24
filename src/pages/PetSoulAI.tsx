
import { motion } from "framer-motion";
import { MessageCircle, Send, Sparkles, TrendingUp, Heart, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const mockConversation = [
  {
    id: 1,
    type: "ai" as const,
    message: "Bonjour ! Je suis PetSoul, votre assistant IA pour le bien-être de vos compagnons. Comment puis-je vous aider aujourd'hui ?",
    timestamp: "10:00",
    confidence: 95
  },
  {
    id: 2,
    type: "user" as const,
    message: "Max semble moins actif ces derniers jours, est-ce normal ?",
    timestamp: "10:02"
  },
  {
    id: 3,
    type: "ai" as const,
    message: "J'ai analysé les données d'activité de Max. Il y a effectivement une baisse de 23% sur les 3 derniers jours. Cela peut être dû au changement de météo ou à un début de fatigue. Je recommande d'observer s'il mange et boit normalement, et de consulter si cela persiste.",
    timestamp: "10:03",
    confidence: 87,
    suggestions: [
      "Vérifier son appétit",
      "Prendre sa température",
      "Surveiller 2-3 jours"
    ]
  }
];

const quickQuestions = [
  "Comment améliorer son alimentation ?",
  "Exercices recommandés pour son âge ?",
  "Signes de stress à surveiller ?",
  "Routine de toilettage optimale ?"
];

const insights = [
  {
    title: "Analyse comportementale",
    value: "Excellent",
    change: "+5%",
    icon: Brain,
    color: "emerald"
  },
  {
    title: "Niveau d'activité",
    value: "Optimal",
    change: "-12%",
    icon: TrendingUp,
    color: "blue"
  },
  {
    title: "Bien-être général",
    value: "95%",
    change: "+2%",
    icon: Heart,
    color: "pink"
  }
];

const PetSoulAI = () => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState(mockConversation);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: conversation.length + 1,
      type: "user" as const,
      message: message,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };

    setConversation([...conversation, newMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: conversation.length + 2,
        type: "ai" as const,
        message: "Je vais analyser votre question et vous donner une réponse personnalisée basée sur les données de vos animaux...",
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        confidence: Math.floor(Math.random() * 20) + 80
      };
      setConversation(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-600 safe-area-top">
        <div className="px-6 py-6">
          <motion.div
            className="text-center text-white"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)) 0%, rgba(251, 146, 60, 1) 100%)",
                boxShadow: "0 8px 32px rgba(239, 122, 21, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3)"
              }}
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Brain size={32} className="text-white drop-shadow-lg" />
            </motion.div>
            <h1 className="text-2xl font-bold">IA Animalière</h1>
            <p className="opacity-90">Votre conseiller intelligent pour vos compagnons</p>
          </motion.div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Insights Cards */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Analyses en temps réel</h2>
          
          <div className="grid grid-cols-3 gap-3">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`w-10 h-10 mx-auto mb-2 bg-${insight.color}-100 rounded-full flex items-center justify-center`}>
                    <Icon size={20} className={`text-${insight.color}-600`} />
                  </div>
                  <p className="font-bold text-gray-800 text-sm">{insight.value}</p>
                  <p className="text-xs text-gray-600">{insight.title}</p>
                  <span className={`text-xs font-medium ${
                    insight.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {insight.change}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Quick Questions */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Questions fréquentes</h2>
          
          <div className="space-y-2">
            {quickQuestions.map((question, index) => (
              <motion.button
                key={index}
                className="w-full text-left p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMessage(question)}
              >
                <p className="text-gray-800 font-medium">{question}</p>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Conversation */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Conversation</h2>
          
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Messages */}
            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
              {conversation.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`max-w-[80%] rounded-2xl p-4 ${
                    msg.type === 'user' 
                      ? 'bg-gradient-to-r from-pet-orange-400 to-pet-orange-600 text-white' 
                      : 'bg-gray-50 text-gray-800'
                  }`}>
                    {msg.type === 'ai' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <MessageCircle size={16} className="text-purple-600" />
                        <span className="text-sm font-medium text-purple-600">PetSoul</span>
                        {msg.confidence && (
                          <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                            {msg.confidence}% sûr
                          </span>
                        )}
                      </div>
                    )}
                    
                    <p className="leading-relaxed">{msg.message}</p>
                    
                    {msg.suggestions && (
                      <div className="mt-3 space-y-1">
                        {msg.suggestions.map((suggestion, idx) => (
                          <motion.button
                            key={idx}
                            className="block w-full text-left p-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors"
                            whileTap={{ scale: 0.98 }}
                          >
                            {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-xs opacity-70 mt-2">{msg.timestamp}</p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex items-center space-x-1">
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-3">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Posez votre question à PetSoul..."
                  className="flex-1 rounded-xl border-gray-200 focus:border-purple-400"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!message.trim() || isTyping}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-xl px-6"
                >
                  <Send size={20} />
                </Button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default PetSoulAI;
