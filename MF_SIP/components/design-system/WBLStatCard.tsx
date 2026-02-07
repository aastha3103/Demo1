/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WBLStatCard - Wealth Builder Lab Statistics Card Component
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * A card for displaying financial statistics in a friendly, non-intimidating way.
 * Designed to show growth positively without creating anxiety.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {
  DesignRadius,
  DesignSpacing,
  DesignShadows,
  DesignTextStyles,
} from '../../constants/design-system';
import { useDesignTheme } from '../../hooks/use-design-theme';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export type WBLStatCardVariant = 'default' | 'highlight' | 'growth' | 'primary' | 'secondary';

export interface WBLStatCardProps {
  /** Stat label */
  label: string | React.ReactNode;
  /** Main value */
  value: string | number | React.ReactNode;
  /** Value prefix (e.g., "₹") */
  prefix?: string;
  /** Value suffix (e.g., "%") */
  suffix?: string;
  /** Trend direction */
  trend?: 'up' | 'down' | 'neutral';
  /** Trend value (e.g., "+12%") */
  trendValue?: string;
  /** Card variant */
  variant?: WBLStatCardVariant;
  /** Icon or illustration */
  icon?: React.ReactNode;
  /** Helper text */
  helperText?: string;
  /** Press handler */
  onPress?: () => void;
  /** Container style */
  style?: ViewStyle;
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const WBLStatCard: React.FC<WBLStatCardProps> = ({
  label,
  value,
  prefix,
  suffix,
  trend,
  trendValue,
  variant = 'default',
  icon,
  helperText,
  onPress,
  style,
}) => {
  const { colors, isDark } = useDesignTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'highlight':
      case 'primary':
        return {
          container: { backgroundColor: colors.primary[50] },
          label: { color: isDark ? colors.primary[600] : colors.neutral[900] },
          value: { color: isDark ? colors.primary[700] : colors.neutral[900] },
        };
      case 'growth':
      case 'secondary':
        return {
          container: { backgroundColor: colors.secondary[50] },
          label: { color: isDark ? colors.secondary[600] : colors.neutral[900] },
          value: { color: isDark ? colors.secondary[700] : colors.neutral[900] },
        };
      default:
        return {
          container: { backgroundColor: colors.neutral[0] },
          label: { color: colors.neutral[600] },
          value: { color: colors.neutral[800] },
        };
    }
  };

  const getTrendColor = () => {
    // Using calming colors - green for growth, soft amber for neutral, soft coral for down
    switch (trend) {
      case 'up':
        return colors.secondary[500];
      case 'down':
        return colors.semantic.error.main;
      default:
        return colors.neutral[500];
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      default:
        return '→';
    }
  };

  const variantStyles = getVariantStyles();

  const CardContent = (
    <View
      style={[
        styles.container,
        variantStyles.container,
        variant === 'default' && DesignShadows.card,
        style,
      ]}
    >
      <View style={styles.header}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={[styles.label, variantStyles.label]}>{label}</Text>
      </View>

      <View style={styles.valueRow}>
        <Text style={[styles.value, variantStyles.value]}>
          {prefix && <Text style={styles.prefix}>{prefix}</Text>}
          {value}
          {suffix && <Text style={styles.suffix}>{suffix}</Text>}
        </Text>

        {trend && trendValue && (
          <View style={[styles.trendContainer, { backgroundColor: getTrendColor() + '15' }]}>
            <Text style={[styles.trendIcon, { color: getTrendColor() }]}>
              {getTrendIcon()}
            </Text>
            <Text style={[styles.trendValue, { color: getTrendColor() }]}>
              {trendValue}
            </Text>
          </View>
        )}
      </View>

      {helperText && (
        <Text style={[styles.helperText, { color: colors.neutral[500] }]}>{helperText}</Text>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
        {CardContent}
      </TouchableOpacity>
    );
  }

  return CardContent;
};

// ═══════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════

const styles = StyleSheet.create({
  container: {
    borderRadius: DesignRadius.card,
    padding: DesignSpacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DesignSpacing.sm,
  },
  iconContainer: {
    marginRight: DesignSpacing.sm,
  },
  label: {
    ...DesignTextStyles.labelMedium,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  value: {
    ...DesignTextStyles.headlineLarge,
    fontWeight: '700',
  },
  prefix: {
    ...DesignTextStyles.titleLarge,
    fontWeight: '600',
  },
  suffix: {
    ...DesignTextStyles.titleMedium,
    fontWeight: '500',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DesignSpacing.sm,
    paddingVertical: DesignSpacing.xs,
    borderRadius: DesignRadius.sm,
  },
  trendIcon: {
    fontSize: 14,
    fontWeight: '700',
    marginRight: 2,
  },
  trendValue: {
    ...DesignTextStyles.labelSmall,
    fontWeight: '600',
  },
  helperText: {
    ...DesignTextStyles.caption,
    marginTop: DesignSpacing.sm,
  },
});

export default WBLStatCard;
