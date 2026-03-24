import { useMemo } from 'react'
import type { BffDashboardPayload } from '@/entities/dashboard'

export type StockColumn = {
  itemCount: number
  fillPercentage: number
  isCritical: boolean
  barHeight: number
  labelPct: number
}

export function useStockLevel(topFilled: BffDashboardPayload['productFill']['topFilled']) {
  return useMemo(() => {
    const rows = [...topFilled].sort((a, b) => a.fillPercentage - b.fillPercentage)
    const five = rows.slice(0, 5)
    const maxFill = Math.max(...five.map((r) => r.fillPercentage), 1)
    return five.map((row, i) => {
      const isCritical = i >= five.length - 2
      const hNorm = (row.fillPercentage / maxFill) * 100
      const col: StockColumn = {
        itemCount: row.itemCount,
        fillPercentage: row.fillPercentage,
        isCritical,
        barHeight: isCritical ? Math.max(38, 100 - row.fillPercentage) : hNorm,
        labelPct: row.fillPercentage,
      }
      return col
    })
  }, [topFilled])
}
