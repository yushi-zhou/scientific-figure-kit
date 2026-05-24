import React from 'react';
import { FigureTemplate } from '../types/template';

interface TemplateSelectorProps {
  templates: FigureTemplate[];
  selectedTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
}

export function TemplateSelector({ templates, selectedTemplateId, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <select
      className="border rounded px-2 py-1 mx-4"
      value={selectedTemplateId}
      onChange={(event) => onSelectTemplate(event.target.value)}
    >
      {templates.map((template) => (
        <option key={template.id} value={template.id}>
          {template.name}
        </option>
      ))}
    </select>
  );
}