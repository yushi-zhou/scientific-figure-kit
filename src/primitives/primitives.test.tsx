import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Arrow, TextLabel, PanelFrame } from './index';

describe('Primitive Components', () => {
  it('renders Arrow without crashing', () => {
    const { container } = render(
      <svg>
        <Arrow x1={0} y1={0} x2={100} y2={100} groupId="test-arrow" label="arrow-label" />
      </svg>
    );
    expect(container.querySelector('line')).toBeDefined();
    expect(container.querySelector('text')?.textContent).toBe('arrow-label');
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
