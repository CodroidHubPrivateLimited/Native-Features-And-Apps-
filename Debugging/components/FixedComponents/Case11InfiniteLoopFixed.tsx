/**
 * Case 11: Infinite Loop in useEffect - FIXED VERSION
 * 
 * ✅ FIX: useEffect now runs only when appropriate, preventing infinite loops
 * 
 * Solution: Correct dependency array and functional state updates
 * 
 * This component demonstrates the correct way to handle useEffect dependencies.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Case11InfiniteLoopFixed() {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  /**
   * ✅ FIX: Proper dependency array and functional updates
   * 
   * Option 1: If we want to run effect only on mount, use empty array
   * Option 2: If we need to respond to count changes, include it in deps
   * Option 3: Use functional update to avoid needing count in deps
   * 
   * DEBUG TIP: React DevTools will show controlled re-renders.
   * Console logs will show effect running only when appropriate.
   */
  useEffect(() => {
    // ✅ FIX: Use functional update to avoid needing count in dependencies
    // This way, we can update based on previous state without causing loop
    setCount(prevCount => {
      // Only increment if less than 10 to demonstrate controlled updates
      if (prevCount < 10) {
        return prevCount + 1;
      }
      return prevCount;
    });
    
    // Track render count (this is just for demo)
    setRenderCount(prev => prev + 1);
    
    console.log('useEffect ran - renderCount:', renderCount);
    
    // ✅ FIX: Empty dependency array means this runs only on mount
    // If we needed to respond to other values, we'd include them here
  }, []); // Empty array = run only on mount

  const handleManualIncrement = () => {
    setCount(prev => prev + 1);
  };

  const handleReset = () => {
    setCount(0);
    setRenderCount(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Infinite Loop Demo (Fixed)</Text>
      <Text style={styles.subtitle}>Effect runs only on mount</Text>
      
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>Count: {count}</Text>
        <Text style={styles.renderText}>Effect Runs: {renderCount}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          title="Manual Increment" 
          onPress={handleManualIncrement}
          color="#4ECDC4"
        />
        <View style={styles.spacer} />
        <Button 
          title="Reset" 
          onPress={handleReset}
          color="#95A5A6"
        />
      </View>

      <View style={styles.fixInfo}>
        <Text style={styles.fixText}>
          ✅ FIX: Using empty dependency array [] means useEffect runs only
          on mount. Using functional updates (prev => prev + 1) allows us to
          update state without needing it in dependencies, preventing loops.
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
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  counterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 30,
  },
  counterText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4ECDC4',
    marginBottom: 10,
  },
  renderText: {
    fontSize: 24,
    color: '#666',
  },
  buttonContainer: {
    marginBottom: 30,
  },
  spacer: {
    height: 10,
  },
  fixInfo: {
    padding: 15,
    backgroundColor: '#D4EDDA',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#28A745',
  },
  fixText: {
    fontSize: 14,
    color: '#155724',
    lineHeight: 20,
  },
});

