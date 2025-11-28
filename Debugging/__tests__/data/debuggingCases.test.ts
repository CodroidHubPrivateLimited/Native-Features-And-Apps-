/**
 * Unit tests for debugging cases data
 */

import { debuggingCases, DebuggingCase } from '@/data/debuggingCases';

describe('Debugging Cases Data', () => {
  it('should have 12 cases', () => {
    expect(debuggingCases.length).toBe(12);
  });

  it('should have unique IDs', () => {
    const ids = debuggingCases.map(c => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have IDs from 1 to 12', () => {
    const ids = debuggingCases.map(c => c.id).sort((a, b) => a - b);
    expect(ids).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });

  describe('Case structure', () => {
    let testCase: DebuggingCase;

    beforeEach(() => {
      testCase = debuggingCases[0];
    });

    it('should have required fields', () => {
      expect(testCase).toHaveProperty('id');
      expect(testCase).toHaveProperty('title');
      expect(testCase).toHaveProperty('bug');
      expect(testCase).toHaveProperty('root_cause');
      expect(testCase).toHaveProperty('difficulty');
      expect(testCase).toHaveProperty('category');
      expect(testCase).toHaveProperty('hints');
      expect(testCase).toHaveProperty('solution_explanation');
      expect(testCase).toHaveProperty('test_steps');
    });

    it('should have valid difficulty', () => {
      const validDifficulties = ['beginner', 'intermediate', 'advanced'];
      debuggingCases.forEach(c => {
        expect(validDifficulties).toContain(c.difficulty);
      });
    });

    it('should have at least one hint', () => {
      debuggingCases.forEach(c => {
        expect(c.hints.length).toBeGreaterThan(0);
      });
    });

    it('should have problem description with expected and actual', () => {
      debuggingCases.forEach(c => {
        expect(c.problem_description.expected).toBeTruthy();
        expect(c.problem_description.actual).toBeTruthy();
      });
    });

    it('should have solution explanation with all fields', () => {
      debuggingCases.forEach(c => {
        expect(c.solution_explanation.why_wrong).toBeTruthy();
        expect(c.solution_explanation.why_caused_issue).toBeTruthy();
        expect(c.solution_explanation.how_to_fix).toBeTruthy();
        expect(c.solution_explanation.best_practices).toBeTruthy();
      });
    });

    it('should have test steps for both buggy and fixed versions', () => {
      debuggingCases.forEach(c => {
        expect(c.test_steps.buggy.length).toBeGreaterThan(0);
        expect(c.test_steps.fixed.length).toBeGreaterThan(0);
      });
    });
  });
});

