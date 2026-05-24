export type SvgBackground = 'transparent' | 'white' | string;

export interface ExportOptions {
  filename: string;
  background?: SvgBackground;
}

function updateSvgTagAttribute(source: string, attributeName: string, attributeValue: string): string {
  const attributePattern = new RegExp(`\\b${attributeName}="[^"]*"`);
  if (attributePattern.test(source)) {
    return source;
  }

  return source.replace(/^<svg\b/, `<svg ${attributeName}="${attributeValue}"`);
}

function triggerDownload(href: string, filename: string): void {
  const downloadLink = document.createElement('a');
  downloadLink.href = href;
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

export function serializeSvg(svgElement: SVGSVGElement, background: SvgBackground = 'transparent'): string {
  const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
  const existingStyle = clonedSvg.getAttribute('style') || '';

  if (background !== 'transparent') {
    const backgroundStyle = `background-color: ${background};`;
    clonedSvg.setAttribute('style', existingStyle ? `${existingStyle} ${backgroundStyle}` : backgroundStyle);
  }

  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(clonedSvg);
  source = updateSvgTagAttribute(source, 'xmlns', 'http://www.w3.org/2000/svg');
  source = updateSvgTagAttribute(source, 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
  source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

  return source;
}

export function exportSvg(svgElement: SVGSVGElement, options: ExportOptions): string {
  const source = serializeSvg(svgElement, options.background ?? 'transparent');
  const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(source)}`;
  triggerDownload(url, options.filename);
  return source;
}

export { triggerDownload };
