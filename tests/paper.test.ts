import { describe, expect, it } from 'vitest';
import { paperDimsMm } from '../src/paper';

describe('paperDimsMm', () => {
  it('returns portrait dimensions as-is', () => {
    expect(paperDimsMm('a4', 'portrait')).toEqual({
      widthMm: 210,
      heightMm: 297,
    });
    expect(paperDimsMm('letter', 'portrait')).toEqual({
      widthMm: 215.9,
      heightMm: 279.4,
    });
  });

  it('swaps width and height for landscape', () => {
    expect(paperDimsMm('a4', 'landscape')).toEqual({
      widthMm: 297,
      heightMm: 210,
    });
  });
});
