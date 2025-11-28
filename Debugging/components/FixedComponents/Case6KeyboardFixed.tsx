/**
 * Case 6: Keyboard Covering Input Fields - FIXED VERSION
 * 
 * ✅ FIX: Keyboard no longer covers input fields
 * 
 * Solution: KeyboardAvoidingView with proper behavior prop
 * 
 * This component demonstrates the correct way to handle keyboard.
 */

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

export default function Case6KeyboardFixed() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  /**
   * ✅ FIX: KeyboardAvoidingView with proper behavior
   * 
   * KeyboardAvoidingView adjusts the layout when keyboard appears.
   * behavior="padding" works well for iOS, "height" for Android.
   */
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <Text style={styles.title}>Form Demo (Fixed)</Text>
      <Text style={styles.subtitle}>
        Keyboard adjusts to keep inputs visible
      </Text>

      {/* ✅ FIX: ScrollView inside KeyboardAvoidingView */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
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
          />
        </View>
      </ScrollView>

      <View style={styles.fixInfo}>
        <Text style={styles.fixText}>
          ✅ FIX: Keyboard properly handled:
          {'\n'}• KeyboardAvoidingView wraps the form
          {'\n'}• Platform-specific behavior (padding for iOS, height for Android)
          {'\n'}• ScrollView with keyboardShouldPersistTaps
          {'\n'}• Inputs remain visible when keyboard appears
          {'\n'}• User can see what they're typing
        </Text>
      </View>
    </KeyboardAvoidingView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
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
  fixInfo: {
    padding: 15,
    backgroundColor: '#D4EDDA',
    borderTopWidth: 2,
    borderTopColor: '#28A745',
  },
  fixText: {
    fontSize: 12,
    color: '#155724',
    lineHeight: 18,
  },
});
