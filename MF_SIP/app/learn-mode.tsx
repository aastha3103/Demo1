
/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LEARN MODE - Lesson Player
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Animated, {
  SlideInRight,
  SlideOutLeft,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {
  DesignColors,
  DesignSpacing,
  DesignTextStyles,
  DesignRadius,
  DesignShadows,
  WBLButton,
  WBLCard,
  WBLEntrance,
} from '@/components/design-system';
import { useDesignTheme } from '@/hooks/use-design-theme';
import { LESSONS, Lesson, LearnCard } from '@/constants/lesson-data';
import { useRouter, useLocalSearchParams } from 'expo-router';

// ═══════════════════════════════════════════════════════════════════════════
// LESSON RUNNER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface LessonRunnerProps {
  lesson: Lesson;
  onFinish: () => void;
  onExit: () => void;
}

const LessonRunner: React.FC<LessonRunnerProps> = ({ lesson, onFinish, onExit }) => {
  const { colors, isDark } = useDesignTheme();
  const styles = createStyles(colors, isDark);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const totalCards = lesson.cards.length;
  const card: LearnCard = lesson.cards[currentCardIndex];
  const isLastCard = currentCardIndex === totalCards - 1;

  const progress = useSharedValue((currentCardIndex + 1) / totalCards);

  useEffect(() => {
    progress.value = withSpring((currentCardIndex + 1) / totalCards);
  }, [currentCardIndex]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const handleNext = () => {
    if (isLastCard) {
      onFinish();
    } else {
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
    } else {
      onExit();
    }
  };

  return (
    <View style={styles.runnerContainer}>
      {/* Header */}
      <View style={styles.runnerHeader}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <View style={styles.progContainer}>
          <View style={styles.progTrack}>
            <Animated.View style={[styles.progFill, progressStyle]} />
          </View>
          <Text style={styles.progText}>Card {currentCardIndex + 1} of {totalCards}</Text>
        </View>

        <TouchableOpacity onPress={onExit} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Card Content */}
      <Animated.View
        key={currentCardIndex}
        entering={SlideInRight.duration(400)}
        exiting={SlideOutLeft.duration(400)}
        style={styles.cardWrapper}
      >
        <ScrollView contentContainerStyle={styles.cardScrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.visualContainer}>
            {card.illustration}
          </View>

          <View style={styles.cardTextContent}>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardDescription}>{card.description}</Text>

            {card.ruralExample && (
              <View style={styles.ruralExampleBox}>
                <Text style={styles.ruralIcon}>🏘️</Text>
                <View style={styles.ruralTextInner}>
                  <Text style={styles.ruralTitle}>Relatable Example</Text>
                  <Text style={styles.ruralDescription}>{card.ruralExample}</Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </Animated.View>

      {/* Bottom CTA */}
      <View style={styles.runnerFooter}>
        <WBLButton
          title={isLastCard ? "Finish Lesson" : "Continue"}
          variant="primary"
          size="large"
          fullWidth
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN SCREEN
// ═══════════════════════════════════════════════════════════════════════════

export default function LearnModeScreen() {
  const router = useRouter();
  const { lessonId } = useLocalSearchParams();
  const { colors, isDark } = useDesignTheme();
  const styles = createStyles(colors, isDark);

  // Find the lesson based on lessonId
  const lesson = LESSONS.find(l => l.id === lessonId) || LESSONS[0];

  const handleFinish = () => {
    // Navigate back to the hub
    router.replace('/explore');
  };

  const handleExit = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.neutral[50]} />
      <LessonRunner
        lesson={lesson}
        onFinish={handleFinish}
        onExit={handleExit}
      />
    </SafeAreaView>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════

const createStyles = (colors: any, isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  runnerContainer: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  runnerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DesignSpacing.screenPadding,
    paddingVertical: DesignSpacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  progContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: DesignSpacing.lg,
  },
  progTrack: {
    width: '100%',
    height: 6,
    backgroundColor: colors.neutral[200],
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progFill: {
    height: '100%',
    backgroundColor: colors.primary[600],
    borderRadius: 3,
  },
  progText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.neutral[500],
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 28,
    color: colors.neutral[800],
    fontWeight: '700',
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: colors.neutral[500],
    fontWeight: '700',
  },

  cardWrapper: {
    flex: 1,
  },
  cardScrollContent: {
    paddingBottom: 100,
  },
  visualContainer: {
    height: 320,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isDark ? 'rgba(0,0,0,0.05)' : colors.primary[50],
    marginBottom: DesignSpacing.xl,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    // Add subtle glow
    shadowColor: colors.primary[400],
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 4,
  },
  cardTextContent: {
    paddingHorizontal: DesignSpacing.screenPadding * 1.5,
  },
  cardTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.neutral[900],
    textAlign: 'center',
    marginBottom: DesignSpacing.md,
    letterSpacing: -0.8,
  },
  cardDescription: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.neutral[700],
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: DesignSpacing.xxl,
  },
  ruralExampleBox: {
    backgroundColor: isDark ? 'rgba(46,174,91,0.1)' : colors.secondary[50],
    padding: DesignSpacing.xl,
    borderRadius: DesignRadius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondary[100],
  },
  ruralIcon: {
    fontSize: 32,
    marginRight: DesignSpacing.lg,
  },
  ruralTextInner: {
    flex: 1,
  },
  ruralTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.secondary[700],
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  ruralDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[900],
    lineHeight: 22,
  },

  runnerFooter: {
    padding: DesignSpacing.screenPadding,
    paddingBottom: DesignSpacing.xxxl,
    backgroundColor: colors.neutral[50],
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
  },
});
