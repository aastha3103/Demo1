/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MARKET LAB - INSIGHTS SCREEN
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Educational insights comparing trading vs investing,
 * showing behavior patterns and learning progress.
 * 
 * DARK MODE ONLY - Calm, focused, analytical appearance
 */

import {
  DesignColors,
  DesignRadius,
  DesignSpacing,
  DesignTextStyles,
  MLButton,
  MLCard,
  MLHeader,
  MLInfoBox,
} from '@/components/design-system';
import { useStockLanguage } from '@/context/StockLanguageContext';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, { Circle, G, Line, Path, Text as SvgText } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function InsightsScreen() {
  const router = useRouter();
  const { t } = useStockLanguage();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={DesignColors.neutral[50]} />

      {/* Header */}
      <MLHeader
        title={t('insights.title')}
        subtitle={t('insights.subtitle')}
        variant="default"
        leftIcon="←"
        onLeftAction={() => router.back()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Learning Progress */}
        <MLCard variant="glass" style={styles.progressCard}>
          <Text style={styles.sectionTitle}>{t('insights.progress')}</Text>

          <View style={styles.progressItems}>
            <ProgressItem label={t('insights.progressItems.basics')} progress={100} completed />
            <ProgressItem label={t('insights.progressItems.charts')} progress={100} completed />
            <ProgressItem label={t('insights.progressItems.vsi')} progress={100} completed />
            <ProgressItem label={t('insights.progressItems.practice')} progress={60} />
          </View>
        </MLCard>

        {/* Key Insight */}
        <MLInfoBox
          variant="compare"
          icon="⚖️"
          title={t('insights.keyInsight.title')}
          message={t('insights.keyInsight.message')}
        />

        {/* Trading vs Investing Chart */}
        <MLCard variant="outlined">
          <Text style={styles.sectionTitle}>{t('insights.riskReward')}</Text>
          <Text style={styles.sectionSubtitle}>{t('insights.riskRewardSub')}</Text>

          <View style={styles.comparisonChart}>
            <Svg width={SCREEN_WIDTH - 80} height={200} viewBox="0 0 280 200">
              {/* Grid */}
              <Line x1="60" y1="160" x2="260" y2="160" stroke={DesignColors.neutral[300]} strokeWidth="1" />
              <Line x1="60" y1="20" x2="60" y2="160" stroke={DesignColors.neutral[300]} strokeWidth="1" />

              {/* Y-axis label */}
              <G transform="translate(20, 90) rotate(-90)">
                <SvgText fill={DesignColors.neutral[500]} fontSize="11" textAnchor="middle">{t('insights.yAxisLabel')}</SvgText>
              </G>

              {/* X-axis label */}
              <SvgText x="160" y="185" fill={DesignColors.neutral[500]} fontSize="11" textAnchor="middle">{t('insights.xAxisLabel')}</SvgText>

              {/* Y-axis values */}
              <SvgText x="55" y="30" fill={DesignColors.neutral[500]} fontSize="10" textAnchor="end">{t('insights.long')}</SvgText>
              <SvgText x="55" y="90" fill={DesignColors.neutral[500]} fontSize="10" textAnchor="end">{t('insights.medium')}</SvgText>
              <SvgText x="55" y="155" fill={DesignColors.neutral[500]} fontSize="10" textAnchor="end">{t('insights.short')}</SvgText>

              {/* X-axis values */}
              <SvgText x="90" y="175" fill={DesignColors.neutral[500]} fontSize="10" textAnchor="middle">{t('insights.short')}</SvgText>
              <SvgText x="160" y="175" fill={DesignColors.neutral[500]} fontSize="10" textAnchor="middle">{t('insights.medium')}</SvgText>
              <SvgText x="230" y="175" fill={DesignColors.neutral[500]} fontSize="10" textAnchor="middle">{t('insights.long')}</SvgText>

              {/* Stock Trading - volatile line */}
              <Path
                d="M80 60 L100 40 L120 80 L140 30 L160 70 L180 50 L200 90 L220 45"
                fill="none"
                stroke={DesignColors.semantic.warning.main}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Mutual Fund Investing - steady upward line */}
              <Path
                d="M80 130 L120 120 L160 105 L200 85 L240 60"
                fill="none"
                stroke={DesignColors.secondary[400]}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Legend */}
              <Circle cx="80" cy="195" r="5" fill={DesignColors.semantic.warning.main} />
              <SvgText x="90" y="198" fill={DesignColors.neutral[600]} fontSize="10">{t('insights.trading')}</SvgText>
              <Circle cx="170" cy="195" r="5" fill={DesignColors.secondary[400]} />
              <SvgText x="180" y="198" fill={DesignColors.neutral[600]} fontSize="10">{t('insights.mfInvesting')}</SvgText>
            </Svg>
          </View>

          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: DesignColors.semantic.warning.main }]} />
              <Text style={styles.legendText}>{t('insights.legendTrading')}</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: DesignColors.secondary[400] }]} />
              <Text style={styles.legendText}>{t('insights.legendInvesting')}</Text>
            </View>
          </View>
        </MLCard>

        {/* Common Mistakes */}
        <MLCard variant="outlined">
          <Text style={styles.sectionTitle}>{t('insights.mistakesTitle')}</Text>

          <View style={styles.mistakesList}>
            {(t('insights.mistakes') as unknown as any[]).map((mistake, i) => (
              <MistakeItem
                key={i}
                number={i + 1}
                title={mistake.title}
                description={mistake.desc}
              />
            ))}
          </View>
        </MLCard>

        {/* Recommendation */}
        <MLCard variant="learning" style={styles.recommendationCard}>
          <View style={styles.recommendationHeader}>
            <Text style={styles.recommendationIcon}>🎓</Text>
            <Text style={styles.recommendationTitle}>{t('insights.recTitle')}</Text>
          </View>
          <Text style={styles.recommendationText}>
            {t('insights.recText')}
          </Text>
          <MLButton
            title={t('insights.exploreRec')}
            variant="primary"
            size="medium"
            fullWidth
            onPress={() => {
              // Navigate to MF_SIP module
              console.log('Navigate to Wealth Builder Lab');
            }}
            style={styles.recommendationButton}
          />
        </MLCard>

        {/* Key Takeaways */}
        <View style={styles.takeawaysSection}>
          <Text style={styles.sectionTitle}>{t('insights.takeawaysTitle')}</Text>

          {(t('insights.takeaways') as unknown as any[]).map((tk, i) => (
            <TakeawayItem
              key={i}
              icon={['📈', '⏰', '🎯', '📚'][i]}
              title={tk.title}
              description={tk.desc}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Progress Item Component
const ProgressItem: React.FC<{
  label: string;
  progress: number;
  completed?: boolean;
}> = ({ label, progress, completed = false }) => (
  <View style={styles.progressItem}>
    <View style={styles.progressLabelRow}>
      <Text style={styles.progressLabel}>{label}</Text>
      <Text style={styles.progressPercent}>
        {completed ? '✓' : `${progress}%`}
      </Text>
    </View>
    <View style={styles.progressTrack}>
      <View
        style={[
          styles.progressBar,
          {
            width: `${progress}%`,
            backgroundColor: completed ? DesignColors.secondary[400] : DesignColors.primary[500],
          }
        ]}
      />
    </View>
  </View>
);

// Mistake Item Component
const MistakeItem: React.FC<{
  number: number;
  title: string;
  description: string;
}> = ({ number, title, description }) => (
  <View style={styles.mistakeItem}>
    <View style={styles.mistakeNumber}>
      <Text style={styles.mistakeNumberText}>{number}</Text>
    </View>
    <View style={styles.mistakeContent}>
      <Text style={styles.mistakeTitle}>{title}</Text>
      <Text style={styles.mistakeDescription}>{description}</Text>
    </View>
  </View>
);

// Takeaway Item Component
const TakeawayItem: React.FC<{
  icon: string;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <View style={styles.takeawayItem}>
    <Text style={styles.takeawayIcon}>{icon}</Text>
    <View style={styles.takeawayContent}>
      <Text style={styles.takeawayTitle}>{title}</Text>
      <Text style={styles.takeawayDescription}>{description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DesignColors.neutral[50],
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: DesignSpacing.screenPadding,
    paddingBottom: DesignSpacing.huge,
    gap: DesignSpacing.lg,
  },

  // Progress Card
  progressCard: {
    marginTop: DesignSpacing.lg,
  },
  sectionTitle: {
    ...DesignTextStyles.titleMedium,
    color: DesignColors.neutral[900],
    marginBottom: DesignSpacing.md,
  },
  sectionSubtitle: {
    ...DesignTextStyles.bodySmall,
    color: DesignColors.neutral[500],
    marginBottom: DesignSpacing.lg,
    marginTop: -DesignSpacing.sm,
  },
  progressItems: {
    gap: DesignSpacing.md,
  },
  progressItem: {},
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: DesignSpacing.xs,
  },
  progressLabel: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[700],
  },
  progressPercent: {
    ...DesignTextStyles.labelSmall,
    color: DesignColors.secondary[500],
    fontWeight: '600',
  },
  progressTrack: {
    height: 6,
    backgroundColor: DesignColors.neutral[300],
    borderRadius: 3,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },

  // Chart
  comparisonChart: {
    alignItems: 'center',
    marginVertical: DesignSpacing.md,
  },
  chartLegend: {
    gap: DesignSpacing.sm,
    marginTop: DesignSpacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: DesignSpacing.sm,
  },
  legendText: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[600],
  },

  // Mistakes
  mistakesList: {
    gap: DesignSpacing.lg,
  },
  mistakeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  mistakeNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: DesignColors.semantic.negative.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: DesignSpacing.md,
  },
  mistakeNumberText: {
    ...DesignTextStyles.labelSmall,
    color: DesignColors.semantic.negative.main,
    fontWeight: '700',
  },
  mistakeContent: {
    flex: 1,
  },
  mistakeTitle: {
    ...DesignTextStyles.labelLarge,
    color: DesignColors.neutral[800],
    marginBottom: 2,
  },
  mistakeDescription: {
    ...DesignTextStyles.bodySmall,
    color: DesignColors.neutral[600],
  },

  // Recommendation
  recommendationCard: {},
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DesignSpacing.md,
  },
  recommendationIcon: {
    fontSize: 24,
    marginRight: DesignSpacing.sm,
  },
  recommendationTitle: {
    ...DesignTextStyles.titleMedium,
    color: DesignColors.accent.purple,
  },
  recommendationText: {
    ...DesignTextStyles.bodyMedium,
    color: DesignColors.neutral[700],
    lineHeight: 24,
    marginBottom: DesignSpacing.lg,
  },
  highlightText: {
    color: DesignColors.primary[500],
    fontWeight: '600',
  },
  recommendationButton: {
    marginTop: DesignSpacing.sm,
  },

  // Takeaways
  takeawaysSection: {
    gap: DesignSpacing.md,
  },
  takeawayItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.md,
    padding: DesignSpacing.lg,
  },
  takeawayIcon: {
    fontSize: 24,
    marginRight: DesignSpacing.md,
  },
  takeawayContent: {
    flex: 1,
  },
  takeawayTitle: {
    ...DesignTextStyles.labelLarge,
    color: DesignColors.neutral[800],
    marginBottom: 2,
  },
  takeawayDescription: {
    ...DesignTextStyles.bodySmall,
    color: DesignColors.neutral[600],
  },
});
