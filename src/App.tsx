import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { createFigureConfig, downloadFigureConfig, exportPng, exportSvg, validateSvg, FigureConfig } from './export';
import { TemplateSelector } from './components/TemplateSelector';
import { ExportToolbar } from './components/ExportToolbar';
import { ParameterPanel } from './components/ParameterPanel';
import { SvgPreview } from './components/SvgPreview';
import { SvgValidationWarning } from './export/validateSvg';

const templates = [
  metasurfaceFlatTop,
  fiberVsMetasurface,
  sideFirePAI,
  adjointOptimizationLoop,
  metaAtomLibrary,
  llmComsolVerifierLoop
];

function areSvgWarningsEqual(left: SvgValidationWarning[], right: SvgValidationWarning[]): boolean {
  if (left.length !== right.length) {
    return false;
  }

  return left.every((warning, index) => {
    const otherWarning = right[index];
    return (
      warning.code === otherWarning.code &&
      warning.message === otherWarning.message &&
      warning.severity === otherWarning.severity
    );
  });
}

function App() {
  const [activeTemplateId, setActiveTemplateId] = useState<string>(templates[0].id);
  const [params, setParams] = useState<Record<string, unknown>>({ ...templates[0].defaultParams });
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [svgWarnings, setSvgWarnings] = useState<SvgValidationWarning[]>([]);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const activeTemplate = useMemo<FigureTemplate>(() => {
    return templates.find((template) => template.id === activeTemplateId) ?? templates[0];
  }, [activeTemplateId]);

  useEffect(() => {
    setParams({ ...activeTemplate.defaultParams });
    setStatusMessage(null);
  }, [activeTemplate]);

  const validationErrors = activeTemplate.validate?.(params) ?? [];

  const handleExport = useCallback(() => {
    if (!svgRef.current) {
      setStatusMessage('SVG export failed: no SVG element is available.');
      return;
    }

    const fatalWarnings = svgWarnings.filter((warning) => warning.severity === 'error');
    if (fatalWarnings.length > 0) {
      setStatusMessage(fatalWarnings[0].message);
      return;
    }

    exportSvg(svgRef.current, { filename: `${activeTemplate.id}.svg` });
    setStatusMessage(`Exported ${activeTemplate.name} as SVG.`);
  }, [activeTemplate.id, activeTemplate.name, svgWarnings]);

  const handleExportPng = useCallback(async () => {
    if (!svgRef.current) {
      setStatusMessage('PNG export failed: no SVG element is available.');
      return;
    }

    const fatalWarnings = svgWarnings.filter((warning) => warning.severity === 'error');
    if (fatalWarnings.length > 0) {
      setStatusMessage(fatalWarnings[0].message);
      return;
    }

    try {
      await exportPng(svgRef.current, { filename: `${activeTemplate.id}.png`, background: 'white', scaleFactor: 2 });
      setStatusMessage(`Exported ${activeTemplate.name} as PNG.`);
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'PNG export failed.');
    }
  }, [activeTemplate.id, activeTemplate.name, svgWarnings]);

  const handleSaveJson = useCallback(() => {
    const figureConfig = createFigureConfig(activeTemplate, params, defaultTheme, {
      exportMetadata: {
        svgWarnings,
      },
    });

    downloadFigureConfig(figureConfig, `${activeTemplate.id}.json`);
    setStatusMessage(`Saved ${activeTemplate.name} configuration as JSON.`);
  }, [activeTemplate, params, svgWarnings]);

  const handleLoadFigureConfig = useCallback((figureConfig: FigureConfig): string | null => {
    const template = templates.find((candidate) => candidate.id === figureConfig.templateId);
    if (!template) {
      return `Unknown templateId: ${figureConfig.templateId}`;
    }

    setActiveTemplateId(template.id);
    setParams({ ...template.defaultParams, ...(figureConfig.params as Record<string, unknown>) });
    setStatusMessage(`Loaded configuration for ${template.name}.`);
    return null;
  }, []);

  const handleSvgElementChange = useCallback((svgElement: SVGSVGElement | null) => {
    svgRef.current = svgElement;
    const nextWarnings = validateSvg(svgElement);
    setSvgWarnings((currentWarnings) => (areSvgWarningsEqual(currentWarnings, nextWarnings) ? currentWarnings : nextWarnings));
  }, []);

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
          <ExportToolbar
            onExportSvg={handleExport}
            onExportPng={handleExportPng}
            onSaveJson={handleSaveJson}
            onLoadFigureConfig={handleLoadFigureConfig}
            warnings={svgWarnings}
            statusMessage={statusMessage}
          />
        </div>
      </header>
      <main className="flex-1 flex overflow-hidden">
        <ParameterPanel
          controls={activeTemplate.controls}
          params={params}
          onParamChange={(key, value) => setParams((currentParams) => ({ ...currentParams, [key]: value }))}
          validationErrors={validationErrors}
        />

        <SvgPreview onSvgElementChange={handleSvgElementChange}>
          {activeTemplate.render(params, defaultTheme)}
        </SvgPreview>
      </main>
    </div>
  );
}

export default App;
