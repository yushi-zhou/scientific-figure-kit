import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Arrow, CurvedArrow, TextLabel, PanelFrame } from './index';

describe('Primitive Components', () => {
  it('renders Arrow without crashing and uses a unique marker id', () => {
    const { container } = render(
      <svg>
        <Arrow x1={0} y1={0} x2={100} y2={100} groupId="test-arrow" label="arrow-label" />
      </svg>
    );
    expect(container.querySelector('line')).toBeDefined();
    expect(container.querySelector('text')?.textContent).toBe('arrow-label');
    
    const marker = container.querySelector('marker');
    expect(marker?.getAttribute('id')).toBe('test-arrow-arrowhead');
  });

  it('renders multiple Arrow components without duplicate marker ids', () => {
    const { container } = render(
      <svg>
        <Arrow x1={0} y1={0} x2={10} y2={10} groupId="arrow-1" />
        <Arrow x1={20} y1={20} x2={30} y2={30} groupId="arrow-2" />
      </svg>
    );
    
    const markers = container.querySelectorAll('marker');
    expect(markers.length).toBe(2);
    expect(markers[0].getAttribute('id')).toBe('arrow-1-arrowhead');
    expect(markers[1].getAttribute('id')).toBe('arrow-2-arrowhead');
  });

  it('renders CurvedArrow without crashing and uses a unique marker id', () => {
    const { container } = render(
      <svg>
        <CurvedArrow 
          groupId="test-curve" 
          start={{x: 0, y: 0}} 
          controlPoint={{x: 50, y: 50}} 
          end={{x: 100, y: 0}} 
          label="curve-label" 
        />
      </svg>
    );
    expect(container.querySelector('path')).toBeDefined();
    expect(container.querySelector('text')?.textContent).toBe('curve-label');
    
    const marker = container.querySelector('marker');
    expect(marker?.getAttribute('id')).toBe('test-curve-arrowhead');
  });

  it('renders TextLabel without crashing', () => {
    const { container } = render(
      <svg>
        <TextLabel x={50} y={50} text="Hello Node" groupId="test-label" />
      </svg>
    );
    expect(container.querySelector('text')?.textContent).toBe('Hello Node');
  });
  
  it('renders PanelFrame without crashing', () => {
    const { container } = render(
      <svg>
        <PanelFrame x={10} y={10} width={200} height={200} title="Frame Title" groupId="test-frame" />
      </svg>
    );
    expect(container.querySelector('rect')).toBeDefined();
    expect(container.querySelector('text')?.textContent).toBe('Frame Title');
  });
});
