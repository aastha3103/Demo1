import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { DesignColors, DesignSpacing } from '../../constants/design-system';

export type WBLDividerVariant = 'horizontal' | 'vertical';

export interface WBLDividerProps {
    variant?: WBLDividerVariant;
    thickness?: number;
    color?: string;
    spacing?: number;
    style?: ViewStyle;
}

export const WBLDivider: React.FC<WBLDividerProps> = ({
    variant = 'horizontal',
    thickness = 1,
    color = DesignColors.neutral[200],
    spacing = DesignSpacing.md,
    style
}) => {
    if (variant === 'vertical') {
        return (
            <View style={[
                { width: thickness, backgroundColor: color, marginHorizontal: spacing },
                style
            ]} />
        );
    }

    return (
        <View style={[
            { height: thickness, backgroundColor: color, marginVertical: spacing },
            style
        ]} />
    );
};

export default WBLDivider;
