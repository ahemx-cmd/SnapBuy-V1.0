import { motion } from 'framer-motion';
import { FiHeart, FiShare2, FiDownload } from 'react-icons/fi';

export default function ProductCard({ product }: any) {
  return (
    <motion.div 
      className="bg-taupe-light rounded-xl overflow-hidden shadow-sm border border-olive"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative h-60">
        <img 
          src={product.thumbnail} 
          alt={product.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          <button className="p-2 rounded-full text-olive-dark bg-gray-soft bg-opacity-80">
            <FiHeart />
          </button>
          <button className="p-2 rounded-full text-olive-dark bg-gray-soft bg-opacity-80">
            <FiShare2 />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-olive-dark font-medium truncate">{product.title}</h3>
        <p className="text-olive text-sm mt-1 truncate">{product.description}</p>
        
        <div className="mt-3 flex justify-between items-center">
          <span className="text-olive-dark font-bold">${product.price}</span>
          <div className="flex items-center">
            <span className="text-yellow-600 mr-1">★</span>
            <span className="text-olive-dark">{product.rating}</span>
            <span className="text-olive mx-1">|</span>
            <span className="text-olive">{product.reviews} reviews</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between">
          <a 
            href={product.link} 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-olive-dark hover:bg-olive text-taupe-light px-4 py-2 rounded-lg text-sm"
          >
            Buy Now
          </a>
          <button className="text-olive hover:text-olive-dark">
            <FiDownload />
          </button>
        </div>
      </div>
    </motion.div>
  );
            }
