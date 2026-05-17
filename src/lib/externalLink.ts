import type { MouseEvent } from "react";

export const openExternalLink = (url: string) => (event: MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();

  if (url.startsWith("mailto:") || url.startsWith("tel:")) {
    window.location.href = url;
    return;
  }

  const openedWindow = window.open(url, "_blank", "noopener,noreferrer");

  if (openedWindow) {
    openedWindow.opener = null;
    return;
  }

  window.location.assign(url);
};