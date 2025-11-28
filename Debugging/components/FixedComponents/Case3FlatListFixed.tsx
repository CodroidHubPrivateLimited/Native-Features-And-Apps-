/**
 * Case 3: FlatList Performance Issues - FIXED VERSION
 * 
 * ✅ FIX: Smooth scrolling with optimized FlatList
 * 
 * Solution: Added keyExtractor, memoization, and optimization props
 * 
 * This component demonstrates the correct way to optimize FlatList performance.
 */

import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

// Generate large dataset
const generateData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `item-${i}`, // ✅ FIX: Stable, unique ID
    title: `Item ${i + 1}`,
    description: `This is a description for item ${i + 1}. It contains some text to make it heavier.`,
    value: Math.random() * 1000,
  }));
};

const data = generateData(1000);

// ✅ FIX: Memoized item component to prevent unnecessary re-renders
const ListItem = React.memo(({ 
  item, 
  isSelected, 
  onToggle 
}: { 
  item: typeof data[0];
  isSelected: boolean;
  onToggle: (id: string) => void;
}) => {
  // ✅ FIX: Memoize expensive computation
  const expensiveValue = useMemo(
    () => Math.sqrt(item.value * Math.PI * 2),
    [item.value]
  );

  return (
    <TouchableOpacity
      style={[
        styles.item,
        { backgroundColor: isSelected ? '#FFE5E5' : '#F5F5F5' }
      ]}
      onPress={() => onToggle(item.id)}
    >
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Text style={styles.itemValue}>Value: {expensiveValue.toFixed(2)}</Text>
    </TouchableOpacity>
  );
});

export default function Case3FlatListFixed() {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  // ✅ FIX: Memoized toggle function using useCallback
  const handleToggle = useCallback((id: string) => {
    setSelectedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // ✅ FIX: Memoized renderItem function
  const renderItem = useCallback(({ item }: { item: typeof data[0] }) => {
    return (
      <ListItem
        item={item}
        isSelected={selectedItems.has(item.id)}
        onToggle={handleToggle}
      />
    );
  }, [selectedItems, handleToggle]);

  // ✅ FIX: Stable keyExtractor function
  const keyExtractor = useCallback((item: typeof data[0]) => item.id, []);

  // ✅ FIX: getItemLayout for fixed-height items (improves scroll performance)
  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: 100, // Approximate item height
      offset: 100 * index,
      index,
    }),
    []
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FlatList Performance Demo (Fixed)</Text>
      <Text style={styles.subtitle}>
        Scroll through {data.length} items - smooth performance!
      </Text>
      <Text style={styles.success}>
        ✅ Optimizations: keyExtractor, memoization, getItemLayout
      </Text>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor} // ✅ FIX: Stable key extractor
        getItemLayout={getItemLayout} // ✅ FIX: Helps with scroll performance
        removeClippedSubviews={true} // ✅ FIX: Don't render off-screen items
        initialNumToRender={10} // ✅ FIX: Render fewer items initially
        maxToRenderPerBatch={10} // ✅ FIX: Limit batch size
        windowSize={10} // ✅ FIX: Control render window
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.fixInfo}>
        <Text style={styles.fixText}>
          ✅ FIX: Performance optimized with:
          {'\n'}• keyExtractor for efficient item tracking
          {'\n'}• Memoized renderItem and item components
          {'\n'}• getItemLayout for fixed-height optimization
          {'\n'}• removeClippedSubviews to skip off-screen items
          {'\n'}• Optimized batch rendering settings
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
    backgroundColor: '#4ECDC4',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    padding: 15,
    backgroundColor: '#D4EDDA',
    color: '#155724',
  },
  success: {
    fontSize: 12,
    padding: 10,
    backgroundColor: '#D4EDDA',
    color: '#155724',
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
  fixInfo: {
    padding: 15,
    backgroundColor: '#D4EDDA',
    borderTopWidth: 2,
    borderTopColor: '#28A745',
  },
  fixText: {
    fontSize: 12,
    color: '#155724',
    lineHeight: 18,
  },
});
