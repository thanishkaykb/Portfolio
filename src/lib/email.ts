/**
 * Returns the appropriate email link:
 * - Desktop: Gmail web compose URL
 * - Mobile/touch: mailto: (opens native mail app)
 */
export const getEmailHref = (email: string): string => {
  const isMobile =
    typeof window !== "undefined" &&
    (/Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      "ontouchstart" in window);

  return isMobile
    ? `mailto:${email}`
    : `https://mail.google.com/mail/?view=cm&to=${email}`;
};
