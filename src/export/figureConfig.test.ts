import { describe, expect, it, vi } from 'vitest';
import { createFigureConfig, downloadFigureConfig, parseFigureConfig, validateFigureConfig } from './figureConfig';

describe('figureConfig', () => {
  it('creates and parses a figure config', () => {
    const template = {
      id: 'template-1',
      name: 'Template 1',
      description: 'desc',
      category: 'general' as const,
      defaultParams: { title: 'Hello' },
      controls: [],
      render: vi.fn(),
    };

    const theme = { id: 'theme-1', name: 'Theme 1' } as any;
    const config = createFigureConfig(template, { title: 'Custom' }, theme, { notes: 'note' });

    expect(config.templateId).toBe('template-1');
    expect(config.themeId).toBe('theme-1');
    expect(config.notes).toBe('note');

    const parsed = parseFigureConfig(JSON.stringify(config));
    expect(parsed.templateName).toBe('Template 1');
    expect(parsed.params).toEqual({ title: 'Custom' });
  });

  it('validates missing fields', () => {
    const issues = validateFigureConfig({ schemaVersion: 1, templateId: '', params: {} });
    expect(issues.some((issue) => issue.severity === 'error')).toBe(true);
  });

  it('downloads figure config json', () => {
    const click = vi.fn();
    const append = vi.fn();
    const remove = vi.fn();
    const originalCreateElement = document.createElement.bind(document);

    document.createElement = (tagName: string) => {
      if (tagName === 'a') {
        return { href: '', download: '', click } as unknown as HTMLAnchorElement;
      }
      return originalCreateElement(tagName);
    };

    document.body.appendChild = append;
    document.body.removeChild = remove;

    const json = downloadFigureConfig({
      schemaVersion: 1,
      templateId: 't',
      templateName: 'T',
      params: {},
      themeId: 'theme',
      themeName: 'Theme',
      createdAt: new Date().toISOString(),
    }, 'figure.json');

    expect(json).toContain('templateId');
    expect(click).toHaveBeenCalled();
    expect(append).toHaveBeenCalled();
    expect(remove).toHaveBeenCalled();

    document.createElement = originalCreateElement;
  });
});