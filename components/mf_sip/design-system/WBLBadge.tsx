import { DesignColors, DesignRadius } from '@/constants/mf_sip/design-system';
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

export type WBLBadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export type WBLBadgeSize = 'small' | 'medium';

export interface WBLBadgeProps {
    content: string;
    variant?: WBLBadgeVariant;
    size?: WBLBadgeSize;
    style?: ViewStyle;
}

export const WBLBadge: React.FC<WBLBadgeProps> = ({
    content,
    variant = 'primary',
    size = 'medium',
    style
}) => {
    return (
        <View style={[styles.badge, styles[variant], size === 'small' && styles.small, style]}>
            <Text style={[styles.text, styles[`${variant}Text`], size === 'small' && styles.smallText]}>
                {content}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: DesignRadius.pill,
        alignSelf: 'flex-start',
    },
    primary: { backgroundColor: DesignColors.primary[100] },
    secondary: { backgroundColor: DesignColors.secondary[100] },
    success: { backgroundColor: DesignColors.semantic.success.light },
    warning: { backgroundColor: DesignColors.semantic.warning.light },
    error: { backgroundColor: DesignColors.semantic.error.light },
    text: { fontSize: 12, fontWeight: '700' },
    primaryText: { color: DesignColors.primary[700] },
    secondaryText: { color: DesignColors.secondary[700] },
    successText: { color: DesignColors.semantic.success.main },
    warningText: { color: DesignColors.semantic.warning.main },
    errorText: { color: DesignColors.semantic.error.main },
    small: { paddingHorizontal: 6, paddingVertical: 2 },
    smallText: { fontSize: 10 },
});

export default WBLBadge;
