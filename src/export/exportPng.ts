import { serializeSvg, triggerDownload } from './exportSvg';

export type PngBackground = 'transparent' | 'white';

export interface PngExportOptions {
  filename: string;
  scaleFactor?: number;
  background?: PngBackground;
}

function getSvgDimensions(svgElement: SVGSVGElement): { width: number; height: number } {
  const viewBox = svgElement.getAttribute('viewBox');
  if (viewBox) {
    const [x, y, width, height] = viewBox.split(/\s+/).map(Number);
    if ([x, y, width, height].every((value) => Number.isFinite(value)) && width > 0 && height > 0) {
      return { width, height };
    }
  }

  const width = Number(svgElement.getAttribute('width')) || svgElement.clientWidth || 1000;
  const height = Number(svgElement.getAttribute('height')) || svgElement.clientHeight || 1000;
  return { width, height };
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Failed to load SVG image data.'));
    image.src = src;
  });
}

export async function exportPng(svgElement: SVGSVGElement, options: PngExportOptions): Promise<string> {
  const scaleFactor = options.scaleFactor ?? 1;
  const { width, height } = getSvgDimensions(svgElement);
  const serializedSvg = serializeSvg(svgElement, options.background === 'white' ? 'white' : 'transparent');
  const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(serializedSvg)}`;
  const image = await loadImage(svgDataUrl);
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width * scaleFactor));
  canvas.height = Math.max(1, Math.round(height * scaleFactor));

  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Canvas 2D context is not available.');
  }

  if (options.background === 'white') {
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  context.scale(scaleFactor, scaleFactor);
  context.drawImage(image, 0, 0, width, height);

  const pngDataUrl = canvas.toDataURL('image/png');
  triggerDownload(pngDataUrl, options.filename);
  return pngDataUrl;
}