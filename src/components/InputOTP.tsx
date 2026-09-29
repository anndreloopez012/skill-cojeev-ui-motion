import * as React from 'react'
import { OTPInput, OTPInputContext, REGEXP_ONLY_DIGITS } from 'input-otp'
import type { OTPInputProps } from 'input-otp'
import { cn } from '../utils/cn'

export { REGEXP_ONLY_DIGITS }

export type InputOTPProps = OTPInputProps & {
  containerClassName?: string
  className?: string
}

/**
 * InputOTP component modeled after 000h by Cojeev.
 * Supports segmented digit inputs, active slot elevation, fake blinking caret,
 * and elastic digit popping.
 */
export const InputOTP = React.forwardRef<HTMLInputElement, InputOTPProps>(function InputOTP(
  {
    className,
    containerClassName,
    pattern = REGEXP_ONLY_DIGITS,
    ...props
  },
  ref,
) {
  return (
    <OTPInput
      ref={ref}
      data-slot="input-otp"
      data-part="root"
      containerClassName={cn('v-otp flex items-center gap-2', containerClassName)}
      className={cn('disabled:cursor-not-allowed', className)}
      pattern={pattern}
      {...props}
    />
  )
})

export interface InputOTPGroupProps extends React.ComponentProps<'div'> {}

export function InputOTPGroup({ className, ...props }: InputOTPGroupProps) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn('flex items-center gap-1.5', className)}
      {...props}
    />
  )
}

export interface InputOTPSlotProps extends React.ComponentProps<'div'> {
  index: number
}

export function InputOTPSlot({ index, className, ...props }: InputOTPSlotProps) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const slot = inputOTPContext?.slots?.[index]

  const isActive = Boolean(slot?.isActive)
  const char = slot?.char
  const hasFakeCaret = Boolean(slot?.hasFakeCaret)

  return (
    <div
      data-slot="input-otp-slot"
      data-part="item"
      data-active={isActive ? 'true' : undefined}
      data-state={isActive ? 'active' : 'inactive'}
      className={cn(
        'relative grid place-items-center select-none',
        'w-11 h-13 text-xl font-bold rounded-xl border',
        'transition-all duration-150',
        isActive && 'border-indigo-600 ring-2 ring-indigo-200 -translate-y-0.5 shadow-md',
        className,
      )}
      {...props}
    >
      {char && <span data-slot="input-otp-char">{char}</span>}
      {hasFakeCaret && (
        <div
          data-slot="input-otp-caret"
          className="cojeev-fake-caret absolute pointer-events-none w-0.5 h-6 rounded-full bg-indigo-600"
        />
      )}
    </div>
  )
}

export interface InputOTPSeparatorProps extends React.ComponentProps<'div'> {}

export function InputOTPSeparator({ children, className, ...props }: InputOTPSeparatorProps) {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      className={cn('grid place-items-center text-slate-400 font-semibold px-1 select-none', className)}
      {...props}
    >
      {children ?? '–'}
    </div>
  )
}
