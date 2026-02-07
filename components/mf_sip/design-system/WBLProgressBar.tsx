import { DesignColors, DesignRadius } from '@/constants/mf_sip/design-system';
import React, { useEffect } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export type WBLProgressVariant = 'primary' | 'secondary' | 'success';
export type WBLProgressSize = 'small' | 'medium' | 'large';

export interface WBLProgressBarProps {
    progress: number; // 0 to 1
    variant?: WBLProgressVariant;
    size?: WBLProgressSize;
    style?: ViewStyle;
}

export const WBLProgressBar: React.FC<WBLProgressBarProps> = ({
    progress,
    variant = 'primary',
    size = 'medium',
    style
}) => {
    const animatedProgress = useSharedValue(0);

    useEffect(() => {
        animatedProgress.value = withSpring(Math.max(0, Math.min(1, progress)), {
            damping: 20,
            stiffness: 90,
        });
    }, [progress]);

    const progressStyle = useAnimatedStyle(() => ({
        width: `${animatedProgress.value * 100}%`,
    }));

    const height = size === 'small' ? 4 : size === 'medium' ? 8 : 12;

    const getProgressColor = () => {
        switch (variant) {
            case 'success': return DesignColors.semantic.success.main;
            case 'secondary': return DesignColors.secondary[500];
            case 'primary':
            default: return DesignColors.primary[500];
        }
    };

    return (
        <View style={[styles.container, { height }, style]}>
            <Animated.View
                style={[
                    styles.progress,
                    { backgroundColor: getProgressColor() },
                    progressStyle
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: DesignColors.neutral[100],
        borderRadius: DesignRadius.pill,
        overflow: 'hidden',
    },
    progress: {
        height: '100%',
        borderRadius: DesignRadius.pill,
    },
});

export default WBLProgressBar;
