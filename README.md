# skill-cojeev-ui-motion

Sistema de animación UI/UX táctil y componentes fluidos extraídos de la librería **000h de Cojeev** (`https://000h.cojeev.com`).

Proporciona soporte completo para:
- **Input OTP con Fake Caret**: Ranuras con elevación activa (`translateY(-2px)`), cursor parpadeante fluido, inyección elástica de dígitos y soporte de portapapeles.
- **Física de Resortes Deterministas**: Configuraciones de resorte (`responsive`, `expressive`, `tactile`, `gentle`) y curvas Bézier calibradas (`--e-flow-glide`, `--e-flow-drop`, `--e-flow-jelly`).
- **Tactile Flow Press (`useFlowPress`)**: Manejo de interacción de compresión táctil (`--t-flow-press: 75ms`) con micro-vibración háptica para botones, teclado numérico y tarjetas.
- **Gliding Pill Indicators (`useFlowGroup` / `GlidingPillTabs`)**: Píldoras deslizantes suaves detrás del elemento activo para barras de navegación, tabs y filtros.
- **Diálogos y Modales Elásticos**: Transición de apertura con sobreimpulso elástico (`--e-flow-drop`) y fondo difuminado.
- **Accesibilidad Estricta (WCAG 2.2)**: Reducción automática de movimiento bajo `prefers-reduced-motion: reduce`.

---

## Instalación y Uso Rápido

### En proyectos React con Tailwind:
```bash
npm install input-otp clsx tailwind-merge motion
```

Importar los estilos globales de movimiento:
```typescript
import 'skill-cojeev-ui-motion/src/styles/cojeev-motion.css'
```

### Componente Input OTP:
```tsx
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from 'skill-cojeev-ui-motion'

export function Verification() {
  const [pin, setPin] = React.useState('')
  return (
    <InputOTP maxLength={6} value={pin} onChange={setPin}>
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
  )
}
```

---

## Estructura del Repositorio

- `SKILL.md`: Documentación e instrucciones completas para agentes de IA (Antigravity, Claude Code, Codex).
- `src/tokens/`: Resortes y curvas Bézier calculadas en TypeScript.
- `src/styles/`: Hojas de estilo CSS puras con variables nativas (`cojeev-motion.css`).
- `src/components/`: Componentes modulares listos para producción (`InputOTP`, `GlidingPillTabs`, `FlowButton`).
- `src/hooks/`: Hooks de React (`useFlowPress`, `useFlowGroup`, `useReducedMotion`).
- `examples/`: Ejemplos prácticos y recetas de integración.
- `references/`: Especificación técnica formal de 000h por Cojeev.

---

## Flujo de Ramas y Sincronización

Este repositorio sigue el flujo de trabajo estandarizado:
1. `feature/<nombre>`: Desarrollo de nuevas capacidades o adaptaciones.
2. `dev`: Rama de integración donde se consolidan las pruebas.
3. `main`: Rama de producción y distribución estable.
