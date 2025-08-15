
import React from 'react';
import { motion } from 'framer-motion';
import AudioPlayer from '@/components/AudioPlayer';

const SurahPageAudioSection = ({
  surah,
  selectedReciter,
  audioSrc,
  audioSeekTime,
  shouldAutoPlay,
  onAudioEnded,
  onAudioPlay,
  onAudioPause,
  onAudioTimeUpdate,
  onAudioSeek
}) => {
  if (!surah || !selectedReciter) {
    return null; 
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-8 sticky top-20 z-40"
    >
      <AudioPlayer 
        audioSrc={audioSrc}
        surahName={surah.name}
        reciterName={selectedReciter.name}
        onEnded={onAudioEnded}
        onPlay={onAudioPlay}
        onPause={onAudioPause}
        initialSeekTime={audioSeekTime}
        autoPlayProp={shouldAutoPlay}
        onTimeUpdate={onAudioTimeUpdate}
        onSeek={onAudioSeek}
      />
    </motion.div>
  );
};

export default SurahPageAudioSection;
  