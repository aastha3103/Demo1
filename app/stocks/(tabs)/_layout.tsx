/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MARKET LAB - TAB LAYOUT
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DesignColors } from '@/constants/design-system';

// Simple icon component for tabs
const TabIcon = ({ name, color }: { name: string; color: string }) => (
  <View style={styles.iconContainer}>
    <Text style={[styles.icon, { color }]}>{name}</Text>
  </View>
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: DesignColors.primary[500],
        tabBarInactiveTintColor: DesignColors.neutral[500],
        headerShown: false,
        tabBarStyle: {
          backgroundColor: DesignColors.neutral[100],
          borderTopColor: DesignColors.neutral[300],
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabIcon name="🏠" color={color} />,
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color }) => <TabIcon name="📚" color={color} />,
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Practice',
          tabBarIcon: ({ color }) => <TabIcon name="📈" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
  },
});
