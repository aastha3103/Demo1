import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function FinCraftLanding() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <LinearGradient
                colors={['#0f172a', '#1e1b4b', '#312e81']}
                style={styles.background}
            />

            <SafeAreaView style={styles.content}>
                <View style={styles.topHeader}>
                    <Animated.View
                        entering={FadeInDown.duration(1000).springify()}
                        style={styles.header}
                    >
                        <Text style={styles.title}>FinCraft</Text>
                        <Text style={styles.tagline}>Empowering Your Financial Future</Text>
                    </Animated.View>

                    <Animated.View
                        entering={FadeInDown.delay(300).duration(800)}
                        style={styles.rewardsEntry}
                    >
                        <TouchableOpacity
                            onPress={() => router.push('/rewards' as any)}
                            style={styles.rewardsButton}
                        >
                            <Text style={styles.rewardsIcon}>🪙</Text>
                            <Text style={styles.rewardsText}>Rewards</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>

                <View style={styles.cardsContainer}>
                    {/* Econopolis Card */}
                    <Animated.View
                        entering={FadeInUp.delay(200).duration(1000).springify()}
                        style={styles.cardWrapper}
                    >
                        <TouchableOpacity
                            style={styles.card}
                            activeOpacity={0.8}
                            onPress={() => router.push('/econ' as any)}
                        >
                            <LinearGradient
                                colors={['rgba(59, 130, 246, 0.2)', 'rgba(37, 99, 235, 0.1)']}
                                style={styles.cardGradient}
                            >
                                <View style={[styles.iconContainer, { backgroundColor: '#2563eb' }]}>
                                    <Text style={styles.iconText}>🏛️</Text>
                                </View>
                                <View style={styles.cardInfo}>
                                    <Text style={styles.cardTitle}>Econopolis</Text>
                                    <Text style={styles.cardDescription}>Master economic principles in a thriving virtual city.</Text>
                                </View>
                                <View style={styles.cardFooter}>
                                    <Text style={styles.exploreText}>Enter City</Text>
                                    <Text style={styles.arrow}>→</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Stocks Card (Market Lab) */}
                    <Animated.View
                        entering={FadeInUp.delay(400).duration(1000).springify()}
                        style={styles.cardWrapper}
                    >
                        <TouchableOpacity
                            style={styles.card}
                            activeOpacity={0.8}
                            onPress={() => router.push('/stocks' as any)}
                        >
                            <LinearGradient
                                colors={['rgba(16, 185, 129, 0.2)', 'rgba(5, 150, 105, 0.1)']}
                                style={styles.cardGradient}
                            >
                                <View style={[styles.iconContainer, { backgroundColor: '#059669' }]}>
                                    <Text style={styles.iconText}>📈</Text>
                                </View>
                                <View style={styles.cardInfo}>
                                    <Text style={styles.cardTitle}>Market Lab</Text>
                                    <Text style={styles.cardDescription}>Stock market simulator & real-time learning platform.</Text>
                                </View>
                                <View style={styles.cardFooter}>
                                    <Text style={styles.exploreText}>Start Trading</Text>
                                    <Text style={styles.arrow}>→</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Wealth Builder Lab (MF & SIP) Card */}
                    <Animated.View
                        entering={FadeInUp.delay(600).duration(1000).springify()}
                        style={styles.cardWrapper}
                    >
                        <TouchableOpacity
                            style={styles.card}
                            activeOpacity={0.8}
                            onPress={() => router.push('/mf_sip' as any)}
                        >
                            <LinearGradient
                                colors={['rgba(245, 158, 11, 0.2)', 'rgba(217, 119, 6, 0.1)']}
                                style={styles.cardGradient}
                            >
                                <View style={[styles.iconContainer, { backgroundColor: '#d97706' }]}>
                                    <Text style={styles.iconText}>🌱</Text>
                                </View>
                                <View style={styles.cardInfo}>
                                    <Text style={styles.cardTitle}>Wealth Builder</Text>
                                    <Text style={styles.cardDescription}>Master Mutual Funds & SIPs with zero risk.</Text>
                                </View>
                                <View style={styles.cardFooter}>
                                    <Text style={styles.exploreText}>Start Growing</Text>
                                    <Text style={styles.arrow}>→</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animated.View>
                </View>

                <Animated.View
                    entering={FadeInUp.delay(600).duration(1000)}
                    style={styles.footer}
                >
                    <Text style={styles.footerText}>Select your destination to begin</Text>
                </Animated.View>
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
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'space-between',
        paddingVertical: 60,
    },
    topHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    header: {
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 42,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: -1,
    },
    tagline: {
        fontSize: 14,
        color: '#94a3b8',
        marginTop: 4,
        fontWeight: '500',
    },
    rewardsEntry: {
        alignItems: 'flex-end',
    },
    rewardsButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    rewardsIcon: {
        fontSize: 20,
        marginRight: 6,
    },
    rewardsText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 14,
    },
    cardsContainer: {
        gap: 20,
    },
    cardWrapper: {
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    card: {
        height: 180,
    },
    cardGradient: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    iconText: {
        fontSize: 24,
    },
    cardInfo: {
        marginTop: 12,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
    },
    cardDescription: {
        fontSize: 14,
        color: '#94a3b8',
        marginTop: 4,
        lineHeight: 20,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 8,
    },
    exploreText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginRight: 6,
    },
    arrow: {
        color: '#fff',
        fontSize: 18,
    },
    footer: {
        alignItems: 'center',
    },
    footerText: {
        color: '#475569',
        fontSize: 14,
        fontWeight: '500',
    },
});
