import { useState } from 'react'

export const DATE_FILTER_PERIODS = [
  { id: 'today', label: 'Сегодня' },
  { id: 'yesterday', label: 'Вчера' },
  { id: 'week', label: 'Неделя' },
  { id: 'month', label: 'Месяц' },
  { id: 'quarter', label: 'Квартал' },
] as const

export type PeriodId = (typeof DATE_FILTER_PERIODS)[number]['id']

export function useDateFilter(initial: PeriodId = 'month') {
  const [active, setActive] = useState<PeriodId>(initial)
  return { active, setActive }
}
