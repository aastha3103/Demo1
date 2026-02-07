/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MARKET LAB - STOCK TRADING SIMULATOR
 * Educational virtual trading with feedback
 * GREEN-WHITE THEME - Clean, minimalistic, accessible for rural users
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useStockLanguage } from '@/context/StockLanguageContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useRewards } from '../../context/RewardContext';

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
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  purple: '#8B5CF6',
  purpleLight: '#EDE9FE',
};

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
          <Text style={styles.headerTitle}>{t('simulator.title')}</Text>
          <Text style={styles.headerSubtitle}>{t('simulator.subtitle')}</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/stocks/insights')}
          style={styles.insightsButton}
          activeOpacity={0.8}
        >
          <Text style={styles.insightsIcon}>📊</Text>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Virtual Badge */}
        <Animated.View
          entering={FadeInUp.delay(100).duration(500)}
          style={styles.virtualBadge}
        >
          <Text style={styles.virtualBadgeIcon}>🎮</Text>
          <Text style={styles.virtualBadgeText}>{t('simulator.virtualBadge')}</Text>
        </Animated.View>

        {/* Portfolio Summary */}
        <Animated.View
          entering={FadeInUp.delay(200).duration(500)}
          style={styles.portfolioCard}
        >
          <View style={styles.portfolioHeader}>
            <Text style={styles.portfolioLabel}>{t('simulator.portfolioValue')}</Text>
            <Text style={styles.portfolioValue}>{formatCurrency(totalPortfolioValue)}</Text>
            <View style={[styles.pnlBadge, totalPnL >= 0 ? styles.pnlPositive : styles.pnlNegative]}>
              <Text style={[styles.pnlText, { color: totalPnL >= 0 ? COLORS.green[700] : COLORS.danger }]}>
                {totalPnL >= 0 ? '↑' : '↓'} {totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)} ({((totalPnL / INITIAL_BALANCE) * 100).toFixed(2)}%)
              </Text>
            </View>
          </View>

          <View style={styles.statsGrid}>
            <StatItem label={t('simulator.cash')} value={formatCurrency(cash)} icon="💰" />
            <StatItem label={t('simulator.holdingsValue')} value={formatCurrency(holding.quantity * currentPrice)} icon="📦" />
            <StatItem label={t('simulator.realizedPnL')} value={formatCurrency(realizedPnL)} isProfit={realizedPnL >= 0} icon="✅" />
            <StatItem label={t('simulator.unrealizedPnL')} value={formatCurrency(unrealizedPnL)} isProfit={unrealizedPnL >= 0} icon="⏳" />
          </View>
        </Animated.View>

        {/* Current Stock */}
        <Animated.View
          entering={FadeInUp.delay(300).duration(500)}
          style={styles.stockCard}
        >
          <View style={styles.stockHeader}>
            <View>
              <Text style={styles.stockSymbol}>{stockSymbol}</Text>
              <Text style={styles.stockPrice}>{formatCurrency(currentPrice)}</Text>
            </View>
            <View style={[styles.changeBadge, priceChange >= 0 ? styles.changePositive : styles.changeNegative]}>
              <Text style={[styles.changeText, { color: priceChange >= 0 ? COLORS.green[700] : COLORS.danger }]}>
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
                      backgroundColor: isLast ? COLORS.green[600] : (price >= priceHistory[Math.max(0, i - 1)] ? COLORS.green[400] : COLORS.danger),
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
        </Animated.View>

        {/* Trade Actions */}
        <Animated.View
          entering={FadeInUp.delay(400).duration(500)}
          style={styles.tradeCard}
        >
          <Text style={styles.tradeTitle}>{t('simulator.makeTrade')}</Text>

          <View style={styles.quantityRow}>
            <Text style={styles.quantityLabel}>{t('simulator.quantity')}:</Text>
            <View style={styles.quantityInput}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQuantity(prev => String(Math.max(1, parseInt(prev) - 1)))}
                activeOpacity={0.8}
              >
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.qtyTextInput}
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQuantity(prev => String(parseInt(prev || '0') + 1))}
                activeOpacity={0.8}
              >
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.tradePreview}>
            <Text style={styles.previewLabel}>{t('simulator.tradeValue')}:</Text>
            <Text style={styles.previewValue}>{formatCurrency((parseInt(quantity) || 0) * currentPrice)}</Text>
          </View>

          <View style={styles.tradeButtons}>
            <TouchableOpacity
              style={[
                styles.buyButton,
                (parseInt(quantity) || 0) * currentPrice > cash && styles.buttonDisabled,
              ]}
              onPress={handleBuy}
              activeOpacity={0.8}
              disabled={(parseInt(quantity) || 0) * currentPrice > cash}
            >
              <Text style={styles.buyButtonText}>📈 {t('simulator.buy')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sellButton,
                (parseInt(quantity) || 0) > holding.quantity && styles.buttonDisabled,
              ]}
              onPress={handleSell}
              activeOpacity={0.8}
              disabled={(parseInt(quantity) || 0) > holding.quantity}
            >
              <Text style={styles.sellButtonText}>📉 {t('simulator.sell')}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Recent Trades */}
        {trades.length > 0 && (
          <Animated.View
            entering={FadeInUp.delay(500).duration(500)}
            style={styles.tradesCard}
          >
            <Text style={styles.tradesTitle}>{t('simulator.recentTrades')}</Text>
            {trades.slice(-5).reverse().map((trade, i) => (
              <View key={i} style={styles.tradeItem}>
                <View style={[styles.tradeBadge, { backgroundColor: trade.type === 'BUY' ? COLORS.green[100] : COLORS.dangerLight }]}>
                  <Text style={[styles.tradeType, { color: trade.type === 'BUY' ? COLORS.green[700] : COLORS.danger }]}>{trade.type}</Text>
                </View>
                <Text style={styles.tradeQty}>{trade.quantity} @ {formatCurrency(trade.price)}</Text>
                {trade.pnl !== undefined && (
                  <Text style={[styles.tradePnl, { color: trade.pnl >= 0 ? COLORS.green[700] : COLORS.danger }]}>
                    {trade.pnl >= 0 ? '+' : ''}{formatCurrency(trade.pnl)}
                  </Text>
                )}
              </View>
            ))}
          </Animated.View>
        )}

        {/* Discipline Reminder */}
        <Animated.View
          entering={FadeInUp.delay(600).duration(500)}
          style={styles.reminder}
        >
          <Text style={styles.reminderIcon}>🎓</Text>
          <Text style={styles.reminderText}>
            {t('simulator.reminder')}
          </Text>
        </Animated.View>
      </ScrollView>

      {/* Educational Feedback Modal */}
      <Modal visible={showFeedback !== null} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.feedbackCard}>
            <Text style={styles.feedbackIcon}>{feedbackMessage.icon}</Text>
            <Text style={styles.feedbackTitle}>{feedbackMessage.title}</Text>
            <Text style={styles.feedbackMessage}>{feedbackMessage.message}</Text>
            <TouchableOpacity
              style={styles.feedbackButton}
              onPress={() => setShowFeedback(null)}
              activeOpacity={0.8}
            >
              <Text style={styles.feedbackButtonText}>{t('common.gotIt')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Stat Item Component
const StatItem = ({ label, value, isProfit, icon }: { label: string; value: string; isProfit?: boolean; icon: string }) => (
  <View style={styles.statItem}>
    <Text style={styles.statIcon}>{icon}</Text>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={[styles.statValue, isProfit !== undefined && { color: isProfit ? COLORS.green[700] : COLORS.danger }]}>{value}</Text>
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
  insightsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.green[50],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.green[200],
  },
  insightsIcon: {
    fontSize: 20,
  },

  // Scroll
  scrollView: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 16
  },

  // Virtual Badge
  virtualBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.purpleLight,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 12,
    gap: 8,
  },
  virtualBadgeIcon: {
    fontSize: 16,
  },
  virtualBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.purple,
  },

  // Portfolio Card
  portfolioCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.green[200],
    shadowColor: COLORS.green[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  portfolioHeader: {
    alignItems: 'center',
    marginBottom: 20
  },
  portfolioLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  portfolioValue: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.green[800],
    marginTop: 6,
  },
  pnlBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 10
  },
  pnlPositive: {
    backgroundColor: COLORS.green[100]
  },
  pnlNegative: {
    backgroundColor: COLORS.dangerLight
  },
  pnlText: {
    fontSize: 13,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  statItem: {
    width: '50%',
    paddingVertical: 10,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 4,
  },

  // Stock Card
  stockCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.green[200],
  },
  stockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  stockSymbol: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textLight,
    letterSpacing: 1,
  },
  stockPrice: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.green[800],
    marginTop: 4,
  },
  changeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16
  },
  changePositive: {
    backgroundColor: COLORS.green[100]
  },
  changeNegative: {
    backgroundColor: COLORS.dangerLight
  },
  changeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  miniChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 60,
    marginTop: 20,
    paddingHorizontal: 8,
    backgroundColor: COLORS.green[50],
    borderRadius: 12,
    paddingVertical: 8,
  },
  chartBar: {
    width: 10,
    borderRadius: 5
  },
  holdingInfo: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: COLORS.green[100]
  },
  holdingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  holdingLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textLight,
  },
  holdingValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },

  // Trade Card
  tradeCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.green[200],
  },
  tradeTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 16,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  quantityLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  quantityInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.green[50],
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.green[200],
  },
  qtyBtn: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  qtyBtnText: {
    fontSize: 24,
    color: COLORS.green[600],
    fontWeight: '700',
  },
  qtyTextInput: {
    width: 60,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  tradePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.green[50],
    borderRadius: 12,
  },
  previewLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  previewValue: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.green[700],
  },
  tradeButtons: {
    flexDirection: 'row',
    gap: 12
  },
  buyButton: {
    flex: 1,
    backgroundColor: COLORS.green[600],
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: COLORS.green[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buyButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
  sellButton: {
    flex: 1,
    backgroundColor: COLORS.danger,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: COLORS.danger,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  sellButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
  buttonDisabled: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },

  // Trades Card
  tradesCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.green[200],
  },
  tradesTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 12,
  },
  tradeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.green[100]
  },
  tradeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 12
  },
  tradeType: {
    fontSize: 12,
    fontWeight: '800',
  },
  tradeQty: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textLight,
    flex: 1,
  },
  tradePnl: {
    fontSize: 13,
    fontWeight: '700',
  },

  // Reminder
  reminder: {
    flexDirection: 'row',
    backgroundColor: COLORS.green[50],
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.green[200]
  },
  reminderIcon: {
    fontSize: 24,
    marginRight: 14
  },
  reminderText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.green[700],
    flex: 1,
    lineHeight: 20,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  feedbackCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    borderWidth: 3,
    borderColor: COLORS.green[200],
  },
  feedbackIcon: {
    fontSize: 64,
    marginBottom: 16
  },
  feedbackTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.green[800],
    marginBottom: 10,
    textAlign: 'center',
  },
  feedbackMessage: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  feedbackButton: {
    backgroundColor: COLORS.green[600],
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
    shadowColor: COLORS.green[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  feedbackButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
});

