
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const SurahNavigation = ({ currentSurahNumber, onNavigate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="flex justify-between mb-8"
    >
      {currentSurahNumber > 1 && (
        <Button
          variant="outline"
          onClick={() => onNavigate(currentSurahNumber - 1)}
        >
          السورة السابقة
        </Button>
      )}
      
      {currentSurahNumber < 114 && (
        <Button
          variant="outline"
          onClick={() => onNavigate(currentSurahNumber + 1)}
          className="mr-auto" 
        >
          السورة التالية
        </Button>
      )}
    </motion.div>
  );
};

export default SurahNavigation;
  