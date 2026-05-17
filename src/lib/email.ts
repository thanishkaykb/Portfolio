/**
 * Returns the appropriate email link:
 * - Desktop: mailto: keeps the click out of blocked iframe embeds
 * - Mobile/touch: mailto: (opens native mail app)
 */
export const getEmailHref = (email: string): string => {
  return `mailto:${email}`;
};
