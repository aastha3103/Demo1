/**
 * ═══════════════════════════════════════════════════════════════════════════
 * FINLEARN - TAB LAYOUT
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Main tab navigation for the FinLearn app.
 * Tabs: Home, Learn, Progress
 */

import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DesignColors, DesignSpacing } from '@/components/mf_sip/design-system';
import { HapticTab } from '@/components/mf_sip/haptic-tab';

// ═══════════════════════════════════════════════════════════════════════════
// TAB ICON COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface TabIconProps {
  emoji: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ emoji, focused }) => {
  return (
    <View style={[styles.tabIconContainer, focused && styles.tabIconContainerFocused]}>
      <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>{emoji}</Text>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: DesignColors.primary[600],
        tabBarInactiveTintColor: DesignColors.neutral[400],
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Homepage',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Learn',
          tabBarIcon: ({ focused }) => <TabIcon emoji="📚" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="calculator"
        options={{
          title: 'Calculator',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🧮" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: DesignColors.neutral[0],
    borderTopWidth: 1,
    borderTopColor: DesignColors.neutral[200],
    height: 70,
    paddingBottom: DesignSpacing.sm,
    paddingTop: DesignSpacing.sm,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  tabIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  tabIconContainerFocused: {
    backgroundColor: DesignColors.primary[50],
  },
  tabIcon: {
    fontSize: 20,
    opacity: 0.7,
  },
  tabIconFocused: {
    opacity: 1,
  },
});
