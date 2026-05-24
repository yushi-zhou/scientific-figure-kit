import React from 'react';
import { FigureTemplate } from '../../types/template';
import { TissueLayer, Transducer, TargetPlane, MetasurfacePostArray, GaussianBeam, Wavefront, TextLabel } from '../../primitives';

export const sideFirePAI: FigureTemplate = {
  id: "side-fire-pai-geometry",
  name: "Side-fire PAI geometry",
  description: "Show side illumination geometry for integrating a metasurface beam shaper with a photoacoustic imaging setup.",
  category: "pai",
  defaultParams: {
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
  },
  controls: [
    { type: "text", key: "title", label: "Title" },
    { type: "toggle", key: "showAcousticWave", label: "Show Acoustic Wave" },
  ],
  render: (params, theme) => {
    return (
      <svg width="600" height="500" viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
        <text x="300" y="30" fontSize={theme.fontSize.title} fontWeight="bold" textAnchor="middle" fontFamily={theme.fontFamily}>{params.title}</text>
        
        {/* Tissue */}
        <TissueLayer groupId="layer_tissue" x="150" y="150" width="300" height="300" label={params.tissueLabel} color={theme.colors.tissue} />
        
        {/* Components */}
        {params.showProtectiveLayer && <rect x="150" y="130" width="300" height="20" fill="#ccc" />}
        <Transducer groupId="layer_device" x="250" y="70" width="100" height="60" label={params.transducerLabel} />
        
        {/* Side Illumination */}
        <GaussianBeam groupId="layer_beam" x1="50" y1="250" x2="150" y2="250" waistStart={10} waistEnd={10} color={theme.colors.beam} />
        <MetasurfacePostArray groupId="layer_metasurface" x="140" y="250" rows={10} period={8} color={theme.colors.device} label={params.metasurfaceLabel} />
        <GaussianBeam groupId="layer_beam_inside" x1="150" y1="250" x2="300" y2="300" waistStart={15} waistEnd={30} color={theme.colors.primary} opacity={0.3}/>
        
        {/* Absorber & Wave */}
        <TargetPlane groupId="layer_absorber" x="280" y="280" width="40" height="40" label={params.absorberLabel} color="#333" />
        {params.showAcousticWave && (
          <Wavefront groupId="layer_acoustic" originX={300} originY={280} radiusStart={30} radiusStep={20} count={5} color={theme.colors.acoustic} />
        )}
      </svg>
    );
  }
};
