import React from 'react';
import { FigureTemplate } from '../../types/template';
import { MetasurfacePostArray, TextLabel } from '../../primitives';

export const metaAtomLibrary: FigureTemplate = {
  id: "meta-atom-library",
  name: "Phase-only meta-atom library",
  description: "Show a phase-only meta-atom library with unit cells, varying geometry.",
  category: "metaAtom",
  defaultParams: {
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
  },
  controls: [
    { type: "text", key: "title", label: "Title" },
    { type: "number", key: "unitCellCount", label: "Unit Cell Count" }
  ],
  render: (params, theme) => {
    return (
      <svg width={800} height={300} viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
        <text x={400} y={30} fontSize={theme.fontSize.title} fontWeight="bold" textAnchor="middle" fontFamily={theme.fontFamily}>{params.title}</text>
        
        {/* Cells */}
        {[...Array(params.unitCellCount)].map((_, i) => (
          <g key={i} transform={`translate(${100 + i * 80}, 150)`}>
             <rect x={-30} y={-30} width={60} height={60} fill="none" stroke="#ccc" strokeDasharray="4 2" />
             <rect x={-10} y={-20} width={10 + i * 4} height={40} fill={theme.colors.primary} transform={`rotate(${i * 15})`} />
             <text x={0} y={50} textAnchor="middle" fontSize="12">{(i * (360 / params.unitCellCount)).toFixed(0)}°</text>
          </g>
        ))}

        <TextLabel groupId="textlabel-3"  x={400} y={250} text={params.phaseLabel} anchor="middle" fontSize="16" color={theme.colors.secondary} />
      </svg>
    );
  }
};
