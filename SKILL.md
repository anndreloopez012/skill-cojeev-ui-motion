---
name: skill-cojeev-ui-motion
description: "Sistema y skill de animaciones UI/UX táctiles y componentes fluidos extraídos de la librería 000h de Cojeev (https://000h.cojeev.com). Incluye Input OTP con cursor simulado parpadeante, flow-press con física de resortes, transiciones gliding para pestañas/navegación, diálogos con rebote elástico (drop overshoot) y directrices WCAG para movimiento reducido."
---

# Skill: Cojeev UI Motion Design System (000h Motion Engine)

Esta skill proporciona un sistema completo de diseño de movimiento e interacciones táctiles nativas basado en los principios de la suite **000h de Cojeev** (`https://000h.cojeev.com`). Transforma interfaces web convencionales en experiencias fluidas, responsivas y con sensación de aplicación móvil nativa (iOS/macOS).

---

## 1. Principios Fundamentales del Sistema 000h

1. **Inmediatez Táctil (`--t-flow-press: 75ms`)**:
   La compresión al presionar un elemento interactivo responde de forma casi instantánea (75ms). No existe sensación de retraso ni arrastre innecesario.
2. **Física de Resortes Deterministas**:
   Las animaciones no usan transiciones lineales o `ease` estándar. Emplean curvas cúbicas calibradas para imitar resortes físicos:
   - **`--e-flow-glide`** (`cubic-bezier(0.2, 0.8, 0.2, 1)`): Deslizamiento suave y preciso sin rebote brusco.
   - **`--e-flow-drop`** (`cubic-bezier(0.3, 1.25, 0.4, 1)`): Entrada con sobreimpulso elástico (overshoot del 25%).
   - **`--e-flow-jelly`** (`cubic-bezier(0.3, 1.3, 0.45, 1)`): Respuesta gomosa para aterrizajes y retroalimentación de éxito.
3. **Elevación y Foco Activo**:
   Los campos seleccionados (por ejemplo, el slot activo en un Input OTP) se elevan físicamente (`translateY(-2px)`), expandiendo una sombra translúcida y un halo sutil.
4. **Accesibilidad Obligatoria (WCAG 2.2)**:
   Todo elemento animado respeta `@media (prefers-reduced-motion: reduce)`. El cursor simulado deja de parpadear y permanece visible al 100%, eliminando riesgos vestibulares.

---

## 2. Tokens de Movimiento Cojeev

### 2.1 Variables CSS (`cojeev-motion.css`)

```css
:root {
  /* Tiempos */
  --t-micro: 120ms;
  --t-element: 200ms;
  --t-max: 300ms;
  --t-draw: 600ms;
  --t-flow-glide: 240ms;
  --t-flow-glide-land: 360ms;
  --t-flow-press: 75ms;

  /* Curvas Bézier de Resorte */
  --e-flow-glide: cubic-bezier(0.2, 0.8, 0.2, 1);
  --e-flow-drop: cubic-bezier(0.3, 1.25, 0.4, 1);
  --e-flow-jelly: cubic-bezier(0.3, 1.3, 0.45, 1);
  --e-flow-rubber: cubic-bezier(0.3, 1.3, 0.4, 1);
  --e-flow-settle: cubic-bezier(0.2, 0.65, 0.25, 1);
  --e-flow-enter: cubic-bezier(0.16, 1, 0.3, 1);
  --e-flow-exit: cubic-bezier(0.4, 0, 1, 1);
}
```

### 2.2 Tokens para Motion / Framer Motion (`cojeev-tokens.ts`)

```typescript
export const COJEEV_SPRINGS = {
  // Transiciones de navegación y cambio de pantalla
  responsive: { type: 'spring', stiffness: 360, damping: 32, mass: 0.85 },
  // Modales, bottom sheets y menús flotantes
  expressive: { type: 'spring', stiffness: 260, damping: 22, mass: 1 },
  // Notificaciones y tooltips
  gentle: { type: 'spring', stiffness: 180, damping: 28, mass: 1 },
  // Botones, teclado táctil y slots OTP
  tactile: { type: 'spring', stiffness: 450, damping: 26, mass: 0.6 },
}
```

---

## 3. Especificación de Componentes Clave

### 3.1 Input OTP con Fake Caret

