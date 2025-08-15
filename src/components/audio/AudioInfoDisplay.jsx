
import React from 'react';

const AudioInfoDisplay = ({ surahName, reciterName }) => {
  return (
    <div className="mb-3 md:mb-0 text-center md:text-right">
      <h3 className="text-lg font-bold text-foreground">{surahName || "اختر سورة"}</h3>
      <p className="text-sm text-muted-foreground">{reciterName || "اختر قارئ"}</p>
    </div>
  );
};

export default AudioInfoDisplay;
  