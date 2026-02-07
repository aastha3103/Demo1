
/**
 * ═══════════════════════════════════════════════════════════════════════════
 * FINLEARN - LEARN HUB (EXPLORE)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * The main learning destination showing all 20 premium lessons.
 */

import {
  DesignRadius,
  DesignShadows,
  DesignSpacing,
  WBLButton,
  WBLCard,
  WBLEntrance
} from '@/components/mf_sip/design-system';
import { CATEGORIES, Lesson, LESSONS } from '@/constants/mf_sip/lesson-data';
import { useMFLanguage } from '@/context/MFLanguageContext';
import { useDesignTheme } from '@/hooks/mf_sip/use-design-theme';
import { getLessonProgress } from '@/utils/mf_sip/lessonProgress';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  Dimensions,
  FlatList,
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
// LESSON ITEM COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface LessonItemProps {
  lesson: Lesson;
  onPress: () => void;
  index: number;
  isCompleted: boolean;
}

const LessonItem: React.FC<LessonItemProps> = ({ lesson, onPress, index, isCompleted }) => {
  const { colors, isDark } = useDesignTheme();
  const { t } = useMFLanguage();
  const styles = createStyles(colors, isDark);

  return (
    <WBLEntrance delay={index * 30} direction="up">
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
      >
        <WBLCard variant={isCompleted ? "accent" : "default"} style={styles.lessonItemCard}>
          <View style={styles.lessonIconContainer}>
            <Text style={styles.lessonIcon}>{isCompleted ? '✅' : lesson.icon}</Text>
          </View>
          <View style={styles.lessonTextContainer}>
            <Text style={styles.lessonCategory}>{t(`home.categories.${lesson.category.toLowerCase()}`) || lesson.category}</Text>
            <Text style={styles.lessonTitle}>
              {t(`lessons.l${lesson.id}.title`).startsWith('lessons.') ? lesson.title : t(`lessons.l${lesson.id}.title`)}
            </Text>
            <Text style={styles.lessonShortDesc}>
              {isCompleted
                ? (t('home.completed') || 'Completed ✓')
                : (t(`lessons.l${lesson.id}.shortDesc`).startsWith('lessons.') ? lesson.shortDesc : t(`lessons.l${lesson.id}.shortDesc`))}
            </Text>
          </View>
          <Text style={styles.lessonArrow}>{isCompleted ? '↺' : '→'}</Text>
        </WBLCard>
      </TouchableOpacity>
    </WBLEntrance>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function ExploreScreen() {
  const router = useRouter();
  const { colors, isDark } = useDesignTheme();
  const { t } = useMFLanguage();
  const styles = createStyles(colors, isDark);

  const [activeCategory, setActiveCategory] = useState('All');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  // Load progress when screen is focused
  useFocusEffect(
    useCallback(() => {
      const loadProgress = async () => {
        const progress = await getLessonProgress();
        setCompletedLessons(progress.completedLessons);
      };
      loadProgress();
    }, [])
  );

  const filteredLessons = activeCategory === 'All'
    ? LESSONS
    : LESSONS.filter(l => l.category === activeCategory);

  const handleLessonPress = (lessonId: string) => {
    // Navigate to player and pass lessonId
    router.push({
      pathname: '/mf_sip/learn-mode',
      params: { lessonId }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.neutral[50]} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>{t('explore.title')}</Text>
          <Text style={styles.headerSubtitle}>{t('explore.subtitle')}</Text>
        </View>
        <View style={styles.progBadge}>
          <Text style={styles.progBadgeText}>{completedLessons.length}/20</Text>
        </View>
      </View>

      {/* Categories */}
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
              ]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Lesson List */}
      <FlatList
        data={filteredLessons}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <LessonItem
            lesson={item}
            index={index}
            isCompleted={completedLessons.includes(item.id)}
            onPress={() => handleLessonPress(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.topBanner}>
            <WBLCard variant="accent" style={styles.bannerCard}>
              <Text style={styles.bannerEmoji}>🌱</Text>
              <View style={styles.bannerText}>
                <Text style={styles.bannerTitle}>{t('explore.bannerTitle')}</Text>
                <Text style={styles.bannerDesc}>{t('explore.bannerDesc')}</Text>
              </View>
            </WBLCard>
          </View>
        }
        ListFooterComponent={
          <View style={styles.footerSpace}>
            <WBLButton
              title={t('explore.practiceButton')}
              variant="secondary"
              onPress={() => router.push('/mf_sip/simulator')}
              style={styles.simulationButton}
            />
            <View style={{ height: 120 }} />
          </View>
        }
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: DesignSpacing.screenPadding,
    paddingTop: DesignSpacing.xl,
    paddingBottom: DesignSpacing.md,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.neutral[900],
    letterSpacing: -1,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.neutral[700],
    fontWeight: '600',
  },
  progBadge: {
    backgroundColor: colors.primary[600],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: DesignRadius.round,
  },
  progBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  categoryContainer: {
    marginVertical: DesignSpacing.sm,
  },
  categoryScroll: {
    paddingHorizontal: DesignSpacing.screenPadding,
    paddingBottom: DesignSpacing.sm,
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
    color: colors.neutral[0],
  },

  listContent: {
    paddingHorizontal: DesignSpacing.screenPadding,
  },
  topBanner: {
    marginBottom: DesignSpacing.lg,
  },
  bannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: DesignSpacing.md,
  },
  bannerEmoji: {
    fontSize: 32,
    marginRight: DesignSpacing.md,
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary[900],
  },
  bannerDesc: {
    fontSize: 12,
    color: colors.neutral[700],
    fontWeight: '500',
  },

  lessonItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DesignSpacing.md,
    padding: DesignSpacing.md,
  },
  lessonIconContainer: {
    width: 60,
    height: 60,
    borderRadius: DesignRadius.md,
    backgroundColor: colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: DesignSpacing.md,
  },
  lessonIcon: {
    fontSize: 32,
  },
  lessonTextContainer: {
    flex: 1,
  },
  lessonCategory: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary[600],
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.neutral[900],
    marginBottom: 2,
  },
  lessonShortDesc: {
    fontSize: 12,
    color: colors.neutral[700],
    fontWeight: '500',
  },
  lessonArrow: {
    fontSize: 24,
    color: colors.neutral[300],
    marginLeft: DesignSpacing.sm,
  },
  footerSpace: {
    paddingVertical: DesignSpacing.xl,
  },
  simulationButton: {
    ...DesignShadows.lg,
  },
});
