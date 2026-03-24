import { useMemo, useState } from 'react'
import type { SalesIndex } from '@/entities/dashboard'
import { ReportLink } from '@/features/generateReport'
import { MachineId, indexBarTone } from '@/entities/vendingMachine'
import { IconSortDesc } from '@/shared/ui/icon-sort-desc'
import { ChangeMetricButton } from './ChangeMetricButton'

type Props = {
  rows: SalesIndex[]
  selectedMachineId: number | null
  onSelectMachine: (id: number | null) => void
}

export function SalesIndexList({ rows, selectedMachineId, onSelectMachine }: Props) {
  const [sortDescending, setSortDescending] = useState(true)
  const sortedRows = useMemo(() => {
    const copy = [...rows]
    copy.sort((a, b) =>
      sortDescending ? b.percentage - a.percentage : a.percentage - b.percentage,
    )
    return copy
  }, [rows, sortDescending])

  return (
    <section className="status-card" aria-label="Индекс продаж">
      <h3 className="status-card__title">
        Индекс продаж по средней исторической активности
      </h3>
      <div className="status-card__toolbar">
        <ChangeMetricButton />
        <button
          type="button"
          className="status-icon-btn"
          aria-label={
            sortDescending
              ? 'Сортировка: по убыванию индекса'
              : 'Сортировка: по возрастанию индекса'
          }
          aria-pressed={sortDescending}
          onClick={() => setSortDescending((d) => !d)}
        >
          <IconSortDesc descending={sortDescending} />
        </button>
      </div>
      <ul className="sales-index-block">
        {sortedRows.map((row) => (
          <li key={row.machineId} className="sales-index-block__item">
            <button
              type="button"
              className={`sales-index-block__row${selectedMachineId === row.machineId ? ' sales-index-block__row--active' : ''}`}
              onClick={() =>
                onSelectMachine(selectedMachineId === row.machineId ? null : row.machineId)
              }
            >
              <span className="ta-badge">{row.machineType}</span>
              <MachineId id={row.machineId} className="sales-index-block__id" />
              <span className="sales-index-block__pct">{row.percentage}%</span>
            </button>
            <div className="sales-index-block__track">
              <span
                className={`sales-index-block__fill sales-index-block__fill--${indexBarTone(row.percentage)}`}
                style={{ width: `${row.percentage}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <footer className="status-card__footer">
        <ReportLink variant="muted" label="Перейти в отчет" />
      </footer>
    </section>
  )
}
