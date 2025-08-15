import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const SurahCard = ({ surah, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link to={`/surah/${surah.number}`}>
        <div className="surah-card bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {surah.number}
              </div>
              <div>
                <h3 className="text-xl font-bold">{surah.name}</h3>
                <p className="text-muted-foreground text-sm">{surah.englishName} • {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-muted-foreground ml-2">{surah.numberOfAyahs} آية</span>
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default SurahCard;
