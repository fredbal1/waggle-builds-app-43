import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface WeightEntry {
  date: string;
  weight: number;
}

interface WeightChartProps {
  data: WeightEntry[];
  targetWeight?: { min: number; max: number };
}

export const WeightChart = ({ data, targetWeight }: WeightChartProps) => {
  if (!data || data.length === 0) return null;

  const maxWeight = Math.max(...data.map(entry => entry.weight));
  const minWeight = Math.min(...data.map(entry => entry.weight));
  const range = maxWeight - minWeight || 1;

  const currentWeight = data[data.length - 1]?.weight;
  const previousWeight = data[data.length - 2]?.weight;
  const trend = currentWeight && previousWeight ? currentWeight - previousWeight : 0;

  const getTrendIcon = () => {
    if (trend > 0.1) return <TrendingUp size={16} className="text-pet-orange-500" />;
    if (trend < -0.1) return <TrendingDown size={16} className="text-blue-500" />;
    return <Minus size={16} className="text-gray-500" />;
  };

  const getTrendColor = () => {
    if (trend > 0.1) return "text-pet-orange-600";
    if (trend < -0.1) return "text-blue-600";
    return "text-gray-600";
  };

  return (
    <motion.div
      className="rounded-3xl p-6 border shadow-lg"
      style={{
        background: "rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)"
      }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">Évolution du poids</h3>
        <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
          {getTrendIcon()}
          <span className="text-sm font-medium">
            {trend > 0 ? '+' : ''}{trend.toFixed(1)} kg
          </span>
        </div>
      </div>

      {/* Zone cible */}
      {targetWeight && (
        <div className="mb-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
          <p className="text-sm text-emerald-700">
            <span className="font-medium">Zone idéale:</span> {targetWeight.min} - {targetWeight.max} kg
          </p>
        </div>
      )}

      {/* Graphique */}
      <div className="relative h-32 mb-4">
        <svg width="100%" height="100%" className="absolute inset-0">
          {/* Zone cible (si définie) */}
          {targetWeight && (
            <rect
              x="0"
              y={`${((maxWeight + 1 - targetWeight.max) / (range + 2)) * 100}%`}
              width="100%"
              height={`${((targetWeight.max - targetWeight.min) / (range + 2)) * 100}%`}
              fill="rgb(34, 197, 94, 0.1)"
              stroke="rgb(34, 197, 94, 0.3)"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
          )}

          {/* Ligne de poids */}
          <polyline
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={data.map((entry, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = ((maxWeight + 1 - entry.weight) / (range + 2)) * 100;
              return `${x},${y}`;
            }).join(' ')}
          />

          {/* Points */}
          {data.map((entry, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = ((maxWeight + 1 - entry.weight) / (range + 2)) * 100;
            const isLast = index === data.length - 1;
            
            return (
              <motion.circle
                key={index}
                cx={`${x}%`}
                cy={`${y}%`}
                r={isLast ? "6" : "4"}
                fill={isLast ? "hsl(var(--primary))" : "white"}
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              />
            );
          })}
        </svg>

        {/* Labels des axes */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
          <span>{new Date(data[0]?.date).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })}</span>
          <span>{new Date(data[data.length - 1]?.date).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded-xl">
          <p className="text-lg font-bold text-gray-700">{currentWeight} kg</p>
          <p className="text-xs text-gray-500">Actuel</p>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-xl">
          <p className="text-lg font-bold text-blue-600">{minWeight} kg</p>
          <p className="text-xs text-blue-500">Minimum</p>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-xl">
          <p className="text-lg font-bold text-orange-600">{maxWeight} kg</p>
          <p className="text-xs text-orange-500">Maximum</p>
        </div>
      </div>
    </motion.div>
  );
};