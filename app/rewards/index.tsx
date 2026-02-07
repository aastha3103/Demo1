
import { Task, useRewards, Voucher } from '@/context/RewardContext';
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
    gold: '#F59E0B',
    goldLight: '#FEF3C7',
};

// ═══════════════════════════════════════════════════════════════════════════
// TRANSLATIONS
// ═══════════════════════════════════════════════════════════════════════════
const TRANSLATIONS = {
    en: {
        title: 'Rewards',
        balance: 'Your Coins',
        dailyTasks: 'Daily Tasks',
        redeem: 'Redeem',
        econopolis: 'Econopolis Tasks',
        marketLab: 'Market Lab Tasks',
        wealthBuilder: 'Wealth Builder Tasks',
        coins: 'Coins',
        redeemBtn: 'Get',
        completed: 'Done ✓',
        earnMore: 'Complete tasks to earn coins!',
        langButton: 'हिंदी',
    },
    hi: {
        title: 'इनाम',
        balance: 'आपके सिक्के',
        dailyTasks: 'दैनिक कार्य',
        redeem: 'भुनाएं',
        econopolis: 'इकॉनोपोलिस कार्य',
        marketLab: 'मार्केट लैब कार्य',
        wealthBuilder: 'वेल्थ बिल्डर कार्य',
        coins: 'सिक्के',
        redeemBtn: 'लें',
        completed: 'पूर्ण ✓',
        earnMore: 'सिक्के कमाने के लिए कार्य पूरे करें!',
        langButton: 'English',
    },
};

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

interface TaskCardProps {
    task: Task;
    t: typeof TRANSLATIONS.en;
}

const TaskCard = ({ task, t }: TaskCardProps) => (
    <Animated.View
        layout={Layout.springify()}
        entering={FadeInLeft.duration(500)}
        style={[styles.taskCard, task.completed && styles.taskCompleted]}
    >
        <View style={[styles.taskIconCircle, task.completed && styles.taskIconCompleted]}>
            <Text style={styles.taskIcon}>{task.completed ? '✅' : '📋'}</Text>
        </View>
        <View style={styles.taskInfo}>
            <Text style={[styles.taskTitle, task.completed && styles.taskTitleDone]}>
                {task.title}
            </Text>
            <Text style={styles.taskDescription}>{task.description}</Text>
        </View>
        <View style={[styles.coinBadge, task.completed && styles.coinBadgeCompleted]}>
            <Text style={[styles.coinText, task.completed && styles.coinTextCompleted]}>
                {task.completed ? t.completed : `+${task.coins} 🪙`}
            </Text>
        </View>
    </Animated.View>
);

interface RewardItemProps {
    voucher: Voucher;
    onRedeem: (v: Voucher) => void;
    t: typeof TRANSLATIONS.en;
}

const RewardItem = ({ voucher, onRedeem, t }: RewardItemProps) => (
    <Animated.View
        entering={FadeInUp.delay(200).duration(500)}
        style={styles.voucherCard}
    >
        <View style={styles.voucherIconCircle}>
            <Text style={styles.voucherIconText}>{voucher.image}</Text>
        </View>
        <View style={styles.voucherDetails}>
            <Text style={styles.voucherTitle}>{voucher.title}</Text>
            <Text style={styles.voucherPrice}>{voucher.cost} {t.coins} 🪙</Text>
        </View>
        <TouchableOpacity
            style={styles.redeemButton}
            onPress={() => onRedeem(voucher)}
            activeOpacity={0.8}
        >
            <Text style={styles.redeemText}>{t.redeemBtn}</Text>
        </TouchableOpacity>
    </Animated.View>
);

// ═══════════════════════════════════════════════════════════════════════════
// MAIN SCREEN
// ═══════════════════════════════════════════════════════════════════════════

