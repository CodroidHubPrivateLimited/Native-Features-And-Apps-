/**
 * Case 1: State Update Not Rendering - FIXED VERSION
 * 
 * ✅ FIX: Component now properly re-renders when state updates
 * 
 * Solution: Create new object reference instead of mutating existing one
 * 
 * This component demonstrates the correct way to update state objects
 * by creating a new reference, which allows React to detect changes.
 */

import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Case1StateFixed() {
  // State to hold counter value
  const [counter, setCounter] = useState({ count: 0 });

  /**
   * ✅ FIX: Create new object reference
   * 
   * Instead of mutating the existing counter object, we create a new
   * object with the updated count value. This ensures React detects
   * the state change and triggers a re-render.
   * 
   * DEBUG TIP: React DevTools will show the state update, and the
   * component will re-render correctly.
   */
  const handleIncrement = () => {
    // ✅ FIX: Create new object with spread operator
    setCounter({ ...counter, count: counter.count + 1 });
    
    // Alternative approach using functional update (better for complex state)
    // setCounter(prevCounter => ({ ...prevCounter, count: prevCounter.count + 1 }));
    
    // Debug log to verify state is changing
    console.log('Counter value:', counter.count + 1);
  };

  /**
   * Reset function to reset counter to 0
   */
  const handleReset = () => {
    setCounter({ count: 0 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter Demo (Fixed)</Text>
      <Text style={styles.subtitle}>Click the button to increment</Text>
      
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>Count: {counter.count}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          title="Increment Counter" 
          onPress={handleIncrement}
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
          ✅ FIX: The counter now updates correctly because we create a new
          object reference instead of mutating the existing one.
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
    color: '#4ECDC4',
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

