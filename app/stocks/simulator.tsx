/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MARKET LAB - STOCK TRADING SIMULATOR
 * Educational virtual trading with feedback
 * ═══════════════════════════════════════════════════════════════════════════
 */

import {
  DesignColors,
  DesignRadius,
  DesignSpacing,
  DesignTextStyles,
  MLButton,
  MLCard,
  MLHeader
} from '@/components/design-system';
import { useStockLanguage } from '@/context/StockLanguageContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRewards } from '../../context/RewardContext';

// Initial virtual wallet
const INITIAL_BALANCE = 500000;

// Stock price simulation
const generatePriceHistory = () => {
  const history: number[] = [];
  let price = 1500 + Math.random() * 500;
  for (let i = 0; i < 20; i++) {
    const change = (Math.random() - 0.48) * 50;
    price = Math.max(price + change, 500);
    history.push(parseFloat(price.toFixed(2)));
  }
  return history;
};

interface Holding {
  quantity: number;
  avgPrice: number;
  investedAmount: number;
}

interface Trade {
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  timestamp: Date;
  pnl?: number;
}

type FeedbackType = 'buyHigh' | 'panicSell' | 'holdStrong' | 'discipline' | null;

export default function SimulatorScreen() {
  const router = useRouter();
  const { t } = useStockLanguage();
  const { completeTask } = useRewards();
  const params = useLocalSearchParams();
  const stockSymbol = (params.stock as string) || 'TCS';

  // State
  const [priceHistory, setPriceHistory] = useState<number[]>(generatePriceHistory());
  const [currentPrice, setCurrentPrice] = useState(priceHistory[priceHistory.length - 1]);
  const [previousPrice, setPreviousPrice] = useState(priceHistory[priceHistory.length - 2]);
  const [cash, setCash] = useState(INITIAL_BALANCE);
  const [holding, setHolding] = useState<Holding>({ quantity: 0, avgPrice: 0, investedAmount: 0 });
  const [realizedPnL, setRealizedPnL] = useState(0);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [quantity, setQuantity] = useState('1');
  const [showFeedback, setShowFeedback] = useState<FeedbackType>(null);
  const [feedbackMessage, setFeedbackMessage] = useState({ title: '', message: '', icon: '' });

  // Calculate unrealized P&L
  const unrealizedPnL = holding.quantity > 0
    ? (currentPrice - holding.avgPrice) * holding.quantity
    : 0;
  const totalPortfolioValue = cash + (holding.quantity * currentPrice);
  const totalPnL = totalPortfolioValue - INITIAL_BALANCE;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = (priceChange / previousPrice) * 100;

  // Price simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPriceHistory(prev => {
        const lastPrice = prev[prev.length - 1];
        const volatility = 0.02 + Math.random() * 0.03;
        const change = (Math.random() - 0.48) * lastPrice * volatility;
        const newPrice = Math.max(lastPrice + change, 500);
        setPreviousPrice(lastPrice);
        setCurrentPrice(parseFloat(newPrice.toFixed(2)));
        return [...prev.slice(1), parseFloat(newPrice.toFixed(2))];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Educational feedback logic
  const showEducationalFeedback = (type: FeedbackType) => {
    if (!type) return;

    const feedbackData = t(`simulator.feedback.${type}`) as any;
    const icons = {
      buyHigh: '📈',
      panicSell: '📉',
      holdStrong: '🏆',
      discipline: '📚',
    };

    setFeedbackMessage({
      title: feedbackData.title,
      message: feedbackData.message,
      icon: icons[type] || '🎓',
    });
    setShowFeedback(type);
  };

  // Buy action
  const handleBuy = () => {
    const qty = parseInt(quantity) || 0;
    if (qty <= 0) return;

    const cost = qty * currentPrice;
    if (cost > cash) return;

    // Check if buying after sharp rise (>2%)
    if (priceChangePercent > 2) {
      showEducationalFeedback('buyHigh');
    }

    const newInvested = holding.investedAmount + cost;
    const newQuantity = holding.quantity + qty;
    const newAvgPrice = newInvested / newQuantity;

    setCash(prev => prev - cost);
    setHolding({
      quantity: newQuantity,
      avgPrice: parseFloat(newAvgPrice.toFixed(2)),
      investedAmount: newInvested,
    });
    setTrades(prev => [...prev, { type: 'BUY', quantity: qty, price: currentPrice, timestamp: new Date() }]);
    completeTask('stocks_trade');
  };

  // Sell action
  const handleSell = () => {
    const qty = parseInt(quantity) || 0;
    if (qty <= 0 || qty > holding.quantity) return;

    const saleValue = qty * currentPrice;
    const costBasis = qty * holding.avgPrice;
    const pnl = saleValue - costBasis;

    // Check for panic sell (selling at loss after recent drop)
    if (priceChangePercent < -1.5 && pnl < 0) {
      showEducationalFeedback('panicSell');
    } else if (pnl > 0) {
      showEducationalFeedback('discipline');
    }

    const newQuantity = holding.quantity - qty;
    const newInvested = newQuantity > 0 ? holding.investedAmount - costBasis : 0;

    setCash(prev => prev + saleValue);
    setRealizedPnL(prev => prev + pnl);
    setHolding({
      quantity: newQuantity,
      avgPrice: newQuantity > 0 ? holding.avgPrice : 0,
      investedAmount: newInvested,
    });
    setTrades(prev => [...prev, { type: 'SELL', quantity: qty, price: currentPrice, timestamp: new Date(), pnl }]);
    completeTask('stocks_trade');
  };

  // Check for hold through volatility
  useEffect(() => {
    if (holding.quantity > 0 && trades.length > 3) {
      const recentVolatility = Math.abs(priceChangePercent) > 3;
      const holdingTime = trades.filter(t => t.type === 'BUY').length - trades.filter(t => t.type === 'SELL').length;
      if (recentVolatility && holdingTime > 2 && !showFeedback) {
        showEducationalFeedback('holdStrong');
      }
    }
  }, [priceHistory]);

  const formatCurrency = (value: number) => `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <SafeAreaView style={styles.container}>
      <MLHeader
        title={t('simulator.title')}
        subtitle={t('simulator.subtitle')}
        variant="default"
        onLeftAction={() => router.back()}
        rightIcon="📊"
        onRightAction={() => router.push('/stocks/insights')}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Virtual Badge */}
        <View style={styles.virtualBadge}>
          <Text style={styles.virtualBadgeText}>{t('simulator.virtualBadge')}</Text>
        </View>

        {/* Portfolio Summary */}
        <MLCard variant="glass">
          <View style={styles.portfolioHeader}>
            <Text style={styles.portfolioLabel}>{t('simulator.portfolioValue')}</Text>
            <Text style={styles.portfolioValue}>{formatCurrency(totalPortfolioValue)}</Text>
            <View style={[styles.pnlBadge, totalPnL >= 0 ? styles.pnlPositive : styles.pnlNegative]}>
              <Text style={[styles.pnlText, { color: totalPnL >= 0 ? DesignColors.secondary[500] : DesignColors.semantic.negative.main }]}>
                {totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)} ({((totalPnL / INITIAL_BALANCE) * 100).toFixed(2)}%)
              </Text>
            </View>
          </View>

          <View style={styles.statsGrid}>
            <StatItem label={t('simulator.cash')} value={formatCurrency(cash)} />
            <StatItem label={t('simulator.holdingsValue')} value={formatCurrency(holding.quantity * currentPrice)} />
            <StatItem label={t('simulator.realizedPnL')} value={formatCurrency(realizedPnL)} isProfit={realizedPnL >= 0} />
            <StatItem label={t('simulator.unrealizedPnL')} value={formatCurrency(unrealizedPnL)} isProfit={unrealizedPnL >= 0} />
          </View>
        </MLCard>

        {/* Current Stock */}
        <MLCard variant="elevated">
          <View style={styles.stockHeader}>
            <View>
              <Text style={styles.stockSymbol}>{stockSymbol}</Text>
              <Text style={styles.stockPrice}>{formatCurrency(currentPrice)}</Text>
            </View>
            <View style={[styles.changeBadge, priceChange >= 0 ? styles.changePositive : styles.changeNegative]}>
              <Text style={[styles.changeText, { color: priceChange >= 0 ? DesignColors.secondary[500] : DesignColors.semantic.negative.main }]}>
                {priceChange >= 0 ? '↑' : '↓'} {formatCurrency(Math.abs(priceChange))} ({Math.abs(priceChangePercent).toFixed(2)}%)
              </Text>
            </View>
          </View>

          {/* Mini Chart */}
          <View style={styles.miniChart}>
            {priceHistory.map((price, i) => {
              const height = ((price - Math.min(...priceHistory)) / (Math.max(...priceHistory) - Math.min(...priceHistory))) * 40 + 10;
              const isLast = i === priceHistory.length - 1;
              return (
                <View
                  key={i}
                  style={[
                    styles.chartBar,
                    {
                      height,
                      backgroundColor: isLast ? DesignColors.primary[500] : (price >= priceHistory[Math.max(0, i - 1)] ? DesignColors.secondary[400] : DesignColors.semantic.negative.main),
                      opacity: 0.4 + (i / priceHistory.length) * 0.6,
                    },
                  ]}
                />
              );
            })}
          </View>

          {/* Holdings Info */}
          {holding.quantity > 0 && (
            <View style={styles.holdingInfo}>
              <View style={styles.holdingRow}>
                <Text style={styles.holdingLabel}>{t('simulator.yourHoldings')}</Text>
                <Text style={styles.holdingValue}>{holding.quantity} {t('simulator.shares')}</Text>
              </View>
              <View style={styles.holdingRow}>
                <Text style={styles.holdingLabel}>{t('simulator.avgPrice')}</Text>
                <Text style={styles.holdingValue}>{formatCurrency(holding.avgPrice)}</Text>
              </View>
            </View>
          )}
        </MLCard>

        {/* Trade Actions */}
        <MLCard variant="outlined">
          <Text style={styles.tradeTitle}>{t('simulator.makeTrade')}</Text>

          <View style={styles.quantityRow}>
            <Text style={styles.quantityLabel}>{t('simulator.quantity')}:</Text>
            <View style={styles.quantityInput}>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity(prev => String(Math.max(1, parseInt(prev) - 1)))}>
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.qtyTextInput}
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity(prev => String(parseInt(prev || '0') + 1))}>
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.tradePreview}>
            <Text style={styles.previewLabel}>{t('simulator.tradeValue')}:</Text>
            <Text style={styles.previewValue}>{formatCurrency((parseInt(quantity) || 0) * currentPrice)}</Text>
          </View>

          <View style={styles.tradeButtons}>
            <MLButton
              title={t('simulator.buy')}
              variant="success"
              size="large"
              onPress={handleBuy}
              disabled={(parseInt(quantity) || 0) * currentPrice > cash}
              style={styles.tradeBtn}
            />
            <MLButton
              title={t('simulator.sell')}
              variant="danger"
              size="large"
              onPress={handleSell}
              disabled={(parseInt(quantity) || 0) > holding.quantity}
              style={styles.tradeBtn}
            />
          </View>
        </MLCard>

        {/* Recent Trades */}
        {trades.length > 0 && (
          <MLCard variant="outlined">
            <Text style={styles.tradesTitle}>{t('simulator.recentTrades')}</Text>
            {trades.slice(-5).reverse().map((trade, i) => (
              <View key={i} style={styles.tradeItem}>
                <View style={[styles.tradeBadge, { backgroundColor: trade.type === 'BUY' ? `${DesignColors.secondary[400]}20` : `${DesignColors.semantic.negative.main}20` }]}>
                  <Text style={[styles.tradeType, { color: trade.type === 'BUY' ? DesignColors.secondary[500] : DesignColors.semantic.negative.main }]}>{trade.type}</Text>
                </View>
                <Text style={styles.tradeQty}>{trade.quantity} @ {formatCurrency(trade.price)}</Text>
                {trade.pnl !== undefined && (
                  <Text style={[styles.tradePnl, { color: trade.pnl >= 0 ? DesignColors.secondary[500] : DesignColors.semantic.negative.main }]}>
                    {trade.pnl >= 0 ? '+' : ''}{formatCurrency(trade.pnl)}
                  </Text>
                )}
              </View>
            ))}
          </MLCard>
        )}

        {/* Discipline Reminder */}
        <View style={styles.reminder}>
          <Text style={styles.reminderIcon}>🎓</Text>
          <Text style={styles.reminderText}>
            {t('simulator.reminder')}
          </Text>
        </View>
      </ScrollView>

      {/* Educational Feedback Modal */}
      <Modal visible={showFeedback !== null} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.feedbackCard}>
            <Text style={styles.feedbackIcon}>{feedbackMessage.icon}</Text>
            <Text style={styles.feedbackTitle}>{feedbackMessage.title}</Text>
            <Text style={styles.feedbackMessage}>{feedbackMessage.message}</Text>
            <MLButton title={t('common.gotIt')} variant="primary" size="medium" onPress={() => setShowFeedback(null)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Stat Item Component
const StatItem = ({ label, value, isProfit }: { label: string; value: string; isProfit?: boolean }) => (
  <View style={styles.statItem}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={[styles.statValue, isProfit !== undefined && { color: isProfit ? DesignColors.secondary[500] : DesignColors.semantic.negative.main }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DesignColors.neutral[50] },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: DesignSpacing.screenPadding, paddingBottom: 100, gap: DesignSpacing.lg },

  // Virtual Badge
  virtualBadge: { backgroundColor: DesignColors.semantic.learning.light, paddingVertical: DesignSpacing.sm, paddingHorizontal: DesignSpacing.lg, borderRadius: DesignRadius.round, alignSelf: 'center', marginTop: DesignSpacing.sm },
  virtualBadgeText: { ...DesignTextStyles.labelSmall, color: DesignColors.accent.purple, fontWeight: '700' },

  // Portfolio
  portfolioHeader: { alignItems: 'center', marginBottom: DesignSpacing.lg },
  portfolioLabel: { ...DesignTextStyles.labelMedium, color: DesignColors.neutral[500] },
  portfolioValue: { ...DesignTextStyles.headlineLarge, color: DesignColors.neutral[900], marginTop: 4 },
  pnlBadge: { paddingHorizontal: DesignSpacing.md, paddingVertical: DesignSpacing.xs, borderRadius: DesignRadius.round, marginTop: DesignSpacing.sm },
  pnlPositive: { backgroundColor: `${DesignColors.secondary[400]}15` },
  pnlNegative: { backgroundColor: `${DesignColors.semantic.negative.main}15` },
  pnlText: { ...DesignTextStyles.labelSmall, fontWeight: '600' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  statItem: { width: '50%', paddingVertical: DesignSpacing.sm },
  statLabel: { ...DesignTextStyles.caption, color: DesignColors.neutral[500] },
  statValue: { ...DesignTextStyles.labelLarge, color: DesignColors.neutral[900], marginTop: 2 },

  // Stock
  stockHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  stockSymbol: { ...DesignTextStyles.labelMedium, color: DesignColors.neutral[500] },
  stockPrice: { ...DesignTextStyles.dataLarge, color: DesignColors.neutral[900], marginTop: 2 },
  changeBadge: { paddingHorizontal: DesignSpacing.md, paddingVertical: DesignSpacing.xs, borderRadius: DesignRadius.round },
  changePositive: { backgroundColor: `${DesignColors.secondary[400]}15` },
  changeNegative: { backgroundColor: `${DesignColors.semantic.negative.main}15` },
  changeText: { ...DesignTextStyles.labelSmall, fontWeight: '600' },
  miniChart: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 60, marginTop: DesignSpacing.lg, paddingHorizontal: DesignSpacing.sm },
  chartBar: { width: 8, borderRadius: 4 },
  holdingInfo: { marginTop: DesignSpacing.lg, paddingTop: DesignSpacing.md, borderTopWidth: 1, borderTopColor: DesignColors.neutral[300] },
  holdingRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: DesignSpacing.xs },
  holdingLabel: { ...DesignTextStyles.bodySmall, color: DesignColors.neutral[500] },
  holdingValue: { ...DesignTextStyles.labelMedium, color: DesignColors.neutral[900] },

  // Trade
  tradeTitle: { ...DesignTextStyles.titleSmall, color: DesignColors.neutral[900], marginBottom: DesignSpacing.md },
  quantityRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: DesignSpacing.md },
  quantityLabel: { ...DesignTextStyles.labelMedium, color: DesignColors.neutral[700] },
  quantityInput: { flexDirection: 'row', alignItems: 'center', backgroundColor: DesignColors.neutral[200], borderRadius: DesignRadius.md },
  qtyBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  qtyBtnText: { fontSize: 20, color: DesignColors.neutral[700] },
  qtyTextInput: { width: 60, textAlign: 'center', ...DesignTextStyles.labelLarge, color: DesignColors.neutral[900] },
  tradePreview: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: DesignSpacing.lg },
  previewLabel: { ...DesignTextStyles.bodyMedium, color: DesignColors.neutral[500] },
  previewValue: { ...DesignTextStyles.labelLarge, color: DesignColors.neutral[900] },
  tradeButtons: { flexDirection: 'row', gap: DesignSpacing.md },
  tradeBtn: { flex: 1 },

  // Trades
  tradesTitle: { ...DesignTextStyles.labelLarge, color: DesignColors.neutral[800], marginBottom: DesignSpacing.md },
  tradeItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: DesignSpacing.sm, borderBottomWidth: 1, borderBottomColor: DesignColors.neutral[200] },
  tradeBadge: { paddingHorizontal: DesignSpacing.sm, paddingVertical: 2, borderRadius: DesignRadius.xs, marginRight: DesignSpacing.md },
  tradeType: { ...DesignTextStyles.labelSmall, fontWeight: '700' },
  tradeQty: { ...DesignTextStyles.bodySmall, color: DesignColors.neutral[600], flex: 1 },
  tradePnl: { ...DesignTextStyles.labelSmall },

  // Reminder
  reminder: { flexDirection: 'row', backgroundColor: DesignColors.primary[50], borderRadius: DesignRadius.lg, padding: DesignSpacing.lg, borderWidth: 1, borderColor: DesignColors.primary[200] },
  reminderIcon: { fontSize: 24, marginRight: DesignSpacing.md },
  reminderText: { ...DesignTextStyles.bodySmall, color: DesignColors.primary[600], flex: 1, lineHeight: 20 },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', padding: DesignSpacing.screenPadding },
  feedbackCard: { backgroundColor: DesignColors.neutral[100], borderRadius: DesignRadius.card, padding: DesignSpacing.xl, alignItems: 'center', width: '100%' },
  feedbackIcon: { fontSize: 48, marginBottom: DesignSpacing.md },
  feedbackTitle: { ...DesignTextStyles.titleLarge, color: DesignColors.neutral[900], marginBottom: DesignSpacing.sm, textAlign: 'center' },
  feedbackMessage: { ...DesignTextStyles.bodyMedium, color: DesignColors.neutral[600], textAlign: 'center', marginBottom: DesignSpacing.xl, lineHeight: 24 },
});
