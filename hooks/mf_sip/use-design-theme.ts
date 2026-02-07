/**
 * ═══════════════════════════════════════════════════════════════════════════
 * USE DESIGN THEME HOOK
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { DesignColors } from '@/constants/mf_sip/design-system';
import { useState } from 'react';

export const useDesignTheme = () => {
    // Simplified theme management
    const [isDark, setIsDark] = useState(false);

    return {
        colors: DesignColors,
        isDark,
        setIsDark,
    };
};
