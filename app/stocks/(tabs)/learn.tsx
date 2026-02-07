/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MARKET LAB - LEARN TAB
 * Educational content overview
 * ═══════════════════════════════════════════════════════════════════════════
 */

import {
  DesignColors,
  DesignSpacing,
  DesignTextStyles,
  MLButton,
  MLCard,
  MLLearningCard
} from '@/components/design-system';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function LearnTab() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={DesignColors.neutral[50]} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Learn</Text>
          <Text style={styles.subtitle}>Stock Market Education</Text>
        </View>

        {/* Progress Overview */}
        <MLCard variant="glass" style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Your Progress</Text>
            <Text style={styles.progressPercent}>60%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressBar, { width: '60%' }]} />
          </View>
          <Text style={styles.progressSubtext}>3 of 5 lessons completed</Text>
        </MLCard>

        {/* Learning Path */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 Learning Path</Text>

          <View style={styles.lessonsList}>
            <MLLearningCard
              type="lesson"
              title="What is a Stock?"
              subtitle="Understanding company ownership"
              duration="5 min"
              isCompleted={true}
              onPress={() => router.push('/stocks/learn-mode')}
            />

            <MLLearningCard
              type="concept"
              title="Reading Price Charts"
              subtitle="How to analyze stock movements"
              duration="8 min"
              isCompleted={true}
              onPress={() => router.push('/stocks/learn-mode')}
            />

            <MLLearningCard
              type="comparison"
              title="Trading vs Investing"
              subtitle="Know the key differences"
              duration="6 min"
              isCompleted={true}
              onPress={() => router.push('/stocks/learn-mode')}
            />

            <MLLearningCard
              type="simulation"
              title="Practice Trading"
              subtitle="Try the simulator with virtual money"
              duration="15 min"
              progress={60}
              onPress={() => router.push('/stocks/simulator')}
            />

            <MLLearningCard
              type="quiz"
              title="Knowledge Check"
              subtitle="Test what you've learned"
              duration="5 min"
              isLocked={true}
            />
          </View>
        </View>

        {/* Quick Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Quick Tips</Text>

          <MLCard variant="outlined">
            <Text style={styles.tipTitle}>📊 Charts show patterns</Text>
            <Text style={styles.tipText}>
              Look for trends over weeks and months, not minutes. Daily fluctuations are normal.
            </Text>
          </MLCard>
        </View>

        {/* CTA */}
        <MLButton
          title="Continue Learning"
          variant="primary"
          size="large"
          fullWidth
          onPress={() => router.push('/stocks/simulator')}
          style={styles.ctaButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DesignColors.neutral[50],
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: DesignSpacing.screenPadding,
    paddingBottom: DesignSpacing.huge,
  },
  header: {
    paddingTop: DesignSpacing.xl,
    paddingBottom: DesignSpacing.lg,
  },
  title: {
    ...DesignTextStyles.headlineLarge,
    color: DesignColors.neutral[900],
  },
  subtitle: {
    ...DesignTextStyles.bodyMedium,
    color: DesignColors.neutral[500],
    marginTop: 4,
  },
  progressCard: {
    marginBottom: DesignSpacing.xl,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DesignSpacing.sm,
  },
  progressTitle: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[600],
  },
  progressPercent: {
    ...DesignTextStyles.labelLarge,
    color: DesignColors.primary[500],
    fontWeight: '700',
  },
  progressTrack: {
    height: 8,
    backgroundColor: DesignColors.neutral[300],
    borderRadius: 4,
    marginBottom: DesignSpacing.sm,
  },
  progressBar: {
    height: '100%',
    backgroundColor: DesignColors.primary[500],
    borderRadius: 4,
  },
  progressSubtext: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
  },
  section: {
    marginBottom: DesignSpacing.xl,
  },
  sectionTitle: {
    ...DesignTextStyles.titleMedium,
    color: DesignColors.neutral[900],
    marginBottom: DesignSpacing.lg,
  },
  lessonsList: {
    gap: DesignSpacing.md,
  },
  tipTitle: {
    ...DesignTextStyles.labelLarge,
    color: DesignColors.neutral[800],
    marginBottom: DesignSpacing.xs,
  },
  tipText: {
    ...DesignTextStyles.bodySmall,
    color: DesignColors.neutral[600],
    lineHeight: 20,
  },
  ctaButton: {
    marginTop: DesignSpacing.lg,
  },
});
