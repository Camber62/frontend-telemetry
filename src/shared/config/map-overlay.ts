export type MapOverlayMode = 'status' | 'revenue' | 'downtime' | 'fill'

export const MAP_OVERLAY_TABS: { id: MapOverlayMode; label: string }[] = [
  { id: 'status', label: 'Состояние автоматов' },
  { id: 'revenue', label: 'Средняя выручка' },
  { id: 'downtime', label: 'Простой ТА' },
  { id: 'fill', label: 'Уровень заполнения' },
]
