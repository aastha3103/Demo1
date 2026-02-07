/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WBLAnimated - Wealth Builder Lab Animation Components
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Reusable animation wrappers using react-native-reanimated.
 * Designed to make the UI feel alive and responsive.
 */

import React, { useEffect } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    withDelay,
    Easing
} from 'react-native-reanimated';
import { ViewStyle, View } from 'react-native';

interface EntranceProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    style?: ViewStyle;
}

/**
 * Entrance Animation - Fades and slides children into view
 */
export const WBLEntrance: React.FC<EntranceProps> = ({
    children,
    delay = 0,
    duration = 600,
    direction = 'up',
    style
}) => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(direction === 'up' ? 20 : direction === 'down' ? -20 : 0);
    const translateX = useSharedValue(direction === 'left' ? 20 : direction === 'right' ? -20 : 0);

    useEffect(() => {
        opacity.value = withDelay(delay, withTiming(1, { duration, easing: Easing.out(Easing.back(1)) }));
        translateY.value = withDelay(delay, withSpring(0, { damping: 15 }));
        translateX.value = withDelay(delay, withSpring(0, { damping: 15 }));
    }, [delay, duration]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [
            { translateY: translateY.value },
            { translateX: translateX.value }
        ],
    }));

    return (
        <Animated.View style={[style, animatedStyle]}>
            {children}
        </Animated.View>
    );
};

/**
 * Pulse Animation - Good for calls to action or highlights
 */
export const WBLPulse: React.FC<{ children: React.ReactNode; active?: boolean }> = ({
    children,
    active = true
}) => {
    const scale = useSharedValue(1);

    useEffect(() => {
        if (active) {
            scale.value = withSpring(1.05, { damping: 2, stiffness: 80 }, () => {
                scale.value = withSpring(1);
            });
        }
    }, [active]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <Animated.View style={animatedStyle}>
            {children}
        </Animated.View>
    );
};

/**
 * Pulsing Dot - Good for live indicators
 */
export const WBLPulseDot: React.FC<{ size?: number; color?: string }> = ({
    size = 8,
    color = "#F44336"
}) => {
    const opacity = useSharedValue(1);
    const scale = useSharedValue(1);

    useEffect(() => {
        opacity.value = withDelay(0, withTiming(0, { duration: 1500 }));
        scale.value = withDelay(0, withTiming(2.5, { duration: 1500 }));

        const interval = setInterval(() => {
            opacity.value = 1;
            scale.value = 1;
            opacity.value = withTiming(0, { duration: 1500 });
            scale.value = withTiming(2.5, { duration: 1500 });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ scale: scale.value }],
    }));

    return (
        <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ position: 'absolute', width: size, height: size, borderRadius: size / 2, backgroundColor: color }} />
            <Animated.View style={[{ width: size, height: size, borderRadius: size / 2, backgroundColor: color }, animatedStyle]} />
        </View>
    );
};

/**
 * Animated Number - Animates counting from one value to another
 */
export const WBLAnimatedNumber: React.FC<{ value: number; prefix?: string }> = ({
    value,
    prefix = ""
}) => {
    // Simple implementation for now using a state that updates
    const [displayValue, setDisplayValue] = React.useState(0);

    useEffect(() => {
        let start = displayValue;
        const end = value;
        const duration = 1000;
        const startTime = Date.now();

        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOutQuad = (t: number) => t * (2 - t);

            const current = Math.floor(start + (end - start) * easeOutQuad(progress));
            setDisplayValue(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [value]);

    return (
        <Animated.Text>
            {prefix}{displayValue.toLocaleString('en-IN')}
        </Animated.Text>
    );
};
