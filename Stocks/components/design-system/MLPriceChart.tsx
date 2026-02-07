/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MARKET LAB - MLPriceChart Component
 * Interactive stock price chart for education
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import {
  DesignColors,
  DesignRadius,
  DesignSpacing,
  DesignTextStyles,
} from '../../constants/design-system';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export type ChartTimeframe = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL';

export interface PriceDataPoint {
  date: string;
  price: number;
  volume?: number;
}

export interface MLPriceChartProps {
  data: PriceDataPoint[];
  symbol: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  onTimeframeChange?: (timeframe: ChartTimeframe) => void;
  showVolume?: boolean;
  showEducation?: boolean;
}

export const MLPriceChart: React.FC<MLPriceChartProps> = ({
  data,
  symbol,
  currentPrice,
  change,
  changePercent,
  onTimeframeChange,
  showVolume = false,
  showEducation = true,
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<ChartTimeframe>('1M');
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  const isPositive = change >= 0;
  const timeframes: ChartTimeframe[] = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

  const handleTimeframeChange = (tf: ChartTimeframe) => {
    setSelectedTimeframe(tf);
    setSelectedPoint(null);
    onTimeframeChange?.(tf);
  };

  // Calculate chart dimensions
  const chartWidth = SCREEN_WIDTH - (DesignSpacing.screenPadding * 2) - (DesignSpacing.cardPadding * 2);
  const chartHeight = 180;

  // Get min/max for scaling
  const prices = data.map(d => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice || 1;

  return (
    <View style={styles.container}>
      {/* Price Header */}
      <View style={styles.priceHeader}>
        <View>
          <Text style={styles.symbol}>{symbol}</Text>
          <Text style={styles.currentPrice}>
            ₹{currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </Text>
        </View>
        <View style={[styles.changeBadge, isPositive ? styles.positive : styles.negative]}>
          <Text style={[styles.changeText, isPositive ? styles.positiveText : styles.negativeText]}>
            {isPositive ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
          </Text>
        </View>
      </View>

      {/* Chart Area */}
      <View style={styles.chartContainer}>
        <View style={[styles.chart, { width: chartWidth, height: chartHeight }]}>
          {/* Grid Lines */}
          {[0, 1, 2, 3].map((i) => (
            <View
              key={i}
              style={[
                styles.gridLine,
                { top: i * (chartHeight / 3) },
              ]}
            />
          ))}

          {/* Price Line */}
          <View style={styles.lineContainer}>
            {data.map((point, index) => {
              const x = (index / (data.length - 1)) * chartWidth;
              const y = chartHeight - ((point.price - minPrice) / priceRange) * chartHeight;
              const nextPoint = data[index + 1];

              if (!nextPoint) return null;

              const nextX = ((index + 1) / (data.length - 1)) * chartWidth;
              const nextY = chartHeight - ((nextPoint.price - minPrice) / priceRange) * chartHeight;

              // Calculate line segment
              const angle = Math.atan2(nextY - y, nextX - x) * (180 / Math.PI);
              const length = Math.sqrt(Math.pow(nextX - x, 2) + Math.pow(nextY - y, 2));

              return (
                <View
                  key={index}
                  style={[
                    styles.lineSegment,
                    {
                      left: x,
                      top: y,
                      width: length,
                      transform: [{ rotate: `${angle}deg` }],
                      backgroundColor: isPositive ? DesignColors.secondary[400] : DesignColors.semantic.negative.main,
                    },
                  ]}
                />
              );
            })}
          </View>

          {/* Touch Points */}
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * chartWidth;
            const y = chartHeight - ((point.price - minPrice) / priceRange) * chartHeight;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.touchPoint,
                  { left: x - 15, top: y - 15 },
                ]}
                onPress={() => setSelectedPoint(selectedPoint === index ? null : index)}
              >
                {selectedPoint === index && (
                  <View style={[styles.pointIndicator, {
                    backgroundColor: isPositive ? DesignColors.secondary[400] : DesignColors.semantic.negative.main
                  }]} />
                )}
              </TouchableOpacity>
            );
          })}

          {/* Selected Point Info */}
          {selectedPoint !== null && data[selectedPoint] && (
            <View style={[styles.tooltip, {
              left: Math.min(
                (selectedPoint / (data.length - 1)) * chartWidth,
                chartWidth - 100
              )
            }]}>
              <Text style={styles.tooltipDate}>{data[selectedPoint].date}</Text>
              <Text style={styles.tooltipPrice}>
                ₹{data[selectedPoint].price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </Text>
            </View>
          )}
        </View>

        {/* Y-Axis Labels */}
        <View style={styles.yAxis}>
          <Text style={styles.axisLabel}>₹{maxPrice.toFixed(0)}</Text>
          <Text style={styles.axisLabel}>₹{((maxPrice + minPrice) / 2).toFixed(0)}</Text>
          <Text style={styles.axisLabel}>₹{minPrice.toFixed(0)}</Text>
        </View>
      </View>

      {/* Timeframe Selector */}
      <View style={styles.timeframeContainer}>
        {timeframes.map((tf) => (
          <TouchableOpacity
            key={tf}
            style={[
              styles.timeframeButton,
              selectedTimeframe === tf && styles.timeframeButtonActive,
            ]}
            onPress={() => handleTimeframeChange(tf)}
          >
            <Text
              style={[
                styles.timeframeText,
                selectedTimeframe === tf && styles.timeframeTextActive,
              ]}
            >
              {tf}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Educational Tip */}
      {showEducation && (
        <View style={styles.educationTip}>
          <Text style={styles.tipIcon}>📊</Text>
          <Text style={styles.tipText}>
            Tap on the chart to see historical prices. Longer timeframes show the overall trend.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.card,
    padding: DesignSpacing.cardPadding,
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: DesignSpacing.xl,
  },
  symbol: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[500],
  },
  currentPrice: {
    ...DesignTextStyles.dataLarge,
    color: DesignColors.neutral[900],
    marginTop: 4,
  },
  changeBadge: {
    paddingHorizontal: DesignSpacing.md,
    paddingVertical: DesignSpacing.sm,
    borderRadius: DesignRadius.sm,
  },
  positive: {
    backgroundColor: 'rgba(77, 182, 172, 0.15)',
  },
  negative: {
    backgroundColor: 'rgba(229, 115, 115, 0.15)',
  },
  changeText: {
    ...DesignTextStyles.labelMedium,
    fontWeight: '600',
  },
  positiveText: {
    color: DesignColors.secondary[500],
  },
  negativeText: {
    color: DesignColors.semantic.negative.main,
  },
  chartContainer: {
    flexDirection: 'row',
    marginBottom: DesignSpacing.lg,
  },
  chart: {
    position: 'relative',
    overflow: 'hidden',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: DesignColors.chart.grid,
  },
  lineContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  lineSegment: {
    position: 'absolute',
    height: 2,
    transformOrigin: 'left center',
  },
  touchPoint: {
    position: 'absolute',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: DesignColors.neutral[100],
  },
  tooltip: {
    position: 'absolute',
    top: -50,
    backgroundColor: DesignColors.neutral[200],
    paddingHorizontal: DesignSpacing.md,
    paddingVertical: DesignSpacing.sm,
    borderRadius: DesignRadius.sm,
    minWidth: 100,
  },
  tooltipDate: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
  },
  tooltipPrice: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[900],
    fontWeight: '600',
  },
  yAxis: {
    width: 50,
    justifyContent: 'space-between',
    paddingLeft: DesignSpacing.sm,
  },
  axisLabel: {
    ...DesignTextStyles.caption,
    color: DesignColors.chart.axis,
    textAlign: 'right',
  },
  timeframeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: DesignColors.neutral[200],
    borderRadius: DesignRadius.sm,
    padding: 4,
    marginBottom: DesignSpacing.lg,
  },
  timeframeButton: {
    flex: 1,
    paddingVertical: DesignSpacing.sm,
    alignItems: 'center',
    borderRadius: DesignRadius.xs,
  },
  timeframeButtonActive: {
    backgroundColor: DesignColors.primary[500],
  },
  timeframeText: {
    ...DesignTextStyles.labelSmall,
    color: DesignColors.neutral[500],
  },
  timeframeTextActive: {
    color: DesignColors.neutral[0],
    fontWeight: '600',
  },
  educationTip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: DesignColors.semantic.learning.light,
    borderRadius: DesignRadius.sm,
    padding: DesignSpacing.md,
  },
  tipIcon: {
    fontSize: 16,
    marginRight: DesignSpacing.sm,
  },
  tipText: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[600],
    flex: 1,
    lineHeight: 18,
  },
});
