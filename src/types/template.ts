// src/types/template.ts
import { FigureTheme } from './theme';
import { ReactNode } from 'react';

export type ControlSpec =
  | { type: "text"; key: string; label: string; placeholder?: string }
  | { type: "number"; key: string; label: string; min?: number; max?: number; step?: number; unit?: string }
  | { type: "select"; key: string; label: string; options: { label: string; value: string }[] }
  | { type: "color"; key: string; label: string }
  | { type: "toggle"; key: string; label: string };

export interface FigureTemplate<TParams = Record<string, any>> {
  id: string;
  name: string;
  description: string;
  category: "optics" | "pai" | "workflow" | "metaAtom" | "general";
  defaultParams: TParams;
  controls: ControlSpec[];
  render: (params: TParams, theme: FigureTheme) => ReactNode;
  validate?: (params: TParams) => string[];
}
