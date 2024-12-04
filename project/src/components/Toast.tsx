import React, { useEffect } from 'react';
import { useSwipe } from '../hooks/useSwipe';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  const handleSwipe = () => {
    onClose();
  };

  const swipeHandlers = useSwipe(handleSwipe, handleSwipe);

  useEffect(() => {
    const timer = setTimeout(onClose, 5000); // 5 seconds display time
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      {...swipeHandlers}
      className="fixed top-4 right-4 bg-black/80 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in cursor-grab active:cursor-grabbing touch-pan-x"
      role="alert"
    >
      {message}
    </div>
  );
}