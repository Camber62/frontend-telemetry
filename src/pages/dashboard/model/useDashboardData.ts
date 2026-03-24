import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import type { BffDashboardPayload } from '@/entities/dashboard'
import { dashboardQueryKey, loadDashboard } from '@/shared/api'
import type { MapOverlayMode, PeakChartType } from '@/shared/config'

export function useDashboardData() {
  const [selectedMachineId, setSelectedMachineId] = useState<number | null>(null)
  const [mapOverlay, setMapOverlay] = useState<MapOverlayMode>('status')
  const [peakChartType, setPeakChartType] = useState<PeakChartType>('line')

  const query = useQuery({
    queryKey: dashboardQueryKey,
    queryFn: loadDashboard,
  })

  const data: BffDashboardPayload | null = query.data ?? null
  const contentLoading = !data && query.isFetching
  const error =
    query.error instanceof Error
      ? query.error.message
      : query.error
        ? 'Ошибка загрузки'
        : null

  const salesPctByMachineId = useMemo(() => {
    const r: Record<number, number> = {}
    data?.salesIndex.forEach((s) => {
      r[s.machineId] = s.percentage
    })
    return r
  }, [data])

  return {
    data,
    error,
    contentLoading,
    loading: query.isFetching,
    lastUpdated: query.dataUpdatedAt > 0 ? new Date(query.dataUpdatedAt) : null,
    refresh: () => void query.refetch(),
    selectedMachineId,
    setSelectedMachineId,
    mapOverlay,
    setMapOverlay,
    peakChartType,
    setPeakChartType,
    salesPctByMachineId,
  }
}