export default function RewardCenter() {
    const router = useRouter();
    const { coins, tasks, vouchers, redeemVoucher } = useRewards();
    const [activeTab, setActiveTab] = useState<'tasks' | 'rewards'>('tasks');
    const [language, setLanguage] = useState<'en' | 'hi'>('en');

    const t = TRANSLATIONS[language];

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'hi' : 'en');
    };

    const handleRedeem = (voucher: Voucher) => {
        if (coins >= voucher.cost) {
            Alert.alert(
                language === 'en' ? "Redeem Reward?" : "इनाम भुनाएं?",
                language === 'en'
                    ? `Redeem ${voucher.title} for ${voucher.cost} coins?`
                    : `${voucher.title} को ${voucher.cost} सिक्कों में भुनाएं?`,
                [
                    { text: language === 'en' ? "Cancel" : "रद्द करें", style: "cancel" },
                    {
                        text: language === 'en' ? "Redeem" : "भुनाएं",
                        onPress: () => {
                            const success = redeemVoucher(voucher.id);
                            if (success) {
                                Alert.alert(
                                    language === 'en' ? "Success!" : "सफल!",
                                    language === 'en'
                                        ? `You have successfully redeemed ${voucher.title}. A coupon code will be sent to your email.`
                                        : `आपने ${voucher.title} सफलतापूर्वक भुना लिया है। कूपन कोड आपके ईमेल पर भेजा जाएगा।`
                                );
                            }
                        }
                    }
                ]
            );
        } else {
            Alert.alert(
                language === 'en' ? "Not enough coins" : "पर्याप्त सिक्के नहीं",
                language === 'en'
                    ? `You need ${voucher.cost - coins} more coins to redeem this.`
                    : `इसे भुनाने के लिए आपको ${voucher.cost - coins} और सिक्के चाहिए।`
            );
        }
    };

    const econTasks = tasks.filter(t => t.gameId === 'econ');
    const stockTasks = tasks.filter(t => t.gameId === 'stocks');
    const mfTasks = tasks.filter(t => t.gameId === 'mf_sip');

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <Animated.View
                    entering={FadeInDown.duration(500)}
                    style={styles.header}
                >
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.backButton}
                    >
                        <Text style={styles.backArrow}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{t.title}</Text>
                    <TouchableOpacity
                        onPress={toggleLanguage}
                        style={styles.langButton}
                    >
                        <Text style={styles.langButtonText}>{t.langButton}</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Coin Balance Card */}
                <Animated.View
                    entering={FadeInDown.delay(100).duration(500)}
                    style={styles.balanceCard}
                >
                    <View style={styles.balanceIconCircle}>
                        <Text style={styles.balanceIcon}>🪙</Text>
                    </View>
                    <View style={styles.balanceInfo}>
                        <Text style={styles.balanceLabel}>{t.balance}</Text>
                        <Text style={styles.balanceAmount}>{coins}</Text>
                    </View>
                    <Text style={styles.balanceTip}>{t.earnMore}</Text>
                </Animated.View>

                {/* Tabs */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'tasks' && styles.activeTab]}
                        onPress={() => setActiveTab('tasks')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.tabEmoji}>📋</Text>
                        <Text style={[styles.tabText, activeTab === 'tasks' && styles.activeTabText]}>
                            {t.dailyTasks}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'rewards' && styles.activeTab]}
                        onPress={() => setActiveTab('rewards')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.tabEmoji}>🎁</Text>
                        <Text style={[styles.tabText, activeTab === 'rewards' && styles.activeTabText]}>
                            {t.redeem}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Content */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {activeTab === 'tasks' ? (
                        <>
                            {/* Econopolis Tasks */}
                            {econTasks.length > 0 && (
                                <Animated.View entering={FadeInDown.duration(500)}>
                                    <View style={styles.sectionHeader}>
                                        <Text style={styles.sectionIcon}>🏛️</Text>
                                        <Text style={styles.sectionTitle}>{t.econopolis}</Text>
                                    </View>
                                    {econTasks.map(task => (
                                        <TaskCard key={task.id} task={task} t={t} />
                                    ))}
                                </Animated.View>
                            )}

                            {/* Market Lab Tasks */}
                            {stockTasks.length > 0 && (
                                <Animated.View entering={FadeInDown.delay(100).duration(500)}>
                                    <View style={[styles.sectionHeader, { marginTop: 24 }]}>
                                        <Text style={styles.sectionIcon}>📈</Text>
                                        <Text style={styles.sectionTitle}>{t.marketLab}</Text>
                                    </View>
                                    {stockTasks.map(task => (
                                        <TaskCard key={task.id} task={task} t={t} />
                                    ))}
                                </Animated.View>
                            )}

                            {/* Wealth Builder Tasks */}
                            {mfTasks.length > 0 && (
                                <Animated.View entering={FadeInDown.delay(200).duration(500)}>
                                    <View style={[styles.sectionHeader, { marginTop: 24 }]}>
                                        <Text style={styles.sectionIcon}>🌱</Text>
                                        <Text style={styles.sectionTitle}>{t.wealthBuilder}</Text>
                                    </View>
                                    {mfTasks.map(task => (
                                        <TaskCard key={task.id} task={task} t={t} />
                                    ))}
                                </Animated.View>
                            )}
                        </>
                    ) : (
                        <View style={styles.vouchersContainer}>
                            {vouchers.map(v => (
                                <RewardItem key={v.id} voucher={v} onRedeem={handleRedeem} t={t} />
                            ))}
                        </View>
                    )}

                    {/* Bottom spacing */}
                    <View style={{ height: 40 }} />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

