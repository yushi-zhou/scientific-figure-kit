import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { defaultTheme } from '../../data/defaultThemes';
import { metasurfaceFlatTop } from './index';

describe('metasurfaceFlatTop', () => {
  it('renders semantic layers and key labels', () => {
    const { container, getByText } = render(metasurfaceFlatTop.render(metasurfaceFlatTop.defaultParams, defaultTheme));

    expect(container.querySelector('#layer_input_beam')).toBeDefined();
    expect(container.querySelector('#layer_metasurface')).toBeDefined();
    expect(container.querySelector('#layer_propagation')).toBeDefined();
    expect(container.querySelector('#layer_target')).toBeDefined();
    expect(container.querySelector('#layer_annotations')).toBeDefined();
    expect(container.querySelector('#layer_coordinate_axis')).toBeDefined();
    expect(container.querySelector('#layer_insets')).toBeDefined();

    expect(getByText('Metasurface flat-top generation')).toBeDefined();
    expect(getByText('Gaussian input beam')).toBeDefined();
    expect(getByText('Free-space propagation')).toBeDefined();
    expect(getByText('Flat-top target intensity')).toBeDefined();
    expect(getByText('100 µm')).toBeDefined();
  });

  it('exposes the full control set for the template panel', () => {
    const controlKeys = metasurfaceFlatTop.controls.map((control) => control.key);

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

  it('validates the numeric and label parameters', () => {
    const issues = metasurfaceFlatTop.validate?.({
      ...metasurfaceFlatTop.defaultParams,
      title: '',
      visiblePostCount: 0,
      beamOpacity: 1.5,
      targetOpacity: -0.2,
    });

    expect(issues).toEqual(
      expect.arrayContaining([
        'Title is required.',
        'Visible post count must be positive.',
        'Beam opacity must be between 0 and 1.',
        'Target opacity must be between 0 and 1.',
      ])
    );
  });
});