import { useState, useRef, useEffect } from 'react';

export function useCollapse(defaultExpanded = false) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(
    defaultExpanded ? undefined : 0
  );

  useEffect(() => {
    if (!contentRef.current) return;

    if (isExpanded) {
      const height = contentRef.current.scrollHeight;
      setContentHeight(height);
    } else {
      setContentHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const getCollapseProps = () => ({
    style: {
      height: contentHeight === undefined ? 'auto' : `${contentHeight}px`,
      overflow: 'hidden',
    },
  });

  return {
    isExpanded,
    toggleExpand,
    contentRef,
    getCollapseProps,
  };
}