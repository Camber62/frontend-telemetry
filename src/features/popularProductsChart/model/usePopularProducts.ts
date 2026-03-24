import { useMemo } from 'react'
import type { BffDashboardPayload } from '@/entities/dashboard'
import type { BarRow } from '@/shared/ui/six-bar-analytics'

export function usePopularProducts(data: BffDashboardPayload['salesByProduct']) {
  return useMemo(() => {
    const top = data.topProducts.slice(0, 5)
    const sumPct = top.reduce((s, p) => s + p.percentageOfAllSales, 0)
    const sumSold = top.reduce((s, p) => s + p.soldTotal, 0)
    const rows = [
      ...top.map((p) => ({ value: p.soldTotal, pct: p.percentageOfAllSales })),
      {
        value: Math.max(0, data.totalSold - sumSold),
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
