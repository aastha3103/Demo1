
import React, { createContext, useContext, useState } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface Task {
    id: string;
    gameId: string;
    title: string;
    description: string;
    coins: number;
    completed: boolean;
}

export interface Voucher {
    id: string;
    title: string;
    description: string;
    cost: number;
    image: string;
}

interface RewardContextType {
    coins: number;
    tasks: Task[];
    vouchers: Voucher[];
    completeTask: (taskId: string) => void;
    redeemVoucher: (voucherId: string) => boolean;
}

const RewardContext = createContext<RewardContextType | undefined>(undefined);

// ═══════════════════════════════════════════════════════════════════════════
// INITIAL DATA
// ═══════════════════════════════════════════════════════════════════════════

const INITIAL_TASKS: Task[] = [
    // Econopolis Tasks
    { id: 'econ_visit', gameId: 'econ', title: 'City Visitor', description: 'Enter the city of Econopolis', coins: 50, completed: false },
    { id: 'econ_roll', gameId: 'econ', title: 'Active Citizen', description: 'Roll the dice 5 times in a session', coins: 50, completed: false },
    { id: 'econ_decision', gameId: 'econ', title: 'Wise Decision', description: 'Complete any financial decision card', coins: 50, completed: false },

    // Market Lab Tasks
    { id: 'stocks_visit', gameId: 'stocks', title: 'Market Morning', description: 'Launch the Market Lab platform', coins: 50, completed: false },
    { id: 'stocks_trade', gameId: 'stocks', title: 'Quick Trader', description: 'Execute any buy or sell trade', coins: 50, completed: false },
    { id: 'stocks_chart', gameId: 'stocks', title: 'Chart Analyst', description: 'Analyze a stock chart in detail', coins: 50, completed: false },

    // Wealth Builder Tasks
    { id: 'mf_visit', gameId: 'mf_sip', title: 'Wealth Check', description: 'Open the Wealth Builder Lab', coins: 50, completed: false },
    { id: 'mf_sip_plan', gameId: 'mf_sip', title: 'SIP Planner', description: 'Create or edit an investment plan', coins: 50, completed: false },
    { id: 'mf_insight', gameId: 'mf_sip', title: 'Insight Seeker', description: 'Check your investment insights', coins: 50, completed: false },
];

const INITIAL_VOUCHERS: Voucher[] = [
    {
        id: 'v_seeds',
        title: 'Organic Seed Pack',
        description: 'Get a variety pack of organic vegetable seeds for your home garden.',
        cost: 500,
        image: '🌱'
    },
    {
        id: 'v_recharge',
        title: '₹50 Mobile Recharge',
        description: 'Instant talktime or data recharge valid for any major network provider.',
        cost: 1000,
        image: '📱'
    },
    {
        id: 'v_cashback',
        title: '₹100 Shopping Cashback',
        description: 'Unlock a flat ₹100 cashback voucher for your next online purchase.',
        cost: 2000,
        image: '💰'
    },
];

// ═══════════════════════════════════════════════════════════════════════════
// PROVIDER
// ═══════════════════════════════════════════════════════════════════════════

export const RewardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [coins, setCoins] = useState(0);
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
    const [vouchers] = useState<Voucher[]>(INITIAL_VOUCHERS);

    // Simple persistence for session (can be improved with AsyncStorage if available)
    const completeTask = (taskId: string) => {
        setTasks(prev => prev.map(task => {
            if (task.id === taskId && !task.completed) {
                setCoins(c => c + task.coins);
                return { ...task, completed: true };
            }
            return task;
        }));
    };

    const redeemVoucher = (voucherId: string) => {
        const voucher = vouchers.find(v => v.id === voucherId);
        if (voucher && coins >= voucher.cost) {
            setCoins(c => c - voucher.cost);
            // In a real app, we'd add to "Redeemed" list
            return true;
        }
        return false;
    };

    return (
        <RewardContext.Provider value={{ coins, tasks, vouchers, completeTask, redeemVoucher }}>
            {children}
        </RewardContext.Provider>
    );
};

export const useRewards = () => {
    const context = useContext(RewardContext);
    if (!context) {
        throw new Error('useRewards must be used within a RewardProvider');
    }
    return context;
};
