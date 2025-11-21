


import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles/index.styles';
import { deleteFile, deletePreference, formatFileSize, loadFiles, loadPreferences } from './utils/storage';
import { FileItem, PreferenceItem } from './types';





export default function App() {



  const [fileText, setFileText] = useState('');
  const [selectedFileUri, setSelectedFileUri] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [prefKey, setPrefKey] = useState('');
  const [prefValue, setPrefValue] = useState('');
  const [showViewAll, setShowViewAll] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [preferences, setPreferences] = useState<PreferenceItem[]>([]);





  
  const handleUploadFile = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant access to your media library.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: false,
        quality: 1,
      });

      if (result.canceled || !result.assets?.[0]) return;

      const asset = result.assets[0];
      setSelectedFileUri(asset.uri);
      setSelectedFileName(asset.fileName || `file_${Date.now()}`);
      Alert.alert('Success', 'File selected! Add description and save.');
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'Failed to upload file.');
    }
  };







 
  const handleSaveFile = async () => {
    if (!selectedFileUri || !fileText.trim()) {
      Alert.alert('Error', 'Please select a file and enter a description.');
      return;
    }

    try {
      await AsyncStorage.setItem(`file_${selectedFileUri}`, JSON.stringify({
        name: selectedFileName,
        uri: selectedFileUri,
        size: 0,
        description: fileText.trim(),
      }));
      Alert.alert('Success', 'File saved!');
      setFileText('');
      setSelectedFileUri(null);
      setSelectedFileName('');
    } catch {
      Alert.alert('Error', 'Failed to save file.');
    }
  };




 
  const handleSavePreference = async () => {
    if (!prefKey.trim() || !prefValue.trim()) {
      Alert.alert('Error', 'Please enter both key and value.');
      return;
    }

    try {
      await AsyncStorage.setItem(prefKey.trim(), prefValue.trim());
      Alert.alert('Success', 'Preference saved!');
      setPrefKey('');
      setPrefValue('');
    } catch {
      Alert.alert('Error', 'Failed to save preference.');
    }
  };





 
  const loadAllData = async () => {
    const loadedFiles = await loadFiles();
    const loadedPrefs = await loadPreferences();
    setFiles(loadedFiles);
    setPreferences(loadedPrefs);
  };




  // Delete file
  const handleDeleteFile = async (uri: string) => {
    Alert.alert('Delete File', 'Are you sure?', [ 
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteFile(uri);
          await loadAllData();
          Alert.alert('Success', 'File deleted!');
        },
      },
    ]);
  };



 
  const handleDeletePreference = async (key: string) => {
    Alert.alert('Delete Preference', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deletePreference(key);
          await loadAllData();
          Alert.alert('Success', 'Preference deleted!');
        },
      },
    ]);
  };





  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="auto" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Data Storage App</Text>

        {/* File Storage */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>File Storage</Text>
          
          <TouchableOpacity style={styles.uploadButton} onPress={handleUploadFile}>
            <Text style={styles.buttonText}>Upload File</Text>
          </TouchableOpacity>

          {selectedFileName ? (
            <Text style={styles.selectedFileText}>Selected: {selectedFileName}</Text>
          ) : null}

          <TextInput
            style={styles.textInput}
            placeholder={selectedFileUri ? "Enter description..." : "Upload a file first"}
            multiline
            numberOfLines={3}
            value={fileText}
            onChangeText={setFileText}
            placeholderTextColor="#999"
            editable={!!selectedFileUri}
          />

          <TouchableOpacity
            style={[styles.saveButton, !selectedFileUri && styles.disabledButton]}
            onPress={handleSaveFile}
            disabled={!selectedFileUri}
          >
            <Text style={styles.buttonText}>Save File</Text>
          </TouchableOpacity>
        </View>

        {/* Shared Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shared Preferences</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Key"
            value={prefKey}
            onChangeText={setPrefKey}
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="Value"
            value={prefValue}
            onChangeText={setPrefValue}
            placeholderTextColor="#999"
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSavePreference}>
            <Text style={styles.buttonText}>Save Preference</Text>
          </TouchableOpacity>
        </View>

        {/* View All Button */}
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={async () => {
            setShowViewAll(true);
            await loadAllData();
          }}
        >
          <Text style={styles.viewAllButtonText}>View All Data</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* View All Modal */}
      <Modal
        visible={showViewAll}
        transparent
        animationType="slide"
        onRequestClose={() => setShowViewAll(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>All Stored Data</Text>

            <ScrollView>
              <Text style={styles.sectionTitle}>Files ({files.length})</Text>
              {files.length === 0 ? (
                <Text style={styles.emptyText}>No files stored</Text>
              ) : (
                files.map((file, index) => (
                  <View key={index} style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>{file.name}</Text>
                    <Text style={styles.itemText}>Size: {formatFileSize(file.size)}</Text>
                    {file.description && (
                      <Text style={styles.itemText}>Description: {file.description}</Text>
                    )}
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteFile(file.uri)}
                    >
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                ))
              )}

              <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
                Preferences ({preferences.length})
              </Text>
              {preferences.length === 0 ? (
                <Text style={styles.emptyText}>No preferences stored</Text>
              ) : (
                preferences.map((pref, index) => (
                  <View key={index} style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>{pref.key}</Text>
                    <Text style={styles.itemText}>Value: {pref.value}</Text>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeletePreference(pref.key)}
                    >
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </ScrollView>

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowViewAll(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}













