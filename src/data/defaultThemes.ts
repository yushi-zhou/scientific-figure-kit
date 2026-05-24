import { FigureTheme } from '../types/theme';

export const defaultTheme: FigureTheme = {
  id: "default-light",
  name: "Default Light",
  fontFamily: "Arial, sans-serif",
  fontSize: {
    small: 10,
    body: 12,
    label: 14,
    title: 18,
  },
  strokeWidth: {
    thin: 1,
    normal: 2,
    thick: 3,
  },
  colors: {
    background: "#ffffff",
    text: "#000000",
    mutedText: "#666666",
    primary: "#1f77b4",
    secondary: "#ff7f0e",
    accent: "#2ca02c",
    beam: "rgba(255, 0, 0, 0.3)",
    optical: "#d62728",
    acoustic: "#9467bd",
    tissue: "#f5deb3",
    device: "#7f7f7f",
    target: "#17becf",
    warning: "#ff0000",
  },
  arrow: {
    markerSize: 6,
    defaultHead: "triangle",
  },
};
