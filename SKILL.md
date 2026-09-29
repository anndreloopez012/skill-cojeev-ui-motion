---
name: skill-cojeev-ui-motion
description: "Sistema y skill de animaciones UI/UX táctiles y componentes fluidos extraídos de la librería 000h de Cojeev (https://000h.cojeev.com). Incluye Input OTP con cursor simulado parpadeante, flow-press con física de resortes, transiciones gliding para pestañas/navegación, diálogos con rebote elástico (drop overshoot), sellos flotantes orgánicos, barrido de luz shimmer, explosión de corazones/favoritos, revelado escalonado en cuadrículas y directrices WCAG para movimiento reducido."
---

# Skill: Cojeev UI Motion Design System (000h Motion Engine)

Esta skill proporciona un sistema completo de diseño de movimiento e interacciones táctiles nativas basado en los principios de la suite **000h de Cojeev** (`https://000h.cojeev.com`). Transforma interfaces web convencionales en experiencias visuales inmersivas, fluidas, ultra-responsivas y con sensación de aplicación móvil nativa (iOS/macOS).

---

## 1. Principios Fundamentales del Sistema 000h

1. **Inmediatez Táctil (`--t-flow-press: 75ms`)**:
   La compresión al presionar un elemento interactivo responde de forma instantánea (75ms). No existe sensación de retraso ni arrastre innecesario.
2. **Física de Resortes Deterministas**:
   Las animaciones no usan transiciones lineales o `ease` estándar. Emplean curvas cúbicas calibradas para imitar resortes físicos:
   - **`--e-flow-glide`** (`cubic-bezier(0.2, 0.8, 0.2, 1)`): Deslizamiento suave y preciso sin rebote brusco.
   - **`--e-flow-drop`** (`cubic-bezier(0.3, 1.25, 0.4, 1)`): Entrada con sobreimpulso elástico (overshoot del 25%).
   - **`--e-flow-jelly`** (`cubic-bezier(0.3, 1.3, 0.45, 1)`): Respuesta gomosa para aterrizajes y retroalimentación de éxito.
   - **`--e-flow-rubber`** (`cubic-bezier(0.3, 1.3, 0.4, 1)`): Estiramiento elástico con contracción instantánea.
   - **`--e-flow-settle`** (`cubic-bezier(0.2, 0.65, 0.25, 1)`): Amortiguación progresiva al soltar un elemento.
   - **`--e-flow-enter`** (`cubic-bezier(0.16, 1, 0.3, 1)`): Entrada rápida con deceleración suave.
3. **Elevación y Foco Activo**:
   Los campos y tarjetas seleccionados se elevan físicamente (`translateY(-2px)` a `translateY(-6px)`), proyectando una sombra translúcida y un halo sutil.
4. **Micro-interacciones Reactivas**:
   Cada acción del usuario (favorito, añadir producto, cambiar cantidad, abrir cajón) tiene una respuesta táctil visual inmediata (digit-pop, badge-bounce, heart-burst, ripple).
5. **Accesibilidad Obligatoria (WCAG 2.2)**:
   Todo elemento animado respeta `@media (prefers-reduced-motion: reduce)`. Las animaciones se reducen a 0.001ms y el cursor simulado deja de parpadear y permanece visible al 100%, eliminando riesgos vestibulares.

---

## 2. Tokens de Movimiento Cojeev

### 2.1 Variables CSS Maestras (`cojeev-motion.css`)

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

El componente insignia de Cojeev separa cada dígito en un slot interactivo con:
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

## 4. Nuevas Animaciones y Micro-Interacciones 000h Avanzadas

### 4.1 Sellos y Badges Flotantes Orgánicos (`cojeev-stamp-float`)

Crea un movimiento levitatorio sutil continuo simulando la física de un globo o sello de cera flotante:
```css
.cojeev-float,
.catalog-hero__stamp {
  animation: cojeev-stamp-float 5s ease-in-out infinite alternate !important;
}

@keyframes cojeev-stamp-float {
  0% {
    transform: rotate(5deg) translate3d(0, 0, 0);
  }
  50% {
    transform: rotate(3deg) translate3d(0, -8px, 0);
  }
  100% {
    transform: rotate(6deg) translate3d(0, -3px, 0);
  }
}
```

### 4.2 Barrido de Luz Shimmer para Etiquetas y Promociones (`cojeev-shimmer-sweep`)

Genera un haz de luz angular que recorre periódicamente chips de condición, insignias de verificación o llamadas a la acción:
```css
.cojeev-shimmer {
  position: relative;
  overflow: hidden;
}

.cojeev-shimmer::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -60%;
  width: 40%;
  height: 200%;
  background: linear-gradient(
    60deg,
    transparent 0%,
    rgba(255, 255, 255, 0.45) 50%,
    transparent 100%
  );
  transform: rotate(25deg);
  animation: cojeev-shimmer-sweep 4s ease-in-out infinite;
  pointer-events: none;
}

@keyframes cojeev-shimmer-sweep {
  0%, 70% {
    left: -60%;
    opacity: 0;
  }
  75% {
    opacity: 1;
  }
  100% {
    left: 150%;
    opacity: 0;
  }
}
```

### 4.3 Explosión de Corazón / Favorito (`cojeev-heart-pop`)

