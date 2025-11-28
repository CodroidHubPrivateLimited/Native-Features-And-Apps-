/**
 * Case 4: Memory Leak from Uncleared Timers - FIXED VERSION
 * 
 * ✅ FIX: Timers are properly cleaned up on unmount
 * 
 * Solution: Cleanup function in useEffect to clear intervals
 * 
 * This component demonstrates the correct way to handle timers with cleanup.
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Case4MemoryLeakFixed() {
  const [count, setCount] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerActive) {
      /**
       * ✅ FIX: Timer is properly managed with cleanup
       * 
       * The cleanup function ensures the interval is cleared when:
       * - Component unmounts
       * - timerActive changes to false
       * - Dependencies change
       */
      intervalRef.current = setInterval(() => {
        setCount(prev => prev + 1);
        console.log('Timer tick:', count);
      }, 1000);

      // ✅ FIX: Cleanup function clears the interval
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          console.log('Timer cleaned up');
        }
      };
    } else {
      // ✅ FIX: Also clear when timer becomes inactive
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [timerActive]); // ✅ FIX: Removed count from dependencies

  // ✅ FIX: Additional cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        console.log('Component unmounted - timer cleared');
      }
    };
  }, []);

  const handleStart = () => {
    setTimerActive(true);
    setCount(0);
  };

  const handleStop = () => {
    setTimerActive(false);
    // ✅ FIX: Timer is already cleared by useEffect cleanup
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memory Leak Demo (Fixed)</Text>
      <Text style={styles.subtitle}>
        Timer properly cleaned up on stop/unmount
      </Text>

      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>Count: {count}</Text>
        <Text style={styles.statusText}>
          Timer: {timerActive ? 'Running' : 'Stopped'}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Start Timer"
          onPress={handleStart}
          color="#4ECDC4"
        />
        <View style={styles.spacer} />
        <Button
          title="Stop Timer"
          onPress={handleStop}
          color="#95A5A6"
        />
      </View>

      <View style={styles.fixInfo}>
        <Text style={styles.fixText}>
          ✅ FIX: Timer properly managed:
          {'\n'}• Cleanup function in useEffect clears interval
          {'\n'}• Timer stops when component unmounts
          {'\n'}• No memory leaks
          {'\n'}• Check console - logs stop after cleanup
          {'\n'}• Memory profiler shows stable memory usage
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
  statusText: {
    fontSize: 18,
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
    fontSize: 12,
    color: '#155724',
    lineHeight: 18,
  },
});
