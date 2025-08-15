import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuran } from '@/context/QuranContext';
import SurahCard from '@/components/SurahCard';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { BookOpen, Bookmark, Search, Info } from 'lucide-react';
import DedicationSection from '@/components/DedicationSection';
import { LoadingSpinner } from '@/components/LoadingSpinner';

const HomePage = () => {
  const { getAllSurahs, lastRead, bookmarks } = useQuran();
  const surahs = getAllSurahs();

  if (!surahs || surahs.length === 0) {
    return <LoadingSpinner message="جاري تحميل قائمة السور..." />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <DedicationSection />
      
      <motion.div 
        className="text-center my-12"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          القرآن الكريم
        </h1>
        <p className="text-lg text-muted-foreground">
          تصفح واستمع إلى آيات الذكر الحكيم.
        </p>
      </motion.div>

      {/* <motion.div 
        className="mb-12"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <SearchBar />
      </motion.div> */}

      {lastRead && (
        <motion.div 
          className="mb-12 p-6 bg-primary/5 dark:bg-primary/10 rounded-xl shadow-lg border border-primary/20"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-primary mb-3">آخر ما قرأت</h2>
          <p className="text-lg text-muted-foreground mb-4">
            سورة {lastRead.surahName} - الآية {lastRead.ayahNumber}
          </p>
          <Button asChild variant="default" className="bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 text-white">
            <Link to={`/surah/${lastRead.surahNumber}#ayah-${lastRead.ayahNumber}`}>
              <BookOpen className="mr-2 h-5 w-5" /> متابعة القراءة
            </Link>
          </Button>
        </motion.div>
      )}

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {surahs.map((surah) => (
          <motion.div key={surah.number} variants={itemVariants}>
            <SurahCard surah={surah} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="mt-16 text-center"
        initial={{ opacity:0, y:20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ delay: 0.5 + surahs.length * 0.05 }}
      >
        <h2 className="text-2xl font-semibold text-primary mb-4">أدوات مساعدة</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {}
          <Button variant="outline" asChild>
            <Link to="/bookmarks">
              <Bookmark className="mr-2 h-4 w-4" />  الآيات المحفوظة({bookmarks.length})
            </Link>
          </Button>
           <Button variant="outline" asChild>
            <Link to="/about">
              <Info className="mr-2 h-4 w-4" /> عن التطبيق
            </Link>
          </Button>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default HomePage;
  