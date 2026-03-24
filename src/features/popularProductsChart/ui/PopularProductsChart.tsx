import type { BffDashboardPayload } from '@/entities/dashboard'
import { ReportLink } from '@/features/generateReport'
import { SixBarChart } from '@/shared/ui/six-bar-analytics'
import { usePopularProducts } from '../model/usePopularProducts'

type Props = {
  salesByProduct: BffDashboardPayload['salesByProduct']
}

export function PopularProductsChart({ salesByProduct }: Props) {
  const popularRows = usePopularProducts(salesByProduct)
  const productTop5Share = Math.round(
    (salesByProduct.soldInTopFive / Math.max(salesByProduct.totalSold, 1)) * 100,
  )

  return (
    <>
      <SixBarChart rows={popularRows} showValueInBar />
      <div className="analytic-stats">
        <div className="analytic-stats__block">
          <strong className="analytic-stats__num">
            {Math.min(5, salesByProduct.topProducts.length)}
          </strong>
          <span className="analytic-stats__lbl">Товаров в топ-5</span>
        </div>
        <div className="analytic-stats__block analytic-stats__block--end">
          <div className="analytic-stats__inline">
            <strong className="analytic-stats__num analytic-stats__num--accent">
              {salesByProduct.soldInTopFive.toLocaleString('ru-RU')}
            </strong>
            <span className="analytic-stats__pill">{productTop5Share}%</span>
          </div>
          <span className="analytic-stats__lbl">Итого продано в топ-5 товаров</span>
        </div>
      </div>
      <footer className="analytic-card__footer">
        <ReportLink variant="muted" label="Перейти в отчет" />
      </footer>
    </>
  )
}
