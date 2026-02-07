/**
 * ═══════════════════════════════════════════════════════════════════════════
 * INSIGHTS & COMPARISON SCREEN - Wealth Builder Lab
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Converts simulation results into understanding.
 * Reinforces long-term discipline through visual comparisons.
 * 
 * TABS:
 * 1. Growth - Portfolio growth visualization
 * 2. Compare - SIP vs lumpsum, early vs late
 * 3. Behavior - User action feedback (encouraging)
 * 
 * DESIGN PRINCIPLES:
 * - No negative or judgmental language
 * - Encourage patience and consistency
 * - Simple, understandable explanations
 */

import {
  DesignRadius,
  DesignSpacing,
  DesignTextStyles,
  WBLAnimatedNumber,
  WBLButton,
  WBLCard,
  WBLEntrance
} from '@/components/mf_sip/design-system';
import {
  BehaviorFeedback,
  EarlyVsLateChart,
  GrowthChart,
  SIPvsLumpsumChart,
} from '@/components/mf_sip/design-system/InsightsVisualizations';
import { useMFLanguage } from '@/context/MFLanguageContext';
import { useDesignTheme } from '@/hooks/mf_sip/use-design-theme';
import React, { useState } from 'react';
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ═══════════════════════════════════════════════════════════════════════════
// TYPES & DATA
// ═══════════════════════════════════════════════════════════════════════════

type TabId = 'growth' | 'compare' | 'behavior';

interface Tab {
  id: TabId;
  label: string;
  icon: string;
}

// Sample growth data (10 years)
const GROWTH_DATA = [
  { year: 1, value: 62000 },
  { year: 2, value: 132000 },
  { year: 3, value: 210000 },
  { year: 4, value: 298000 },
  { year: 5, value: 395000 },
  { year: 6, value: 510000 },
  { year: 7, value: 642000 },
  { year: 8, value: 795000 },
  { year: 9, value: 972000 },
  { year: 10, value: 1180000 },
];

