/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MARKET LAB - INSIGHTS SCREEN
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Educational insights comparing trading vs investing,
 * showing behavior patterns and learning progress.
 * 
 * GREEN-WHITE THEME - Clean, minimalistic, accessible for rural users
 */

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
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import Svg, { Circle, G, Line, Path, Text as SvgText } from 'react-native-svg';

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
  purple: '#8B5CF6',
  purpleLight: '#EDE9FE',
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function InsightsScreen() {
  const router = useRouter();
  const { t } = useStockLanguage();

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
          <Text style={styles.headerTitle}>{t('insights.title')}</Text>
          <Text style={styles.headerSubtitle}>{t('insights.subtitle')}</Text>
        </View>
        <View style={styles.headerRightPlaceholder} />
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Learning Progress */}
        <Animated.View
          entering={FadeInUp.delay(100).duration(500)}
          style={styles.progressCard}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📊</Text>
            <Text style={styles.sectionTitle}>{t('insights.progress')}</Text>
          </View>

          <View style={styles.progressItems}>
            <ProgressItem label={t('insights.progressItems.basics')} progress={100} completed />
            <ProgressItem label={t('insights.progressItems.charts')} progress={100} completed />
            <ProgressItem label={t('insights.progressItems.vsi')} progress={100} completed />
            <ProgressItem label={t('insights.progressItems.practice')} progress={60} />
          </View>
        </Animated.View>

        {/* Key Insight */}
        <Animated.View
          entering={FadeInUp.delay(200).duration(500)}
          style={styles.keyInsightCard}
        >
          <Text style={styles.keyInsightIcon}>⚖️</Text>
          <Text style={styles.keyInsightTitle}>{t('insights.keyInsight.title')}</Text>
          <Text style={styles.keyInsightMessage}>{t('insights.keyInsight.message')}</Text>
        </Animated.View>

        {/* Trading vs Investing Chart */}
        <Animated.View
          entering={FadeInUp.delay(300).duration(500)}
          style={styles.chartCard}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📈</Text>
            <View>
              <Text style={styles.sectionTitle}>{t('insights.riskReward')}</Text>
              <Text style={styles.sectionSubtitle}>{t('insights.riskRewardSub')}</Text>
            </View>
          </View>

          <View style={styles.comparisonChart}>
            <Svg width={SCREEN_WIDTH - 80} height={200} viewBox="0 0 280 200">
              {/* Grid */}
              <Line x1="60" y1="160" x2="260" y2="160" stroke={COLORS.green[200]} strokeWidth="1" />
              <Line x1="60" y1="20" x2="60" y2="160" stroke={COLORS.green[200]} strokeWidth="1" />

              {/* Y-axis label */}
              <G transform="translate(20, 90) rotate(-90)">
                <SvgText fill={COLORS.textLight} fontSize="11" textAnchor="middle">{t('insights.yAxisLabel')}</SvgText>
              </G>

              {/* X-axis label */}
              <SvgText x="160" y="185" fill={COLORS.textLight} fontSize="11" textAnchor="middle">{t('insights.xAxisLabel')}</SvgText>

              {/* Y-axis values */}
              <SvgText x="55" y="30" fill={COLORS.textLight} fontSize="10" textAnchor="end">{t('insights.long')}</SvgText>
              <SvgText x="55" y="90" fill={COLORS.textLight} fontSize="10" textAnchor="end">{t('insights.medium')}</SvgText>
              <SvgText x="55" y="155" fill={COLORS.textLight} fontSize="10" textAnchor="end">{t('insights.short')}</SvgText>

              {/* X-axis values */}
              <SvgText x="90" y="175" fill={COLORS.textLight} fontSize="10" textAnchor="middle">{t('insights.short')}</SvgText>
              <SvgText x="160" y="175" fill={COLORS.textLight} fontSize="10" textAnchor="middle">{t('insights.medium')}</SvgText>
              <SvgText x="230" y="175" fill={COLORS.textLight} fontSize="10" textAnchor="middle">{t('insights.long')}</SvgText>

              {/* Stock Trading - volatile line */}
              <Path
                d="M80 60 L100 40 L120 80 L140 30 L160 70 L180 50 L200 90 L220 45"
                fill="none"
                stroke={COLORS.warning}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Mutual Fund Investing - steady upward line */}
              <Path
                d="M80 130 L120 120 L160 105 L200 85 L240 60"
                fill="none"
                stroke={COLORS.green[500]}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Legend */}
              <Circle cx="80" cy="195" r="5" fill={COLORS.warning} />
              <SvgText x="90" y="198" fill={COLORS.text} fontSize="10">{t('insights.trading')}</SvgText>
              <Circle cx="170" cy="195" r="5" fill={COLORS.green[500]} />
              <SvgText x="180" y="198" fill={COLORS.text} fontSize="10">{t('insights.mfInvesting')}</SvgText>
            </Svg>
          </View>

          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: COLORS.warning }]} />
              <Text style={styles.legendText}>{t('insights.legendTrading')}</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: COLORS.green[500] }]} />
              <Text style={styles.legendText}>{t('insights.legendInvesting')}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Common Mistakes */}
        <Animated.View
          entering={FadeInUp.delay(400).duration(500)}
          style={styles.mistakesCard}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>⚠️</Text>
            <Text style={styles.sectionTitle}>{t('insights.mistakesTitle')}</Text>
          </View>

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
        </Animated.View>

        {/* Recommendation */}
        <Animated.View
          entering={FadeInUp.delay(500).duration(500)}
          style={styles.recommendationCard}
        >
          <View style={styles.recommendationHeader}>
            <Text style={styles.recommendationIcon}>🎓</Text>
            <Text style={styles.recommendationTitle}>{t('insights.recTitle')}</Text>
          </View>
          <Text style={styles.recommendationText}>
            {t('insights.recText')}
          </Text>
          <TouchableOpacity
            style={styles.recommendationButton}
            onPress={() => {
              // Navigate to MF_SIP module
              console.log('Navigate to Wealth Builder Lab');
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.recommendationButtonText}>{t('insights.exploreRec')}</Text>
            <Text style={styles.recommendationButtonArrow}>→</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Key Takeaways */}
        <Animated.View
          entering={FadeInUp.delay(600).duration(500)}
          style={styles.takeawaysSection}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>💡</Text>
            <Text style={styles.sectionTitle}>{t('insights.takeawaysTitle')}</Text>
          </View>

          {(t('insights.takeaways') as unknown as any[]).map((tk, i) => (
            <TakeawayItem
              key={i}
              icon={['📈', '⏰', '🎯', '📚'][i]}
              title={tk.title}
              description={tk.desc}
            />
          ))}
        </Animated.View>
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
      <Text style={[styles.progressPercent, completed && styles.progressCompleted]}>
        {completed ? '✓ Done' : `${progress}%`}
      </Text>
    </View>
    <View style={styles.progressTrack}>
      <View
        style={[
          styles.progressBar,
          {
            width: `${progress}%`,
            backgroundColor: completed ? COLORS.green[500] : COLORS.green[400],
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
    <View style={styles.takeawayIconContainer}>
      <Text style={styles.takeawayIcon}>{icon}</Text>
    </View>
    <View style={styles.takeawayContent}>
      <Text style={styles.takeawayTitle}>{title}</Text>
      <Text style={styles.takeawayDescription}>{description}</Text>
    </View>
  </View>
);

// ═══════════════════════════════════════════════════════════════════════════
// STYLES - Green-White Theme
// ═══════════════════════════════════════════════════════════════════════════

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
  },
  headerSubtitle: {
    color: COLORS.textLight,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  headerRightPlaceholder: {
    width: 44,
  },

  // Scroll
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 16,
  },

  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  sectionSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textLight,
    marginTop: 2,
  },

  // Progress Card
  progressCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    marginTop: 12,
    borderWidth: 2,
    borderColor: COLORS.green[200],
    shadowColor: COLORS.green[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  progressItems: {
    gap: 16,
  },
  progressItem: {},
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  progressPercent: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.green[600],
  },
  progressCompleted: {
    color: COLORS.green[700],
  },
  progressTrack: {
    height: 10,
    backgroundColor: COLORS.green[100],
    borderRadius: 5,
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },

  // Key Insight Card
  keyInsightCard: {
    backgroundColor: COLORS.purpleLight,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.purple,
  },
  keyInsightIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  keyInsightTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.purple,
    textAlign: 'center',
    marginBottom: 8,
  },
  keyInsightMessage: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 20,
  },

  // Chart Card
  chartCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.green[200],
  },
  comparisonChart: {
    alignItems: 'center',
    marginVertical: 12,
    backgroundColor: COLORS.green[50],
    borderRadius: 12,
    padding: 10,
  },
  chartLegend: {
    gap: 10,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  legendText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },

  // Mistakes Card
  mistakesCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.green[200],
  },
  mistakesList: {
    gap: 16,
  },
  mistakeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  mistakeNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.dangerLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 2,
    borderColor: COLORS.danger,
  },
  mistakeNumberText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.danger,
  },
  mistakeContent: {
    flex: 1,
  },
  mistakeTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  mistakeDescription: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textLight,
    lineHeight: 18,
  },

  // Recommendation Card
  recommendationCard: {
    backgroundColor: COLORS.green[50],
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.green[300],
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recommendationIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.green[800],
  },
  recommendationText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  recommendationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.green[600],
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    gap: 8,
    shadowColor: COLORS.green[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  recommendationButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
  recommendationButtonArrow: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
  },

  // Takeaways
  takeawaysSection: {
    gap: 12,
  },
  takeawayItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.green[200],
  },
  takeawayIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.green[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 2,
    borderColor: COLORS.green[200],
  },
  takeawayIcon: {
    fontSize: 24,
  },
  takeawayContent: {
    flex: 1,
  },
  takeawayTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  takeawayDescription: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textLight,
    lineHeight: 18,
  },
});

