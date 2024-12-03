import React from 'react';
import { Timer } from './Timer';

export function TimerSection() {
  return (
    <div className="bg-black text-white py-4">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-4xl xl:max-w-6xl">
        <Timer />
      </div>
    </div>
  );
}