import React from 'react';
import { ControlSpec } from '../types/template';
import { ControlRenderer } from './ControlRenderer';

interface ParameterPanelProps {
  controls: ControlSpec[];
  params: Record<string, unknown>;
  onParamChange: (key: string, value: string | number | boolean) => void;
  validationErrors?: string[];
}

export function ParameterPanel({ controls, params, onParamChange, validationErrors = [] }: ParameterPanelProps) {
  return (
    <aside className="w-64 bg-white border-r p-4 overflow-y-auto">
      <h2 className="font-semibold mb-4">Parameters</h2>
      {controls.map((control) => (
        <div key={control.key} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">{control.label}</label>
          <ControlRenderer
            control={control}
            value={params[control.key]}
            onChange={(nextValue) => onParamChange(control.key, nextValue)}
          />
        </div>
      ))}
      {validationErrors.length > 0 && (
        <div className="mt-6 rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          <h3 className="font-semibold mb-2">Template validation</h3>
          <ul className="list-disc pl-5 space-y-1">
            {validationErrors.map((error, index) => (
              <li key={`${error}-${index}`}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}