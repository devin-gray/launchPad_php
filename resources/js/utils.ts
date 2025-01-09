// utils.ts

/**
 * Debounce function
 * Delays the execution of a function until after a specified wait time
 * @param {Function} func - The function to debounce
 * @param {number} wait - Time in milliseconds to delay
 * @returns {Function} - A debounced version of the function
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: Parameters<T>) {
      const context = this;
      clearTimeout(timeout);
      
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
  
  /**
   * Throttle function (Optional for other use cases)
   * Ensures a function is only called once in a specified time period
   * @param {Function} func - The function to throttle
   * @param {number} limit - Time in milliseconds to throttle
   * @returns {Function} - A throttled version of the function
   */
  export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
  
    return function (this: any, ...args: Parameters<T>) {
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
  