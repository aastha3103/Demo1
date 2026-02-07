/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SIP & MUTUAL FUND SIMULATOR - Main Screen
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * A hands-on simulation experience for learning long-term investing.
 * Uses virtual money to teach SIP behavior without real financial risk.
 * 
 * SECTIONS:
 * 1. Top Section - Virtual balance and time selection
 * 2. Portfolio Section - Fund cards with all details
 * 3. Summary Section - Investment totals and market explanation
 * 
 * DESIGN PRINCIPLES:
 * - Avoid technical jargon
 * - Calm, non-stressful layout
 * - Clarity over data density
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  DesignColors,
  DesignSpacing,
  DesignTextStyles,
  DesignRadius,
  WBLButton,
  WBLCard,
  WBLInfoBox,
  WBLDivider,
  WBLInput,
  WBLModal,
  WBLProgressBar,
  WBLChip,
  WBLStatCard,
  GrowthChart,
  WBLBadge,
  WBLEntrance,
  WBLPulse,
  WBLPulseDot,
  WBLAnimatedNumber,
} from '@/components/design-system';
import { useDesignTheme } from '@/hooks/use-design-theme';
import { WBLFundCard, RiskLevel } from '@/components/design-system/WBLFundCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ═══════════════════════════════════════════════════════════════════════════
// TYPES & DATA
// ═══════════════════════════════════════════════════════════════════════════

interface Fund {
  id: string;
  name: string;
  category: string;
  sipAmount: number;
  riskLevel: RiskLevel;
  trendData: number[];
  returns: number;
  isPaused: boolean;
  graphData?: { x: number; y: number; label: string }[];
}


import {
  Fund as SimulationFund,
  TimeHorizon as SimTimeHorizon,
  InvestmentType
} from '@/utils/simulation-engine';

type SimulationTimeHorizon = SimTimeHorizon;

// Sample portfolio data
const SAMPLE_FUNDS: Fund[] = [
  {
    id: '1',
    name: 'SBI Nifty 50 Index Fund',
    category: 'Index • Equity',
    sipAmount: 5000,
    riskLevel: 'medium',
    trendData: [100, 102, 103, 104, 106, 108, 109, 112],
    returns: 12.8,
    isPaused: false,
  },
  {
    id: '2',
    name: 'ICICI Prudential Bluechip Fund',
    category: 'Large Cap • Equity',
    sipAmount: 3000,
    riskLevel: 'medium',
    trendData: [100, 102, 105, 103, 108, 112, 110, 118],
    returns: 13.2,
    isPaused: false,
  },
  {
    id: '3',
    name: 'HDFC Balanced Advantage Fund',
    category: 'Hybrid • Balanced',
    sipAmount: 2000,
    riskLevel: 'low',
    trendData: [100, 101, 102, 103, 104, 105, 106, 108],
    returns: 11.5,
    isPaused: false,
  },
  {
    id: '4',
    name: 'Nippon India Small Cap Fund',
    category: 'Small Cap • Equity',
    sipAmount: 1000,
    riskLevel: 'high',
    trendData: [100, 108, 95, 110, 105, 120, 115, 128],
    returns: 18.5,
    isPaused: true,
  },
];

// Available funds to add
const AVAILABLE_FUNDS: Fund[] = [
  ...SAMPLE_FUNDS,
  {
    id: 'a1',
    name: 'Mirae Asset Large Cap Fund',
    category: 'Large Cap • Equity',
    sipAmount: 5000,
    riskLevel: 'medium',
    trendData: [100, 101, 104, 106, 110],
    returns: 14.2,
    isPaused: false,
  },
  {
    id: 'a2',
    name: 'Parag Parikh Flexi Cap Fund',
    category: 'Flexi Cap • Equity',
    sipAmount: 7500,
    riskLevel: 'medium',
    trendData: [100, 105, 112, 108, 115],
    returns: 16.5,
    isPaused: false,
  },
  {
    id: 'a3',
    name: 'Axis Small Cap Fund',
    category: 'Small Cap • Equity',
    sipAmount: 2000,
    riskLevel: 'high',
    trendData: [100, 90, 110, 85, 120],
    returns: 19.8,
    isPaused: false,
  },
  {
    id: 'a4',
    name: 'Tata Digital India Fund',
    category: 'Sectoral • IT',
    sipAmount: 3000,
    riskLevel: 'high',
    trendData: [100, 110, 105, 125, 130],
    returns: 22.4,
    isPaused: false,
  },
];

// Market explanations (simple language)
const MARKET_EXPLANATIONS: Record<string, string> = {
  positive: "📈 Markets are doing well! Your investments are growing steadily. This is normal — stay patient.",
  neutral: "📊 Markets are calm today. Small ups and downs are normal. Keep investing regularly.",
  negative: "📉 Markets dipped a little. Don't worry — this is temporary. SIP helps you buy more when prices are low.",
};

