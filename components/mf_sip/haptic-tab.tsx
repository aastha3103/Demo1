import React from 'react';
import { Platform, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

export function HapticTab({ children, onPress, onPressIn, ...props }: BottomTabBarButtonProps) {
    return (
        <Pressable
            {...props as any}
            onPress={onPress as any}
            onPressIn={(ev) => {
                if (Platform.OS !== 'web') {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
                (onPressIn as any)?.(ev);
            }}
        >
            {children}
        </Pressable>
    );
};

export default HapticTab;
