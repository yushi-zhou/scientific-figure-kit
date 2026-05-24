// src/types/theme.ts
export interface FigureTheme {
  id: string;
  name: string;
  fontFamily: string;
  fontSize: {
    small: number;
    body: number;
    label: number;
    title: number;
  };
  strokeWidth: {
    thin: number;
    normal: number;
    thick: number;
  };
  colors: {
    background: string;
    text: string;
    mutedText: string;
    primary: string;
    secondary: string;
    accent: string;
    beam: string;
    optical: string;
    acoustic: string;
    tissue: string;
    device: string;
    target: string;
    warning: string;
  };
  arrow: {
    markerSize: number;
    defaultHead: "triangle" | "vee";
  };
}
