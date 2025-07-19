import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, isLoading }: { products: any[], isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 p-4">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-taupe-light border border-olive rounded-xl aspect-square animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-2 gap-4 p-4"
    >
      <AnimatePresence>
        {products.map(product => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
      }
