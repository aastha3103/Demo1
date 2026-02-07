/**
 * MARKET LAB - EDUCATIONAL CHART COMPONENT
 * Interactive chart with learning overlays
 */

import { useStockLanguage } from '@/context/StockLanguageContext';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Defs, G, Line, LinearGradient, Path, Rect, Stop, Text as SvgText } from 'react-native-svg';
import { DesignColors, DesignRadius, DesignSpacing, DesignTextStyles } from '../../constants/design-system';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 48;
const CHART_HEIGHT = 200;

export type ChartTimeframe = '1D' | '1W' | '1M' | '6M';

interface MLEducationalChartProps {
  stockSymbol: string;
  onTimeframeChange?: (tf: ChartTimeframe) => void;
}

// Sample price data for different timeframes
const generateChartData = (timeframe: ChartTimeframe) => {
  const patterns: Record<ChartTimeframe, number[]> = {
    '1D': [100, 102, 98, 103, 101, 105, 108, 106, 110, 107, 112, 115],
    '1W': [100, 95, 92, 98, 105, 102, 108, 115, 112, 118, 122, 120],
    '1M': [100, 105, 98, 92, 88, 95, 102, 108, 115, 125, 130, 128],
    '6M': [100, 90, 85, 95, 88, 92, 105, 115, 110, 125, 140, 135],
  };
  return patterns[timeframe];
};

