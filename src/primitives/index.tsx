import React from 'react';

export interface Point {
  x: number;
  y: number;
}

export interface ArrowProps {
  groupId: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  strokeWidth?: number;
  label?: string;
}

export function Arrow({ groupId, x1, y1, x2, y2, color = "black", strokeWidth = 2, label }: ArrowProps) {
  const markerId = `${groupId}-arrowhead`;
  return (
    <g id={groupId}>
      <defs>
        <marker id={markerId} markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill={color} />
        </marker>
      </defs>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={strokeWidth}
        markerEnd={`url(#${markerId})`}
      />
      {label && (
        <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 5} textAnchor="middle" fontSize="12" fill={color}>
          {label}
        </text>
      )}
    </g>
  );
}

export interface CurvedArrowProps {
  groupId: string;
  start: Point;
  controlPoint: Point;
  end: Point;
  color?: string;
  strokeWidth?: number;
  label?: string;
}

export function CurvedArrow({ groupId, start, controlPoint, end, color = "black", strokeWidth = 2, label }: CurvedArrowProps) {
  const markerId = `${groupId}-arrowhead`;
  return (
    <g id={groupId}>
      <defs>
        <marker id={markerId} markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill={color} />
        </marker>
      </defs>
      <path
        d={`M ${start.x} ${start.y} Q ${controlPoint.x} ${controlPoint.y} ${end.x} ${end.y}`}
        fill="transparent"
        stroke={color}
        strokeWidth={strokeWidth}
        markerEnd={`url(#${markerId})`}
      />
      {label && (
        <text x={controlPoint.x} y={controlPoint.y - 10} textAnchor="middle" fontSize="12" fill={color}>
          {label}
        </text>
      )}
    </g>
  );
}

export interface TextLabelProps {
  groupId: string;
  x: number;
  y: number;
  text: string;
  anchor?: "start" | "middle" | "end" | "inherit";
  fontSize?: number | string;
  color?: string;
}

export function TextLabel({ groupId, x, y, text, anchor = "start", fontSize = "12", color = "black" }: TextLabelProps) {
  return (
    <g id={groupId}>
      <text x={x} y={y} textAnchor={anchor} fontSize={fontSize} fill={color}>
        {text}
      </text>
    </g>
  );
}

export interface PanelFrameProps {
  groupId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  panelLabel?: string;
  title?: string;
}

export function PanelFrame({ groupId, x, y, width, height, panelLabel, title }: PanelFrameProps) {
  return (
    <g id={groupId}>
      <rect x={x} y={y} width={width} height={height} fill="none" stroke="#ccc" strokeWidth="1" />
      {panelLabel && (
        <text x={x + 10} y={y + 20} fontWeight="bold" fontSize="16">{panelLabel}</text>
      )}
      {title && (
        <text x={x + width / 2} y={y + 20} textAnchor="middle" fontSize="14">{title}</text>
      )}
    </g>
  );
}

export interface GaussianBeamProps {
  groupId: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  waistStart: number;
  waistEnd: number;
  color: string;
  opacity?: number;
}

export function GaussianBeam({ groupId, x1, y1, x2, y2, waistStart, waistEnd, color, opacity = 0.3 }: GaussianBeamProps) {
  return (
    <g id={groupId}>
      <path d={`M ${x1} ${y1 - waistStart} L ${x2} ${y2 - waistEnd} L ${x2} ${y2 + waistEnd} L ${x1} ${y1 + waistStart} Z`} fill={color} opacity={opacity} />
    </g>
  );
}

export interface MetasurfacePostArrayProps {
  groupId: string;
  x: number;
  y: number;
  rows: number;
  period: number;
  color: string;
  label?: string;
}

export function MetasurfacePostArray({ groupId, x, y, rows, period, color, label }: MetasurfacePostArrayProps) {
  return (
    <g id={groupId}>
      <rect x={x - 5} y={y - rows*period/2} width={10} height={rows*period} fill={color} />
      {label && <text x={x} y={y + rows*period/2 + 15} textAnchor="middle" fontSize="12">{label}</text>}
    </g>
  );
}

export interface TargetPlaneProps {
  groupId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  label?: string;
}

export function TargetPlane({ groupId, x, y, width, height, color, label }: TargetPlaneProps) {
  return (
    <g id={groupId}>
      <rect x={x} y={y} width={width} height={height} fill={color} opacity="0.5" />
      {label && <text x={x + width/2} y={y - 10} textAnchor="middle" fontSize="12">{label}</text>}
    </g>
  );
}

export interface TissueLayerProps {
  groupId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  label?: string;
}

export function TissueLayer({ groupId, x, y, width, height, color = "#f5deb3", label }: TissueLayerProps) {
  return (
    <g id={groupId}>
      <rect x={x} y={y} width={width} height={height} fill={color} opacity="0.6" />
      {label && <text x={x + width/2} y={y + 15} textAnchor="middle" fontSize="12" fill="#666">{label}</text>}
    </g>
  );
}

export interface TransducerProps {
  groupId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
}

export function Transducer({ groupId, x, y, width, height, label }: TransducerProps) {
  return (
    <g id={groupId}>
      <rect x={x} y={y} width={width} height={height} fill="#555" />
      <path d={`M ${x} ${y + height} Q ${x + width/2} ${y + height + 10} ${x + width} ${y + height}`} fill="#999" />
      {label && <text x={x + width/2} y={y - 10} textAnchor="middle" fontSize="12">{label}</text>}
    </g>
  );
}

export interface FiberBundleProps {
  groupId: string;
  x: number;
  y: number;
  length: number;
  radius: number;
  label?: string;
}

export function FiberBundle({ groupId, x, y, length, radius, label }: FiberBundleProps) {
  return (
    <g id={groupId}>
      <rect x={x} y={y} width={length} height={radius*2} fill="#ccc" />
      {label && <text x={x + length/2} y={y - 10} textAnchor="middle" fontSize="12">{label}</text>}
    </g>
  );
}

export interface WavefrontProps {
  groupId: string;
  originX: number;
  originY: number;
  count: number;
  radiusStart: number;
  radiusStep: number;
  color: string;
}

export function Wavefront({ groupId, originX, originY, count, radiusStart, radiusStep, color }: WavefrontProps) {
  return (
    <g id={groupId}>
      {[...Array(count)].map((_, i) => (
        <circle key={i} cx={originX} cy={originY} r={radiusStart + i*radiusStep} fill="none" stroke={color} strokeWidth="1" strokeDasharray="4 2" />
      ))}
    </g>
  );
}

export interface BlockNodeProps {
  groupId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  subtitle?: string;
  color?: string;
}

export function BlockNode({ groupId, x, y, width, height, title, subtitle, color = "#fff" }: BlockNodeProps) {
  return (
    <g id={groupId}>
      <rect x={x} y={y} width={width} height={height} fill={color} stroke="#333" strokeWidth="2" rx="4" />
      <text x={x + width/2} y={y + height/2 + 5} textAnchor="middle" fontSize="14" fontWeight="bold">{title}</text>
      {subtitle && <text x={x + width/2} y={y + height/2 + 20} textAnchor="middle" fontSize="10">{subtitle}</text>}
    </g>
  );
}
