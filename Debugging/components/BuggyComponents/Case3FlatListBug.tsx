/**
 * Case 3: FlatList Performance Issues - BUGGY VERSION
 * 
 * 🐛 BUG: Laggy scrolling with large lists
 * 
 * Root Cause: Missing keyExtractor, no memoization, heavy render functions
 * 
 * This component demonstrates performance issues with FlatList when
 * optimization props are missing.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { checkBugFixCondition } from '@/utils/bugFixDetection';

// Generate large dataset
const generateData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i, // 🐛 BUG: Using index as id (not stable)
    title: `Item ${i + 1}`,
    description: `This is a description for item ${i + 1}. It contains some text to make it heavier.`,
    value: Math.random() * 1000,
  }));
};

const data = generateData(1000);

interface Case3FlatListBugProps {
  onFixDetected?: () => void;
}

export default function Case3FlatListBug({ onFixDetected }: Case3FlatListBugProps = {}) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [scrollPerformance, setScrollPerformance] = useState({ lastScrollTime: Date.now(), scrollCount: 0 });

  /**
   * 🐛 BUG: Heavy render function without memoization
   * 
   * This renderItem function is recreated on every render, and it performs
   * expensive operations. Without React.memo on the item component, every
   * item re-renders on every scroll.
   */
  const renderItem = ({ item }: { item: typeof data[0] }) => {
    // 🐛 BUG: Expensive computation on every render
    const expensiveValue = Math.sqrt(item.value * Math.PI * 2);
    
    // 🐛 BUG: Inline style object created on every render
    const itemStyle = {
      backgroundColor: selectedItems.includes(item.id) ? '#FFE5E5' : '#F5F5F5',
    };

    return (
      <TouchableOpacity
        style={[styles.item, itemStyle]}
        onPress={() => {
          // 🐛 BUG: Creating new array on every toggle
          if (selectedItems.includes(item.id)) {
            setSelectedItems(selectedItems.filter(id => id !== item.id));
          } else {
            setSelectedItems([...selectedItems, item.id]);
          }
        }}
      >
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemValue}>Value: {expensiveValue.toFixed(2)}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FlatList Performance Demo (Buggy)</Text>
      <Text style={styles.subtitle}>
        Scroll through {data.length} items - notice the lag
      </Text>
      <Text style={styles.warning}>
        ⚠️ Performance issues: Missing keyExtractor, no memoization
      </Text>

      <FlatList
        data={data}
        renderItem={renderItem}
        // 🐛 BUG: Missing keyExtractor - React can't efficiently track items
        // 🐛 BUG: Missing getItemLayout - can't optimize scrolling
        // 🐛 BUG: Missing removeClippedSubviews - renders off-screen items
        // 🐛 BUG: Missing initialNumToRender and maxToRenderPerBatch
        style={styles.list}
        contentContainerStyle={styles.listContent}
        onScrollBeginDrag={() => {
          const now = Date.now();
          const timeSinceLastScroll = now - scrollPerformance.lastScrollTime;
          setScrollPerformance({ lastScrollTime: now, scrollCount: scrollPerformance.scrollCount + 1 });
          
          // If scrolling is smooth (time between scrolls is reasonable), bug might be fixed
          if (scrollPerformance.scrollCount > 10 && timeSinceLastScroll > 50) {
            checkBugFixCondition(true, 3, 'FlatList Performance Issues', onFixDetected);
          }
        }}
      />

      <View style={styles.debugInfo}>
        <Text style={styles.debugText}>
          🐛 BUG: Scroll performance is poor because:
          {'\n'}• No keyExtractor (React can't track items efficiently)
          {'\n'}• renderItem recreated on every render
          {'\n'}• No memoization of item components
          {'\n'}• Heavy computations in render function
          {'\n'}• Missing FlatList optimization props
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: '#FF6B6B',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    padding: 15,
    backgroundColor: '#FFF3CD',
    color: '#856404',
  },
  warning: {
    fontSize: 12,
    padding: 10,
    backgroundColor: '#FFE5E5',
    color: '#DC3545',
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 10,
  },
  item: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  itemValue: {
    fontSize: 12,
    color: '#999',
  },
  debugInfo: {
    padding: 15,
    backgroundColor: '#FFF3CD',
    borderTopWidth: 2,
    borderTopColor: '#FFC107',
  },
  debugText: {
    fontSize: 12,
    color: '#856404',
    lineHeight: 18,
  },
});
