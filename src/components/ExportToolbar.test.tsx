import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ExportToolbar } from './ExportToolbar';

describe('ExportToolbar', () => {
  it('renders export and load controls', () => {
    render(
      <ExportToolbar
        onExportSvg={vi.fn()}
        onExportPng={vi.fn()}
        onSaveJson={vi.fn()}
        onLoadFigureConfig={vi.fn(() => null)}
        warnings={[]}
        statusMessage="Ready"
      />
    );

    expect(screen.getByRole('button', { name: 'Export SVG' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Export PNG' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Save JSON' })).toBeDefined();
    expect(screen.getByLabelText('Load JSON')).toBeDefined();
    expect(screen.getByText('Ready')).toBeDefined();
  });
});