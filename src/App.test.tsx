import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('resets params to the selected template defaults when switching templates', () => {
    render(<App />);

    const templateSelect = screen.getByRole('combobox');
    const titleInput = screen.getByLabelText('Title') as HTMLInputElement;

    expect(titleInput.value).toBe('Metasurface flat-top generation');

    fireEvent.change(titleInput, { target: { value: 'Custom title' } });
    expect(titleInput.value).toBe('Custom title');

    fireEvent.change(templateSelect, { target: { value: 'fiber-vs-metasurface-pai' } });

    expect((screen.getByLabelText('Title') as HTMLInputElement).value).toBe('PAI illumination comparison');
  });
});