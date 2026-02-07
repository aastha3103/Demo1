import { RewardProvider } from '@/context/RewardContext';
import { UserProvider, useUser } from '@/context/UserContext';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import LoginScreen from './login';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

function RootLayoutContent() {
    const { isLoggedIn, isLoading } = useUser();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            SplashScreen.hideAsync();
        }
    }, [isLoading]);

    useEffect(() => {
        if (!isLoading) {
            const inAuthGroup = segments[0] === 'login';

            if (!isLoggedIn && !inAuthGroup) {
                // Redirect to login if not logged in
                router.replace('/login');
            } else if (isLoggedIn && inAuthGroup) {
                // Redirect to home if logged in and trying to access login
                router.replace('/');
            }
        }
    }, [isLoggedIn, isLoading, segments]);

    if (isLoading) return null;

    if (!isLoggedIn) {
        return <LoginScreen />;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="econ" />
            <Stack.Screen name="stocks" />
            <Stack.Screen name="mf_sip" />
            <Stack.Screen name="rewards" />
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <UserProvider>
            <RewardProvider>
                <RootLayoutContent />
            </RewardProvider>
        </UserProvider>
    );
}
