import type { BffDashboardPayload } from '@/entities/dashboard'
import { ReportLink } from '@/features/generateReport'
import { SixBarChart } from '@/shared/ui/six-bar-analytics'
import { useSalesByMachine } from '../model/useSalesByMachine'

type Props = {
  salesByVm: BffDashboardPayload['salesByVm']
}

export function SalesByMachineChart({ salesByVm }: Props) {
  const vmRows = useSalesByMachine(salesByVm)
  const vmTop5Share = Math.round(
    (salesByVm.soldInTopFive / Math.max(salesByVm.totalSales, 1)) * 100,
  )

  return (
    <section className="analytic-card" aria-label="ТА по объемам продаж">
      <h3 className="analytic-card__title">ТА по объемам продаж</h3>
      <SixBarChart rows={vmRows} />
      <div className="analytic-stats">
        <div className="analytic-stats__block">
          <strong className="analytic-stats__num">
            {salesByVm.totalSales.toLocaleString('ru-RU')}
          </strong>
          <span className="analytic-stats__lbl">Всего проданных единиц</span>
        </div>
        <div className="analytic-stats__block analytic-stats__block--end">
          <div className="analytic-stats__inline">
            <strong className="analytic-stats__num analytic-stats__num--accent">
              {salesByVm.soldInTopFive.toLocaleString('ru-RU')}
            </strong>
            <span className="analytic-stats__pill">{vmTop5Share}%</span>
          </div>
          <span className="analytic-stats__lbl">Итого продано в топ-5 ТА</span>
        </div>
      </div>
      <footer className="analytic-card__footer">
        <ReportLink variant="muted" label="Перейти в отчет" />
      </footer>
    </section>
  )
}
