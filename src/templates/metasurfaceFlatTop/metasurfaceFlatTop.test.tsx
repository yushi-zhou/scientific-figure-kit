import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { defaultTheme } from '../../data/defaultThemes';
import { metasurfaceFlatTop } from './index';

describe('metasurfaceFlatTop (quality pass)', () => {
  it('renders required semantic layer ids', () => {
    const { container } = render(metasurfaceFlatTop.render(metasurfaceFlatTop.defaultParams, defaultTheme));

    const expectedIds = [
      'layer_title',
      'layer_labels',
      'layer_input_beam',
      'layer_metasurface',
      'layer_propagation',
      'layer_target',
      'layer_annotations',
    ];

    expectedIds.forEach((id) => {
      expect(container.querySelector(`#${id}`)).toBeDefined();
    });

    // toggles true by default in defaultParams
    expect(container.querySelector('#layer_coordinate_axis')).toBeDefined();
    expect(container.querySelector('#layer_scale_bar')).toBeDefined();
    expect(container.querySelector('#layer_insets')).toBeDefined();
  });

  it('includes the important labels from defaults', () => {
    const { getByText } = render(metasurfaceFlatTop.render(metasurfaceFlatTop.defaultParams, defaultTheme));

    expect(getByText('Metasurface flat-top generation')).toBeDefined();
    expect(getByText('λ = 750 nm')).toBeDefined();
    expect(getByText('z = 300 µm')).toBeDefined();
    expect(getByText('40 × 40 µm²')).toBeDefined();
    expect(getByText('Gaussian input beam')).toBeDefined();
    expect(getByText('Phase-only metasurface')).toBeDefined();
    expect(getByText('Uniform flat-top target field')).toBeDefined();
  });

  it('respects toggle flags to hide optional layers', () => {
    const params = { ...metasurfaceFlatTop.defaultParams, showCoordinateAxis: false, showScaleBar: false, showIntensityInset: false };
    const { container } = render(metasurfaceFlatTop.render(params, defaultTheme));

    expect(container.querySelector('#layer_coordinate_axis')).toBeNull();
    expect(container.querySelector('#layer_scale_bar')).toBeNull();
    expect(container.querySelector('#layer_insets')).toBeNull();
  });

  it('validate() flags missing/invalid values', () => {
    const invalid = {
      ...metasurfaceFlatTop.defaultParams,
      title: '',
      wavelengthLabel: '',
      visiblePostCount: 0,
      beamOpacity: -0.1,
      targetOpacity: 1.5,
    } as any;

    const issues = metasurfaceFlatTop.validate?.(invalid) ?? [];

    expect(issues).toEqual(
      expect.arrayContaining([
        'Title is required.',
        'Wavelength label is required.',
        'Visible post count must be positive.',
        'Beam opacity must be between 0 and 1.',
        'Target opacity must be between 0 and 1.',
      ])
    );
  });

  it('exposes the expected control keys for the panel', () => {
    const controlKeys = metasurfaceFlatTop.controls.map((c) => c.key);

    expect(controlKeys).toEqual(
      expect.arrayContaining([
        'title',
        'wavelengthLabel',
        'workingDistanceLabel',
        'targetSizeLabel',
        'inputBeamLabel',
        'outputFieldLabel',
        'metasurfaceLabel',
        'materialLabel',
        'periodLabel',
        'visiblePostCount',
        'stylePreset',
        'beamOpacity',
        'targetOpacity',
        'showCoordinateAxis',
        'showIntensityInset',
        'showScaleBar',
      ])
    );
  });
});
