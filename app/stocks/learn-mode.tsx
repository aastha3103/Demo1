/**
 * MARKET LAB - LEARNING MODE
 * Visual-first education before simulation
 * GREEN-WHITE THEME - Clean, minimalistic, accessible for rural users
 */

import { useStockLanguage } from '@/context/StockLanguageContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import Svg, { Circle, G, Path, Rect, Text as SvgText } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 80;

// ═══════════════════════════════════════════════════════════════════════════
// GREEN-WHITE THEME COLORS
// ═══════════════════════════════════════════════════════════════════════════
const COLORS = {
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  white: '#FFFFFF',
  text: '#1F2937',
  textLight: '#6B7280',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  purple: '#8B5CF6',
  teal: '#14B8A6',
};

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
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <Animated.View
        entering={FadeInDown.duration(400)}
        style={styles.header}
      >
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
          activeOpacity={0.8}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{t('learn.title')}</Text>
          <Text style={styles.headerSubtitle}>
            {t('learn.progress').replace('{current}', (currentSection + 1).toString()).replace('{total}', SECTIONS.length.toString())}
          </Text>
        </View>
        <View style={styles.headerRight} />
      </Animated.View>

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
        <Animated.View
          entering={FadeInUp.delay(100).duration(500)}
          style={styles.sectionHeader}
        >
          <View style={styles.sectionIconContainer}>
            <Text style={styles.sectionIcon}>{SECTIONS[currentSection].icon}</Text>
          </View>
          <Text style={styles.sectionTitle}>{SECTIONS[currentSection].title}</Text>
        </Animated.View>

        {/* Section Content */}
        {currentSection === 0 && <Section1WhatIsStock />}
        {currentSection === 1 && <Section2TradingVsInvesting />}
        {currentSection === 2 && <Section3HowPricesMove />}
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.actionSection}>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaButtonText}>
            {isLastSection ? t('learn.s3.startSim') : t('common.continue')}
          </Text>
          <Text style={styles.ctaArrow}>→</Text>
        </TouchableOpacity>
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
    <Animated.View
      entering={FadeInUp.delay(200).duration(500)}
      style={styles.sectionContent}
    >
      {/* Visual: Company ownership */}
      <View style={styles.card}>
        <Text style={styles.concept}>{t('learn.s1.concept')}</Text>
        <View style={styles.visualContainer}>
          <Svg width={CHART_WIDTH} height={160} viewBox="0 0 280 160">
            {/* Company Building */}
            <Rect x="90" y="20" width="100" height="80" rx="8" fill={COLORS.green[200]} />
            <SvgText x="140" y="65" fill={COLORS.green[800]} fontSize="12" textAnchor="middle">{t('learn.s1.company')}</SvgText>

            {/* Ownership pieces */}
            <G transform="translate(90, 105)">
              {[0, 1, 2, 3, 4].map(i => (
                <Rect key={i} x={i * 20} y="0" width="18" height="18" rx="2"
                  fill={i === 4 ? COLORS.green[500] : COLORS.green[300]} />
              ))}
            </G>
            <SvgText x="140" y="145" fill={COLORS.textLight} fontSize="10" textAnchor="middle">
              {t('learn.s1.pieces')}
            </SvgText>

            {/* Arrow to You */}
            <Path d="M195 114 L220 114" stroke={COLORS.green[500]} strokeWidth="2" strokeDasharray="4" />
            <Circle cx="240" cy="114" r="16" fill={COLORS.green[100]} stroke={COLORS.green[500]} strokeWidth="2" />
            <SvgText x="240" y="118" fill={COLORS.green[700]} fontSize="10" textAnchor="middle">{t('learn.s1.you')}</SvgText>
          </Svg>
        </View>
        <Text style={styles.insight}>{t('learn.s1.insight')}</Text>
      </View>

      {/* Why prices move */}
      <View style={styles.cardOutlined}>
        <Text style={styles.subHeading}>{t('learn.s1.qTitle')}</Text>
        <View style={styles.reasonsList}>
          {(t('learn.s1.reasons') as unknown as any[]).map((r, i) => (
            <ReasonItem key={i} emoji={['👥', '📰', '📊', '🌍'][i]} title={r.title} desc={r.desc} />
          ))}
        </View>
      </View>

      {/* Key takeaway */}
      <View style={styles.takeaway}>
        <Text style={styles.takeawayIcon}>💡</Text>
        <Text style={styles.takeawayText}>{t('learn.s1.takeaway')}</Text>
      </View>
    </Animated.View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 2: TRADING VS INVESTING
