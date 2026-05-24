# prompt.md — Build `scientific-figure-kit`

## 0. Core clarification

This project is **not** an LLM image-generation project, not a multi-agent drawing system, and not a ComfyUI wrapper.

The goal is to build a **deterministic, local-first SVG figure template generator** for scientific diagrams. The user chooses a figure template, edits structured parameters, and the app renders a clean, editable SVG using normal React/TypeScript components.

The app itself should require **no paid multimodal API**, no OpenAI API, no image-generation API, and no runtime LLM dependency.

GitHub Copilot is used only as a coding assistant to build the software. The final tool should work offline after installation.

---

## 1. Project concept

Build a local web app named:

```text
scientific-figure-kit
```

Purpose:

```text
Generate clean, editable, publication-oriented SVG schematics for optics, metasurfaces, photoacoustic imaging, and LLM-for-engineering workflow figures.
```

The generated figures should be editable later in:

```text
Inkscape
Figma
PowerPoint
draw.io / diagrams.net
Illustrator
LaTeX/Word workflows
```

The project should focus on **structured scientific templates**, not free-form drawing.

---

## 2. What this project is

This project is:

```text
A parameterized SVG template generator.
A reusable scientific figure component library.
A local-first tool for producing editable SVG drafts.
A way to organize scientific figure assets and templates.
A practical helper for proposal, paper, slide, and poster figures.
```

Example workflow:

```text
1. Open the web app.
2. Select template: "Metasurface flat-top generation".
3. Edit parameters:
   - wavelength = 750 nm
   - working distance = 300 µm
   - target size = 40 × 40 µm²
   - material = c-Si
   - number of visible posts = 18
4. Preview the figure as SVG.
5. Export:
   - figure.svg
   - figure.png
   - figure.json
6. Open the SVG in Inkscape or PowerPoint for final manual polish.
```

---

## 3. What this project is not

Do **not** build these in the MVP:

```text
No AI image generation.
No ComfyUI integration.
No DALL-E / Midjourney / Stable Diffusion dependency.
No expensive multimodal API.
No RAG system.
No personal knowledge base.
No cloud account system.
No collaboration system.
No full Illustrator/Figma clone.
No large drag-and-drop canvas editor.
No agent loop.
No autonomous scientific reasoning agent.
```

Important: The app should not attempt to infer scientific correctness from natural language. It should provide user-controlled templates and editable parameters.

---

## 4. Recommended stack

Use:

```text
React + Vite + TypeScript
Tailwind CSS
Zod for runtime validation
Vitest for tests
Playwright optional for end-to-end export tests
```

Optional libraries:

```text
SVGR: for converting external SVG assets into React components if needed.
SVG.js: optional only if direct SVG manipulation becomes necessary.
lucide-react: optional for UI icons only, not for scientific figure elements.
```

Do not require a backend in the MVP. The app should run as a local static web app.

---

## 5. High-level architecture

Recommended folder structure:

