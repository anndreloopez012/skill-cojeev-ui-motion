import { useCallback, useEffect } from 'react'

/**
 * Utility to close an HTMLDialogElement with a smooth exit animation.
 * Sets [data-closing="true"] to trigger CSS exit keyframes,
 * waits for animationend (or fallback timeout), and then executes dialog.close().
 */
export function closeAnimatedDialog(
  dialog: HTMLDialogElement | null,
  onClosed?: () => void,
) {
  if (!dialog) {
    onClosed?.()
    return
  }

  // If dialog is not open or already closing, invoke callback safely
  if (!dialog.open) {
    onClosed?.()
    return
  }

  if (dialog.dataset.closing === 'true') {
    return
  }

  dialog.dataset.closing = 'true'

  let completed = false
  const finishClose = () => {
    if (completed) return
    completed = true
    dialog.removeEventListener('animationend', handleAnimationEnd)
    delete dialog.dataset.closing
    try {
      if (dialog.open) {
        dialog.close()
      }
    } catch {
      // dialog already closed
    }
    onClosed?.()
  }

  const handleAnimationEnd = (event: AnimationEvent) => {
    // Only respond to animations originating on the dialog element itself
    if (event.target === dialog) {
      finishClose()
    }
  }

  dialog.addEventListener('animationend', handleAnimationEnd)

  // Safety fallback in case animationend does not fire (e.g. reduced motion or zero duration)
  window.setTimeout(finishClose, 240)
}

/**
 * React hook to register exit animation handlers for an HTMLDialogElement.
 * Intercepts the native 'cancel' event (Escape key) to ensure smooth exit.
 */
export function useAnimatedDialog(
  dialogRef: React.RefObject<HTMLDialogElement | null>,
  onClose?: () => void,
) {
  const close = useCallback(() => {
    closeAnimatedDialog(dialogRef.current, onClose)
  }, [dialogRef, onClose])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleCancel = (event: Event) => {
      event.preventDefault()
      close()
    }

    dialog.addEventListener('cancel', handleCancel)
    return () => {
      dialog.removeEventListener('cancel', handleCancel)
    }
  }, [dialogRef, close])

  return { close }
}
