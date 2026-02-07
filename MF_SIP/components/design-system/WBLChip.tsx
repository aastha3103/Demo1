import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { DesignColors, DesignRadius, DesignSpacing } from '../../constants/design-system';

export type WBLChipVariant = 'default' | 'primary' | 'outline' | 'success';
export type WBLChipSize = 'small' | 'medium';

export interface WBLChipProps {
    label: string;
    variant?: WBLChipVariant;
    size?: WBLChipSize;
    onPress?: () => void;
    selected?: boolean;
    style?: ViewStyle;
}

export const WBLChip: React.FC<WBLChipProps> = ({
    label,
    variant = 'default',
    size = 'medium',
    onPress,
    selected = false,
    style
}) => {
    return (
        <TouchableOpacity
            activeOpacity={onPress ? 0.7 : 1}
            onPress={onPress}
            style={[
                styles.chip,
                styles[variant],
                selected && styles.selected,
                size === 'small' && styles.small,
                style
            ]}
        >
            <Text style={[
                styles.text,
                styles[`${variant}Text`],
                selected && styles.selectedText,
                size === 'small' && styles.smallText
            ]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    chip: {
        paddingHorizontal: DesignSpacing.md,
        paddingVertical: 6,
        borderRadius: DesignRadius.pill,
        backgroundColor: DesignColors.neutral[100],
        borderWidth: 1,
        borderColor: 'transparent',
        alignSelf: 'flex-start',
    },
    default: {},
    primary: {
        backgroundColor: DesignColors.primary[50],
    },
    outline: {
        backgroundColor: 'transparent',
        borderColor: DesignColors.neutral[300],
    },
    success: {
        backgroundColor: DesignColors.semantic.success.light,
    },
    selected: {
        backgroundColor: DesignColors.primary[500],
        borderColor: DesignColors.primary[500],
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
        color: DesignColors.neutral[700],
    },
    defaultText: {},
    primaryText: {
        color: DesignColors.primary[600],
    },
    outlineText: {
        color: DesignColors.neutral[600],
    },
    successText: {
        color: DesignColors.semantic.success.main,
    },
    selectedText: {
        color: '#FFFFFF',
    },
    small: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    smallText: {
        fontSize: 12,
    }
});

export default WBLChip;
