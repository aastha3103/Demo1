/**
 * Market Lab Hook - Theme
 * Returns dark mode colors only for Market Lab
 */

import { DesignColors, DesignSystem } from '../constants/design-system';

export function useDesignTheme() {
  // Market Lab is DARK MODE ONLY
  const isDark = true;
  const colors = DesignColors;

  return {
    isDark,
    colors,
    DesignSystem: {
      ...DesignSystem,
      colors,
    },
  };
}
