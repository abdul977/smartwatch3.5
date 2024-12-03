import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  caption: string;
  description: string;
}

const mediaItems: MediaItem[] = [
  {
    type: 'image',
    url: 'http://store.muahib.com.ng/wp-content/uploads/2024/12/features-function.jpg',
    caption: 'Complete Features Overview',
    description: 'Explore the full range of smart features packed into this premium device'
  },
  {
    type: 'image',
    url: 'http://store.muahib.com.ng/wp-content/uploads/2024/12/10896856391527393903.jpg',
    caption: 'Technical Specifications',
    description: 'Advanced hardware specs delivering exceptional performance'
  },
  {
    type: 'image',
    url: 'http://store.muahib.com.ng/wp-content/uploads/2024/12/waterproof-f.jpg',
    caption: 'Waterproof Certification',
    description: 'IPX-6 rated protection against water splashes and rain'
  },
  {
    type: 'video',
    url: 'http://store.muahib.com.ng/wp-content/uploads/2024/12/music-control.mp4',
    caption: 'Music Control',
    description: 'Take control of your music playback directly from your wrist with intuitive controls'
  },
  {
    type: 'video',
    url: 'http://store.muahib.com.ng/wp-content/uploads/2024/12/music-player.mp4',
    caption: 'Wireless Music Player',
    description: 'Built-in music player for seamless wireless listening experience'
  },
  {
    type: 'video',
    url: 'http://store.muahib.com.ng/wp-content/uploads/2024/12/wallpaper.mp4',
    caption: 'Dynamic Watch Faces',
    description: 'Personalize your watch with stunning dynamic watch faces and themes'
  },
  {
    type: 'video',
    url: 'http://store.muahib.com.ng/wp-content/uploads/2024/12/health-tracking-heart-rate.mp4',
    caption: 'Health Tracking',
    description: 'Comprehensive health monitoring with heart rate, sleep, and activity tracking'
  },
  {
    type: 'video',
    url: 'http://store.muahib.com.ng/wp-content/uploads/2024/12/notification-island.mp4',
    caption: 'Smart Notifications',
    description: 'Stay connected with elegant notification display and quick actions'
  },
  {
    type: 'video',
    url: 'http://store.muahib.com.ng/wp-content/uploads/2024/12/How_to_Connect__your_Phone_to_Smartwatch360p.mp4',
    caption: 'Easy Setup',
    description: 'Simple and quick connection process with your smartphone'
  }
];

export function MediaGallery() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMediaClick = (media: MediaItem) => {
    setSelectedMedia(media);
    setIsPlaying(false);
  };

  const handleClose = () => {
    setSelectedMedia(null);
    setIsPlaying(false);
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Experience the Features
          </h2>
          <p className="text-lg text-gray-600">
            Discover the amazing capabilities of your new smartwatch
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleMediaClick(item)}
              className="cursor-pointer group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-300"
            >
              <div className="flex items-center space-x-3 mb-3">
                {item.type === 'video' ? (
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <Play className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <img
                      src={item.url}
                      alt={item.caption}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="font-semibold text-gray-900">{item.caption}</h3>
              </div>
              <p className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={handleClose}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="aspect-video rounded-xl overflow-hidden bg-black">
              {selectedMedia.type === 'video' ? (
                <video
                  src={selectedMedia.url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              ) : (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.caption}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            
            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-semibold mb-2">{selectedMedia.caption}</h3>
              <p className="text-gray-300">{selectedMedia.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}