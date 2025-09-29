import { useCallback, useMemo } from 'react';

// Custom hook for performance optimizations
export const usePerformance = () => {
  // Memoized callback to prevent unnecessary re-renders
  const memoizedCallback = useCallback(<T extends (...args: any[]) => any>(callback: T, deps: any[]) => {
    return useCallback(callback, deps);
  }, []);

  // Memoized value computation
  const memoizedValue = useMemo(() => {
    return <T>(computeValue: () => T, deps: any[]) => {
      return useMemo(computeValue, deps);
    };
  }, []);

  // Debounce function for search inputs
  const debounce = useCallback(<T extends (...args: any[]) => any>(func: T, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  // Throttle function for scroll events
  const throttle = useCallback(<T extends (...args: any[]) => any>(func: T, delay: number) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func.apply(null, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), delay);
      }
    };
  }, []);

  return {
    memoizedCallback,
    memoizedValue,
    debounce,
    throttle,
  };
};
