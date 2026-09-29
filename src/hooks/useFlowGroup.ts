import * as React from 'react'

export interface FlowGroupOptions {
  itemSelector?: string
  activeSelector?: string
}

export interface GlidingPillRect {
  x: number
  y: number
  width: number
  height: number
  visible: boolean
}

/**
 * useFlowGroup
 * Computes coordinates for a gliding pill indicator behind the active element in a group/tablist.
 * Inspired by 000h by Cojeev gliding indicators.
 */
export function useFlowGroup<T extends HTMLElement = HTMLDivElement>(
  options: FlowGroupOptions = {},
) {
  const containerRef = React.useRef<T | null>(null)
  const [pillRect, setPillRect] = React.useState<GlidingPillRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    visible: false,
  })

  const {
    itemSelector: _itemSelector = 'button, [role="tab"], a',
    activeSelector = '[aria-selected="true"], [data-state="active"], .active, [aria-current="page"]',
  } = options

  const updatePill = React.useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const activeItem = container.querySelector<HTMLElement>(activeSelector)
    if (!activeItem) {
      setPillRect((prev) => ({ ...prev, visible: false }))
      return
    }

    const containerRect = container.getBoundingClientRect()
    const itemRect = activeItem.getBoundingClientRect()

    setPillRect({
      x: itemRect.left - containerRect.left,
      y: itemRect.top - containerRect.top,
      width: itemRect.width,
      height: itemRect.height,
      visible: true,
    })
  }, [activeSelector])

  React.useEffect(() => {
    updatePill()

    const container = containerRef.current
    if (!container) return

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(() => {
        updatePill()
      })
      observer.observe(container)
      return () => observer.disconnect()
    }

    window.addEventListener('resize', updatePill)
    return () => window.removeEventListener('resize', updatePill)
  }, [updatePill])

  return {
    containerRef,
    pillRect,
    updatePill,
  }
}
