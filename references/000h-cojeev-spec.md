# 000h by Cojeev Motion Specification

Referencia técnica de la suite de movimiento e interacción de 000h por Cojeev (`https://000h.cojeev.com`).

## 1. Arquitectura de Motion One y Resortes

El sistema de movimiento de Cojeev está construido alrededor de dinámicas de resorte calibradas para interfaces de alta respuesta.

### 1.1 Resortes (Spring Configurations)
- **Responsive**: `stiffness: 360, damping: 32, mass: 0.85`
  - Utilizado para: Tabs deslizantes, interruptores, selectores segmentados.
  - Comportamiento: Asienta en ~240ms con un ligero amortiguamiento crítico.
- **Expressive**: `stiffness: 260, damping: 22, mass: 1`
  - Utilizado para: Diálogos, bottom sheets en móvil, popovers.
  - Comportamiento: Amortiguamiento subcrítico con sobreimpulso perceptible (~6-8%).
- **Tactile**: `stiffness: 450, damping: 26, mass: 0.6`
  - Utilizado para: Teclado numérico táctil (POS numpad), botones primarios, ranuras OTP.
  - Comportamiento: Retorno elástico instantáneo (~75ms compresión, rebote gelatinoso en 180ms).

## 2. Input OTP Specification

### 2.1 Desglose de Ranura (Slot Anatomía)
Cada ranura OTP (`[data-slot="input-otp-slot"]`) contiene:
1. **Contenedor**: 46px x 54px, borde redondeado de 12px, centrado en rejilla (`display: grid; place-items: center`).
2. **Estado Activo**:
   - `transform: translateY(-2px)`
   - `box-shadow: 0 4px 12px rgba(79, 70, 229, 0.15)`
   - `border-color: var(--brand)`
   - `outline: 2px solid color-mix(...)`
3. **Glifo de Dígito**:
   - Inyección animada con `@keyframes cojeev-digit-pop` (escala 0.6 -> 1.08 -> 1.0 con sobreimpulso).
4. **Caret Simulado**:
   - Barra vertical de 2px x 24px centrada con `@keyframes cojeev-caret-blink` (1s ciclo continuo).

## 3. Accesibilidad

Bajo `@media (prefers-reduced-motion: reduce)`:
- Todos los tiempos de animación y transición se reducen a `0.001ms`.
- El cursor simulado `.cojeev-fake-caret` desactiva la animación y permanece estático con opacidad 1.
