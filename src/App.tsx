import React, { useState, useEffect, useRef } from 'react';
import { defaultTheme } from './data/defaultThemes';
import { 
  metasurfaceFlatTop, 
  fiberVsMetasurface, 
  sideFirePAI, 
  adjointOptimizationLoop, 
  metaAtomLibrary, 
  llmComsolVerifierLoop 
} from './templates';
import { FigureTemplate } from './types/template';
import { exportSvg } from './export/exportSvg';

const templates = [
  metasurfaceFlatTop,
  fiberVsMetasurface,
  sideFirePAI,
  adjointOptimizationLoop,
  metaAtomLibrary,
  llmComsolVerifierLoop
];

function App() {
  const [activeTemplate, setActiveTemplate] = useState<FigureTemplate>(templates[0]);
  const [params, setParams] = useState<any>(templates[0].defaultParams);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    setParams(activeTemplate.defaultParams);
  }, [activeTemplate]);

  const handleExport = () => {
    if (svgRef.current) {
      exportSvg(svgRef.current, { filename: `${activeTemplate.id}.svg` });
    }
  };

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b px-4 py-2 flex items-center justify-between">
        <h1 className="text-xl font-bold">Scientific Figure Kit</h1>
        <div className="flex items-center">
          <select 
            className="border rounded px-2 py-1 mx-4"
            value={activeTemplate.id} 
            onChange={(e) => setActiveTemplate(templates.find(t => t.id === e.target.value) || templates[0])}
          >
            {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <button 
            onClick={handleExport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
          >
            Export SVG
          </button>
        </div>
      </header>
      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r p-4 overflow-y-auto">
          <h2 className="font-semibold mb-4">Parameters</h2>
          {activeTemplate.controls.map((ctrl) => (
            <div key={ctrl.key} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{ctrl.label}</label>
              {ctrl.type === 'text' && (
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1"
                  value={params[ctrl.key as keyof typeof params] as string || ''}
                  onChange={(e) => setParams({ ...params, [ctrl.key]: e.target.value })}
                />
              )}
              {ctrl.type === 'number' && (
                <input
                  type="number"
                  className="w-full border rounded px-2 py-1"
                  value={params[ctrl.key as keyof typeof params] as number || 0}
                  onChange={(e) => setParams({ ...params, [ctrl.key]: Number(e.target.value) })}
                />
              )}
               {ctrl.type === 'toggle' && (
                <input
                  type="checkbox"
                  className="w-4 h-4 ml-2"
                  checked={params[ctrl.key as keyof typeof params] as boolean || false}
                  onChange={(e) => setParams({ ...params, [ctrl.key]: e.target.checked })}
                />
              )}
            </div>
          ))}
        </aside>

        {/* Preview */}
        <section className="flex-1 p-8 flex items-center justify-center bg-gray-200 overflow-auto">
          <div className="bg-white shadow-lg border overflow-hidden" ref={(el) => {
            if (el) {
              const svg = el.querySelector('svg');
              if (svg) svgRef.current = svg;
            }
          }}>
            {activeTemplate.render(params, defaultTheme)}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
