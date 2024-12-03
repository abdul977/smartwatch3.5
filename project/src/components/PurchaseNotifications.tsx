import React, { useState, useEffect } from 'react';
import { Toast } from './Toast';
import { nigerianNames } from '../utils/nigerianNames';

export function PurchaseNotifications() {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = nigerianNames[Math.floor(Math.random() * nigerianNames.length)];
      
      // Randomly decide between weeks or months
      const isWeek = Math.random() > 0.5;
      
      let randomTime;
      let timeUnit;

      if (isWeek) {
        randomTime = Math.floor(Math.random() * 4) + 1; // 1 to 4 weeks
        timeUnit = 'week';
      } else {
        randomTime = Math.floor(Math.random() * 12) + 1; // 1 to 12 months
        timeUnit = 'month';
      }

      const notification = `🎉 ${randomName} purchased a luxury watch ${randomTime} ${timeUnit}${randomTime > 1 ? 's' : ''} ago`;
      
      setNotifications(prev => [...prev, notification]);
    }, 30000); // New notification every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const removeNotification = (index: number) => {
    setNotifications(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      {notifications.map((notification, index) => (
        <Toast
          key={`${notification}-${index}`}
          message={notification}
          onClose={() => removeNotification(index)}
        />
      ))}
    </>
  );
}
