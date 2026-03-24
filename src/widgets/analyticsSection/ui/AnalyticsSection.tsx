import type { BffDashboardPayload } from '@/entities/dashboard'
import { ChartTypeTabs } from '@/features/chartTypeTabs'
import { ReportLink } from '@/features/generateReport'
import { PeakHoursChart } from '@/features/peakHoursChart'
import { PopularAnalyticsModeToggle } from '@/features/popularAnalyticsMode'
import { PopularProductsChart } from '@/features/popularProductsChart'
import { ProductsByCategoryChart } from '@/features/productsByCategoryChart'
import { SalesByMachineChart } from '@/features/salesByMachineChart'
import type { PeakChartType } from '@/shared/config'
import { useAnalyticsData } from '../model/useAnalyticsData'

type Props = {
  data: BffDashboardPayload
  peakChartType: PeakChartType
  onPeakChartTypeChange: (v: PeakChartType) => void
}

export function AnalyticsSection({ data, peakChartType, onPeakChartTypeChange }: Props) {
  const { popularMode, setPopularMode } = useAnalyticsData()

  return (
    <>
      <div className="analytics-top analytics-top--redesign">
        <SalesByMachineChart salesByVm={data.salesByVm} />
        <section className="analytic-card" aria-label="Популярные">
          <header className="analytic-card__head">
            <h3 className="analytic-card__title">Популярные</h3>
            <PopularAnalyticsModeToggle value={popularMode} onChange={setPopularMode} />
          </header>
          <div className="popular-chart-body" key={popularMode}>
            {popularMode === 'products' ? (
              <PopularProductsChart salesByProduct={data.salesByProduct} />
            ) : (
              <ProductsByCategoryChart salesByProduct={data.salesByProduct} />
            )}
          </div>
        </section>
      </div>

      <section className="peak-panel" aria-label="Время пиковых продаж">
        <header className="peak-panel__head">
          <h2 className="peak-panel__title">Время пиковых продаж</h2>
          <ChartTypeTabs value={peakChartType} onChange={onPeakChartTypeChange} />
        </header>
        <PeakHoursChart peakPerDay={data.peakPerDay} chartType={peakChartType} />
        <footer className="peak-panel__footer">
          <ReportLink variant="muted" label="Перейти в отчет" />
        </footer>
      </section>
    </>
  )
}
