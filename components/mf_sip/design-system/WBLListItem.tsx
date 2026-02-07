import { DesignColors, DesignSpacing, DesignTextStyles } from '@/constants/mf_sip/design-system';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

export type WBLListItemSize = 'medium' | 'large';

export interface WBLListItemProps {
    title: string;
    subtitle?: string;
    leftElement?: React.ReactNode;
    rightElement?: React.ReactNode;
    onPress?: () => void;
    size?: WBLListItemSize;
    style?: ViewStyle;
}

export const WBLListItem: React.FC<WBLListItemProps> = ({
    title,
    subtitle,
    leftElement,
    rightElement,
    onPress,
    size = 'medium',
    style
}) => {
    return (
        <TouchableOpacity
            activeOpacity={onPress ? 0.7 : 1}
            onPress={onPress}
            style={[styles.container, style]}
        >
            {leftElement && <View style={styles.leftElement}>{leftElement}</View>}
            <View style={styles.content}>
                <Text style={[styles.title, size === 'large' && styles.titleLarge]}>{title}</Text>
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
            {rightElement && <View style={styles.rightElement}>{rightElement}</View>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: DesignSpacing.md,
        borderBottomWidth: 1,
        borderBottomColor: DesignColors.neutral[100],
    },
    leftElement: {
        marginRight: DesignSpacing.md,
    },
    content: {
        flex: 1,
    },
    title: {
        ...DesignTextStyles.bodyLarge,
        fontWeight: '600',
        color: DesignColors.neutral[900],
    },
    titleLarge: {
        ...DesignTextStyles.titleMedium,
    },
    subtitle: {
        ...DesignTextStyles.bodySmall,
        color: DesignColors.neutral[500],
        marginTop: 2,
    },
    rightElement: {
        marginLeft: DesignSpacing.sm,
    }
});

export default WBLListItem;
