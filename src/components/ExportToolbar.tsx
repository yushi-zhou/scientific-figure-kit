import React from 'react';
import { FigureConfig } from '../export/figureConfig';
import { SvgValidationWarning } from '../export/validateSvg';

interface ExportToolbarProps {
  onExportSvg: () => void;
  onExportPng: () => void;
  onSaveJson: () => void;
  onLoadFigureConfig: (config: FigureConfig) => string | null;
  warnings: SvgValidationWarning[];
  statusMessage?: string | null;
}

export function ExportToolbar({
  onExportSvg,
  onExportPng,
  onSaveJson,
  onLoadFigureConfig,
  warnings,
  statusMessage,
}: ExportToolbarProps) {
  const [loadMessage, setLoadMessage] = React.useState<string | null>(null);

  const handleLoadJson = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const json = await file.text();
      const parsedConfig = JSON.parse(json) as FigureConfig;
      const message = onLoadFigureConfig(parsedConfig);
      setLoadMessage(message);
    } catch (error) {
      setLoadMessage(error instanceof Error ? error.message : 'Failed to load figure configuration.');
    } finally {
      event.target.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-2 min-w-[360px]">
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={onExportSvg} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
          Export SVG
        </button>
        <button onClick={onExportPng} className="bg-slate-700 hover:bg-slate-800 text-white px-3 py-1 rounded">
          Export PNG
        </button>
        <button onClick={onSaveJson} className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded">
          Save JSON
        </button>
        <label className="inline-flex items-center gap-2 cursor-pointer bg-white border border-slate-300 px-3 py-1 rounded text-sm">
          <span>Load JSON</span>
          <input type="file" accept="application/json,.json" className="hidden" onChange={handleLoadJson} />
        </label>
      </div>

      {statusMessage && <div className="text-xs text-slate-600">{statusMessage}</div>}
      {loadMessage && <div className="text-xs text-amber-700">{loadMessage}</div>}
      {warnings.length > 0 && (
        <ul className="space-y-1 rounded border border-amber-200 bg-amber-50 p-2 text-xs text-amber-900 max-h-32 overflow-auto">
          {warnings.map((warning) => (
            <li key={warning.code}>
              <span className="font-semibold">[{warning.severity}]</span> {warning.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}