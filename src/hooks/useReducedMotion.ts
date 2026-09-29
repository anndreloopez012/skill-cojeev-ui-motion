import * as React from 'react'

/**
 * useReducedMotion
 * Detects if the user prefers reduced motion for WCAG 2.2 accessibility.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = React.useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => {
      setPrefersReduced(mediaQuery.matches)
    }

    mediaQuery.addEventListener?.('change', handleChange)
    return () => {
      mediaQuery.removeEventListener?.('change', handleChange)
    }
  }, [])

  return prefersReduced
}
