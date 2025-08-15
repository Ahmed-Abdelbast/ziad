import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import AudioControls from '@/components/audio/AudioControls';
import AudioProgressBar from '@/components/audio/AudioProgressBar';
import AudioVolumeControl from '@/components/audio/AudioVolumeControl';
import AudioInfoDisplay from '@/components/audio/AudioInfoDisplay';
import AudioElement from '@/components/audio/AudioElement';

const AudioPlayer = ({ 
  audioSrc, 
  surahName, 
  reciterName, 
  onTimeUpdate, 
  onEnded, 
  onPlay, 
  onPause, 
  initialSeekTime, 
  onSeek,
  autoPlayProp = false 
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlayProp);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isLooping, setIsLooping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const audioRef = useRef(null);
  const isSeekingRef = useRef(false);

  const playAudio = useCallback(() => {
    if (audioRef.current && audioRef.current.readyState >= 2) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setIsLoading(false);
        setError(null);
        if (onPlay) onPlay();
      }).catch(err => {
        console.error("Error playing audio:", err);
        setError(`فشل تشغيل الصوت: ${err.message}`);
        setIsPlaying(false);
        setIsLoading(false);
      });
    } else if (audioRef.current) {
      setIsLoading(true);
      setError(null);
      audioRef.current.load(); 
    }
  }, [onPlay]);

  const pauseAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    if (onPause) onPause();
  }, [onPause]);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping;
    }
  }, [isLooping]);

  useEffect(() => {
    if (audioSrc && audioRef.current) {
      const wasPlaying = isPlaying || autoPlayProp;
      setIsLoading(true);
      setError(null);
      audioRef.current.src = audioSrc;
      audioRef.current.load(); 
      setCurrentTime(0); 
      setDuration(0);   
      setIsPlaying(wasPlaying); 
    } else if (!audioSrc && audioRef.current) {
        audioRef.current.src = "";
        setCurrentTime(0);
        setDuration(0);
        setIsPlaying(false);
        setIsLoading(false);
        setError(null);
    }
  }, [audioSrc, autoPlayProp]);
  
  useEffect(() => {
    if (audioRef.current && initialSeekTime !== null && initialSeekTime !== undefined && audioRef.current.readyState >= 2 && initialSeekTime < audioRef.current.duration) {
      audioRef.current.currentTime = initialSeekTime;
      setCurrentTime(initialSeekTime);
      if (onSeek) onSeek(initialSeekTime);
      if (isPlaying || autoPlayProp) { // Check isPlaying state explicitly for autoplay after seek
        playAudio();
      }
    }
  }, [initialSeekTime, playAudio, onSeek, autoPlayProp, isPlaying]); // Added isPlaying dependency

  const togglePlay = () => {
    if (!audioSrc) return;
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };
  
  const handleTimeSliderChangeStart = () => {
    isSeekingRef.current = true;
  };

  const handleTimeSliderChangeCommit = (newValue) => {
    isSeekingRef.current = false;
    const newTime = (newValue[0] / 100) * duration;
    if (isFinite(newTime) && audioRef.current && audioRef.current.duration > 0) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      if (onTimeUpdate) onTimeUpdate(newTime, duration); // Ensure this is called
      if (isPlaying) playAudio(); // Resume play if it was playing
    }
  };
  
  const skipTime = (amount) => {
    if (audioRef.current && audioRef.current.duration > 0) {
      const newTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + amount));
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      if (onTimeUpdate) onTimeUpdate(newTime, duration); // Ensure this is called
    }
  };

  const handleLoadedData = (loadedDuration) => {
    setDuration(loadedDuration);
    setIsLoading(false);
    setError(null);
    if (initialSeekTime && loadedDuration > 0 && initialSeekTime < loadedDuration) {
      if(audioRef.current) audioRef.current.currentTime = initialSeekTime;
      setCurrentTime(initialSeekTime);
      if (onSeek) onSeek(initialSeekTime);
    }
    if (isPlaying || autoPlayProp) {
      playAudio();
    }
  };

  const handleTimeUpdateEvent = (currentAudioTime) => {
    if (!isSeekingRef.current) {
      setCurrentTime(currentAudioTime);
      if (onTimeUpdate) onTimeUpdate(currentAudioTime, duration);
    }
  };

  const handleAudioEndEvent = () => {
    if (!isLooping) {
      setIsPlaying(false);
      setCurrentTime(0); 
      if (audioRef.current) audioRef.current.currentTime = 0;
    }
    if (onEnded) onEnded();
  };

  const handleCanPlayEvent = () => {
    setIsLoading(false);
    setError(null);
    if (isPlaying || autoPlayProp) {
      playAudio();
    }
  };

  const handleErrorEvent = (errorMessage) => {
    setError(errorMessage);
    setIsPlaying(false);
    setIsLoading(false);
  };

  const handleWaitingEvent = () => {
    setIsLoading(true);
    setError(null);
  };

  const handlePlayingEvent = () => {
    setIsLoading(false);
    setIsPlaying(true);
    setError(null);
  };


  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="player-container p-4 md:p-6 rounded-xl shadow-lg bg-card"
    >
      <AudioElement
        ref={audioRef}
        audioSrc={audioSrc}
        onLoadedData={handleLoadedData}
        onTimeUpdate={handleTimeUpdateEvent}
        onEnded={handleAudioEndEvent}
        onCanPlay={handleCanPlayEvent}
        onError={handleErrorEvent}
        onWaiting={handleWaitingEvent}
        onPlaying={handlePlayingEvent}
        isLooping={isLooping}
        volume={volume / 100}
        initialSeekTime={initialSeekTime}
      />
      
      <div className="flex flex-col md:flex-row items-center justify-between mb-3">
        <AudioInfoDisplay surahName={surahName} reciterName={reciterName} />
        <AudioControls
          isPlaying={isPlaying}
          isLoading={isLoading}
          isLooping={isLooping}
          onTogglePlay={togglePlay}
          onSkipTime={skipTime}
          onToggleLoop={() => setIsLooping(!isLooping)}
          disabled={!audioSrc || isLoading}
        />
      </div>
      
      <div className="space-y-3">
        <AudioProgressBar
          currentTime={currentTime}
          duration={duration}
          onSliderChangeStart={handleTimeSliderChangeStart}
          onSliderChangeCommit={handleTimeSliderChangeCommit}
          disabled={!audioSrc || isLoading || !isFinite(duration) || duration === 0}
        />
        <AudioVolumeControl
          volume={volume}
          onVolumeChange={setVolume}
          disabled={!audioSrc || isLoading}
        />
      </div>
      {error && <p className="text-destructive text-xs mt-2 text-center">{error}</p>}
    </motion.div>
  );
};

export default AudioPlayer;
  