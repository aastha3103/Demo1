/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MARKET LAB - MLLearningCard Component
 * Educational content cards for lessons
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

export type MLLearningCardType = 'lesson' | 'quiz' | 'concept' | 'comparison' | 'simulation';

export interface MLLearningCardProps {
  type: MLLearningCardType;
  title: string;
  subtitle?: string;
  icon?: string;
  duration?: string;
  progress?: number;
  isCompleted?: boolean;
  isLocked?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export const MLLearningCard: React.FC<MLLearningCardProps> = ({
  type,
  title,
  subtitle,
  icon,
  duration,
  progress = 0,
  isCompleted = false,
  isLocked = false,
  onPress,
  style,
}) => {
  const typeStyles = getTypeStyles(type);
  const defaultIcons = {
    lesson: '📖',
    quiz: '❓',
    concept: '💡',
    comparison: '⚖️',
    simulation: '📈',
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isLocked && styles.locked,
        isCompleted && styles.completed,
        style,
      ]}
      onPress={onPress}
      disabled={isLocked}
      activeOpacity={0.8}
    >
      {/* Type Badge */}
      <View style={[styles.typeBadge, { backgroundColor: typeStyles.badgeColor }]}>
        <Text style={styles.typeIcon}>{icon || defaultIcons[type]}</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.typeLabel, { color: typeStyles.labelColor }]}>
            {typeStyles.label}
          </Text>
          {duration && (
            <Text style={styles.duration}>⏱ {duration}</Text>
          )}
        </View>

        <Text style={[styles.title, isLocked && styles.lockedText]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, isLocked && styles.lockedText]}>{subtitle}</Text>
        )}

        {/* Progress Bar */}
        {!isLocked && !isCompleted && progress > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${progress}%`, backgroundColor: typeStyles.progressColor }
                ]}
              />
            </View>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
        )}

        {/* Completed Badge */}
        {isCompleted && (
          <View style={styles.completedBadge}>
            <Text style={styles.completedIcon}>✓</Text>
            <Text style={styles.completedText}>Completed</Text>
          </View>
        )}
      </View>

      {/* Arrow or Lock */}
      <View style={styles.actionIcon}>
        <Text style={styles.actionIconText}>
          {isLocked ? '🔒' : '→'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const getTypeStyles = (type: MLLearningCardType) => {
  const types = {
    lesson: {
      label: 'LESSON',
      badgeColor: DesignColors.semantic.learning.light,
      labelColor: DesignColors.accent.purple,
      progressColor: DesignColors.accent.purple,
    },
    quiz: {
      label: 'QUIZ',
      badgeColor: DesignColors.semantic.info.light,
      labelColor: DesignColors.semantic.info.main,
      progressColor: DesignColors.semantic.info.main,
    },
    concept: {
      label: 'CONCEPT',
      badgeColor: DesignColors.secondary[50],
      labelColor: DesignColors.secondary[500],
      progressColor: DesignColors.secondary[500],
    },
    comparison: {
      label: 'COMPARE',
      badgeColor: DesignColors.semantic.warning.light,
      labelColor: DesignColors.semantic.warning.main,
      progressColor: DesignColors.semantic.warning.main,
    },
    simulation: {
      label: 'SIMULATE',
      badgeColor: DesignColors.primary[50],
      labelColor: DesignColors.primary[500],
      progressColor: DesignColors.primary[500],
    },
  };
  return types[type];
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.card,
    padding: DesignSpacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...DesignShadows.sm,
  },
  locked: {
    opacity: 0.6,
  },
  completed: {
    borderWidth: 1,
    borderColor: DesignColors.secondary[400],
    backgroundColor: DesignColors.secondary[50],
  },
  typeBadge: {
    width: 48,
    height: 48,
    borderRadius: DesignRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: DesignSpacing.md,
  },
  typeIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: DesignSpacing.xs,
  },
  typeLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  duration: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
  },
  title: {
    ...DesignTextStyles.titleSmall,
    color: DesignColors.neutral[900],
    marginBottom: 2,
  },
  subtitle: {
    ...DesignTextStyles.bodySmall,
    color: DesignColors.neutral[600],
  },
  lockedText: {
    color: DesignColors.neutral[500],
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: DesignSpacing.sm,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: DesignColors.neutral[300],
    borderRadius: 2,
    marginRight: DesignSpacing.sm,
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
    width: 30,
    textAlign: 'right',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: DesignSpacing.sm,
  },
  completedIcon: {
    color: DesignColors.secondary[500],
    fontSize: 14,
    fontWeight: '700',
    marginRight: 4,
  },
  completedText: {
    ...DesignTextStyles.caption,
    color: DesignColors.secondary[500],
    fontWeight: '600',
  },
  actionIcon: {
    marginLeft: DesignSpacing.sm,
  },
  actionIconText: {
    fontSize: 20,
    color: DesignColors.neutral[500],
  },
});
