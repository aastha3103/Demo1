
import { Task, useRewards, Voucher } from '@/context/RewardContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, {
    FadeInDown,
    FadeInLeft,
    FadeInUp,
    Layout
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

const TaskCard = ({ task }: { task: Task }) => (
    <Animated.View
        layout={Layout.springify()}
        entering={FadeInLeft.duration(600)}
        style={[styles.taskCard, task.completed && styles.taskCompleted]}
    >
        <View style={styles.taskInfo}>
            <Text style={[styles.taskTitle, task.completed && styles.taskTitleDone]}>
                {task.title}
            </Text>
            <Text style={styles.taskDescription}>{task.description}</Text>
        </View>
        <View style={styles.coinBadge}>
            <Text style={styles.coinText}>{task.completed ? '✅' : `+${task.coins} 🪙`}</Text>
        </View>
    </Animated.View>
);

const RewardItem = ({ voucher, onRedeem }: { voucher: Voucher; onRedeem: (v: Voucher) => void }) => (
    <Animated.View
        entering={FadeInUp.delay(200)}
        style={styles.voucherCard}
    >
        <LinearGradient
            colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
            style={styles.voucherGradient}
        >
            <View style={styles.voucherIcon}>
                <Text style={styles.voucherIconText}>{voucher.image}</Text>
            </View>
            <View style={styles.voucherDetails}>
                <Text style={styles.voucherTitle}>{voucher.title}</Text>
                <Text style={styles.voucherPrice}>{voucher.cost} Coins</Text>
            </View>
            <TouchableOpacity
                style={styles.redeemButton}
                onPress={() => onRedeem(voucher)}
            >
                <Text style={styles.redeemText}>Redeem</Text>
            </TouchableOpacity>
        </LinearGradient>
    </Animated.View>
);

// ═══════════════════════════════════════════════════════════════════════════
// MAIN SCREEN
// ═══════════════════════════════════════════════════════════════════════════

export default function RewardCenter() {
    const router = useRouter();
    const { coins, tasks, vouchers, redeemVoucher } = useRewards();
    const [activeTab, setActiveTab] = useState<'tasks' | 'rewards'>('tasks');

    const handleRedeem = (voucher: Voucher) => {
        if (coins >= voucher.cost) {
            Alert.alert(
                "Redeem Reward?",
                `Redeem ${voucher.title} for ${voucher.cost} coins?`,
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Redeem", onPress: () => {
                            const success = redeemVoucher(voucher.id);
                            if (success) {
                                Alert.alert("Success!", `You have successfully redeemed ${voucher.title}. A coupon code will be sent to your email.`);
                            }
                        }
                    }
                ]
            );
        } else {
            Alert.alert("Not enough coins", `You need ${voucher.cost - coins} more coins to redeem this.`);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <LinearGradient
                colors={['#0f172a', '#1e1b4b', '#312e81']}
                style={styles.background}
            />

            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Text style={styles.backArrow}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Reward Center</Text>
                    <View style={styles.coinBalance}>
                        <Text style={styles.balanceText}>{coins} 🪙</Text>
                    </View>
                </View>

                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'tasks' && styles.activeTab]}
                        onPress={() => setActiveTab('tasks')}
                    >
                        <Text style={[styles.tabText, activeTab === 'tasks' && styles.activeTabText]}>Daily Tasks</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'rewards' && styles.activeTab]}
                        onPress={() => setActiveTab('rewards')}
                    >
                        <Text style={[styles.tabText, activeTab === 'rewards' && styles.activeTabText]}>Redeem</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {activeTab === 'tasks' ? (
                        <>
                            <Animated.View entering={FadeInDown.duration(800)}>
                                <Text style={styles.sectionTitle}>Econopolis</Text>
                                {tasks.filter(t => t.gameId === 'econ').map(task => (
                                    <TaskCard key={task.id} task={task} />
                                ))}

                                <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Market Lab</Text>
                                {tasks.filter(t => t.gameId === 'stocks').map(task => (
                                    <TaskCard key={task.id} task={task} />
                                ))}

                                <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Wealth Builder</Text>
                                {tasks.filter(t => t.gameId === 'mf_sip').map(task => (
                                    <TaskCard key={task.id} task={task} />
                                ))}
                            </Animated.View>
                        </>
                    ) : (
                        <View style={styles.vouchersContainer}>
                            {vouchers.map(v => (
                                <RewardItem key={v.id} voucher={v} onRedeem={handleRedeem} />
                            ))}
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
    },
    background: {
        ...StyleSheet.absoluteFillObject,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backArrow: {
        color: '#fff',
        fontSize: 24,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
    },
    coinBalance: {
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(245, 158, 11, 0.3)',
    },
    balanceText: {
        color: '#fbbf24',
        fontWeight: '700',
        fontSize: 16,
    },
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 10,
        gap: 15,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    activeTab: {
        backgroundColor: '#6366f1',
    },
    tabText: {
        color: '#94a3b8',
        fontWeight: '600',
    },
    activeTabText: {
        color: '#fff',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        marginLeft: 5,
    },
    taskCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 20,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    taskCompleted: {
        opacity: 0.7,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: 'rgba(16, 185, 129, 0.2)',
    },
    taskInfo: {
        flex: 1,
    },
    taskTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    taskTitleDone: {
        textDecorationLine: 'line-through',
        color: '#94a3b8',
    },
    taskDescription: {
        color: '#94a3b8',
        fontSize: 12,
        marginTop: 2,
    },
    coinBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    coinText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    vouchersContainer: {
        gap: 15,
    },
    voucherCard: {
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    voucherGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    voucherIcon: {
        width: 60,
        height: 60,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    voucherIconText: {
        fontSize: 32,
    },
    voucherDetails: {
        flex: 1,
    },
    voucherTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    voucherPrice: {
        color: '#fbbf24',
        fontSize: 14,
        fontWeight: '600',
        marginTop: 4,
    },
    redeemButton: {
        backgroundColor: '#6366f1',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 12,
    },
    redeemText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 14,
    },
});
