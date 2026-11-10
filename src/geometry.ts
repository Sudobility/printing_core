/**
 * Page geometry: the printable area, and the usable page height pagination
 * packs content into. Pure math over `PageGeometry`.
 *
 * This generalizes music_drawing's `usablePageHeight`/`PAGE_MARGIN_MM`: the
 * same ratio, over any paper and orientation, with the margin as the single
 * source of truth so the `@page` rule a renderer emits and the height
 * pagination assumes cannot drift.
 */
import { paperCss, paperDimsMm } from './paper.js';
import type { PaperOrientation, PaperSize } from './paper.js';

/**
 * The margin the printed page reserves on every side, in millimetres.
 *
 * The single source: `pageCss` emits it into the `@page` rule and
 * `usablePageHeight` computes from it. Two numbers means pagination that
 * silently disagrees with what the printer does.
 */
export const DEFAULT_MARGIN_MM = 12;

/** What paper, which way up, and how much margin — all a print needs of a page. */
export interface PageGeometry {
  paper: PaperSize;
  orientation: PaperOrientation;
  /** Margin on every side, in millimetres. Defaults to {@link DEFAULT_MARGIN_MM}. */
  marginMm: number;
}

/** A page geometry with the default margin filled in. */
export function pageGeometry(
  paper: PaperSize,
  orientation: PaperOrientation,
  marginMm: number = DEFAULT_MARGIN_MM
): PageGeometry {
  return { paper, orientation, marginMm };
}

/** The printable area inside the margins, in millimetres. */
export function usablePageMm(geo: PageGeometry): {
  widthMm: number;
  heightMm: number;
} {
  const dims = paperDimsMm(geo.paper, geo.orientation);
  return {
    widthMm: dims.widthMm - 2 * geo.marginMm,
    heightMm: dims.heightMm - 2 * geo.marginMm,
  };
}

/**
 * How much height `contentWidth` units of layout buy on this page.
 *
 * Paper only ever enters as a ratio: the layout is computed at a fixed content
 * width and each page is displayed at the paper's printable width, so the scale
 * is uniform and millimetres cancel.
 */
export function usablePageHeight(
  geo: PageGeometry,
  contentWidth: number
): number {
  const usable = usablePageMm(geo);
  return (contentWidth * usable.heightMm) / usable.widthMm;
}

/**
 * The CSS `@page` rule for this geometry — the single place a print margin is
 * written on web, so the printer's page and the packer's page cannot drift.
 *
 * `pageName` scopes the rule to a named page (`@page doc { ... }`) for content
 * that opts into it with `page: doc`.
 */
export function pageCss(geo: PageGeometry, pageName?: string): string {
  const selector = pageName ? `@page ${pageName}` : '@page';
  return `${selector} { size: ${paperCss(geo.paper)} ${geo.orientation}; margin: ${geo.marginMm}mm; }`;
}
