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
import { useMFLanguage } from '@/context/MFLanguageContext';
import { useDesignTheme } from '@/hooks/mf_sip/use-design-theme';
import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
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
  const { language, setLanguage, t } = useMFLanguage();

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
        {/* TOP BAR - BRANDING & LANGUAGE */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <WBLEntrance delay={200} direction="down">
          <View style={styles.topBar}>
            <View style={styles.brandingBadge}>
              <Text style={styles.brandingIcon}>📚</Text>
              <Text style={styles.brandingText}>{t('entry.branding')}</Text>
            </View>

            <View style={styles.languageToggle}>
              <TouchableOpacity
                onPress={() => setLanguage('en')}
                style={[styles.langBtn, language === 'en' && styles.langBtnActive]}
              >
                <Text style={[styles.langText, language === 'en' && styles.langTextActive]}>EN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setLanguage('hi')}
                style={[styles.langBtn, language === 'hi' && styles.langBtnActive]}
              >
                <Text style={[styles.langText, language === 'hi' && styles.langTextActive]}>हि</Text>
              </TouchableOpacity>
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
              <Text style={styles.mainTitle}>{t('entry.title')}</Text>
              <Text style={styles.subtitle}>{t('entry.subtitle')}</Text>
            </View>
          </View>
        </WBLEntrance>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* BOTTOM ACTION SECTION */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <View style={styles.actionSection}>
          {/* Primary CTA */}
          <WBLButton
            title={t('entry.startLearning')}
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
              <Text style={styles.reassuranceText}>{t('entry.reassurance')}</Text>
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
  // TOP BAR
  // ─────────────────────────────────────────────────────────────────────────
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : colors.neutral[100],
    borderRadius: DesignRadius.round,
    padding: 4,
    borderWidth: 1,
    borderColor: isDark ? colors.neutral[700] : colors.neutral[200],
  },
  langBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: DesignRadius.round,
  },
  langBtnActive: {
    backgroundColor: colors.primary[500],
  },
  langText: {
    ...DesignTextStyles.labelSmall,
    color: colors.neutral[500],
    fontWeight: '600',
  },
  langTextActive: {
    color: colors.neutral[0],
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
    color: colors.neutral[900], // Maximum contrast - dark text
    textAlign: 'center',
    fontWeight: '700', // Bold weight for better visibility
    fontSize: 18, // Ensure size is visible
    lineHeight: 28,
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
