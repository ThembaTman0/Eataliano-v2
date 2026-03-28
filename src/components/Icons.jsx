/**
 * Inline SVG icon components.
 * All icons accept standard SVG props (className, style, width, height, etc.)
 */

const defaults = { width: 18, height: 18, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const ForkIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={22} height={22} {...props}>
    <path d="M11 2v6c0 .55.45 1 1 1h1v13h2V9h1c.55 0 1-.45 1-1V2h-2v5h-1V2h-2v5h-1V2h-2zm-2 0C7 2 5 4 5 6.5V11h2v11h2V2H9z" />
  </svg>
);

export const SearchIcon = (props) => (
  <svg viewBox="0 0 24 24" {...defaults} {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const SunIcon = (props) => (
  <svg viewBox="0 0 24 24" {...defaults} {...props}>
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1"  x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1"  y1="12" x2="3"  y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36" />
    <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22" />
  </svg>
);

export const MoonIcon = (props) => (
  <svg viewBox="0 0 24 24" {...defaults} {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const ChevronRightIcon = (props) => (
  <svg viewBox="0 0 24 24" {...defaults} strokeWidth={2.5} {...props}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const CloseIcon = (props) => (
  <svg viewBox="0 0 24 24" {...defaults} strokeWidth={2.2} {...props}>
    <line x1="18" y1="6"  x2="6"  y2="18" />
    <line x1="6"  y1="6"  x2="18" y2="18" />
  </svg>
);

export const ClockIcon = (props) => (
  <svg viewBox="0 0 24 24" {...defaults} width={15} height={15} {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const StarIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14} {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const GlobeIcon = (props) => (
  <svg viewBox="0 0 24 24" {...defaults} width={15} height={15} {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export const ChefIcon = (props) => (
  <svg viewBox="0 0 24 24" {...defaults} width={16} height={16} {...props}>
    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6z" />
    <line x1="6" y1="17" x2="18" y2="17" />
  </svg>
);

export const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18} {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);

export const ArrowUpRightIcon = (props) => (
  <svg viewBox="0 0 24 24" {...defaults} width={14} height={14} {...props}>
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);
