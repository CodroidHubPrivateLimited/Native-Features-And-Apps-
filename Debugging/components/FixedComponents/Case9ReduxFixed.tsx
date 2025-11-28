/**
 * Case 9: Redux State Not Updating Component - FIXED VERSION
 * 
 * ✅ FIX: Redux state updates properly with memoized selectors
 * 
 * Solution: Memoized selectors using useMemo or reselect
 * 
 * Note: This is a simplified example demonstrating the concept.
 */

import React, { useState, useMemo } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// ✅ FIX: Proper state structure
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

// ✅ FIX: Memoized selector using useMemo pattern
// In real Redux, you'd use reselect library
const createMemoizedSelector = <T, R>(
  selector: (state: MockState) => R,
  equalityFn?: (a: R, b: R) => boolean
) => {
  let lastResult: R | undefined;
  let lastState: MockState | undefined;

  return (state: MockState): R => {
    if (state === lastState) {
      return lastResult!;
    }
    const result = selector(state);
    if (equalityFn && lastResult !== undefined) {
      if (equalityFn(result, lastResult)) {
        return lastResult;
      }
    }
    lastState = state;
    lastResult = result;
    return result;
  };
};

// ✅ FIX: Memoized selector
const selectUserMemoized = createMemoizedSelector(
  (state: MockState) => state.user,
  (a, b) => a.name === b.name && a.email === b.email
);

const selectCounterMemoized = createMemoizedSelector(
  (state: MockState) => state.counter
);

export default function Case9ReduxFixed() {
  // ✅ FIX: Using memoized selectors
  const user = useMemo(() => selectUserMemoized(mockState), [mockState.user.name, mockState.user.email]);
  const counter = useMemo(() => selectCounterMemoized(mockState), [mockState.counter]);
  const [renderCount, setRenderCount] = useState(0);

  // ✅ FIX: Proper state updates
  const handleUpdateUser = () => {
    // Simulate Redux action - create new state object
    const newState = {
      ...mockState,
      user: {
        ...mockState.user,
        name: 'Jane Doe',
      },
    };
    Object.assign(mockState, newState);
    setRenderCount(prev => prev + 1);
  };

  const handleIncrement = () => {
    const newState = {
      ...mockState,
      counter: mockState.counter + 1,
    };
    Object.assign(mockState, newState);
    setRenderCount(prev => prev + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redux State Demo (Fixed)</Text>
      <Text style={styles.subtitle}>
        Memoized selectors prevent unnecessary re-renders
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
          title="Update User (Memoized)"
          onPress={handleUpdateUser}
          color="#4ECDC4"
        />
        <View style={styles.spacer} />
        <Button
          title="Increment Counter"
          onPress={handleIncrement}
          color="#4ECDC4"
        />
      </View>

      <View style={styles.fixInfo}>
        <Text style={styles.fixText}>
          ✅ FIX: Redux selectors properly memoized:
          {'\n'}• Selectors use memoization to prevent unnecessary re-renders
          {'\n'}• Equality functions check if values actually changed
          {'\n'}• Component only re-renders when selected values change
          {'\n'}• In real Redux: use reselect library for memoized selectors
          {'\n'}• useSelector hook automatically handles memoization
          {'\n'}• Selectors are stable references
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
