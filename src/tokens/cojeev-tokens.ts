/**
 * Cojeev Motion Design System Tokens
 * Calibrated spring physics and easings from 000h by Cojeev (https://000h.cojeev.com).
 */

export const COJEEV_SPRINGS = {
  /** Responsive: snappy, quick settling for tabs, segmented controls, and page navigations */
  responsive: { type: 'spring', stiffness: 360, damping: 32, mass: 0.85 },
  /** Expressive: noticeable bounce/overshoot for dialogs, modals, and sheets */
  expressive: { type: 'spring', stiffness: 260, damping: 22, mass: 1 },
  /** Gentle: slow and smooth settling for notifications, tooltips, and hints */
  gentle: { type: 'spring', stiffness: 180, damping: 28, mass: 1 },
  /** Tactile: ultra-fast micro-press for buttons, keypads, and numeric inputs */
  tactile: { type: 'spring', stiffness: 450, damping: 26, mass: 0.6 },
} as const

export const COJEEV_EASINGS = {
  /** Gliding glide curve: smooth, friction-free movement */
  glide: [0.2, 0.8, 0.2, 1] as const,
  /** Drop curve: 25% elastic overshoot */
  drop: [0.3, 1.25, 0.4, 1] as const,
  /** Jelly curve: rubber rebound */
  jelly: [0.3, 1.3, 0.45, 1] as const,
  /** Rubber curve: bouncy feedback */
  rubber: [0.3, 1.3, 0.4, 1] as const,
  /** Settle curve: soft landing deceleration */
  settle: [0.2, 0.65, 0.25, 1] as const,
  /** Enter curve: standard entrance */
  enter: [0.16, 1, 0.3, 1] as const,
  /** Exit curve: fast exit */
  exit: [0.4, 0, 1, 1] as const,
} as const

export const COJEEV_TIMINGS = {
  micro: 120,
  element: 200,
  max: 300,
  draw: 600,
  flowGlide: 240,
  flowGlideLand: 360,
  flowPress: 75,
} as const
