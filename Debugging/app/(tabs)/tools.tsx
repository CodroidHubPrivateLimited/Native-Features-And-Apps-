/**
 * ToolsReferenceScreen
 * 
 * Mobile-first design for debugging tools reference
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { wp, hp, fontSize, responsivePadding, responsiveRadius } from '@/utils/responsive';

const toolsDetail = [
  {
    name: 'React DevTools',
    category: 'Component Inspection',
    description: 'Inspect React component hierarchy, props, state, and hooks. Essential for debugging React components.',
    setup: 'Install React DevTools browser extension or standalone app. Connect to your React Native app via Metro bundler.',
    usage: [
      'Inspect component tree and hierarchy',
      'View and edit component props and state',
      'Debug hooks (useState, useEffect, etc.)',
      'Profile component render performance',
    ],
    link: 'https://react.dev/learn/react-developer-tools',
  },
  {
    name: 'Flipper',
    category: 'Platform Debugging',
    description: 'Platform for debugging mobile apps. Provides network inspector, layout inspector, and plugin ecosystem.',
    setup: 'Install Flipper desktop app. Add react-native-flipper plugin to your project. Connect device/simulator.',
    usage: [
      'Network request inspection',
      'Layout inspector for UI debugging',
      'Database inspection',
      'Custom plugins for app-specific debugging',
    ],
    link: 'https://fbflipper.com/',
  },
  {
    name: 'Chrome DevTools',
    category: 'JavaScript Debugging',
    description: 'Debug JavaScript, inspect network requests, profile performance, and debug React Native apps.',
    setup: 'Enable remote debugging in React Native. Open Chrome and navigate to chrome://inspect. Select your device.',
    usage: [
      'Set breakpoints and debug JavaScript',
      'Inspect network requests',
      'Profile JavaScript performance',
      'View console logs and errors',
    ],
    link: 'https://developer.chrome.com/docs/devtools/',
  },
  {
    name: 'Redux DevTools',
    category: 'State Management',
    description: 'Time-travel debugging for Redux. Inspect actions, state changes, and replay actions.',
    setup: 'Install Redux DevTools browser extension. Configure store with devToolsEnhancer in development.',
    usage: [
      'Inspect dispatched actions',
      'View state changes over time',
      'Time-travel debugging (replay actions)',
      'Export/import state for testing',
    ],
    link: 'https://github.com/reduxjs/redux-devtools',
  },
  {
    name: 'React Native Debugger',
    category: 'All-in-One',
    description: 'Standalone debugging tool combining React DevTools and Redux DevTools.',
    setup: 'Download and install React Native Debugger. Configure your app to connect to it on port 8081.',
    usage: [
      'Combines React DevTools and Redux DevTools',
      'Network inspector',
      'AsyncStorage inspector',
      'Console with better formatting',
    ],
    link: 'https://github.com/jhen0409/react-native-debugger',
  },
  {
    name: 'Logcat (Android)',
    category: 'Android Logging',
    description: 'View system logs, app logs, and debug messages on Android devices.',
    setup: 'Use adb logcat command or Android Studio Logcat window. Filter by package name or tag.',
    usage: [
      'View app console logs',
      'Monitor system logs',
      'Filter logs by tag or level',
      'Save logs to file for analysis',
    ],
    link: 'https://developer.android.com/studio/command-line/logcat',
  },
  {
    name: 'Xcode Console (iOS)',
    category: 'iOS Logging',
    description: 'View logs and debug output for iOS apps during development.',
    setup: 'Open Xcode and run your app. View logs in the console area or use Console.app on macOS.',
    usage: [
      'View NSLog and print statements',
      'Monitor system logs',
      'Debug crashes with stack traces',
      'Filter logs by process or subsystem',
    ],
    link: 'https://developer.apple.com/xcode/',
  },
  {
    name: 'Metro Bundler',
    category: 'Build Tool',
    description: 'JavaScript bundler for React Native. Check bundler logs for build and runtime errors.',
    setup: 'Metro starts automatically with npm start. Check terminal output for errors and warnings.',
    usage: [
      'View bundling errors and warnings',
      'Monitor file changes and hot reload',
      'Clear cache with --reset-cache flag',
      'Configure bundler via metro.config.js',
    ],
    link: 'https://reactnative.dev/docs/metro',
  },
  {
    name: 'Performance Monitor',
    category: 'Performance',
    description: 'Built-in React Native tool to monitor FPS, memory usage, and performance metrics.',
    setup: 'Shake device or Cmd+D (iOS) / Cmd+M (Android) to open dev menu. Enable "Show Perf Monitor".',
    usage: [
      'Monitor FPS (frames per second)',
      'Track JavaScript thread and UI thread',
      'View memory usage',
      'Identify performance bottlenecks',
    ],
    link: 'https://reactnative.dev/docs/performance',
  },
];

export default function ToolsReferenceScreen() {
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
          Tools Reference
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
          Comprehensive guide to debugging tools
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {toolsDetail.map((tool, index) => (
          <View
            key={index}
            style={[
              styles.toolCard,
              { backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF' },
            ]}
          >
            <View style={styles.toolHeader}>
              <View style={styles.toolHeaderLeft}>
                <Text style={[styles.toolName, { color: colors.text }]}>
                  {tool.name}
                </Text>
                <View style={[styles.categoryBadge, { backgroundColor: colors.tint + '20' }]}>
                  <Text style={[styles.categoryText, { color: colors.tint }]}>
                    {tool.category}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => openLink(tool.link)}
                style={[
                  styles.linkButton,
                  {
                    backgroundColor: colorScheme === 'dark' ? '#0a7ea4' : colors.tint,
                  },
                ]}
              >
                <Text style={styles.linkButtonText}>Docs</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.toolDescription, { color: colors.text }]}>
              {tool.description}
            </Text>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Setup:
              </Text>
              <Text style={[styles.sectionContent, { color: colors.icon }]}>
                {tool.setup}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Usage:
              </Text>
              {tool.usage.map((item, idx) => (
                <View key={idx} style={styles.usageItem}>
                  <Text style={styles.usageBullet}>•</Text>
                  <Text style={[styles.usageText, { color: colors.text }]}>
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
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
  toolCard: {
    borderRadius: responsiveRadius.lg,
    padding: responsivePadding.lg,
    marginBottom: hp(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  toolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: hp(16),
  },
  toolHeaderLeft: {
    flex: 1,
    marginRight: wp(12),
  },
  toolName: {
    fontSize: fontSize(22),
    fontWeight: '700',
    marginBottom: hp(8),
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: wp(10),
    paddingVertical: hp(4),
    borderRadius: wp(12),
  },
  categoryText: {
    fontSize: fontSize(11),
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  linkButton: {
    paddingHorizontal: wp(14),
    paddingVertical: hp(8),
    borderRadius: responsiveRadius.sm,
  },
  linkButtonText: {
    color: '#FFFFFF',
    fontSize: fontSize(13),
    fontWeight: '600',
  },
  toolDescription: {
    fontSize: fontSize(15),
    lineHeight: fontSize(22),
    marginBottom: hp(16),
  },
  section: {
    marginBottom: hp(16),
  },
  sectionTitle: {
    fontSize: fontSize(15),
    fontWeight: '600',
    marginBottom: hp(10),
  },
  sectionContent: {
    fontSize: fontSize(14),
    lineHeight: fontSize(20),
  },
  usageItem: {
    flexDirection: 'row',
    marginBottom: hp(8),
    alignItems: 'flex-start',
  },
  usageBullet: {
    fontSize: fontSize(14),
    marginRight: wp(10),
    color: '#6B7280',
    marginTop: hp(2),
  },
  usageText: {
    fontSize: fontSize(14),
    lineHeight: fontSize(20),
    flex: 1,
  },
});
