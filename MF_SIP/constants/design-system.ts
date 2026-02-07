/**
 * ═══════════════════════════════════════════════════════════════════════════
 * DESIGN SYSTEM TOKENS
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const DesignColors = {
    primary: {
        50: '#E8F5E9',
        100: '#C8E6C9',
        200: '#A5D6A7',
        300: '#81C784',
        400: '#66BB6A',
        500: '#4CAF50', // Main Green
        600: '#43A047',
        700: '#388E3C',
        800: '#2E7D32',
        900: '#1B5E20',
    },
    secondary: {
        50: '#FDF5E6',
        100: '#FAF0E6',
        200: '#F5DEB3',
        300: '#FFE4B5',
        400: '#FFD700',
        500: '#FFC107', // Gold/Amber
        600: '#FFA000',
        700: '#FF8F00',
        800: '#FF6F00',
        900: '#E65100',
    },
    neutral: {
        0: '#FFFFFF',
        50: '#F8F9FA',
        100: '#F1F3F5',
        200: '#E9ECEF',
        300: '#DEE2E6',
        400: '#CED4DA',
        500: '#ADB5BD',
        600: '#6C757D',
        700: '#495057',
        800: '#343A40',
        900: '#212529',
    },
    semantic: {
        success: { main: '#4CAF50', light: '#E8F5E9' },
        warning: { main: '#FFC107', light: '#FFF8E1' },
        error: { main: '#F44336', light: '#FFEBEE' },
        info: { main: '#2196F3', light: '#E3F2FD' },
    },
    accent: {
        cream: '#FFFDD0',
        peach: '#FFDAB9',
        lavender: '#E6E6FA',
    },
    shadows: {
        sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
    }
};

export const DesignSpacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 48,
    huge: 64,
    massive: 80,
    screenPadding: 20,
};

export const DesignRadius = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    card: 20,
    input: 12,
    button: 14,
    pill: 100,
    circle: 999,
    round: 100,
    modal: 24,
};

type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export const DesignTypography = {
    fontSize: {
        labelSmall: 12,
        labelMedium: 14,
        labelLarge: 16,
        titleSmall: 18,
        xxxl: 32,
    },
    fontWeight: {
        regular: '400' as FontWeight,
        medium: '500' as FontWeight,
        semibold: '600' as FontWeight,
        bold: '700' as FontWeight,
        black: '900' as FontWeight,
    }
};

export const DesignTextStyles = {
    headlineLarge: { fontSize: 32, fontWeight: '800' as FontWeight, lineHeight: 40 },
    headlineMedium: { fontSize: 24, fontWeight: '700' as FontWeight, lineHeight: 32 },
    headlineSmall: { fontSize: 20, fontWeight: '700' as FontWeight, lineHeight: 28 },
    titleLarge: { fontSize: 20, fontWeight: '700' as FontWeight, lineHeight: 28 },
    titleMedium: { fontSize: 18, fontWeight: '600' as FontWeight, lineHeight: 24 },
    titleSmall: { fontSize: 16, fontWeight: '600' as FontWeight, lineHeight: 22 },
    bodyLarge: { fontSize: 16, fontWeight: '400' as FontWeight, lineHeight: 24 },
    bodyMedium: { fontSize: 14, fontWeight: '400' as FontWeight, lineHeight: 20 },
    bodySmall: { fontSize: 12, fontWeight: '400' as FontWeight, lineHeight: 16 },
    labelLarge: { fontSize: 14, fontWeight: '600' as FontWeight, lineHeight: 20 },
    labelMedium: { fontSize: 12, fontWeight: '600' as FontWeight, lineHeight: 16 },
    labelSmall: { fontSize: 10, fontWeight: '600' as FontWeight, lineHeight: 14 },
    caption: { fontSize: 10, fontWeight: '500' as FontWeight, lineHeight: 14 },
    xxxl: { fontSize: 42, fontWeight: '900' as FontWeight, lineHeight: 50 },
};

export const DesignShadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 8,
    },
    card: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
    },
    popup: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
    },
    float: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 12,
    },
};

export const DesignTouch = {
    buttonSmall: 36,
    buttonMedium: 48,
    buttonLarge: 56,
    minTargetSize: 44,
};

// Mock structures to satisfy index.ts
export const DesignMotion = {};
export const DesignBreakpoints = {};
export const DesignIcons = {};
export const DesignPresets = {};
export const DesignSystem = {};
