import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/product/ProductCard';
import Layout from '@/components/common/Layout';

export default function SearchResults() {
  const [searchType, setSearchType] = useState<'exact' | 'better' | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  useEffect(() => {
    const results = JSON.parse(sessionStorage.getItem('snapbuy_analysis') || 'null');
    setAnalysisResults(results);
  }, []);

  const handleSearch = async (type: 'exact' | 'better') => {
    if (!analysisResults) return;
    
    setSearchType(type);
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: analysisResults[0]?.name || 'product',
          exactMatch: type === 'exact'
        })
      });
      
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Search failed:', error);
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-taupe-light text-olive-dark">
        <div className="max-w-2xl mx-auto p-4">
          {!searchType ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center py-12"
            >
              <h2 className="text-2xl font-bold mb-8 text-olive">
                We found your product!
              </h2>
              
              <div className="grid grid-cols-2 gap-6 w-full">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-olive-dark py-4 rounded-xl text-lg font-medium text-taupe-light"
                  onClick={() => handleSearch('exact')}
                >
                  Find Exact Same
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-olive py-4 rounded-xl text-lg font-medium text-taupe-light"
                  onClick={() => handleSearch('better')}
                >
                  Show Me Better
                </motion.button>
              </div>
            </motion.div>
          ) : isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-olive-dark"></div>
            </div>
          ) : products.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <h3 className="text-2xl font-bold text-olive mb-4">
                Oh snap. This one's rare 🔥
              </h3>
              <p className="text-xl mb-8 text-olive-dark">
                But here's something even better 😏
              </p>
              <button 
                className="bg-olive-dark hover:bg-olive text-taupe-light px-6 py-3 rounded-xl"
                onClick={() => handleSearch('better')}
              >
                Show Alternatives
              </button>
            </motion.div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-olive-dark">
                {searchType === 'exact' ? 'Exact Matches' : 'Better Alternatives'}
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
                                                      }
