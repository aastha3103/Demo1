import { useUser } from '@/context/UserContext';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// ═══════════════════════════════════════════════════════════════════════════
// GREEN-WHITE THEME COLORS FOR RURAL USERS
// ═══════════════════════════════════════════════════════════════════════════
const COLORS = {
    // Primary Greens - Nature-inspired, calming
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
    // Neutral whites & grays
    white: '#FFFFFF',
    offWhite: '#FAFAFA',
    lightGray: '#F5F5F5',
    gray: '#E5E5E5',
    darkGray: '#737373',
    text: '#1F2937',
    textLight: '#6B7280',
};

// ═══════════════════════════════════════════════════════════════════════════
// TRANSLATIONS
// ═══════════════════════════════════════════════════════════════════════════
const TRANSLATIONS = {
    en: {
        greeting: (name: string) => `Hello, ${name} 👋`,
        appName: 'FinCraft',
        tagline: 'Learn money, through games',
        rewards: 'Rewards',
        bannerTitle: 'Learn & Earn!',
        bannerSubtitle: 'Improve your financial knowledge by playing games',
        sectionTitle: '🎮 Choose a Game',
        sectionSubtitle: 'Tap the game you want to play',
        play: 'Play',
        tip: 'Tip: Playing just 10 minutes daily can teach you a lot about money!',
        langButton: 'हिंदी',
        games: {
            econopolis: {
                title: 'Econopolis',
                subtitle: 'Build a City',
                description: 'Build your city, earn money, and understand economics',
            },
            marketLab: {
                title: 'Market Lab',
                subtitle: 'Learn Stock Market',
                description: 'Learn to buy and sell stocks without any risk',
            },
            wealthBuilder: {
                title: 'Wealth Builder',
                subtitle: 'Learn to Save',
                description: 'Learn to grow money with Mutual Funds and SIP',
            },
        },
    },
    hi: {
        greeting: (name: string) => `नमस्ते, ${name} 🙏`,
        appName: 'फिनक्राफ्ट',
        tagline: 'पैसों की समझ, खेल-खेल में',
        rewards: 'इनाम',
        bannerTitle: 'सीखें और कमाएं!',
        bannerSubtitle: 'गेम खेलकर पैसों की समझ बढ़ाएं',
        sectionTitle: '🎮 गेम्स चुनें',
        sectionSubtitle: 'जो खेल खेलना है उसे दबाएं',
        play: 'खेलें',
        tip: 'टिप: रोज़ 10 मिनट खेलने से आप पैसों के बारे में बहुत कुछ सीख सकते हैं!',
        langButton: 'English',
        games: {
            econopolis: {
                title: 'इकॉनोपोलिस',
                subtitle: 'शहर बनाना सीखें',
                description: 'अपना शहर बनाएं, पैसे कमाएं और अर्थव्यवस्था समझें',
            },
            marketLab: {
                title: 'मार्केट लैब',
                subtitle: 'शेयर बाज़ार सीखें',
                description: 'बिना जोखिम के शेयर खरीदना और बेचना सीखें',
            },
            wealthBuilder: {
                title: 'वेल्थ बिल्डर',
                subtitle: 'बचत करना सीखें',
                description: 'म्यूचुअल फंड और SIP से पैसे बढ़ाना सीखें',
            },
        },
    },
};

// ═══════════════════════════════════════════════════════════════════════════
// GAME CARD COMPONENT - Large, easy to tap
// ═══════════════════════════════════════════════════════════════════════════
interface GameCardProps {
    icon: string;
    title: string;
    subtitle: string;
    description: string;
    playText: string;
    onPress: () => void;
    delay: number;
    accentColor: string;
}

