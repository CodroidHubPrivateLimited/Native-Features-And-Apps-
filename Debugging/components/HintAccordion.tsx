/**
 * HintAccordion Component
 * 
 * Displays progressive hints in a collapsible accordion format.
 * Tracks which hints have been viewed for progress tracking.
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface HintAccordionProps {
  hints: string[];
  onHintViewed?: (hintIndex: number) => void;
}

export default function HintAccordion({ hints, onHintViewed }: HintAccordionProps) {
  const colorScheme = useColorScheme();
  const [expandedHints, setExpandedHints] = useState<Set<number>>(new Set());

  const toggleHint = (index: number) => {
    const newExpanded = new Set(expandedHints);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
      // Notify parent that hint was viewed
      if (onHintViewed) {
        onHintViewed(index);
      }
    }
    setExpandedHints(newExpanded);
  };

  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>💡 Hints</Text>
      {hints.map((hint, index) => (
        <View key={index} style={styles.hintContainer}>
          <TouchableOpacity
            onPress={() => toggleHint(index)}
            style={[styles.hintHeader, { backgroundColor: colors.background, borderColor: colors.icon }]}
          >
            <Text style={[styles.hintTitle, { color: colors.text }]}>
              Hint {index + 1}
            </Text>
            <Text style={[styles.expandIcon, { color: colors.icon }]}>
              {expandedHints.has(index) ? '▼' : '▶'}
            </Text>
          </TouchableOpacity>
          {expandedHints.has(index) && (
            <View style={[styles.hintContent, { backgroundColor: colors.background }]}>
              <Text style={[styles.hintText, { color: colors.text }]}>{hint}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hintContainer: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  hintHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
  },
  hintTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  expandIcon: {
    fontSize: 12,
  },
  hintContent: {
    padding: 15,
    marginTop: 5,
    borderRadius: 8,
  },
  hintText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

