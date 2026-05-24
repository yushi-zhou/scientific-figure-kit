import React from 'react';
import { FigureTemplate } from '../../types/template';
import { BlockNode, CurvedArrow } from '../../primitives';

export const adjointOptimizationLoop: FigureTemplate = {
  id: "adjoint-optimization-loop",
  name: "Adjoint inverse-design loop",
  description: "Visualize the forward/adjoint optimization workflow for phase-only metasurface inverse design.",
  category: "workflow",
  defaultParams: {
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
  },
  controls: [
    { type: "text", key: "title", label: "Title" }
  ],
  render: (params, theme) => {
    return (
      <svg width={700} height={600} viewBox="0 0 700 600" xmlns="http://www.w3.org/2000/svg">
        <text x={350} y={40} fontSize={theme.fontSize.title} fontWeight="bold" textAnchor="middle" fontFamily={theme.fontFamily}>{params.title}</text>
        
        {/* Nodes */}
        <BlockNode groupId="node1" x={250} y={100} width={200} height={60} title={params.node1Title} color="#e0f7fa" />
        <BlockNode groupId="node2" x={450} y={200} width={200} height={60} title={params.node2Title} color="#fff9c4" />
        <BlockNode groupId="node3" x={450} y={400} width={200} height={60} title={params.node3Title} color="#ffecb3" />
        
        <BlockNode groupId="node4" x={50} y={400} width={200} height={60} title={params.node4Title} color="#ffe0b2" />
        <BlockNode groupId="node5" x={50} y={200} width={200} height={60} title={params.node5Title} color="#ffccbc" />

        <BlockNode groupId="node6" x={250} y={300} width={200} height={60} title={params.node6Title} color="#dcedc8" subtitle={params.optimizerLabel} />

        {/* Connections */}
        <CurvedArrow groupId="curve-1"  start={{x: 450, y: 130}} end={{x: 550, y: 200}} controlPoint={{x: 550, y: 130}} color={theme.colors.primary} />
        <CurvedArrow groupId="curve-2"  start={{x: 550, y: 260}} end={{x: 550, y: 400}} controlPoint={{x: 550, y: 330}} color={theme.colors.primary} />
        
        <CurvedArrow groupId="curve-3"  start={{x: 450, y: 430}} end={{x: 250, y: 430}} controlPoint={{x: 350, y: 430}} label={params.objectiveLabel} color={theme.colors.secondary} />
        <CurvedArrow groupId="curve-4"  start={{x: 150, y: 400}} end={{x: 150, y: 260}} controlPoint={{x: 150, y: 330}} color={theme.colors.secondary} />
        
        <CurvedArrow groupId="curve-5"  start={{x: 150, y: 200}} end={{x: 250, y: 130}} controlPoint={{x: 150, y: 130}} color={theme.colors.secondary} />

        <CurvedArrow groupId="curve-6"  start={{x: 250, y: 230}} end={{x: 350, y: 300}} controlPoint={{x: 300, y: 230}} color={theme.colors.accent} />
        <CurvedArrow groupId="curve-7"  start={{x: 350, y: 360}} end={{x: 350, y: 160}} controlPoint={{x: 350, y: 260}} color={theme.colors.accent} />

      </svg>
    );
  }
};
