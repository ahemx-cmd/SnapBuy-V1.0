import { useState } from 'react';
import { motion } from 'framer-motion';
import ImageUploader from '@/components/search/ImageUploader';
import Layout from '@/components/common/Layout';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const handleAnalysisComplete = (data: any) => {
    setAnalysisResults(data);
    sessionStorage.setItem('snapbuy_analysis', JSON.stringify(data));
    router.push('/search');
  };

  return (
    <Layout>
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-4 text-olive-dark">Discover Products with a Snap</h2>
          <p className="text-olive max-w-md">
            Upload an image to find the exact product or discover better alternatives.
          </p>
        </motion.div>

        <ImageUploader onAnalysisComplete={handleAnalysisComplete} />
      </div>
    </Layout>
  );
        }