// ═══════════════════════════════════════════════════════════════════════════
// TIME SELECTOR COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface TimeSelectorProps {
  selected: SimulationTimeHorizon;
  type: InvestmentType;
  onSelectTime: (time: SimulationTimeHorizon) => void;
  onSelectType: (type: InvestmentType) => void;
}

const SimulatorControls: React.FC<TimeSelectorProps> = ({ selected, type, onSelectTime, onSelectType }) => {
  const { colors, isDark } = useDesignTheme();
  const styles = createStyles(colors, isDark);
  const timeOptions: SimulationTimeHorizon[] = ['1Y', '3Y', '5Y', '10Y', '15Y'];
  const typeOptions: { id: InvestmentType, label: string, icon: string }[] = [
    { id: 'SIP', label: 'Monthly SIP', icon: '📅' },
    { id: 'Lumpsum', label: 'One-time', icon: '💰' }
  ];

  return (
    <View style={styles.controlsContainer}>
      {/* Method Toggle */}
      <View style={styles.methodToggleContainer}>
        {typeOptions.map((opt) => (
          <TouchableOpacity
            key={opt.id}
            style={[
              styles.methodOption,
              type === opt.id && styles.methodOptionActive
            ]}
            onPress={() => onSelectType(opt.id)}
          >
            <Text style={[styles.methodOptionText, type === opt.id && styles.methodOptionTextActive]}>
              {opt.icon} {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Time Horizon Selector */}
      <View style={styles.timeOptions}>
        {timeOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.timeOption,
              selected === option && styles.timeOptionActive,
            ]}
            onPress={() => onSelectTime(option)}
          >
            <Text
              style={[
                styles.timeOptionText,
                selected === option && styles.timeOptionTextActive,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// BALANCE DISPLAY COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

// Initial wallet amount (fixed as virtual practice budget)
const INITIAL_WALLET_BALANCE = 1000000; // ₹10,00,000

interface BalanceDisplayProps {
  totalPlanned: number;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ totalPlanned }) => {
  const { colors, isDark } = useDesignTheme();
  const styles = createStyles(colors, isDark);
  const usedPercent = (totalPlanned / INITIAL_WALLET_BALANCE) * 100;

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('en-IN').format(amount);
  };

  return (
    <WBLCard style={styles.premiumBalanceCard} variant="default">
      <View style={styles.balanceHeader}>
        <View>
          <Text style={styles.balanceLabel}>PRACTICE AMOUNT</Text>
          <Text style={styles.balanceAmount}>
            <WBLAnimatedNumber value={INITIAL_WALLET_BALANCE} prefix="₹" />
          </Text>
        </View>
        <WBLPulse active={totalPlanned === 0}>
          <View style={styles.virtualBadge}>
            <Text style={styles.virtualBadgeText}>🎮 Demo Budget</Text>
          </View>
        </WBLPulse>
      </View>

      <View style={styles.walletProgressTrack}>
        <Text style={styles.walletProgressTitle}>Simulated Usage</Text>
        <WBLProgressBar
          progress={Math.min(usedPercent / 100, 1)}
          variant={usedPercent > 100 ? 'secondary' : usedPercent > 90 ? 'secondary' : 'success'}
        />
        <View style={styles.walletProgressLabels}>
          <Text style={styles.walletPercentText}>{usedPercent.toFixed(0)}% Allocated</Text>
          <Text style={styles.walletRemainingText}>
            {usedPercent <= 100
              ? `₹${formatBalance(INITIAL_WALLET_BALANCE - totalPlanned)} remaining`
              : 'Over Budget'}
          </Text>
        </View>
      </View>
    </WBLCard>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// PORTFOLIO SUMMARY COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface PortfolioSummaryProps {
  totalInvested: number;
  currentValue: number;
  marketStatus: 'positive' | 'neutral' | 'negative';
  graphData: { x: number; y: number; label: string }[];
  interpretationPoints: any[];
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
  totalInvested,
  currentValue,
  marketStatus,
  graphData,
  interpretationPoints
}) => {
  const { colors, isDark } = useDesignTheme();
  const styles = createStyles(colors, isDark);
  const profit = currentValue - totalInvested;
  const profitPercent = totalInvested > 0 ? (profit / totalInvested) * 100 : 0;
  const isPositive = profit >= 0;

  // Map graphData (monthly/periodic) to GrowthChart
  // GrowthChart expects { year: number, value: number }[]
  const chartPoints = graphData.map((d, i) => ({
    year: Math.floor(d.x / 12),
    month: d.x % 12,
    value: d.y,
    // Add original x for potential future use
    x: d.x
  }));

  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryTitle}>Simulation Outcome</Text>

      {/* Stats Cards */}
      <View style={styles.statsGrid}>
        <WBLStatCard
          label="Total Invested"
          value={<WBLAnimatedNumber value={Math.round(totalInvested)} />}
          prefix="₹"
          variant="highlight"
          style={styles.statCard}
        />
        <WBLStatCard
          label={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 13, color: colors.neutral[500], marginRight: 6 }}>Maturity Value</Text>
              <WBLPulseDot size={8} color={DesignColors.secondary[500]} />
              <Text style={{ fontSize: 10, fontWeight: '800', color: DesignColors.secondary[500], marginLeft: 4 }}>LIVE</Text>
            </View>
          }
          value={<WBLAnimatedNumber value={Math.round(currentValue)} />}
          prefix="₹"
          variant="growth"
          style={styles.statCard}
        />
      </View>

      <WBLCard style={styles.profitHighlight} variant={isPositive ? 'accent' : 'outline'}>
        <View style={styles.profitHeader}>
          <Text style={styles.profitLabel}>{isPositive ? 'ESTIMATED PROFIT' : 'TEMPORARY DIP'}</Text>
          <WBLBadge
            content={`${isPositive ? '+' : ''}${profitPercent.toFixed(1)}%`}
            variant={isPositive ? 'success' : 'warning'}
          />
        </View>
        <Text style={[styles.profitAmount, { color: isPositive ? colors.secondary[600] : colors.semantic.error.main }]}>
          {isPositive ? '+' : '-'}₹{Math.abs(Math.round(currentValue - totalInvested)).toLocaleString('en-IN')}
        </Text>
      </WBLCard>

      {/* Visualization */}
      <View style={styles.chartWrapper}>
        <Text style={styles.chartTitle}>Wealth Growth Trend</Text>
        <GrowthChart data={chartPoints} investedAmount={totalInvested} hideContainer={true} />
      </View>

      {/* Interpretation Points */}
      <View style={styles.highlightsContainer}>
        <Text style={styles.highlightsTitle}>Key Highlights</Text>
        {interpretationPoints.map((point, idx) => (
          <View key={idx} style={styles.highlightItem}>
            <View style={[styles.highlightDot, { backgroundColor: point.type === 'dip' ? colors.semantic.error.main : colors.secondary[400] }]} />
            <View style={styles.highlightTextContent}>
              <Text style={styles.highlightLabel}>{point.label}</Text>
              <Text style={styles.highlightDesc}>{point.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Market Explanation */}
      <View style={styles.marketExplanation}>
        <Text style={styles.marketExplanationText}>
          {MARKET_EXPLANATIONS[marketStatus]}
        </Text>
      </View>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// ADD FUND BUTTON COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface AddFundButtonProps {
  currentCount: number;
  maxCount: number;
  onPress: () => void;
}

const AddFundButton: React.FC<AddFundButtonProps> = ({
  currentCount,
  maxCount,
  onPress,
}) => {
  const { colors, isDark } = useDesignTheme();
  const styles = createStyles(colors, isDark);
  const isMaxReached = currentCount >= maxCount;

  return (
    <View style={styles.addFundContainer}>
      <TouchableOpacity
        style={[styles.addFundButton, isMaxReached && styles.addFundButtonDisabled]}
        onPress={onPress}
        disabled={isMaxReached}
      >
        <View style={styles.addFundIcon}>
          <Text style={styles.addFundIconText}>+</Text>
        </View>
        <Text style={[styles.addFundText, isMaxReached && styles.addFundTextDisabled]}>
          Add New Fund
        </Text>
      </TouchableOpacity>

      {/* Limit Indicator */}
      <View style={styles.limitIndicator}>
        <View style={styles.limitBar}>
          <View
            style={[
              styles.limitFill,
              { width: `${(currentCount / maxCount) * 100}%` }
            ]}
          />
        </View>
        <Text style={styles.limitText}>
          {currentCount}/{maxCount} funds
        </Text>
      </View>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

// Initial wallet amount is now defined above to be used in BalanceDisplay as well.

// Income-based investment guidance thresholds
const INVESTMENT_GUIDANCE = {
  MIN_PERCENT: 10, // Minimum recommended: 10% of income
  MAX_PERCENT: 30, // Maximum recommended: 30% of income
};

import { useRouter } from 'expo-router';

export default function SimulatorScreen() {
  const router = useRouter();
  const { colors, isDark } = useDesignTheme();
  const styles = createStyles(colors, isDark);
  const [timeHorizon, setTimeHorizon] = useState<SimulationTimeHorizon>('5Y');
  const [funds, setFunds] = useState<Fund[]>(SAMPLE_FUNDS);
  // Investment type state (SIP by default, extensible to Lumpsum)
  const [investmentType, setInvestmentType] = useState<InvestmentType>('SIP');

  // Real-time fluctuation state
  const [liveNoise, setLiveNoise] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Small random fluctuation between -0.05% and +0.05%
      const noise = (Math.random() - 0.5) * 0.001;
      setLiveNoise(noise);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Edit Fund State
  const [editingFundId, setEditingFundId] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState<string>('');
  const [editError, setEditError] = useState<string>('');

  // ═══════════════════════════════════════════════════════════════════════════
  // MONTHLY INCOME LOGIC
  // ═══════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════
  // USER PROFILE LOGIC
  // ═══════════════════════════════════════════════════════════════════════════

  const PROFILES = [
    { id: 'student', name: 'Student', emoji: '🎓', defaultIncome: 15000 },
    { id: 'job', name: 'Job', emoji: '💼', defaultIncome: 50000 },
    { id: 'business', name: 'Business', emoji: '🏪', defaultIncome: 120000 },
    { id: 'custom', name: 'Custom', emoji: '👤', defaultIncome: 0 },
  ];

  const [activeProfileId, setActiveProfileId] = useState<string>('job');
  const [monthlyIncome, setMonthlyIncome] = useState<number>(50000); // Default ₹50,000

  // Calculate suggested investment range based on income
  const suggestedMinInvestment = Math.round(monthlyIncome * (INVESTMENT_GUIDANCE.MIN_PERCENT / 100));
  const suggestedMaxInvestment = Math.round(monthlyIncome * (INVESTMENT_GUIDANCE.MAX_PERCENT / 100));

  // ═══════════════════════════════════════════════════════════════════════════
  // WALLET LOGIC
  // ═══════════════════════════════════════════════════════════════════════════

  // Calculate total committed investment (sum of all active SIP amounts × months)
  const months = { '1Y': 12, '3Y': 36, '5Y': 60, '10Y': 120, '15Y': 180, '20Y': 240, '30Y': 360 }[timeHorizon] as number;

  // Total monthly commitment (for SIP) or One-time commitment (for Lumpsum)
  const totalCommitment = funds
    .filter((f) => !f.isPaused)
    .reduce((sum, f) => sum + f.sipAmount, 0);

  // Total amount that will be invested over the time horizon
  // For SIP: Monthly Amount × Months
  // For Lumpsum: One-time Amount (at start)
  const totalPlannedInvestment = investmentType === 'SIP'
    ? totalCommitment * months
    : totalCommitment;

  // Monthly investment amount for guidance calculations
  // If SIP: equals totalCommitment
  // If Lumpsum: 0 (since it's not a recurring monthly cost)
  const totalMonthlyInvestment = investmentType === 'SIP' ? totalCommitment : 0;

  // Calculate wallet balance: initial balance minus what's been committed to invest
  // The remaining stays unused in wallet
  const walletBalance = INITIAL_WALLET_BALANCE - totalPlannedInvestment;

  // Validate: cannot invest more than wallet balance
  const isOverBudget = totalPlannedInvestment > INITIAL_WALLET_BALANCE;

  // The actual invested amount is capped at wallet balance
  const effectiveInvestedAmount = Math.min(totalPlannedInvestment, INITIAL_WALLET_BALANCE);

  // For display purposes, show remaining wallet balance (cannot go negative)
  const displayWalletBalance = Math.max(0, walletBalance);

  // ═══════════════════════════════════════════════════════════════════════════
  // INCOME-BASED GUIDANCE (INFORMATIONAL ONLY - DOES NOT BLOCK)
  // ═══════════════════════════════════════════════════════════════════════════

  // Calculate investment percentage of income
  const investmentPercentOfIncome = monthlyIncome > 0
    ? Math.round((totalMonthlyInvestment / monthlyIncome) * 100)
    : 0;

  // Generate guidance message based on investment vs income ratio
  type GuidanceType = 'success' | 'info' | 'warning' | null;
  interface IncomeGuidance {
    type: GuidanceType;
    message: string;
  }

  const getIncomeGuidance = (): IncomeGuidance => {
    if (monthlyIncome <= 0) {
      return { type: null, message: '' };
    }

    if (totalMonthlyInvestment === 0) {
      return {
        type: 'info',
        message: `💡 Start with ₹${suggestedMinInvestment.toLocaleString('en-IN')} - ₹${suggestedMaxInvestment.toLocaleString('en-IN')}/month (10-30% of income).`,
      };
    }

    if (investmentPercentOfIncome < INVESTMENT_GUIDANCE.MIN_PERCENT) {
      return {
        type: 'info',
        message: `💡 You're investing ${investmentPercentOfIncome}% of income. Consider increasing to at least 10% (₹${suggestedMinInvestment.toLocaleString('en-IN')}/month) for better growth.`,
      };
    }

    if (investmentPercentOfIncome > INVESTMENT_GUIDANCE.MAX_PERCENT) {
      return {
        type: 'warning',
        message: `⚠️ You're investing ${investmentPercentOfIncome}% of income. This exceeds the recommended 30%. Ensure you have sufficient funds for emergencies and expenses.`,
      };
    }

    // Within recommended range
    return {
      type: 'success',
      message: `✅ Great! You're investing ${investmentPercentOfIncome}% of income — within the healthy 10-30% range.`,
    };
  };

  // Get current guidance (does NOT block simulation)
  const incomeGuidance = getIncomeGuidance();

  // Handler to update monthly income
  const handleUpdateMonthlyIncome = (newIncome: number) => {
    setActiveProfileId('custom');
    if (newIncome >= 0) {
      setMonthlyIncome(newIncome);
    }
  };

  const selectProfile = (profile: any) => {
    setActiveProfileId(profile.id);
    if (profile.id !== 'custom') {
      setMonthlyIncome(profile.defaultIncome);
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // SIMULATION LOGIC
  // ═══════════════════════════════════════════════════════════════════════════

  // Import simulation functions
  const {
    simulatePortfolio,
    getMonthsFromHorizon,
    getRiskProfile,
  } = require('@/utils/simulation-engine');

  // Calculate effective SIP amounts based on wallet constraints
  // If over budget, scale down proportionally
  const scaleFactor = isOverBudget
    ? INITIAL_WALLET_BALANCE / totalPlannedInvestment
    : 1;

  // Convert local fund type to simulation engine format
  // Apply scale factor to SIP amounts if over budget
  const simulationFunds = funds.map(f => ({
    id: f.id,
    name: f.name,
    category: f.category,
    // Scale SIP amount if over budget to stay within wallet limit
    // For active funds, calculate effective invested amount
    // If SIP: scale monthly SIP amount
    // If Lumpsum: scale initial principal
    sipAmount: f.isPaused ? 0 : Math.round(f.sipAmount * scaleFactor),
    riskLevel: f.riskLevel,
    expectedReturn: getRiskProfile(f.riskLevel).expectedReturn,
    volatility: getRiskProfile(f.riskLevel).volatility,
    isPaused: f.isPaused,
  }));

  // Run simulation
  const simulationMonths = months; // Alias for clarity

  const simulationResult = simulatePortfolio({
    funds: simulationFunds,
    timeHorizonMonths: simulationMonths,
    marketCondition: 'neutral',
    investmentType: investmentType,
  });

  // Extract results
  // Extract results with explicit metrics
  const {
    totalInvested,
    maturityValue,
    profit,
    marketStatus,
    interpretationPoints,
    graphData: portfolioGraphData
  } = simulationResult;

  // Use maturityValue for display (synonym for currentValue)
  const currentValue = maturityValue;

  // Update fund trend data from simulation
  const fundsWithSimulatedData = funds.map((fund) => {
    const fundPerformance = simulationResult.fundPerformances.find(
      (fp: { fundId: string }) => fp.fundId === fund.id
    );
    if (fundPerformance) {
      return {
        ...fund,
        trendData: fundPerformance.trendData,
        returns: fundPerformance.percentageReturns,
        graphData: fundPerformance.graphData
      };
    }
    return fund;
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // HANDLERS
  // ═══════════════════════════════════════════════════════════════════════════

  const handleAddFund = () => {
    // Pick a fund that isn't already in the portfolio
    const currentIds = funds.map(f => f.id);
    const pool = AVAILABLE_FUNDS.filter(f => !currentIds.includes(f.id));

    if (pool.length === 0) {
      console.log('No more unique funds to add');
      return;
    }

    // Pick random fund
    const newFund = { ...pool[Math.floor(Math.random() * pool.length)], id: Date.now().toString() };

    // Validate if adding this default amount exceeds budget
    const potentialTotal = totalPlannedInvestment + (newFund.sipAmount * months);
    if (potentialTotal > INITIAL_WALLET_BALANCE) {
      // Add with 0 or small amount if budget is tight
      newFund.sipAmount = 0;
    }

    setFunds(prev => [...prev, newFund]);
  };

  const handleRemoveFund = (fundId: string) => {
    setFunds(prev => prev.filter(f => f.id !== fundId));
  };

  const handleResetPortfolio = () => {
    setFunds(SAMPLE_FUNDS);
  };

  const handlePauseToggle = (fundId: string) => {
    setFunds((prev) =>
      prev.map((f) =>
        f.id === fundId ? { ...f, isPaused: !f.isPaused } : f
      )
    );
  };

  const handleEditFund = (fundId: string) => {
    const fund = funds.find(f => f.id === fundId);
    if (fund) {
      setEditingFundId(fundId);
      setEditAmount(fund.sipAmount.toString());
      setEditError('');
    }
  };

  const saveEdit = () => {
    const amount = Number(editAmount);
    if (isNaN(amount) || amount < 0) {
      setEditError('Invalid amount');
      return;
    }

    if (editingFundId) {
      const success = handleUpdateSipAmount(editingFundId, amount);
      if (success) {
        setEditingFundId(null);
      } else {
        setEditError('Amount exceeds wallet balance');
      }
    }
  };

  // Handler to update SIP amount for a fund (validates against wallet)
  const handleUpdateSipAmount = (fundId: string, newAmount: number) => {
    // Calculate what the new total would be
    const currentFundAmount = funds.find(f => f.id === fundId)?.sipAmount || 0;
    const newTotalMonthly = totalMonthlyInvestment - currentFundAmount + newAmount;
    const newTotalPlanned = newTotalMonthly * months;

    // Validate against wallet balance
    if (newTotalPlanned > INITIAL_WALLET_BALANCE) {
      const maxAllowedMonthly = (INITIAL_WALLET_BALANCE / months) - (totalMonthlyInvestment - currentFundAmount);
      console.log(`Amount exceeds wallet. Max allowed: ₹${Math.floor(maxAllowedMonthly)}/month`);
      return false;
    }

    setFunds((prev) =>
      prev.map((f) =>
        f.id === fundId ? { ...f, sipAmount: newAmount } : f
      )
    );
    return true;
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.primary[600]} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* TOP SECTION - Balance & Time Selection */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <WBLEntrance delay={100}>
          <View style={styles.topSection}>
            <BalanceDisplay
              totalPlanned={totalPlannedInvestment}
            />
            <SimulatorControls
              selected={timeHorizon}
              type={investmentType}
              onSelectTime={setTimeHorizon}
              onSelectType={setInvestmentType}
            />
          </View>
        </WBLEntrance>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* INCOME INPUT SECTION */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <WBLEntrance delay={300}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>User Profile & Income</Text>
              <Text style={styles.sectionSubtitle}>
                Income can vary by profile. Update yours to see custom guidance.
              </Text>
            </View>

            <View style={styles.profileChipsContainer}>
              {PROFILES.map((profile) => (
                <TouchableOpacity
                  key={profile.id}
                  style={[
                    styles.profileChip,
                    activeProfileId === profile.id && styles.profileChipActive,
                  ]}
                  onPress={() => selectProfile(profile)}
                >
                  <Text style={styles.profileChipEmoji}>{profile.emoji}</Text>
                  <Text style={[
                    styles.profileChipText,
                    activeProfileId === profile.id && styles.profileChipTextActive,
                  ]}>
                    {profile.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <WBLInput
              label="Monthly Income"
              value={monthlyIncome > 0 ? monthlyIncome.toString() : ''}
              onChangeText={(text: string) => handleUpdateMonthlyIncome(Number(text) || 0)}
              keyboardType="numeric"
              placeholder="e.g. 50000"
              leftElement={<Text style={{ color: colors.neutral[500], fontSize: 16 }}>₹</Text>}
              style={{ marginBottom: DesignSpacing.xs }}
            />
            <Text style={{ fontSize: 12, color: colors.neutral[600], marginBottom: DesignSpacing.md, marginLeft: 4 }}>
              Suggested: 10-30% of this should go to SIP
            </Text>

            {incomeGuidance.type && incomeGuidance.message ? (
              <WBLInfoBox
                variant={incomeGuidance.type}
                message={incomeGuidance.message}
              />
            ) : null}
          </View>
        </WBLEntrance>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SUMMARY SECTION */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <WBLEntrance delay={500}>
          <View style={styles.section}>
            <PortfolioSummary
              totalInvested={totalInvested}
              currentValue={currentValue * (1 + liveNoise)}
              marketStatus={marketStatus}
              graphData={portfolioGraphData}
              interpretationPoints={interpretationPoints}
            />
          </View>
        </WBLEntrance>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* PORTFOLIO SECTION - Fund Cards */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <WBLEntrance delay={700}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Text style={styles.sectionTitle}>Your SIP Portfolio</Text>
                <TouchableOpacity onPress={handleResetPortfolio} style={styles.resetButton}>
                  <Text style={styles.resetButtonText}>🔄 Reset</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.sectionSubtitle}>
                Monthly investment: ₹{totalMonthlyInvestment.toLocaleString('en-IN')}
              </Text>
            </View>

            {/* Add Fund Button */}
            <AddFundButton
              currentCount={funds.length}
              maxCount={15}
              onPress={handleAddFund}
            />

            {/* Fund Cards */}
            <View style={styles.fundsContainer}>
              {fundsWithSimulatedData.map((fund) => (
                <WBLFundCard
                  key={fund.id}
                  name={fund.name}
                  category={fund.category}
                  sipAmount={fund.sipAmount}
                  riskLevel={fund.riskLevel}
                  trendData={fund.trendData}
                  returns={fund.returns}
                  isPaused={fund.isPaused}
                  onPauseToggle={() => handlePauseToggle(fund.id)}
                  onEdit={() => handleEditFund(fund.id)}
                  onRemove={() => handleRemoveFund(fund.id)}
                  style={styles.fundCard}
                />
              ))}
            </View>

            {/* Info Box */}
            <WBLInfoBox
              variant="info"
              title="💡 Tip"
              message="Pausing a SIP doesn't sell your investment. It just stops new monthly additions temporarily."
            />
          </View>
        </WBLEntrance>

        {/* PRIMARY CTA - VIEW INSIGHTS */}
        <View style={styles.section}>
          <WBLButton
            title="Analyze My Portfolio 📊"
            variant="primary"
            size="large"
            fullWidth
            onPress={() => router.push('/insights')}
            style={styles.ctaButton}
          />
        </View>

        {/* EDUCATIONAL FOOTER */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <View style={styles.footerSection}>
          <WBLCard variant="accent">
            <View style={styles.learnMoreContent}>
              <Text style={styles.learnMoreTitle}>🎓 Keep Learning</Text>
              <Text style={styles.learnMoreText}>
                Want to understand how your money grows? Explore more lessons.
              </Text>
              <WBLButton
                title="View Lessons"
                variant="outline"
                size="small"
                style={styles.learnMoreButton}
                onPress={() => router.push('/learn-mode')}
              />
            </View>
          </WBLCard>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* EDIT FUND MODAL - Replaced BottomSheet with Modal */}
      <WBLModal
        visible={!!editingFundId}
        onClose={() => setEditingFundId(null)}
        title="Update Investment"
        subtitle="Change your monthly SIP amount"
      >
        <WBLInput
          label="SIP Amount (₹)"
          value={editAmount}
          onChangeText={(text: string) => {
            setEditAmount(text);
            setEditError('');
          }}
          keyboardType="numeric"
          error={editError}
          placeholder="e.g. 5000"
          leftElement={<Text style={{ fontSize: 16, color: colors.neutral[500] }}>₹</Text>}
        />

        <View style={{ marginTop: DesignSpacing.lg }}>
          <WBLButton
            onPress={saveEdit}
            title="Save Changes"
            variant="primary"
            fullWidth
            style={{ marginBottom: DesignSpacing.md }}
          />
          <WBLButton
            onPress={() => setEditingFundId(null)}
            title="Cancel"
            variant="outline"
            fullWidth
          />
        </View>
      </WBLModal>
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

  // ─────────────────────────────────────────────────────────────────────────
  // TOP SECTION & WALLET
  // ─────────────────────────────────────────────────────────────────────────
  topSection: {
    backgroundColor: colors.primary[600],
    paddingHorizontal: DesignSpacing.screenPadding,
    paddingTop: DesignSpacing.xl,
    paddingBottom: DesignSpacing.xxl,
    borderBottomLeftRadius: DesignRadius.card,
    borderBottomRightRadius: DesignRadius.card,
  },
  premiumBalanceCard: {
    padding: DesignSpacing.lg,
    backgroundColor: colors.neutral[0],
    marginBottom: DesignSpacing.lg,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: DesignSpacing.md,
  },
  balanceLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: !isDark ? colors.neutral[900] : colors.neutral[400],
    letterSpacing: 1,
    marginBottom: DesignSpacing.xs,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: isDark ? colors.primary[400] : colors.primary[700],
  },
  virtualBadge: {
    backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : colors.primary[50],
    paddingHorizontal: DesignSpacing.sm,
    paddingVertical: DesignSpacing.xs,
    borderRadius: DesignRadius.round,
  },
  virtualBadgeText: {
    fontSize: 12,
    color: isDark ? colors.neutral[0] : colors.neutral[900],
    fontWeight: '700',
  },
  walletProgressTrack: {
    marginTop: DesignSpacing.sm,
  },
  walletProgressTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.neutral[500],
    marginBottom: DesignSpacing.xs,
    textTransform: 'uppercase',
  },
  walletProgressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DesignSpacing.xs,
  },
  walletPercentText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.neutral[600],
  },
  walletRemainingText: {
    fontSize: 12,
    color: colors.neutral[400],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CONTROLS
  // ─────────────────────────────────────────────────────────────────────────
  controlsContainer: {
    gap: DesignSpacing.md,
  },
  methodToggleContainer: {
    flexDirection: 'row',
    backgroundColor: !isDark ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.15)',
    borderRadius: DesignRadius.round,
    padding: 4,
  },
  methodOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: DesignRadius.round,
  },
  methodOptionActive: {
    backgroundColor: colors.neutral[0],
  },
  methodOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: !isDark ? colors.neutral[900] : 'rgba(255,255,255,0.8)',
  },
  methodOptionTextActive: {
    color: !isDark ? colors.neutral[0] : colors.primary[700],
  },
  timeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: DesignSpacing.xs,
  },
  timeOption: {
    flex: 1,
    backgroundColor: !isDark ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
    paddingVertical: 8,
    borderRadius: DesignRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  timeOptionActive: {
    backgroundColor: !isDark ? colors.neutral[900] : 'rgba(255,255,255,0.2)',
    borderColor: isDark ? colors.neutral[0] : 'transparent',
  },
  timeOptionText: {
    color: !isDark ? colors.neutral[900] : 'rgba(255,255,255,0.9)',
    fontSize: 12,
    fontWeight: '600',
  },
  timeOptionTextActive: {
    color: colors.neutral[0],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // USER PROFILE
  // ─────────────────────────────────────────────────────────────────────────
  profileChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DesignSpacing.sm,
    marginBottom: DesignSpacing.lg,
  },
  profileChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DesignSpacing.md,
    paddingVertical: DesignSpacing.sm,
    backgroundColor: colors.neutral[100],
    borderRadius: DesignRadius.round,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  profileChipActive: {
    backgroundColor: colors.primary[50],
    borderColor: colors.primary[400],
  },
  profileChipEmoji: {
    fontSize: 14,
    marginRight: DesignSpacing.xs,
  },
  profileChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.neutral[600],
  },
  profileChipTextActive: {
    color: colors.primary[700],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SUMMARY & CHART
  // ─────────────────────────────────────────────────────────────────────────
  section: {
    marginTop: DesignSpacing.xl,
    paddingHorizontal: DesignSpacing.screenPadding,
  },
  sectionHeader: {
    marginBottom: DesignSpacing.md,
  },
  resetButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: DesignRadius.round,
    backgroundColor: colors.neutral[100],
  },
  resetButtonText: {
    ...DesignTextStyles.labelSmall,
    color: colors.neutral[600],
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: isDark ? colors.primary[400] : colors.primary[800],
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.neutral[700], // Increased contrast
    fontWeight: '500',
  },
  summaryContainer: {
    backgroundColor: colors.neutral[0],
    borderRadius: DesignRadius.card,
    padding: DesignSpacing.lg,
    borderWidth: 1,
    borderColor: isDark ? colors.neutral[200] : colors.neutral[200],
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[700],
    marginBottom: DesignSpacing.lg,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: DesignSpacing.md,
    marginBottom: DesignSpacing.md,
  },
  statCard: {
    flex: 1,
  },
  profitHighlight: {
    padding: DesignSpacing.md,
    marginBottom: DesignSpacing.xl,
  },
  profitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DesignSpacing.xs,
  },
  profitLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.neutral[700], // Increased contrast
  },
  profitAmount: {
    fontSize: 24,
    fontWeight: '700',
  },
  chartWrapper: {
    marginBottom: DesignSpacing.xl,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.neutral[700],
    marginBottom: DesignSpacing.md,
    marginLeft: 40,
  },
  highlightsContainer: {
    marginBottom: DesignSpacing.lg,
  },
  highlightsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[700],
    marginBottom: DesignSpacing.md,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: DesignSpacing.md,
  },
  highlightDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: DesignSpacing.lg,
  },
  highlightTextContent: {
    flex: 1,
  },
  highlightLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[700],
  },
  highlightDesc: {
    fontSize: 13,
    color: colors.neutral[700], // Increased contrast
    fontWeight: '500',
  },
  marketExplanation: {
    paddingTop: DesignSpacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
  },
  marketExplanationText: {
    fontSize: 14,
    color: colors.neutral[700], // Increased contrast
    fontStyle: 'italic',
    textAlign: 'center',
    fontWeight: '500',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // FUND LIST
  // ─────────────────────────────────────────────────────────────────────────
  addFundContainer: {
    marginBottom: DesignSpacing.lg,
  },
  addFundButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDark ? colors.neutral[100] : colors.primary[50],
    padding: DesignSpacing.lg,
    borderRadius: DesignRadius.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: isDark ? colors.neutral[300] : colors.primary[300],
  },
  addFundButtonDisabled: {
    backgroundColor: colors.neutral[100],
    borderColor: colors.neutral[300],
  },
  addFundIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: DesignSpacing.lg,
  },
  addFundIconText: {
    color: colors.neutral[0],
    fontSize: 18,
    fontWeight: 'bold',
  },
  addFundText: {
    color: isDark ? colors.neutral[800] : colors.neutral[900],
    fontWeight: '700',
  },
  addFundTextDisabled: {
    color: colors.neutral[400],
  },
  limitIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: DesignSpacing.sm,
  },
  limitBar: {
    flex: 1,
    height: 4,
    backgroundColor: colors.neutral[200],
    borderRadius: 2,
    marginRight: DesignSpacing.sm,
    overflow: 'hidden',
  },
  limitFill: {
    height: '100%',
    backgroundColor: colors.primary[400],
  },
  limitText: {
    fontSize: 12,
    color: colors.neutral[500],
  },
  fundsContainer: {
    marginBottom: DesignSpacing.lg,
  },
  fundCard: {
    marginBottom: DesignSpacing.md,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // FOOTER
  // ─────────────────────────────────────────────────────────────────────────
  footerSection: {
    marginTop: DesignSpacing.xxl,
    paddingHorizontal: DesignSpacing.screenPadding,
  },
  learnMoreContent: {
    alignItems: 'center',
    padding: DesignSpacing.md,
  },
  learnMoreTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: isDark ? colors.primary[400] : colors.primary[800],
    marginBottom: DesignSpacing.xs,
  },
  learnMoreText: {
    fontSize: 14,
    color: colors.neutral[600],
    textAlign: 'center',
    marginBottom: DesignSpacing.lg,
  },
  learnMoreButton: {
    minWidth: 160,
  },
  ctaButton: {
    shadowColor: colors.primary[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: DesignSpacing.xl,
  },
});
