import { describe, it, expect, vi } from 'vitest';
import { exportSvg } from './exportSvg';

describe('exportSvg', () => {
  it('should serialize SVG element correctly', () => {
    // Mock the DOM environment elements
    const svg: SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('r', '10');
    svg.appendChild(circle);

    // Mock document.createElement('a') and its click method
    const mockClick = vi.fn();
    const mockAppendChild = vi.fn();
    const mockRemoveChild = vi.fn();

    const originalCreateElement = document.createElement.bind(document);
    document.createElement = (tagName: string) => {
      if (tagName === 'a') {
        return {
          href: '',
          download: '',
          click: mockClick,
        } as any;
      }
      return originalCreateElement(tagName);
    };

    document.body.appendChild = mockAppendChild;
    document.body.removeChild = mockRemoveChild;

    const result = exportSvg(svg, { filename: 'test.svg' });

    expect(result).toContain('<?xml version="1.0" standalone="no"?>');
    expect(result).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(result).toContain('viewBox="0 0 100 100"');
    expect(result).toContain('<circle r="10"');
    expect(mockClick).toHaveBeenCalled();
    expect(mockAppendChild).toHaveBeenCalled();
    expect(mockRemoveChild).toHaveBeenCalled();

    // Restore original document.createElement
    document.createElement = originalCreateElement;
  });
});

