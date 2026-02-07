
/**
 * ═══════════════════════════════════════════════════════════════════════════
 * FINLEARN - HOME SCREEN (LEARN HUB)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * The main entry point for FinLearn app.
 * Shows all 20 premium learning lessons directly for easy access.
 */

import {
  DesignRadius,
  DesignSpacing,
  DesignTextStyles,
  WBLCard,
  WBLEntrance,
  WBLProgressBar
} from '@/components/mf_sip/design-system';
import { CATEGORIES, Lesson, LESSONS } from '@/constants/mf_sip/lesson-data';
import { useMFLanguage } from '@/context/MFLanguageContext';
import { useDesignTheme } from '@/hooks/mf_sip/use-design-theme';
import { getLessonProgress } from '@/utils/mf_sip/lessonProgress';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ═══════════════════════════════════════════════════════════════════════════
// LESSON CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface LessonCardProps {
  lesson: Lesson;
  onPress: () => void;
  index: number;
  isCompleted: boolean;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, onPress, index, isCompleted }) => {
  const { colors, isDark } = useDesignTheme();
  const { t } = useMFLanguage();
  const styles = createStyles(colors, isDark);

  return (
    <WBLEntrance delay={index * 20} direction="up">
      <TouchableOpacity
        style={[styles.moduleCard, isCompleted && styles.moduleCardCompleted]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {/* Icon Section */}
        <View style={[styles.moduleIconContainer, isCompleted && styles.moduleIconCompleted]}>
          <Text style={styles.moduleIcon}>{isCompleted ? '✅' : lesson.icon}</Text>
        </View>

        {/* Content Section */}
        <View style={styles.moduleContent}>
          <Text style={styles.moduleCategory}>{t(`home.categories.${lesson.category.toLowerCase()}`)}</Text>
          <Text style={styles.moduleTitle}>
            {t(`lessons.l${lesson.id}.title`).startsWith('lessons.') ? lesson.title : t(`lessons.l${lesson.id}.title`)}
          </Text>
          <Text style={styles.moduleDescription} numberOfLines={2}>
            {t(`lessons.l${lesson.id}.shortDesc`).startsWith('lessons.') ? lesson.shortDesc : t(`lessons.l${lesson.id}.shortDesc`)}
          </Text>

          <View style={styles.progressSection}>
            <WBLProgressBar
              progress={isCompleted ? 100 : 0}
              variant="primary"
              size="small"
            />
            <Text style={styles.lessonsText}>
              {isCompleted
                ? t('home.completed') || 'Completed ✓'
                : t('home.cardsInLesson').replace('{count}', lesson.cards.length.toString())}
            </Text>
          </View>
        </View>

        {/* Arrow */}
        <View style={styles.moduleArrow}>
          <Text style={styles.arrowText}>{isCompleted ? '↺' : '→'}</Text>
        </View>
      </TouchableOpacity>
    </WBLEntrance>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function HomeScreen() {
  const { colors, isDark } = useDesignTheme();
  const { t } = useMFLanguage();
  const styles = createStyles(colors, isDark);
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState('All');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);

  // Load progress when screen is focused
  useFocusEffect(
    useCallback(() => {
      const loadProgress = async () => {
        const progress = await getLessonProgress();
        setCompletedLessons(progress.completedLessons);
        const progressPercent = Math.round((progress.completedLessons.length / LESSONS.length) * 100);
        setOverallProgress(progressPercent);
      };
      loadProgress();
    }, [])
  );

  const filteredLessons = activeCategory === 'All'
    ? LESSONS
    : LESSONS.filter(l => l.category === activeCategory);

  const handleLessonPress = (lessonId: string) => {
    router.push({
      pathname: '/mf_sip/learn-mode',
      params: { lessonId }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.primary[600]} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>{t('home.greeting')}</Text>
              <Text style={styles.headerTitle}>{t('home.title')}</Text>
            </View>
            <View style={styles.streakBadge}>
              <Text style={styles.streakEmoji}>✨</Text>
              <Text style={styles.streakText}>{t('common.premium')}</Text>
            </View>
          </View>

          <View style={styles.progressCard}>
            <View style={styles.progressCardHeader}>
              <Text style={styles.progressCardTitle}>{t('home.overallProgress')}</Text>
              <Text style={styles.progressCardPercent}>{overallProgress}%</Text>
            </View>
            <WBLProgressBar
              progress={overallProgress}
              variant="primary"
              size="medium"
            />
            <Text style={styles.progressCardSubtext}>
              {t('home.lessonsMastered').replace('{current}', completedLessons.length.toString()).replace('{total}', LESSONS.length.toString())}
            </Text>
          </View>
        </View>

        {/* Categories (Moved to main view for quick access) */}
        <View style={styles.categoryContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat}
                onPress={() => setActiveCategory(cat)}
                style={[
                  styles.categoryChip,
                  activeCategory === cat && styles.categoryChipActive
                ]}
              >
                <Text style={[
                  styles.categoryText,
                  activeCategory === cat && styles.categoryTextActive
                ]}>{t(`home.categories.${cat.toLowerCase()}`)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Lessons Section */}
        <View style={styles.modulesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('home.lessonHeader').replace('{category}', t(`home.categories.${activeCategory.toLowerCase()}`))}</Text>
            <Text style={styles.lessonCount}>{t('home.available').replace('{count}', filteredLessons.length.toString())}</Text>
          </View>

          <View style={styles.modulesList}>
            {filteredLessons.map((lesson, index) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                index={index}
                isCompleted={completedLessons.includes(lesson.id)}
                onPress={() => handleLessonPress(lesson.id)}
              />
            ))}
          </View>
        </View>

        {/* Quick Action Simulator Banner */}
        <View style={styles.tipSection}>
          <TouchableOpacity onPress={() => router.push('/mf_sip/simulator')}>
            <WBLCard variant="accent">
              <View style={styles.tipContent}>
                <Text style={styles.tipEmoji}>🚀</Text>
                <View style={styles.tipTextContainer}>
                  <Text style={styles.tipTitle}>{t('home.practiceTitle')}</Text>
                  <Text style={styles.tipText}>
                    {t('home.practiceText')}
                  </Text>
                </View>
              </View>
            </WBLCard>
          </TouchableOpacity>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 120 }} />
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: DesignSpacing.massive,
  },

  header: {
    backgroundColor: colors.primary[600],
    paddingHorizontal: DesignSpacing.screenPadding,
    paddingTop: DesignSpacing.xl,
    paddingBottom: DesignSpacing.xxl,
    borderBottomLeftRadius: DesignRadius.card,
    borderBottomRightRadius: DesignRadius.card,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: DesignSpacing.xl,
  },
  greeting: {
    ...DesignTextStyles.bodyMedium,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: DesignSpacing.xs,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: DesignSpacing.md,
    paddingVertical: DesignSpacing.sm,
    borderRadius: DesignRadius.round,
  },
  streakEmoji: {
    fontSize: 16,
    marginRight: DesignSpacing.xs,
  },
  streakText: {
    ...DesignTextStyles.labelSmall,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  progressCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: DesignRadius.card,
    padding: DesignSpacing.lg,
  },
  progressCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DesignSpacing.md,
  },
  progressCardTitle: {
    ...DesignTextStyles.labelMedium,
    color: 'rgba(255,255,255,0.9)',
  },
  progressCardPercent: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  progressCardSubtext: {
    ...DesignTextStyles.caption,
    color: 'rgba(255,255,255,0.7)',
    marginTop: DesignSpacing.sm,
  },

  categoryContainer: {
    marginTop: DesignSpacing.md,
    marginBottom: DesignSpacing.sm,
  },
  categoryScroll: {
    paddingHorizontal: DesignSpacing.screenPadding,
  },
  categoryChip: {
    paddingHorizontal: DesignSpacing.lg,
    paddingVertical: DesignSpacing.sm,
    backgroundColor: colors.neutral[100],
    borderRadius: DesignRadius.round,
    marginRight: DesignSpacing.sm,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  categoryChipActive: {
    backgroundColor: colors.primary[600],
    borderColor: colors.primary[600],
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[700],
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },

  modulesSection: {
    paddingHorizontal: DesignSpacing.screenPadding,
    marginTop: DesignSpacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: DesignSpacing.md,
  },
  sectionTitle: {
    ...DesignTextStyles.headlineSmall,
    color: colors.neutral[800],
    fontWeight: '800',
  },
  lessonCount: {
    ...DesignTextStyles.caption,
    color: colors.neutral[500],
    fontWeight: '600',
  },
  modulesList: {
    gap: DesignSpacing.md,
  },
  moduleCard: {
    flexDirection: 'row',
    backgroundColor: colors.neutral[0],
    borderRadius: DesignRadius.card,
    padding: DesignSpacing.lg,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  moduleIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: DesignSpacing.md,
  },
  moduleIcon: {
    fontSize: 32,
  },
  moduleIconCompleted: {
    backgroundColor: colors.accent[100],
  },
  moduleContent: {
    flex: 1,
  },
  moduleCategory: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary[600],
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  moduleTitle: {
    ...DesignTextStyles.titleMedium,
    fontWeight: '800',
    color: colors.neutral[900],
    marginBottom: 4,
  },
  moduleCardCompleted: {
    borderColor: colors.accent[200],
    backgroundColor: colors.accent[50],
  },
  moduleDescription: {
    ...DesignTextStyles.bodySmall,
    color: colors.neutral[600],
    marginBottom: DesignSpacing.sm,
    lineHeight: 18,
  },
  progressSection: {
    marginTop: DesignSpacing.xs,
  },
  lessonsText: {
    ...DesignTextStyles.caption,
    color: colors.neutral[500],
    marginTop: DesignSpacing.xs,
    fontSize: 11,
    fontWeight: '600',
  },
  moduleArrow: {
    justifyContent: 'center',
    paddingLeft: DesignSpacing.md,
  },
  arrowText: {
    fontSize: 20,
    color: colors.neutral[300],
    fontWeight: '800',
  },

  tipSection: {
    paddingHorizontal: DesignSpacing.screenPadding,
    marginTop: DesignSpacing.xxl,
  },
  tipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: DesignSpacing.sm,
  },
  tipEmoji: {
    fontSize: 32,
    marginRight: DesignSpacing.lg,
  },
  tipTextContainer: {
    flex: 1,
  },
  tipTitle: {
    ...DesignTextStyles.labelMedium,
    color: colors.primary[800],
    fontWeight: '800',
    marginBottom: 2,
  },
  tipText: {
    ...DesignTextStyles.bodySmall,
    color: colors.neutral[700],
    lineHeight: 18,
  },
});
