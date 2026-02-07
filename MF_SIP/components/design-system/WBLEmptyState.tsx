import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { DesignColors, DesignSpacing, DesignTextStyles } from '../../constants/design-system';
import { WBLButton } from './WBLButton';

export interface WBLEmptyStateProps {
    title: string;
    message: string;
    icon?: string;
    actionLabel?: string;
    onAction?: () => void;
    style?: ViewStyle;
}

export const WBLEmptyState: React.FC<WBLEmptyStateProps> = ({
    title,
    message,
    icon = '📂',
    actionLabel,
    onAction,
    style
}) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.icon}>{icon}</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            {actionLabel && onAction && (
                <WBLButton
                    title={actionLabel}
                    onPress={onAction}
                    style={styles.button}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: DesignSpacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        fontSize: 64,
        marginBottom: DesignSpacing.md,
    },
    title: {
        ...DesignTextStyles.titleMedium,
        color: DesignColors.neutral[900],
        textAlign: 'center',
        marginBottom: 8,
    },
    message: {
        ...DesignTextStyles.bodyMedium,
        color: DesignColors.neutral[500],
        textAlign: 'center',
        marginBottom: DesignSpacing.xl,
    },
    button: {
        minWidth: 160,
    }
});

export default WBLEmptyState;
