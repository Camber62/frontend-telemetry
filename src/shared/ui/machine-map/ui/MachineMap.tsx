import L from 'leaflet'
import { useEffect, useMemo, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import type { VendingMachineMoneyStatus } from '@/entities/dashboard'
import { DEFAULT_MAP_CENTER } from '@/shared/config/leaflet'
import type { MapOverlayMode } from '@/shared/config/map-overlay'

const SPB: L.LatLngTuple = [DEFAULT_MAP_CENTER[0], DEFAULT_MAP_CENTER[1]]

function stableOffset(id: number): L.LatLngTuple {
  let s = id * 9301 + 49297
  const dx = ((s % 2000) / 2000 - 0.5) * 0.08
  s = Math.floor(s / 2000)
  const dy = ((s % 2000) / 2000 - 0.5) * 0.06
  return [SPB[0] + dy, SPB[1] + dx]
}

function pinColor(
  m: VendingMachineMoneyStatus,
  mode: MapOverlayMode,
  salesPct: number | undefined,
): string {
  const avg = (m.coinFillPercentage + m.banknotesFillPercentage) / 2
  const rev = salesPct ?? 50

  switch (mode) {
    case 'revenue':
      return rev > 66 ? '#17B26A' : rev > 33 ? '#F79009' : '#F04438'
    case 'downtime': {
      const d = 100 - rev
      return d > 66 ? '#F04438' : d > 33 ? '#F79009' : '#17B26A'
    }
    case 'fill':
    case 'status':
    default:
      return avg > 60 ? '#17B26A' : avg > 35 ? '#F79009' : '#F04438'
  }
}

type Props = {
  machines: VendingMachineMoneyStatus[]
  selectedId: number | null
  onSelectMachine: (id: number | null) => void
  className?: string
  overlayMode?: MapOverlayMode
  salesPctByMachineId?: Record<number, number>
}

export function MachineMap({
  machines,
  selectedId,
  onSelectMachine,
  className,
  overlayMode = 'status',
  salesPctByMachineId,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<{ map: L.Map; group: L.LayerGroup } | null>(null)

  const sorted = useMemo(
    () => [...machines].sort((a, b) => a.machineId - b.machineId),
    [machines],
  )

  useEffect(() => {
    const el = hostRef.current
    if (!el || mapRef.current) return

    const map = L.map(el, { zoomControl: true, attributionControl: true }).setView(SPB, 11)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)

    const group = L.layerGroup().addTo(map)
    mapRef.current = { map, group }

    const onResize = () => map.invalidateSize()
    window.addEventListener('resize', onResize)
    requestAnimationFrame(() => map.invalidateSize())

    return () => {
      window.removeEventListener('resize', onResize)
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    const ctx = mapRef.current
    if (!ctx) return
    const { map, group } = ctx
    group.clearLayers()

    sorted.forEach((m, idx) => {
      const [lat, lng] = stableOffset(m.machineId)
      const num = idx + 1
      const salesPct = salesPctByMachineId?.[m.machineId]
      const color = pinColor(m, overlayMode, salesPct)
      const selected = selectedId === m.machineId

      const icon = L.divIcon({
        className: 'map-pin-wrap',
        html: `<div class="map-pin${selected ? ' map-pin--selected' : ''}" style="background:${color}">${num}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      })

      const marker = L.marker([lat, lng], { icon })
      marker.bindPopup(
        `<strong>ТА ${num}</strong> · #${m.machineId} · тип ${m.machineType}<br/>` +
          `Монеты: ${m.coinFillPercentage}% · Купюры: ${m.banknotesFillPercentage}%`,
        { className: 'map-popup' },
      )
      marker.on('click', () => onSelectMachine(m.machineId))
      marker.addTo(group)
    })

    if (selectedId != null) {
      const m = machines.find((x) => x.machineId === selectedId)
      if (m) {
        map.panTo(stableOffset(m.machineId), { animate: true, duration: 0.35 })
      }
    }
  }, [machines, selectedId, onSelectMachine, sorted, overlayMode, salesPctByMachineId])

  return (
    <div className={`machine-map${className ? ` ${className}` : ''}`}>
      <div className="machine-map__host" ref={hostRef} role="application" aria-label="Карта автоматов" />
    </div>
  )
}
