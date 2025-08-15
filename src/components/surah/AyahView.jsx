import React, { useCallback } from 'react';
import { Bookmark, BookmarkPlus, Info, PlayCircle as PlayCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const AyahNumberInline = React.forwardRef(({
  ayah,
  surahNumber,
  isBookmarked,
  onAddBookmark,
  onUpdateLastRead,
  isCurrentPlaying,
  onShowTafsir
}, ref) => {

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    onAddBookmark();
  };
  
  const handleTafsirClick = (e) => {
    e.stopPropagation();
    if (onShowTafsir) {
      onShowTafsir(ayah, e);
    }
  };

  return (
    <span
      ref={ref}
      id={`ayah-${ayah.numberInSurah}`}
      className={cn(
        "ayah-number-inline",
        isCurrentPlaying && "playing"
      )}
      onMouseEnter={onUpdateLastRead}
      role="button"
      tabIndex={0}
      aria-label={`الآية ${ayah.numberInSurah}`}
    >
      {ayah.numberInSurah}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full hover:bg-primary/10 focus-visible:ring-1 focus-visible:ring-primary opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2 -right-2 bg-background shadow-md"
            onClick={handleTafsirClick}
            title="عرض التفسير"
            aria-label="عرض التفسير"
          >
            <Info className="h-3 w-3 text-muted-foreground hover:text-primary" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-80 tafsir-popover-content text-sm"
          onClick={(e) => e.stopPropagation()}
          side="top"
          align="start"
        >
          <h4 className="font-bold mb-2 text-primary">التفسير الميسر (الآية {ayah.numberInSurah}):</h4>
          <p className="text-muted-foreground">{ayah.tafsir || "التفسير غير متوفر لهذه الآية."}</p>
        </PopoverContent>
      </Popover>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 rounded-full hover:bg-primary/10 focus-visible:ring-1 focus-visible:ring-primary opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-2 -right-2 bg-background shadow-md"
        onClick={handleBookmarkClick}
        title={isBookmarked ? "إزالة الإشارة" : "إضافة إشارة مرجعية"}
        aria-label={isBookmarked ? "إزالة الإشارة المرجعية" : "إضافة إشارة مرجعية"}
      >
        {isBookmarked ? (
          <Bookmark className="h-3 w-3 text-primary" fill="currentColor" />
        ) : (
          <BookmarkPlus className="h-3 w-3 text-muted-foreground hover:text-primary" />
        )}
      </Button>
    </span>
  );
});

AyahNumberInline.displayName = 'AyahNumberInline';

const AyahTextSegment = ({ ayah, isCurrentPlaying }) => {
  return (
    <span 
      className={cn(
        "ayah-text-segment",
        isCurrentPlaying && "ayah-highlight-inline"
      )}
    >
      {ayah.text}
    </span>
  );
};

export { AyahNumberInline, AyahTextSegment };
  