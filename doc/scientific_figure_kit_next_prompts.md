# Scientific Figure Kit — Next-Step Copilot Prompts

This document organizes the next development prompts for `scientific-figure-kit`.

The current repository is an initial MVP. It has a Vite + React + TypeScript app, six figure templates, a parameter sidebar, live SVG preview, and basic SVG export. The next goal is **not** to add AI image generation or more templates immediately. The goal is to stabilize the deterministic SVG template generator so it can become a reliable scientific figure tool.

## Core Principle

This project is **not** an AI image generator.

It should generate clean, editable, deterministic SVG figures from structured templates and parameters.

The intended workflow is:

```text
Choose scientific figure template
→ edit parameters
→ preview SVG
→ export SVG / PNG / JSON
→ polish in Inkscape, PowerPoint, Figma, or draw.io
```

Do **not** integrate:

```text
- DALL·E
- Midjourney
- Stable Diffusion
- ComfyUI
- multimodal APIs
- RAG
- autonomous multi-agent loops
```

Those may be considered later only as optional inspiration tools. They are not part of the MVP.

---

# Recommended Development Order

Use one branch / issue / PR per stage.

```text
1. Project quality baseline: build, lint, test, CI
2. Strictly type SVG primitives
3. Complete parameter panel and refactor App.tsx
4. Export pipeline: SVG, PNG, JSON, validation
5. Improve metasurface flat-top template
6. Add local SVG asset library
```

---

# Issue 1 — Project Quality Baseline

## Branch

```text
chore/project-quality-baseline
```

## Prompt for Copilot

```text
Before adding new features, stabilize the current MVP.

Repository context:
This is a local-first scientific SVG figure kit. It should generate clean, editable SVG scientific figures for optics, metasurfaces, photoacoustic imaging, and LLM/COMSOL workflow diagrams. It is not an AI image generator and should not use image-generation APIs.

Current status:
The initial Vite + React + TypeScript app exists. It has six templates, a parameter sidebar, SVG preview, and basic SVG export. However, the code still needs engineering stabilization before adding more templates.

Your task:
Create a branch named chore/project-quality-baseline and implement the project quality baseline.

Requirements:
1. Verify that npm install, npm run build, npm run dev work.
2. Fix build errors if any.
3. Add missing ESLint dependencies if the existing lint script requires them.
4. Add Prettier.
5. Add Vitest.
6. Add at least minimal tests for:
   - exportSvg serialization behavior
   - template registry existence
   - primitive component rendering if feasible
7. Add GitHub Actions workflow at .github/workflows/ci.yml that runs:
   - npm ci
   - npm run build
   - npm run lint
   - npm test
8. Add README.md with:
   - project purpose
   - local setup
   - available scripts
   - current templates
   - development roadmap
9. Do not add AI image generation.
10. Do not add new templates in this PR.
11. Do not rewrite the whole app.
12. Keep changes focused on project stability.

Acceptance criteria:
- npm run build passes.
- npm run lint passes.
- npm test passes.
- GitHub Actions passes.
- README explains that the project generates deterministic editable SVG, not LLM-generated images.
```

## Notes

This is the highest priority. Without build/lint/test/CI, later Copilot-generated changes may silently break the project.

---

# Issue 2 — Strictly Type SVG Primitives

## Branch

```text
refactor/typed-svg-primitives
```

## Prompt for Copilot

```text
Create a branch called refactor/typed-svg-primitives.

Refactor SVG primitives to use strict TypeScript props.

Current problem:
src/primitives/index.tsx uses props: any for all primitives. This makes the template system fragile.

Tasks:
1. Create explicit prop interfaces for:
   - ArrowProps
   - CurvedArrowProps
   - TextLabelProps
   - PanelFrameProps
   - GaussianBeamProps
   - MetasurfacePostArrayProps
   - TargetPlaneProps
   - TissueLayerProps
   - TransducerProps
   - FiberBundleProps
   - WavefrontProps
   - BlockNodeProps
2. Replace all props: any with typed props.
3. Use number types for SVG coordinates and dimensions where possible.
4. Keep label text as editable SVG <text>.
5. Add default values safely inside each component.
6. Fix marker ID collisions in Arrow by generating a stable marker ID from groupId.
7. Ensure CurvedArrow defines or reuses a valid marker.
8. Do not change template visuals except as needed for type correctness.
9. Add unit tests or lightweight render tests for primitives if feasible.

Acceptance criteria:
- npm run build passes.
- No primitive uses props: any.
- Multiple arrows in the same SVG do not conflict through duplicate marker IDs.
```

## Notes

