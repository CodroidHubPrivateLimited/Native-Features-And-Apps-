/**
 * Case 11: Infinite Loop in useEffect - BUGGY VERSION
 * 
 * 🐛 BUG: Component re-renders infinitely and app freezes
 * 
 * Root Cause: Incorrect/missing dependency array in useEffect
 * 
 * This component demonstrates the bug where useEffect creates an infinite
 * re-render loop due to incorrect dependencies.
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { checkBugFixCondition } from '@/utils/bugFixDetection';

interface Case11InfiniteLoopProps {
  onFixDetected?: () => void;
}

export default function Case11InfiniteLoop({ onFixDetected }: Case11InfiniteLoopProps = {}) {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);
  const renderCountRef = useRef(0);
  const stableRenderCheck = useRef(0);

  /**
   * 🐛 BUG: Missing dependency in useEffect array
   * 
   * This useEffect runs after every render. Inside, we update the count state.
   * Since count is not in the dependency array, but we're using it, and
   * updating state causes a re-render, this creates an infinite loop.
   * 
   * DEBUG TIP: Check React DevTools Profiler - you'll see continuous
   * re-renders. Check console for render count increasing rapidly.
   */
  useEffect(() => {
    // 🐛 BUG: This runs on every render because dependencies are missing
    // Updating state here causes another render, which triggers this again
    setCount(count + 1);
    
    // Track render count to demonstrate the loop
    setRenderCount(prev => prev + 1);
    renderCountRef.current += 1;
    
    console.log('useEffect ran - count:', count, 'renderCount:', renderCount);
    
    // 🐛 BUG: Missing dependency array or incorrect dependencies
    // This should have [count] in dependencies, but that would also cause issues
    // The real fix is to use functional update or remove the dependency
  }); // Missing dependency array!

  // Detect if bug is fixed (no infinite loop - render count stabilizes)
  useEffect(() => {
    const checkTimer = setTimeout(() => {
      // If render count hasn't increased significantly in 2 seconds, bug might be fixed
      const currentRenders = renderCountRef.current;
      if (currentRenders === stableRenderCheck.current && currentRenders < 10) {
        // Render count is stable, bug is likely fixed
        checkBugFixCondition(true, 11, 'Infinite Loop in useEffect', onFixDetected);
      }
      stableRenderCheck.current = currentRenders;
    }, 2000);

    return () => clearTimeout(checkTimer);
  }, [renderCount, onFixDetected]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Infinite Loop Demo (Buggy)</Text>
      <Text style={styles.warning}>⚠️ This will freeze your app!</Text>
      
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>Count: {count}</Text>
        <Text style={styles.renderText}>Renders: {renderCount}</Text>
      </View>

      <View style={styles.debugInfo}>
        <Text style={styles.debugText}>
          🐛 BUG: The useEffect runs on every render, updates state,
          which causes another render, creating an infinite loop.
          The app will freeze and become unresponsive.
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
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  warning: {
    fontSize: 18,
    color: '#DC3545',
    fontWeight: 'bold',
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
    color: '#FF6B6B',
    marginBottom: 10,
  },
  renderText: {
    fontSize: 24,
    color: '#666',
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

