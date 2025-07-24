import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Animal {
  id: string;
  name: string;
  photo: string;
  breed: string;
}

interface AnimalSwitcherProps {
  currentAnimal: Animal;
  animals?: Animal[];
  onAnimalChange?: (animal: Animal) => void;
}

export const AnimalSwitcher = ({ currentAnimal, animals = [], onAnimalChange }: AnimalSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const mockAnimals: Animal[] = [
    { id: "1", name: "Max", photo: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop&crop=face", breed: "Golden Retriever" },
    { id: "2", name: "Luna", photo: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&crop=face", breed: "Border Collie" },
    { id: "3", name: "Milo", photo: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=400&fit=crop&crop=face", breed: "Bouledogue français" }
  ];

  const allAnimals = animals.length > 0 ? animals : mockAnimals;

  return (
    <div className="relative">
      <motion.button
        className="animal-switcher rounded-xl p-3 flex items-center space-x-3 min-w-[120px]"
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 h-8 bg-white rounded-full overflow-hidden border-2 border-orange-200">
          <img src={currentAnimal.photo} alt={currentAnimal.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 text-left">
          <span className="text-sm font-medium text-gray-700 block">{currentAnimal.name}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} className="text-gray-500" />
        </motion.div>
      </motion.button>

      {isOpen && (
        <motion.div
          className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden"
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {allAnimals.map((animal) => (
            <motion.button
              key={animal.id}
              className="w-full p-3 flex items-center space-x-3 hover:bg-orange-50 transition-colors text-left"
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                onAnimalChange?.(animal);
                setIsOpen(false);
              }}
            >
              <div className="w-8 h-8 bg-white rounded-full overflow-hidden border-2 border-orange-200">
                <img src={animal.photo} alt={animal.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-700 block">{animal.name}</span>
                <span className="text-xs text-gray-500">{animal.breed}</span>
              </div>
              {currentAnimal.id === animal.id && (
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              )}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
};