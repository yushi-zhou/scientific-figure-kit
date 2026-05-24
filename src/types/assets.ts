// src/types/assets.ts
export interface AssetMetadata {
  id: string;
  name: string;
  category: string;
  file: string;
  source?: string;
  license?: string;
  attributionRequired: boolean;
  attributionText?: string;
  tags: string[];
}
