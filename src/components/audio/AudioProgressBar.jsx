import React from 'react';
import { Slider } from '@/components/ui/slider';

const formatTime = (time) => {
  if (isNaN(time) || !isFinite(time)) return '00:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const calculateProgress = (currentTime, duration) => {
  return duration > 0 && isFinite(duration) ? (currentTime / duration) * 100 : 0;
};

const AudioProgressBar = ({ currentTime, duration, onSliderChangeStart, onSliderChangeCommit, disabled }) => {
  return (
    <div className="flex items-center space-x-2 space-x-reverse">
      <span className="text-xs w-10 text-right tabular-nums">{formatTime(currentTime)}</span>
      <div className="w-full">
        <Slider
          value={[calculateProgress(currentTime, duration)]}
          max={100}
          step={0.1}
          onValueChange={(value) => {
            if (onSliderChangeStart) onSliderChangeStart();
          }}
          onValueCommit={(value) => {
            if (onSliderChangeCommit) onSliderChangeCommit(value);
          }}
          className="cursor-pointer h-2.5"
          disabled={disabled}
        />
      </div>
      <span className="text-xs w-10 tabular-nums">{formatTime(duration)}</span>
    </div>
  );
};

export default AudioProgressBar;
  