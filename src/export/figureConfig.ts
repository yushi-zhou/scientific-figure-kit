import { FigureTemplate } from '../types/template';
import { FigureTheme } from '../types/theme';

export const FIGURE_CONFIG_SCHEMA_VERSION = 1;

export interface FigureConfigExportMetadata {
  [key: string]: unknown;
}

export interface FigureConfig<TParams = Record<string, unknown>> {
  schemaVersion: number;
  templateId: string;
  templateName: string;
  params: TParams;
  themeId: string;
  themeName: string;
  createdAt: string;
  exportedAt?: string;
  notes?: string;
  exportMetadata?: FigureConfigExportMetadata;
}

export type FigureConfigIssueSeverity = 'info' | 'warning' | 'error';

export interface FigureConfigIssue {
  code: string;
  message: string;
  severity: FigureConfigIssueSeverity;
}

export function createFigureConfig<TParams>(
  template: FigureTemplate<TParams>,
  params: TParams,
  theme: FigureTheme,
  options: {
    notes?: string;
    exportMetadata?: FigureConfigExportMetadata;
  } = {}
): FigureConfig<TParams> {
  const timestamp = new Date().toISOString();

  return {
    schemaVersion: FIGURE_CONFIG_SCHEMA_VERSION,
    templateId: template.id,
    templateName: template.name,
    params: { ...params },
    themeId: theme.id,
    themeName: theme.name,
    createdAt: timestamp,
    exportedAt: timestamp,
    notes: options.notes,
    exportMetadata: options.exportMetadata,
  };
}

export function validateFigureConfig(candidate: unknown): FigureConfigIssue[] {
  const issues: FigureConfigIssue[] = [];

  if (!candidate || typeof candidate !== 'object') {
    return [{ code: 'config-not-object', message: 'Figure configuration must be an object.', severity: 'error' }];
  }

  const config = candidate as Partial<FigureConfig>;

  if (config.schemaVersion !== FIGURE_CONFIG_SCHEMA_VERSION) {
    issues.push({
      code: 'schema-version',
      message: `Unsupported figure config schema version: ${String(config.schemaVersion)}`,
      severity: 'error',
    });
  }

  if (typeof config.templateId !== 'string' || !config.templateId.trim()) {
    issues.push({ code: 'template-id', message: 'Figure configuration is missing a templateId.', severity: 'error' });
  }

  if (typeof config.templateName !== 'string' || !config.templateName.trim()) {
    issues.push({ code: 'template-name', message: 'Figure configuration is missing a templateName.', severity: 'warning' });
  }

  if (!config.params || typeof config.params !== 'object' || Array.isArray(config.params)) {
    issues.push({ code: 'params', message: 'Figure configuration must include a params object.', severity: 'error' });
  }

  if (typeof config.themeId !== 'string' || !config.themeId.trim()) {
    issues.push({ code: 'theme-id', message: 'Figure configuration is missing a themeId.', severity: 'warning' });
  }

  if (typeof config.themeName !== 'string' || !config.themeName.trim()) {
    issues.push({ code: 'theme-name', message: 'Figure configuration is missing a themeName.', severity: 'warning' });
  }

  if (typeof config.createdAt !== 'string' || Number.isNaN(Date.parse(config.createdAt))) {
    issues.push({ code: 'created-at', message: 'Figure configuration createdAt must be an ISO timestamp.', severity: 'warning' });
  }

  if (config.exportedAt && Number.isNaN(Date.parse(config.exportedAt))) {
    issues.push({ code: 'exported-at', message: 'Figure configuration exportedAt must be an ISO timestamp.', severity: 'warning' });
  }

  return issues;
}

export function parseFigureConfig(rawJson: string): FigureConfig {
  const parsed = JSON.parse(rawJson) as unknown;
  const issues = validateFigureConfig(parsed);
  const fatalIssues = issues.filter((issue) => issue.severity === 'error');

  if (fatalIssues.length > 0) {
    throw new Error(fatalIssues.map((issue) => issue.message).join(' '));
  }

  return parsed as FigureConfig;
}

export function downloadFigureConfig(config: FigureConfig, filename: string): string {
  const json = JSON.stringify(config, null, 2);
  const href = `data:application/json;charset=utf-8,${encodeURIComponent(json)}`;
  const link = document.createElement('a');
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return json;
}