// ═══════════════════════════════════════════════════════════════════════════

const Section2TradingVsInvesting = () => {
  const { t } = useStockLanguage();
  return (
    <Animated.View
      entering={FadeInUp.delay(200).duration(500)}
      style={styles.sectionContent}
    >
      {/* Trading Card */}
      <View style={styles.cardWarning}>
        <View style={styles.comparisonHeader}>
          <Text style={styles.comparisonEmoji}>⚡</Text>
          <Text style={[styles.comparisonTitle, { color: COLORS.warning }]}>{t('learn.s2.trading')}</Text>
        </View>
        <View style={styles.visualContainer}>
          <Svg width={CHART_WIDTH} height={80} viewBox="0 0 280 80">
            {/* Zigzag volatile line */}
            <Path d="M20 50 L50 20 L80 60 L110 30 L140 55 L170 25 L200 50 L230 35 L260 45"
              fill="none" stroke={COLORS.warning} strokeWidth="3" strokeLinecap="round" />
          </Svg>
        </View>
        <View style={styles.bulletList}>
          {(t('learn.s2.tTips') as unknown as string[]).map((tip, i) => (
            <BulletPoint key={i} text={tip} color={COLORS.warning} />
          ))}
        </View>
        <View style={[styles.badge, { backgroundColor: COLORS.warningLight }]}>
          <Text style={styles.badgeText}>⚠️ {t('learn.s2.tExpert')}</Text>
        </View>
      </View>

      {/* VS Divider */}
      <View style={styles.vsDivider}>
        <View style={styles.vsLine} />
        <View style={styles.vsBadge}><Text style={styles.vsText}>VS</Text></View>
        <View style={styles.vsLine} />
      </View>

      {/* Investing Card */}
      <View style={styles.cardSuccess}>
        <View style={styles.comparisonHeader}>
          <Text style={styles.comparisonEmoji}>🌱</Text>
          <Text style={[styles.comparisonTitle, { color: COLORS.green[600] }]}>{t('learn.s2.investing')}</Text>
        </View>
        <View style={styles.visualContainer}>
          <Svg width={CHART_WIDTH} height={80} viewBox="0 0 280 80">
            {/* Steady upward line */}
            <Path d="M20 65 L80 55 L140 45 L200 30 L260 15"
              fill="none" stroke={COLORS.green[500]} strokeWidth="3" strokeLinecap="round" />
            {/* Fill area */}
            <Path d="M20 65 L80 55 L140 45 L200 30 L260 15 L260 70 L20 70 Z"
              fill={COLORS.green[500]} opacity="0.15" />
          </Svg>
        </View>
        <View style={styles.bulletList}>
          {(t('learn.s2.iTips') as unknown as string[]).map((tip, i) => (
            <BulletPoint key={i} text={tip} color={COLORS.green[600]} />
          ))}
        </View>
        <View style={[styles.badge, { backgroundColor: COLORS.green[100] }]}>
          <Text style={[styles.badgeText, { color: COLORS.green[700] }]}>✓ {t('learn.s2.iBeginner')}</Text>
        </View>
      </View>

      {/* Key takeaway */}
      <View style={styles.takeaway}>
        <Text style={styles.takeawayIcon}>⚖️</Text>
        <Text style={styles.takeawayText}>{t('learn.s2.takeaway')}</Text>
      </View>
    </Animated.View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 3: HOW PRICES MOVE
// ═══════════════════════════════════════════════════════════════════════════

const Section3HowPricesMove = () => {
  const { t } = useStockLanguage();
  return (
    <Animated.View
      entering={FadeInUp.delay(200).duration(500)}
      style={styles.sectionContent}
    >
      {/* Price movements visual */}
      <View style={styles.card}>
        <Text style={styles.subHeading}>{t('learn.s3.movements')}</Text>
        <View style={styles.movementGrid}>
          {/* Uptrend */}
          <View style={styles.movementCard}>
            <View style={styles.movementChartBg}>
              <Svg width={70} height={45} viewBox="0 0 80 50">
                <Path d="M10 40 L40 25 L70 10" fill="none" stroke={COLORS.green[500]} strokeWidth="3" strokeLinecap="round" />
              </Svg>
            </View>
            <Text style={[styles.movementLabel, { color: COLORS.green[600] }]}>📈 {t('learn.s3.rising')}</Text>
            <Text style={styles.movementDesc}>{t('learn.s3.risingDesc')}</Text>
          </View>

          {/* Downtrend */}
          <View style={styles.movementCard}>
            <View style={[styles.movementChartBg, { backgroundColor: COLORS.dangerLight }]}>
              <Svg width={70} height={45} viewBox="0 0 80 50">
                <Path d="M10 10 L40 25 L70 40" fill="none" stroke={COLORS.danger} strokeWidth="3" strokeLinecap="round" />
              </Svg>
            </View>
            <Text style={[styles.movementLabel, { color: COLORS.danger }]}>📉 {t('learn.s3.falling')}</Text>
            <Text style={styles.movementDesc}>{t('learn.s3.fallingDesc')}</Text>
          </View>

          {/* Sideways */}
          <View style={styles.movementCard}>
            <View style={[styles.movementChartBg, { backgroundColor: '#F3F4F6' }]}>
              <Svg width={70} height={45} viewBox="0 0 80 50">
                <Path d="M10 25 L25 20 L40 28 L55 22 L70 25" fill="none" stroke={COLORS.textLight} strokeWidth="3" strokeLinecap="round" />
              </Svg>
            </View>
            <Text style={[styles.movementLabel, { color: COLORS.textLight }]}>↔️ {t('learn.s3.sideways')}</Text>
            <Text style={styles.movementDesc}>{t('learn.s3.sidewaysDesc')}</Text>
          </View>
        </View>
      </View>

      {/* Volatility explanation */}
      <View style={styles.cardOutlined}>
        <Text style={styles.subHeading}>{t('learn.s3.volatility')}</Text>
        <View style={styles.volatilityVisual}>
          <Svg width={CHART_WIDTH} height={100} viewBox="0 0 280 100">
            {/* Low volatility */}
            <SvgText x="70" y="15" fill={COLORS.textLight} fontSize="10" textAnchor="middle">{t('learn.s3.calm')}</SvgText>
            <Path d="M20 50 L40 45 L60 52 L80 48 L100 50 L120 47" fill="none" stroke={COLORS.green[500]} strokeWidth="2" />

            {/* High volatility */}
            <SvgText x="210" y="15" fill={COLORS.textLight} fontSize="10" textAnchor="middle">{t('learn.s3.wild')}</SvgText>
            <Path d="M160 50 L180 20 L200 70 L220 30 L240 65 L260 40" fill="none" stroke={COLORS.warning} strokeWidth="2" />

            {/* Labels */}
            <SvgText x="70" y="85" fill={COLORS.green[600]} fontSize="11" textAnchor="middle">{t('learn.s3.lowV')}</SvgText>
            <SvgText x="210" y="85" fill={COLORS.warning} fontSize="11" textAnchor="middle">{t('learn.s3.highV')}</SvgText>
          </Svg>
        </View>
        <Text style={styles.insight}>{t('learn.s3.vInsight')}</Text>
      </View>

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
    </Animated.View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// HELPER COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

const ReasonItem = ({ emoji, title, desc }: { emoji: string; title: string; desc: string }) => (
  <View style={styles.reasonItem}>
    <View style={styles.reasonEmojiContainer}>
      <Text style={styles.reasonEmoji}>{emoji}</Text>
    </View>
    <View style={styles.reasonContent}>
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
// STYLES - Green-White Theme
// ═══════════════════════════════════════════════════════════════════════════

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.green[100],
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.green[50],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.green[200],
  },
  backArrow: {
    color: COLORS.green[700],
    fontSize: 24,
    fontWeight: '700',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.green[800],
    fontSize: 20,
    fontWeight: '800',
  },
  headerSubtitle: {
    color: COLORS.textLight,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  headerRight: {
    width: 44,
  },

  // Progress
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
    backgroundColor: COLORS.green[50],
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.green[200]
  },
  progressDotActive: {
    backgroundColor: COLORS.green[600],
    width: 32,
    borderRadius: 5,
  },

  // Scroll
  scrollView: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120
  },

  // Section Header
  sectionHeader: {
    alignItems: 'center',
    paddingVertical: 24
  },
  sectionIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.green[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: COLORS.green[200],
  },
  sectionIcon: {
    fontSize: 40,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.green[800],
    textAlign: 'center',
  },
  sectionContent: {
    gap: 20
  },

  // Cards
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.green[100],
    shadowColor: COLORS.green[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardOutlined: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.green[200],
  },
  cardWarning: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.warning,
  },
  cardSuccess: {
    backgroundColor: COLORS.green[50],
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.green[400],
  },

  // Content styles
  concept: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 16
  },
  visualContainer: {
    alignItems: 'center',
    marginVertical: 12
  },
  insight: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 20,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 16
  },

  // Reasons list
  reasonsList: {
    gap: 16
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  reasonEmojiContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.green[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  reasonEmoji: {
    fontSize: 22,
  },
  reasonContent: {
    flex: 1,
  },
  reasonTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  reasonDesc: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textLight,
    marginTop: 2,
  },

  // Takeaway
  takeaway: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.green[50],
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.green[200]
  },
  takeawayIcon: {
    fontSize: 28,
    marginRight: 16
  },
  takeawayText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.green[700],
    flex: 1,
    lineHeight: 22,
  },

  // Comparison
  comparisonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  comparisonEmoji: {
    fontSize: 28,
    marginRight: 12
  },
  comparisonTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  bulletList: {
    gap: 10,
    marginBottom: 16
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12
  },
  bulletText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
  },

  // VS Divider
  vsDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8
  },
  vsLine: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.green[200]
  },
  vsBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.green[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    borderWidth: 2,
    borderColor: COLORS.green[300],
  },
  vsText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.green[700],
  },

  // Movement Grid
  movementGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 8,
  },
  movementCard: {
    alignItems: 'center',
    flex: 1
  },
  movementChartBg: {
    backgroundColor: COLORS.green[50],
    borderRadius: 12,
    padding: 8,
    marginBottom: 8,
  },
  movementLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
  movementDesc: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.textLight,
    textAlign: 'center',
  },
  volatilityVisual: {
    alignItems: 'center',
    marginVertical: 8
  },

  // Ready Card
  readyCard: {
    alignItems: 'center',
    backgroundColor: COLORS.green[50],
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: COLORS.green[300]
  },
  readyEmoji: {
    fontSize: 48,
    marginBottom: 12
  },
  readyTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.green[700],
  },
  readyDesc: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textLight,
    marginTop: 8,
    textAlign: 'center',
  },

  // Action Section
  actionSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 2,
    borderTopColor: COLORS.green[100],
    backgroundColor: COLORS.white,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.green[600],
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: '100%',
    shadowColor: COLORS.green[900],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
    gap: 8,
  },
  ctaButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
  },
  ctaArrow: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '800',
  },
});

