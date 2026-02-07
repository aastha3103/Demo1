/**
 * MARKET LAB - STOCK SELECTION SCREEN
 * Choose a stock to practice with
 * GREEN-WHITE THEME - Clean, minimalistic, accessible for rural users
 */

import { useStockLanguage } from '@/context/StockLanguageContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

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
  teal: '#14B8A6',
};

// Stock data organized by market cap
const STOCK_DATA = {
  largeCap: {
    title: 'Large-Cap Stocks',
    subtitle: 'Stable, established companies',
    riskLevel: 'Low',
    riskColor: COLORS.green[600],
    icon: '🏛️',
    stocks: [
      { symbol: 'RELIANCE', name: 'Reliance Industries', sector: 'Energy', volatility: 'Low' },
      { symbol: 'TCS', name: 'Tata Consultancy', sector: 'IT Services', volatility: 'Low' },
      { symbol: 'HDFCBANK', name: 'HDFC Bank', sector: 'Banking', volatility: 'Low' },
      { symbol: 'INFY', name: 'Infosys', sector: 'IT Services', volatility: 'Low' },
    ],
  },
  midCap: {
    title: 'Mid-Cap Stocks',
    subtitle: 'Growing companies with potential',
    riskLevel: 'Medium',
    riskColor: COLORS.warning,
    icon: '📈',
    stocks: [
      { symbol: 'VOLTAS', name: 'Voltas Ltd', sector: 'Consumer', volatility: 'Medium' },
      { symbol: 'MPHASIS', name: 'Mphasis Ltd', sector: 'IT Services', volatility: 'Medium' },
      { symbol: 'COFORGE', name: 'Coforge Ltd', sector: 'IT Services', volatility: 'Medium' },
    ],
  },
  smallCap: {
    title: 'Small-Cap Stocks',
    subtitle: 'Newer, riskier investments',
    riskLevel: 'High',
    riskColor: COLORS.danger,
    icon: '🚀',
    stocks: [
      { symbol: 'ROUTE', name: 'Route Mobile', sector: 'Telecom', volatility: 'High' },
      { symbol: 'NAZARA', name: 'Nazara Technologies', sector: 'Gaming', volatility: 'High' },
    ],
  },
};

type StockCategory = 'largeCap' | 'midCap' | 'smallCap';

