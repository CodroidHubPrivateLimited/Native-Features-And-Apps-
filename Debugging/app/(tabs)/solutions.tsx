/**
 * SolutionsScreen
 * 
 * Mobile-first design for viewing hints, solutions, and fixed components
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { debuggingCases, DebuggingCase } from '@/data/debuggingCases';
import HintAccordion from '@/components/HintAccordion';
import { wp, hp, fontSize, responsivePadding, responsiveRadius } from '@/utils/responsive';

// Import fixed components
const FixedComponents = {
  Case1StateFixed: require('@/components/FixedComponents/Case1StateFixed').default,
  Case2NullReferenceFixed: require('@/components/FixedComponents/Case2NullReferenceFixed').default,
  Case3FlatListFixed: require('@/components/FixedComponents/Case3FlatListFixed').default,
  Case4MemoryLeakFixed: require('@/components/FixedComponents/Case4MemoryLeakFixed').default,
  Case5AsyncErrorFixed: require('@/components/FixedComponents/Case5AsyncErrorFixed').default,
  Case6KeyboardFixed: require('@/components/FixedComponents/Case6KeyboardFixed').default,
  Case7PlatformFixed: require('@/components/FixedComponents/Case7PlatformFixed').default,
  Case8ImageFixed: require('@/components/FixedComponents/Case8ImageFixed').default,
  Case9ReduxFixed: require('@/components/FixedComponents/Case9ReduxFixed').default,
  Case10DeepLinkFixed: require('@/components/FixedComponents/Case10DeepLinkFixed').default,
  Case11InfiniteLoopFixed: require('@/components/FixedComponents/Case11InfiniteLoopFixed').default,
  Case12TextInputFixed: require('@/components/FixedComponents/Case12TextInputFixed').default,
};

function getComponentSuffix(caseId: number): string {
  const suffixes: Record<number, string> = {
    1: 'StateFixed',
    2: 'NullReferenceFixed',
    3: 'FlatListFixed',
    4: 'MemoryLeakFixed',
    5: 'AsyncErrorFixed',
    6: 'KeyboardFixed',
    7: 'PlatformFixed',
    8: 'ImageFixed',
    9: 'ReduxFixed',
    10: 'DeepLinkFixed',
    11: 'InfiniteLoopFixed',
    12: 'TextInputFixed',
  };
  return suffixes[caseId] || 'Fixed';
}

export default function SolutionsScreen() {
  const router = useRouter();
  const { caseId } = useLocalSearchParams<{ caseId?: string }>();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  // Set selected case from URL params if provided
  useEffect(() => {
    if (caseId) {
      const id = parseInt(caseId, 10);
      if (!isNaN(id)) {
        setSelectedCase(id);
      }
    }
  }, [caseId]);

  const selectedCaseData = useMemo(() => {
    if (!selectedCase) return null;
    return debuggingCases.find(c => c.id === selectedCase);
  }, [selectedCase]);

  const renderCaseItem = ({ item }: { item: DebuggingCase }) => {
    const difficultyColors = {
      beginner: '#10B981',
      intermediate: '#F59E0B',
      advanced: '#EF4444',
    };

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.caseCard,
          {
            backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF',
            borderColor: colorScheme === 'dark' ? '#374151' : '#E5E7EB',
          },
        ]}
        onPress={() => setSelectedCase(item.id)}
      >
        <View style={styles.caseHeader}>
          <View style={styles.caseNumberBadge}>
            <Text style={styles.caseNumberText}>{item.id}</Text>
          </View>
          <View style={styles.caseTitleContainer}>
            <Text style={[styles.caseTitle, { color: colors.text }]} numberOfLines={2}>
              {item.title}
            </Text>
          </View>
        </View>
        <Text style={[styles.caseBug, { color: colors.icon }]} numberOfLines={2}>
          {item.bug}
        </Text>
        <View style={styles.caseFooter}>
          <View
            style={[
              styles.difficultyBadge,
              { backgroundColor: difficultyColors[item.difficulty] + '20' },
            ]}
          >
            <View style={[styles.difficultyDot, { backgroundColor: difficultyColors[item.difficulty] }]} />
            <Text style={[styles.difficultyText, { color: difficultyColors[item.difficulty] }]}>
              {item.difficulty}
            </Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (selectedCaseData) {
    const FixedComponent = FixedComponents[`Case${selectedCaseData.id}${getComponentSuffix(selectedCaseData.id)}` as keyof typeof FixedComponents];

    return (
      <SafeAreaView 
        edges={['top', 'left', 'right']}
        style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#F9FAFB' }]}
      >
        <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
        
        {/* Header */}
        <View style={[styles.header, { 
          backgroundColor: colorScheme === 'dark' ? '#111827' : '#FFFFFF',
          paddingTop: hp(20),
        }]}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => setSelectedCase(null)} 
              style={styles.backButton}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <View style={styles.headerTop}>
                <View style={styles.caseNumberBadge}>
                  <Text style={styles.caseNumberText}>{selectedCaseData.id}</Text>
                </View>
                <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
                  {selectedCaseData.title}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, { 
            paddingTop: hp(48),
            paddingBottom: insets.bottom + hp(48),
          }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Problem Description */}
          <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF' }]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>📋</Text>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Problem Description</Text>
            </View>
            <View style={[styles.infoBox, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#F3F4F6' }]}>
              <Text style={[styles.label, { color: colors.text }]}>Expected:</Text>
              <Text style={[styles.text, { color: colors.text }]}>
                {selectedCaseData.problem_description.expected}
              </Text>
            </View>
            <View style={[styles.warningBox, { backgroundColor: colorScheme === 'dark' ? '#7C2D12' : '#FEF3C7' }]}>
              <Text style={[styles.label, { color: colorScheme === 'dark' ? '#FCD34D' : '#92400E' }]}>Actual:</Text>
              <Text style={[styles.text, { color: colorScheme === 'dark' ? '#FCD34D' : '#92400E' }]}>
                {selectedCaseData.problem_description.actual}
              </Text>
            </View>
          </View>

          {/* Hints */}
          <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF' }]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>💡</Text>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Progressive Hints</Text>
            </View>
            <HintAccordion hints={selectedCaseData.hints} />
          </View>

          {/* Solution Explanation */}
          <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF' }]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>✅</Text>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Solution</Text>
            </View>
            <View style={[styles.solutionSection, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#F3F4F6' }]}>
              <Text style={[styles.solutionLabel, { color: colors.text }]}>Why it was wrong:</Text>
              <Text style={[styles.solutionText, { color: colors.text }]}>
                {selectedCaseData.solution_explanation.why_wrong}
              </Text>
            </View>
            <View style={[styles.solutionSection, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#F3F4F6' }]}>
              <Text style={[styles.solutionLabel, { color: colors.text }]}>Why it caused the issue:</Text>
              <Text style={[styles.solutionText, { color: colors.text }]}>
                {selectedCaseData.solution_explanation.why_caused_issue}
              </Text>
            </View>
            <View style={[styles.solutionSection, { backgroundColor: colorScheme === 'dark' ? '#065F46' : '#D1FAE5' }]}>
              <Text style={[styles.solutionLabel, { color: colorScheme === 'dark' ? '#6EE7B7' : '#065F46' }]}>How to fix:</Text>
              <Text style={[styles.solutionText, { color: colorScheme === 'dark' ? '#6EE7B7' : '#065F46' }]}>
                {selectedCaseData.solution_explanation.how_to_fix}
              </Text>
            </View>
            <View style={[styles.solutionSection, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#F3F4F6' }]}>
              <Text style={[styles.solutionLabel, { color: colors.text }]}>Best practices:</Text>
              <Text style={[styles.solutionText, { color: colors.text }]}>
                {selectedCaseData.solution_explanation.best_practices}
              </Text>
            </View>
          </View>

          {/* Fixed Component */}
          {FixedComponent && (
            <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF' }]}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardIcon}>✨</Text>
                <Text style={[styles.cardTitle, { color: colors.text }]}>Fixed Component</Text>
              </View>
              <View style={[styles.demoContainer, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#F9FAFB' }]}>
                <FixedComponent />
              </View>
            </View>
          )}

          {/* Test Steps */}
          <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF' }]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>🧪</Text>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Test Steps</Text>
            </View>
            <View style={[styles.testSection, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#F3F4F6' }]}>
              <Text style={[styles.testLabel, { color: colors.text }]}>Buggy Version:</Text>
              {selectedCaseData.test_steps.buggy.map((step, index) => (
                <Text key={index} style={[styles.testStep, { color: colors.text }]}>
                  {index + 1}. {step}
                </Text>
              ))}
            </View>
            <View style={[styles.testSection, { backgroundColor: colorScheme === 'dark' ? '#065F46' : '#D1FAE5' }]}>
              <Text style={[styles.testLabel, { color: colorScheme === 'dark' ? '#6EE7B7' : '#065F46' }]}>Fixed Version:</Text>
              {selectedCaseData.test_steps.fixed.map((step, index) => (
                <Text key={index} style={[styles.testStep, { color: colorScheme === 'dark' ? '#6EE7B7' : '#065F46' }]}>
                  {index + 1}. {step}
                </Text>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Case List View
  return (
      <SafeAreaView 
        edges={['top', 'left', 'right']}
        style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#F9FAFB' }]}
      >
        <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <View style={[styles.header, { 
        backgroundColor: colorScheme === 'dark' ? '#111827' : '#FFFFFF',
        paddingTop: hp(20),
      }]}>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Solutions
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
            View hints, solutions, and fixed components
          </Text>
        </View>
      </View>

      <FlatList
        data={debuggingCases}
        renderItem={renderCaseItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  header: {
    paddingBottom: hp(32),
    paddingHorizontal: wp(20),
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    minHeight: hp(100),
  },
  backButton: {
    width: wp(40),
    height: wp(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(12),
    marginTop: hp(4),
  },
  backIcon: {
    fontSize: fontSize(24),
    fontWeight: '600',
    color: '#6B7280',
  },
  headerContent: {
    flex: 1,
    minWidth: 0,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: hp(28),
    width: '100%',
    flexShrink: 1,
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
  caseNumberBadge: {
    width: wp(40),
    height: wp(40),
    borderRadius: wp(10),
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(12),
  },
  caseNumberText: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: '#6B7280',
  },
  title: {
    fontSize: fontSize(22),
    fontWeight: '700',
    flex: 1,
    lineHeight: fontSize(28),
    letterSpacing: -0.5,
    marginLeft: wp(12),
    flexShrink: 1,
    minWidth: 0,
    color: '#11181C',
  },
  listContent: {
    padding: responsivePadding.lg,
  },
  caseCard: {
    padding: responsivePadding.md,
    borderRadius: responsiveRadius.lg,
    marginBottom: hp(12),
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  caseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: hp(12),
  },
  caseTitleContainer: {
    flex: 1,
  },
  caseTitle: {
    fontSize: fontSize(17),
    fontWeight: '600',
    lineHeight: fontSize(22),
  },
  caseBug: {
    fontSize: fontSize(14),
    lineHeight: fontSize(20),
    marginBottom: hp(12),
  },
  caseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(10),
    paddingVertical: hp(4),
    borderRadius: wp(12),
  },
  difficultyDot: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
    marginRight: wp(6),
  },
  difficultyText: {
    fontSize: fontSize(12),
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  arrow: {
    fontSize: fontSize(18),
    fontWeight: 'bold',
    color: '#6B7280',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: responsivePadding.lg,
  },
  card: {
    borderRadius: responsiveRadius.lg,
    padding: hp(24),
    marginBottom: hp(32),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(28),
  },
  cardIcon: {
    fontSize: fontSize(24),
    marginRight: wp(12),
  },
  cardTitle: {
    fontSize: fontSize(20),
    fontWeight: '700',
  },
  infoBox: {
    padding: hp(20),
    borderRadius: responsiveRadius.md,
    marginBottom: hp(24),
  },
  label: {
    fontSize: fontSize(14),
    fontWeight: '600',
    marginBottom: hp(8),
  },
  text: {
    fontSize: fontSize(15),
    lineHeight: fontSize(22),
  },
  warningBox: {
    padding: responsivePadding.md,
    borderRadius: responsiveRadius.md,
  },
  solutionSection: {
    padding: hp(20),
    borderRadius: responsiveRadius.md,
    marginBottom: hp(24),
  },
  solutionLabel: {
    fontSize: fontSize(14),
    fontWeight: '600',
    marginBottom: hp(8),
  },
  solutionText: {
    fontSize: fontSize(15),
    lineHeight: fontSize(22),
  },
  demoContainer: {
    borderRadius: responsiveRadius.md,
    overflow: 'hidden',
    minHeight: hp(200),
  },
  testSection: {
    padding: hp(20),
    borderRadius: responsiveRadius.md,
    marginBottom: hp(24),
  },
  testLabel: {
    fontSize: fontSize(14),
    fontWeight: '600',
    marginBottom: hp(12),
  },
  testStep: {
    fontSize: fontSize(14),
    lineHeight: fontSize(22),
    marginBottom: hp(8),
  },
});
