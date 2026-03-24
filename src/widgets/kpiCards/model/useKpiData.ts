import { useMemo } from 'react'
import type { VendingMachinesOverview } from '@/entities/dashboard'

export function useKpiData(overview: VendingMachinesOverview) {
  return useMemo(() => {
    const total = Math.max(overview.total, 1)
    return { overview, total }
  }, [overview])
}
