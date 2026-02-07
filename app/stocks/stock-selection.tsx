import {
  DesignColors,
  DesignRadius,
  DesignShadows,
  DesignSpacing,
  DesignTextStyles,
  MLButton,
  MLCard,
  MLHeader,
  MLInfoBox,
} from '@/components/design-system';
import { useStockLanguage } from '@/context/StockLanguageContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Stock data organized by market cap
const STOCK_DATA = {
  largeCap: {
    title: 'Large-Cap Stocks',
    subtitle: 'Stable, established companies',
    riskLevel: 'Low',
    riskColor: DesignColors.secondary[500],
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
    riskColor: DesignColors.semantic.warning.main,
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
    riskColor: DesignColors.semantic.negative.main,
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
      <MLHeader
        title={t('selection.title')}
        subtitle={t('selection.subtitle')}
        variant="default"
        onLeftAction={() => router.back()}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Educational Tip */}
        <MLInfoBox
          variant="learn"
          icon="🎓"
          title={t('selection.tip.title')}
          message={t('selection.tip.message')}
        />

        {/* Category Tabs */}
        <View style={styles.categoryTabs}>
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
            >
              <Text style={styles.categoryIcon}>{data.icon}</Text>
              <Text style={[
                styles.categoryLabel,
                selectedCategory === key && { color: data.riskColor },
              ]}>
                {t(`selection.categories.${key}.label`)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Category Header */}
        <View style={styles.categoryHeader}>
          <View style={styles.categoryTitleRow}>
            <Text style={styles.categoryTitle}>{t(`selection.categories.${selectedCategory}.title`)}</Text>
            <View style={[styles.riskBadge, { backgroundColor: `${categoryData.riskColor}20` }]}>
              <Text style={[styles.riskBadgeText, { color: categoryData.riskColor }]}>
                {t(`selection.riskLevels.${categoryData.riskLevel.toLowerCase()}`)} {t('selection.risk')}
              </Text>
            </View>
          </View>
          <Text style={styles.categorySubtitle}>{t(`selection.categories.${selectedCategory}.subtitle`)}</Text>
        </View>

        {/* Stock List */}
        <View style={styles.stockList}>
          {categoryData.stocks.map((stock) => (
            <StockCard
              key={stock.symbol}
              stock={stock}
              isSelected={selectedStock === stock.symbol}
              riskColor={categoryData.riskColor}
              onPress={() => handleStockSelect(stock.symbol)}
              t={t}
            />
          ))}
        </View>

        {/* Risk Explanation */}
        <MLCard variant="outlined" style={styles.riskCard}>
          <Text style={styles.riskTitle}>{t('selection.understandRisk')}</Text>
          <View style={styles.riskExplanation}>
            <RiskLevel color={DesignColors.secondary[500]} level={t('selection.riskLevels.low')} desc={t('selection.riskLevels.lowDesc')} />
            <RiskLevel color={DesignColors.semantic.warning.main} level={t('selection.riskLevels.medium')} desc={t('selection.riskLevels.mediumDesc')} />
            <RiskLevel color={DesignColors.semantic.negative.main} level={t('selection.riskLevels.high')} desc={t('selection.riskLevels.highDesc')} />
          </View>
        </MLCard>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.actionSection}>
        <MLButton
          title={selectedStock ? t('selection.practiceWith').replace('{stock}', selectedStock) : t('selection.selectStock')}
          variant="primary"
          size="large"
          fullWidth
          disabled={!selectedStock}
          onPress={handleContinue}
        />
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
}

const StockCard: React.FC<StockCardProps> = ({ stock, isSelected, riskColor, onPress, t }) => {
  const volatilityColors: Record<string, string> = {
    Low: DesignColors.secondary[500],
    Medium: DesignColors.semantic.warning.main,
    High: DesignColors.semantic.negative.main,
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
      <View style={[styles.selectionCircle, isSelected && { backgroundColor: riskColor }]}>
        {isSelected && <Text style={styles.checkmark}>✓</Text>}
      </View>
    </TouchableOpacity>
  );
};

// Risk Level Explanation
const RiskLevel: React.FC<{ color: string; level: string; desc: string }> = ({ color, level, desc }) => (
  <View style={styles.riskLevelItem}>
    <View style={[styles.riskDot, { backgroundColor: color }]} />
    <View>
      <Text style={[styles.riskLevelText, { color }]}>{level}</Text>
      <Text style={styles.riskLevelDesc}>{desc}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DesignColors.neutral[50] },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: DesignSpacing.screenPadding, paddingBottom: 100, gap: DesignSpacing.lg },

  // Category Tabs
  categoryTabs: { flexDirection: 'row', gap: DesignSpacing.sm, marginTop: DesignSpacing.sm },
  categoryTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: DesignSpacing.md,
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryTabActive: { backgroundColor: DesignColors.neutral[200] },
  categoryIcon: { fontSize: 24, marginBottom: 4 },
  categoryLabel: { ...DesignTextStyles.labelMedium, color: DesignColors.neutral[500] },

  // Category Header
  categoryHeader: { marginTop: DesignSpacing.sm },
  categoryTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  categoryTitle: { ...DesignTextStyles.titleLarge, color: DesignColors.neutral[900] },
  riskBadge: { paddingHorizontal: DesignSpacing.md, paddingVertical: DesignSpacing.xs, borderRadius: DesignRadius.round },
  riskBadgeText: { ...DesignTextStyles.labelSmall, fontWeight: '600' },
  categorySubtitle: { ...DesignTextStyles.bodyMedium, color: DesignColors.neutral[500], marginTop: 4 },

  // Stock List
  stockList: { gap: DesignSpacing.md },
  stockCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.card,
    padding: DesignSpacing.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    ...DesignShadows.sm,
  },
  stockCardSelected: { backgroundColor: DesignColors.neutral[200] },
  symbolBadge: {
    width: 48,
    height: 48,
    borderRadius: DesignRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: DesignSpacing.md,
  },
  symbolText: { fontSize: 16, fontWeight: '700' },
  stockInfo: { flex: 1 },
  stockName: { ...DesignTextStyles.titleSmall, color: DesignColors.neutral[900], marginBottom: 4 },
  stockMeta: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  sectorText: { ...DesignTextStyles.caption, color: DesignColors.neutral[500] },
  dotSeparator: { width: 3, height: 3, borderRadius: 2, backgroundColor: DesignColors.neutral[400], marginHorizontal: 8 },
  volatilityTag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: DesignRadius.xs },
  volatilityText: { fontSize: 10, fontWeight: '600' },
  selectionCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: DesignColors.neutral[400],
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: { color: DesignColors.neutral[0], fontSize: 14, fontWeight: '700' },

  // Risk Explanation
  riskCard: { marginTop: DesignSpacing.sm },
  riskTitle: { ...DesignTextStyles.labelLarge, color: DesignColors.neutral[800], marginBottom: DesignSpacing.md },
  riskExplanation: { gap: DesignSpacing.sm },
  riskLevelItem: { flexDirection: 'row', alignItems: 'center' },
  riskDot: { width: 10, height: 10, borderRadius: 5, marginRight: DesignSpacing.md },
  riskLevelText: { ...DesignTextStyles.labelMedium, fontWeight: '600' },
  riskLevelDesc: { ...DesignTextStyles.caption, color: DesignColors.neutral[500] },

  // Action
  actionSection: {
    paddingHorizontal: DesignSpacing.screenPadding,
    paddingVertical: DesignSpacing.lg,
    borderTopWidth: 1,
    borderTopColor: DesignColors.neutral[200],
  },
});
