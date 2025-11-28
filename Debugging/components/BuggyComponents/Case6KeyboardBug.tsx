/**
 * Case 6: Keyboard Covering Input Fields - BUGGY VERSION
 * 
 * 🐛 BUG: Inputs hidden behind keyboard on focus
 * 
 * Root Cause: Not using KeyboardAvoidingView / ScrollView properly
 * 
 * This component demonstrates keyboard covering input fields.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Keyboard } from 'react-native';
import { checkBugFixCondition } from '@/utils/bugFixDetection';

interface Case6KeyboardBugProps {
  onFixDetected?: () => void;
}

export default function Case6KeyboardBug({ onFixDetected }: Case6KeyboardBugProps = {}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  // Detect keyboard visibility
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
      // If keyboard was visible and input is still accessible, bug might be fixed
      if (inputFocused) {
        setTimeout(() => {
          checkBugFixCondition(true, 6, 'Keyboard Covering Input Fields', onFixDetected);
        }, 500);
      }
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [inputFocused, onFixDetected]);

  /**
   * 🐛 BUG: Regular View without keyboard handling
   * 
   * When the keyboard appears, it covers the input fields
   * because there's no KeyboardAvoidingView or proper ScrollView.
   */
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form Demo (Buggy)</Text>
      <Text style={styles.subtitle}>
        Focus on bottom inputs - keyboard covers them!
      </Text>

      {/* 🐛 BUG: No KeyboardAvoidingView - keyboard will cover inputs */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Enter your name"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            placeholder="Enter your email"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            placeholder="Enter your phone"
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Message</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.message}
            onChangeText={(text) => setFormData({ ...formData, message: text })}
            placeholder="Enter your message"
            multiline
            numberOfLines={4}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
          />
        </View>
      </ScrollView>

      <View style={styles.debugInfo}>
        <Text style={styles.debugText}>
          🐛 BUG: Keyboard covers input fields:
          {'\n'}• No KeyboardAvoidingView wrapper
          {'\n'}• ScrollView doesn't adjust for keyboard
          {'\n'}• Bottom inputs are hidden when keyboard appears
          {'\n'}• User can't see what they're typing
        </Text>
      </View>
    </View>
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
  scrollView: {
    flex: 1,
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  debugInfo: {
    padding: 15,
    backgroundColor: '#FFF3CD',
    borderTopWidth: 2,
    borderTopColor: '#FFC107',
  },
  debugText: {
    fontSize: 12,
    color: '#856404',
    lineHeight: 18,
  },
});
