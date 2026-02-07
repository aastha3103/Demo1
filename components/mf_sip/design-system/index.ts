/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WEALTH BUILDER LAB - DESIGN SYSTEM COMPONENTS INDEX
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Central export file for all design system components.
 * Import components from this file for consistent usage across the app.
 * 
 * Usage:
 * import { WBLButton, WBLCard, DesignColors } from '@/components/design-system';
 */

// ═══════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS & CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

export {
  DesignBreakpoints, DesignColors, DesignIcons, DesignMotion, DesignPresets, DesignRadius,
  DesignShadows, DesignSpacing, DesignSystem, DesignTextStyles, DesignTouch, DesignTypography
} from '@/constants/mf_sip/design-system';

// ═══════════════════════════════════════════════════════════════════════════
// CORE COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

// Button - Primary interaction element
export { WBLButton } from './WBLButton';
export type { WBLButtonProps, WBLButtonSize, WBLButtonVariant } from './WBLButton';

// Card - Content container
export { WBLCard } from './WBLCard';
export type { WBLCardProps, WBLCardVariant } from './WBLCard';

// Input - Text input field
export { WBLInput } from './WBLInput';
export type { WBLInputProps, WBLInputSize, WBLInputVariant } from './WBLInput';

// Chip - Tags and filters
export { WBLChip } from './WBLChip';
export type { WBLChipProps, WBLChipSize, WBLChipVariant } from './WBLChip';

// ═══════════════════════════════════════════════════════════════════════════
// FEEDBACK & INDICATORS
// ═══════════════════════════════════════════════════════════════════════════

// Progress Bar - Progress indication
export { WBLProgressBar } from './WBLProgressBar';
export type { WBLProgressBarProps, WBLProgressSize, WBLProgressVariant } from './WBLProgressBar';

// Badge - Counts and notifications
export { WBLBadge } from './WBLBadge';
export type { WBLBadgeProps, WBLBadgeSize, WBLBadgeVariant } from './WBLBadge';

// Info Box - Alerts and tips
export { WBLInfoBox } from './WBLInfoBox';
export type { WBLInfoBoxProps, WBLInfoBoxVariant } from './WBLInfoBox';

// ═══════════════════════════════════════════════════════════════════════════
// DATA DISPLAY
// ═══════════════════════════════════════════════════════════════════════════

// List Item - List entries
export { WBLListItem } from './WBLListItem';
export type { WBLListItemProps, WBLListItemSize } from './WBLListItem';

// Avatar - User/profile images
export { WBLAvatar } from './WBLAvatar';
export type { WBLAvatarProps, WBLAvatarSize } from './WBLAvatar';

// Stat Card - Financial statistics
export { WBLStatCard } from './WBLStatCard';
export type { WBLStatCardProps, WBLStatCardVariant } from './WBLStatCard';

// ═══════════════════════════════════════════════════════════════════════════
// LAYOUT & NAVIGATION
// ═══════════════════════════════════════════════════════════════════════════

// Divider - Visual separator
export { WBLDivider } from './WBLDivider';
export type { WBLDividerProps, WBLDividerVariant } from './WBLDivider';

// Header - Screen header
export { WBLHeader } from './WBLHeader';
export type { WBLHeaderProps, WBLHeaderVariant } from './WBLHeader';

// Bottom Sheet - Modal sheet
export { WBLBottomSheet } from './WBLBottomSheet';
export type { WBLBottomSheetProps } from './WBLBottomSheet';

// Modal - Centered popup
export { WBLModal } from './WBLModal';
export type { WBLModalProps } from './WBLModal';

// ═══════════════════════════════════════════════════════════════════════════
// STATES & PLACEHOLDERS
// ═══════════════════════════════════════════════════════════════════════════

// Empty State - No content placeholder
export { WBLEmptyState } from './WBLEmptyState';
export type { WBLEmptyStateProps } from './WBLEmptyState';

// ═══════════════════════════════════════════════════════════════════════════
// EDUCATION-SPECIFIC COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

// Learning Card - Educational content cards
export { WBLLearningCard } from './WBLLearningCard';
export type { WBLLearningCardProps, WBLLearningCardType } from './WBLLearningCard';

// Fund Card - Mutual fund display for simulator
export { WBLFundCard } from './WBLFundCard';
export type { RiskLevel, WBLFundCardProps } from './WBLFundCard';

// ═══════════════════════════════════════════════════════════════════════════
// ILLUSTRATIONS
// ═══════════════════════════════════════════════════════════════════════════

// Growth Illustration - Plant growing from coins
export { GrowthIllustrationSimple } from './GrowthIllustrationSimple';

// Learn Mode Illustrations - Educational flow visuals
export {
  MutualFundFlowIllustration, SIPFlowIllustration,
  SIPvsTradingIllustration
} from './LearnModeIllustrations';

// Insights Visualizations - Charts and comparisons
export {
  BehaviorFeedback, EarlyVsLateChart, GrowthChart,
  SIPvsLumpsumChart
} from './InsightsVisualizations';
// ═══════════════════════════════════════════════════════════════════════════
// ANIMATIONS
// ═══════════════════════════════════════════════════════════════════════════
export { WBLAnimatedNumber, WBLEntrance, WBLPulse, WBLPulseDot } from './WBLAnimated';

