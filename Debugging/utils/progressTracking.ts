/**
 * Progress Tracking Utility
 * 
 * Manages user progress through debugging cases using AsyncStorage.
 * Tracks completed cases, viewed hints, and other progress metrics.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const PROGRESS_KEY = '@debugging_app_progress';
const HINTS_VIEWED_KEY = '@debugging_app_hints_viewed';

export interface ProgressData {
  completedCases: number[];
  hintsViewed: Record<number, number[]>; // caseId -> array of hint indices viewed
  lastViewedCase?: number;
  totalTimeSpent?: number; // in minutes
}

/**
 * Get all progress data
 */
export async function getProgress(): Promise<ProgressData> {
  try {
    const data = await AsyncStorage.getItem(PROGRESS_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return {
      completedCases: [],
      hintsViewed: {},
    };
  } catch (error) {
    console.error('Error getting progress:', error);
    return {
      completedCases: [],
      hintsViewed: {},
    };
  }
}

/**
 * Mark a case as completed
 */
export async function markCaseCompleted(caseId: number): Promise<void> {
  try {
    const progress = await getProgress();
    if (!progress.completedCases.includes(caseId)) {
      progress.completedCases.push(caseId);
      await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    }
  } catch (error) {
    console.error('Error marking case as completed:', error);
  }
}

/**
 * Record that a hint was viewed
 */
export async function recordHintViewed(caseId: number, hintIndex: number): Promise<void> {
  try {
    const progress = await getProgress();
    if (!progress.hintsViewed[caseId]) {
      progress.hintsViewed[caseId] = [];
    }
    if (!progress.hintsViewed[caseId].includes(hintIndex)) {
      progress.hintsViewed[caseId].push(hintIndex);
      await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    }
  } catch (error) {
    console.error('Error recording hint viewed:', error);
  }
}

/**
 * Check if a case is completed
 */
export async function isCaseCompleted(caseId: number): Promise<boolean> {
  try {
    const progress = await getProgress();
    return progress.completedCases.includes(caseId);
  } catch (error) {
    console.error('Error checking case completion:', error);
    return false;
  }
}

/**
 * Get hints viewed for a specific case
 */
export async function getHintsViewed(caseId: number): Promise<number[]> {
  try {
    const progress = await getProgress();
    return progress.hintsViewed[caseId] || [];
  } catch (error) {
    console.error('Error getting hints viewed:', error);
    return [];
  }
}

/**
 * Clear all progress (for testing/reset)
 */
export async function clearProgress(): Promise<void> {
  try {
    await AsyncStorage.removeItem(PROGRESS_KEY);
  } catch (error) {
    console.error('Error clearing progress:', error);
  }
}

/**
 * Get completion percentage
 */
export async function getCompletionPercentage(totalCases: number): Promise<number> {
  try {
    const progress = await getProgress();
    return Math.round((progress.completedCases.length / totalCases) * 100);
  } catch (error) {
    console.error('Error getting completion percentage:', error);
    return 0;
  }
}

