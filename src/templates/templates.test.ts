import { describe, it, expect } from 'vitest';
import * as templates from './index';

describe('Template Registry', () => {
  it('should contain the expected templates', () => {
    expect(templates.metasurfaceFlatTop).toBeDefined();
    expect(templates.fiberVsMetasurface).toBeDefined();
    expect(templates.sideFirePAI).toBeDefined();
    expect(templates.adjointOptimizationLoop).toBeDefined();
    expect(templates.metaAtomLibrary).toBeDefined();
    expect(templates.llmComsolVerifierLoop).toBeDefined();
  });

  it('templates should have required properties', () => {
    Object.values(templates).forEach((template: any) => {
      expect(template.id).toBeTypeOf('string');
      expect(template.name).toBeTypeOf('string');
      expect(template.category).toBeTypeOf('string');
      expect(template.defaultParams).toBeTypeOf('object');
      expect(template.controls).toBeInstanceOf(Array);
      expect(typeof template.render).toBe('function');
    });
  });
});
