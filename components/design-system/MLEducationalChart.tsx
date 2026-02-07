/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MARKET LAB - EDUCATIONAL CHART COMPONENT
 * Interactive chart with learning overlays
 * GREEN-WHITE THEME - Clean, minimalistic, accessible for rural users
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useStockLanguage } from '@/context/StockLanguageContext';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Defs, G, Line, LinearGradient, Path, Rect, Stop, Text as SvgText } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 48;
const CHART_HEIGHT = 200;

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
    { ...lessonsData[0], color: COLORS.green[500], start: upTrendStart, end: upTrendEnd },
    { ...lessonsData[1], color: COLORS.danger, start: downTrendStart, end: downTrendEnd },
    { ...lessonsData[2], color: COLORS.warning, start: volatileStart, end: volatileEnd },
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
          activeOpacity={0.8}
        >
          <Text style={[styles.learningToggleIcon, learningMode && styles.learningToggleIconActive]}>
            {learningMode ? '📚' : '📖'}
          </Text>
          <Text style={[styles.learningToggleText, learningMode && styles.learningToggleTextActive]}>
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
            activeOpacity={0.8}
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
              <Stop offset="0%" stopColor={COLORS.green[500]} stopOpacity="0.3" />
              <Stop offset="100%" stopColor={COLORS.green[500]} stopOpacity="0" />
            </LinearGradient>
          </Defs>

          {/* Grid */}
          {[0, 1, 2, 3].map(i => (
            <Line key={i} x1="40" y1={30 + i * ((CHART_HEIGHT - 60) / 3)} x2={CHART_WIDTH - 20} y2={30 + i * ((CHART_HEIGHT - 60) / 3)}
              stroke={COLORS.green[200]} strokeWidth="1" strokeDasharray="4" />
          ))}

          {/* Y-axis labels */}
          <SvgText x="35" y="35" fill={COLORS.textLight} fontSize="10" textAnchor="end">
            ₹{maxPrice.toFixed(0)}
          </SvgText>
          <SvgText x="35" y={CHART_HEIGHT - 25} fill={COLORS.textLight} fontSize="10" textAnchor="end">
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
                opacity="0.15"
                rx="8"
              />
            </G>
          )}

          {/* Area fill */}
          <Path d={areaD} fill="url(#areaGrad)" />

          {/* Main line */}
          <Path d={pathD} fill="none" stroke={COLORS.green[500]} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Data points */}
          {points.map((p, i) => (
            <Circle key={i} cx={p.x} cy={p.y} r={i === points.length - 1 ? 6 : 3}
              fill={i === points.length - 1 ? COLORS.green[500] : COLORS.green[300]}
              stroke={i === points.length - 1 ? COLORS.white : 'none'} strokeWidth="2" />
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
          <SvgText x="50" y={CHART_HEIGHT - 5} fill={COLORS.textLight} fontSize="9" textAnchor="middle">{t('charts.component.start')}</SvgText>
          <SvgText x={CHART_WIDTH / 2} y={CHART_HEIGHT - 5} fill={COLORS.textLight} fontSize="9" textAnchor="middle">
            {timeframe === '1D' ? '12 PM' : timeframe === '1W' ? t('charts.component.labels.mid') : timeframe === '1M' ? t('charts.component.labels.m15') : t('charts.component.labels.m3')}
          </SvgText>
          <SvgText x={CHART_WIDTH - 30} y={CHART_HEIGHT - 5} fill={COLORS.textLight} fontSize="9" textAnchor="middle">{t('charts.component.now')}</SvgText>
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
                style={[
                  styles.lessonTab,
                  activeLesson === i && {
                    borderColor: lesson.color,
                    backgroundColor: lesson.color === COLORS.green[500] ? COLORS.green[50] :
                      lesson.color === COLORS.danger ? COLORS.dangerLight : COLORS.warningLight
                  }
                ]}
                onPress={() => setActiveLesson(i)}
                activeOpacity={0.8}
              >
                <View style={[styles.lessonDot, { backgroundColor: lesson.color }]} />
                <Text style={[styles.lessonTabText, activeLesson === i && { color: lesson.color, fontWeight: '700' }]}>{lesson.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Active Lesson Card */}
          <View style={[styles.lessonCard, { borderLeftColor: lessons[activeLesson].color }]}>
            <Text style={[styles.lessonTitle, { color: lessons[activeLesson].color }]}>{lessons[activeLesson].title}</Text>
            <Text style={styles.lessonDesc}>{lessons[activeLesson].desc}</Text>

            {/* Specific explanations */}
            {activeLesson === 0 && (
              <View style={[styles.explanationBox, { backgroundColor: COLORS.green[50], borderColor: COLORS.green[200] }]}>
                <Text style={styles.explanationIcon}>📈</Text>
                <View style={styles.explanationContent}>
                  <Text style={[styles.explanationLabel, { color: COLORS.green[700] }]}>Green movement = Price is going UP</Text>
                  <Text style={styles.explanationText}>
                    {t('charts.component.explanations.up')}
                  </Text>
                </View>
              </View>
            )}
            {activeLesson === 1 && (
              <View style={[styles.explanationBox, { backgroundColor: COLORS.dangerLight, borderColor: '#FECACA' }]}>
                <Text style={styles.explanationIcon}>📉</Text>
                <View style={styles.explanationContent}>
                  <Text style={[styles.explanationLabel, { color: COLORS.danger }]}>Red movement = Price is going DOWN</Text>
                  <Text style={styles.explanationText}>
                    {t('charts.component.explanations.down')}
                  </Text>
                </View>
              </View>
            )}
            {activeLesson === 2 && (
              <View style={[styles.explanationBox, { backgroundColor: COLORS.warningLight, borderColor: '#FDE68A' }]}>
                <Text style={styles.explanationIcon}>⚡</Text>
                <View style={styles.explanationContent}>
                  <Text style={[styles.explanationLabel, { color: COLORS.warning }]}>High movement = Very unstable</Text>
                  <Text style={styles.explanationText}>
                    {t('charts.component.explanations.volatile')}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Why Prices Move */}
          <View style={styles.whyCard}>
            <View style={styles.whyHeader}>
              <Text style={styles.whyIcon}>💡</Text>
              <Text style={styles.whyTitle}>{t('charts.component.whyTitle')}</Text>
            </View>
            <View style={styles.whyList}>
              {(t('charts.component.whyList') as string[]).map((item, i) => (
                <View key={i} style={styles.whyItemRow}>
                  <View style={styles.whyBullet} />
                  <Text style={styles.whyItem}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// STYLES - Green-White Theme
// ═══════════════════════════════════════════════════════════════════════════

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.green[200],
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16
  },
  stockSymbol: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textLight,
    letterSpacing: 1,
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.green[800],
    marginTop: 4,
  },
  learningToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.green[50],
    borderWidth: 2,
    borderColor: COLORS.green[200],
    gap: 6,
  },
  learningToggleActive: {
    backgroundColor: COLORS.green[100],
    borderColor: COLORS.green[400],
  },
  learningToggleIcon: {
    fontSize: 14,
  },
  learningToggleIconActive: {},
  learningToggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  learningToggleTextActive: {
    color: COLORS.green[700],
    fontWeight: '700',
  },

  // Timeframe
  timeframeTabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.green[50],
    borderRadius: 12,
    padding: 4,
    marginBottom: 16
  },
  timeframeTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  timeframeTabActive: {
    backgroundColor: COLORS.green[600],
    shadowColor: COLORS.green[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  timeframeText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  timeframeTextActive: {
    color: COLORS.white,
    fontWeight: '700'
  },

  // Chart
  chartContainer: {
    marginBottom: 16,
    backgroundColor: COLORS.green[50],
    borderRadius: 12,
    padding: 8,
  },

  // Lessons
  lessonsContainer: {
    gap: 12
  },
  lessonTabs: {
    marginBottom: 8
  },
  lessonTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.green[50],
    marginRight: 10,
    borderWidth: 2,
    borderColor: COLORS.green[200],
  },
  lessonDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8
  },
  lessonTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  lessonCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderWidth: 2,
    borderColor: COLORS.green[100],
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  lessonDesc: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textLight,
    lineHeight: 20,
  },
  explanationBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
    borderWidth: 1,
  },
  explanationIcon: {
    fontSize: 24,
    marginRight: 12
  },
  explanationContent: {
    flex: 1,
  },
  explanationLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  explanationText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.text,
    lineHeight: 18,
  },

  // Why Card
  whyCard: {
    backgroundColor: COLORS.green[50],
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.green[200],
  },
  whyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  whyIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  whyTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.green[800],
  },
  whyList: {
    gap: 8
  },
  whyItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  whyBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.green[500],
    marginRight: 10,
  },
  whyItem: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.text,
    flex: 1,
  },
});

