/**
 * ═══════════════════════════════════════════════════════════════════════════
 * FINCRAFT - LOGIN SCREEN
 * Welcome and authentication for new users
 * GREEN-WHITE THEME - Clean, minimalistic, accessible for rural users
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useUser } from '@/context/UserContext';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

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
};

export default function LoginScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { login } = useUser();
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (!name.trim() || !email.trim()) {
            setError('Please fill in all fields');
            return;
        }
        if (!email.includes('@')) {
            setError('Please enter a valid email');
            return;
        }
        login(name, email);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Header Section */}
                    <Animated.View
                        entering={FadeInUp.delay(200).duration(800)}
                        style={styles.headerSection}
                    >
                        {/* Logo Icon */}
                        <View style={styles.logoContainer}>
                            <Text style={styles.logoEmoji}>🌱</Text>
                        </View>

                        {/* Welcome Text */}
                        <Text style={styles.welcomeLabel}>WELCOME TO</Text>
                        <Text style={styles.title}>FinCraft</Text>
                        <Text style={styles.subtitle}>
                            Learn financial skills through fun games.{'\n'}
                            Start your journey today!
                        </Text>
                    </Animated.View>

                    {/* Form Section */}
                    <Animated.View
                        entering={FadeInDown.delay(400).duration(800)}
                        style={styles.formCard}
                    >
                        <Text style={styles.formTitle}>Create Your Profile</Text>
                        <Text style={styles.formSubtitle}>
                            Enter your details to get started
                        </Text>

                        {/* Name Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>👤 YOUR NAME</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your full name"
                                placeholderTextColor={COLORS.textLight}
                                value={name}
                                onChangeText={(text) => {
                                    setName(text);
                                    setError('');
                                }}
                            />
                        </View>

                        {/* Email Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>📧 EMAIL ADDRESS</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor={COLORS.textLight}
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setError('');
                                }}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Error Message */}
                        {error ? (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorIcon}>⚠️</Text>
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        ) : null}

                        {/* Submit Button */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleLogin}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>Get Started</Text>
                            <Text style={styles.buttonArrow}>→</Text>
                        </TouchableOpacity>

                        {/* Security Note */}
                        <View style={styles.securityNote}>
                            <Text style={styles.securityIcon}>🔒</Text>
                            <Text style={styles.securityText}>
                                Your data is stored securely on your device only.
                            </Text>
                        </View>
                    </Animated.View>

                    {/* Bottom Features */}
                    <Animated.View
                        entering={FadeInUp.delay(600).duration(800)}
                        style={styles.featuresSection}
                    >
                        <View style={styles.featureItem}>
                            <View style={styles.featureIcon}>
                                <Text style={styles.featureEmoji}>🎮</Text>
                            </View>
                            <Text style={styles.featureLabel}>Learn by Playing</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <View style={styles.featureIcon}>
                                <Text style={styles.featureEmoji}>📚</Text>
                            </View>
                            <Text style={styles.featureLabel}>Easy Lessons</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <View style={styles.featureIcon}>
                                <Text style={styles.featureEmoji}>🏆</Text>
                            </View>
                            <Text style={styles.featureLabel}>Earn Rewards</Text>
                        </View>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

// ═══════════════════════════════════════════════════════════════════════════
// STYLES - Green-White Theme
// ═══════════════════════════════════════════════════════════════════════════

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 40,
        justifyContent: 'center',
    },

    // Header Section
    headerSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.green[100],
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        borderWidth: 3,
        borderColor: COLORS.green[300],
        shadowColor: COLORS.green[900],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
    },
    logoEmoji: {
        fontSize: 40,
    },
    welcomeLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.green[600],
        letterSpacing: 2,
        marginBottom: 6,
    },
    title: {
        fontSize: 36,
        fontWeight: '900',
        color: COLORS.green[800],
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '500',
        color: COLORS.textLight,
        textAlign: 'center',
        lineHeight: 22,
    },

    // Form Card
    formCard: {
        backgroundColor: COLORS.white,
        borderRadius: 24,
        padding: 24,
        borderWidth: 2,
        borderColor: COLORS.green[200],
        shadowColor: COLORS.green[900],
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 24,
        elevation: 8,
        marginBottom: 24,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: 6,
    },
    formSubtitle: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textLight,
        textAlign: 'center',
        marginBottom: 24,
    },

    // Input
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.green[700],
        marginBottom: 10,
        letterSpacing: 1,
    },
    input: {
        backgroundColor: COLORS.green[50],
        borderRadius: 14,
        paddingHorizontal: 18,
        paddingVertical: 16,
        color: COLORS.text,
        fontSize: 16,
        fontWeight: '500',
        borderWidth: 2,
        borderColor: COLORS.green[200],
    },

    // Error
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.dangerLight,
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
    },
    errorIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    errorText: {
        color: COLORS.danger,
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
    },

    // Button
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.green[600],
        borderRadius: 16,
        paddingVertical: 18,
        paddingHorizontal: 32,
        shadowColor: COLORS.green[900],
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 8,
        gap: 8,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: '800',
    },
    buttonArrow: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: '800',
    },

    // Security Note
    securityNote: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: COLORS.green[100],
    },
    securityIcon: {
        fontSize: 14,
        marginRight: 8,
    },
    securityText: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.textLight,
    },

    // Features Section
    featuresSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    featureItem: {
        alignItems: 'center',
    },
    featureIcon: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: COLORS.green[50],
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        borderWidth: 2,
        borderColor: COLORS.green[200],
    },
    featureEmoji: {
        fontSize: 24,
    },
    featureLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: COLORS.green[700],
        textAlign: 'center',
    },
});

