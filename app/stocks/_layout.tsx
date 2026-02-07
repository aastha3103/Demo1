/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MARKET LAB - ROOT LAYOUT
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Root navigation structure for the Market Lab module.
 * DARK MODE ONLY - enforced throughout the app.
 */

import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { DesignColors } from '@/constants/design-system';
import { StockLanguageProvider } from '@/context/StockLanguageContext';

// Custom dark theme with Market Lab colors
const MarketLabTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: DesignColors.primary[500],
    background: DesignColors.neutral[50],
    card: DesignColors.neutral[100],
    text: DesignColors.neutral[900],
    border: DesignColors.neutral[300],
    notification: DesignColors.primary[500],
  },
};

export default function RootLayout() {
  return (
    <StockLanguageProvider>
      <ThemeProvider value={MarketLabTheme}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: DesignColors.neutral[50],
            },
            headerTintColor: DesignColors.neutral[900],
            headerTitleStyle: {
              fontWeight: '700',
            },
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: DesignColors.neutral[50],
            },
          }}
        >
          {/* Main Tabs */}
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />

          {/* Module Entry Screen */}
          <Stack.Screen
            name="module-entry"
            options={{
              headerShown: false,
              presentation: 'card',
            }}
          />

          {/* Learn Mode (Educational onboarding) */}
          <Stack.Screen
            name="learn-mode"
            options={{
              headerShown: false,
              presentation: 'card',
            }}
          />

          {/* Stock Simulator */}
          <Stack.Screen
            name="simulator"
            options={{
              headerShown: false,
              presentation: 'card',
            }}
          />

          {/* Insights Screen */}
          <Stack.Screen
            name="insights"
            options={{
              headerShown: false,
              presentation: 'card',
            }}
          />

          {/* Stock Selection Screen */}
          <Stack.Screen
            name="stock-selection"
            options={{
              headerShown: false,
              presentation: 'card',
            }}
          />

          {/* Chart View Screen */}
          <Stack.Screen
            name="chart-view"
            options={{
              headerShown: false,
              presentation: 'card',
            }}
          />

          {/* Modal */}
          <Stack.Screen
            name="modal"
            options={{
              presentation: 'modal',
              title: 'Modal',
              headerStyle: {
                backgroundColor: DesignColors.neutral[100],
              },
            }}
          />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </StockLanguageProvider>
  );
}
