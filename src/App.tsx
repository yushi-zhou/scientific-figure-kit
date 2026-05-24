import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { TemplateSelector } from './components/TemplateSelector';
import { ExportToolbar } from './components/ExportToolbar';
import { ParameterPanel } from './components/ParameterPanel';
import { SvgPreview } from './components/SvgPreview';

const templates = [
  metasurfaceFlatTop,
  fiberVsMetasurface,
  sideFirePAI,
  adjointOptimizationLoop,
  metaAtomLibrary,
  llmComsolVerifierLoop
];

function App() {
  const [activeTemplateId, setActiveTemplateId] = useState<string>(templates[0].id);
  const [params, setParams] = useState<Record<string, unknown>>({ ...templates[0].defaultParams });
  const svgRef = useRef<SVGSVGElement | null>(null);

  const activeTemplate = useMemo<FigureTemplate>(() => {
    return templates.find((template) => template.id === activeTemplateId) ?? templates[0];
  }, [activeTemplateId]);

  useEffect(() => {
    setParams({ ...activeTemplate.defaultParams });
  }, [activeTemplate]);

  const validationErrors = activeTemplate.validate?.(params) ?? [];

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
          <TemplateSelector
            templates={templates}
            selectedTemplateId={activeTemplate.id}
            onSelectTemplate={setActiveTemplateId}
          />
          <ExportToolbar onExport={handleExport} />
        </div>
      </header>
      <main className="flex-1 flex overflow-hidden">
        <ParameterPanel
          controls={activeTemplate.controls}
          params={params}
          onParamChange={(key, value) => setParams((currentParams) => ({ ...currentParams, [key]: value }))}
          validationErrors={validationErrors}
        />

        <SvgPreview onSvgElementChange={(svgElement) => {
          svgRef.current = svgElement;
        }}>
          {activeTemplate.render(params, defaultTheme)}
        </SvgPreview>
      </main>
    </div>
  );
}

export default App;
