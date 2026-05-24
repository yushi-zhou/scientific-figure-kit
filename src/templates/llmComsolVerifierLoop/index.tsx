import React from 'react';
import { FigureTemplate } from '../../types/template';
import { BlockNode, CurvedArrow } from '../../primitives';

export const llmComsolVerifierLoop: FigureTemplate = {
  id: "llm-comsol-verifier-loop",
  name: "Verifier-grounded LLM design loop",
  description: "Show a tool-using LLM workflow for simulation-grounded EM component design.",
  category: "workflow",
  defaultParams: {
    title: "Verifier-grounded LLM design loop",
    node1Title: "LLM proposes geometry",
    node2Title: "Schema validation",
    node3Title: "COMSOL simulation",
    node4Title: "Deterministic verifier",
    node5Title: "Memory update",
    node6Title: "Next candidate",
    verifierMetrics: "phase coverage, transmission, smoothness",
    showPositiveNegativeTransfer: true
  },
  controls: [
    { type: "text", key: "title", label: "Title" }
  ],
  render: (params, theme) => {
    return (
      <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
        <text x="400" y="40" fontSize={theme.fontSize.title} fontWeight="bold" textAnchor="middle" fontFamily={theme.fontFamily}>{params.title}</text>
        
        <BlockNode groupId="n1" x="50" y="200" width="180" height="60" title={params.node1Title} color="#e3f2fd" />
        <BlockNode groupId="n2" x="310" y="100" width="180" height="60" title={params.node2Title} color="#f3e5f5" />
        <BlockNode groupId="n3" x="570" y="200" width="180" height="60" title={params.node3Title} color="#fff3e0" />
        <BlockNode groupId="n4" x="440" y="350" width="180" height="60" title={params.node4Title} subtitle={params.verifierMetrics} color="#e8f5e9" />
        <BlockNode groupId="n5" x="180" y="350" width="180" height="60" title={params.node5Title} color="#fce4ec" />

        <CurvedArrow start={{x: 140, y: 200}} end={{x: 310, y: 130}} controlPoint={{x: 225, y: 150}} color={theme.colors.primary} />
        <CurvedArrow start={{x: 490, y: 130}} end={{x: 660, y: 200}} controlPoint={{x: 575, y: 150}} color={theme.colors.primary} />
        <CurvedArrow start={{x: 660, y: 260}} end={{x: 530, y: 350}} controlPoint={{x: 595, y: 305}} color={theme.colors.secondary} />
        <CurvedArrow start={{x: 440, y: 380}} end={{x: 360, y: 380}} controlPoint={{x: 400, y: 380}} color={theme.colors.accent} />
        <CurvedArrow start={{x: 180, y: 380}} end={{x: 140, y: 260}} controlPoint={{x: 160, y: 320}} color={theme.colors.accent} label="Feedback loop" />

      </svg>
    );
  }
};
