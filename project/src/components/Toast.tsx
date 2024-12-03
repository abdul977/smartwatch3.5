import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 300000); // 300 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      className="fixed top-4 right-4 bg-black/80 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in"
      role="alert"
    >
      {message}
    </div>
  );
}