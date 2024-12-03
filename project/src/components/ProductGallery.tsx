import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Volume2, VolumeX } from 'lucide-react';

const media = [
  {
    type: 'video',
    url: 'https://videocdn.alibaba.com/icbu_vod_video/video_target/gv93-2f8e2476-a1ace553-92707862-61d1/trans/7629fc36-c180-4e6b-9747-f0fda3fde614-h264-hd.mp4',
    thumbnail: 'https://doritstore.com/wp-content/uploads/2024/11/IMG_20241107_020322_375.jpg'
  },
  {
    type: 'image',
    url: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/13/6320863/1.jpg?9025'
  },
  {
    type: 'image',
    url: 'http://store.muahib.com.ng/wp-content/uploads/2024/12/IMG20241201104027-1-scaled.jpg'
  },
  {
    type: 'image',
    url: 'http://store.muahib.com.ng/wp-content/uploads/2024/12/IMG20241201104004-scaled.jpg'
  },
  {
    type: 'image',
    url: 'https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/13/6320863/2.jpg?6046'
  }
];

export function ProductGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
    setIsPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < media.length - 1 ? prev + 1 : prev));
    setIsPlaying(false);
  };

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const currentMedia = media[currentIndex];

  return (
    <div className="p-4 space-y-4">
      <div className="relative aspect-square bg-black rounded-2xl overflow-hidden">
        {currentMedia.type === 'video' ? (
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              src={currentMedia.url}
              poster={currentMedia.thumbnail}
              muted={isMuted}
              playsInline
              onEnded={handleVideoEnd}
            />
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <button
                  onClick={handlePlayVideo}
                  className="bg-purple-600/90 p-4 sm:p-6 rounded-full hover:scale-110 transition-transform duration-300"
                >
                  <Play className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                </button>
              </div>
            )}
            {isPlaying && (
              <button
                onClick={toggleMute}
                className="absolute bottom-4 right-4 bg-black/50 p-2 sm:p-3 rounded-full"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                )}
              </button>
            )}
          </>
        ) : (
          <img
            src={currentMedia.url}
            alt={`Product view ${currentIndex + 1}`}
            className="w-full h-full object-contain"
          />
        )}

        <button
          onClick={handlePrevious}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full disabled:opacity-50 hover:bg-white/90 transition-colors"
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full disabled:opacity-50 hover:bg-white/90 transition-colors"
          disabled={currentIndex === media.length - 1}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {media.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentIndex === idx ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 sm:gap-4">
        {media.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`relative aspect-square rounded-lg overflow-hidden ${
              currentIndex === idx ? 'ring-2 ring-purple-500' : ''
            }`}
          >
            <img
              src={item.type === 'video' ? item.thumbnail : item.url}
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-full object-cover"
            />
            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Play className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}