/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MARKET LAB - CHART VIEW SCREEN
 * Educational stock chart reading experience
 * ═══════════════════════════════════════════════════════════════════════════
 */

import {
  DesignColors,
  DesignRadius,
  DesignSpacing,
  DesignTextStyles,
  MLButton,
  MLCard,
  MLHeader,
  MLInfoBox,
} from '@/components/design-system';
import { MLEducationalChart } from '@/components/design-system/MLEducationalChart';
import { useStockLanguage } from '@/context/StockLanguageContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRewards } from '../../context/RewardContext';

export default function ChartViewScreen() {
  const router = useRouter();
  const { t } = useStockLanguage();
  const { completeTask } = useRewards();
  const params = useLocalSearchParams();

  useEffect(() => {
    // Complete 'Chart Analyst' task
    completeTask('stocks_chart');
  }, []);

  const stockSymbol = (params.stock as string) || 'TCS';

  return (
    <SafeAreaView style={styles.container}>
      <MLHeader
        title={t('charts.title')}
        subtitle={stockSymbol}
        variant="default"
        onLeftAction={() => router.back()}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Educational Intro */}
        <MLInfoBox
          variant="learn"
          icon="📊"
          title={t('charts.intro.title')}
          message={t('charts.intro.message')}
        />

        {/* Main Educational Chart */}
        <MLEducationalChart stockSymbol={stockSymbol} />

        {/* Quick Reference Card */}
        <MLCard variant="outlined">
          <Text style={styles.refTitle}>{t('charts.quickRef')}</Text>

          <View style={styles.refGrid}>
            <View style={styles.refItem}>
              <View style={[styles.refIcon, { backgroundColor: `${DesignColors.secondary[400]}20` }]}>
                <Text style={styles.refEmoji}>📈</Text>
              </View>
              <Text style={styles.refLabel}>{t('charts.rising')}</Text>
              <Text style={styles.refDesc}>{t('charts.risingDesc')}</Text>
            </View>

            <View style={styles.refItem}>
              <View style={[styles.refIcon, { backgroundColor: `${DesignColors.semantic.negative.main}20` }]}>
                <Text style={styles.refEmoji}>📉</Text>
              </View>
              <Text style={styles.refLabel}>{t('charts.falling')}</Text>
              <Text style={styles.refDesc}>{t('charts.fallingDesc')}</Text>
            </View>

            <View style={styles.refItem}>
              <View style={[styles.refIcon, { backgroundColor: `${DesignColors.neutral[400]}20` }]}>
                <Text style={styles.refEmoji}>↔️</Text>
              </View>
              <Text style={styles.refLabel}>{t('charts.sideways')}</Text>
              <Text style={styles.refDesc}>{t('charts.sidewaysDesc')}</Text>
            </View>

            <View style={styles.refItem}>
              <View style={[styles.refIcon, { backgroundColor: `${DesignColors.semantic.warning.main}20` }]}>
                <Text style={styles.refEmoji}>⚡</Text>
              </View>
              <Text style={styles.refLabel}>{t('charts.volatile')}</Text>
              <Text style={styles.refDesc}>{t('charts.volatileDesc')}</Text>
            </View>
          </View>
        </MLCard>

        {/* Key Insight */}
        <View style={styles.insight}>
          <Text style={styles.insightIcon}>🎯</Text>
          <Text style={styles.insightText}>
            {t('charts.insight')}
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.actionSection}>
        <MLButton
          title={t('charts.startPractice')}
          variant="primary"
          size="large"
          fullWidth
          onPress={() => router.push({ pathname: '/stocks/simulator', params: { stock: stockSymbol } })}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DesignColors.neutral[50] },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: DesignSpacing.screenPadding, paddingBottom: 100, gap: DesignSpacing.lg },

  // Reference Card
  refTitle: { ...DesignTextStyles.labelLarge, color: DesignColors.neutral[800], marginBottom: DesignSpacing.md },
  refGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  refItem: { alignItems: 'center', flex: 1 },
  refIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  refEmoji: { fontSize: 20 },
  refLabel: { ...DesignTextStyles.labelSmall, color: DesignColors.neutral[800] },
  refDesc: { ...DesignTextStyles.caption, color: DesignColors.neutral[500] },

  // Insight
  insight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DesignColors.primary[50],
    borderRadius: DesignRadius.lg,
    padding: DesignSpacing.lg,
    borderWidth: 1,
    borderColor: DesignColors.primary[200],
  },
  insightIcon: { fontSize: 24, marginRight: DesignSpacing.md },
  insightText: { ...DesignTextStyles.bodyMedium, color: DesignColors.primary[600], flex: 1 },

  // Action
  actionSection: {
    paddingHorizontal: DesignSpacing.screenPadding,
    paddingVertical: DesignSpacing.lg,
    borderTopWidth: 1,
    borderTopColor: DesignColors.neutral[200],
  },
});
