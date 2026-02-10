export const theme = {
  colors: {
    bg: '#F5F0EB',
    surface: '#E8E2DB',
    surfaceAlt: '#DDD6CD',
    text: '#2C2C2C',
    textSecondary: '#7A7A7A',
    accent: '#D4763C',
    accentHover: '#BF6832',
    green: '#6B8F71',
    amber: '#C4943A',
    red: '#B5574B',
    neutral: '#A0A0A0',
    dark: '#3A3A3A',
    white: '#FFFFFF',
  },
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  radar: {
    fill: '#D4763C',
    fillOpacity: 0.25,
    stroke: '#D4763C',
    strokeWidth: 2,
    gridStroke: '#A0A0A0',
  },
} as const;

export type Theme = typeof theme;