const GameCard: React.FC<GameCardProps> = ({ icon, title, subtitle, description, playText, onPress, delay, accentColor }) => (
    <Animated.View entering={FadeInUp.delay(delay).duration(600).springify()}>
        <TouchableOpacity
            style={styles.gameCard}
            onPress={onPress}
            activeOpacity={0.9}
        >
            {/* Large Icon Circle */}
            <View style={[styles.gameIconCircle, { backgroundColor: accentColor }]}>
                <Text style={styles.gameIcon}>{icon}</Text>
            </View>

            {/* Card Content */}
            <View style={styles.gameCardContent}>
                <Text style={styles.gameSubtitle}>{subtitle}</Text>
                <Text style={styles.gameTitle}>{title}</Text>
                <Text style={styles.gameDescription}>{description}</Text>
            </View>

            {/* Play Button */}
            <View style={[styles.playButton, { backgroundColor: accentColor }]}>
                <Text style={styles.playButtonText}>{playText}</Text>
                <Text style={styles.playButtonArrow}>→</Text>
            </View>
        </TouchableOpacity>
    </Animated.View>
);

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default function FinCraftLanding() {
    const router = useRouter();
    const { user } = useUser();
    const [language, setLanguage] = useState<'en' | 'hi'>('en');

    const t = TRANSLATIONS[language];
    const firstName = user?.name?.split(' ')[0] || (language === 'en' ? 'Friend' : 'मित्र');

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'hi' : 'en');
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header Section */}
                    <Animated.View
                        entering={FadeInDown.duration(600)}
                        style={styles.header}
                    >
                        <View style={styles.headerLeft}>
                            <Text style={styles.greeting}>{t.greeting(firstName)}</Text>
                            <Text style={styles.appName}>{t.appName}</Text>
                            <Text style={styles.tagline}>{t.tagline}</Text>
                        </View>

                        <View style={styles.headerRight}>
                            {/* Language Toggle Button */}
                            <TouchableOpacity
                                onPress={toggleLanguage}
                                style={styles.langButton}
                            >
                                <Text style={styles.langButtonText}>{t.langButton}</Text>
                            </TouchableOpacity>

                            {/* Rewards Button */}
                            <TouchableOpacity
                                onPress={() => router.push('/rewards' as any)}
                                style={styles.rewardsButton}
                            >
                                <Text style={styles.rewardsEmoji}>🪙</Text>
                                <Text style={styles.rewardsLabel}>{t.rewards}</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>

                    {/* Welcome Banner */}
                    <Animated.View
                        entering={FadeInUp.delay(100).duration(600)}
                        style={styles.welcomeBanner}
                    >
                        <View style={styles.bannerIconContainer}>
                            <Text style={styles.bannerIcon}>🌾</Text>
                        </View>
                        <View style={styles.bannerTextContainer}>
                            <Text style={styles.bannerTitle}>{t.bannerTitle}</Text>
                            <Text style={styles.bannerSubtitle}>{t.bannerSubtitle}</Text>
                        </View>
                    </Animated.View>

                    {/* Section Title */}
                    <Animated.View
                        entering={FadeInUp.delay(200).duration(600)}
                        style={styles.sectionHeader}
                    >
                        <Text style={styles.sectionTitle}>{t.sectionTitle}</Text>
                        <Text style={styles.sectionSubtitle}>{t.sectionSubtitle}</Text>
                    </Animated.View>

                    {/* Game Cards */}
                    <View style={styles.cardsContainer}>
                        {/* Econopolis */}
                        <GameCard
                            icon="🏛️"
                            title={t.games.econopolis.title}
                            subtitle={t.games.econopolis.subtitle}
                            description={t.games.econopolis.description}
                            playText={t.play}
                            onPress={() => router.push('/econ' as any)}
                            delay={300}
                            accentColor={COLORS.green[600]}
                        />

                        {/* Market Lab */}
                        <GameCard
                            icon="📈"
                            title={t.games.marketLab.title}
                            subtitle={t.games.marketLab.subtitle}
                            description={t.games.marketLab.description}
                            playText={t.play}
                            onPress={() => router.push('/stocks' as any)}
                            delay={400}
                            accentColor="#059669"
                        />

                        {/* Wealth Builder */}
                        <GameCard
                            icon="🌱"
                            title={t.games.wealthBuilder.title}
                            subtitle={t.games.wealthBuilder.subtitle}
                            description={t.games.wealthBuilder.description}
                            playText={t.play}
                            onPress={() => router.push('/mf_sip' as any)}
                            delay={500}
                            accentColor="#16a34a"
                        />
                    </View>

                    {/* Bottom Tip */}
                    <Animated.View
                        entering={FadeInUp.delay(600).duration(600)}
                        style={styles.tipCard}
                    >
                        <Text style={styles.tipEmoji}>💡</Text>
                        <Text style={styles.tipText}>{t.tip}</Text>
                    </Animated.View>

                    {/* Bottom Spacing */}
                    <View style={{ height: 40 }} />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

