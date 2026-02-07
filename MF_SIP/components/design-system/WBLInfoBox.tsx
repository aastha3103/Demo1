import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { DesignColors, DesignRadius, DesignSpacing, DesignTextStyles } from '../../constants/design-system';

export type WBLInfoBoxVariant = 'info' | 'success' | 'warning' | 'error';

export interface WBLInfoBoxProps {
    title?: string;
    message: string;
    variant?: WBLInfoBoxVariant;
    icon?: string;
    style?: ViewStyle;
}

export const WBLInfoBox: React.FC<WBLInfoBoxProps> = ({
    title,
    message,
    variant = 'info',
    icon,
    style
}) => {
    const colors = DesignColors.semantic[variant];

    return (
        <View style={[styles.container, { backgroundColor: colors.light, borderColor: colors.main }, style]}>
            <View style={styles.content}>
                {icon && <Text style={styles.icon}>{icon}</Text>}
                <View style={styles.textContainer}>
                    {title && <Text style={[styles.title, { color: colors.main }]}>{title}</Text>}
                    <Text style={styles.message}>{message}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: DesignSpacing.md,
        borderRadius: DesignRadius.md,
        borderWidth: 1,
        marginVertical: DesignSpacing.sm,
    },
    content: {
        flexDirection: 'row',
    },
    icon: {
        fontSize: 20,
        marginRight: DesignSpacing.sm,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        ...DesignTextStyles.titleSmall,
        fontWeight: '700',
        marginBottom: 4,
    },
    message: {
        ...DesignTextStyles.bodySmall,
        color: DesignColors.neutral[700],
        lineHeight: 18,
    }
});

export default WBLInfoBox;
