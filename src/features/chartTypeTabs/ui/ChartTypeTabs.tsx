import type { PeakChartType } from '@/shared/config'

type Props = {
  value: PeakChartType
  onChange: (v: PeakChartType) => void
}

export function ChartTypeTabs({ value, onChange }: Props) {
  return (
    <div className="pill-toggle pill-toggle--peak" role="tablist">
      <button
        type="button"
        role="tab"
        aria-selected={value === 'line'}
        className={`pill-toggle__btn${value === 'line' ? ' pill-toggle__btn--on' : ''}`}
        onClick={() => onChange('line')}
      >
        Линейный график
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={value === 'heat'}
        className={`pill-toggle__btn${value === 'heat' ? ' pill-toggle__btn--on' : ''}`}
        onClick={() => onChange('heat')}
      >
        Тепловая карта
      </button>
    </div>
  )
}
