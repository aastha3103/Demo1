/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MARKET LAB - TAB LAYOUT
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DesignColors } from '@/constants/design-system';
import { useStockLanguage } from '@/context/StockLanguageContext';

// Simple icon component for tabs
const TabIcon = ({ name, color }: { name: string; color: string }) => (
  <View style={styles.iconContainer}>
    <Text style={[styles.icon, { color }]}>{name}</Text>
  </View>
);

export default function TabLayout() {
  const { t } = useStockLanguage();
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
          title: t('common.start'),
          tabBarIcon: ({ color }) => <TabIcon name="🏠" color={color} />,
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: t('tabs.learn.title'),
          tabBarIcon: ({ color }) => <TabIcon name="📚" color={color} />,
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: t('tabs.practice.title'),
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
