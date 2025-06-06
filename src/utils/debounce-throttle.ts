// 디바운싱: 연속된 호출 중 마지막 호출만 실행
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
      timeout = null;
    }, wait);
  };
}

// 쓰로틀링: 일정 시간 간격으로만 함수 실행
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  let lastFunc: NodeJS.Timeout | null = null;
  let lastRan: number | null = null;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      lastRan = Date.now();
      inThrottle = true;
    } else {
      if (lastFunc) clearTimeout(lastFunc);

      lastFunc = setTimeout(
        () => {
          if (lastRan && Date.now() - lastRan >= wait) {
            func(...args);
            lastRan = Date.now();
          }
        },
        Math.max(wait - (lastRan ? Date.now() - lastRan : 0), 0)
      );
    }
  };
}

// 무한스크롤 전용: 디바운싱 + 쓰로틀링 조합
export function debounceThrottle<T extends (...args: any[]) => any>(
  func: T,
  debounceWait: number,
  throttleWait: number
): (...args: Parameters<T>) => void {
  const throttledFunc = throttle(func, throttleWait);
  return debounce(throttledFunc, debounceWait);
}
