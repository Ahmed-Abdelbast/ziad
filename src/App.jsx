import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { QuranProvider, useQuran } from '@/context/QuranContext';
import { LoadingSpinner } from '@/components/LoadingSpinner';

const HomePage = React.lazy(() => import('@/pages/HomePage'));
const SurahPage = React.lazy(() => import('@/pages/SurahPage'));
const AboutPage = React.lazy(() => import('@/pages/AboutPage'));
const BookmarksPage = React.lazy(() => import('@/pages/BookmarksPage'));

function AppLoading({ message }) {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="w-24 h-24 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <h1 className="mt-6 text-2xl font-bold text-primary">{message || "جاري تحميل التطبيق..."}</h1>
    </div>
  );
}

const GlobalLoadingIndicator = () => {
  const { loadingMessage } = useQuran();
  if (!loadingMessage) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-card p-8 rounded-lg shadow-xl flex flex-col items-center space-y-4">
        <LoadingSpinner message={loadingMessage} />
        <p className="text-sm text-muted-foreground">يرجى الانتظار...</p>
      </div>
    </div>
  );
};

function AppContent() {
  const location = useLocation();
  const [initialAppLoading, setInitialAppLoading] = useState(true);
  const { surahsMeta, loadingMessage: quranContextLoadingMessage } = useQuran();

  useEffect(() => {
    // Consider the app initially loaded if surahsMeta has been populated
    // or if a certain time has passed, to prevent indefinite loading screen
    // if the initial meta fetch fails.
    if (surahsMeta && surahsMeta.length > 0) {
      setInitialAppLoading(false);
    } else {
      const timer = setTimeout(() => {
        if (!surahsMeta || surahsMeta.length === 0) {
           // If still no surahsMeta, assume there might be an issue but proceed.
           // Error handling for failed meta fetch should be in QuranContext.
          console.warn("Quran metadata not loaded after timeout. Proceeding with app rendering.");
        }
        setInitialAppLoading(false); 
      }, 3000); // Timeout for initial meta load
      return () => clearTimeout(timer);
    }
  }, [surahsMeta]);

  if (initialAppLoading && !quranContextLoadingMessage) { // Show initial app loading only if context isn't already showing a specific message
    return <AppLoading message="جاري تهيئة بيانات القرآن..." />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<AppLoading message="جاري تحميل الصفحة..." />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/surah/:id" element={<SurahPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
      <GlobalLoadingIndicator />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <QuranProvider>
        <AppContent />
      </QuranProvider>
    </ThemeProvider>
  );
}

export default App;
  