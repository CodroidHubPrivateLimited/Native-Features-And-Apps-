/**
 * Case 10: Navigation State Loss After Deep Link - FIXED VERSION
 * 
 * ✅ FIX: Deep links preserve navigation state properly
 * 
 * Solution: Proper linking configuration and state persistence
 * 
 * Note: This is a simplified demonstration. Real implementation requires
 * React Navigation's linking configuration.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';

export default function Case10DeepLinkFixed() {
  const [deepLinkUrl, setDeepLinkUrl] = useState<string | null>(null);
  const [navigationState, setNavigationState] = useState('Home');
  const [navigationStack, setNavigationStack] = useState<string[]>(['Home']);

  useEffect(() => {
    // ✅ FIX: Handle initial URL when app opens from deep link
    const getInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        handleDeepLink({ url: initialUrl });
      }
    };

    getInitialUrl();

    // ✅ FIX: Handle deep links while app is running
    const handleDeepLink = (event: { url: string }) => {
      setDeepLinkUrl(event.url);
      const path = event.url.split('://')[1];
      if (path) {
        // ✅ FIX: Preserve navigation stack instead of resetting
        setNavigationStack(prev => [...prev, path]);
        setNavigationState(path);
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, []);

  const simulateDeepLink = () => {
    const url = 'myapp://case/5';
    setDeepLinkUrl(url);
    // ✅ FIX: Add to stack instead of replacing
    setNavigationStack(prev => [...prev, 'case/5']);
    setNavigationState('case/5');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deep Link Demo (Fixed)</Text>
      <Text style={styles.subtitle}>
        Deep links preserve navigation state
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Current Navigation State:</Text>
        <Text style={styles.value}>{navigationState}</Text>
        
        <Text style={styles.label}>Navigation Stack:</Text>
        <Text style={styles.value}>{navigationStack.join(' → ')}</Text>
        
        <Text style={styles.label}>Deep Link URL:</Text>
        <Text style={styles.value}>{deepLinkUrl || 'None'}</Text>
      </View>

      <View style={styles.fixInfo}>
        <Text style={styles.fixText}>
          ✅ FIX: Deep linking properly handled:
          {'\n'}• getInitialURL() handles app opening from deep link
          {'\n'}• Navigation stack is preserved, not reset
          {'\n'}• Proper linking configuration in NavigationContainer
          {'\n'}• State persistence for better UX
          {'\n'}• In real app: Configure linking object with screen mappings
          {'\n'}• Use React Navigation's linking API properly
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
