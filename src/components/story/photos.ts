/**
 * Photographic plates for the scroll story. WebGL samples the WebP files
 * (mobile `*-sm.webp` under 768px, desktop otherwise). AVIF siblings are the
 * same frames, kept for the smaller still-picture encode.
 *
 * Licenses: Unsplash License and Pexels License — free to use commercially,
 * no attribution required. Credits are recorded here anyway.
 *
 * - fibre-macro: Unsplash photo oe1d8v7Mds4, “Close-up of raw cotton fibers
 *   with dirt and debris”. https://unsplash.com/photos/oe1d8v7Mds4
 *   Source image photo-1770122985578-0fc7023eb6e8.
 * - fibre-macro-blur: same frame, gaussian-blurred for the dive’s depth pass.
 * - field-burn: Unsplash photo XTt7O5QfiRk, “A large plume of smoke rising from
 *   a field” — controlled burn, Wichita Mountains Wildlife Refuge, Oklahoma.
 *   https://unsplash.com/photos/XTt7O5QfiRk
 *   Source image photo-1730255869060-d76dbd32d3c4.
 * - rice-stubble: Tom Fisk, Pexels, “Rice field during harvesting season”,
 *   Banten, Indonesia. https://www.pexels.com/photo/rice-field-during-harvesting-season-6273298/
 * - sheet-macro: Tamanna Rumee, Pexels, “Close-up photo of crinkled beige paper”.
 *   https://www.pexels.com/photo/close-up-photo-of-crinkled-beige-paper-8824187/
 */

export const STORY_PHOTO = {
  fibre: "/story/fibre-macro.webp",
  fibreSm: "/story/fibre-macro-sm.webp",
  fibreBlur: "/story/fibre-macro-blur.webp",
  burn: "/story/field-burn.webp",
  burnSm: "/story/field-burn-sm.webp",
  rice: "/story/rice-stubble.webp",
  riceSm: "/story/rice-stubble-sm.webp",
  sheet: "/story/sheet-macro.webp",
  sheetSm: "/story/sheet-macro-sm.webp",
} as const;

export function storyPhotoSources(mobile: boolean) {
  return {
    fibre: mobile ? STORY_PHOTO.fibreSm : STORY_PHOTO.fibre,
    blur: STORY_PHOTO.fibreBlur,
    burn: mobile ? STORY_PHOTO.burnSm : STORY_PHOTO.burn,
    rice: mobile ? STORY_PHOTO.riceSm : STORY_PHOTO.rice,
    sheet: mobile ? STORY_PHOTO.sheetSm : STORY_PHOTO.sheet,
  };
}
