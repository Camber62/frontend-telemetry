import { MAP_OVERLAY_TABS, type MapOverlayMode } from '@/shared/config'

type Props = {
  value: MapOverlayMode
  onChange: (mode: MapOverlayMode) => void
}

export function MapOverlayPicker({ value, onChange }: Props) {
  return (
    <div className="map-hero__tabs map-hero__tabs--scroll" role="tablist" aria-label="Слой карты">
      {MAP_OVERLAY_TABS.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={value === t.id}
          className={`map-hero__tab${value === t.id ? ' map-hero__tab--active' : ''}`}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
