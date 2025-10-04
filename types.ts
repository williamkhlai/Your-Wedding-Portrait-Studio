export enum AppStep {
  Upload = 'UPLOAD',
  StyleSelection = 'STYLE_SELECTION',
  Generating = 'GENERATING',
  Result = 'RESULT',
}

export interface UploadedImage {
  base64: string;
  mimeType: string;
  url: string;
}

export interface WeddingScene {
  id: string;
  name: string;
}

export interface WeddingStyle {
  id: string;
  name: string;
  description: string;
  scenes: WeddingScene[];
}