import React from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { DesignColors, DesignRadius, DesignSpacing, DesignTextStyles } from '../../constants/design-system';

export type WBLInputVariant = 'default' | 'filled';
export type WBLInputSize = 'medium' | 'large';

export interface WBLInputProps {
    label?: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    keyboardType?: 'default' | 'numeric' | 'email-address';
    leftElement?: React.ReactNode;
    rightElement?: React.ReactNode;
    error?: string;
    style?: ViewStyle;
    inputStyle?: TextStyle;
}

export const WBLInput: React.FC<WBLInputProps> = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default',
    leftElement,
    rightElement,
    error,
    style,
    inputStyle
}) => {
    return (
        <View style={[styles.container, style]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.inputWrapper, error ? styles.inputError : null]}>
                {leftElement && <View style={styles.leftElement}>{leftElement}</View>}
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={DesignColors.neutral[400]}
                    keyboardType={keyboardType}
                    style={[styles.input, inputStyle]}
                />
                {rightElement && <View style={styles.rightElement}>{rightElement}</View>}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: DesignSpacing.md,
    },
    label: {
        ...DesignTextStyles.bodySmall,
        color: DesignColors.neutral[600],
        fontWeight: '700',
        marginBottom: 6,
        marginLeft: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: DesignColors.neutral[100],
        borderRadius: DesignRadius.input,
        paddingHorizontal: DesignSpacing.md,
        height: 52,
        borderWidth: 1,
        borderColor: DesignColors.neutral[200],
    },
    input: {
        flex: 1,
        ...DesignTextStyles.bodyLarge,
        color: DesignColors.neutral[900],
        height: '100%',
    },
    leftElement: {
        marginRight: 8,
    },
    rightElement: {
        marginLeft: 8,
    },
    inputError: {
        borderColor: DesignColors.semantic.error.main,
    },
    errorText: {
        color: DesignColors.semantic.error.main,
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    }
});

export default WBLInput;
