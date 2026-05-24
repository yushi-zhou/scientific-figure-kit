# Scientific Figure Kit

**Scientific Figure Kit** is a local-first, deterministic web application for generating high-quality edge-editable scalable vector graphics (SVG) focused on scientific optics, photoacoustic imaging, layouts, and system loops.

**Important Note:** This project is a parameter-based deterministic template generator. It does **not** employ any LLM prompt-to-image AI routines, nor does it rely on Midjourney/Stable Diffusion routines. Generated outputs are 100% SVG structures and easily manually editable using standards like Vector or Inkscape routines.

## Table of Contents

- [Purpose](#purpose)
- [Available Templates](#available-templates)
- [Setup & Scripts](#setup--scripts)
- [Roadmap](#roadmap)

## Purpose
Creating clear and standardized scientific architectures (like setup, geometry layouts, workflows, component layers). You configure the dimensions and text values using simple parameter sets via sidebars, providing reproducible and highly precise vectors for Word, Draw.io, Figma, or LaTeX targets.

## Available Templates
Our MVP currently bundles the following core scientific layouts:
- **Metasurface flat-top generation**: A beam passing through optics outputting specific projection distances.
- **PAI illumination comparison**: Traditional Fiber Vs Side-Fire Metasurfaces
- **Side-fire PAI geometry**: Setup Geometry highlighting lateral illumination.
- **Adjoint inverse-design loop**: Circular block workflows showcasing loss mechanisms.
- **Phase-only meta-atom library**: Variable sub-wavelength transmission units.
- **Verifier-grounded LLM design loop**: High-level block feedback diagram structures.

## Setup & Scripts

Make sure you have [Node.js](https://nodejs.org/) installed.

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Format code
npm run format

# Run ESLint validation
npm run lint

# Run unit tests
npm test

# Build for production
npm run build
```

## Roadmap
1. [In-progress] CI Integrations & Engineering Quality Baselines
2. Extensible robust SVG Type interfaces. 
3. Expanded advanced parameter rendering logic.
4. Flexible export channels (PNG, configuration JSON).
5. Detailed layouts & external asset library loading support.
