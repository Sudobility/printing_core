import { describe, expect, it } from 'vitest';
import {
  PAPER_OPTIONS,
  ORIENTATION_OPTIONS,
  PAPER_SIZES,
  defaultPaperSizeFor,
  paperCss,
  paperDimsMm,
} from '../src/paper';

describe('paperDimsMm', () => {
  it('returns portrait dimensions as-is', () => {
    expect(paperDimsMm('a4', 'portrait')).toEqual({
      widthMm: 210,
      heightMm: 297,
    });
    expect(paperDimsMm('legal', 'portrait')).toEqual({
      widthMm: 215.9,
      heightMm: 355.6,
    });
  });

  it('swaps width and height for landscape', () => {
    expect(paperDimsMm('a4', 'landscape')).toEqual({
      widthMm: 297,
      heightMm: 210,
    });
  });
});

describe('paperCss', () => {
  it('maps each size to its @page keyword', () => {
    expect(paperCss('a4')).toBe('A4');
    expect(paperCss('letter')).toBe('letter');
    expect(paperCss('legal')).toBe('legal');
  });
});

describe('picker options', () => {
  it('offers every paper size with a label key and css keyword', () => {
    expect(PAPER_OPTIONS.map((o) => o.value)).toEqual([...PAPER_SIZES]);
    for (const o of PAPER_OPTIONS) {
      expect(o.labelKey).toMatch(/^print\./);
      expect(o.css.length).toBeGreaterThan(0);
    }
  });

  it('offers both orientations', () => {
    expect(ORIENTATION_OPTIONS.map((o) => o.value)).toEqual([
      'portrait',
      'landscape',
    ]);
  });
});

describe('defaultPaperSizeFor', () => {
  it('is letter for a Letter region', () => {
    expect(defaultPaperSizeFor(['en-US'])).toBe('letter');
    expect(defaultPaperSizeFor(['es_MX'])).toBe('letter');
  });

  it('is a4 for a non-Letter region', () => {
    expect(defaultPaperSizeFor(['en-GB'])).toBe('a4');
    expect(defaultPaperSizeFor(['zh-Hans-CN'])).toBe('a4');
  });

  it('decides on the region, not the language', () => {
    expect(defaultPaperSizeFor(['en-DE'])).toBe('a4');
  });

  it('skips tags with no region and falls back to a4', () => {
    expect(defaultPaperSizeFor(['en', 'fr'])).toBe('a4');
    expect(defaultPaperSizeFor([])).toBe('a4');
  });

  it('uses the first tag that names a region', () => {
    expect(defaultPaperSizeFor(['en', 'en-US'])).toBe('letter');
  });
});