```text
scientific-figure-kit/
  README.md
  LICENSE
  package.json
  vite.config.ts
  tsconfig.json
  index.html

  public/
    assets/
      icons/
        README.md
        metadata.json
      examples/
        README.md

  src/
    main.tsx
    App.tsx

    types/
      figure.ts
      template.ts
      theme.ts
      assets.ts

    data/
      templates.ts
      defaultThemes.ts
      journalPresets.ts

    components/
      layout/
        AppShell.tsx
        Sidebar.tsx
        Toolbar.tsx

      controls/
        ParameterPanel.tsx
        ControlRenderer.tsx
        ColorControl.tsx
        NumberControl.tsx
        SelectControl.tsx
        TextControl.tsx
        ToggleControl.tsx

      preview/
        SvgPreview.tsx
        ExportButtons.tsx
        ValidationPanel.tsx

      assets/
        AssetBrowser.tsx
        AssetMetadataPanel.tsx

    primitives/
      Arrow.tsx
      CurvedArrow.tsx
      TextLabel.tsx
      PanelFrame.tsx
      CoordinateAxis.tsx
      ScaleBar.tsx
      GaussianBeam.tsx
      Wavefront.tsx
      TargetPlane.tsx
      MetasurfacePostArray.tsx
      TissueLayer.tsx
      Transducer.tsx
      FiberBundle.tsx
      OpticalElement.tsx
      BlockNode.tsx
      LoopArrow.tsx

    templates/
      metasurfaceFlatTop/
        index.tsx
        schema.ts
        defaults.ts
        controls.ts

      fiberVsMetasurface/
        index.tsx
        schema.ts
        defaults.ts
        controls.ts

      sideFirePAI/
        index.tsx
        schema.ts
        defaults.ts
        controls.ts

      adjointOptimizationLoop/
        index.tsx
        schema.ts
        defaults.ts
        controls.ts

      metaAtomLibrary/
        index.tsx
        schema.ts
        defaults.ts
        controls.ts

      llmComsolVerifierLoop/
        index.tsx
        schema.ts
        defaults.ts
        controls.ts

    export/
      exportSvg.ts
      exportPng.ts
      serializeFigure.ts
      validateSvg.ts

    utils/
      geometry.ts
      colors.ts
      ids.ts
      svg.ts
      download.ts

    tests/
      exportSvg.test.ts
      serializeFigure.test.ts
      validateSvg.test.ts
      primitives.test.tsx
```

---

## 6. Core data model

Implement these TypeScript interfaces.

### 6.1 Figure document

```ts
export interface FigureDocument<TParams = Record<string, unknown>> {
  version: string;
  templateId: string;
  title: string;
  params: TParams;
  themeId: string;
  canvas: {
    width: number;
    height: number;
    background: "transparent" | "white";
  };
  metadata: {
    createdAt: string;
    updatedAt: string;
    author?: string;
    notes?: string;
    assetLicenses?: AssetLicenseRecord[];
  };
}
```

### 6.2 Template definition

```ts
export interface FigureTemplate<TParams = Record<string, unknown>> {
  id: string;
  name: string;
  description: string;
  category: "optics" | "pai" | "workflow" | "metaAtom" | "general";
  defaultParams: TParams;
  controls: ControlSpec[];
  render: (params: TParams, theme: FigureTheme) => React.ReactNode;
  validate?: (params: TParams) => string[];
}
```

### 6.3 Control specification

```ts
export type ControlSpec =
  | {
      type: "text";
      key: string;
      label: string;
      placeholder?: string;
    }
  | {
      type: "number";
      key: string;
      label: string;
      min?: number;
      max?: number;
      step?: number;
      unit?: string;
    }
  | {
      type: "select";
      key: string;
      label: string;
      options: { label: string; value: string }[];
    }
  | {
      type: "color";
      key: string;
      label: string;
    }
  | {
      type: "toggle";
      key: string;
      label: string;
    };
```

### 6.4 Theme

```ts
export interface FigureTheme {
  id: string;
  name: string;
  fontFamily: string;
  fontSize: {
    small: number;
    body: number;
    label: number;
    title: number;
  };
  strokeWidth: {
    thin: number;
    normal: number;
    thick: number;
  };
  colors: {
    background: string;
    text: string;
    mutedText: string;
    primary: string;
    secondary: string;
    accent: string;
    beam: string;
    optical: string;
    acoustic: string;
    tissue: string;
    device: string;
    target: string;
    warning: string;
  };
  arrow: {
    markerSize: number;
    defaultHead: "triangle" | "vee";
  };
}
```

### 6.5 Asset metadata

```ts
export interface AssetMetadata {
  id: string;
  name: string;
  category: string;
  file: string;
  source?: string;
  license?: string;
  attributionRequired: boolean;
  attributionText?: string;
  tags: string[];
}
```

---

## 7. Rendering strategy

Use regular React components that return SVG elements.

Example:

