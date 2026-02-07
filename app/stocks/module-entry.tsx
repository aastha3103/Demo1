/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MARKET LAB - MODULE ENTRY SCREEN
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * The welcoming entry point for the Market Lab module.
 * Designed to introduce stock market education in a calm, analytical way.
 * 
 * PURPOSE:
 * - Introduce stock market concepts
 * - Emphasize learning, not trading/gambling
 * - Build confidence for first-time learners
 * 
 * GREEN-WHITE THEME - Clean, minimalistic, accessible for rural users
 */

import {
  StockChartIllustration
} from '@/components/design-system';
import { useRewards } from '@/context/RewardContext';
import { useStockLanguage } from '@/context/StockLanguageContext';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
  gold: '#F59E0B',
  goldLight: '#FEF3C7',
  purple: '#8B5CF6',
  purpleLight: '#EDE9FE',
};

export default function ModuleEntryScreen() {
  const router = useRouter();
  const { completeTask } = useRewards();
  const { t, language, setLanguage } = useStockLanguage();

  useEffect(() => {
    // Complete 'Market Morning' task
    completeTask('stocks_visit');
  }, []);

  const handleStartLearning = () => {
    router.push('/stocks/learn-mode');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* HEADER */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <Animated.View
          entering={FadeInDown.duration(500)}
          style={styles.header}
        >
          <View style={styles.brandingBadge}>
            <Text style={styles.brandingIcon}>📈</Text>
            <Text style={styles.brandingText}>{t('entry.branding')}</Text>
          </View>

          <TouchableOpacity
            style={styles.langSwitch}
            onPress={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            activeOpacity={0.8}
          >
            <Text style={styles.langSwitchText}>
              {language === 'en' ? 'हिन्दी' : 'English'}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* MAIN CONTENT - CENTERED */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <View style={styles.mainContent}>
          {/* Central Illustration */}
          <Animated.View
            entering={FadeInUp.delay(100).duration(600)}
            style={styles.illustrationContainer}
          >
            <View style={styles.illustrationBg}>
              <StockChartIllustration size={180} />
            </View>
          </Animated.View>

          {/* Title Section */}
          <Animated.View
            entering={FadeInUp.delay(200).duration(600)}
            style={styles.titleSection}
          >
            <Text style={styles.welcomeText}>📊</Text>
            <Text style={styles.mainTitle}>{t('entry.title')}</Text>
            <Text style={styles.subtitle}>{t('entry.subtitle')}</Text>
          </Animated.View>

          {/* Feature Pills */}
          <Animated.View
            entering={FadeInUp.delay(300).duration(600)}
            style={styles.featurePills}
          >
            <View style={styles.pill}>
              <Text style={styles.pillIcon}>📊</Text>
              <Text style={styles.pillText}>{t('entry.features.charts')}</Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillIcon}>🎓</Text>
              <Text style={styles.pillText}>{t('entry.features.basics')}</Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillIcon}>⚖️</Text>
              <Text style={styles.pillText}>{t('entry.features.compare')}</Text>
            </View>
          </Animated.View>
        </View>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* BOTTOM ACTION SECTION */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <Animated.View
          entering={FadeInUp.delay(400).duration(600)}
          style={styles.actionSection}
        >
          {/* Disclaimer Card */}
          <View style={styles.disclaimerCard}>
            <View style={styles.disclaimerIconContainer}>
              <Text style={styles.disclaimerIcon}>🎓</Text>
            </View>
            <View style={styles.disclaimerContent}>
              <Text style={styles.disclaimerTitle}>{t('entry.disclaimer.title')}</Text>
              <Text style={styles.disclaimerText}>
                {t('entry.disclaimer.text')}
              </Text>
            </View>
          </View>

          {/* Primary CTA */}
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={handleStartLearning}
            activeOpacity={0.8}
          >
            <Text style={styles.ctaButtonText}>{t('entry.startLearning')}</Text>
            <Text style={styles.ctaArrow}>→</Text>
          </TouchableOpacity>

          {/* Reassurance Text */}
          <View style={styles.reassuranceContainer}>
            <View style={styles.reassuranceBadge}>
              <Text style={styles.reassuranceIcon}>🛡️</Text>
              <Text style={styles.reassuranceText}>{t('entry.reassurance')}</Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STYLES - Clean Green-White Theme
// ═══════════════════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // HEADER
  // ─────────────────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  brandingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.green[50],
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.green[200],
  },
  brandingIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  brandingText: {
    color: COLORS.green[700],
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  langSwitch: {
    backgroundColor: COLORS.green[600],
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
  },
  langSwitchText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MAIN CONTENT
  // ─────────────────────────────────────────────────────────────────────────
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  illustrationContainer: {
    marginBottom: 32,
  },
  illustrationBg: {
    backgroundColor: COLORS.green[50],
    borderRadius: 100,
    padding: 24,
    borderWidth: 3,
    borderColor: COLORS.green[200],
  },
  titleSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 48,
    marginBottom: 16,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.green[800],
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 24,
  },

  // Feature Pills
  featurePills: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.green[50],
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.green[100],
  },
  pillIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  pillText: {
    color: COLORS.green[700],
    fontSize: 14,
    fontWeight: '600',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ACTION SECTION
  // ─────────────────────────────────────────────────────────────────────────
  actionSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  disclaimerCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.purpleLight,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: COLORS.purple,
    width: '100%',
  },
  disclaimerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  disclaimerIcon: {
    fontSize: 24,
  },
  disclaimerContent: {
    flex: 1,
  },
  disclaimerTitle: {
    color: COLORS.purple,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },
  disclaimerText: {
    color: COLORS.textLight,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
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
    marginBottom: 20,
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
  reassuranceContainer: {
    alignItems: 'center',
  },
  reassuranceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.goldLight,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.gold,
  },
  reassuranceIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  reassuranceText: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '700',
  },
});

