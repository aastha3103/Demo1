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
 * DARK MODE ONLY - Calm, focused, analytical appearance
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  DesignColors,
  DesignSpacing,
  DesignTextStyles,
  DesignRadius,
  MLButton,
  StockChartIllustration,
} from '@/components/design-system';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ModuleEntryScreen() {
  const router = useRouter();

  const handleStartLearning = () => {
    router.push('/learn-mode');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={DesignColors.neutral[50]} />

      <View style={styles.content}>
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* FINLEARN BRANDING */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <View style={styles.brandingContainer}>
          <View style={styles.brandingBadge}>
            <Text style={styles.brandingIcon}>📚</Text>
            <Text style={styles.brandingText}>FinLearn</Text>
          </View>
        </View>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* MAIN CONTENT - CENTERED */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <View style={styles.mainContent}>
          {/* Central Illustration */}
          <View style={styles.illustrationContainer}>
            <StockChartIllustration size={220} />
          </View>

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.mainTitle}>Market Lab</Text>
            <Text style={styles.subtitle}>Learn how stock markets work</Text>
          </View>

          {/* Feature Pills */}
          <View style={styles.featurePills}>
            <View style={styles.pill}>
              <Text style={styles.pillIcon}>📊</Text>
              <Text style={styles.pillText}>Read Charts</Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillIcon}>🎓</Text>
              <Text style={styles.pillText}>Learn Basics</Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillIcon}>⚖️</Text>
              <Text style={styles.pillText}>Compare</Text>
            </View>
          </View>
        </View>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* BOTTOM ACTION SECTION */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <View style={styles.actionSection}>
          {/* Disclaimer Card */}
          <View style={styles.disclaimerCard}>
            <Text style={styles.disclaimerIcon}>🎓</Text>
            <View style={styles.disclaimerContent}>
              <Text style={styles.disclaimerTitle}>Educational Simulator</Text>
              <Text style={styles.disclaimerText}>
                This is a learning tool, not real trading. No actual money is involved.
              </Text>
            </View>
          </View>

          {/* Primary CTA */}
          <MLButton
            title="Start Learning"
            variant="primary"
            size="large"
            fullWidth
            onPress={handleStartLearning}
            style={styles.ctaButton}
          />

          {/* Reassurance Text */}
          <View style={styles.reassuranceContainer}>
            <View style={styles.reassuranceBadge}>
              <Text style={styles.reassuranceIcon}>🛡️</Text>
              <Text style={styles.reassuranceText}>Safe learning environment</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DesignColors.neutral[50],
  },
  content: {
    flex: 1,
    paddingHorizontal: DesignSpacing.screenPadding,
    paddingTop: DesignSpacing.xl,
    paddingBottom: DesignSpacing.xxxl,
    justifyContent: 'space-between',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BRANDING
  // ─────────────────────────────────────────────────────────────────────────
  brandingContainer: {
    alignItems: 'center',
    marginBottom: DesignSpacing.lg,
  },
  brandingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DesignColors.neutral[200],
    paddingHorizontal: DesignSpacing.md,
    paddingVertical: DesignSpacing.sm,
    borderRadius: DesignRadius.round,
    borderWidth: 1,
    borderColor: DesignColors.neutral[300],
  },
  brandingIcon: {
    fontSize: 14,
    marginRight: DesignSpacing.xs,
  },
  brandingText: {
    ...DesignTextStyles.labelSmall,
    color: DesignColors.primary[500],
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MAIN CONTENT
  // ─────────────────────────────────────────────────────────────────────────
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationContainer: {
    marginBottom: DesignSpacing.xxl,
  },
  titleSection: {
    alignItems: 'center',
    paddingHorizontal: DesignSpacing.lg,
    marginBottom: DesignSpacing.xl,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: DesignColors.neutral[900],
    textAlign: 'center',
    marginBottom: DesignSpacing.md,
    letterSpacing: -0.5,
  },
  subtitle: {
    ...DesignTextStyles.titleMedium,
    color: DesignColors.neutral[600],
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 26,
  },

  // Feature Pills
  featurePills: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: DesignSpacing.sm,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DesignColors.neutral[200],
    paddingHorizontal: DesignSpacing.md,
    paddingVertical: DesignSpacing.sm,
    borderRadius: DesignRadius.round,
  },
  pillIcon: {
    fontSize: 14,
    marginRight: DesignSpacing.xs,
  },
  pillText: {
    ...DesignTextStyles.labelSmall,
    color: DesignColors.neutral[700],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ACTION SECTION
  // ─────────────────────────────────────────────────────────────────────────
  actionSection: {
    alignItems: 'center',
  },
  disclaimerCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: DesignColors.semantic.learning.light,
    borderRadius: DesignRadius.lg,
    padding: DesignSpacing.lg,
    marginBottom: DesignSpacing.xl,
    borderWidth: 1,
    borderColor: DesignColors.accent.purple,
    width: '100%',
  },
  disclaimerIcon: {
    fontSize: 24,
    marginRight: DesignSpacing.md,
  },
  disclaimerContent: {
    flex: 1,
  },
  disclaimerTitle: {
    ...DesignTextStyles.labelLarge,
    color: DesignColors.accent.purple,
    marginBottom: 4,
  },
  disclaimerText: {
    ...DesignTextStyles.bodySmall,
    color: DesignColors.neutral[600],
    lineHeight: 20,
  },
  ctaButton: {
    marginBottom: DesignSpacing.lg,
    shadowColor: DesignColors.primary[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  reassuranceContainer: {
    alignItems: 'center',
  },
  reassuranceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DesignColors.secondary[50],
    paddingHorizontal: DesignSpacing.lg,
    paddingVertical: DesignSpacing.sm,
    borderRadius: DesignRadius.round,
    borderWidth: 1,
    borderColor: DesignColors.secondary[200],
  },
  reassuranceIcon: {
    fontSize: 14,
    marginRight: DesignSpacing.sm,
  },
  reassuranceText: {
    ...DesignTextStyles.labelSmall,
    color: DesignColors.secondary[500],
    fontWeight: '600',
  },
});
