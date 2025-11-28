/**
 * Case 4: Memory Leak from Uncleared Timers - BUGGY VERSION
 * 
 * 🐛 BUG: App slows down over time, memory increases
 * 
 * Root Cause: setInterval/setTimeout not cleared on unmount
 * 
 * This component demonstrates memory leaks from uncleared timers.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { checkBugFixCondition } from '@/utils/bugFixDetection';

interface Case4MemoryLeakProps {
  onFixDetected?: () => void;
}

export default function Case4MemoryLeak({ onFixDetected }: Case4MemoryLeakProps = {}) {
  const [count, setCount] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [wasStopped, setWasStopped] = useState(false);

  useEffect(() => {
    if (timerActive) {
      /**
       * 🐛 BUG: Timer is created but never cleared
       * 
       * When the component unmounts or timerActive becomes false,
       * this interval continues running because there's no cleanup function.
       * This causes memory leaks and can slow down the app.
       */
      const interval = setInterval(() => {
        setCount(prev => prev + 1);
        console.log('Timer tick:', count);
      }, 1000);

      // 🐛 BUG: No cleanup function to clear the interval
      // The interval will continue running even after component unmounts
    }
  }, [timerActive, count]); // 🐛 BUG: count in dependencies causes re-creation

  const handleStart = () => {
    setTimerActive(true);
    setCount(0);
  };

  const handleStop = () => {
    setTimerActive(false);
    setWasStopped(true);
    // 🐛 BUG: Timer not cleared here either
    // Even though we set timerActive to false, the interval from
    // the previous effect might still be running
  };

  // Detect if bug is fixed (timer stops when stopped)
  useEffect(() => {
    if (wasStopped && !timerActive) {
      // Wait a bit to see if timer actually stopped
      const checkTimer = setTimeout(() => {
        // If count hasn't increased after stopping, timer was properly cleared
        const countAtStop = count;
        setTimeout(() => {
          if (count === countAtStop) {
            checkBugFixCondition(true, 4, 'Memory Leak from Uncleared Timers', onFixDetected);
          }
        }, 2000);
      }, 1000);
      return () => clearTimeout(checkTimer);
    }
  }, [wasStopped, timerActive, count, onFixDetected]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memory Leak Demo (Buggy)</Text>
      <Text style={styles.subtitle}>
        Start timer, then navigate away - timer keeps running!
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
          color="#FF6B6B"
        />
        <View style={styles.spacer} />
        <Button
          title="Stop Timer"
          onPress={handleStop}
          color="#95A5A6"
        />
      </View>

      <View style={styles.debugInfo}>
        <Text style={styles.debugText}>
          🐛 BUG: The timer interval is never cleared:
          {'\n'}• No cleanup function in useEffect
          {'\n'}• Timer continues after component unmounts
          {'\n'}• Memory leak accumulates over time
          {'\n'}• Check console - logs continue after unmount
          {'\n'}• Navigate away and check memory profiler
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
    color: '#FF6B6B',
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
