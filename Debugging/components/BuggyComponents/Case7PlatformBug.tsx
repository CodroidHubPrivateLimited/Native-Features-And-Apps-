/**
 * Case 7: Android/iOS Platform-Specific Crash - BUGGY VERSION
 * 
 * 🐛 BUG: Works on iOS but crashes on Android (or vice versa)
 * 
 * Root Cause: Platform-specific API used without Platform.OS checks
 * 
 * This component demonstrates platform-specific crashes.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, Platform, Linking } from 'react-native';
import { checkBugFixCondition } from '@/utils/bugFixDetection';

interface Case7PlatformBugProps {
  onFixDetected?: () => void;
}

export default function Case7PlatformBug({ onFixDetected }: Case7PlatformBugProps = {}) {
  const [result, setResult] = useState<string>('');
  const [hasWorkedOnBothPlatforms, setHasWorkedOnBothPlatforms] = useState(false);

  // Detect if bug is fixed (works on current platform)
  useEffect(() => {
    if (result && !result.includes('Error') && !result.includes('Cannot')) {
      // If it worked without error, check platform
      const currentPlatform = Platform.OS;
      // This is a simplified check - in real app would need to test both platforms
      if (currentPlatform === 'ios' || currentPlatform === 'android') {
        setTimeout(() => {
          checkBugFixCondition(true, 7, 'Android/iOS Platform-Specific Crash', onFixDetected);
        }, 1000);
      }
    }
  }, [result, onFixDetected]);

  /**
   * 🐛 BUG: Using iOS-specific API without platform check
   * 
   * This will crash on Android because canOpenURL with
   * specific URL schemes behaves differently on Android.
   */
  const handleOpenSettings = async () => {
    try {
      // 🐛 BUG: iOS-specific URL scheme used without Platform.OS check
      // This works on iOS but may fail on Android
      const url = 'app-settings:';
      const canOpen = await Linking.canOpenURL(url);
      
      if (canOpen) {
        await Linking.openURL(url);
        setResult('Settings opened successfully');
      } else {
        setResult('Cannot open settings');
      }
    } catch (error) {
      // 🐛 BUG: Error might not be caught properly on Android
      setResult(`Error: ${error}`);
      Alert.alert('Error', 'Failed to open settings');
    }
  };

  /**
   * 🐛 BUG: Using Android-specific API without check
   */
  const handleOpenAndroidSettings = async () => {
    try {
      // 🐛 BUG: Android-specific intent used without Platform.OS check
      // This will fail on iOS
      const url = 'android.settings.SETTINGS';
      await Linking.openURL(url);
      setResult('Android settings opened');
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Platform-Specific Demo (Buggy)</Text>
      <Text style={styles.subtitle}>
        Try these buttons - may crash on different platforms!
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Open iOS Settings"
          onPress={handleOpenSettings}
          color="#FF6B6B"
        />
        <View style={styles.spacer} />
        <Button
          title="Open Android Settings"
          onPress={handleOpenAndroidSettings}
          color="#FF6B6B"
        />
      </View>

      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      )}

      <View style={styles.debugInfo}>
        <Text style={styles.debugText}>
          🐛 BUG: Platform-specific code without checks:
          {'\n'}• iOS-specific URL scheme used without Platform.OS check
          {'\n'}• Android-specific intent used without Platform.OS check
          {'\n'}• App may crash on unsupported platform
          {'\n'}• No fallback for unsupported platforms
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
  debugInfo: {
    padding: 15,
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  debugText: {
    fontSize: 12,
    color: '#856404',
    lineHeight: 18,
  },
});
