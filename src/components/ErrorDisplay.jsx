import React from 'react';
import { Button } from '@/components/ui/button';

export const ErrorDisplay = ({ title, message, onRetry, retryMessage }) => {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold mb-4 text-destructive">{title}</h1>
      <p className="text-muted-foreground mb-6">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="default">
          {retryMessage || "إعادة المحاولة"}
        </Button>
      )}
    </div>
  );
};
  