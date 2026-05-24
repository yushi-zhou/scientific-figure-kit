import { describe, expect, it, vi } from 'vitest';
import { exportPng } from './exportPng';

describe('exportPng', () => {
  it('renders an SVG to a PNG data url and downloads it', async () => {
    const svg: SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 200 100');
    svg.setAttribute('width', '200');
    svg.setAttribute('height', '100');

    const mockClick = vi.fn();
    const mockAppendChild = vi.fn();
    const mockRemoveChild = vi.fn();
    const mockToDataURL = vi.fn(() => 'data:image/png;base64,AAAA');
    const mockDrawImage = vi.fn();
    const mockFillRect = vi.fn();

    class MockImage {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      set src(_value: string) {
        this.onload?.();
      }
    }

    const originalCreateElement = document.createElement.bind(document);
    document.createElement = (tagName: string) => {
      if (tagName === 'a') {
        return { href: '', download: '', click: mockClick } as unknown as HTMLAnchorElement;
      }

      if (tagName === 'canvas') {
        return {
          width: 0,
          height: 0,
          getContext: () => ({
            scale: vi.fn(),
            drawImage: mockDrawImage,
            fillStyle: '',
            fillRect: mockFillRect,
          }),
          toDataURL: mockToDataURL,
        } as unknown as HTMLCanvasElement;
      }

      return originalCreateElement(tagName);
    };

    const originalImage = globalThis.Image;
    globalThis.Image = MockImage as unknown as typeof Image;
    document.body.appendChild = mockAppendChild;
    document.body.removeChild = mockRemoveChild;

    const result = await exportPng(svg, { filename: 'figure.png', scaleFactor: 2, background: 'white' });

    expect(result).toBe('data:image/png;base64,AAAA');
    expect(mockDrawImage).toHaveBeenCalled();
    expect(mockFillRect).toHaveBeenCalled();
    expect(mockClick).toHaveBeenCalled();

    document.createElement = originalCreateElement;
    globalThis.Image = originalImage;
  });
});