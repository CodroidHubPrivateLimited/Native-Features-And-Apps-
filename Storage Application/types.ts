// Type definitions for the app
export interface FileItem {
  name: string;
  uri: string;
  size: number;
  description?: string;
}

export interface PreferenceItem {
  key: string;
  value: string;
}

