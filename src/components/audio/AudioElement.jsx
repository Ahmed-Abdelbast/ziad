
import React, { forwardRef, useEffect } from 'react';

const AudioElement = forwardRef(({
  audioSrc,
  onLoadedData,
  onTimeUpdate,
  onEnded,
  onCanPlay,
  onError,
  onWaiting,
  onPlaying,
  isLooping,
  volume,
  initialSeekTime // Not directly used here, but good to know it might influence parent
}, ref) => {

  useEffect(() => {
    const audio = ref.current;
    if (!audio) return;

    const handleLoadedDataEvent = () => {
      if (onLoadedData) onLoadedData(audio.duration);
    };

    const handleTimeUpdateEvent = () => {
      if (onTimeUpdate) onTimeUpdate(audio.currentTime);
    };
    
    const handleAudioEndEvent = () => {
      if (onEnded) onEnded();
    };
    
    const handleCanPlayEvent = () => {
      if (onCanPlay) onCanPlay();
    };
    
    const handleErrorEvent = (e) => {
      console.error("Audio Element Error:", e, audio?.error);
      let message = "حدث خطأ غير معروف في مشغل الصوت.";
      if (audio?.error) {
        switch (audio.error.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            message = 'تم إحباط عملية جلب الصوت بواسطة المستخدم.';
            break;
          case MediaError.MEDIA_ERR_NETWORK:
            message = 'حدث خطأ في الشبكة أثناء جلب الصوت.';
            break;
          case MediaError.MEDIA_ERR_DECODE:
            message = 'حدث خطأ أثناء فك تشفير ملف الصوت.';
            break;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            message = 'مصدر الصوت غير مدعوم أو لا يمكن العثور عليه.';
            break;
          default:
            message = `حدث خطأ غير معروف: ${audio.error.message || 'لا توجد تفاصيل'}`;
        }
      }
      if (onError) onError(message);
    };

    const handleWaitingEvent = () => {
      if (onWaiting) onWaiting();
    };

    const handlePlayingEvent = () => {
      if (onPlaying) onPlaying();
    };

    audio.addEventListener('loadeddata', handleLoadedDataEvent);
    audio.addEventListener('timeupdate', handleTimeUpdateEvent);
    audio.addEventListener('ended', handleAudioEndEvent);
    audio.addEventListener('canplay', handleCanPlayEvent);
    audio.addEventListener('error', handleErrorEvent);
    audio.addEventListener('waiting', handleWaitingEvent);
    audio.addEventListener('playing', handlePlayingEvent);
    
    return () => {
      audio.removeEventListener('loadeddata', handleLoadedDataEvent);
      audio.removeEventListener('timeupdate', handleTimeUpdateEvent);
      audio.removeEventListener('ended', handleAudioEndEvent);
      audio.removeEventListener('canplay', handleCanPlayEvent);
      audio.removeEventListener('error', handleErrorEvent);
      audio.removeEventListener('waiting', handleWaitingEvent);
      audio.removeEventListener('playing', handlePlayingEvent);
    };
  }, [ref, onLoadedData, onTimeUpdate, onEnded, onCanPlay, onError, onWaiting, onPlaying]);

  useEffect(() => {
    if (ref.current) {
      ref.current.loop = isLooping;
    }
  }, [isLooping, ref]);

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume, ref]);

  // The parent AudioPlayer component handles src changes and load() calls.
  // This component just renders the audio tag and wires up events.

  return (
    <audio ref={ref} preload="metadata" />
  );
});

AudioElement.displayName = 'AudioElement';
export default AudioElement;
  