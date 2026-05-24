import React from 'react';

export function Arrow(props: any) {
  return (
    <g id={props.groupId}>
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill={props.color || "black"} />
        </marker>
      </defs>
      <line
        x1={props.x1}
        y1={props.y1}
        x2={props.x2}
        y2={props.y2}
        stroke={props.color || "black"}
        strokeWidth={props.strokeWidth || 2}
        markerEnd="url(#arrowhead)"
      />
      {props.label && (
        <text x={(props.x1 + props.x2) / 2} y={(props.y1 + props.y2) / 2 - 5} textAnchor="middle" fontSize="12" fill={props.color || "black"}>
          {props.label}
        </text>
      )}
    </g>
  );
}

export function CurvedArrow(props: any) {
  return (
    <g id={props.groupId}>
      <path
        d={`M ${props.start.x} ${props.start.y} Q ${props.controlPoint.x} ${props.controlPoint.y} ${props.end.x} ${props.end.y}`}
        fill="transparent"
        stroke={props.color || "black"}
        strokeWidth={props.strokeWidth || 2}
        markerEnd="url(#arrowhead)"
      />
      {props.label && (
        <text x={props.controlPoint.x} y={props.controlPoint.y - 10} textAnchor="middle" fontSize="12" fill={props.color || "black"}>
          {props.label}
        </text>
      )}
    </g>
  );
}

export function TextLabel(props: any) {
  return (
    <g id={props.groupId}>
      <text x={props.x} y={props.y} textAnchor={props.anchor || "start"} fontSize={props.fontSize || "12"} fill={props.color || "black"}>
        {props.text}
      </text>
    </g>
  );
}

export function PanelFrame(props: any) {
  return (
    <g id={props.groupId}>
      <rect x={props.x} y={props.y} width={props.width} height={props.height} fill="none" stroke="#ccc" strokeWidth="1" />
      {props.panelLabel && (
        <text x={props.x + 10} y={props.y + 20} fontWeight="bold" fontSize="16">{props.panelLabel}</text>
      )}
      {props.title && (
        <text x={props.x + props.width / 2} y={props.y + 20} textAnchor="middle" fontSize="14">{props.title}</text>
      )}
    </g>
  );
}

export function GaussianBeam(props: any) {
  return (
    <g id={props.groupId}>
      <path d={`M ${props.x1} ${props.y1 - props.waistStart} L ${props.x2} ${props.y2 - props.waistEnd} L ${props.x2} ${props.y2 + props.waistEnd} L ${props.x1} ${props.y1 + props.waistStart} Z`} fill={props.color} opacity={props.opacity || 0.3} />
    </g>
  );
}

export function MetasurfacePostArray(props: any) {
  return (
    <g id={props.groupId}>
      <rect x={props.x - 5} y={props.y - props.rows*props.period/2} width={10} height={props.rows*props.period} fill={props.color} />
      {props.label && <text x={props.x} y={props.y + props.rows*props.period/2 + 15} textAnchor="middle" fontSize="12">{props.label}</text>}
    </g>
  );
}

export function TargetPlane(props: any) {
  return (
    <g id={props.groupId}>
      <rect x={props.x} y={props.y} width={props.width} height={props.height} fill={props.color} opacity="0.5" />
      {props.label && <text x={props.x + props.width/2} y={props.y - 10} textAnchor="middle" fontSize="12">{props.label}</text>}
    </g>
  );
}

export function TissueLayer(props: any) {
  return (
    <g id={props.groupId}>
      <rect x={props.x} y={props.y} width={props.width} height={props.height} fill={props.color || "#f5deb3"} opacity="0.6" />
      {props.label && <text x={props.x + props.width/2} y={props.y + 15} textAnchor="middle" fontSize="12" fill="#666">{props.label}</text>}
    </g>
  );
}

export function Transducer(props: any) {
  return (
    <g id={props.groupId}>
      <rect x={props.x} y={props.y} width={props.width} height={props.height} fill="#555" />
      <path d={`M ${props.x} ${props.y + props.height} Q ${props.x + props.width/2} ${props.y + props.height + 10} ${props.x + props.width} ${props.y + props.height}`} fill="#999" />
      {props.label && <text x={props.x + props.width/2} y={props.y - 10} textAnchor="middle" fontSize="12">{props.label}</text>}
    </g>
  );
}

export function FiberBundle(props: any) {
  return (
    <g id={props.groupId}>
      <rect x={props.x} y={props.y} width={props.length} height={props.radius*2} fill="#ccc" />
      {props.label && <text x={props.x + props.length/2} y={props.y - 10} textAnchor="middle" fontSize="12">{props.label}</text>}
    </g>
  );
}

export function Wavefront(props: any) {
  return (
    <g id={props.groupId}>
      {[...Array(props.count)].map((_, i) => (
        <circle key={i} cx={props.originX} cy={props.originY} r={props.radiusStart + i*props.radiusStep} fill="none" stroke={props.color} strokeWidth="1" strokeDasharray="4 2" />
      ))}
    </g>
  );
}

export function BlockNode(props: any) {
  return (
    <g id={props.groupId}>
      <rect x={props.x} y={props.y} width={props.width} height={props.height} fill={props.color || "#fff"} stroke="#333" strokeWidth="2" rx="4" />
      <text x={props.x + props.width/2} y={props.y + props.height/2 + 5} textAnchor="middle" fontSize="14" fontWeight="bold">{props.title}</text>
      {props.subtitle && <text x={props.x + props.width/2} y={props.y + props.height/2 + 20} textAnchor="middle" fontSize="10">{props.subtitle}</text>}
    </g>
  );
}
