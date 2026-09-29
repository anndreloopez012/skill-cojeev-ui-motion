import * as React from 'react'
import { useFlowPress } from '../hooks/useFlowPress'
import { cn } from '../utils/cn'

export interface FlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  haptic?: boolean
}

/**
 * FlowButton implements Cojeev 000h tactile press physics.
 * Automatically gives native mobile feel on press and release.
 */
export const FlowButton = React.forwardRef<HTMLButtonElement, FlowButtonProps>(function FlowButton(
  { className, haptic = true, disabled, children, ...props },
  ref,
) {
  const { pressProps, landed } = useFlowPress({ haptic, disabled })

  return (
    <button
      ref={ref}
      disabled={disabled}
      data-flow-land={landed ? 'true' : undefined}
      className={cn(
        'flow-press inline-flex items-center justify-center font-semibold rounded-xl px-4 py-2.5',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className,
      )}
      {...pressProps}
      {...props}
    >
      {children}
    </button>
  )
})
