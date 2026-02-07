/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WBLFundCard - Fund Card Component for Simulator
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Displays individual mutual fund information in the simulator.
 * Includes: Fund name, SIP amount, risk level, trend graph, and actions.
 */

import {
  DesignRadius,
  DesignSpacing,
  DesignTextStyles,
} from '@/constants/mf_sip/design-system';
import { useDesignTheme } from '@/hooks/mf_sip/use-design-theme';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export type RiskLevel = 'low' | 'medium' | 'high';

export interface WBLFundCardProps {
  /** Fund name */
  name: string;
  /** Fund category/type */
  category?: string;
  /** Monthly SIP amount */
  sipAmount: number;
  /** Risk level */
  riskLevel: RiskLevel;
  /** Trend data (array of values for mini graph) */
  trendData?: number[];
  /** Whether fund is currently paused */
  isPaused?: boolean;
  /** Current returns percentage */
  returns?: number;
  /** Pause/Resume handler */
  onPauseToggle?: () => void;
  /** Edit handler */
  onEdit?: () => void;
  /** Remove handler */
  onRemove?: () => void;
  /** Press handler */
  onPress?: () => void;
  /** Container style */
  style?: ViewStyle;
}

// ═══════════════════════════════════════════════════════════════════════════
// MINI TREND GRAPH COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface MiniTrendGraphProps {
  data: number[];
  isPositive: boolean;
}

