import React from 'react';
import { FigureTemplate } from '../../types/template';
import { FigureTheme } from '../../types/theme';
import {
  Arrow,
  CoordinateAxis,
  GaussianBeam,
  IntensityInset,
  MetasurfacePostLattice,
  PropagationRegion,
  ScaleBar,
  TargetPlane,
  TextLabel,
} from '../../primitives';

export interface MetasurfaceFlatTopParams {
  title: string;
  wavelengthLabel: string;
  workingDistanceLabel: string;
  targetSizeLabel: string;
  inputBeamLabel: string;
  outputFieldLabel: string;
  metasurfaceLabel: string;
  materialLabel: string;
  periodLabel: string;
  visiblePostCount: number;
  showCoordinateAxis: boolean;
  showIntensityInset: boolean;
  showScaleBar: boolean;
  stylePreset: 'paper' | 'presentation';
  beamOpacity: number;
  targetOpacity: number;
}

const defaultParams: MetasurfaceFlatTopParams = {
  title: 'Metasurface flat-top generation',
  wavelengthLabel: 'λ = 750 nm',
  workingDistanceLabel: 'z = 300 µm',
  targetSizeLabel: '40 × 40 µm²',
  inputBeamLabel: 'Gaussian input beam',
  outputFieldLabel: 'Uniform flat-top target field',
  metasurfaceLabel: 'Phase-only metasurface',
  materialLabel: 'c-Si posts',
  periodLabel: 'p = 300 nm',
  visiblePostCount: 18,
  showCoordinateAxis: true,
  showIntensityInset: true,
  showScaleBar: true,
  stylePreset: 'paper',
  beamOpacity: 0.34,
  targetOpacity: 0.28,
};

