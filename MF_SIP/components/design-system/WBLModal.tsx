
/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WBLModal - Wealth Builder Lab Popup/Dialog Component
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * A centered popup dialog for focused actions and confirmations.
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ViewStyle,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { DesignColors, DesignRadius, DesignSpacing, DesignShadows, DesignTextStyles } from '../../constants/design-system';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface WBLModalProps {
    /** Visibility state */
    visible: boolean;
    /** Close handler */
    onClose: () => void;
    /** Modal title */
    title?: string;
    /** Modal subtitle */
    subtitle?: string;
    /** Modal content */
    children: React.ReactNode;
    /** Close on backdrop press */
    closeOnBackdrop?: boolean;
    /** Container style override */
    style?: ViewStyle;
}

export const WBLModal: React.FC<WBLModalProps> = ({
    visible,
    onClose,
    title,
    subtitle,
    children,
    closeOnBackdrop = true,
    style,
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={closeOnBackdrop ? onClose : undefined}>
                <View style={styles.backdrop}>
                    <TouchableWithoutFeedback>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                            style={[styles.container, style]}
                        >
                            {(title || subtitle) && (
                                <View style={styles.header}>
                                    {title && <Text style={styles.title}>{title}</Text>}
                                    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                                </View>
                            )}

                            <View style={styles.content}>
                                {children}
                            </View>

                            {/* Close Button X - Styled as a floating circle */}
                            <TouchableOpacity
                                style={styles.closeIcon}
                                onPress={onClose}
                            >
                                <Text style={styles.closeIconText}>×</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: DesignSpacing.xl,
    },
    container: {
        backgroundColor: DesignColors.neutral[0],
        borderRadius: DesignRadius.modal,
        width: SCREEN_WIDTH - (DesignSpacing.xl * 2),
        maxWidth: 400,
        ...DesignShadows.float,
        padding: DesignSpacing.xl,
        position: 'relative',
    },
    header: {
        marginBottom: DesignSpacing.lg,
        alignItems: 'center',
        paddingHorizontal: DesignSpacing.lg,
    },
    title: {
        ...DesignTextStyles.headlineSmall,
        color: DesignColors.neutral[800],
        textAlign: 'center',
        fontWeight: '800',
    },
    subtitle: {
        ...DesignTextStyles.bodyMedium,
        color: DesignColors.neutral[500],
        textAlign: 'center',
        marginTop: DesignSpacing.xs,
    },
    content: {
        width: '100%',
    },
    closeIcon: {
        position: 'absolute',
        top: -DesignSpacing.md,
        right: -DesignSpacing.md,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: DesignColors.neutral[0],
        alignItems: 'center',
        justifyContent: 'center',
        ...DesignShadows.md,
    },
    closeIconText: {
        fontSize: 20,
        color: DesignColors.neutral[600],
        lineHeight: 28,
    },
});

export default WBLModal;
