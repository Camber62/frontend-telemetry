import type { BffDashboardPayload } from '@/entities/dashboard'
import type { PeakChartType } from '@/shared/config'
import { PeakHeatmap, PeakLineChart } from '@/shared/ui/peak-visuals'

type Props = {
  peakPerDay: BffDashboardPayload['peakPerDay']
  chartType: PeakChartType
}

export function PeakHoursChart({ peakPerDay, chartType }: Props) {
  return (
    <div className="peak-visual-wrap">
      {chartType === 'line' ? (
        <PeakLineChart peaks={peakPerDay} />
      ) : (
        <PeakHeatmap peaks={peakPerDay} />
      )}
    </div>
  )
}
