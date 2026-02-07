/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WBLBottomSheet - Wealth Builder Lab Bottom Sheet Component
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * A smooth bottom sheet for additional content and actions.
 * Designed with rounded corners and friendly appearance.
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
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { DesignColors, DesignRadius, DesignSpacing, DesignShadows, DesignTextStyles } from '../../constants/design-system';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface WBLBottomSheetProps {
  /** Visibility state */
  visible: boolean;
  /** Close handler */
  onClose: () => void;
  /** Sheet title */
  title?: string;
  /** Sheet subtitle */
  subtitle?: string;
  /** Sheet content */
  children: React.ReactNode;
  /** Show handle indicator */
  showHandle?: boolean;
  /** Max height as percentage of screen (0-1) */
  maxHeight?: number;
  /** Close on backdrop press */
  closeOnBackdrop?: boolean;
  /** Container style */
  style?: ViewStyle;
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const WBLBottomSheet: React.FC<WBLBottomSheetProps> = ({
  visible,
  onClose,
  title,
  subtitle,
  children,
  showHandle = true,
  maxHeight = 0.85,
  closeOnBackdrop = true,
  style,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={closeOnBackdrop ? onClose : undefined}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={[
                styles.container,
                { maxHeight: SCREEN_HEIGHT * maxHeight },
                style,
              ]}
            >
              {showHandle && (
                <View style={styles.handleContainer}>
                  <View style={styles.handle} />
                </View>
              )}

              {(title || subtitle) && (
                <View style={styles.header}>
                  {title && <Text style={styles.title}>{title}</Text>}
                  {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                </View>
              )}

              <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                {children}
              </ScrollView>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: DesignColors.neutral[0],
    borderTopLeftRadius: DesignRadius.modal,
    borderTopRightRadius: DesignRadius.modal,
    ...DesignShadows.float,
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: DesignSpacing.md,
    paddingBottom: DesignSpacing.sm,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: DesignColors.neutral[300],
  },
  header: {
    paddingHorizontal: DesignSpacing.screenPadding,
    paddingTop: DesignSpacing.md,
    paddingBottom: DesignSpacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: DesignColors.neutral[100],
  },
  title: {
    ...DesignTextStyles.headlineSmall,
    color: DesignColors.neutral[800],
    textAlign: 'center',
  },
  subtitle: {
    ...DesignTextStyles.bodyMedium,
    color: DesignColors.neutral[500],
    textAlign: 'center',
    marginTop: DesignSpacing.xs,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: DesignSpacing.screenPadding,
    paddingBottom: DesignSpacing.huge,
  },
});

export default WBLBottomSheet;