// ═══════════════════════════════════════════════════════════════════════════
// STYLES - Clean Green-White Theme
// ═══════════════════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    safeArea: {
        flex: 1,
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
    headerTitle: {
        color: COLORS.green[800],
        fontSize: 24,
        fontWeight: '800',
    },
    langButton: {
        backgroundColor: COLORS.green[600],
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 16,
    },
    langButtonText: {
        color: COLORS.white,
        fontSize: 13,
        fontWeight: '700',
    },

    // Balance Card
    balanceCard: {
        backgroundColor: COLORS.goldLight,
        marginHorizontal: 20,
        marginTop: 16,
        borderRadius: 20,
        padding: 20,
        borderWidth: 2,
        borderColor: COLORS.gold,
        alignItems: 'center',
    },
    balanceIconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        shadowColor: COLORS.gold,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    balanceIcon: {
        fontSize: 36,
    },
    balanceInfo: {
        alignItems: 'center',
    },
    balanceLabel: {
        fontSize: 14,
        color: COLORS.textLight,
        fontWeight: '600',
    },
    balanceAmount: {
        fontSize: 42,
        fontWeight: '900',
        color: COLORS.text,
    },
    balanceTip: {
        fontSize: 12,
        color: COLORS.textLight,
        marginTop: 8,
    },

    // Tabs
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 20,
        gap: 12,
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 16,
        backgroundColor: COLORS.green[50],
        borderWidth: 2,
        borderColor: COLORS.green[100],
        gap: 8,
    },
    activeTab: {
        backgroundColor: COLORS.green[600],
        borderColor: COLORS.green[600],
    },
    tabEmoji: {
        fontSize: 20,
    },
    tabText: {
        color: COLORS.green[700],
        fontWeight: '700',
        fontSize: 15,
    },
    activeTabText: {
        color: COLORS.white,
    },

    // Scroll Content
    scrollContent: {
        padding: 20,
    },

    // Section Header
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },
    sectionIcon: {
        fontSize: 24,
    },
    sectionTitle: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: '800',
    },

    // Task Card
    taskCard: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 2,
        borderColor: COLORS.green[100],
        shadowColor: COLORS.green[900],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    taskCompleted: {
        backgroundColor: COLORS.green[50],
        borderColor: COLORS.green[300],
    },
    taskIconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.green[100],
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    taskIconCompleted: {
        backgroundColor: COLORS.green[200],
    },
    taskIcon: {
        fontSize: 24,
    },
    taskInfo: {
        flex: 1,
    },
    taskTitle: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: '700',
    },
    taskTitleDone: {
        textDecorationLine: 'line-through',
        color: COLORS.green[600],
    },
    taskDescription: {
        color: COLORS.textLight,
        fontSize: 13,
        marginTop: 2,
    },
    coinBadge: {
        backgroundColor: COLORS.goldLight,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.gold,
    },
    coinBadgeCompleted: {
        backgroundColor: COLORS.green[100],
        borderColor: COLORS.green[400],
    },
    coinText: {
        color: COLORS.text,
        fontWeight: '700',
        fontSize: 14,
    },
    coinTextCompleted: {
        color: COLORS.green[700],
    },

    // Vouchers
    vouchersContainer: {
        gap: 12,
    },
    voucherCard: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.green[100],
        shadowColor: COLORS.green[900],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },
    voucherIconCircle: {
        width: 64,
        height: 64,
        borderRadius: 20,
        backgroundColor: COLORS.green[50],
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    voucherIconText: {
        fontSize: 36,
    },
    voucherDetails: {
        flex: 1,
    },
    voucherTitle: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: '800',
    },
    voucherPrice: {
        color: COLORS.gold,
        fontSize: 15,
        fontWeight: '700',
        marginTop: 4,
    },
    redeemButton: {
        backgroundColor: COLORS.green[600],
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 14,
    },
    redeemText: {
        color: COLORS.white,
        fontWeight: '800',
        fontSize: 16,
    },
});

