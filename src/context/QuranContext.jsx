import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';

const QURAN_API_BASE_URL = 'https://api.alquran.cloud/v1';

const QuranContext = createContext();

export const QuranProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [lastRead, setLastRead] = useState(null);
  const [surahsMeta, setSurahsMeta] = useState([]);
  const [quranTextCache, setQuranTextCache] = useState({}); 
  const [tafsirTextCache, setTafsirTextCache] = useState({});
  const [loadingMessage, setLoadingMessage] = useState(null);
  const { toast } = useToast();

  const fetchWithLoading = useCallback(async (url, loadingMsg) => {
    setLoadingMessage(loadingMsg);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`فشل جلب البيانات: ${response.statusText}`);
      }
      const data = await response.json();
      return data.data; 
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        toast({
          title: "خطأ في الشبكة",
          description: `لم نتمكن من تحميل البيانات المطلوبة. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى. (${error.message})`,
          variant: "destructive",
        });
      }, 0);
      throw error;
    } finally {
      setLoadingMessage(null);
    }
  }, [toast]);

  useEffect(() => {
    const initializeQuranData = async () => {
      try {
        const metaData = await fetchWithLoading(`${QURAN_API_BASE_URL}/meta`, "جاري تحميل بيانات السور...");
        setSurahsMeta(metaData.surahs.references);
      } catch (error) {
        // Error is handled by fetchWithLoading
      }
    };
    initializeQuranData();

    const storedBookmarks = localStorage.getItem('quran-bookmarks');
    const storedLastRead = localStorage.getItem('quran-last-read');
    
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }
    
    if (storedLastRead) {
      setLastRead(JSON.parse(storedLastRead));
    }
  }, [fetchWithLoading]);

  useEffect(() => {
    localStorage.setItem('quran-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    if (lastRead) {
      localStorage.setItem('quran-last-read', JSON.stringify(lastRead));
    }
  }, [lastRead]);

  const getAllSurahs = useCallback(() => {
    return surahsMeta;
  }, [surahsMeta]);

  const getSurahByNumber = useCallback(async (number) => {
    if (!number) return null;

    const meta = surahsMeta.find(s => s.number === number);
    if (!meta) return null;

    let textData = quranTextCache[number];
    if (!textData) {
      try {
        textData = await fetchWithLoading(`${QURAN_API_BASE_URL}/surah/${number}/quran-uthmani`, `جاري تحميل سورة ${meta.name}...`);
        setQuranTextCache(prev => ({ ...prev, [number]: textData }));
      } catch (error) {
        return null; 
      }
    }
    
    let tafsirDataAyahs = tafsirTextCache[number];
    if (!tafsirDataAyahs) {
        try {
            const fullTafsirData = await fetchWithLoading(`${QURAN_API_BASE_URL}/surah/${number}/ar.muyassar`, `جاري تحميل تفسير سورة ${meta.name}...`);
            tafsirDataAyahs = {};
            fullTafsirData.ayahs.forEach(ayah => {
                tafsirDataAyahs[ayah.numberInSurah] = ayah.text;
            });
            setTafsirTextCache(prev => ({ ...prev, [number]: tafsirDataAyahs }));
        } catch (error) {
            console.warn(`Failed to load tafsir for surah ${number}: ${error.message}`);
        }
    }

    if (textData && textData.ayahs) {
      return {
        ...meta,
        ayahs: textData.ayahs.map(ayah => {
          const tafsir = tafsirDataAyahs?.[ayah.numberInSurah] || "التفسير غير متوفر لهذه الآية.";
          return { ...ayah, tafsir };
        })
      };
    }
    return null;
  }, [surahsMeta, quranTextCache, tafsirTextCache, fetchWithLoading]);
  
  const getAyahTafsir = useCallback(async (surahNumber, ayahNumberInSurah) => {
    if (tafsirTextCache[surahNumber] && tafsirTextCache[surahNumber][ayahNumberInSurah]) {
      return tafsirTextCache[surahNumber][ayahNumberInSurah];
    }
    const surahData = await getSurahByNumber(surahNumber);
    return surahData?.ayahs?.find(a => a.numberInSurah === ayahNumberInSurah)?.tafsir || "التفسير غير متوفر لهذه الآية.";
  }, [tafsirTextCache, getSurahByNumber]);

  const addBookmark = useCallback((surahNumber, ayahNumber) => {
    const surahName = surahsMeta.find(s => s.number === surahNumber)?.name || "";
    const newBookmark = {
      id: Date.now(),
      surahNumber,
      ayahNumber,
      surahName,
      timestamp: new Date().toISOString(),
    };
    
    setBookmarks((prevBookmarks) => {
      const existingBookmark = prevBookmarks.find(b => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber);
      if (existingBookmark) {
        setTimeout(() => {
          toast({
            title: "الإشارة المرجعية موجودة بالفعل",
            description: `الآية ${ayahNumber} من سورة ${surahName} موجودة بالفعل في إشاراتك.`,
            variant: "destructive",
          });
        }, 0);
        return prevBookmarks;
      }
      setTimeout(() => {
        toast({
          title: "تمت إضافة الإشارة المرجعية",
          description: `تم حفظ الآية ${ayahNumber} من سورة ${surahName}`,
        });
      }, 0);
      return [...prevBookmarks, newBookmark];
    });
  }, [surahsMeta, toast]);

  const removeBookmark = useCallback((bookmarkId) => {
    setBookmarks((prevBookmarks) => prevBookmarks.filter((bookmark) => bookmark.id !== bookmarkId));
    setTimeout(() => {
      toast({
        title: "تمت إزالة الإشارة المرجعية",
        description: "تم حذف الإشارة المرجعية بنجاح",
      });
    }, 0);
  }, [toast]);

  const updateLastRead = useCallback((surahNumber, ayahNumber) => {
    const surahName = surahsMeta.find(s => s.number === surahNumber)?.name || "";
    const newLastRead = {
      surahNumber,
      ayahNumber,
      surahName,
      timestamp: new Date().toISOString(),
    };
    setLastRead(newLastRead);
  }, [surahsMeta]);

  const searchQuran = useCallback(async (query) => {
    const results = [];
    if (!query.trim()) return results;
    setLoadingMessage("جاري البحث في القرآن...");

    try {
      const response = await fetch(`${QURAN_API_BASE_URL}/search/${encodeURIComponent(query)}/all/quran-uthmani`);
      if (!response.ok) {
        throw new Error(`فشل البحث: ${response.statusText}`);
      }
      
      const searchResultsData = await response.json();
      
      if (searchResultsData.data && searchResultsData.data.matches) {
        const matches = searchResultsData.data.matches;
        // Sort matches by surah number and ayah number
        matches.sort((a, b) => {
          if (a.surah.number !== b.surah.number) {
            return a.surah.number - b.surah.number;
          }
          return a.numberInSurah - b.numberInSurah;
        });

        for (const match of matches) {
          try {
            const tafsir = await getAyahTafsir(match.surah.number, match.numberInSurah);
            results.push({
              surahNumber: match.surah.number,
              surahName: match.surah.name,
              ayahNumber: match.numberInSurah,
              ayahText: match.text,
              tafsir: tafsir
            });
          } catch (error) {
            console.warn(`Failed to get tafsir for ayah ${match.numberInSurah} in surah ${match.surah.number}:`, error);
            // Still add the result without tafsir
            results.push({
              surahNumber: match.surah.number,
              surahName: match.surah.name,
              ayahNumber: match.numberInSurah,
              ayahText: match.text,
              tafsir: "التفسير غير متوفر لهذه الآية."
            });
          }
        }
      }
    } catch (error) {
      console.error("Search error:", error);
      setTimeout(() => {
        toast({
          title: "خطأ في البحث",
          description: "حدث خطأ أثناء محاولة البحث. يرجى المحاولة مرة أخرى.",
          variant: "destructive",
        });
      }, 0);
    } finally {
      setLoadingMessage(null);
    }
    return results;
  }, [getAyahTafsir, toast]);

  return (
    <QuranContext.Provider
      value={{
        getAllSurahs,
        getSurahByNumber,
        getAyahTafsir,
        bookmarks,
        addBookmark,
        removeBookmark,
        lastRead,
        updateLastRead,
        searchQuran,
        loadingMessage,
      }}
    >
      {children}
    </QuranContext.Provider>
  );
};

export const useQuran = () => {
  const context = useContext(QuranContext);
  if (!context) {
    throw new Error('useQuran must be used within a QuranProvider');
  }
  return context;
};
  