export const MLEducationalChart: React.FC<MLEducationalChartProps> = ({ stockSymbol, onTimeframeChange }) => {
  const { t } = useStockLanguage();
  const [timeframe, setTimeframe] = useState<ChartTimeframe>('1M');
  const [learningMode, setLearningMode] = useState(true);
  const [activeLesson, setActiveLesson] = useState<number>(0);

  const data = generateChartData(timeframe);
  const minPrice = Math.min(...data) - 5;
  const maxPrice = Math.max(...data) + 5;
  const priceRange = maxPrice - minPrice;

  const handleTimeframeChange = (tf: ChartTimeframe) => {
    setTimeframe(tf);
    onTimeframeChange?.(tf);
  };

  // Calculate chart points
  const points = data.map((price, i) => {
    const x = 40 + (i / (data.length - 1)) * (CHART_WIDTH - 60);
    const y = CHART_HEIGHT - 30 - ((price - minPrice) / priceRange) * (CHART_HEIGHT - 60);
    return { x, y, price };
  });

  // Create path string
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${CHART_HEIGHT - 30} L ${points[0].x} ${CHART_HEIGHT - 30} Z`;

  // Identify trend segments
  const upTrendStart = 4;
  const upTrendEnd = 9;
  const downTrendStart = 0;
  const downTrendEnd = 4;
  const volatileStart = 6;
  const volatileEnd = 10;

  const lessonsData = t('charts.component.lessons') as any[];
  const lessons = [
    { ...lessonsData[0], color: DesignColors.secondary[400], start: upTrendStart, end: upTrendEnd },
    { ...lessonsData[1], color: DesignColors.semantic.negative.main, start: downTrendStart, end: downTrendEnd },
    { ...lessonsData[2], color: DesignColors.semantic.warning.main, start: volatileStart, end: volatileEnd },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.stockSymbol}>{stockSymbol}</Text>
          <Text style={styles.currentPrice}>₹{data[data.length - 1].toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={[styles.learningToggle, learningMode && styles.learningToggleActive]}
          onPress={() => setLearningMode(!learningMode)}
        >
          <Text style={styles.learningToggleText}>
            {learningMode ? t('charts.component.learningOn') : t('charts.component.learningOff')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Timeframe Selector */}
      <View style={styles.timeframeTabs}>
        {(['1D', '1W', '1M', '6M'] as ChartTimeframe[]).map(tf => (
          <TouchableOpacity
            key={tf}
            style={[styles.timeframeTab, timeframe === tf && styles.timeframeTabActive]}
            onPress={() => handleTimeframeChange(tf)}
          >
            <Text style={[styles.timeframeText, timeframe === tf && styles.timeframeTextActive]}>{tf}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Chart */}
      <View style={styles.chartContainer}>
        <Svg width={CHART_WIDTH} height={CHART_HEIGHT} viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}>
          <Defs>
            <LinearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={DesignColors.secondary[400]} stopOpacity="0.3" />
              <Stop offset="100%" stopColor={DesignColors.secondary[400]} stopOpacity="0" />
            </LinearGradient>
          </Defs>

          {/* Grid */}
          {[0, 1, 2, 3].map(i => (
            <Line key={i} x1="40" y1={30 + i * ((CHART_HEIGHT - 60) / 3)} x2={CHART_WIDTH - 20} y2={30 + i * ((CHART_HEIGHT - 60) / 3)}
              stroke={DesignColors.chart.grid} strokeWidth="1" strokeDasharray="4" />
          ))}

          {/* Y-axis labels */}
          <SvgText x="35" y="35" fill={DesignColors.neutral[500]} fontSize="10" textAnchor="end">
            ₹{maxPrice.toFixed(0)}
          </SvgText>
          <SvgText x="35" y={CHART_HEIGHT - 25} fill={DesignColors.neutral[500]} fontSize="10" textAnchor="end">
            ₹{minPrice.toFixed(0)}
          </SvgText>

          {/* Learning overlays - Highlight regions */}
          {learningMode && (
            <G>
              {/* Active lesson highlight */}
              <Rect
                x={points[lessons[activeLesson].start].x - 5}
                y="20"
                width={points[lessons[activeLesson].end].x - points[lessons[activeLesson].start].x + 10}
                height={CHART_HEIGHT - 40}
                fill={lessons[activeLesson].color}
                opacity="0.1"
                rx="4"
              />
            </G>
          )}

          {/* Area fill */}
          <Path d={areaD} fill="url(#areaGrad)" />

          {/* Main line */}
          <Path d={pathD} fill="none" stroke={DesignColors.secondary[400]} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Data points */}
          {points.map((p, i) => (
            <Circle key={i} cx={p.x} cy={p.y} r={i === points.length - 1 ? 6 : 3}
              fill={i === points.length - 1 ? DesignColors.secondary[400] : DesignColors.neutral[400]}
              stroke={i === points.length - 1 ? DesignColors.neutral[100] : 'none'} strokeWidth="2" />
          ))}

          {/* Learning annotations */}
          {learningMode && (
            <G>
              {/* Arrow annotation for active lesson */}
              <G>
                <Line
                  x1={points[lessons[activeLesson].start].x}
                  y1={points[lessons[activeLesson].start].y + 20}
                  x2={points[lessons[activeLesson].end].x}
                  y2={points[lessons[activeLesson].end].y + 20}
                  stroke={lessons[activeLesson].color}
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
                />
              </G>
            </G>
          )}

          {/* X-axis labels */}
          <SvgText x="50" y={CHART_HEIGHT - 5} fill={DesignColors.neutral[500]} fontSize="9" textAnchor="middle">{t('charts.component.start')}</SvgText>
          <SvgText x={CHART_WIDTH / 2} y={CHART_HEIGHT - 5} fill={DesignColors.neutral[500]} fontSize="9" textAnchor="middle">
            {timeframe === '1D' ? '12 PM' : timeframe === '1W' ? t('charts.component.labels.mid') : timeframe === '1M' ? t('charts.component.labels.m15') : t('charts.component.labels.m3')}
          </SvgText>
          <SvgText x={CHART_WIDTH - 30} y={CHART_HEIGHT - 5} fill={DesignColors.neutral[500]} fontSize="9" textAnchor="middle">{t('charts.component.now')}</SvgText>
        </Svg>
      </View>

      {/* Learning Lessons */}
      {learningMode && (
        <View style={styles.lessonsContainer}>
          {/* Lesson Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.lessonTabs}>
            {lessons.map((lesson, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.lessonTab, activeLesson === i && { borderColor: lesson.color, backgroundColor: `${lesson.color}15` }]}
                onPress={() => setActiveLesson(i)}
              >
                <View style={[styles.lessonDot, { backgroundColor: lesson.color }]} />
                <Text style={[styles.lessonTabText, activeLesson === i && { color: lesson.color }]}>{lesson.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Active Lesson Card */}
          <View style={[styles.lessonCard, { borderLeftColor: lessons[activeLesson].color }]}>
            <Text style={[styles.lessonTitle, { color: lessons[activeLesson].color }]}>{lessons[activeLesson].title}</Text>
            <Text style={styles.lessonDesc}>{lessons[activeLesson].desc}</Text>

            {/* Specific explanations */}
            {activeLesson === 0 && (
              <View style={styles.explanationBox}>
                <Text style={styles.explanationIcon}>📈</Text>
                <Text style={styles.explanationText}>
                  {t('charts.component.explanations.up')}
                </Text>
              </View>
            )}
            {activeLesson === 1 && (
              <View style={styles.explanationBox}>
                <Text style={styles.explanationIcon}>📉</Text>
                <Text style={styles.explanationText}>
                  {t('charts.component.explanations.down')}
                </Text>
              </View>
            )}
            {activeLesson === 2 && (
              <View style={styles.explanationBox}>
                <Text style={styles.explanationIcon}>⚡</Text>
                <Text style={styles.explanationText}>
                  {t('charts.component.explanations.volatile')}
                </Text>
              </View>
            )}
          </View>

          {/* Why Prices Move */}
          <View style={styles.whyCard}>
            <Text style={styles.whyTitle}>{t('charts.component.whyTitle')}</Text>
            <View style={styles.whyList}>
              {(t('charts.component.whyList') as string[]).map((item, i) => (
                <Text key={i} style={styles.whyItem}>• {item}</Text>
              ))}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: DesignColors.neutral[100], borderRadius: DesignRadius.card, padding: DesignSpacing.lg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: DesignSpacing.md },
  stockSymbol: { ...DesignTextStyles.labelMedium, color: DesignColors.neutral[500] },
  currentPrice: { ...DesignTextStyles.dataLarge, color: DesignColors.neutral[900], marginTop: 2 },
  learningToggle: {
    paddingHorizontal: DesignSpacing.md,
    paddingVertical: DesignSpacing.sm,
    borderRadius: DesignRadius.round,
    backgroundColor: DesignColors.neutral[200],
  },
  learningToggleActive: { backgroundColor: DesignColors.semantic.learning.light },
  learningToggleText: { ...DesignTextStyles.labelSmall, color: DesignColors.accent.purple },

  // Timeframe
  timeframeTabs: { flexDirection: 'row', backgroundColor: DesignColors.neutral[200], borderRadius: DesignRadius.sm, padding: 4, marginBottom: DesignSpacing.md },
  timeframeTab: { flex: 1, paddingVertical: DesignSpacing.sm, alignItems: 'center', borderRadius: DesignRadius.xs },
  timeframeTabActive: { backgroundColor: DesignColors.primary[500] },
  timeframeText: { ...DesignTextStyles.labelSmall, color: DesignColors.neutral[500] },
  timeframeTextActive: { color: DesignColors.neutral[0], fontWeight: '600' },

  // Chart
  chartContainer: { marginBottom: DesignSpacing.lg },

  // Lessons
  lessonsContainer: { gap: DesignSpacing.md },
  lessonTabs: { marginBottom: DesignSpacing.sm },
  lessonTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DesignSpacing.md,
    paddingVertical: DesignSpacing.sm,
    borderRadius: DesignRadius.round,
    backgroundColor: DesignColors.neutral[200],
    marginRight: DesignSpacing.sm,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  lessonDot: { width: 8, height: 8, borderRadius: 4, marginRight: DesignSpacing.xs },
  lessonTabText: { ...DesignTextStyles.labelSmall, color: DesignColors.neutral[600] },
  lessonCard: {
    backgroundColor: DesignColors.neutral[200],
    borderRadius: DesignRadius.md,
    padding: DesignSpacing.lg,
    borderLeftWidth: 4,
  },
  lessonTitle: { ...DesignTextStyles.titleSmall, marginBottom: DesignSpacing.xs },
  lessonDesc: { ...DesignTextStyles.bodyMedium, color: DesignColors.neutral[600] },
  explanationBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.sm,
    padding: DesignSpacing.md,
    marginTop: DesignSpacing.md,
  },
  explanationIcon: { fontSize: 20, marginRight: DesignSpacing.sm },
  explanationText: { ...DesignTextStyles.bodySmall, color: DesignColors.neutral[700], flex: 1, lineHeight: 20 },
  whyCard: { backgroundColor: DesignColors.neutral[200], borderRadius: DesignRadius.md, padding: DesignSpacing.lg },
  whyTitle: { ...DesignTextStyles.labelLarge, color: DesignColors.neutral[800], marginBottom: DesignSpacing.sm },
  whyList: { gap: 4 },
  whyItem: { ...DesignTextStyles.bodySmall, color: DesignColors.neutral[600] },
});