This PR is important because the project will eventually contain many reusable scientific drawing primitives. If primitives remain loosely typed, later templates will become hard to maintain.

---

# Issue 3 — Complete Parameter Panel and Refactor App

## Branch

```text
feature/complete-parameter-panel
```

## Prompt for Copilot

```text
Create a branch called feature/complete-parameter-panel.

Implement a complete parameter panel for all ControlSpec types.

Current problem:
ControlSpec supports text, number, select, color, and toggle controls, but the UI only partially supports them.

Tasks:
1. Support text, number, select, color, and toggle controls.
2. For number controls, respect min, max, step, and unit fields.
3. For color controls, use an HTML color input plus text input.
4. For select controls, render a dropdown using the provided options.
5. Show validation warnings if activeTemplate.validate(params) returns errors.
6. Avoid using any for params handling if possible.
7. Refactor App.tsx into smaller components:
   - TemplateSelector
   - ParameterPanel
   - SvgPreview
   - ExportToolbar

Acceptance criteria:
- All ControlSpec types render correctly.
- Existing six templates still render.
- App.tsx becomes smaller and easier to maintain.
- Validation warnings are visible when template.validate returns errors.
```

## Notes

This turns the tool from a static demo into a real parameterized figure generator.

---

# Issue 4 — Export Pipeline: SVG, PNG, JSON, Validation

## Branch

```text
feature/export-pipeline
```

## Prompt for Copilot

```text
Create a branch called feature/export-pipeline.

Improve export functionality for scientific figure workflows.

Current problem:
The current exportSvg utility only performs basic XML serialization and SVG download. The project needs a stronger export pipeline for scientific figure reuse and reproducibility.

Tasks:
1. Keep the existing SVG export.
2. Add export PNG using browser canvas.
3. Add save figure configuration as JSON.
4. Add load figure configuration from JSON.
5. Add export metadata:
   - template id
   - template name
   - parameters
   - theme name
   - export timestamp
6. Add an SVG validation utility that checks:
   - SVG has viewBox
   - SVG has xmlns
   - no raster <image> elements unless explicitly allowed
   - text remains editable <text>
   - semantic group ids exist
7. Add export options:
   - transparent background
   - white background
   - scale factor for PNG
8. Add UI controls for export options in ExportToolbar.
9. Add tests for:
   - SVG serialization
   - JSON save/load format
   - validation utility

Acceptance criteria:
- User can export SVG.
- User can export PNG.
- User can save and reload figure JSON.
- Validation warnings are visible in the UI.
- Exported SVG remains editable in Inkscape or other SVG editors.
```

## Notes

The JSON save/load function is essential. It allows figures to be reproduced and modified later without recreating all settings manually.

---

# Issue 5 — Improve Metasurface Flat-Top Template

## Branch

```text
improve/metasurface-flat-top-template
```

## Prompt for Copilot

```text
Create a branch called improve/metasurface-flat-top-template.

Improve the metasurface flat-top generation template into a publication-style SVG figure.

Current problem:
The metasurface flat-top template exists, but most parameters are not exposed through the UI and the visual quality is still closer to a placeholder than a polished scientific figure.

Tasks:
1. Expose all important parameters in controls:
   - title
   - wavelengthLabel
   - workingDistanceLabel
   - targetSizeLabel
   - inputBeamLabel
   - outputFieldLabel
   - metasurfaceLabel
   - materialLabel
   - periodLabel
   - visiblePostCount
   - showCoordinateAxis
   - showIntensityInset
2. Improve the visual design:
   - use a clean panel layout
   - show Gaussian input beam
   - show metasurface with multiple posts of varying height or radius
   - show propagation region
   - show target plane
   - show a square flat-top intensity inset
   - show working distance arrow
   - show editable labels
3. Add semantic SVG groups:
   - layer_title
   - layer_input_beam
   - layer_metasurface
   - layer_propagation
   - layer_target
   - layer_annotations
   - layer_labels
4. Keep all text editable.
5. Do not use AI-generated raster images.
6. Do not import external assets.
7. Add or update tests if template rendering can be tested.

Acceptance criteria:
- The exported SVG is usable as a first draft for a proposal figure.
- The template remains parameterized.
- No text is rasterized.
- Semantic group IDs are present.
- The template visually communicates:
  Gaussian input → metasurface → propagation → uniform square target field.
```

## Notes

Do not try to polish all six templates at once. First make one high-value template genuinely useful.

---

# Issue 6 — Local SVG Asset Library

## Branch

```text
feature/svg-asset-library
```

## Prompt for Copilot