```tsx
export function Arrow(props: ArrowProps) {
  return (
    <g id={props.groupId}>
      <line
        x1={props.x1}
        y1={props.y1}
        x2={props.x2}
        y2={props.y2}
        stroke={props.color}
        strokeWidth={props.strokeWidth}
        markerEnd={`url(#${props.markerId})`}
      />
      {props.label && (
        <text x={props.labelX} y={props.labelY}>
          {props.label}
        </text>
      )}
    </g>
  );
}
```

Important requirements:

```text
All text should remain SVG <text>.
Do not rasterize text in exported SVG.
Use semantic group IDs:
  layer_background
  layer_device
  layer_beam
  layer_target
  layer_labels
  layer_annotations
Keep groups editable.
Avoid external CSS in exported SVG.
Inline important styles during export.
Use a clean viewBox.
```

---

## 8. SVG primitives to implement first

Implement these primitives before templates.

### 8.1 PanelFrame

A rectangular panel with optional title and letter label.

Props:

```ts
x, y, width, height, title, panelLabel, theme
```

Use for multi-panel figures such as fiber vs metasurface comparison.

### 8.2 TextLabel

Editable SVG text with optional background box.

Props:

```ts
x, y, text, anchor, fontSize, color, background, groupId
```

### 8.3 Arrow

Straight arrow with label.

Props:

```ts
x1, y1, x2, y2, label, color, strokeWidth, groupId
```

### 8.4 CurvedArrow

Curved arrow for workflow diagrams.

Props:

```ts
start, end, controlPoint, label, color, strokeWidth, groupId
```

### 8.5 GaussianBeam

Draw a stylized optical beam, preferably as a translucent tapered path.

Props:

```ts
x1, y1, x2, y2, waistStart, waistEnd, color, opacity, label
```

### 8.6 Wavefront

Draw repeated curves or arcs for optical/acoustic waves.

Props:

```ts
originX, originY, radiusStart, radiusStep, count, angleStart, angleEnd, color
```

### 8.7 MetasurfacePostArray

Draw an array of posts with variable radius/height/rotation.

Props:

```ts
x, y, columns, rows, period, postShape, variation, color, label
```

For MVP, use a simple pseudo-3D top or side view. It does not need to be physically exact.

### 8.8 TargetPlane

Draw a square target plane with flat-top intensity shading.

Props:

```ts
x, y, width, height, label, showGrid, color
```

### 8.9 TissueLayer

Draw a biological tissue region with optional absorber.

Props:

```ts
x, y, width, height, label, absorberPosition, showVessels
```

### 8.10 Transducer

Draw an ultrasound transducer.

Props:

```ts
x, y, width, height, orientation, label
```

### 8.11 FiberBundle

Draw a fiber bundle as a group of small circles or tubes.

Props:

```ts
x, y, length, radius, count, label
```

### 8.12 BlockNode

Workflow node with icon, title, subtitle.

Props:

```ts
x, y, width, height, title, subtitle, iconId, color
```

---

## 9. Initial templates

Implement six templates.

---

### Template 1: Metasurface flat-top generation

Template ID:

```text
metasurface-flat-top
```

Scientific purpose:

```text
Show a Gaussian input beam passing through a metasurface and forming a uniform square target field at a working distance.
```

Default parameters:

```ts
{
  title: "Metasurface flat-top generation",
  wavelengthLabel: "λ = 750 nm",
  workingDistanceLabel: "z = 300 µm",
  targetSizeLabel: "40 × 40 µm²",
  inputBeamLabel: "Gaussian input",
  outputFieldLabel: "Uniform 2D target",
  metasurfaceLabel: "Phase-only metasurface",
  materialLabel: "c-Si posts",
  periodLabel: "p = 300 nm",
  visiblePostCount: 18,
  showCoordinateAxis: true,
  showIntensityInset: true
}
```

Layout:

```text
Left: Gaussian beam.
Center: metasurface post array.
Right: target plane with flat-top square.
Add arrow or dimension line showing working distance.
Add labels near each major element.
```

Acceptance criteria:

```text
The SVG should clearly show input beam, metasurface, propagation, and target plane.
All labels must be editable text.
The metasurface group must have id="layer_metasurface".
The beam group must have id="layer_beam".
The target group must have id="layer_target".
```

---

### Template 2: Fiber bundle vs metasurface PAI comparison

Template ID:

```text
fiber-vs-metasurface-pai
```

Scientific purpose:

```text
Compare conventional fiber-bundle illumination with proposed metasurface-based beam shaping for photoacoustic imaging.
```

Default parameters:

```ts
{
  title: "PAI illumination comparison",
  leftTitle: "Conventional fiber bundle",
  rightTitle: "Metasurface beam shaping",
  leftProblem1: "Bulky delivery",
  leftProblem2: "Nonuniform field",
  rightBenefit1: "Thin beam shaper",
  rightBenefit2: "Uniform 2D target",
  tissueLabel: "Tissue",
  absorberLabel: "Absorber",
  transducerLabel: "Ultrasound transducer",
  showPanelLetters: true
}
```

Layout:

```text
Two panels:
A. Fiber bundle illumination into tissue; show nonuniform illumination.
B. Metasurface illumination into tissue; show uniform square target.
Both panels should include tissue, absorber, and ultrasound transducer.
```

Acceptance criteria:

```text
Exported SVG must be suitable as a first draft of a proposal figure.
Panels must be grouped separately as panel_A and panel_B.
All scientific labels must be editable.
```

---

### Template 3: Side-fire PAI geometry

Template ID:

```text
side-fire-pai-geometry
```

Scientific purpose:

```text
Show side illumination geometry for integrating a metasurface beam shaper with a photoacoustic imaging setup.
```

Default parameters:

```ts
{
  title: "Side-fire PAI geometry",
  illuminationLabel: "Side illumination",
  metasurfaceLabel: "Metasurface beam shaper",
  protectiveLayerLabel: "Protective layer",
  tissueLabel: "Tissue",
  absorberLabel: "Optical absorber",
  paWaveLabel: "Photoacoustic wave",
  transducerLabel: "Ultrasound transducer",
  showProtectiveLayer: true,
  showAcousticWave: true
}
```

Layout:

```text
Side view.
Metasurface placed near side.
Optical beam enters laterally.
Target/absorber inside tissue.
Acoustic waves propagate to ultrasound transducer.
```

Acceptance criteria:

```text
Optical and acoustic paths should be visually distinguishable.
No claim of exact physical scale should be implied.
Add a small note if needed: "schematic, not to scale".
```

---

### Template 4: Adjoint optimization loop

Template ID:

```text
adjoint-optimization-loop
```

Scientific purpose:

```text
Visualize the forward/adjoint optimization workflow for phase-only metasurface inverse design.
```

Default parameters:

```ts
{
  title: "Adjoint inverse-design loop",
  node1Title: "Phase mask",
  node2Title: "Forward propagation",
  node3Title: "Target projection",
  node4Title: "Adjoint source",
  node5Title: "Gradient",
  node6Title: "Optimizer update",
  optimizerLabel: "Adam / MMA",
  objectiveLabel: "Efficiency − uniformity penalty",
  showEquationPlaceholder: true
}
```

Layout:

```text
Circular workflow with six block nodes.
Use arrows between nodes.
Include small optional equation placeholder.
```

Acceptance criteria:

```text
The workflow should look clean enough for a methods figure.
No rasterized elements.
All nodes use BlockNode primitive.
```

---

### Template 5: Meta-atom library schematic

Template ID:

```text
meta-atom-library
```

Scientific purpose:

```text
Show a phase-only meta-atom library with unit cells, varying geometry, phase coverage, and transmission behavior.
```

Default parameters:

```ts
{
  title: "Phase-only meta-atom library",
  materialLabel: "c-Si / GaP",
  periodLabel: "p = 300 nm",
  phaseLabel: "0–2π phase",
  transmissionLabel: "High transmission",
  parameter1Label: "width W",
  parameter2Label: "rotation α",
  showPhaseWheel: true,
  showTransmissionBar: true,
  unitCellCount: 8
}
```

Layout:

```text
Row of unit cells with varying post sizes or rotations.
Side annotation showing phase response.
Optional phase wheel and transmission bar.
```

Acceptance criteria:

```text
The schematic should communicate library-based phase control without implying exact RCWA/FEM data.
Text must remain editable.
```

---

### Template 6: LLM + COMSOL verifier loop

Template ID:

```text
llm-comsol-verifier-loop
```

Scientific purpose:

```text
Show a tool-using LLM workflow for simulation-grounded EM component design.
```

Default parameters:

```ts
{
  title: "Verifier-grounded LLM design loop",
  node1Title: "LLM proposes geometry",
  node2Title: "Schema validation",
  node3Title: "COMSOL simulation",
  node4Title: "Deterministic verifier",
  node5Title: "Memory update",
  node6Title: "Next candidate",
  verifierMetrics: "phase coverage, transmission, smoothness, fabrication constraints",
  showPositiveNegativeTransfer: true
}
```

Layout:

```text
Block workflow.
Use distinct colors for proposal, simulation, verification, and memory.
Include pass/fail branch if space allows.
```

Acceptance criteria:

```text
The diagram should be useful for a slide or research paper method overview.
Do not include detailed COMSOL screenshots.
No API integration is needed.
```

---

## 10. User interface design

MVP layout:

```text
Top toolbar:
- Template selector
- Theme selector
- Save JSON
- Load JSON
- Export SVG
- Export PNG
- Validate

