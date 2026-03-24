import type { VendingMachinesOverview } from '@/entities/dashboard'
import { useKpiData } from '../model/useKpiData'

type Props = {
  overview: VendingMachinesOverview
}

export function KpiCards({ overview }: Props) {
  const { total } = useKpiData(overview)

  return (
    <section className="kpi-row" aria-label="Ключевые показатели">
      <article
        className="kpi-card kpi-card--neutral kpi-card--enter"
        style={{ animationDelay: '0ms' }}
      >
        <h3 className="kpi-card__label">Всего автоматов</h3>
        <p className="kpi-card__value" key={overview.total}>
          {overview.total}
        </p>
      </article>
      <article
        className="kpi-card kpi-card--green kpi-card--enter"
        style={{ animationDelay: '50ms' }}
      >
        <h3 className="kpi-card__label">Работающих</h3>
        <p className="kpi-card__value kpi-card__value--success" key={overview.working}>
          {overview.working}
        </p>
        <span className="kpi-card__pct">{Math.round((overview.working / total) * 100)}%</span>
        <div
          className="kpi-card__bar"
          style={{ ['--p' as string]: `${(overview.working / total) * 100}%` }}
        />
      </article>
      <article
        className="kpi-card kpi-card--amber kpi-card--enter"
        style={{ animationDelay: '100ms' }}
      >
        <h3 className="kpi-card__label">Мало товаров</h3>
        <p className="kpi-card__value kpi-card__value--warn" key={overview.lowSupply}>
          {overview.lowSupply}
        </p>
        <span className="kpi-card__pct">{Math.round((overview.lowSupply / total) * 100)}%</span>
      </article>
      <article
        className="kpi-card kpi-card--rose kpi-card--enter"
        style={{ animationDelay: '150ms' }}
      >
        <h3 className="kpi-card__label">Требуют обслуживания</h3>
        <p className="kpi-card__value kpi-card__value--bad" key={overview.needsRepair}>
          {overview.needsRepair}
        </p>
        <span className="kpi-card__pct">{Math.round((overview.needsRepair / total) * 100)}%</span>
      </article>
    </section>
  )
}
