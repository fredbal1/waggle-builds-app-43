import { motion } from "framer-motion";
import { X, Share, Download, Trash2, Edit, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ImageFullScreenProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  caption?: string;
  date?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ImageFullScreen = ({ 
  isOpen, 
  onClose, 
  imageUrl, 
  caption, 
  date,
  onEdit,
  onDelete 
}: ImageFullScreenProps) => {
  const [isLiked, setIsLiked] = useState(false);
  
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Header with controls */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent z-10">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <motion.button
            onClick={onClose}
            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
          >
            <X size={20} className="text-white" />
          </motion.button>
          
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() => setIsLiked(!isLiked)}
              className={`w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center transition-colors ${
                isLiked ? 'bg-red-500/80' : 'bg-white/20'
              }`}
              whileTap={{ scale: 0.9 }}
            >
              <Heart size={20} className={isLiked ? 'text-white fill-current' : 'text-white'} />
            </motion.button>
            
            <motion.button
              onClick={() => {
                navigator.share?.({
                  files: [new File([imageUrl], 'photo.jpg', { type: 'image/jpeg' })]
                }).catch(() => {
                  // Fallback - copy to clipboard
                  navigator.clipboard.writeText(imageUrl);
                });
              }}
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
            >
              <Share size={20} className="text-white" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main image */}
      <motion.div
        className="relative max-w-full max-h-full m-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={imageUrl} 
          alt={caption || "Image"}
          className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
        />
      </motion.div>

      {/* Bottom info and actions */}
      {(caption || date) && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
          <div className="max-w-lg mx-auto">
            {caption && (
              <motion.p 
                className="text-white text-center mb-2 font-medium"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {caption}
              </motion.p>
            )}
            
            {date && (
              <motion.p 
                className="text-white/70 text-center text-sm mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {new Date(date).toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </motion.p>
            )}

            {/* Action buttons */}
            <motion.div
              className="flex justify-center space-x-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {onEdit && (
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                  }}
                >
                  <Edit size={16} className="mr-2" />
                  Modifier
                </Button>
              )}
              
              <Button
                size="sm"
                variant="outline"
                className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30"
                onClick={(e) => {
                  e.stopPropagation();
                  // Download logic
                  const link = document.createElement('a');
                  link.href = imageUrl;
                  link.download = `photo-${Date.now()}.jpg`;
                  link.click();
                }}
              >
                <Download size={16} className="mr-2" />
                Télécharger
              </Button>
              
              {onDelete && (
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-red-500/20 backdrop-blur-md border-red-500/30 text-red-200 hover:bg-red-500/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('Supprimer cette photo ?')) {
                      onDelete();
                      onClose();
                    }
                  }}
                >
                  <Trash2 size={16} className="mr-2" />
                  Supprimer
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
};