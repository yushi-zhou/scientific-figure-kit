import React from 'react';
import { ControlSpec } from '../types/template';

interface ControlRendererProps {
  control: ControlSpec;
  value: unknown;
  onChange: (nextValue: string | number | boolean) => void;
}

function isHexColor(value: unknown): value is string {
  return typeof value === 'string' && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);
}

export function ControlRenderer({ control, value, onChange }: ControlRendererProps) {
  switch (control.type) {
    case 'text':
      return (
        <input
          type="text"
          className="w-full border rounded px-2 py-1"
          aria-label={control.label}
          placeholder={control.placeholder}
          value={typeof value === 'string' ? value : ''}
          onChange={(event) => onChange(event.target.value)}
        />
      );
    case 'number': {
      const numericValue = typeof value === 'number' ? value : 0;

      return (
        <div className="flex items-center gap-2">
          <input
            type="number"
            className="w-full border rounded px-2 py-1"
            aria-label={control.label}
            value={numericValue}
            min={control.min}
            max={control.max}
            step={control.step}
            onChange={(event) => {
              const nextValue = event.target.value === '' ? 0 : Number(event.target.value);
              onChange(nextValue);
            }}
          />
          {control.unit && <span className="text-xs text-gray-500 whitespace-nowrap">{control.unit}</span>}
        </div>
      );
    }
    case 'select':
      return (
        <select
          className="w-full border rounded px-2 py-1 bg-white"
          aria-label={control.label}
          value={typeof value === 'string' ? value : control.options[0]?.value ?? ''}
          onChange={(event) => onChange(event.target.value)}
        >
          {control.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    case 'color': {
      const colorValue = isHexColor(value) ? value : '#000000';
      const textValue = typeof value === 'string' ? value : colorValue;

      return (
        <div className="flex items-center gap-2">
          <input
            type="color"
            className="h-9 w-10 border rounded bg-white p-0"
            aria-label={`${control.label} color picker`}
            value={colorValue}
            onChange={(event) => onChange(event.target.value)}
          />
          <input
            type="text"
            className="flex-1 border rounded px-2 py-1 font-mono text-sm"
            aria-label={control.label}
            value={textValue}
            onChange={(event) => onChange(event.target.value)}
          />
        </div>
      );
    }
    case 'toggle':
      return (
        <input
          type="checkbox"
          className="h-4 w-4"
          aria-label={control.label}
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
        />
      );
    default:
      return null;
  }
}