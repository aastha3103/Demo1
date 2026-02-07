/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MARKET LAB - MLStockCard Component
 * Stock display card for the simulator
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import {
  DesignColors,
  DesignRadius,
  DesignSpacing,
  DesignTextStyles,
  DesignShadows,
} from '../../constants/design-system';

export type StockSector = 'technology' | 'finance' | 'healthcare' | 'energy' | 'consumer' | 'industrial';

export interface MLStockCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sector: StockSector;
  onPress?: () => void;
  isSelected?: boolean;
  style?: ViewStyle;
  showMiniChart?: boolean;
}

export const MLStockCard: React.FC<MLStockCardProps> = ({
  symbol,
  name,
  price,
  change,
  changePercent,
  sector,
  onPress,
  isSelected = false,
  style,
  showMiniChart = true,
}) => {
  const isPositive = change >= 0;
  const sectorStyles = getSectorStyles(sector);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selected,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Left: Symbol & Name */}
      <View style={styles.leftSection}>
        <View style={[styles.symbolBadge, { backgroundColor: sectorStyles.color }]}>
          <Text style={styles.symbolText}>{symbol.slice(0, 2)}</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.symbol}>{symbol}</Text>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
        </View>
      </View>

      {/* Center: Mini Chart Placeholder */}
      {showMiniChart && (
        <View style={styles.chartContainer}>
          <MiniChart isPositive={isPositive} />
        </View>
      )}

      {/* Right: Price & Change */}
      <View style={styles.rightSection}>
        <Text style={styles.price}>₹{price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</Text>
        <View style={[styles.changeBadge, isPositive ? styles.positive : styles.negative]}>
          <Text style={[styles.changeText, isPositive ? styles.positiveText : styles.negativeText]}>
            {isPositive ? '↑' : '↓'} {Math.abs(changePercent).toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Simple mini chart component
const MiniChart: React.FC<{ isPositive: boolean }> = ({ isPositive }) => {
  const color = isPositive ? DesignColors.secondary[400] : DesignColors.semantic.negative.main;

  // Generate simple wave path points
  const points = isPositive
    ? [12, 10, 14, 8, 12, 6, 10, 4]
    : [4, 6, 8, 10, 8, 12, 10, 14];

  return (
    <View style={styles.miniChart}>
      {points.map((height, i) => (
        <View
          key={i}
          style={[
            styles.chartBar,
            {
              height,
              backgroundColor: color,
              opacity: 0.3 + (i * 0.1),
            },
          ]}
        />
      ))}
    </View>
  );
};

const getSectorStyles = (sector: StockSector) => {
  const sectors = {
    technology: { color: DesignColors.primary[400] },
    finance: { color: DesignColors.secondary[400] },
    healthcare: { color: DesignColors.accent.coral },
    energy: { color: DesignColors.semantic.warning.main },
    consumer: { color: DesignColors.accent.purple },
    industrial: { color: DesignColors.neutral[500] },
  };
  return sectors[sector];
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.card,
    padding: DesignSpacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...DesignShadows.sm,
  },
  selected: {
    borderWidth: 2,
    borderColor: DesignColors.primary[500],
    backgroundColor: DesignColors.primary[50],
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  symbolBadge: {
    width: 40,
    height: 40,
    borderRadius: DesignRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  symbolText: {
    color: DesignColors.neutral[0],
    fontSize: 14,
    fontWeight: '700',
  },
  nameContainer: {
    marginLeft: DesignSpacing.md,
    flex: 1,
  },
  symbol: {
    ...DesignTextStyles.labelLarge,
    color: DesignColors.neutral[900],
  },
  name: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
    marginTop: 2,
  },
  chartContainer: {
    width: 60,
    height: 24,
    marginHorizontal: DesignSpacing.sm,
  },
  miniChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
  },
  chartBar: {
    width: 4,
    borderRadius: 2,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  price: {
    ...DesignTextStyles.dataSmall,
    color: DesignColors.neutral[900],
  },
  changeBadge: {
    paddingHorizontal: DesignSpacing.sm,
    paddingVertical: 2,
    borderRadius: DesignRadius.xs,
    marginTop: 4,
  },
  positive: {
    backgroundColor: 'rgba(77, 182, 172, 0.15)',
  },
  negative: {
    backgroundColor: 'rgba(229, 115, 115, 0.15)',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  positiveText: {
    color: DesignColors.secondary[500],
  },
  negativeText: {
    color: DesignColors.semantic.negative.main,
  },
});
