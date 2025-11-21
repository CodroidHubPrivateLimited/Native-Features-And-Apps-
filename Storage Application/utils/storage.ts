import AsyncStorage from '@react-native-async-storage/async-storage';
import { FileItem, PreferenceItem } from '../types';

// Load all files from AsyncStorage
export const loadFiles = async (): Promise<FileItem[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const fileItems: FileItem[] = [];
    
    for (const key of keys.filter(k => k.startsWith('file_'))) {
      const data = await AsyncStorage.getItem(key);
      if (data) {
        try {
          const item: FileItem = JSON.parse(data);
          fileItems.push(item);
        } catch {}
      }
    }
    return fileItems;
  } catch {
    return [];
  }
};

// Load all preferences
export const loadPreferences = async (): Promise<PreferenceItem[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const validKeys = keys.filter(k => !k.startsWith('file_'));
    
    const items = await Promise.all(
      validKeys.map(async k => ({
        key: k,
        value: (await AsyncStorage.getItem(k)) || ''
      }))
    );
    
    return items.filter(p => p.value);
  } catch {
    return [];
  }
};

// Delete a file
export const deleteFile = async (uri: string) => {
  const keys = await AsyncStorage.getAllKeys();
  for (const key of keys.filter(k => k.startsWith('file_'))) {
    const data = await AsyncStorage.getItem(key);
    if (data && JSON.parse(data).uri === uri) {
      await AsyncStorage.removeItem(key);
      break;
    }
  }
};

// Delete a preference
export const deletePreference = async (key: string) => {
  await AsyncStorage.removeItem(key);
};

// Format file size for display
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / 1048576).toFixed(2)} MB`;
};
