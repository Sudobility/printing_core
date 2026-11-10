import { describe, expect, it } from 'vitest';
import {
  DEFAULT_MARGIN_MM,
  pageCss,
  pageGeometry,
  usablePageHeight,
  usablePageMm,
} from '../src/geometry';

describe('pageGeometry', () => {
  it('fills in the default margin', () => {
    expect(pageGeometry('a4', 'portrait')).toEqual({
      paper: 'a4',
      orientation: 'portrait',
      marginMm: DEFAULT_MARGIN_MM,
    });
  });

  it('accepts an explicit margin', () => {
    expect(pageGeometry('letter', 'landscape', 10).marginMm).toBe(10);
  });
});

describe('usablePageMm', () => {
  it('subtracts the margin from both sides', () => {
    expect(usablePageMm(pageGeometry('a4', 'portrait'))).toEqual({
      widthMm: 210 - 24,
      heightMm: 297 - 24,
    });
  });
});

describe('usablePageHeight', () => {
  // Matches music_drawing's original formula at PRINT_WIDTH = 1000, margin 12.
  it('matches the portrait ratio', () => {
    const geo = pageGeometry('a4', 'portrait');
    expect(usablePageHeight(geo, 1000)).toBeCloseTo((1000 * (297 - 24)) / (210 - 24));
  });

  it('matches the landscape ratio (sides swapped)', () => {
    const geo = pageGeometry('a4', 'landscape');
    expect(usablePageHeight(geo, 1000)).toBeCloseTo((1000 * (210 - 24)) / (297 - 24));
  });
});

describe('pageCss', () => {
  it('emits a @page rule from the geometry', () => {
    expect(pageCss(pageGeometry('a4', 'portrait'))).toBe(
      '@page { size: A4 portrait; margin: 12mm; }'
    );
  });

  it('scopes to a named page', () => {
    expect(pageCss(pageGeometry('letter', 'portrait', 25.4), 'doc')).toBe(
      '@page doc { size: letter portrait; margin: 25.4mm; }'
    );
  });
});
