import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 12/13/14 - most common)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

/**
 * Get responsive width based on screen width
 * @param size - Base size to scale
 * @returns Scaled size
 */
export const wp = (size: number): number => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  return Math.round(size * scale);
};

/**
 * Get responsive height based on screen height
 * @param size - Base size to scale
 * @returns Scaled size
 */
export const hp = (size: number): number => {
  const scale = SCREEN_HEIGHT / BASE_HEIGHT;
  return Math.round(size * scale);
};

/**
 * Get responsive font size
 * @param size - Base font size
 * @returns Scaled font size
 */
export const fontSize = (size: number): number => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Get percentage of screen width
 * @param percentage - Percentage (0-100)
 * @returns Width in pixels
 */
export const widthPercentage = (percentage: number): number => {
  return (SCREEN_WIDTH * percentage) / 100;
};

/**
 * Get percentage of screen height
 * @param percentage - Percentage (0-100)
 * @returns Height in pixels
 */
export const heightPercentage = (percentage: number): number => {
  return (SCREEN_HEIGHT * percentage) / 100;
};

/**
 * Check if device is small screen
 */
export const isSmallScreen = (): boolean => {
  return SCREEN_WIDTH < 375;
};

/**
 * Check if device is large screen
 */
export const isLargeScreen = (): boolean => {
  return SCREEN_WIDTH > 414;
};

/**
 * Get responsive padding
 */
export const responsivePadding = {
  xs: wp(8),
  sm: wp(12),
  md: wp(16),
  lg: wp(20),
  xl: wp(24),
};

/**
 * Get responsive margin
 */
export const responsiveMargin = {
  xs: wp(8),
  sm: wp(12),
  md: wp(16),
  lg: wp(20),
  xl: wp(24),
};

/**
 * Get responsive border radius
 */
export const responsiveRadius = {
  sm: wp(8),
  md: wp(12),
  lg: wp(16),
  xl: wp(20),
};

export { SCREEN_WIDTH, SCREEN_HEIGHT };

