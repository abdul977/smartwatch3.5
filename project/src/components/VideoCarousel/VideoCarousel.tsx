import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { VideoCard } from './VideoCard';
import { useVideoCarousel } from './useVideoCarousel';

const videos = [
  {
    url: 'http://store.muahib.com.ng/wp-content/uploads/2024/12/music-control.mp4',
    title: 'Music Control',
    description: 'Control your music playback directly from your wrist'
  },
  {
    url: 'http://store.muahib.com.ng/wp-content/uploads/2024/12/music-player.mp4',
    title: 'Music Player',
    description: 'Built-in music player with intuitive controls'
  },
  {
    url: 'http://store.muahib.com.ng/wp-content/uploads/2024/12/wallpaper.mp4',
    title: 'Custom Watch Faces',
    description: 'Personalize your watch with beautiful watch faces'
  },
  {
    url: 'http://store.muahib.com.ng/wp-content/uploads/2024/12/health-tracking-heart-rate.mp4',
    title: 'Health Tracking',
    description: 'Advanced health monitoring with heart rate tracking'
  },
  {
    url: 'http://store.muahib.com.ng/wp-content/uploads/2024/12/notification-island.mp4',
    title: 'Smart Notifications',
    description: 'Stay connected with instant notifications'
  },
  {
    url: 'http://store.muahib.com.ng/wp-content/uploads/2024/12/calling.mp4',
    title: 'Call Features',
    description: 'Make and receive calls directly from your watch'
  },
  {
    url: 'http://store.muahib.com.ng/wp-content/uploads/2024/12/How_to_Connect__your_Phone_to_Smartwatch360p.mp4',
    title: 'Easy Setup',
    description: 'Quick and simple connection with your smartphone'
  }
];

export function VideoCarousel() {
  const {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight
  } = useVideoCarousel();

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Experience the Features
          </h2>
          <p className="text-lg text-gray-600">
            Discover what makes our smartwatch extraordinary
          </p>
        </div>

        <div className="relative">
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
            style={{ scrollBehavior: 'smooth' }}
          >
            {videos.map((video, index) => (
              <div
                key={index}
                className="flex-none w-[300px] snap-start"
              >
                <VideoCard {...video} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-2">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const element = scrollRef.current;
                if (element) {
                  element.scrollTo({
                    left: index * (300 + 24), // width + gap
                    behavior: 'smooth'
                  });
                }
              }}
              className="w-2 h-2 rounded-full bg-gray-300 hover:bg-purple-600 transition-colors"
            />
          ))}
        </div>
      </div>
    </div>
  );
}