// ─────────────────────────────────────────────
// RunIt! Design System
// Basketball-inspired: dark bg, fiery orange accent
// ─────────────────────────────────────────────

export const COLORS = {
  // Core
  bg: '#0D0D0D',
  bgCard: '#1A1A1A',
  bgElevated: '#242424',
  bgInput: '#1E1E1E',

  // Brand
  orange: '#FF6B2C',
  orangeLight: '#FF8A54',
  orangeMuted: 'rgba(255,107,44,0.15)',
  orangeDim: 'rgba(255,107,44,0.08)',

  // Status
  green: '#34D399',
  greenMuted: 'rgba(52,211,153,0.15)',
  red: '#EF4444',
  redMuted: 'rgba(239,68,68,0.15)',
  yellow: '#FBBF24',
  yellowMuted: 'rgba(251,191,36,0.15)',
  blue: '#60A5FA',
  blueMuted: 'rgba(96,165,250,0.15)',

  // Text
  textPrimary: '#F5F5F5',
  textSecondary: '#A0A0A0',
  textTertiary: '#666666',
  textInverse: '#0D0D0D',

  // Borders
  border: '#2A2A2A',
  borderLight: '#333333',

  // Misc
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0,0,0,0.6)',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
};

export const FONTS = {
  // We'll use system fonts but define weights
  regular: { fontWeight: '400' },
  medium: { fontWeight: '500' },
  semibold: { fontWeight: '600' },
  bold: { fontWeight: '700' },
  heavy: { fontWeight: '800' },
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  glow: {
    shadowColor: COLORS.orange,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
};

// Skill level colors
export const SKILL_COLORS = {
  Beginner: { bg: COLORS.greenMuted, text: COLORS.green, label: 'Beginner' },
  Intermediate: { bg: COLORS.yellowMuted, text: COLORS.yellow, label: 'Intermediate' },
  Advanced: { bg: COLORS.redMuted, text: COLORS.red, label: 'Advanced' },
};

// Reliability badge config
export const BADGE_COLORS = {
  New: { bg: COLORS.blueMuted, text: COLORS.blue },
  Reliable: { bg: COLORS.greenMuted, text: COLORS.green },
};
