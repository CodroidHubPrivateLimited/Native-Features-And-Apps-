/**
 * Unit tests for progress tracking utilities
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getProgress,
  markCaseCompleted,
  recordHintViewed,
  isCaseCompleted,
  getHintsViewed,
  clearProgress,
  getCompletionPercentage,
} from '@/utils/progressTracking';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('Progress Tracking', () => {
  beforeEach(async () => {
    await clearProgress();
    jest.clearAllMocks();
  });

  describe('getProgress', () => {
    it('should return default progress when no data exists', async () => {
      const progress = await getProgress();
      expect(progress).toEqual({
        completedCases: [],
        hintsViewed: {},
      });
    });

    it('should return saved progress data', async () => {
      const testData = {
        completedCases: [1, 2, 3],
        hintsViewed: { 1: [0, 1], 2: [0] },
      };
      await AsyncStorage.setItem('@debugging_app_progress', JSON.stringify(testData));
      
      const progress = await getProgress();
      expect(progress.completedCases).toEqual([1, 2, 3]);
      expect(progress.hintsViewed).toEqual({ 1: [0, 1], 2: [0] });
    });
  });

  describe('markCaseCompleted', () => {
    it('should mark a case as completed', async () => {
      await markCaseCompleted(1);
      const progress = await getProgress();
      expect(progress.completedCases).toContain(1);
    });

    it('should not duplicate completed cases', async () => {
      await markCaseCompleted(1);
      await markCaseCompleted(1);
      const progress = await getProgress();
      expect(progress.completedCases.filter(id => id === 1).length).toBe(1);
    });
  });

  describe('recordHintViewed', () => {
    it('should record a viewed hint', async () => {
      await recordHintViewed(1, 0);
      const hints = await getHintsViewed(1);
      expect(hints).toContain(0);
    });

    it('should not duplicate viewed hints', async () => {
      await recordHintViewed(1, 0);
      await recordHintViewed(1, 0);
      const hints = await getHintsViewed(1);
      expect(hints.filter(h => h === 0).length).toBe(1);
    });

    it('should record multiple hints for a case', async () => {
      await recordHintViewed(1, 0);
      await recordHintViewed(1, 1);
      await recordHintViewed(1, 2);
      const hints = await getHintsViewed(1);
      expect(hints).toEqual([0, 1, 2]);
    });
  });

  describe('isCaseCompleted', () => {
    it('should return false for uncompleted case', async () => {
      const completed = await isCaseCompleted(1);
      expect(completed).toBe(false);
    });

    it('should return true for completed case', async () => {
      await markCaseCompleted(1);
      const completed = await isCaseCompleted(1);
      expect(completed).toBe(true);
    });
  });

  describe('getCompletionPercentage', () => {
    it('should return 0 when no cases completed', async () => {
      const percentage = await getCompletionPercentage(10);
      expect(percentage).toBe(0);
    });

    it('should return correct percentage', async () => {
      await markCaseCompleted(1);
      await markCaseCompleted(2);
      await markCaseCompleted(3);
      const percentage = await getCompletionPercentage(10);
      expect(percentage).toBe(30);
    });

    it('should return 100 when all cases completed', async () => {
      await markCaseCompleted(1);
      await markCaseCompleted(2);
      const percentage = await getCompletionPercentage(2);
      expect(percentage).toBe(100);
    });
  });

  describe('clearProgress', () => {
    it('should clear all progress data', async () => {
      await markCaseCompleted(1);
      await recordHintViewed(1, 0);
      await clearProgress();
      
      const progress = await getProgress();
      expect(progress.completedCases).toEqual([]);
      expect(progress.hintsViewed).toEqual({});
    });
  });
});

