import React from 'react';
import { View, ViewStyle, StyleSheet, Animated } from 'react-native';
import { DesignColors, DesignRadius, DesignShadows } from '../../constants/design-system';

export type WBLCardVariant = 'default' | 'accent' | 'outline' | 'ghost' | 'glass';

export interface WBLCardProps {
    children?: React.ReactNode;
    variant?: WBLCardVariant;
    style?: ViewStyle;
}

export const WBLCard: React.FC<WBLCardProps> = ({
    children,
    variant = 'default',
    style
}) => {
    const variantStyle = styles[variant];

    return (
        <View style={[styles.card, variantStyle, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: DesignRadius.card,
        padding: 16,
        overflow: 'hidden',
    },
    default: {
        backgroundColor: DesignColors.neutral[0],
        ...DesignShadows.card,
    },
    accent: {
        backgroundColor: DesignColors.primary[50],
        borderWidth: 1,
        borderColor: DesignColors.primary[100],
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: DesignColors.neutral[200],
    },
    ghost: {
        backgroundColor: 'transparent',
    },
    glass: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    }
});

export default WBLCard;
