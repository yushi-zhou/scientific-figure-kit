import React from 'react';

interface ExportToolbarProps {
  onExport: () => void;
}

export function ExportToolbar({ onExport }: ExportToolbarProps) {
  return (
    <button
      onClick={onExport}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
    >
      Export SVG
    </button>
  );
}