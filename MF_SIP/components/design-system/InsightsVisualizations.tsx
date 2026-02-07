/**
 * ═══════════════════════════════════════════════════════════════════════════
 * INSIGHTS VISUALIZATIONS - Wealth Builder Lab
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Visual components for the Insights & Comparison screen.
 * Includes: Growth chart, comparison charts, behavior indicators.
 */

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {
  DesignColors,
  DesignSpacing,
  DesignRadius,
  DesignTextStyles,
} from './index';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ═══════════════════════════════════════════════════════════════════════════
// GROWTH CHART COMPONENT
// Long-term portfolio growth visualization
interface GrowthChartProps {
  data: { year: number; value: number; month?: number }[];
  investedAmount: number;
  hideContainer?: boolean;
}

const formatValue = (val: number) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`;
  return `₹${val}`;
};

export const GrowthChart: React.FC<GrowthChartProps> = ({ data, investedAmount, hideContainer = false }) => {
  if (!data || data.length < 2) {
    return (
      <View style={[styles.growthChartContainer, hideContainer && styles.borderless, { height: 200, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: DesignColors.neutral[400] }}>Waiting for more data points...</Text>
      </View>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value), investedAmount, 1000);
  const chartHeight = 180;
  // Dynamic width calculation to prevent overflow on mobile
  const barWidth = Math.max(8, Math.min(24, (SCREEN_WIDTH - 120) / data.length));

  return (
    <View style={[styles.growthChartContainer, hideContainer && styles.borderless]}>
      {/* Y-axis labels - Fixed width for consistent alignment */}
      <View style={styles.yAxisLabels}>
        <Text style={styles.axisLabel} numberOfLines={1}>{formatValue(maxValue)}</Text>
        <Text style={styles.axisLabel} numberOfLines={1}>{formatValue(maxValue / 2)}</Text>
        <Text style={styles.axisLabel} numberOfLines={1}>₹0</Text>
      </View>

      {/* Chart Area - Aligned to match the 56px content axis (16px card pad + 40px margin) */}
      <View style={styles.chartArea}>
        {/* Horizontal Grid Lines */}
        <View style={[styles.gridLine, { bottom: chartHeight }]} />
        <View style={[styles.gridLine, { bottom: chartHeight / 2 }]} />
        <View style={[styles.gridLine, { bottom: 0 }]} />

        {/* Invested line indicator */}
        <View
          style={[
            styles.investedLine,
            {
              bottom: Math.min(chartHeight, (investedAmount / maxValue) * chartHeight),
            },
          ]}
        >
          <View style={styles.investedLineLabelContainer}>
            <Text style={styles.investedLineLabel}>Total Invested</Text>
          </View>
        </View>

        {/* Bars */}
        <View style={styles.barsContainer}>
          {data.map((item, index) => {
            const barHeight = Math.max(2, (item.value / maxValue) * chartHeight);

            // Heuristic for profit: Value vs a linear growth of invested amount
            // This is better than one total number for the whole duration
            const expectedInvestmentAtThisPoint = investedAmount * (index / (data.length - 1));
            const isProfit = item.value >= expectedInvestmentAtThisPoint;

            // Only show year labels at the start of each year or first/last points
            const showLabel = index === 0 ||
              item.month === 0 ||
              index === data.length - 1;

            let label = '';
            if (showLabel) {
              if (index === 0) label = 'Start';
              else if (item.year > 0 && item.month === 0) label = `Y${item.year}`;
              else if (index === data.length - 1 && item.month !== 0) label = `End`;
              else if (item.year === 0) label = `M${item.month}`;
            }

            return (
              <View key={`${item.year}-${item.month || index}`} style={styles.barWrapper}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: barHeight,
                      width: barWidth,
                      backgroundColor: isProfit
                        ? DesignColors.secondary[400]
                        : DesignColors.primary[400],
                    },
                  ]}
                >
                  <View style={[styles.barGradient, { backgroundColor: 'rgba(255,255,255,0.2)' }]} />
                </View>
                <Text style={styles.barLabel}>{label}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: DesignColors.primary[400] }]} />
          <Text style={styles.legendText}>Principal</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: DesignColors.secondary[400] }]} />
          <Text style={styles.legendText}>Growth</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendLine]} />
          <Text style={styles.legendText}>End Target</Text>
        </View>
      </View>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SIP VS LUMPSUM COMPARISON
// ═══════════════════════════════════════════════════════════════════════════

interface ComparisonData {
  sipValue: number;
  lumpsumValue: number;
  investedAmount: number;
}

export const SIPvsLumpsumChart: React.FC<ComparisonData> = ({
  sipValue,
  lumpsumValue,
  investedAmount,
}) => {
  const maxValue = Math.max(sipValue, lumpsumValue);
  const sipHeight = (sipValue / maxValue) * 140;
  const lumpsumHeight = (lumpsumValue / maxValue) * 140;

  const formatValue = (val: number) => {
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(1)}L`;
    }
    return `₹${(val / 1000).toFixed(0)}K`;
  };

  return (
    <View style={styles.comparisonContainer}>
      <View style={styles.comparisonBars}>
        {/* SIP Bar */}
        <View style={styles.comparisonBarWrapper}>
          <View style={styles.valueLabel}>
            <Text style={styles.valueLabelText}>{formatValue(sipValue)}</Text>
          </View>
          <View style={[styles.comparisonBar, { height: sipHeight }]}>
            <View style={[styles.comparisonBarInner, styles.sipBar]} />
          </View>
          <View style={styles.comparisonLabelContainer}>
            <Text style={styles.comparisonEmoji}>📊</Text>
            <Text style={styles.comparisonLabel}>SIP</Text>
            <Text style={styles.comparisonSublabel}>Monthly</Text>
          </View>
        </View>

        {/* VS Indicator */}
        <View style={styles.vsContainer}>
          <Text style={styles.vsText}>vs</Text>
        </View>

        {/* Lumpsum Bar */}
        <View style={styles.comparisonBarWrapper}>
          <View style={styles.valueLabel}>
            <Text style={styles.valueLabelText}>{formatValue(lumpsumValue)}</Text>
          </View>
          <View style={[styles.comparisonBar, { height: lumpsumHeight }]}>
            <View style={[styles.comparisonBarInner, styles.lumpsumBar]} />
          </View>
          <View style={styles.comparisonLabelContainer}>
            <Text style={styles.comparisonEmoji}>💰</Text>
            <Text style={styles.comparisonLabel}>One-time</Text>
            <Text style={styles.comparisonSublabel}>Lump sum</Text>
          </View>
        </View>
      </View>

      {/* Insight */}
      <View style={styles.insightBox}>
        <Text style={styles.insightEmoji}>💡</Text>
        <Text style={styles.insightText}>
          SIP spreads risk over time. You buy more units when prices are low!
        </Text>
      </View>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// EARLY VS LATE START COMPARISON
// ═══════════════════════════════════════════════════════════════════════════

interface TimeComparisonData {
  earlyStartValue: number;
  lateStartValue: number;
  earlyYears: number;
  lateYears: number;
}

export const EarlyVsLateChart: React.FC<TimeComparisonData> = ({
  earlyStartValue,
  lateStartValue,
  earlyYears,
  lateYears,
}) => {
  const maxValue = Math.max(earlyStartValue, lateStartValue);
  const difference = earlyStartValue - lateStartValue;

  const formatValue = (val: number) => {
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(1)}L`;
    }
    return `₹${(val / 1000).toFixed(0)}K`;
  };

  return (
    <View style={styles.timeComparisonContainer}>
      {/* Visual Timeline */}
      <View style={styles.timelineContainer}>
        {/* Early Starter */}
        <View style={styles.timelineRow}>
          <View style={styles.timelineAvatar}>
            <Text style={styles.timelineEmoji}>🌱</Text>
          </View>
          <View style={styles.timelineContent}>
            <Text style={styles.timelineTitle}>Started at 25</Text>
            <View style={styles.timelineBar}>
              <View
                style={[
                  styles.timelineProgress,
                  { width: '100%', backgroundColor: DesignColors.secondary[400] },
                ]}
              />
            </View>
            <Text style={styles.timelineValue}>{formatValue(earlyStartValue)}</Text>
          </View>
        </View>

        {/* Compounding Arrow */}
        <View style={styles.compoundingIndicator}>
          <Text style={styles.compoundingText}>
            ↓ {earlyYears - lateYears} extra years of compounding
          </Text>
        </View>

        {/* Late Starter */}
        <View style={styles.timelineRow}>
          <View style={styles.timelineAvatar}>
            <Text style={styles.timelineEmoji}>🌿</Text>
          </View>
          <View style={styles.timelineContent}>
            <Text style={styles.timelineTitle}>Started at 35</Text>
            <View style={styles.timelineBar}>
              <View
                style={[
                  styles.timelineProgress,
                  {
                    width: `${(lateStartValue / maxValue) * 100}%`,
                    backgroundColor: DesignColors.primary[400],
                  },
                ]}
              />
            </View>
            <Text style={styles.timelineValue}>{formatValue(lateStartValue)}</Text>
          </View>
        </View>
      </View>

      {/* Difference Highlight */}
      <View style={styles.differenceBox}>
        <Text style={styles.differenceLabel}>Starting early gave</Text>
        <Text style={styles.differenceValue}>+{formatValue(difference)}</Text>
        <Text style={styles.differenceSubtext}>extra wealth</Text>
      </View>

      {/* Key Insight */}
      <View style={[styles.insightBox, { backgroundColor: DesignColors.accent.cream }]}>
        <Text style={styles.insightEmoji}>⏰</Text>
        <Text style={styles.insightText}>
          Time is your biggest advantage. The earlier you start, the more your money works for you.
        </Text>
      </View>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// BEHAVIOR FEEDBACK COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface BehaviorMetric {
  id: string;
  icon: string;
  title: string;
  value: string;
  feedback: string;
  isPositive: boolean;
}

interface BehaviorFeedbackProps {
  metrics: BehaviorMetric[];
  overallScore: number;
}

export const BehaviorFeedback: React.FC<BehaviorFeedbackProps> = ({
  metrics,
  overallScore,
}) => {
  const getScoreEmoji = (score: number) => {
    if (score >= 80) return '🌟';
    if (score >= 60) return '👍';
    if (score >= 40) return '💪';
    return '🌱';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return "Excellent! You're building great habits.";
    if (score >= 60) return "Good progress! Keep it up.";
    if (score >= 40) return "You're learning! Every step counts.";
    return "You're just getting started. The journey begins here!";
  };

  return (
    <View style={styles.behaviorContainer}>
      {/* Overall Score */}
      <View style={styles.scoreContainer}>
        <View style={styles.scoreCircle}>
          <Text style={styles.scoreEmoji}>{getScoreEmoji(overallScore)}</Text>
          <Text style={styles.scoreValue}>{overallScore}</Text>
          <Text style={styles.scoreLabel}>points</Text>
        </View>
        <Text style={styles.scoreMessage}>{getScoreMessage(overallScore)}</Text>
      </View>

      {/* Individual Metrics */}
      <View style={styles.metricsContainer}>
        {metrics.map((metric) => (
          <View key={metric.id} style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricIcon}>{metric.icon}</Text>
              <View style={styles.metricTitleContainer}>
                <Text style={styles.metricTitle}>{metric.title}</Text>
                <Text style={styles.metricValue}>{metric.value}</Text>
              </View>
              <View
                style={[
                  styles.metricIndicator,
                  {
                    backgroundColor: metric.isPositive
                      ? DesignColors.secondary[100]
                      : DesignColors.accent.peach,
                  },
                ]}
              >
                <Text style={styles.metricIndicatorText}>
                  {metric.isPositive ? '✓' : '→'}
                </Text>
              </View>
            </View>
            <Text style={styles.metricFeedback}>{metric.feedback}</Text>
          </View>
        ))}
      </View>

      {/* Encouragement */}
      <View style={styles.encouragementBox}>
        <Text style={styles.encouragementEmoji}>🎯</Text>
        <Text style={styles.encouragementText}>
          Remember: Successful investing isn't about being perfect. It's about staying consistent and learning along the way.
        </Text>
      </View>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════

const styles = StyleSheet.create({
  // ─────────────────────────────────────────────────────────────────────────
  // GROWTH CHART
  // ─────────────────────────────────────────────────────────────────────────
  growthChartContainer: {
    backgroundColor: DesignColors.neutral[0],
    borderRadius: DesignRadius.card,
    padding: DesignSpacing.lg,
    borderWidth: 1,
    borderColor: DesignColors.neutral[200],
  },
  yAxisLabels: {
    position: 'absolute',
    left: 0,
    top: DesignSpacing.lg,
    bottom: 60,
    justifyContent: 'space-between',
    width: 38,
  },
  borderless: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  axisLabel: {
    fontSize: 10,
    color: DesignColors.neutral[400],
    textAlign: 'right',
    paddingRight: 4,
  },
  chartArea: {
    marginLeft: 40,
    height: 200,
    position: 'relative',
  },
  investedLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: DesignColors.neutral[300],
    borderStyle: 'dashed',
  },
  investedLineLabel: {
    position: 'absolute',
    right: 0,
    top: -16,
    fontSize: 10,
    color: DesignColors.neutral[500],
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 180,
    paddingTop: 20,
  },
  barWrapper: {
    alignItems: 'center',
  },
  bar: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  barGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: '50%',
    bottom: 0,
  },
  barLabel: {
    marginTop: 4,
    fontSize: 10,
    color: DesignColors.neutral[500],
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: DesignColors.neutral[100],
  },
  investedLineLabelContainer: {
    backgroundColor: DesignColors.neutral[800],
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    position: 'absolute',
    right: 0,
    top: -20,
  },
  legendLine: {
    width: 20,
    height: 2,
    backgroundColor: DesignColors.neutral[400],
    marginRight: 8,
    borderStyle: 'dashed',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: DesignSpacing.lg,
    marginTop: DesignSpacing.md,
    paddingTop: DesignSpacing.md,
    borderTopWidth: 1,
    borderTopColor: DesignColors.neutral[100],
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: DesignSpacing.xs,
  },
  legendText: {
    fontSize: 12,
    color: DesignColors.neutral[600],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // COMPARISON CHARTS
  // ─────────────────────────────────────────────────────────────────────────
  comparisonContainer: {
    backgroundColor: DesignColors.neutral[0],
    borderRadius: DesignRadius.card,
    padding: DesignSpacing.lg,
    borderWidth: 1,
    borderColor: DesignColors.neutral[200],
  },
  comparisonBars: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    minHeight: 200,
    marginBottom: DesignSpacing.lg,
  },
  comparisonBarWrapper: {
    alignItems: 'center',
    width: 100,
  },
  valueLabel: {
    marginBottom: DesignSpacing.sm,
  },
  valueLabelText: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[700],
    fontWeight: '700',
  },
  comparisonBar: {
    width: 60,
    borderRadius: DesignRadius.md,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  comparisonBarInner: {
    flex: 1,
    borderRadius: DesignRadius.md,
  },
  sipBar: {
    backgroundColor: DesignColors.secondary[400],
  },
  lumpsumBar: {
    backgroundColor: DesignColors.primary[400],
  },
  comparisonLabelContainer: {
    alignItems: 'center',
    marginTop: DesignSpacing.md,
  },
  comparisonEmoji: {
    fontSize: 24,
    marginBottom: DesignSpacing.xs,
  },
  comparisonLabel: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[700],
  },
  comparisonSublabel: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
  },
  vsContainer: {
    marginHorizontal: DesignSpacing.lg,
    paddingBottom: 60,
  },
  vsText: {
    ...DesignTextStyles.labelSmall,
    color: DesignColors.neutral[400],
  },
  insightBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: DesignColors.secondary[50],
    padding: DesignSpacing.md,
    borderRadius: DesignRadius.md,
  },
  insightEmoji: {
    fontSize: 20,
    marginRight: DesignSpacing.sm,
  },
  insightText: {
    flex: 1,
    ...DesignTextStyles.bodyMedium,
    color: DesignColors.neutral[700],
    lineHeight: 22,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // TIME COMPARISON
  // ─────────────────────────────────────────────────────────────────────────
  timeComparisonContainer: {
    backgroundColor: DesignColors.neutral[0],
    borderRadius: DesignRadius.card,
    padding: DesignSpacing.lg,
    borderWidth: 1,
    borderColor: DesignColors.neutral[200],
  },
  timelineContainer: {
    marginBottom: DesignSpacing.lg,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: DesignSpacing.sm,
  },
  timelineAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: DesignColors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: DesignSpacing.md,
  },
  timelineEmoji: {
    fontSize: 20,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[700],
    marginBottom: DesignSpacing.xs,
  },
  timelineBar: {
    height: 12,
    backgroundColor: DesignColors.neutral[100],
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: DesignSpacing.xs,
  },
  timelineProgress: {
    height: '100%',
    borderRadius: 6,
  },
  timelineValue: {
    ...DesignTextStyles.labelSmall,
    color: DesignColors.neutral[600],
  },
  compoundingIndicator: {
    alignItems: 'center',
    paddingVertical: DesignSpacing.sm,
    marginLeft: 60,
  },
  compoundingText: {
    ...DesignTextStyles.caption,
    color: DesignColors.primary[600],
    fontWeight: '600',
  },
  differenceBox: {
    alignItems: 'center',
    backgroundColor: DesignColors.secondary[50],
    padding: DesignSpacing.lg,
    borderRadius: DesignRadius.md,
    marginBottom: DesignSpacing.lg,
  },
  differenceLabel: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[600],
  },
  differenceValue: {
    fontSize: 28,
    fontWeight: '700',
    color: DesignColors.secondary[600],
    marginVertical: DesignSpacing.xs,
  },
  differenceSubtext: {
    ...DesignTextStyles.labelSmall,
    color: DesignColors.secondary[700],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BEHAVIOR FEEDBACK
  // ─────────────────────────────────────────────────────────────────────────
  behaviorContainer: {},
  scoreContainer: {
    alignItems: 'center',
    marginBottom: DesignSpacing.xl,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: DesignColors.primary[50],
    borderWidth: 4,
    borderColor: DesignColors.primary[200],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: DesignSpacing.md,
  },
  scoreEmoji: {
    fontSize: 24,
    position: 'absolute',
    top: -8,
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: '700',
    color: DesignColors.primary[600],
  },
  scoreLabel: {
    ...DesignTextStyles.caption,
    color: DesignColors.primary[500],
  },
  scoreMessage: {
    ...DesignTextStyles.titleMedium,
    color: DesignColors.neutral[700],
    textAlign: 'center',
  },
  metricsContainer: {
    gap: DesignSpacing.md,
    marginBottom: DesignSpacing.xl,
  },
  metricCard: {
    backgroundColor: DesignColors.neutral[0],
    borderRadius: DesignRadius.card,
    padding: DesignSpacing.lg,
    borderWidth: 1,
    borderColor: DesignColors.neutral[200],
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DesignSpacing.sm,
  },
  metricIcon: {
    fontSize: 24,
    marginRight: DesignSpacing.md,
  },
  metricTitleContainer: {
    flex: 1,
  },
  metricTitle: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[700],
  },
  metricValue: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
  },
  metricIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricIndicatorText: {
    fontSize: 14,
    fontWeight: '600',
    color: DesignColors.secondary[600],
  },
  metricFeedback: {
    ...DesignTextStyles.bodyMedium,
    color: DesignColors.neutral[600],
    lineHeight: 22,
  },
  encouragementBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: DesignColors.accent.lavender,
    padding: DesignSpacing.lg,
    borderRadius: DesignRadius.card,
  },
  encouragementEmoji: {
    fontSize: 24,
    marginRight: DesignSpacing.md,
  },
  encouragementText: {
    flex: 1,
    ...DesignTextStyles.bodyMedium,
    color: DesignColors.neutral[700],
    lineHeight: 24,
  },
});