```text
Create a branch called feature/svg-asset-library.

Add a local SVG asset library system.

Motivation:
The project should reuse existing SVG scientific assets instead of redrawing everything from scratch. Assets may come from user-created SVGs or external scientific icon libraries, provided license metadata is tracked.

Tasks:
1. Create public/assets/icons/.
2. Create public/assets/icons/metadata.json.
3. Each asset metadata entry should include:
   - id
   - name
   - category
   - source
   - license
   - attribution
   - tags
   - file path
4. Add AssetBrowser component.
5. Let templates reference assets by asset id.
6. Preserve imported assets as vector SVG during export.
7. Add a license report in exported figure JSON.
8. Add an example placeholder asset with clear local/demo licensing.
9. Add documentation explaining how to add external assets.

Important:
- Do not bundle third-party assets unless their license allows redistribution.
- Do not rasterize imported SVG assets.
- Do not integrate AI image generation.

Acceptance criteria:
- User can place SVG files in public/assets/icons/.
- Assets appear in the UI.
- Templates can include external SVG icons.
- Exported figure JSON records licenses and attribution.
- Documentation explains license tracking.
```

## Notes

This is the stage where external resources become useful. Potential asset sources include:

```text
- Bioicons
- SciDraw
- Servier Medical Art
- NIAID BioArt
- user-created metasurface SVG components
- SVGs exported from Inkscape, Figma, BioRender, or draw.io
```

Always preserve license and attribution metadata.

---

# Optional Later Stage — Draw.io / Excalidraw Export

Do this only after Issues 1–6 are stable.

## Branch

```text
feature/diagram-tool-export
```

## Prompt for Copilot

```text
Create a branch called feature/diagram-tool-export.

Add optional export formats for external diagram editors.

Tasks:
1. Investigate the simplest useful export path for draw.io or Excalidraw.
2. Prefer generating reusable libraries or importable JSON rather than building a full drawing editor.
3. Add export support for one target only in this PR:
   - draw.io custom library, or
   - Excalidraw JSON
4. Document limitations clearly.
5. Keep SVG export as the primary workflow.

Acceptance criteria:
- User can export at least one diagram-tool-compatible file.
- The feature does not break existing SVG/PNG/JSON export.
- README documents when to use SVG export versus diagram-tool export.
```

---

# Optional Later Stage — ComfyUI Inspiration Panel

Do this only after the deterministic SVG workflow is stable.

## Branch

```text
feature/comfyui-inspiration-panel
```

## Prompt for Copilot

```text
Create a branch called feature/comfyui-inspiration-panel.

Add an optional ComfyUI inspiration panel.

Purpose:
This feature should generate or store visual inspiration only. It must not become the source of the final scientific SVG figure.

Tasks:
1. Add a disabled-by-default ComfyUI settings panel.
2. Let the user configure a local ComfyUI server URL.
3. Allow the user to store inspiration images in an inspiration/ folder.
4. Save metadata:
   - prompt
   - seed
   - workflow name
   - timestamp
   - related figure template id
5. Clearly label generated images as inspiration/reference only.
6. Do not insert generated raster images into final SVG templates by default.

Acceptance criteria:
- The deterministic SVG workflow still works without ComfyUI.
- No external API is required.
- The feature is optional and local-only.
- Generated images are treated as references, not final figures.
```

---

# Suggested GitHub Issue Titles

```text
1. Stabilize project quality baseline with build, lint, test, and CI
2. Refactor SVG primitives with strict TypeScript props
3. Complete parameter panel and split App into reusable components
4. Add export pipeline for SVG, PNG, JSON, and validation
5. Improve metasurface flat-top template into publication-style SVG
6. Add local SVG asset library with license metadata
7. Optional: Add draw.io or Excalidraw export
8. Optional: Add local ComfyUI inspiration panel
```

---

# Practical Development Rules for Copilot

Use these rules in every future prompt.

```text
- Do not add AI image generation unless explicitly requested.
- Do not add more templates before the core architecture is stable.
- Keep text editable as SVG <text>.
- Preserve vector graphics whenever possible.
- Use semantic SVG group IDs.
- Avoid raster images in exported SVG.
- Prefer small focused PRs.
- Keep exported SVG compatible with Inkscape.
- Track license metadata for external assets.
- Do not rewrite the whole app in one PR.
```

---

# Final Recommended Path

For the next development session, start with Issue 1 only:

```text
chore/project-quality-baseline
```

After CI, lint, build, and tests are stable, proceed to typed primitives and export pipeline.

The project should become a reliable deterministic scientific SVG figure generator before adding optional AI-based inspiration features.
