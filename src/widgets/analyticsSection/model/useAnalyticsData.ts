import { useState } from 'react'
import type { PopularAnalyticsMode } from '@/shared/config'

export function useAnalyticsData() {
  const [popularMode, setPopularMode] = useState<PopularAnalyticsMode>('products')
  return { popularMode, setPopularMode }
}
