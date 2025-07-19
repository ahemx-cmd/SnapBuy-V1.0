import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ImageUploader({ onAnalysisComplete }: { onAnalysisComplete: (data: any) => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    const reader = new FileReader();
    
    reader.onloadend = async () => {
      const base64Data = reader.result as string;
      setPreviewUrl(base64Data);
      
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Data })
        });
        
        const data = await response.json();
        
        if (data.error) {
          alert(`Error: ${data.error}\n${data.suggestion || ''}`);
        } else {
          onAnalysisComplete(data);
        }
      } catch (error) {
        alert('Failed to analyze image. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center py-8">
      <motion.label 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-olive-dark text-taupe-light px-6 py-3 rounded-xl cursor-pointer"
      >
        {isLoading ? 'Analyzing...' : 'Upload Product Photo'}
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleUpload}
          className="hidden"
          disabled={isLoading}
        />
      </motion.label>
      
      {previewUrl && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 rounded-xl overflow-hidden border-2 border-olive max-w-md"
        >
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full object-contain"
          />
        </motion.div>
      )}
    </div>
  );
  }
