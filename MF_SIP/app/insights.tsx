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

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  DesignColors,
  DesignSpacing,
  DesignTextStyles,
  DesignRadius,
  WBLButton,
  WBLCard,
  WBLEntrance,
  WBLPulse,
  WBLAnimatedNumber,
} from '@/components/design-system';
import { useDesignTheme } from '@/hooks/use-design-theme';
import {
  GrowthChart,
  SIPvsLumpsumChart,
  EarlyVsLateChart,
  BehaviorFeedback,
} from '@/components/design-system/InsightsVisualizations';

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

const TABS: Tab[] = [
  { id: 'growth', label: 'Growth', icon: '📈' },
  { id: 'compare', label: 'Compare', icon: '⚖️' },
  { id: 'behavior', label: 'Behavior', icon: '🎯' },
];

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

// Behavior metrics (encouraging, non-judgmental)
const BEHAVIOR_METRICS = [
  {
    id: '1',
    icon: '📅',
    title: 'Consistency',
    value: '10 of 12 months invested',
    feedback: "Great job staying consistent! Regular investing, even small amounts, builds wealth over time.",
    isPositive: true,
  },
  {
    id: '2',
    icon: '⏸️',
    title: 'Pause Usage',
    value: '1 fund paused briefly',
    feedback: "You paused once — that's okay! Life happens. The key is that you resumed. That shows commitment.",
    isPositive: true,
  },
  {
    id: '3',
    icon: '🎢',
    title: 'Market Dips',
    value: 'Stayed invested during 2 dips',
    feedback: "You didn't panic during market dips. That's exactly what successful long-term investors do!",
    isPositive: true,
  },
  {
    id: '4',
    icon: '📚',
    title: 'Learning',
    value: '8 lessons completed',
    feedback: "You're building knowledge alongside wealth. Understanding what you're doing makes you a confident investor.",
    isPositive: true,
  },
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
  const styles = createStyles(colors, isDark);
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
            <Text style={styles.summaryLabel}>You Invested</Text>
            <Text style={styles.summaryValue}>{formatAmount(investedAmount)}</Text>
          </View>
          <View style={[styles.summaryCard, styles.summaryCardHighlight]}>
            <Text style={styles.summaryLabel}>It Became</Text>
            <Text style={[styles.summaryValue, styles.summaryValueHighlight]}>
              {formatAmount(currentValue)}
            </Text>
          </View>
        </View>
      </WBLEntrance>

      {/* Growth Highlight */}
      <WBLEntrance delay={300}>
        <View style={styles.growthHighlight}>
          <Text style={styles.growthLabel}>Your money grew by</Text>
          <Text style={styles.growthValue}>
            +₹<WBLAnimatedNumber value={growth} />
          </Text>
          <Text style={styles.growthPercent}>That's almost 2x your investment! 🎉</Text>
        </View>
      </WBLEntrance>

      {/* Chart */}
      <WBLEntrance delay={500}>
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>📊 Your 10-Year Journey</Text>
          <GrowthChart data={GROWTH_DATA} investedAmount={investedAmount} />
        </View>
      </WBLEntrance>

      {/* Explanation */}
      <WBLCard variant="accent">
        <View style={styles.explanationContent}>
          <Text style={styles.explanationTitle}>🌱 What happened here?</Text>
          <Text style={styles.explanationText}>
            Your ₹5,000 monthly SIP kept growing because of <Text style={styles.bold}>compounding</Text> —
            your returns started earning their own returns! The longer you stay invested, the faster this growth becomes.
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
  const styles = createStyles(colors, isDark);
  return (
    <View style={styles.tabContent}>
      {/* SIP vs Lumpsum */}
      <View style={styles.comparisonSection}>
        <Text style={styles.sectionTitle}>📊 SIP vs One-Time Investment</Text>
        <Text style={styles.sectionSubtitle}>
          What if you invested ₹60,000 all at once vs ₹5,000 monthly?
        </Text>
        <SIPvsLumpsumChart
          sipValue={72000}
          lumpsumValue={68000}
          investedAmount={60000}
        />
      </View>

      {/* Early vs Late */}
      <View style={styles.comparisonSection}>
        <Text style={styles.sectionTitle}>⏰ The Power of Starting Early</Text>
        <Text style={styles.sectionSubtitle}>
          Same ₹5,000/month, but starting 10 years apart
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
            <Text style={styles.takeawayTitle}>Key Takeaway</Text>
            <Text style={styles.takeawayText}>
              Don't wait to start. Don't try to time the market. Just start and stay consistent —
              that's the real secret to building wealth.
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
  const styles = createStyles(colors, isDark);
  return (
    <View style={styles.tabContent}>
      {/* Header */}
      <View style={styles.behaviorHeader}>
        <Text style={styles.behaviorTitle}>Your Investor Journey</Text>
        <Text style={styles.behaviorSubtitle}>
          Here's how you did in the simulation. Remember, there's no right or wrong —
          it's all about learning!
        </Text>
      </View>

      {/* Behavior Feedback */}
      <BehaviorFeedback metrics={BEHAVIOR_METRICS} overallScore={85} />

      {/* Words of Wisdom */}
      <View style={styles.wisdomSection}>
        <Text style={styles.wisdomTitle}>📖 Words of Wisdom</Text>
        <View style={styles.wisdomCard}>
          <Text style={styles.wisdomQuote}>
            "The stock market is a device for transferring money from the impatient to the patient."
          </Text>
          <Text style={styles.wisdomAuthor}>— Warren Buffett</Text>
        </View>
      </View>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

import { useRouter } from 'expo-router';

export default function InsightsScreen() {
  const router = useRouter();
  const { colors, isDark } = useDesignTheme();
  const styles = createStyles(colors, isDark);
  const [activeTab, setActiveTab] = useState<TabId>('growth');

  const handleReturnToFinLearn = () => {
    // Navigate back to the home screen
    router.replace('/');
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
        <Text style={styles.headerTitle}>Your Insights</Text>
        <Text style={styles.headerSubtitle}>
          See how your simulation went
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
            title="Return to FinLearn"
            variant="primary"
            size="large"
            fullWidth
            onPress={handleReturnToFinLearn}
            style={styles.ctaButton}
          />
          <Text style={styles.ctaHint}>
            Continue your learning journey 🚀
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
