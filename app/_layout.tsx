import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    useEffect(() => {
        // Hide splash screen immediately since we don't have secondary assets to load
        SplashScreen.hideAsync();
    }, []);

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="econ" />
            <Stack.Screen name="stocks" />
            <Stack.Screen name="mf_sip" />
        </Stack>
    );
}
