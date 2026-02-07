import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IllustrationProps {
    size?: number;
}

export const GrowthIllustrationSimple = ({ size }: IllustrationProps) => (
    <View style={[styles.container, size ? { width: size, height: size } : null]}>
        <Text style={[styles.emoji, size ? { fontSize: size * 0.4 } : null]}>🌱</Text>
        <Text style={[styles.coins, size ? { fontSize: size * 0.12, marginTop: -size * 0.05 } : null]}>💰💰💰</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    emoji: {
        fontSize: 80,
    },
    coins: {
        fontSize: 24,
        marginTop: -10,
    }
});
