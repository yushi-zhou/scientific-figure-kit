export type SvgValidationSeverity = 'info' | 'warning' | 'error';

export interface SvgValidationWarning {
  code: string;
  message: string;
  severity: SvgValidationSeverity;
}

const SEMANTIC_ID_PATTERN = /^(layer_|node|curve-|textlabel-|panel_|n\d+)/i;

export function validateSvg(svgElement: SVGSVGElement | null): SvgValidationWarning[] {
  if (!svgElement) {
    return [{ code: 'missing-svg', message: 'SVG element is not available.', severity: 'error' }];
  }

  const warnings: SvgValidationWarning[] = [];

  if (!svgElement.getAttribute('viewBox')) {
    warnings.push({ code: 'missing-viewbox', message: 'SVG is missing a viewBox attribute.', severity: 'warning' });
  }

  const serialized = new XMLSerializer().serializeToString(svgElement);
  if (!/xmlns="http:\/\/www\.w3\.org\/2000\/svg"/.test(serialized)) {
    warnings.push({ code: 'missing-xmlns', message: 'Serialized SVG is missing the xmlns attribute.', severity: 'warning' });
  }

  const textElements = svgElement.querySelectorAll('text');
  const textContent = (svgElement.textContent || '').trim();
  if (textContent && textElements.length === 0) {
    warnings.push({
      code: 'missing-editable-text',
      message: 'Text content exists but no editable <text> elements were found.',
      severity: 'warning',
    });
  }

  const rasterImages = svgElement.querySelectorAll('image');
  if (rasterImages.length > 0) {
    warnings.push({
      code: 'raster-image',
      message: `SVG contains ${rasterImages.length} raster <image> element(s).`,
      severity: 'warning',
    });
  }

  const ids = Array.from(svgElement.querySelectorAll('[id]')).map((element) => element.id).filter(Boolean);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length > 0) {
    warnings.push({
      code: 'duplicate-id',
      message: `Duplicate id attributes found: ${Array.from(new Set(duplicateIds)).join(', ')}`,
      severity: 'warning',
    });
  }

  if (ids.length === 0 || !ids.some((id) => SEMANTIC_ID_PATTERN.test(id))) {
    warnings.push({
      code: 'missing-semantic-group-ids',
      message: 'No semantic group ids were found. Use ids like layer_*, node*, curve-*, or textlabel-*.',
      severity: 'info',
    });
  }

  return warnings;
}