function isNonEmpty(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function getThemePreset(stylePreset: MetasurfaceFlatTopParams['stylePreset'], theme: FigureTheme) {
  if (stylePreset === 'presentation') {
    return {
      beamColor: theme.colors.beam,
      targetColor: theme.colors.primary,
      latticeColor: theme.colors.device,
      accentColor: theme.colors.secondary,
      labelColor: theme.colors.text,
      mutedLabelColor: theme.colors.mutedText,
      regionFill: '#eff6ff',
    };
  }

  return {
    beamColor: theme.colors.beam,
    targetColor: theme.colors.primary,
    latticeColor: theme.colors.device,
    accentColor: theme.colors.secondary,
    labelColor: theme.colors.text,
    mutedLabelColor: theme.colors.mutedText,
    regionFill: '#f8fafc',
  };
}

export const metasurfaceFlatTop: FigureTemplate<MetasurfaceFlatTopParams> = {
  id: 'metasurface-flat-top',
  name: 'Metasurface flat-top generation',
  description: 'Show a Gaussian input beam passing through a metasurface and forming a uniform square target field at a working distance.',
  category: 'optics',
  defaultParams,
  controls: [
    { type: 'text', key: 'title', label: 'Title' },
    { type: 'text', key: 'wavelengthLabel', label: 'Wavelength Label' },
    { type: 'text', key: 'workingDistanceLabel', label: 'Working Distance Label' },
    { type: 'text', key: 'targetSizeLabel', label: 'Target Size Label' },
    { type: 'text', key: 'inputBeamLabel', label: 'Input Beam Label' },
    { type: 'text', key: 'outputFieldLabel', label: 'Output Field Label' },
    { type: 'text', key: 'metasurfaceLabel', label: 'Metasurface Label' },
    { type: 'text', key: 'materialLabel', label: 'Material Label' },
    { type: 'text', key: 'periodLabel', label: 'Period Label' },
    { type: 'number', key: 'visiblePostCount', label: 'Visible Post Count', min: 1, max: 48, step: 1 },
    {
      type: 'select',
      key: 'stylePreset',
      label: 'Style Preset',
      options: [
        { label: 'Paper', value: 'paper' },
        { label: 'Presentation', value: 'presentation' },
      ],
    },
    { type: 'number', key: 'beamOpacity', label: 'Beam Opacity', min: 0, max: 1, step: 0.05 },
    { type: 'number', key: 'targetOpacity', label: 'Target Opacity', min: 0, max: 1, step: 0.05 },
    { type: 'toggle', key: 'showCoordinateAxis', label: 'Show Coordinate Axis' },
    { type: 'toggle', key: 'showIntensityInset', label: 'Show Intensity Inset' },
    { type: 'toggle', key: 'showScaleBar', label: 'Show Scale Bar' },
  ],
  validate: (params) => {
    const issues: string[] = [];

    if (!isNonEmpty(params.title)) {
      issues.push('Title is required.');
    }
    if (!isNonEmpty(params.wavelengthLabel)) {
      issues.push('Wavelength label is required.');
    }
    if (!isNonEmpty(params.workingDistanceLabel)) {
      issues.push('Working distance label is required.');
    }
    if (!isNonEmpty(params.targetSizeLabel)) {
      issues.push('Target size label is required.');
    }
    if (!isNonEmpty(params.inputBeamLabel)) {
      issues.push('Input beam label is required.');
    }
    if (!isNonEmpty(params.outputFieldLabel)) {
      issues.push('Output field label is required.');
    }
    if (!isNonEmpty(params.metasurfaceLabel)) {
      issues.push('Metasurface label is required.');
    }
    if (!isNonEmpty(params.materialLabel)) {
      issues.push('Material label is required.');
    }
    if (!isNonEmpty(params.periodLabel)) {
      issues.push('Period label is required.');
    }
    if (!Number.isFinite(params.visiblePostCount) || params.visiblePostCount <= 0) {
      issues.push('Visible post count must be positive.');
    }
    if (!Number.isFinite(params.beamOpacity) || params.beamOpacity < 0 || params.beamOpacity > 1) {
      issues.push('Beam opacity must be between 0 and 1.');
    }
    if (!Number.isFinite(params.targetOpacity) || params.targetOpacity < 0 || params.targetOpacity > 1) {
      issues.push('Target opacity must be between 0 and 1.');
    }

    return issues;
  },
  render: (params, theme) => {
    const style = getThemePreset(params.stylePreset, theme);
    const latticeWidth = 118;
    const latticeHeight = 150;
    const latticeX = 314;
    const latticeY = 153;
    const targetX = 728;
    const targetY = 184;
    const targetSize = 84;

    return (
      <svg width={960} height={560} viewBox="0 0 960 560" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={style.beamColor} stopOpacity="0.95" />
            <stop offset="100%" stopColor={style.beamColor} stopOpacity="0.22" />
          </linearGradient>
        </defs>

        <g id="layer_title">
          <TextLabel groupId="layer_title_text" x={480} y={36} text={params.title} anchor="middle" fontSize={theme.fontSize.title} color={style.labelColor} />
        </g>

        <g id="layer_labels">
          <TextLabel groupId="layer_labels_wavelength" x={122} y={92} text={params.wavelengthLabel} anchor="start" fontSize={theme.fontSize.label} color={style.labelColor} />
          <TextLabel groupId="layer_labels_period" x={676} y={104} text={params.periodLabel} anchor="start" fontSize={theme.fontSize.small} color={style.mutedLabelColor} />
          <TextLabel groupId="layer_labels_input" x={162} y={160} text={params.inputBeamLabel} anchor="middle" fontSize={theme.fontSize.label} color={style.labelColor} />
          <TextLabel groupId="layer_labels_material" x={latticeX + latticeWidth / 2} y={latticeY + latticeHeight + 48} text={params.materialLabel} anchor="middle" fontSize={theme.fontSize.small} color={style.mutedLabelColor} />
          <TextLabel groupId="layer_labels_target_size" x={targetX - 18} y={174} text={params.targetSizeLabel} anchor="end" fontSize={theme.fontSize.small} color={style.labelColor} />
        </g>

        <g id="layer_input_beam">
          <GaussianBeam groupId="layer_input_beam_beam" x1={72} y1={220} x2={304} y2={220} waistStart={68} waistEnd={22} color="url(#beamGradient)" opacity={params.beamOpacity} />
        </g>

        <g id="layer_metasurface">
          <MetasurfacePostLattice
            groupId="layer_metasurface_lattice"
            x={latticeX}
            y={latticeY}
            width={latticeWidth}
            height={latticeHeight}
            count={params.visiblePostCount}
            rows={2}
            color={style.latticeColor}
            backgroundColor="#f0fdfa"
            label={params.metasurfaceLabel}
          />
        </g>

        <PropagationRegion groupId="layer_propagation" x={390} y={150} width={302} height={162} label="Free-space propagation" color={style.regionFill} opacity={0.78} />

        <g id="layer_target">
          <GaussianBeam groupId="layer_target_beam" x1={432} y1={236} x2={710} y2={236} waistStart={28} waistEnd={42} color={style.accentColor} opacity={Math.max(0.16, params.beamOpacity * 0.52)} />
          <TargetPlane groupId="layer_target_plane" x={targetX} y={targetY} width={20} height={targetSize} color={style.targetColor} label={params.outputFieldLabel} opacity={params.targetOpacity} />
        </g>

        <g id="layer_annotations">
          <Arrow groupId="layer_annotations_working_distance" x1={404} y1={348} x2={724} y2={348} label={params.workingDistanceLabel} color={style.labelColor} strokeWidth={2.1} />
        </g>

        {params.showCoordinateAxis && (
          <CoordinateAxis groupId="layer_coordinate_axis" x={86} y={402} width={90} height={86} xLabel="x" yLabel="z" color={style.mutedLabelColor} />
        )}

        {params.showScaleBar && (
          <ScaleBar groupId="layer_scale_bar" x={768} y={462} length={96} label="100 µm" color={style.labelColor} />
        )}

        {params.showIntensityInset && (
          <g id="layer_insets">
            <IntensityInset groupId="layer_insets_target" x={696} y={66} width={204} height={170} title="Flat-top target intensity" />
          </g>
        )}
      </svg>
    );
  },
};
