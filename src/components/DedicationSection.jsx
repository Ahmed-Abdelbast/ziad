import React from 'react';
import { motion } from 'framer-motion';

const DedicationSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-primary/5 dark:bg-gray-800 py-6 md:py-10"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl bg-card dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* الصورة */}
            <div className="md:shrink-0 w-full md:w-48">
              <img 
                className="h-48 w-full object-contain md:h-full md:w-48 bg-white" 
                alt="صورة رمزية للصدقة الجارية"
                src="/images/photo_2025-05-12_13-05-08.jpg" 
              />
            </div>

            {/* النص */}
            <div className="p-6 md:p-8 text-center md:text-right flex flex-col justify-center">
              <p className="text-lg md:text-xl font-semibold text-primary dark:text-primary-foreground arabic-text leading-relaxed">
                صدقة جارية على روح شيخي ومعلمي وقدوتي ورفيقي في الجنة بإذن ربي 
              </p>
              <p className="text-lg md:text-xl font-semibold text-primary dark:text-primary-foreground arabic-text leading-relaxed">
                حامد عبدالله يونس
              </p>
              <p className="mt-3 text-sm md:text-base text-mut~ed-foreground dark:text-gray-300">
                رحمه الله وأسكنه فسيح جناته
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DedicationSection;
  