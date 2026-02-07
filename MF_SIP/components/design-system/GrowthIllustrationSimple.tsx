import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DesignColors } from '../../constants/design-system';

export const GrowthIllustrationSimple = () => (
    <View style={styles.container}>
        <Text style={styles.emoji}>🌱</Text>
        <Text style={styles.coins}>💰💰💰</Text>
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
