/**
 * HomeScreen / Dashboard
 * 
 * Mobile-first design with proper spacing, touch targets, and native feel
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { debuggingCases, DebuggingCase } from '@/data/debuggingCases';
import { getProgress, isCaseCompleted, getCompletionPercentage } from '@/utils/progressTracking';
import { wp, hp, fontSize, widthPercentage, responsivePadding, responsiveMargin, responsiveRadius } from '@/utils/responsive';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [completedCases, setCompletedCases] = useState<number[]>([]);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Animation values
  const titleOpacity = useRef(new Animated.Value(1)).current;
  const searchOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(0)).current;
  const searchTranslateY = useRef(new Animated.Value(-20)).current;

  // Load progress on mount
  useEffect(() => {
    const loadProgress = async () => {
      const progress = await getProgress();
      setCompletedCases(progress.completedCases);
      const percentage = await getCompletionPercentage(debuggingCases.length);
      setCompletionPercentage(percentage);
    };
    loadProgress();
  }, []);

  // Animate search toggle
  useEffect(() => {
    if (isSearchActive) {
      // Show search, hide title
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(titleTranslateY, {
          toValue: -20,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(searchOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(searchTranslateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Hide search, show title
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(titleTranslateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(searchOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(searchTranslateY, {
          toValue: -20,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isSearchActive]);

  const difficulties = ['beginner', 'intermediate', 'advanced'];

  // Filter cases based on search and filters
  const filteredCases = useMemo(() => {
    return debuggingCases.filter(case_ => {
      const matchesSearch = 
        case_.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        case_.bug.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDifficulty = !selectedDifficulty || case_.difficulty === selectedDifficulty;

      return matchesSearch && matchesDifficulty;
    });
  }, [searchQuery, selectedDifficulty]);

  const renderCaseItem = ({ item }: { item: DebuggingCase }) => {
    const difficultyColors = {
      beginner: '#10B981',
      intermediate: '#F59E0B',
      advanced: '#EF4444',
    };
    const isCompleted = completedCases.includes(item.id);

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.caseCard,
          {
            backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF',
            borderColor: isCompleted ? '#10B981' : (colorScheme === 'dark' ? '#374151' : '#E5E7EB'),
            borderLeftWidth: isCompleted ? 4 : 0,
          },
        ]}
        onPress={() => router.push(`/case/${item.id}`)}
      >
        <View style={styles.caseHeader}>
          <View style={styles.caseNumberBadge}>
            <Text style={styles.caseNumberText}>{item.id}</Text>
          </View>
          <View style={styles.caseTitleContainer}>
            <Text style={[styles.caseTitle, { color: colors.text }]} numberOfLines={2}>
              {item.title}
            </Text>
            {isCompleted && (
              <View style={styles.completedBadge}>
                <Text style={styles.completedBadgeText}>✓</Text>
              </View>
            )}
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
          <Text style={[styles.timeEstimate, { color: colors.icon }]}>
            {item.estimated_time}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#F9FAFB' }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={[styles.header, { 
        backgroundColor: colorScheme === 'dark' ? '#111827' : '#FFFFFF',
        paddingTop: Math.max(insets.top, hp(8)),
      }]}>
        <View style={styles.headerTop}>
          {/* Title Section */}
          <Animated.View
            style={[
              styles.titleContainer,
              {
                opacity: titleOpacity,
                transform: [{ translateY: titleTranslateY }],
                position: isSearchActive ? 'absolute' : 'relative',
                width: '100%',
              },
            ]}
            pointerEvents={isSearchActive ? 'none' : 'auto'}
          >
            <View style={styles.headerContent}>
              <View style={styles.titleTextContainer}>
                <Text style={[styles.headerTitle, { color: colors.text }]}>
                  Debugging Cases
                </Text>
                <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
                  {debuggingCases.length} scenarios to master
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsSearchActive(true)}
                style={styles.searchButton}
              >
                <Text style={styles.searchButtonIcon}>🔍</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Search Section */}
          <Animated.View
            style={[
              styles.searchHeaderContainer,
              {
                opacity: searchOpacity,
                transform: [{ translateY: searchTranslateY }],
                position: isSearchActive ? 'relative' : 'absolute',
                width: '100%',
              },
            ]}
            pointerEvents={isSearchActive ? 'auto' : 'none'}
          >
            <View style={[styles.searchInputContainer, { backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#F3F4F6' }]}>
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder="Search cases..."
                placeholderTextColor={colors.icon}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus={isSearchActive}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
                  <Text style={styles.clearButtonText}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setIsSearchActive(false);
                setSearchQuery('');
              }}
              style={styles.cancelButton}
            >
              <Text style={[styles.cancelButtonText, { color: colors.tint }]}>Cancel</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        
        {/* Progress Card */}
        <View style={[styles.progressCard, { backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF' }]}>
          <View style={styles.progressRow}>
            <View style={styles.progressLeft}>
              <View style={styles.progressHeader}>
                <Text style={[styles.progressLabel, { color: colors.text }]}>Progress</Text>
                <Text style={[styles.progressPercentage, { color: colors.tint }]}>
                  {completionPercentage}%
                </Text>
              </View>
              <View style={[styles.progressBarContainer, { backgroundColor: colorScheme === 'dark' ? '#374151' : '#E5E7EB' }]}>
                <View 
                  style={[
                    styles.progressBarFill, 
                    { 
                      width: `${completionPercentage}%`, 
                      backgroundColor: colors.tint 
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.progressText, { color: colors.icon }]}>
                {completedCases.length} of {debuggingCases.length} completed
              </Text>
            </View>
            
            {/* Difficulty Dropdown */}
            <View style={styles.dropdownContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.dropdownButton,
                  {
                    backgroundColor: colorScheme === 'dark' ? '#374151' : '#F3F4F6',
                    borderColor: selectedDifficulty ? colors.tint : (colorScheme === 'dark' ? '#4B5563' : '#D1D5DB'),
                  },
                ]}
                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Text style={[styles.dropdownButtonText, { color: selectedDifficulty ? colors.tint : colors.text }]}>
                  {selectedDifficulty ? selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1) : 'All'}
                </Text>
                <Text style={styles.dropdownArrow}>{isDropdownOpen ? '▲' : '▼'}</Text>
              </TouchableOpacity>
              
              {/* Dropdown Options */}
              {isDropdownOpen && (
                <View style={[styles.dropdownMenu, { backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF', borderColor: colorScheme === 'dark' ? '#374151' : '#E5E7EB' }]}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                      styles.dropdownOption,
                      !selectedDifficulty && { backgroundColor: colorScheme === 'dark' ? '#374151' : '#F3F4F6' },
                    ]}
                    onPress={() => {
                      setSelectedDifficulty(null);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Text style={[
                      styles.dropdownOptionText,
                      {
                        color: !selectedDifficulty ? colors.tint : colors.text,
                        fontWeight: !selectedDifficulty ? '600' : '400',
                      },
                    ]}>All</Text>
                    {!selectedDifficulty && (
                      <Text style={[styles.checkmark, { color: colors.tint }]}>✓</Text>
                    )}
                  </TouchableOpacity>
                  {difficulties.map((diff) => (
                    <TouchableOpacity
                      key={diff}
                      activeOpacity={0.7}
                      style={[
                        styles.dropdownOption,
                        selectedDifficulty === diff && { backgroundColor: colorScheme === 'dark' ? '#374151' : '#F3F4F6' },
                      ]}
                      onPress={() => {
                        setSelectedDifficulty(diff);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.dropdownOptionText,
                          {
                            color: selectedDifficulty === diff ? colors.tint : colors.text,
                            fontWeight: selectedDifficulty === diff ? '600' : '400',
                          },
                        ]}
                      >
                        {diff.charAt(0).toUpperCase() + diff.slice(1)}
                      </Text>
                      {selectedDifficulty === diff && (
                        <Text style={[styles.checkmark, { color: colors.tint }]}>✓</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      </View>



      {/* Cases List */}
      <FlatList
        data={filteredCases}
        renderItem={renderCaseItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        style={{ zIndex: 1 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={[styles.emptyText, { color: colors.text }]}>
              No cases found
            </Text>
            <Text style={[styles.emptySubtext, { color: colors.icon }]}>
              Try adjusting your search or filters
            </Text>
          </View>
        }
      />
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
    zIndex: 100,
    elevation: 4,
  },
  headerTop: {
    marginBottom: hp(16),
    minHeight: hp(60),
  },
  titleContainer: {
    width: '100%',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleTextContainer: {
    flex: 1,
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
  searchButton: {
    width: wp(44),
    height: wp(44),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(22),
    backgroundColor: '#F3F4F6',
    marginTop: hp(4),
  },
  searchButtonIcon: {
    fontSize: fontSize(20),
  },
  searchHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(12),
    width: '100%',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: responsiveRadius.md,
    paddingHorizontal: wp(16),
    height: wp(44),
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize(16),
    fontWeight: '500',
  },
  clearButton: {
    padding: wp(4),
  },
  clearButtonText: {
    fontSize: fontSize(16),
    color: '#9CA3AF',
  },
  cancelButton: {
    paddingVertical: hp(8),
    paddingHorizontal: wp(4),
  },
  cancelButtonText: {
    fontSize: fontSize(16),
    fontWeight: '600',
  },
  progressCard: {
    padding: responsivePadding.sm,
    borderRadius: responsiveRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    zIndex: 100,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: wp(12),
  },
  progressLeft: {
    flex: 1,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(8),
  },
  progressLabel: {
    fontSize: fontSize(13),
    fontWeight: '600',
  },
  progressPercentage: {
    fontSize: fontSize(16),
    fontWeight: '700',
  },
  progressBarContainer: {
    height: hp(6),
    borderRadius: wp(3),
    overflow: 'hidden',
    marginBottom: hp(6),
  },
  progressBarFill: {
    height: '100%',
    borderRadius: wp(3),
  },
  progressText: {
    fontSize: fontSize(11),
    fontWeight: '500',
  },
  dropdownContainer: {
    position: 'relative',
    minWidth: wp(100),
    zIndex: 1000,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(12),
    paddingVertical: hp(8),
    borderRadius: responsiveRadius.sm,
    borderWidth: 1,
    minWidth: wp(100),
  },
  dropdownButtonText: {
    fontSize: fontSize(13),
    fontWeight: '600',
    marginRight: wp(6),
  },
  dropdownArrow: {
    fontSize: fontSize(10),
    color: '#6B7280',
  },
  dropdownMenu: {
    position: 'absolute',
    top: hp(42),
    right: 0,
    minWidth: wp(140),
    borderRadius: responsiveRadius.sm,
    padding: wp(4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 1001,
    borderWidth: 1,
  },
  dropdownOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(12),
    paddingVertical: hp(10),
    borderRadius: wp(6),
  },
  dropdownOptionText: {
    fontSize: fontSize(14),
  },
  checkmark: {
    fontSize: fontSize(14),
    fontWeight: '700',
  },
  filtersContainer: {
    paddingVertical: hp(12),
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filtersContent: {
    paddingHorizontal: wp(20),
  },
  filterChip: {
    paddingHorizontal: wp(16),
    paddingVertical: hp(8),
    borderRadius: wp(20),
    marginRight: wp(8),
    minHeight: hp(36),
    justifyContent: 'center',
  },
  filterChipText: {
    fontSize: fontSize(14),
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  listContent: {
    padding: responsivePadding.lg,
    paddingTop: hp(16),
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
  caseNumberBadge: {
    width: wp(32),
    height: wp(32),
    borderRadius: responsiveRadius.sm,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(12),
  },
  caseNumberText: {
    fontSize: fontSize(14),
    fontWeight: '700',
    color: '#6B7280',
  },
  caseTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  caseTitle: {
    fontSize: fontSize(17),
    fontWeight: '600',
    flex: 1,
    lineHeight: fontSize(22),
  },
  completedBadge: {
    width: wp(24),
    height: wp(24),
    borderRadius: wp(12),
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(8),
  },
  completedBadgeText: {
    color: '#FFFFFF',
    fontSize: fontSize(12),
    fontWeight: '700',
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
  timeEstimate: {
    fontSize: fontSize(12),
    fontWeight: '500',
  },
  emptyContainer: {
    paddingVertical: hp(60),
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: fontSize(48),
    marginBottom: hp(16),
  },
  emptyText: {
    fontSize: fontSize(18),
    fontWeight: '600',
    marginBottom: hp(8),
  },
  emptySubtext: {
    fontSize: fontSize(14),
  },
});
