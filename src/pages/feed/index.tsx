import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiFilter } from 'react-icons/fi';
import Layout from '@/components/common/Layout';
import CategoryFilter from '@/components/feed/CategoryFilter';
import ProductGrid from '@/components/product/ProductGrid';

const CATEGORIES = [
  'Gadgets', 'Fashion', 'Skincare', 'Kitchen', 
  'Gaming', 'Books', 'Luxury', 'Tech', 'Decor'
];

export default function ProductFeed() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Gadgets');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/feed?category=${selectedCategory}`);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Feed fetch error:', error);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <Layout>
      <div className="min-h-screen pb-24">
        <div className="sticky top-0 bg-olive-dark z-10 p-4 flex justify-between items-center shadow-md">
          <h1 className="text-2xl font-bold text-gray-soft">Product Feed</h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-full bg-taupe-light text-olive-dark"
          >
            <FiFilter size={24} />
          </motion.button>
        </div>

        <CategoryFilter 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />

        <ProductGrid products={products} isLoading={isLoading} />
      </div>
    </Layout>
  );
    }
