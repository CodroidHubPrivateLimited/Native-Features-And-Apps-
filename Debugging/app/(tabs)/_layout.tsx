import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.icon + '30',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              size={28} 
              name="house.fill" 
              color={color || colors.tabIconDefault} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="documentation"
        options={{
          title: 'Docs',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              size={28} 
              name="book.closed.fill" 
              color={color || colors.tabIconDefault} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: 'Tools',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              size={28} 
              name="wrench.and.screwdriver.fill" 
              color={color || colors.tabIconDefault} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="solutions"
        options={{
          title: 'Solutions',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              size={28} 
              name="checkmark.seal.fill" 
              color={color || colors.tabIconDefault} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