Left sidebar:
- Parameter controls
- Canvas controls
- Style controls

Center:
- SVG preview

Right sidebar:
- Validation messages
- Asset/license metadata
- Optional template notes
```

No backend required.

---

## 11. Export requirements

### 11.1 Export SVG

Implement:

```ts
export function exportSvg(svgElement: SVGSVGElement, options: ExportOptions): string
```

Requirements:

```text
Return a standalone SVG string.
Include viewBox.
Include xmlns.
Inline critical styles.
Keep text as SVG <text>.
Do not convert text to path.
Do not use external CSS dependencies.
Preserve semantic group IDs.
```

### 11.2 Export PNG

Implement browser-based SVG-to-canvas export:

```text
Serialize SVG.
Create Blob URL.
Load into Image.
Draw into canvas.
Export PNG.
```

Requirements:

```text
Support transparent and white background.
Support scale factor such as 1x, 2x, 4x.
Warn if external images are present.
```

### 11.3 Export JSON

Save the full `FigureDocument`.

Requirements:

```text
JSON should be enough to reconstruct the figure exactly.
Include template ID, params, theme, canvas size, notes, and asset license metadata.
```

---

## 12. SVG validation

Implement a simple validation panel.

Checks:

```text
1. Missing title.
2. Missing required labels.
3. Raster image detected in SVG.
4. Text converted to paths.
5. Unknown external asset license.
6. Missing attribution for CC BY assets.
7. Too-small font size.
8. Too-thin stroke width.
9. Missing semantic layer groups.
10. SVG export fails.
```

The validation does not need to judge scientific correctness.

---

## 13. External asset library

Use external SVG assets only as optional reusable icons.

Do not auto-download assets in MVP. The user can manually place assets in:

```text
public/assets/icons/
```

Add metadata:

```json
[
  {
    "id": "tissue-layer-basic",
    "name": "Tissue layer",
    "category": "biomedical",
    "file": "tissue-layer-basic.svg",
    "source": "custom",
    "license": "custom",
    "attributionRequired": false,
    "tags": ["tissue", "PAI", "biomedical"]
  }
]
```

Asset requirements:

```text
Keep imported SVG vector-based.
Track license and attribution.
Do not mix unknown-license assets into exported figures silently.
Show license warning in validation panel.
```

Possible asset sources to document in README:

```text
Bioicons
SciDraw
Servier Medical Art
NIAID BioArt
User-created SVG components
BioRender exports, if license permits the intended use
```

Do not bundle third-party assets by default unless their license permits redistribution and attribution is included.

---

## 14. Styling goals

The visual style should be:

```text
Clean
Minimal
High contrast
Publication-oriented
Large readable labels
Consistent line width
Consistent arrowheads
Not cartoonish by default
Not hand-drawn by default
```

Add theme presets:

```text
Minimal grayscale
Optics blue/orange
Biomedical NIH-like
Presentation dark background
```

Do not overuse gradients or shadows. Keep figures easy to edit.

---

## 15. Testing plan

Use Vitest.

Minimum tests:

```text
1. Template registry contains all six initial templates.
2. Each template renders without crashing with default params.
3. Exported SVG contains xmlns and viewBox.
4. Exported SVG preserves <text> elements.
5. Exported SVG contains semantic layer groups.
6. Figure JSON round-trips correctly.
7. Validation detects raster <image> elements.
8. Validation detects missing license metadata.
```

Optional Playwright tests:

```text
1. Load app.
2. Select each template.
3. Change one parameter.
4. Export SVG.
5. Confirm downloaded file is non-empty.
```

---

## 16. Development milestones

### Milestone 1 — Scaffold

Tasks:

```text
Initialize Vite + React + TypeScript.
Install Tailwind.
Set up Vitest.
Create app shell.
Create template selector placeholder.
Create SVG preview placeholder.
```

Acceptance:

```text
npm install
npm run dev
npm run build
npm test
```

All should work.

---

### Milestone 2 — Core types and registry

Tasks:

```text
Implement FigureDocument type.
Implement FigureTemplate type.
Implement ControlSpec type.
Implement FigureTheme type.
Create default themes.
Create template registry with placeholder templates.
```

Acceptance:

```text
App can list six template names.
Selecting a template shows default params.
```

---

### Milestone 3 — SVG primitives

Tasks:

```text
Implement PanelFrame.
Implement TextLabel.
Implement Arrow.
Implement CurvedArrow.
Implement GaussianBeam.
Implement Wavefront.
Implement MetasurfacePostArray.
Implement TargetPlane.
Implement TissueLayer.
Implement Transducer.
Implement FiberBundle.
Implement BlockNode.
```

Acceptance:

```text
Create a primitive gallery page or debug route.
Each primitive renders visibly.
Props control position, size, color, and label.
```

---

### Milestone 4 — First two templates

Tasks:

```text
Implement metasurface-flat-top.
Implement fiber-vs-metasurface-pai.
Add controls for labels and main visual parameters.
```

Acceptance:

```text
Both templates produce visually understandable SVG figures.
Changing params updates SVG live.
```

---

### Milestone 5 — Remaining templates

Tasks:

```text
Implement side-fire-pai-geometry.
Implement adjoint-optimization-loop.
Implement meta-atom-library.
Implement llm-comsol-verifier-loop.
```

Acceptance:

```text
All six templates render from default params.
Each has at least 8 configurable fields.
```

---

### Milestone 6 — Export and save/load

Tasks:

```text
Implement export SVG.
Implement export PNG.
Implement save figure JSON.
Implement load figure JSON.
```

Acceptance:

```text
Exported SVG opens in browser and Inkscape.
Exported PNG looks like preview.
Loaded JSON reconstructs figure.
```

---

### Milestone 7 — Validation

Tasks:

```text
Implement SVG validator.
Implement figure validator.
Create ValidationPanel.
```

Acceptance:

```text
Validator shows warnings for:
- missing title
- raster images
- missing semantic groups
- unknown asset license
```

---

### Milestone 8 — Asset library

Tasks:

```text
Implement metadata parser for public/assets/icons/metadata.json.
Implement AssetBrowser.
Allow templates to reference optional assets by ID.
Include license metadata in FigureDocument.
```

Acceptance:

```text
User can add a custom SVG asset and metadata manually.
Asset appears in browser.
Validation shows license status.
```

---

### Milestone 9 — Polish and documentation

Tasks:

```text
Improve UI.
Improve default figure aesthetics.
Add README screenshots.
Add examples.
Add CONTRIBUTING.md.
Add figure design guidelines.
```

Acceptance:

```text
A new user can clone repo, run app, generate a figure, export SVG/PNG, and open the SVG in Inkscape.
```

---

## 17. README requirements

The README should explain:

```text
What the project is.
What it is not.
How to install.
How to run.
How to create a figure.
How to export SVG/PNG.
How to add external SVG assets.
How to track licenses and attribution.
Why no AI API is needed.
How to edit exported SVG in Inkscape/PowerPoint.
```

Include this statement:

```text
This tool generates deterministic SVG figures from structured templates. It does not use AI image generation and does not require a paid multimodal API.
```

---

## 18. Design guardrails

Follow these rules throughout development:

```text
Prefer deterministic SVG components over generated images.
Keep output editable.
Keep labels editable.
Keep code modular.
Keep templates separate from primitives.
Avoid hard-coded scientific claims.
Avoid implying exact physical scale unless a scale bar is explicitly shown.
No hidden API keys.
No paid cloud services.
No external network calls in the MVP.
```

---

## 19. Copilot issue breakdown

Create these GitHub issues and let Copilot implement them one by one.

### Issue 1: Scaffold the React/Vite/TypeScript app

Use the milestone 1 requirements.

### Issue 2: Implement core types, themes, and template registry

Use milestone 2 requirements.

### Issue 3: Implement SVG primitives and gallery

Use milestone 3 requirements.

### Issue 4: Implement metasurface flat-top template

Use template 1 specification.

### Issue 5: Implement fiber vs metasurface PAI comparison template

Use template 2 specification.

### Issue 6: Implement side-fire PAI geometry template

Use template 3 specification.

### Issue 7: Implement adjoint optimization loop template

Use template 4 specification.

### Issue 8: Implement meta-atom library template

Use template 5 specification.

### Issue 9: Implement LLM + COMSOL verifier loop template

Use template 6 specification.

### Issue 10: Implement SVG, PNG, and JSON export

Use milestone 6 requirements.

### Issue 11: Implement validation panel

Use milestone 7 requirements.

### Issue 12: Implement external SVG asset library metadata system

Use milestone 8 requirements.

### Issue 13: Polish UI and documentation

Use milestone 9 and README requirements.

---

## 20. Suggested Copilot coding-agent instruction

When assigning an issue to Copilot, include:

```text
Please implement this issue in small, reviewable commits. Preserve the existing architecture. Do not add a backend, database, AI API, ComfyUI integration, RAG, or full canvas editor. Keep output SVG editable and deterministic. Add tests for any new export, serialization, validation, or template-registry logic.
```

---

## 21. Manual verification checklist

Before considering the MVP complete:

```text
[ ] npm install succeeds.
[ ] npm run dev succeeds.
[ ] npm run build succeeds.
[ ] npm test succeeds.
[ ] Six templates are available.
[ ] Each template renders with default parameters.
[ ] Parameter edits update the preview live.
[ ] SVG export opens in browser.
[ ] SVG export opens in Inkscape.
[ ] SVG text remains editable.
[ ] PNG export works.
[ ] Figure JSON save/load works.
[ ] Validation panel reports useful warnings.
[ ] External asset metadata can be loaded.
[ ] README explains no AI API is required.
```

---

## 22. Future extensions after MVP

Only after the deterministic SVG tool is stable, consider:

```text
1. draw.io custom library export.
2. Excalidraw library export.
3. More optics primitives:
   - lens
   - mirror
   - objective
   - detector
   - camera
   - waveguide
   - sample holder
4. More metasurface primitives:
   - rectangular post
   - cylindrical post
   - rotated anisotropic post
   - substrate/superstrate
   - unit-cell inset
5. More publication presets:
   - Optics Express
   - IEEE
   - NIH proposal
6. Optional local ComfyUI inspiration panel.
```

The ComfyUI inspiration panel should not change the core architecture. It should only generate rough visual references and save them outside the final SVG pipeline.

---

## 23. Final definition of success

A successful MVP lets the user create a clean first draft of a scientific figure in less than 5 minutes, export it as editable SVG, and polish it in Inkscape or PowerPoint without relying on any paid AI image-generation or multimodal API.
