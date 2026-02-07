/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MARKET LAB - Stock Chart Illustration
 * Animated illustration for module entry
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Rect, G, Defs, LinearGradient, Stop, Line } from 'react-native-svg';
import { DesignColors } from '../../constants/design-system';

interface StockChartIllustrationProps {
  size?: number;
}

export const StockChartIllustration: React.FC<StockChartIllustrationProps> = ({ size = 200 }) => {
  const scale = size / 200;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={DesignColors.primary[500]} stopOpacity="0.3" />
            <Stop offset="100%" stopColor={DesignColors.primary[500]} stopOpacity="0" />
          </LinearGradient>
          <LinearGradient id="screenGlow" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={DesignColors.neutral[200]} stopOpacity="1" />
            <Stop offset="100%" stopColor={DesignColors.neutral[100]} stopOpacity="1" />
          </LinearGradient>
        </Defs>

        {/* Monitor Frame */}
        <Rect
          x="30"
          y="30"
          width="140"
          height="100"
          rx="8"
          fill={DesignColors.neutral[200]}
          stroke={DesignColors.neutral[300]}
          strokeWidth="2"
        />

        {/* Screen */}
        <Rect
          x="40"
          y="40"
          width="120"
          height="80"
          rx="4"
          fill="url(#screenGlow)"
        />

        {/* Grid Lines */}
        <G opacity="0.3">
          <Line x1="50" y1="60" x2="150" y2="60" stroke={DesignColors.chart.grid} strokeWidth="1" />
          <Line x1="50" y1="80" x2="150" y2="80" stroke={DesignColors.chart.grid} strokeWidth="1" />
          <Line x1="50" y1="100" x2="150" y2="100" stroke={DesignColors.chart.grid} strokeWidth="1" />
        </G>

        {/* Chart Line - Upward Trend */}
        <Path
          d="M50 100 L70 90 L90 95 L110 75 L130 65 L150 55"
          fill="none"
          stroke={DesignColors.secondary[400]}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Chart Area Fill */}
        <Path
          d="M50 100 L70 90 L90 95 L110 75 L130 65 L150 55 L150 110 L50 110 Z"
          fill={DesignColors.secondary[400]}
          opacity="0.15"
        />

        {/* Data Points */}
        <Circle cx="50" cy="100" r="4" fill={DesignColors.secondary[500]} />
        <Circle cx="70" cy="90" r="4" fill={DesignColors.secondary[500]} />
        <Circle cx="90" cy="95" r="4" fill={DesignColors.secondary[500]} />
        <Circle cx="110" cy="75" r="4" fill={DesignColors.secondary[500]} />
        <Circle cx="130" cy="65" r="4" fill={DesignColors.secondary[500]} />
        <Circle cx="150" cy="55" r="5" fill={DesignColors.secondary[400]} stroke={DesignColors.neutral[100]} strokeWidth="2" />

        {/* Monitor Stand */}
        <Rect
          x="90"
          y="130"
          width="20"
          height="20"
          fill={DesignColors.neutral[300]}
        />
        <Rect
          x="75"
          y="150"
          width="50"
          height="8"
          rx="4"
          fill={DesignColors.neutral[300]}
        />

        {/* Magnifying Glass */}
        <G transform="translate(140, 140)">
          <Circle
            cx="15"
            cy="15"
            r="14"
            fill={DesignColors.neutral[100]}
            stroke={DesignColors.primary[400]}
            strokeWidth="3"
          />
          <Line
            x1="25"
            y1="25"
            x2="38"
            y2="38"
            stroke={DesignColors.primary[400]}
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Mini chart in magnifying glass */}
          <Path
            d="M8 18 L12 14 L18 16 L22 10"
            fill="none"
            stroke={DesignColors.secondary[400]}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </G>

        {/* Book/Learning Symbol */}
        <G transform="translate(15, 140)">
          <Rect
            x="0"
            y="5"
            width="35"
            height="28"
            rx="3"
            fill={DesignColors.semantic.learning.light}
            stroke={DesignColors.accent.purple}
            strokeWidth="2"
          />
          <Line x1="17" y1="8" x2="17" y2="30" stroke={DesignColors.accent.purple} strokeWidth="1" />
          <Line x1="6" y1="12" x2="14" y2="12" stroke={DesignColors.neutral[500]} strokeWidth="1" />
          <Line x1="6" y1="17" x2="14" y2="17" stroke={DesignColors.neutral[500]} strokeWidth="1" />
          <Line x1="6" y1="22" x2="14" y2="22" stroke={DesignColors.neutral[500]} strokeWidth="1" />
          <Line x1="20" y1="12" x2="28" y2="12" stroke={DesignColors.neutral[500]} strokeWidth="1" />
          <Line x1="20" y1="17" x2="28" y2="17" stroke={DesignColors.neutral[500]} strokeWidth="1" />
          <Line x1="20" y1="22" x2="28" y2="22" stroke={DesignColors.neutral[500]} strokeWidth="1" />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
