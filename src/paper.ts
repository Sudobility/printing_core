/**
 * The paper a document prints on, as vocabulary and picker options — shared by
 * the web (`@sudobility/printing`) and React Native (`@sudobility/printing_rn`)
 * printing libraries, and by the domain libraries that paginate onto it.
 *
 * These values mirror what music_types' `print.ts` has defined; music_types
 * re-exports them from here so its existing consumers keep working while the
 * paper model lives in one place. The *geometry* that uses them (dimensions,
 * margins, the usable page) is `geometry.ts`.
 */

/** The papers a document prints on, in the order a picker offers them. */
export const PAPER_SIZES = ['a4', 'letter', 'legal'] as const;
export type PaperSize = (typeof PAPER_SIZES)[number];

/** Portrait first: it is the default and what almost every page is. */
export const PAPER_ORIENTATIONS = ['portrait', 'landscape'] as const;
export type PaperOrientation = (typeof PAPER_ORIENTATIONS)[number];

/** A sheet's dimensions in millimetres. */
export interface PageDimsMm {
  readonly widthMm: number;
  readonly heightMm: number;
}

/** Portrait dimensions in millimetres; landscape swaps them. */
const PORTRAIT_DIMS_MM: Readonly<Record<PaperSize, PageDimsMm>> = {
  a4: { widthMm: 210, heightMm: 297 },
  letter: { widthMm: 215.9, heightMm: 279.4 }, // 8.5in x 11in
  legal: { widthMm: 215.9, heightMm: 355.6 }, // 8.5in x 14in
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

const PAPER_LABEL_KEY: Record<PaperSize, string> = {
  a4: 'print.paperA4',
  letter: 'print.paperLetter',
  legal: 'print.paperLegal',
};

/** The CSS `@page { size }` keyword for each paper. */
const PAPER_CSS: Record<PaperSize, string> = {
  a4: 'A4',
  letter: 'letter',
  legal: 'legal',
};

const ORIENTATION_LABEL_KEY: Record<PaperOrientation, string> = {
  portrait: 'print.portrait',
  landscape: 'print.landscape',
};

/** The CSS `@page { size }` keyword for a paper. */
export function paperCss(size: PaperSize): string {
  return PAPER_CSS[size];
}

/**
 * The paper picker. `css` is the `@page` size keyword; an orientation's value
 * is its own CSS keyword already.
 */
export const PAPER_OPTIONS: ReadonlyArray<{
  value: PaperSize;
  labelKey: string;
  css: string;
}> = PAPER_SIZES.map((value) => ({
  value,
  labelKey: PAPER_LABEL_KEY[value],
  css: PAPER_CSS[value],
}));

export const ORIENTATION_OPTIONS: ReadonlyArray<{
  value: PaperOrientation;
  labelKey: string;
}> = PAPER_ORIENTATIONS.map((value) => ({
  value,
  labelKey: ORIENTATION_LABEL_KEY[value],
}));

/**
 * The regions whose ordinary office paper is US Letter, from CLDR's
 * `paperSize` supplemental data (the rest of the world is A4).
 */
const LETTER_REGIONS: ReadonlySet<string> = new Set([
  'BZ',
  'CA',
  'CL',
  'CO',
  'CR',
  'GT',
  'MX',
  'NI',
  'PA',
  'PE',
  'PH',
  'PR',
  'SV',
  'US',
  'VE',
]);

/**
 * The paper to offer before the reader has chosen one: Letter where the
 * device's region prints on Letter, A4 everywhere else.
 *
 * Read off the first of the device's locale tags that names a region (`en-US`,
 * `zh-Hans-CN`), in preference order — the region, not the language, decides it.
 * With no region to go on, A4, which most of the world uses.
 */
export function defaultPaperSizeFor(localeTags: readonly string[]): PaperSize {
  for (const tag of localeTags) {
    const region = tag
      .split(/[-_]/)
      .slice(1)
      .find((part) => /^[A-Za-z]{2}$/.test(part));
    if (region)
      return LETTER_REGIONS.has(region.toUpperCase()) ? 'letter' : 'a4';
  }
  return 'a4';
}
