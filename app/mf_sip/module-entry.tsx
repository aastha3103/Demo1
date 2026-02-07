/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WEALTH BUILDER LAB - MODULE ENTRY SCREEN
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * The welcoming entry point for the Wealth Builder Lab module.
 * Designed to introduce long-term investing in a calm, trustworthy way.
 * 
 * PURPOSE:
 * - Introduce the concept of long-term investing
 * - Build trust with first-time users
 * - Remove fear of money and finance
 * 
 * TARGET USERS:
 * - First-time investors
 * - Users from rural/semi-urban backgrounds
 * - Age 15+
 * - Low financial knowledge
 */

import {
  DesignRadius,
  DesignSpacing,
  DesignTextStyles,
  GrowthIllustrationSimple,
  WBLButton,
  WBLEntrance
} from '@/components/mf_sip/design-system';
import { useDesignTheme } from '@/hooks/mf_sip/use-design-theme';
import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

import { useRewards } from '@/context/RewardContext';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function ModuleEntryScreen() {
  const router = useRouter();
  const { colors, isDark } = useDesignTheme();
  const { completeTask } = useRewards();

  useEffect(() => {
    // Complete the 'Wealth Check' task
    completeTask('mf_visit');
  }, []);
  const styles = createStyles(colors, isDark);
  const handleStartLearning = () => {
    // Navigate to learn mode flow
    router.push('/mf_sip/learn-mode');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.neutral[50]} />

      <View style={styles.content}>
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* FINLEARN BRANDING */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <WBLEntrance delay={200} direction="down">
          <View style={styles.brandingContainer}>
            <View style={styles.brandingBadge}>
              <Text style={styles.brandingIcon}>📚</Text>
              <Text style={styles.brandingText}>FinLearn</Text>
            </View>
          </View>
        </WBLEntrance>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* MAIN CONTENT - CENTERED */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <WBLEntrance delay={400} direction="up">
          <View style={styles.mainContent}>
            {/* Central Illustration */}
            <View style={styles.illustrationContainer}>
              <GrowthIllustrationSimple size={220} />
            </View>

            {/* Title Section */}
            <View style={styles.titleSection}>
              <Text style={styles.mainTitle}>Wealth Builder Lab</Text>
              <Text style={styles.subtitle}>20+ Lessons to build your wealth</Text>
            </View>
          </View>
        </WBLEntrance>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* BOTTOM ACTION SECTION */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <View style={styles.actionSection}>
          {/* Primary CTA */}
          <WBLButton
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
              <Text style={styles.reassuranceText}>No real money involved</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════

const createStyles = (colors: any, isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
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
    backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : colors.primary[50],
    paddingHorizontal: DesignSpacing.md,
    paddingVertical: DesignSpacing.sm,
    borderRadius: DesignRadius.round,
    borderWidth: 1,
    borderColor: isDark ? colors.primary[300] : colors.primary[100],
  },
  brandingIcon: {
    fontSize: 14,
    marginRight: DesignSpacing.xs,
  },
  brandingText: {
    ...DesignTextStyles.labelSmall,
    color: isDark ? colors.primary[300] : colors.neutral[900],
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
    marginBottom: DesignSpacing.xxxl,
  },
  titleSection: {
    alignItems: 'center',
    paddingHorizontal: DesignSpacing.lg,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.neutral[800],
    textAlign: 'center',
    marginBottom: DesignSpacing.md,
    letterSpacing: -0.5,
  },
  subtitle: {
    ...DesignTextStyles.titleMedium,
    color: colors.neutral[700], // Increased contrast
    textAlign: 'center',
    fontWeight: '500', // Increased weight
    lineHeight: 26,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ACTION SECTION
  // ─────────────────────────────────────────────────────────────────────────
  actionSection: {
    alignItems: 'center',
  },
  ctaButton: {
    marginBottom: DesignSpacing.xl,
    // Add subtle shadow for prominence
    shadowColor: colors.primary[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  reassuranceContainer: {
    alignItems: 'center',
  },
  reassuranceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDark ? 'rgba(255,160,0,0.1)' : colors.secondary[50],
    paddingHorizontal: DesignSpacing.lg,
    paddingVertical: DesignSpacing.sm,
    borderRadius: DesignRadius.round,
    borderWidth: 1,
    borderColor: isDark ? colors.secondary[300] : colors.secondary[100],
  },
  reassuranceIcon: {
    fontSize: 14,
    marginRight: DesignSpacing.sm,
  },
  reassuranceText: {
    ...DesignTextStyles.labelSmall,
    color: isDark ? colors.secondary[300] : colors.neutral[900],
    fontWeight: '600',
  },
});
