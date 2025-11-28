/**
 * Case 2: Undefined is Not an Object (Null Reference) - FIXED VERSION
 * 
 * ✅ FIX: Safely accessing properties with optional chaining and conditional rendering
 * 
 * Solution: Use optional chaining (?.) and nullish coalescing (??) operators
 * 
 * This component demonstrates the correct way to handle potentially null/undefined data.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface User {
  name: string;
  email: string;
  age: number;
}

export default function Case2NullReferenceFixed() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate successful API response
        setUser({
          name: 'John Doe',
          email: 'john@example.com',
          age: 30,
        });
      } catch (err) {
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4ECDC4" />
        <Text style={styles.loadingText}>Loading user data...</Text>
      </View>
    );
  }

  if (error || !user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>❌ {error || 'User data not available'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile (Fixed)</Text>
      
      <View style={styles.profileContainer}>
        <Text style={styles.label}>Name:</Text>
        {/* ✅ FIX: Optional chaining ensures safe access */}
        <Text style={styles.value}>{user?.name ?? 'N/A'}</Text>
        
        <Text style={styles.label}>Email:</Text>
        {/* ✅ FIX: Optional chaining with nullish coalescing for fallback */}
        <Text style={styles.value}>{user?.email ?? 'N/A'}</Text>
        
        <Text style={styles.label}>Age:</Text>
        {/* ✅ FIX: Safe access with fallback */}
        <Text style={styles.value}>{user?.age ?? 'N/A'}</Text>
      </View>

      <View style={styles.fixInfo}>
        <Text style={styles.fixText}>
          ✅ FIX: Using optional chaining (?.) and nullish coalescing (??)
          ensures safe property access. The component also handles loading
          and error states properly.
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
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#DC3545',
    textAlign: 'center',
    padding: 20,
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

