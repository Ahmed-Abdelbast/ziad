
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuran } from '@/context/QuranContext';
import { reciters } from '@/config/reciters';
import { getAudioUrlForSurah } from '@/lib/audioUtils';
import { useSurahData } from '@/hooks/useSurahData';
import { useAudioControls } from '@/hooks/useAudioControls';
import { useScrollToAyah } from '@/hooks/useScrollToAyah';
import { LoadingSpinner } from '@/components/LoadingSpinner'; 
import SurahPageLayout from '@/components/surah/SurahPageLayout';
import SurahPageHeader from '@/components/surah/SurahPageHeader';
import SurahPageAudioSection from '@/components/surah/SurahPageAudioSection';
import SurahPageContent from '@/components/surah/SurahPageContent';
import SurahNavigation from '@/components/surah/SurahNavigation';

const SurahPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const { addBookmark, bookmarks, updateLastRead } = useQuran();
  
  const surahNumber = parseInt(id);
  const { surah, loading: surahLoading } = useSurahData(surahNumber);
  const [selectedReciter, setSelectedReciter] = useState(reciters[0] || null);

  const {
    audioSrc,
    audioSeekTime,
    isAudioPlaying,
    shouldAutoPlay,
    clickedAyahForPlay, 
    handleAudioEnded,
    handleAudioPlay,
    handleAudioPause,
    handleAyahAudioRequest,
    setAudioSrcForNewSurahReciter,
    handleAudioTimeUpdate,
    handleAudioSeek
  } = useAudioControls(surah, selectedReciter);

  const ayahRefs = useRef({});
  useScrollToAyah(ayahRefs, surahLoading);


  useEffect(() => {
    if (selectedReciter) {
      setAudioSrcForNewSurahReciter(getAudioUrlForSurah(surahNumber, selectedReciter));
    } else {
      setAudioSrcForNewSurahReciter('');
    }
  }, [surahNumber, selectedReciter, setAudioSrcForNewSurahReciter]);
  
  const handleReciterChange = (reciterId) => {
    const newReciter = reciters.find(r => r.id === reciterId);
    if (newReciter) {
      setSelectedReciter(newReciter);
    }
  };

  const handleNavigate = (newSurahNumber) => {
    navigate(`/surah/${newSurahNumber}`);
  };
  
  if (surahLoading) {
    return <LoadingSpinner message={`جاري تحميل سورة ${surah?.name || 'البيانات'}...`} />;
  }

  return (
    <SurahPageLayout>
      <SurahPageHeader 
        navigate={navigate}
        surah={surah}
        reciters={reciters}
        selectedReciterId={selectedReciter?.id}
        onReciterChange={handleReciterChange}
      />
      
      <SurahPageAudioSection
        surah={surah}
        selectedReciter={selectedReciter}
        audioSrc={audioSrc}
        audioSeekTime={audioSeekTime}
        shouldAutoPlay={shouldAutoPlay}
        onAudioEnded={handleAudioEnded}
        onAudioPlay={handleAudioPlay}
        onAudioPause={handleAudioPause}
        onAudioTimeUpdate={handleAudioTimeUpdate}
        onAudioSeek={handleAudioSeek}
      />
      
      <SurahPageContent
        surah={surah}
        surahNumber={surahNumber}
        bookmarks={bookmarks}
        addBookmark={addBookmark}
        updateLastRead={updateLastRead}
        clickedAyahForPlay={clickedAyahForPlay}
        isAudioPlaying={isAudioPlaying}
        handleAyahClick={handleAyahAudioRequest}
        ayahRefs={ayahRefs}
        navigateFunc={navigate} 
      />
      
      <SurahNavigation
        currentSurahNumber={surahNumber}
        onNavigate={handleNavigate}
      />
    </SurahPageLayout>
  );
};

export default SurahPage;
  