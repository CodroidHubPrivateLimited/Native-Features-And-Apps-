/**
 * Case 8: Image Not Loading (Network/Cache Issue) - BUGGY VERSION
 * 
 * 🐛 BUG: Remote images show broken / won't load
 * 
 * Root Cause: CORS issues, http vs https, caching problems, missing error handling
 * 
 * This component demonstrates image loading issues.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { checkBugFixCondition } from '@/utils/bugFixDetection';
import { wp, hp, fontSize, widthPercentage, responsivePadding, responsiveRadius } from '@/utils/responsive';

interface Case8ImageBugProps {
  onFixDetected?: () => void;
}

export default function Case8ImageBug({ onFixDetected }: Case8ImageBugProps = {}) {
  const [imageError, setImageError] = useState<string | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // 🐛 BUG: Using HTTP instead of HTTPS (may be blocked)
  const imageUrl1 = 'http://via.placeholder.com/300x200';
  
  // 🐛 BUG: Invalid URL that will fail
  const imageUrl2 = 'https://invalid-url-that-does-not-exist.com/image.jpg';
  
  // 🐛 BUG: Missing error handling
  const handleImageError = () => {
    // 🐛 BUG: No error state management
    console.log('Image failed to load');
    setImageError('Image failed to load');
  };

  const handleImageLoad = () => {
    setImagesLoaded(prev => {
      const newCount = prev + 1;
      // If at least one image loaded successfully, bug might be fixed
      if (newCount >= 1 && !imageError) {
        setTimeout(() => {
          checkBugFixCondition(true, 8, 'Image Not Loading (Network/Cache Issue)', onFixDetected);
        }, 1000);
      }
      return newCount;
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Image Loading Demo (Buggy)</Text>
      <Text style={styles.subtitle}>
        Some images may not load - no error feedback
      </Text>

      <View style={styles.imageContainer}>
        <Text style={styles.label}>Image 1 (HTTP - may be blocked)</Text>
        {/* 🐛 BUG: No onError handler, no loading state */}
        <Image
          source={{ uri: imageUrl1 }}
          style={styles.image}
          onLoad={handleImageLoad}
          // 🐛 BUG: Missing onError prop
          // 🐛 BUG: Missing onLoadStart, onLoadEnd
        />
      </View>

      <View style={styles.imageContainer}>
        <Text style={styles.label}>Image 2 (Invalid URL)</Text>
        {/* 🐛 BUG: onError doesn't update UI */}
        <Image
          source={{ uri: imageUrl2 }}
          style={styles.image}
          onError={handleImageError}
          onLoad={handleImageLoad}
          // 🐛 BUG: Error handler doesn't show user feedback
        />
      </View>

      {imageError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{imageError}</Text>
        </View>
      )}

      <View style={styles.debugInfo}>
        <Text style={styles.debugText}>
          🐛 BUG: Image loading issues:
          {'\n'}• No error handling or user feedback
          {'\n'}• HTTP URLs may be blocked (should use HTTPS)
          {'\n'}• No loading state indicator
          {'\n'}• No fallback for failed images
          {'\n'}• Missing resizeMode configuration
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: fontSize(20),
    fontWeight: 'bold',
    padding: responsivePadding.md,
    backgroundColor: '#FF6B6B',
    color: '#fff',
  },
  subtitle: {
    fontSize: fontSize(14),
    padding: responsivePadding.md,
    backgroundColor: '#FFF3CD',
    color: '#856404',
  },
  imageContainer: {
    margin: responsivePadding.md,
    alignItems: 'center',
  },
  label: {
    fontSize: fontSize(14),
    fontWeight: '600',
    marginBottom: hp(10),
    color: '#333',
  },
  image: {
    width: widthPercentage(80),
    maxWidth: wp(300),
    height: hp(200),
    backgroundColor: '#F5F5F5',
    borderRadius: responsiveRadius.sm,
    // 🐛 BUG: Missing resizeMode
  },
  errorContainer: {
    padding: responsivePadding.md,
    backgroundColor: '#FFE5E5',
    margin: responsivePadding.md,
    borderRadius: responsiveRadius.sm,
  },
  errorText: {
    color: '#DC3545',
    textAlign: 'center',
  },
  debugInfo: {
    padding: responsivePadding.md,
    backgroundColor: '#FFF3CD',
    margin: responsivePadding.md,
    borderRadius: responsiveRadius.sm,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  debugText: {
    fontSize: fontSize(12),
    color: '#856404',
    lineHeight: fontSize(18),
  },
});
