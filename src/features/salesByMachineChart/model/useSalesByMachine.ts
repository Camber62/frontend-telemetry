import { useMemo } from 'react'
import type { BffDashboardPayload } from '@/entities/dashboard'
import type { BarRow } from '@/shared/ui/six-bar-analytics'

export function useSalesByMachine(data: BffDashboardPayload['salesByVm']) {
  return useMemo(() => {
    const top = data.topVendingMachines.slice(0, 5)
    const sumPct = top.reduce((s, x) => s + x.percentageOfAllSales, 0)
    const rows = [
      ...top.map((x) => ({ value: x.totalSales, pct: x.percentageOfAllSales })),
      {
        value: Math.max(0, data.totalSales - data.soldInTopFive),
        pct: Math.max(0, Math.round(100 - sumPct)),
      },
    ]
    const maxV = Math.max(...rows.map((r) => r.value), 1)
    return rows.map((r, i) => ({
      ...r,
      heightPct: Math.max(12, Math.round((r.value / maxV) * 100)),
      isOther: i === 5,
    })) as BarRow[]
  }, [data])
}
