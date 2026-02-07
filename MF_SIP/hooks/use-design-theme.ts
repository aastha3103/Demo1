/**
 * ═══════════════════════════════════════════════════════════════════════════
 * USE DESIGN THEME HOOK
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useState } from 'react';
import { DesignColors } from '../constants/design-system';

export const useDesignTheme = () => {
    // Simplified theme management
    const [isDark, setIsDark] = useState(false);

    return {
        colors: DesignColors,
        isDark,
        setIsDark,
    };
};
