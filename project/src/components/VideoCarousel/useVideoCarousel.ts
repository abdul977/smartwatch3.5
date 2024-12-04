import { useRef, useState, useEffect } from 'react';

export function useVideoCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const element = scrollRef.current;
    if (element) {
      setCanScrollLeft(element.scrollLeft > 0);
      setCanScrollRight(
        element.scrollLeft < element.scrollWidth - element.clientWidth - 1
      );
    }
  };

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      element.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      checkScroll();

      return () => {
        element.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const scrollLeft = () => {
    const element = scrollRef.current;
    if (element) {
      element.scrollBy({
        left: -324, // width + gap
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    const element = scrollRef.current;
    if (element) {
      element.scrollBy({
        left: 324, // width + gap
        behavior: 'smooth'
      });
    }
  };

  return {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight
  };
}