// ═══════════════════════════════════════════════════════════════════════════
// TAB BAR COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  const { colors, isDark } = useDesignTheme();
  const { t } = useMFLanguage();
  const styles = createStyles(colors, isDark);

  const TABS: Tab[] = [
    { id: 'growth', label: t('insights.tabs.growth'), icon: '📈' },
    { id: 'compare', label: t('insights.tabs.compare'), icon: '⚖️' },
    { id: 'behavior', label: t('insights.tabs.behavior'), icon: '🎯' },
  ];

  return (
    <View style={styles.tabBar}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.tabActive]}
          onPress={() => onTabChange(tab.id)}
        >
          <Text style={styles.tabIcon}>{tab.icon}</Text>
          <Text
            style={[
              styles.tabLabel,
              activeTab === tab.id && styles.tabLabelActive,
            ]}
          >
            {tab.label}
          </Text>
          {activeTab === tab.id && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// GROWTH TAB CONTENT
// ═══════════════════════════════════════════════════════════════════════════

const GrowthTab: React.FC = () => {
  const { colors, isDark } = useDesignTheme();
  const { t } = useMFLanguage();
  const styles = createStyles(colors, isDark);
  const investedAmount = 600000; // ₹5000 x 12 months x 10 years
  const currentValue = 1180000;
  const growth = currentValue - investedAmount;

  const formatAmount = (val: number) => {
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(1)} Lakhs`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <View style={styles.tabContent}>
      {/* Summary Cards */}
      <WBLEntrance delay={100}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>{t('insights.summary.invested')}</Text>
            <Text style={styles.summaryValue}>{formatAmount(investedAmount)}</Text>
          </View>
          <View style={[styles.summaryCard, styles.summaryCardHighlight]}>
            <Text style={styles.summaryLabel}>{t('insights.summary.became')}</Text>
            <Text style={[styles.summaryValue, styles.summaryValueHighlight]}>
              {formatAmount(currentValue)}
            </Text>
          </View>
        </View>
      </WBLEntrance>

      {/* Growth Highlight */}
      <WBLEntrance delay={300}>
        <View style={styles.growthHighlight}>
          <Text style={styles.growthLabel}>{t('insights.summary.growthHighlight')}</Text>
          <Text style={styles.growthValue}>
            +₹<WBLAnimatedNumber value={growth} />
          </Text>
          <Text style={styles.growthPercent}>{t('insights.summary.growthNote')}</Text>
        </View>
      </WBLEntrance>

      {/* Chart */}
      <WBLEntrance delay={500}>
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>{t('insights.growth.chartTitle')}</Text>
          <GrowthChart data={GROWTH_DATA} investedAmount={investedAmount} />
        </View>
      </WBLEntrance>

      {/* Explanation */}
      <WBLCard variant="accent">
        <View style={styles.explanationContent}>
          <Text style={styles.explanationTitle}>{t('insights.growth.explanationTitle')}</Text>
          <Text style={styles.explanationText}>
            {t('insights.growth.explanationText')}
          </Text>
        </View>
      </WBLCard>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// COMPARE TAB CONTENT
// ═══════════════════════════════════════════════════════════════════════════

const CompareTab: React.FC = () => {
  const { colors, isDark } = useDesignTheme();
  const { t } = useMFLanguage();
  const styles = createStyles(colors, isDark);
  return (
    <View style={styles.tabContent}>
      {/* SIP vs Lumpsum */}
      <View style={styles.comparisonSection}>
        <Text style={styles.sectionTitle}>{t('insights.compare.sipVsLumpsum')}</Text>
        <Text style={styles.sectionSubtitle}>
          {t('insights.compare.sipVsLumpsumSub')}
        </Text>
        <SIPvsLumpsumChart
          sipValue={72000}
          lumpsumValue={68000}
          investedAmount={60000}
        />
      </View>

      {/* Early vs Late */}
      <View style={styles.comparisonSection}>
        <Text style={styles.sectionTitle}>{t('insights.compare.earlyVsLate')}</Text>
        <Text style={styles.sectionSubtitle}>
          {t('insights.compare.earlyVsLateSub')}
        </Text>
        <EarlyVsLateChart
          earlyStartValue={1180000}
          lateStartValue={395000}
          earlyYears={20}
          lateYears={10}
        />
      </View>

      {/* Key Takeaway */}
      <WBLCard variant="success">
        <View style={styles.takeawayContent}>
          <Text style={styles.takeawayEmoji}>💎</Text>
          <View style={styles.takeawayTextContainer}>
            <Text style={styles.takeawayTitle}>{t('insights.compare.takeawayTitle')}</Text>
            <Text style={styles.takeawayText}>
              {t('insights.compare.takeawayText')}
            </Text>
          </View>
        </View>
      </WBLCard>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// BEHAVIOR TAB CONTENT
// ═══════════════════════════════════════════════════════════════════════════

const BehaviorTab: React.FC = () => {
  const { colors, isDark } = useDesignTheme();
  const { t } = useMFLanguage();
  const styles = createStyles(colors, isDark);

  const metrics = [
    {
      id: '1',
      icon: '📅',
      title: t('insights.behavior.consistency.title'),
      value: t('insights.behavior.consistency.value')
        .replace('{invested}', '10')
        .replace('{total}', '12'),
      feedback: t('insights.behavior.consistency.feedback'),
      isPositive: true,
    },
    {
      id: '2',
      icon: '⏸️',
      title: t('insights.behavior.pause.title'),
      value: t('insights.behavior.pause.value').replace('{count}', '1'),
      feedback: t('insights.behavior.pause.feedback'),
      isPositive: true,
    },
    {
      id: '3',
      icon: '🎢',
      title: t('insights.behavior.marketDips.title'),
      value: t('insights.behavior.marketDips.value').replace('{count}', '2'),
      feedback: t('insights.behavior.marketDips.feedback'),
      isPositive: true,
    },
    {
      id: '4',
      icon: '📚',
      title: t('insights.behavior.learning.title'),
      value: t('insights.behavior.learning.value').replace('{count}', '8'),
      feedback: t('insights.behavior.learning.feedback'),
      isPositive: true,
    },
  ];

  return (
    <View style={styles.tabContent}>
      {/* Header */}
      <View style={styles.behaviorHeader}>
        <Text style={styles.behaviorTitle}>{t('insights.behavior.title')}</Text>
        <Text style={styles.behaviorSubtitle}>
          {t('insights.behavior.subtitle')}
        </Text>
      </View>

      {/* Behavior Feedback */}
      <BehaviorFeedback metrics={metrics} overallScore={85} />

      {/* Words of Wisdom */}
      <View style={styles.wisdomSection}>
        <Text style={styles.wisdomTitle}>{t('insights.behavior.wisdomTitle')}</Text>
        <View style={styles.wisdomCard}>
          <Text style={styles.wisdomQuote}>
            {t('insights.behavior.wisdomQuote')}
          </Text>
          <Text style={styles.wisdomAuthor}>{t('insights.behavior.wisdomAuthor')}</Text>
        </View>
      </View>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

import { useRewards } from '@/context/RewardContext';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function InsightsScreen() {
  const router = useRouter();
  const { colors, isDark } = useDesignTheme();
  const { t } = useMFLanguage();
  const styles = createStyles(colors, isDark);
  const [activeTab, setActiveTab] = useState<TabId>('growth');
  const { completeTask } = useRewards();

  useEffect(() => {
    // Complete the 'Insight Seeker' task
    completeTask('mf_insight');
  }, []);

  const handleReturnToFinLearn = () => {
    // Navigate back to the home screen
    router.replace('/mf_sip/(tabs)/home');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'growth':
        return <GrowthTab />;
      case 'compare':
        return <CompareTab />;
      case 'behavior':
        return <BehaviorTab />;
      default:
        return <GrowthTab />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.neutral[50]} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('insights.title')}</Text>
        <Text style={styles.headerSubtitle}>
          {t('insights.subtitle')}
        </Text>
      </View>

      {/* Tab Bar */}
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderTabContent()}

        {/* Final CTA */}
        <View style={styles.ctaSection}>
          <WBLButton
            title={t('insights.cta.back')}
            variant="primary"
            size="large"
            fullWidth
            onPress={handleReturnToFinLearn}
            style={styles.ctaButton}
          />
          <Text style={styles.ctaHint}>
            {t('insights.cta.hint')}
          </Text>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
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

  // ─────────────────────────────────────────────────────────────────────────
  // HEADER
  // ─────────────────────────────────────────────────────────────────────────
  header: {
    paddingHorizontal: DesignSpacing.screenPadding,
    paddingTop: DesignSpacing.lg,
    paddingBottom: DesignSpacing.md,
  },
  headerTitle: {
    ...DesignTextStyles.headlineLarge,
    color: colors.neutral[800],
    marginBottom: DesignSpacing.xs,
  },
  headerSubtitle: {
    ...DesignTextStyles.bodyMedium,
    color: colors.neutral[700], // Increased contrast
    fontWeight: '500',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // TAB BAR
  // ─────────────────────────────────────────────────────────────────────────
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.neutral[0],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
    paddingHorizontal: DesignSpacing.screenPadding,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: DesignSpacing.md,
    position: 'relative',
  },
  tabActive: {},
  tabIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  tabLabel: {
    ...DesignTextStyles.labelSmall,
    color: colors.neutral[700], // Increased contrast
    fontWeight: '500',
  },
  tabLabelActive: {
    color: colors.primary[600],
    fontWeight: '700',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '20%',
    right: '20%',
    height: 3,
    backgroundColor: colors.primary[500],
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SCROLL VIEW
  // ─────────────────────────────────────────────────────────────────────────
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: DesignSpacing.massive,
  },
  tabContent: {
    padding: DesignSpacing.screenPadding,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // GROWTH TAB
  // ─────────────────────────────────────────────────────────────────────────
  summaryRow: {
    flexDirection: 'row',
    gap: DesignSpacing.md,
    marginBottom: DesignSpacing.lg,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.neutral[0],
    borderRadius: DesignRadius.card,
    padding: DesignSpacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  summaryCardHighlight: {
    backgroundColor: isDark ? 'rgba(255,160,0,0.1)' : colors.secondary[50],
    borderColor: isDark ? colors.secondary[400] : colors.secondary[200],
  },
  summaryLabel: {
    ...DesignTextStyles.caption,
    color: colors.neutral[700], // Increased contrast
    fontWeight: '600',
    marginBottom: DesignSpacing.xs,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.neutral[700],
  },
  summaryValueHighlight: {
    color: isDark ? colors.secondary[600] : colors.neutral[900],
  },
  growthHighlight: {
    alignItems: 'center',
    backgroundColor: isDark ? 'rgba(21,101,192,0.1)' : colors.primary[50],
    borderRadius: DesignRadius.card,
    padding: DesignSpacing.xl,
    marginBottom: DesignSpacing.xl,
  },
  growthLabel: {
    ...DesignTextStyles.labelMedium,
    color: isDark ? colors.primary[300] : colors.neutral[900],
    marginBottom: DesignSpacing.sm,
  },
  growthValue: {
    fontSize: 32,
    fontWeight: '700',
    color: isDark ? colors.secondary[600] : colors.neutral[900],
    marginBottom: DesignSpacing.xs,
  },
  growthPercent: {
    ...DesignTextStyles.bodyMedium,
    color: isDark ? colors.neutral[600] : colors.neutral[800],
  },
  chartSection: {
    marginBottom: DesignSpacing.xl,
  },
  sectionTitle: {
    ...DesignTextStyles.titleMedium,
    color: colors.neutral[800],
    marginBottom: DesignSpacing.md,
  },
  explanationContent: {
    alignItems: 'center',
  },
  explanationTitle: {
    ...DesignTextStyles.titleMedium,
    color: isDark ? colors.neutral[800] : colors.neutral[900],
    marginBottom: DesignSpacing.sm,
    textAlign: 'center',
  },
  explanationText: {
    ...DesignTextStyles.bodyMedium,
    color: isDark ? colors.neutral[600] : colors.neutral[800],
    textAlign: 'center',
    lineHeight: 24,
  },
  bold: {
    fontWeight: '700',
    color: isDark ? colors.primary[600] : colors.neutral[900],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // COMPARE TAB
  // ─────────────────────────────────────────────────────────────────────────
  comparisonSection: {
    marginBottom: DesignSpacing.xxl,
  },
  sectionSubtitle: {
    ...DesignTextStyles.bodyMedium,
    color: colors.neutral[700], // Increased contrast
    fontWeight: '500',
    marginBottom: DesignSpacing.lg,
  },
  takeawayContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  takeawayEmoji: {
    fontSize: 28,
    marginRight: DesignSpacing.md,
  },
  takeawayTextContainer: {
    flex: 1,
  },
  takeawayTitle: {
    ...DesignTextStyles.titleMedium,
    color: isDark ? colors.secondary[700] : colors.neutral[900],
    marginBottom: DesignSpacing.xs,
  },
  takeawayText: {
    ...DesignTextStyles.bodyMedium,
    color: isDark ? colors.neutral[600] : colors.neutral[800],
    lineHeight: 24,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BEHAVIOR TAB
  // ─────────────────────────────────────────────────────────────────────────
  behaviorHeader: {
    marginBottom: DesignSpacing.xl,
  },
  behaviorTitle: {
    ...DesignTextStyles.headlineMedium,
    color: colors.neutral[800],
    marginBottom: DesignSpacing.sm,
  },
  behaviorSubtitle: {
    ...DesignTextStyles.bodyMedium,
    color: colors.neutral[700], // Increased contrast
    fontWeight: '500',
    lineHeight: 24,
  },
  wisdomSection: {
    marginTop: DesignSpacing.xl,
  },
  wisdomTitle: {
    ...DesignTextStyles.titleMedium,
    color: colors.neutral[800],
    marginBottom: DesignSpacing.md,
  },
  wisdomCard: {
    backgroundColor: colors.neutral[0],
    borderRadius: DesignRadius.card,
    padding: DesignSpacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary[400],
  },
  wisdomQuote: {
    ...DesignTextStyles.bodyLarge,
    color: colors.neutral[700],
    fontStyle: 'italic',
    lineHeight: 28,
    marginBottom: DesignSpacing.md,
  },
  wisdomAuthor: {
    ...DesignTextStyles.labelMedium,
    color: colors.neutral[500],
    textAlign: 'right',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CTA SECTION
  // ─────────────────────────────────────────────────────────────────────────
  ctaSection: {
    paddingHorizontal: DesignSpacing.screenPadding,
    paddingTop: DesignSpacing.xxl,
    alignItems: 'center',
  },
  ctaButton: {
    shadowColor: colors.primary[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  ctaHint: {
    ...DesignTextStyles.caption,
    color: colors.neutral[500],
    marginTop: DesignSpacing.md,
  },
});
