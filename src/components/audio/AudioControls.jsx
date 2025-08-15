
import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AudioControls = ({ isPlaying, isLoading, isLooping, onTogglePlay, onSkipTime, onToggleLoop, disabled }) => {
  return (
    <div className="flex items-center space-x-1 space-x-reverse">
      <Button variant="ghost" size="icon" className="rounded-full" onClick={() => onSkipTime(-10)} title="رجوع 10 ثواني" disabled={disabled}>
        <SkipBack className="h-4 w-4" />
      </Button>
      
      <Button 
        onClick={onTogglePlay} 
        variant="default" 
        size="icon" 
        className="rounded-full h-12 w-12 bg-primary hover:bg-primary/90 shadow-md"
        disabled={disabled}
      >
        {isLoading ? (
          <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
        ) : isPlaying ? (
          <Pause className="h-5 w-5 text-primary-foreground" />
        ) : (
          <Play className="h-5 w-5 text-primary-foreground" />
        )}
      </Button>
      
      <Button variant="ghost" size="icon" className="rounded-full" onClick={() => onSkipTime(10)} title="تقديم 10 ثواني" disabled={disabled}>
        <SkipForward className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className={`rounded-full ${isLooping ? 'text-primary' : ''}`} onClick={onToggleLoop} title="تكرار" disabled={disabled}>
        <Repeat className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default AudioControls;
  