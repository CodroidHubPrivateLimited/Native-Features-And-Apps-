/**
 * Case 2: Undefined is Not an Object (Null Reference) - BUGGY VERSION
 * 
 * 🐛 BUG: Accessing property on undefined/null object
 * 
 * Root Cause: API data not loaded before render; missing optional chaining
 * 
 * This component demonstrates the bug where we try to access properties
 * of an object that hasn't loaded yet, causing a crash.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { checkBugFixCondition } from '@/utils/bugFixDetection';

interface User {
  name: string;
  email: string;
  age: number;
}

interface Case2NullReferenceProps {
  onFixDetected?: () => void;
}

export default function Case2NullReference({ onFixDetected }: Case2NullReferenceProps = {}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchUser = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 🐛 BUG: API call fails or returns null, but we don't handle it
      // In a real scenario, the API might fail, return null, or take longer
      // But we're not checking for these cases before accessing user properties
      
      // 🐛 BUG: Simulating API failure - user is not set, remains null
      // This will cause a crash when we try to access user.name below
      // In a real app, this could happen due to network errors, server errors, etc.
      
      // Commented out to simulate API failure:
      // setUser({
      //   name: 'John Doe',
      //   email: 'john@example.com',
      //   age: 30,
      // });
      
      setLoading(false);
      // 🐛 BUG: user is still null, but we set loading to false
      // The component will try to render user.name, causing a crash
    };

    fetchUser();
  }, []);

  /**
   * 🐛 BUG: Accessing properties without checking if user exists
   * 
   * The component tries to render user data immediately when loading is false,
   * but it doesn't check if user is actually set. If the API call fails,
   * user remains null, and accessing user.name will crash with:
   * "Cannot read property 'name' of null"
   * 
   * DEBUG TIP: Check the error stack trace - it will point to the
   * exact line where we're accessing the undefined property.
   * 
   * TO FIX: Add a check like "if (!user) return ..." or use optional chaining
   */
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Loading user data...</Text>
      </View>
    );
  }

  // 🐛 BUG: No check if user is null before accessing properties
  // If API fails or returns null, user will be null and this will crash
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile (Buggy)</Text>
      
      <View style={styles.profileContainer}>
        {/* 🐛 BUG: Accessing user.name when user might be null */}
        {/* If the API call fails or returns null, user is null and this crashes */}
        <Text style={styles.label}>Name:</Text>
        {/* 🐛 BUG: user is null, this will crash */}
        <Text style={styles.value}>{user!.name}</Text>
        
        <Text style={styles.label}>Email:</Text>
        {/* 🐛 BUG: Accessing user.email when user is null */}
        <Text style={styles.value}>{user!.email}</Text>
        
        <Text style={styles.label}>Age:</Text>
        {/* 🐛 BUG: Accessing user.age when user is null */}
        <Text style={styles.value}>{user!.age}</Text>
      </View>

      <View style={styles.debugInfo}>
        <Text style={styles.debugText}>
          🐛 BUG: This component will crash if the API call fails or returns null.
          {'\n\n'}The problem: We're accessing user.name, user.email, and user.age
          without checking if user exists first.
          {'\n\n'}To see the bug: Modify the useEffect to simulate an API failure
          (comment out setUser or set user to null), and the app will crash.
          {'\n\n'}Error: "Cannot read property 'name' of null"
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
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  profileContainer: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginTop: 15,
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
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

