/**
 * MARKET LAB - LEARNING MODE
 * Visual-first education before simulation
 */

import {
  DesignColors,
  DesignRadius,
  DesignSpacing,
  DesignTextStyles,
  MLButton,
  MLCard,
  MLHeader,
} from '@/components/design-system';
import { useStockLanguage } from '@/context/StockLanguageContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Svg, { Circle, G, Path, Rect, Text as SvgText } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 80;

// Learning sections data
export default function LearnModeScreen() {
  const router = useRouter();
  const { t, language } = useStockLanguage();
  const [currentSection, setCurrentSection] = useState(0);

  const SECTIONS = (t('learn.sections') as unknown) as any[];
  const isLastSection = currentSection === SECTIONS.length - 1;

  const handleNext = () => {
    if (isLastSection) {
      router.push('/stocks/stock-selection');
    } else {
      setCurrentSection(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentSection === 0) {
      router.back();
    } else {
      setCurrentSection(prev => prev - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MLHeader
        title={t('learn.title')}
        subtitle={t('learn.progress').replace('{current}', (currentSection + 1).toString()).replace('{total}', SECTIONS.length.toString())}
        variant="default"
        onLeftAction={handleBack}
      />

      {/* Progress */}
      <View style={styles.progressContainer}>
        {SECTIONS.map((_, i) => (
          <View
            key={i}
            style={[
              styles.progressDot,
              i <= currentSection && styles.progressDotActive,
            ]}
          />
        ))}
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>{SECTIONS[currentSection].icon}</Text>
          <Text style={styles.sectionTitle}>{SECTIONS[currentSection].title}</Text>
        </View>

        {/* Section Content */}
        {currentSection === 0 && <Section1WhatIsStock />}
        {currentSection === 1 && <Section2TradingVsInvesting />}
        {currentSection === 2 && <Section3HowPricesMove />}
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.actionSection}>
        <MLButton
          title={isLastSection ? t('learn.s3.startSim') : t('common.continue')}
          variant="primary"
          size="large"
          fullWidth
          onPress={handleNext}
        />
      </View>
    </SafeAreaView>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 1: WHAT IS A STOCK?
// ═══════════════════════════════════════════════════════════════════════════

const Section1WhatIsStock = () => {
  const { t } = useStockLanguage();
  return (
    <View style={styles.sectionContent}>
      {/* Visual: Company ownership */}
      <MLCard variant="glass">
        <Text style={styles.concept}>{t('learn.s1.concept')}</Text>
        <View style={styles.visualContainer}>
          <Svg width={CHART_WIDTH} height={160} viewBox="0 0 280 160">
            {/* Company Building */}
            <Rect x="90" y="20" width="100" height="80" rx="8" fill={DesignColors.neutral[300]} />
            <SvgText x="140" y="65" fill={DesignColors.neutral[600]} fontSize="12" textAnchor="middle">{t('learn.s1.company')}</SvgText>

            {/* Ownership pieces */}
            <G transform="translate(90, 105)">
              {[0, 1, 2, 3, 4].map(i => (
                <Rect key={i} x={i * 20} y="0" width="18" height="18" rx="2"
                  fill={i === 4 ? DesignColors.secondary[400] : DesignColors.neutral[400]} />
              ))}
            </G>
            <SvgText x="140" y="145" fill={DesignColors.neutral[500]} fontSize="10" textAnchor="middle">
              {t('learn.s1.pieces')}
            </SvgText>

            {/* Arrow to You */}
            <Path d="M195 114 L220 114" stroke={DesignColors.secondary[400]} strokeWidth="2" strokeDasharray="4" />
            <Circle cx="240" cy="114" r="16" fill={DesignColors.secondary[400]} opacity="0.2" stroke={DesignColors.secondary[400]} strokeWidth="2" />
            <SvgText x="240" y="118" fill={DesignColors.secondary[500]} fontSize="10" textAnchor="middle">{t('learn.s1.you')}</SvgText>
          </Svg>
        </View>
        <Text style={styles.insight}>{t('learn.s1.insight')}</Text>
      </MLCard>

      {/* Why prices move */}
      <MLCard variant="outlined">
        <Text style={styles.subHeading}>{t('learn.s1.qTitle')}</Text>
        <View style={styles.reasonsList}>
          {(t('learn.s1.reasons') as unknown as any[]).map((r, i) => (
            <ReasonItem key={i} emoji={['👥', '📰', '📊', '🌍'][i]} title={r.title} desc={r.desc} />
          ))}
        </View>
      </MLCard>

      {/* Key takeaway */}
      <View style={styles.takeaway}>
        <Text style={styles.takeawayIcon}>💡</Text>
        <Text style={styles.takeawayText}>{t('learn.s1.takeaway')}</Text>
      </View>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 2: TRADING VS INVESTING
// ═══════════════════════════════════════════════════════════════════════════

const Section2TradingVsInvesting = () => {
  const { t } = useStockLanguage();
  return (
    <View style={styles.sectionContent}>
      {/* Trading Card */}
      <MLCard variant="outlined" style={styles.comparisonCard}>
        <View style={styles.comparisonHeader}>
          <Text style={styles.comparisonEmoji}>⚡</Text>
          <Text style={[styles.comparisonTitle, { color: DesignColors.semantic.warning.main }]}>{t('learn.s2.trading')}</Text>
        </View>
        <View style={styles.visualContainer}>
          <Svg width={CHART_WIDTH} height={80} viewBox="0 0 280 80">
            {/* Zigzag volatile line */}
            <Path d="M20 50 L50 20 L80 60 L110 30 L140 55 L170 25 L200 50 L230 35 L260 45"
              fill="none" stroke={DesignColors.semantic.warning.main} strokeWidth="3" strokeLinecap="round" />
          </Svg>
        </View>
        <View style={styles.bulletList}>
          {(t('learn.s2.tTips') as unknown as string[]).map((tip, i) => (
            <BulletPoint key={i} text={tip} color={DesignColors.semantic.warning.main} />
          ))}
        </View>
        <View style={[styles.badge, { backgroundColor: 'rgba(255, 213, 79, 0.15)' }]}>
          <Text style={styles.badgeText}>⚠️ {t('learn.s2.tExpert')}</Text>
        </View>
      </MLCard>

      {/* VS Divider */}
      <View style={styles.vsDivider}>
        <View style={styles.vsLine} />
        <View style={styles.vsBadge}><Text style={styles.vsText}>VS</Text></View>
        <View style={styles.vsLine} />
      </View>

      {/* Investing Card */}
      <MLCard variant="glass" style={[styles.comparisonCard, { borderColor: DesignColors.secondary[400], borderWidth: 1 }]}>
        <View style={styles.comparisonHeader}>
          <Text style={styles.comparisonEmoji}>🌱</Text>
          <Text style={[styles.comparisonTitle, { color: DesignColors.secondary[500] }]}>{t('learn.s2.investing')}</Text>
        </View>
        <View style={styles.visualContainer}>
          <Svg width={CHART_WIDTH} height={80} viewBox="0 0 280 80">
            {/* Steady upward line */}
            <Path d="M20 65 L80 55 L140 45 L200 30 L260 15"
              fill="none" stroke={DesignColors.secondary[400]} strokeWidth="3" strokeLinecap="round" />
            {/* Fill area */}
            <Path d="M20 65 L80 55 L140 45 L200 30 L260 15 L260 70 L20 70 Z"
              fill={DesignColors.secondary[400]} opacity="0.1" />
          </Svg>
        </View>
        <View style={styles.bulletList}>
          {(t('learn.s2.iTips') as unknown as string[]).map((tip, i) => (
            <BulletPoint key={i} text={tip} color={DesignColors.secondary[500]} />
          ))}
        </View>
        <View style={[styles.badge, { backgroundColor: 'rgba(77, 182, 172, 0.15)' }]}>
          <Text style={styles.badgeText}>✓ {t('learn.s2.iBeginner')}</Text>
        </View>
      </MLCard>

      {/* Key takeaway */}
      <View style={styles.takeaway}>
        <Text style={styles.takeawayIcon}>⚖️</Text>
        <Text style={styles.takeawayText}>{t('learn.s2.takeaway')}</Text>
      </View>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 3: HOW PRICES MOVE
// ═══════════════════════════════════════════════════════════════════════════

const Section3HowPricesMove = () => {
  const { t } = useStockLanguage();
  return (
    <View style={styles.sectionContent}>
      {/* Price movements visual */}
      <MLCard variant="glass">
        <Text style={styles.subHeading}>{t('learn.s3.movements')}</Text>
        <View style={styles.movementGrid}>
          {/* Uptrend */}
          <View style={styles.movementCard}>
            <Svg width={80} height={50} viewBox="0 0 80 50">
              <Path d="M10 40 L40 25 L70 10" fill="none" stroke={DesignColors.secondary[400]} strokeWidth="3" strokeLinecap="round" />
            </Svg>
            <Text style={[styles.movementLabel, { color: DesignColors.secondary[500] }]}>📈 {t('learn.s3.rising')}</Text>
            <Text style={styles.movementDesc}>{t('learn.s3.risingDesc')}</Text>
          </View>

          {/* Downtrend */}
          <View style={styles.movementCard}>
            <Svg width={80} height={50} viewBox="0 0 80 50">
              <Path d="M10 10 L40 25 L70 40" fill="none" stroke={DesignColors.semantic.negative.main} strokeWidth="3" strokeLinecap="round" />
            </Svg>
            <Text style={[styles.movementLabel, { color: DesignColors.semantic.negative.main }]}>📉 {t('learn.s3.falling')}</Text>
            <Text style={styles.movementDesc}>{t('learn.s3.fallingDesc')}</Text>
          </View>

          {/* Sideways */}
          <View style={styles.movementCard}>
            <Svg width={80} height={50} viewBox="0 0 80 50">
              <Path d="M10 25 L25 20 L40 28 L55 22 L70 25" fill="none" stroke={DesignColors.neutral[500]} strokeWidth="3" strokeLinecap="round" />
            </Svg>
            <Text style={[styles.movementLabel, { color: DesignColors.neutral[600] }]}>↔️ {t('learn.s3.sideways')}</Text>
            <Text style={styles.movementDesc}>{t('learn.s3.sidewaysDesc')}</Text>
          </View>
        </View>
      </MLCard>

      {/* Volatility explanation */}
      <MLCard variant="outlined">
        <Text style={styles.subHeading}>{t('learn.s3.volatility')}</Text>
        <View style={styles.volatilityVisual}>
          <Svg width={CHART_WIDTH} height={100} viewBox="0 0 280 100">
            {/* Low volatility */}
            <SvgText x="70" y="15" fill={DesignColors.neutral[500]} fontSize="10" textAnchor="middle">{t('learn.s3.calm')}</SvgText>
            <Path d="M20 50 L40 45 L60 52 L80 48 L100 50 L120 47" fill="none" stroke={DesignColors.secondary[400]} strokeWidth="2" />

            {/* High volatility */}
            <SvgText x="210" y="15" fill={DesignColors.neutral[500]} fontSize="10" textAnchor="middle">{t('learn.s3.wild')}</SvgText>
            <Path d="M160 50 L180 20 L200 70 L220 30 L240 65 L260 40" fill="none" stroke={DesignColors.semantic.warning.main} strokeWidth="2" />

            {/* Labels */}
            <SvgText x="70" y="85" fill={DesignColors.secondary[500]} fontSize="11" textAnchor="middle">{t('learn.s3.lowV')}</SvgText>
            <SvgText x="210" y="85" fill={DesignColors.semantic.warning.main} fontSize="11" textAnchor="middle">{t('learn.s3.highV')}</SvgText>
          </Svg>
        </View>
        <Text style={styles.insight}>{t('learn.s3.vInsight')}</Text>
      </MLCard>

      {/* Key takeaway */}
      <View style={styles.takeaway}>
        <Text style={styles.takeawayIcon}>🎯</Text>
        <Text style={styles.takeawayText}>{t('learn.s3.takeaway')}</Text>
      </View>

      {/* Ready message */}
      <View style={styles.readyCard}>
        <Text style={styles.readyEmoji}>🎮</Text>
        <Text style={styles.readyTitle}>{t('learn.s3.ready')}</Text>
        <Text style={styles.readyDesc}>{t('learn.s3.readyDesc')}</Text>
      </View>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// HELPER COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

const ReasonItem = ({ emoji, title, desc }: { emoji: string; title: string; desc: string }) => (
  <View style={styles.reasonItem}>
    <Text style={styles.reasonEmoji}>{emoji}</Text>
    <View>
      <Text style={styles.reasonTitle}>{title}</Text>
      <Text style={styles.reasonDesc}>{desc}</Text>
    </View>
  </View>
);

const BulletPoint = ({ text, color }: { text: string; color: string }) => (
  <View style={styles.bulletItem}>
    <View style={[styles.bullet, { backgroundColor: color }]} />
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

// ═══════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DesignColors.neutral[50] },
  progressContainer: { flexDirection: 'row', justifyContent: 'center', paddingVertical: DesignSpacing.md, gap: 8 },
  progressDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: DesignColors.neutral[400] },
  progressDotActive: { backgroundColor: DesignColors.primary[500], width: 24 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: DesignSpacing.screenPadding, paddingBottom: 100 },
  sectionHeader: { alignItems: 'center', paddingVertical: DesignSpacing.xl },
  sectionIcon: { fontSize: 48, marginBottom: DesignSpacing.md },
  sectionTitle: { ...DesignTextStyles.headlineLarge, color: DesignColors.neutral[900] },
  sectionContent: { gap: DesignSpacing.lg },
  concept: { ...DesignTextStyles.titleLarge, color: DesignColors.neutral[900], textAlign: 'center', marginBottom: DesignSpacing.md },
  visualContainer: { alignItems: 'center', marginVertical: DesignSpacing.md },
  insight: { ...DesignTextStyles.bodyMedium, color: DesignColors.neutral[600], textAlign: 'center', marginTop: DesignSpacing.sm },
  subHeading: { ...DesignTextStyles.titleMedium, color: DesignColors.neutral[900], marginBottom: DesignSpacing.md },
  reasonsList: { gap: DesignSpacing.md },
  reasonItem: { flexDirection: 'row', alignItems: 'center' },
  reasonEmoji: { fontSize: 24, marginRight: DesignSpacing.md, width: 32 },
  reasonTitle: { ...DesignTextStyles.labelLarge, color: DesignColors.neutral[800] },
  reasonDesc: { ...DesignTextStyles.bodySmall, color: DesignColors.neutral[500] },
  takeaway: { flexDirection: 'row', alignItems: 'center', backgroundColor: DesignColors.primary[50], borderRadius: DesignRadius.lg, padding: DesignSpacing.lg, borderWidth: 1, borderColor: DesignColors.primary[200] },
  takeawayIcon: { fontSize: 24, marginRight: DesignSpacing.md },
  takeawayText: { ...DesignTextStyles.labelLarge, color: DesignColors.primary[600], flex: 1 },
  comparisonCard: {},
  comparisonHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: DesignSpacing.sm },
  comparisonEmoji: { fontSize: 24, marginRight: DesignSpacing.sm },
  comparisonTitle: { ...DesignTextStyles.titleMedium },
  bulletList: { gap: DesignSpacing.sm, marginBottom: DesignSpacing.md },
  bulletItem: { flexDirection: 'row', alignItems: 'center' },
  bullet: { width: 6, height: 6, borderRadius: 3, marginRight: DesignSpacing.sm },
  bulletText: { ...DesignTextStyles.bodyMedium, color: DesignColors.neutral[700] },
  badge: { alignSelf: 'flex-start', paddingHorizontal: DesignSpacing.md, paddingVertical: DesignSpacing.xs, borderRadius: DesignRadius.sm },
  badgeText: { ...DesignTextStyles.labelSmall, color: DesignColors.neutral[700] },
  vsDivider: { flexDirection: 'row', alignItems: 'center', paddingVertical: DesignSpacing.sm },
  vsLine: { flex: 1, height: 1, backgroundColor: DesignColors.neutral[300] },
  vsBadge: { width: 40, height: 40, borderRadius: 20, backgroundColor: DesignColors.neutral[200], justifyContent: 'center', alignItems: 'center', marginHorizontal: DesignSpacing.md },
  vsText: { ...DesignTextStyles.labelLarge, color: DesignColors.neutral[600] },
  movementGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: DesignSpacing.md },
  movementCard: { alignItems: 'center', flex: 1 },
  movementLabel: { ...DesignTextStyles.labelMedium, marginTop: DesignSpacing.xs },
  movementDesc: { ...DesignTextStyles.caption, color: DesignColors.neutral[500] },
  volatilityVisual: { alignItems: 'center', marginVertical: DesignSpacing.sm },
  readyCard: { alignItems: 'center', backgroundColor: DesignColors.secondary[50], borderRadius: DesignRadius.lg, padding: DesignSpacing.xl, borderWidth: 1, borderColor: DesignColors.secondary[200] },
  readyEmoji: { fontSize: 40, marginBottom: DesignSpacing.sm },
  readyTitle: { ...DesignTextStyles.titleLarge, color: DesignColors.secondary[600] },
  readyDesc: { ...DesignTextStyles.bodyMedium, color: DesignColors.neutral[600], marginTop: DesignSpacing.xs },
  actionSection: { paddingHorizontal: DesignSpacing.screenPadding, paddingVertical: DesignSpacing.lg, borderTopWidth: 1, borderTopColor: DesignColors.neutral[200] },
});
