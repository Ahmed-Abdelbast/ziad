import { useState, useCallback, useRef, useEffect } from 'react';

export const useAudioControls = (surah, selectedReciter) => {
  const [audioSrc, setAudioSrc] = useState('');
  const [audioSeekTime, setAudioSeekTime] = useState(undefined);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);
  const [clickedAyahForPlay, setClickedAyahForPlay] = useState(null);
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [lastSeekTime, setLastSeekTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const lastClickTimeRef = useRef(0);
  const isManualSeekRef = useRef(false);
  const seekTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (seekTimeoutRef.current) {
        clearTimeout(seekTimeoutRef.current);
      }
    };
  }, []);

  const setAudioSrcForNewSurahReciter = useCallback((newSrc) => {
    setAudioSrc(newSrc);
    setAudioSeekTime(undefined);
    setClickedAyahForPlay(null);
    setIsAudioPlaying(false);
    setShouldAutoPlay(false);
    setCurrentAudioTime(0);
    setAudioDuration(0);
    setLastSeekTime(0);
    setIsPaused(false);
    isManualSeekRef.current = false;
    if (seekTimeoutRef.current) {
      clearTimeout(seekTimeoutRef.current);
    }
  }, []);
  
  const handleAudioEnded = useCallback(() => {
    setIsAudioPlaying(false);
    setClickedAyahForPlay(null); 
    setShouldAutoPlay(false);
    setIsPaused(false);
    isManualSeekRef.current = false;
    if (seekTimeoutRef.current) {
      clearTimeout(seekTimeoutRef.current);
    }
  }, []);
  
  const handleAudioPlay = useCallback(() => {
    setIsAudioPlaying(true);
    setIsPaused(false);
  }, []);

  const handleAudioPause = useCallback(() => {
    setIsAudioPlaying(false);
    setShouldAutoPlay(false);
    setIsPaused(true);
  }, []);

  const handleAyahAudioRequest = useCallback((ayahNumberInSurah) => {
    if (!surah || !surah.ayahs || surah.ayahs.length === 0) return;
    
    const ayahIndex = surah.ayahs.findIndex(a => a.numberInSurah === ayahNumberInSurah);
    if (ayahIndex === -1) return;

    const now = Date.now();
    const isQuickClick = now - lastClickTimeRef.current < 300;
    lastClickTimeRef.current = now;

    // If we're already playing this ayah
    if (clickedAyahForPlay === ayahNumberInSurah) {
      if (isPaused || isManualSeekRef.current) {
        // If paused or manual seek, resume from current position
        setAudioSeekTime(currentAudioTime);
        setShouldAutoPlay(true);
        isManualSeekRef.current = false;
      }
      return;
    }

    // Calculate new seek time for the clicked ayah
    let seekTime = 0;
    if (audioDuration > 0) {
      const totalAyahs = surah.ayahs.length;
      const ayahDuration = audioDuration / totalAyahs;
      seekTime = ayahIndex * ayahDuration;
    }
    
    setAudioSeekTime(seekTime);
    setLastSeekTime(seekTime);
    setClickedAyahForPlay(ayahNumberInSurah);
    setShouldAutoPlay(true);
    setIsPaused(false);
    isManualSeekRef.current = false;
  }, [surah, audioDuration, clickedAyahForPlay, isPaused, currentAudioTime]);

  const handleAudioTimeUpdate = useCallback((time, duration) => {
    setCurrentAudioTime(time);
    if (duration && duration !== audioDuration) {
      setAudioDuration(duration);
    }
  }, [audioDuration]);

  const handleAudioSeek = useCallback((seekTime) => {
    setCurrentAudioTime(seekTime);
    setLastSeekTime(seekTime);
    isManualSeekRef.current = true;
  }, []);

  const handleManualSeek = useCallback((seekTime) => {
    if (seekTimeoutRef.current) {
      clearTimeout(seekTimeoutRef.current);
    }

    // Update the seek time immediately
    setAudioSeekTime(seekTime);
    setCurrentAudioTime(seekTime);
    setLastSeekTime(seekTime);
    isManualSeekRef.current = true;
    setShouldAutoPlay(true);

    // Ensure the seek is applied
    seekTimeoutRef.current = setTimeout(() => {
      setAudioSeekTime(seekTime);
      setShouldAutoPlay(true);
    }, 50);
  }, []);

  return {
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
    currentAudioTime,
    audioDuration,
    handleAudioTimeUpdate,
    handleAudioSeek,
    handleManualSeek,
    lastSeekTime,
    isPaused
  };
};
  