/**
 * Case 12: TextInput Auto-Capitalization Issues - BUGGY VERSION
 * 
 * 🐛 BUG: TextInput auto-capitalizes or autocorrects unexpectedly
 * 
 * Root Cause: Incorrect TextInput props (autoCapitalize, autoCorrect, keyboardType)
 * 
 * This component demonstrates TextInput configuration issues.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { checkBugFixCondition } from '@/utils/bugFixDetection';

interface Case12TextInputBugProps {
  onFixDetected?: () => void;
}

export default function Case12TextInputBug({ onFixDetected }: Case12TextInputBugProps = {}) {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    phone: '',
    search: '',
  });
  const [hasTyped, setHasTyped] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>TextInput Demo (Buggy)</Text>
      <Text style={styles.subtitle}>
        Notice unwanted auto-capitalization and autocorrect
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>Email Address</Text>
        {/* 🐛 BUG: Missing autoCapitalize="none" - will capitalize first letter */}
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => {
            setFormData({ ...formData, email: text });
            setHasTyped(true);
            // Check if email doesn't have unwanted capitalization (bug is fixed)
            if (text.length > 0 && text[0] === text[0].toLowerCase() && text.includes('@')) {
              setTimeout(() => {
                checkBugFixCondition(true, 12, 'TextInput Auto-Capitalization Issues', onFixDetected);
              }, 500);
            }
          }}
          placeholder="user@example.com"
          // 🐛 BUG: Missing autoCapitalize="none"
          // 🐛 BUG: Missing autoCorrect={false}
          // 🐛 BUG: Missing keyboardType="email-address"
        />

        <Text style={styles.label}>Username</Text>
        {/* 🐛 BUG: Will auto-capitalize and autocorrect */}
        <TextInput
          style={styles.input}
          value={formData.username}
          onChangeText={(text) => setFormData({ ...formData, username: text })}
          placeholder="Enter username"
          // 🐛 BUG: Missing autoCapitalize="none"
          // 🐛 BUG: Missing autoCorrect={false}
        />

        <Text style={styles.label}>Password</Text>
        {/* 🐛 BUG: Missing secureTextEntry, might show suggestions */}
        <TextInput
          style={styles.input}
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          placeholder="Enter password"
          // 🐛 BUG: Missing secureTextEntry={true}
          // 🐛 BUG: Missing autoCapitalize="none"
          // 🐛 BUG: Missing autoCorrect={false}
        />

        <Text style={styles.label}>Phone Number</Text>
        {/* 🐛 BUG: Wrong keyboard type, might allow letters */}
        <TextInput
          style={styles.input}
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          placeholder="123-456-7890"
          // 🐛 BUG: Missing keyboardType="phone-pad"
          // 🐛 BUG: Missing autoCapitalize="none"
        />

        <Text style={styles.label}>Search</Text>
        {/* 🐛 BUG: Autocorrect might interfere with search terms */}
        <TextInput
          style={styles.input}
          value={formData.search}
          onChangeText={(text) => setFormData({ ...formData, search: text })}
          placeholder="Search..."
          // 🐛 BUG: Missing autoCorrect={false} for search
        />
      </View>

      <View style={styles.debugInfo}>
        <Text style={styles.debugText}>
          🐛 BUG: TextInput configuration issues:
          {'\n'}• Email field auto-capitalizes first letter
          {'\n'}• Username field has autocorrect enabled
          {'\n'}• Password field not secure, shows suggestions
          {'\n'}• Phone field doesn't use numeric keyboard
          {'\n'}• Search field has unwanted autocorrect
          {'\n'}• Missing appropriate keyboardType props
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
    backgroundColor: '#FF6B6B',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    padding: 15,
    backgroundColor: '#FFF3CD',
    color: '#856404',
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
  debugInfo: {
    padding: 15,
    margin: 15,
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
