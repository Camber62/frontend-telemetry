import type { PeriodId } from '../model/useDateFilter'
import { DATE_FILTER_PERIODS } from '../model/useDateFilter'

type Props = {
  active: PeriodId
  onSelect: (id: PeriodId) => void
}

export function QuickFilters({ active, onSelect }: Props) {
  return (
    <div className="time-range-bar__tabs" role="tablist" aria-label="Период">
      {DATE_FILTER_PERIODS.map((p) => (
        <button
          key={p.id}
          type="button"
          role="tab"
          aria-selected={active === p.id}
          className={`time-range-bar__tab${active === p.id ? ' time-range-bar__tab--active' : ''}`}
          onClick={() => onSelect(p.id)}
        >
          {p.label}
        </button>
      ))}
    </div>
  )
}
