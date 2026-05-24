import React from 'react';
import { FigureTemplate } from '../../types/template';
import { GaussianBeam, MetasurfacePostArray, TargetPlane, Arrow, TextLabel } from '../../primitives';

export const metasurfaceFlatTop: FigureTemplate = {
  id: "metasurface-flat-top",
  name: "Metasurface flat-top generation",
  description: "Show a Gaussian input beam passing through a metasurface and forming a uniform square target field at a working distance.",
  category: "optics",
  defaultParams: {
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
  },
  controls: [
    { type: "text", key: "title", label: "Title" },
    { type: "text", key: "wavelengthLabel", label: "Wavelength Label" },
  ],
  render: (params, theme) => {
    return (
      <svg width={800} height={400} viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <text x={400} y={30} fontSize={theme.fontSize.title} fontWeight="bold" textAnchor="middle" fontFamily={theme.fontFamily}>
          {params.title}
        </text>
        
        {/* Input Beam */}
        <GaussianBeam groupId="layer_beam" x1={100} y1={200} x2={350} y2={200} waistStart={40} waistEnd={20} color={theme.colors.beam} />
        <TextLabel groupId="layer_labels" x={200} y={150} text={params.inputBeamLabel} anchor="middle" fontSize={theme.fontSize.label} />
        
        {/* Metasurface */}
        <MetasurfacePostArray groupId="layer_metasurface" x={350} y={200} rows={params.visiblePostCount} period={10} color={theme.colors.device} label={params.metasurfaceLabel} />
        <TextLabel groupId="layer_labels" x={350} y={290} text={params.materialLabel} anchor="middle" fontSize={theme.fontSize.small} color={theme.colors.mutedText} />
        
        {/* Output Beam (simplified) */}
        <GaussianBeam groupId="layer_beam_out" x1={350} y1={200} x2={650} y2={200} waistStart={20} waistEnd={60} color={theme.colors.target} opacity={0.2} />

        {/* Target Plane */}
        <TargetPlane groupId="layer_target" x={650} y={140} width={20} height={120} color={theme.colors.primary} label={params.outputFieldLabel} />
        <TextLabel groupId="layer_labels" x={690} y={200} text={params.targetSizeLabel} anchor="start" fontSize={theme.fontSize.small} />

        {/* Working Distance Arrow */}
        <Arrow groupId="layer_annotations" x1={360} y1={320} x2={640} y2={320} label={params.workingDistanceLabel} color={theme.colors.text} />
      </svg>
    );
  }
};
