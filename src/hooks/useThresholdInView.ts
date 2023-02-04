import { useEffect, useRef } from 'react';

interface UseThresholdInViewProps {
  onReachThreshold(): void;
}

export const useThresholdInView = ({ onReachThreshold }: UseThresholdInViewProps) => {
  const thresholdObserverRef = useRef<IntersectionObserver | null>(null);
  
  const thresholdElementRef = (element: HTMLElement | null) => {
    thresholdObserverRef.current?.disconnect();

    if (element) {
      thresholdObserverRef.current = new IntersectionObserver((elements) => {
        if (elements[0].isIntersecting) {
          onReachThreshold();
        }
      });

      thresholdObserverRef.current.observe(element);
    }
  };

  useEffect(() => {
    return thresholdObserverRef.current?.disconnect;
  }, []);

  return thresholdElementRef
};
