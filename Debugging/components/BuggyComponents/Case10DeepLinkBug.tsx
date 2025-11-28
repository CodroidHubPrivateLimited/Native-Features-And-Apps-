/**
 * Case 10: Navigation State Loss After Deep Link - BUGGY VERSION
 * 
 * 🐛 BUG: App navigation resets when opening deep link
 * 
 * Root Cause: Improper linking configuration / state persistence missing
 * 
 * Note: This is a simplified demonstration. Real deep linking requires
 * proper React Navigation setup which is complex to demonstrate here.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { checkBugFixCondition } from '@/utils/bugFixDetection';

interface Case10DeepLinkBugProps {
  onFixDetected?: () => void;
}

export default function Case10DeepLinkBug({ onFixDetected }: Case10DeepLinkBugProps = {}) {
  const [deepLinkUrl, setDeepLinkUrl] = useState<string | null>(null);
  const [navigationState, setNavigationState] = useState('Home');
  const [hasHandledDeepLink, setHasHandledDeepLink] = useState(false);

  useEffect(() => {
    // 🐛 BUG: Basic deep link handling without proper navigation state management
    const handleDeepLink = (event: { url: string }) => {
      setDeepLinkUrl(event.url);
      // 🐛 BUG: Directly setting navigation state without preserving current state
      // In real app, this would reset the navigation stack
      const path = event.url.split('://')[1];
      if (path) {
        setNavigationState(path);
      }
    };

    // 🐛 BUG: No initial URL check
    // When app opens from deep link, initial URL is not handled
    
    const subscription = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, []);

  const simulateDeepLink = () => {
    // Simulate receiving a deep link
    const url = 'myapp://case/5';
    setDeepLinkUrl(url);
    // 🐛 BUG: Navigation state is reset, losing previous navigation
    setNavigationState('case/5');
    setHasHandledDeepLink(true);
  };

  // Detect if bug is fixed (deep link handled properly)
  useEffect(() => {
    if (hasHandledDeepLink && deepLinkUrl && navigationState) {
      setTimeout(() => {
        // If deep link was handled and navigation state exists, bug might be fixed
        if (navigationState.includes('case')) {
          checkBugFixCondition(true, 10, 'Navigation State Loss After Deep Link', onFixDetected);
        }
      }, 1000);
    }
  }, [hasHandledDeepLink, deepLinkUrl, navigationState, onFixDetected]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deep Link Demo (Buggy)</Text>
      <Text style={styles.subtitle}>
        Deep links reset navigation state
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Current Navigation State:</Text>
        <Text style={styles.value}>{navigationState}</Text>
        
        <Text style={styles.label}>Deep Link URL:</Text>
        <Text style={styles.value}>{deepLinkUrl || 'None'}</Text>
      </View>

      <View style={styles.debugInfo}>
        <Text style={styles.debugText}>
          🐛 BUG: Deep linking issues:
          {'\n'}• No initial URL handling (getInitialURL)
          {'\n'}• Navigation state is reset on deep link
          {'\n'}• Previous navigation stack is lost
          {'\n'}• No proper linking configuration
          {'\n'}• Missing state persistence
          {'\n'}• In real app: Need proper React Navigation linking config
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
  infoContainer: {
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    color: '#666',
  },
  value: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
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
