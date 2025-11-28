/**
 * DocumentationScreen
 * 
 * Mobile-first design for debugging methodology and guides
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { wp, hp, fontSize, responsivePadding, responsiveRadius } from '@/utils/responsive';

const debuggingMethodology = [
  {
    step: 1,
    title: 'Reproduce the Bug',
    description: 'Document the exact steps to reproduce the issue. Note the environment (device, OS version, app version).',
  },
  {
    step: 2,
    title: 'Read the Error Message',
    description: 'Carefully read the error message. Check the stack trace to identify the exact file and line number where the error occurred.',
  },
  {
    step: 3,
    title: 'Isolate the Problem',
    description: 'Narrow down the issue by testing different scenarios. Check if it\'s platform-specific (iOS vs Android).',
  },
  {
    step: 4,
    title: 'Use Debugging Tools',
    description: 'Leverage React DevTools, Chrome DevTools, console.log, and breakpoints to inspect state and execution flow.',
  },
  {
    step: 5,
    title: 'Form a Hypothesis',
    description: 'Based on your investigation, form a hypothesis about what\'s causing the bug. Search for similar issues online.',
  },
  {
    step: 6,
    title: 'Test the Fix',
    description: 'Test your fix on multiple devices and platforms. Add tests or error boundaries to prevent regression.',
  },
  {
    step: 7,
    title: 'Prevent Future Occurrences',
    description: 'Write unit tests, add error boundaries, and set up monitoring (e.g., Sentry) to catch issues early.',
  },
];

const tools = [
  {
    name: 'React DevTools',
    description: 'Inspect React component hierarchy, props, state, and hooks.',
    link: 'https://react.dev/learn/react-developer-tools',
  },
  {
    name: 'Flipper',
    description: 'Platform for debugging mobile apps with network and layout inspectors.',
    link: 'https://fbflipper.com/',
  },
  {
    name: 'Chrome DevTools',
    description: 'Debug JavaScript, inspect network requests, and profile performance.',
    link: 'https://developer.chrome.com/docs/devtools/',
  },
  {
    name: 'Redux DevTools',
    description: 'Time-travel debugging for Redux state management.',
    link: 'https://github.com/reduxjs/redux-devtools',
  },
  {
    name: 'React Native Debugger',
    description: 'Standalone tool combining React DevTools and Redux DevTools.',
    link: 'https://github.com/jhen0409/react-native-debugger',
  },
  {
    name: 'Logcat (Android)',
    description: 'View system logs and app logs on Android devices.',
    link: 'https://developer.android.com/studio/command-line/logcat',
  },
  {
    name: 'Xcode Console (iOS)',
    description: 'View logs and debug output for iOS apps during development.',
    link: 'https://developer.apple.com/xcode/',
  },
  {
    name: 'Metro Bundler',
    description: 'JavaScript bundler for React Native. Check logs for build errors.',
    link: 'https://reactnative.dev/docs/metro',
  },
  {
    name: 'Performance Monitor',
    description: 'Built-in tool to monitor FPS, memory usage, and performance metrics.',
    link: 'https://reactnative.dev/docs/performance',
  },
];

const commonCommands = {
  clear_cache_and_rebuild: {
    command: 'npx react-native start --reset-cache',
    description: 'Clear Metro bundler cache and restart',
  },
  android_clean: {
    command: 'cd android && ./gradlew clean',
    description: 'Clean Android build files',
  },
  ios_clean: {
    command: 'cd ios && rm -rf Pods && pod install',
    description: 'Clean iOS dependencies and reinstall',
  },
  adb_logcat: {
    command: 'adb logcat',
    description: 'View Android device logs',
  },
  adb_reverse: {
    command: 'adb reverse tcp:8081 tcp:8081',
    description: 'Forward Metro bundler port to Android device',
  },
};

export default function DocumentationScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#F9FAFB' }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <View style={[styles.header, { 
        backgroundColor: colorScheme === 'dark' ? '#111827' : '#FFFFFF',
        paddingTop: Math.max(insets.top, hp(8)),
      }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Documentation
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
          Debugging methodology and best practices
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Methodology Steps */}
        <View style={[styles.section, { backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF' }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📚</Text>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              The 7-Step Process
            </Text>
          </View>
          {debuggingMethodology.map((item) => (
            <View
              key={item.step}
              style={[
                styles.methodologyCard,
                { backgroundColor: colorScheme === 'dark' ? '#111827' : '#F9FAFB' },
              ]}
            >
              <View
                style={[
                  styles.stepNumber,
                  {
                    backgroundColor: colorScheme === 'dark' ? '#0a7ea4' : colors.tint,
                  },
                ]}
              >
                <Text style={styles.stepNumberText}>{item.step}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={[styles.stepTitle, { color: colors.text }]}>
                  {item.title}
                </Text>
                <Text style={[styles.stepDescription, { color: colors.icon }]}>
                  {item.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Tools Reference */}
        <View style={[styles.section, { backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF' }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🛠️</Text>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Essential Tools
            </Text>
          </View>
          {tools.map((tool, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              style={[
                styles.toolCard,
                { backgroundColor: colorScheme === 'dark' ? '#111827' : '#F9FAFB' },
              ]}
              onPress={() => openLink(tool.link)}
            >
              <View style={styles.toolHeader}>
                <Text style={[styles.toolName, { color: colors.text }]}>
                  {tool.name}
                </Text>
                <Text style={[styles.toolLink, { color: colors.tint }]}>
                  →
                </Text>
              </View>
              <Text style={[styles.toolDescription, { color: colors.icon }]}>
                {tool.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Common Commands */}
        <View style={[styles.section, { backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF' }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>💻</Text>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Common Commands
            </Text>
          </View>
          {Object.entries(commonCommands).map(([key, value]) => (
            <View
              key={key}
              style={[
                styles.commandCard,
                { backgroundColor: colorScheme === 'dark' ? '#111827' : '#1F2937' },
              ]}
            >
              <Text style={[styles.commandLabel, { color: '#9CA3AF' }]}>
                {value.description}:
              </Text>
              <Text style={styles.commandText}>{value.command}</Text>
            </View>
          ))}
        </View>

        {/* Best Practices */}
        <View style={[styles.section, { backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF' }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>✨</Text>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Best Practices
            </Text>
          </View>
          <View style={[styles.practicesCard, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#F9FAFB' }]}>
            {[
              'Always test on both iOS and Android',
              'Use TypeScript for type safety',
              'Implement error boundaries',
              'Add comprehensive logging',
              'Write unit tests for critical paths',
              'Use React DevTools regularly',
              'Monitor app performance',
              'Set up error tracking (Sentry, etc.)',
            ].map((practice, index) => (
              <View key={index} style={styles.practiceItem}>
                <Text style={styles.practiceBullet}>•</Text>
                <Text style={[styles.practiceText, { color: colors.text }]}>
                  {practice}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: hp(16),
    paddingHorizontal: wp(20),
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: fontSize(32),
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: hp(4),
  },
  headerSubtitle: {
    fontSize: fontSize(15),
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: responsivePadding.lg,
  },
  section: {
    borderRadius: responsiveRadius.lg,
    padding: responsivePadding.lg,
    marginBottom: hp(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(20),
  },
  sectionIcon: {
    fontSize: fontSize(24),
    marginRight: wp(12),
  },
  sectionTitle: {
    fontSize: fontSize(22),
    fontWeight: '700',
  },
  methodologyCard: {
    flexDirection: 'row',
    padding: responsivePadding.md,
    borderRadius: responsiveRadius.md,
    marginBottom: hp(12),
  },
  stepNumber: {
    width: wp(36),
    height: wp(36),
    borderRadius: wp(18),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(16),
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: fontSize(16),
    fontWeight: '700',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: fontSize(17),
    fontWeight: '600',
    marginBottom: hp(6),
  },
  stepDescription: {
    fontSize: fontSize(14),
    lineHeight: fontSize(20),
  },
  toolCard: {
    padding: responsivePadding.md,
    borderRadius: responsiveRadius.md,
    marginBottom: hp(12),
  },
  toolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(8),
  },
  toolName: {
    fontSize: fontSize(17),
    fontWeight: '600',
    flex: 1,
  },
  toolLink: {
    fontSize: fontSize(20),
    fontWeight: '700',
  },
  toolDescription: {
    fontSize: fontSize(14),
    lineHeight: fontSize(20),
  },
  commandCard: {
    padding: responsivePadding.md,
    borderRadius: responsiveRadius.md,
    marginBottom: hp(12),
  },
  commandLabel: {
    fontSize: fontSize(12),
    marginBottom: hp(8),
    fontWeight: '600',
  },
  commandText: {
    fontSize: fontSize(14),
    fontFamily: 'monospace',
    color: '#D1D5DB',
  },
  practicesCard: {
    padding: responsivePadding.lg,
    borderRadius: responsiveRadius.md,
  },
  practiceItem: {
    flexDirection: 'row',
    marginBottom: hp(12),
    alignItems: 'flex-start',
  },
  practiceBullet: {
    fontSize: fontSize(16),
    marginRight: wp(12),
    color: '#6B7280',
    marginTop: hp(2),
  },
  practiceText: {
    fontSize: fontSize(15),
    lineHeight: fontSize(22),
    flex: 1,
  },
});
