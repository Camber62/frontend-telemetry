import type { BffDashboardPayload } from '@/entities/dashboard'
import { ReportLink } from '@/features/generateReport'
import { useStockLevel } from '../model/useStockLevel'

type Props = {
  productFill: BffDashboardPayload['productFill']
  overviewTotal: number
  lowSupply: number
}

export function StockLevelList({ productFill, overviewTotal, lowSupply }: Props) {
  const productColumns = useStockLevel(productFill.topFilled)
  const replenishShare = Math.round((lowSupply / Math.max(overviewTotal, 1)) * 100)

  return (
    <section className="status-card" aria-label="Заполнение товарами">
      <h3 className="status-card__title">Заполнение товарами</h3>
      <div className="stock-vchart">
        {productColumns.map((col, idx) => (
          <div key={idx} className="stock-vchart__col">
            {col.isCritical && (
              <span className="stock-vchart__pct-label">{col.labelPct}%</span>
            )}
            <div className="stock-vchart__well">
              <div
                className={`stock-vchart__fill${col.isCritical ? ' stock-vchart__fill--alert' : ' stock-vchart__fill--neutral'}`}
                style={{ height: `${col.barHeight}%` }}
              >
                {col.isCritical && (
                  <span className="stock-vchart__badge">{col.itemCount}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="stock-summary">
        <span className="stock-summary__num">
          {productFill.total.toLocaleString('ru-RU')}
        </span>
        <span className="stock-summary__pill">{replenishShare}%</span>
      </div>
      <p className="stock-summary__caption">ТА требуют пополнения товаром</p>
      <footer className="status-card__footer">
        <ReportLink variant="muted" label="Перейти в отчет" />
      </footer>
    </section>
  )
}
