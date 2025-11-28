/**
 * Case 8: Image Not Loading (Network/Cache Issue) - FIXED VERSION
 * 
 * ✅ FIX: Images load properly with error handling and fallbacks
 * 
 * Solution: Proper error handling, HTTPS, loading states, fallbacks
 * 
 * This component demonstrates the correct way to handle image loading.
 */

import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { wp, hp, fontSize, widthPercentage, responsivePadding, responsiveRadius } from '@/utils/responsive';

export default function Case8ImageFixed() {
  const [image1Loading, setImage1Loading] = useState(true);
  const [image1Error, setImage1Error] = useState<string | null>(null);
  const [image2Loading, setImage2Loading] = useState(true);
  const [image2Error, setImage2Error] = useState<string | null>(null);

  // ✅ FIX: Using HTTPS for secure connections
  const imageUrl1 = 'https://via.placeholder.com/300x200';
  
  // Test URL that will fail (for demonstration)
  const imageUrl2 = 'https://invalid-url-that-does-not-exist.com/image.jpg';

  // ✅ FIX: Proper error handling with state updates
  const handleImage1Error = () => {
    setImage1Error('Failed to load image 1');
    setImage1Loading(false);
  };

  const handleImage1Load = () => {
    setImage1Loading(false);
    setImage1Error(null);
  };

  const handleImage2Error = () => {
    setImage2Error('Failed to load image 2');
    setImage2Loading(false);
  };

  const handleImage2Load = () => {
    setImage2Loading(false);
    setImage2Error(null);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Image Loading Demo (Fixed)</Text>
      <Text style={styles.subtitle}>
        Proper error handling and loading states
      </Text>

      <View style={styles.imageContainer}>
        <Text style={styles.label}>Image 1 (HTTPS with error handling)</Text>
        {image1Loading && !image1Error && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4ECDC4" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
        {image1Error ? (
          <View style={styles.errorPlaceholder}>
            <Text style={styles.errorText}>❌ {image1Error}</Text>
          </View>
        ) : (
          <Image
            source={{ uri: imageUrl1 }}
            style={styles.image}
            onError={handleImage1Error}
            onLoad={handleImage1Load}
            onLoadStart={() => setImage1Loading(true)}
            resizeMode="cover" // ✅ FIX: Proper resize mode
          />
        )}
      </View>

      <View style={styles.imageContainer}>
        <Text style={styles.label}>Image 2 (Will fail - shows error)</Text>
        {image2Loading && !image2Error && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4ECDC4" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
        {image2Error ? (
          <View style={styles.errorPlaceholder}>
            <Text style={styles.errorText}>❌ {image2Error}</Text>
            <Text style={styles.fallbackText}>Image placeholder</Text>
          </View>
        ) : (
          <Image
            source={{ uri: imageUrl2 }}
            style={styles.image}
            onError={handleImage2Error}
            onLoad={handleImage2Load}
            onLoadStart={() => setImage2Loading(true)}
            resizeMode="cover"
          />
        )}
      </View>

      <View style={styles.fixInfo}>
        <Text style={styles.fixText}>
          ✅ FIX: Image loading properly handled:
          {'\n'}• HTTPS URLs for secure connections
          {'\n'}• Loading state indicators
          {'\n'}• Error handling with user feedback
          {'\n'}• Fallback UI for failed images
          {'\n'}• Proper resizeMode configuration
          {'\n'}• onLoad, onError, onLoadStart handlers
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
    backgroundColor: '#4ECDC4',
    color: '#fff',
  },
  subtitle: {
    fontSize: fontSize(14),
    padding: responsivePadding.md,
    backgroundColor: '#D4EDDA',
    color: '#155724',
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
  },
  loadingContainer: {
    width: widthPercentage(80),
    maxWidth: wp(300),
    height: hp(200),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: responsiveRadius.sm,
  },
  loadingText: {
    marginTop: hp(10),
    fontSize: fontSize(14),
    color: '#666',
  },
  errorPlaceholder: {
    width: widthPercentage(80),
    maxWidth: wp(300),
    height: hp(200),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE5E5',
    borderRadius: responsiveRadius.sm,
    borderWidth: 2,
    borderColor: '#DC3545',
    borderStyle: 'dashed',
  },
  errorText: {
    color: '#DC3545',
    fontSize: fontSize(14),
    fontWeight: '600',
    marginBottom: hp(5),
  },
  fallbackText: {
    color: '#999',
    fontSize: fontSize(12),
  },
  fixInfo: {
    padding: responsivePadding.md,
    backgroundColor: '#D4EDDA',
    margin: responsivePadding.md,
    borderRadius: responsiveRadius.sm,
    borderLeftWidth: 4,
    borderLeftColor: '#28A745',
  },
  fixText: {
    fontSize: fontSize(12),
    color: '#155724',
    lineHeight: fontSize(18),
  },
});
