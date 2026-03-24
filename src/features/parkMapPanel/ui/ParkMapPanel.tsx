import type { VendingMachineMoneyStatus } from '@/entities/dashboard'
import { MapOverlayPicker } from '@/features/mapOverlayPicker'
import type { MapOverlayMode } from '@/shared/config'
import { MachineMap } from '@/shared/ui/machine-map'

type Props = {
  machines: VendingMachineMoneyStatus[]
  selectedId: number | null
  onSelectMachine: (id: number | null) => void
  overlayMode: MapOverlayMode
  onOverlayModeChange: (mode: MapOverlayMode) => void
  salesPctByMachineId: Record<number, number>
}

export function ParkMapPanel({
  machines,
  selectedId,
  onSelectMachine,
  overlayMode,
  onOverlayModeChange,
  salesPctByMachineId,
}: Props) {
  return (
    <section className="map-hero" aria-label="Карта">
      <div className="map-hero__surface">
        <MachineMap
          className="machine-map--tall"
          machines={machines}
          selectedId={selectedId}
          onSelectMachine={onSelectMachine}
          overlayMode={overlayMode}
          salesPctByMachineId={salesPctByMachineId}
        />
      </div>
      <MapOverlayPicker value={overlayMode} onChange={onOverlayModeChange} />
    </section>
  )
}
