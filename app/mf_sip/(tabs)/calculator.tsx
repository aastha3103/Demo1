
/**
 * ═══════════════════════════════════════════════════════════════════════════
 * FINLEARN - SIP & MATURITY CALCULATOR
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * A clean, intuitive calculator to help users plan their financial goals.
 */

import {
    DesignColors,
    DesignRadius,
    DesignSpacing,
    WBLAnimatedNumber,
    WBLBadge,
    WBLCard,
    WBLEntrance,
    WBLInput
} from '@/components/mf_sip/design-system';
import { useDesignTheme } from '@/hooks/mf_sip/use-design-theme';
import React, { useEffect, useState } from 'react';
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
// CALCULATOR LOGIC
// ═══════════════════════════════════════════════════════════════════════════

const calculateMaturity = (
    monthlyInvestment: number,
    years: number,
    expectedReturn: number,
    isSip: boolean = true
) => {
    const r = expectedReturn / 100 / 12;
    const n = years * 12;

    if (isSip) {
        // SIP Formula: P × ((1 + r)^n - 1) / r × (1 + r)
        const maturity = monthlyInvestment * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
        const invested = monthlyInvestment * n;
        return { maturity, invested, profit: maturity - invested };
    } else {
        // Lumpsum Formula: P × (1 + r)^n
        const maturity = monthlyInvestment * Math.pow(1 + r, n);
        const invested = monthlyInvestment;
        return { maturity, invested, profit: maturity - invested };
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function CalculatorScreen() {
    const { colors, isDark } = useDesignTheme();
    const styles = createStyles(colors, isDark);

    const [investmentType, setInvestmentType] = useState<'SIP' | 'Lumpsum'>('SIP');
    const [amount, setAmount] = useState('5000');
    const [years, setYears] = useState('10');
    const [expectedReturn, setExpectedReturn] = useState('12');

    const [results, setResults] = useState({ maturity: 0, invested: 0, profit: 0 });

    useEffect(() => {
        const res = calculateMaturity(
            Number(amount) || 0,
            Number(years) || 0,
            Number(expectedReturn) || 0,
            investmentType === 'SIP'
        );
        setResults(res);
    }, [amount, years, expectedReturn, investmentType]);

    const percentageProfit = results.invested > 0 ? (results.profit / results.invested) * 100 : 0;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.neutral[50]} />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <WBLEntrance delay={100}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Wealth Calculator</Text>
                        <Text style={styles.headerSubtitle}>Plan your future with precision</Text>
                    </View>
                </WBLEntrance>

                {/* Results Card */}
                <WBLEntrance delay={200}>
                    <WBLCard variant="accent" style={styles.resultsCard}>
                        <Text style={styles.resultsLabel}>ESTIMATED MATURITY VALUE</Text>
                        <View style={styles.maturityAmountContainer}>
                            <Text style={styles.currencySymbol}>₹</Text>
                            <View style={{ flexShrink: 1 }}>
                                <Text style={styles.maturityValue}>
                                    <WBLAnimatedNumber value={Math.round(results.maturity)} />
                                </Text>
                            </View>
                        </View>

                        <View style={styles.resultsGrid}>
                            <View style={styles.resultItem}>
                                <Text style={styles.smallLabel}>TOTAL INVESTED</Text>
                                <Text style={styles.smallValue}>
                                    ₹<WBLAnimatedNumber value={Math.round(results.invested)} />
                                </Text>
                            </View>
                            <View style={styles.resultItem}>
                                <Text style={styles.smallLabel}>EST. PROFIT</Text>
                                <Text style={[styles.smallValue, { color: colors.secondary[600] }]}>
                                    +₹<WBLAnimatedNumber value={Math.round(results.profit)} />
                                </Text>
                            </View>
                        </View>

                        <View style={styles.profitBadgeContainer}>
                            <WBLBadge content={`${percentageProfit.toFixed(1)}% Return`} variant="success" />
                        </View>
                    </WBLCard>
                </WBLEntrance>

                <WBLEntrance delay={300}>
                    <View style={styles.inputSection}>
                        {/* Toggle */}
                        <View style={styles.toggleContainer}>
                            <TouchableOpacity
                                onPress={() => setInvestmentType('SIP')}
                                style={[styles.toggleButton, investmentType === 'SIP' && styles.toggleButtonActive]}
                            >
                                <Text style={[styles.toggleText, investmentType === 'SIP' && styles.toggleTextActive]}>SIP</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setInvestmentType('Lumpsum')}
                                style={[styles.toggleButton, investmentType === 'Lumpsum' && styles.toggleButtonActive]}
                            >
                                <Text style={[styles.toggleText, investmentType === 'Lumpsum' && styles.toggleTextActive]}>Lump sum</Text>
                            </TouchableOpacity>
                        </View>

                        <WBLInput
                            label={investmentType === 'SIP' ? "Monthly Investment Amount" : "One-time Investment Amount"}
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="numeric"
                            placeholder="e.g. 5000"
                            leftElement={<Text style={styles.inputIcon}>₹</Text>}
                        />

                        <View style={styles.rowInputs}>
                            <View style={{ flex: 1, marginRight: DesignSpacing.md }}>
                                <WBLInput
                                    label="Time Period (Years)"
                                    value={years}
                                    onChangeText={setYears}
                                    keyboardType="numeric"
                                    placeholder="e.g. 10"
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <WBLInput
                                    label="Expected Return (%)"
                                    value={expectedReturn}
                                    onChangeText={setExpectedReturn}
                                    keyboardType="numeric"
                                    placeholder="e.g. 12"
                                />
                            </View>
                        </View>
                    </View>
                </WBLEntrance>

                <WBLEntrance delay={400}>
                    <WBLCard style={styles.insightCard}>
                        <View style={styles.insightHeader}>
                            <Text style={styles.insightEmoji}>💡</Text>
                            <Text style={styles.insightTitle}>Investor Insight</Text>
                        </View>
                        <Text style={styles.insightText}>
                            Increasing your {investmentType === 'SIP' ? 'SIP' : 'investment'} by just 10% every year can lead to a
                            significantly higher maturity amount due to the power of compounding.
                        </Text>
                    </WBLCard>
                </WBLEntrance>

                <View style={{ height: 40 }} />
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
        padding: DesignSpacing.screenPadding,
        paddingBottom: 100,
    },
    header: {
        marginBottom: DesignSpacing.xl,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.neutral[900],
        letterSpacing: -1,
    },
    headerSubtitle: {
        fontSize: 14,
        color: colors.neutral[600],
        fontWeight: '500',
    },
    resultsCard: {
        padding: DesignSpacing.xl,
        alignItems: 'center',
        marginBottom: DesignSpacing.xl,
        borderRadius: DesignRadius.xxl,
    },
    resultsLabel: {
        fontSize: 12,
        fontWeight: '800',
        color: colors.primary[700],
        letterSpacing: 1.5,
        marginBottom: DesignSpacing.sm,
    },
    maturityAmountContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: DesignSpacing.lg,
    },
    currencySymbol: {
        fontSize: 24,
        fontWeight: '600',
        color: colors.neutral[900],
        marginRight: 4,
    },
    maturityValue: {
        fontSize: 42,
        fontWeight: '900',
        color: colors.neutral[900],
        letterSpacing: -1,
    },
    resultsGrid: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingVertical: DesignSpacing.md,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
    },
    resultItem: {
        alignItems: 'center',
        flex: 1,
    },
    smallLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: colors.neutral[500],
        marginBottom: 4,
    },
    smallValue: {
        fontSize: 16,
        fontWeight: '800',
        color: colors.neutral[900],
    },
    profitBadgeContainer: {
        marginTop: DesignSpacing.sm,
    },
    inputSection: {
        marginBottom: DesignSpacing.xl,
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: colors.neutral[100],
        borderRadius: DesignRadius.round,
        padding: 4,
        marginBottom: DesignSpacing.lg,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: DesignRadius.round,
    },
    toggleButtonActive: {
        backgroundColor: colors.neutral[0],
        ...DesignColors.shadows?.sm,
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.neutral[500],
    },
    toggleTextActive: {
        color: colors.primary[600],
    },
    inputIcon: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.neutral[400],
    },
    rowInputs: {
        flexDirection: 'row',
        marginTop: DesignSpacing.sm,
    },
    insightCard: {
        padding: DesignSpacing.lg,
        backgroundColor: isDark ? 'rgba(46,174,91,0.05)' : colors.secondary[50],
        borderWidth: 1,
        borderColor: colors.secondary[100],
    },
    insightHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: DesignSpacing.sm,
    },
    insightEmoji: {
        fontSize: 20,
        marginRight: DesignSpacing.sm,
    },
    insightTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: colors.secondary[800],
    },
    insightText: {
        fontSize: 14,
        color: colors.neutral[700],
        lineHeight: 22,
        fontWeight: '500',
    },
});
