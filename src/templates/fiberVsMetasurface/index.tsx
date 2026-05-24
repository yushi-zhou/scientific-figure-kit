import React from 'react';
import { FigureTemplate } from '../../types/template';
import { TissueLayer, Transducer, FiberBundle, TargetPlane, MetasurfacePostArray, GaussianBeam, PanelFrame, TextLabel } from '../../primitives';

export const fiberVsMetasurface: FigureTemplate = {
  id: "fiber-vs-metasurface-pai",
  name: "PAI illumination comparison",
  description: "Compare conventional fiber-bundle illumination with proposed metasurface-based beam shaping for photoacoustic imaging.",
  category: "pai",
  defaultParams: {
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
  },
  controls: [
    { type: "text", key: "title", label: "Title" },
    { type: "text", key: "leftTitle", label: "Panel A Title" },
    { type: "text", key: "rightTitle", label: "Panel B Title" }
  ],
  render: (params, theme) => {
    return (
      <svg width={800} height={500} viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
        <text x={400} y={30} fontSize={theme.fontSize.title} fontWeight="bold" textAnchor="middle" fontFamily={theme.fontFamily}>{params.title}</text>
        
        {/* Panel A */}
        <g id="panel_A">
          <PanelFrame groupId="layer_frame_A" x={20} y={60} width={370} height={420} title={params.leftTitle} panelLabel={params.showPanelLetters ? "A" : ""}  />
          <TissueLayer groupId="layer_tissue_A" x={40} y={250} width={330} height={200} label={params.tissueLabel} color={theme.colors.tissue} />
          <TargetPlane groupId="layer_absorber_A" x={180} y={320} width={50} height={30} label={params.absorberLabel} color="#333" />
          <Transducer groupId="layer_transducer_A" x={155} y={100} width={100} height={40} label={params.transducerLabel} />
          <FiberBundle groupId="layer_device_A" x={70} y={140} length={50} radius={10} label="Fiber bundle" />
          <FiberBundle groupId="layer_device_A2" x={290} y={140} length={50} radius={10} />
          <TextLabel groupId="textlabel-1"  x={205} y={440} text={params.leftProblem1} anchor="middle" color={theme.colors.warning} />
        </g>

        {/* Panel B */}
        <g id="panel_B">
          <PanelFrame groupId="layer_frame_B" x={410} y={60} width={370} height={420} title={params.rightTitle} panelLabel={params.showPanelLetters ? "B" : ""}  />
          <TissueLayer groupId="layer_tissue_B" x={430} y={250} width={330} height={200} label={params.tissueLabel} color={theme.colors.tissue} />
          <TargetPlane groupId="layer_absorber_B" x={570} y={320} width={50} height={30} label={params.absorberLabel} color="#333" />
          <Transducer groupId="layer_transducer_B" x={545} y={100} width={100} height={40} label={params.transducerLabel} />
          <GaussianBeam groupId="layer_beam_B" x1={595} y1={140} x2={595} y2={250} waistStart={20} waistEnd={40} color={theme.colors.primary} />
          <MetasurfacePostArray groupId="layer_device_B" x={595} y={240} rows={12} period={6} color={theme.colors.target} label="Metasurface" />
          <TextLabel groupId="textlabel-2"  x={595} y={440} text={params.rightBenefit2} anchor="middle" color={theme.colors.accent} />
        </g>
      </svg>
    );
  }
};
