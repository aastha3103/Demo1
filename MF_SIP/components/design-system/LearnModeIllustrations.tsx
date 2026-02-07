import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IllustrationProps {
    size?: number;
}

export const SIPFlowIllustration = ({ size }: IllustrationProps) => (
    <View style={[styles.container, size ? { width: size, height: size / 2 } : null]}>
        <Text style={[styles.emoji, size ? { fontSize: size / 5 } : null]}>📅 ➡️ 🏦 ➡️ 📈</Text>
    </View>
);

export const SIPvsTradingIllustration = ({ size }: IllustrationProps) => (
    <View style={[styles.container, size ? { width: size, height: size / 2 } : null]}>
        <Text style={[styles.emoji, size ? { fontSize: size / 5 } : null]}>🧘‍♂️ vs 🎢</Text>
    </View>
);

export const MutualFundFlowIllustration = ({ size }: IllustrationProps) => (
    <View style={[styles.container, size ? { width: size, height: size / 2 } : null]}>
        <Text style={[styles.emoji, size ? { fontSize: size / 5 } : null]}>👥 ➡️ 📦 ➡️ 💹</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 12,
    },
    emoji: {
        fontSize: 40,
    }
});
