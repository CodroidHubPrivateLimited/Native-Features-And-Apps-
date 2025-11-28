/**
 * Case 1: State Update Not Rendering - BUGGY VERSION
 * 
 * 🐛 BUG: Component state updates but UI doesn't re-render
 * 
 * Root Cause: Direct mutation of state instead of creating new reference
 * 
 * This component demonstrates the bug where state is mutated directly,
 * preventing React from detecting the change and re-rendering the component.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { checkBugFixCondition } from '@/utils/bugFixDetection';

interface Case1StateBugProps {
  onFixDetected?: () => void;
}

export default function Case1StateBug({ onFixDetected }: Case1StateBugProps = {}) {
  // State to hold counter value
  const [counter, setCounter] = useState({ count: 0 });
  const [previousCount, setPreviousCount] = useState(0);

  /**
   * 🐛 BUG: Direct mutation of state object
   * 
   * This function directly mutates the counter object by incrementing
   * the count property. React uses shallow comparison to detect state changes,
   * so mutating the same object reference doesn't trigger a re-render.
   * 
   * DEBUG TIP: Check React DevTools - you'll see the state object's
   * count property changes, but the component doesn't re-render.
   */
  const handleIncrement = () => {
    // 🐛 BUG: Direct mutation - this won't trigger re-render
    counter.count++;
    
    // This setState call doesn't help because we're passing the same object reference
    setCounter(counter);
    
    // Debug log to verify state is changing
    console.log('Counter value:', counter.count);
  };

  // Detect if bug is fixed (counter actually updates in UI)
  useEffect(() => {
    // If counter.count changed but UI didn't update, the bug still exists
    // If counter.count changed AND it's different from previous, bug might be fixed
    if (counter.count > previousCount && counter.count > 0) {
      // Check if the displayed count matches the actual count
      // This is a simple check - in real scenario, we'd check if UI updated
      const isFixed = counter.count !== previousCount;
      if (isFixed && counter.count >= 3) {
        // If counter reached 3 or more, assume bug is fixed
        checkBugFixCondition(true, 1, 'State Update Not Rendering', onFixDetected);
      }
    }
    setPreviousCount(counter.count);
  }, [counter.count, previousCount, onFixDetected]);

  /**
   * Reset function to reset counter to 0
   */
  const handleReset = () => {
    // This works because we're creating a new object
    setCounter({ count: 0 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter Demo (Buggy)</Text>
      <Text style={styles.subtitle}>Click the button to increment</Text>
      
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>Count: {counter.count}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          title="Increment Counter" 
          onPress={handleIncrement}
          color="#FF6B6B"
        />
        <View style={styles.spacer} />
        <Button 
          title="Reset" 
          onPress={handleReset}
          color="#4ECDC4"
        />
      </View>

      <View style={styles.debugInfo}>
        <Text style={styles.debugText}>
          🐛 BUG: The counter value in state changes (check console),
          but the UI doesn't update because we're mutating the object directly.
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
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
    color: '#FF6B6B',
  },
  buttonContainer: {
    marginBottom: 30,
  },
  spacer: {
    height: 10,
  },
  debugInfo: {
    padding: 15,
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  debugText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
});

