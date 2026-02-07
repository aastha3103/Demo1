/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WEALTH BUILDER LAB - ROOT LAYOUT
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { DesignColors } from '@/components/mf_sip/design-system';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

export default function MF_SIPLayout() {
    return (
        <>
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: DesignColors.neutral[50] },
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="module-entry" />
                <Stack.Screen name="learn-mode" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="insights" options={{ presentation: 'modal' }} />
                <Stack.Screen name="simulator" />
            </Stack>
            <StatusBar style="auto" />
        </>
    );
}
