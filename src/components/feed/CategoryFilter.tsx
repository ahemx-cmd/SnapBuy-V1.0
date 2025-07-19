import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  'Gadgets', 'Fashion', 'Skincare', 'Kitchen', 
  'Gaming', 'Books', 'Luxury', 'Tech', 'Decor'
];

export default function CategoryFilter({ 
  selectedCategory, 
  setSelectedCategory,
  showFilters,
  setShowFilters
}: { 
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}) {
  return (
    <AnimatePresence>
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-16 right-4 bg-gray-soft rounded-xl p-4 z-20 shadow-lg border border-olive"
        >
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.map(category => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-2 rounded-lg text-sm ${
                  selectedCategory === category
                    ? 'bg-olive-dark text-taupe-light'
                    : 'bg-taupe-light text-olive-dark border border-olive'
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowFilters(false);
                }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
                             }
