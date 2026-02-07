/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WBLButton - Wealth Builder Lab Button Component
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * A touch-friendly, accessible button with multiple variants.
 * Designed for first-time investors with large tap areas.
 */

import * as Haptics from 'expo-haptics';
import React from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';

import {
  DesignRadius,
  DesignSpacing,
  DesignTouch,
  DesignTypography,
} from '@/constants/mf_sip/design-system';
import { useDesignTheme } from '@/hooks/mf_sip/use-design-theme';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export type WBLButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning';
export type WBLButtonSize = 'small' | 'medium' | 'large';

export interface WBLButtonProps {
  /** Button label text */
  title: string;
  /** Button variant style */
  variant?: WBLButtonVariant;
  /** Button size */
  size?: WBLButtonSize;
  /** Callback when button is pressed */
  onPress?: () => void;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Whether button is in loading state */
  loading?: boolean;
  /** Icon component to render on the left */
  leftIcon?: React.ReactNode;
  /** Icon component to render on the right */
  rightIcon?: React.ReactNode;
  /** Full width button */
  fullWidth?: boolean;
  /** Custom container style */
  style?: ViewStyle;
  /** Custom text style */
  textStyle?: TextStyle;
  /** Test ID for testing */
  testID?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const WBLButton: React.FC<WBLButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  onPress,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
  textStyle,
  testID,
}) => {
  const { colors, isDark } = useDesignTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const enhancedOnPress = () => {
    if (onPress) {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      onPress();
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // BUTTON VARIANTS CONFIG (Dynamic based on theme)
  // ═══════════════════════════════════════════════════════════════════════════
  const variantStyles: Record<WBLButtonVariant, { container: ViewStyle; text: TextStyle }> = {
    primary: {
      container: {
        backgroundColor: colors.primary[500],
      },
      text: {
        color: !isDark ? colors.neutral[900] : '#FFFFFF',
      },
    },
    secondary: {
      container: {
        backgroundColor: colors.primary[50],
      },
      text: {
        color: !isDark ? colors.neutral[900] : colors.primary[300],
      },
    },
    outline: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: colors.primary[300],
      },
      text: {
        color: !isDark ? colors.neutral[900] : colors.primary[500],
      },
    },
    ghost: {
      container: {
        backgroundColor: 'transparent',
      },
      text: {
        color: !isDark ? colors.neutral[900] : colors.primary[500],
      },
    },
    success: {
      container: {
        backgroundColor: colors.secondary[500],
      },
      text: {
        color: !isDark ? colors.neutral[900] : '#FFFFFF',
      },
    },
    warning: {
      container: {
        backgroundColor: colors.semantic.warning.main,
      },
      text: {
        color: colors.neutral[900],
      },
    },
  };

  const sizeStyles: Record<WBLButtonSize, { container: ViewStyle; text: TextStyle }> = {
    small: {
      container: {
        height: DesignTouch.buttonSmall,
        paddingHorizontal: DesignSpacing.lg,
      },
      text: {
        fontSize: DesignTypography.fontSize.labelMedium,
      },
    },
    medium: {
      container: {
        height: DesignTouch.buttonMedium,
        paddingHorizontal: DesignSpacing.xl,
      },
      text: {
        fontSize: DesignTypography.fontSize.labelLarge,
      },
    },
    large: {
      container: {
        height: DesignTouch.buttonLarge,
        paddingHorizontal: DesignSpacing.xxl,
      },
      text: {
        fontSize: DesignTypography.fontSize.titleSmall,
      },
    },
  };

  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const isDisabled = disabled || loading;

  return (
    <Animated.View style={[animatedStyle, fullWidth && styles.fullWidth]}>
      <TouchableOpacity
        testID={testID}
        onPress={enhancedOnPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        activeOpacity={0.8}
        style={[
          styles.container,
          variantStyle.container,
          sizeStyle.container,
          isDisabled && styles.disabled,
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variantStyle.text.color}
          />
        ) : (
          <View style={styles.content}>
            {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
            <Text
              style={[
                styles.text,
                variantStyle.text,
                sizeStyle.text,
                isDisabled && styles.disabledText,
                textStyle,
              ]}
            >
              {title}
            </Text>
            {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};


// ═══════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: DesignRadius.button,
    minWidth: DesignTouch.minTargetSize,
    // Premium elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: DesignTypography.fontWeight.semibold,
    textAlign: 'center',
  },
  leftIcon: {
    marginRight: DesignSpacing.sm,
  },
  rightIcon: {
    marginLeft: DesignSpacing.sm,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
});

export default WBLButton;
