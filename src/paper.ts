/**
 * Paper geometry primitives shared by the web (`@sudobility/printing`) and
 * React Native (`@sudobility/printing_rn`) printing libraries.
 *
 * Phase 0 scaffold: just enough real, fully-tested logic to stand the package
 * up. The full paper model, page geometry, and options hook arrive in Phase 1
 * (see `music_app/docs/printing-libraries.md`).
 */

/** A paper size this library knows the dimensions of. */
export type PaperSize = 'a4' | 'letter';

/** Which way up the sheet is printed. */
export type PaperOrientation = 'portrait' | 'landscape';

/** A sheet's dimensions in millimetres. */
export interface PageDimsMm {
  readonly widthMm: number;
  readonly heightMm: number;
}

const PORTRAIT_DIMS_MM: Readonly<Record<PaperSize, PageDimsMm>> = {
  a4: { widthMm: 210, heightMm: 297 },
  letter: { widthMm: 215.9, heightMm: 279.4 },
};

/** The sheet's dimensions in millimetres, with orientation applied. */
export function paperDimsMm(
  size: PaperSize,
  orientation: PaperOrientation
): PageDimsMm {
  const dims = PORTRAIT_DIMS_MM[size];
  return orientation === 'landscape'
    ? { widthMm: dims.heightMm, heightMm: dims.widthMm }
    : dims;
}
