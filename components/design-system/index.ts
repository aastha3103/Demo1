/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MARKET LAB - DESIGN SYSTEM COMPONENTS INDEX
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Central export file for all design system components.
 * Import components from this file for consistent usage.
 * 
 * Usage:
 * import { MLButton, MLCard, DesignColors } from '@/components/design-system';
 */

// ═══════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS & CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

export {
  DesignColors,
  DesignTypography,
  DesignSpacing,
  DesignRadius,
  DesignShadows,
  DesignTouch,
  DesignMotion,
  DesignBreakpoints,
  DesignIcons,
  DesignPresets,
  DesignTextStyles,
  DesignSystem,
} from '../../constants/design-system';

// ═══════════════════════════════════════════════════════════════════════════
// CORE COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

// Button - Primary interaction element
export { MLButton } from './MLButton';
export type { MLButtonProps, MLButtonVariant, MLButtonSize } from './MLButton';

// Card - Content container
export { MLCard } from './MLCard';
export type { MLCardProps, MLCardVariant } from './MLCard';

// Header - Screen header
export { MLHeader } from './MLHeader';
export type { MLHeaderProps, MLHeaderVariant } from './MLHeader';

// ═══════════════════════════════════════════════════════════════════════════
// FEEDBACK & INFORMATION
// ═══════════════════════════════════════════════════════════════════════════

// Info Box - Educational tips and information
export { MLInfoBox } from './MLInfoBox';
export type { MLInfoBoxProps, MLInfoBoxVariant } from './MLInfoBox';

// ═══════════════════════════════════════════════════════════════════════════
// STOCK-SPECIFIC COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

// Stock Card - Stock display in lists
export { MLStockCard } from './MLStockCard';
export type { MLStockCardProps, StockSector } from './MLStockCard';

// Price Chart - Interactive stock chart
export { MLPriceChart } from './MLPriceChart';
export type { MLPriceChartProps, PriceDataPoint, ChartTimeframe } from './MLPriceChart';

// ═══════════════════════════════════════════════════════════════════════════
// EDUCATION COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

// Learning Card - Educational content cards
export { MLLearningCard } from './MLLearningCard';
export type { MLLearningCardProps, MLLearningCardType } from './MLLearningCard';

// Educational Chart - Interactive chart with learning overlays
export { MLEducationalChart } from './MLEducationalChart';
export type { ChartTimeframe } from './MLEducationalChart';

// ═══════════════════════════════════════════════════════════════════════════
// ILLUSTRATIONS
// ═══════════════════════════════════════════════════════════════════════════

// Stock Chart Illustration - Module entry visual
export { StockChartIllustration } from './StockChartIllustration';
