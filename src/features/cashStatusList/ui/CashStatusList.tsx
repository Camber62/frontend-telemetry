import { useState } from 'react'
import type { VendingMachineMoneyStatus } from '@/entities/dashboard'
import { ReportLink } from '@/features/generateReport'
import { MachineId, cashMetricTone } from '@/entities/vendingMachine'
import { IconSortDesc } from '@/shared/ui/icon-sort-desc'
import { useCashStatus } from '../model/useCashStatus'

function IconCoins() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <ellipse cx="9" cy="5" rx="5" ry="2" stroke="#98A2B3" strokeWidth="1.3" />
      <path
        d="M4 5v3c0 1.1 2.24 2 5 2s5-.9 5-2V5"
        stroke="#98A2B3"
        strokeWidth="1.3"
      />
      <path
        d="M4 8v3c0 1.1 2.24 2 5 2s5-.9 5-2V8"
        stroke="#98A2B3"
        strokeWidth="1.3"
      />
    </svg>
  )
}

function IconBanknote() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect
        x="2.5"
        y="5"
        width="13"
        height="8"
        rx="1.5"
        stroke="#98A2B3"
        strokeWidth="1.3"
      />
      <circle cx="9" cy="9" r="2" stroke="#98A2B3" strokeWidth="1.2" />
    </svg>
  )
}

type Props = {
  moneyFill: VendingMachineMoneyStatus[]
  selectedMachineId: number | null
  onSelectMachine: (id: number | null) => void
}

export function CashStatusList({ moneyFill, selectedMachineId, onSelectMachine }: Props) {
  const [sortDescending, setSortDescending] = useState(true)
  const moneyRows = useCashStatus(moneyFill, sortDescending)

  return (
    <section className="status-card" aria-label="Состояние денежных средств">
      <h3 className="status-card__title">Состояние денежных средств</h3>
      <div className="status-card__toolbar">
        <button
          type="button"
          className={`status-pill${sortDescending ? ' status-pill--active' : ''}`}
          aria-pressed={sortDescending}
          aria-label="Сначала полные торговые автоматы"
          onClick={() => setSortDescending(true)}
        >
          Сначала полные ТА
        </button>
        <button
          type="button"
          className="status-icon-btn"
          aria-label={
            sortDescending
              ? 'Сортировка: сначала полнее по монетам и купюрам'
              : 'Сортировка: сначала пустее'
          }
          aria-pressed={sortDescending}
          onClick={() => setSortDescending((d) => !d)}
        >
          <IconSortDesc descending={sortDescending} />
        </button>
      </div>
      <ul className="cash-grid">
        {moneyRows.map((m) => (
          <li key={m.machineId} className="cash-grid__row">
            <button
              type="button"
              className={`cash-grid__head${selectedMachineId === m.machineId ? ' cash-grid__head--active' : ''}`}
              onClick={() =>
                onSelectMachine(selectedMachineId === m.machineId ? null : m.machineId)
              }
            >
              <span className="ta-badge">{m.machineType}</span>
              <MachineId id={m.machineId} className="cash-grid__id" />
            </button>
            <div className="cash-grid__metrics">
              <div className="cash-metric">
                <div className="cash-metric__top">
                  <IconCoins />
                  <span className="cash-metric__pct">{m.coinFillPercentage}%</span>
                </div>
                <div className="cash-metric__track">
                  <span
                    className={`cash-metric__fill cash-metric__fill--${cashMetricTone(m.coinFillPercentage)}`}
                    style={{ width: `${m.coinFillPercentage}%` }}
                  />
                </div>
              </div>
              <div className="cash-metric">
                <div className="cash-metric__top">
                  <IconBanknote />
                  <span className="cash-metric__pct">{m.banknotesFillPercentage}%</span>
                </div>
                <div className="cash-metric__track">
                  <span
                    className={`cash-metric__fill cash-metric__fill--${cashMetricTone(m.banknotesFillPercentage)}`}
                    style={{ width: `${m.banknotesFillPercentage}%` }}
                  />
                </div>
              </div>
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
