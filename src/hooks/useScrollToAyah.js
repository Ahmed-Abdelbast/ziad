import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToAyah = (ayahRefs, surahLoading) => {
  const location = useLocation();
  const scrollTimeoutRef = useRef(null);
  const hasScrolledToHashRef = useRef(false);
  const lastScrollPositionRef = useRef(0);
  const isInitialLoadRef = useRef(true);

  const performScroll = (element, blockOption = 'center') => {
    if (!element) return;

    // Store current scroll position
    lastScrollPositionRef.current = window.scrollY;

    // Only scroll if it's initial load or hash change
    if (isInitialLoadRef.current || location.hash) {
      requestAnimationFrame(() => {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: blockOption, 
          inline: 'nearest'
        });
      });
    }
  };

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // If user scrolls more than 100px, consider it manual scrolling
      if (Math.abs(window.scrollY - lastScrollPositionRef.current) > 100) {
        isInitialLoadRef.current = false;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash changes and initial load
  useEffect(() => {
    if (surahLoading) {
      hasScrolledToHashRef.current = false;
      return;
    }

    const hash = location.hash;
    if (hash && !hasScrolledToHashRef.current) {
      const ayahIdFromHash = hash.substring(1);
      const element = ayahRefs.current[ayahIdFromHash] || document.getElementById(ayahIdFromHash);
      
      if (element) {
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          performScroll(element);
          hasScrolledToHashRef.current = true;
        }, 300);
      }
    }
  }, [location.hash, surahLoading, ayahRefs]);

  // Reset flags on path change
  useEffect(() => {
    hasScrolledToHashRef.current = false;
    isInitialLoadRef.current = true;
  }, [location.pathname]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);
};
  