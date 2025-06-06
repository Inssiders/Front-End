function extractVideoId(url: string): string | null {
  if (!/[\/\.]/.test(url)) {
    return url;
  }

  const patterns = [
    /(?:youtube\.com\/embed\/)([^?&#\/]+)/,
    /(?:youtube\.com\/watch\?v=)([^?&#\/]+)/,
    /(?:youtu\.be\/)([^?&#\/]+)/,
    /(?:youtube\.com\/v\/)([^?&#\/]+)/,
    /(?:youtube\.com\/shorts\/)([^?&#\/]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export function autoplayYouTubeOnHover(el: HTMLElement, videoIdOrUrl: string) {
  const videoId = extractVideoId(videoIdOrUrl);
  if (!videoId) {
    console.error("Invalid YouTube URL or video ID:", videoIdOrUrl);
    return null;
  }

  const iframe = document.createElement("iframe");
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&rel=0&showinfo=0&enablejsapi=1&playlist=${videoId}&loop=1`;

  iframe.src = embedUrl;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.style.position = "absolute";
  iframe.style.top = "0";
  iframe.style.left = "0";
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.setAttribute("allowfullscreen", "true");

  el.style.position = "relative";
  el.innerHTML = "";
  el.appendChild(iframe);

  return iframe;
}

export function resetYouTubeThumbnail(el: HTMLElement, videoIdOrUrl: string) {
  const videoId = extractVideoId(videoIdOrUrl);
  if (!videoId) {
    console.error("Invalid YouTube URL or video ID for thumbnail:", videoIdOrUrl);
    return null;
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  el.style.position = "relative";
  el.innerHTML = "";

  const img = document.createElement("img");
  img.src = thumbnailUrl;
  img.alt = "YouTube thumbnail";
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "cover";
  img.style.position = "absolute";
  img.style.top = "0";
  img.style.left = "0";

  // Add play button overlay
  const playButton = document.createElement("div");
  playButton.style.position = "absolute";
  playButton.style.top = "50%";
  playButton.style.left = "50%";
  playButton.style.transform = "translate(-50%, -50%)";
  playButton.style.width = "68px";
  playButton.style.height = "48px";
  playButton.style.backgroundColor = "rgba(0,0,0,0.7)";
  playButton.style.borderRadius = "14px";
  playButton.style.cursor = "pointer";
  playButton.innerHTML = `
    <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
      <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path>
      <path d="M 45,24 27,14 27,34" fill="#fff"></path>
    </svg>
  `;

  el.appendChild(img);
  el.appendChild(playButton);

  return img;
}
