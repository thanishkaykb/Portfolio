/**
 * LIFE IN FRAMES — photograph manifest.
 *
 * HOW TO ADD PHOTOS:
 * 1. Drop your photographs into the `public/frames/` folder
 *    (use clear names, e.g. `hackathon-2026.jpg`, `college-fest.jpg`).
 * 2. Add an entry to the list below, like:
 *      { src: "/frames/hackathon-2026.jpg", caption: "Intellect Hack 2026" }
 *
 * Only add genuine photographs of real moments — never stock or AI images.
 * The 3D gallery renders automatically from this list.
 */

export interface Frame {
  src: string;
  caption?: string;
}

export const frames: Frame[] = [
  // Add your photographs here, e.g.
  // { src: "/frames/intellect-hack-2026.jpg", caption: "Intellect Hack 2026" },
];