const MiniTrendGraph: React.FC<MiniTrendGraphProps> = ({ data, isPositive }) => {
  const { colors, isDark } = useDesignTheme();
  if (!data || data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const normalizedData = data.map((val) => ((val - min) / range) * 100);

  const color = isPositive ? colors.secondary[500] : colors.semantic.error.main;
  const bgColor = isPositive ? colors.secondary[50] : colors.semantic.error.light;

  return (
    <View style={[styles.graphContainer, { backgroundColor: bgColor }]}>
      <View style={styles.graphBars}>
        {normalizedData.slice(-8).map((height, index) => (
          <View
            key={index}
            style={[
              styles.graphBar,
              {
                height: `${Math.max(15, height)}%`,
                backgroundColor: color,
                opacity: 0.4 + (index / normalizedData.length) * 0.6,
              },
            ]}
          />
        ))}
      </View>
      {/* Trend line indicator */}
      <View style={[styles.trendIndicator, { backgroundColor: color }]}>
        <Text style={styles.trendArrow}>
          {isPositive ? '↗' : '↘'}
        </Text>
      </View>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// RISK BADGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface RiskBadgeProps {
  level: RiskLevel;
}

const RiskBadge: React.FC<RiskBadgeProps> = ({ level }) => {
  const { colors, isDark } = useDesignTheme();

  const riskConfig: Record<RiskLevel, { label: string; color: string; bgColor: string }> = {
    low: {
      label: 'Low Risk',
      color: !isDark ? colors.neutral[900] : colors.secondary[300],
      bgColor: colors.secondary[50],
    },
    medium: {
      label: 'Medium Risk',
      color: !isDark ? colors.neutral[900] : colors.semantic.warning.main,
      bgColor: colors.semantic.warning.light,
    },
    high: {
      label: 'High Risk',
      color: !isDark ? colors.neutral[900] : colors.semantic.error.main,
      bgColor: colors.semantic.error.light,
    },
  };

  const config = riskConfig[level];

  return (
    <View style={[styles.riskBadge, { backgroundColor: config.bgColor }]}>
      <Text style={[styles.riskText, { color: config.color }]}>
        {config.label}
      </Text>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const WBLFundCard: React.FC<WBLFundCardProps> = ({
  name,
  category,
  sipAmount,
  riskLevel,
  trendData = [100, 102, 101, 105, 108, 107, 112, 115],
  isPaused = false,
  returns = 0,
  onPauseToggle,
  onEdit,
  onRemove,
  onPress,
  style,
}) => {
  const { colors: themeColors, isDark } = useDesignTheme();
  const isPositive = returns >= 0;

  const CardContent = (
    <View style={[
      styles.container,
      {
        backgroundColor: themeColors.neutral[0],
        borderColor: isDark ? themeColors.neutral[200] : themeColors.neutral[200],
      },
      isPaused && [styles.containerPaused, { borderColor: themeColors.neutral[300] }],
      style
    ]}>
      {/* Paused Overlay Badge */}
      {isPaused && (
        <View style={[styles.pausedBadge, { backgroundColor: themeColors.neutral[200] }]}>
          <Text style={[styles.pausedText, { color: themeColors.neutral[600] }]}>⏸ Paused</Text>
        </View>
      )}

      {/* Top Row: Fund Info + Graph */}
      <View style={styles.topRow}>
        {/* Fund Details */}
        <View style={styles.fundInfo}>
          <Text style={[styles.fundName, { color: themeColors.neutral[800] }]} numberOfLines={1}>
            {name}
          </Text>
          {category && (
            <Text style={[styles.fundCategory, { color: themeColors.neutral[500] }]}>{category}</Text>
          )}
          <RiskBadge level={riskLevel} />
        </View>

        {/* Mini Trend Graph */}
        <View style={styles.graphSection}>
          <MiniTrendGraph data={trendData} isPositive={isPositive} />
          {returns !== undefined && (
            <Text style={[
              styles.returnsText,
              { color: isPositive ? themeColors.secondary[600] : themeColors.semantic.error.main }
            ]}>
              {isPositive ? '+' : ''}{returns.toFixed(1)}%
            </Text>
          )}
        </View>
      </View>

      {/* Middle Row: SIP Amount */}
      <View style={[styles.sipRow, { borderTopColor: themeColors.neutral[100] }]}>
        <View style={styles.sipLabel}>
          <Text style={[styles.sipLabelText, { color: themeColors.neutral[500] }]}>Monthly SIP</Text>
        </View>
        <Text style={[styles.sipAmount, { color: themeColors.primary[600] }]}>₹{sipAmount.toLocaleString('en-IN')}</Text>
      </View>

      {/* Bottom Row: Actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.actionButton, styles.pauseButton, { backgroundColor: themeColors.neutral[100], marginRight: DesignSpacing.sm }]}
          onPress={onPauseToggle}
        >
          <Text style={[styles.pauseButtonText, { color: themeColors.neutral[700] }]}>
            {isPaused ? '▶ Resume' : '⏸ Pause'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.editButton, { backgroundColor: themeColors.primary[500] }]}
          onPress={onEdit}
        >
          <Text style={[styles.editButtonText, { color: '#FFFFFF', fontWeight: 'bold' }]}>✏️ Edit Amount</Text>
        </TouchableOpacity>

        {onRemove && (
          <TouchableOpacity
            style={[styles.actionButton, styles.removeButton, { backgroundColor: themeColors.semantic.error.light, marginLeft: DesignSpacing.sm }]}
            onPress={onRemove}
          >
            <Text style={[styles.removeButtonText, { color: themeColors.semantic.error.main }]}>🗑️</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
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
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  containerPaused: {
    opacity: 0.7,
  },
  pausedBadge: {
    position: 'absolute',
    top: DesignSpacing.sm,
    right: DesignSpacing.sm,
    paddingHorizontal: DesignSpacing.sm,
    paddingVertical: 2,
    borderRadius: DesignRadius.sm,
  },
  pausedText: {
    fontSize: 10,
    fontWeight: '600',
  },

  // Top Row
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: DesignSpacing.md,
  },
  fundInfo: {
    flex: 1,
    marginRight: DesignSpacing.md,
  },
  fundName: {
    ...DesignTextStyles.titleMedium,
    marginBottom: 2,
  },
  fundCategory: {
    ...DesignTextStyles.caption,
    marginBottom: DesignSpacing.sm,
  },
  riskBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: DesignSpacing.sm,
    paddingVertical: 3,
    borderRadius: DesignRadius.sm,
  },
  riskText: {
    fontSize: 10,
    fontWeight: '600',
  },

  // Graph Section
  graphSection: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  graphContainer: {
    width: 70,
    height: 40,
    borderRadius: DesignRadius.sm,
    overflow: 'hidden',
    position: 'relative',
    padding: 4,
  },
  graphBars: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  graphBar: {
    width: 5,
    borderRadius: 2,
    marginHorizontal: 1,
  },
  trendIndicator: {
    position: 'absolute',
    right: 2,
    top: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendArrow: {
    fontSize: 8,
    color: '#FFFFFF',
    fontWeight: '900',
  },
  returnsText: {
    ...DesignTextStyles.labelSmall,
    fontWeight: '700',
    marginTop: 4,
  },

  // SIP Row
  sipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: DesignSpacing.sm,
    borderTopWidth: 1,
    marginBottom: DesignSpacing.sm,
  },
  sipLabel: {
    flex: 1,
  },
  sipLabelText: {
    ...DesignTextStyles.caption,
  },
  sipAmount: {
    fontSize: 20,
    fontWeight: '700',
  },

  // Actions Row
  actionsRow: {
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    height: 44, // Minimum touch target
    borderRadius: DesignRadius.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseButton: {
  },
  pauseButtonText: {
    ...DesignTextStyles.labelSmall,
  },
  editButton: {
  },
  editButtonText: {
    ...DesignTextStyles.labelSmall,
  },
  removeButton: {
    flex: 0.3,
  },
  removeButtonText: {
    fontSize: 14,
  },
});

export default WBLFundCard;
