import { DesignColors, DesignSpacing, DesignTextStyles } from '@/constants/mf_sip/design-system';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { WBLCard } from './WBLCard';
import { WBLProgressBar } from './WBLProgressBar';

export type WBLLearningCardType = 'lesson' | 'quiz' | 'locked';

export interface WBLLearningCardProps {
    title: string;
    subtitle?: string;
    type?: WBLLearningCardType;
    progress?: number; // 0 to 1
    onPress?: () => void;
    style?: ViewStyle;
}

export const WBLLearningCard: React.FC<WBLLearningCardProps> = ({
    title,
    subtitle,
    type = 'lesson',
    progress = 0,
    onPress,
    style
}) => {
    const isLocked = type === 'locked';

    return (
        <TouchableOpacity
            activeOpacity={onPress && !isLocked ? 0.7 : 1}
            onPress={!isLocked ? onPress : undefined}
            disabled={isLocked}
        >
            <WBLCard style={StyleSheet.flatten([styles.container, isLocked && styles.locked, style])}>
                <View style={styles.header}>
                    <View style={styles.content}>
                        <Text style={[styles.title, isLocked && styles.lockedText]}>{title}</Text>
                        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                    </View>
                    {isLocked && <Text style={styles.lockIcon}>🔒</Text>}
                </View>
                {!isLocked && progress > 0 && (
                    <WBLProgressBar
                        progress={progress}
                        size="small"
                        style={styles.progress}
                        variant="success"
                    />
                )}
            </WBLCard>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: DesignSpacing.md,
        marginBottom: DesignSpacing.sm,
    },
    locked: {
        backgroundColor: DesignColors.neutral[100],
        opacity: 0.7,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    content: {
        flex: 1,
    },
    title: {
        ...DesignTextStyles.titleSmall,
        color: DesignColors.neutral[900],
        fontWeight: '700',
    },
    subtitle: {
        ...DesignTextStyles.bodySmall,
        color: DesignColors.neutral[500],
        marginTop: 2,
    },
    lockedText: {
        color: DesignColors.neutral[400],
    },
    lockIcon: {
        fontSize: 18,
    },
    progress: {
        marginTop: DesignSpacing.md,
    }
});

export default WBLLearningCard;
