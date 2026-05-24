import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ParameterPanel } from './ParameterPanel';

describe('ParameterPanel', () => {
  it('renders all control types and updates params', () => {
    const controls = [
      { type: 'text', key: 'title', label: 'Title', placeholder: 'Enter title' },
      { type: 'number', key: 'count', label: 'Count', min: 0, max: 10, step: 2, unit: 'mm' },
      { type: 'select', key: 'mode', label: 'Mode', options: [{ label: 'Fast', value: 'fast' }, { label: 'Slow', value: 'slow' }] },
      { type: 'color', key: 'accent', label: 'Accent Color' },
      { type: 'toggle', key: 'enabled', label: 'Enabled' },
    ] as const;

    function Harness() {
      const [params, setParams] = useState<Record<string, unknown>>({
        title: 'Initial title',
        count: 4,
        mode: 'fast',
        accent: '#112233',
        enabled: false,
      });

      return (
        <ParameterPanel
          controls={controls as unknown as Parameters<typeof ParameterPanel>[0]['controls']}
          params={params}
          onParamChange={(key, value) => setParams((currentParams) => ({ ...currentParams, [key]: value }))}
          validationErrors={['First validation error']}
        />
      );
    }

    render(<Harness />);

    const titleInput = screen.getByLabelText('Title') as HTMLInputElement;
    const countInput = screen.getByLabelText('Count') as HTMLInputElement;
    const modeSelect = screen.getByLabelText('Mode') as HTMLSelectElement;
    const accentPicker = screen.getByLabelText('Accent Color color picker') as HTMLInputElement;
    const accentText = screen.getByLabelText('Accent Color') as HTMLInputElement;
    const enabledToggle = screen.getByLabelText('Enabled') as HTMLInputElement;

    expect(screen.getByText('mm')).toBeDefined();
    expect(screen.getByText('First validation error')).toBeDefined();

    fireEvent.change(titleInput, { target: { value: 'Updated title' } });
    fireEvent.change(countInput, { target: { value: '6' } });
    fireEvent.change(modeSelect, { target: { value: 'slow' } });
    fireEvent.change(accentPicker, { target: { value: '#445566' } });
    fireEvent.click(enabledToggle);

    expect(titleInput.value).toBe('Updated title');
    expect(countInput.value).toBe('6');
    expect(modeSelect.value).toBe('slow');
    expect(accentPicker.value).toBe('#445566');
    expect(accentText.value).toBe('#445566');
    expect(enabledToggle.checked).toBe(true);
  });

  it('emits numeric values for number controls', () => {
    const onParamChange = vi.fn();

    render(
      <ParameterPanel
        controls={[{ type: 'number', key: 'count', label: 'Count', step: 0.5 }]}
        params={{ count: 2 }}
        onParamChange={onParamChange}
      />
    );

    fireEvent.change(screen.getByLabelText('Count'), { target: { value: '7' } });

    expect(onParamChange).toHaveBeenCalledWith('count', 7);
  });
});