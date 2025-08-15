import { useState, useEffect, useCallback, useRef } from 'react';
import { useQuran } from '@/context/QuranContext';
import { useLocation } from 'react-router-dom';

export const useSurahData = (surahNumber) => {
  const { getSurahByNumber, updateLastRead } = useQuran();
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isInitialLoadRef = useRef(true);

  const fetchSurah = useCallback(async () => {
    if (!surahNumber) {
      setSurah(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const surahData = await getSurahByNumber(surahNumber);
      setSurah(surahData);
      if (surahData) {
        updateLastRead(surahNumber, 1);
      }
    } catch (error) {
      console.error(`Failed to fetch surah ${surahNumber}:`, error);
      setSurah(null); 
    } finally {
      setLoading(false);
    }
  }, [surahNumber, getSurahByNumber, updateLastRead]);

  useEffect(() => {
    fetchSurah();
  }, [fetchSurah]);

  // Handle initial scroll to top only on first load
  useEffect(() => {
    if (!loading && surah && isInitialLoadRef.current && !location.hash) {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
      isInitialLoadRef.current = false;
    }
  }, [loading, surah, location.hash]);

  // Reset initial load flag on path change
  useEffect(() => {
    isInitialLoadRef.current = true;
  }, [location.pathname]);

  return { surah, loading };
};
  