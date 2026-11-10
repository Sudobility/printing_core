/**
 * The print-options model: what to print, on what paper, which way up.
 *
 * Framework-agnostic. `scope` is opaque to this library — a domain names it
 * (music's `WHOLE_SCORE` or a track id; a screenplay item). The React binding
 * is `react/usePrintOptions`.
 */
import type { PaperOrientation, PaperSize } from './paper.js';

export interface PrintOptions {
  /** Domain-defined; this library treats it as opaque. */
  scope: string;
  paper: PaperSize;
  orientation: PaperOrientation;
}

export interface PrintOptionsInit {
  /** The scope to start on (e.g. the whole document, or a part). */
  scope: string;
  /**
   * The remembered paper (a device pref), or `null` before one is chosen. The
   * reader's printer does not change between printouts, so the choice is
   * persisted by the caller, not held here.
   */
  rememberedPaper: PaperSize | null;
  /** The paper used until the reader chooses one (`defaultPaperSizeFor(...)`). */
  defaultPaper: PaperSize;
  /** Defaults to `'portrait'`. */
  orientation?: PaperOrientation;
}

/** The starting options: the remembered paper if there is one, else the default. */
export function initialPrintOptions(init: PrintOptionsInit): PrintOptions {
  return {
    scope: init.scope,
    paper: init.rememberedPaper ?? init.defaultPaper,
    orientation: init.orientation ?? 'portrait',
  };
}
