import { describe, expect, it } from 'vitest';
import { initialPrintOptions } from '../src/options';

describe('initialPrintOptions', () => {
  it('uses the remembered paper when there is one', () => {
    expect(
      initialPrintOptions({
        scope: 'score',
        rememberedPaper: 'letter',
        defaultPaper: 'a4',
      })
    ).toEqual({ scope: 'score', paper: 'letter', orientation: 'portrait' });
  });

  it('falls back to the default paper and portrait', () => {
    expect(
      initialPrintOptions({
        scope: 'track-1',
        rememberedPaper: null,
        defaultPaper: 'a4',
      })
    ).toEqual({ scope: 'track-1', paper: 'a4', orientation: 'portrait' });
  });

  it('honours an explicit orientation', () => {
    expect(
      initialPrintOptions({
        scope: 'score',
        rememberedPaper: null,
        defaultPaper: 'a4',
        orientation: 'landscape',
      }).orientation
    ).toBe('landscape');
  });
});
