/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SIMULATION ENGINE
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Core logic for the Wealth Builder Simulator.
 */

export type SimTimeHorizon = '1Y' | '3Y' | '5Y' | '10Y' | '15Y' | '20Y' | '30Y';
export type TimeHorizon = SimTimeHorizon; // Alias for compatibility
export type InvestmentType = 'SIP' | 'Lumpsum';

export interface Fund {
    id: string;
    name: string;
    // Legacy properties
    risk?: 'Low' | 'Moderate' | 'High';
    return?: number;
    // New properties for simulator
    riskLevel?: 'low' | 'medium' | 'high';
    expectedReturn?: number;
    volatility?: number;
    category: string;
    sipAmount?: number;
    isPaused?: boolean;
    // Any other props
    [key: string]: any;
}

export interface SimulationResult {
    endBalance: number;
    totalInvested: number;
    totalProfit: number;
    dataPoints: { x: number; y: number }[];
    // Extended result for simulator
    maturityValue?: number;
    marketStatus?: string;
    interpretationPoints?: any[];
    graphData?: { x: number; y: number; label: string }[];
    fundPerformances?: any[];
}

// -----------------------------------------------------------------------------
// HELPER FUNCTIONS (New Implementation)
// -----------------------------------------------------------------------------

export const getRiskProfile = (level: string) => {
    switch (level) {
        case 'low':
            return { expectedReturn: 8, volatility: 5 };
        case 'medium':
            return { expectedReturn: 12, volatility: 10 };
        case 'high':
            return { expectedReturn: 15, volatility: 15 };
        default:
            return { expectedReturn: 10, volatility: 8 };
    }
};

export const getMonthsFromHorizon = (horizon: SimTimeHorizon): number => {
    const map: Record<string, number> = {
        '1Y': 12,
        '3Y': 36,
        '5Y': 60,
        '10Y': 120,
        '15Y': 180,
        '20Y': 240,
        '30Y': 360,
    };
    return map[horizon] || 60;
};

interface SimulatePortfolioParams {
    funds: Fund[];
    timeHorizonMonths: number;
    marketCondition: 'positive' | 'neutral' | 'negative';
    investmentType: InvestmentType;
}

