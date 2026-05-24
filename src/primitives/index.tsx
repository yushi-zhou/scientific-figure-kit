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
  opacity?: number;
}

export function TargetPlane({ groupId, x, y, width, height, color, label, opacity = 0.5 }: TargetPlaneProps) {
  return (
    <g id={groupId}>
      <rect x={x} y={y} width={width} height={height} fill={color} opacity={opacity} />
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

export interface PropagationRegionProps {
  groupId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  color?: string;
  opacity?: number;
}

export function PropagationRegion({ groupId, x, y, width, height, label, color = '#dbeafe', opacity = 0.22 }: PropagationRegionProps) {
  const rayCount = 5;

  return (
    <g id={groupId}>
      <rect x={x} y={y} width={width} height={height} fill={color} opacity={opacity} stroke="#93c5fd" strokeDasharray="5 4" strokeWidth="1.5" rx="14" />
      {Array.from({ length: rayCount }).map((_, index) => {
        const rayY = y + 28 + index * ((height - 56) / Math.max(1, rayCount - 1));
        const path = `M ${x + 16} ${rayY} C ${x + width * 0.28} ${rayY - 10}, ${x + width * 0.62} ${rayY + 10}, ${x + width - 18} ${rayY}`;

        return <path key={index} d={path} fill="none" stroke="#60a5fa" strokeOpacity="0.45" strokeWidth="1.5" />;
      })}
      {label && <text x={x + width / 2} y={y + 22} textAnchor="middle" fontSize="13" fill="#1f2937">{label}</text>}
    </g>
  );
}

export interface MetasurfacePostLatticeProps {
  groupId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  count: number;
  rows?: number;
  color?: string;
  backgroundColor?: string;
  opacity?: number;
  label?: string;
}

export function MetasurfacePostLattice({
  groupId,
  x,
  y,
  width,
  height,
  count,
  rows = 2,
  color = '#0f766e',
  backgroundColor = '#ecfeff',
  opacity = 0.9,
  label,
}: MetasurfacePostLatticeProps) {
  const safeCount = Math.max(1, Math.floor(count));
  const safeRows = Math.max(1, Math.floor(rows));
  const columns = Math.max(1, Math.ceil(safeCount / safeRows));
  const horizontalSpacing = width / (columns + 1);
  const verticalSpacing = height / (safeRows + 1);
  const posts: React.ReactNode[] = [];

  for (let index = 0; index < safeCount; index += 1) {
    const row = index % safeRows;
    const column = Math.floor(index / safeRows);
    const centerX = x + horizontalSpacing * (column + 1);
    const centerY = y + verticalSpacing * (row + 1);
    const phase = index * 0.72;
    const postHeight = 26 + ((Math.sin(phase) + 1) / 2) * 28;
    const postWidth = 8 + ((Math.cos(phase * 0.8) + 1) / 2) * 8;
    const postOpacity = 0.58 + ((Math.sin(phase * 1.4) + 1) / 2) * 0.38;

    posts.push(
      <rect
        key={index}
        x={centerX - postWidth / 2}
        y={centerY - postHeight / 2}
        width={postWidth}
        height={postHeight}
        rx="2"
        fill={color}
        opacity={Math.min(1, postOpacity * opacity)}
      />
    );
  }

  return (
    <g id={groupId}>
      <rect x={x} y={y} width={width} height={height} fill={backgroundColor} opacity="0.75" stroke="#9ca3af" strokeWidth="1.2" rx="12" />
      {posts}
      <line x1={x + 8} y1={y + height - 10} x2={x + width - 8} y2={y + height - 10} stroke="#6b7280" strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />
      {label && <text x={x + width / 2} y={y + height + 24} textAnchor="middle" fontSize="13" fill="#374151">{label}</text>}
    </g>
  );
}

export interface CoordinateAxisProps {
  groupId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  xLabel?: string;
  yLabel?: string;
  color?: string;
}

export function CoordinateAxis({ groupId, x, y, width, height, xLabel = 'x', yLabel = 'z', color = '#6b7280' }: CoordinateAxisProps) {
  return (
    <g id={groupId}>
      <line x1={x} y1={y + height} x2={x + width} y2={y + height} stroke={color} strokeWidth="1.5" />
      <polygon points={`${x + width},${y + height} ${x + width - 8},${y + height - 4} ${x + width - 8},${y + height + 4}`} fill={color} />
      <line x1={x} y1={y + height} x2={x} y2={y} stroke={color} strokeWidth="1.5" />
      <polygon points={`${x},${y} ${x - 4},${y + 8} ${x + 4},${y + 8}`} fill={color} />
      <text x={x + width + 8} y={y + height + 4} fontSize="12" fill={color}>{xLabel}</text>
      <text x={x - 8} y={y - 4} fontSize="12" fill={color}>{yLabel}</text>
    </g>
  );
}

export interface ScaleBarProps {
  groupId: string;
  x: number;
  y: number;
  length: number;
  label: string;
  color?: string;
}

export function ScaleBar({ groupId, x, y, length, label, color = '#374151' }: ScaleBarProps) {
  return (
    <g id={groupId}>
      <line x1={x} y1={y} x2={x + length} y2={y} stroke={color} strokeWidth="2.5" />
      <line x1={x} y1={y - 5} x2={x} y2={y + 5} stroke={color} strokeWidth="2.5" />
      <line x1={x + length} y1={y - 5} x2={x + length} y2={y + 5} stroke={color} strokeWidth="2.5" />
      <text x={x + length / 2} y={y - 8} textAnchor="middle" fontSize="12" fill={color}>{label}</text>
    </g>
  );
}

export interface IntensityInsetProps {
  groupId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  color?: string;
  fill?: string;
  opacity?: number;
}

export function IntensityInset({ groupId, x, y, width, height, title, color = '#1f2937', fill = '#f8fafc', opacity = 0.95 }: IntensityInsetProps) {
  const insetX = x + 18;
  const insetY = y + 24;
  const insetWidth = width - 36;
  const insetHeight = height - 44;
  const flatTopX = insetX + insetWidth * 0.18;
  const flatTopY = insetY + insetHeight * 0.28;
  const flatTopWidth = insetWidth * 0.64;
  const flatTopHeight = insetHeight * 0.44;

  return (
    <g id={groupId}>
      <rect x={x} y={y} width={width} height={height} rx="14" fill={fill} opacity={opacity} stroke="#cbd5e1" strokeWidth="1.25" />
      <text x={x + width / 2} y={y + 18} textAnchor="middle" fontSize="13" fontWeight="bold" fill={color}>{title}</text>
      <line x1={insetX} y1={insetY + insetHeight} x2={insetX + insetWidth} y2={insetY + insetHeight} stroke="#94a3b8" strokeWidth="1" />
      <line x1={insetX} y1={insetY} x2={insetX} y2={insetY + insetHeight} stroke="#94a3b8" strokeWidth="1" />
      <path
        d={`M ${insetX} ${insetY + insetHeight * 0.98} C ${insetX + insetWidth * 0.08} ${insetY + insetHeight * 0.4}, ${insetX + insetWidth * 0.18} ${insetY + insetHeight * 0.12}, ${insetX + insetWidth * 0.32} ${insetY + insetHeight * 0.2} C ${insetX + insetWidth * 0.45} ${insetY + insetHeight * 0.28}, ${insetX + insetWidth * 0.55} ${insetY + insetHeight * 0.28}, ${insetX + insetWidth * 0.68} ${insetY + insetHeight * 0.2} C ${insetX + insetWidth * 0.82} ${insetY + insetHeight * 0.12}, ${insetX + insetWidth * 0.92} ${insetY + insetHeight * 0.4}, ${insetX + insetWidth} ${insetY + insetHeight * 0.98}`}
        fill="none"
        stroke="#60a5fa"
        strokeWidth="1.8"
      />
      <rect x={flatTopX} y={flatTopY} width={flatTopWidth} height={flatTopHeight} fill="#38bdf8" opacity="0.34" stroke="#0ea5e9" strokeWidth="1.6" />
      <line x1={insetX} y1={insetY + insetHeight * 0.82} x2={flatTopX} y2={insetY + insetHeight * 0.82} stroke="#94a3b8" strokeDasharray="3 3" strokeWidth="1" />
      <line x1={flatTopX + flatTopWidth} y1={insetY + insetHeight * 0.82} x2={insetX + insetWidth} y2={insetY + insetHeight * 0.82} stroke="#94a3b8" strokeDasharray="3 3" strokeWidth="1" />
      <text x={x + width / 2} y={y + height - 10} textAnchor="middle" fontSize="11" fill="#475569">uniform flat-top field</text>
    </g>
  );
}
