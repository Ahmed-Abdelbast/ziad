import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuran } from '@/context/QuranContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon, Loader2 } from 'lucide-react';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { searchQuran } = useQuran();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const searchResults = await searchQuran(query);
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">البحث في القرآن الكريم</h1>
        <p className="text-muted-foreground">ابحث عن آيات محددة في النص القرآني</p>
      </div>

      <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="أدخل كلمة أو جزء من آية..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-lg"
            dir="rtl"
          />
          <Button type="submit" disabled={isSearching}>
            {isSearching ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <SearchIcon className="h-5 w-5" />
            )}
            <span className="mr-2">بحث</span>
          </Button>
        </div>
      </form>

      {isSearching && (
        <div className="text-center py-8">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p className="text-muted-foreground">جاري البحث...</p>
        </div>
      )}

      {!isSearching && results.length > 0 && (
        <div className="space-y-4">
          {results.map((result) => (
            <div key={`${result.surahNumber}-${result.ayahNumber}`} className="p-4 border rounded-lg">
              <Link 
                to={`/surah/${result.surahNumber}#ayah-${result.ayahNumber}`}
                className="text-primary hover:underline"
              >
                سورة {result.surahName} - الآية {result.ayahNumber}
              </Link>
              <p className="mt-2 text-lg arabic-text">{result.ayahText}</p>
            </div>
          ))}
        </div>
      )}

      {!isSearching && query.trim() !== '' && results.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          لم يتم العثور على نتائج للبحث عن: {query}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
  