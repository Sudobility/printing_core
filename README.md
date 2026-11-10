# @sudobility/printing_core

Platform-agnostic printing primitives — paper sizes, page geometry, and the
print-options model — shared by the web (`@sudobility/printing`) and React
Native (`@sudobility/printing_rn`) printing libraries. Pure: no DOM, no Skia, no
react-native, no domain types.

> **Phase 0 scaffold.** This package currently ships only `paperDimsMm` and the
> `PaperSize`/`PaperOrientation` types, enough to stand the package up. The full
> geometry, options model, and headless React hook land in Phase 1. See the
> design doc at `music_app_rn/docs/printing-libraries.md`.

## Install

```sh
bun add @sudobility/printing_core
```
