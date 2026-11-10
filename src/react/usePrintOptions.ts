/**
 * The headless print-options hook. React is a peer dependency and this entry is
 * only reachable through `@sudobility/printing_core/react`, so the package's
 * default entry stays framework-free.
 *
 * It holds scope and orientation (about *this* printout) and reflects the
 * remembered paper through `onPaperChange` (about the *printer*) — the split
 * both apps' print views re-implement by hand. The widgets stay in each app;
 * this is only the state.
 */
import { useState } from 'react';
import { DEFAULT_MARGIN_MM } from '../geometry.js';
import type { PageGeometry } from '../geometry.js';
import { initialPrintOptions } from '../options.js';
import type { PrintOptionsInit } from '../options.js';
import type { PaperOrientation, PaperSize } from '../paper.js';

export interface UsePrintOptions {
  scope: string;
  setScope: (scope: string) => void;
  paper: PaperSize;
  setPaper: (paper: PaperSize) => void;
  orientation: PaperOrientation;
  setOrientation: (orientation: PaperOrientation) => void;
  /** `{ paper, orientation, DEFAULT_MARGIN_MM }`, ready for `pageCss`/pagination. */
  geometry: PageGeometry;
}

export function usePrintOptions(
  init: PrintOptionsInit & { onPaperChange: (paper: PaperSize) => void }
): UsePrintOptions {
  const initial = initialPrintOptions(init);
  const [scope, setScope] = useState(initial.scope);
  const [orientation, setOrientation] = useState(initial.orientation);

  // Paper comes from the remembered pref (injected), not local state: a choice
  // outlives this view, so the caller persists it and feeds it back in.
  const paper = init.rememberedPaper ?? init.defaultPaper;

  return {
    scope,
    setScope,
    paper,
    setPaper: init.onPaperChange,
    orientation,
    setOrientation,
    geometry: { paper, orientation, marginMm: DEFAULT_MARGIN_MM },
  };
}
