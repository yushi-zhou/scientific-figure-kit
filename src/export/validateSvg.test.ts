import { describe, expect, it } from 'vitest';
import { validateSvg } from './validateSvg';

describe('validateSvg', () => {
  it('warns when viewBox is missing', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const warnings = validateSvg(svg);

    expect(warnings.some((warning) => warning.code === 'missing-viewbox')).toBe(true);
  });

  it('warns about duplicate ids and raster images', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');

    const groupA = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    groupA.setAttribute('id', 'duplicate');
    svg.appendChild(groupA);

    const groupB = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    groupB.setAttribute('id', 'duplicate');
    svg.appendChild(groupB);

    const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    svg.appendChild(image);

    const warnings = validateSvg(svg);

    expect(warnings.some((warning) => warning.code === 'duplicate-id')).toBe(true);
    expect(warnings.some((warning) => warning.code === 'raster-image')).toBe(true);
  });
});