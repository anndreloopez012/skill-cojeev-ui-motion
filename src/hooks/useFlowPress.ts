import * as React from 'react'

export interface FlowPressOptions {
  /** Enable haptic feedback vibration on mobile if supported */
  haptic?: boolean
  /** Duration of haptic feedback vibration in ms */
  hapticDuration?: number
  /** Disable the press state */
  disabled?: boolean
}

export interface FlowPressReturn {
  pressed: boolean
  landed: boolean
  pressProps: {
    onPointerDown: (e: React.PointerEvent) => void
    onPointerUp: (e: React.PointerEvent) => void
    onPointerCancel: (e: React.PointerEvent) => void
    onKeyDown: (e: React.KeyboardEvent) => void
    onKeyUp: (e: React.KeyboardEvent) => void
  }
}

/**
 * useFlowPress
 * Emulates native mobile press-in and press-out spring physics.
 * Triggers subtle haptic tick on supported mobile browsers.
 */
export function useFlowPress(options: FlowPressOptions = {}): FlowPressReturn {
  const { haptic = true, hapticDuration = 10, disabled = false } = options
  const [pressed, setPressed] = React.useState(false)
  const [landed, setLanded] = React.useState(false)

  const triggerHaptic = React.useCallback(() => {
    if (!haptic || disabled) return
    if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
      try {
        navigator.vibrate(hapticDuration)
      } catch {
        // Silently swallow vibration errors
      }
    }
  }, [haptic, hapticDuration, disabled])

  const handlePressStart = React.useCallback(
    (e: React.PointerEvent | React.KeyboardEvent) => {
      if (disabled) return
      if ('button' in e && e.button !== 0) return
      setPressed(true)
      setLanded(false)
      triggerHaptic()
    },
    [disabled, triggerHaptic],
  )

  const handlePressEnd = React.useCallback(() => {
    if (disabled) return
    setPressed(false)
    setLanded(true)
    const timer = setTimeout(() => {
      setLanded(false)
    }, 360)
    return () => clearTimeout(timer)
  }, [disabled])

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        handlePressStart(e)
      }
    },
    [handlePressStart],
  )

  const onKeyUp = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        handlePressEnd()
      }
    },
    [handlePressEnd],
  )

  return {
    pressed,
    landed,
    pressProps: {
      onPointerDown: handlePressStart,
      onPointerUp: handlePressEnd,
      onPointerCancel: handlePressEnd,
      onKeyDown,
      onKeyUp,
    },
  }
}
