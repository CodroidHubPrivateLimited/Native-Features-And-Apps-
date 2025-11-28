/**
 * Case 9: Redux State Not Updating Component - BUGGY VERSION
 * 
 * 🐛 BUG: Redux state changes but component doesn't update
 * 
 * Root Cause: Incorrect selector or misuse of useSelector dependencies
 * 
 * Note: This is a simplified example. In a real app, you'd need Redux setup.
 * This demonstrates the concept without requiring Redux installation.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { checkBugFixCondition } from '@/utils/bugFixDetection';

// 🐛 BUG: Simulating Redux state - selector creates new reference each time
interface MockState {
  user: {
    name: string;
    email: string;
  };
  counter: number;
}

const mockState: MockState = {
  user: {
    name: 'John Doe',
    email: 'john@example.com',
  },
  counter: 0,
};

// 🐛 BUG: Selector function creates new object on every call
const selectUser = (state: MockState) => {
  // 🐛 BUG: Returns new object reference each time
  // This causes useSelector to think state changed even when it didn't
  return {
    name: state.user.name,
    email: state.user.email,
  };
};

// 🐛 BUG: Another problematic selector
const selectCounter = (state: MockState) => {
  // 🐛 BUG: Direct return might work, but if we transform it...
  return state.counter;
};

interface Case9ReduxBugProps {
  onFixDetected?: () => void;
}

export default function Case9ReduxBug({ onFixDetected }: Case9ReduxBugProps = {}) {
  // 🐛 BUG: Simulating useSelector - selector creates new reference
  const [user, setUser] = useState(selectUser(mockState));
  const [counter, setCounter] = useState(selectCounter(mockState));
  const [renderCount, setRenderCount] = useState(0);
  const [previousRenderCount, setPreviousRenderCount] = useState(0);

  // 🐛 BUG: This simulates what happens with bad selector
  const handleUpdateUser = () => {
    // Simulate Redux action
    mockState.user.name = 'Jane Doe';
    // 🐛 BUG: Selector returns new object, but values are same
    // Component might not update because shallow comparison fails
    const newUser = selectUser(mockState);
    setUser(newUser);
    setRenderCount(prev => prev + 1);
  };

  const handleIncrement = () => {
    mockState.counter += 1;
    setCounter(selectCounter(mockState));
    setRenderCount(prev => prev + 1);
  };

  // Detect if bug is fixed (state updates properly)
  useEffect(() => {
    if (renderCount > previousRenderCount && renderCount < 5) {
      // If render count is reasonable (not excessive), bug might be fixed
      setTimeout(() => {
        if (counter > 0 && user.name) {
          checkBugFixCondition(true, 9, 'Redux State Not Updating Component', onFixDetected);
        }
      }, 1000);
    }
    setPreviousRenderCount(renderCount);
  }, [renderCount, previousRenderCount, counter, user, onFixDetected]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redux State Demo (Buggy)</Text>
      <Text style={styles.subtitle}>
        Simulated Redux selector issues
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>User Name:</Text>
        <Text style={styles.value}>{user.name}</Text>
        
        <Text style={styles.label}>User Email:</Text>
        <Text style={styles.value}>{user.email}</Text>
        
        <Text style={styles.label}>Counter:</Text>
        <Text style={styles.value}>{counter}</Text>
        
        <Text style={styles.label}>Render Count:</Text>
        <Text style={styles.value}>{renderCount}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Update User (Bad Selector)"
          onPress={handleUpdateUser}
          color="#FF6B6B"
        />
        <View style={styles.spacer} />
        <Button
          title="Increment Counter"
          onPress={handleIncrement}
          color="#FF6B6B"
        />
      </View>

      <View style={styles.debugInfo}>
        <Text style={styles.debugText}>
          🐛 BUG: Redux selector issues:
          {'\n'}• Selector creates new object reference each time
          {'\n'}• useSelector uses shallow equality - new reference = re-render
          {'\n'}• Even if values are same, component re-renders unnecessarily
          {'\n'}• Or worse: if selector is not memoized, might miss updates
          {'\n'}• Need to use reselect or memoize selectors properly
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
    fontSize: 12,
    color: '#856404',
    lineHeight: 18,
  },
});
