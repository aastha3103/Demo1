import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tile as TileType } from '../game/types';

interface TileProps {
    tile: TileType;
    width: number;
    height: number;
    left: number;
    top: number;
    focusLevel?: 0 | 1 | 2; // 0: Far, 1: Nearby, 2: Focus
}

export function Tile({ tile, width, height, left, top, focusLevel = 2 }: TileProps) {
    const textOpacity = useRef(new Animated.Value(1)).current;

    const isCorner = tile.type === 'CORNER';
    const isSpecial = tile.type === 'CHANCE' || tile.type === 'COMMUNITY' || tile.type === 'TAX';
    const isProperty = tile.type === 'PROPERTY' || tile.type === 'STATION' || tile.type === 'UTILITY';

    // Animation Effect - Highlight only, NO SCALING
    useEffect(() => {
        const targetOpacity = focusLevel === 0 ? 0.6 : 1;
        Animated.timing(textOpacity, {
            toValue: targetOpacity,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [focusLevel]);

    // Explicit Risk/Penalty detection
    const isRisk =
        tile.name.includes('Trap') ||
        tile.name.includes('Shark') ||
        tile.name.includes('Monster') ||
        tile.name.includes('Emergency') ||
        tile.type === 'TAX';

    const getAccentColor = () => {
        if (tile.color) {
            if (tile.color === '#FF0000' || tile.color === 'Red') return '#f43f5e';
            if (tile.color === '#FFD700' || tile.color === 'Yellow') return '#f59e0b';
            return tile.color;
        }
        if (isCorner) return '#38bdf8';
        if (isRisk) return '#fb7185';
        if (isSpecial) return '#94a3b8';
        return '#475569';
    };

    const accentColor = getAccentColor();

    const getBgColor = () => {
        if (isCorner) return '#1e293b';
        if (tile.type === 'CHANCE') return '#1e293b';
        return '#0f172a';
    };

    return (
        <View style={[
            styles.cardContainer,
            {
                position: 'absolute',
                left: left,
                top: top,
                width: width,
                height: height,
                backgroundColor: getBgColor(),
                borderColor: focusLevel === 2 ? '#fff' : isCorner ? 'rgba(56, 189, 248, 0.4)' : isRisk ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                borderWidth: focusLevel === 2 ? 1.5 : 0.8,
                zIndex: focusLevel === 2 ? 10 : 1,
            }
        ]}>
            {/* Hierarchy Header */}
            {isProperty ? (
                <View style={[styles.propertyHeader, { backgroundColor: accentColor, height: '15%' }]}>
                    <View style={styles.headerGlow} />
                </View>
            ) : (isSpecial || isRisk) ? (
                <View style={[styles.specialIndicator, { backgroundColor: accentColor, height: 2 }]} />
            ) : null}

            <Animated.View style={[
                styles.content,
                { opacity: textOpacity }
            ]}>
                <View style={styles.textContainer}>
                    <View style={styles.textWrapper}>
                        <Text
                            style={[
                                styles.name,
                                { fontSize: Math.min(width, height) * 0.12 },
                                isCorner && { fontSize: Math.min(width, height) * 0.14, fontWeight: '800' },
                                isRisk && { color: '#ef4444' }
                            ]}
                            numberOfLines={4}
                        >
                            {tile.name}
                        </Text>
                    </View>

                    {tile.type !== 'CORNER' && (
                        <Text
                            style={[styles.typeText, { fontSize: Math.min(width, height) * 0.08 }]}
                            numberOfLines={1}
                        >
                            {tile.type}
                        </Text>
                    )}

                    {tile.price ? (
                        <View style={styles.priceTag}>
                            <Text
                                style={[styles.price, { fontSize: Math.min(width, height) * 0.10 }]}
                                numberOfLines={1}
                            >
                                ₹{tile.price}
                            </Text>
                        </View>
                    ) : null}
                </View>
            </Animated.View>

            {focusLevel === 2 && <View style={[styles.focusGlow, { borderColor: accentColor }]} />}
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        margin: 0,
        borderWidth: 0.5,
        borderColor: '#334155', // Slate 700 for dark mode
        position: 'relative',
    },
    propertyHeader: {
        width: '100%',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    headerGlow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.02)',
    },
    specialIndicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
    },
    iconContainer: {
        marginBottom: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textWrapper: {
        width: '100%',
    },
    name: {
        textAlign: 'center',
        fontWeight: '700',
        color: '#f1f5f9', // Slate 100
        textTransform: 'uppercase',
        letterSpacing: 0.3,
        lineHeight: 12, // Keep line height for vertical text flow
    },
    priceTag: {
        marginTop: 1,
    },
    price: {
        textAlign: 'center',
        color: '#94a3b8', // Slate 500
        fontWeight: '600',
    },
    typeText: {
        textAlign: 'center',
        color: '#64748b', // Slate 500
        fontWeight: '500',
        textTransform: 'uppercase',
        marginTop: 1,
        letterSpacing: 0.6,
    },
    focusGlow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderWidth: 2,
        borderColor: '#3b82f6',
        opacity: 0.1,
    }
});
