/**
 * Case 12: TextInput Auto-Capitalization Issues - FIXED VERSION
 * 
 * ✅ FIX: TextInput properly configured for each input type
 * 
 * Solution: Correct autoCapitalize, autoCorrect, and keyboardType props
 * 
 * This component demonstrates the correct TextInput configuration.
 */

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';

export default function Case12TextInputFixed() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    phone: '',
    search: '',
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>TextInput Demo (Fixed)</Text>
      <Text style={styles.subtitle}>
        Properly configured for each input type
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>Email Address</Text>
        {/* ✅ FIX: Proper email input configuration */}
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          placeholder="user@example.com"
          autoCapitalize="none" // ✅ FIX: No capitalization for email
          autoCorrect={false} // ✅ FIX: No autocorrect for email
          keyboardType="email-address" // ✅ FIX: Email keyboard with @ symbol
        />

        <Text style={styles.label}>Username</Text>
        {/* ✅ FIX: Username should not auto-capitalize or autocorrect */}
        <TextInput
          style={styles.input}
          value={formData.username}
          onChangeText={(text) => setFormData({ ...formData, username: text })}
          placeholder="Enter username"
          autoCapitalize="none" // ✅ FIX: No capitalization
          autoCorrect={false} // ✅ FIX: No autocorrect
        />

        <Text style={styles.label}>Password</Text>
        {/* ✅ FIX: Secure password input */}
        <TextInput
          style={styles.input}
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          placeholder="Enter password"
          secureTextEntry={true} // ✅ FIX: Hide password characters
          autoCapitalize="none" // ✅ FIX: No capitalization
          autoCorrect={false} // ✅ FIX: No autocorrect
        />

        <Text style={styles.label}>Phone Number</Text>
        {/* ✅ FIX: Numeric keyboard for phone */}
        <TextInput
          style={styles.input}
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          placeholder="123-456-7890"
          keyboardType="phone-pad" // ✅ FIX: Numeric keypad
          autoCapitalize="none" // ✅ FIX: No capitalization
        />

        <Text style={styles.label}>Search</Text>
        {/* ✅ FIX: Search without autocorrect */}
        <TextInput
          style={styles.input}
          value={formData.search}
          onChangeText={(text) => setFormData({ ...formData, search: text })}
          placeholder="Search..."
          autoCorrect={false} // ✅ FIX: No autocorrect for search
          returnKeyType="search" // ✅ FIX: Search button on keyboard
        />
      </View>

      <View style={styles.fixInfo}>
        <Text style={styles.fixText}>
          ✅ FIX: TextInput properly configured:
          {'\n'}• Email: autoCapitalize="none", keyboardType="email-address"
          {'\n'}• Username: autoCapitalize="none", autoCorrect={false}
          {'\n'}• Password: secureTextEntry, autoCapitalize="none"
          {'\n'}• Phone: keyboardType="phone-pad", autoCapitalize="none"
          {'\n'}• Search: autoCorrect={false}, returnKeyType="search"
          {'\n'}• Each input type has appropriate configuration
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: '#4ECDC4',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    padding: 15,
    backgroundColor: '#D4EDDA',
    color: '#155724',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 15,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  fixInfo: {
    padding: 15,
    margin: 15,
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
