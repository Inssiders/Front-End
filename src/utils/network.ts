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

export async function isApiReachable(): Promise<boolean> {
  // 클라이언트사이드와 서버사이드 환경 구분
  const baseUrl =
    typeof window === "undefined"
      ? process.env.SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL
      : "";

  return canFetch(`${baseUrl}/server/health`);
}
