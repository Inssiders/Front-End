/**
 * Check if the device is currently online
 * @returns boolean indicating if the device is online
 */
export function isOnline(): boolean {
  if (typeof navigator !== "undefined") {
    return navigator.onLine;
  }
  return true; // Default to true in SSR context
}

/**
 * Check if a fetch request can be made
 * @param url The URL to check
 * @returns Promise resolving to boolean indicating if the URL is reachable
 */
export async function canFetch(url: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Check if the API server is reachable
 * @returns Promise resolving to boolean indicating if the API is reachable
 */
export async function isApiReachable(): Promise<boolean> {
  return canFetch("/api/health");
}
