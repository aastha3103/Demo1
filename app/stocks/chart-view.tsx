/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MARKET LAB - CHART VIEW SCREEN
 * Educational stock chart reading experience
 * GREEN-WHITE THEME - Clean, minimalistic, accessible for rural users
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { MLEducationalChart } from '@/components/design-system/MLEducationalChart';
import { useStockLanguage } from '@/context/StockLanguageContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useRewards } from '../../context/RewardContext';

// ═══════════════════════════════════════════════════════════════════════════
// GREEN-WHITE THEME COLORS
// ═══════════════════════════════════════════════════════════════════════════
const COLORS = {
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  white: '#FFFFFF',
  text: '#1F2937',
  textLight: '#6B7280',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
};

export default function ChartViewScreen() {
  const router = useRouter();
  const { t } = useStockLanguage();
  const { completeTask } = useRewards();
  const params = useLocalSearchParams();

  useEffect(() => {
    // Complete 'Chart Analyst' task
    completeTask('stocks_chart');
  }, []);

  const stockSymbol = (params.stock as string) || 'TCS';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <Animated.View
        entering={FadeInDown.duration(400)}
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.8}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{t('charts.title')}</Text>
          <View style={styles.stockBadge}>
            <Text style={styles.stockBadgeText}>{stockSymbol}</Text>
          </View>
        </View>
        <View style={styles.headerRight} />
      </Animated.View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Educational Intro */}
        <Animated.View
          entering={FadeInUp.delay(100).duration(500)}
          style={styles.introCard}
        >
          <View style={styles.introIconContainer}>
            <Text style={styles.introIcon}>📊</Text>
          </View>
          <View style={styles.introContent}>
            <Text style={styles.introTitle}>{t('charts.intro.title')}</Text>
            <Text style={styles.introMessage}>{t('charts.intro.message')}</Text>
          </View>
        </Animated.View>

        {/* Main Educational Chart */}
        <Animated.View
          entering={FadeInUp.delay(200).duration(500)}
        >
          <MLEducationalChart stockSymbol={stockSymbol} />
        </Animated.View>

        {/* Quick Reference Card */}
        <Animated.View
          entering={FadeInUp.delay(300).duration(500)}
          style={styles.refCard}
        >
          <Text style={styles.refTitle}>{t('charts.quickRef')}</Text>

          <View style={styles.refGrid}>
            <View style={styles.refItem}>
              <View style={[styles.refIcon, { backgroundColor: COLORS.green[100] }]}>
                <Text style={styles.refEmoji}>📈</Text>
              </View>
              <Text style={styles.refLabel}>{t('charts.rising')}</Text>
              <Text style={styles.refDesc}>{t('charts.risingDesc')}</Text>
            </View>

            <View style={styles.refItem}>
              <View style={[styles.refIcon, { backgroundColor: COLORS.dangerLight }]}>
                <Text style={styles.refEmoji}>📉</Text>
              </View>
              <Text style={styles.refLabel}>{t('charts.falling')}</Text>
              <Text style={styles.refDesc}>{t('charts.fallingDesc')}</Text>
            </View>

            <View style={styles.refItem}>
              <View style={[styles.refIcon, { backgroundColor: '#F3F4F6' }]}>
                <Text style={styles.refEmoji}>↔️</Text>
              </View>
              <Text style={styles.refLabel}>{t('charts.sideways')}</Text>
              <Text style={styles.refDesc}>{t('charts.sidewaysDesc')}</Text>
            </View>

            <View style={styles.refItem}>
              <View style={[styles.refIcon, { backgroundColor: COLORS.warningLight }]}>
                <Text style={styles.refEmoji}>⚡</Text>
              </View>
              <Text style={styles.refLabel}>{t('charts.volatile')}</Text>
              <Text style={styles.refDesc}>{t('charts.volatileDesc')}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Key Insight */}
        <Animated.View
          entering={FadeInUp.delay(400).duration(500)}
          style={styles.insight}
        >
          <Text style={styles.insightIcon}>🎯</Text>
          <Text style={styles.insightText}>
            {t('charts.insight')}
          </Text>
        </Animated.View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.actionSection}>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => router.push({ pathname: '/stocks/simulator', params: { stock: stockSymbol } })}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaButtonText}>{t('charts.startPractice')}</Text>
          <Text style={styles.ctaArrow}>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STYLES - Green-White Theme
// ═══════════════════════════════════════════════════════════════════════════

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.green[100],
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.green[50],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.green[200],
  },
  backArrow: {
    color: COLORS.green[700],
    fontSize: 24,
    fontWeight: '700',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.green[800],
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
  },
  stockBadge: {
    backgroundColor: COLORS.green[100],
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stockBadgeText: {
    color: COLORS.green[700],
    fontSize: 13,
    fontWeight: '700',
  },
  headerRight: {
    width: 44,
  },

  // Scroll
  scrollView: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    gap: 20
  },

  // Intro Card
  introCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.green[50],
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    borderWidth: 2,
    borderColor: COLORS.green[200],
  },
  introIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  introIcon: {
    fontSize: 26,
  },
  introContent: {
    flex: 1,
  },
  introTitle: {
    color: COLORS.green[700],
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },
  introMessage: {
    color: COLORS.textLight,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },

  // Reference Card
  refCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.green[200],
  },
  refTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 16
  },
  refGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  refItem: {
    alignItems: 'center',
    flex: 1
  },
  refIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  refEmoji: {
    fontSize: 24
  },
  refLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
  },
  refDesc: {
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.textLight,
    textAlign: 'center',
  },

  // Insight
  insight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.green[50],
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.green[200],
  },
  insightIcon: {
    fontSize: 28,
    marginRight: 16
  },
  insightText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.green[700],
    flex: 1,
    lineHeight: 22,
  },

  // Action
  actionSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 2,
    borderTopColor: COLORS.green[100],
    backgroundColor: COLORS.white,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.green[600],
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: '100%',
    shadowColor: COLORS.green[900],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
    gap: 8,
  },
  ctaButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
  },
  ctaArrow: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '800',
  },
});