// ═══════════════════════════════════════════════════════════════════════════
// STYLES - Clean, Minimalistic Green-White Theme
// ═══════════════════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    safeArea: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },

    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
        paddingTop: 10,
    },
    headerLeft: {
        flex: 1,
    },
    headerRight: {
        alignItems: 'flex-end',
        gap: 10,
    },
    greeting: {
        fontSize: 18,
        color: COLORS.green[700],
        fontWeight: '600',
        marginBottom: 4,
    },
    appName: {
        fontSize: 36,
        fontWeight: '900',
        color: COLORS.green[800],
        letterSpacing: -0.5,
    },
    tagline: {
        fontSize: 14,
        color: COLORS.textLight,
        marginTop: 4,
    },
    langButton: {
        backgroundColor: COLORS.green[600],
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    langButtonText: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.white,
    },
    rewardsButton: {
        backgroundColor: COLORS.green[50],
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.green[200],
    },
    rewardsEmoji: {
        fontSize: 28,
    },
    rewardsLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.green[700],
        marginTop: 4,
    },

    // Welcome Banner
    welcomeBanner: {
        backgroundColor: COLORS.green[50],
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        borderWidth: 2,
        borderColor: COLORS.green[100],
    },
    bannerIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: COLORS.green[100],
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    bannerIcon: {
        fontSize: 36,
    },
    bannerTextContainer: {
        flex: 1,
    },
    bannerTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: COLORS.green[800],
        marginBottom: 4,
    },
    bannerSubtitle: {
        fontSize: 14,
        color: COLORS.green[600],
        lineHeight: 20,
    },

    // Section Header
    sectionHeader: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: COLORS.text,
        marginBottom: 4,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: COLORS.textLight,
    },

    // Cards Container
    cardsContainer: {
        gap: 16,
    },

    // Game Card
    gameCard: {
        backgroundColor: COLORS.white,
        borderRadius: 24,
        padding: 20,
        borderWidth: 2,
        borderColor: COLORS.green[100],
        shadowColor: COLORS.green[900],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },
    gameIconCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    gameIcon: {
        fontSize: 40,
    },
    gameCardContent: {
        marginBottom: 16,
    },
    gameSubtitle: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.green[600],
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    gameTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: COLORS.text,
        marginBottom: 8,
    },
    gameDescription: {
        fontSize: 15,
        color: COLORS.textLight,
        lineHeight: 22,
    },
    playButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 16,
        gap: 8,
    },
    playButtonText: {
        fontSize: 18,
        fontWeight: '800',
        color: COLORS.white,
    },
    playButtonArrow: {
        fontSize: 20,
        fontWeight: '800',
        color: COLORS.white,
    },

    // Tip Card
    tipCard: {
        backgroundColor: COLORS.green[50],
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24,
        borderWidth: 1,
        borderColor: COLORS.green[100],
    },
    tipEmoji: {
        fontSize: 24,
        marginRight: 12,
    },
    tipText: {
        flex: 1,
        fontSize: 14,
        color: COLORS.green[700],
        lineHeight: 20,
    },
});
