import React from 'react';
import { useQuran } from '@/context/QuranContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

const BookmarksPage = () => {
  const { bookmarks, removeBookmark } = useQuran();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">الآيات المحفوظة</h1>
      {bookmarks.length === 0 ? (
        <p className="text-muted-foreground">لا توجد آيات محفوظة.</p>
      ) : (
        <ul className="space-y-4">
          {bookmarks.map((bookmark) => (
            <li key={bookmark.id} className="p-4 border rounded-lg flex items-center justify-between">
              <div>
                <Link to={`/surah/${bookmark.surahNumber}#ayah-${bookmark.ayahNumber}`} className="text-primary hover:underline font-semibold">
                  سورة {bookmark.surahName} - الآية {bookmark.ayahNumber}
                </Link>
                <div className="text-xs text-muted-foreground mt-1">تاريخ الإضافة: {new Date(bookmark.timestamp).toLocaleString('ar-EG')}</div>
              </div>
              <Button variant="destructive" size="sm" onClick={() => removeBookmark(bookmark.id)}>
                حذف
              </Button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-8">
        <Button asChild variant="outline">
          <Link to="/">العودة للرئيسية</Link>
        </Button>
      </div>
    </div>
  );
};

export default BookmarksPage; 