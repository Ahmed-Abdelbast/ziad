
import React from 'react';
import { Volume2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const AudioVolumeControl = ({ volume, onVolumeChange, disabled }) => {
  return (
    <div className="flex items-center space-x-2 space-x-reverse justify-center md:justify-start">
      <Volume2 className="h-5 w-5 text-muted-foreground" />
      <Slider
        value={[volume]}
        max={100}
        step={1}
        onValueChange={(newValue) => onVolumeChange(newValue[0])}
        className="max-w-[100px] h-2.5"
        disabled={disabled}
      />
    </div>
  );
};

export default AudioVolumeControl;
  