export interface LegendConfigItem {
  value: string;
  color: string;
}

export interface LegendConfig {
  id: string;
  name: string;
  description?: string;
  icon?: Element;
  type?: string;
  items?: LegendConfigItem[];
}

export interface LayerGroup {
  id: string;
  dataset: string;
  visibility: boolean;
  layers: ActivableLayer[];
}

export interface ActivableLayer extends Layer {
  active: boolean;
}

export interface Layer {
  id: string;
  name: string;
  default?: boolean;
  description?: string;
  legendConfig: LegendConfig[];
}

export interface Widget {
  id: string;
  default?: boolean;
}

interface MetadataInfo {
  name?: string;
}

export interface DatasetMetadata {
  name: string;
  description?: string;
  source?: string;
  info: MetadataInfo;
}
export interface Dataset {
  id: string;
  active?: boolean;
  name: string;
  layer: Layer[];
  widget: Widget[];
  metadata: DatasetMetadata[];
  dataLastUpdated: string;
}

export interface BasemapOptions {
  attribution: string;
}
