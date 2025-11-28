/**
 * Case 5: Async/Await Error Handling - FIXED VERSION
 * 
 * ✅ FIX: Proper error handling with try-catch and error boundaries
 * 
 * Solution: Try-catch blocks and proper error state management
 * 
 * This component demonstrates the correct way to handle async errors.
 */

import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';

export default function Case5AsyncErrorFixed() {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * ✅ FIX: Proper error handling with try-catch
   * 
   * All async operations are wrapped in try-catch to handle
   * errors gracefully and provide user feedback.
   */
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      // ✅ FIX: Try-catch block handles all errors
      // Simulate API call that might fail
      const response = await fetch('https://invalid-api-url-that-will-fail.com/data');
      
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      
      const json = await response.json();
      setData(json.message);
    } catch (err) {
      // ✅ FIX: Catch and handle errors gracefully
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Fetch error:', err);
      
      // ✅ FIX: Could also send to error tracking service (e.g., Sentry)
      // Sentry.captureException(err);
    } finally {
      // ✅ FIX: Always reset loading state
      setLoading(false);
    }
  };

  const handleFetch = () => {
    // ✅ FIX: Function is already error-handled, safe to call
    fetchData();
  };

  const handleRetry = () => {
    fetchData();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Async Error Handling (Fixed)</Text>
      <Text style={styles.subtitle}>
        Errors are caught and displayed gracefully
      </Text>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4ECDC4" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>❌ Error: {error}</Text>
          <Button
            title="Retry"
            onPress={handleRetry}
            color="#FF6B6B"
          />
        </View>
      )}

      {data && (
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>✅ Data: {data}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Fetch Data"
          onPress={handleFetch}
          color="#4ECDC4"
          disabled={loading}
        />
      </View>

      <View style={styles.fixInfo}>
        <Text style={styles.fixText}>
          ✅ FIX: Proper error handling:
          {'\n'}• Try-catch block wraps async operations
          {'\n'}• Errors are caught and displayed to user
          {'\n'}• Loading state managed in finally block
          {'\n'}• User can retry failed operations
          {'\n'}• Errors logged for debugging
          {'\n'}• App doesn't crash on errors
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
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#DC3545',
    textAlign: 'center',
    marginBottom: 10,
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
