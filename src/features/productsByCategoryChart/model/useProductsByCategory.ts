import { useMemo } from 'react'
import { POPULAR_CATEGORIES_BARS_STATIC } from '@/shared/mocks/analytics-category-bars'
import type { BarRow } from '@/shared/ui/six-bar-analytics'

export function useProductsByCategory() {
  return useMemo(() => POPULAR_CATEGORIES_BARS_STATIC as BarRow[], [])
}
