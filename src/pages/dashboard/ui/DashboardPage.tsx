import { AppHeader } from '@/features/dashboardAppHeader'
import { DashboardMainToolbar } from '@/features/dashboardMainToolbar'
import { ParkMapPanel } from '@/features/parkMapPanel'
import { PageLoader } from '@/shared/ui/page-loader'
import { AnalyticsSection } from '@/widgets/analyticsSection'
import { KpiCards } from '@/widgets/kpiCards'
import { MonitoringOverview } from '@/widgets/monitoringOverview'
import { SideMenu } from '@/widgets/sideMenu'
import { useDashboardData } from '../model/useDashboardData'

export function DashboardPage() {
  const ctx = useDashboardData()

  return (
    <div className="app-shell">
      <AppHeader lastUpdated={ctx.lastUpdated} loading={ctx.loading} onRefresh={ctx.refresh} />

      <div className="app-frame">
        <SideMenu />

        <main className="page-main">
          <DashboardMainToolbar
            loading={ctx.loading}
            contentLoading={ctx.contentLoading}
            error={ctx.error}
            onRefresh={ctx.refresh}
          />

          {ctx.contentLoading ? (
            <PageLoader />
          ) : ctx.data ? (
            <>
              <KpiCards overview={ctx.data.overview} />
              <ParkMapPanel
                machines={ctx.data.moneyFill}
                selectedId={ctx.selectedMachineId}
                onSelectMachine={ctx.setSelectedMachineId}
                overlayMode={ctx.mapOverlay}
                onOverlayModeChange={ctx.setMapOverlay}
                salesPctByMachineId={ctx.salesPctByMachineId}
              />
              <h2 className="section-heading">Обзор состояния ТА</h2>
              <MonitoringOverview
                data={ctx.data}
                selectedMachineId={ctx.selectedMachineId}
                onSelectMachine={ctx.setSelectedMachineId}
              />
              <div className="analytics-section">
                <h2 className="section-heading section-heading--analytics">
                  Аналитика продаж и потребительского поведения
                </h2>
                <AnalyticsSection
                  data={ctx.data}
                  peakChartType={ctx.peakChartType}
                  onPeakChartTypeChange={ctx.setPeakChartType}
                />
              </div>
            </>
          ) : null}
        </main>
      </div>
    </div>
  )
}