export const simulatePortfolio = ({
    funds,
    timeHorizonMonths,
    marketCondition,
    investmentType
}: SimulatePortfolioParams) => {
    let totalInvested = 0;
    let maturityValue = 0;
    const fundPerformances: any[] = [];

    // Common random noise for market correlation (simulating single market movement)
    // We'll generate an array of monthly market factors
    const monthlyMarketFactors: number[] = [];
    for (let m = 0; m <= timeHorizonMonths; m++) {
        // Base market noise: normal distribution around 0
        // Simple approximation: sum of randoms - 3 (central limit theorem approx for small N)
        const marketNoise = (Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3;
        // Scale to standard deviation approximately 15% annual volatility for market
        const marketMonthlyVol = 0.15 / Math.sqrt(12);
        monthlyMarketFactors.push(marketNoise * marketMonthlyVol);
    }


    // Simulate each fund
    funds.forEach(fund => {
        if (fund.isPaused) {
            fundPerformances.push({
                fundId: fund.id,
                trendData: [],
                percentageReturns: 0,
                graphData: []
            });
            return;
        }

        const expReturn = fund.expectedReturn ?? (fund.return ?? 10);
        const fundVol = fund.volatility ?? 10;

        const monthlyRate = expReturn / 100 / 12;
        const monthlyVol = fundVol / 100 / Math.sqrt(12);

        let balance = 0;
        let invested = 0;
        const sipAmount = fund.sipAmount || 0;

        if (investmentType === 'Lumpsum') {
            balance = sipAmount;
            invested = sipAmount;
        }

        const fundGraphData: { x: number; y: number; label: string }[] = [];
        const trendData: number[] = [];

        // Initial point
        fundGraphData.push({ x: 0, y: Math.round(balance), label: 'Start' });
        trendData.push(100); // Start index at 100 for trend

        for (let m = 1; m <= timeHorizonMonths; m++) {
            // Apply market factor (beta) + specific fund alpha/noise
            // Beta assumed 1.0 for simplicity, alpha 0
            const marketFactor = monthlyMarketFactors[m];
            const fundSpecificNoise = ((Math.random() + Math.random() + Math.random() - 1.5) * monthlyVol);

            // Limit volatility impact to avoid unrealistic swings in simple sim
            const totalMonthlyReturn = monthlyRate + (marketFactor * 0.7 + fundSpecificNoise * 0.3);

            // Apply Market Condition Bias
            let conditionBias = 0;
            if (marketCondition === 'positive') conditionBias = 0.02 / 12;
            if (marketCondition === 'negative') conditionBias = -0.05 / 12;

            if (investmentType === 'SIP') {
                balance += sipAmount;
                invested += sipAmount;
            }

            balance = balance * (1 + totalMonthlyReturn + conditionBias);

            // Record data
            if (m % 12 === 0 || m === timeHorizonMonths) {
                fundGraphData.push({
                    x: m,
                    y: Math.round(balance),
                    label: `${Math.floor(m / 12)}Y`
                });
            }
            // Trend data (last 10 points normalized)
            if (timeHorizonMonths - m < 10) {
                trendData.push(Math.round(balance / (invested || 1) * 100));
            }
        }

        totalInvested += invested;
        maturityValue += balance;

        const profit = balance - invested;
        const percentageReturns = invested > 0 ? (profit / invested) * 100 : 0;

        fundPerformances.push({
            fundId: fund.id,
            trendData: trendData.length > 0 ? trendData : [100],
            percentageReturns,
            graphData: fundGraphData
        });
    });

    const profit = maturityValue - totalInvested;

    // Create Aggregate Graph Data
    const graphData: { x: number; y: number; label: string }[] = [];
    if (fundPerformances.length > 0 && fundPerformances[0].graphData) {
        // Sum up y values from all active funds for each time point
        // Assuming all funds have same x points (which they do by logic above)
        const sampleGraph = fundPerformances.find(f => f.graphData.length > 0)?.graphData || [];

        sampleGraph.forEach((point: any, idx: number) => {
            let sumY = 0;
            fundPerformances.forEach(fp => {
                if (fp.graphData && fp.graphData[idx]) {
                    sumY += fp.graphData[idx].y;
                }
            });
            graphData.push({
                x: point.x,
                y: Math.round(sumY),
                label: point.label
            });
        });
    }

    return {
        totalInvested: Math.round(totalInvested),
        maturityValue: Math.round(maturityValue),
        profit: Math.round(profit),
        marketStatus: marketCondition,
        interpretationPoints: [
            { type: 'growth', label: 'Compounding', description: 'Money working for you' },
            { type: 'dip', label: 'Volatility', description: 'Ups and downs are normal' }
        ],
        graphData,
        fundPerformances,
        // Legacy return fields
        endBalance: Math.round(maturityValue),
        totalProfit: Math.round(profit),
        dataPoints: graphData
    };
};

// -----------------------------------------------------------------------------
// LEGACY / COMPATIBILITY (Original Export)
// -----------------------------------------------------------------------------

export const runSimulation = (
    monthlySip: number,
    lumpsum: number,
    expectedReturn: number,
    years: number
): SimulationResult => {
    const annualReturn = expectedReturn / 100;
    const monthlyReturn = Math.pow(1 + annualReturn, 1 / 12) - 1;
    const months = years * 12;

    let balance = lumpsum;
    let totalInvested = lumpsum;
    const dataPoints = [{ x: 0, y: balance }];

    for (let m = 1; m <= months; m++) {
        balance = (balance + monthlySip) * (1 + monthlyReturn);
        totalInvested += monthlySip;

        // Add data point every year or at the end
        if (m % 12 === 0 || m === months) {
            dataPoints.push({ x: m / 12, y: Math.round(balance) });
        }
    }

    return {
        endBalance: Math.round(balance),
        totalInvested: Math.round(totalInvested),
        totalProfit: Math.round(balance - totalInvested),
        dataPoints
    };
};

export const SAMPLE_FUNDS: Fund[] = [
    { id: '1', name: 'Bluechip Equity Fund', risk: 'High', return: 15, category: 'Equity' },
    { id: '2', name: 'Balanced Advantage', risk: 'Moderate', return: 12, category: 'Hybrid' },
    { id: '3', name: 'Liquid Debt Fund', risk: 'Low', return: 7, category: 'Debt' },
];
