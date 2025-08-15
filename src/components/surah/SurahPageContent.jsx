import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AyahNumberInline, AyahTextSegment } from '@/components/surah/AyahView';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

const SurahPageContent = ({ 
  surah, 
  surahNumber, 
  bookmarks, 
  addBookmark, 
  updateLastRead, 
  clickedAyahForPlay, 
  isAudioPlaying, 
  handleAyahClick,
  ayahRefs,
  navigateFunc 
}) => {
  const [activeTafsirAyah, setActiveTafsirAyah] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState(null);


  if (!surah || !surah.ayahs) {
    return (
      <ErrorDisplay 
        title="عذراً، لم يتم العثور على بيانات السورة"
        message="قد يكون السبب أن بيانات هذه السورة غير متوفرة حاليًا في التطبيق."
        onRetry={() => navigateFunc('/')} 
        retryMessage="العودة إلى الصفحة الرئيسية"
      />
    );
  }

  const handleShowTafsir = (ayah, event) => {
    setActiveTafsirAyah(ayah);
    if (event && event.currentTarget) {
      setPopoverAnchor(event.currentTarget);
    }
    setPopoverOpen(true);
  };
  
  const handleAyahSegmentClick = (ayah) => {
    handleAyahClick(ayah.numberInSurah);
  };

  return (
    <>
      {(surah.number !== 1 && surah.number !== 9) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bismillah mb-8"
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="quran-container p-4 md:p-8 rounded-2xl mb-8 decorative-pattern"
      >
        <div className="ayah-text-block arabic-text">
          {surah.ayahs.map((ayah) => (
            <React.Fragment key={ayah.numberInSurah}>
              <AyahTextSegment
                ayah={ayah}
                isCurrentPlaying={clickedAyahForPlay === ayah.numberInSurah && isAudioPlaying}
              />
              <span className="group relative inline-block">
                <AyahNumberInline
                  ref={el => ayahRefs.current[`ayah-${ayah.numberInSurah}`] = el}
                  ayah={ayah}
                  surahNumber={surahNumber}
                  isBookmarked={bookmarks.some(b => b.surahNumber === surahNumber && b.ayahNumber === ayah.numberInSurah)}
                  onAddBookmark={() => addBookmark(surahNumber, ayah.numberInSurah)}
                  onUpdateLastRead={() => updateLastRead(surahNumber, ayah.numberInSurah)}
                  isCurrentPlaying={clickedAyahForPlay === ayah.numberInSurah && isAudioPlaying}
                  onShowTafsir={(targetAyah, event) => handleShowTafsir(targetAyah, event)}
                />
              </span>
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {activeTafsirAyah && (
         <Popover open={popoverOpen} onOpenChange={setPopoverOpen} modal={false}>
            <PopoverTrigger asChild>
              <button ref={setPopoverAnchor} style={{ position: 'fixed', top: '-9999px', left: '-9999px' }} aria-hidden="true"></button>
            </PopoverTrigger>
            <PopoverContent
              className="w-80 tafsir-popover-content text-sm"
              side="top"
              align="center"
              onOpenAutoFocus={(e) => e.preventDefault()} 
            >
              <h4 className="font-bold mb-2 text-primary">التفسير الميسر (الآية {activeTafsirAyah.numberInSurah}):</h4>
              <p className="text-muted-foreground">{activeTafsirAyah.tafsir || "التفسير غير متوفر لهذه الآية."}</p>
              <Button variant="outline" size="sm" className="mt-4 w-full" onClick={() => setPopoverOpen(false)}>إغلاق</Button>
            </PopoverContent>
          </Popover>
      )}
    </>
  );
};

export default SurahPageContent;
  