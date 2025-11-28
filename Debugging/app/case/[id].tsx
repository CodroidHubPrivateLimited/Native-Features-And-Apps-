/**
 * CaseDetailScreen
 * 
 * Mobile-first design for case detail view
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { debuggingCases } from '@/data/debuggingCases';
import { markCaseCompleted, isCaseCompleted } from '@/utils/progressTracking';
import { wp, hp, fontSize, responsivePadding, responsiveRadius } from '@/utils/responsive';

// Dynamic imports for buggy components
const BuggyComponents = {
  Case1StateBug: require('@/components/BuggyComponents/Case1StateBug').default,
  Case2NullReference: require('@/components/BuggyComponents/Case2NullReference').default,
  Case11InfiniteLoop: require('@/components/BuggyComponents/Case11InfiniteLoop').default,
  Case3FlatListBug: require('@/components/BuggyComponents/Case3FlatListBug').default,
  Case4MemoryLeak: require('@/components/BuggyComponents/Case4MemoryLeak').default,
  Case5AsyncError: require('@/components/BuggyComponents/Case5AsyncError').default,
  Case6KeyboardBug: require('@/components/BuggyComponents/Case6KeyboardBug').default,
  Case7PlatformBug: require('@/components/BuggyComponents/Case7PlatformBug').default,
  Case8ImageBug: require('@/components/BuggyComponents/Case8ImageBug').default,
  Case9ReduxBug: require('@/components/BuggyComponents/Case9ReduxBug').default,
  Case10DeepLinkBug: require('@/components/BuggyComponents/Case10DeepLinkBug').default,
  Case12TextInputBug: require('@/components/BuggyComponents/Case12TextInputBug').default,
};

function getComponentSuffix(caseId: number, isBuggy: boolean): string {
  const suffixes: Record<number, { buggy: string; fixed: string }> = {
    1: { buggy: 'StateBug', fixed: 'StateFixed' },
    2: { buggy: 'NullReference', fixed: 'NullReferenceFixed' },
    3: { buggy: 'FlatListBug', fixed: 'FlatListFixed' },
    4: { buggy: 'MemoryLeak', fixed: 'MemoryLeakFixed' },
    5: { buggy: 'AsyncError', fixed: 'AsyncErrorFixed' },
    6: { buggy: 'KeyboardBug', fixed: 'KeyboardFixed' },
    7: { buggy: 'PlatformBug', fixed: 'PlatformFixed' },
    8: { buggy: 'ImageBug', fixed: 'ImageFixed' },
    9: { buggy: 'ReduxBug', fixed: 'ReduxFixed' },
    10: { buggy: 'DeepLinkBug', fixed: 'DeepLinkFixed' },
    11: { buggy: 'InfiniteLoop', fixed: 'InfiniteLoopFixed' },
    12: { buggy: 'TextInputBug', fixed: 'TextInputFixed' },
  };
  return isBuggy ? suffixes[caseId]?.buggy || 'Bug' : suffixes[caseId]?.fixed || 'Fixed';
}

export default function CaseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const [isCompleted, setIsCompleted] = useState(false);

  const caseData = useMemo(() => {
    return debuggingCases.find(c => c.id === parseInt(id || '1', 10));
  }, [id]);

  // Load completion status
  useEffect(() => {
    const checkCompletion = async () => {
      if (caseData) {
        const completed = await isCaseCompleted(caseData.id);
        setIsCompleted(completed);
      }
    };
    checkCompletion();
  }, [caseData]);

  if (!caseData) {
    return (
      <SafeAreaView 
        edges={['top', 'left', 'right']}
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <Text style={[styles.errorText, { color: colors.text }]}>Case not found</Text>
      </SafeAreaView>
    );
  }

  const BuggyComponent = BuggyComponents[`Case${caseData.id}${getComponentSuffix(caseData.id, true)}` as keyof typeof BuggyComponents];

  // Callback when bug fix is detected
  const handleBugFixDetected = async () => {
    await markCaseCompleted(caseData.id);
    setIsCompleted(true);
  };

  const difficultyColors = {
    beginner: '#10B981',
    intermediate: '#F59E0B',
    advanced: '#EF4444',
  };

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
            onPress={() => router.back()} 
            style={styles.backButton}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <View style={styles.headerTop}>
              <View style={styles.caseNumberBadge}>
                <Text style={styles.caseNumberText}>{caseData.id}</Text>
              </View>
              <View style={styles.titleContainer}>
                <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
                  {caseData.title}
                </Text>
                {isCompleted && (
                  <View style={styles.completedBadge}>
                    <Text style={styles.completedBadgeText}>✓</Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.badges}>
              <View
                style={[
                  styles.difficultyBadge,
                  { backgroundColor: difficultyColors[caseData.difficulty] + '20' },
                ]}
              >
                <View style={[styles.difficultyDot, { backgroundColor: difficultyColors[caseData.difficulty] }]} />
                <Text style={[styles.difficultyText, { color: difficultyColors[caseData.difficulty] }]}>
                  {caseData.difficulty}
                </Text>
              </View>
              <View style={[styles.timeBadge, { backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#F3F4F6' }]}>
                <Text style={[styles.timeBadgeText, { color: colors.icon }]}>
                  ⏱️ {caseData.estimated_time}
                </Text>
              </View>
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
        {/* Bug Overview Card */}
        <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF' }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.bugIcon}>🐛</Text>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Bug Description</Text>
          </View>
          <View style={[styles.bugBox, { backgroundColor: colorScheme === 'dark' ? '#7C2D12' : '#FEF3C7' }]}>
            <Text style={[styles.bugText, { color: colorScheme === 'dark' ? '#FCD34D' : '#92400E' }]}>
              {caseData.bug}
            </Text>
          </View>
          <View style={[styles.infoBox, { backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#F3F4F6' }]}>
            <Text style={[styles.infoText, { color: colors.text }]}>
              💡 For hints, solution explanation, and test steps, check the{' '}
              <Text style={{ fontWeight: '700', color: colors.tint }}>Solutions</Text> tab
            </Text>
          </View>
        </View>

        {/* Buggy Code Demo Card */}
        <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF' }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.demoIcon}>💻</Text>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Interactive Demo</Text>
          </View>
          <View style={[styles.demoContainer, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#F9FAFB' }]}>
            {BuggyComponent ? (
              <BuggyComponent onFixDetected={handleBugFixDetected} />
            ) : (
              <View style={styles.errorContainer}>
                <Text style={[styles.errorText, { color: colors.text }]}>
                  Component not available
                </Text>
              </View>
            )}
          </View>
          <View style={[styles.warningBox, { backgroundColor: colorScheme === 'dark' ? '#7C2D12' : '#FEF3C7' }]}>
            <Text style={[styles.warningText, { color: colorScheme === 'dark' ? '#FCD34D' : '#92400E' }]}>
              ⚠️ This is buggy code. It may crash or behave incorrectly.
            </Text>
          </View>
        </View>

        {/* View Solution Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.solutionButton,
            {
              backgroundColor: colorScheme === 'dark' ? '#0a7ea4' : colors.tint,
            },
          ]}
          onPress={() => {
            router.push({
              pathname: '/(tabs)/solutions',
              params: { caseId: caseData.id.toString() },
            });
          }}
        >
          <Text style={styles.solutionButtonIcon}>💡</Text>
          <Text style={styles.solutionButtonText}>
            View Hints & Solution
          </Text>
          <Text style={styles.solutionButtonArrow}>→</Text>
        </TouchableOpacity>
      </ScrollView>
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
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: wp(12),
    minWidth: 0,
  },
  title: {
    fontSize: fontSize(22),
    fontWeight: '700',
    flex: 1,
    lineHeight: fontSize(28),
    letterSpacing: -0.5,
    flexShrink: 1,
    minWidth: 0,
    color: '#11181C',
  },
  completedBadge: {
    width: wp(28),
    height: wp(28),
    borderRadius: wp(14),
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(12),
  },
  completedBadgeText: {
    color: '#FFFFFF',
    fontSize: fontSize(16),
    fontWeight: '700',
  },
  badges: {
    flexDirection: 'row',
    gap: wp(8),
    alignItems: 'center',
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(12),
    paddingVertical: hp(6),
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
  timeBadge: {
    paddingHorizontal: wp(12),
    paddingVertical: hp(6),
    borderRadius: wp(12),
  },
  timeBadgeText: {
    fontSize: fontSize(12),
    fontWeight: '600',
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
  bugIcon: {
    fontSize: fontSize(24),
    marginRight: wp(12),
  },
  demoIcon: {
    fontSize: fontSize(24),
    marginRight: wp(12),
  },
  cardTitle: {
    fontSize: fontSize(20),
    fontWeight: '700',
  },
  bugBox: {
    padding: hp(20),
    borderRadius: responsiveRadius.md,
    marginBottom: hp(24),
  },
  bugText: {
    fontSize: fontSize(15),
    lineHeight: fontSize(22),
    fontWeight: '500',
  },
  infoBox: {
    padding: hp(14),
    borderRadius: responsiveRadius.md,
  },
  infoText: {
    fontSize: fontSize(14),
    lineHeight: fontSize(20),
  },
  demoContainer: {
    borderRadius: responsiveRadius.md,
    overflow: 'hidden',
    marginBottom: hp(12),
    minHeight: hp(200),
  },
  warningBox: {
    padding: hp(14),
    borderRadius: responsiveRadius.md,
  },
  warningText: {
    fontSize: fontSize(13),
    lineHeight: fontSize(18),
    fontWeight: '500',
  },
  errorContainer: {
    padding: hp(40),
    alignItems: 'center',
  },
  errorText: {
    fontSize: fontSize(16),
    textAlign: 'center',
  },
  solutionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: hp(18),
    borderRadius: responsiveRadius.lg,
    marginTop: hp(8),
    marginBottom: hp(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  solutionButtonIcon: {
    fontSize: fontSize(20),
    marginRight: wp(8),
  },
  solutionButtonText: {
    color: '#FFFFFF',
    fontSize: fontSize(17),
    fontWeight: '700',
    marginRight: wp(8),
  },
  solutionButtonArrow: {
    color: '#FFFFFF',
    fontSize: fontSize(20),
    fontWeight: '700',
  },
});
