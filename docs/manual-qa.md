# Manual QA: Metasurface Flat-Top Template

Checklist to verify the improved metasurface flat-top template manually:

- Run the dev server:

```bash
npm run dev
```

- Open the app and choose the `Metasurface flat-top generation` template.
- Change `Visible Post Count` and verify posts change.
- Toggle `Show Coordinate Axis`, `Show Scale Bar`, and `Show Intensity Inset` and verify layers appear/disappear.
- Export SVG and open the downloaded file; confirm labels are editable text and semantic `id` attributes (e.g. `layer_target`, `layer_metasurface`) are present.
- Export PNG to verify the raster export looks correct.
- Save JSON and Load JSON to verify parameters persist.

Notes:
- This QA file is intentionally minimal — keep the template design unchanged and focus on label/editability and toggles.