export default function StockSelectionScreen() {
  const router = useRouter();
  const { t } = useStockLanguage();
  const [selectedCategory, setSelectedCategory] = useState<StockCategory>('largeCap');
  const [selectedStock, setSelectedStock] = useState<string | null>(null);

  const handleStockSelect = (symbol: string) => {
    setSelectedStock(symbol === selectedStock ? null : symbol);
  };

  const handleContinue = () => {
    if (selectedStock) {
      router.push({
        pathname: '/stocks/chart-view',
        params: { stock: selectedStock, category: selectedCategory },
      });
    }
  };

  const categoryData = STOCK_DATA[selectedCategory];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <Animated.View
        entering={FadeInDown.duration(400)}
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.8}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{t('selection.title')}</Text>
          <Text style={styles.headerSubtitle}>{t('selection.subtitle')}</Text>
        </View>
        <View style={styles.headerRight} />
      </Animated.View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Educational Tip */}
        <Animated.View
          entering={FadeInUp.delay(100).duration(500)}
          style={styles.tipCard}
        >
          <View style={styles.tipIconContainer}>
            <Text style={styles.tipIcon}>🎓</Text>
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>{t('selection.tip.title')}</Text>
            <Text style={styles.tipMessage}>{t('selection.tip.message')}</Text>
          </View>
        </Animated.View>

        {/* Category Tabs */}
        <Animated.View
          entering={FadeInUp.delay(200).duration(500)}
          style={styles.categoryTabs}
        >
          {Object.entries(STOCK_DATA).map(([key, data]) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.categoryTab,
                selectedCategory === key && styles.categoryTabActive,
                selectedCategory === key && { borderColor: data.riskColor },
              ]}
              onPress={() => {
                setSelectedCategory(key as StockCategory);
                setSelectedStock(null);
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.categoryIcon}>{data.icon}</Text>
              <Text style={[
                styles.categoryLabel,
                selectedCategory === key && { color: data.riskColor, fontWeight: '800' },
              ]}>
                {t(`selection.categories.${key}.label`)}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Category Header */}
        <Animated.View
          entering={FadeInUp.delay(300).duration(500)}
          style={styles.categoryHeader}
        >
          <View style={styles.categoryTitleRow}>
            <Text style={styles.categoryTitle}>{t(`selection.categories.${selectedCategory}.title`)}</Text>
            <View style={[styles.riskBadge, { backgroundColor: `${categoryData.riskColor}20` }]}>
              <Text style={[styles.riskBadgeText, { color: categoryData.riskColor }]}>
                {t(`selection.riskLevels.${categoryData.riskLevel.toLowerCase()}`)} {t('selection.risk')}
              </Text>
            </View>
          </View>
          <Text style={styles.categorySubtitle}>{t(`selection.categories.${selectedCategory}.subtitle`)}</Text>
        </Animated.View>

        {/* Stock List */}
        <Animated.View
          entering={FadeInUp.delay(400).duration(500)}
          style={styles.stockList}
        >
          {categoryData.stocks.map((stock, index) => (
            <StockCard
              key={stock.symbol}
              stock={stock}
              isSelected={selectedStock === stock.symbol}
              riskColor={categoryData.riskColor}
              onPress={() => handleStockSelect(stock.symbol)}
              t={t}
              index={index}
            />
          ))}
        </Animated.View>

        {/* Risk Explanation */}
        <Animated.View
          entering={FadeInUp.delay(500).duration(500)}
          style={styles.riskCard}
        >
          <Text style={styles.riskTitle}>{t('selection.understandRisk')}</Text>
          <View style={styles.riskExplanation}>
            <RiskLevel color={COLORS.green[600]} level={t('selection.riskLevels.low')} desc={t('selection.riskLevels.lowDesc')} />
            <RiskLevel color={COLORS.warning} level={t('selection.riskLevels.medium')} desc={t('selection.riskLevels.mediumDesc')} />
            <RiskLevel color={COLORS.danger} level={t('selection.riskLevels.high')} desc={t('selection.riskLevels.highDesc')} />
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.actionSection}>
        <TouchableOpacity
          style={[
            styles.ctaButton,
            !selectedStock && styles.ctaButtonDisabled,
          ]}
          onPress={handleContinue}
          activeOpacity={0.8}
          disabled={!selectedStock}
        >
          <Text style={[styles.ctaButtonText, !selectedStock && styles.ctaButtonTextDisabled]}>
            {selectedStock ? t('selection.practiceWith').replace('{stock}', selectedStock) : t('selection.selectStock')}
          </Text>
          {selectedStock && <Text style={styles.ctaArrow}>→</Text>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Stock Card Component
interface StockCardProps {
  stock: { symbol: string; name: string; sector: string; volatility: string };
  isSelected: boolean;
  riskColor: string;
  onPress: () => void;
  t: (path: string) => string;
  index: number;
}

const StockCard: React.FC<StockCardProps> = ({ stock, isSelected, riskColor, onPress, t, index }) => {
  const volatilityColors: Record<string, string> = {
    Low: COLORS.green[600],
    Medium: COLORS.warning,
    High: COLORS.danger,
  };

  return (
    <TouchableOpacity
      style={[
        styles.stockCard,
        isSelected && styles.stockCardSelected,
        isSelected && { borderColor: riskColor },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Symbol Badge */}
      <View style={[styles.symbolBadge, { backgroundColor: `${riskColor}20` }]}>
        <Text style={[styles.symbolText, { color: riskColor }]}>{stock.symbol.slice(0, 2)}</Text>
      </View>

      {/* Stock Info */}
      <View style={styles.stockInfo}>
        <Text style={styles.stockName}>{stock.name}</Text>
        <View style={styles.stockMeta}>
          <Text style={styles.sectorText}>{stock.sector}</Text>
          <View style={styles.dotSeparator} />
          <View style={[styles.volatilityTag, { backgroundColor: `${volatilityColors[stock.volatility]}15` }]}>
            <Text style={[styles.volatilityText, { color: volatilityColors[stock.volatility] }]}>
              {t(`selection.riskLevels.${stock.volatility.toLowerCase()}`)} {t('selection.volatility')}
            </Text>
          </View>
        </View>
      </View>

      {/* Selection Indicator */}
      <View style={[styles.selectionCircle, isSelected && { backgroundColor: riskColor, borderColor: riskColor }]}>
        {isSelected && <Text style={styles.checkmark}>✓</Text>}
      </View>
    </TouchableOpacity>
  );
};

// Risk Level Explanation
const RiskLevel: React.FC<{ color: string; level: string; desc: string }> = ({ color, level, desc }) => (
  <View style={styles.riskLevelItem}>
    <View style={[styles.riskDot, { backgroundColor: color }]} />
    <View style={styles.riskLevelContent}>
      <Text style={[styles.riskLevelText, { color }]}>{level}</Text>
      <Text style={styles.riskLevelDesc}>{desc}</Text>
    </View>
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

  // Scroll
  scrollView: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    gap: 20
  },

  // Tip Card
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.green[50],
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    borderWidth: 2,
    borderColor: COLORS.green[200],
  },
  tipIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tipIcon: {
    fontSize: 24,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    color: COLORS.green[700],
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  tipMessage: {
    color: COLORS.textLight,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },

  // Category Tabs
  categoryTabs: {
    flexDirection: 'row',
    gap: 10,
  },
  categoryTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: COLORS.green[50],
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.green[100],
  },
  categoryTabActive: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.green[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryIcon: {
    fontSize: 28,
    marginBottom: 6
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textLight,
  },

  // Category Header
  categoryHeader: {
    marginTop: 4
  },
  categoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.green[800],
  },
  riskBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20
  },
  riskBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  categorySubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textLight,
    marginTop: 4
  },

  // Stock List
  stockList: {
    gap: 12
  },
  stockCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.green[100],
    shadowColor: COLORS.green[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  stockCardSelected: {
    backgroundColor: COLORS.green[50],
  },
  symbolBadge: {
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  symbolText: {
    fontSize: 18,
    fontWeight: '800'
  },
  stockInfo: {
    flex: 1
  },
  stockName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6
  },
  stockMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  sectorText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textLight,
  },
  dotSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.green[300],
    marginHorizontal: 8
  },
  volatilityTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8
  },
  volatilityText: {
    fontSize: 11,
    fontWeight: '700'
  },
  selectionCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.green[300],
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800'
  },

  // Risk Explanation
  riskCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.green[200],
  },
  riskTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 16
  },
  riskExplanation: {
    gap: 14
  },
  riskLevelItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  riskDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 14
  },
  riskLevelContent: {
    flex: 1,
  },
  riskLevelText: {
    fontSize: 14,
    fontWeight: '700',
  },
  riskLevelDesc: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textLight,
    marginTop: 2,
  },

  // Action
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
  ctaButtonDisabled: {
    backgroundColor: COLORS.green[200],
    shadowOpacity: 0,
    elevation: 0,
  },
  ctaButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
  ctaButtonTextDisabled: {
    color: COLORS.green[500],
  },
  ctaArrow: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '800',
  },
});

