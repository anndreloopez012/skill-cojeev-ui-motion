# AGENTS.md - skill-cojeev-ui-motion

Instrucciones para agentes de IA (Antigravity, Codex, Claude Code) que operan sobre este repositorio.

## Directivas de Memoria y Graphify
- Este proyecto forma parte del ecosistema de herramientas y skills del usuario.
- Siempre inspeccionar el estado de git con `git status --short` antes de modificar archivos.
- Al realizar cambios:
  1. Trabajar en ramas de características (`feature/...`).
  2. Probar que no haya errores de sintaxis o tipos.
  3. Fusionar en `dev` y luego sincronizar en `main`.
  4. Mantener la skill sincronizada con los agentes en `~/.gemini/config/skills/`, `~/.claude/skills/` y `~/.codex/skills/`.
