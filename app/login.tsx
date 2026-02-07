
import { useUser } from '@/context/UserContext';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

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
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={['#0f172a', '#1e293b', '#0f172a']}
                style={StyleSheet.absoluteFill}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.content}>
                    <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()}>
                        <Text style={styles.title}>Welcome to FinCraft</Text>
                        <Text style={styles.subtitle}>Setup your financial profile to begin your journey</Text>
                    </Animated.View>

                    <Animated.View
                        entering={FadeInDown.delay(400).duration(1000).springify()}
                        style={styles.form}
                    >
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>FULL NAME</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your name"
                                placeholderTextColor="#64748b"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>EMAIL ADDRESS</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor="#64748b"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        {error ? <Text style={styles.errorText}>{error}</Text> : null}

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleLogin}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['#3b82f6', '#2563eb']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.buttonGradient}
                            >
                                <Text style={styles.buttonText}>Get Started</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <Text style={styles.footerText}>
                            Your data is stored locally and securely on your device.
                        </Text>
                    </Animated.View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#f8fafc',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#94a3b8',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 24,
    },
    form: {
        backgroundColor: 'rgba(30, 41, 59, 0.5)',
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
        color: '#3b82f6',
        marginBottom: 8,
        letterSpacing: 1.5,
    },
    input: {
        backgroundColor: '#0f172a',
        borderRadius: 12,
        padding: 16,
        color: '#f8fafc',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#334155',
    },
    button: {
        marginTop: 10,
        borderRadius: 12,
        overflow: 'hidden',
        height: 56,
        justifyContent: 'center',
    },
    buttonGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '700',
    },
    errorText: {
        color: '#f87171',
        fontSize: 14,
        marginBottom: 15,
        textAlign: 'center',
    },
    footerText: {
        marginTop: 20,
        fontSize: 12,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 18,
    }
});
