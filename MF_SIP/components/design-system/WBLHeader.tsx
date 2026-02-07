import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DesignColors, DesignSpacing, DesignTextStyles } from '../../constants/design-system';

export type WBLHeaderVariant = 'default' | 'transparent';

export interface WBLHeaderProps {
    title: string;
    onBack?: () => void;
    rightElement?: React.ReactNode;
    variant?: WBLHeaderVariant;
    style?: ViewStyle;
}

export const WBLHeader: React.FC<WBLHeaderProps> = ({
    title,
    onBack,
    rightElement,
    variant = 'default',
    style
}) => {
    return (
        <View style={[
            styles.container,
            variant === 'transparent' && styles.transparent,
            style
        ]}>
            <View style={styles.left}>
                {onBack && (
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color={DesignColors.neutral[900]} />
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.center}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
            </View>
            <View style={styles.right}>
                {rightElement}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: DesignSpacing.md,
        backgroundColor: DesignColors.neutral[0],
        borderBottomWidth: 1,
        borderBottomColor: DesignColors.neutral[100],
    },
    transparent: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
    },
    left: {
        width: 40,
        justifyContent: 'center',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    right: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    backButton: {
        padding: 4,
    },
    title: {
        ...DesignTextStyles.titleMedium,
        color: DesignColors.neutral[900],
        fontWeight: '700',
    }
});

export default WBLHeader;
