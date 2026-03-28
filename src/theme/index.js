/** @type {Record<string, string>} */
export const lightTheme = {
  bg:          '#faf7f2',
  surface:     '#ffffff',
  surfaceAlt:  '#f3ede3',
  surfaceHover:'#ede7da',
  text:        '#1a1208',
  textMuted:   '#7a6a52',
  accent:      '#c0392b',
  accentHover: '#a93226',
  accentLight: 'rgba(192,57,43,0.09)',
  border:      'rgba(0,0,0,0.08)',
  shadow:      'rgba(26,18,8,0.12)',
  cardShadow:  '0 4px 24px rgba(26,18,8,0.09)',
  navBg:       'rgba(250,247,242,0.94)',
  inputBg:     '#f3ede3',
};

/** @type {Record<string, string>} */
export const darkTheme = {
  bg:          '#0e0b07',
  surface:     '#1a1610',
  surfaceAlt:  '#231e15',
  surfaceHover:'#2b2419',
  text:        '#f5f0e8',
  textMuted:   '#9a8a72',
  accent:      '#e05a4a',
  accentHover: '#c0392b',
  accentLight: 'rgba(224,90,74,0.13)',
  border:      'rgba(255,255,255,0.07)',
  shadow:      'rgba(0,0,0,0.55)',
  cardShadow:  '0 4px 24px rgba(0,0,0,0.40)',
  navBg:       'rgba(14,11,7,0.94)',
  inputBg:     '#231e15',
};

/**
 * Inject CSS custom properties into :root for the active theme.
 * @param {Record<string,string>} tokens
 */
export function applyTheme(tokens) {
  const root = document.documentElement;
  root.style.setProperty('--bg',           tokens.bg);
  root.style.setProperty('--surface',      tokens.surface);
  root.style.setProperty('--surface-alt',  tokens.surfaceAlt);
  root.style.setProperty('--surface-hover',tokens.surfaceHover);
  root.style.setProperty('--text',         tokens.text);
  root.style.setProperty('--text-muted',   tokens.textMuted);
  root.style.setProperty('--accent',       tokens.accent);
  root.style.setProperty('--accent-hover', tokens.accentHover);
  root.style.setProperty('--accent-light', tokens.accentLight);
  root.style.setProperty('--border',       tokens.border);
  root.style.setProperty('--shadow',       tokens.shadow);
  root.style.setProperty('--card-shadow',  tokens.cardShadow);
  root.style.setProperty('--nav-bg',       tokens.navBg);
  root.style.setProperty('--input-bg',     tokens.inputBg);
}
