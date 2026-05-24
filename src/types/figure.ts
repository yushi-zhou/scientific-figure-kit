// src/types/figure.ts
import { AssetMetadata } from './assets';

export interface AssetLicenseRecord {
  assetId: string;
  license: string;
}

export interface FigureDocument<TParams = Record<string, unknown>> {
  version: string;
  templateId: string;
  title: string;
  params: TParams;
  themeId: string;
  canvas: {
    width: number;
    height: number;
    background: "transparent" | "white";
  };
  metadata: {
    createdAt: string;
    updatedAt: string;
    author?: string;
    notes?: string;
    assetLicenses?: AssetLicenseRecord[];
  };
}
