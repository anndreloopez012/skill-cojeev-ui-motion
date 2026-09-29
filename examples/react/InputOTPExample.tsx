import * as React from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  REGEXP_ONLY_DIGITS,
} from '../../src/components/InputOTP'

export function InputOTPExample() {
  const [value, setValue] = React.useState('')

  return (
    <div className="flex flex-col items-center gap-4 p-8 bg-slate-50 rounded-2xl">
      <h2 className="text-xl font-bold text-slate-800">Verificación de Código</h2>
      <p className="text-sm text-slate-500">Ingresa el código de 6 dígitos enviado a tu dispositivo.</p>

      <InputOTP
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS}
        value={value}
        onChange={(val) => setValue(val)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <div className="text-xs text-slate-400">
        Valor actual: <strong className="text-indigo-600">{value || '–'}</strong>
      </div>
    </div>
  )
}
