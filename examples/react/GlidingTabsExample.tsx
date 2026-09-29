import * as React from 'react'
import { GlidingPillTabs } from '../../src/components/GlidingPillTabs'

const TABS = [
  { id: 'general', label: 'General' },
  { id: 'ventas', label: 'Ventas y POS' },
  { id: 'inventario', label: 'Inventario' },
  { id: 'seguridad', label: 'Seguridad' },
]

export function GlidingTabsExample() {
  const [activeTab, setActiveTab] = React.useState('general')

  return (
    <div className="flex flex-col gap-6 p-6">
      <GlidingPillTabs
        items={TABS}
        activeId={activeTab}
        onChange={(id) => setActiveTab(id)}
      />

      <div className="p-4 border rounded-xl bg-white text-slate-700 text-sm">
        Pestaña activa: <strong>{activeTab}</strong>
      </div>
    </div>
  )
}
