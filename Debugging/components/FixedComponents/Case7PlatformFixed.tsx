/**
 * Case 7: Android/iOS Platform-Specific Crash - FIXED VERSION
 * 
 * ✅ FIX: Platform-specific code properly handled
 * 
 * Solution: Platform.OS checks and Platform.select()
 * 
 * This component demonstrates the correct way to handle platform differences.
 */

import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Platform, Linking } from 'react-native';

export default function Case7PlatformFixed() {
  const [result, setResult] = useState<string>('');

  /**
   * ✅ FIX: Platform-specific code with proper checks
   * 
   * Uses Platform.OS to check the current platform and
   * Platform.select() for cleaner conditional logic.
   */
  const handleOpenSettings = async () => {
    try {
      // ✅ FIX: Platform-specific URL using Platform.select()
      const settingsUrl = Platform.select({
        ios: 'app-settings:',
        android: 'android.settings.SETTINGS',
        default: '',
      });

      if (!settingsUrl) {
        setResult('Settings not available on this platform');
        return;
      }

      const canOpen = await Linking.canOpenURL(settingsUrl);
      
      if (canOpen) {
        await Linking.openURL(settingsUrl);
        setResult('Settings opened successfully');
      } else {
        setResult('Cannot open settings');
      }
    } catch (error) {
      // ✅ FIX: Proper error handling for all platforms
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setResult(`Error: ${errorMessage}`);
      Alert.alert('Error', 'Failed to open settings');
    }
  };

  /**
   * ✅ FIX: Alternative approach using Platform.OS directly
   */
  const handleOpenSettingsAlt = async () => {
    try {
      let url: string;
      
      // ✅ FIX: Explicit Platform.OS check
      if (Platform.OS === 'ios') {
        url = 'app-settings:';
      } else if (Platform.OS === 'android') {
        url = 'android.settings.SETTINGS';
      } else {
        setResult('Unsupported platform');
        return;
      }

      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
        setResult('Settings opened successfully');
      } else {
        setResult('Cannot open settings');
      }
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Platform-Specific Demo (Fixed)</Text>
      <Text style={styles.subtitle}>
        Platform: {Platform.OS} - Code adapts automatically
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Open Settings (Platform.select)"
          onPress={handleOpenSettings}
          color="#4ECDC4"
        />
        <View style={styles.spacer} />
        <Button
          title="Open Settings (Platform.OS)"
          onPress={handleOpenSettingsAlt}
          color="#4ECDC4"
        />
      </View>

      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      )}

      <View style={styles.fixInfo}>
        <Text style={styles.fixText}>
          ✅ FIX: Platform-specific code properly handled:
          {'\n'}• Platform.OS check before using platform APIs
          {'\n'}• Platform.select() for cleaner conditional logic
          {'\n'}• Fallback for unsupported platforms
          {'\n'}• Proper error handling for all platforms
          {'\n'}• App works correctly on both iOS and Android
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  spacer: {
    height: 10,
  },
  resultContainer: {
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  fixInfo: {
    padding: 15,
    backgroundColor: '#D4EDDA',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#28A745',
  },
  fixText: {
    fontSize: 12,
    color: '#155724',
    lineHeight: 18,
  },
});
