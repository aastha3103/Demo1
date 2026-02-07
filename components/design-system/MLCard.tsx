/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MARKET LAB - MLCard Component
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native';
import {
  DesignColors,
  DesignRadius,
  DesignSpacing,
  DesignShadows,
  DesignTextStyles,
} from '../../constants/design-system';

export type MLCardVariant = 'default' | 'elevated' | 'outlined' | 'glass' | 'accent' | 'learning';

export interface MLCardProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  variant?: MLCardVariant;
  style?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: TextStyle;
  noPadding?: boolean;
}

export const MLCard: React.FC<MLCardProps> = ({
  children,
  title,
  subtitle,
  variant = 'default',
  style,
  headerStyle,
  contentStyle,
  titleStyle,
  noPadding = false,
}) => {
  const cardStyles = getCardStyles(variant);

  return (
    <View style={[styles.base, cardStyles.container, noPadding && styles.noPadding, style]}>
      {(title || subtitle) && (
        <View style={[styles.header, headerStyle]}>
          {title && <Text style={[styles.title, cardStyles.title, titleStyle]}>{title}</Text>}
          {subtitle && <Text style={[styles.subtitle, cardStyles.subtitle]}>{subtitle}</Text>}
        </View>
      )}
      {children && <View style={[styles.content, contentStyle]}>{children}</View>}
    </View>
  );
};

const getCardStyles = (variant: MLCardVariant) => {
  const variants = {
    default: {
      container: {
        backgroundColor: DesignColors.neutral[100],
        ...DesignShadows.card,
      },
      title: { color: DesignColors.neutral[900] },
      subtitle: { color: DesignColors.neutral[600] },
    },
    elevated: {
      container: {
        backgroundColor: DesignColors.neutral[200],
        ...DesignShadows.lg,
      },
      title: { color: DesignColors.neutral[900] },
      subtitle: { color: DesignColors.neutral[600] },
    },
    outlined: {
      container: {
        backgroundColor: DesignColors.neutral[100],
        borderWidth: 1,
        borderColor: DesignColors.neutral[300],
      },
      title: { color: DesignColors.neutral[900] },
      subtitle: { color: DesignColors.neutral[600] },
    },
    glass: {
      container: {
        backgroundColor: 'rgba(30, 35, 44, 0.85)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
      title: { color: DesignColors.neutral[900] },
      subtitle: { color: DesignColors.neutral[600] },
    },
    accent: {
      container: {
        backgroundColor: DesignColors.primary[50],
        borderWidth: 1,
        borderColor: DesignColors.primary[200],
      },
      title: { color: DesignColors.primary[700] },
      subtitle: { color: DesignColors.primary[500] },
    },
    learning: {
      container: {
        backgroundColor: DesignColors.semantic.learning.light,
        borderWidth: 1,
        borderColor: DesignColors.accent.purple,
      },
      title: { color: DesignColors.accent.purple },
      subtitle: { color: DesignColors.neutral[600] },
    },
  };

  return variants[variant];
};

const styles = StyleSheet.create({
  base: {
    borderRadius: DesignRadius.card,
    padding: DesignSpacing.cardPadding,
  },
  noPadding: {
    padding: 0,
  },
  header: {
    marginBottom: DesignSpacing.md,
  },
  title: {
    ...DesignTextStyles.titleLarge,
    marginBottom: DesignSpacing.xs,
  },
  subtitle: {
    ...DesignTextStyles.bodyMedium,
  },
  content: {},
});
