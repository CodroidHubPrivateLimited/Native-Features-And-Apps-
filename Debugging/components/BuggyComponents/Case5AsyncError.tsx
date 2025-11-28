/**
 * Case 5: Async/Await Error Handling - BUGGY VERSION
 * 
 * 🐛 BUG: Unhandled promise rejection crashes app
 * 
 * Root Cause: Missing try-catch in async functions
 * 
 * This component demonstrates unhandled promise rejections.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { checkBugFixCondition } from '@/utils/bugFixDetection';

interface Case5AsyncErrorProps {
  onFixDetected?: () => void;
}

export default function Case5AsyncError({ onFixDetected }: Case5AsyncErrorProps = {}) {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasHandledError, setHasHandledError] = useState(false);

  /**
   * 🐛 BUG: No error handling in async function
   * 
   * If the API call fails, the promise rejection is unhandled,
   * which can crash the app or cause unexpected behavior.
   */
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    // 🐛 BUG: No try-catch block - errors are unhandled
    // Simulate API call that might fail
    const response = await fetch('https://invalid-api-url-that-will-fail.com/data');
    
    // 🐛 BUG: This will throw if response is not ok, and there's no catch
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    const json = await response.json();
    setData(json.message);
    setLoading(false);
  };

  const handleFetch = () => {
    // 🐛 BUG: Calling async function without .catch()
    // Unhandled promise rejection will occur
    fetchData();
  };

  // Detect if bug is fixed - error is handled gracefully
  useEffect(() => {
    if (error && !hasHandledError) {
      setHasHandledError(true);
      // If error is displayed (not crashing), bug is fixed
      setTimeout(() => {
        checkBugFixCondition(true, 5, 'Async/Await Error Handling', onFixDetected);
      }, 1000);
    }
  }, [error, hasHandledError, onFixDetected]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Async Error Handling (Buggy)</Text>
      <Text style={styles.subtitle}>
        Click "Fetch Data" to trigger an unhandled error
      </Text>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>❌ Error: {error}</Text>
        </View>
      )}

      {data && (
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>✅ Data: {data}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Fetch Data (Will Fail)"
          onPress={handleFetch}
          color="#FF6B6B"
        />
      </View>

      <View style={styles.debugInfo}>
        <Text style={styles.debugText}>
          🐛 BUG: Unhandled promise rejection:
          {'\n'}• No try-catch in async function
          {'\n'}• No .catch() on promise
          {'\n'}• App may crash or show unhandled error
          {'\n'}• Check console for unhandled rejection warnings
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
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    padding: 15,
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#DC3545',
    textAlign: 'center',
  },
  dataContainer: {
    padding: 15,
    backgroundColor: '#E5F5E5',
    borderRadius: 8,
    marginBottom: 20,
  },
  dataText: {
    fontSize: 16,
    color: '#28A745',
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 30,
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