Efecto de burst elástico con escala del 135% que se activa al interactuar con un botón de "Me Gusta" o añadir a lista:
```css
.cojeev-heart-burst {
  animation: cojeev-heart-pop 320ms var(--e-flow-drop) backwards;
}

@keyframes cojeev-heart-pop {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.35);
  }
  100% {
    transform: scale(1);
  }
}
```

### 4.4 Revelado Escalonado en Cuadrículas de Catálogo (Staggered Grid)

Revela progresivamente las tarjetas de productos conforme se cargan o cambian los filtros:
```css
.catalog-product-card {
  animation: cojeev-card-enter 300ms var(--e-flow-drop) backwards;
}
.catalog-product-grid .catalog-product-card:nth-child(1) { animation-delay: 20ms; }
.catalog-product-grid .catalog-product-card:nth-child(2) { animation-delay: 50ms; }
.catalog-product-grid .catalog-product-card:nth-child(3) { animation-delay: 80ms; }
.catalog-product-grid .catalog-product-card:nth-child(4) { animation-delay: 110ms; }
.catalog-product-grid .catalog-product-card:nth-child(5) { animation-delay: 140ms; }
.catalog-product-grid .catalog-product-card:nth-child(6) { animation-delay: 170ms; }
.catalog-product-grid .catalog-product-card:nth-child(7) { animation-delay: 200ms; }
.catalog-product-grid .catalog-product-card:nth-child(8) { animation-delay: 230ms; }
.catalog-product-grid .catalog-product-card:nth-child(n+9) { animation-delay: 260ms; }

@keyframes cojeev-card-enter {
  0% {
    opacity: 0;
    transform: translate3d(0, 14px, 0) scale(0.97);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}
```

### 4.5 Cajón Lateral y Hojas Inferiores Elásticas (`catalog-drawer-in`)

Entrada deslizante suave con desaceleración natural para carritos y paneles laterales:
```css
.catalog-cart-dialog[open] {
  animation: catalog-drawer-in 260ms var(--e-flow-drop) backwards;
}

@keyframes catalog-drawer-in {
  from {
    opacity: 0;
    transform: translate3d(48px, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
```

### 4.6 Inserción Pop en Líneas de Carrito (`cojeev-line-enter`)

Animación que enfatiza visualmente cuando un ítem se agrega a la lista o recibo:
```css
.cart-line-enter,
.cart-line {
  animation: cojeev-line-enter 220ms var(--e-flow-drop) backwards;
}

@keyframes cojeev-line-enter {
  0% {
    opacity: 0;
    transform: translate3d(0, -6px, 0) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}
```

### 4.7 Notificaciones y Toasts con Overshoot (`cojeev-toast-spring`)

```css
.cojeev-toast-spring {
  animation: cojeev-toast-in 260ms var(--e-flow-drop) backwards;
}

@keyframes cojeev-toast-in {
  0% {
    opacity: 0;
    transform: translate3d(0, -12px, 0) scale(0.95);
  }
  70% {
    transform: translate3d(0, 2px, 0) scale(1.01);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}
```

### 4.8 Botones Flotantes con Rebote Elástico (`cojeev-floating-pop`)

Para botones de carrito flotante o acceso rápido en móviles y escritorios:
```css
.catalog-floating-list {
  animation: cojeev-floating-pop 320ms var(--e-flow-drop) backwards;
}

@keyframes cojeev-floating-pop {
  0% {
    opacity: 0;
    transform: translate3d(0, 24px, 0) scale(0.85);
  }
  70% {
    transform: translate3d(0, -4px, 0) scale(1.05);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}
```

### 4.9 Transición de Rutas y Pantallas (`cojeev-view-in`)

Otorga una transición sedosa en cambios de página y navegación interna:
```css
.route-view-container,
.cojeev-page-enter {
  animation: cojeev-view-in 220ms var(--e-flow-glide) backwards;
}

@keyframes cojeev-view-in {
  from {
    opacity: 0;
    transform: translate3d(0, 6px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
```

### 4.10 Rebote Reactivo en Contadores (`key={count}`)

Al montar o actualizar la clave del contador, re-ejecuta el salto físico:
```tsx
<strong key={totalUnits} className="cojeev-badge-bounce">
  {totalUnits}
</strong>
```

---

## 5. Recetas de Aplicación Rápida

### 5.1 En Botones y Acciones
Añadir la clase `.flow-press` para compresión elástica instantánea:
```html
<button class="button flow-press">Confirmar Pago</button>
```

### 5.2 En Tarjetas de Producto
Añadir micro-elevación suave con zoom fluido en imagen:
```css
.catalog-product-card:hover {
  transform: translateY(-6px) scale(1.008);
  box-shadow: 0 22px 52px rgba(8, 41, 35, 0.15);
}
.catalog-product-card:hover img {
  transform: scale(1.06) rotate(0.4deg);
  filter: saturate(1.08);
}
```

### 5.3 En Diálogos y Modales
Utilizar la animación con sobreimpulso elástico:
```css
dialog[open] {
  animation: cojeev-dialog-spring 280ms var(--e-flow-drop) backwards;
}
```

---

## 6. Protocolo de Trabajo en Repositorios
1. **Ramas**: Siempre trabajar nuevas características o adaptaciones en ramas con prefijo `feature/` o `fix/`.
2. **Validación**: Verificar siempre `npm test` o `vitest`, `tsc --noEmit` y el build antes de fusionar.
3. **Sincronización**: Fusionar cambios hacia `dev`, validar integración y finalmente sincronizar con `main`.
