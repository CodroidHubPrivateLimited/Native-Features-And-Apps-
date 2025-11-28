/**
 * Bug Fix Detection Utility
 * 
 * Provides functions to detect when bugs are fixed and show completion popup
 */

import { Alert } from 'react-native';
import { markCaseCompleted } from './progressTracking';

/**
 * Show completion popup when bug is fixed
 */
export async function showCompletionPopup(
  caseId: number,
  caseTitle: string,
  onComplete?: () => void
) {
  Alert.alert(
    '🎉 Bug Fixed!',
    `Great job! You've successfully fixed the bug in "${caseTitle}".\n\nWould you like to mark this case as completed?`,
    [
      {
        text: 'Not Yet',
        style: 'cancel',
      },
      {
        text: 'Mark as Complete',
        onPress: async () => {
          await markCaseCompleted(caseId);
          if (onComplete) {
            onComplete();
          }
          Alert.alert('✅ Completed', 'Case marked as completed!');
        },
        style: 'default',
      },
    ],
    { cancelable: false }
  );
}

/**
 * Check if bug fix condition is met
 */
export function checkBugFixCondition(
  condition: boolean,
  caseId: number,
  caseTitle: string,
  onComplete?: () => void
) {
  if (condition) {
    showCompletionPopup(caseId, caseTitle, onComplete);
  }
}

