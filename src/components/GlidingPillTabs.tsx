import * as React from 'react'
import { useFlowGroup } from '../hooks/useFlowGroup'
import { cn } from '../utils/cn'

export interface TabItem {
  id: string
  label: string
  icon?: React.ReactNode
}

export interface GlidingPillTabsProps {
  items: TabItem[]
  activeId: string
  onChange: (id: string) => void
  className?: string
  pillClassName?: string
  itemClassName?: string
}

/**
 * GlidingPillTabs component implementing Cojeev's gliding indicator.
 * Moves a pill indicator behind the active tab with calibrated glide physics.
 */
export function GlidingPillTabs({
  items,
  activeId,
  onChange,
  className,
  pillClassName,
  itemClassName,
}: GlidingPillTabsProps) {
  const { containerRef, pillRect, updatePill } = useFlowGroup<HTMLDivElement>({
    activeSelector: '[data-state="active"]',
  })

  React.useEffect(() => {
    updatePill()
  }, [activeId, updatePill])

  return (
    <div
      ref={containerRef}
      role="tablist"
      className={cn(
        'relative inline-flex items-center p-1 bg-slate-100 rounded-2xl isolate',
        className,
      )}
    >
      {pillRect.visible && (
        <div
          data-slot="glide-pill"
          className={cn(
            'absolute top-0 left-0 pointer-events-none rounded-xl bg-white shadow-sm z-0',
            pillClassName,
          )}
          style={{
            transform: `translate3d(${pillRect.x}px, ${pillRect.y}px, 0)`,
            width: `${pillRect.width}px`,
            height: `${pillRect.height}px`,
            transition: 'transform 240ms cubic-bezier(0.2, 0.8, 0.2, 1), width 240ms cubic-bezier(0.2, 0.8, 0.2, 1), height 240ms cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        />
      )}

      {items.map((item) => {
        const isActive = item.id === activeId
        return (
          <button
            key={item.id}
            role="tab"
            type="button"
            data-state={isActive ? 'active' : 'inactive'}
            aria-selected={isActive}
            onClick={() => onChange(item.id)}
            className={cn(
              'relative z-10 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl select-none',
              'transition-colors duration-150',
              isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900',
              itemClassName,
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
