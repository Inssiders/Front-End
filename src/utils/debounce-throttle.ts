type AnyFunction = (...args: any[]) => any;

interface DebouncedFunction<T extends AnyFunction> {
  (...args: Parameters<T>): void;
  cancel: () => void;
}

interface ThrottledFunction<T extends AnyFunction> {
  (...args: Parameters<T>): void;
  cancel: () => void;
}

/**
 * 디바운싱: 연속된 호출 중 마지막 호출만 실행
 * @param func 디바운스할 함수
 * @param wait 대기 시간 (ms)
 */
export function debounce<T extends AnyFunction>(func: T, wait: number): DebouncedFunction<T> {
  let timeout: NodeJS.Timeout | null = null;

  const debouncedFunction = (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
      timeout = null;
    }, wait);
  };

  debouncedFunction.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debouncedFunction;
}

/**
 * 쓰로틀링: 일정 시간 간격으로만 함수 실행
 * @param func 쓰로틀할 함수
 * @param wait 대기 시간 (ms)
 */
export function throttle<T extends AnyFunction>(func: T, wait: number): ThrottledFunction<T> {
  let inThrottle = false;
  let lastFunc: NodeJS.Timeout | null = null;
  let lastRan: number | null = null;

  const throttledFunction = (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      lastRan = Date.now();
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, wait);
    } else {
      if (lastFunc) clearTimeout(lastFunc);

      lastFunc = setTimeout(() => {
        if (lastRan && Date.now() - lastRan >= wait) {
          func(...args);
          lastRan = Date.now();
          inThrottle = false;
        }
      }, wait);
    }
  };

  throttledFunction.cancel = () => {
    if (lastFunc) {
      clearTimeout(lastFunc);
      lastFunc = null;
    }
    inThrottle = false;
  };

  return throttledFunction;
}

/**
 * 무한스크롤 전용: 디바운싱 + 쓰로틀링 조합
 * @param func 대상 함수
 * @param debounceWait 디바운스 대기 시간 (ms)
 * @param throttleWait 쓰로틀 대기 시간 (ms)
 */
export function debounceThrottle<T extends AnyFunction>(
  func: T,
  debounceWait: number,
  throttleWait: number
): DebouncedFunction<T> {
  const throttledFunc = throttle(func, throttleWait);
  const debouncedThrottledFunc = debounce(throttledFunc, debounceWait);

  return {
    ...debouncedThrottledFunc,
    cancel: () => {
      throttledFunc.cancel();
      debouncedThrottledFunc.cancel();
    },
  };
}