El componente estrella de Cojeev separa cada dígito en un slot interactivo con:
- Elevación de slot activo: `translateY(-2px)` con `box-shadow` e iluminación de borde.
- Inyección de dígito con pop elástico (`@keyframes cojeev-digit-pop`).
- Caret parpadeante simulado (`.cojeev-fake-caret`).

#### Estructura en React (`InputOTP.tsx`):
```tsx
import * as React from 'react'
import { OTPInput, OTPInputContext, REGEXP_ONLY_DIGITS } from 'input-otp'
import type { OTPInputProps } from 'input-otp'
import { cn } from '../../utils/cn'

export type InputOTPProps = OTPInputProps & {
  containerClassName?: string
  className?: string
}

export const InputOTP = React.forwardRef<HTMLInputElement, InputOTPProps>(function InputOTP(
  { className, containerClassName, pattern = REGEXP_ONLY_DIGITS, ...props },
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

export function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="input-otp-group" className={cn('flex items-center gap-1.5', className)} {...props} />
}

export function InputOTPSlot({ index, className, ...props }: React.ComponentProps<'div'> & { index: number }) {
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
        'relative grid place-items-center select-none w-11 h-14 text-2xl font-bold rounded-xl border transition-all',
        className,
      )}
      {...props}
    >
      {char && <span data-slot="input-otp-char">{char}</span>}
      {hasFakeCaret && <div data-slot="input-otp-caret" className="cojeev-fake-caret" />}
    </div>
  )
}
```

### 3.2 Tactile Flow Press (`useFlowPress`)

Hook que gestiona la compresión táctil con retroalimentación vibratoria opcional (Haptics en dispositivos móviles):
```typescript
import * as React from 'react'

export function useFlowPress(options = {}) {
  const [pressed, setPressed] = React.useState(false)
  const [landed, setLanded] = React.useState(false)

  const handlePressStart = React.useCallback(() => {
    setPressed(true)
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate(8) } catch {}
    }
  }, [])

  const handlePressEnd = React.useCallback(() => {
    setPressed(false)
    setLanded(true)
    setTimeout(() => setLanded(false), 360)
  }, [])

  return {
    pressed,
    landed,
    pressProps: {
      onPointerDown: handlePressStart,
      onPointerUp: handlePressEnd,
      onPointerCancel: handlePressEnd,
    },
  }
}
```

### 3.3 Gliding Pill Indicator (`useFlowGroup`)

Calcula la posición y geometría para renderizar una píldora indicadora deslizante detrás de la pestaña o botón activo:
```typescript
const { containerRef, pillRect, updatePill } = useFlowGroup({
  activeSelector: '[aria-selected="true"], .active',
})

return (
  <div ref={containerRef} className="v-glide-container">
    {pillRect.visible && (
      <div
        className="v-glide-pill"
        style={{
          transform: `translate3d(${pillRect.x}px, ${pillRect.y}px, 0)`,
          width: `${pillRect.width}px`,
          height: `${pillRect.height}px`,
        }}
      />
    )}
    <button aria-selected={tab === 'a'} onClick={() => setTab('a')}>Opción A</button>
    <button aria-selected={tab === 'b'} onClick={() => setTab('b')}>Opción B</button>
  </div>
)
```

---

## 4. Recetas de Aplicación Rápida

### 4.1 En Botones y Acciones
Añadir la clase `.flow-press` para compresión elástica instantánea:
```html
<button class="button flow-press">Confirmar Pago</button>
```

### 4.2 En Tarjetas y Listas
Añadir `.cojeev-card-hover` para micro-elevación suave:
```html
<div class="card cojeev-card-hover">...</div>
```

### 4.3 En Diálogos y Modales
Utilizar la animación con sobreimpulso elástico:
```css
dialog[open] {
  animation: cojeev-dialog-spring 260ms var(--e-flow-drop) backwards;
}
```

---

## 5. Protocolo de Trabajo en Repositorios
1. **Ramas**: Siempre trabajar nuevas características o adaptaciones en ramas con prefijo `feature/` o `fix/`.
2. **Validación**: Verificar siempre `npm test` o `vitest`, `tsc --noEmit` y el build antes de fusionar.
3. **Sincronización**: Fusionar cambios hacia `dev`, validar integración y finalmente sincronizar con `main`.
