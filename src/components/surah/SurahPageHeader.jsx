
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SurahHeader from '@/components/surah/SurahHeader';

const SurahPageHeader = ({ navigate, surah, reciters, selectedReciterId, onReciterChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <Button
        variant="ghost"
        size="sm"
        className="mb-4"
        onClick={() => navigate('/')}
      >
        <ArrowRight className="mr-2 h-4 w-4" />
        العودة إلى فهرس السور
      </Button>
      {surah && selectedReciterId && (
        <SurahHeader 
          surah={surah}
          reciters={reciters}
          selectedReciter={selectedReciterId}
          onReciterChange={onReciterChange}
        />
      )}
    </motion.div>
  );
};

export default SurahPageHeader;
  